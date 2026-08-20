---
slug: hologram-moire
name: Hologram Moiré
name_zh: 珠光全息
name_en: Hologram Moiré
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 以珠光柔雾、流体粉蓝色带和微网点干涉纹构成的安静未来主义视觉语法。
description_en: A soft-future language of pearlescent haze, flowing pastel ribbons, and fine moiré dots.
render:
  archetype: creative-canvas-workspace
  page_type: product
  density: comfortable
  canvas: pearlescent-moire
---

# Hologram Moiré / 珠光全息

## Overview

Hologram Moiré is a gentle optical-film language: pearl-white surfaces, powder-blue depth, blurred pastel ribbons, and a field of tiny white interference dots. It conveys discovery and tactility without becoming neon cyberpunk or generic glassmorphism.

## Style Contract

```yaml
best_for: [creative workspace, personal AI space, product onboarding, calm product launch, exploration and empty states]
avoid_for: [high-density observability, incident response, trading interface, destructive admin flow, long repetitive data table]
mood: [luminous, tactile, calm, optimistic, dreamlike]
shape_language:
  stroke: "Fine pearl-gray contours, gently displaced dot fields, and fluid ribbon crops create depth without hard sci-fi geometry."
  radius: "Soft medium panels and stable pill controls; avoid inflated blob components or full glass capsules."
  density: "Open focal surfaces with a calm reading rhythm; dense work regions revert to clear rows and conventional tables."
  controls: "A stable blue solid identifies actions; cyan, pink, mint, and butter remain atmospheric or secondary signal colors."
surface_language:
  canvas: "Pearl white and mist blue carry one low-contrast flowing color field with a localized moiré dot layer."
  panels: "Mostly opaque white or ice surfaces with a low-contrast cool border; transparency is subtle and never the sole grouping cue."
  emphasis: "Use a soft color ribbon, halo, or dot-density shift to orient attention, while text and state remain explicit."
illustration_language:
  imagery: "Abstract optical film, contour rivers, iridescent folds, and dotted interference maps suggest motion and dimensionality."
  diagrams: "Use layered paths, sampled points, and softly connected regions to explain exploration or synthesis."
component_mapping:
  moire_hero: "One spacious pearl field with a central product proposition, a focused action, and a restrained dot-flow illustration."
  discovery_panel: "A white information panel that uses a small color-ribbon edge or dot sample for orientation."
  layered_canvas: "A calm canvas with clear tools, layers, and collaborative presence above a non-interactive optical background."
  soft_empty_state: "An abstract low-contrast contour field paired with a practical next action."
motion_language:
  energy: "Slow ribbon drift, opacity changes, and a single dot-field reveal support orientation."
  limits: "No rapid shimmer, full-screen moving gradients, distortion around text, or motion that affects reading; honor prefers-reduced-motion."
```

## Visual Grammar

- The light theme is the signature mode: start from pearl white, mist blue, and a single low-contrast flowing field.
- Make the micro-dot interference pattern local to a hero, empty state, or canvas; it must not reduce legibility in normal content.
- Keep actions blue and surfaces tangible. The colorful material is atmosphere, not an interaction-state system.

## Background Motion

- Treat the background as an ambient layer behind the product shell: two or three blurred powder-blue, pink, mint, and butter ribbons drift over 24–32 seconds.
- Layer a localized field of tiny white dots above the ribbons. The dots may move a few pixels independently to create optical interference, but must not run below dense content, controls, or body text.
- The preview uses `render.canvas: pearlescent-moire` to express this background directly. Product implementations should keep it fixed behind the scrolling content and disable both animations for `prefers-reduced-motion`.

## Avoid

- Generic purple-blue AI gradients, opaque rainbow blobs, and blurred glass panels with no information boundary.
- Using pastel color alone for error, warning, selected, or focus states.
- Filling operational tables, settings forms, or every card with the decorative moiré field.

## Dig UI CSS Tokens

```css
--dig-bg: #f3f2f4;
--dig-bg-soft: #e5e9f1;
--dig-surface: #fbfbfc;
--dig-surface-strong: #e9edf4;
--dig-surface-elevated: #ffffff;
--dig-text: #253249;
--dig-text-muted: #66738a;
--dig-text-soft: #919bad;
--dig-accent: #5579c7;
--dig-accent-strong: #3e60a8;
--dig-accent-2: #67cbe3;
--dig-accent-2-strong: #3babc5;
--dig-border: #c6cfdf;
--dig-border-strong: #7181a0;
--dig-grid-line: rgba(255, 255, 255, 0.78);
--dig-control-bg: #f0f3f8;
--dig-control-bg-hover: #e3e9f3;
--dig-success: #397e6c;
--dig-warning: #a37b34;
--dig-danger: #b75168;
--dig-info: #5579c7;
--dig-holo-pink: #ecd9e2;
--dig-holo-mint: #cde8df;
--dig-holo-butter: #ece8c9;
--dig-holo-flow-duration: 28s;
--dig-holo-dot-size: 1.2px;
--dig-holo-dot-opacity: 0.68;
--dig-font-sans: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Manrope", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 16px;
--dig-text-lg: 20px;
--dig-text-xl: 28px;
--dig-text-2xl: 40px;
--dig-text-3xl: 56px;
--dig-text-4xl: 76px;
--dig-text-5xl: 98px;
--dig-leading-tight: 1.02;
--dig-leading-normal: 1.5;
--dig-tracking-tight: -0.03em;
--dig-radius-sm: 8px;
--dig-radius-md: 14px;
--dig-radius-lg: 22px;
--dig-radius-xl: 32px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(255, 255, 255, 0.92), 0 12px 30px rgba(74, 100, 143, 0.1);
--dig-shadow-soft: 0 22px 52px rgba(99, 137, 190, 0.14);
--dig-shadow-chunky: 0 2px 0 #d8e1ef;
--dig-glow-accent: 0 0 20px rgba(103, 203, 227, 0.16);
--dig-glow-secondary: 0 0 20px rgba(236, 217, 226, 0.28);
--dig-motion-bounce: cubic-bezier(0.2, 0.78, 0.22, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #050409; --dig-bg-soft: #0b0913; --dig-surface: #0b0a12; --dig-surface-strong: #12101d; --dig-surface-elevated: #191627;
--dig-text: #f4effc; --dig-text-muted: #c1b7cf; --dig-text-soft: #81758f; --dig-accent: #46d9ff; --dig-accent-strong: #16b5e3; --dig-accent-2: #a768ff; --dig-accent-2-strong: #7d43d0;
--dig-border: #2e2545; --dig-border-strong: #7557a4; --dig-grid-line: rgba(142, 116, 255, .09); --dig-control-bg: #14111f; --dig-control-bg-hover: #1e1830;
--dig-success: #48d7c4; --dig-warning: #efc16b; --dig-danger: #e96ebd; --dig-info: #46d9ff;
--dig-holo-pink: #e351e7; --dig-holo-mint: #21daf6; --dig-holo-butter: #f0be68; --dig-holo-flow-duration: 38s; --dig-holo-dot-size: 1px; --dig-holo-dot-opacity: 0.06;
--dig-shadow-panel: 0 1px 0 rgba(255, 255, 255, .03), 0 18px 44px rgba(0, 0, 0, .52); --dig-shadow-soft: 0 26px 64px rgba(0, 0, 0, .58); --dig-glow-accent: 0 0 24px rgba(70, 217, 255, .18); --dig-glow-secondary: 0 0 24px rgba(167, 104, 255, .18);
```
