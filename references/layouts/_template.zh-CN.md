---
name: Layout Name
name_zh: 布局名称
slug: layout-slug
page_type: dashboard
default_catalog: dig
status: draft
description_zh: 简短中文说明，用于索引和选择。
description_en: Short English description for index and selection.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 顶部导航区域。
  main:
    required: true
    role: main
    description: 主内容区。
```

## Applicable Scenarios

- （列出适用页面类型与场景）

## Avoid When

- （列出不应使用本 layout 的情况，并指向更合适的 layout）

## Recommended Catalogs

dig, mono — 说明各 catalog 为何适合

## Layout Rules

- 桌面端使用 12 栏 grid。
- 不允许卡片套卡片。
- 操作按钮应靠近被操作对象。

## Responsive Rules

- Desktop：topbar → main two-column。
- Tablet：topbar → main → secondary。
- Mobile：sidebar 折叠，主内容单列堆叠。
- 结构实现如需容器断点，可使用 `@container`；不要把断点规则绑定到某个 catalog。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-slug" data-layout="layout-slug">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Dig</div>
    <nav class="dig-control-row">
      <button class="dig-button-secondary">Action</button>
      <button class="dig-button-primary">Primary</button>
    </nav>
  </header>
  <main class="dig-shell" data-slot="main">
    <p class="dig-body">Skeleton placeholder — replace with real structure.</p>
  </main>
</section>
```

## Structural Notes

```css
.layout-slug {
  display: grid;
  gap: var(--dig-space-5);
}
```

## QA Notes

- 首屏是否能在 5 秒内读出核心信息。
- 移动端是否出现横向滚动。
- 是否出现卡片套卡片。
