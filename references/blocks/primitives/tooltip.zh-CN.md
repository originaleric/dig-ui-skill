---
id: tooltip
category: primitive
status: active
description: 为紧凑控件提供短解释的 hover/focus 协议。
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Tooltip

## Use When
- 命名纯图标控件，或解释紧凑 metadata。

## Avoid When
- 内容是完成任务所必需的信息；应使用可见文本。

## Slots
- `trigger`, `content`, `shortcut`.

## Token Binding
- 使用 elevated surface、text、border、shadow、radius tokens。

## States
- hover, focus, delayed, disabled trigger.

## Responsive Rules
- 触屏设备优先使用可见 label 或 long-press 行为。

## Accessibility
- tooltip 内容必须可通过键盘 focus 触达。

## Anti-Patterns
- 不要把关键错误或表单要求藏在 tooltip 中。

## QA Notes
- 检查碰撞处理和溢出。
