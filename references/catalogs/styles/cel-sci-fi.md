---
slug: cel-sci-fi
name: Cel Sci-Fi
name_zh: 赛璐璐科幻
name_en: Cel Sci-Fi
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 以限色、硬边阴影、空间动势和模块化装置表达实验型 AI、开发者教育与产品发布的视觉语法。
description_en: A limited-palette, hard-shadow, kinetic spatial language for experimental AI, developer education, and product launches.
render:
  archetype: editorial-story
  page_type: marketing
  density: comfortable
  canvas: sci-fi-dual
---

# Cel Sci-Fi / 赛璐璐科幻

## Overview

Cel Sci-Fi uses crisp linework, hard-edged color planes, and one directional scene to make a product feel in motion. It is a general retro-future visual language, not a reference to any existing anime property.

## Style Contract

```yaml
best_for: [experimental AI product, developer education, launch narrative, creative tool onboarding, systems explainer]
avoid_for: [critical operations, calm financial review, medical workflow, dense settings page]
mood: [kinetic, optimistic, technical, vivid, decisive]
shape_language:
  stroke: "Crisp dark linework, angular module frames, hard shadow planes, and one dominant directional vector."
  radius: "Medium rounded device forms may contrast with sharp scene cuts; controls remain stable pills."
  density: "A clear hero scene with compact explanatory modules and a disciplined action hierarchy."
  controls: "Primary action is high contrast; utility controls stay quiet and accessible."
surface_language:
  canvas: "One dominant deep color in dark mode or pale field in light mode, plus two controlled supporting colors."
  panels: "Hard-edged color planes and outlined device surfaces; no glass or neon wash."
  emphasis: "A warning yellow, electric green, or orange accent identifies the current action or system transition."
illustration_language:
  imagery: "Abstract machines, files, cards, code modules, and spatial devices imply an active transformation."
  diagrams: "A single directional sequence can explain scan, transform, connect, or launch."
component_mapping:
  launch_scene: "One product operation shown as a spatial transformation with a clear CTA."
  system_module: "A labeled device-like panel for a capability, step, or tool."
  action_path: "A directional three-step sequence with strong start and finish states."
  signal_callout: "A compact status or compatibility note using a limited accent."
motion_language:
  energy: "Short hard-cut reveals, line draws, and progress transitions convey movement."
  limits: "No character imitation, chaotic particle fields, strobing, or continually moving backgrounds."
```

## Visual Grammar

- Use one visual center, one direction, and no more than three major colors per screen.
- The scene must explain the product action; a static icon floating beside copy is not enough.
- Keep forms, data tables, and execution controls conventional when visual drama would impair use.

## Avoid

- Referencing protected characters, studios, titles, or recognizable franchise motifs.
- Rainbow palettes, cyberpunk glow, or several competing actions.
- Turning production UI into an animated splash screen.

## Dig UI CSS Tokens

```css
--dig-bg: #f7f1df;
--dig-bg-soft: #ece3c9;
--dig-surface: #fffaf0;
--dig-surface-strong: #e8dfc8;
--dig-surface-elevated: #ffffff;
--dig-text: #241f35;
--dig-text-muted: #655f72;
--dig-text-soft: #918a9c;
--dig-accent: #4d8827;
--dig-accent-strong: #376a17;
--dig-accent-2: #a66e00;
--dig-accent-2-strong: #825400;
--dig-border: #bcb1c5;
--dig-border-strong: #241f35;
--dig-grid-line: rgba(36, 31, 53, 0.12);
--dig-control-bg: #f0e8d4;
--dig-control-bg-hover: #e4dac2;
--dig-success: #387a2e;
--dig-warning: #a66e00;
--dig-danger: #b6423b;
--dig-info: #4969b4;
--dig-font-sans: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Space Grotesk", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 16px;
--dig-text-lg: 20px;
--dig-text-xl: 28px;
--dig-text-2xl: 40px;
--dig-text-3xl: 58px;
--dig-text-4xl: 76px;
--dig-text-5xl: 100px;
--dig-leading-tight: 1;
--dig-leading-normal: 1.46;
--dig-tracking-tight: -0.03em;
--dig-radius-sm: 6px;
--dig-radius-md: 12px;
--dig-radius-lg: 18px;
--dig-radius-xl: 26px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 2px 0 rgba(0, 0, 0, 0.28), 0 14px 28px rgba(0, 0, 0, 0.2);
--dig-shadow-soft: 0 18px 40px rgba(0, 0, 0, 0.28);
--dig-shadow-chunky: 0 3px 0 #fbf3df;
--dig-glow-accent: 0 0 0 2px rgba(139, 212, 80, 0.24);
--dig-glow-secondary: 0 0 0 2px rgba(245, 192, 36, 0.22);
--dig-motion-bounce: cubic-bezier(0.18, 0.88, 0.26, 1.12);
```

## Dig UI Dark Tokens

```css
--dig-bg: #1d1a2f; --dig-bg-soft: #292440; --dig-surface: #26213a; --dig-surface-strong: #36304d; --dig-surface-elevated: #40395a;
--dig-text: #fbf3df; --dig-text-muted: #c0b9d0; --dig-text-soft: #8d86a1; --dig-accent: #8bd450; --dig-accent-2: #f5c024;
--dig-border: #625a78; --dig-border-strong: #fbf3df; --dig-grid-line: rgba(251, 243, 223, .12); --dig-control-bg: #312b48; --dig-control-bg-hover: #403959;
--dig-success: #8bd450; --dig-warning: #f5c024; --dig-danger: #ef6a5c; --dig-info: #8ca8ff;
```
