# Execution Workflow

用于 runtime、observability、agent run、trace、queue、log 等界面。

1. 优先使用 `task_type: execution`，不要把 runtime 当作页面类型和视觉皮肤混用。
2. 选择 `runtime-console`、`agent-run-detail`、`log-inspector` 等 layout。
3. 操作型产品 UI 优先 `dig`，高密调试优先 `mono`。
4. 使用 `run-status-header`、`step-timeline`、`runtime-log-stream` 等 blocks。
5. 操作按钮必须靠近 run、log 或 step 上下文。
6. 保持密度和扫描路径，不要把 execution 页面做成 landing page。
