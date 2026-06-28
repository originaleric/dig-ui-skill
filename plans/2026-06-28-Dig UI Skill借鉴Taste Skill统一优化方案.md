# Dig UI Skill 借鉴 Taste Skill 统一优化方案

## 1. 背景与目标

`dig-ui-skill` 当前已经形成了稳定的设计系统资产结构：`layout recipe` 负责页面信息结构，`catalog` 负责视觉皮肤，`global rules` 与 `primitives` 负责跨页面、跨 catalog 的底层约束，`renders/` 与 validator 负责预览和校验。

本次研究 `taste-skill` 后，最值得借鉴的不是它的具体审美，而是它把审美判断转化为 agent 执行协议的方式。`taste-skill` 通过 brief inference、dials、anti-tells、pre-flight、子技能和 block library 让 agent 在写代码前先判断场景，在输出后按硬规则自检。

本方案目标是在不破坏 `dig-ui-skill` 现有 `layout -> catalog -> primitive` 分层的前提下，补齐一层更强的 agent 行为协议：

- 让 agent 在选择 layout 和 catalog 前先输出 Dig Read。
- 用 Dig 专属 dials 校准密度、品牌表达、交互强度和任务关键性。
- 用 anti-tells 持续积累 Dig 专属反模式。
- 用 block library 建立 AI 可读的组件/模块规范。
- 用 pre-flight 把 checklist 从人工提醒升级为可执行交付闸门。
- 保持所有新增规则模块化，方便后期增删和维护。

## 2. 核心分层

优化后的 Dig UI 工作流仍然以现有分层为核心：

```text
页面需求
  ↓
Dig Read + dials：先读场景，校准生成方向
  ↓
layout recipe：页面骨架和信息结构
  ↓
catalog：视觉语言 / 皮肤
  ↓
blocks：页面内可复用业务模块和组件协议
  ↓
primitive / token / global rules：底层样式、交互和一致性约束
  ↓
anti-tells / pre-flight：反模式过滤与交付复查
```

其中：

- `layout` 决定页面有哪些区域、信息如何排列。
- `catalog` 决定页面看起来是什么气质。
- `dials` 决定这个 layout + catalog 组合应该用多大力。
- `blocks` 决定页面里的常见模块和组件如何落地。
- `anti-tells` 决定哪些 AI 默认套路必须避免。

## 3. Dig Read

`Dig Read` 是 agent 开工前的一句设计判断摘要。它不替代 layout 和 catalog，而是把用户需求翻译成可执行的设计语境。

推荐格式：

```text
Dig Read:
<页面任务>，面向 <目标用户 / 使用目的>；
结构优先匹配 <layout recipe>；
catalog 若用户未指定，则按 layout 默认值和 catalog 适配规则选择。
```

示例：

```text
Dig Read:
运行详情页，面向调试 agent run 的工程师；
结构优先匹配 agent-run-detail layout；
catalog 未指定时使用 layout 默认 catalog，也可根据语气切换为 mono 或 runtime catalog/skin。
```

这句话的作用是：

- 避免 agent 直接套模板。
- 明确页面是展示型、工作台型、运行态、设置型还是文档型。
- 明确当前用户是工程师、运营、管理者、消费者还是访客。
- 明确 layout 选择是否来自现有 recipe。
- 明确 catalog 是默认选择、用户指定，还是基于语境推断。

需要注意：`runtime` 一词在当前体系中可能同时指页面类型和视觉皮肤。这个命名问题需要单独处理，避免后续方案继续把 page type、layout family 和 catalog/skin 混在一起。

## 4. Runtime 语义拆分与命名策略

当前 `dig-ui-skill` 中 `runtime` 存在语义混用：

- 作为页面类型：表示运行态任务页面，例如 console、run detail、log inspector。
- 作为视觉皮肤：表示运行中、可观测、深色系统感、日志感、agent 正在执行的视觉语言。

这两层都合理，但如果继续共用同一个词，agent 在选择 layout 和 catalog 时容易出现歧义。例如：

```text
runtime-console layout + runtime catalog
```

这在概念上是成立的，但读起来会像重复表达，也容易让 agent 误以为 `runtime` 既是页面骨架又是视觉皮肤。

建议后续命名拆分为：

```text
页面任务 / page type:
execution
operations
run-state

视觉皮肤 / catalog:
runtime
```

其中推荐优先使用：

```text
page type: execution
catalog: runtime
```

理由：

- `execution` 更强调任务执行、运行记录、步骤、日志、错误和恢复路径。
- `runtime` 更适合作为视觉语言，表达运行中系统、深色控制台、状态流、trace、observability 等气质。
- 这样 `agent-run-detail`、`runtime-console`、`log-inspector` 等既有 layout 可以逐步归入 `execution` page type，而不必立刻改掉所有 slug。

