#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const languageSuffixPattern = /\.(en|zh-CN)\.md$/;

const requiredPaths = [
  "SKILL.en.md",
  "SKILL.zh-CN.md",
  "references/global-rules.en.md",
  "references/global-rules.zh-CN.md",
  "references/dig-read.en.md",
  "references/dig-read.zh-CN.md",
  "references/anti-tells.en.md",
  "references/anti-tells.zh-CN.md",
  "references/preflight.en.md",
  "references/preflight.zh-CN.md",
  "references/shared/dig-read-manifest.yaml",
  "references/shared/layout-manifest.yaml",
  "references/shared/catalog-manifest.yaml",
  "references/shared/block-manifest.yaml",
  "references/dig-read.md",
  "references/render-ops.md",
  "references/local/manifest.yaml",
  "references/local/layout-rules.md",
  "references/local/block-rules.md",
  "references/local/layouts/.gitkeep",
  "references/local/blocks/.gitkeep",
  "references/local/overrides/.gitkeep",
  "references/blocks/README.md",
  "references/anti-tells.md",
  "references/preflight.md",
  "renders/index.html",
  "renders/layouts/index.html",
  "renders/blocks/index.html",
  "validate-dig-block-preview.mjs",
];

const requiredBlockSections = [
  "Use When",
  "Avoid When",
  "Slots",
  "Token Binding",
  "States",
  "Responsive Rules",
  "Accessibility",
  "Anti-Patterns",
  "QA Notes",
];

function exists(rel) {
  return fs.existsSync(path.join(__dirname, rel));
}

function listMarkdownFiles(dirRel) {
  const dir = path.join(__dirname, dirRel);
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(__dirname, full);
    if (entry.isDirectory()) {
      out.push(...listMarkdownFiles(rel));
    } else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
      out.push(rel);
    }
  }
  return out.sort();
}

function stripLanguageSuffix(rel, language) {
  return rel.replace(new RegExp(`\\.${language}\\.md$`), ".md");
}

function listLocalizedMarkdownFiles(dirRel, language) {
  return listMarkdownFiles(dirRel)
    .filter((rel) => rel.endsWith(`.${language}.md`))
    .map((rel) => stripLanguageSuffix(path.relative(dirRel, rel), language))
    .sort();
}

function read(rel) {
  return fs.readFileSync(path.join(__dirname, rel), "utf8");
}

function parseId(content, fallback) {
  const match = content.match(/^id:\s*(.+)$/m) || content.match(/^slug:\s*(.+)$/m);
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : fallback;
}

function extractSection(content, heading) {
  const match = content.match(new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, "m"));
  return match ? match[1].trim() : "";
}

