---
name: Data Table Workspace
name_zh: 数据表格工作台
slug: data-table-workspace
page_type: workspace
task_type: data-operations
default_catalog: dig
status: draft
recommended_catalogs: dig, mono
description_zh: 筛选栏 + 批量操作 + 高密度表格 + 分页，适合列表管理工作区。
description_en: Filter bar, bulk actions, dense data table, and pagination for list workspaces.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 模块标题、创建入口。
  filter_bar:
    required: true
    role: control
    description: 搜索、筛选、视图切换。
  bulk_actions:
    required: false
    role: control
    description: 选中行后的批量操作条。
  data_table:
    required: true
    role: main
    description: 主数据表格。
  pagination:
    required: true
    role: navigation
    description: 分页或 load more。
```

## Applicable Scenarios

- 用户/订单/任务/资产列表管理
- 需要排序、筛选、批量删除或导出
- 运维与 admin 后台主工作区

## Avoid When

- 仅 3-5 条记录的简单列表（用 dashboard secondary panel）
- 以 narrative 为主的内容页（用 docs-article）
- 单列日志流（用 log-inspector）

## Recommended Catalogs

dig — 默认控制台；mono — 超高密度工具台

## Layout Rules

- filter_bar 与 table 视觉连贯，filter 不浮在 unrelated card 上。
- 表格列优先级：名称 > 状态 > 时间 > 次要 meta。
- bulk_actions 仅在选中时出现，不常驻占高。
- 行内操作（编辑/删除）靠右，不超过 2 个 icon+label。
- 移动端表格转 stacked row，保留状态与主标识。

## Responsive Rules

- Desktop：full table with horizontal scroll only as last resort。
- Tablet：隐藏次要列，保留 3-4 列。
- Mobile：stacked cards per row；filter 折叠为 single search + filter button。

## Preview HTML

```html
<section class="layout-preview layout-data-table-workspace" data-layout="data-table-workspace">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Workflows</div>
    <button class="dig-button-primary">Create workflow</button>
  </header>
  <div class="dig-filter-bar" data-slot="filter_bar">
    <input class="dig-input dig-filter-search" type="search" placeholder="Search workflows…" />
    <button class="dig-button-secondary">Status</button>
    <button class="dig-button-secondary">Owner</button>
  </div>
  <div class="dig-bulk-bar" data-slot="bulk_actions">
    <span class="dig-meta">2 selected</span>
    <button class="dig-button-secondary">Archive</button>
    <button class="dig-button-secondary">Delete</button>
  </div>
  <div class="dig-surface dig-data-table-wrap" data-slot="data_table">
    <div class="dig-table-header">
      <span>Name</span><span>Status</span><span>Updated</span><span></span>
    </div>
    <div class="dig-table-row"><span>ingest-pipeline</span><span class="dig-tag">Active</span><span class="dig-meta">2h ago</span><button class="dig-button-secondary" style="min-height:44px;padding:0 12px;">Edit</button></div>
    <div class="dig-table-row"><span>report-export</span><span class="dig-tag">Paused</span><span class="dig-meta">1d ago</span><button class="dig-button-secondary" style="min-height:44px;padding:0 12px;">Edit</button></div>
    <div class="dig-table-row"><span>agent-eval</span><span class="dig-tag">Active</span><span class="dig-meta">3d ago</span><button class="dig-button-secondary" style="min-height:44px;padding:0 12px;">Edit</button></div>
  </div>
  <footer class="dig-pagination" data-slot="pagination">
    <span class="dig-meta">1–3 of 48</span>
    <div class="dig-control-row">
      <button class="dig-button-secondary" style="min-height:44px;">Prev</button>
      <button class="dig-button-secondary" style="min-height:44px;">Next</button>
    </div>
  </footer>
</section>
```

## Preview CSS

```css
.layout-data-table-workspace {
  display: grid;
  gap: var(--dig-space-4);
  padding: var(--dig-space-4);
}

.dig-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-3);
  align-items: center;
}

.dig-filter-search {
  flex: 1;
  min-width: 160px;
  max-width: 320px;
}

.dig-bulk-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dig-space-3);
  padding: var(--dig-space-3) var(--dig-space-4);
  border: 1px solid var(--dig-border);
  border-radius: var(--dig-radius-md);
  background: var(--dig-surface-strong);
}

.dig-data-table-wrap {
  padding: 0;
  overflow: hidden;
}

.dig-table-header {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 0.8fr auto;
  gap: var(--dig-space-3);
  padding: var(--dig-space-3) var(--dig-space-5);
  font-size: var(--dig-text-xs);
  font-family: var(--dig-font-mono);
  color: var(--dig-text-soft);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--dig-border);
}

.dig-data-table-wrap .dig-table-row {
  grid-template-columns: 1.5fr 0.8fr 0.8fr auto;
  padding: var(--dig-space-3) var(--dig-space-5);
}

.dig-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@container layout-viewport (max-width: 720px) {
  .dig-table-header {
    display: none;
  }

  .dig-data-table-wrap .dig-table-row {
    grid-template-columns: 1fr;
    gap: var(--dig-space-2);
  }
}
```

## QA Notes

- 表格在 mobile 是否仍可读。
- 批量操作条是否与选中状态关联清晰。
- 是否出现 card 套 table 又套 card。
- mono 下状态 tag 是否仍有足够对比。
