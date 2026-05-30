---
name: Comparison Section
name_zh: 对比区块
slug: comparison-section
page_type: marketing
default_catalog: apple
status: draft
recommended_catalogs: apple, editorial, wise
description_zh: 营销或产品页的功能/方案对比区，强调差异列与清晰表头。
description_en: Feature or plan comparison block for marketing and product pages.
---

## Slots

```yaml
slots:
  section_header:
    required: true
    role: main
    description: 对比区标题与一句价值说明。
  comparison_table:
    required: true
    role: main
    description: 列式对比表或 feature matrix。
  footnote:
    required: false
    role: supporting
    description: 免责、脚注或链接到完整定价。
```

## Applicable Scenarios

- 产品 tier 功能对比（非完整 pricing 页）
- 「Dig vs 传统方案」类叙事对比
- 发布页中的 capability matrix

## Avoid When

- 完整定价与购买流程（用 pricing-or-plan-grid）
- 后台数据表格编辑（用 data-table-workspace）
- 单列表格无对比维度

## Recommended Catalogs

apple — 清晰产品对比；editorial — 叙事型差异；wise — 消费级 fintech 对比

## Layout Rules

- 对比列 2-4 个，超过 4 列改为 scroll 或 accordion。
- 第一列为 feature 名称，左对齐；数值列居中或右对齐。
- 推荐列可用 subtle highlight，不用全列高饱和背景。
- check/cross 图标统一，不混用 emoji。
- 表头 sticky 可选，但不遮挡 hero CTA。

## Responsive Rules

- Desktop：完整 matrix。
- Tablet：隐藏最少差异列或 horizontal scroll。
- Mobile：每个 plan 转为 stacked card，feature 列表在内。

## Preview HTML

```html
<section class="layout-preview layout-comparison-section" data-layout="comparison-section">
  <header class="dig-compare-header" data-slot="section_header">
    <p class="dig-kicker">Compare</p>
    <h2 class="dig-hero-title" style="font-size: var(--dig-text-3xl);">Why teams choose Dig</h2>
    <p class="dig-body">Side-by-side view of core capabilities across deployment models.</p>
  </header>
  <div class="dig-compare-table" data-slot="comparison_table">
    <div class="dig-compare-row dig-compare-head">
      <span>Feature</span><span>Manual</span><span class="dig-compare-highlight">Dig</span><span>Enterprise</span>
    </div>
    <div class="dig-compare-row"><span>Observability</span><span class="dig-cross">—</span><span class="dig-check">✓</span><span class="dig-check">✓</span></div>
    <div class="dig-compare-row"><span>Auto rollback</span><span class="dig-cross">—</span><span class="dig-check">✓</span><span class="dig-check">✓</span></div>
    <div class="dig-compare-row"><span>Agent orchestration</span><span class="dig-cross">—</span><span class="dig-check">✓</span><span class="dig-check">✓</span></div>
    <div class="dig-compare-row"><span>SSO / audit</span><span class="dig-cross">—</span><span class="dig-cross">—</span><span class="dig-check">✓</span></div>
  </div>
  <p class="dig-meta dig-compare-footnote" data-slot="footnote">See pricing for seat limits and SLA details.</p>
</section>
```

## Preview CSS

```css
.layout-comparison-section {
  display: grid;
  gap: var(--dig-space-6);
  padding: var(--dig-space-6) var(--dig-space-4);
  max-width: 900px;
  margin: 0 auto;
}

.dig-compare-header {
  text-align: center;
}

.dig-compare-header .dig-body {
  max-width: 36rem;
  margin: 0 auto;
}

.dig-compare-table {
  border: 1px solid var(--dig-border);
  border-radius: var(--dig-radius-md);
  overflow: hidden;
  background: var(--dig-surface);
}

.dig-compare-row {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: var(--dig-space-2);
  padding: var(--dig-space-4);
  border-bottom: 1px solid var(--dig-border);
  font-size: var(--dig-text-sm);
  align-items: center;
  text-align: center;
}

.dig-compare-row span:first-child {
  text-align: left;
  font-weight: 600;
  color: var(--dig-text);
}

.dig-compare-head {
  font-family: var(--dig-font-mono);
  font-size: var(--dig-text-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--dig-text-muted);
  background: var(--dig-surface-strong);
}

.dig-compare-highlight {
  color: var(--dig-accent-strong, var(--dig-accent));
  font-weight: 700;
}

.dig-compare-footnote {
  text-align: center;
}

@container layout-viewport (max-width: 640px) {
  .dig-compare-row {
    grid-template-columns: 1fr 1fr;
  }

  .dig-compare-head span:nth-child(n+3),
  .dig-compare-row span:nth-child(n+3) {
    display: none;
  }
}
```

## QA Notes

- 推荐列 highlight 是否克制。
- 移动端是否仍能理解对比关系。
- editorial catalog 下是否仍像产品页而非纯文章。
- 无障碍：check/cross 是否有 text 备选。
