---
id: tabs
category: primitive
status: active
description: 用于同一上下文中平级内容视图切换的 tabs 协议。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Tabs

## Use When
- 在同一上下文中切换平级视图。

## Avoid When
- 步骤必须顺序完成；应使用 wizard 或 timeline。

## Slots
- `tab_list`, `tab`, `panel`, `badge`, `overflow_menu`.

## Token Binding
- 使用 accent、muted text、border、control background 和 focus tokens。

## States
- default, hover, active, focus-visible, disabled, loading.

## Responsive Rules
- 移动端可横向滚动，但 label 必须保持可读。

## Accessibility
- 使用正确的 tablist、tab、tabpanel roles。

## Anti-Patterns
- 不要把无关导航塞进 tabs。

## QA Notes
- 确认 active tab 比 hover 更强。
