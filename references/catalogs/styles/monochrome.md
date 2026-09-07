---
slug: monochrome
name: Monochrome
name_zh: 单色
name_en: Monochrome
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 只用黑、白与中性灰，通过细边框、圆角面板和清晰排版建立层次的简洁产品视觉语法。
description_en: A simple product language using only black, white, and neutral grays, with fine borders, rounded panels, and clear typography.
render:
  archetype: monochrome-workspace
  page_type: product
  density: comfortable
  canvas: theme-dual
  default_theme: dark
---

# Monochrome / 单色

## Overview

Monochrome is a scene-independent black, white, and grayscale style. Simplicity comes from a reduced visual vocabulary, not a requirement for empty space or low information density. It works across product workspaces, dashboards, settings, libraries, and focused product pages. The name describes both themes equally.

## Style Contract

```yaml
best_for: [neutral product workspace, dashboard, content library, settings, personal tools, focused product page]
avoid_for: [color-critical editing, mandatory semantic color coding, categorical charts that cannot be distinguished without color, multicolor brand storytelling]
mood: [simple, neutral, quiet, precise, understated]
shape_language:
  stroke: "Fine neutral borders and separators; use stronger strokes only for focus, selected controls, and meaningful chart series."
  radius: "Consistent softly rounded panels, smaller inset surfaces, and pill controls; no ornamental cut corners or inflated blobs."
  density: "Adjust spacing to the task. Dense information is welcome when aligned and grouped; minimal color does not imply sparse content."
  controls: "Black actions on light surfaces, white actions on dark surfaces, with an explicit inverse foreground. Secondary actions use gray fills or fine outlines."
surface_language:
  canvas: "Light uses a white canvas and pale gray grouping. Dark uses a near-black canvas and black panels. All chromatic channels remain equal."
  panels: "Opaque matte surfaces, restrained borders, and almost no shadow. No tinted gray, glass blur, metallic sheen, or colored accents."
  emphasis: "Use luminance, size, weight, spacing, and line style. Local monochrome node glow is optional; it never replaces a status label or focus indicator."
illustration_language:
  imagery: "Optional grayscale line fields, point samples, or monochrome images belong to a relevant focal region. Network imagery is not required."
  diagrams: "Differentiate series using solid and dashed strokes, direct labels, markers, or hatching. Keep diagram texture away from body text and controls."
component_mapping:
  panel: "A fine rounded frame with a stable heading, body, and optional contextual action. Avoid wrapping every text group in a card."
  metric_group: "Aligned labels, tabular numbers, units, and explicit signed changes; shared separators instead of one card per number."
  collection: "Consistent rows or tables with readable metadata, named states, and nearby actions."
  form: "Stacked labels, neutral inputs, pill actions, visible focus, and explicit helper and error text."
  chart: "A neutral grid and clearly labeled series, with optional low-contrast grayscale area fill or fine texture."
motion_language:
  energy: "Brief opacity or border transitions. A static interface is the default."
  limits: "No continuous background motion, bouncing controls, pulsing text, or global glow. Honor prefers-reduced-motion."
```

## Visual Grammar

- Restrict every color, including semantic-state and preview-control colors, to black, white, or equal-channel neutral gray. Do not import the blue accent from local Dig defaults.
- Use sans-serif for headings, body, and numbers. Use tabular numerals for aligned metrics; reserve monospace for identifiers or code rather than creating a terminal aesthetic.
- Maintain a clear inverse foreground for solid actions in both themes. Muted text must remain readable on its actual surface.
- Dark and light share the same component structure and hierarchy. Only theme tokens change; no permanently dark panels inside the light theme.
- Keep texture and node halos optional and local. Flat matte surfaces are the baseline, not a second variant.
- Unlike the existing `mono` core catalog, this style does not require terminal or blueprint cues. Unlike `concept-minimal`, it does not prescribe sparse narrative composition.

## States and Accessibility

- Success, warning, error, and information remain grayscale. Always pair states with visible words and distinct symbols or shapes; never expect gray shades alone to communicate severity.
- Selected controls need a fill or marker and semantic selected/checked state. Keyboard focus uses a distinct two-pixel ring; text-input focus strengthens the existing border.
- Disabled controls have a neutral muted treatment and native disabled semantics. Loading and empty states include explanatory text. Errors keep the entered value and provide a recovery action when applicable.
- For charts, preserve axes, units, labels, and a text equivalent. Use a dashed line for projections and a solid line for observations; do not assign meaning only to luminance.
- If a workflow requires mandated color signals, select another catalog rather than silently weakening this style's grayscale contract.

