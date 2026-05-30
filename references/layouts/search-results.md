---
name: Search Results
name_zh: 搜索结果页
slug: search-results
page_type: workspace
default_catalog: mono
status: draft
recommended_catalogs: mono, dig, editorial
description_zh: 搜索框 + 结果统计 + 分组结果列表 + 分页或 load more。
description_en: Search input, result count, grouped result list, and pagination.
---

## Slots

```yaml
slots:
  search_bar:
    required: true
    role: control
    description: 搜索输入、清除、可选过滤器。
  result_summary:
    required: true
    role: summary
    description: 关键词、结果数量、耗时。
  result_groups:
    required: true
    role: main
    description: 按类型分组的结果列表。
  pagination:
    required: false
    role: navigation
    description: 分页或 load more。
```

## Applicable Scenarios

- 全局搜索 docs / runs / settings
- Command palette 全页 fallback
- 知识库、集成、用户统一搜索

## Avoid When

- 单表 filter（用 data-table-workspace filter_bar）
- 无 query 的空状态（用 empty-state）
- 纯 browse 无搜索意图

## Recommended Catalogs

mono — 文档/工具搜索；dig — 产品内搜索；editorial — 内容型搜索

## Layout Rules

- search_bar sticky 或始终在结果上方。
- result_summary 一行 meta，不抢结果列表。
- 每组结果有 group label（Docs、Runs、Settings）。
- 每条结果：title + snippet + breadcrumb/meta。
- highlight query term 用 accent 色，不全句 bold。

## Responsive Rules

- Desktop：search 宽 max 640px 或全宽。
- Mobile：snippet 2 行 clamp；filter 收起到 icon。

## Preview HTML

```html
<section class="layout-preview layout-search-results" data-layout="search-results">
  <div class="dig-search-bar-wrap" data-slot="search_bar">
    <input class="dig-input" type="search" value="deploy agent" style="max-width:100%;" />
    <button class="dig-button-secondary">Filters</button>
  </div>
  <p class="dig-meta dig-result-summary" data-slot="result_summary">12 results for "deploy agent" · 0.24s</p>
  <div class="dig-result-groups" data-slot="result_groups">
    <section class="dig-result-group">
      <h2 class="dig-kicker">Documentation</h2>
      <a class="dig-result-item" href="#">
        <span class="dig-result-title">Deploy your first agent</span>
        <span class="dig-body">Connect your repository and promote to production…</span>
        <span class="dig-meta">docs / guides</span>
      </a>
      <a class="dig-result-item" href="#">
        <span class="dig-result-title">Agent deployment API</span>
        <span class="dig-body">POST /v1/deploy with manifest payload…</span>
        <span class="dig-meta">docs / api</span>
      </a>
    </section>
    <section class="dig-result-group">
      <h2 class="dig-kicker">Runs</h2>
      <a class="dig-result-item" href="#">
        <span class="dig-result-title">agent-deploy · run_8f3a</span>
        <span class="dig-meta">Failed · 2h ago</span>
      </a>
    </section>
  </div>
  <footer class="dig-pagination" data-slot="pagination">
    <button class="dig-button-secondary" style="min-height:44px;">Load more</button>
  </footer>
</section>
```

## Preview CSS

```css
.layout-search-results {
  display: grid;
  gap: var(--dig-space-4);
  padding: var(--dig-space-5);
  max-width: 720px;
  margin: 0 auto;
}

.dig-search-bar-wrap {
  display: flex;
  gap: var(--dig-space-3);
  align-items: center;
}

.dig-search-bar-wrap .dig-input {
  flex: 1;
}

.dig-result-groups {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-6);
}

.dig-result-item {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-1);
  padding: var(--dig-space-4) 0;
  border-bottom: 1px solid var(--dig-border);
  text-decoration: none;
  color: inherit;
}

.dig-result-title {
  font-weight: 600;
  font-size: var(--dig-text-md);
  color: var(--dig-text);
}

.dig-result-item .dig-body {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@container layout-viewport (max-width: 480px) {
  .dig-search-bar-wrap {
    flex-direction: column;
    align-items: stretch;
  }
}
```

## QA Notes

- 结果是否按类型可扫读。
- snippet 在 mobile 是否截断合理。
- 搜索框是否始终可达。
- 无 card 套结果列表。