推荐迁移规则：

- 短期：保留现有 layout slug，例如 `runtime-console`、`agent-run-detail`、`log-inspector`；在文档中明确 `runtime` page type 是历史命名，新增文档优先写 `execution`。
- 中期：layout frontmatter 统一新增 `task_type` 字段，例如 `execution`；保留 `page_type: runtime` 作为兼容字段，避免破坏既有 render 和 validator。
- 字段纪律：不要同时新增 `page_family` 和 `task_type` 两套字段；任务归类只认 `task_type`。
- 长期：如果 runtime catalog 正式存在，则 `runtime` 只作为 catalog/skin 使用；页面类型统一改成 `execution` 或 `operations`。

推荐 frontmatter 写法：

```yaml
page_type: runtime      # legacy compatibility
task_type: execution    # canonical task category
```

对 agent 的要求：

- 当用户说“runtime 页面”时，先判断用户指的是运行态任务，还是 runtime 皮肤。
- 当用户说“runtime catalog / runtime skin”时，按视觉皮肤理解。
- 当用户说“agent run 详情页 / log inspector / console”时，优先按 `execution` 页面任务理解，再选择具体 layout。
- 当 layout 和 catalog 都可能叫 runtime 时，必须在 Dig Read 中显式写清楚：

```text
结构：runtime-console layout
视觉：runtime catalog
```

这样可以保留现有资产，又不让后续规则继续扩大歧义。

## 5. Dig 专属 Dials

`taste-skill` 的 `DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY` 很有效，但 Dig 更偏产品 UI、dashboard、execution/run-state、docs 和工作台场景，因此建议使用更产品化的四个 dials。

### 5.1 INFORMATION_DENSITY

控制一屏承载多少信息。

低分适合 marketing hero、空状态、品牌介绍页。高分适合 dashboard、日志、表格、run detail、工作台。

```text
1-3：空旷、展示型、少组件、大留白
4-6：常规产品页面，信息与留白平衡
7-10：高密工作台、日志、表格、运行详情
```

影响：

- grid 密度
- section spacing
- table/list/card 选择
- 是否允许大 hero
- 日志、JSON、trace 是否需要 scroll 容器
- 同屏是否优先展示关键元信息

### 5.2 BRAND_EXPRESSIVENESS

控制品牌表达强度。

低分适合设置页、表格、调试器、后台工作台。高分适合官网、发布页、onboarding、空状态和品牌展示。

```text
1-3：品牌弱，优先任务效率
4-6：保留清晰 Dig 气质，但不抢内容
7-10：强品牌表达，适合营销与引导场景
```

影响：

- accent 使用强度
- grid / glow / 背景层次是否明显
- hero 是否更有品牌感
- 空状态是否允许插画或更强视觉引导
- 是否压低装饰以保护调试和操作信息

### 5.3 INTERACTION_ENERGY

控制交互反馈和动效强度。

低分适合账单、危险操作、静态文档、设置表单。高分适合 agent run、execution console、`runtime-console` layout、onboarding 和实时状态界面。

```text
1-3：静态为主，只有 hover/focus/active 基础反馈
4-6：常规产品交互，状态切换清晰
7-10：运行态反馈、流式更新、进度和状态强调
```

影响：

- hover/focus 是否只用颜色、border、opacity
- 当前运行步骤是否高亮
- 日志是否允许流式追加
- loading skeleton 是否需要更贴近真实结构
- 动效是否必须支持 reduced motion

### 5.4 OPERATIONAL_CRITICALITY

控制页面是否任务关键。

低分适合展示页、品牌页、内容页。高分适合部署、付款、删除、权限、配置、失败调试、运行控制台。

```text
1-3：展示/探索优先
4-6：常规操作页面
7-10：任务关键界面，清晰、安全、可恢复优先
```

影响：

- loading / empty / error / disabled / success 是否必须完整覆盖
- destructive action 是否需要确认
- retry / cancel / copy / export 是否靠近上下文
- 信息层级是否优先于装饰
- 是否禁止 layout shift
- 是否需要明确错误定位和恢复路径

## 6. Dials 如何嵌入现有流程

当前流程可以理解为：

```text
用户需求
  ↓
判断页面类型
  ↓
选择 layout
  ↓
选择 catalog
  ↓
按 token / primitive / global rules 生成
```

加入 Dig Read 与 dials 后变为：

```text
用户需求
  ↓
输出 Dig Read
  ↓
给四个 dials 打分
  ↓
选择 layout
  ↓
选择 catalog
  ↓
选择 blocks
  ↓
按 dials 调整密度、品牌、交互、状态覆盖
  ↓
用 anti-tells 和 pre-flight 复查
```

