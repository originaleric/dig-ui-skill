# Dig UI Skill

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](./LICENSE)
[![npm package](https://img.shields.io/badge/npm-dig--ui--skill-red.svg)](https://www.npmjs.com/package/dig-ui-skill)

> 面向 Codex、Cursor、Claude Code 的 prompt-as-code 设计系统资产。

`dig-ui-skill` 是一套 AI-first 的前端设计系统。它不以传统组件库的方式发布，而是把设计规则、视觉 catalog、layout recipe、token 协议和静态预览组织成结构化 Markdown，让 AI 编程 Agent 能稳定生成符合 Dig 气质的产品 UI。

[English README](./README.md) · [安装指南](./INSTALL.md) · [使用指南](./USAGE.md)

## 为什么需要它

AI 很擅长快速生成界面，但如果没有清晰的设计语言，它很容易在颜色、间距、信息密度、响应式顺序和交互细节上漂移。Dig UI Skill 把这些隐性规则显性化：

- **Global Rules**：定义跨项目行为，例如 i18n、dark/light、控件形态、页面/组件一致性、select 用法和交互纪律。规则以英文为主规范，并提供中文翻译对照。
- **Dig Read**：定义 Agent 的第一轮判断：先识别任务、选择 layout/catalog/block 资产，并给出信息密度、品牌表达、交互能量和任务关键性 dials。
- **Catalogs**：定义视觉气质，例如颜色 token、字体、surface、圆角、按钮和组件映射。
- **Layout Recipes**：定义信息结构，例如 slot、grid、主次关系、响应式顺序和 QA Notes。
- **Blocks**：定义可复用 primitive 和 product module 协议，例如 input、modal、runtime log stream、table toolbar、notification item、search result row、settings row。
- **Anti-Tells / Preflight / Workflows**：过滤 AI 常见坏味道，并把 review、redesign、execution 等任务变成可重复流程。
- **Rendered Previews**：提供 catalog、layout 骨架和 block contract 说明页，便于人类先确认视觉、结构、场景示例和状态语义。
- **Local Extensions**：通过 `references/local/` 沉淀项目级 layout / block，而不 fork 官方资产。
- **CLI Installers**：把同一套 skill 同步安装到 Codex、Cursor 和 Claude Code。

## 当前包含

- 71 套 catalog 参考，覆盖 AI、SaaS、金融科技、开发工具、DevOps、创意工具、电商、媒体、汽车工业和 Dig 原生风格。
- 20 套 layout recipe，覆盖 dashboard、docs、runtime console、table workspace、settings、onboarding、pricing、search、auth、marketing 等页面类型。
- `renders/index.html` 静态视觉预览 Hub。
- `renders/layouts/index.html` Layout 结构预览 Hub。
- `renders/blocks/index.html` Block contract Hub，由 block 专属 examples、文档 slots、状态语义和 catalog 兼容性检查生成。
- `npm run validate:layouts` Playwright 结构校验。
- `npm run validate:blocks` Playwright block catalog 切换校验。
- 从 taste-skill 借鉴的 Dig Read 与产品化 dials：`references/dig-read.md`。
- Dig 反模式过滤、交付前 gate 与工作流：`references/anti-tells.md`、`references/preflight.md`、`references/workflows/`。
- `npm run validate:renders` Render Ops 与 parity 校验。
- 基于 `~/.config/dig-ui-skill/global-rules.local.md` 的个人规则同步。

## Highlight：通过 AI Agent 沉淀个人规则

Dig UI 允许用户直接把长期 UI 偏好教给 Codex、Cursor 或 Claude Code，不需要额外配置任何 AI API key。你可以这样说：

```text
使用 dig-ui。把这个加入我的本地 global rules：
Header 保持紧凑并固定顶部，右侧放语言切换、主题切换和用户菜单。
```

Agent 会读取 `references/local-rules-builder.md`，写入 `~/.config/dig-ui-skill/global-rules.local.md`，再同步到已安装工具。也可以用 CLI helper 做机械写入：

```bash
npx dig-ui-skill local add --section "Header / Topbar" "Header stays compact and sticky."
```

## 快速开始

安装到某个 AI 工具：

```bash
npx dig-ui-skill install codex
npx dig-ui-skill install cursor
npx dig-ui-skill install claude-code
```

选择安装语言：

```bash
npx dig-ui-skill install codex --lang zh-CN
npx dig-ui-skill install codex --lang en
```

一次安装到所有支持工具：

```bash
npx dig-ui-skill install --all
npx dig-ui-skill status
```

## 在各工具中使用

### Codex

安装：

```bash
npx dig-ui-skill install codex
```

然后在任意项目中新开 Codex 会话，明确要求使用 Dig UI：

```text
使用 dig-ui skill。请按 Dig catalog 和 dashboard-overview layout 审查这个页面。
```

后续更新：

```bash
npx dig-ui-skill update codex
```

### Cursor

安装个人 skill：

```bash
npx dig-ui-skill install cursor
```

如果希望某个仓库更稳定地触发 Dig UI，再安装项目 rule：

```bash
npx dig-ui-skill install cursor --project /path/to/your/repo
```

然后在 Cursor 里这样要求：

```text
使用 Dig UI。请把这个页面对齐 references/layouts/settings-form.md，并应用 references/catalogs/other/dig.md。
```

后续更新：

```bash
npx dig-ui-skill update cursor
```

### Claude Code

安装：

```bash
npx dig-ui-skill install claude-code
# 别名
npx dig-ui-skill install claude
```

然后用 `/dig-ui`（如果可用）或自然语言触发：

```text
使用 Dig UI 重构这个界面。先采用 runtime-console layout，再应用 mono catalog。
```

后续更新：

```bash
npx dig-ui-skill update claude-code
```

本仓库开发时，从当前目录作为 source 安装：

```bash
node bin/dig-ui-skill.mjs install cursor --source .
node bin/dig-ui-skill.mjs install --all --source .
```

## 日常使用方式

先执行 Dig Read：

```text
references/dig-read.md
```

用它识别 task type、目标用户/任务、候选 layout、catalog 和 dials：

```text
execution page for engineers debugging an agent run,
using agent-run-detail layout + mono catalog.

INFORMATION_DENSITY: 8
BRAND_EXPRESSIVENESS: 3
INTERACTION_ENERGY: 6
OPERATIONAL_CRITICALITY: 9
```

再选 layout recipe：

```text
references/layouts/dashboard-overview.md
```

再选 catalog：

```text
references/catalogs/other/dig.md
references/catalogs/other/mono.md
references/catalogs/fintech/wise.md
references/catalogs/media-consumer/apple.md
```

然后让 AI 编程 Agent 组合它们：

```text
先使用 references/dig-read.md。
使用 references/layouts/dashboard-overview.md 作为结构。
使用 references/catalogs/other/dig.md 作为视觉语言。
交付前使用 references/anti-tells.md 和 references/preflight.md。
文案必须进入 i18n 字典，支持 dark/light，并使用 token 化控件。
```

修改 layout recipe 后同步并校验：

```bash
./sync-renders.sh --layouts
npm run validate:layouts
```

修改 catalog、layout 或 block 后同步完整 Render Ops：

```bash
dig-ui-skill render all
dig-ui-skill validate renders
```

## 目录结构

```text
dig-ui-skill/
├── SKILL.md                         # Codex 兼容工具读取的 skill 入口
├── references/
│   ├── global-rules.md              # 跨 catalog 行为规则
│   ├── global-rules.zh-CN.md        # global rules 中文翻译
│   ├── global-rules.local.example.md
│   ├── dig-read.md                  # Agent 任务判断与 Dig 产品 dials
│   ├── tokens.md                    # 共享 token 协议
│   ├── primitives.md                # 基础布局与交互规则
│   ├── shared/                      # layout/catalog/block 稳定 manifest
│   ├── workflows/                   # 可复用 Agent 工作流
│   ├── blocks/                      # Block library；源码维护 .en.md / .zh-CN.md 兄弟文件
│   ├── local/                       # 项目级 layout / block 扩展
│   ├── anti-tells.md                # 已安装语言的 Dig 反模式过滤
│   ├── preflight.md                 # 已安装语言的交付前 gate
│   ├── catalogs/                    # 视觉 catalog；源码维护 .en.md / .zh-CN.md 兄弟文件
│   └── layouts/                     # Layout recipe；源码维护 .en.md / .zh-CN.md 兄弟文件
├── renders/                         # catalog / layout / block 静态预览产物
├── assets/                          # 预览 CSS 与 Dig 视觉资产
├── adapters/                        # 工具适配模板
├── agents/                          # Agent 元数据
├── bin/dig-ui-skill.mjs             # 安装与同步 CLI
├── sync-renders.sh                  # Render 同步入口
├── sync_renders.py                  # Catalog 预览编译器
├── sync_layout_renders.py           # Layout 预览编译器
├── sync_block_renders.py            # Block 预览编译器
├── validate-dig-catalog-preview.mjs # Catalog QA 校验器
├── validate-dig-block-preview.mjs   # Block catalog 切换校验器
├── validate-dig-layout-preview.mjs  # Layout QA 校验器
└── validate-dig-render-ops.mjs      # Render Ops 与 parity 校验器
```

## Render Ops 与 Local Extensions

Render Ops 有三个维护视图：

```text
renders/index.html          # catalog hub
renders/layouts/index.html  # layout skeleton hub
renders/blocks/index.html   # block contract hub，包含 examples、anatomy、state semantics 和 catalog 兼容性检查
```

项目级资产放在 `references/local/`。local layout / block 优先用 `extends`，真正替换官方行为时放到 `references/local/overrides/`，并写明 owner 和 reason。

## 个人规则

团队默认规则在：

```text
references/global-rules.md
```

该文件是英文主规范。中文翻译在：

```text
references/global-rules.zh-CN.md
```

个人覆写规则建议放在仓库外：

```text
~/.config/dig-ui-skill/global-rules.local.md
```

初始化并同步：

```bash
npx dig-ui-skill init-local
npx dig-ui-skill sync-local --all --from-config
```

宿主 Agent 可以帮你写个人偏好，不需要额外配置 API key。你可以直接要求 Codex、Cursor 或 Claude Code 使用 Dig UI 更新本地 global rules；Agent 会读取 `references/local-rules-builder.md`，写入 `~/.config/dig-ui-skill/global-rules.local.md`，再同步到各工具。

也可以使用 CLI helper：

```bash
npx dig-ui-skill local path
npx dig-ui-skill local show
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
```

仓库已忽略 `references/global-rules.local.md`，避免个人偏好进入公开发布。

## 本地开发

安装依赖：

```bash
npm install
```

同步 catalog 预览：

```bash
./sync-renders.sh
```

同步 layout 预览：

```bash
./sync-renders.sh --layouts
```

同步 block contract 预览：

```bash
./sync-renders.sh --blocks
```

运行预览校验：

```bash
npm run validate:layouts
npm run validate:blocks
npm run validate:catalogs
npm run validate:renders
```

## 开源注意事项

Catalog 文件用于描述公开产品界面的设计语言参考。品牌名、产品名、Logo 和商标归各自权利人所有。本项目与这些公司没有从属、背书或赞助关系。

新增 catalog 时，请优先写设计系统分析和抽象规则，不要加入专有资产、授权字体、截图、私有设计 token 或未授权品牌文件。

## 协议

本项目使用 [Apache License 2.0](./LICENSE)。
