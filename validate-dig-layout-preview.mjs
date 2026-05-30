#!/usr/bin/env node
/**
 * validate-dig-layout-preview.mjs
 * Playwright-based layout preview checks (WARN by default, FAIL on critical issues).
 *
 * Usage:
 *   node validate-dig-layout-preview.mjs renders/layouts/dashboard-overview.html
 *   node validate-dig-layout-preview.mjs renders/layouts
 */

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOBILE_MIN_TAP = 44;
const MIN_FONT_PX = 12;

function collectHtmlFiles(input) {
  const resolved = path.resolve(process.cwd(), input);
  if (!fs.existsSync(resolved)) {
    console.error(`Path not found: ${resolved}`);
    process.exit(1);
  }
  const stat = fs.statSync(resolved);
  if (stat.isFile() && resolved.endsWith(".html") && path.basename(resolved) !== "index.html") {
    return [resolved];
  }
  if (stat.isDirectory()) {
    return fs
      .readdirSync(resolved)
      .filter((f) => f.endsWith(".html") && f !== "index.html")
      .map((f) => path.join(resolved, f));
  }
  console.error("Expected .html file or directory");
  process.exit(1);
}

function layoutNameFromFile(filePath) {
  return path.basename(filePath, ".html");
}

async function checkViewport(page, viewportLabel, frameSelector) {
  const issues = [];

  const frame = page.locator(frameSelector).first();
  const frameCount = await frame.count();
  if (!frameCount) {
    issues.push({ level: "FAIL", message: `Missing viewport frame: ${frameSelector}` });
    return issues;
  }

  const overflow = await frame.evaluate((el) => {
    return el.scrollWidth > el.clientWidth + 2;
  });
  if (overflow) {
    issues.push({
      level: "WARN",
      message: "Horizontal scroll detected inside viewport frame",
      viewport: viewportLabel,
      fix: "Check grid min-width, fixed widths, or nowrap text in Preview CSS",
    });
  }

  const nestedSurfaces = await frame.evaluate((root) => {
    const bad = [];
    root.querySelectorAll(".dig-surface .dig-surface").forEach((el) => {
      const parent = el.parentElement?.closest(".dig-surface");
      if (parent && parent.contains(el) && parent !== el) {
        bad.push(el.getAttribute("data-slot") || el.className);
      }
    });
    return bad.slice(0, 5);
  });
  if (nestedSurfaces.length) {
    issues.push({
      level: "WARN",
      message: `Nested .dig-surface (card-in-card): ${nestedSurfaces.join(", ")}`,
      viewport: viewportLabel,
      fix: "Flatten structure — one surface per region",
    });
  }

  const textOverflow = await frame.evaluate((root) => {
    const problems = [];
    root.querySelectorAll(".layout-preview *").forEach((el) => {
      if (el.children.length > 0) return;
      if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
        problems.push(el.tagName + (el.className ? `.${String(el.className).split(" ")[0]}` : ""));
      }
    });
    return problems.slice(0, 3);
  });
  if (textOverflow.length) {
    issues.push({
      level: "WARN",
      message: `Text may overflow container: ${textOverflow.join(", ")}`,
      viewport: viewportLabel,
    });
  }

  if (viewportLabel === "mobile") {
    const smallControls = await frame.evaluate((root, minH) => {
      const bad = [];
      root.querySelectorAll(
        "button, .dig-button-primary, .dig-button-secondary, a.dig-button-primary, a.dig-button-secondary"
      ).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height > 0 && rect.height < minH - 1) {
          bad.push(el.textContent?.trim().slice(0, 24) || "button");
        }
      });
      return bad.slice(0, 5);
    }, MOBILE_MIN_TAP);
    if (smallControls.length) {
      issues.push({
        level: "WARN",
        message: `Controls below ${MOBILE_MIN_TAP}px tap target: ${smallControls.join(", ")}`,
        viewport: viewportLabel,
        fix: "Use min-height: 44px on interactive elements",
      });
    }

    const smallText = await frame.evaluate((root, minPx) => {
      const bad = [];
      root.querySelectorAll(".dig-log-line, .dig-meta, .dig-body").forEach((el) => {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size > 0 && size < minPx - 0.5) {
          bad.push(`${el.className} (${size}px)`);
        }
      });
      return bad.slice(0, 3);
    }, MIN_FONT_PX);
    if (smallText.length) {
      issues.push({
        level: "WARN",
        message: `Font size below ${MIN_FONT_PX}px: ${smallText.join(", ")}`,
        viewport: viewportLabel,
      });
    }
  }

  return issues;
}

