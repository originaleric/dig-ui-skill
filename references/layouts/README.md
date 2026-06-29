# Layout Recipes

Layout 与 Catalog 平级，负责**信息结构**而非品牌视觉。

## 分层模型

```text
页面需求 → layout recipe → catalog → primitive
```

## 维护流程

1. 编辑 `references/layouts/<slug>.md`
2. 确认 Slots、Applicable Scenarios、Avoid When、Responsive Rules 和 QA Notes 完整
3. 对照目标页面手工检查 desktop / tablet / mobile 的结构语义
4. 验证结构规则不写死品牌色，视觉变化交给 catalog
5. 运行 `npm run validate:renders` 检查 manifest、双语资产和 block/layout 协议完整性

## Layout 库（20）

| Slug | 类型 | 用途 |
|------|------|------|
| `marketing-hero` | marketing | 产品官网首屏 |
| `split-feature-showcase` | marketing | 交替 split 功能详解 |
| `comparison-section` | marketing | 功能/方案对比区 |
| `pricing-or-plan-grid` | marketing | 定价方案网格 |
| `auth-sign-in` | marketing | 登录注册 |
| `error-page` | marketing | 404/500 错误页 |
| `integration-gallery` | marketing | 集成/插件画廊 |
| `docs-article` | docs | 文档 / API 长文 |
| `report-insight` | docs | 叙事型报告洞察 |
| `search-results` | workspace | 搜索结果页 |
| `data-table-workspace` | workspace | 高密度列表工作台 |
| `dashboard-overview` | dashboard | 控制台总览 |
| `empty-state` | dashboard | 空状态引导 |
| `notification-inbox` | dashboard | 通知收件箱 |
| `settings-form` | settings | 设置与配置表单 |
| `onboarding-wizard` | settings | 分步引导向导 |
| `billing-checkout` | settings | 账单结算 / 升级 |
| `runtime-console` | runtime | Agent 运行控制台 |
| `agent-run-detail` | runtime | 单次 run 详情 |
| `log-inspector` | runtime | 日志检视器 |

## 命令

```bash
npm run validate:renders
```
