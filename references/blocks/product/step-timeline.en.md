---
id: step-timeline
category: product
status: active
description: Ordered execution or setup steps with status, timing, and expandable details.
applicable_layouts: [agent-run-detail, runtime-console, onboarding-wizard]
compatible_catalogs: [all]
task_types: [execution, onboarding]
---

# Step Timeline

## Use When
- Showing ordered steps, execution nodes, setup stages, or audit trails.

## Avoid When
- Items are peer records without sequence; use table, list, or feed.

## Slots
- `step_index`, `status`, `title`, `timestamp`, `duration`, `details`, `action`.

## Token Binding
- Use status, border, muted text, mono, spacing, and focus tokens.

## States
- pending, active, succeeded, failed, skipped, expanded, collapsed.

## Responsive Rules
- Mobile keeps order and status visible before details.

## Accessibility
- Status and order must be conveyed in text, not color alone.

## Anti-Patterns
- Do not turn every step into a full card unless details require it.

## QA Notes
- Check failed and active states together.
