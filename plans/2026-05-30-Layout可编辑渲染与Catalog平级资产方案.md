# Layout 可编辑渲染与 Catalog 平级资产方案

## 1. 背景与目标

`dig-ui-skill` 当前已经形成了比较完整的 catalog 资产体系：设计人员或运维人员可以编辑 `references/catalogs/` 下的 Markdown 文件，通过 `sync-renders.sh` 同步到 `renders/`，再在浏览器里查看颜色、字体、token、surface、按钮、状态等视觉效果。

这套机制解决了“视觉气质可维护”的问题，但 layout 仍主要停留在 `primitives.md`、`SKILL.md` 或具体 catalog 的文字规则中。也就是说，当前系统能很好地回答“这个页面应该是什么风格”，但对“内容区域怎么摆、信息密度是否合理、dashboard 首屏是否好扫、runtime 控制台是否可操作”还缺少同等可编辑、可渲染、可复查的资产层。

本方案目标是把 layout 从一次性的说明文字升级为和 catalog 平级的可编译资产：

- 运维人员可以编辑 layout Markdown 文件。
- 每个 layout 都能生成独立 HTML 预览。
- 同一个 layout 可以切换不同 catalog token 查看适配效果。
- layout 可以逐步接入自动校验，检查溢出、横向滚动、卡片嵌套、字号下限和 slot 缺失。
- 页面实现时可以通过 `layout recipe + catalog + primitive` 的组合生成更稳定的 Dig 产品界面。

这不是要把 `dig-ui-skill` 改成社交卡或海报生成系统，而是补齐产品界面的“结构资产层”。

## 2. 分层模型

建议将 Dig UI 的设计资产分为三层：

```text
页面需求
  ↓
layout recipe：信息结构与版式骨架
  ↓
catalog：视觉气质与品牌 token
  ↓
primitive：底层 CSS / grid / typography / interaction 规则
```

### 2.1 Catalog：负责视觉气质

Catalog 回答“这个界面看起来像什么品牌或什么气质”。

它负责：

- 颜色 token。
- 字体系统。
- 字号层级。
- 圆角、阴影、border、glow。
- surface、button、form、tag、control 等组件视觉映射。
- `dig`、`mono`、`editorial`、`wise`、`apple` 等风格差异。

Catalog 不应该负责复杂页面的信息架构。比如 `dig.md` 可以规定 dashboard panel 的质感，但不应该把所有 dashboard 页面结构都写死在 catalog 内。

### 2.2 Layout：负责信息结构

Layout 回答“内容应该怎么摆”。

它负责：

- 页面区域划分。
- slot 定义。
- grid 占比。
- desktop / tablet / mobile 的排列顺序。
- 首屏焦点。
- 信息密度。
- 适用页面类型。
- 关键反模式，例如卡片套卡片、首屏只剩装饰、表格被挤压不可读。

Layout 不应该写死品牌色，也不应该绑定单一 catalog。一个 `dashboard-overview` layout 应该可以同时套用 `dig`、`mono` 或 `wise`，只要结构仍然成立。

### 2.3 Primitive：负责底层规则

Primitive 回答“所有 layout 和 catalog 都要遵守哪些底层约束”。

它负责：

- shell 最大宽度。
- 12 栏 grid。
- gutter。
- section padding。
- panel padding。
- surface、divider、tag、button 等基础 class。
- hover、focus、transition 规则。
- 图标使用纪律。

Primitive 是 layout 和 catalog 的共同基础。Layout 使用 primitive 搭结构，catalog 使用 token 给 primitive 着色和定调。

## 3. 目标目录结构

建议新增以下目录：

```text
dig-ui-skill/
├── references/
│   ├── layouts/
│   │   ├── README.md
│   │   ├── marketing-hero.md
│   │   ├── dashboard-overview.md
│   │   ├── runtime-console.md
│   │   ├── docs-article.md
│   │   ├── settings-form.md
│   │   └── data-table-workspace.md
│   ├── catalogs/
│   ├── primitives.md
│   └── tokens.md
├── renders/
│   ├── layouts/
│   │   ├── index.html
│   │   ├── marketing-hero.html
│   │   ├── dashboard-overview.html
│   │   ├── runtime-console.html
│   │   └── docs-article.html
│   └── ...
├── sync_renders.py
├── sync-renders.sh
└── validate-dig-layout-preview.mjs
```

### 3.1 `references/layouts/`

这是 layout 的源文件目录。每个 Markdown 文件代表一个可复用 layout recipe。

建议第一阶段只建立 3 个核心 layout：

