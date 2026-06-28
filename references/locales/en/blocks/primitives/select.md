---
id: select
category: primitive
status: active
description: Select and option protocol for finite choices.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Select

## Use When
- Choosing one value from a small or medium finite set.

## Avoid When
- Search, multi-select, or typeahead is required; use a combobox pattern.

## Slots
- `label`, `trigger`, `value`, `option_list`, `helper`, `error`.

## Token Binding
- Use `--dig-control-bg`, `--dig-surface-strong`, `--dig-accent`, `--dig-radius-pill`.

## States
- default, hover, open, focus-visible, disabled, loading, error.

## Responsive Rules
- On mobile, option lists must fit viewport height and preserve selected value visibility.

## Accessibility
- Use project Select components in React; HTML previews may use `.dig-select`.

## Anti-Patterns
- Do not use bare native select in final React product UI.

## QA Notes
- Confirm trigger and options share the same radius and surface tokens.
