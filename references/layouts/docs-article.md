---
name: Docs Article
name_zh: 文档文章页
slug: docs-article
page_type: docs
default_catalog: mono
status: draft
recommended_catalogs: mono, editorial, dig
description_zh: 左侧目录 + 右侧长文，适合 API 文档、指南与 changelog。
description_en: Left index rail with long-form article body for API docs, guides, and changelogs.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 产品名、搜索、版本切换。
  doc_nav:
    required: true
    role: navigation
    description: 章节树或 API 分组索引。
  article_header:
    required: true
    role: main
    description: 标题、版本标签、更新时间。
  article_body:
    required: true
    role: main
    description: 正文、代码块、表格。
  on_this_page:
    required: false
    role: supporting
    description: 桌面端锚点目录。
```

## Applicable Scenarios

- API reference、集成指南、changelog
- 需要长时间阅读、频繁跳转锚点的文档
- 技术写作优先于营销视觉的页面

## Avoid When

- 首屏需要强 CTA 转化（用 marketing-hero）
- 全文只有 2-3 段短说明（用 settings-form 或 empty-state）
- 需要并排对比多产品（用 comparison-section）

## Recommended Catalogs

mono — 默认文档气质；editorial — 叙事型指南；dig — 与产品控制台统一的 developer hub

## Layout Rules

- 桌面：左侧 doc_nav 固定宽度约 240px，article 占剩余空间。
- 正文最大阅读宽度约 720px，避免超宽行。
- 代码块与正文同列，不单独浮动到页面外。
- h2/h3 间距大于段落间距，便于扫读。
- 不允许正文区外套多层 surface 卡片。

## Responsive Rules

- Desktop：topbar → three-column（nav / article / on_this_page）。
- Tablet：隐藏 on_this_page，nav 可折叠为 drawer。
- Mobile：nav 折叠；article 全宽；topbar 保留搜索入口。

## Preview HTML

```html
<section class="layout-preview layout-docs-article" data-layout="docs-article">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Dig Docs</div>
    <nav class="dig-control-row">
      <span class="dig-tag">v2.4</span>
      <button class="dig-button-secondary">Search</button>
    </nav>
  </header>
  <div class="dig-docs-grid">
    <aside class="dig-doc-nav" data-slot="doc_nav">
      <a class="dig-nav-link dig-nav-link-active" href="#">Getting started</a>
      <a class="dig-nav-link" href="#">Authentication</a>
      <a class="dig-nav-link" href="#">Agents API</a>
      <a class="dig-nav-link" href="#">Webhooks</a>
    </aside>
    <article class="dig-doc-article">
      <header data-slot="article_header">
        <p class="dig-kicker">Guides</p>
        <h1 class="dig-hero-title" style="font-size: var(--dig-text-3xl);">Deploy your first agent</h1>
        <p class="dig-meta">Updated May 30, 2026 · 8 min read</p>
      </header>
      <div class="dig-doc-body" data-slot="article_body">
        <p class="dig-body">Connect your repository, define a workflow manifest, and promote to production from the console.</p>
        <h2 class="dig-panel-title">Prerequisites</h2>
        <p class="dig-body">API key, CLI v1.2+, and a target environment.</p>
        <pre class="dig-code-block">dig deploy --env staging</pre>
      </div>
    </article>
    <aside class="dig-on-page" data-slot="on_this_page">
      <p class="dig-kicker">On this page</p>
      <a class="dig-nav-link" href="#">Prerequisites</a>
      <a class="dig-nav-link" href="#">Configure</a>
      <a class="dig-nav-link" href="#">Deploy</a>
    </aside>
  </div>
</section>
```

## Preview CSS

```css
.layout-docs-article {
  display: grid;
  gap: var(--dig-space-5);
  padding: var(--dig-space-4);
}

.dig-docs-grid {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 160px;
  gap: var(--dig-grid-gutter);
  align-items: start;
}

.dig-doc-nav,
.dig-on-page {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-1);
  padding: var(--dig-space-4);
  border: var(--dig-stroke-thin, 1px) solid var(--dig-border);
  border-radius: var(--dig-radius-md);
  background: var(--dig-surface);
}

.dig-doc-article {
  min-width: 0;
}

.dig-doc-body {
  max-width: 42rem;
}

.dig-code-block {
  margin: var(--dig-space-4) 0;
  padding: var(--dig-space-4);
  border-radius: var(--dig-radius-sm);
  border: 1px solid var(--dig-border);
  background: var(--dig-surface-strong);
  font-family: var(--dig-font-mono);
  font-size: var(--dig-text-sm);
  color: var(--dig-text-muted);
  overflow-x: auto;
}

@container layout-viewport (max-width: 900px) {
  .dig-docs-grid {
    grid-template-columns: 1fr;
  }

  .dig-on-page {
    display: none;
  }

  .dig-doc-nav {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

## QA Notes

- 正文行宽是否舒适（约 60-75 字符）。
- 移动端 nav 是否仍可访问。
- mono catalog 下代码块对比度是否足够。
- 是否出现三层嵌套 surface。