- `marketing-hero.md`：产品官网或功能发布首屏。
- `dashboard-overview.md`：产品控制台总览页。
- `runtime-console.md`：运行态、agent orchestration、任务执行与日志控制台。

第二阶段再扩展：

- `docs-article.md`：文档页。
- `settings-form.md`：设置页和表单配置页。
- `data-table-workspace.md`：高密度列表、筛选、批量操作工作台。
- `comparison-section.md`：营销页或产品页对比区。
- `empty-state.md`：空状态与引导操作。

### 3.2 `renders/layouts/`

这是 layout 的 HTML 预览目录。它和现有 catalog render 的职责类似，但展示重点不同：

- Catalog render 展示色彩、字体和组件风格。
- Layout render 展示区域比例、slot、响应式、信息密度和页面扫描路径。

每个 layout render 页面默认使用 `dig` catalog，同时提供 catalog 切换控件，用于验证同一结构在不同视觉气质下是否仍然成立。

### 3.3 同步入口

建议扩展现有 `sync-renders.sh` 和 `sync_renders.py`，而不是马上引入独立命令。

推荐命令：

```bash
# 现有行为：同步 catalog
./sync-renders.sh

# 同步全部 layout
./sync-renders.sh --layouts

# 同步指定 layout
./sync-renders.sh layout dashboard-overview

# 同步指定 catalog，保持现有兼容
./sync-renders.sh dig
```

如果担心 `sync_renders.py` 继续变大，也可以第二阶段拆出：

```text
sync_catalog_renders.py
sync_layout_renders.py
sync_renders.py
```

其中 `sync_renders.py` 只做路由和公共工具函数。

## 4. Layout Markdown 协议

每个 layout Markdown 应该既适合人类维护，也适合脚本抽取。建议采用固定结构。

### 4.1 Frontmatter

示例：

```yaml
---
name: Dashboard Overview
name_zh: 控制台总览
slug: dashboard-overview
page_type: dashboard
default_catalog: dig
status: draft
description_zh: 高密度产品总览页，适合 KPI、趋势、任务队列和最近事件。
description_en: Dense product overview layout for KPIs, trends, task queues, and recent activity.
---
```

字段说明：

- `name`：英文名称。
- `name_zh`：中文名称。
- `slug`：文件名和 render 文件名使用的稳定标识。
- `page_type`：页面类型，建议枚举为 `marketing`、`docs`、`dashboard`、`runtime`、`settings`、`workspace`。
- `default_catalog`：默认渲染 catalog，初始建议为 `dig`。
- `status`：`draft`、`stable`、`deprecated`。
- `description_zh` / `description_en`：用于 layout index 搜索和预览说明。

### 4.2 Slots

Slots 定义该 layout 需要哪些内容区域。

示例：

```yaml
slots:
  topbar:
    required: true
    role: navigation
    description: 顶部导航、当前空间、主题/语言/账户控制。
  sidebar:
    required: false
    role: navigation
    description: 桌面端辅助导航，移动端折叠。
  kpi_strip:
    required: true
    role: summary
    description: 3-5 个关键指标。
  primary_panel:
    required: true
    role: main
    description: 首屏主任务、主图表或核心表格。
  secondary_panel:
    required: false
    role: supporting
    description: 趋势、分组数据、队列摘要。
  activity_feed:
    required: false
    role: log
    description: 最近事件、运行状态或审计记录。
```

Slot 的目的不是限制实现，而是让 AI 和运维人员知道这个 layout 的“骨架部位”。后续 validator 可以据此检查 required slot 是否存在。

### 4.3 Layout Rules

Layout rules 写结构约束，不写品牌视觉。

示例：

```md
## Layout Rules

- 桌面端使用 12 栏 grid。
- 顶部 topbar 固定在内容流顶部，不使用悬浮遮挡主体内容。
- KPI strip 占满首行，建议 3-5 个指标。
- 主内容区占 8 栏，辅助区占 4 栏。
- 主表格或主图表必须是首屏最大信息块。
- 不允许把整个页面 section 做成一张大卡片。
- 不允许卡片套卡片。
- 操作按钮应靠近被操作对象，不集中堆在页面右上角。
```

### 4.4 Responsive Rules

Responsive rules 明确不同 viewport 下的顺序和删减策略。

示例：

```md
## Responsive Rules

- Desktop：topbar → KPI strip → primary + secondary two-column → activity feed。
- Tablet：topbar → KPI strip → primary → secondary → activity feed。
- Mobile：topbar 简化为一行，sidebar 折叠，KPI 改为横向滚动或 2 列网格。
- 移动端不隐藏核心操作，只降低辅助信息密度。
- 表格移动端优先改为 stacked rows，不强制缩小到不可读。
```

