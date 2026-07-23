---
slug: strategy-report
name: Strategy Report
name_zh: 战略报告
name_en: Strategy Report
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 面向策略、运营、规划与业务分析的理性报告式产品视觉语法。
description_en: A rational report language for strategy, operations, planning, and business-analysis products.
render:
  archetype: strategy-workspace
  page_type: reporting
  density: comfortable
  canvas: paper-light
---

# Strategy Report / 战略报告

## Overview

Strategy Report turns decision material into an ordered working surface: editorial hierarchy, quiet grids, restrained data marks, and one clear recommendation at a time. It is a product style, not a slide-deck imitation.

## Style Contract

```yaml
best_for:
  - strategy workspace
  - operating review
  - planning and roadmap
  - business analysis
  - executive reporting
avoid_for:
  - realtime trading cockpit
  - playful consumer loop
  - image-led lifestyle marketing
mood: [rational, authoritative, structured, calm, evidence-led]
shape_language:
  stroke: "Fine rules, matrix lines, arrows, and disciplined data marks; emphasis uses weight, not decoration."
  radius: "Low to medium radii; panels read as report sections rather than floating cards."
  density: "Comfortable, with compact evidence clusters separated by deliberate whitespace."
  controls: "Pill controls follow Dig global rules; actions are explicit and quieter than conclusions."
surface_language:
  canvas: "Warm white paper in light mode and low-glare charcoal paper in dark mode."
  panels: "Flat paper surfaces, subtle dividers, and one elevated recommendation or decision panel."
  emphasis: "Use one controlled blue or vermilion signal for a decision, risk, or next action."
illustration_language:
  diagrams: "Matrices, paths, value chains, scorecards, and sparse annotated diagrams explain the business model."
  imagery: "Use a single abstract business metaphor only when it clarifies a decision."
component_mapping:
  decision_summary: "One recommendation, owner, confidence, and next review date."
  evidence_matrix: "Comparable criteria, weighted evidence, and short annotations."
  roadmap_track: "Time-bounded initiatives with dependency and risk markers."
  insight_callout: "A concise conclusion that links evidence to an action."
motion_language:
  energy: "Calm transitions for filters, drill-down, and section disclosure."
  limits: "No animated charts, ticker effects, or decorative dashboard glow."
```

## Visual Grammar

- Establish the conclusion before expanding evidence; one page should have one decision hierarchy.
- Use grids, rules, labels, and restrained charts as structural tools, never as ornamental infographics.
- Keep tables readable and stable; color augments status but never carries it alone.
- In dark mode, preserve the same paper/report hierarchy through token changes rather than reversing component semantics.

## Avoid

- Generic KPI-card wallpaper or presentation-slide chrome.
- Multiple competing accents, oversized gradients, or a fake consulting-logo aesthetic.
- Dense charts without a decision, owner, or interpretation.

## Dig UI CSS Tokens

```css
--dig-bg: #f3f1ec;
--dig-bg-soft: #e9e6df;
--dig-surface: #faf9f5;
--dig-surface-strong: #efede6;
--dig-surface-elevated: #ffffff;
--dig-text: #18212b;
--dig-text-muted: #626d78;
--dig-text-soft: #929aa3;
--dig-accent: #1c5d99;
--dig-accent-strong: #12436f;
--dig-accent-2: #c65d3a;
--dig-accent-2-strong: #9e4529;
--dig-border: #d6d3ca;
--dig-border-strong: #4e5963;
--dig-grid-line: rgba(24, 33, 43, 0.09);
--dig-control-bg: #f7f5f0;
--dig-control-bg-hover: #ece9e2;
--dig-success: #287a5a;
--dig-warning: #ad7b24;
--dig-danger: #ba4c43;
--dig-info: #1c5d99;
--dig-font-sans: "Inter", "IBM Plex Sans", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "IBM Plex Serif", "Source Han Serif SC", Georgia, serif;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "IBM Plex Serif", "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 15px;
--dig-text-lg: 18px;
--dig-text-xl: 24px;
--dig-text-2xl: 32px;
--dig-text-3xl: 42px;
--dig-text-4xl: 56px;
--dig-text-5xl: 72px;
--dig-leading-tight: 1.1;
--dig-leading-normal: 1.5;
--dig-tracking-tight: -0.01em;
--dig-radius-sm: 6px;
--dig-radius-md: 10px;
--dig-radius-lg: 14px;
--dig-radius-xl: 20px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(24, 33, 43, 0.08);
--dig-shadow-soft: 0 12px 28px rgba(24, 33, 43, 0.08);
--dig-shadow-chunky: 0 2px 0 #4e5963;
--dig-glow-accent: 0 0 0 1px rgba(28, 93, 153, 0.2);
--dig-glow-secondary: 0 0 0 1px rgba(198, 93, 58, 0.18);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #151c23; --dig-bg-soft: #1c252e; --dig-surface: #202a34; --dig-surface-strong: #293540; --dig-surface-elevated: #303d49;
--dig-text: #eef3f5; --dig-text-muted: #b4c0c8; --dig-text-soft: #83929c; --dig-accent: #6caee4; --dig-accent-2: #ee8a67;
--dig-border: #3d4b57; --dig-border-strong: #cbd6db; --dig-grid-line: rgba(238, 243, 245, .1); --dig-control-bg: #27323d; --dig-control-bg-hover: #34414d;
--dig-success: #55b98a; --dig-warning: #d4a346; --dig-danger: #e3766d; --dig-info: #6caee4;
```
