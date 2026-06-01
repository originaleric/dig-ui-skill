#!/usr/bin/env node

import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, "..");

const TARGETS = {
  codex: {
    label: "Codex",
    skillDir: () => path.join(os.homedir(), ".codex", "skills", "dig-ui"),
  },
  cursor: {
    label: "Cursor",
    skillDir: () => path.join(os.homedir(), ".cursor", "skills", "dig-ui"),
  },
  "claude-code": {
    label: "Claude Code",
    skillDir: () => path.join(os.homedir(), ".claude", "skills", "dig-ui"),
  },
};

const TARGET_ALIASES = {
  claude: "claude-code",
};

const SKILL_TOP_LEVEL_FILES = [
  "SKILL.md",
  "README.md",
  "USAGE.md",
  "sync-renders.sh",
  "sync_renders.py",
  "sync_layout_renders.py",
  "validate-dig-layout-preview.mjs",
  "package.json",
];

const SKILL_DIRS = ["references", "assets", "renders", "agents", "react"];

const PROTECTED_RELATIVE_PATHS = new Set(["references/global-rules.local.md"]);

const CURSOR_RULE_TEMPLATE = path.join(
  PACKAGE_ROOT,
  "adapters",
  "cursor",
  "dig-ui.mdc",
);

function printHelp() {
  console.log(`dig-ui-skill — install and update Dig UI skill across AI tools

Usage:
  dig-ui-skill install <target> [options]
  dig-ui-skill update <target> [options]
  dig-ui-skill status

Targets:
  codex         Install to ~/.codex/skills/dig-ui
  cursor        Install to ~/.cursor/skills/dig-ui
  claude-code   Install to ~/.claude/skills/dig-ui (alias: claude)

Options:
  --all                 Install/update all supported targets
  --link                Use symlink instead of copy (good for local dev)
  --source <path>       Source repo path (default: package root)
  --project <path>      Cursor only: also install .cursor/rules/dig-ui.mdc
  -h, --help            Show this help

Examples:
  npx dig-ui-skill install cursor
  npx dig-ui-skill install cursor --project .
  npx dig-ui-skill install --all --source .
  npx dig-ui-skill update codex
  npx dig-ui-skill status
`);
}

function parseArgs(argv) {
  const args = [...argv];
  const options = {
    command: args[0],
    targets: [],
    all: false,
    link: false,
    source: PACKAGE_ROOT,
    project: null,
    help: false,
  };

  if (!options.command || options.command === "-h" || options.command === "--help") {
    options.help = true;
    return options;
  }

  let index = 1;
  while (index < args.length) {
    const arg = args[index];

    if (arg === "--all") {
      options.all = true;
      index += 1;
      continue;
    }

    if (arg === "--link") {
      options.link = true;
      index += 1;
      continue;
    }

    if (arg === "--source") {
      options.source = path.resolve(args[index + 1] ?? "");
      index += 2;
      continue;
    }

    if (arg === "--project") {
      options.project = path.resolve(args[index + 1] ?? process.cwd());
      index += 2;
      continue;
    }

    if (arg === "-h" || arg === "--help") {
      options.help = true;
      return options;
    }

    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    options.targets.push(normalizeTarget(arg));
    index += 1;
  }

  if (options.all) {
    options.targets = Object.keys(TARGETS);
  }

  return options;
}

function normalizeTarget(rawTarget) {
  const normalized = TARGET_ALIASES[rawTarget] ?? rawTarget;
  if (!TARGETS[normalized]) {
    throw new Error(
      `Unknown target "${rawTarget}". Expected one of: ${Object.keys(TARGETS).join(", ")}, claude`,
    );
  }
  return normalized;
}

function readPackageVersion(sourceRoot) {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(sourceRoot, "package.json"), "utf8"),
    );
    return pkg.version ?? "unknown";
  } catch {
    return "unknown";
  }
}

async function pathExists(targetPath) {
  try {
    await fsp.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function removePath(targetPath) {
  if (!(await pathExists(targetPath))) {
    return;
  }

  const stat = await fsp.lstat(targetPath);
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    await fsp.rm(targetPath, { recursive: true, force: true });
    return;
  }

  await fsp.unlink(targetPath);
}

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
}

async function copyFileSafe(sourcePath, destPath) {
  await ensureDir(path.dirname(destPath));
  await fsp.copyFile(sourcePath, destPath);
  const stat = await fsp.stat(sourcePath);
  if (stat.mode & 0o111) {
    await fsp.chmod(destPath, stat.mode);
  }
}

async function copyDirectory(sourceDir, destDir, { preserve = [] } = {}) {
  await ensureDir(destDir);
  const entries = await fsp.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    const protectedMatch = [...preserve].some((item) => {
      const absoluteProtected = path.join(destDir, item);
      return destPath === absoluteProtected;
    });

    if (protectedMatch && (await pathExists(destPath))) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destPath, { preserve });
      continue;
    }

    if (entry.isSymbolicLink()) {
      const linkTarget = await fsp.readlink(sourcePath);
      await fsp.symlink(linkTarget, destPath);
      continue;
    }

    await copyFileSafe(sourcePath, destPath);
  }
}

async function copySkillAssets(sourceRoot, destRoot) {
  for (const fileName of SKILL_TOP_LEVEL_FILES) {
    const sourcePath = path.join(sourceRoot, fileName);
    if (!(await pathExists(sourcePath))) {
      continue;
    }
    await copyFileSafe(sourcePath, path.join(destRoot, fileName));
  }

  for (const dirName of SKILL_DIRS) {
    const sourcePath = path.join(sourceRoot, dirName);
    if (!(await pathExists(sourcePath))) {
      continue;
    }

    const destPath = path.join(destRoot, dirName);
    const preserve = [];

    for (const protectedRelative of PROTECTED_RELATIVE_PATHS) {
      if (protectedRelative.startsWith(`${dirName}/`)) {
        preserve.push(protectedRelative.slice(dirName.length + 1));
      }
    }

    await copyDirectory(sourcePath, destPath, { preserve });
  }
}

