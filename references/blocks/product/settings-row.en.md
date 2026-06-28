---
id: settings-row
category: product
status: active
description: Settings item row with label, description, control, status, and optional destructive action.
applicable_layouts: [settings-form, dashboard-overview]
compatible_catalogs: [all]
task_types: [configuration]
---

# Settings Row

## Use When
- A setting needs a stable label, explanatory text, and a control or action.

## Avoid When
- The user must enter multiple fields; use form rows or a form section.

## Slots
- `label`, `description`, `control`, `status`, `action`, `danger_action`.

## Token Binding
- Use surface, border, muted text, control background, accent, and danger tokens.

## States
- default, enabled, disabled, loading, error, saved, destructive.

## Responsive Rules
- Mobile stacks control under copy while keeping destructive actions separate.

## Accessibility
- Toggle and status labels must remain explicit.

## Anti-Patterns
- Do not mix unrelated settings in one row.

## QA Notes
- Check long descriptions and disabled controls.
