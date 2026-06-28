---
id: button
category: primitive
status: active
description: Primary, secondary, ghost, and icon button protocol for Dig UI.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Button

## Use When
- Triggering commands, navigation actions, or contextual operations.

## Avoid When
- A checkbox, toggle, link, tab, or menu item has clearer semantics.

## Slots
- `icon`, `label`, `shortcut`, `loading_indicator`.

## Token Binding
- Use `--dig-accent`, `--dig-control-bg`, `--dig-border`, `--dig-radius-pill`.

## States
- default, hover, active, focus-visible, disabled, loading, destructive.

## Responsive Rules
- Keep minimum touch height at 44px and allow labels to wrap or collapse to icon+tooltip.

## Accessibility
- Buttons need accessible labels; icon-only buttons require `aria-label`.

## Anti-Patterns
- Do not change height, padding, or radius on hover.

## QA Notes
- Check dark/light contrast and focus visibility.
