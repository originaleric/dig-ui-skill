---
id: select
category: primitive
status: active
description: 用于有限选项选择的 select 与 option 协议。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Select

## Use When
- 从小到中等规模的有限集合中选择一个值。

## Avoid When
- 需要搜索、多选或 typeahead；应使用 combobox 模式。

## Slots
- `label`, `trigger`, `value`, `option_list`, `helper`, `error`.

## Token Binding
- 使用 `--dig-control-bg`、`--dig-surface-strong`、`--dig-accent`、`--dig-radius-pill`。

## States
- default, hover, open, focus-visible, disabled, loading, error.

## Responsive Rules
- 移动端 option list 必须适配 viewport 高度，并保持已选值可见。

## Accessibility
- React 产品实现使用项目 Select 组件；HTML preview 可使用 `.dig-select`。

## Anti-Patterns
- 最终 React 产品 UI 不要直接使用裸原生 select。

## QA Notes
- 确认 trigger 和 option 使用一致的圆角与 surface token。
