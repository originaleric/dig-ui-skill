#!/usr/bin/env node

import fs from "node:fs";
import fsp from "node:fs/promises";
import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
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
  "SKILL.en.md",
  "SKILL.zh-CN.md",
  "README.md",
  "README.zh-CN.md",
  "USAGE.md",
  "USAGE.zh-CN.md",
  "INSTALL.md",
  "INSTALL.zh-CN.md",
  "LICENSE",
  "sync-renders.sh",
  "sync_renders.py",
  "validate-dig-catalog-preview.mjs",
  "validate-dig-render-ops.mjs",
  "package.json",
];

const SKILL_DIRS = ["references", "assets", "renders", "agents", "adapters", "bin"];

const RETIRED_TOP_LEVEL_FILES = [
  "sync_layout_renders.py",
  "validate-dig-layout-preview.mjs",
];

const SUPPORTED_LANGUAGES = new Set(["en", "zh-CN"]);
const DEFAULT_LANGUAGE = "zh-CN";
const LANGUAGE_RECORD = "dig-ui-language.json";
const LOCALIZED_MARKDOWN_PATTERN = /\.(en|zh-CN)\.md$/;

const USER_CONFIG_DIR = path.join(os.homedir(), ".config", "dig-ui-skill");
const USER_LOCAL_RULES_PATH = path.join(USER_CONFIG_DIR, "global-rules.local.md");
const USER_PALETTES_DIR = path.join(USER_CONFIG_DIR, "palettes");
const USER_STYLES_DIR = path.join(USER_CONFIG_DIR, "styles");
const LOCAL_RULES_RELATIVE = path.join("references", "global-rules.local.md");
const LOCAL_PALETTES_RELATIVE = path.join("references", "local", "palettes");
const LOCAL_STYLES_RELATIVE = path.join("references", "local", "styles");

const PROTECTED_RELATIVE_PATHS = new Set([
  "references/global-rules.local.md",
  LOCAL_PALETTES_RELATIVE,
  LOCAL_STYLES_RELATIVE,
]);
const SKIP_COPY_RELATIVE_PATHS = new Set([
  "references/global-rules.local.md",
  LOCAL_PALETTES_RELATIVE,
  LOCAL_STYLES_RELATIVE,
]);
const SKIP_COPY_FILE_NAMES = new Set([".DS_Store"]);

const LOCAL_RULE_SECTIONS = [
  "Layout / Components Consistency",
  "Header / Topbar",
  "Footer",
  "Sidebar / Navigation",
  "Main Content / Page Sections",
  "Toolbars / Filters / Actions",
  "Collections / Lists / Tables / Grids",
  "Cards / Panels / Empty States",
  "Forms / Settings Rows",
  "Responsive Behavior",
  "CSS / Primitive Discipline",
  "Buttons / Form Controls",
  "i18n",
  "Dark / Light Theme",
  "Select (HTML Preview / React)",
  "Interaction / Icons",
];

