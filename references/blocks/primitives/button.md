---
id: button
category: primitive
status: active
description: Dig UI 的主按钮、次按钮、ghost 按钮和图标按钮协议。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Button

## Use When
- 触发命令、导航动作或上下文操作。

## Avoid When
- checkbox、toggle、link、tab 或 menu item 语义更清晰。

## Slots
- `icon`, `label`, `shortcut`, `loading_indicator`.

## Token Binding
- 使用 `--dig-accent`、`--dig-control-bg`、`--dig-border`、`--dig-radius-pill`。

## States
- default, hover, active, focus-visible, disabled, loading, destructive.

## Responsive Rules
- 最小触控高度 44px；标签过长时允许换行或降级为 icon + tooltip。

## Accessibility
- 按钮需要可访问名称；纯图标按钮必须提供 `aria-label`。

## Anti-Patterns
- hover 时不要改变高度、padding 或圆角。

## QA Notes
- 检查 dark/light 对比度和 focus 可见性。
