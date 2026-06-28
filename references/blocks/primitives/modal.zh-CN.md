---
id: modal
category: primitive
status: active
description: 用于确认和短任务的 focus-trapped dialog 协议。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Modal

## Use When
- 确认破坏性操作，或承载短而聚焦的任务。

## Avoid When
- 任务需要长流程导航或信息比较；应使用页面、drawer 或 panel。

## Slots
- `title`, `description`, `body`, `primary_action`, `secondary_action`, `close`.

## Token Binding
- 使用 elevated surface、border、shadow、overlay、radius、focus tokens。

## States
- default, loading, error, destructive, disabled action.

## Responsive Rules
- 移动端短内容 modal 可降级为 bottom sheet。

## Accessibility
- 必须 trap focus、恢复 focus，并标注 dialog。

## Anti-Patterns
- 不要嵌套 modal。

## QA Notes
- 检查 escape、outside click 和 destructive copy。
