---
slug: midcentury-noir
name: Midcentury Noir
name_zh: 中世纪黑色现代主义
name_en: Midcentury Noir
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 黑色主导、限色、几何扁平插画与强排版构成的高级叙事型产品视觉语法。
description_en: A premium narrative product language of black-led surfaces, limited color, flat geometry, and decisive type.
render:
  archetype: editorial-story
  page_type: marketing
  density: spacious
  canvas: noir-dual
---

# Midcentury Noir / 中世纪黑色现代主义

## Overview

Midcentury Noir is a non-brand editorial style built from black fields, one accent color, simplified geometric illustration, and precise framing. It is for deliberate product storytelling, not a dark-mode default.

## Style Contract

```yaml
best_for: [premium service landing, product story, portfolio, cultural guide, design-forward onboarding]
avoid_for: [dense admin, realtime monitoring, kid education, multi-accent analytics]
mood: [cinematic, composed, premium, graphic, restrained]
shape_language:
  stroke: "Flat geometric silhouettes, strong frames, and sparse screen-print-like marks."
  radius: "Low radii, sharp composition, and pill controls reserved for interaction."
  density: "Spacious composition with one subject and one primary action per section."
  controls: "High-contrast controls have explicit focus and disabled treatment."
surface_language:
  canvas: "Black is dominant in dark mode; light mode retains strong ink fields rather than becoming generic white SaaS."
  panels: "Large uninterrupted fields with one accent color and minimal paper-grain texture."
  emphasis: "One accent color carries selected states and narrative emphasis."
illustration_language:
  imagery: "Products, people, places, and concepts are simplified into recognizable flat graphic forms."
  diagrams: "Use a short visual sequence or directional geometry, never a crowded infographic."
component_mapping:
  graphic_hero: "One illustrated subject, a complete proposition, and one action."
  feature_frame: "A focused product benefit inside a bold ink field."
  story_sequence: "Three or fewer narrative frames with stable reading order."
  callout: "A compact high-contrast note for a quote, proof point, or selected option."
motion_language:
  energy: "Opacity, clipping, and color changes keep the cinematic pacing controlled."
  limits: "No glossy 3D, neon glow, or continuous film-grain animation."
```

## Visual Grammar

- Keep each page group to black, a neutral light, and one accent color.
- Use geometric illustration to clarify a product proposition, not as generic retro décor.
- Dark and light modes retain the same composition and component semantics.

## Avoid

- Copying named artists, film properties, or magazine covers.
- Multiple accent colors, ornate texture, or an unreadable black-on-black UI.
- Applying cinematic treatment to dense operational information.

## Dig UI CSS Tokens

```css
--dig-bg: #f6f0e4;
--dig-bg-soft: #e9dfcf;
--dig-surface: #fffaf0;
--dig-surface-strong: #e8dcc9;
--dig-surface-elevated: #fffdf7;
--dig-text: #29231e;
--dig-text-muted: #665c51;
--dig-text-soft: #958a7b;
--dig-accent: #b94731;
--dig-accent-strong: #8f3020;
--dig-accent-2: #9e7721;
--dig-accent-2-strong: #7e5c16;
--dig-border: #b8a995;
--dig-border-strong: #29231e;
--dig-grid-line: rgba(41, 35, 30, 0.11);
--dig-control-bg: #f0e7d8;
--dig-control-bg-hover: #e4d8c7;
--dig-success: #397653;
--dig-warning: #9e7721;
--dig-danger: #b6423b;
--dig-info: #3e6fa8;
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
--dig-text-4xl: 78px;
--dig-text-5xl: 104px;
--dig-leading-tight: 0.98;
--dig-leading-normal: 1.48;
--dig-tracking-tight: -0.035em;
--dig-radius-sm: 4px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 18px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(245, 239, 223, 0.1);
--dig-shadow-soft: 0 20px 44px rgba(0, 0, 0, 0.3);
--dig-shadow-chunky: 0 2px 0 #f5efdf;
--dig-glow-accent: 0 0 0 1px rgba(225, 86, 56, 0.28);
--dig-glow-secondary: 0 0 0 1px rgba(230, 196, 95, 0.25);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #171615; --dig-bg-soft: #252321; --dig-surface: #211f1d; --dig-surface-strong: #302d29; --dig-surface-elevated: #3b3732;
--dig-text: #f5efdf; --dig-text-muted: #c2b9a8; --dig-text-soft: #8f877b; --dig-accent: #e15638; --dig-accent-2: #e6c45f;
--dig-border: #514b43; --dig-border-strong: #f5efdf; --dig-grid-line: rgba(245, 239, 223, .11); --dig-control-bg: #302d29; --dig-control-bg-hover: #413c36;
--dig-success: #5fb37a; --dig-warning: #e6c45f; --dig-danger: #ee7466; --dig-info: #78aeea;
```