### 4.5 Preview HTML

Preview HTML 是 layout 可渲染的核心。脚本从这个代码块抽取 HTML 并包进统一 preview shell。

示例：

```html
<section class="layout-preview layout-dashboard-overview" data-layout="dashboard-overview">
  <header class="dig-topbar" data-slot="topbar">
    <div class="dig-brand-mark">Dig</div>
    <nav class="dig-control-row">
      <button class="dig-button-secondary">Status</button>
      <button class="dig-button-primary">Run check</button>
    </nav>
  </header>

  <main class="dig-layout-grid">
    <section class="dig-kpi-strip" data-slot="kpi_strip">
      <article class="dig-surface dig-stat">...</article>
      <article class="dig-surface dig-stat">...</article>
      <article class="dig-surface dig-stat">...</article>
    </section>

    <section class="dig-surface dig-primary-panel" data-slot="primary_panel">
      ...
    </section>

    <aside class="dig-surface dig-secondary-panel" data-slot="secondary_panel">
      ...
    </aside>
  </main>
</section>
```

约束：

- Preview HTML 必须使用 `--dig-*` token 或 primitive class。
- 不允许写死品牌 hex。
- 不允许写一次性大段视觉 CSS。
- 如果必须加 layout 专属 CSS，放在 `Preview CSS` 独立代码块中。
- 所有 slot 建议加 `data-slot`，便于后续校验。

### 4.6 Preview CSS

Preview CSS 只写结构，不写具体品牌视觉。

示例：

```css
.layout-dashboard-overview {
  display: grid;
  gap: var(--dig-space-5);
}

.dig-layout-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--dig-grid-gutter);
}

.dig-kpi-strip {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--dig-space-4);
}

.dig-primary-panel {
  grid-column: span 8;
}

.dig-secondary-panel {
  grid-column: span 4;
}

@media (max-width: 840px) {
  .dig-layout-grid,
  .dig-kpi-strip {
    grid-template-columns: 1fr;
  }

  .dig-primary-panel,
  .dig-secondary-panel {
    grid-column: 1 / -1;
  }
}
```

### 4.7 QA Notes

每个 layout 文件应写清楚人工复查重点。

示例：

```md
## QA Notes

- 首屏是否能在 5 秒内读出当前系统状态。
- KPI 是否有明确主次，不要 6 个指标同权重平铺。
- 主表格或主图表是否足够大。
- 移动端是否出现横向滚动。
- 是否出现卡片套卡片。
- 操作按钮是否靠近上下文。
```

## 5. 渲染机制

Layout render 的目标不是生成最终产品代码，而是生成一个稳定的调试预览页。

### 5.1 编译流程

```text
references/layouts/dashboard-overview.md
  ↓ parse frontmatter
  ↓ extract Slots / Rules / Preview HTML / Preview CSS / QA Notes
  ↓ load selected catalog tokens
  ↓ inject into layout preview shell
  ↓ write renders/layouts/dashboard-overview.html
  ↓ update renders/layouts/index.html
```

### 5.2 Preview Shell

统一 shell 建议包含：

- 页面标题。
- layout 名称、页面类型、状态。
- catalog 切换控件。
- desktop / tablet / mobile 三个预览区。
- slots 摘要。
- layout rules 摘要。
- QA notes 摘要。

示例结构：

```html
<main class="layout-render-shell">
  <header class="layout-render-header">
    <span class="eyebrow">Layout / Dig UI</span>
    <h1>Dashboard Overview</h1>
    <p>高密度产品总览页...</p>
    <div class="catalog-switcher">...</div>
  </header>

  <section class="viewport-preview viewport-desktop">
    <!-- injected preview html -->
  </section>

  <section class="viewport-preview viewport-tablet">
    <!-- injected preview html -->
  </section>

  <section class="viewport-preview viewport-mobile">
    <!-- injected preview html -->
  </section>

  <aside class="layout-render-notes">
    ...
  </aside>
</main>
```

### 5.3 Viewport 策略

建议 render 页面固定展示三种 viewport：

- Desktop：`1440px` 宽，用于产品主工作区。
- Tablet：`900px` 宽，用于中等屏检查。
- Mobile：`390px` 宽，用于换行、堆叠和触控密度检查。

每个 viewport 使用相同 Preview HTML，只通过 CSS 容器宽度触发响应式规则。这样可以验证 layout 自身是否具备响应式弹性。

### 5.4 Token 注入

默认注入 `references/catalogs/other/dig.md` 中的 CSS token。

Catalog 切换可以通过两种方式实现：