const STYLE_BRAND_REQUIRED_TOKEN_ROLES = [
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

const STYLE_V1_ADDITIONAL_TOKEN_ROLES = [
  "--dig-accent-strong",
  "--dig-accent-2-strong",
  "--dig-border-strong",
  "--dig-stroke-width",
  "--dig-stroke-width-strong",
  "--dig-shadow-chunky",
  "--dig-motion-bounce",
];

const STYLE_ARCHETYPE_TOKEN_ROLES = {
  "mobile-game-companion": [
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
  ],
  "signal-ops-console": [
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
  ],
};

const CURSOR_RULE_TEMPLATE = path.join(
  PACKAGE_ROOT,
  "adapters",
  "cursor",
  "dig-ui.mdc",
);

function printHelp() {
  console.log(`dig-ui-skill — install and update Dig UI skill across AI tools

Usage:
  dig-ui-skill run --input-json <path> --output-json <path>
  dig-ui-skill install <target> [options]
  dig-ui-skill update <target> [options]
  dig-ui-skill render <catalogs|layouts|blocks|all>
  dig-ui-skill validate renders
  dig-ui-skill local <action> [options]
  dig-ui-skill palette <action> [options]
  dig-ui-skill style <action> [options]
  dig-ui-skill init-local [options]
  dig-ui-skill sync-local <target> [options]
  dig-ui-skill import-local <target> [options]
  dig-ui-skill status

Targets:
  codex         Install to ~/.codex/skills/dig-ui
  cursor        Install to ~/.cursor/skills/dig-ui
  claude-code   Install to ~/.claude/skills/dig-ui (alias: claude)

User config (local rules source of truth):
  ~/.config/dig-ui-skill/global-rules.local.md
  ~/.config/dig-ui-skill/palettes/
  ~/.config/dig-ui-skill/styles/

Local actions:
  local path                         Print the user local rules path
  local show                         Print user local rules
  local init                         Create user local rules from the example
  local sync [target|--all]          Sync user local rules to installed tools
  local add --section <heading> <bullet>
                                     Add a preference bullet under a canonical section

Palette actions:
  palette path                       Print the user local palettes directory
  palette list                       List imported user palettes
  palette import <json|zip> [target|--all]
                                     Import an exported custom palette into user config
  palette sync [target|--all]        Sync user palettes into installed skill local assets
  palette show <id-or-file>          Print an imported user palette JSON

Style actions:
  style path                         Print the user local styles directory
  style list                         List imported user styles
  style import <md|json|zip> [target|--all]
                                     Import a custom style into user config
  style sync [target|--all]          Sync user styles into installed skill local assets
  style show <id-or-file>            Print an imported user style asset

Options:
  --input-json <path>    Read DigKit ui.design bridge input JSON
  --output-json <path>   Write DigKit ui.design bridge output JSON
  --all                 Install/update/sync all supported targets
  --link                Use symlink instead of copy for skill install (local dev)
  --link-local          Use symlink instead of copy when syncing local rules
  --no-sync             With local add, write only; do not sync to installed tools
  --with-local          After update, sync user local rules to targets
  --from-config         On conflict, overwrite target with user config
  --from-target         On conflict, import target local rules into user config
  --backup              Before overwrite, create a .backup file
  --skip-conflicts      Skip conflicting targets and continue
  --source <path>       Source repo path (default: package root)
  --project <path>      Cursor only: also install .cursor/rules/dig-ui.mdc
  --lang <en|zh-CN>     Install one language (default: zh-CN; updates reuse installed language when present)
  -h, --help            Show this help

Examples:
  dig-ui-skill run --input-json input.json --output-json output.json
  npx dig-ui-skill install cursor
  npx dig-ui-skill install cursor --lang en
  npx dig-ui-skill install codex --lang zh-CN
  npx dig-ui-skill install cursor --project .
  npx dig-ui-skill install --all --source .
  npx dig-ui-skill update --all --with-local --from-config
  npx dig-ui-skill init-local
  npx dig-ui-skill sync-local --all --from-config
  npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
  npx dig-ui-skill local show
  npx dig-ui-skill palette import ~/Downloads/palette01.custompalette-20260710-120000.zip
  npx dig-ui-skill palette sync --all
  npx dig-ui-skill palette list
  npx dig-ui-skill style import ~/Downloads/my-console-style.md
  npx dig-ui-skill style sync --all
  npx dig-ui-skill style list
  npx dig-ui-skill import-local cursor
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
    linkLocal: false,
    withLocal: false,
    fromConfig: false,
    fromTarget: false,
    backup: false,
    noSync: false,
    skipConflicts: false,
    source: PACKAGE_ROOT,
    project: null,
    lang: null,
    inputJson: null,
    outputJson: null,
    localAction: null,
    section: null,
    values: [],
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

    if (arg === "--link-local") {
      options.linkLocal = true;
      index += 1;
      continue;
    }

    if (arg === "--with-local") {
      options.withLocal = true;
      index += 1;
      continue;
    }

    if (arg === "--no-sync") {
      options.noSync = true;
      index += 1;
      continue;
    }

    if (arg === "--from-config") {
      options.fromConfig = true;
      index += 1;
      continue;
    }

    if (arg === "--from-target") {
      options.fromTarget = true;
      index += 1;
      continue;
    }

    if (arg === "--backup") {
      options.backup = true;
      index += 1;
      continue;
    }

    if (arg === "--skip-conflicts") {
      options.skipConflicts = true;
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

    if (arg === "--lang") {
      options.lang = normalizeLanguage(args[index + 1] ?? "");
      index += 2;
      continue;
    }

    if (arg === "--input-json") {
      options.inputJson = path.resolve(args[index + 1] ?? "");
      index += 2;
      continue;
    }

    if (arg === "--output-json") {
      options.outputJson = path.resolve(args[index + 1] ?? "");
      index += 2;
      continue;
    }

    if (arg === "--section") {
      options.section = args[index + 1] ?? "";
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

    if ((options.command === "local" || options.command === "palette" || options.command === "style") && !options.localAction) {
      options.localAction = arg;
    } else if (options.command === "local" || options.command === "palette" || options.command === "style") {
      options.values.push(arg);
    } else if (options.command === "render" || options.command === "validate") {
      options.targets.push(arg);
    } else {
      options.targets.push(normalizeTarget(arg));
    }
    index += 1;
  }

  if (options.all && options.command !== "render" && options.command !== "validate") {
    options.targets = Object.keys(TARGETS);
  }

  return options;
}

function normalizeLanguage(rawLang) {
  const lang = rawLang.trim();
  if (!SUPPORTED_LANGUAGES.has(lang)) {
    throw new Error(`Unsupported language "${rawLang}". Expected: en, zh-CN`);
  }
  return lang;
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

async function readInstalledLanguage(destRoot) {
  const recordPath = path.join(destRoot, LANGUAGE_RECORD);
  try {
    const record = JSON.parse(await fsp.readFile(recordPath, "utf8"));
    if (SUPPORTED_LANGUAGES.has(record.language)) {
      return record.language;
    }
  } catch {
    // Fall through to default.
  }
  return null;
}

async function resolveInstallLanguage(destRoot, options) {
  if (options.lang) {
    return options.lang;
  }
  if (await pathExists(destRoot)) {
    const installed = await readInstalledLanguage(destRoot);
    if (installed) {
      return installed;
    }
  }
  return DEFAULT_LANGUAGE;
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

function normalizeHexColor(rawValue) {
  const value = String(rawValue ?? "").trim();
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    return `#${value
      .slice(1)
      .split("")
      .map((char) => char + char)
      .join("")
      .toUpperCase()}`;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    return value.toUpperCase();
  }
  return "";
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

function getTargetLocalRulesPath(targetKey) {
  return path.join(TARGETS[targetKey].skillDir(), LOCAL_RULES_RELATIVE);
}

async function readFileIfExists(filePath) {
  if (!(await pathExists(filePath))) {
    return null;
  }
  return fsp.readFile(filePath, "utf8");
}

async function filesContentEqual(pathA, pathB) {
  const contentA = await readFileIfExists(pathA);
  const contentB = await readFileIfExists(pathB);
  if (contentA === null && contentB === null) {
    return true;
  }
  if (contentA === null || contentB === null) {
    return false;
  }
  return contentA === contentB;
}

async function isSymlinkTo(filePath, expectedTarget) {
  if (!(await pathExists(filePath))) {
    return false;
  }
  const stat = await fsp.lstat(filePath);
  if (!stat.isSymbolicLink()) {
    return false;
  }
  const linkTarget = await fsp.readlink(filePath);
  return (
    path.resolve(path.dirname(filePath), linkTarget) ===
    path.resolve(expectedTarget)
  );
}

async function backupFile(filePath) {
  const backupPath = `${filePath}.backup`;
  await fsp.copyFile(filePath, backupPath);
  return backupPath;
}

async function copyOrLinkLocalRules(sourcePath, destPath, { link = false } = {}) {
  await ensureDir(path.dirname(destPath));
  if (await pathExists(destPath)) {
    await removePath(destPath);
  }

  if (link) {
    await fsp.symlink(sourcePath, destPath);
    return;
  }

  await fsp.copyFile(sourcePath, destPath);
}

async function runInitLocal(options) {
  validateSource(options.source);
  const examplePath = path.join(
    options.source,
    "references",
    "global-rules.local.example.md",
  );

  if (!(await pathExists(examplePath))) {
    throw new Error(`Missing example file: ${examplePath}`);
  }

  await ensureDir(USER_CONFIG_DIR);

  if (await pathExists(USER_LOCAL_RULES_PATH)) {
    console.log(`Already exists: ${USER_LOCAL_RULES_PATH}`);
    console.log("Skipped (will not overwrite existing file).");
    return;
  }

  await fsp.copyFile(examplePath, USER_LOCAL_RULES_PATH);
  console.log(`Created: ${USER_LOCAL_RULES_PATH}`);
  console.log("Edit this file as your personal rules source of truth.");
  console.log("Run `dig-ui-skill sync-local --all --from-config` to sync to all tools.");
}

async function syncLocalToTarget(targetKey, options) {
  const target = TARGETS[targetKey];
  const targetPath = getTargetLocalRulesPath(targetKey);
  const configPath = USER_LOCAL_RULES_PATH;
  const configExists = await pathExists(configPath);
  const targetExists = await pathExists(targetPath);

  if (options.fromTarget) {
    if (!targetExists) {
      console.warn(`${target.label}: skipped — no local rules at ${targetPath}`);
      return { status: "skipped", reason: "no-target" };
    }

    if (configExists && !(await filesContentEqual(configPath, targetPath))) {
      if (options.backup) {
        const backup = await backupFile(configPath);
        console.log(`  backed up config to ${backup}`);
      }
    }

    await ensureDir(USER_CONFIG_DIR);
    await fsp.copyFile(targetPath, configPath);
    console.log(`${target.label}: imported to ${configPath}`);
    return { status: "imported" };
  }

  if (!configExists) {
    console.warn(`${target.label}: skipped — user config not found`);
    console.warn(`  Run \`dig-ui-skill init-local\` to create ${configPath}`);
    return { status: "skipped", reason: "no-config" };
  }

  if (options.linkLocal && (await isSymlinkTo(targetPath, configPath))) {
    console.log(`${target.label}: already linked to user config`);
    return { status: "synced" };
  }

  if (
    !options.linkLocal &&
    targetExists &&
    (await filesContentEqual(configPath, targetPath))
  ) {
    const stat = await fsp.lstat(targetPath);
    if (!stat.isSymbolicLink()) {
      console.log(`${target.label}: already in sync`);
      return { status: "synced" };
    }
  }

  // Safe-by-default: content differs → conflict unless --from-config.
  // Never infer "newer" from mtime (unreliable after copy/unpack).
  if (targetExists && !(await filesContentEqual(configPath, targetPath))) {
    if (!options.fromConfig) {
      if (options.skipConflicts) {
        console.warn(`${target.label}: conflict skipped (files differ)`);
        return { status: "skipped", reason: "conflict" };
      }

      console.warn(`${target.label}: conflict — config and target differ`);
      console.warn(`  config: ${configPath}`);
      console.warn(`  target: ${targetPath}`);
      console.warn(
        "  Use --from-config to overwrite, --from-target to import, or --skip-conflicts",
      );
      return { status: "conflict" };
    }

    if (options.backup) {
      const backup = await backupFile(targetPath);
      console.log(`  backed up target to ${backup}`);
    }
  }

  await copyOrLinkLocalRules(configPath, targetPath, { link: options.linkLocal });
  const mode = options.linkLocal ? "linked" : "synced";
  console.log(`${target.label}: ${mode} ${configPath} -> ${targetPath}`);
  return { status: "synced" };
}

function resolveSyncTargets(options) {
  if (options.all) {
    return Object.keys(TARGETS);
  }

  if (options.targets.length === 0) {
    throw new Error("sync-local requires a target (codex, cursor, claude-code) or --all");
  }

  return options.targets;
}

async function runSyncLocal(options) {
  const targets = resolveSyncTargets(options);
  let conflicts = 0;

  console.log(`User config: ${USER_LOCAL_RULES_PATH}`);
  console.log(`Mode: ${options.linkLocal ? "symlink" : "copy"}`);
  console.log("");

  for (const targetKey of targets) {
    const result = await syncLocalToTarget(targetKey, options);
    if (result.status === "conflict") {
      conflicts += 1;
    }
  }

  if (conflicts > 0) {
    process.exitCode = 1;
  }
}

async function runImportLocal(options) {
  if (options.targets.length !== 1) {
    throw new Error("import-local requires exactly one target (codex, cursor, claude-code)");
  }

  options.fromTarget = true;
  await runSyncLocal(options);
}

