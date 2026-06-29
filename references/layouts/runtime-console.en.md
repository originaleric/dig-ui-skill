---
name: Runtime Console
name_zh: 运行态控制台
slug: runtime-console
page_type: runtime
task_type: execution
default_catalog: dig
status: draft
recommended_catalogs: dig, mono
description_zh: Agent 编排、任务执行与日志流控制台，强调可操作与可观测。
description_en: Agent orchestration console for runs, queues, and live log streams.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 环境、运行状态、紧急控制。
  run_toolbar:
    required: true
    role: control
    description: 启动/停止/重试、筛选、时间范围。
  run_list:
    required: true
    role: main
    description: 当前运行中的任务或 agent 列表。
  log_stream:
    required: true
    role: log
    description: 实时日志或 trace 面板。
  inspector:
    required: false
    role: supporting
    description: 选中 run 的详情、输入输出、错误栈。
```

## Applicable Scenarios

- Agent orchestration 实时控制台
- 多 run 并行监控 + log stream
- 需要同时看列表、日志、inspector 的 runtime 页

## Avoid When

- 单次 run 详情 drill-down（用 agent-run-detail）
- 纯 log 搜索（用 log-inspector）
- 无 live 数据的 static 报告

## Recommended Catalogs

dig — 默认 runtime；mono — 终端式控制台

## Layout Rules

- 三栏控制台：run list（窄）+ log stream（宽）+ inspector（可选侧栏）。
- run_toolbar 紧贴 run_list 上方，操作与列表上下文绑定。
- log stream 是主视觉焦点，至少占 50% 宽度。
- 不允许 log 区被装饰性 panel 挤压到不可读。
- 状态色仅用于 run 状态标签，不做全屏背景染色。
- 停止/重试等危险操作使用 secondary，仅「确认停止」用 danger 语义。

## Responsive Rules

- Desktop：topbar → toolbar + three-column（list / logs / inspector）。
- Tablet：topbar → toolbar → list + logs stacked；inspector 为抽屉或底部 sheet。
- Mobile：topbar 简化；run list 折叠为 tabs；log 全宽；inspector 全屏 overlay。
- 日志行在移动端保持 mono 12px 下限，不缩到 10px。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-runtime-console" data-layout="runtime-console">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Runtime</div>
    <nav class="dig-control-row">
      <span class="dig-tag">eu-west · live</span>
      <button class="dig-button-secondary">Pause all</button>
      <button class="dig-button-primary">New run</button>
    </nav>
  </header>

  <div class="dig-runtime-toolbar" data-slot="run_toolbar">
    <div class="dig-control-row">
      <button class="dig-button-secondary">Filter</button>
      <button class="dig-button-secondary">Last 1h</button>
    </div>
    <div class="dig-control-row">
      <button class="dig-button-secondary">Retry failed</button>
      <button class="dig-button-primary">Deploy</button>
    </div>
  </div>

  <div class="dig-runtime-grid">
    <aside class="dig-surface dig-run-list" data-slot="run_list">
      <h2 class="dig-panel-title">Runs</h2>
      <div class="dig-table-row">
        <span>agent-07</span>
        <span class="dig-tag">RUN</span>
      </div>
      <div class="dig-table-row">
        <span>batch-ingest</span>
        <span class="dig-tag">OK</span>
      </div>
      <div class="dig-table-row">
        <span>eval-suite</span>
        <span class="dig-tag">FAIL</span>
      </div>
    </aside>

    <section class="dig-surface dig-log-stream" data-slot="log_stream">
      <h2 class="dig-panel-title">Log stream</h2>
      <div class="dig-log-line">[10:42:01] agent-07 · step complete · latency 842ms</div>
      <div class="dig-log-line">[10:42:03] agent-07 · tool call · search_index</div>
      <div class="dig-log-line">[10:42:05] agent-07 · token usage · 1.2k in / 340 out</div>
      <div class="dig-log-line">[10:42:08] batch-ingest · checkpoint · shard 3/8</div>
      <div class="dig-log-line">[10:42:11] eval-suite · error · timeout after 30s</div>
    </section>

    <aside class="dig-surface dig-inspector" data-slot="inspector">
      <h2 class="dig-panel-title">Inspector</h2>
      <p class="dig-kicker">agent-07</p>
      <p class="dig-body">Run ID · run_8f3a2c</p>
      <hr class="dig-divider" />
      <p class="dig-meta">Input</p>
      <p class="dig-body">{"query": "sync catalog tokens"}</p>
      <button class="dig-button-secondary" style="margin-top: var(--dig-space-4); width: 100%;">Copy trace</button>
    </aside>
  </div>
</section>
```

## Structural Notes

```css
.layout-runtime-console {
  display: grid;
  gap: var(--dig-space-4);
  padding: var(--dig-space-4);
  min-height: 480px;
}

.dig-runtime-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--dig-space-3);
  padding: var(--dig-space-3) var(--dig-space-4);
  border: var(--dig-stroke-thin, 1px) solid var(--dig-border);
  border-radius: var(--dig-radius-md);
  background: var(--dig-surface-strong);
}

.dig-runtime-grid {
  display: grid;
  grid-template-columns: minmax(180px, 0.22fr) minmax(0, 1fr) minmax(200px, 0.28fr);
  gap: var(--dig-grid-gutter);
  flex: 1;
  min-height: 360px;
}

.dig-run-list,
.dig-log-stream,
.dig-inspector {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  overflow: hidden;
}

.dig-log-stream {
  font-family: var(--dig-font-mono);
}

.dig-log-stream .dig-log-line {
  flex-shrink: 0;
}

@container layout-viewport (max-width: 900px) {
  .dig-runtime-grid {
    grid-template-columns: 1fr;
  }

  .dig-run-list {
    max-height: 160px;
    overflow-y: auto;
  }

  .dig-inspector {
    order: 3;
  }
}

@container layout-viewport (max-width: 480px) {
  .dig-runtime-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .dig-runtime-toolbar .dig-control-row {
    justify-content: stretch;
  }

  .dig-runtime-toolbar .dig-button-primary,
  .dig-runtime-toolbar .dig-button-secondary {
    flex: 1;
  }
}
```

## QA Notes

- log stream 是否足够宽、可读。
- toolbar 操作是否靠近 run list 上下文。
- 切换 mono catalog 后 log 区对比度是否足够。
- 移动端 log 是否仍可扫读，无横向滚动。
- inspector 在 tablet 是否不挡 log 主区。