示例：

```text
需求：用 Dig UI 做一个 agent run 详情页

Dig Read:
运行详情页，面向调试 agent run 的工程师；
结构优先匹配 agent-run-detail layout；
catalog 未指定时使用 layout 默认 catalog，也可根据语气切换为 mono 或 runtime catalog/skin。

INFORMATION_DENSITY: 8
BRAND_EXPRESSIVENESS: 4
INTERACTION_ENERGY: 7
OPERATIONAL_CRITICALITY: 9
```

这里 `agent-run-detail` layout 负责页面区域，catalog 负责视觉皮肤，dials 负责校准这个组合的力度。高密度会压低无意义留白，高关键性会强制补齐错误态和重试路径，交互能量会鼓励运行状态反馈但禁止无目的动效。

## 7. Dig Anti-Tells

`Anti-Tells` 是 Dig 专属反模式清单，用于明确哪些 AI 默认套路不应该出现在 Dig 页面里。

它解决的问题是：layout 和 catalog 即使选对了，agent 仍然可能把页面做出 AI 味。例如 runtime console 被做成 landing page，dashboard 过度空旷，所有信息都塞进大卡片，或者用紫蓝 SaaS glow 代替真实状态层级。

以安装后的目录为例，建议新增：

```text
references/anti-tells.md
```

后续也可以按类别拆分：

```text
references/anti-tells/
  README.md
  global.md
  marketing.md
  dashboard.md
  execution.md
  runtime-skin.md
  docs.md
  catalog.md
  components.md
```

初始内容建议覆盖：

- 避免通用紫蓝 AI SaaS 渐变。
- 避免假 terminal / 假 dashboard div 预览。
- 避免每个 section 都有 eyebrow。
- 避免所有内容都塞进 card。
- 避免 execution / runtime console 做得像 landing page。
- 避免 dashboard 过度空旷，失去扫描效率。
- 避免亮暗主题在页面中途随机翻转。
- 避免同一业务列表混用 table / card / feed。
- 避免日志、trace、JSON 被大装饰容器稀释。
- 避免用 glow 替代 status、severity、focus 的真实层级。

示例写法：

```md
## Execution / Runtime Console Anti-Tells

- Do not turn runtime or execution pages into marketing heroes.
- Do not use decorative fake terminals when a real log stream or component preview is needed.
- Do not wrap every log row in a large card.
- Do not hide retry, cancel, copy, or export actions away from their run context.
- Do not use glow as a substitute for clear status hierarchy.
```

`anti-tells` 应该保持可维护。真实项目中发现新的坏味道时就新增；某条规则过度约束时就删除、改写或降级为 `avoid by default`。

## 8. Block Library

`Block Library` 是 AI 可读的组件库 / 模块库。它和传统代码组件库不同，不只关心组件长什么样，还规定组件在什么场景使用、有哪些 slots、绑定哪些 token、必须覆盖哪些状态、移动端如何降级、哪些做法是反模式。

建议新增：

```text
references/blocks/
  README.md
  primitives/
    button.md
    input.md
    select.md
    form-row.md
    toast.md
    modal.md
    tooltip.md
    tabs.md
  product/
    table-toolbar.md
    runtime-log-stream.md
    run-status-header.md
    step-timeline.md
    settings-row.md
    empty-state.md
    notification-item.md
    search-result-row.md
```

推荐分层：

```text
layout recipe = 页面级骨架
block = 页面里的业务模块
primitive/component = 更小的 UI 组件
catalog = 视觉皮肤
token = 颜色、字号、圆角、spacing
```

例如：

```text
agent-run-detail layout
  ├─ run-status-header block
  │   ├─ badge
  │   ├─ button group
  │   └─ meta text
  ├─ step-timeline block
  │   ├─ status indicator
  │   ├─ timestamp
  │   └─ expandable row
  ├─ runtime-log-stream block
  │   ├─ toolbar
  │   ├─ filter select
  │   ├─ log row
  │   └─ copy toast
  └─ io-panel block
      ├─ tabs
      ├─ code block
      └─ error callout
```

每个 block 建议采用固定协议：

```md
---
name: runtime-log-stream
category: product
status: active
description: Live or historical execution log stream with filters, severity, copy/export, and expandable payloads.
applicable_layouts: [runtime-console, agent-run-detail, log-inspector]
compatible_catalogs: [dig, mono, runtime]
---

# Runtime Log Stream

## Use When

## Avoid When

## Slots

## Token Binding

## States

## Responsive Rules

## Accessibility

## Anti-Patterns

## QA Notes
```

