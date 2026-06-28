---
id: empty-state
category: product
status: active
description: 带原因、下一步操作、可选插图和恢复路径的空状态模块协议。
applicable_layouts: [empty-state, data-table-workspace, dashboard-overview, search-results]
compatible_catalogs: [all]
task_types: [system-state, onboarding, search]
---

# Empty State

## Use When
- 列表、dashboard、search 或 setup flow 没有数据或没有匹配结果。

## Avoid When
- 状态是 error 或 permission denial；应使用错误态或权限态。

## Slots
- `icon`, `title`, `description`, `primary_action`, `secondary_action`, `learn_more`.

## Token Binding
- 使用 surface、muted text、accent、border、spacing tokens。

## States
- first-use, filtered-empty, permission-empty, loading-empty, recovered.

## Responsive Rules
- 移动端 title、reason 和 primary action 位于可选 media 上方。

## Accessibility
- 空状态必须说明原因和下一步可用操作。

## Anti-Patterns
- 操作型空状态不要使用泛泛的庆祝式文案。

## QA Notes
- filtered empty state 必须提供 reset filter。
