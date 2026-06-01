# Dig UI Skill

`dig-ui-skill` 是 Dig 团队基于 **"Prompt-as-Code"** 理念构建的 AI 驱动前端设计系统（AI-Driven Design System）。

与传统的预编译组件库（如 Ant Design、MUI）不同，本系统专为现代 AI Agent（如 Cursor, Windsurf）设计。它通过高度结构化的 Markdown 语法定义设计规范，充当 AI 的“大脑上下文”，从而让 AI 能够“零样本”生成出精确、一致、且具有品牌特性的 UI 代码。

本项目全量整合并编译了 **71 套顶级品牌** 的设计系统字典，并新增 **20 套 Layout Recipe** 结构资产。现在 Dig UI 同时具备 Catalog 视觉气质链与 Layout 信息结构链，提供高保真的运行时 HTML 预览以及交互式导航手册中心。

---

## 🎯 核心架构理念

1. **Markdown 即编译器**：设计系统的核心逻辑存在于 `references/global-rules.md`、`references/catalogs/` 与 `references/layouts/` 中。它不是给人类看的说明书，而是提供给 AI 的语法边界、变量词典与页面结构 recipe。
2. **Global Rules 管跨项目行为**：Global Rules 回答“所有 Dig UI 默认都必须遵循什么行为”，例如 i18n、dark/light、按钮形态、React 原生 select/option 等。
3. **Catalog 管视觉气质，Layout 管信息结构**：Catalog 回答“界面看起来像什么品牌”，Layout 回答“内容区域怎么摆、slot 如何组织、响应式顺序是否合理”。
4. **HTML 为视觉快照**：通过 `renders/` 提供纯静态的、所见即所得的视觉预览。人类在这里确认“美”和“结构可操作”，AI 在 Markdown 里学习“理”。
5. **动态运行时 Token 化**：Catalog 渲染预览页通过原生 JS 动态解耦 `:root` CSS 变量；Layout 渲染页可在同一个结构上切换 `dig`、`mono`、`editorial`、`wise`、`apple` 多套 catalog，并默认注入 Global Rules，可用 `--no-global` 生成审查对照版。

---

## 🧩 Token 总规范与 Catalog 扩展

`dig-ui-skill` 采用“四层协议”：global rules 行为约束 + 全局 primitive / token 总规范 + catalog 视觉落地规范 + layout 结构 recipe。

- `references/global-rules.md` 是 Dig UI 的**跨 catalog 行为规则层**，用于约定 i18n、dark/light、按钮药丸形态、React 原生 select/option、交互与图标纪律等默认行为。个人可创建被 `.gitignore` 忽略的 `references/global-rules.local.md` 进行本地覆写。
- `references/tokens.md` 是 Dig UI 的**总规范 / 字段协议**，用于约定公开 token 的命名方式和基础结构，例如 `--dig-bg`、`--dig-text`、`--dig-accent`、`--dig-radius-pill` 等。它负责回答“Dig UI 都有哪些通用字段”。
- `references/primitives.md` 是**基础 primitive 规则**，用于约定布局、grid、字体纪律、交互行为、图标系统等跨 catalog 复用的底层语言。
- `references/catalogs/**/<name>.md` 是**具体 catalog 模版**，用于定义某套风格如何给 token 赋值、如何组织组件、有哪些专属规则。比如 `other/dig.md` 定义 Dig 默认产品语言的深色矿物背景、运行状态感、表单药丸、header 控制条等。
- `references/layouts/<slug>.md` 是**页面结构 recipe**，用于定义页面区域、slot、grid、响应式顺序、适用/禁用场景、Preview HTML/CSS 与 QA Notes。Layout 不写死品牌色，而是依赖 catalog token 与 primitive class。

因此，当前结构不是“每个模版都拆成两个 md”。每个 catalog 仍然是一个 md；`tokens.md` 只是所有 catalog 共享的协议层，防止各个模版随意起字段名。

当前有两条可维护资产链：

