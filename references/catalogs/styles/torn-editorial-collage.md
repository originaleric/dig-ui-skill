---
slug: torn-editorial-collage
name: Torn Editorial Collage
name_zh: 手撕编辑拼贴
name_en: Torn Editorial Collage
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 面向文化、社群、活动与创作者产品的手工编辑拼贴视觉语法。
description_en: A handmade editorial-collage language for culture, community, events, and creator products.
render:
  archetype: editorial-story
  page_type: marketing
  density: comfortable
  canvas: paper-collage
---

# Torn Editorial Collage / 手撕编辑拼贴

## Overview

Torn Editorial Collage uses paper layers, cropped images, tape-like joins, and editorial annotation to create community energy. It works best at expressive entry points and content surfaces, while operational controls remain calm and stable.

## Style Contract

```yaml
best_for: [creator community, cultural event, editorial landing, campaign hub, course discovery]
avoid_for: [critical operations, regulated data entry, dense financial table, enterprise admin]
mood: [human, energetic, handmade, expressive, social]
shape_language:
  stroke: "Torn edges, offset rules, tape-like connectors, and deliberately irregular image crops."
  radius: "Use soft paper corners selectively; controls retain consistent Dig pills."
  density: "Layered storytelling with one clear focal element per section."
  controls: "Functional controls sit on stable surfaces and never inherit illegible collage textures."
surface_language:
  canvas: "Paper-like warm or tinted fields; dark mode is ink-and-paper, not neon."
  panels: "Layered paper regions with subtle depth and measured overlap."
  emphasis: "Use a small, punchy accent palette to identify actions, tags, and editorial marks."
illustration_language:
  imagery: "Photography, object crops, handwritten notes, and halftone treatment form a coherent story."
  diagrams: "Maps and schedules can use annotation, tape, and paper layers while preserving legibility."
component_mapping:
  story_hero: "One image or object crop with a sharp proposition and supporting label."
  event_card: "Date, location, availability, and CTA on a readable paper layer."
  creator_note: "A personal annotation or quote with source and action."
  program_map: "A schedule or discovery map organized through visible editorial grouping."
motion_language:
  energy: "Small layered reveals and hover depth changes."
  limits: "No random shaking, exaggerated tape peel, or scrolling collage chaos."
```

## Visual Grammar

- Use collage as the information architecture: every layer needs a role in the reading path.
- Keep text on high-contrast, stable surfaces; avoid placing controls over busy imagery.
- Reuse a small set of paper, tape, annotation, and image-crop treatments.

## Avoid

- Random scrapbook decoration, heavy noise, or illegible handwritten UI labels.
- A different texture treatment on every card.
- Bringing collage visual noise into forms, tables, or safety-critical actions.

## Dig UI CSS Tokens

```css
--dig-bg: #f5e9d5;
--dig-bg-soft: #ecd8bd;
--dig-surface: #fffaf1;
--dig-surface-strong: #f1dfc5;
--dig-surface-elevated: #ffffff;
--dig-text: #2a2421;
--dig-text-muted: #71655b;
--dig-text-soft: #9b8a7d;
--dig-accent: #d04a42;
--dig-accent-strong: #aa352f;
--dig-accent-2: #276f78;
--dig-accent-2-strong: #1d545b;
--dig-border: #765f4f;
--dig-border-strong: #2a2421;
--dig-grid-line: rgba(42, 36, 33, 0.11);
--dig-control-bg: #fff5e5;
--dig-control-bg-hover: #f5e5ca;
--dig-success: #417451;
--dig-warning: #b67827;
--dig-danger: #c94242;
--dig-info: #276f78;
--dig-font-sans: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Space Grotesk", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 16px;
--dig-text-lg: 20px;
--dig-text-xl: 28px;
--dig-text-2xl: 38px;
--dig-text-3xl: 52px;
--dig-text-4xl: 70px;
--dig-text-5xl: 90px;
--dig-leading-tight: 1.04;
--dig-leading-normal: 1.5;
--dig-tracking-tight: -0.02em;
--dig-radius-sm: 6px;
--dig-radius-md: 12px;
--dig-radius-lg: 18px;
--dig-radius-xl: 24px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 2px 0 rgba(42, 36, 33, 0.13), 0 12px 26px rgba(42, 36, 33, 0.1);
--dig-shadow-soft: 0 16px 34px rgba(42, 36, 33, 0.12);
--dig-shadow-chunky: 0 3px 0 #2a2421;
--dig-glow-accent: 0 0 0 2px rgba(208, 74, 66, 0.18);
--dig-glow-secondary: 0 0 0 2px rgba(39, 111, 120, 0.18);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #241b18; --dig-bg-soft: #30241f; --dig-surface: #392b24; --dig-surface-strong: #49372d; --dig-surface-elevated: #564236;
--dig-text: #fff4e6; --dig-text-muted: #dac5ae; --dig-text-soft: #a8917b; --dig-accent: #f4776d; --dig-accent-2: #67bbc2;
--dig-border: #745b4b; --dig-border-strong: #f5dec0; --dig-grid-line: rgba(255, 244, 230, .1); --dig-control-bg: #422f27; --dig-control-bg-hover: #533a30;
--dig-success: #6aad7b; --dig-warning: #d7a044; --dig-danger: #ef716d; --dig-info: #67bbc2;
```
