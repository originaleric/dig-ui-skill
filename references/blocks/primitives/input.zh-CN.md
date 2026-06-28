---
id: input
category: primitive
status: active
description: 用于表单、筛选、搜索和内联编辑的文本输入协议。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Input

## Use When
- 输入短文本、数字、筛选条件、搜索词或可编辑标签。

## Avoid When
- 值来自有限选项集合；应使用 select、radio、segmented control 或 combobox。

## Slots
- `label`, `control`, `prefix_icon`, `suffix_action`, `helper`, `error`.

## Token Binding
- 使用 `--dig-control-bg`、`--dig-control-bg-hover`、`--dig-border`、`--dig-text`、`--dig-radius-pill`。

## States
- default, hover, focus-visible, disabled, readonly, loading, error, success.

## Responsive Rules
- 输入框保持 44px 最小高度，移动端不能造成横向滚动。

## Accessibility
- 每个 input 都需要 label 或 `aria-label`；错误文本必须和控件关联。

## Anti-Patterns
- 不要写死暗色 rgba 背景；不要把错误信息只藏在 tooltip 里。

## QA Notes
- 同时检查 label、helper、error、disabled 状态。
