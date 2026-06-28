---
id: search-result-row
category: product
status: active
description: 用于全局搜索、文档搜索、run 搜索和设置搜索的搜索结果行协议。
applicable_layouts: [search-results, docs-article, data-table-workspace]
compatible_catalogs: [dig, mono]
---

# Search Result Row

## Use When
- 展示带标题、来源、摘要、元信息和快捷操作的排序或筛选结果。

## Avoid When
- 内容是事件或告警流；应使用 `notification-item`。

## Slots
- `type_icon`, `title`, `source`, `snippet`, `metadata`, `match_highlight`, `actions`.

## Token Binding
- 使用 `--dig-surface`、`--dig-surface-hover`、`--dig-border`、`--dig-text`、`--dig-muted` 和 highlight token。

## States
- default, hover, focus-visible, selected, loading, empty, error, mobile.

## Responsive Rules
- 保持 title 和 source 可见。移动端 snippet 最多两行，次要 metadata 下移。

## Accessibility
- 搜索高亮不能只靠颜色表达；保持可读对比度和键盘 focus。

## Anti-Patterns
- 不要在同一结果集中混用 row、card、feed。不要让 snippet 盖过 title 层级。

## QA Notes
- 检查长 query、无结果、键盘导航、选中态和混合结果类型。
