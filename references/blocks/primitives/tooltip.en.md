---
id: tooltip
category: primitive
status: active
description: Short hover/focus explanation for compact controls.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Tooltip

## Use When
- Naming icon-only controls or clarifying compact metadata.

## Avoid When
- The content is required to complete the task; use visible text.

## Slots
- `trigger`, `content`, `shortcut`.

## Token Binding
- Use elevated surface, text, border, shadow, and radius tokens.

## States
- hover, focus, delayed, disabled trigger.

## Responsive Rules
- On touch devices, prefer visible labels or long-press behavior.

## Accessibility
- Tooltip content must be reachable by keyboard focus.

## Anti-Patterns
- Do not hide critical errors or form requirements in tooltips.

## QA Notes
- Check collision handling and overflow.