安装后的 `references/blocks/README.md` 是 block library 的唯一 schema 入口；源仓库中对应 `references/locales/{lang}/blocks/README.md`。它负责定义所有 block 文件的必填字段、允许枚举和正文小节。不要让每个 block 自己发明一套 frontmatter。

推荐 schema：

```yaml
required_frontmatter:
  name: "stable kebab-case id"
  category: "primitive | product"
  status: "draft | active | deprecated"
  description: "one sentence purpose"
  applicable_layouts: "array; use [all] only when genuinely layout-agnostic"
  compatible_catalogs: "array; use [all] only when genuinely catalog-agnostic"
optional_frontmatter:
  replacement: "required when status is deprecated"
  task_types: "e.g. execution, dashboard, settings, docs, marketing"
required_sections:
  - Use When
  - Avoid When
  - Slots
  - Token Binding
  - States
  - Responsive Rules
  - Accessibility
  - Anti-Patterns
  - QA Notes
```

维护规则：

- 新增 block 前先更新对应语言的 `references/locales/{lang}/blocks/README.md` 索引表，并保持另一语言版本 parity。
- `primitive` block 只描述基础控件协议，例如 input、toast、modal。
- `product` block 描述业务模块协议，例如 runtime-log-stream、table-toolbar、settings-row。
- `compatible_catalogs: [all]` 不能滥用；只有确实不依赖视觉气质时才允许。
- `status: deprecated` 必须写 `replacement`，否则 agent 不知道迁移路径。

`Block Library` 的价值在于让 agent 不必临时发明常见 UI。Button、toast、modal、input、form row 这些基础组件应该纳入；table toolbar、runtime log stream、settings row、empty state 这些更贴近业务的模块也应该纳入，因为 AI 最容易翻车的地方往往不是按钮样式，而是日志流、表格筛选、设置项分组、错误态恢复路径这些中层结构。

## 9. 双语资产与安装语言策略

这里不建议采用“英文原文 + 中文同行解释”的写法。原因是 agent 读取时会同时看到两套表达，容易增加 token 成本，也容易在输出时混用语言。更好的方式是把英文版和中文版视为两套一等公民配置：源仓库同时维护两套，安装时让用户选择语言，安装后只落盘对应语言。

推荐原则：

- 源仓库初始内置 `en` 和 `zh-CN` 两套版本。
- 用户安装时选择语言，例如 `--lang en` 或 `--lang zh-CN`。
- 安装完成后，目标 skill 目录只包含所选语言的 `SKILL.md`、layouts、catalogs、blocks、anti-tells、preflight、workflows 等 agent 可读文件。
- token 名、CSS 变量名、layout slug、catalog slug、block id、CLI 参数保持英文稳定，不随语言翻译。
- 面向 agent 的规则说明、Use When、Avoid When、QA Notes、反模式描述按安装语言本地化。

这里需要特别区分两类资产：

```text
稳定契约层：不翻译，供 CLI / validator / render / agent 稳定引用
可读说明层：按语言维护，供 agent 选择、判断和解释
```

`layout` 和 `catalog` 都属于双层资产，而不是纯 shared 资产。`slug`、frontmatter schema、token contract、required slot id 这类机器可依赖字段保持 shared；`Applicable Scenarios`、`Avoid When`、`QA Notes`、catalog 气质说明、选择依据说明这类 agent 可读内容则进入 `en` / `zh-CN` 两套语言包。

仅就双语语言包相关资产，建议源仓库结构：

```text
dig-ui-skill/
├── SKILL.en.md
├── SKILL.zh-CN.md
├── references/
│   ├── shared/
│   │   ├── tokens.md
│   │   ├── primitives.md
│   │   ├── layout-manifest.yaml
│   │   ├── catalog-manifest.yaml
│   │   ├── block-manifest.yaml
│   │   └── checklist.md
│   └── locales/
│       ├── en/
│       │   ├── global-rules.md
│       │   ├── layouts/
│       │   ├── catalogs/
│       │   ├── anti-tells.md
│       │   ├── preflight.md
│       │   ├── workflows/
│       │   └── blocks/
│       └── zh-CN/
│           ├── global-rules.md
│           ├── layouts/
│           ├── catalogs/
│           ├── anti-tells.md
│           ├── preflight.md
│           ├── workflows/
│           └── blocks/
```

仅就安装后的语言包展开结果，建议结构：

