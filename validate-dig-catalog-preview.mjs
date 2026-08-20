#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "renders";
const sharedPreviewCss = fs.readFileSync("assets/catalog-preview.css", "utf8");
const requiredTokens = [
  "--dig-bg",
  "--dig-surface",
  "--dig-surface-strong",
  "--dig-text",
  "--dig-text-muted",
  "--dig-accent",
  "--dig-border",
  "--dig-radius-md",
  "--dig-text-5xl",
];
const forbiddenRuntimeCopy = [
  "Deploy Agents With Control",
  "Agent Execution Overview",
  "Open Console",
  "Execution Trace",
  "Queue: 24",
  "Region: HKG-1",
];

function selectorRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = sharedPreviewCss.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, "m"));
  return match?.[1] || "";
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(filePath);
    if (!entry.isFile() || !entry.name.endsWith(".html")) return [];
    if (entry.name === "index.html" || entry.name === "README.html") return [];
    if (filePath.includes(`${path.sep}layouts${path.sep}`)) return [];
    if (filePath.includes(`${path.sep}blocks${path.sep}`)) return [];
    return [filePath];
  });
}

function parseRoot(content) {
  const match = content.match(/:root\s*\{([\s\S]*?)\}/);
  if (!match) return { tokens: {}, raw: "" };
  const raw = match[1];
  const tokens = {};
  for (const line of raw.split("\n")) {
    const tokenMatch = line.trim().match(/^(--dig-[\w-]+)\s*:\s*([^;]+);/);
    if (tokenMatch) tokens[tokenMatch[1]] = tokenMatch[2].trim();
  }
  return { tokens, raw };
}

function hexToRgb(value) {
  const hex = value.trim().match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!hex) return null;
  const raw = hex[1].length === 3
    ? hex[1].split("").map((char) => char + char).join("")
    : hex[1];
  const int = Number.parseInt(raw, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function luminance(rgb) {
  const channel = rgb.map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2];
}

function contrast(a, b) {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return null;
  const lumA = luminance(rgbA);
  const lumB = luminance(rgbB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

const files = walk(root);
const problems = [];

for (const selector of [".palette-lab-row", ".palette-lab-input", ".palette-candidate"]) {
  const rule = selectorRule(selector);
  if (!rule) {
    problems.push(`assets/catalog-preview.css: missing shared Lab rule ${selector}`);
    continue;
  }
  if (/background:\s*var\(--dig-control-bg(?:-hover)?\)/.test(rule)) {
    problems.push(`assets/catalog-preview.css: ${selector} uses --dig-control-bg directly and can create unreadable dark-mode Lab content`);
  }
}

for (const match of sharedPreviewCss.matchAll(/\.palette-(?:lab-row|lab-input|candidate)[^{]*\{([\s\S]*?)\}/g)) {
  if (/background:\s*var\(--dig-control-bg(?:-hover)?\)/.test(match[1])) {
    problems.push("assets/catalog-preview.css: a Lab surface state uses --dig-control-bg directly and can create unreadable dark-mode content");
  }
}

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");
  const rel = path.relative(process.cwd(), filePath);
  const { tokens, raw } = parseRoot(content);

  if (!raw) {
    problems.push(`${rel}: missing :root token block`);
    continue;
  }

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (
      !trimmed
      || trimmed === "color-scheme: dark;"
      || trimmed === "color-scheme: light;"
      || trimmed === "color-scheme: light dark;"
    ) continue;
    if (trimmed.startsWith("--dig-")) continue;
    problems.push(`${rel}: unexpected :root line "${trimmed}"`);
  }

  for (const token of requiredTokens) {
    if (!tokens[token]) problems.push(`${rel}: missing required token ${token}`);
  }

  const bgText = contrast(tokens["--dig-bg"] || "", tokens["--dig-text"] || "");
  if (bgText !== null && bgText < 4.5) {
    problems.push(`${rel}: --dig-bg / --dig-text contrast ${bgText.toFixed(2)} is below 4.5`);
  }

  const surfaceText = contrast(tokens["--dig-surface"] || "", tokens["--dig-text"] || "");
  if (surfaceText !== null && surfaceText < 4.5) {
    problems.push(`${rel}: --dig-surface / --dig-text contrast ${surfaceText.toFixed(2)} is below 4.5`);
  }

  const archetypeMatch = content.match(/data-render-archetype="([^"]+)"/);
  const archetype = archetypeMatch?.[1] || "token-sheet";
  const isStyleRender = rel.split(path.sep).includes("styles");
  if (
    isStyleRender
    && /body::before\s*\{[\s\S]*?#52525b[\s\S]*?background-size:\s*8px\s+8px;[\s\S]*?\}/.test(content)
  ) {
    problems.push(`${rel}: style render contains legacy hard-coded body::before background override`);
  }
  if (archetype !== "token-sheet") {
    for (const phrase of forbiddenRuntimeCopy) {
      if (content.includes(phrase)) {
        problems.push(`${rel}: archetype render still contains default runtime copy "${phrase}"`);
      }
    }
  }
}

if (problems.length) {
  console.error(`Catalog render validation failed with ${problems.length} issue(s):`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Catalog render validation passed for ${files.length} preview(s).`);
