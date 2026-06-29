---
name: Split Feature Showcase
name_zh: 分栏功能展示
slug: split-feature-showcase
page_type: marketing
task_type: marketing
default_catalog: apple
status: draft
recommended_catalogs: apple, dig, editorial
description_zh: 交替 split 区块：左文右图 / 右文左图，适合功能详解与产品叙事。
description_en: Alternating split sections for feature deep-dives and product storytelling.
---

## Slots

```yaml
slots:
  section_nav:
    required: false
    role: navigation
    description: 锚点导航或 sticky 功能目录。
  feature_blocks:
    required: true
    role: main
    description: 2-4 个 alternating split 功能块。
  closing_cta:
    required: false
    role: control
    description: 区块末尾 CTA。
```

## Applicable Scenarios

- 产品功能页、how-it-works
- 发布页多个 capability 详解
- 从 100-layout-compositions 抽象的 asymmetric split

## Avoid When

- 单 hero 即可说完（用 marketing-hero）
- 表格型对比（用 comparison-section）
- 控制台工具 UI

## Recommended Catalogs

apple — 产品 theater；dig — 能力详解；editorial — 叙事型 feature story

## Layout Rules

- 每块 split 50/50 或 55/45，图文交替。
- 每块一个 headline + 2-3 bullet + optional link。
- visual 侧用 surface 占位或 product mock，不用 stock photo 规则写死。
- 块间距 ≥ section padding，块内不 card 套 card。
- closing_cta 与最后一块分离，避免混在 split 内。

## Responsive Rules

- Desktop：alternating split rows。
- Tablet/mobile：一律 text 上、visual 下。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-split-feature-showcase" data-layout="split-feature-showcase">
  <nav class="dig-feature-nav" data-slot="section_nav">
    <a class="dig-nav-link dig-nav-link-active" href="#">Observe</a>
    <a class="dig-nav-link" href="#">Deploy</a>
    <a class="dig-nav-link" href="#">Scale</a>
  </nav>
  <div class="dig-feature-blocks" data-slot="feature_blocks">
    <article class="dig-feature-split">
      <div class="dig-feature-copy">
        <p class="dig-kicker">Observe</p>
        <h2 class="dig-panel-title">Traces that stay readable</h2>
        <p class="dig-body">Structured logs with run context, latency, and token usage in one stream.</p>
        <button class="dig-button-secondary">Learn more</button>
      </div>
      <div class="dig-surface dig-feature-visual" aria-hidden="true">
        <span class="dig-meta">Product visual</span>
      </div>
    </article>
    <article class="dig-feature-split dig-feature-split-reverse">
      <div class="dig-feature-copy">
        <p class="dig-kicker">Deploy</p>
        <h2 class="dig-panel-title">Promote without drift</h2>
        <p class="dig-body">Same manifest from staging to production with audit trail.</p>
        <button class="dig-button-secondary">Learn more</button>
      </div>
      <div class="dig-surface dig-feature-visual" aria-hidden="true">
        <span class="dig-meta">Product visual</span>
      </div>
    </article>
  </div>
  <footer class="dig-feature-cta" data-slot="closing_cta">
    <button class="dig-button-primary">Start building</button>
  </footer>
</section>
```

## Structural Notes

```css
.layout-split-feature-showcase {
  display: grid;
  gap: var(--dig-space-7);
  padding: var(--dig-space-6) var(--dig-space-4);
}

.dig-feature-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-2);
  justify-content: center;
}

.dig-feature-blocks {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-8);
}

.dig-feature-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--dig-grid-gutter);
  align-items: center;
}

.dig-feature-split-reverse .dig-feature-copy {
  order: 2;
}

.dig-feature-split-reverse .dig-feature-visual {
  order: 1;
}

.dig-feature-copy {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-3);
}

.dig-feature-visual {
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dig-feature-cta {
  text-align: center;
}

@container layout-viewport (max-width: 800px) {
  .dig-feature-split,
  .dig-feature-split-reverse {
    grid-template-columns: 1fr;
  }

  .dig-feature-split-reverse .dig-feature-copy,
  .dig-feature-split-reverse .dig-feature-visual {
    order: unset;
  }
}
```

## QA Notes

- 交替 rhythm 是否在 mobile 仍清晰。
- 每块是否单一信息点。
- visual 占位是否不抢 headline。
- apple catalog 下是否像 product page。
