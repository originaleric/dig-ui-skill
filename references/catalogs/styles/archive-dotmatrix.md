---
slug: archive-dotmatrix
name: Archive Dotmatrix
name_zh: 档案点阵
name_en: Archive Dotmatrix
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 面向知识库、研究笔记、AI 工具与个人记录的安静档案打印视觉语法。
description_en: A quiet archival-print language for knowledge bases, research notes, AI tools, and personal records.
render:
  archetype: research-workbench
  page_type: documentation
  density: comfortable
  canvas: archive-paper
---

# Archive Dotmatrix / 档案点阵

## Overview

Archive Dotmatrix combines warm paper, mechanical type, and sparse dot-matrix diagrams for tools that need calm concentration. It is not a terminal skin and does not imitate a vintage computer wholesale.

## Style Contract

```yaml
best_for: [knowledge base, research notes, AI notebook, reading workspace, personal archive]
avoid_for: [trading cockpit, playful onboarding, high-conversion commerce, bright social feed]
mood: [quiet, archival, mechanical, deliberate, focused]
shape_language:
  stroke: "Fine printed rules, square markers, and small dot-matrix diagrams."
  radius: "Small radii for panels; pill geometry remains reserved for controls."
  density: "Moderate reading density with a strict, repeatable baseline grid."
  controls: "Compact but accessible text controls, with clear active and focus states."
surface_language:
  canvas: "Uniform warm gray paper in light mode and charcoal archive stock in dark mode."
  panels: "Flat, nearly borderless sections distinguished by rules and spacing."
  emphasis: "A restrained ink-blue accent identifies selected, linked, or active material."
illustration_language:
  diagrams: "One small dot-matrix object, index map, or procedural diagram may carry a section concept."
  imagery: "Avoid decorative noise, stains, paper tears, and pseudo-retro clutter."
component_mapping:
  archive_index: "Numbered documents, dates, tags, and short descriptions."
  reading_note: "A focused passage with margin annotation and source reference."
  dot_map: "Small relation, status, or workflow map using dots and printed labels."
  command_strip: "Search, filter, and save actions kept in a stable textual toolbar."
motion_language:
  energy: "Near-static; use opacity and border changes for focus."
  limits: "No typewriter animation, scanline effects, or blinking cursor decoration."
```

## Visual Grammar

- Keep the palette intentionally narrow; the contrast and typographic rhythm create identity.
- Use the mono face for metadata and values, not for long-form body text.
- Treat white space and printed rules as the main grouping mechanism.

## Avoid

- Fake terminal commands, green phosphor, or a noisy CRT effect.
- Turning every component into a boxed card.
- Text too small for sustained reading.

## Dig UI CSS Tokens

```css
--dig-bg: #ded9cf;
--dig-bg-soft: #d3cec3;
--dig-surface: #e8e4dc;
--dig-surface-strong: #d7d1c6;
--dig-surface-elevated: #f1eee8;
--dig-text: #171717;
--dig-text-muted: #53514e;
--dig-text-soft: #827e77;
--dig-accent: #234d73;
--dig-accent-strong: #173852;
--dig-accent-2: #886737;
--dig-accent-2-strong: #684e29;
--dig-border: #aaa399;
--dig-border-strong: #34312e;
--dig-grid-line: rgba(17, 17, 17, 0.12);
--dig-control-bg: #e9e5dd;
--dig-control-bg-hover: #d8d2c7;
--dig-success: #3f6d50;
--dig-warning: #886737;
--dig-danger: #a84940;
--dig-info: #234d73;
--dig-font-sans: "IBM Plex Sans", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 15px;
--dig-text-lg: 18px;
--dig-text-xl: 24px;
--dig-text-2xl: 30px;
--dig-text-3xl: 38px;
--dig-text-4xl: 52px;
--dig-text-5xl: 66px;
--dig-leading-tight: 1.16;
--dig-leading-normal: 1.58;
--dig-tracking-tight: -0.01em;
--dig-radius-sm: 4px;
--dig-radius-md: 7px;
--dig-radius-lg: 10px;
--dig-radius-xl: 14px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(17, 17, 17, 0.09);
--dig-shadow-soft: 0 8px 20px rgba(17, 17, 17, 0.07);
--dig-shadow-chunky: 0 2px 0 #34312e;
--dig-glow-accent: 0 0 0 1px rgba(35, 77, 115, 0.24);
--dig-glow-secondary: 0 0 0 1px rgba(136, 103, 55, 0.2);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #1d1c19; --dig-bg-soft: #26241f; --dig-surface: #2c2a24; --dig-surface-strong: #37342d; --dig-surface-elevated: #413d35;
--dig-text: #f1ede4; --dig-text-muted: #c6bfb1; --dig-text-soft: #938b7d; --dig-accent: #7eaed7; --dig-accent-2: #cfab70;
--dig-border: #5b554a; --dig-border-strong: #e0d9ca; --dig-grid-line: rgba(241, 237, 228, .1); --dig-control-bg: #312f29; --dig-control-bg-hover: #403c34;
--dig-success: #75aa80; --dig-warning: #cfab70; --dig-danger: #dc756c; --dig-info: #7eaed7;
```
