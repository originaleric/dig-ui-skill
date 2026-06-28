---
id: input
category: primitive
status: active
description: Text input protocol for forms, filters, search, and inline editing.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Input

## Use When
- Capturing short text, numeric values, filters, search terms, or editable labels.

## Avoid When
- The value comes from a finite option set; use select, radio, segmented control, or combobox.

## Slots
- `label`, `control`, `prefix_icon`, `suffix_action`, `helper`, `error`.

## Token Binding
- Use `--dig-control-bg`, `--dig-control-bg-hover`, `--dig-border`, `--dig-text`, `--dig-radius-pill`.

## States
- default, hover, focus-visible, disabled, readonly, loading, error, success.

## Responsive Rules
- Inputs keep 44px minimum height and never force horizontal scrolling on mobile.

## Accessibility
- Every input needs a label or `aria-label`; errors must be associated with the control.

## Anti-Patterns
- Do not hard-code dark rgba backgrounds; do not hide error text behind tooltip-only UI.

## QA Notes
- Verify label, helper, error, and disabled states together.
