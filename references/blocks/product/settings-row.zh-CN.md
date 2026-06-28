---
id: settings-row
category: product
status: active
description: 带 label、description、control、status 和可选危险操作的设置项行协议。
applicable_layouts: [settings-form, dashboard-overview]
compatible_catalogs: [all]
task_types: [configuration]
---

# Settings Row

## Use When
- 一个设置项需要稳定 label、说明文本和控制或操作。

## Avoid When
- 用户需要填写多个字段；应使用 form rows 或 form section。

## Slots
- `label`, `description`, `control`, `status`, `action`, `danger_action`.

## Token Binding
- 使用 surface、border、muted text、control background、accent、danger tokens。

## States
- default, enabled, disabled, loading, error, saved, destructive.

## Responsive Rules
- 移动端 control 堆叠在文案下方，危险操作单独分离。

## Accessibility
- toggle 和 status label 必须保持明确。

## Anti-Patterns
- 不要把无关设置混在一行。

## QA Notes
- 检查长描述和 disabled controls。
