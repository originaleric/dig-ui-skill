---
slug: research-lab
name: Research Lab
name_zh: 科研实验室
name_en: Research Lab
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 面向科研、实验、工程与知识发现的精密实验室视觉语法。
description_en: A precise laboratory language for research, experiments, engineering, and knowledge discovery.
render:
  archetype: research-workbench
  page_type: research
  density: comfortable
  canvas: scientific-light
---

# Research Lab / 科研实验室

## Overview

Research Lab makes complex evidence legible through specimen-like surfaces, precise measurement, and a restrained sense of discovery. It supports real product work rather than decorative science fiction.

## Style Contract

```yaml
best_for: [research workspace, experiment tracker, scientific knowledge base, engineering analysis, clinical review]
avoid_for: [casual social feed, high-volume trading, toy-like education, ecommerce]
mood: [precise, curious, credible, luminous, methodical]
shape_language:
  stroke: "Fine measurement lines, softly rounded specimen frames, and clear spatial grouping."
  radius: "Medium radii for material or sample regions; controls retain Dig pills."
  density: "Comfortable study surface with dense detail inside charts, tables, and annotations."
  controls: "Action labels name the research operation: compare, annotate, validate, export."
surface_language:
  canvas: "Cool mineral white in light mode; deep blue-black lab bench in dark mode."
  panels: "Translucent-feeling but solid sample surfaces, with hairline borders and minimal elevation."
  emphasis: "Cyan indicates active observation; violet or coral marks a selected result or warning."
illustration_language:
  diagrams: "Molecules, lattices, networks, microscopy crops, waveforms, and sectional structures are explanatory assets."
  imagery: "Use one meaningful scientific visualization, never a generic particle field."
component_mapping:
  experiment_run: "Hypothesis, protocol stage, sample count, and validation state."
  specimen_panel: "A visual sample with scale, annotation, and source metadata."
  evidence_graph: "A chart, network, or comparison with units and interpretation."
  method_note: "A concise protocol note, caveat, or reproducibility warning."
motion_language:
  energy: "Measured scan, progress, and layer transitions only."
  limits: "No floating particles, liquid glass, or animated microscope decoration."
```

## Visual Grammar

- Pair every visual with scale, unit, source, or an explanatory label where relevant.
- Treat diagram space as an evidence surface; keep axes, legends, and annotations stable.
- Use glow sparingly as a focus ring or selected observation, never as ambient decoration.

## Avoid

- Faux medical interfaces, DNA wallpaper, or unsupported claims of scientific precision.
- Decorative 3D molecules that do not explain the current task.
- Color-only result states or microscopic labels that cannot be read.

## Dig UI CSS Tokens

```css
--dig-bg: #eef4f5;
--dig-bg-soft: #e1ebed;
--dig-surface: #f9fcfc;
--dig-surface-strong: #e7f0f1;
--dig-surface-elevated: #ffffff;
--dig-text: #152a35;
--dig-text-muted: #60727b;
--dig-text-soft: #8c9ca3;
--dig-accent: #147c93;
--dig-accent-strong: #0d5c6f;
--dig-accent-2: #6f5cc5;
--dig-accent-2-strong: #524592;
--dig-border: #c9dcdf;
--dig-border-strong: #2d5964;
--dig-grid-line: rgba(20, 124, 147, 0.1);
--dig-control-bg: #f2f8f8;
--dig-control-bg-hover: #e5f0f1;
--dig-success: #27825b;
--dig-warning: #a26d1f;
--dig-danger: #bf4b59;
--dig-info: #147c93;
--dig-font-sans: "Inter", "IBM Plex Sans", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Space Grotesk", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 15px;
--dig-text-lg: 18px;
--dig-text-xl: 24px;
--dig-text-2xl: 32px;
--dig-text-3xl: 42px;
--dig-text-4xl: 56px;
--dig-text-5xl: 72px;
--dig-leading-tight: 1.12;
--dig-leading-normal: 1.5;
--dig-tracking-tight: -0.01em;
--dig-radius-sm: 8px;
--dig-radius-md: 14px;
--dig-radius-lg: 20px;
--dig-radius-xl: 28px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(21, 42, 53, 0.06), 0 12px 32px rgba(21, 42, 53, 0.05);
--dig-shadow-soft: 0 16px 34px rgba(20, 124, 147, 0.09);
--dig-shadow-chunky: 0 2px 0 #2d5964;
--dig-glow-accent: 0 0 0 1px rgba(20, 124, 147, 0.22), 0 0 22px rgba(20, 124, 147, 0.12);
--dig-glow-secondary: 0 0 0 1px rgba(111, 92, 197, 0.18);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #081a22; --dig-bg-soft: #0d2630; --dig-surface: #102e39; --dig-surface-strong: #173946; --dig-surface-elevated: #1c4552;
--dig-text: #effafa; --dig-text-muted: #b7cfd1; --dig-text-soft: #819c9f; --dig-accent: #4cc6d0; --dig-accent-2: #a99af2;
--dig-border: #315967; --dig-border-strong: #c8e4e5; --dig-grid-line: rgba(239, 250, 250, .1); --dig-control-bg: #13333e; --dig-control-bg-hover: #1b4551;
--dig-success: #58b987; --dig-warning: #d5a34b; --dig-danger: #e57982; --dig-info: #4cc6d0;
```
