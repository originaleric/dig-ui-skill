---
slug: paper-infographic
name: Paper Infographic
name_zh: 纸面图解
name_en: Paper Infographic
kind: style-catalog
category: styles
token_contract: style_v1
status: active
extends: cozy-arcade
description_zh: 米白稿纸、暖墨描边、金黄色块和珊瑚批注，适合图解、流程说明和信息卡。
description_en: Warm graph paper, ink outlines, gold accents and coral annotations for diagrams, processes and information cards.
render:
  archetype: token-sheet
  density: comfortable
  canvas: paper-grid
---

# Paper Infographic / 纸面图解

## Visual Grammar / 视觉规则

- Use a quiet square grid on the canvas and opaque panels behind reading content. Use gold for the primary action or focal point, and coral for annotations.
- Keep the ordinary frame at 1px, emphasized ink outlines at 2px and ordinary panel radii at 8–12px. Use pills for interactive controls and short offset shadows for a few focal elements.
- Use weight and tabular numerals to organize information. Pair each number with its unit and place callouts close to what they describe.
- 在页面画布使用低对比方格，正文放在不透明纸面上。金黄突出主要行动，珊瑚色用于批注。
- 容器采用 8–12px 圆角、常规 1px 细线与重点 2px 墨色描边。交互控件保持药丸形，仅给少量焦点元素加短硬影。
- 用字重和等宽数字建立层级，数字与单位同读，批注贴近它所描述的图形。

## Style Contract

```yaml
best_for:
  - diagrams and visual explainers
  - process summaries
  - information cards and short reports
avoid_for:
  - mascot-centered reward flows
  - high-density operational consoles
mood:
  - annotated
  - tactile
  - warm
  - clear
source_reference: {}
shape_language:
  stroke: "Use a 1px ordinary border and 2px ink outlines for emphasis."
  radius: "Use 8–12px panel corners and pill controls."
  depth: "Use flat paper panels and a short hard shadow on a few focal elements."
surface_language:
  canvas: "Bind background-color to var(--dig-bg), background-image to var(--dig-canvas-image), and background-size to var(--dig-canvas-size) on the page canvas. Apply the active theme's complete token map."
  panels: "Use opaque warm paper or charcoal with clear ink outlines."
  primary_action: "Use gold with --dig-on-accent text, preserving a visible focus outline."
  support_action: "Use coral for annotations and tokenized quiet surfaces for secondary controls."
illustration_language:
  diagrams: "Directly label simple lines, steps, and shapes. Keep graph paper behind the diagram field."
  annotations: "Use rectangular callouts with thin leaders. Use circular stickers sparingly."
component_mapping:
  metric: "Keep tabular numbers, units and labels together."
  panel: "Group related content on a flat outlined sheet."
  annotation: "Place a short contextual note next to the detail it explains."
  primary_cta: "Use a single gold pill with short, action-first copy."
motion_language:
  energy: "Static paper with brief, stable control transitions."
  limits: "Keep grid and content still. Respect reduced-motion preferences."
accessibility:
  contrast: "Verify ink on paper, gold foreground, small annotations, and semantic labels in both modes."
  copy: "Keep labels short and include text or shape alongside each semantic color."
```

## Dig UI Shared Tokens

```css
--dig-font-sans: "Aptos", "Inter", "PingFang SC", "Noto Sans SC", system-ui, sans-serif;
--dig-font-display: "Aptos Display", "Inter", "PingFang SC", "Noto Sans SC", system-ui, sans-serif;
--dig-leading-tight: 1.08;
--dig-radius-sm: 8px;
--dig-radius-md: 10px;
--dig-radius-lg: 12px;
--dig-radius-xl: 16px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: none;
--dig-shadow-soft: none;
--dig-shadow-chunky: 0 3px 0 var(--dig-border);
--dig-glow-accent: 0 3px 0 var(--dig-border);
--dig-glow-secondary: none;
--dig-motion-bounce: ease-out;
--dig-canvas-image: linear-gradient(90deg, var(--dig-grid-line) 1px, transparent 1px), linear-gradient(var(--dig-grid-line) 1px, transparent 1px);
--dig-canvas-size: 24px 24px;
```

## Dig UI CSS Tokens

```css
--dig-bg: #f5edd8;
--dig-bg-soft: #eee2c9;
--dig-surface: #fff9eb;
--dig-surface-strong: #f3e7cb;
--dig-surface-elevated: #fffdf6;
--dig-text: #292119;
--dig-text-muted: #594c3d;
--dig-text-soft: #695b4a;
--dig-accent: #efbb41;
--dig-accent-strong: #dfa728;
--dig-accent-2: #ce6b57;
--dig-accent-2-strong: #a1493a;
--dig-on-accent: #292119;
--dig-border: #594738;
--dig-border-strong: #33261d;
--dig-grid-line: rgba(89, 71, 56, 0.13);
--dig-control-bg: #fff7e6;
--dig-control-bg-hover: #f3e5c5;
--dig-success: #276b46;
--dig-warning: #815c11;
--dig-danger: #9c3f35;
--dig-info: #315f7a;
```

## Dig UI Dark Tokens

```css
--dig-bg: #251f1a;
--dig-bg-soft: #2d241d;
--dig-surface: #332920;
--dig-surface-strong: #403226;
--dig-surface-elevated: #493a2c;
--dig-text: #fff1d9;
--dig-text-muted: #ddc8ab;
--dig-text-soft: #bfa98e;
--dig-accent: #f3c65b;
--dig-accent-strong: #ffda80;
--dig-accent-2: #e48c78;
--dig-accent-2-strong: #f5a997;
--dig-on-accent: #292119;
--dig-border: #a58d74;
--dig-border-strong: #dac2a4;
--dig-grid-line: rgba(218, 194, 164, 0.14);
--dig-control-bg: #382d23;
--dig-control-bg-hover: #4a3829;
--dig-success: #8ed5a6;
--dig-warning: #ffd17a;
--dig-danger: #ff9c8d;
--dig-info: #8cc6e4;
```
