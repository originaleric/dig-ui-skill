---
id: tabs
category: primitive
status: active
description: Tabbed navigation protocol for peer content views.
applicable_layouts: [all]
compatible_catalogs: [all]
---

# Tabs

## Use When
- Switching between peer views within the same context.

## Avoid When
- Steps must be completed sequentially; use wizard or timeline.

## Slots
- `tab_list`, `tab`, `panel`, `badge`, `overflow_menu`.

## Token Binding
- Use accent, muted text, border, control background, and focus tokens.

## States
- default, hover, active, focus-visible, disabled, loading.

## Responsive Rules
- Mobile tabs may scroll horizontally only when labels remain readable.

## Accessibility
- Use correct tablist, tab, and tabpanel roles.

## Anti-Patterns
- Do not place unrelated navigation in tabs.

## QA Notes
- Confirm active tab is stronger than hover.
