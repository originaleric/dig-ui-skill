---
name: Error Page
name_zh: 错误页
slug: error-page
page_type: marketing
default_catalog: mono
status: draft
recommended_catalogs: mono, dig, apple
description_zh: 404/500 等错误页，错误码 + 说明 + 返回/重试操作。
description_en: Error pages with code, explanation, and return or retry actions.
---

## Slots

```yaml
slots:
  error_code:
    required: true
    role: main
    description: 404、500 等状态码或简短标识。
  error_message:
    required: true
    role: main
    description: 人话说明发生了什么。
  error_actions:
    required: true
    role: control
    description: 返回首页、重试、联系支持。
  error_detail:
    required: false
    role: supporting
    description: request id、技术细节（可折叠）。
```

## Applicable Scenarios

- 404 未找到、403 无权限、500 服务错误
- 维护页、region 不可用
- 产品内嵌 error boundary 全页

## Avoid When

- 表单字段级 inline 错误（用 field validation）
- 空列表引导（用 empty-state）
- 需要大量排查 UI（用 log-inspector）

## Recommended Catalogs

mono — 克制技术错误；dig — 产品控制台错误；apple — 系统级错误页

## Layout Rules

- 内容居中，max-width ~420px。
- error_code 可以是最大 typography，但不超过 hero 级 marketing 页。
- 至少一个 primary action（回首页）和一个 secondary（联系支持/重试）。
- error_detail 默认折叠或 muted，不抢主 message。
- 不用插图占满半屏。

## Responsive Rules

- 全 viewport 垂直居中偏上。
- Mobile：CTA 全宽。

## Preview HTML

```html
<section class="layout-preview layout-error-page" data-layout="error-page">
  <div class="dig-error-center">
    <p class="dig-error-code" data-slot="error_code">404</p>
    <h1 class="dig-panel-title" data-slot="error_message">This page doesn't exist</h1>
    <p class="dig-body">The link may be outdated or the resource was moved.</p>
    <nav class="dig-error-actions" data-slot="error_actions">
      <button class="dig-button-primary">Back to home</button>
      <button class="dig-button-secondary">Contact support</button>
    </nav>
    <p class="dig-meta dig-error-detail" data-slot="error_detail">Request ID · req_9c4f2a</p>
  </div>
</section>
```

## Preview CSS

```css
.layout-error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  padding: var(--dig-space-7) var(--dig-space-4);
}

.dig-error-center {
  text-align: center;
  max-width: 420px;
}

.dig-error-code {
  margin: 0 0 var(--dig-space-3);
  font-family: var(--dig-font-mono);
  font-size: var(--dig-text-5xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--dig-text-muted);
  line-height: 1;
}

.dig-error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dig-space-3);
  justify-content: center;
  margin-top: var(--dig-space-5);
}

.dig-error-detail {
  margin-top: var(--dig-space-6);
}

@container layout-viewport (max-width: 480px) {
  .dig-error-actions {
    flex-direction: column;
    width: 100%;
  }

  .dig-error-actions .dig-button-primary,
  .dig-error-actions .dig-button-secondary {
    width: 100%;
  }
}
```

## QA Notes

- 用户能否立即知道如何离开错误态。
- error_code 是否不喧宾夺主。
- mono 下层次是否仍清晰。
- 无横向滚动。
