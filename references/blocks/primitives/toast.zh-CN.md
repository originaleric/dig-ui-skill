---
id: toast
category: primitive
status: active
description: 用于 success、error、warning、progress 的临时反馈消息。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Toast

## Use When
- 确认后台动作、保存、复制、重试或可恢复错误。

## Avoid When
- 用户必须做决定；应使用 modal、inline error 或 callout。

## Slots
- `icon`, `title`, `description`, `action`, `dismiss`.

## Token Binding
- 使用 surface、border、accent/status、text、shadow、radius tokens。

## States
- success, error, warning, info, loading, dismissed.

## Responsive Rules
- 移动端 toast 位于底部，不能遮挡主要操作。

## Accessibility
- 除破坏性或阻塞错误外，使用 polite live region。

## Anti-Patterns
- 不要把 toast 作为表单校验错误的唯一位置。

## QA Notes
- 检查自动消失、手动关闭和 action focus 顺序。
