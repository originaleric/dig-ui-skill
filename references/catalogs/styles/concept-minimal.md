---
slug: concept-minimal
name: Concept Minimal
name_zh: 概念极简
name_en: Concept Minimal
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 用单一视觉隐喻、强排版与克制留白表达观点型产品与叙事页面的极简风格。
description_en: A minimal language of one visual metaphor, decisive type, and deliberate whitespace for idea-led products and narratives.
render:
  archetype: editorial-story
  page_type: marketing
  density: spacious
  canvas: stark-dual
---

# Concept Minimal / 概念极简

## Overview

Concept Minimal gives a page one idea, one visual tension, and one reading path. It is an independent non-brand style for products and narratives, not a replacement for the Mono brand catalog.

## Style Contract

```yaml
best_for: [concept-led landing page, product thesis, focused onboarding, reflective writing, premium empty state]
avoid_for: [dense analytics, multi-step operations, marketplace browsing, playful rewards]
mood: [stark, thoughtful, precise, confident, quiet]
shape_language:
  stroke: "High-contrast rules, sparse geometric marks, and one decisive interruption of the grid."
  radius: "Small radii and controlled pills; geometry should feel intentional, never soft-card generic."
  density: "Spacious at page level, compact only where an interaction needs precision."
  controls: "One dominant action and low-noise secondary actions."
surface_language:
  canvas: "Near-white or near-black continuous canvas with a single inversion or accent field."
  panels: "Use panels only to clarify a task boundary; most grouping comes from spacing and type."
  emphasis: "One accent or inversion expresses the central product idea."
illustration_language:
  imagery: "A single abstract object, crop, line, or typographic gesture functions as the metaphor."
  diagrams: "Use only when it compresses an idea more clearly than prose."
component_mapping:
  thesis_hero: "One complete proposition, one visual metaphor, and one action."
  contrast_panel: "A before/after, choice, or tension expressed through two disciplined regions."
  focused_form: "One primary field or decision with quiet supporting guidance."
  empty_state: "One useful next action, not a decorative illustration collection."
motion_language:
  energy: "Restrained fades and clipping reveals support the reading path."
  limits: "No bounce, gradient drift, parallax, or ambient visual effects."
```

## Visual Grammar

- One concept per viewport; remove visual elements that do not carry that concept.
- Use typography as structure, not as an oversized decorative poster.
- Preserve accessibility when using inversion: focus, selected, and disabled states remain explicit.

## Avoid

- Mistaking empty space for missing hierarchy.
- Generic black-and-white luxury styling with no product metaphor.
- Forcing operational pages into a sparse marketing composition.

## Dig UI CSS Tokens

```css
--dig-bg: #f8f8f6;
--dig-bg-soft: #ededeb;
--dig-surface: #ffffff;
--dig-surface-strong: #e7e7e3;
--dig-surface-elevated: #ffffff;
--dig-text: #101010;
--dig-text-muted: #62625f;
--dig-text-soft: #969692;
--dig-accent: #101010;
--dig-accent-strong: #000000;
--dig-accent-2: #d64a2b;
--dig-accent-2-strong: #ac381f;
--dig-border: #c9c9c4;
--dig-border-strong: #101010;
--dig-grid-line: rgba(16, 16, 16, 0.1);
--dig-control-bg: #f1f1ee;
--dig-control-bg-hover: #e3e3df;
--dig-success: #24724d;
--dig-warning: #a5701d;
--dig-danger: #bf3d31;
--dig-info: #2d5f9b;
--dig-font-sans: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
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
--dig-text-5xl: 104px;
--dig-leading-tight: 0.98;
--dig-leading-normal: 1.48;
--dig-tracking-tight: -0.04em;
--dig-radius-sm: 4px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 18px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(16, 16, 16, 0.08);
--dig-shadow-soft: 0 16px 36px rgba(16, 16, 16, 0.08);
--dig-shadow-chunky: 0 2px 0 #101010;
--dig-glow-accent: 0 0 0 1px rgba(16, 16, 16, 0.22);
--dig-glow-secondary: 0 0 0 1px rgba(214, 74, 43, 0.22);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #121212; --dig-bg-soft: #1c1c1b; --dig-surface: #20201f; --dig-surface-strong: #2b2b29; --dig-surface-elevated: #353532;
--dig-text: #f7f7f2; --dig-text-muted: #c4c4bd; --dig-text-soft: #8f8f88; --dig-accent: #f7f7f2; --dig-accent-2: #ff7657;
--dig-border: #4b4b47; --dig-border-strong: #f7f7f2; --dig-grid-line: rgba(247, 247, 242, .1); --dig-control-bg: #2a2a28; --dig-control-bg-hover: #393936;
--dig-success: #5fbd82; --dig-warning: #dbad4c; --dig-danger: #ee7164; --dig-info: #7eaeec;
```
