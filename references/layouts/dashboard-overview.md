---
name: Dashboard Overview
name_zh: 控制台总览
slug: dashboard-overview
page_type: dashboard
task_type: monitoring
default_catalog: dig
status: draft
recommended_catalogs: dig, mono, wise
description_zh: 高密度产品总览页，适合 KPI、趋势、任务队列和最近事件。
description_en: Dense product overview layout for KPIs, trends, task queues, and recent activity.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 顶部导航、当前空间、主题/语言/账户控制。
  sidebar:
    required: false
    role: navigation
    description: 桌面端辅助导航，移动端折叠。
  kpi_strip:
    required: true
    role: summary
    description: 3-5 个关键指标。
  primary_panel:
    required: true
    role: main
    description: 首屏主任务、主图表或核心表格。
  secondary_panel:
    required: false
    role: supporting
    description: 趋势、分组数据、队列摘要。
  activity_feed:
    required: false
    role: log
    description: 最近事件、运行状态或审计记录。
```

## Applicable Scenarios

- 产品控制台首页、运维总览
- KPI + 主图表/表格 + 辅助队列的典型 dashboard
- 需要首屏读出系统状态的 ops 页

## Avoid When

- 单次 run 调试（用 agent-run-detail）
- 实时 log tail 为主（用 log-inspector / runtime-console）
- 营销向 landing

## Recommended Catalogs

dig — 默认；mono — 高密度工具台；wise — 消费级轻量 dashboard

## Layout Rules

- 桌面端使用 12 栏 grid。
- 顶部 topbar 固定在内容流顶部，不使用悬浮遮挡主体内容。
- KPI strip 占满首行，建议 3-5 个指标。
- 主内容区占 8 栏，辅助区占 4 栏。
- 主表格或主图表必须是首屏最大信息块。
- 不允许把整个页面 section 做成一张大卡片。
- 不允许卡片套卡片。
- 操作按钮应靠近被操作对象，不集中堆在页面右上角。

## Responsive Rules

- Desktop：topbar → KPI strip → primary + secondary two-column → activity feed。
- Tablet：topbar → KPI strip → primary → secondary → activity feed。
- Mobile：topbar 简化为一行，sidebar 折叠，KPI 改为 2 列网格或横向滚动。
- 移动端不隐藏核心操作，只降低辅助信息密度。
- 表格移动端优先改为 stacked rows，不强制缩小到不可读。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-dashboard-overview" data-layout="dashboard-overview">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Dig Console</div>
    <nav class="dig-control-row">
      <span class="dig-tag">prod</span>
      <button class="dig-button-secondary">Settings</button>
      <button class="dig-button-primary">Run check</button>
    </nav>
  </header>

  <main class="dig-layout-grid">
    <section class="dig-kpi-strip" data-slot="kpi_strip">
      <article class="dig-surface dig-stat">
        <span class="dig-stat-value">98.2%</span>
        <span class="dig-stat-label">Success rate</span>
      </article>
      <article class="dig-surface dig-stat">
        <span class="dig-stat-value">1.2k</span>
        <span class="dig-stat-label">Runs / 24h</span>
      </article>
      <article class="dig-surface dig-stat">
        <span class="dig-stat-value">12</span>
        <span class="dig-stat-label">Active agents</span>
      </article>
      <article class="dig-surface dig-stat">
        <span class="dig-stat-value">3</span>
        <span class="dig-stat-label">Queued</span>
      </article>
    </section>

    <section class="dig-surface dig-primary-panel" data-slot="primary_panel">
      <h2 class="dig-panel-title">Recent runs</h2>
      <div class="dig-table-row">
        <span>workflow-alpha</span>
        <span class="dig-tag">OK</span>
        <span class="dig-meta">2m ago</span>
      </div>
      <div class="dig-table-row">
        <span>ingest-batch-07</span>
        <span class="dig-tag">OK</span>
        <span class="dig-meta">8m ago</span>
      </div>
      <div class="dig-table-row">
        <span>agent-retrain</span>
        <span class="dig-tag">WARN</span>
        <span class="dig-meta">14m ago</span>
      </div>
      <button class="dig-button-secondary" style="margin-top: var(--dig-space-4);">View all runs</button>
    </section>

    <aside class="dig-surface dig-secondary-panel" data-slot="secondary_panel">
      <h2 class="dig-panel-title">Queue</h2>
      <p class="dig-body">3 tasks waiting · avg wait 12s</p>
      <hr class="dig-divider" />
      <div class="dig-table-row">
        <span>export-report</span>
        <span class="dig-meta">P1</span>
      </div>
      <div class="dig-table-row">
        <span>sync-vectors</span>
        <span class="dig-meta">P2</span>
      </div>
    </aside>

    <section class="dig-surface dig-activity-feed" data-slot="activity_feed">
      <h2 class="dig-panel-title">Activity</h2>
      <div class="dig-log-line"><span class="dig-meta">10:42</span> Deploy v2.4.1 completed</div>
      <div class="dig-log-line"><span class="dig-meta">10:38</span> Agent pool scaled +2</div>
      <div class="dig-log-line"><span class="dig-meta">10:31</span> Config drift resolved</div>
    </section>
  </main>
</section>
```

## Structural Notes

```css
.layout-dashboard-overview {
  display: grid;
  gap: var(--dig-space-5);
  padding: var(--dig-space-4);
}

.dig-layout-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--dig-grid-gutter);
}

.dig-kpi-strip {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--dig-space-4);
}

.dig-primary-panel {
  grid-column: span 8;
}

.dig-secondary-panel {
  grid-column: span 4;
}

.dig-activity-feed {
  grid-column: 1 / -1;
}

@container layout-viewport (max-width: 840px) {
  .dig-kpi-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dig-layout-grid,
  .dig-primary-panel,
  .dig-secondary-panel {
    grid-column: 1 / -1;
  }
}

@container layout-viewport (max-width: 480px) {
  .dig-kpi-strip {
    grid-template-columns: 1fr 1fr;
  }
}
```

## QA Notes

- 首屏是否能在 5 秒内读出当前系统状态。
- KPI 是否有明确主次，不要 6 个指标同权重平铺。
- 主表格或主图表是否足够大。
- 移动端是否出现横向滚动。
- 是否出现卡片套卡片。
- 操作按钮是否靠近上下文。
