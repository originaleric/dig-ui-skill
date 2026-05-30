---
name: Marketing Hero
name_zh: 营销首屏
slug: marketing-hero
page_type: marketing
default_catalog: dig
status: draft
recommended_catalogs: dig, mono, editorial
description_zh: 产品官网或功能发布首屏，大标题 + 主 CTA + 辅助信息列。
description_en: Product landing hero with headline, primary CTA, and supporting proof column.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 品牌、主导航、登录/试用入口。
  hero_headline:
    required: true
    role: main
    description: 主标题、副标题、主 CTA 组。
  hero_visual:
    required: false
    role: supporting
    description: 产品截图、mockup 或能力矩阵。
  proof_strip:
    required: false
    role: summary
    description: 客户 logo、指标或信任背书。
  feature_grid:
    required: false
    role: supporting
    description: 3-4 个核心能力卡片，非首屏主体。
```

## Applicable Scenarios

- 产品官网首页、功能发布页首屏
- 需要强 value prop + 双 CTA 的 landing
- 品牌叙事 + 产品 mock 并重的入口页

## Avoid When

- 已登录控制台首页（用 dashboard-overview）
- 单功能详解长页（用 split-feature-showcase）
- 纯文档或错误态

## Recommended Catalogs

dig — 默认产品语言；editorial — 品牌叙事页；apple — 高端产品发布

## Layout Rules

- 桌面端 hero 区使用 asymmetric split：文案约 55%，视觉约 45%。
- 主标题必须是首屏最大文字块，不允许装饰抢主导。
- 主 CTA 与次 CTA 并排，主 CTA 在左或上（LTR 阅读习惯）。
- proof strip 在 hero 下方，高度克制，不做第二 hero。
- feature grid 最多 4 列，每格单一信息点，不允许卡片套卡片。
- 不允许把整个首屏做成一张大卡片。

## Responsive Rules

- Desktop：topbar → hero split（headline + visual）→ proof strip → feature grid。
- Tablet：topbar → headline → visual → proof → feature 2 列。
- Mobile：topbar 简化；headline 全宽；CTA 全宽堆叠；visual 缩略；feature 单列。
- 移动端主 CTA 最小高度 44px，不隐藏核心操作。

## Preview HTML

```html
<section class="layout-preview layout-marketing-hero" data-layout="marketing-hero">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Dig</div>
    <nav class="dig-control-row">
      <a class="dig-button-secondary" href="#">Docs</a>
      <button class="dig-button-primary">Start free</button>
    </nav>
  </header>

  <div class="dig-hero-grid">
    <div class="dig-hero-copy" data-slot="hero_headline">
      <p class="dig-kicker">Agent orchestration</p>
      <h1 class="dig-hero-title">把工作流变成运行中的系统</h1>
      <p class="dig-body">部署、观测、迭代 — 一套控制平面覆盖从 prototype 到 production 的全链路。</p>
      <div class="dig-control-row dig-hero-cta">
        <button class="dig-button-primary">Deploy now</button>
        <button class="dig-button-secondary">View demo</button>
      </div>
    </div>
    <aside class="dig-surface dig-hero-visual" data-slot="hero_visual">
      <p class="dig-kicker">Live preview</p>
      <div class="dig-visual-block">
        <span class="dig-tag">Running</span>
        <span class="dig-stat-value">12 agents</span>
        <span class="dig-meta">3 workflows · 98.2% success</span>
      </div>
    </aside>
  </div>

  <section class="dig-proof-strip" data-slot="proof_strip">
    <span class="dig-meta">Trusted by teams shipping weekly</span>
    <div class="dig-proof-logos">
      <span class="dig-tag">Acme</span>
      <span class="dig-tag">Northwind</span>
      <span class="dig-tag">Contoso</span>
      <span class="dig-tag">Fabrikam</span>
    </div>
  </section>

  <section class="dig-feature-grid" data-slot="feature_grid">
    <article class="dig-surface">
      <p class="dig-kicker">Observe</p>
      <h3 class="dig-panel-title">Real-time traces</h3>
      <p class="dig-body">Every run logged with structured context.</p>
    </article>
    <article class="dig-surface">
      <p class="dig-kicker">Deploy</p>
      <h3 class="dig-panel-title">One-click rollout</h3>
      <p class="dig-body">Promote from staging without drift.</p>
    </article>
    <article class="dig-surface">
      <p class="dig-kicker">Scale</p>
      <h3 class="dig-panel-title">Elastic workers</h3>
      <p class="dig-body">Burst capacity when queues spike.</p>
    </article>
  </section>
</section>
```

## Preview CSS

```css
.layout-marketing-hero {
  display: grid;
  gap: var(--dig-space-6);
  padding: var(--dig-space-4);
}

.dig-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(240px, 0.9fr);
  gap: var(--dig-grid-gutter);
  align-items: center;
}

.dig-hero-copy {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
}

.dig-hero-cta {
  margin-top: var(--dig-space-2);
}

.dig-hero-visual {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
}

.dig-visual-block {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-3);
  flex: 1;
  justify-content: center;
}

.dig-proof-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--dig-space-4);
  padding: var(--dig-space-4) 0;
  border-top: 1px solid var(--dig-border);
  border-bottom: 1px solid var(--dig-border);
}

.dig-proof-logos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-2);
}

.dig-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--dig-grid-gutter);
}

@container layout-viewport (max-width: 900px) {
  .dig-hero-grid {
    grid-template-columns: 1fr;
  }

  .dig-feature-grid {
    grid-template-columns: 1fr;
  }
}

@container layout-viewport (max-width: 600px) {
  .dig-hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .dig-hero-cta .dig-button-primary,
  .dig-hero-cta .dig-button-secondary {
    width: 100%;
  }
}
```

## QA Notes

- 首屏 5 秒内能否读出产品价值主张。
- 主 CTA 是否足够突出但不压过标题。
- 切换 mono / editorial catalog 后层次是否仍清晰。
- 移动端是否出现横向滚动。
- feature 区是否像第二 hero（应避免）。
