---
name: dig-ui
description: 用于 Dig 网页与产品界面的设计系统 skill。Use when the user mentions dig-ui, dig-ui-skill, Dig UI, catalog/wise, catalog/dig, CSS token, layout recipe, block library, dashboard, runtime, marketing, docs, or frontend UI review. Read global-rules.md first, then local rules and local extensions when present.
---

# dig-ui

Dig UI 是 AI 可执行的产品界面设计系统。它通过 `dig-read + workflow + layout + catalog + block + token + global/local rules + render ops` 帮助 agent 生成、审查和维护稳定的产品 UI。

## 读取优先级

1. 用户当前 prompt
2. `references/global-rules.local.md`（若存在）
3. `references/local/`（若存在，用于项目级 layout / block 扩展）
4. 当前安装语言的 `references/global-rules.md`
5. 当前安装语言的 `references/dig-read.md`、`references/anti-tells.md`、`references/preflight.md`、`references/workflows/`
6. 当前安装语言的 `references/layouts/`、`references/catalogs/`、`references/blocks/`
7. `references/shared/` 中的 manifest、token、primitive

若用户明确说「不使用 global / skip global / no global rules」，本次任务跳过 global rules 和 local global rules，但仍可使用 layout、catalog、block、primitive。

## 工作流

### 1. 输出 Dig Read

对页面生成或 UI review 任务，先读取 `references/dig-read.md`，再用一句话确认：

```text
<task type> page for <target user / job>,
using <layout> layout + <catalog> catalog.
```

然后给出四个 dials：

- `INFORMATION_DENSITY`
- `BRAND_EXPRESSIVENESS`
- `INTERACTION_ENERGY`
- `OPERATIONAL_CRITICALITY`

如果任务明显属于 review、redesign、execution 或 image-reference 场景，同时读取 `references/workflows/` 中的对应 workflow。

### 2. 选择 layout

先读 `references/layouts/README.md`，再读取最匹配的 layout 文件。layout 负责信息结构、slots、响应式顺序和 QA notes，不负责品牌色。

若存在 `references/local/manifest.yaml` 或 `references/local/layouts/`，优先判断是否有项目级 layout 更适合。local layout 应使用 `extends`，避免静默复制官方 layout。

### 3. 选择 catalog

写 CSS 前必须先选一个 catalog。用户明确指定时用户优先；未指定时按 layout 的 `default_catalog` 和 `recommended_catalogs` 推断。

常用 catalog：

- `dig`：Dig 默认产品语言
- `mono`：克制、灰阶、高密调试
- `editorial`：叙事、发布、品牌表达
- `wise`：移动优先、消费级 fintech
- `apple`：高端产品发布、系统原生感

同一页面或同一组组件不要混用多个 base catalog。

### 4. 选择 blocks

涉及常见组件或业务模块时，读取 `references/blocks/README.md` 和相关 block 文件。优先使用 block 协议，不临时发明重复结构。

常见 blocks：

- primitive：button、input、select、form-row、toast、modal、tooltip、tabs
- product：table-toolbar、runtime-log-stream、run-status-header、step-timeline、settings-row、empty-state、notification-item、search-result-row

若存在 `references/local/blocks/`，先判断项目级 block 是否更适合。

### 5. 应用 token / primitive / global rules

实现样式时先定义 token、font、type scale、spacing、radius、shadow、background/grid 行为。组件样式引用 `--dig-*` token 或项目主题变量，不写死 dark/light hex。

### 6. 过滤 anti-tells

交付前读取 `references/anti-tells.md`，过滤 AI 常见坏味道，尤其是：

- 通用紫蓝 AI SaaS 渐变
- 所有内容都塞 card
- runtime / execution 页面 landing 化
- 同一业务列表混用 table / card / feed
- 用 glow 替代真实状态层级

### 7. Preflight 和 Render Ops

交付前读取 `references/preflight.md`。如果修改了 catalog 或 render 相关资产，还应运行或建议运行：

```bash
dig-ui-skill render all
dig-ui-skill validate renders
```

render 只用于 catalog 视觉维护预览，不是第二套规范；layout 和 block 以 Markdown 协议为准。若 render 与 markdown 冲突，以 markdown / manifest 为准。

## Runtime 命名边界

`runtime` 历史上既像 page type 又像视觉皮肤。新规则中优先使用：

- `task_type: execution` 表示运行、调试、观测类任务
- `catalog: runtime` 仅在未来作为视觉皮肤落地时使用

保留旧的 `page_type: runtime` 只是为了兼容既有 layout 与历史资产。