async function installSkillTarget(targetKey, sourceRoot, { link = false } = {}) {
  const target = TARGETS[targetKey];
  const destRoot = target.skillDir();

  if (link) {
    await ensureDir(path.dirname(destRoot));
    await removePath(destRoot);
    await fsp.symlink(sourceRoot, destRoot);
    console.log(`Linked ${target.label} skill: ${destRoot} -> ${sourceRoot}`);
    return destRoot;
  }

  await ensureDir(destRoot);

  const localRulesPath = path.join(destRoot, "references", "global-rules.local.md");
  const hadLocalRules = await pathExists(localRulesPath);

  await copySkillAssets(sourceRoot, destRoot);

  console.log(`Installed ${target.label} skill to ${destRoot}`);

  if (hadLocalRules) {
    console.log("  kept existing references/global-rules.local.md");
  } else {
    const examplePath = path.join(
      destRoot,
      "references",
      "global-rules.local.example.md",
    );
    if (await pathExists(examplePath)) {
      console.log(
        "  tip: copy references/global-rules.local.example.md to references/global-rules.local.md for personal overrides",
      );
    }
  }

  return destRoot;
}

async function installCursorProjectRule(projectPath, skillDir) {
  if (!(await pathExists(CURSOR_RULE_TEMPLATE))) {
    throw new Error(`Missing Cursor rule template: ${CURSOR_RULE_TEMPLATE}`);
  }

  const rulesDir = path.join(projectPath, ".cursor", "rules");
  const destRulePath = path.join(rulesDir, "dig-ui.mdc");
  await ensureDir(rulesDir);

  let template = await fsp.readFile(CURSOR_RULE_TEMPLATE, "utf8");
  template = template.replaceAll("{{SKILL_DIR}}", skillDir);

  await fsp.writeFile(destRulePath, template, "utf8");
  console.log(`Installed Cursor project rule: ${destRulePath}`);
}

async function runInstall(options) {
  validateSource(options.source);

  if (options.targets.length === 0 && !options.all) {
    throw new Error("install requires a target (codex, cursor, claude-code) or --all");
  }

  const version = readPackageVersion(options.source);
  console.log(`Source: ${options.source} (v${version})`);
  console.log(`Mode: ${options.link ? "symlink" : "copy"}`);

  if (options.project) {
    if (!options.targets.includes("cursor")) {
      throw new Error(
        "--project is only supported with the cursor target (e.g. install cursor --project .)",
      );
    }

    const nonCursorTargets = options.targets.filter((target) => target !== "cursor");
    if (nonCursorTargets.length > 0) {
      console.warn(
        `Note: --project only installs .cursor/rules/dig-ui.mdc for cursor (${nonCursorTargets.join(", ")} unaffected).`,
      );
    }
  }

  for (const targetKey of options.targets) {
    const destRoot = await installSkillTarget(targetKey, options.source, {
      link: options.link,
    });

    if (targetKey === "cursor" && options.project) {
      await installCursorProjectRule(options.project, destRoot);
    }
  }
}

async function runUpdate(options) {
  options.link = false;
  await runInstall(options);
  console.log("Update complete.");
}

async function getTargetStatus(targetKey) {
  const target = TARGETS[targetKey];
  const skillDir = target.skillDir();
  const installed = await pathExists(skillDir);
  const localRulesPath = path.join(skillDir, "references", "global-rules.local.md");
  const examplePath = path.join(
    skillDir,
    "references",
    "global-rules.local.example.md",
  );

  let version = "-";
  let mode = "-";

  if (installed) {
    version = readPackageVersion(skillDir);
    const stat = await fsp.lstat(skillDir);
    mode = stat.isSymbolicLink() ? "symlink" : "copy";
  }

  return {
    target: targetKey,
    label: target.label,
    installed,
    path: skillDir,
    version,
    mode,
    localRules: installed ? await pathExists(localRulesPath) : false,
    localExample: installed ? await pathExists(examplePath) : false,
  };
}

async function runStatus() {
  console.log("dig-ui-skill status\n");

  for (const targetKey of Object.keys(TARGETS)) {
    const status = await getTargetStatus(targetKey);
    console.log(`${status.label} (${status.target})`);
    console.log(`  installed: ${status.installed ? "yes" : "no"}`);
    console.log(`  path:      ${status.path}`);
    if (status.installed) {
      console.log(`  version:   ${status.version}`);
      console.log(`  mode:      ${status.mode}`);
      console.log(`  local rules: ${status.localRules ? "present" : "missing"}`);
      if (!status.localRules && status.localExample) {
        console.log("  tip: copy references/global-rules.local.example.md to references/global-rules.local.md");
      }
    }
    console.log("");
  }
}

function validateSource(sourceRoot) {
  const skillPath = path.join(sourceRoot, "SKILL.md");
  if (!fs.existsSync(skillPath)) {
    throw new Error(`Invalid source "${sourceRoot}": missing SKILL.md`);
  }
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));

    if (options.help) {
      printHelp();
      return;
    }

    switch (options.command) {
      case "install":
        await runInstall(options);
        break;
      case "update":
        await runUpdate(options);
        break;
      case "status":
        await runStatus();
        break;
      default:
        throw new Error(`Unknown command "${options.command}". Use install, update, or status.`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

await main();
