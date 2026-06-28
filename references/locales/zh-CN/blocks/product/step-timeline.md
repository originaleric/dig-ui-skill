---
id: step-timeline
category: product
status: active
description: 带 status、timing 和可展开详情的有序执行或设置步骤协议。
applicable_layouts: [agent-run-detail, runtime-console, onboarding-wizard]
compatible_catalogs: [all]
task_types: [execution, onboarding]
---

# Step Timeline

## Use When
- 展示有序步骤、执行节点、设置阶段或审计轨迹。

## Avoid When
- items 是无顺序的同级记录；应使用 table、list 或 feed。

## Slots
- `step_index`, `status`, `title`, `timestamp`, `duration`, `details`, `action`.

## Token Binding
- 使用 status、border、muted text、mono、spacing、focus tokens。

## States
- pending, active, succeeded, failed, skipped, expanded, collapsed.

## Responsive Rules
- 移动端先保持 order 和 status 可见，再显示 details。

## Accessibility
- status 和 order 必须通过文本表达，不能只靠颜色。

## Anti-Patterns
- 除非 details 需要，否则不要把每个 step 做成完整 card。

## QA Notes
- 同时检查 failed 和 active 状态。
