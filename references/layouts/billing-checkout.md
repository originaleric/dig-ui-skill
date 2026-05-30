---
name: Billing Checkout
name_zh: 账单结算
slug: billing-checkout
page_type: settings
default_catalog: wise
status: draft
recommended_catalogs: wise, apple, dig
description_zh: 计划摘要 + 支付方式 + 订单明细 + 确认支付，适合升级与结账流。
description_en: Plan summary, payment method, order breakdown, and confirm payment for upgrade checkout.
---

## Slots

```yaml
slots:
  checkout_header:
    required: true
    role: navigation
    description: 返回、步骤或安全提示。
  plan_summary:
    required: true
    role: summary
    description: 所选方案、周期、价格。
  payment_method:
    required: true
    role: main
    description: 卡/钱包/发票支付方式。
  order_breakdown:
    required: true
    role: supporting
    description: 小计、税、折扣、总计。
  confirm_action:
    required: true
    role: control
    description: 确认支付、条款同意。
```

## Applicable Scenarios

- SaaS upgrade、seat 增购、年付切换
- 应用内 checkout，非完整 marketing pricing 页
- Fintech 式透明计价结账

## Avoid When

- 公开 pricing 对比（用 pricing-or-plan-grid）
- 账单历史列表（用 data-table-workspace）
- 账户 email/密码设置（用 settings-form）

## Recommended Catalogs

wise — 消费级 fintech 结账；apple — 简洁 premium checkout；dig — B2B seat 升级

## Layout Rules

- Desktop：左栏 plan + payment，右栏 order breakdown sticky。
- 总计数字是 breakdown 区最大 typography。
- confirm 按钮全宽或在 breakdown 底部，文案明确（Pay / Subscribe）。
- 条款 checkbox 在 confirm 上方，小字 links。
- 不用装饰性 banner 抢 pricing 信息。

## Responsive Rules

- Mobile：plan → payment → breakdown → confirm 单列 stack。
- Sticky bottom bar 可选放 confirm + 总价。

## Preview HTML

```html
<section class="layout-preview layout-billing-checkout" data-layout="billing-checkout">
  <header class="dig-topbar" data-slot="checkout_header">
    <div class="dig-brand-mark">Checkout</div>
    <span class="dig-tag">Secure</span>
  </header>
  <div class="dig-checkout-grid">
    <div class="dig-checkout-main">
      <section class="dig-surface" data-slot="plan_summary">
        <p class="dig-kicker">Plan</p>
        <h2 class="dig-panel-title">Pro · Annual</h2>
        <p class="dig-body">Unlimited agents, priority support, SSO.</p>
        <p class="dig-stat-value" style="font-size:var(--dig-text-2xl);">$470<span class="dig-meta" style="font-size:var(--dig-text-sm);"> / year</span></p>
      </section>
      <section class="dig-surface" data-slot="payment_method">
        <h2 class="dig-panel-title">Payment</h2>
        <div class="dig-form-field">
          <label class="dig-label" for="card">Card number</label>
          <input class="dig-input" id="card" type="text" placeholder="4242 4242 4242 4242" />
        </div>
        <div class="dig-checkout-row">
          <div class="dig-form-field">
            <label class="dig-label" for="exp">Expiry</label>
            <input class="dig-input" id="exp" type="text" placeholder="MM/YY" />
          </div>
          <div class="dig-form-field">
            <label class="dig-label" for="cvc">CVC</label>
            <input class="dig-input" id="cvc" type="text" placeholder="123" />
          </div>
        </div>
      </section>
    </div>
    <aside class="dig-checkout-sidebar">
      <section class="dig-surface dig-order-breakdown" data-slot="order_breakdown">
        <h2 class="dig-panel-title">Summary</h2>
        <div class="dig-order-line"><span>Pro annual</span><span>$588</span></div>
        <div class="dig-order-line"><span>Annual discount</span><span>−$118</span></div>
        <div class="dig-order-line"><span>Tax</span><span>$0</span></div>
        <hr class="dig-divider" />
        <div class="dig-order-line dig-order-total"><span>Total due today</span><span class="dig-stat-value" style="font-size:var(--dig-text-xl);">$470</span></div>
      </section>
      <div class="dig-checkout-confirm" data-slot="confirm_action">
        <label class="dig-checkout-terms"><input type="checkbox" /> I agree to Terms and Privacy</label>
        <button class="dig-button-primary" style="width:100%;">Subscribe for $470/year</button>
      </div>
    </aside>
  </div>
</section>
```

## Preview CSS

```css
.layout-billing-checkout {
  display: grid;
  gap: var(--dig-space-5);
  padding: var(--dig-space-4);
}

.dig-checkout-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 340px);
  gap: var(--dig-grid-gutter);
  align-items: start;
}

.dig-checkout-main {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
  min-width: 0;
}

.dig-checkout-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--dig-space-3);
}

.dig-checkout-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
  min-width: 0;
}

.dig-order-line {
  display: flex;
  justify-content: space-between;
  gap: var(--dig-space-3);
  font-size: var(--dig-text-sm);
  color: var(--dig-text-muted);
  padding: var(--dig-space-2) 0;
}

.dig-order-total {
  align-items: baseline;
  color: var(--dig-text);
  font-weight: 600;
}

.dig-checkout-confirm {
  display: flex;
  flex-direction: column;
  gap: var(--dig-space-4);
}

.dig-checkout-terms {
  display: flex;
  align-items: flex-start;
  gap: var(--dig-space-2);
  font-size: var(--dig-text-sm);
  color: var(--dig-text-muted);
}

@container layout-viewport (max-width: 800px) {
  .dig-checkout-grid {
    grid-template-columns: 1fr;
  }

  .dig-checkout-sidebar {
    order: 2;
  }
}

@container layout-viewport (max-width: 480px) {
  .dig-checkout-row {
    grid-template-columns: 1fr;
  }
}
```

## QA Notes

- 总价是否在 confirm 前清晰可见。
- 支付字段是否 ≥44px、mobile 字号合规。
- wise catalog 下是否透明可信、非隐藏费用感。
- 是否 plan/payment 与 summary 卡片平级而非嵌套。
