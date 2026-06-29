---
name: Onboarding Wizard
name_zh: 引导向导
slug: onboarding-wizard
page_type: settings
task_type: onboarding
default_catalog: wise
status: draft
recommended_catalogs: wise, apple, dig
description_zh: 分步 onboarding 向导，进度指示 + 单步表单 + 前后导航。
description_en: Step-by-step onboarding with progress, single-step form, and prev/next navigation.
---

## Slots

```yaml
slots:
  progress:
    required: true
    role: navigation
    description: 步骤进度条或 step indicator。
  step_header:
    required: true
    role: main
    description: 当前步骤标题与说明。
  step_content:
    required: true
    role: main
    description: 当前步骤表单或选择区。
  step_actions:
    required: true
    role: control
    description: Back / Continue / Skip。
```

## Applicable Scenarios

- 新用户首次配置 workspace
- 连接集成、选 plan、邀请团队的引导流
- 3-5 步 wizard，每步单一决策

## Avoid When

- 单页可完成的简单设置（用 settings-form）
- 无顺序的多 tab 配置
- 营销向 storytelling（用 marketing-hero）

## Recommended Catalogs

wise — 消费级引导；apple — 系统 setup flow；dig — B2B 产品 onboarding

## Layout Rules

- 一次只展示一个 step，不并排多步。
- progress 始终在顶部，当前步高亮。
- Continue 是主 CTA，Back 是 secondary；Skip 仅可选步骤显示。
- step_content 最大宽度约 480px，居中。
- 不在每步外包大 card 套小 card。

## Responsive Rules

- 全 viewport 单列居中。
- Mobile：progress 简化为 dots；CTA 全宽 stack。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-onboarding-wizard" data-layout="onboarding-wizard">
  <nav class="dig-wizard-progress" data-slot="progress" aria-label="Progress">
    <span class="dig-wizard-dot dig-wizard-dot-active"></span>
    <span class="dig-wizard-dot dig-wizard-dot-active"></span>
    <span class="dig-wizard-dot"></span>
    <span class="dig-wizard-dot"></span>
    <span class="dig-meta">Step 2 of 4</span>
  </nav>
  <div class="dig-wizard-body">
    <header data-slot="step_header">
      <h1 class="dig-panel-title">Connect your repository</h1>
      <p class="dig-body">Link GitHub or GitLab to deploy from your existing codebase.</p>
    </header>
    <div class="dig-wizard-content" data-slot="step_content">
      <div class="dig-form-field">
        <label class="dig-label" for="repo">Repository URL</label>
        <input class="dig-input" id="repo" type="url" placeholder="https://github.com/org/repo" />
      </div>
      <button class="dig-button-secondary" style="width:100%;">Browse repositories</button>
    </div>
    <footer class="dig-wizard-actions" data-slot="step_actions">
      <button class="dig-button-secondary">Back</button>
      <button class="dig-button-primary">Continue</button>
    </footer>
  </div>
</section>
```

## Structural Notes

```css
.layout-onboarding-wizard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dig-space-6);
  padding: var(--dig-space-7) var(--dig-space-4);
  min-height: 360px;
}

.dig-wizard-progress {
  display: flex;
  align-items: center;
  gap: var(--dig-space-2);
}

.dig-wizard-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dig-border-strong);
}

.dig-wizard-dot-active {
  background: var(--dig-accent);
  width: 24px;
  border-radius: 999px;
}

.dig-wizard-body {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-5);
}

.dig-wizard-content {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
}

.dig-wizard-actions {
  display: flex;
  gap: var(--dig-space-3);
  justify-content: space-between;
}

@container layout-viewport (max-width: 480px) {
  .dig-wizard-actions {
    flex-direction: column-reverse;
  }

  .dig-wizard-actions .dig-button-primary,
  .dig-wizard-actions .dig-button-secondary {
    width: 100%;
  }
}
```

## QA Notes

- 当前步骤是否明确。
- Continue 是否足够突出。
- 移动端 progress 是否仍可读。
- wise catalog 下是否像 app onboarding。