```text
dig-ui/
├── SKILL.md                  # 来自 SKILL.en.md 或 SKILL.zh-CN.md
├── references/
│   ├── global-rules.md        # 所选语言
│   ├── tokens.md              # shared
│   ├── primitives.md          # shared
│   ├── layout-manifest.yaml    # shared stable contract
│   ├── catalog-manifest.yaml   # shared stable contract
│   ├── block-manifest.yaml     # shared stable contract
│   ├── layouts/               # 所选语言的 agent 可读说明
│   ├── catalogs/              # 所选语言的 agent 可读说明
│   ├── anti-tells.md          # 所选语言
│   ├── preflight.md           # 所选语言
│   ├── workflows/             # 所选语言
│   └── blocks/                # 所选语言
└── dig-ui-language.json
```

安装命令建议：

```bash
dig-ui-skill install codex --lang zh-CN
dig-ui-skill install codex --lang en
dig-ui-skill update --all --lang zh-CN
dig-ui-skill status
```

如果用户不传 `--lang`：

- 交互式安装：提示用户选择 `English` 或 `简体中文`。
- 非交互 / CI：默认 `en`，也可以读取已有 `dig-ui-language.json` 继续沿用旧语言。
- 更新已安装 skill：默认沿用现有语言，不隐式切换。

为了避免双语版本漂移，建议给本地化资产增加 parity 检查：

```yaml
required_frontmatter:
  id: "stable id, same in en and zh-CN"
  language: "en | zh-CN"
  schema_version: "same across locales"
  status: "draft | active | deprecated"
  translation_key: "same in en and zh-CN"
```

校验规则：

- `references/locales/en/layouts/agent-run-detail.md` 必须有对应的 `references/locales/zh-CN/layouts/agent-run-detail.md`。
- `references/locales/en/catalogs/other/dig.md` 必须有对应的 `references/locales/zh-CN/catalogs/other/dig.md`。
- `references/locales/en/blocks/product/runtime-log-stream.md` 必须有对应的 `references/locales/zh-CN/blocks/product/runtime-log-stream.md`。
- 同一 `translation_key` 的两份文件必须拥有相同的必填 section。
- layout 的 `slug`、`page_type`、`task_type`、`default_catalog`、`recommended_catalogs`、`required_slots` 必须保持一致。
- catalog 的 `slug`、`category`、`status`、token role、recommended layout / task mapping 必须保持一致。
- block 的 `id`、`category`、`status`、`applicable_layouts`、`compatible_catalogs` 必须保持一致。
- 允许 `description`、正文解释、QA Notes、示例文案本地化。
- 不允许一端新增 layout / catalog / block / anti-tell / workflow 后另一端缺失。

这套机制的重点是：开发维护时双语并存，运行安装时单语清晰。这样既能服务英文和中文用户，又不会让 agent 在一次任务里读到两套互相干扰的规则。

## 10. Pre-Flight Check

现有 `references/checklist.md` 可以继续保留，但建议新增更严格的：

```text
references/preflight.md
```

`preflight` 用于交付前硬性复查，职责比 checklist 更接近 gate。建议覆盖：

- 是否输出 Dig Read。
- 是否明确 layout 和 catalog。
- 如果 catalog 未指定，是否说明默认选择依据。
- 是否给出四个 dials，并让输出与 dials 一致。
- 是否只基于一个 catalog。
- 是否按 layout required slots 实现。
- 是否选用了合适 blocks。
- 是否覆盖 loading / empty / error / disabled / focus-visible。
- 是否无 card 套 card。
- 是否无 execution / runtime landing 化。
- 是否无同一业务列表混用 table / card / feed。
- 是否支持 dark / light，并通过 token 切换。
- 是否无 hard-coded 深浅色。
- 是否移动端无横向滚动。
- 是否 destructive action 有确认或明确恢复路径。

`preflight` 中能机械检查的项目，后续逐步接入 validator；不能机械检查的项目，作为 agent 交付前的自检问题。

## 11. Render Ops Center

Dig UI 已经通过 `renders/` 让 catalog 的视觉维护变得直观，但 layout 和 block 也需要同等重视。catalog render 解决“视觉皮肤是否正确”，layout / block render 解决“结构协议、slot、状态覆盖、响应式降级是否正确”。

建议把 render 扩展为运维中心：

```text
renders/
  catalogs/     # 视觉语言预览
  layouts/      # 页面骨架、slot、响应式预览
  blocks/       # 组件 / 模块状态矩阵预览
  index.html    # 运维入口
```

`layout render` 的目标不是做最终页面，而是让维护者快速看懂 layout 协议。每个 layout render 建议包含：

