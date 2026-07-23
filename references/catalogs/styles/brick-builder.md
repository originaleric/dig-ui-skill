---
slug: brick-builder
name: Brick Builder
name_zh: 积木搭建
name_en: Brick Builder
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 面向教育、协作、规划与搭建流程的模块化玩具系统视觉语法。
description_en: A modular toy-system language for education, collaboration, planning, and building flows.
render:
  archetype: builder-journey
  page_type: mobile-consumer
  density: comfortable
  canvas: toy-light
---

# Brick Builder / 积木搭建

## Overview

Brick Builder uses connected modules, toy-like depth, and a visible build path to make plans and learning loops tangible. Unlike Cozy Arcade, its center is the system being assembled, not a mascot relationship.

## Style Contract

```yaml
best_for: [learning path, project builder, collaborative planning, kids education, maker workflow]
avoid_for: [regulated finance, dense observability, solemn enterprise settings, content-heavy reading]
mood: [constructive, optimistic, tactile, modular, collaborative]
shape_language:
  stroke: "Friendly 2px outlines, module seams, connection pegs, and clearly assembled blocks."
  radius: "Large rounded modules and pill controls; selected pieces have stable depth."
  density: "Comfortable, with one primary build path and a limited set of supporting pieces."
  controls: "Large action-first controls and reorderable-looking module rows without layout jump."
surface_language:
  canvas: "Warm neutral worktable with vivid toy-color accents; dark mode becomes a dim maker bench."
  panels: "Solid plastic-like surfaces, visible hierarchy, and short offset shadows."
  emphasis: "Use color by module role, with a single primary action color at any time."
illustration_language:
  diagrams: "Connected bricks, tracks, nodes, simple maps, and build progress are part of the product model."
  imagery: "Small isometric or block illustrations support a task but never hide text."
component_mapping:
  build_path: "A sequence of connected modules showing progress and dependency."
  module_card: "A piece with label, purpose, completion state, and optional owner."
  kit_picker: "Large selectable materials, lesson kits, or task bundles."
  teammate_slot: "A simple collaborator assignment or handoff state."
motion_language:
  energy: "Short press, snap, and completion feedback without moving neighboring content."
  limits: "No physics-heavy bouncing, arcade neon, or scattered decorative bricks."
```

## Visual Grammar

- Every colored module needs a semantic label or icon; color is not the only distinction.
- Show assembly order, what is complete, and what the next piece unlocks.
- Keep the primary task visible above the toy atmosphere.

## Avoid

- Copying a specific toy brand or using trademarked brick geometry as an interface requirement.
- Treating every card as a different colored object with no system role.
- Tiny controls, excessive 3D gloss, or decorative parts that reduce task clarity.

## Dig UI CSS Tokens

```css
--dig-bg: #fff2d4;
--dig-bg-soft: #ffe7b3;
--dig-surface: #fffaf0;
--dig-surface-strong: #f8ddb0;
--dig-surface-elevated: #ffffff;
--dig-text: #2c251d;
--dig-text-muted: #6e6253;
--dig-text-soft: #9a8b78;
--dig-accent: #e45842;
--dig-accent-strong: #bc3f2d;
--dig-accent-2: #277acb;
--dig-accent-2-strong: #1c5d9d;
--dig-border: #5a4432;
--dig-border-strong: #2c251d;
--dig-grid-line: rgba(90, 68, 50, 0.12);
--dig-control-bg: #fff7e7;
--dig-control-bg-hover: #ffeac1;
--dig-success: #328458;
--dig-warning: #c3831e;
--dig-danger: #d64b42;
--dig-info: #277acb;
--dig-font-sans: "Nunito Sans", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Baloo 2", "Nunito Sans", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: Georgia, "Source Han Serif SC", serif;
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 24px;
--dig-text-2xl: 32px;
--dig-text-3xl: 40px;
--dig-text-4xl: 54px;
--dig-text-5xl: 68px;
--dig-leading-tight: 1.08;
--dig-leading-normal: 1.45;
--dig-tracking-tight: 0;
--dig-radius-sm: 10px;
--dig-radius-md: 16px;
--dig-radius-lg: 22px;
--dig-radius-xl: 30px;
--dig-radius-pill: 999px;
--dig-stroke-width: 2px;
--dig-stroke-width-strong: 3px;
--dig-shadow-panel: 0 2px 0 rgba(44, 37, 29, 0.18), 0 10px 22px rgba(44, 37, 29, 0.1);
--dig-shadow-soft: 0 12px 24px rgba(44, 37, 29, 0.1);
--dig-shadow-chunky: 0 4px 0 #2c251d;
--dig-glow-accent: 0 0 0 2px rgba(228, 88, 66, 0.2);
--dig-glow-secondary: 0 0 0 2px rgba(39, 122, 203, 0.18);
--dig-motion-bounce: cubic-bezier(0.18, 0.88, 0.26, 1.18);
```

## Dig UI Dark Tokens

```css
--dig-bg: #241b16; --dig-bg-soft: #30241d; --dig-surface: #38291f; --dig-surface-strong: #493526; --dig-surface-elevated: #563f2c;
--dig-text: #fff4dd; --dig-text-muted: #d8c4a7; --dig-text-soft: #a79277; --dig-accent: #ff7a62; --dig-accent-2: #65a9eb;
--dig-border: #765946; --dig-border-strong: #f7e2bd; --dig-grid-line: rgba(255, 244, 221, .1); --dig-control-bg: #422f23; --dig-control-bg-hover: #533b2a;
--dig-success: #63bb84; --dig-warning: #dfaa43; --dig-danger: #f17368; --dig-info: #65a9eb;
```