function parseSlots(content) {
  const section = extractSection(content, "Slots");
  return [...section.matchAll(/`([^`]+)`/g)].map((match) => match[1]).sort();
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function fail(message, details = "") {
  return { level: "FAIL", message, details };
}

function warn(message, details = "") {
  return { level: "WARN", message, details };
}

function compareLocaleFiles(kind) {
  const domainDir = `references/${kind}`;
  const enFiles = listLocalizedMarkdownFiles(domainDir, "en");
  const zhFiles = listLocalizedMarkdownFiles(domainDir, "zh-CN");
  const issues = [];
  const zhSet = new Set(zhFiles);
  const enSet = new Set(enFiles);
  for (const file of enFiles) {
    if (!zhSet.has(file)) issues.push(fail(`Missing zh-CN ${kind} counterpart`, file));
  }
  for (const file of zhFiles) {
    if (!enSet.has(file)) issues.push(fail(`Missing en ${kind} counterpart`, file));
  }
  return issues;
}

function parseManifestBlockIds() {
  const content = read("references/shared/block-manifest.yaml");
  const ids = [];
  let inBlocks = false;
  for (const line of content.split("\n")) {
    if (line.trim() === "blocks:") {
      inBlocks = true;
      continue;
    }
    if (!inBlocks) continue;
    const match = line.match(/^\s{4}-\s+([a-z0-9-]+)\s*$/);
    if (match) ids.push(match[1]);
  }
  return ids;
}

function parseManifestCatalogIds() {
  const content = read("references/shared/catalog-manifest.yaml");
  return [...content.matchAll(/^\s{2}-\s+slug:\s+([a-z0-9.-]+)\s*$/gm)].map((match) => match[1]);
}

function validateDigRead() {
  const issues = [];
  const requiredDials = [
    "INFORMATION_DENSITY",
    "BRAND_EXPRESSIVENESS",
    "INTERACTION_ENERGY",
    "OPERATIONAL_CRITICALITY",
  ];
  for (const rel of [
    "references/dig-read.md",
    "references/dig-read.en.md",
    "references/dig-read.zh-CN.md",
  ]) {
    if (!exists(rel)) {
      issues.push(fail("Missing Dig Read language asset", rel));
      continue;
    }
    const content = read(rel);
    for (const dial of requiredDials) {
      if (!content.includes(dial)) {
        issues.push(fail(`${rel} missing dial`, dial));
      }
    }
  }
  return issues;
}

function validateRootLocalizedPairs() {
  const issues = [];
  for (const name of ["global-rules", "dig-read", "anti-tells", "preflight"]) {
    for (const language of ["en", "zh-CN"]) {
      const rel = `references/${name}.${language}.md`;
      if (!exists(rel)) {
        issues.push(fail("Missing root localized asset", rel));
      }
    }
  }
  return issues;
}

function validateBlocks() {
  const issues = [];
  const catalogIds = parseManifestCatalogIds();
  const files = listMarkdownFiles("references/blocks").filter(
    (rel) => !languageSuffixPattern.test(path.basename(rel)),
  );
  const idsFromFiles = new Set();
  for (const rel of files) {
    const content = read(rel);
    const id = parseId(content, path.basename(rel, ".md"));
    const fixtureRel = `references/render-fixtures/blocks/${id}.json`;
    idsFromFiles.add(id);
    for (const section of requiredBlockSections) {
      if (!new RegExp(`^## ${section}\\s*$`, "m").test(content)) {
        issues.push(fail(`Block ${id} missing section`, section));
      }
    }
    if (!exists(fixtureRel)) {
      issues.push(fail(`Block ${id} missing render fixture`, fixtureRel));
    } else {
      try {
        const fixture = readJson(fixtureRel);
        const states = Array.isArray(fixture.states) ? fixture.states : [];
        const examples = Array.isArray(fixture.examples) ? fixture.examples : [];
        const stateSemantics =
          fixture.state_semantics && typeof fixture.state_semantics === "object"
            ? fixture.state_semantics
            : {};
        const stateSet = new Set(states);
        if (fixture.block !== id) {
          issues.push(fail(`Block ${id} fixture block id mismatch`, `${fixtureRel}: ${fixture.block || "(missing)"}`));
        }
        if (!states.length) {
          issues.push(fail(`Block ${id} fixture missing states`, fixtureRel));
        }
        if (!examples.length) {
          issues.push(fail(`Block ${id} fixture missing examples`, fixtureRel));
        }
        if (!Object.keys(stateSemantics).length) {
          issues.push(fail(`Block ${id} fixture missing state_semantics`, fixtureRel));
        }
        for (const example of examples) {
          if (!example.id || !example.title || !example.state) {
            issues.push(fail(`Block ${id} fixture example missing id/title/state`, fixtureRel));
            continue;
          }
          if (!stateSet.has(example.state)) {
            issues.push(fail(`Block ${id} fixture example references unknown state`, `${fixtureRel}: ${example.id} -> ${example.state}`));
          }
        }
        for (const state of states) {
          if (!stateSemantics[state]) {
            issues.push(fail(`Block ${id} fixture missing semantics for state`, `${fixtureRel}: ${state}`));
          }
        }
      } catch (error) {
        issues.push(fail(`Block ${id} fixture is not valid JSON`, `${fixtureRel}: ${error.message}`));
      }
    }
    if (!exists(`renders/blocks/${id}.html`)) {
      issues.push(fail(`Block ${id} missing render`, `renders/blocks/${id}.html`));
    } else {
      const renderRel = `renders/blocks/${id}.html`;
      const render = read(renderRel);
      if (!render.includes(`data-block="${id}"`)) {
        issues.push(fail(`Block ${id} render missing data-block marker`, renderRel));
      }
      if (!render.includes(`data-renderer="${id}"`)) {
        issues.push(fail(`Block ${id} render missing block-specific renderer marker`, renderRel));
      }
      if (!render.includes('data-render-mode="contract"')) {
        issues.push(fail(`Block ${id} render must use block contract page mode`, renderRel));
      }
      if (!render.includes('data-example-id="')) {
        issues.push(fail(`Block ${id} render missing block examples`, renderRel));
      }
      if (render.includes('class="state-card"') || render.includes("class='state-card'")) {
        issues.push(fail(`Block ${id} render still uses legacy state-card matrix`, renderRel));
      }
      if (!render.includes("State semantics")) {
        issues.push(fail(`Block ${id} render missing state semantics table`, renderRel));
      }
      if (render.includes("Primary label") || render.includes("Secondary metadata and helper text.")) {
        issues.push(fail(`Block ${id} render still uses generic placeholder content`, renderRel));
      }
      if (render.includes("No block-specific renderer has been registered.")) {
        issues.push(fail(`Block ${id} render fell back to unknown renderer`, renderRel));
      }
      if (/\bcolor\s*:\s*#/i.test(render)) {
        issues.push(fail(`Block ${id} render contains raw component foreground color`, renderRel));
      }
      if (!render.includes("--dig-danger-text")) {
        issues.push(fail(`Block ${id} render missing danger foreground token`, renderRel));
      }
      if (!render.includes('id="catalogSelect"')) {
        issues.push(fail(`Block ${id} render missing catalog preview select`, renderRel));
      }
      if (!render.includes("window.location.href")) {
        issues.push(fail(`Block ${id} render missing catalog direct-jump behavior`, renderRel));
      }
      if (!render.includes('id="previewCatalogChip"')) {
        issues.push(fail(`Block ${id} render missing preview catalog chip`, renderRel));
      }
      for (const catalogId of catalogIds) {
        if (!render.includes(`option value="${catalogId}"`)) {
          issues.push(fail(`Block ${id} render missing catalog option`, catalogId));
        }
        if (!render.includes(`html[data-catalog="${catalogId}"]`)) {
          issues.push(fail(`Block ${id} render missing catalog token skin`, catalogId));
        }
      }
      for (const slot of parseSlots(content)) {
        if (!render.includes(`data-slot="${slot}"`)) {
          issues.push(fail(`Block ${id} render missing documented slot`, slot));
        }
      }
    }
  }
  const idsFromManifest = new Set(parseManifestBlockIds());
  for (const id of idsFromManifest) {
    if (!idsFromFiles.has(id)) {
      issues.push(fail("Block manifest references missing block file", id));
    }
  }
  for (const id of idsFromFiles) {
    if (!idsFromManifest.has(id)) {
      issues.push(fail("Block file missing from manifest", id));
    }
  }
  return issues;
}