- Slot overlay：标出 required / optional slots，例如 header、timeline、log-stream、side-panel。
- Responsive switcher：desktop / tablet / mobile 三档预览。
- Catalog switcher：快速查看同一 layout 在 `dig`、`mono`、`editorial` 等 catalog 下是否仍然成立。
- Fixture switcher：normal / loading / empty / error / dense 等数据状态。
- Metadata panel：展示 `slug`、`page_type`、`task_type`、`default_catalog`、`recommended_catalogs`、`required_slots`、`recommended_blocks`。
- QA checklist：检查缺 slot、移动端溢出、card 套 card、同类列表混用 pattern、execution 页面 landing 化等问题。

示例：

```text
renders/layouts/index.html
renders/layouts/agent-run-detail.html
renders/layouts/dashboard-overview.html
renders/layouts/settings-form.html
```

`block render` 更接近轻量 Storybook，但它必须服务 AI skill 运维，而不只是展示组件外观。每个 block render 建议展示状态矩阵：

```text
default
hover
focus-visible
disabled
loading
empty
error
success
dense
mobile
dark
light
```

示例：

```text
renders/blocks/index.html
renders/blocks/input.html
renders/blocks/toast.html
renders/blocks/table-toolbar.html
renders/blocks/runtime-log-stream.html
renders/blocks/settings-row.html
```

为了避免 render 自己变成第二套维护负担，render 应从结构化资产生成，而不是长期手写：

```text
references/render-ops.md
references/render-fixtures/
  layouts/
    agent-run-detail.json
    dashboard-overview.json
  blocks/
    input.json
    runtime-log-stream.json
    settings-row.json
```

生成规则：

- layout render 从 layout markdown frontmatter、layout body、fixture、catalog token 生成。
- block render 从 block markdown frontmatter、required states、fixture、catalog token 生成。
- render 页面只展示维护视图，不成为新的规范来源。
- 若 render 与 markdown 规则冲突，以 markdown / manifest 为准，并让 validator 报告 render stale。
- 同一个 render 页面要能显示 installed language，避免维护者误以为当前在看另一语言包。

建议新增 CLI：

```bash
dig-ui-skill render catalogs
dig-ui-skill render layouts
dig-ui-skill render blocks
dig-ui-skill render all
dig-ui-skill validate renders
```

这会让运维同学维护 catalog 时看视觉，维护 layout 时看骨架，维护 block 时看状态矩阵。三类资产的维护入口一致，但关注点不同。

## 12. Local Extension Layer

除了全局的 `global-rules.local.md`，Dig UI 还应该支持项目级 layout / block 扩展。原因是很多团队会长期沉淀自己的页面骨架和业务模块，例如 agent run 详情页、组织权限设置、成本拆分面板、内部任务队列等。这些不适合进入官方通用资产，但又应该被 agent 稳定复用。

建议新增：

```text
references/local/
  README.md
  manifest.yaml
  layout-rules.md
  block-rules.md
  layouts/
    project-agent-run-detail.md
    project-dashboard-shell.md
  blocks/
    project-cost-breakdown.md
    project-permission-row.md
  overrides/
```

读取优先级建议调整为：

```text
用户当前 prompt
> global-rules.local.md
> references/local/
> installed language package
> shared manifest
```

local layout 不建议直接修改官方同名 layout，而是使用 `extends`：

```yaml
slug: project-agent-run-detail
extends: agent-run-detail
owner: ops-platform
status: active
task_type: execution
default_catalog: dig
required_slots:
  - run-status-header
  - step-timeline
  - runtime-log-stream
  - cost-and-token-panel
```

local block 也使用同样机制：

```yaml
id: project-cost-breakdown
extends: metric-summary
owner: ops-platform
category: product
status: active
applicable_layouts: [project-agent-run-detail]
compatible_catalogs: [dig, mono]
```

命名和覆盖规则：

- 新增项目资产使用 `project-*` 或业务 namespace，避免和官方 slug/id 冲突。
- 扩展官方资产使用 `extends`，不要复制一份后静默分叉。
- 真正需要替换官方行为时，放入 `references/local/overrides/`，必须写 `owner`、`reason`、`reviewed_at`、`replacement_target`。
- local 资产必须有 `status`，过时后先标记 `deprecated` 并提供 `replacement`。
- local 资产也要有 render fixture；否则无法进入 render ops index。

local layer 的价值是让 Dig UI 既能升级官方通用能力，又能沉淀项目经验。官方资产解决“通用正确”，local 资产解决“本项目反复需要”。

## 13. 目录与文件调整

建议最终形成如下结构：

