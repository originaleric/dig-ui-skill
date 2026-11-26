---
slug: liquid-glass
name: Liquid Glass
name_zh: 液态玻璃
name_en: Liquid Glass
kind: style-catalog
category: styles
token_contract: style_v1
status: active
description_zh: 面向内容浏览的液态玻璃风格，亮暗主题均以稳定正文承托浮动导航与工具。
description_en: A neutral Liquid Glass style for content browsing, with floating navigation and tools above solid reading surfaces in light and dark.
render:
  archetype: token-sheet
  density: comfortable
  canvas: theme-dual
---

# Liquid Glass / 液态玻璃

## Overview

Use Liquid Glass for content browsing where bottom navigation and a small floating toolbar need to remain visible over changing content. A translucent tint softens the image beneath the controls while preserving broad changes in color and tone. Thin highlights trace the top and bottom edges and fade along the sides, with a soft shadow beneath the control layer. This is a Web interpretation of the Regular material described in [Apple's Materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials#Liquid-Glass).

「用液态玻璃风格」直接选用本目录。正文、长表单、密集表格和关键确认沿用实底，只在底部导航和浮动工具栏应用半透明磨砂玻璃，保留背景的色彩和明暗轮廓。需要 Apple 品牌或产品展示语言时，选用 [Apple catalog](../media-consumer/apple.md)。一个页面使用一个基础 catalog。

[Interactive demo / 交互样张](../../../assets/demos/liquid-glass/index.html) · [Style Lab / 调参预览](../../../renders/styles/liquid-glass.html)

## Style Contract

```yaml
best_for: [content browsing, image-led reading, bottom navigation, floating article tools]
avoid_for: [dense data, long forms, critical confirmation, color-critical surfaces]
mood: [calm, neutral, tactile, legible]
shape_language:
  controls: "Use a compact pill-shaped layer with separate targets of at least 44 by 44 CSS pixels. Preserve labels and visible focus at 360px."
  layout: "Reserve space at the end of scrolling content for a fixed bottom navigation. Place the toolbar and navigation in separate layers."
surface_language:
  content: "Use the solid --dig-bg for the page and --dig-surface for text panels. Keep body content, forms, tables, and critical actions on solid surfaces."
  floating_controls: "Start with --dig-surface and --dig-text. When supported, use --dig-glass-fill over backdrop blur with --dig-glass-blur so broad backdrop detail remains visible. Use --dig-glass-highlight-top and --dig-glass-highlight-bottom for 1px reflections along the top and bottom rim that fade midway along the sides. Use a soft --dig-shadow-float below the layer. Keep the reflection decorative and outside target geometry."
  fallback: "Use opaque --dig-surface without blur when transparency is disabled, filter or color-mix is unsupported, or reduced transparency or higher contrast is requested. In forced colors keep the surface Canvas and use CanvasText for the boundary, focus, and current marker."
illustration_language:
  imagery: "Use imagery that helps the reader understand the content. Validate controls on light, dark, split and detailed image backgrounds."
component_mapping:
  bottom_navigation: "Use labeled links with icons and aria-current for the current page. Give the current item an inset pill and a filled icon. Start with --dig-control-bg-hover for the pill and use --dig-glass-active when color mixing is supported. Keep the control dimensions steady and preserve selection and focus in opaque and forced-color modes. When a link replaces content in the same document, focus the new heading."
  floating_toolbar: "Use native labeled buttons for primary and secondary actions. Use semantic disabled and aria-pressed where needed. Use --dig-accent with --dig-on-accent for a pressed or toggled button, and preserve a non-color cue for selection."
  focus: "Draw an inset two-pixel --dig-focus-ring inside the target. On an accent-filled target, use --dig-on-accent for the ring."
  contrast: "Check the actual composite under captions and glyphs. Require 4.5:1 for ordinary text and 3:1 for required icons, selection and focus. Increase fill or use the opaque surface if the real backdrop or customized colors fail."
motion_language:
  transitions: "Use brief state transitions for controls. Apply the end state immediately when reduced motion is requested. Keep active and focused targets stationary."
```

## Control Surface / 控制层

在已有定位的底部导航和工具栏容器上应用材质。上下边缘各有一条细高光，在两侧渐隐。两层分别直接面对页面背景，图标、文字和焦点使用独立前景。示例中的 `data-opaque` 可接到应用已有的减少透明度设置。主题颜色调参后，按实际页面背景复验对比度。

Apply this CSS to the positioned bottom navigation and toolbar containers. Keep the highlight confined to the rim. Keep labels and icons in the foreground and give the current navigation item an inset pill and a filled icon. Use the opaque switch for application-level preferences and recheck the composite after tuning colors.

```css
.liquid-glass-controls {
  color: var(--dig-text);
  background-color: var(--dig-surface);
  border: 1px solid transparent;
  border-radius: var(--dig-radius-pill);
  box-shadow: var(--dig-shadow-float);
}

nav.liquid-glass-controls a[aria-current="page"] {
  background-color: var(--dig-control-bg-hover);
  color: var(--dig-text);
}

@supports (color: color-mix(in srgb, white, transparent)) {
  nav.liquid-glass-controls a[aria-current="page"] {
    background-color: var(--dig-glass-active);
  }
}

@supports (backdrop-filter: blur(1px)) and (color: color-mix(in srgb, white, transparent)) {
  .liquid-glass-controls {
    background-color: var(--dig-glass-fill);
    backdrop-filter: blur(var(--dig-glass-blur));
  }

  @supports (mask-composite: exclude) {
    .liquid-glass-controls::after {
      content: "";
      position: absolute;
      inset: -1px;
      padding: 1px;
      border-radius: inherit;
      background: linear-gradient(178deg, var(--dig-glass-highlight-top),
                                  transparent 46%, transparent 54%,
                                  var(--dig-glass-highlight-bottom));
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
    }
  }
}

[data-opaque] .liquid-glass-controls {
  background-color: var(--dig-surface);
  backdrop-filter: none;
}

[data-opaque] .liquid-glass-controls::after {
  content: none;
}

@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .liquid-glass-controls {
    background-color: var(--dig-surface);
    backdrop-filter: none;
    border-color: var(--dig-border);
  }

  .liquid-glass-controls::after {
    content: none;
  }
}

@media (forced-colors: active) {
  .liquid-glass-controls {
    background-color: Canvas;
    backdrop-filter: none;
    border-color: CanvasText;
    box-shadow: none;
  }

  nav.liquid-glass-controls a[aria-current="page"] {
    background-color: CanvasText;
    color: Canvas;
    forced-color-adjust: none;
  }

  nav.liquid-glass-controls a[aria-current="page"]:focus-visible {
    outline-color: Canvas;
  }

  .liquid-glass-controls::after {
    content: none;
  }
}
```

## Dig UI CSS Tokens

```css
--dig-bg: #efefea;
--dig-bg-soft: #f4f5f0;
--dig-surface: #f9f9f5;
--dig-surface-strong: #e6ebe5;
--dig-surface-elevated: #ffffff;
--dig-text: #101613;
--dig-text-muted: #151d18;
--dig-text-soft: #5c6760;
--dig-accent: #123b33;
--dig-accent-strong: #0f302a;
--dig-on-accent: #ffffff;
--dig-accent-2: #4e616e;
--dig-accent-2-strong: #344852;
--dig-border: #cbd1ca;
--dig-border-strong: #68766f;
--dig-grid-line: rgba(34, 39, 37, 0.09);
--dig-control-bg: #f9f9f5;
--dig-control-bg-hover: #e6ebe5;
--dig-success: #296342;
--dig-warning: #754d17;
--dig-danger: #9d3835;
--dig-info: #365d75;
--dig-focus-ring: #123930;
--dig-glass-fill: color-mix(in srgb, color-mix(in srgb, var(--dig-surface) 25%, white) 52%, transparent);
--dig-glass-blur: 10px;
--dig-glass-active: color-mix(in srgb, var(--dig-control-bg-hover) 85%, transparent);
--dig-glass-highlight-top: rgba(255, 255, 255, .64);
--dig-glass-highlight-bottom: rgba(255, 255, 255, .60);
--dig-shadow-float: 0 3px 12px rgba(18, 33, 28, .15);
--dig-font-sans: system-ui, "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: Georgia, "Songti SC", serif;
--dig-font-mono: ui-monospace, "SFMono-Regular", Consolas, monospace;
--dig-font-serif: Georgia, "Songti SC", serif;
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 21px;
--dig-text-2xl: 28px;
--dig-text-3xl: 32px;
--dig-text-4xl: 44px;
--dig-text-5xl: 61px;
--dig-leading-tight: 1.12;
--dig-leading-normal: 1.6;
--dig-tracking-tight: -0.035em;
--dig-radius-sm: 8px;
--dig-radius-md: 12px;
--dig-radius-lg: 20px;
--dig-radius-xl: 28px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 2px 10px rgba(18, 33, 28, 0.10);
--dig-shadow-soft: 0 6px 18px rgba(18, 33, 28, 0.12);
--dig-shadow-chunky: 0 2px 0 rgba(18, 33, 28, 0.18);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Dig UI Dark Tokens

```css
--dig-bg: #191d1b;
--dig-bg-soft: #1e2421;
--dig-surface: #242a27;
--dig-surface-strong: #303933;
--dig-surface-elevated: #313a35;
--dig-text: #f7faf6;
--dig-text-muted: #eff5f0;
--dig-text-soft: #a9b7ae;
--dig-accent: #9ce5cf;
--dig-accent-strong: #b3efd9;
--dig-on-accent: #152821;
--dig-accent-2: #a1c1d3;
--dig-accent-2-strong: #bbd7e6;
--dig-border: #495750;
--dig-border-strong: #86978d;
--dig-grid-line: rgba(240, 244, 237, 0.12);
--dig-control-bg: #242a27;
--dig-control-bg-hover: #303933;
--dig-success: #a3dfb4;
--dig-warning: #f2cd8a;
--dig-danger: #f1aaa6;
--dig-info: #a5cde6;
--dig-focus-ring: #9ce5cf;
--dig-glass-fill: color-mix(in srgb, color-mix(in srgb, var(--dig-surface) 15%, black) 59%, transparent);
--dig-glass-blur: 12px;
--dig-glass-active: color-mix(in srgb, var(--dig-bg) 88%, transparent);
--dig-glass-highlight-top: rgba(255, 255, 255, .55);
--dig-glass-highlight-bottom: rgba(255, 255, 255, .47);
--dig-shadow-float: 0 3px 12px rgba(0, 0, 0, .24);
--dig-font-sans: system-ui, "PingFang SC", "Noto Sans SC", sans-serif;
--dig-font-display: Georgia, "Songti SC", serif;
--dig-font-mono: ui-monospace, "SFMono-Regular", Consolas, monospace;
--dig-font-serif: Georgia, "Songti SC", serif;
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 21px;
--dig-text-2xl: 28px;
--dig-text-3xl: 32px;
--dig-text-4xl: 44px;
--dig-text-5xl: 61px;
--dig-leading-tight: 1.12;
--dig-leading-normal: 1.6;
--dig-tracking-tight: -0.035em;
--dig-radius-sm: 8px;
--dig-radius-md: 12px;
--dig-radius-lg: 20px;
--dig-radius-xl: 28px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 2px 10px rgba(0, 0, 0, 0.24);
--dig-shadow-soft: 0 6px 18px rgba(0, 0, 0, 0.30);
--dig-shadow-chunky: 0 2px 0 rgba(0, 0, 0, 0.44);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
```
