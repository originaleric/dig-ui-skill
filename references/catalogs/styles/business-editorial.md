---
slug: business-editorial
name: Business Editorial
name_zh: 商业编辑
name_en: Business Editorial
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 面向趋势、市场、产品与公司叙事的锐利商业媒体式产品视觉语法。
description_en: A sharp business-media product language for trends, markets, products, and company narratives.
render:
  archetype: editorial-story
  page_type: marketing
  density: comfortable
  canvas: editorial-light
---

# Business Editorial / 商业编辑

## Overview

Business Editorial combines decisive headlines, signal-rich labels, and an evidence-led editorial grid. It is suitable for product narratives and intelligence workspaces, not a fake magazine cover.

## Style Contract

```yaml
best_for: [market intelligence, trend report, company research, product narrative, founder dashboard]
avoid_for: [medical workflow, gentle kids product, dense incident console, generic ecommerce]
mood: [sharp, informed, energetic, credible, directional]
shape_language:
  stroke: "Strong headline rules, data ticks, compact labels, and intentional editorial crops."
  radius: "Low radii; cards act as article modules or evidence panels, not soft SaaS tiles."
  density: "Comfortable editorial scan with dense facts in disciplined sidebars and tables."
  controls: "Filters and navigation read as a publication's utility system, but remain product-native."
surface_language:
  canvas: "Neutral paper or ink-black field with one high-impact editorial accent."
  panels: "Flat blocks, running rules, and occasional high-contrast story panels."
  emphasis: "Use the accent for a lead signal, trend movement, or primary action—not every tag."
illustration_language:
  diagrams: "Trend lines, market maps, signal arrows, and abstract commercial objects support an argument."
  imagery: "One strong data or product image per editorial region."
component_mapping:
  lead_signal: "A headline insight with source, time window, and clear implication."
  market_brief: "A compact story row with category, data point, and action."
  trend_chart: "A legible chart with editorial annotation and stable axes."
  watchlist: "A ranked, filterable set of companies, topics, or opportunities."
motion_language:
  energy: "Fast but restrained selection and panel transitions."
  limits: "No autoplay news tickers, flashing market noise, or cover-style text overload."
```

## Visual Grammar

- A headline needs evidence, a source, or a tangible next action.
- Use labels and typography to establish pace; do not simulate a magazine masthead or real media brand.
- Charts and watchlists retain stable columns and accessible states.

## Avoid

- Impersonating publishers, adding fake breaking-news urgency, or filling every area with micro-copy.
- A news-card wall with no hierarchy.
- Treating data decoration as analysis.

## Dig UI CSS Tokens

```css
--dig-bg: #f7f4ee;
--dig-bg-soft: #eee9df;
--dig-surface: #fffdf8;
--dig-surface-strong: #e9e2d7;
--dig-surface-elevated: #ffffff;
--dig-text: #17191c;
--dig-text-muted: #62666b;
--dig-text-soft: #92949a;
--dig-accent: #e4472f;
--dig-accent-strong: #bd301d;
--dig-accent-2: #1e5fa5;
--dig-accent-2-strong: #174a80;
--dig-border: #d9d2c7;
--dig-border-strong: #17191c;
--dig-grid-line: rgba(23, 25, 28, 0.1);
--dig-control-bg: #f2ede5;
--dig-control-bg-hover: #e5ded4;
--dig-success: #27805b;
--dig-warning: #b57720;
--dig-danger: #ce3f38;
--dig-info: #1e5fa5;
--dig-font-sans: "Inter", "IBM Plex Sans", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Space Grotesk", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 15px;
--dig-text-lg: 18px;
--dig-text-xl: 25px;
--dig-text-2xl: 36px;
--dig-text-3xl: 50px;
--dig-text-4xl: 68px;
--dig-text-5xl: 88px;
--dig-leading-tight: 1.02;
--dig-leading-normal: 1.46;
--dig-tracking-tight: -0.025em;
--dig-radius-sm: 4px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 18px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(23, 25, 28, 0.1);
--dig-shadow-soft: 0 14px 32px rgba(23, 25, 28, 0.08);
--dig-shadow-chunky: 0 2px 0 #17191c;
--dig-glow-accent: 0 0 0 1px rgba(228, 71, 47, 0.22);
--dig-glow-secondary: 0 0 0 1px rgba(30, 95, 165, 0.2);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #181a1f; --dig-bg-soft: #20232a; --dig-surface: #252931; --dig-surface-strong: #30353f; --dig-surface-elevated: #3a404b;
--dig-text: #f9f4ea; --dig-text-muted: #c5c6c5; --dig-text-soft: #91969c; --dig-accent: #ff735d; --dig-accent-2: #6ea6e8;
--dig-border: #4c535e; --dig-border-strong: #e8e3da; --dig-grid-line: rgba(249, 244, 234, .1); --dig-control-bg: #2c3038; --dig-control-bg-hover: #393e48;
--dig-success: #62b88b; --dig-warning: #d7a44a; --dig-danger: #f07067; --dig-info: #6ea6e8;
```