## Render Template

- `monochrome-workspace` is a dedicated reusable sample generated by `sync_renders.py`, with structural CSS scoped in `assets/catalog-preview.css`.
- Its light and dark maps must each explicitly define `--dig-on-accent`, `--dig-chart-line`, `--dig-chart-fill`, `--dig-field-line`, `--dig-field-node`, and `--dig-field-halo`. Generator, catalog validation, and customstyle import reject missing or empty values; these roles are specific to this archetype, not requirements for other styles.
- The example uses `dashboard-overview` slots: topbar, a shared KPI strip, a primary figure and collection, and a secondary trend/settings region. The sample's workspace subject does not limit style applicability.
- Provide a static line-field figure, labeled progress, a working week/month radio group with different data, settings input/checkbox, and an expandable state specimen.
- Generate each period's curve, total, bilingual SVG title/description, and expandable daily data table from the same values. Switch the whole period group together so hidden data is also absent from the accessibility tree; only the decorative line field is hidden from assistive technology.
- At narrow widths stack primary then secondary regions, wrap controls, and preserve labels and actions. The sample must not require horizontal page scrolling.
- The existing Style Lab supplies theme switching, bilingual copy, token editing, and export of both theme maps. Color experiments in Style Lab are user customizations; the canonical catalog remains grayscale.

## Dig UI CSS Tokens

```css
--dig-bg: #ffffff;
--dig-bg-soft: #f4f4f4;
--dig-surface: #ffffff;
--dig-surface-strong: #f0f0f0;
--dig-surface-elevated: #ffffff;
--dig-text: #161616;
--dig-text-muted: #595959;
--dig-text-soft: #707070;
--dig-accent: #161616;
--dig-accent-strong: #000000;
--dig-accent-2: #666666;
--dig-accent-2-strong: #444444;
--dig-on-accent: #ffffff;
--dig-border: #d8d8d8;
--dig-border-strong: #808080;
--dig-grid-line: rgba(0, 0, 0, 0.08);
--dig-control-bg: #ededed;
--dig-control-bg-hover: #e2e2e2;
--dig-success: #343434;
--dig-warning: #515151;
--dig-danger: #161616;
--dig-info: #595959;
--dig-chart-line: #444444;
--dig-chart-fill: rgba(0, 0, 0, 0.08);
--dig-field-line: rgba(0, 0, 0, 0.12);
--dig-field-node: #444444;
--dig-field-halo: rgba(0, 0, 0, 0.12);
--dig-font-sans: "Inter", "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: "Inter", "PingFang SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", Consolas, monospace;
--dig-font-serif: Georgia, serif;
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 20px;
--dig-text-xl: 24px;
--dig-text-2xl: 32px;
--dig-text-3xl: 40px;
--dig-text-4xl: 48px;
--dig-text-5xl: 64px;
--dig-leading-tight: 1.08;
--dig-leading-normal: 1.5;
--dig-tracking-tight: -0.03em;
--dig-radius-sm: 8px;
--dig-radius-md: 14px;
--dig-radius-lg: 22px;
--dig-radius-xl: 28px;
--dig-radius-pill: 999px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 32px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: none;
--dig-shadow-soft: none;
--dig-shadow-chunky: none;
--dig-glow-accent: none;
--dig-glow-secondary: none;
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #101010;
--dig-bg-soft: #171717;
--dig-surface: #000000;
--dig-surface-strong: #202020;
--dig-surface-elevated: #282828;
--dig-text: #f5f5f5;
--dig-text-muted: #b0b0b0;
--dig-text-soft: #949494;
--dig-accent: #f5f5f5;
--dig-accent-strong: #ffffff;
--dig-accent-2: #b3b3b3;
--dig-accent-2-strong: #d1d1d1;
--dig-on-accent: #000000;
--dig-border: #303030;
--dig-border-strong: #858585;
--dig-grid-line: rgba(255, 255, 255, 0.09);
--dig-control-bg: #222222;
--dig-control-bg-hover: #333333;
--dig-success: #dedede;
--dig-warning: #bcbcbc;
--dig-danger: #f5f5f5;
--dig-info: #b0b0b0;
--dig-chart-line: #dedede;
--dig-chart-fill: rgba(255, 255, 255, 0.12);
--dig-field-line: rgba(255, 255, 255, 0.14);
--dig-field-node: #ededed;
--dig-field-halo: rgba(255, 255, 255, 0.24);
--dig-shadow-panel: none;
--dig-shadow-soft: none;
--dig-shadow-chunky: none;
--dig-glow-accent: none;
--dig-glow-secondary: none;
```
