# Layout Recipes

Layout 与 Catalog 平级，负责**信息结构**而非品牌视觉。

## 分层模型

```text
页面需求 → layout recipe → catalog → primitive
```

## 维护流程

1. 编辑 `references/layouts/<slug>.md`
2. 运行 `./sync-renders.sh layout <slug>` 或 `./sync-renders.sh --layouts`
3. 打开 `renders/layouts/<slug>.html` 检查 desktop / tablet / mobile
4. 切换 catalog 验证结构不依赖单一视觉风格
5. 按 QA Notes 复查 · `npm run validate:layouts`

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
./sync-renders.sh --layouts
./sync-renders.sh layout dashboard-overview
npm run validate:layouts
```
