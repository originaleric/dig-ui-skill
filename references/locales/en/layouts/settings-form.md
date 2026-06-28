---
name: Settings Form
name_zh: 设置表单页
slug: settings-form
page_type: settings
task_type: configuration
default_catalog: dig
status: draft
recommended_catalogs: dig, mono, apple
description_zh: 分组设置项 + 表单字段 + 底部保存操作，适合账户与系统配置。
description_en: Grouped settings sections with form fields and sticky save actions.
---

## Slots

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 返回、页面标题、可选账户菜单。
  settings_nav:
    required: false
    role: navigation
    description: 设置分组侧栏或 tabs。
  form_sections:
    required: true
    role: main
    description: 按主题分组的表单区块。
  form_actions:
    required: true
    role: control
    description: 保存、取消、危险操作区。
```

## Applicable Scenarios

- 账户、团队、通知、集成、计费设置
- 字段数量中等（5-20），需要分组与说明文案
- 需要明确保存/取消反馈的产品配置页

## Avoid When

- 纯阅读文档（用 docs-article）
- 高密度表格批量编辑（用 data-table-workspace）
- 单字段空状态引导（用 empty-state）

## Recommended Catalogs

dig — 与控制台一致；mono — 极简配置；apple — 系统设置感

## Layout Rules

- 表单区块按主题拆分，每块有标题 + 1-2 句说明。
- 危险操作（删除账户）与常规保存分区，视觉上分离。
- 主保存按钮在表单末尾或 sticky footer，不放在 topbar 远端。
- 字段 label 在上、input 在下，移动端同样结构。
- 不允许整个 settings 页包在单一大 card 内。

## Responsive Rules

- Desktop：可选左侧 settings_nav + 右侧 form 最大宽 640px。
- Tablet：nav 改为顶部 tabs。
- Mobile：单列；form_actions sticky 在底部。

## Preview HTML

```html
<section class="layout-preview layout-settings-form" data-layout="settings-form">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Settings</div>
    <nav class="dig-control-row">
      <button class="dig-button-secondary">Cancel</button>
    </nav>
  </header>
  <div class="dig-settings-grid">
    <nav class="dig-settings-nav" data-slot="settings_nav">
      <a class="dig-nav-link dig-nav-link-active" href="#">Profile</a>
      <a class="dig-nav-link" href="#">Notifications</a>
      <a class="dig-nav-link" href="#">API keys</a>
      <a class="dig-nav-link" href="#">Billing</a>
    </nav>
    <div class="dig-settings-main">
      <section class="dig-form-section" data-slot="form_sections">
        <h2 class="dig-panel-title">Profile</h2>
        <p class="dig-body">Manage how you appear to teammates.</p>
        <div class="dig-form-field">
          <label class="dig-label" for="name">Display name</label>
          <input class="dig-input" id="name" type="text" value="Dig Admin" />
        </div>
        <div class="dig-form-field">
          <label class="dig-label" for="email">Email</label>
          <input class="dig-input" id="email" type="email" value="admin@dig.dev" />
        </div>
      </section>
      <section class="dig-form-section dig-danger-zone">
        <h2 class="dig-panel-title">Danger zone</h2>
        <p class="dig-body">Permanently delete your account and all data.</p>
        <button class="dig-button-secondary">Delete account</button>
      </section>
      <footer class="dig-form-actions" data-slot="form_actions">
        <button class="dig-button-primary">Save changes</button>
      </footer>
    </div>
  </div>
</section>
```

## Preview CSS

```css
.layout-settings-form {
  display: grid;
  gap: var(--dig-space-5);
  padding: var(--dig-space-4);
}

.dig-settings-grid {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: var(--dig-grid-gutter);
}

.dig-settings-nav {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-1);
  min-width: 0;
}

.dig-settings-main {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-6);
}

.dig-form-section {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
  padding-bottom: var(--dig-space-5);
  border-bottom: 1px solid var(--dig-border);
}

.dig-danger-zone {
  border-bottom: none;
}

.dig-form-actions {
  display: flex;
  gap: var(--dig-space-3);
}

@container layout-viewport (max-width: 720px) {
  .dig-settings-grid {
    grid-template-columns: 1fr;
  }

  .dig-settings-nav {
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: auto;
  }

  .dig-form-actions {
    flex-direction: column;
  }

  .dig-form-actions .dig-button-primary {
    width: 100%;
  }
}
```

## QA Notes

- 保存按钮是否在表单上下文附近。
- 危险操作是否与常规字段视觉分离。
- 输入框移动端是否 ≥44px 高、字号 ≥16px。
- 切换 apple catalog 后表单是否仍像系统设置而非营销页。