function normalizeLocalSection(section) {
  const trimmed = (section ?? "").trim();
  if (!trimmed) {
    throw new Error("local add requires --section <canonical heading>");
  }

  const matched = LOCAL_RULE_SECTIONS.find(
    (candidate) => candidate.toLowerCase() === trimmed.toLowerCase(),
  );
  if (!matched) {
    throw new Error(
      `Unknown local rules section "${section}". Expected one of:\n  ${LOCAL_RULE_SECTIONS.join("\n  ")}`,
    );
  }

  return matched;
}

function normalizeBullet(rawBullet) {
  const text = rawBullet.join(" ").trim();
  if (!text) {
    throw new Error("local add requires a preference bullet");
  }

  return text.replace(/^\s*[-*]\s+/, "").trim();
}

function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

function createLocalRulesDocument() {
  return `# Dig UI Global Rules — Local Override

Personal preferences for Dig UI generation. This file is the user source of truth and should not be committed to shared repositories.

Use canonical English section headings from \`references/global-rules.md\`; bullets may be written in any language.
`;
}

function addBulletToMarkdownSection(content, section, bullet) {
  const normalizedContent = ensureTrailingNewline(content.trim() ? content : createLocalRulesDocument());
  const bulletLine = `- ${bullet}`;
  const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingPattern = new RegExp(`^## ${escapedSection}\\s*$`, "m");
  const headingMatch = normalizedContent.match(headingPattern);

  if (!headingMatch || headingMatch.index === undefined) {
    return {
      content: `${normalizedContent}\n## ${section}\n\n${bulletLine}\n`,
      added: true,
    };
  }

  const sectionStart = headingMatch.index;
  const afterHeadingIndex = sectionStart + headingMatch[0].length;
  const nextHeadingMatch = normalizedContent
    .slice(afterHeadingIndex)
    .match(/\n## .+$/m);
  const sectionEnd =
    nextHeadingMatch && nextHeadingMatch.index !== undefined
      ? afterHeadingIndex + nextHeadingMatch.index
      : normalizedContent.length;

  const beforeSectionEnd = normalizedContent.slice(0, sectionEnd);
  const sectionBody = normalizedContent.slice(afterHeadingIndex, sectionEnd);
  const afterSection = normalizedContent.slice(sectionEnd);
  const existingBullets = new Set(
    sectionBody
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).trim().toLowerCase()),
  );

  if (existingBullets.has(bullet.toLowerCase())) {
    return { content: normalizedContent, added: false };
  }

  const separator = beforeSectionEnd.endsWith("\n\n")
    ? ""
    : beforeSectionEnd.endsWith("\n")
      ? "\n"
      : "\n\n";

  return {
    content: `${beforeSectionEnd}${separator}${bulletLine}\n${afterSection}`,
    added: true,
  };
}

async function runLocalAdd(options) {
  const section = normalizeLocalSection(options.section);
  const bullet = normalizeBullet(options.values);

  await ensureDir(USER_CONFIG_DIR);
  const existing = (await readFileIfExists(USER_LOCAL_RULES_PATH)) ?? "";
  const result = addBulletToMarkdownSection(existing, section, bullet);

  if (!result.added) {
    console.log("Skipped duplicate preference");
    console.log(`  section: ${section}`);
    console.log(`  file: ${USER_LOCAL_RULES_PATH}`);
    return;
  }

  await fsp.writeFile(USER_LOCAL_RULES_PATH, result.content, "utf8");
  console.log("Added local preference");
  console.log(`  section: ${section}`);
  console.log(`  file: ${USER_LOCAL_RULES_PATH}`);

  if (options.noSync) {
    console.log("  synced: no (--no-sync)");
    return;
  }

  const syncOptions = {
    ...options,
    all: options.all || options.targets.length === 0,
    fromConfig: true,
    targets: options.targets,
  };
  await runSyncLocal(syncOptions);
}

async function runLocalShow() {
  const content = await readFileIfExists(USER_LOCAL_RULES_PATH);
  if (content === null) {
    console.log(`No local rules found: ${USER_LOCAL_RULES_PATH}`);
    console.log("Run `dig-ui-skill local init` to create one.");
    return;
  }

  process.stdout.write(content);
  if (!content.endsWith("\n")) {
    process.stdout.write("\n");
  }
}

async function runLocalCommand(options) {
  const action = options.localAction;
  switch (action) {
    case "path":
      console.log(USER_LOCAL_RULES_PATH);
      break;
    case "show":
      await runLocalShow();
      break;
    case "init":
      await runInitLocal(options);
      break;
    case "sync":
      await runSyncLocal({
        ...options,
        all: options.all || options.values.length === 0,
        targets: options.values.map(normalizeTarget),
        fromConfig: true,
      });
      break;
    case "add":
      await runLocalAdd(options);
      break;
    default:
      throw new Error(
        "local requires an action: path, show, init, sync, or add",
      );
  }
}

function sanitizePaletteAssetName(rawName) {
  const cleaned = String(rawName || "")
    .trim()
    .replace(/\.json$/i, "")
    .replace(/\.zip$/i, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || `custompalette-${new Date().toISOString().replace(/[:.]/g, "-")}`;
}

async function uniquePaletteAssetPath(baseName) {
  await ensureDir(USER_PALETTES_DIR);
  let candidate = path.join(USER_PALETTES_DIR, `${baseName}.json`);
  let index = 2;
  while (await pathExists(candidate)) {
    candidate = path.join(USER_PALETTES_DIR, `${baseName}-${index}.json`);
    index += 1;
  }
  return candidate;
}

function parseStoredZipJson(buffer, sourcePath) {
  let offset = 0;
  while (offset + 30 <= buffer.length) {
    const signature = buffer.readUInt32LE(offset);
    if (signature !== 0x04034b50) {
      break;
    }
    const method = buffer.readUInt16LE(offset + 8);
    const compressedSize = buffer.readUInt32LE(offset + 18);
    const fileNameLength = buffer.readUInt16LE(offset + 26);
    const extraLength = buffer.readUInt16LE(offset + 28);
    const nameStart = offset + 30;
    const nameEnd = nameStart + fileNameLength;
    const dataStart = nameEnd + extraLength;
    const dataEnd = dataStart + compressedSize;
    const fileName = buffer.subarray(nameStart, nameEnd).toString("utf8");

    if (fileName.toLowerCase().endsWith(".json")) {
      if (method !== 0) {
        throw new Error(`Unsupported compressed palette JSON in ${sourcePath}. Exported Dig palettes use stored ZIP entries.`);
      }
      return JSON.parse(buffer.subarray(dataStart, dataEnd).toString("utf8"));
    }

    offset = dataEnd;
  }
  throw new Error(`No palette JSON found in ${sourcePath}`);
}

async function readPalettePayload(sourcePath) {
  const absolutePath = path.resolve(sourcePath);
  const buffer = await fsp.readFile(absolutePath);
  if (absolutePath.toLowerCase().endsWith(".zip")) {
    return parseStoredZipJson(buffer, absolutePath);
  }
  return JSON.parse(buffer.toString("utf8"));
}

function validatePalettePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Palette payload must be a JSON object");
  }
  if (payload.schema !== "dig.palette.export.v1") {
    throw new Error("Palette payload schema must be dig.palette.export.v1");
  }
  if (payload.token_contract !== "palette_v1") {
    throw new Error("Palette payload token_contract must be palette_v1");
  }

  const normalized = {
    ...payload,
    anchors: { ...(payload.anchors ?? {}) },
    roles: { ...(payload.roles ?? {}) },
    tokens: { ...(payload.tokens ?? {}) },
  };
  const roleToToken = {
    "anchors.canvas": "--dig-bg",
    "anchors.ink": "--dig-text",
    "anchors.primary": "--dig-accent",
    "roles.primary_strong": "--dig-accent-strong",
    "anchors.support": "--dig-accent-2",
    "roles.support_strong": "--dig-accent-2-strong",
  };

  for (const [rolePath, tokenName] of Object.entries(roleToToken)) {
    const [group, key] = rolePath.split(".");
    const roleValue = normalizeHexColor(normalized[group]?.[key]);
    const tokenValue = normalizeHexColor(normalized.tokens?.[tokenName]);
    if (!roleValue) {
      throw new Error(`Palette payload missing valid ${rolePath} hex`);
    }
    if (!tokenValue) {
      throw new Error(`Palette payload missing valid tokens.${tokenName} hex`);
    }
    if (roleValue !== tokenValue) {
      throw new Error(`Palette payload mismatch: ${rolePath} (${roleValue}) must equal tokens.${tokenName} (${tokenValue})`);
    }
    normalized[group][key] = roleValue;
    normalized.tokens[tokenName] = tokenValue;
  }

  normalized.css = Object.entries(roleToToken)
    .map(([, tokenName]) => `${tokenName}: ${normalized.tokens[tokenName]};`)
    .join("\n");
  return normalized;
}

