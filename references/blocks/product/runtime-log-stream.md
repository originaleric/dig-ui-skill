---
id: runtime-log-stream
category: product
status: active
description: 带 severity、filters、copy/export 和可展开 payload 的执行日志流协议。
applicable_layouts: [runtime-console, agent-run-detail, log-inspector]
compatible_catalogs: [dig, mono]
task_types: [execution, observability]
---

# Runtime Log Stream

## Use When
- 展示实时或历史日志、trace output、agent events 或 execution payloads。

## Avoid When
- 内容是叙事型 changelog 或营销 demo。

## Slots
- `toolbar`, `severity_filter`, `log_row`, `timestamp`, `payload`, `copy_action`, `export_action`.

## Token Binding
- 使用 mono font、surface、border、status、muted text、control tokens。

## States
- streaming, paused, empty, error, filtered, selected, expanded, copied.

## Responsive Rules
- 移动端 metadata 放在 payload 上方；只有 code block 内允许横向滚动。

## Accessibility
- streaming updates 需要 pause，不应持续抢占 screen reader focus。

## Anti-Patterns
- 不要给每一条 log row 套大 card。

## QA Notes
- 检查 dense mode、copy 行为和 severity 对比度。
