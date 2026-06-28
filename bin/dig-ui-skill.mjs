#!/usr/bin/env node

import fs from "node:fs";
import fsp from "node:fs/promises";
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
  "INSTALL.md",
  "LICENSE",
  "sync-renders.sh",
  "sync_renders.py",
  "sync_layout_renders.py",
  "sync_block_renders.py",
  "validate-dig-catalog-preview.mjs",
  "validate-dig-block-preview.mjs",
  "validate-dig-layout-preview.mjs",
  "validate-dig-render-ops.mjs",
  "package.json",
];

const SKILL_DIRS = ["references", "assets", "renders", "agents", "adapters", "bin"];

const SUPPORTED_LANGUAGES = new Set(["en", "zh-CN"]);
const DEFAULT_LANGUAGE = "zh-CN";
const LANGUAGE_RECORD = "dig-ui-language.json";
const LOCALIZED_MARKDOWN_PATTERN = /\.(en|zh-CN)\.md$/;

const PROTECTED_RELATIVE_PATHS = new Set(["references/global-rules.local.md"]);
const SKIP_COPY_RELATIVE_PATHS = new Set(["references/global-rules.local.md"]);
const SKIP_COPY_FILE_NAMES = new Set([".DS_Store"]);

const USER_CONFIG_DIR = path.join(os.homedir(), ".config", "dig-ui-skill");
const USER_LOCAL_RULES_PATH = path.join(USER_CONFIG_DIR, "global-rules.local.md");
const LOCAL_RULES_RELATIVE = path.join("references", "global-rules.local.md");

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
  dig-ui-skill render <catalogs|layouts|blocks|all>
  dig-ui-skill validate renders
  dig-ui-skill local <action> [options]
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

Local actions:
  local path                         Print the user local rules path
  local show                         Print user local rules
  local init                         Create user local rules from the example
  local sync [target|--all]          Sync user local rules to installed tools
  local add --section <heading> <bullet>
                                     Add a preference bullet under a canonical section

Options:
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

    if (options.command === "local" && !options.localAction) {
      options.localAction = arg;
    } else if (options.command === "local") {
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
  { preserve = [], rootRelativeDir = "" } = {},
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
      const absoluteProtected = path.join(destDir, item);
      return destPath === absoluteProtected;
    });

    if (protectedMatch && (await pathExists(destPath))) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destPath, {
        preserve,
        rootRelativeDir: relativePath,
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

    await copyDirectory(sourcePath, destPath, {
      preserve,
      rootRelativeDir: dirName,
    });
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

  await removePath(destDir);
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
  const valid = new Set(["catalogs", "layouts", "blocks", "all"]);
  if (!valid.has(target)) {
    throw new Error("render requires one of: catalogs, layouts, blocks, all");
  }
  if (target === "catalogs" || target === "all") {
    runChecked("python3", [path.join(PACKAGE_ROOT, "sync_renders.py")]);
  }
  if (target === "layouts" || target === "all") {
    runChecked("python3", [path.join(PACKAGE_ROOT, "sync_layout_renders.py")]);
  }
  if (target === "blocks" || target === "all") {
    runChecked("python3", [path.join(PACKAGE_ROOT, "sync_block_renders.py")]);
  }
}

async function runValidate(options) {
  const target = options.targets[0];
  if (target !== "renders") {
    throw new Error("validate requires target: renders");
  }
  runChecked("node", [path.join(PACKAGE_ROOT, "validate-dig-render-ops.mjs")]);
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
          `Unknown command "${options.command}". Use install, update, render, validate, local, init-local, sync-local, import-local, or status.`,
        );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

await main();
