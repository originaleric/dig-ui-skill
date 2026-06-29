---
name: Empty State
name_zh: 空状态页
slug: empty-state
page_type: dashboard
task_type: system-state
default_catalog: dig
status: draft
recommended_catalogs: dig, wise, apple
description_zh: 无数据时的引导页，说明原因 + 主操作 + 可选次要链接。
description_en: Zero-data guidance with reason, primary action, and optional secondary links.
---

## Slots

```yaml
slots:
  empty_illustration:
    required: false
    role: supporting
    description: 图标、插画占位或轻量 visual。
  empty_headline:
    required: true
    role: main
    description: 一句话说明当前状态。
  empty_description:
    required: true
    role: main
    description: 为何为空、下一步是什么。
  primary_action:
    required: true
    role: control
    description: 创建、导入、连接等主 CTA。
  secondary_links:
    required: false
    role: supporting
    description: 文档、模板、示例链接。
```

## Applicable Scenarios

- 首次进入模块、列表为零
- 筛选无结果（需区分「真空」与「无匹配」）
- 权限不足或未完成 onboarding 步骤

## Avoid When

- 页面有大量数据仅某一 tab 为空（用 inline empty in panel）
- 需要完整营销 narrative（用 marketing-hero）
- 错误/404 全页（可复用结构但 copy 不同）

## Recommended Catalogs

dig — 控制台默认；wise — 消费级引导；apple — 轻量系统空态

## Layout Rules

- 内容垂直居中或略偏上（40% 视口），不要贴底。
- headline + description + CTA 顺序固定，CTA 最多 2 个。
- illustration 可选，不可大于 headline 视觉权重。
- 「无匹配结果」应提供清除筛选 action。
- 不用大面积装饰 gradient 替代信息。

## Responsive Rules

- 全 viewport 居中单列，max-width ~400px。
- Mobile：CTA 全宽 stack。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-empty-state" data-layout="empty-state">
  <div class="dig-empty-center">
    <div class="dig-empty-icon" data-slot="empty_illustration" aria-hidden="true"></div>
    <h2 class="dig-panel-title" data-slot="empty_headline">No workflows yet</h2>
    <p class="dig-body" data-slot="empty_description">Create your first workflow to start deploying agents, or import from a template.</p>
    <div class="dig-empty-actions">
      <button class="dig-button-primary" data-slot="primary_action">Create workflow</button>
      <button class="dig-button-secondary">Browse templates</button>
    </div>
    <nav class="dig-empty-links" data-slot="secondary_links">
      <a class="dig-meta" href="#">Read the quickstart</a>
      <span class="dig-meta"> · </span>
      <a class="dig-meta" href="#">Watch demo</a>
    </nav>
  </div>
</section>
```

## Structural Notes

```css
.layout-empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  padding: var(--dig-space-7) var(--dig-space-4);
}

.dig-empty-center {
  text-align: center;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dig-empty-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-3);
  justify-content: center;
  margin-top: var(--dig-space-5);
}

.dig-empty-links {
  margin-top: var(--dig-space-5);
}

@container layout-viewport (max-width: 480px) {
  .dig-empty-actions {
    flex-direction: column;
    width: 100%;
  }

  .dig-empty-actions .dig-button-primary,
  .dig-empty-actions .dig-button-secondary {
    width: 100%;
  }
}
```

## QA Notes

- 用户能否 3 秒内知道「为什么是空的」和「该做什么」。
- CTA 是否足够突出。
- 切换 wise 后是否仍像产品空态而非广告页。
- illustration 占位是否抢文字。
