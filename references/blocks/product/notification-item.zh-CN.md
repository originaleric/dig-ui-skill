---
id: notification-item
category: product
status: active
description: 用于 inbox、alert、approval 和系统事件的通知行协议。
applicable_layouts: [notification-inbox, dashboard-overview]
compatible_catalogs: [dig, mono]
---

# Notification Item

## Use When
- 展示按时间排序的事件、告警、审批请求或面向用户的系统通知。

## Avoid When
- 内容是可搜索的文档或对象结果；应使用 `search-result-row`。

## Slots
- `status_icon`, `title`, `summary`, `timestamp`, `actor`, `actions`, `read_state`.

## Token Binding
- 使用 `--dig-surface`、`--dig-surface-hover`、`--dig-border`、`--dig-text`、`--dig-muted` 和语义状态 token。

## States
- unread, read, selected, hover, focus-visible, loading, error, archived, mobile.

## Responsive Rules
- 移动端保持 title 和 timestamp 可见，次要 actions 移入 overflow menu。

## Accessibility
- 未读状态不能只靠颜色表达。action menu 需要 label 和键盘可达。

## Anti-Patterns
- 不要把每条通知都做成大 card。不要只用装饰色隐藏 severity。

## QA Notes
- 检查未读密度、时间对齐、长标题、批量选择和移动端 overflow。
