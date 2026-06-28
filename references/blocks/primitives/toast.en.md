---
id: toast
category: primitive
status: active
description: Temporary feedback message for success, error, warning, and progress.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Toast

## Use When
- Confirming background actions, saves, copies, retries, or recoverable errors.

## Avoid When
- The user must make a decision; use modal, inline error, or callout.

## Slots
- `icon`, `title`, `description`, `action`, `dismiss`.

## Token Binding
- Use surface, border, accent/status, text, shadow, and radius tokens.

## States
- success, error, warning, info, loading, dismissed.

## Responsive Rules
- Mobile toasts use bottom placement and avoid covering primary controls.

## Accessibility
- Use polite live regions except destructive or blocking errors.

## Anti-Patterns
- Do not use toast as the only place for form validation errors.

## QA Notes
- Verify timeout, manual dismiss, and action focus order.
