---
id: empty-state
category: product
status: active
description: Empty state module with cause, next action, optional illustration, and recovery path.
applicable_layouts: [empty-state, data-table-workspace, dashboard-overview, search-results]
compatible_catalogs: [all]
task_types: [system-state, onboarding, search]
---

# Empty State

## Use When
- A list, dashboard, search, or setup flow has no data yet or no matching results.

## Avoid When
- The state is an error or permission denial; use error or access state.

## Slots
- `icon`, `title`, `description`, `primary_action`, `secondary_action`, `learn_more`.

## Token Binding
- Use surface, muted text, accent, border, and spacing tokens.

## States
- first-use, filtered-empty, permission-empty, loading-empty, recovered.

## Responsive Rules
- Mobile keeps title, reason, and primary action above optional media.

## Accessibility
- Empty state must state the reason and next available action.

## Anti-Patterns
- Do not use generic celebration copy for operational empty states.

## QA Notes
- Check that filtered empty states offer filter reset.
