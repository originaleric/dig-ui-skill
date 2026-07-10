#!/usr/bin/env node

import fs from "node:fs";
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

const paletteRequiredFrontmatter = {
  kind: "color-palette-catalog",
  category: "palettes",
  token_contract: "palette_v1",
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

function fail(message, details = "") {
  return { level: "FAIL", message, details };
}

function warn(message, details = "") {
  return { level: "WARN", message, details };
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
  }

  return issues;
}

function validateRenderRegistryContract() {
  const issues = [];
  const syncContent = read("sync_renders.py");
  if (!syncContent.includes('"palettes": {"name": "Color Palettes", "items": [], "brands": []}')) {
    issues.push(fail("sync_renders.py missing palettes registry with items + legacy brands"));
  }
  if (!syncContent.includes('"palettes": "site-palette-showcase"')) {
    issues.push(fail("sync_renders.py missing palette render archetype default", "site-palette-showcase"));
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
    "def parse_palette_support_candidates(",
    "def build_palette_lab_section(",
    "palette_candidates = parse_palette_support_candidates(md_content)",
    "primaryStrong",
    "supportStrong",
    "function fallbackCopyText(",
    "async function copyPaletteTokens(",
    "data-palette-lab",
    "data-palette-candidate",
    "function initPaletteLab()",
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
  ]) {
    if (!previewCss.includes(requiredSnippet)) {
      issues.push(fail("assets/catalog-preview.css missing Palette Lab style", requiredSnippet));
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
