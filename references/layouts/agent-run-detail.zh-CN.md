---
name: Agent Run Detail
name_zh: Agent 运行详情
slug: agent-run-detail
page_type: runtime
task_type: execution
default_catalog: dig
status: draft
recommended_catalogs: dig, mono
description_zh: 单次 agent run 的详情页：状态头、步骤时间线、输入输出与操作。
description_en: Single agent run detail with status header, step timeline, I/O, and actions.
---

## Slots

```yaml
slots:
  run_header:
    required: true
    role: main
    description: Run ID、状态、耗时、操作按钮。
  step_timeline:
    required: true
    role: main
    description: 步骤/节点执行顺序与时间。
  io_panel:
    required: true
    role: supporting
    description: 输入、输出、错误信息。
  related_runs:
    required: false
    role: supporting
    description: 同 workflow 的最近 runs。
```

## Applicable Scenarios

- 从 run list  drill-down 到单次执行
- 调试 failed run、查看 trace
- Agent orchestration 步骤审计

## Avoid When

- 实时多 run 日志流（用 runtime-console 或 log-inspector）
- 列表页无选中上下文（用 data-table-workspace）
- 营销向 capability 展示

## Recommended Catalogs

dig — 默认 runtime；mono — 调试向高密度详情

## Layout Rules

- run_header 固定关键 meta：status、duration、trigger、environment。
- Retry / Cancel 靠近 header，不在页面底部。
- timeline 垂直排列，当前/失败步骤高亮。
- io_panel 用 mono 字体，JSON 可 scroll，不撑破 layout。
- 不允许 timeline 每步再套独立大 card。

## Responsive Rules

- Desktop：header full width → timeline + io two-column。
- Tablet/mobile：timeline 上、io 下；related_runs 折叠。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-agent-run-detail" data-layout="agent-run-detail">
  <header class="dig-run-header dig-surface" data-slot="run_header">
    <div>
      <p class="dig-kicker">Run</p>
      <h1 class="dig-panel-title" style="margin:0;font-size:var(--dig-text-2xl);">run_8f3a2c91</h1>
      <p class="dig-meta">workflow-alpha · triggered by API · 842ms</p>
    </div>
    <nav class="dig-control-row">
      <span class="dig-tag">FAILED</span>
      <button class="dig-button-secondary">Cancel</button>
      <button class="dig-button-primary">Retry</button>
    </nav>
  </header>
  <div class="dig-run-detail-grid">
    <section class="dig-surface" data-slot="step_timeline">
      <h2 class="dig-panel-title">Steps</h2>
      <div class="dig-timeline-item dig-timeline-ok"><span class="dig-meta">1</span> Parse manifest · 12ms</div>
      <div class="dig-timeline-item dig-timeline-ok"><span class="dig-meta">2</span> Load tools · 48ms</div>
      <div class="dig-timeline-item dig-timeline-fail"><span class="dig-meta">3</span> search_index · timeout</div>
    </section>
    <aside class="dig-surface dig-io-panel" data-slot="io_panel">
      <h2 class="dig-panel-title">Output</h2>
      <pre class="dig-code-block">{"error": "timeout after 30s", "step": "search_index"}</pre>
    </aside>
  </div>
  <section class="dig-surface" data-slot="related_runs">
    <h2 class="dig-panel-title">Related runs</h2>
    <div class="dig-table-row"><span>run_7e2b1a</span><span class="dig-tag">OK</span><span class="dig-meta">5m ago</span></div>
  </section>
</section>
```

## Structural Notes

```css
.layout-agent-run-detail {
  display: grid;
  gap: var(--dig-space-4);
  padding: var(--dig-space-4);
}

.dig-run-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--dig-space-4);
}

.dig-run-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.45fr);
  gap: var(--dig-grid-gutter);
}

.dig-run-detail-grid > * {
  min-width: 0;
}

.dig-timeline-item {
  display: flex;
  gap: var(--dig-space-3);
  padding: var(--dig-space-3) 0;
  border-bottom: 1px solid var(--dig-border);
  font-size: var(--dig-text-sm);
}

.dig-timeline-fail {
  color: var(--dig-danger, var(--dig-text));
  font-weight: 600;
}

.dig-io-panel pre {
  margin: 0;
  font-size: var(--dig-text-xs);
}

@container layout-viewport (max-width: 720px) {
  .dig-run-detail-grid {
    grid-template-columns: 1fr;
  }

  .dig-run-header {
    flex-direction: column;
  }
}
```

## QA Notes

- 失败步骤是否一眼可见。
- Retry 是否靠近 run context。
- io JSON 在 mobile 是否 horizontal scroll 而非撑破页面。
- mono catalog 下 timeline 可读性。
