import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const tempRepoRoot = "/private/tmp/dig-ui-prodtest-work/dig-ui-skill";
const tempWorkRoot = path.dirname(tempRepoRoot);
const artifactDir = path.join(repoRoot, "tests", "2026-07-12");
const tempHome = "/private/tmp/dig-ui-prodtest-home";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run(command, args, options = {}) {
  const started = Date.now();
  try {
    const stdout = childProcess.execFileSync(command, args, {
      cwd: options.cwd ?? repoRoot,
      env: { ...process.env, ...(options.env ?? {}) },
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return {
      command: [command, ...args].join(" "),
      cwd: options.cwd ?? repoRoot,
      status: 0,
      duration_ms: Date.now() - started,
      stdout: options.fullStdout ? stdout : stdout.trim().split("\n").slice(-12).join("\n"),
      stderr: "",
    };
  } catch (error) {
    return {
      command: [command, ...args].join(" "),
      cwd: options.cwd ?? repoRoot,
      status: error.status ?? 1,
      duration_ms: Date.now() - started,
      stdout: options.fullStdout ? String(error.stdout ?? "") : String(error.stdout ?? "").trim().split("\n").slice(-12).join("\n"),
      stderr: String(error.stderr ?? error.message ?? "").trim().split("\n").slice(-12).join("\n"),
    };
  }
}

function parseStoredZip(buffer) {
  const entries = {};
  let offset = 0;
  while (offset + 30 <= buffer.length) {
    const signature = buffer.readUInt32LE(offset);
    if (signature !== 0x04034b50) break;
    const method = buffer.readUInt16LE(offset + 8);
    const compressedSize = buffer.readUInt32LE(offset + 18);
    const fileNameLength = buffer.readUInt16LE(offset + 26);
    const extraLength = buffer.readUInt16LE(offset + 28);
    const nameStart = offset + 30;
    const nameEnd = nameStart + fileNameLength;
    const dataStart = nameEnd + extraLength;
    const dataEnd = dataStart + compressedSize;
    const fileName = buffer.subarray(nameStart, nameEnd).toString("utf8");
    if (method === 0 && dataEnd <= buffer.length) {
      entries[fileName] = buffer.subarray(dataStart, dataEnd);
    }
    offset = dataEnd;
  }
  return entries;
}

async function parseDownloadZip(download, targetName) {
  const zipPath = path.join(artifactDir, targetName);
  await download.saveAs(zipPath);
  const entries = parseStoredZip(await fs.readFile(zipPath));
  return { zipPath, entries };
}

function findJsonEntry(entries, schema) {
  for (const [name, content] of Object.entries(entries)) {
    if (!name.endsWith(".json")) continue;
    const payload = JSON.parse(content.toString("utf8"));
    if (payload.schema === schema) return { name, payload };
  }
  throw new Error(`No ${schema} JSON entry found`);
}

async function testPaletteLab(browser) {
  const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });
  const targetUrl = pathToFileURL(path.join(repoRoot, "renders", "palettes", "palette01.html")).href;
  await page.goto(targetUrl);
  await page.waitForSelector("[data-palette-lab]");

  const primary = "#1257C4";
  await page.locator('[data-palette-input="primary"]').fill(primary);
  await page.dispatchEvent('[data-palette-input="primary"]', "change");
  await page.locator('[data-palette-input="support"]').fill("#0A8F66");
  await page.dispatchEvent('[data-palette-input="support"]', "change");

  const computedAccent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--dig-accent").trim());
  const diffAccent = await page.locator('[data-palette-token="--dig-accent"]').first().textContent();
  assert(computedAccent.toUpperCase() === primary, `Palette CSS var did not update: ${computedAccent}`);
  assert(diffAccent?.toUpperCase() === primary, `Palette diff token did not update: ${diffAccent}`);

  await page.screenshot({ path: path.join(artifactDir, "palette-lab-mutated.png"), fullPage: true });
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("[data-palette-export]").click(),
  ]);
  const { zipPath, entries } = await parseDownloadZip(download, "palette01-custompalette.zip");
  const { name: jsonEntry, payload } = findJsonEntry(entries, "dig.palette.export.v1");
  assert(payload.tokens["--dig-accent"] === primary, "Palette export did not preserve mutated --dig-accent");
  assert(payload.anchors.primary === primary, "Palette export anchors.primary did not match mutated primary");
  assert(payload.roles.primary_strong, "Palette export missing primary_strong role");

  const jsonPath = path.join(artifactDir, "palette01-custompalette.json");
  await fs.writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  const importResult = run("node", ["bin/dig-ui-skill.mjs", "palette", "import", jsonPath], {
    cwd: repoRoot,
    env: { HOME: tempHome },
  });
  assert(importResult.status === 0, `Palette CLI import failed: ${importResult.stderr || importResult.stdout}`);
  await page.close();

  return {
    target_url: targetUrl,
    mutated_tokens: {
      "--dig-accent": primary,
      "--dig-accent-2": "#0A8F66",
    },
    computed_accent: computedAccent,
    diff_accent: diffAccent,
    zip_path: zipPath,
    json_entry: jsonEntry,
    json_path: jsonPath,
    cli_import: importResult,
  };
}