async function checkCatalogFocusVisible(page) {
  return page.evaluate(() => {
    const btn = document.querySelector(".catalog-btn");
    if (!btn) return true;
    btn.focus();
    const style = getComputedStyle(btn);
    return style.outlineWidth !== "0px" || style.boxShadow !== "none";
  });
}

async function checkRequiredSlots(page, layoutName) {
  const issues = [];
  const notesSlots = page.locator(".notes-card").filter({ hasText: "Slots" }).first();
  const requiredNames = await notesSlots.evaluate(() => {
    const names = [];
    document.querySelectorAll(".slots-list li").forEach((li) => {
      if (li.textContent.includes("required")) {
        const strong = li.querySelector("strong");
        if (strong) names.push(strong.textContent.trim());
      }
    });
    return names;
  });

  for (const slot of requiredNames) {
    for (const [label, selector] of [
      ["desktop", ".viewport-desktop .viewport-frame"],
      ["tablet", ".viewport-tablet .viewport-frame"],
      ["mobile", ".viewport-mobile .viewport-frame"],
    ]) {
      const frame = page.locator(selector).first();
      const count = await frame.locator(`[data-slot="${slot}"]`).count();
      if (count < 1) {
        issues.push({
          level: "FAIL",
          message: `Required slot "${slot}" missing in ${label} viewport`,
          layout: layoutName,
          viewport: label,
          fix: `Add data-slot="${slot}" to Preview HTML`,
        });
      }
    }
  }
  return issues;
}

async function validateFile(browser, filePath) {
  const layoutName = layoutNameFromFile(filePath);
  const url = "file://" + filePath;
  const page = await browser.newPage();
  const allIssues = [];

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    allIssues.push(...(await checkRequiredSlots(page, layoutName)));

    for (const [label, selector] of [
      ["desktop", ".viewport-desktop .viewport-frame"],
      ["tablet", ".viewport-tablet .viewport-frame"],
      ["mobile", ".viewport-mobile .viewport-frame"],
    ]) {
      const viewportIssues = await checkViewport(page, label, selector);
      viewportIssues.forEach((i) => {
        i.layout = layoutName;
        allIssues.push(i);
      });
    }

    if (!(await checkCatalogFocusVisible(page))) {
      allIssues.push({
        level: "WARN",
        message: "Catalog button may lack visible :focus-visible style",
        layout: layoutName,
      });
    }
  } finally {
    await page.close();
  }

  return allIssues;
}

async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || path.join(__dirname, "renders", "layouts");
  const files = collectHtmlFiles(target);

  if (!files.length) {
    console.log("No layout HTML files to validate.");
    process.exit(0);
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    console.error("Failed to launch Playwright. Run: npx playwright install chromium");
    console.error(err.message);
    process.exit(1);
  }

  let totalFail = 0;
  let totalWarn = 0;

  console.log(`\nDig Layout Preview Validator — ${files.length} file(s)\n`);

  for (const file of files) {
    const issues = await validateFile(browser, file);
    const name = layoutNameFromFile(file);
    const fails = issues.filter((i) => i.level === "FAIL");
    const warns = issues.filter((i) => i.level === "WARN");

    if (!issues.length) {
      console.log(`✅ PASS  ${name}`);
    } else {
      const status = fails.length ? "FAIL" : "WARN";
      console.log(`${fails.length ? "❌" : "⚠️"} ${status}  ${name}`);
      for (const issue of issues) {
        const vp = issue.viewport ? ` [${issue.viewport}]` : "";
        console.log(`   ${issue.level}${vp}: ${issue.message}`);
        if (issue.fix) console.log(`         → ${issue.fix}`);
      }
    }

    totalFail += fails.length;
    totalWarn += warns.length;
  }

  await browser.close();

  console.log(`\nSummary: ${totalFail} FAIL, ${totalWarn} WARN\n`);

  if (totalFail > 0) {
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
