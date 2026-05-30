---
name: Pricing Plan Grid
name_zh: 定价方案网格
slug: pricing-or-plan-grid
page_type: marketing
default_catalog: wise
status: draft
recommended_catalogs: wise, apple, dig
description_zh: 多档定价卡片 + 功能清单 + CTA，适合 SaaS 定价与升级页。
description_en: Multi-tier pricing cards with feature lists and CTAs for SaaS plans.
---

## Slots

```yaml
slots:
  section_header:
    required: true
    role: main
    description: 定价页标题、计费周期切换。
  plan_cards:
    required: true
    role: main
    description: 2-4 个方案卡片。
  feature_matrix:
    required: false
    role: supporting
    description: 各方案功能差异摘要。
  faq_or_footnote:
    required: false
    role: supporting
    description: FAQ 链接或企业联系 CTA。
```

## Applicable Scenarios

- SaaS 公开定价页
- 应用内 upgrade / billing 选择
- 免费试用 → Pro → Enterprise 转化

## Avoid When

- 非商业产品、无付费层级
- 仅需小对比区块（用 comparison-section）
- 后台 billing 设置表单（用 settings-form）

## Recommended Catalogs

wise — 消费级 fintech 定价；apple — 高端产品发布；dig — B2B 工具定价

## Layout Rules

- 推荐方案可略大或带 badge，但三卡同权重时勿过度强调中间。
- 价格数字是视觉锚点，货币与周期用小字 adjacent。
- 每卡 CTA 在价格下方，feature list 在 CTA 下方。
- Enterprise 卡可用「Contact sales」而非具体价格。
- 不允许每卡再套多层 glow card。

## Responsive Rules

- Desktop：3 列 grid，推荐卡可 scale 1.02。
- Tablet：2 列 + 第三卡换行居中。
- Mobile：单列 stack，推荐卡仍可在首屏。

## Preview HTML

```html
<section class="layout-preview layout-pricing-or-plan-grid" data-layout="pricing-or-plan-grid">
  <header class="dig-pricing-header" data-slot="section_header">
    <h2 class="dig-hero-title" style="font-size: var(--dig-text-3xl);">Simple, transparent pricing</h2>
    <div class="dig-control-row">
      <button class="dig-button-secondary">Monthly</button>
      <button class="dig-button-primary">Annual · save 20%</button>
    </div>
  </header>
  <div class="dig-plan-grid" data-slot="plan_cards">
    <article class="dig-surface dig-plan-card">
      <p class="dig-kicker">Starter</p>
      <p class="dig-stat-value">$0</p>
      <p class="dig-meta">per month</p>
      <button class="dig-button-secondary" style="width:100%;margin: var(--dig-space-4) 0;">Get started</button>
      <ul class="dig-plan-features"><li>3 agents</li><li>Community support</li></ul>
    </article>
    <article class="dig-surface dig-plan-card dig-plan-featured">
      <span class="dig-tag">Popular</span>
      <p class="dig-kicker">Pro</p>
      <p class="dig-stat-value">$49</p>
      <p class="dig-meta">per seat / month</p>
      <button class="dig-button-primary" style="width:100%;margin: var(--dig-space-4) 0;">Start trial</button>
      <ul class="dig-plan-features"><li>Unlimited agents</li><li>Priority support</li><li>SSO</li></ul>
    </article>
    <article class="dig-surface dig-plan-card">
      <p class="dig-kicker">Enterprise</p>
      <p class="dig-stat-value" style="font-size: var(--dig-text-xl);">Custom</p>
      <p class="dig-meta">volume & SLA</p>
      <button class="dig-button-secondary" style="width:100%;margin: var(--dig-space-4) 0;">Contact sales</button>
      <ul class="dig-plan-features"><li>Dedicated cluster</li><li>Audit logs</li></ul>
    </article>
  </div>
  <p class="dig-meta" data-slot="faq_or_footnote" style="text-align:center;">Questions? <a href="#">Read FAQ</a> or talk to sales.</p>
</section>
```

## Preview CSS

```css
.layout-pricing-or-plan-grid {
  display: grid;
  gap: var(--dig-space-6);
  padding: var(--dig-space-6) var(--dig-space-4);
}

.dig-pricing-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dig-space-4);
}

.dig-plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--dig-grid-gutter);
  align-items: stretch;
}

.dig-plan-card {
  display: flex;
  flex-direction: column;
  position: relative;
}

.dig-plan-featured {
  border-color: var(--dig-border-strong);
  box-shadow: var(--dig-shadow-soft);
}

.dig-plan-features {
  margin: 0;
  padding-left: 1.2rem;
  font-size: var(--dig-text-sm);
  color: var(--dig-text-muted);
  line-height: 1.7;
}

@container layout-viewport (max-width: 900px) {
  .dig-plan-grid {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto;
  }
}
```

## QA Notes

- 价格层级是否一眼可辨。
- wise catalog 下 CTA 是否足够「可点击」。
- 移动端 CTA 是否全宽且 ≥44px。
- 是否 card 套 card。