```text
Global Rules：references/global-rules.md（+ 可选 global-rules.local.md）→ layout render manifest / notes / global CSS
Catalog：      references/catalogs/**/*.md → renders/<category>/<slug>.html
Layout：       references/layouts/<slug>.md → renders/layouts/<slug>.html
```

每个 catalog 可以定义自己的扩展 attribute / component mapping，但建议遵循下面原则：

1. **通用字段优先复用总规范**：如果是背景、文字、强调色、圆角、阴影、间距这类所有 catalog 都会用到的能力，优先沿用 `tokens.md` 中的 `--dig-*` 字段。
2. **专属能力写在 catalog 内**：如果是某个 catalog 的风格特征或产品行为，可以在该 catalog md 中扩展。例如 dig 里的 `form-input`、`select-trigger`、`segmented-control`、`theme-mode-control`、`language-control`。
3. **扩展也要保持 token 化**：catalog 专属 attribute 不应写死不可替换的暗色/亮色；应通过 token 或 fallback 表达，例如 dig 的 `--dig-control-bg` / `--dig-control-bg-hover`。
4. **组件映射优先写进 `Components Strict Mapping`**：可复用组件、表单控件、控制条、导航等，应该用 YAML component mapping 表达，让 AI 生成代码时有稳定结构。
5. **行为规则单独成节**：跨组件的行为约束，如 dark/light、i18n、hover/focus、持久化、本地语言切换等，适合在 catalog md 中单独建立小节说明。

以 `other/dig.md` 为例，近期补充的规则分别落在：

- `颜色 Token`：新增 `--dig-control-bg`、`--dig-control-bg-hover`，并说明 dark/light 必须通过 token 切换。
- `间距与圆角`：规定 input、select trigger、select option 使用 `--dig-radius-pill`。
- `组件级样式语言 (Components Strict Mapping)`：新增 `form-input`、`select-trigger`、`select-menu`、`select-option`、`segmented-control`、`theme-mode-control`、`language-control`。
- `Dig Chrome 与 i18n`：规定 header/topbar 中的 dark/light 与 zh-CN/en 控制方式，文案必须来自语言包，语言切换需同步 `document.documentElement.lang` 并持久化。

---

## 📂 目录结构

```text
dig-ui-skill/
├── references/
│   ├── tokens.md           # [总规范] Dig UI 全局 token 命名、基础字段与共享协议
│   ├── primitives.md       # [基础规则] 布局、grid、字体纪律、交互与图标 primitive
│   ├── global-rules.md     # [全局规则] i18n、dark/light、药丸按钮、原生 select 等跨 catalog 行为
│   ├── global-rules.local.example.md # [示例] 个人本地 global rules 覆写模板
│   ├── layouts/            # [结构资产] 20 个页面 layout recipe，可编译为三 viewport 预览
│   │   ├── README.md       # Layout 维护说明与索引
│   │   ├── _template.md    # 新增 layout 的标准模板
│   │   └── *.md            # marketing / dashboard / runtime / docs / settings / workspace recipes
│   └── catalogs/           # [视觉资产] 提供给 AI 的各主题风格 Prompt 字典 (.md)
│       ├── ai-llm/         # AI 与大模型平台 (claude, mistral, together.ai 等)
│       ├── dev-tools/      # 开发者工具 (cursor, vercel, raycast 等)
│       ├── devops/         # 后端与运维 (supabase, clickhouse, posthog 等)
│       ├── saas/           # 效率与 SaaS 软件 (notion, linear.app, intercom 等)
│       ├── fintech/        # 金融与加密货币 (stripe, wise, coinbase 等)
│       ├── creative-tools/ # 设计与创意工具 (figma, framer, webflow 等)
│       ├── ecommerce/      # 电商与零售 (shopify, airbnb, nike 等)
│       ├── media-consumer/ # 媒体与消费科技 (apple, spacex, spotify 等)
│       ├── automotive/     # 汽车与工业 (ferrari, tesla, lamborghini 等)
│       └── other/          # 其它基础模版 (dig, mono, editorial)
├── renders/                # [视觉验证] 供设计师/开发者肉眼确认效果的静态 HTML 快照
│   ├── index.html          # [手册中心] 史诗级毛玻璃导航 Hub，支持实时搜索与分类过滤
│   ├── layouts/            # [结构验证] Layout recipe 的 desktop / tablet / mobile HTML 预览
│   └── <category>/         # 各品牌的 HTML 渲染页面（内嵌动态 JS 参数读取器）
├── assets/                 # 渲染器所用到的基础 CSS、global CSS、layout preview primitive 及 Contours 资源
├── updates/                # 系统的版本迭代与架构更新日志
├── sync_renders.py         # [引擎] Python 核心编译同步引擎 (提取 MD 参数、原厂描述注入 HTML)
├── sync_layout_renders.py  # [引擎] Layout Markdown → HTML preview 编译器
├── sync-renders.sh         # [工具] 本地同步入口脚本，支持一键热重载
├── validate-dig-layout-preview.mjs # [校验] Playwright layout 结构检查
├── USAGE.md                # 详细的设计系统维护与修改指南
└── README.md               # 本项目介绍
```