function runLayoutValidator() {
  const result = spawnSync("node", ["validate-dig-layout-preview.mjs", "renders/layouts"], {
    cwd: __dirname,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    return [fail("Layout render validator failed", (result.stdout || "") + (result.stderr || ""))];
  }
  return [];
}

function runBlockPreviewValidator() {
  const result = spawnSync("node", ["validate-dig-block-preview.mjs", "renders/blocks"], {
    cwd: __dirname,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    return [fail("Block render validator failed", (result.stdout || "") + (result.stderr || ""))];
  }
  return [];
}

function main() {
  const issues = [];
  if (exists("references/locales")) {
    issues.push(fail("Legacy language root must not exist", "references/locales"));
  }
  for (const rel of requiredPaths) {
    if (!exists(rel)) issues.push(fail("Missing required render ops asset", rel));
  }
  issues.push(...compareLocaleFiles("layouts"));
  issues.push(...compareLocaleFiles("catalogs"));
  issues.push(...compareLocaleFiles("blocks"));
  issues.push(...compareLocaleFiles("workflows"));
  issues.push(...validateRootLocalizedPairs());
  issues.push(...validateDigRead());
  issues.push(...validateBlocks());
  issues.push(...runLayoutValidator());
  issues.push(...runBlockPreviewValidator());

  const fails = issues.filter((issue) => issue.level === "FAIL");
  const warns = issues.filter((issue) => issue.level === "WARN");

  console.log(`\nDig Render Ops Validator — ${fails.length} FAIL, ${warns.length} WARN\n`);
  for (const issue of issues) {
    console.log(`${issue.level}: ${issue.message}`);
    if (issue.details) console.log(`  ${issue.details.trim()}`);
  }

  if (fails.length) process.exit(1);
}

main();
