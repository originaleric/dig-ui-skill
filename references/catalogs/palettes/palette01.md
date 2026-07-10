---
slug: palette01
name: System Blue
name_zh: 默认系统蓝
name_en: System Blue
kind: color-palette-catalog
category: palettes
token_contract: palette_v1
status: active
description_zh: 以 #0071e3 为主强调色的清晰系统蓝配色，适合产品工作台、开发工具、仪表盘和文档型产品界面。
description_en: A crisp system-blue palette anchored by #0071e3 for product workspaces, developer tools, dashboards, and documentation interfaces.
---

# System Blue / 默认系统蓝

## Overview

System Blue is the first color-first Dig palette. It is intentionally neutral, system-native, and product-focused: black text on a quiet light canvas, Apple-like action blue for primary intent, and a lighter information blue for secondary emphasis.

这套 palette 是 Dig color catalog 的第一条基准线。它不模拟某个品牌，而是提供一套适合产品界面的系统蓝：清晰、高对比、控件友好，并且去掉绿色调。

## Palette Contract

```yaml
best_for:
  - dashboard
  - product workspace
  - developer tool
  - documentation
  - settings
mood:
  - crisp
  - system-native
  - high-contrast
  - calm
anchors:
  canvas: "#f7f7f7"
  ink: "#000000"
  primary: "#0071e3"
  support: "#4fb3ff"
candidates:
  support:
    - label: Sky Information
      value: "#4fb3ff"
      strong: "#2697eb"
    - label: Deep Information
      value: "#0b57d0"
      strong: "#0848ad"
    - label: Periwinkle
      value: "#7a7fad"
      strong: "#5e6390"
    - label: Soft Gold
      value: "#b68a35"
      strong: "#8a6724"
    - label: Sage Gray
      value: "#6f8f7a"
      strong: "#4f6f59"
derived_roles:
  surface: "#ffffff"
  muted: "#4b5563"
  focus: "#0071e3"
  disabled: "rgba(0, 0, 0, 0.32)"
  overlay: "rgba(0, 0, 0, 0.42)"
site_roles:
  page_background: "{anchors.canvas}"
  headline: "{anchors.ink}"
  body_text: "{anchors.ink}"
  muted_text: "derived_roles.muted"
  cta_background: "{anchors.primary}"
  cta_text: "#ffffff"
  card_background: "derived_roles.surface"
  card_text: "{anchors.ink}"
  link: "{anchors.primary}"
  illustration_highlight: "{anchors.support}"
  focus_ring: "derived_roles.focus"
  disabled_text: "derived_roles.disabled"
  overlay: "derived_roles.overlay"
derivation:
  method: manual-curated-stops
  inspiration: radix-inspired-role-scale
  generator: none
  generator_status: future
contrast:
  body_text_on_page_background: "AA"
  body_text_on_surface: "AA"
  cta_text_on_cta_background: "AA"
notes:
  - "Primary action blue is #0071e3."
  - "Strong primary blue is #006EDB."
  - "Support blue is #4fb3ff and intentionally carries information emphasis."
```

## Color Roles

- `canvas` anchors the page and preview background at `#f7f7f7`.
- `ink` keeps the default light-mode text black for maximum clarity.
- `primary` is the main action color: buttons, active states, links, focus affordances.
- `support` is a secondary information blue used for secondary emphasis, badges, illustration details, and non-primary highlights.
- `surface` remains white so content panels feel crisp against the canvas.
- Borders intentionally follow the current Dig light-mode contract: default border is `rgba(0, 0, 0, 0.56)`, strong border is `rgba(0, 0, 0, 0.75)`, and grid line follows the default border.

## Manual Scale Stops

```css
--dig-blue-1: #f5fbff;
--dig-blue-2: #e7f4ff;
--dig-blue-3: #cfe9ff;
--dig-blue-4: #9ed4ff;
--dig-blue-5: #4fb3ff;
--dig-blue-6: #2697eb;
--dig-blue-7: #0b57d0;
--dig-primary-9: #0071e3;
--dig-primary-10: #006edb;
--dig-support-9: #4fb3ff;
--dig-support-10: #2697eb;
```

These stops are curated for semantic use, not a generated 12-step scale. Use the semantic tokens first; use scale stops only for charts, illustrations, and documented variants.

## Dig UI CSS Tokens

```css
--dig-bg: #f7f7f7;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #f2f2f2;
--dig-surface-elevated: #ffffff;
--dig-text: #000000;
--dig-text-muted: #4b5563;
--dig-text-soft: #6b7280;
--dig-accent: #0071e3;
--dig-accent-strong: #006EDB;
--dig-accent-2: #4fb3ff;
--dig-accent-2-strong: #2697eb;
--dig-border: rgba(0, 0, 0, 0.56);
--dig-border-strong: rgba(0, 0, 0, 0.75);
--dig-grid-line: rgba(0, 0, 0, 0.56);
--dig-control-bg: rgb(250, 250, 252);
--dig-control-bg-hover: rgb(245, 245, 247);
--dig-blue-1: #f5fbff;
--dig-blue-2: #e7f4ff;
--dig-blue-3: #cfe9ff;
--dig-blue-4: #9ed4ff;
--dig-blue-5: #4fb3ff;
--dig-blue-6: #2697eb;
--dig-blue-7: #0b57d0;
--dig-primary-9: #0071e3;
--dig-primary-10: #006EDB;
--dig-support-9: #4fb3ff;
--dig-support-10: #2697eb;
--dig-font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--dig-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
--dig-font-serif: ui-serif, Georgia, "Times New Roman", serif;
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 20px;
--dig-text-2xl: 24px;
--dig-text-3xl: 32px;
--dig-text-5xl: 56px;
--dig-leading-normal: 1.55;
--dig-leading-tight: 1.05;
--dig-tracking-tight: -0.02em;
--dig-radius-sm: 6px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 18px;
--dig-radius-pill: 999px;
--dig-shadow-panel: 0 18px 54px rgba(0, 0, 0, 0.12);
--dig-glow-accent: 0 0 0 1px rgba(0, 113, 227, 0.2), 0 16px 42px rgba(0, 113, 227, 0.18);
--dig-glow-secondary: 0 0 0 1px rgba(79, 179, 255, 0.18), 0 18px 48px rgba(79, 179, 255, 0.14);
```

## Usage Notes

- Use this palette when the product should feel clear, direct, and system-native.
- Use `--dig-accent` for primary action and active state.
- Use `--dig-accent-2` for information tint, secondary accents, and visual support.
- Keep typography and components restrained; the blue should carry intent, not decoration.
- Do not combine this palette with green success-driven brand systems unless the user explicitly requests a hybrid.