1. 编译期注入多个 catalog token block，前端切换 `data-catalog`。
2. 每个 catalog 生成一个 CSS class，例如 `.catalog-dig`、`.catalog-mono`、`.catalog-wise`。

第一阶段建议简单实现：在 HTML 中内联 5 套 token，并通过 JS 切换 `body.dataset.catalog` 或 `html.dataset.catalog`。

## 6. Catalog 切换

Layout preview 默认使用 `dig` catalog，但必须支持常用 catalog 对照：

- `dig`：默认产品语言，适合 runtime、dashboard、agent 控制台。
- `mono`：克制、工程化、文档或高密度工具界面。
- `editorial`：适合内容分析、报告页、insight 页面，但仍要保留产品边界。
- `wise`：适合消费级 fintech、移动端优先、轻量 dashboard。
- `apple`：适合高端产品发布、设备展示、原生系统感页面。

切换 catalog 的目的不是让所有 layout 都适配所有风格，而是尽早暴露结构问题：

- 某些 layout 只在深色下成立，浅色下层次丢失。
- 某些 layout 在大圆角 catalog 下显得卡片过多。
- 某些 dashboard 套 editorial 后变得像文章而不像工具。
- 某些营销 hero 套 mono 后缺少首屏冲击力。

这些反馈应回到 layout rules 或 catalog 规则中修正。

## 7. 运维工作流

建议运维人员按以下流程维护 layout：

```text
1. 打开 references/layouts/<layout>.md
2. 修改 slots、layout rules、responsive rules、preview HTML 或 preview CSS
3. 运行 ./sync-renders.sh layout <layout>
4. 打开 renders/layouts/<layout>.html
5. 在 desktop / tablet / mobile 三个 viewport 中检查效果
6. 切换 catalog，确认结构不依赖单一视觉风格
7. 按 QA Notes 复查
8. 必要时继续调整 Markdown 并重新同步
```

如果是新增 layout：

```text
1. 从 references/layouts/_template.md 复制新文件
2. 填写 frontmatter
3. 定义 slots
4. 写 layout rules 和 responsive rules
5. 写 Preview HTML / CSS
6. 同步生成 render
7. 加入 renders/layouts/index.html
8. 至少用 dig 和 mono 两个 catalog 检查
```

## 8. 校验建议

后续可以新增 `validate-dig-layout-preview.mjs`，借鉴 `guizang-social-card-skill` 的 validator 思路，用 Playwright 真实渲染 DOM 并检查 layout 问题。

### 8.1 第一阶段检查

建议先实现低成本、高收益的检查：

- 页面是否存在横向滚动。
- `.viewport-mobile` 内是否有元素超出容器。
- 文本是否溢出父容器。
- 是否出现 `.dig-surface` 内直接嵌套 `.dig-surface` 的卡片套卡片。
- 所有 `required: true` slots 是否在 Preview HTML 中存在对应 `data-slot`。
- 主要按钮是否有 `:focus-visible` 样式。
- 交互控件高度是否低于移动端可点击下限。

### 8.2 第二阶段检查

后续增强项：

- 对比度检查。
- 字号下限检查。
- dashboard 信息密度检查。
- 首屏主焦点检查。
- 表格移动端策略检查。
- 多 catalog 切换后结构稳定性检查。

### 8.3 命令建议

```bash
node validate-dig-layout-preview.mjs renders/layouts/dashboard-overview.html
node validate-dig-layout-preview.mjs renders/layouts
```

Validator 初期可以只输出 WARN，不强制失败。等 layout 协议稳定后，再把明显结构错误升级为 FAIL。

## 9. 与参考项目的关系

### 9.1 借鉴 `guizang-social-card-skill`

`guizang-social-card-skill` 最值得借鉴的是工程方法，而不是具体视觉：

- 它把视觉系统拆成 style system、theme presets、layout recipes、production workflow、QA checklist。
- 它的 layout recipe 不是泛泛描述，而是明确了适用场景、结构、密度规则和反模式。
- 它通过 HTML seed template + Playwright 渲染 + validator 形成闭环。
- 它强调“表达目标先于装饰”，这对 Dig UI 的 dashboard 和 runtime 页面同样重要。

Dig UI 应该吸收这些方法：

- 建立 `references/layouts/`。
- 建立 layout render。
- 建立 QA checklist。
- 后续建立 validator。

但不建议直接搬它的 Swiss / Editorial 社交卡视觉系统，因为 Dig 已经有自己的 catalog 体系。

### 9.2 借鉴 `100-layout-compositions`

`100-layout-compositions` 的价值是构图灵感库。

