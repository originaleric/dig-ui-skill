---
name: Notification Inbox
name_zh: 通知收件箱
slug: notification-inbox
page_type: dashboard
task_type: inbox
default_catalog: dig
status: draft
recommended_catalogs: dig, apple, wise
description_zh: 通知列表 + 已读/未读筛选 + 批量标记，适合产品内消息中心。
description_en: Notification list with read/unread filters and bulk mark actions for in-app inbox.
---

## Slots

```yaml
slots:
  inbox_header:
    required: true
    role: navigation
    description: 标题、未读计数、全部已读。
  inbox_filters:
    required: true
    role: control
    description: All / Unread / Mentions 等筛选。
  notification_list:
    required: true
    role: main
    description: 通知条目列表。
  inbox_actions:
    required: false
    role: control
    description: 批量选择、归档、删除。
```

## Applicable Scenarios

- 产品内消息中心、活动通知
- Run 失败、部署完成、配额告警推送
- @mention 与系统事件混合 inbox

## Avoid When

- 实时 log tail（用 log-inspector）
- 邮件客户端级复杂线程
- 单条 toast/snackbar（inline 组件即可）

## Recommended Catalogs

dig — 控制台通知；apple — 系统通知感；wise — 消费级 activity feed

## Layout Rules

- 未读条目用 subtle 背景或 accent dot，不用全行高饱和色。
- 每条：icon/type + title + snippet + 相对时间，一行主信息可扫读。
- inbox_filters 在 list 上方，与 header actions 不重复堆叠。
- 批量模式时 list 前出现 checkbox 列，不永久占宽。
- 不允许每条通知再套独立大 card。

## Responsive Rules

- Desktop：list 最大宽 ~640px 居中或左对齐于 content 区。
- Mobile：filters 横向 scroll；swipe actions 可选，不强制。

## Preview HTML

```html
<section class="layout-preview layout-notification-inbox" data-layout="notification-inbox">
  <header class="dig-inbox-header" data-slot="inbox_header">
    <div>
      <h1 class="dig-panel-title" style="margin:0;">Notifications</h1>
      <p class="dig-meta">3 unread</p>
    </div>
    <button class="dig-button-secondary">Mark all read</button>
  </header>
  <nav class="dig-inbox-filters" data-slot="inbox_filters">
    <button class="dig-button-primary" style="min-height:44px;">All</button>
    <button class="dig-button-secondary" style="min-height:44px;">Unread</button>
    <button class="dig-button-secondary" style="min-height:44px;">Mentions</button>
  </nav>
  <ul class="dig-notification-list" data-slot="notification_list">
    <li class="dig-notification-item dig-notification-unread">
      <span class="dig-notification-dot" aria-hidden="true"></span>
      <div class="dig-notification-body">
        <span class="dig-notification-title">Deploy v2.4.1 completed</span>
        <span class="dig-body">Production environment is healthy.</span>
        <span class="dig-meta">2m ago</span>
      </div>
    </li>
    <li class="dig-notification-item dig-notification-unread">
      <span class="dig-notification-dot" aria-hidden="true"></span>
      <div class="dig-notification-body">
        <span class="dig-notification-title">Run failed · eval-suite</span>
        <span class="dig-body">Timeout after 30s at search_index.</span>
        <span class="dig-meta">14m ago</span>
      </div>
    </li>
    <li class="dig-notification-item">
      <div class="dig-notification-body">
        <span class="dig-notification-title">@you in workflow review</span>
        <span class="dig-body">Alex requested your approval on manifest changes.</span>
        <span class="dig-meta">1h ago</span>
      </div>
    </li>
  </ul>
  <footer class="dig-inbox-actions" data-slot="inbox_actions">
    <button class="dig-button-secondary" style="min-height:44px;">Archive selected</button>
  </footer>
</section>
```

## Preview CSS

```css
.layout-notification-inbox {
  display: grid;
  gap: var(--dig-space-4);
  padding: var(--dig-space-5);
  max-width: 640px;
  margin: 0 auto;
}

.dig-inbox-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--dig-space-3);
}

.dig-inbox-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-2);
}

.dig-notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--dig-border);
  border-radius: var(--dig-radius-md);
  overflow: hidden;
  background: var(--dig-surface);
}

.dig-notification-item {
  display: flex;
  gap: var(--dig-space-3);
  padding: var(--dig-space-4);
  border-bottom: 1px solid var(--dig-border);
}

.dig-notification-item:last-child {
  border-bottom: none;
}

.dig-notification-unread {
  background: color-mix(in srgb, var(--dig-accent) 8%, transparent);
}

.dig-notification-dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--dig-accent);
  flex-shrink: 0;
}

.dig-notification-body {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-1);
  min-width: 0;
}

.dig-notification-title {
  font-weight: 600;
  font-size: var(--dig-text-sm);
  color: var(--dig-text);
}

@container layout-viewport (max-width: 480px) {
  .dig-inbox-filters {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: var(--dig-space-1);
  }
}
```

## QA Notes

- 未读 vs 已读是否一眼可辨。
- 列表是否无 card 嵌套。
- 移动端 filter 是否可操作。
- wise catalog 下是否仍像产品通知而非社交 feed 刷屏。