async function testStyleLab(browser) {
  const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1360, height: 960 } });
  const targetUrl = pathToFileURL(path.join(repoRoot, "renders", "styles", "quant-signal-console.html")).href;
  await page.goto(targetUrl);
  await page.waitForSelector("[data-style-lab]");

  const accent = "#C2185B";
  await page.evaluate((value) => {
    document.documentElement.style.setProperty("--dig-accent", value);
    if (typeof window.refreshTokenVisualizers === "function") window.refreshTokenVisualizers();
  }, accent);
  const computedAccent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--dig-accent").trim());
  assert(computedAccent.toUpperCase() === accent, `Style CSS var did not update: ${computedAccent}`);

  await page.screenshot({ path: path.join(artifactDir, "style-lab-mutated.png"), fullPage: true });
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("[data-style-export]").click(),
  ]);
  const { zipPath, entries } = await parseDownloadZip(download, "quant-signal-console-customstyle.zip");
  const { name: jsonEntry, payload } = findJsonEntry(entries, "dig.style.export.v1");
  assert(payload.tokens["--dig-accent"] === accent, "Style export did not preserve mutated visible --dig-accent");
  assert(payload.css.includes(`--dig-accent: ${accent};`), "Style export CSS did not preserve mutated visible --dig-accent");
  assert(payload.tokens["--dig-signal-paper-bg"], "Style export missing archetype token --dig-signal-paper-bg");
  assert(payload.style_contract.includes("best_for:"), "Style export missing style_contract");

  const jsonPath = path.join(artifactDir, "quant-signal-console-customstyle.json");
  await fs.writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  const importResult = run("node", ["bin/dig-ui-skill.mjs", "style", "import", jsonPath], {
    cwd: repoRoot,
    env: { HOME: tempHome },
  });
  assert(importResult.status === 0, `Style CLI import failed: ${importResult.stderr || importResult.stdout}`);
  const showResult = run("node", ["bin/dig-ui-skill.mjs", "style", "show", "quant-signal-console"], {
    cwd: repoRoot,
    env: { HOME: tempHome },
    fullStdout: true,
  });
  assert(showResult.status === 0 && showResult.stdout.includes('"slug": "quant-signal-console"'), "Style show by slug failed after JSON import");
  await page.close();

  return {
    target_url: targetUrl,
    mutated_tokens: {
      "--dig-accent": accent,
    },
    computed_accent: computedAccent,
    zip_path: zipPath,
    json_entry: jsonEntry,
    json_path: jsonPath,
    cli_import: importResult,
    cli_show: showResult,
  };
}

