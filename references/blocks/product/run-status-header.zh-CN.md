---
id: run-status-header
category: product
status: active
description: 用于 run id、status、duration、trigger、environment 和上下文操作的头部协议。
applicable_layouts: [runtime-console, agent-run-detail]
compatible_catalogs: [dig, mono]
task_types: [execution]
---

# Run Status Header

## Use When
- run、job、workflow 或 agent execution 需要即时状态和操作。

## Avoid When
- 页面只是 run 列表；应使用 table toolbar 和 row status。

## Slots
- `title`, `status`, `metadata`, `duration`, `primary_action`, `secondary_actions`, `danger_action`.

## Token Binding
- 使用 status、accent、surface、border、mono、control tokens。

## States
- queued, running, succeeded, failed, canceled, retrying, stale.

## Responsive Rules
- 移动端 action 堆叠到 status 下方，但 status 必须保持可见。

## Accessibility
- 状态变化影响用户操作时，需要可被辅助技术感知。

## Anti-Patterns
- 不要把 retry 或 cancel 移出 run 上下文。

## QA Notes
- 检查长 run id 和 status badge 对比度。
