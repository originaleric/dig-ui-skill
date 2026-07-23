---
slug: semantic-translation
name: Semantic Translation
name_zh: 语义转译
name_en: Semantic Translation
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 将抽象概念转成可交互空间隐喻的产品叙事视觉语法。
description_en: A product-narrative language that translates an abstract concept into an interactive spatial metaphor.
render:
  archetype: editorial-story
  page_type: marketing
  density: spacious
  canvas: semantic-light
---

# Semantic Translation / 语义转译

## Overview

Semantic Translation starts from a verb, tension, or idea—connect, filter, unfold, balance—and turns it into an interaction-aware visual system. The metaphor guides hierarchy; it never becomes decoration pasted behind a generic interface.

## Style Contract

```yaml
best_for: [product explanation, AI tool landing, guided onboarding, concept workspace, editorial interaction]
avoid_for: [dense audit table, critical incident response, conventional settings form, literal illustration brief]
mood: [clever, clear, conceptual, editorial, intentional]
shape_language:
  stroke: "One repeated transformation—split, bridge, fold, orbit, filter, or stack—organizes shapes and states."
  radius: "The radius follows the chosen metaphor but stays consistent across all repeated components."
  density: "Spacious primary story with compact, practical task regions."
  controls: "Controls remain familiar and accessible even when the surrounding composition is expressive."
surface_language:
  canvas: "Neutral continuous field with one metaphor-native accent relationship."
  panels: "Panels may overlap, split, or align with the metaphor only when semantics remain clear."
  emphasis: "Selected and active states visibly advance the central transformation."
illustration_language:
  imagery: "Use one concrete visual translation of the product promise, not a collage of unrelated symbols."
  diagrams: "Progressive reveal diagrams make the concept operable."
component_mapping:
  concept_hero: "A proposition with a visual transformation that explains it."
  transformation_step: "One input, one operation, and one clear resulting state."
  comparison_pair: "A meaningful contrast before and after the product action."
  interactive_demo: "A focused control that lets users test the concept without a full dashboard."
motion_language:
  energy: "Small transformations clarify cause and effect."
  limits: "Do not animate for novelty or obscure a control's stable location."
```

## Visual Grammar

- Select one metaphor per page group and express it through layout, labels, and component behavior.
- A user must understand the task without decoding the metaphor.
- Keep forms, tables, and critical controls conventional when metaphor would reduce efficiency.

## Avoid

- Mixed metaphors, random abstract blobs, or a different visual trick in every section.
- Naming a metaphor without allowing it to shape any real component.
- Decorative motion that changes reading order or focus position.

## Dig UI CSS Tokens

```css
--dig-bg: #f5f1ed;
--dig-bg-soft: #ece4dc;
--dig-surface: #fffdfa;
--dig-surface-strong: #f1e8df;
--dig-surface-elevated: #ffffff;
--dig-text: #29231f;
--dig-text-muted: #71665e;
--dig-text-soft: #9b8e84;
--dig-accent: #9a3f71;
--dig-accent-strong: #792e58;
--dig-accent-2: #267a80;
--dig-accent-2-strong: #1b5e63;
--dig-border: #d9cdc3;
--dig-border-strong: #554840;
--dig-grid-line: rgba(41, 35, 31, 0.08);
--dig-control-bg: #f8f0e8;
--dig-control-bg-hover: #eee2d6;
--dig-success: #397653;
--dig-warning: #b17b2b;
--dig-danger: #bd4a50;
--dig-info: #267a80;
--dig-font-sans: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "DM Sans", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: "Source Han Serif SC", Georgia, serif;
--dig-text-xs: 11px;
--dig-text-sm: 13px;
--dig-text-md: 16px;
--dig-text-lg: 20px;
--dig-text-xl: 28px;
--dig-text-2xl: 40px;
--dig-text-3xl: 56px;
--dig-text-4xl: 72px;
--dig-text-5xl: 96px;
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
--dig-shadow-panel: 0 1px 0 rgba(41, 35, 31, 0.08), 0 14px 30px rgba(41, 35, 31, 0.06);
--dig-shadow-soft: 0 18px 40px rgba(154, 63, 113, 0.1);
--dig-shadow-chunky: 0 2px 0 #554840;
--dig-glow-accent: 0 0 0 1px rgba(154, 63, 113, 0.2), 0 12px 26px rgba(154, 63, 113, 0.12);
--dig-glow-secondary: 0 0 0 1px rgba(38, 122, 128, 0.2);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #231b23; --dig-bg-soft: #2d222d; --dig-surface: #342936; --dig-surface-strong: #423446; --dig-surface-elevated: #4b3c51;
--dig-text: #fff5fb; --dig-text-muted: #d9c3d2; --dig-text-soft: #a991a3; --dig-accent: #e27fba; --dig-accent-2: #62c8cc;
--dig-border: #664e66; --dig-border-strong: #f3dceb; --dig-grid-line: rgba(255, 245, 251, .1); --dig-control-bg: #3d2f3e; --dig-control-bg-hover: #4d3a4e;
--dig-success: #68b98e; --dig-warning: #d5a24a; --dig-danger: #e77782; --dig-info: #62c8cc;
```