async function replaceInFile(filePath, regex, replacement) {
  const original = await fs.readFile(filePath, "utf8");
  const updated = original.replace(regex, replacement);
  assert(updated !== original, `Replacement did not change ${filePath}`);
  await fs.writeFile(filePath, updated, "utf8");
}

async function prepareTempRepo() {
  await fs.rm(tempWorkRoot, { recursive: true, force: true });
  await fs.mkdir(tempWorkRoot, { recursive: true });
  await fs.cp(repoRoot, tempRepoRoot, {
    recursive: true,
    filter: (source) => {
      const rel = path.relative(repoRoot, source);
      return !rel.split(path.sep).some((part) => part === ".git" || part === "node_modules");
    },
  });
}

async function testRegenerate() {
  await prepareTempRepo();
  const paletteMd = path.join(tempRepoRoot, "references", "catalogs", "palettes", "palette01.md");
  const paletteHtml = path.join(tempRepoRoot, "renders", "palettes", "palette01.html");
  await replaceInFile(paletteMd, /--dig-accent:\s*#[0-9A-Fa-f]{6};/, "--dig-accent: #13579B;");
  const paletteSync = run("python3", ["sync_renders.py", "palette01"], { cwd: tempRepoRoot });
  assert(paletteSync.status === 0, `Palette regenerate failed: ${paletteSync.stderr || paletteSync.stdout}`);
  const paletteRender = await fs.readFile(paletteHtml, "utf8");
  assert(paletteRender.includes("--dig-accent: #13579B;"), "Palette regenerate did not propagate --dig-accent");

  const styleMd = path.join(tempRepoRoot, "references", "catalogs", "styles", "quant-signal-console.md");
  const styleHtml = path.join(tempRepoRoot, "renders", "styles", "quant-signal-console.html");
  await replaceInFile(styleMd, /--dig-signal-positive:\s*#[0-9A-Fa-f]{6};/, "--dig-signal-positive: #12AB8F;");
  const styleSync = run("python3", ["sync_renders.py", "quant-signal-console"], { cwd: tempRepoRoot });
  assert(styleSync.status === 0, `Style regenerate failed: ${styleSync.stderr || styleSync.stdout}`);
  const styleRender = await fs.readFile(styleHtml, "utf8");
  assert(styleRender.includes("--dig-signal-positive: #12AB8F;"), "Style regenerate did not propagate --dig-signal-positive");

  return {
    temp_repo: tempRepoRoot,
    palette: {
      markdown: paletteMd,
      render: paletteHtml,
      expected_token: "--dig-accent: #13579B;",
      sync: paletteSync,
    },
    style: {
      markdown: styleMd,
      render: styleHtml,
      expected_token: "--dig-signal-positive: #12AB8F;",
      sync: styleSync,
    },
  };
}

async function main() {
  await fs.mkdir(artifactDir, { recursive: true });
  await fs.rm(tempHome, { recursive: true, force: true });
  await fs.mkdir(tempHome, { recursive: true });

  const commandResults = [
    run("node", ["--check", "bin/dig-ui-skill.mjs"]),
    run("node", ["--check", "validate-dig-render-ops.mjs"]),
    run("npm", ["run", "validate:renders"]),
    run("npm", ["run", "validate:catalogs"]),
  ];
  for (const result of commandResults) {
    assert(result.status === 0, `${result.command} failed: ${result.stderr || result.stdout}`);
  }

  const browser = await chromium.launch();
  try {
    const paletteLab = await testPaletteLab(browser);
    const styleLab = await testStyleLab(browser);
    const regenerate = await testRegenerate();
    const evidence = {
      generated_at: new Date().toISOString(),
      repo_root: repoRoot,
      temp_repo_root: tempRepoRoot,
      command_results: commandResults,
      palette_lab: paletteLab,
      style_lab: styleLab,
      regenerate,
    };
    const evidencePath = path.join(artifactDir, "dig-ui-color-style-prodtest-evidence.json");
    await fs.writeFile(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
    console.log(`PASS ${evidencePath}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