async function runPaletteImport(options) {
  const sourcePath = options.values[0];
  if (!sourcePath) {
    throw new Error("palette import requires a JSON or ZIP file path");
  }

  const payload = validatePalettePayload(await readPalettePayload(sourcePath));
  const importedPayload = {
    ...payload,
    user_asset: {
      ...(payload.user_asset ?? {}),
      imported_at: new Date().toISOString(),
      source_file: path.resolve(sourcePath),
    },
  };
  const baseName = sanitizePaletteAssetName(payload.export_id || payload.slug || path.basename(sourcePath));
  const destPath = await uniquePaletteAssetPath(baseName);
  await fsp.writeFile(destPath, `${JSON.stringify(importedPayload, null, 2)}\n`, "utf8");
  console.log("Imported local palette");
  console.log(`  file: ${destPath}`);
  console.log(`  name: ${payload.name?.zh || payload.name?.en || payload.slug || baseName}`);
  console.log(`  primary: ${payload.anchors.primary}`);
  console.log(`  support: ${payload.anchors.support}`);

  const syncTargets = collectPaletteSyncTargets(options, options.values.slice(1));
  if (syncTargets.length > 0) {
    console.log("");
    await runPaletteSync({ ...options, all: false, targets: syncTargets });
  }
}

async function runPaletteList() {
  await ensureDir(USER_PALETTES_DIR);
  const entries = (await fsp.readdir(USER_PALETTES_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();
  if (entries.length === 0) {
    console.log(`No local palettes found: ${USER_PALETTES_DIR}`);
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(USER_PALETTES_DIR, entry);
    try {
      const payload = JSON.parse(await fsp.readFile(fullPath, "utf8"));
      console.log(`${entry}  ${payload.name?.zh || payload.name?.en || payload.slug || "-"}  ${payload.anchors?.primary || "-"}`);
    } catch {
      console.log(`${entry}  unreadable`);
    }
  }
}

async function runPaletteShow(options) {
  const id = options.values[0];
  if (!id) {
    throw new Error("palette show requires an id or JSON file name");
  }
  const fileName = id.endsWith(".json") ? id : `${id}.json`;
  const fullPath = path.isAbsolute(fileName)
    ? fileName
    : path.join(USER_PALETTES_DIR, path.basename(fileName));
  const content = await fsp.readFile(fullPath, "utf8");
  process.stdout.write(content);
  if (!content.endsWith("\n")) {
    process.stdout.write("\n");
  }
}

function collectPaletteSyncTargets(options, rawTargets = []) {
  if (options.all) {
    return Object.keys(TARGETS);
  }
  if (options.targets.length > 0) {
    return options.targets;
  }
  return rawTargets.map(normalizeTarget);
}

function resolvePaletteSyncTargets(options) {
  const targets = collectPaletteSyncTargets(options, options.values);
  if (targets.length === 0) {
    throw new Error("palette sync requires a target (codex, cursor, claude-code) or --all");
  }
  return targets;
}

async function syncPalettesIntoSkillDir(skillDir) {
  await ensureDir(USER_PALETTES_DIR);
  const destDir = path.join(skillDir, LOCAL_PALETTES_RELATIVE);
  await removePath(destDir);
  await copyDirectory(USER_PALETTES_DIR, destDir);
  return destDir;
}

async function syncPalettesToTarget(targetKey) {
  const target = TARGETS[targetKey];
  const skillDir = target.skillDir();
  if (!(await pathExists(skillDir))) {
    console.warn(`${target.label}: skipped — skill is not installed at ${skillDir}`);
    return { status: "skipped", reason: "missing-skill" };
  }

  const destDir = await syncPalettesIntoSkillDir(skillDir);
  console.log(`${target.label}: synced ${USER_PALETTES_DIR} -> ${destDir}`);
  return { status: "synced" };
}

async function runPaletteSync(options) {
  const targets = resolvePaletteSyncTargets(options);
  console.log(`User palettes: ${USER_PALETTES_DIR}`);
  console.log("");
  for (const targetKey of targets) {
    await syncPalettesToTarget(targetKey);
  }
}

async function runPaletteCommand(options) {
  const action = options.localAction;
  switch (action) {
    case "path":
      console.log(USER_PALETTES_DIR);
      break;
    case "list":
      await runPaletteList();
      break;
    case "import":
      await runPaletteImport(options);
      break;
    case "sync":
      await runPaletteSync(options);
      break;
    case "show":
      await runPaletteShow(options);
      break;
    default:
      throw new Error("palette requires an action: path, list, import, sync, or show");
  }
}

function sanitizeStyleAssetName(rawName) {
  const cleaned = String(rawName || "")
    .trim()
    .replace(/\.(md|json|zip)$/i, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || `customstyle-${new Date().toISOString().replace(/[:.]/g, "-")}`;
}

async function uniqueStyleAssetPath(baseName, extension) {
  await ensureDir(USER_STYLES_DIR);
  let candidate = path.join(USER_STYLES_DIR, `${baseName}.${extension}`);
  let index = 2;
  while (await pathExists(candidate)) {
    candidate = path.join(USER_STYLES_DIR, `${baseName}-${index}.${extension}`);
    index += 1;
  }
  return candidate;
}

function getRequiredStyleTokenRoles(archetype) {
  return [
    ...STYLE_BRAND_REQUIRED_TOKEN_ROLES,
    ...STYLE_V1_ADDITIONAL_TOKEN_ROLES,
    ...(STYLE_ARCHETYPE_TOKEN_ROLES[archetype] ?? []),
  ];
}

function hasMeaningfulStyleTokenValue(value) {
  const normalized = String(value ?? "").trim().replace(/^["']|["']$/g, "").trim();
  return normalized !== "" && normalized !== "undefined" && normalized !== "null" && normalized !== "~";
}

function getStyleAssetSlug(fileName, content) {
  try {
    if (fileName.endsWith(".json")) {
      const payload = JSON.parse(content);
      return typeof payload.slug === "string" ? payload.slug.trim() : "";
    }
    if (fileName.endsWith(".md")) {
      return parseFrontmatterFields(content).slug ?? "";
    }
  } catch {
    return "";
  }
  return "";
}

async function findStyleAssetPathBySlug(slug) {
  await ensureDir(USER_STYLES_DIR);
  const entries = (await fsp.readdir(USER_STYLES_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && (entry.name.endsWith(".json") || entry.name.endsWith(".md")))
    .sort((a, b) => a.name.localeCompare(b.name));
  const matches = [];
  for (const entry of entries) {
    const fullPath = path.join(USER_STYLES_DIR, entry.name);
    try {
      const content = await fsp.readFile(fullPath, "utf8");
      if (getStyleAssetSlug(entry.name, content) === slug) {
        const stat = await fsp.stat(fullPath);
        matches.push({ fullPath, mtimeMs: stat.mtimeMs });
      }
    } catch {
      // Ignore malformed or transiently unavailable local assets while resolving another slug.
    }
  }
  matches.sort((a, b) => b.mtimeMs - a.mtimeMs || a.fullPath.localeCompare(b.fullPath));
  return matches[0]?.fullPath ?? "";
}

async function resolveStyleAssetPath(id) {
  const rawId = String(id || "").trim();
  if (!rawId) {
    throw new Error("style asset id is required");
  }

  if (path.isAbsolute(rawId)) {
    if (await pathExists(rawId)) {
      return rawId;
    }
    if (!/\.(md|json)$/i.test(rawId)) {
      for (const extension of ["json", "md"]) {
        const candidate = `${rawId}.${extension}`;
        if (await pathExists(candidate)) {
          return candidate;
        }
      }
    }
    throw new Error(`Style asset not found: ${rawId}`);
  }

  const baseName = path.basename(rawId);
  const candidates = /\.(md|json)$/i.test(baseName)
    ? [path.join(USER_STYLES_DIR, baseName)]
    : [
        path.join(USER_STYLES_DIR, `${baseName}.json`),
        path.join(USER_STYLES_DIR, `${baseName}.md`),
      ];

  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  if (!/\.(md|json)$/i.test(baseName)) {
    const slugMatch = await findStyleAssetPathBySlug(baseName);
    if (slugMatch) {
      return slugMatch;
    }
  }

  throw new Error(`Style asset not found: ${baseName}`);
}

function parseStoredZipStyleAsset(buffer, sourcePath) {
  let offset = 0;
  let jsonAsset = null;
  while (offset + 30 <= buffer.length) {
    const signature = buffer.readUInt32LE(offset);
    if (signature !== 0x04034b50) {
      break;
    }
    const method = buffer.readUInt16LE(offset + 8);
    const compressedSize = buffer.readUInt32LE(offset + 18);
    const fileNameLength = buffer.readUInt16LE(offset + 26);
    const extraLength = buffer.readUInt16LE(offset + 28);
    const nameStart = offset + 30;
    const nameEnd = nameStart + fileNameLength;
    const dataStart = nameEnd + extraLength;
    const dataEnd = dataStart + compressedSize;
    const fileName = buffer.subarray(nameStart, nameEnd).toString("utf8");
    const lowerName = fileName.toLowerCase();

    if (lowerName.endsWith(".md") || lowerName.endsWith(".json")) {
      if (method !== 0) {
        throw new Error(`Unsupported compressed style asset in ${sourcePath}. Exported Dig styles use stored ZIP entries.`);
      }
      const asset = {
        extension: lowerName.endsWith(".md") ? "md" : "json",
        content: buffer.subarray(dataStart, dataEnd).toString("utf8"),
      };
      if (asset.extension === "md") {
        return asset;
      }
      jsonAsset = jsonAsset ?? asset;
    }

    offset = dataEnd;
  }
  if (jsonAsset) {
    return jsonAsset;
  }
  throw new Error(`No style Markdown or JSON found in ${sourcePath}`);
}

async function readStyleAsset(sourcePath) {
  const absolutePath = path.resolve(sourcePath);
  const buffer = await fsp.readFile(absolutePath);
  if (absolutePath.toLowerCase().endsWith(".zip")) {
    return parseStoredZipStyleAsset(buffer, absolutePath);
  }
  const lowerPath = absolutePath.toLowerCase();
  if (lowerPath.endsWith(".md")) {
    return { extension: "md", content: buffer.toString("utf8") };
  }
  if (lowerPath.endsWith(".json")) {
    return { extension: "json", content: buffer.toString("utf8") };
  }
  throw new Error("style import requires a Markdown, JSON, or ZIP file path");
}

function parseFrontmatterFields(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }
  const fields = {};
  for (const line of match[1].split("\n")) {
    const fieldMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (fieldMatch) {
      fields[fieldMatch[1]] = fieldMatch[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return fields;
}

function extractMarkdownSectionOutsideFences(content, heading) {
  const lines = String(content || "").split("\n");
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const target = new RegExp(`^##\\s+${escapedHeading}\\s*$`);
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
    if (collecting) {
      collected.push(line);
    }
  }

  return collected.join("\n").trim();
}

function extractMarkdownFencedCodeBlock(content, heading, language) {
  const section = extractMarkdownSectionOutsideFences(content, heading);
  if (!section) {
    return "";
  }
  const escapedLanguage = language.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = section.match(new RegExp(`\`\`\`${escapedLanguage}\\s*\\n([\\s\\S]*?)\\n\`\`\``));
  return match ? match[1].trim() : "";
}

function parseStyleCssTokens(cssText) {
  const tokens = {};
  for (const match of String(cssText || "").matchAll(/(--dig-[\w-]+)\s*:\s*([^;]*);/g)) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

function parseStyleRenderArchetype(markdown) {
  const match = markdown.match(/\nrender:\s*\n(?:[^\n]*\n)*?\s*archetype:\s*["']?([^"'\n]+)/);
  return match ? match[1].trim() : "";
}

function assertStyleTokenContract(tokens, archetype, sourcePath, label) {
  if (!tokens || typeof tokens !== "object" || !hasMeaningfulStyleTokenValue(tokens["--dig-bg"])) {
    throw new Error(`${label} missing Dig tokens (${sourcePath})`);
  }
  for (const tokenRole of getRequiredStyleTokenRoles(archetype)) {
    if (!hasMeaningfulStyleTokenValue(tokens[tokenRole])) {
      throw new Error(`${label} missing token role ${tokenRole} (${sourcePath})`);
    }
  }
}

function assertStyleThemeTokenContract(themeTokens, archetype, sourcePath, label) {
  if (!themeTokens || typeof themeTokens !== "object") {
    throw new Error(`${label} missing theme token maps (${sourcePath})`);
  }
  const requiredThemeRoles = [
    "--dig-bg", "--dig-bg-soft", "--dig-surface", "--dig-surface-strong", "--dig-surface-elevated",
    "--dig-text", "--dig-text-muted", "--dig-text-soft", "--dig-accent", "--dig-accent-2",
    "--dig-border", "--dig-border-strong", "--dig-grid-line", "--dig-control-bg", "--dig-control-bg-hover",
    "--dig-success", "--dig-warning", "--dig-danger", "--dig-info",
  ];
  for (const mode of ["light", "dark"]) {
    for (const tokenRole of requiredThemeRoles) {
      if (!hasMeaningfulStyleTokenValue(themeTokens[mode]?.[tokenRole])) {
        throw new Error(`${label} ${mode} theme missing token role ${tokenRole} (${sourcePath})`);
      }
    }
  }
}

function validateStyleMarkdown(markdown, sourcePath) {
  const fields = parseFrontmatterFields(markdown);
  if (fields.kind !== "style-catalog") {
    throw new Error(`Style Markdown must declare kind: style-catalog (${sourcePath})`);
  }
  if (fields.category !== "styles") {
    throw new Error(`Style Markdown must declare category: styles (${sourcePath})`);
  }
  if (fields.token_contract !== "style_v1") {
    throw new Error(`Style Markdown must declare token_contract: style_v1 (${sourcePath})`);
  }
  if (!fields.slug) {
    throw new Error(`Style Markdown missing frontmatter slug (${sourcePath})`);
  }
  const archetype = parseStyleRenderArchetype(markdown);
  if (!archetype) {
    throw new Error(`Style Markdown must declare render.archetype (${sourcePath})`);
  }
  if (!markdown.includes("## Style Contract") || !markdown.includes("## Dig UI CSS Tokens")) {
    throw new Error(`Style Markdown must include Style Contract and Dig UI CSS Tokens sections (${sourcePath})`);
  }
  const tokenBlock = extractMarkdownFencedCodeBlock(markdown, "Dig UI CSS Tokens", "css");
  if (!tokenBlock) {
    throw new Error(`Style Markdown must include Dig UI CSS Tokens fenced css block (${sourcePath})`);
  }
  assertStyleTokenContract(parseStyleCssTokens(tokenBlock), archetype, sourcePath, "Style Markdown");
  const darkTokenBlock = extractMarkdownFencedCodeBlock(markdown, "Dig UI Dark Tokens", "css");
  if (!darkTokenBlock) {
    throw new Error(`Style Markdown must include Dig UI Dark Tokens fenced css block (${sourcePath})`);
  }
  assertStyleThemeTokenContract(
    {
      light: parseStyleCssTokens(tokenBlock),
      dark: parseStyleCssTokens(darkTokenBlock),
    },
    archetype,
    sourcePath,
    "Style Markdown",
  );
  return { slug: fields.slug, name: fields.name_zh || fields.name_en || fields.name || fields.slug };
}

function validateStyleJsonPayload(payload, sourcePath) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Style payload must be a JSON object");
  }
  if (payload.schema !== "dig.style.export.v1") {
    throw new Error("Style payload schema must be dig.style.export.v1");
  }
  if (payload.token_contract !== "style_v1") {
    throw new Error("Style payload token_contract must be style_v1");
  }
  if (!payload.slug) {
    throw new Error(`Style payload missing slug (${sourcePath})`);
  }
  if (!payload.render?.archetype) {
    throw new Error(`Style payload missing render.archetype (${sourcePath})`);
  }
  if (!payload.style_contract) {
    throw new Error(`Style payload missing style_contract (${sourcePath})`);
  }
  assertStyleTokenContract(payload.tokens, payload.render.archetype, sourcePath, "Style payload");
  if (payload.theme_tokens) {
    assertStyleThemeTokenContract(payload.theme_tokens, payload.render.archetype, sourcePath, "Style payload");
  }
  return {
    ...payload,
    user_asset: {
      ...(payload.user_asset ?? {}),
      imported_at: new Date().toISOString(),
      source_file: path.resolve(sourcePath),
    },
  };
}

async function runStyleImport(options) {
  const sourcePath = options.values[0];
  if (!sourcePath) {
    throw new Error("style import requires a Markdown, JSON, or ZIP file path");
  }

  const asset = await readStyleAsset(sourcePath);
  let baseName;
  let destContent = asset.content;
  if (asset.extension === "md") {
    const metadata = validateStyleMarkdown(asset.content, sourcePath);
    baseName = sanitizeStyleAssetName(metadata.slug || path.basename(sourcePath));
    console.log("Imported local style");
    console.log(`  name: ${metadata.name}`);
  } else {
    const payload = validateStyleJsonPayload(JSON.parse(asset.content), sourcePath);
    baseName = sanitizeStyleAssetName(payload.export_id || payload.slug || path.basename(sourcePath));
    destContent = `${JSON.stringify(payload, null, 2)}\n`;
    console.log("Imported local style");
    console.log(`  name: ${payload.name?.zh || payload.name?.en || payload.slug}`);
    console.log(`  archetype: ${payload.render.archetype}`);
  }

  const destPath = await uniqueStyleAssetPath(baseName, asset.extension);
  await fsp.writeFile(destPath, destContent.endsWith("\n") ? destContent : `${destContent}\n`, "utf8");
  console.log(`  file: ${destPath}`);

  const syncTargets = collectStyleSyncTargets(options, options.values.slice(1));
  if (syncTargets.length > 0) {
    console.log("");
    await runStyleSync({ ...options, all: false, targets: syncTargets });
  }
}

async function runStyleList() {
  await ensureDir(USER_STYLES_DIR);
  const entries = (await fsp.readdir(USER_STYLES_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && (entry.name.endsWith(".json") || entry.name.endsWith(".md")))
    .map((entry) => entry.name)
    .sort();
  if (entries.length === 0) {
    console.log(`No local styles found: ${USER_STYLES_DIR}`);
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(USER_STYLES_DIR, entry);
    try {
      const content = await fsp.readFile(fullPath, "utf8");
      if (entry.endsWith(".json")) {
        const payload = JSON.parse(content);
        console.log(`${entry}  ${payload.name?.zh || payload.name?.en || payload.slug || "-"}  ${payload.render?.archetype || "-"}`);
      } else {
        const metadata = validateStyleMarkdown(content, fullPath);
        console.log(`${entry}  ${metadata.name}  markdown`);
      }
    } catch {
      console.log(`${entry}  unreadable`);
    }
  }
}

async function runStyleShow(options) {
  const id = options.values[0];
  if (!id) {
    throw new Error("style show requires an id or asset file name");
  }
  const fullPath = await resolveStyleAssetPath(id);
  const content = await fsp.readFile(fullPath, "utf8");
  process.stdout.write(content);
  if (!content.endsWith("\n")) {
    process.stdout.write("\n");
  }
}

function collectStyleSyncTargets(options, rawTargets = []) {
  if (options.all) {
    return Object.keys(TARGETS);
  }
  if (options.targets.length > 0) {
    return options.targets;
  }
  return rawTargets.map(normalizeTarget);
}

function resolveStyleSyncTargets(options) {
  const targets = collectStyleSyncTargets(options, options.values);
  if (targets.length === 0) {
    throw new Error("style sync requires a target (codex, cursor, claude-code) or --all");
  }
  return targets;
}

async function syncStylesIntoSkillDir(skillDir) {
  await ensureDir(USER_STYLES_DIR);
  const destDir = path.join(skillDir, LOCAL_STYLES_RELATIVE);
  await removePath(destDir);
  await copyDirectory(USER_STYLES_DIR, destDir);
  return destDir;
}

async function syncStylesToTarget(targetKey) {
  const target = TARGETS[targetKey];
  const skillDir = target.skillDir();
  if (!(await pathExists(skillDir))) {
    console.warn(`${target.label}: skipped — skill is not installed at ${skillDir}`);
    return { status: "skipped", reason: "missing-skill" };
  }

  const destDir = await syncStylesIntoSkillDir(skillDir);
  console.log(`${target.label}: synced ${USER_STYLES_DIR} -> ${destDir}`);
  return { status: "synced" };
}

async function runStyleSync(options) {
  const targets = resolveStyleSyncTargets(options);
  console.log(`User styles: ${USER_STYLES_DIR}`);
  console.log("");
  for (const targetKey of targets) {
    await syncStylesToTarget(targetKey);
  }
}

async function runStyleCommand(options) {
  const action = options.localAction;
  switch (action) {
    case "path":
      console.log(USER_STYLES_DIR);
      break;
    case "list":
      await runStyleList();
      break;
    case "import":
      await runStyleImport(options);
      break;
    case "sync":
      await runStyleSync(options);
      break;
    case "show":
      await runStyleShow(options);
      break;
    default:
      throw new Error("style requires an action: path, list, import, sync, or show");
  }
}

async function copyFileSafe(sourcePath, destPath) {
  await ensureDir(path.dirname(destPath));
  await fsp.copyFile(sourcePath, destPath);
  const stat = await fsp.stat(sourcePath);
  if (stat.mode & 0o111) {
    await fsp.chmod(destPath, stat.mode);
  }
}

function shouldSkipCopy(relativePath, entryName) {
  return (
    SKIP_COPY_FILE_NAMES.has(entryName) ||
    SKIP_COPY_RELATIVE_PATHS.has(relativePath)
  );
}

async function copyDirectory(
  sourceDir,
  destDir,
  { preserve = [], rootRelativeDir = "", copyRootRelativeDir = rootRelativeDir } = {},
) {
  await ensureDir(destDir);
  const entries = await fsp.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    const relativePath = rootRelativeDir
      ? path.join(rootRelativeDir, entry.name)
      : entry.name;

    if (shouldSkipCopy(relativePath, entry.name)) {
      continue;
    }

    const protectedMatch = [...preserve].some((item) => {
      const protectedRelative = copyRootRelativeDir
        ? path.join(copyRootRelativeDir, item)
        : item;
      return (
        relativePath === protectedRelative ||
        relativePath.startsWith(`${protectedRelative}${path.sep}`)
      );
    });

    if (protectedMatch && (await pathExists(destPath))) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destPath, {
        preserve,
        rootRelativeDir: relativePath,
        copyRootRelativeDir,
      });
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

async function listFilesRecursive(rootDir) {
  if (!(await pathExists(rootDir))) {
    return [];
  }
  const entries = await fsp.readdir(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(fullPath)));
      continue;
    }
    if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

async function readProtectedRelativeEntries(baseDir, protectedRelativePaths) {
  const entries = new Map();
  for (const protectedRelative of protectedRelativePaths) {
    const protectedPath = path.join(baseDir, protectedRelative);
    if (!(await pathExists(protectedPath))) {
      continue;
    }

    const stat = await fsp.lstat(protectedPath);
    if (stat.isDirectory() && !stat.isSymbolicLink()) {
      const files = await listFilesRecursive(protectedPath);
      for (const filePath of files) {
        const childRelative = path.join(
          protectedRelative,
          path.relative(protectedPath, filePath),
        );
        entries.set(childRelative, await fsp.readFile(filePath, "utf8"));
      }
      continue;
    }

    entries.set(protectedRelative, await fsp.readFile(protectedPath, "utf8"));
  }
  return entries;
}

async function restoreProtectedRelativeEntries(baseDir, entries) {
  for (const [relativePath, content] of entries.entries()) {
    const targetPath = path.join(baseDir, relativePath);
    await ensureDir(path.dirname(targetPath));
    await fsp.writeFile(targetPath, content, "utf8");
  }
}

async function copySkillAssets(sourceRoot, destRoot) {
  for (const fileName of RETIRED_TOP_LEVEL_FILES) {
    await removePath(path.join(destRoot, fileName));
  }

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

    const preservedFiles = await readProtectedRelativeEntries(destPath, preserve);

    await removePath(destPath);
    await restoreProtectedRelativeEntries(destPath, preservedFiles);

    await copyDirectory(sourcePath, destPath, {
      preserve,
      rootRelativeDir: dirName,
    });
  }

  if (await pathExists(USER_PALETTES_DIR)) {
    await syncPalettesIntoSkillDir(destRoot);
  }
  if (await pathExists(USER_STYLES_DIR)) {
    await syncStylesIntoSkillDir(destRoot);
  }
}

function stripLanguageSuffix(fileName, language) {
  return fileName.replace(new RegExp(`\\.${language}\\.md$`), ".md");
}

async function applyLocalizedDirectory(sourceRoot, destRoot, domain, language) {
  const sourceDir = path.join(sourceRoot, "references", domain);
  const destDir = path.join(destRoot, "references", domain);
  if (!(await pathExists(sourceDir))) {
    throw new Error(`Missing localized domain: references/${domain}`);
  }

  await ensureDir(destDir);

  const sourceFiles = await listFilesRecursive(sourceDir);
  let copied = 0;
  for (const sourcePath of sourceFiles) {
    if (!sourcePath.endsWith(`.${language}.md`)) {
      continue;
    }

    const rel = path.relative(sourceDir, sourcePath);
    const destRel = path.join(
      path.dirname(rel),
      stripLanguageSuffix(path.basename(rel), language),
    );
    await copyFileSafe(sourcePath, path.join(destDir, destRel));
    copied += 1;
  }

  if (!copied) {
    throw new Error(`Missing ${language} files in references/${domain}`);
  }
}

async function removeLocalizedSourceFiles(destRoot) {
  const refsRoot = path.join(destRoot, "references");
  for (const filePath of await listFilesRecursive(refsRoot)) {
    if (LOCALIZED_MARKDOWN_PATTERN.test(path.basename(filePath))) {
      await removePath(filePath);
    }
  }
}

async function applyLanguagePack(sourceRoot, destRoot, language) {
  const skillTemplate = path.join(sourceRoot, `SKILL.${language}.md`);

  if (!(await pathExists(skillTemplate))) {
    throw new Error(`Missing language skill template: ${skillTemplate}`);
  }

  await copyFileSafe(skillTemplate, path.join(destRoot, "SKILL.md"));
  await removePath(path.join(destRoot, "SKILL.en.md"));
  await removePath(path.join(destRoot, "SKILL.zh-CN.md"));

  for (const fileName of ["global-rules", "dig-read", "anti-tells", "preflight"]) {
    const sourcePath = path.join(sourceRoot, "references", `${fileName}.${language}.md`);
    const destPath = path.join(destRoot, "references", `${fileName}.md`);
    if (!(await pathExists(sourcePath))) {
      throw new Error(`Missing localized file: references/${fileName}.${language}.md`);
    }
    await copyFileSafe(sourcePath, destPath);
  }

  for (const domain of ["layouts", "catalogs", "blocks", "workflows"]) {
    await applyLocalizedDirectory(sourceRoot, destRoot, domain, language);
  }

  await removeLocalizedSourceFiles(destRoot);

  await fsp.writeFile(
    path.join(destRoot, LANGUAGE_RECORD),
    JSON.stringify(
      {
        language,
        installed_at: new Date().toISOString(),
        source: path.resolve(sourceRoot),
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
}

async function installSkillTarget(targetKey, sourceRoot, { link = false, lang = null } = {}) {
  const target = TARGETS[targetKey];
  const destRoot = target.skillDir();
  const language = await resolveInstallLanguage(destRoot, { lang });

  if (link) {
    await ensureDir(path.dirname(destRoot));
    await removePath(destRoot);
    await fsp.symlink(sourceRoot, destRoot);
    console.log(`Linked ${target.label} skill: ${destRoot} -> ${sourceRoot}`);
    console.log("  language: source tree (link mode keeps all domain-localized assets)");
    return destRoot;
  }

  await ensureDir(destRoot);

  const localRulesPath = path.join(destRoot, "references", "global-rules.local.md");
  const hadLocalRules = await pathExists(localRulesPath);

  await copySkillAssets(sourceRoot, destRoot);
  await applyLanguagePack(sourceRoot, destRoot, language);

  console.log(`Installed ${target.label} skill to ${destRoot}`);
  console.log(`  language: ${language}`);

  if (hadLocalRules) {
    console.log("  kept existing references/global-rules.local.md");
  } else {
    const configExists = await pathExists(USER_LOCAL_RULES_PATH);
    if (configExists) {
      console.log(
        "  tip: run `dig-ui-skill sync-local --all --from-config` to sync user config local rules",
      );
    } else {
      console.log(
        "  tip: run `dig-ui-skill init-local` then `sync-local --all --from-config` for personal overrides",
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
      lang: options.lang,
    });

    if (targetKey === "cursor" && options.project) {
      await installCursorProjectRule(options.project, destRoot);
    }
  }
}

async function runUpdate(options) {
  options.link = false;
  await runInstall(options);

  if (options.withLocal) {
    console.log("");
    console.log("Syncing local rules...");
    await runSyncLocal(options);
  }

  console.log("Update complete.");
}

function runChecked(command, args, cwd = PACKAGE_ROOT) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: false,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

async function runRender(options) {
  const target = options.targets[0] ?? "all";
  const valid = new Set(["catalogs", "all"]);
  if (!valid.has(target)) {
    throw new Error("render supports catalogs only. Layout and block HTML renders have been retired.");
  }
  if (target === "catalogs" || target === "all") {
    runChecked("python3", [path.join(PACKAGE_ROOT, "sync_renders.py")]);
  }
}

async function runValidate(options) {
  const target = options.targets[0];
  if (target !== "renders") {
    throw new Error("validate requires target: renders");
  }
  runChecked("node", [path.join(PACKAGE_ROOT, "validate-dig-render-ops.mjs")]);
}

function digestBytes(data) {
  return `sha256:${crypto.createHash("sha256").update(data).digest("hex")}`;
}

function digestString(value) {
  return digestBytes(Buffer.from(String(value ?? ""), "utf8"));
}

function normalizeBridgeChoice(value, fallback) {
  const normalized = String(value ?? "").trim();
  if (!normalized || normalized === "auto") {
    return fallback;
  }
  return normalized;
}

function inferBridgeLayout(input) {
  const explicit = normalizeBridgeChoice(input.layout, "");
  if (explicit) {
    return explicit;
  }

  const haystack = [
    input.task,
    input.prompt,
    input.target?.kind,
    input.target?.audience,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/\b(log|runtime|console|debug|trace|agent run)\b/.test(haystack)) {
    return "runtime-console";
  }
  if (/\b(table|workspace|list|data)\b/.test(haystack)) {
    return "data-table-workspace";
  }
  if (/\b(settings|preference|config)\b/.test(haystack)) {
    return "settings-form";
  }
  if (/\bdocs|article|documentation\b/.test(haystack)) {
    return "docs-article";
  }
  if (/\breview|preflight\b/.test(haystack)) {
    return "report-insight";
  }
  return "dashboard-overview";
}

function selectBridgeTargetFile(input) {
  const files = Array.isArray(input.context_files) ? input.context_files : [];
  const preferred = files
    .map((file) => ({
      file,
      path: normalizeBridgeArtifactPath(file?.path),
    }))
    .find((candidate) => candidate.path && /\.(tsx|jsx|html|vue)$/i.test(candidate.path));
  if (preferred?.path) {
    return {
      path: preferred.path,
      before: String(preferred.file?.content ?? ""),
      action: "update",
    };
  }

  if (input.framework === "html") {
    return { path: "src/index.html", before: "", action: "update" };
  }
  if (input.framework === "vue") {
    return { path: "src/App.vue", before: "", action: "update" };
  }
  return { path: "src/App.tsx", before: "", action: "update" };
}

function normalizeBridgeArtifactPath(rawPath) {
  const text = String(rawPath ?? "").trim().replaceAll("\\", "/");
  if (!text || text.includes("\0") || /[\r\n]/.test(text)) {
    return "";
  }
  if (path.posix.isAbsolute(text)) {
    return "";
  }
  const cleaned = path.posix.normalize(text);
  if (cleaned === "." || cleaned === ".." || cleaned.startsWith("../")) {
    return "";
  }
  return cleaned;
}

function buildBridgeFileContent(input, catalog, layout) {
  const prompt = String(input.prompt ?? "").trim();
  const title = prompt
    ? prompt.replace(/\s+/g, " ").slice(0, 96)
    : "Dig UI Production Surface";
  const framework = normalizeBridgeChoice(input.framework, "react");

  if (framework === "html") {
    const catalogAttribute = escapeMarkupAttribute(catalog);
    const layoutAttribute = escapeMarkupAttribute(layout);
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dig UI</title>
  </head>
  <body>
    <main class="dig-shell" data-catalog="${catalogAttribute}" data-layout="${layoutAttribute}">
      <h1>${escapeHtml(title)}</h1>
      <p>Generated by dig-ui-skill bridge.</p>
    </main>
  </body>
</html>
`;
  }

  if (framework === "vue") {
    const catalogAttribute = escapeMarkupAttribute(catalog);
    const layoutAttribute = escapeMarkupAttribute(layout);
    return `<template>
  <main class="dig-shell" data-catalog="${catalogAttribute}" data-layout="${layoutAttribute}">
    <h1>${escapeHtml(title)}</h1>
    <p>Generated by dig-ui-skill bridge.</p>
  </main>
</template>
`;
  }

  const catalogAttribute = escapeMarkupAttribute(catalog);
  const layoutAttribute = escapeMarkupAttribute(layout);
  return `export default function App() {
  return (
    <main className="dig-shell" data-catalog="${catalogAttribute}" data-layout="${layoutAttribute}">
      <section className="dig-page-header">
        <p className="dig-eyebrow">Dig UI</p>
        <h1>${escapeJsxText(title)}</h1>
        <p>Generated by dig-ui-skill bridge.</p>
      </section>
    </main>
  );
}
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeMarkupAttribute(value) {
  return escapeHtml(value)
    .replaceAll("'", "&#39;")
    .replaceAll("\t", "&#9;")
    .replaceAll("\n", "&#10;")
    .replaceAll("\r", "&#13;");
}

function escapeJsxText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildUnifiedDiff(filePath, before, after) {
  const beforeLines = String(before ?? "").split("\n");
  const afterLines = String(after ?? "").split("\n");
  const removed = beforeLines
    .filter((line, index) => !(index === beforeLines.length - 1 && line === ""))
    .map((line) => `-${line}`)
    .join("\n");
  const added = afterLines
    .filter((line, index) => !(index === afterLines.length - 1 && line === ""))
    .map((line) => `+${line}`)
    .join("\n");
  return `--- ${filePath}
+++ ${filePath}
@@
${removed ? `${removed}\n` : ""}${added}
`;
}

async function runBridge(options) {
  if (!options.inputJson || !options.outputJson) {
    throw new Error("run requires --input-json <path> and --output-json <path>");
  }

  const input = JSON.parse(await fsp.readFile(options.inputJson, "utf8"));
  const catalog = normalizeBridgeChoice(input.catalog, "dig");
  const layout = inferBridgeLayout(input);
  const version = readPackageVersion(PACKAGE_ROOT);
  const summary = `Dig UI ${input.task || "design"} bridge output using ${layout} + ${catalog}.`;
  const output = {
    summary,
    task: String(input.task ?? "design"),
    catalog,
    layout,
    metadata: {
      dig_ui_skill_version: version,
      schema_version: "dig-ui-skill.bridge.v1",
      catalog,
      layout,
      style_profile: "dig-ui-bridge",
      theme_digest: digestString(`${catalog}:${layout}:theme`),
      design_system_digest: digestString(`${version}:${catalog}:${layout}`),
    },
  };

  if (input.options?.return_patch) {
    const target = selectBridgeTargetFile(input);
    const content = buildBridgeFileContent(input, catalog, layout);
    const diff = buildUnifiedDiff(target.path, target.before, content);
    output.patch = diff;
    output.artifact_outputs = [
      {
        label: "file1",
        role: "file_content",
        content_type: "text/plain",
        content,
      },
      {
        label: "diff1",
        role: "diff",
        content_type: "text/x-diff",
        content: diff,
      },
    ];
    output.apply_plan = {
      schema_version: "dig-ui-skill.apply_plan.v1",
      workspace_id: "default",
      summary,
      operations: [
        {
          action: target.action,
          path: target.path,
          expected_sha256: digestString(target.before),
          after_sha256: digestString(content),
          content_artifact_label: "file1",
          diff_artifact_label: "diff1",
          diff_summary: `Update ${target.path} with Dig UI ${layout} structure and ${catalog} catalog markers.`,
        },
      ],
    };
  }

  await ensureDir(path.dirname(options.outputJson));
  await fsp.writeFile(options.outputJson, `${JSON.stringify(output, null, 2)}\n`, "utf8");
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

  let localRulesLinked = false;
  let localRulesInSync = false;
  let language = "-";

  if (installed && (await pathExists(localRulesPath))) {
    localRulesLinked = await isSymlinkTo(localRulesPath, USER_LOCAL_RULES_PATH);
    if (!localRulesLinked && (await pathExists(USER_LOCAL_RULES_PATH))) {
      localRulesInSync = await filesContentEqual(
        USER_LOCAL_RULES_PATH,
        localRulesPath,
      );
    }
  }
  if (installed) {
    language = (await readInstalledLanguage(skillDir)) ?? "-";
  }

  return {
    target: targetKey,
    label: target.label,
    installed,
    path: skillDir,
    version,
    mode,
    language,
    localRules: installed ? await pathExists(localRulesPath) : false,
    localRulesLinked,
    localRulesInSync,
    localExample: installed ? await pathExists(examplePath) : false,
  };
}

async function runStatus() {
  console.log("dig-ui-skill status\n");

  const configExists = await pathExists(USER_LOCAL_RULES_PATH);
  console.log("User config (local rules source of truth)");
  console.log(`  path:    ${USER_LOCAL_RULES_PATH}`);
  console.log(`  present: ${configExists ? "yes" : "no"}`);
  if (!configExists) {
    console.log("  tip: run `dig-ui-skill init-local` to create personal rules");
  }
  console.log("");

  for (const targetKey of Object.keys(TARGETS)) {
    const status = await getTargetStatus(targetKey);
    console.log(`${status.label} (${status.target})`);
    console.log(`  installed: ${status.installed ? "yes" : "no"}`);
    console.log(`  path:      ${status.path}`);
    if (status.installed) {
      console.log(`  version:   ${status.version}`);
      console.log(`  mode:      ${status.mode}`);
      console.log(`  language:  ${status.language}`);

      let localRulesStatus = status.localRules ? "present" : "missing";
      if (status.localRulesLinked) {
        localRulesStatus = "linked to user config";
      } else if (status.localRulesInSync) {
        localRulesStatus = "in sync with user config";
      } else if (status.localRules && configExists) {
        localRulesStatus = "present (differs from user config)";
      }
      console.log(`  local rules: ${localRulesStatus}`);

      if (!status.localRules && configExists) {
        console.log("  tip: run `dig-ui-skill sync-local " + status.target + " --from-config`");
      } else if (!status.localRules && !configExists && status.localExample) {
        console.log("  tip: run `dig-ui-skill init-local` then `sync-local --all --from-config`");
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
      case "run":
        await runBridge(options);
        break;
      case "install":
        await runInstall(options);
        break;
      case "update":
        await runUpdate(options);
        break;
      case "render":
        await runRender(options);
        break;
      case "validate":
        await runValidate(options);
        break;
      case "local":
        await runLocalCommand(options);
        break;
      case "palette":
        await runPaletteCommand(options);
        break;
      case "style":
        await runStyleCommand(options);
        break;
      case "init-local":
        await runInitLocal(options);
        break;
      case "sync-local":
        await runSyncLocal(options);
        break;
      case "import-local":
        await runImportLocal(options);
        break;
      case "status":
        await runStatus();
        break;
      default:
        throw new Error(
          `Unknown command "${options.command}". Use run, install, update, render, validate, local, palette, style, init-local, sync-local, import-local, or status.`,
        );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

await main();