```text
dig-ui-skill/
├── SKILL.en.md
├── SKILL.zh-CN.md
├── references/
│   ├── shared/
│   │   ├── tokens.md
│   │   ├── primitives.md
│   │   ├── checklist.md
│   │   ├── layout-manifest.yaml
│   │   ├── catalog-manifest.yaml
│   │   └── block-manifest.yaml
│   ├── locales/
│   │   ├── en/
│   │   │   ├── global-rules.md
│   │   │   ├── layouts/
│   │   │   ├── catalogs/
│   │   │   ├── preflight.md
│   │   │   ├── anti-tells.md
│   │   │   ├── workflows/
│   │   │   └── blocks/
│   │   └── zh-CN/
│   │       ├── global-rules.md
│   │       ├── layouts/
│   │       ├── catalogs/
│   │       ├── preflight.md
│   │       ├── anti-tells.md
│   │       ├── workflows/
│   │       └── blocks/
│   ├── local/
│   │   ├── README.md
│   │   ├── manifest.yaml
│   │   ├── layout-rules.md
│   │   ├── block-rules.md
│   │   ├── layouts/
│   │   ├── blocks/
│   │   └── overrides/
│   ├── render-ops.md
│   └── render-fixtures/
│       ├── layouts/
│       └── blocks/
└── renders/
    ├── index.html
    ├── catalogs/
    ├── layouts/
    └── blocks/
```

其中：

- `SKILL.en.md` 和 `SKILL.zh-CN.md` 是两套入口模板，安装时生成目标环境里的 `SKILL.md`。
- `references/shared/` 存放语言无关的 token、primitive、layout manifest、catalog manifest、block manifest 和 checklist。
- `references/locales/{lang}/` 存放语言相关的规则说明、layout 文档、catalog 文档、工作流、blocks、anti-tells 和 preflight。
- `references/local/` 存放项目级 layout / block 扩展和覆盖规则，不进入官方语言包 parity，但必须通过 local validator。
- `references/render-ops.md` 存放 render 运维规则，`references/render-fixtures/` 存放 layout / block 的预览数据。
- `workflows/` 存放 review、redesign、execution、image-reference 等场景流程，每种语言各维护一份。
- runtime skin 不放在 `workflows/`，应作为 catalog/skin 规则维护；其稳定 id 进入 `catalog-manifest.yaml`，可读说明分别进入 `references/locales/en/catalogs/` 和 `references/locales/zh-CN/catalogs/`。
- `layouts/` 和 `catalogs/` 安装后只出现用户选择的语言版本，但其中的 slug、required slot id、token 名必须与 shared manifest 对齐。
- `anti-tells.md` 存放反模式，后续可拆分，但需要保持语言版本 parity。
- `blocks/` 存放 AI 可读组件和业务模块，安装后只出现用户选择的语言版本。
- `preflight.md` 存放交付闸门，安装后只出现用户选择的语言版本。
- `renders/catalogs/` 看视觉语言，`renders/layouts/` 看页面骨架，`renders/blocks/` 看状态矩阵。

## 14. SKILL.md 推荐工作流

安装后的 `SKILL.md` 中的工作流建议调整为：

```text
1. 读取 global rules。
2. 若存在 references/local/，读取 local manifest、layout-rules、block-rules。
3. 判断页面任务，输出 Dig Read。
4. 给 Dig dials 打分。
5. 根据页面任务选择官方或 local layout recipe。
6. 根据用户指定、layout 默认、catalog 适配规则选择 catalog。
7. 根据 layout 和页面任务选择官方或 local blocks。
8. 应用 catalog token、primitive 和 global rules。
9. 用 anti-tells 过滤常见 AI 反模式。
10. 用 preflight 复查交付质量。
```

当用户明确指定 catalog 时，用户选择优先。当用户没有指定 catalog 时，按 layout 的 `default_catalog` 与 `recommended_catalogs` 推断。当页面任务和 catalog 存在冲突时，优先保护页面任务的可用性和信息结构。

安装后的 `SKILL.md` 应只做路由和读取顺序，不内联 anti-tells、block schema 或完整 preflight 内容。推荐写法是：

```text
当任务需要具体页面实现或审查时：
1. 读取 global rules。
2. 读取 references/local/（若存在），确认是否有项目级 layout / block 优先适用。
3. 读取匹配 layout。
4. 读取匹配 catalog。
5. 若涉及常见组件/模块，读取 references/blocks/README.md 和相关 block 文件。
6. 若是生成或审查交付，读取 references/anti-tells.md 与 references/preflight.md。
```

这样主入口保持短小，新增或删除 anti-tells / blocks / workflows 时不需要反复重写 `SKILL.md`。源仓库里的 `SKILL.en.md` 和 `SKILL.zh-CN.md` 应保持同一流程结构，只本地化说明文字。

## 15. 维护策略

本方案的重点是可持续维护，而不是一次性写死大 prompt。

### 15.1 Anti-Tells 维护