---

## 🚀 快速开始

### 1. 让 AI 替你生成具有特定品牌质感的 UI 代码

直接在你的 AI 编辑器中引用 `references/catalogs/` 下对应的风格字典文件（例如给上下文添加 `@claude.md`），然后在 Prompt 中下发要求：

> “请严格遵循 `claude.md` 中 `## Dig UI CSS Tokens` 代码块下的标准 CSS 变量，并参考其 YAML 规范设计一套具有人文 typesetting 美感的登录表单。”

### 2. 本地微调与热编译同步

1. 打开 `references/catalogs/` 下任意一个 `.md` 字典，修改以 `--dig-` 开头的 CSS 变量（或 Frontmatter 描述）。
2. 在终端运行一键同步脚本完成 HTML 预览热重载：

   ```bash
   # 仅编译/同步指定的模块 (模块名带不带 .md 后缀均可)
   ./sync-renders.sh stripe
   
   # 一键全量同步 71 套品牌
   ./sync-renders.sh
   ```

3. 打开并刷新 [renders/index.html](file:///Users/dig/Documents/文稿 - XinYe的MacBook Pro (5)/Projects/dig-dev/dig-ui-skill/renders/index.html) 导航中心，即可看到最新渲染的视觉效果！

### 3. 维护 Layout 结构资产

当你要新增或调整页面骨架时，优先编辑 `references/layouts/<slug>.md`，然后同步生成结构预览：

```bash
# 同步全部 20 个 layout 预览
./sync-renders.sh --layouts

# 只同步单个 layout，并刷新 renders/layouts/index.html
./sync-renders.sh layout dashboard-overview

# 审查对照：生成不含 global rules 的版本
./sync-renders.sh layout dashboard-overview --no-global

# 运行 Playwright 结构校验
npm run validate:layouts
```

打开 `renders/layouts/index.html` 可以查看全部 layout；打开单个 `renders/layouts/<slug>.html` 可以检查 desktop 1440px、tablet 900px、mobile 390px 三个 viewport，并切换 `dig`、`mono`、`editorial`、`wise`、`apple` catalog 验证结构稳定性。

### 4. 配置个人 Global Rules

如果你希望在本地长期保留个人偏好，例如“所有页面都要中/英 i18n、必须支持 dark/light、按钮药丸型、React 表单 select/option 使用原生组件”，复制示例文件并编辑：

```bash
cp references/global-rules.local.example.md references/global-rules.local.md
```

`references/global-rules.local.md` 已加入 `.gitignore`，只影响本机 AI 生成 / 审查与 layout render，不会被提交到仓库。默认优先级为：

```text
用户当前 prompt > global-rules.local.md > global-rules.md > catalog > layout/primitives
```

如果某次审查不想使用 global rules，可在命令中加 `--no-global`，或在对话中明确说明“不使用 global”。

详细的工作流与 SOP 规范请参阅 **[USAGE.md](./USAGE.md)**。
