#!/usr/bin/env node

import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
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
  "references/color-palette-catalogs.md",
  "references/local/manifest.yaml",
  "references/local/layout-rules.md",
  "references/local/block-rules.md",
  "references/local/layouts/.gitkeep",
  "references/local/blocks/.gitkeep",
  "references/local/styles/.gitkeep",
  "references/local/overrides/.gitkeep",
  "references/catalogs/palettes/.gitkeep",
  "references/blocks/README.md",
  "references/anti-tells.md",
  "references/preflight.md",
  "renders/index.html",
];

const retiredPaths = [
  "renders/layouts",
  "renders/blocks",
  "references/render-fixtures",
  "sync_layout_renders.py",
  "sync_block_renders.py",
  "validate-dig-layout-preview.mjs",
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

const brandV1RequiredTokenRoles = [
  "--dig-bg",
  "--dig-bg-soft",
  "--dig-surface",
  "--dig-surface-strong",
  "--dig-surface-elevated",
  "--dig-text",
  "--dig-text-muted",
  "--dig-text-soft",
  "--dig-accent",
  "--dig-accent-2",
  "--dig-border",
  "--dig-grid-line",
  "--dig-control-bg",
  "--dig-control-bg-hover",
];

const paletteV1AdditionalTokenRoles = [
  "--dig-accent-strong",
  "--dig-accent-2-strong",
  "--dig-border-strong",
];

const styleV1AdditionalTokenRoles = [
  "--dig-accent-strong",
  "--dig-accent-2-strong",
  "--dig-border-strong",
  "--dig-stroke-width",
  "--dig-stroke-width-strong",
  "--dig-shadow-chunky",
  "--dig-motion-bounce",
];

const paletteRequiredFrontmatter = {
  kind: "color-palette-catalog",
  category: "palettes",
  token_contract: "palette_v1",
};

const styleRequiredFrontmatter = {
  kind: "style-catalog",
  category: "styles",
  token_contract: "style_v1",
};

const paletteRequiredAnchors = ["canvas", "ink", "primary", "support"];
const paletteRequiredDerivedRoles = ["surface", "muted", "focus", "disabled", "overlay"];
const paletteRequiredSiteRoles = [
  "page_background",
  "headline",
  "body_text",
  "muted_text",
  "cta_background",
  "cta_text",
  "card_background",
  "card_text",
  "link",
  "illustration_highlight",
  "focus_ring",
  "disabled_text",
  "overlay",
];
const styleRequiredContractMarkers = [
  "best_for:",
  "avoid_for:",
  "mood:",
  "shape_language:",
  "surface_language:",
  "illustration_language:",
  "component_mapping:",
  "motion_language:",
];
const mobileGameCompanionTokenRoles = [
  "--dig-game-sky-start",
  "--dig-game-sky-mid",
  "--dig-game-sky-end",
  "--dig-game-hill-front",
  "--dig-game-hill-mid",
  "--dig-game-hill-back",
  "--dig-game-cloud",
  "--dig-mascot-primary",
  "--dig-mascot-secondary",
  "--dig-mascot-face",
  "--dig-mascot-belly",
  "--dig-mission-surface",
  "--dig-coach-surface-start",
  "--dig-coach-surface-end",
  "--dig-gear-surface",
  "--dig-gear-icon-surface",
  "--dig-game-on-accent",
];
const signalOpsConsoleTokenRoles = [
  "--dig-signal-paper-bg",
  "--dig-signal-paper-panel",
  "--dig-signal-paper-border",
  "--dig-signal-terminal-bg",
  "--dig-signal-terminal-panel",
  "--dig-signal-terminal-border",
  "--dig-signal-terminal-text",
  "--dig-signal-terminal-muted",
  "--dig-signal-terminal-tape-bg",
  "--dig-signal-positive",
  "--dig-signal-negative",
  "--dig-signal-warning",
  "--dig-signal-info",
  "--dig-signal-grid-line",
  "--dig-signal-tape-bg",
  "--dig-signal-node",
  "--dig-signal-node-active",
  "--dig-signal-book-bid",
  "--dig-signal-book-ask",
  "--dig-signal-chart-line",
  "--dig-signal-chart-fill",
];

const styleBaseTokenRoles = [
  ...brandV1RequiredTokenRoles,
  ...styleV1AdditionalTokenRoles,
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

function listHtmlFiles(dirRel) {
  const dir = path.join(__dirname, dirRel);
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(__dirname, full);
    if (entry.isDirectory()) {
      out.push(...listHtmlFiles(rel));
    } else if (entry.name.endsWith(".html")) {
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

function fail(message, details = "") {
  return { level: "FAIL", message, details };
}

function warn(message, details = "") {
  return { level: "WARN", message, details };
}

function fixtureTokenValue(token) {
  if (token.includes("stroke-width")) return "2px";
  if (token === "--dig-shadow-chunky") return "0 12px 0 rgba(17, 17, 17, 0.18)";
  if (token === "--dig-motion-bounce") return "cubic-bezier(.2, .9, .2, 1.1)";
  if (token.includes("text") || token.includes("border") || token.includes("grid")) return "#111111";
  if (token.includes("bg") || token.includes("surface") || token.includes("control")) return "#F8F6EF";
  if (token.includes("accent")) return "#3CC7A5";
  return "#A7B8C4";
}

function buildStyleJsonFixture(overrides = {}) {
  const archetype = overrides.archetype || "token-sheet";
  const archetypeTokens = {
    "mobile-game-companion": mobileGameCompanionTokenRoles,
    "signal-ops-console": signalOpsConsoleTokenRoles,
  }[archetype] ?? [];
  const tokens = Object.fromEntries(
    [...styleBaseTokenRoles, ...archetypeTokens].map((token) => [token, fixtureTokenValue(token)]),
  );
  return {
    schema: "dig.style.export.v1",
    token_contract: "style_v1",
    slug: "validator-style",
    export_id: "validator-style.customstyle-20260712-160000",
    name: { zh: "Validator Style", en: "Validator Style" },
    description: { zh: "Validator fixture", en: "Validator fixture" },
    render: { archetype },
    style_contract: [
      "best_for:",
      "  - validator",
      "avoid_for:",
      "  - production",
      "mood:",
      "  - test",
      "shape_language:",
      "  stroke: test",
      "surface_language:",
      "  canvas: test",
      "illustration_language:",
      "  assets: test",
      "component_mapping:",
      "  sample: test",
      "motion_language:",
      "  transition: test",
    ].join("\n"),
    tokens,
    css: Object.entries(tokens).map(([token, value]) => `${token}: ${value};`).join("\n"),
    ...overrides,
  };
}

function buildStyleMarkdownFixture(overrides = {}) {
  const archetype = overrides.archetype || "signal-ops-console";
  const slug = overrides.slug || "validator-md-style";
  const archetypeTokens = {
    "mobile-game-companion": mobileGameCompanionTokenRoles,
    "signal-ops-console": signalOpsConsoleTokenRoles,
  }[archetype] ?? [];
  const tokens = overrides.tokens ?? Object.fromEntries(
    [...styleBaseTokenRoles, ...archetypeTokens].map((token) => [token, fixtureTokenValue(token)]),
  );
  const css = Object.entries(tokens).map(([token, value]) => `${token}: ${value};`).join("\n");
  return `---
slug: ${slug}
name: Validator Markdown Style
kind: style-catalog
category: styles
token_contract: style_v1
render:
  archetype: ${archetype}
---

# Validator Markdown Style

## Style Contract

\`\`\`yaml
best_for:
  - validator
avoid_for:
  - production
mood:
  - test
shape_language:
  stroke: test
surface_language:
  canvas: test
illustration_language:
  assets: test
component_mapping:
  sample: test
motion_language:
  transition: test
\`\`\`

## Dig UI CSS Tokens

\`\`\`css
${css}
\`\`\`
`;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split("\n")) {
    const fieldMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*?)\s*$/);
    if (fieldMatch) {
      fields[fieldMatch[1]] = fieldMatch[2].replace(/^["']|["']$/g, "");
    }
  }
  return fields;
}

function hasExplicitRenderArchetype(content) {
  return /\nrender:\s*\n(?:[^\n]*\n)*?\s*archetype:\s*["']?[^"'\n]+/.test(content);
}

function normalizeYamlScalar(value) {
  return value.trim().replace(/^["']|["']$/g, "").trim();
}

function hasMeaningfulValue(value) {
  const normalized = normalizeYamlScalar(value || "");
  return normalized !== "" && normalized !== "null" && normalized !== "~";
}

function normalizeHexColor(value) {
  const normalized = normalizeYamlScalar(value || "");
  if (/^#[0-9a-fA-F]{3}$/.test(normalized)) {
    return `#${normalized.slice(1).split("").map((char) => char + char).join("").toUpperCase()}`;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return normalized.toUpperCase();
  }
  return "";
}

function parseYamlSectionMap(content, sectionName) {
  const lines = content.split("\n");
  const values = {};
  let inSection = false;
  let baseIndent = 0;
  for (const line of lines) {
    const sectionMatch = line.match(new RegExp(`^(\\s*)${sectionName}:\\s*$`));
    if (sectionMatch) {
      inSection = true;
      baseIndent = sectionMatch[1].length;
      continue;
    }
    if (!inSection) continue;
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    if (line.trim() && indent <= baseIndent) break;
    const keyMatch = line.match(/^\s+([a-zA-Z0-9_-]+):\s*(.*?)\s*$/);
    if (keyMatch) values[keyMatch[1]] = keyMatch[2];
  }
  return values;
}

function parsePaletteSupportCandidateMaps(content) {
  const lines = content.split("\n");
  const items = [];
  let current = null;
  let inCandidates = false;
  let inSupport = false;
  let candidatesIndent = 0;
  let supportIndent = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    if (!inCandidates) {
      const match = line.match(/^(\s*)candidates:\s*$/);
      if (match) {
        inCandidates = true;
        candidatesIndent = match[1].length;
      }
      continue;
    }
    if (indent <= candidatesIndent) break;
    if (!inSupport) {
      if (/^\s*support:\s*$/.test(line)) {
        inSupport = true;
        supportIndent = indent;
      }
      continue;
    }
    if (indent <= supportIndent) break;

    const itemMatch = line.match(/^\s*-\s*(?:(label|value|strong):\s*(.*?)\s*)?$/);
    if (itemMatch) {
      if (current) items.push(current);
      current = {};
      if (itemMatch[1]) current[itemMatch[1]] = itemMatch[2];
      continue;
    }

    const fieldMatch = line.match(/^\s+(label|value|strong):\s*(.*?)\s*$/);
    if (current && fieldMatch) {
      current[fieldMatch[1]] = fieldMatch[2];
    }
  }

  if (current) items.push(current);
  return items;
}

function validatePaletteSupportCandidates(content, slug) {
  const issues = [];
  const candidates = parsePaletteSupportCandidateMaps(content);
  candidates.forEach((candidate, index) => {
    if (!normalizeHexColor(candidate.value)) {
      issues.push(fail(`Palette ${slug} support candidate missing valid value hex`, `candidate ${index + 1}`));
    }
    if (!normalizeHexColor(candidate.strong)) {
      issues.push(fail(`Palette ${slug} support candidate missing valid strong hex`, `candidate ${index + 1}`));
    }
  });
  return issues;
}

function extractSectionOutsideFences(content, heading) {
  const lines = content.split("\n");
  const target = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`);
  const nextHeading = /^##\s+/;
  const collected = [];
  let collecting = false;
  let inFence = false;
  let fenceChar = "";
  let fenceLength = 0;

  for (const line of lines) {
    const fenceMatch = line.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceChar = marker[0];
        fenceLength = marker.length;
      } else if (marker[0] === fenceChar && marker.length >= fenceLength) {
        inFence = false;
        fenceChar = "";
        fenceLength = 0;
      }
    }

    if (!inFence && target.test(line)) {
      collecting = true;
      continue;
    }
    if (collecting && !inFence && nextHeading.test(line)) {
      break;
    }
    if (collecting) collected.push(line);
  }

  return collected.join("\n").trim();
}

function extractFencedCodeBlockFromSection(content, heading, language) {
  const section = extractSectionOutsideFences(content, heading);
  if (!section) return "";
  const match = section.match(new RegExp(`\`\`\`${language}\\s*\\n([\\s\\S]*?)\\n\`\`\``));
  return match ? match[1].trim() : "";
}

function parseCssTokens(content) {
  const tokens = {};
  for (const match of content.matchAll(/(--dig-[\w-]+)\s*:\s*([^;]*);/g)) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

function parseTokenContracts(content) {
  const contracts = {};
  let current = null;
  let inTokenContracts = false;
  let inRequired = false;
  for (const line of content.split("\n")) {
    if (line.trim() === "token_contracts:") {
      inTokenContracts = true;
      continue;
    }
    if (!inTokenContracts) continue;
    if (/^[a-zA-Z0-9_-]+:/.test(line)) break;
    const contractMatch = line.match(/^  ([a-zA-Z0-9_-]+):\s*$/);
    if (contractMatch) {
      current = contractMatch[1];
      contracts[current] = { required_token_roles: [] };
      inRequired = false;
      continue;
    }
    if (!current) continue;
    const extendsMatch = line.match(/^    extends:\s*([a-zA-Z0-9_-]+)\s*$/);
    if (extendsMatch) {
      contracts[current].extends = extendsMatch[1];
      continue;
    }
    if (line.match(/^    required_token_roles:\s*$/)) {
      inRequired = true;
      continue;
    }
    const tokenMatch = line.match(/^      -\s+(--dig-[\w-]+)\s*$/);
    if (inRequired && tokenMatch) {
      contracts[current].required_token_roles.push(tokenMatch[1]);
    } else if (line.trim() && !line.startsWith("      -")) {
      inRequired = false;
    }
  }
  return contracts;
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
    for (const slot of parseSlots(content)) {
      if (!/^[a-z][a-z0-9_-]*$/.test(slot)) {
        issues.push(fail(`Block ${id} has unstable slot id`, slot));
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

function validateCatalogManifest() {
  const issues = [];
  const content = read("references/shared/catalog-manifest.yaml");
  const contracts = parseTokenContracts(content);

  if (!contracts.brand_v1) {
    issues.push(fail("Catalog manifest missing token contract", "brand_v1"));
  } else {
    for (const token of brandV1RequiredTokenRoles) {
      if (!contracts.brand_v1.required_token_roles.includes(token)) {
        issues.push(fail("brand_v1 missing required token role", token));
      }
    }
    for (const token of paletteV1AdditionalTokenRoles) {
      if (contracts.brand_v1.required_token_roles.includes(token)) {
        issues.push(fail("brand_v1 must not include palette-only token role", token));
      }
    }
  }

  if (!contracts.palette_v1) {
    issues.push(fail("Catalog manifest missing token contract", "palette_v1"));
  } else {
    if (contracts.palette_v1.extends !== "brand_v1") {
      issues.push(fail("palette_v1 must extend brand_v1", contracts.palette_v1.extends || "missing extends"));
    }
    for (const token of paletteV1AdditionalTokenRoles) {
      if (!contracts.palette_v1.required_token_roles.includes(token)) {
        issues.push(fail("palette_v1 missing required token role", token));
      }
    }
  }

  if (!contracts.style_v1) {
    issues.push(fail("Catalog manifest missing token contract", "style_v1"));
  } else {
    if (contracts.style_v1.extends !== "brand_v1") {
      issues.push(fail("style_v1 must extend brand_v1", contracts.style_v1.extends || "missing extends"));
    }
    for (const token of styleV1AdditionalTokenRoles) {
      if (!contracts.style_v1.required_token_roles.includes(token)) {
        issues.push(fail("style_v1 missing required token role", token));
      }
    }
  }

  for (const slug of ["dig", "mono", "editorial", "wise", "apple"]) {
    const match = content.match(new RegExp(`- slug: ${slug}\\n([\\s\\S]*?)(?=\\n  - slug:|\\n#|$)`));
    if (!match) {
      issues.push(fail("Catalog manifest missing core catalog", slug));
      continue;
    }
    const block = match[1];
    if (!block.includes("kind: brand-catalog")) {
      issues.push(fail(`Core catalog ${slug} missing kind`, "brand-catalog"));
    }
    if (!block.includes("token_contract: brand_v1")) {
      issues.push(fail(`Core catalog ${slug} missing token contract`, "brand_v1"));
    }
  }

  if (!content.includes("palettes:") || !content.includes("kind: color-palette-catalog")) {
    issues.push(fail("Catalog manifest missing palettes category contract", "category palettes / kind color-palette-catalog"));
  }
  if (!content.includes("styles:") || !content.includes("kind: style-catalog")) {
    issues.push(fail("Catalog manifest missing styles category contract", "category styles / kind style-catalog"));
  }
  if (!content.includes("archetype_token_contracts:") || !content.includes("mobile-game-companion:")) {
    issues.push(fail("Catalog manifest missing mobile-game-companion archetype token contract"));
  } else {
    for (const token of mobileGameCompanionTokenRoles) {
      if (!content.includes(`- ${token}`)) {
        issues.push(fail("mobile-game-companion contract missing token role", token));
      }
    }
  }
  if (!content.includes("signal-ops-console:")) {
    issues.push(fail("Catalog manifest missing signal-ops-console archetype token contract"));
  } else {
    for (const token of signalOpsConsoleTokenRoles) {
      if (!content.includes(`- ${token}`)) {
        issues.push(fail("signal-ops-console contract missing token role", token));
      }
    }
  }

  return issues;
}

function validatePaletteCatalogs() {
  const issues = [];
  const paletteDir = path.join(__dirname, "references/catalogs/palettes");
  if (!fs.existsSync(paletteDir)) {
    issues.push(fail("Missing palette catalog directory", "references/catalogs/palettes"));
    return issues;
  }

  const files = listMarkdownFiles("references/catalogs/palettes").filter(
    (rel) => !languageSuffixPattern.test(path.basename(rel)),
  );
  for (const rel of files) {
    const content = read(rel);
    const fields = parseFrontmatter(content);
    const parentDir = path.dirname(rel);
    const fileSlug = path.basename(rel, ".md");
    const slug = fields.slug || fileSlug;

    if (parentDir !== "references/catalogs/palettes") {
      issues.push(fail(`Palette ${slug} must be a direct palettes catalog file`, rel));
    }
    if (fields.slug !== fileSlug) {
      issues.push(fail(`Palette ${slug} slug must match filename`, `${fields.slug || "missing slug"} !== ${fileSlug}`));
    }
    if (!/^palette\d{2,}$/.test(slug)) {
      issues.push(fail(`Palette ${slug} slug must use stable numeric form`, "palette01, palette02, ..."));
    }
    for (const [key, expected] of Object.entries(paletteRequiredFrontmatter)) {
      if (fields[key] !== expected) {
        issues.push(fail(`Palette ${slug} frontmatter ${key} must be '${expected}'`, fields[key] || "missing"));
      }
    }

    const contractBlock = extractFencedCodeBlockFromSection(content, "Palette Contract", "yaml");
    if (!contractBlock) {
      issues.push(fail(`Palette ${slug} missing canonical palette contract`, "## Palette Contract fenced yaml block"));
    } else {
      const anchors = parseYamlSectionMap(contractBlock, "anchors");
      for (const key of paletteRequiredAnchors) {
        if (!Object.hasOwn(anchors, key)) {
          issues.push(fail(`Palette ${slug} missing anchor`, key));
        } else if (!hasMeaningfulValue(anchors[key])) {
          issues.push(fail(`Palette ${slug} anchor has empty value`, key));
        }
      }

      const derivedRoles = parseYamlSectionMap(contractBlock, "derived_roles");
      for (const key of paletteRequiredDerivedRoles) {
        if (!Object.hasOwn(derivedRoles, key)) {
          issues.push(fail(`Palette ${slug} missing derived role`, key));
        } else if (!hasMeaningfulValue(derivedRoles[key])) {
          issues.push(fail(`Palette ${slug} derived role has empty value`, key));
        }
      }

      const siteRoles = parseYamlSectionMap(contractBlock, "site_roles");
      for (const key of paletteRequiredSiteRoles) {
        if (!Object.hasOwn(siteRoles, key)) {
          issues.push(fail(`Palette ${slug} missing site role`, key));
        } else if (!hasMeaningfulValue(siteRoles[key])) {
          issues.push(fail(`Palette ${slug} site role has empty value`, key));
        }
      }

      issues.push(...validatePaletteSupportCandidates(contractBlock, slug));
    }

    const tokenBlock = extractFencedCodeBlockFromSection(content, "Dig UI CSS Tokens", "css");
    if (!tokenBlock) {
      issues.push(fail(`Palette ${slug} missing canonical CSS token block`, "## Dig UI CSS Tokens fenced css block"));
    } else {
      const tokens = parseCssTokens(tokenBlock);
      const requiredTokens = [...brandV1RequiredTokenRoles, ...paletteV1AdditionalTokenRoles];
      for (const token of requiredTokens) {
        if (!Object.hasOwn(tokens, token)) {
          issues.push(fail(`Palette ${slug} missing token role`, token));
        } else if (!hasMeaningfulValue(tokens[token])) {
          issues.push(fail(`Palette ${slug} token role has empty value`, token));
        }
      }
    }
  }

  return issues;
}

function validatePaletteCatalogPlacement() {
  const issues = [];
  const files = listMarkdownFiles("references/catalogs").filter(
    (rel) => !languageSuffixPattern.test(path.basename(rel)),
  );

  for (const rel of files) {
    const fields = parseFrontmatter(read(rel));
    const parentDir = path.dirname(rel);
    const paletteMarkers = Object.entries(paletteRequiredFrontmatter).filter(
      ([key, expected]) => fields[key] === expected,
    );

    if (paletteMarkers.length && parentDir !== "references/catalogs/palettes") {
      issues.push(
        fail(
          "Palette catalog contract must live under references/catalogs/palettes",
          `${rel} declares ${paletteMarkers.map(([key]) => key).join(", ")}`,
        ),
      );
    }

    const styleMarkers = Object.entries(styleRequiredFrontmatter).filter(
      ([key, expected]) => fields[key] === expected,
    );

    if (styleMarkers.length && parentDir !== "references/catalogs/styles") {
      issues.push(
        fail(
          "Style catalog contract must live under references/catalogs/styles",
          `${rel} declares ${styleMarkers.map(([key]) => key).join(", ")}`,
        ),
      );
    }
  }

  return issues;
}

function validateStyleCatalogs() {
  const issues = [];
  const styleDir = path.join(__dirname, "references/catalogs/styles");
  if (!fs.existsSync(styleDir)) {
    issues.push(fail("Missing style catalog directory", "references/catalogs/styles"));
    return issues;
  }

  const files = listMarkdownFiles("references/catalogs/styles").filter(
    (rel) => !languageSuffixPattern.test(path.basename(rel)),
  );
  for (const rel of files) {
    const content = read(rel);
    const fields = parseFrontmatter(content);
    const parentDir = path.dirname(rel);
    const fileSlug = path.basename(rel, ".md");
    const slug = fields.slug || fileSlug;

    if (parentDir !== "references/catalogs/styles") {
      issues.push(fail(`Style ${slug} must be a direct styles catalog file`, rel));
    }
    if (fields.slug !== fileSlug) {
      issues.push(fail(`Style ${slug} slug must match filename`, `${fields.slug || "missing slug"} !== ${fileSlug}`));
    }
    for (const [key, expected] of Object.entries(styleRequiredFrontmatter)) {
      if (fields[key] !== expected) {
        issues.push(fail(`Style ${slug} frontmatter ${key} must be '${expected}'`, fields[key] || "missing"));
      }
    }

    const contractBlock = extractFencedCodeBlockFromSection(content, "Style Contract", "yaml");
    if (!contractBlock) {
      issues.push(fail(`Style ${slug} missing canonical style contract`, "## Style Contract fenced yaml block"));
    } else {
      for (const marker of styleRequiredContractMarkers) {
        if (!contractBlock.includes(marker)) {
          issues.push(fail(`Style ${slug} missing style contract marker`, marker));
        }
      }
    }
    if (!hasExplicitRenderArchetype(content)) {
      issues.push(fail(`Style ${slug} missing explicit render archetype`, "render.archetype is required for style catalogs"));
    }

    const tokenBlock = extractFencedCodeBlockFromSection(content, "Dig UI CSS Tokens", "css");
    if (!tokenBlock) {
      issues.push(fail(`Style ${slug} missing canonical CSS token block`, "## Dig UI CSS Tokens fenced css block"));
    } else {
      const tokens = parseCssTokens(tokenBlock);
      const usesMobileGameCompanion = content.includes("archetype: mobile-game-companion");
      const usesSignalOpsConsole = content.includes("archetype: signal-ops-console");
      const requiredTokens = [
        ...brandV1RequiredTokenRoles,
        ...styleV1AdditionalTokenRoles,
        ...(usesMobileGameCompanion ? mobileGameCompanionTokenRoles : []),
        ...(usesSignalOpsConsole ? signalOpsConsoleTokenRoles : []),
      ];
      for (const token of requiredTokens) {
        if (!Object.hasOwn(tokens, token)) {
          issues.push(fail(`Style ${slug} missing token role`, token));
        } else if (!hasMeaningfulValue(tokens[token])) {
          issues.push(fail(`Style ${slug} token role has empty value`, token));
        }
      }
    }
  }

  return issues;
}

function validateInstallerCanonicalCatalogPassthrough() {
  const issues = [];
  const binContent = read("bin/dig-ui-skill.mjs");
  const copyIndex = binContent.indexOf("await copySkillAssets(sourceRoot, destRoot);");
  const languageIndex = binContent.indexOf("await applyLanguagePack(sourceRoot, destRoot, language);");

  if (!binContent.includes('const SKILL_DIRS = ["references"')) {
    issues.push(fail("Installer must copy references before language overlay", "SKILL_DIRS should include references"));
  }
  if (copyIndex === -1 || languageIndex === -1 || copyIndex > languageIndex) {
    issues.push(
      fail(
        "Installer language pack must overlay after full asset copy",
        "canonical palette/style catalogs rely on copySkillAssets before applyLanguagePack",
      ),
    );
  }
  if (!binContent.includes("LOCALIZED_MARKDOWN_PATTERN.test(path.basename(filePath))")) {
    issues.push(
      fail(
        "Installer localized cleanup must only remove localized markdown",
        "canonical palettes/styles must survive removeLocalizedSourceFiles",
      ),
    );
  }
  for (const requiredSnippet of [
    "USER_STYLES_DIR",
    "LOCAL_STYLES_RELATIVE",
    "dig-ui-skill style <action>",
    "dig.style.export.v1",
    "async function resolveStyleAssetPath",
    "async function findStyleAssetPathBySlug",
    "function getRequiredStyleTokenRoles",
    "function assertStyleTokenContract",
    "function parseStyleCssTokens",
    "async function runStyleImport",
    "async function syncStylesIntoSkillDir",
    "await syncStylesIntoSkillDir(destRoot)",
    "case \"style\":",
  ]) {
    if (!binContent.includes(requiredSnippet)) {
      issues.push(fail("Installer missing customstyle workflow support", requiredSnippet));
    }
  }
  for (const rel of [
    "references/catalogs/palettes/palette01.md",
    "references/catalogs/styles/cozy-arcade.md",
    "references/catalogs/styles/quant-signal-console.md",
  ]) {
    if (!exists(rel)) {
      issues.push(fail("Missing canonical catalog passthrough asset", rel));
    }
  }
  return issues;
}

function runSkillCli(args, homeDir) {
  return childProcess.execFileSync(
    process.execPath,
    [path.join(__dirname, "bin", "dig-ui-skill.mjs"), ...args],
    {
      cwd: __dirname,
      env: { ...process.env, HOME: homeDir },
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
}

function validateCustomStyleCliWorkflow() {
  const issues = [];
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "dig-ui-style-cli-"));
  try {
    const validFixturePath = path.join(tempRoot, "validator-style.json");
    fs.writeFileSync(validFixturePath, `${JSON.stringify(buildStyleJsonFixture(), null, 2)}\n`, "utf8");

    runSkillCli(["style", "import", validFixturePath], tempRoot);
    const showOutput = runSkillCli(["style", "show", "validator-style"], tempRoot);
    if (!showOutput.includes('"slug": "validator-style"')) {
      issues.push(fail("style show <slug> must resolve Style Lab JSON imports by payload slug", showOutput.slice(0, 200)));
    }
    if (!showOutput.includes('"export_id": "validator-style.customstyle-20260712-160000"')) {
      issues.push(fail("style show <slug> returned the wrong customstyle asset", "expected Style Lab export_id fixture"));
    }

    const validMarkdownFixturePath = path.join(tempRoot, "validator-md-style.md");
    fs.writeFileSync(validMarkdownFixturePath, buildStyleMarkdownFixture(), "utf8");
    runSkillCli(["style", "import", validMarkdownFixturePath], tempRoot);
    const markdownShowOutput = runSkillCli(["style", "show", "validator-md-style"], tempRoot);
    if (!markdownShowOutput.includes("slug: validator-md-style")) {
      issues.push(fail("style show <slug> must resolve valid Markdown customstyles", markdownShowOutput.slice(0, 200)));
    }

    const invalidFixturePath = path.join(tempRoot, "invalid-style.json");
    fs.writeFileSync(
      invalidFixturePath,
      `${JSON.stringify(buildStyleJsonFixture({ tokens: { "--dig-bg": "#ffffff" } }), null, 2)}\n`,
      "utf8",
    );
    try {
      runSkillCli(["style", "import", invalidFixturePath], tempRoot);
      issues.push(fail("style import must reject incomplete style_v1 token payloads", "invalid-style.json imported successfully"));
    } catch (error) {
      const output = `${error.stdout || ""}${error.stderr || ""}`;
      if (!output.includes("missing token role")) {
        issues.push(fail("style import incomplete-token failure should identify missing token roles", output.slice(0, 240)));
      }
    }

    const unusableJsonTokens = Object.fromEntries(styleBaseTokenRoles.map((token) => [token, "~"]));
    const unusableJsonFixturePath = path.join(tempRoot, "unusable-style.json");
    fs.writeFileSync(
      unusableJsonFixturePath,
      `${JSON.stringify(buildStyleJsonFixture({ slug: "unusable-json-style", tokens: unusableJsonTokens }), null, 2)}\n`,
      "utf8",
    );
    try {
      runSkillCli(["style", "import", unusableJsonFixturePath], tempRoot);
      issues.push(fail("style import must reject unusable JSON style_v1 token values", "unusable-style.json imported successfully"));
    } catch (error) {
      const output = `${error.stdout || ""}${error.stderr || ""}`;
      if (!output.includes("missing token role") && !output.includes("missing Dig tokens")) {
        issues.push(fail("style import unusable JSON-token failure should identify missing token roles", output.slice(0, 240)));
      }
    }

    const invalidMarkdownFixturePath = path.join(tempRoot, "invalid-style.md");
    fs.writeFileSync(
      invalidMarkdownFixturePath,
      buildStyleMarkdownFixture({ slug: "invalid-md-style", tokens: { "--dig-bg": "#ffffff" } }),
      "utf8",
    );
    try {
      runSkillCli(["style", "import", invalidMarkdownFixturePath], tempRoot);
      issues.push(fail("style import must reject incomplete Markdown style_v1 token payloads", "invalid-style.md imported successfully"));
    } catch (error) {
      const output = `${error.stdout || ""}${error.stderr || ""}`;
      if (!output.includes("missing token role")) {
        issues.push(fail("style import incomplete Markdown-token failure should identify missing token roles", output.slice(0, 240)));
      }
    }

    const unusableMarkdownTokens = Object.fromEntries(
      [...styleBaseTokenRoles, ...signalOpsConsoleTokenRoles].map((token) => [token, "~"]),
    );
    const unusableMarkdownFixturePath = path.join(tempRoot, "unusable-style.md");
    fs.writeFileSync(
      unusableMarkdownFixturePath,
      buildStyleMarkdownFixture({ slug: "unusable-md-style", tokens: unusableMarkdownTokens }),
      "utf8",
    );
    try {
      runSkillCli(["style", "import", unusableMarkdownFixturePath], tempRoot);
      issues.push(fail("style import must reject unusable Markdown style_v1 token values", "unusable-style.md imported successfully"));
    } catch (error) {
      const output = `${error.stdout || ""}${error.stderr || ""}`;
      if (!output.includes("missing token role") && !output.includes("missing Dig tokens")) {
        issues.push(fail("style import unusable Markdown-token failure should identify missing token roles", output.slice(0, 240)));
      }
    }
  } catch (error) {
    issues.push(fail("customstyle CLI workflow validation crashed", error.message));
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
  return issues;
}

function validateRenderRegistryContract() {
  const issues = [];
  const syncContent = read("sync_renders.py");
  if (!syncContent.includes('"palettes": {"name": "Color Palettes", "items": [], "brands": []}')) {
    issues.push(fail("sync_renders.py missing palettes registry with items + legacy brands"));
  }
  if (!syncContent.includes('"styles": {"name": "Style Catalogs", "items": [], "brands": []}')) {
    issues.push(fail("sync_renders.py missing styles registry with items + legacy brands"));
  }
  if (!syncContent.includes('"palettes": "site-palette-showcase"')) {
    issues.push(fail("sync_renders.py missing palette render archetype default", "site-palette-showcase"));
  }
  if (!syncContent.includes('"styles": "token-sheet"')) {
    issues.push(fail("sync_renders.py style render archetype default must be neutral", "token-sheet"));
  }
  for (const requiredHelper of ["parse_existing_catalog_data", "merge_catalog_data", "write_catalog_registry"]) {
    if (!syncContent.includes(`def ${requiredHelper}(`)) {
      issues.push(fail("sync_renders.py missing target-safe registry helper", requiredHelper));
    }
  }
  if (!syncContent.includes("target_catalog=target_catalog")) {
    issues.push(fail("sync_renders.py registry update must receive target_catalog for merge writes"));
  }
  for (const requiredSnippet of [
    "PALETTE_REQUIRED_FRONTMATTER",
    "BRAND_V1_REQUIRED_TOKEN_ROLES",
    "PALETTE_V1_ADDITIONAL_TOKEN_ROLES",
    "PALETTE_REQUIRED_ANCHORS",
    "PALETTE_REQUIRED_DERIVED_ROLES",
    "PALETTE_REQUIRED_SITE_ROLES",
    "def validate_palette_contract(",
    "extract_fenced_code_block_from_section(md_content, \"Palette Contract\", \"yaml\")",
    "extract_fenced_code_block_from_section(md_content, \"Dig UI CSS Tokens\", \"css\")",
    "validate_palette_contract(md_content, category_slug, brand_slug, rel_path)",
    '"kind": "color-palette-catalog"',
    '"category": "palettes"',
    '"token_contract": "palette_v1"',
    "DEFAULT_PALETTE_SUPPORT_CANDIDATES",
    "STYLE_REQUIRED_FRONTMATTER",
    "STYLE_V1_ADDITIONAL_TOKEN_ROLES",
    "STYLE_REQUIRED_CONTRACT_MARKERS",
    "MOBILE_GAME_COMPANION_TOKEN_ROLES",
    "SIGNAL_OPS_CONSOLE_TOKEN_ROLES",
    "def is_light_color(",
    "def parse_render_setting(",
    "color-scheme: light dark;",
    "def parse_palette_support_candidates(",
    "def build_palette_lab_section(",
    '"kind": "style-catalog"',
    '"category": "styles"',
    '"token_contract": "style_v1"',
    "mobile-game-companion",
    "signal-ops-console",
    "render.archetype is required for style catalogs",
    "palette_candidates = parse_palette_support_candidates(md_content)",
    "primaryStrong",
    "supportStrong",
    "function fallbackCopyText(",
    "async function copyPaletteTokens(",
    "data-palette-lab",
    "data-palette-candidate",
    "function initPaletteLab()",
    "function buildStyleExportPayload(",
    "function parseStyleTokenCss(",
    "function buildStyleTokenCss(",
    "const styleTokenCss = lab.getAttribute('data-style-token-block')",
    "const styleCss = buildStyleTokenCss(styleTokens, styleTokenCss)",
    "tokens: styleTokens",
    "function downloadStyleZip(",
    "function initStyleLab()",
    "dig.style.export.v1",
    "data-style-lab",
    "navigator.clipboard.writeText",
  ]) {
    if (!syncContent.includes(requiredSnippet)) {
      issues.push(fail("sync_renders.py missing palette write-gate contract", requiredSnippet));
    }
  }

  const previewCss = read("assets/catalog-preview.css");
  for (const requiredSnippet of [
    ".palette-lab-shell",
    ".palette-lab-row",
    ".palette-candidate",
    ".palette-copy-btn[data-copy-state=\"error\"]",
    ".palette-token-diff",
    ".style-lab-shell",
    ".style-export-btn[data-export-state=\"success\"]",
  ]) {
    if (!previewCss.includes(requiredSnippet)) {
      issues.push(fail("assets/catalog-preview.css missing Palette Lab style", requiredSnippet));
    }
  }
  for (const requiredSnippet of [
    ".signal-dual-shell",
    ".signal-paper",
    ".signal-terminal",
    ".signal-topology",
    ".topology-map",
    ".signal-book",
    ".distribution-plot",
    ".depth-plot",
  ]) {
    if (!previewCss.includes(requiredSnippet)) {
      issues.push(fail("assets/catalog-preview.css missing Signal Ops style", requiredSnippet));
    }
  }

  const quantSignalRender = read("renders/styles/quant-signal-console.html");
  if (!quantSignalRender.includes("color-scheme: light dark;")) {
    issues.push(fail("quant-signal-console render must advertise dual color scheme", "color-scheme: light dark;"));
  }
  for (const requiredSnippet of [
    "function parseStyleTokenCss(",
    "function buildStyleTokenCss(",
    "const styleTokenCss = lab.getAttribute('data-style-token-block')",
    "const styleCss = buildStyleTokenCss(styleTokens, styleTokenCss)",
    "tokens: styleTokens",
    "--dig-signal-paper-bg",
  ]) {
    if (!quantSignalRender.includes(requiredSnippet)) {
      issues.push(fail("quant-signal-console render must export complete customstyle tokens", requiredSnippet));
    }
  }
  if (quantSignalRender.includes("const styleCss = styleTokenCss ||")) {
    issues.push(fail("quant-signal-console render must rebuild CSS from final style token payload", "const styleCss = styleTokenCss ||"));
  }
  if (quantSignalRender.includes("tokens: collectStyleTokens()")) {
    issues.push(fail("quant-signal-console render must not export only visible token table values", "tokens: collectStyleTokens()"));
  }
  for (const requiredSnippet of [
    "relationship graph simulation",
    "EDGE DISTRIBUTION · 24H",
    "bid ask ladder",
    "LIQUIDITY DEPTH",
  ]) {
    if (!quantSignalRender.includes(requiredSnippet)) {
      issues.push(fail("quant-signal-console render must use semantic Signal Ops chart modules", requiredSnippet));
    }
  }
  for (const rel of listHtmlFiles("renders/styles")) {
    const styleRender = read(rel);
    if (/body::before\s*\{[\s\S]*?#52525b[\s\S]*?background-size:\s*8px\s+8px;[\s\S]*?\}/.test(styleRender)) {
      issues.push(fail("Style render contains legacy hard-coded body::before background override", rel));
    }
  }

  const indexContent = read("renders/index.html");
  if (!indexContent.includes("function getCatalogItems(cat)")) {
    issues.push(fail("renders/index.html must read catalog items with brands fallback", "getCatalogItems(cat)"));
  }

  const dataMatch = indexContent.match(/const catalogData = (\{[\s\S]*?\});\s*function getCatalogItems/);
  if (!dataMatch) {
    issues.push(fail("renders/index.html missing parseable catalogData registry"));
  } else {
    try {
      const catalogData = JSON.parse(dataMatch[1]);
      const palettes = catalogData.palettes;
      if (!palettes) {
        issues.push(fail("renders/index.html catalogData missing palettes group"));
      } else {
        if (palettes.name !== "Color Palettes") {
          issues.push(fail("renders/index.html palettes group has wrong name", palettes.name || "missing name"));
        }
        if (!Array.isArray(palettes.items)) {
          issues.push(fail("renders/index.html palettes group missing items array"));
        }
        if (!Array.isArray(palettes.brands)) {
          issues.push(fail("renders/index.html palettes group missing legacy brands array"));
        }
      }
      const styles = catalogData.styles;
      if (!styles) {
        issues.push(fail("renders/index.html catalogData missing styles group"));
      } else {
        if (styles.name !== "Style Catalogs") {
          issues.push(fail("renders/index.html styles group has wrong name", styles.name || "missing name"));
        }
        if (!Array.isArray(styles.items)) {
          issues.push(fail("renders/index.html styles group missing items array"));
        }
        if (!Array.isArray(styles.brands)) {
          issues.push(fail("renders/index.html styles group missing legacy brands array"));
        }
      }
      for (const [category, group] of Object.entries(catalogData)) {
        if (Array.isArray(group.items) && Array.isArray(group.brands)) {
          const itemSlugs = group.items.map((item) => item.slug).join(",");
          const brandSlugs = group.brands.map((item) => item.slug).join(",");
          if (itemSlugs !== brandSlugs) {
            issues.push(warn(`${category} items and legacy brands differ`, "items is the source of truth"));
          }
        }
      }
    } catch (error) {
      issues.push(fail("Could not parse renders/index.html catalogData", error.message));
    }
  }

  return issues;
}

function main() {
  const issues = [];
  if (exists("references/locales")) {
    issues.push(fail("Legacy language root must not exist", "references/locales"));
  }
  for (const rel of requiredPaths) {
    if (!exists(rel)) issues.push(fail("Missing required render ops asset", rel));
  }
  for (const rel of retiredPaths) {
    if (exists(rel)) issues.push(fail("Retired layout/block render asset must not exist", rel));
  }
  issues.push(...compareLocaleFiles("layouts"));
  issues.push(...compareLocaleFiles("catalogs"));
  issues.push(...compareLocaleFiles("blocks"));
  issues.push(...compareLocaleFiles("workflows"));
  issues.push(...validateRootLocalizedPairs());
  issues.push(...validateDigRead());
  issues.push(...validateBlocks());
  issues.push(...validateCatalogManifest());
  issues.push(...validatePaletteCatalogPlacement());
  issues.push(...validatePaletteCatalogs());
  issues.push(...validateStyleCatalogs());
  issues.push(...validateInstallerCanonicalCatalogPassthrough());
  issues.push(...validateCustomStyleCliWorkflow());
  issues.push(...validateRenderRegistryContract());

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