- 新发现 AI 常见坏味道时，直接新增一条。
- 某条规则过强时，改成 `avoid by default`。
- 某条规则只适合特定页面时，移入对应 page type 小节。
- 后续可将高频规则转为 validator 检查。

### 15.2 Block Library 维护

- 一个 block 一个文件。
- 每个 block 必须有 `status`。
- 过时 block 不直接删除，先标记 `deprecated` 并提供 replacement。
- 新增 block 时至少写清 Use When、Slots、States、Responsive Rules、Anti-Patterns。
- 修改 `references/locales/{lang}/blocks/README.md` schema 时，需要同步检查两种语言的既有 block frontmatter 是否仍然合规。
- 基础组件和业务模块都可以进入 block library，但优先补齐 AI 最容易出错的业务模块。

### 15.3 Dials 维护

- dials 不应该变成复杂数学系统。
- 分值只用于指导 agent 判断，不作为硬编码样式表。
- 如果某个 dial 长期没人用，合并或删除。
- 如果某类页面反复需要额外判断，再新增 dial。

### 15.4 语言包维护

- 英文和中文是两套安装资产，不在同一文件中同行解释。
- 新增、删除、废弃 layout / catalog / block / anti-tell / workflow 时，必须同步处理 `en` 和 `zh-CN`。
- 修改 schema 时，同时跑语言 parity 检查，避免某个语言包缺 section 或 frontmatter。
- layout / catalog 的稳定 id 与机器字段必须以 shared manifest 为准，语言包只本地化说明文字。
- 安装器必须记录当前语言，更新时默认沿用，不擅自切换。
- 用户主动切换语言时，应重新生成 `SKILL.md` 和语言相关 references，而不是混合覆盖。

### 15.5 Render Ops 维护

- catalog、layout、block 都必须有 render index，不能只有零散 HTML。
- layout / block render 必须从 markdown frontmatter 和 fixture 生成，不能成为第二套规范。
- 每个新增 layout 至少提供 normal、empty、error、mobile fixture。
- 每个新增 block 至少覆盖 default、disabled、loading、error、focus-visible、mobile。
- render 页面必须标出当前语言、catalog、fixture 和资产来源（official / local）。
- `validate renders` 应能发现 render 过期、fixture 缺失、slot 缺失、状态矩阵不完整。

### 15.6 Local Extension 维护

- local layout / block 必须使用 `extends` 或明确写 `replacement_target`，不能静默复制官方资产。
- local 资产必须有 `owner`、`status`、`updated_at`，进入 overrides 时还必须有 `reason` 和 `reviewed_at`。
- local slug/id 不得与官方资产冲突，除非放在 `overrides/` 且通过 validator。
- local 资产不参与官方双语 parity，但如果项目自身启用双语，也应在 `references/local/locales/{lang}/` 内做项目级 parity。
- local 资产必须进入 render ops index，否则 agent 可以读取但运维无法直观看到，维护链路不完整。

## 16. 验收标准

本方案落地后，`dig-ui-skill` 应满足：

- 用户只给一句页面需求时，agent 能先输出 Dig Read，而不是直接套模板。
- agent 能说明 layout 和 catalog 的选择依据。
- catalog 未指定时，agent 能区分默认选择和唯一正确选择。
- 同一个 layout 能合理适配不同 catalog，而不会破坏信息结构。
- execution 页面不再被做成 marketing hero；runtime 作为 catalog/skin 时不再和 page type 混淆。
- dashboard 不再过度空旷或卡片泛滥。
- 表格、日志、设置项、空状态等高频模块有可复用 block 规范。
- 新增或删除 anti-tells / blocks 不需要大改 `SKILL.md`。
- 初始系统同时拥有英文和中文两套配置，安装时可选择语言，安装后只包含所选语言资产。
- 英文和中文 layouts / catalogs / blocks / anti-tells / workflows 通过 parity 检查保持结构一致。
- layout / catalog 的机器契约保持 shared，agent 可读说明按安装语言本地化。
- catalog / layout / block 都有对应 render 运维入口，维护者能通过页面检查视觉、骨架、状态矩阵。
- 项目可以通过 `references/local/` 定义自己的 layout / block，并通过 `extends`、validator、render ops 保持可维护。
- checklist、preflight 和 validator 能逐步形成闭环。

## 17. 总结

这次优化不是把 `taste-skill` 的审美搬进 Dig，而是借鉴它的执行纪律。`dig-ui-skill` 已经有更工程化的 layout、catalog、render 和 CLI 基础；需要补的是 agent 开工前的判断协议、生成中的模块协议、交付前的反模式过滤。

最终目标是让 Dig UI 从“AI 可读的设计系统资料库”升级为“AI 可执行、可验证、可持续维护的产品界面生成系统”。
