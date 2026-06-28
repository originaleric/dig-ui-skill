---
id: table-toolbar
category: product
status: active
description: 用于 search、filters、sorting、bulk actions、export 和 table 主操作的工具栏协议。
applicable_layouts: [data-table-workspace, search-results, dashboard-overview]
compatible_catalogs: [all]
task_types: [data-operations, search, monitoring]
---

# Table Toolbar

## Use When
- 表格或高密列表需要搜索、筛选、排序、导出、批量操作或创建操作。

## Avoid When
- collection 是叙事型、视觉型，或规模小到不需要操作工具栏。

## Slots
- `search`, `filters`, `sort`, `bulk_actions`, `primary_action`, `export`, `density`.

## Token Binding
- 使用 control background、border、muted text、accent、spacing tokens。

## States
- default, filtered, bulk-selected, loading, disabled, empty, error.

## Responsive Rules
- 移动端保留 search 和 primary action；次级 filters 折叠进 menu。

## Accessibility
- filter 状态必须可读，并能通过键盘移除。

## Anti-Patterns
- 同一产品内不要跨页面改变 primary action 的顺序。

## QA Notes
- 检查本地化 filter label 过长时的换行。
