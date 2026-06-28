#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const renderDir = path.resolve(__dirname, process.argv[2] || "renders/blocks");
const manifestPath = path.join(__dirname, "references/shared/catalog-manifest.yaml");

function fail(message, details = "") {
  return { level: "FAIL", message, details };
}

function parseManifestCatalogIds() {
  const content = fs.readFileSync(manifestPath, "utf8");
  return [...content.matchAll(/^\s{2}-\s+slug:\s+([a-z0-9.-]+)\s*$/gm)].map((match) => match[1]);
}

function listBlockPages() {
  return fs
    .readdirSync(renderDir)
    .filter((name) => name.endsWith(".html") && name !== "index.html")
    .sort();
}

function pageUrl(fileName, catalog) {
  const url = pathToFileURL(path.join(renderDir, fileName));
  url.searchParams.set("catalog", catalog);
  return url.href;
}

async function validateCatalogQuery(page, fileName, catalog) {
  const issues = [];
  await page.goto(pageUrl(fileName, catalog), { waitUntil: "domcontentloaded" });
  const state = await page.evaluate(() => ({
    datasetCatalog: document.documentElement.dataset.catalog,
    selectedValue: document.getElementById("catalogSelect")?.value || "",
    chipText: document.getElementById("previewCatalogChip")?.textContent?.trim() || "",
    bodyBackground: getComputedStyle(document.body).backgroundColor,
    bodyColor: getComputedStyle(document.body).color,
  }));
  if (state.datasetCatalog !== catalog) {
    issues.push(fail(`Block page did not apply catalog query`, `${fileName}: expected ${catalog}, got ${state.datasetCatalog}`));
  }
  if (state.selectedValue !== catalog) {
    issues.push(fail(`Block catalog select did not reflect query`, `${fileName}: expected ${catalog}, got ${state.selectedValue}`));
  }
  if (state.chipText !== catalog) {
    issues.push(fail(`Block preview catalog chip did not reflect query`, `${fileName}: expected ${catalog}, got ${state.chipText}`));
  }
  if (!state.bodyBackground || !state.bodyColor) {
    issues.push(fail(`Block catalog preview did not compute themed colors`, fileName));
  }
  return issues;
}

async function validateSelectJump(page, fileName) {
  await page.goto(pageUrl(fileName, "apple"), { waitUntil: "domcontentloaded" });
  await page.selectOption("#catalogSelect", "mono");
  await page.waitForURL(/catalog=mono.*#skin-check|#skin-check.*catalog=mono/, { timeout: 3000 });
  const state = await page.evaluate(() => ({
    datasetCatalog: document.documentElement.dataset.catalog,
    selectedValue: document.getElementById("catalogSelect")?.value || "",
    chipText: document.getElementById("previewCatalogChip")?.textContent?.trim() || "",
    hash: window.location.hash,
    catalog: new URLSearchParams(window.location.search).get("catalog"),
  }));
  const issues = [];
  if (state.catalog !== "mono" || state.hash !== "#skin-check") {
    issues.push(fail(`Block catalog select did not jump to direct URL`, `${fileName}: catalog=${state.catalog}, hash=${state.hash}`));
  }
  if (state.datasetCatalog !== "mono" || state.selectedValue !== "mono" || state.chipText !== "mono") {
    issues.push(fail(`Block catalog select jump did not apply mono state`, `${fileName}: ${JSON.stringify(state)}`));
  }
  return issues;
}

async function main() {
  const issues = [];
  const pages = listBlockPages();
  const catalogs = parseManifestCatalogIds();
  if (!pages.length) issues.push(fail("No block preview pages found", renderDir));
  if (!catalogs.length) issues.push(fail("No manifest catalogs found", manifestPath));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    for (const fileName of pages) {
      for (const catalog of catalogs) {
        issues.push(...await validateCatalogQuery(page, fileName, catalog));
      }
    }
    if (pages.includes("input.html")) {
      issues.push(...await validateSelectJump(page, "input.html"));
    } else if (pages[0]) {
      issues.push(...await validateSelectJump(page, pages[0]));
    }
  } finally {
    await browser.close();
  }

  const fails = issues.filter((issue) => issue.level === "FAIL");
  console.log(`\nDig Block Preview Validator - ${pages.length} file(s), ${catalogs.length} catalog(s)`);
  for (const issue of issues) {
    console.log(`${issue.level}: ${issue.message}`);
    if (issue.details) console.log(`  ${issue.details}`);
  }
  console.log(`Summary: ${fails.length} FAIL`);
  if (fails.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