建议做法：

- 不直接复制 PNG 到 Dig UI 核心资产中。
- 选取其中适合产品 UI 的构图，人工抽象为 layout recipe。
- 按页面用途分类，而不是按图片编号机械收录。
- 如需要在文档中引用该项目，应注明其 CC BY 4.0 授权和来源。

可抽象的方向包括：

- 大标题 + 辅助列。
- 左侧索引 + 右侧内容区。
- 主视觉 + 多模块信息矩阵。
- 中央工作区 + 两侧工具栏。
- 顶部状态条 + 下方数据密集区。
- 不对称 split layout。
- 多层级 dashboard panel。

这些结构进入 Dig 后应转化为产品界面语言，而不是保留海报化构图。

## 10. 分阶段落地

### Phase 1：建立最小可用 layout 资产

目标：

- 新增 `references/layouts/README.md`。
- 新增 `_template.md`。
- 新增 3 个核心 layout：
  - `marketing-hero.md`
  - `dashboard-overview.md`
  - `runtime-console.md`
- 暂时不改现有 catalog 行为。

验收：

- 每个 layout 都有 frontmatter、slots、layout rules、responsive rules、preview HTML、QA notes。
- 人工阅读即可指导页面实现。
- 不依赖外部图片资产。

### Phase 2：接入 render 编译

目标：

- 扩展 `sync-renders.sh` 支持 layout 参数。
- 扩展或拆分 `sync_renders.py`，支持从 layout md 生成 HTML。
- 新增 `renders/layouts/index.html`。
- 每个 layout 生成独立 preview HTML。

验收：

- `./sync-renders.sh --layouts` 可生成全部 layout 预览。
- `./sync-renders.sh layout dashboard-overview` 可生成单个 layout 预览。
- 生成页面包含 desktop / tablet / mobile 三个 viewport。
- 默认使用 `dig` catalog token。

### Phase 3：Catalog 切换与多风格检查

目标：

- 在 layout preview shell 中加入 catalog switcher。
- 支持至少 `dig`、`mono`、`editorial`、`wise`、`apple`。
- 切换时不重新编译页面。

验收：

- 同一 layout 可在浏览器中切换 5 个 catalog。
- 切换后 token、生效颜色、字体和 surface 风格能明显变化。
- layout 结构保持稳定，没有明显溢出。

### Phase 4：Validator 与 QA 闭环

目标：

- 新增 `validate-dig-layout-preview.mjs`。
- 接入 Playwright。
- 检查横向滚动、文本溢出、slot 缺失、卡片嵌套和字号下限。

验收：

- 对正常 layout 输出 PASS 或 WARN。
- 对故意制造的溢出和缺失 slot 能报告问题。
- Validator 报告包含 layout 名称、viewport、问题节点和建议修复方向。

### Phase 5：扩展布局库

目标：

- 从真实 Dig 页面需求和 `100-layout-compositions` 中持续抽象 layout。
- 扩展到 12-20 个稳定 layout。
- 给每个 layout 标注适用场景、禁用场景和推荐 catalog。

建议新增：

- `docs-article`
- `settings-form`
- `data-table-workspace`
- `comparison-section`
- `pricing-or-plan-grid`
- `empty-state`
- `agent-run-detail`
- `log-inspector`
- `integration-gallery`
- `report-insight`

## 11. 实施边界

本方案明确不做以下事情：

- 不把 `dig-ui-skill` 改成社交卡生成 skill。
- 不直接复制 `guizang-social-card-skill` 的 HTML 模板。
- 不直接复制 `100-layout-compositions` 的图片作为核心依赖。
- 不让 layout 写死 catalog 视觉 token。
- 不让 catalog 承担复杂页面信息架构。
- 不在第一阶段就强制所有旧 render 改造。

推荐先用新 layout 资产服务后续页面生成，再逐步回收旧规则。

## 12. 成功标准

当这个方案落地后，`dig-ui-skill` 应该具备两条同等清晰的设计资产链：

```text
Catalog Asset Chain
references/catalogs/*.md
  → renders/<category>/<catalog>.html
  → 视觉 token / 品牌气质可检查
```

```text
Layout Asset Chain
references/layouts/*.md
  → renders/layouts/<layout>.html
  → 信息结构 / 响应式 / 密度可检查
```

最终使用方式：

```text
用户需求
  → 判断页面类型
  → 选择 layout recipe
  → 选择 catalog
  → 应用 primitive
  → 生成页面
  → render + QA
```

这样 Dig UI 不仅能保持“好看且有品牌感”，还能稳定产出“结构合理、可操作、可维护”的产品界面。
