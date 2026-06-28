---
id: runtime-log-stream
category: product
status: active
description: Execution log stream with severity, filters, copy/export, and expandable payloads.
applicable_layouts: [runtime-console, agent-run-detail, log-inspector]
compatible_catalogs: [dig, mono]
task_types: [execution, observability]
---

# Runtime Log Stream

## Use When
- Showing live or historical logs, trace output, agent events, or execution payloads.

## Avoid When
- The content is a narrative changelog or marketing demo.

## Slots
- `toolbar`, `severity_filter`, `log_row`, `timestamp`, `payload`, `copy_action`, `export_action`.

## Token Binding
- Use mono font, surface, border, status, muted text, and control tokens.

## States
- streaming, paused, empty, error, filtered, selected, expanded, copied.

## Responsive Rules
- Mobile stacks metadata above payload and preserves horizontal code scroll only inside code blocks.

## Accessibility
- Streaming updates need pause and should not constantly steal screen reader focus.

## Anti-Patterns
- Do not wrap every log row in a large card.

## QA Notes
- Verify dense mode, copy behavior, and severity contrast.
