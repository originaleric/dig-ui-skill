---
slug: cyberpunk-neon
name: Cyberpunk Neon
name_zh: 赛博霓虹
name_en: Cyberpunk Neon
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 以夜雨、霓虹信号、像素化边缘和受控 RGB 偏移构成的高能未来都市视觉语法。
description_en: A high-energy neon-night language of rain, signal light, pixel edges, and controlled RGB offset for future-city narratives.
render:
  archetype: editorial-story
  page_type: marketing
  density: comfortable
  canvas: neon-signal-frame
  default_theme: dark
---

# Cyberpunk Neon / 赛博霓虹

## Overview

Cyberpunk Neon turns a page into a precise slice of a future city: dark architecture, sparse electric signage, rain-slick reflections, and one strong transmission or product signal. It is an original visual grammar informed by urban night, not an imitation of a particular game, film, artist, or franchise.

## Style Contract

```yaml
best_for: [experimental product launch, music or culture campaign, game companion, creator portfolio, immersive AI narrative]
avoid_for: [critical operations, financial review, long form-heavy settings, medical workflow, dense data entry]
mood: [electric, nocturnal, defiant, cinematic, kinetic]
shape_language:
  stroke: "Dark architectural frames, thin luminous rails, pixel cuts, and a rare chromatic offset at the edge of a focal object."
  radius: "Mostly compact radii for surfaces; controls remain stable pills and never imitate glitch fragments."
  density: "One cinematic focal scene with a disciplined layer of metadata, actions, and signal labels."
  controls: "Electric cyan identifies the primary action; magenta identifies a non-destructive secondary signal, never a second primary CTA."
surface_language:
  canvas: "Ink-black blue with rainy depth, sparse neon reflections, and enough untouched darkness for text to breathe."
  panels: "Opaque mineral panels with segmented cyan-to-magenta signal borders, a single illuminated edge rail, and no generic frosted glass."
  emphasis: "Cyan, magenta, and ultraviolet appear as small transmitted signals, not as full-screen rainbow gradients."
illustration_language:
  imagery: "Abstract skyline blocks, signage geometry, rain traces, holographic polygons, and fashion-forward silhouettes may establish the scene."
  diagrams: "Use route lines, signal arcs, and coordinates to explain a journey or connection; keep operational charts conventional."
component_mapping:
  city_hero: "A single focal object or message set against an abstract night-city depth field with one primary action."
  signal_panel: "A compact dark module for a launch detail, capability, or event with one colored status rail."
  transmission_list: "A vertically repeatable feed of time, source, signal state, and action without oversized cards."
  glitch_empty_state: "A low-motion transmission loss or reconnect state with a useful recovery action."
motion_language:
  energy: "Brief signal lock-on, rain drift, and constrained RGB separation on entry or state transition."
  limits: "No strobe, flashing text, perpetual glitch, illegible distortion, or motion on critical controls; honor prefers-reduced-motion."
```

## Visual Grammar

- Establish one dark continuous scene, one focal object, and one cyan primary action before adding any decorative signal.
- Keep the background dark, calm, and atmospheric; reserve scan lines and RGB offset for the illustration layer and selected signal frames.
- Use magenta as a supporting signal only. A screen full of cyan, magenta, and violet has no hierarchy.
- Give meaningful panels a segmented signal border or an illuminated edge rail. Do not apply the treatment to every nested `div`; it marks a scene, control region, selected item, or transmitted signal.

## Render Frame

- `render.canvas: neon-signal-frame` keeps the background intentionally quiet, so the product structure—not a decorative city scene—carries the page.
- The render defaults to dark mode. The light mode remains a compatible daytime interface, not the signature marketing presentation.
- Major panel borders use one continuous cyan-to-magenta gradient with compact corner rails. The hero title uses a readable cyan-to-pink fill, not white text with offset shadows; body copy, inputs, and dense data stay neutral.

## Avoid

- Copying recognizable characters, city compositions, logos, fictional locations, or typography from existing cyberpunk properties.
- Making every border glow, every label flicker, or every card a translucent glass panel.
- Using the visual language to disguise warning, error, focus, disabled, or selected states.

## Dig UI CSS Tokens

```css
--dig-bg: #eef3ff;
--dig-bg-soft: #dfe8ff;
--dig-surface: #fafcff;
--dig-surface-strong: #e8eeff;
--dig-surface-elevated: #ffffff;
--dig-text: #101b48;
--dig-text-muted: #52648c;
--dig-text-soft: #8190b1;
--dig-accent: #0879ff;
--dig-accent-strong: #005bd8;
--dig-accent-2: #d933e8;
--dig-accent-2-strong: #ad20c2;
--dig-border: #b8c8f1;
--dig-border-strong: #3559bd;
--dig-grid-line: rgba(23, 66, 160, 0.1);
--dig-control-bg: #edf2ff;
--dig-control-bg-hover: #dce6ff;
--dig-success: #197e63;
--dig-warning: #d96b1f;
--dig-danger: #c23b55;
--dig-info: #0879ff;
--dig-neon-window: #d933e8;
--dig-neon-border: #0879ff;
--dig-neon-title-start: #0b96ff;
--dig-neon-title-end: #e63de3;
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
--dig-radius-md: 10px;
--dig-radius-lg: 16px;
--dig-radius-xl: 24px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 2px 0 rgba(8, 96, 255, 0.18), 0 14px 30px rgba(24, 38, 104, 0.16);
--dig-shadow-soft: 0 18px 44px rgba(43, 30, 124, 0.18);
--dig-shadow-chunky: 0 2px 0 #3559bd;
--dig-glow-accent: 0 0 18px rgba(8, 121, 255, 0.26);
--dig-glow-secondary: 0 0 18px rgba(217, 51, 232, 0.22);
--dig-motion-bounce: cubic-bezier(0.18, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #060a24; --dig-bg-soft: #0b1340; --dig-surface: #101a4a; --dig-surface-strong: #17265e; --dig-surface-elevated: #21346f;
--dig-text: #f3f7ff; --dig-text-muted: #bdc9ee; --dig-text-soft: #8293bd; --dig-accent: #23e5ff; --dig-accent-strong: #00bdf0; --dig-accent-2: #ff40c8; --dig-accent-2-strong: #d92ba7;
--dig-border: #3854a5; --dig-border-strong: #78f2ff; --dig-grid-line: rgba(46, 156, 255, .16); --dig-control-bg: #12205a; --dig-control-bg-hover: #1b3074;
--dig-success: #40e5b5; --dig-warning: #ff8a5d; --dig-danger: #ff668e; --dig-info: #23e5ff;
--dig-neon-window: #ff40c8; --dig-neon-border: #23e5ff; --dig-neon-title-start: #47efff; --dig-neon-title-end: #ff6bcf;
--dig-shadow-panel: 0 2px 0 rgba(35, 229, 255, .22), 0 16px 36px rgba(2, 4, 29, .45); --dig-shadow-soft: 0 20px 48px rgba(255, 64, 200, .16); --dig-shadow-chunky: 0 2px 0 #3854a5;
--dig-glow-accent: 0 0 20px rgba(35, 229, 255, .38); --dig-glow-secondary: 0 0 20px rgba(255, 64, 200, .34);
```
