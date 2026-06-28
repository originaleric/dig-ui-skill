---
id: run-status-header
category: product
status: active
description: Header for run id, status, duration, trigger, environment, and contextual run actions.
applicable_layouts: [runtime-console, agent-run-detail]
compatible_catalogs: [dig, mono]
task_types: [execution]
---

# Run Status Header

## Use When
- A run, job, workflow, or agent execution needs immediate status and actions.

## Avoid When
- The page is only a list of runs; use table toolbar and row status instead.

## Slots
- `title`, `status`, `metadata`, `duration`, `primary_action`, `secondary_actions`, `danger_action`.

## Token Binding
- Use status, accent, surface, border, mono, and control tokens.

## States
- queued, running, succeeded, failed, canceled, retrying, stale.

## Responsive Rules
- Mobile stacks actions below status while keeping the status visible.

## Accessibility
- Status changes should be announced when they affect user action.

## Anti-Patterns
- Do not move retry or cancel away from the run context.

## QA Notes
- Check long run ids and status badge contrast.
