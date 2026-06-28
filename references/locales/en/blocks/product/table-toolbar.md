---
id: table-toolbar
category: product
status: active
description: Toolbar for search, filters, sorting, bulk actions, export, and primary table actions.
applicable_layouts: [data-table-workspace, search-results, dashboard-overview]
compatible_catalogs: [all]
task_types: [data-operations, search, monitoring]
---

# Table Toolbar

## Use When
- A table or dense list needs search, filters, sorting, export, bulk actions, or creation actions.

## Avoid When
- The collection is editorial, visual, or small enough to need no operational controls.

## Slots
- `search`, `filters`, `sort`, `bulk_actions`, `primary_action`, `export`, `density`.

## Token Binding
- Use control background, border, muted text, accent, and spacing tokens.

## States
- default, filtered, bulk-selected, loading, disabled, empty, error.

## Responsive Rules
- Mobile keeps search and primary action visible; secondary filters collapse into a menu.

## Accessibility
- Filter state must be readable and removable by keyboard.

## Anti-Patterns
- Do not reorder primary actions between pages in the same product.

## QA Notes
- Check wrapping with long localized filter labels.
