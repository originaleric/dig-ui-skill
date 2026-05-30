---
name: dig-ui
description: 用于 Dig 网页与产品界面的设计系统 skill。适用于定义或审查 Dig 专属的 CSS token、catalog 配色体系、layout 信息结构、字体、间距、网格、surface 与界面样式规则，覆盖营销页、文档页、dashboard 和 runtime 控制台。
---

# dig-ui

当任务是从 CSS / 设计系统层面定义、细化或审查 Dig 界面的**视觉语言与信息结构**时，使用这个 skill。

这个 skill **不**从页面模板开始，而是先处理：

- layout recipe 选择
- catalog 选择
- 颜色 token
- 字体与字号层级
- spacing、radius、border、shadow
- grid / background primitive
- 交互样式规则

## 工作流

### 1. 先判断页面类型

在做样式决策前，先选最接近的页面类型：

- `marketing`
- `docs`
- `dashboard`
- `runtime`

如果页面有混合属性，先确定主类型，再标记次类型。

### 2. 选择 layout recipe

在写具体页面前，从 [references/layouts/README.md](references/layouts/README.md) 选择最接近的 layout：

- `marketing-hero`、`split-feature-showcase`：营销与发布
- `docs-article`、`report-insight`：文档与报告
- `dashboard-overview`、`empty-state`、`notification-inbox`：控制台、空态与通知
- `runtime-console`、`agent-run-detail`、`log-inspector`：运行态
- `data-table-workspace`、`search-results`：列表与搜索
- `settings-form`、`onboarding-wizard`、`billing-checkout`：配置、引导与结账

规则：

- layout 负责区域划分与 slot，不写死品牌色。
- 读 layout 的 **Applicable Scenarios / Avoid When**，避免误用。
- 预览与校验：`renders/layouts/<slug>.html`，同步命令 `./sync-renders.sh --layouts`。

### 3. 写 CSS 前先选 catalog

必须先选一个 catalog 作为基础：

- `dig`：Dig 默认产品语言
- `mono`：黑白灰、克制、接近终端感的变体
- `editorial`：带更强衬线感和 editorial 节奏的 Dig 变体
- `wise`：移动端优先、消费级 fintech、酸绿色和大圆角的 Dig 变体
- `apple`：Apple-inspired、高端产品发布、Liquid Glass 和系统原生感的 Dig 变体

选择时先读：

- [references/catalogs/README.md](references/catalogs/README.md)
- [references/catalogs/other/dig.md](references/catalogs/other/dig.md)
- [references/catalogs/other/mono.md](references/catalogs/other/mono.md)
- [references/catalogs/other/editorial.md](references/catalogs/other/editorial.md)
- [references/catalogs/fintech/wise.md](references/catalogs/fintech/wise.md)
- [references/catalogs/media-consumer/apple.md](references/catalogs/media-consumer/apple.md)

规则：

- 没有明确理由时，默认使用 `dig`。
- 只有当页面明确需要 wallet、payment、transfer、referral、consumer fintech 或 mobile app 气质时，才使用 `wise`。
- 只有当页面明确需要 Apple-like product theater、Liquid Glass、系统原生或高端产品发布气质时，才使用 `apple`。
- 同一页面或同一组组件不要混用多个 catalog。
- 所有扩展都从 catalog token 出发，不要临时发明一套颜色。

### 4. 先输出 token 和 primitive，再写组件

在做组件样式前，先定义：

- color token
- font stack
- type scale
- spacing / radius / shadow
- background / grid 行为

需要时读取：

- [references/tokens.md](references/tokens.md)：token 结构与建议值
- [references/primitives.md](references/primitives.md)：基础 CSS 语言与 primitive 约定

### 5. 应用 Dig 专属样式约束

所有 catalog 都遵循这些 Dig 规则：

- 避免通用紫色 SaaS 渐变。
- 避免吵闹的霓虹多强调色混搭。
- hover / focus 保持克制，优先使用 color、border、glow、opacity 的变化。
- 图标优先使用 Lucide 这类线性图标，不用 emoji 式装饰。
- 即使使用 `editorial`，也必须保留清晰的产品界面边界。

### 6. 交付前复查

交付前用 [references/checklist.md](references/checklist.md) 复查：

- catalog 一致性
- token 完整性
- 字体纪律
- 交互状态
- 是否偏离 Dig 的气质
- layout slot 是否齐全、响应式是否合理（见 layout QA Notes）

如果需要可视化对照和审美微调，优先打开这些渲染页：

- [renders/layouts/index.html](renders/layouts/index.html) — layout 结构预览（20 recipes）
- [renders/index.html](renders/index.html)
- [renders/other/dig.html](renders/other/dig.html)
- [renders/other/mono.html](renders/other/mono.html)
- [renders/other/editorial.html](renders/other/editorial.html)
- [renders/fintech/wise.html](renders/fintech/wise.html)
- [renders/media-consumer/apple.html](renders/media-consumer/apple.html)

## 触发场景

当用户有类似需求时，应触发这个 skill：

- “定义 Dig UI token”
- “给 Dig 页面选颜色和字体”
- “按 Dig 风格审查这份 CSS”
- “做一个 Dig 的设计系统”
- “让这个页面更像 Dig”

## 边界

这个 skill 负责的是**设计系统层**，不替代以下工作：

- 详细内容策略与文案撰写
- 纯一次性的装饰型艺术指导

但 **layout recipe** 已覆盖常见产品页面的信息架构骨架；实现时应组合 `layout + catalog + primitive`。

如果任务需要具体页面编排，应先建立 `dig-ui` token 体系，再在其上做页面实现。
