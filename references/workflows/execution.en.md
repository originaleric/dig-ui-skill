# Execution Workflow

Use this workflow for runtime, observability, agent-run, trace, queue, and log surfaces.

1. Prefer `task_type: execution` over using runtime as a visual skin.
2. Choose a layout such as `runtime-console`, `agent-run-detail`, or `log-inspector`.
3. Prefer `dig` for operational product UI and `mono` for dense debugging.
4. Use blocks such as `run-status-header`, `step-timeline`, and `runtime-log-stream`.
5. Keep actions close to the run, log, or step context.
6. Preserve density and scan paths; do not make execution views into landing pages.
