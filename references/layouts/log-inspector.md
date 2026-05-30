---
name: Log Inspector
name_zh: 日志检视器
slug: log-inspector
page_type: runtime
default_catalog: dig
status: draft
recommended_catalogs: dig, mono
description_zh: 全宽日志流 + 级别筛选 + 时间范围，适合集中查看与搜索日志。
description_en: Full-width log stream with level filters and time range for search and inspection.
---

## Slots

```yaml
slots:
  inspector_toolbar:
    required: true
    role: control
    description: 搜索、级别、时间、暂停/流式切换。
  log_stream:
    required: true
    role: main
    description: 主日志列表，mono 等宽。
  log_detail:
    required: false
    role: supporting
    description: 选中行的结构化 detail 或 stack trace。
```

## Applicable Scenarios

- 集中式 application / audit logs
- 比 runtime-console 更专注「读日志」而非「管 runs」
- SRE 排查与关键字搜索

## Avoid When

- 需要 run 列表 + 多面板 orchestration（用 runtime-console）
- 单次 run 步骤调试（用 agent-run-detail）
- 短消息 notification 列表

## Recommended Catalogs

dig — 默认；mono — 终端式 log tail

## Layout Rules

- log_stream 占 ≥70% 高度，toolbar 单行 compact。
- 每行：timestamp · level · message，level 用 tag 色语义。
- 支持 pause live tail，状态在 toolbar 明示。
- 长 message truncate + expand on select，不在列表行内 wrap 十行。
- 背景不用高对比 zebra 条纹，用 subtle divider。

## Responsive Rules

- Desktop：toolbar + stream + optional bottom/side detail。
- Mobile：stream full width；detail 为 bottom sheet；toolbar 折叠次要 filter。

## Preview HTML

```html
<section class="layout-preview layout-log-inspector" data-layout="log-inspector">
  <div class="dig-log-toolbar" data-slot="inspector_toolbar">
    <input class="dig-input dig-log-search" type="search" placeholder="Filter logs…" />
    <button class="dig-button-secondary">Error</button>
    <button class="dig-button-secondary">1h</button>
    <button class="dig-button-primary">Pause live</button>
  </div>
  <div class="dig-log-inspector-grid">
    <section class="dig-surface dig-log-panel" data-slot="log_stream">
      <div class="dig-log-line"><span class="dig-tag">INFO</span> 10:42:01 agent-07 step complete</div>
      <div class="dig-log-line"><span class="dig-tag">DEBUG</span> 10:42:03 tool call search_index</div>
      <div class="dig-log-line dig-log-error"><span class="dig-tag">ERROR</span> 10:42:11 eval-suite timeout after 30s</div>
      <div class="dig-log-line"><span class="dig-tag">INFO</span> 10:42:15 batch-ingest checkpoint 3/8</div>
    </section>
    <aside class="dig-surface" data-slot="log_detail">
      <h2 class="dig-panel-title">Event detail</h2>
      <p class="dig-meta">ERROR · eval-suite</p>
      <pre class="dig-code-block">timeout after 30s at step search_index</pre>
    </aside>
  </div>
</section>
```

## Preview CSS

```css
.layout-log-inspector {
  display: grid;
  gap: var(--dig-space-3);
  padding: var(--dig-space-4);
  min-height: 400px;
}

.dig-log-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-2);
  align-items: center;
}

.dig-log-search {
  flex: 1;
  min-width: 140px;
  max-width: 280px;
}

.dig-log-inspector-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 240px);
  gap: var(--dig-grid-gutter);
  min-height: 320px;
}

.dig-log-inspector-grid > * {
  min-width: 0;
}

.dig-log-panel {
  font-family: var(--dig-font-mono);
  font-size: var(--dig-text-xs);
  overflow-y: auto;
  padding: var(--dig-space-3);
}

.dig-log-panel .dig-log-line {
  display: flex;
  gap: var(--dig-space-2);
  align-items: baseline;
}

.dig-log-error {
  color: var(--dig-danger, var(--dig-text));
}

@container layout-viewport (max-width: 720px) {
  .dig-log-inspector-grid {
    grid-template-columns: 1fr;
  }
}
```

## QA Notes

- log 区是否占主导高度。
- mono 12px 在 mobile 是否可读。
- ERROR 行是否足够醒目但不整屏红。
- 切换 catalog 后 level tag 对比度。
