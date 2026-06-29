---
name: Auth Sign In
name_zh: 登录注册
slug: auth-sign-in
page_type: marketing
task_type: auth
default_catalog: apple
status: draft
recommended_catalogs: apple, wise, dig
description_zh: 居中认证卡：logo、社交登录、邮箱表单、法务链接。
description_en: Centered auth card with logo, social login, email form, and legal links.
---

## Slots

```yaml
slots:
  auth_brand:
    required: true
    role: supporting
    description: Logo 或产品名。
  auth_headline:
    required: true
    role: main
    description: Sign in / Create account 标题。
  social_auth:
    required: false
    role: control
    description: OAuth 按钮组。
  auth_form:
    required: true
    role: main
    description: 邮箱/密码或 magic link 表单。
  auth_footer:
    required: true
    role: supporting
    description: 切换登录注册、Terms/Privacy。
```

## Applicable Scenarios

- 产品登录、注册、magic link
- SSO 前的 account picker
- 独立 auth 子域页面

## Avoid When

- 已登录用户的 settings（用 settings-form）
- 多步 onboarding（用 onboarding-wizard）
- 嵌入 modal 内的小 form（inline 即可）

## Recommended Catalogs

apple — 系统原生 auth；wise — 消费级 fintech 登录；dig — B2B 控制台登录

## Layout Rules

- 单卡居中，卡宽 max ~400px。
- social_auth 在 form 上方，按钮全宽、等高。
- 主 submit 全宽，在 form 底部。
- 法务链接用小字 muted，在卡底。
- 背景可 subtle gradient，卡内保持 plain surface。

## Responsive Rules

- 卡左右 margin 16px minimum。
- Mobile：卡全宽减 margin，字段不变结构。

## Implementation Skeleton

```html
<section class="layout-skeleton layout-auth-sign-in" data-layout="auth-sign-in">
  <div class="dig-auth-card dig-surface">
    <div class="dig-auth-brand" data-slot="auth_brand">
      <span class="dig-brand-mark">Dig</span>
    </div>
    <header data-slot="auth_headline">
      <h1 class="dig-panel-title" style="text-align:center;margin-bottom:var(--dig-space-2);">Sign in</h1>
      <p class="dig-body" style="text-align:center;">Welcome back. Enter your credentials to continue.</p>
    </header>
    <div class="dig-social-auth" data-slot="social_auth">
      <button class="dig-button-secondary" style="width:100%;">Continue with GitHub</button>
      <button class="dig-button-secondary" style="width:100%;">Continue with Google</button>
    </div>
    <hr class="dig-divider" />
    <form class="dig-auth-form" data-slot="auth_form">
      <div class="dig-form-field">
        <label class="dig-label" for="email">Email</label>
        <input class="dig-input" id="email" type="email" placeholder="you@company.com" />
      </div>
      <div class="dig-form-field">
        <label class="dig-label" for="password">Password</label>
        <input class="dig-input" id="password" type="password" />
      </div>
      <button class="dig-button-primary" type="submit" style="width:100%;">Sign in</button>
    </form>
    <footer class="dig-auth-footer" data-slot="auth_footer">
      <p class="dig-meta" style="text-align:center;">No account? <a href="#">Create one</a></p>
      <p class="dig-meta" style="text-align:center;margin-top:8px;">Terms · Privacy</p>
    </footer>
  </div>
</section>
```

## Structural Notes

```css
.layout-auth-sign-in {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  padding: var(--dig-space-5);
}

.dig-auth-card {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
}

.dig-auth-brand {
  text-align: center;
}

.dig-social-auth {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-2);
}

.dig-auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
  margin: 0;
}
```

## QA Notes

- 表单字段是否 ≥44px 高。
- 社交按钮与 email 表单层次是否清晰。
- apple catalog 是否像系统登录而非 SaaS 模板。
- 卡内无 card 嵌套。
