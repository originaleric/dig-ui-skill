---
id: form-row
category: primitive
status: active
description: 表单和设置页中 label、control、helper、error 的行协议。
applicable_layouts: [settings-form, onboarding-wizard, billing-checkout]
compatible_catalogs: [all]
---

# Form Row

## Use When
- 组合 label、input/select/control、helper text 与 validation feedback。

## Avoid When
- 设置项需要只读摘要加操作；应使用 `settings-row`。

## Slots
- `label`, `required_marker`, `control`, `helper`, `error`, `action`.

## Token Binding
- 使用 spacing、border、text-muted、danger 和 control tokens。

## States
- default, required, disabled, loading, error, success.

## Responsive Rules
- 桌面可两列；移动端 label 堆叠在 control 上方。

## Accessibility
- label 与 error text 必须和控件建立程序化关联。

## Anti-Patterns
- 同一个 form 内不要随机改变 row spacing。

## QA Notes
- 检查长 label 和本地化 helper 文案。
