---
name: Integration Gallery
name_zh: 集成画廊
slug: integration-gallery
page_type: marketing
default_catalog: dig
status: draft
recommended_catalogs: dig, apple, mono
description_zh: 集成/插件/连接器的网格展示，带搜索与分类筛选。
description_en: Grid gallery of integrations, plugins, or connectors with search and categories.
---

## Slots

```yaml
slots:
  gallery_header:
    required: true
    role: main
    description: 标题、搜索、分类 tabs。
  integration_grid:
    required: true
    role: main
    description: 集成卡片网格。
  featured_integration:
    required: false
    role: supporting
    description: 可选置顶推荐集成。
```

## Applicable Scenarios

- Marketplace / integrations 目录页
- 「Works with X」连接器展示
- 开发者选型的 plugin 列表

## Avoid When

- 单个集成配置表单（用 settings-form）
- 详细 API 文档（用 docs-article）
- 仅 2-3 个 logo 的信任条（用 marketing-hero proof_strip）

## Recommended Catalogs

dig — 产品集成页；apple — 生态展示；mono — 开发者目录

## Layout Rules

- 卡片统一尺寸，logo + 名称 + 一句描述 + 状态（Connected / Available）。
- 网格 3-4 列 desktop，gap 一致。
- 搜索与 category 在 grid 上方，不侧边占宽。
- featured 最多 1 个，横幅或首卡 highlight。
- 卡片 clickable 整卡，内部不再嵌套 button card。

## Responsive Rules

- Desktop：3-4 column grid。
- Tablet：2 columns。
- Mobile：1-2 columns；search 全宽。

## Preview HTML

```html
<section class="layout-preview layout-integration-gallery" data-layout="integration-gallery">
  <header class="dig-gallery-header" data-slot="gallery_header">
    <h2 class="dig-hero-title" style="font-size: var(--dig-text-2xl);">Integrations</h2>
    <div class="dig-control-row">
      <input class="dig-input" type="search" placeholder="Search integrations…" style="max-width:240px;" />
      <button class="dig-button-secondary">All</button>
      <button class="dig-button-secondary">Data</button>
      <button class="dig-button-secondary">AI</button>
    </div>
  </header>
  <article class="dig-surface dig-featured-integration" data-slot="featured_integration">
    <p class="dig-kicker">Featured</p>
    <h3 class="dig-panel-title">Slack notifications</h3>
    <p class="dig-body">Push run status and alerts to your team channel.</p>
    <button class="dig-button-primary">Connect</button>
  </article>
  <div class="dig-integration-grid" data-slot="integration_grid">
    <article class="dig-surface dig-integration-tile"><span class="dig-tag">GitHub</span><p class="dig-body">Deploy on push</p></article>
    <article class="dig-surface dig-integration-tile"><span class="dig-tag">Postgres</span><p class="dig-body">Query data sources</p></article>
    <article class="dig-surface dig-integration-tile"><span class="dig-tag">OpenAI</span><p class="dig-body">Model provider</p></article>
    <article class="dig-surface dig-integration-tile"><span class="dig-tag">S3</span><p class="dig-body">Object storage</p></article>
    <article class="dig-surface dig-integration-tile"><span class="dig-tag">Webhook</span><p class="dig-body">Custom HTTP</p></article>
    <article class="dig-surface dig-integration-tile"><span class="dig-tag">Linear</span><p class="dig-body">Issue sync</p></article>
  </div>
</section>
```

## Preview CSS

```css
.layout-integration-gallery {
  display: grid;
  gap: var(--dig-space-5);
  padding: var(--dig-space-4);
}

.dig-gallery-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--dig-space-4);
}

.dig-featured-integration {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-2);
  max-width: 480px;
}

.dig-integration-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--dig-grid-gutter);
}

.dig-integration-tile {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-2);
}

@container layout-viewport (max-width: 720px) {
  .dig-integration-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container layout-viewport (max-width: 420px) {
  .dig-integration-grid {
    grid-template-columns: 1fr;
  }
}
```

## QA Notes

- 卡片网格是否整齐、无高度抖动。
- 搜索框在 mobile 是否可用。
- featured 是否抢 whole grid 焦点。
- apple catalog 下是否像生态页而非 dashboard。
