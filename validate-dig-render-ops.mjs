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
  const files = listMarkdownFiles("references/blocks").filter(
    (rel) => !languageSuffixPattern.test(path.basename(rel)),
  );
  const idsFromFiles = new Set();
  for (const rel of files) {
    const content = read(rel);
    const id = parseId(content, path.basename(rel, ".md"));
    idsFromFiles.add(id);
    for (const section of requiredBlockSections) {
      if (!new RegExp(`^## ${section}\\s*$`, "m").test(content)) {
        issues.push(fail(`Block ${id} missing section`, section));
      }
    }
    if (!exists(`renders/blocks/${id}.html`)) {
      issues.push(fail(`Block ${id} missing render`, `renders/blocks/${id}.html`));
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
