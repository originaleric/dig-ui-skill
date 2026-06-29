---
name: Report Insight
name_zh: 报告洞察页
slug: report-insight
page_type: docs
task_type: reporting
default_catalog: editorial
status: draft
recommended_catalogs: editorial, wise, dig
description_zh: 叙事型报告/分析页：导语 + 关键洞察卡 + 图表区 + 结论与 CTA。
description_en: Narrative report with intro, insight cards, chart area, and conclusion CTA.
---

## Slots

```yaml
slots:
  report_header:
    required: true
    role: main
    description: 报告标题、日期、作者或数据源。
  key_insights:
    required: true
    role: summary
    description: 3-5 条关键发现，可扫读。
  chart_section:
    required: true
    role: main
    description: 主图表或数据可视化区。
  narrative_body:
    required: false
    role: supporting
    description: 解读段落、pull quote。
  report_cta:
    required: false
    role: control
    description: 下载、分享、订阅后续报告。
```

## Applicable Scenarios

- 季度 usage / performance 报告
- Research insight、benchmark 结果页
- 面向决策者的 narrative dashboard（非 live console）

## Avoid When

- 实时 ops 监控（用 dashboard-overview）
- 逐步调试 run（用 agent-run-detail）
- 纯 API 文档

## Recommended Catalogs

editorial — 默认叙事气质；wise — 消费级 insight；dig — 产品内嵌报告

## Layout Rules

- key_insights 在 chart 之前，每条一句话 + 可选数字。
- chart_section 是页内最大 visual block，带标题与轴标签占位。
- narrative 段落 max-width ~640px，可穿插 pull quote。
- 数字 insight 可用 serif/display 强调（catalog 允许时）。
- 不用 live console 的 dense table 填 chart 区。

## Responsive Rules

- Desktop：header → insight row → chart → narrative → cta。
- Mobile：insights 单列；chart 全宽 scroll if needed。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-report-insight" data-layout="report-insight">
  <header class="dig-report-header" data-slot="report_header">
    <p class="dig-kicker">Q1 2026 Report</p>
    <h1 class="dig-hero-title" style="font-size: var(--dig-text-3xl);">Agent reliability trends</h1>
    <p class="dig-meta">Generated May 30, 2026 · All environments</p>
  </header>
  <section class="dig-insight-row" data-slot="key_insights">
    <article class="dig-surface dig-stat"><span class="dig-stat-value">+18%</span><span class="dig-stat-label">Success rate vs Q4</span></article>
    <article class="dig-surface dig-stat"><span class="dig-stat-value">842ms</span><span class="dig-stat-label">Median latency</span></article>
    <article class="dig-surface dig-stat"><span class="dig-stat-value">3</span><span class="dig-stat-label">Top failure categories</span></article>
  </section>
  <section class="dig-surface dig-chart-section" data-slot="chart_section">
    <h2 class="dig-panel-title">Weekly success rate</h2>
    <div class="dig-chart-placeholder" aria-hidden="true"></div>
    <p class="dig-meta">Chart area — bind to catalog tokens, not hardcoded colors</p>
  </section>
  <article class="dig-report-narrative" data-slot="narrative_body">
    <p class="dig-body">Retries on tool-timeout errors drove most of the improvement after deploy v2.4.</p>
    <blockquote class="dig-pull-quote">Teams that adopted staged rollouts saw 2× faster recovery from failed runs.</blockquote>
  </article>
  <footer class="dig-report-cta" data-slot="report_cta">
    <button class="dig-button-primary">Download PDF</button>
    <button class="dig-button-secondary">Share report</button>
  </footer>
</section>
```

## Structural Notes

```css
.layout-report-insight {
  display: grid;
  gap: var(--dig-space-6);
  padding: var(--dig-space-6) var(--dig-space-4);
  max-width: 880px;
  margin: 0 auto;
}

.dig-insight-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--dig-grid-gutter);
}

.dig-chart-section {
  min-height: 220px;
}

.dig-chart-placeholder {
  height: 160px;
  margin: var(--dig-space-4) 0;
  border-radius: var(--dig-radius-sm);
  border: 1px dashed var(--dig-border-strong);
  background: var(--dig-surface-strong);
}

.dig-report-narrative {
  max-width: 40rem;
}

.dig-pull-quote {
  margin: var(--dig-space-5) 0;
  padding-left: var(--dig-space-4);
  border-left: 3px solid var(--dig-accent);
  font-size: var(--dig-text-lg);
  font-style: italic;
  color: var(--dig-text);
}

.dig-report-cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-3);
}

@container layout-viewport (max-width: 640px) {
  .dig-insight-row {
    grid-template-columns: 1fr;
  }
}
```

## QA Notes

- insights 是否可在 chart 前快速扫读。
- editorial catalog 下是否有报告气质而非 console。
- chart placeholder 是否不依赖 hex 色。
- 移动端 insight 卡是否 stack 清晰。
