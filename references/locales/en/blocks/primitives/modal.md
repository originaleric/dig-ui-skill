---
id: modal
category: primitive
status: active
description: Focus-trapped dialog protocol for confirmation and focused tasks.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Modal

## Use When
- Confirming destructive actions or presenting a focused short task.

## Avoid When
- The task needs long navigation or comparison; use a page, drawer, or panel.

## Slots
- `title`, `description`, `body`, `primary_action`, `secondary_action`, `close`.

## Token Binding
- Use elevated surface, border, shadow, overlay, radius, and focus tokens.

## States
- default, loading, error, destructive, disabled action.

## Responsive Rules
- Mobile modals may become bottom sheets when content is short.

## Accessibility
- Trap focus, restore focus, and label the dialog.

## Anti-Patterns
- Do not open nested modals.

## QA Notes
- Check escape, outside click, and destructive copy.
