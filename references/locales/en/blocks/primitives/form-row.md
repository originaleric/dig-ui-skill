---
id: form-row
category: primitive
status: active
description: Label, control, helper, and error row protocol for forms and settings.
applicable_layouts: [settings-form, onboarding-wizard, billing-checkout]
compatible_catalogs: [all]
---

# Form Row

## Use When
- Grouping a label, input/select/control, helper text, and validation feedback.

## Avoid When
- A setting needs read-only summary plus action; use `settings-row`.

## Slots
- `label`, `required_marker`, `control`, `helper`, `error`, `action`.

## Token Binding
- Use spacing, border, text-muted, danger, and control tokens.

## States
- default, required, disabled, loading, error, success.

## Responsive Rules
- Desktop may use two columns; mobile stacks label above control.

## Accessibility
- Label and error text must be programmatically associated.

## Anti-Patterns
- Do not vary row spacing randomly inside one form.

## QA Notes
- Check long labels and localized helper copy.
