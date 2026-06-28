# Dig UI Skill: 设计系统维护与使用指南 (Usage Guide)

本文档说明了如何维护和更新 `dig-ui-skill` 中的设计系统资产，包括 Catalog 视觉 token（尺寸、颜色、排版和组件映射）、Layout 结构 recipe（页面区域、slot、grid、响应式顺序和 QA）、Block Library（组件/模块协议）与 Render Ops 预览。
本系统采用 **"Prompt-as-Code" (AI 驱动设计系统)** 的核心理念，即：

- **HTML (`renders/`)** 是用于人类视觉验证、结构检查和状态矩阵调试的界面。
- **Markdown (`references/catalogs/`、`references/layouts/`、`references/blocks/`)** 是提供给 AI 的系统规则、语法词典、结构 recipe 和模块协议。

当你需要微调设计系统（例如：把 Hero Title 放大，或者调整主按钮的圆角）时，可以选择以下两种工作流：

---

## 📦 多工具安装与更新

`dig-ui-skill` 提供统一 CLI，可将当前 skill 安装到 Codex、Cursor、Claude Code 的个人 skill 目录。日常使用优先通过 CLI 安装，避免手动复制时漏掉 `references/`、`assets/`、`renders/` 或适配模板。

```bash
npx dig-ui-skill install codex
npx dig-ui-skill install cursor
npx dig-ui-skill install claude-code
npx dig-ui-skill status
```

默认安装路径：

| 工具 | 安装目录 |
| ---- | -------- |
| Codex | `~/.codex/skills/dig-ui` |
| Cursor | `~/.cursor/skills/dig-ui` |
| Claude Code | `~/.claude/skills/dig-ui` |

本仓库开发调试时建议从当前目录安装：

```bash
node bin/dig-ui-skill.mjs install cursor --source .
node bin/dig-ui-skill.mjs install --all --source .
node bin/dig-ui-skill.mjs install codex --source . --lang zh-CN
node bin/dig-ui-skill.mjs install codex --source . --lang en
```

需要持续跟随本地仓库改动时，可使用 symlink 模式：

```bash
node bin/dig-ui-skill.mjs install cursor --link --source .
```

更新已安装的 skill：

```bash
npx dig-ui-skill update cursor
npx dig-ui-skill update --all
```

`update` 会刷新标准资产，但会保留目标目录中已有的 `references/global-rules.local.md`。如果还没有 local rules，CLI 只会提示运行 `init-local` / `sync-local`，不会自动生成个人偏好。

个人 Global Rules 推荐放在仓库外配置中心，再同步到各工具：

```bash
# 创建 ~/.config/dig-ui-skill/global-rules.local.md（已存在则不覆盖）
npx dig-ui-skill init-local

# 首次同步到 Codex / Cursor / Claude Code
npx dig-ui-skill sync-local --all

# 编辑配置中心后，显式推送覆盖各端副本
npx dig-ui-skill sync-local --all --from-config

# 更新标准资产后一并同步个人规则
npx dig-ui-skill update --all --with-local --from-config
```

当配置中心与目标工具目录的 local 文件内容不一致时，默认不覆盖并报告冲突；使用 `--from-config` 覆盖目标，或使用 `--from-target` 导入目标。

Cursor 个人 skill 安装到 `~/.cursor/skills/dig-ui`。如果某个业务仓库需要更稳定地触发 Dig UI，可额外安装项目 rule：

```bash
npx dig-ui-skill install cursor --project /path/to/your/repo
```

该命令会写入 `<repo>/.cursor/rules/dig-ui.mdc`，指向个人 skill 目录。Cursor 内置托管目录 `~/.cursor/skills-cursor` 不应手动写入，也不是本 CLI 的目标目录。

更多安装细节见 [INSTALL.md](./INSTALL.md)。

---

## 🤖 方式一：AI 辅助极速工作流 (推荐)

这是最高效的现代工程师工作流，让 AI 帮你处理文件之间的同步。

### Step 1: 在 HTML 中直观调试 (Visual Tweaking)

不要在脑海里想象数值，**先在浏览器里调到满意为止**。

1. 在浏览器中打开对应的渲染页，例如 `renders/saas/intercom.html`。
2. 打开浏览器的 **审查元素 (DevTools)**，直接修改界面的 CSS。或者在代码编辑器里修改 HTML 顶部的 `<style>` 区块。
3. 反复调整数值（字号、留白、颜色等），直到视觉达到完美效果，并**记住你修改了哪些关键数值**。

### Step 2: 告诉 AI 你的诉求

回到你的 AI 编辑器（Cursor / Windsurf 等），直接用自然语言向 AI 提要求，让它帮你同步更新。

**Prompt 示例：**

> “我在预览 intercom 时觉得标题太小，所以我决定把 Hero Title 改大到 64px，并且我希望 primary button 的 padding 变厚一点变成 16px 32px。请帮我同时更新 `renders/saas/intercom.html` 里的 CSS，以及 `references/catalogs/saas/intercom.md` 中的 YAML 映射规范。”

AI 会自动去解析 HTML 修改代码，并把规矩准确地写入 `.md` 文件中。

---

## ✍️ 方式二：纯人工介入工作流 (SOP)

如果不希望依赖 AI，或者需要手动控制底层的每一个细节，你需要确保 HTML 和 Markdown 两头的数据严格对齐。完整的人工闭环包含以下 4 个步骤。

（假设任务：将 Sentry 风格的 `Hero Title` 字号从 `56px` 改为 `64px`）

### Step 1: 在 HTML 中验证视觉（改代码）

在纯静态 HTML 文件中修改并预览效果。

1. 打开预览文件：`renders/devops/sentry.html`。
2. 找到顶部的 `<style>` 标签。
3. 找到对应的基础变量（如 `:root` 下的 `--dig-text-5xl: 56px;`），将其手动修改为 `64px`，保存并刷新浏览器查看效果。

### Step 2: 在 Markdown 中更新基础变量（改词典）

将底层的尺寸变量更新到 Markdown 文档里，这决定了 AI 生成代码时的全局配置。

1. 打开文件：`references/catalogs/devops/sentry.md`。
2. 找到 `## 字号与行高`（或对应的基础定义区）的代码块。
3. 手动修改对应变量：

   ```diff
   - --dig-text-5xl: 56px;
   + --dig-text-5xl: 64px;
   ```

### Step 3: 在 Markdown 中更新 YAML 映射关系（改语法）

基础变量改了，还需要确认“排版角色”或“组件”有没有正确指向这个变量。

1. 继续在 `references/catalogs/devops/sentry.md` 中。
2. 找到 `typography:` 或 `components:` 这两个 YAML 块，找到对应的 `hero-title`。
3. 确认或修改它的绑定：

   ```yaml
   typography:
     hero-title:
       # 如果这里已经绑定了 var(--dig-text-5xl)，则不需要修改
       fontSize: "var(--dig-text-5xl)" 
       # 如果你想强行写死特定值，可以改为：fontSize: "64px"
   ```

### Step 4: 动态 Token 说明书免维护特性

**💡 重点提示**：由于我们引入了 **Dynamic Token 运行时绑定** 技术，您修改了 `:root` 变量后，预览页面底部的“颜色色块”、“Hero 侧栏参数板”以及“Token 对照表”**不需要再手动修改**！
它们会自动通过原生的 JS 动态渲染器在运行时读取最新数据，实现免维护。

---

## 🛠 下一代 Python 自动化编译同步引擎

系统提供了一个高性能、 warning-free 的 **Python 自动化编译同步引擎**。它由 `sync-renders.sh` 统一调度入口，并在后台通过 `sync_renders.py` 执行核心逻辑。它可以**一键提取 Markdown 中的基础 CSS 变量、品牌显示名称、以及原厂设计描述，同步注入到对应的 HTML 渲染页中**。

### 核心自动化特性

1. **原厂描述与标题注入**：自动解析 Markdown Frontmatter 中的 `name` 和 `description` 元数据，将其动态写入 HTML 预览页的 Hero 区域。
2. **免维护动态 Swatches**：自动将静态色块绑定到 `style="background: var(--dig-accent)"` 变量，并注入 Token 运行时读取 JS，确保数值 100% 同步。
3. **智能路径深度校正**：根据各二级分类子目录的层级深度，自动对齐 relative resource paths（如 `../../assets/`），杜绝 CSS 无法解析问题。

### 使用指南

1. **直接修改 Markdown (改词典)**  
   打开需要调整的 `.md` 文件（如 `references/catalogs/fintech/stripe.md`），直接修改代码块里以 `--dig-` 开头的 CSS 变量。

2. **在终端执行同步命令**  
   在项目根目录下运行脚本。支持编译指定模块，或一次性编译全部模块：

   ```bash
   # 仅编译/同步指定的模块 (推荐，效率最高。模块名带不带 .md 后缀均可)
   ./sync-renders.sh stripe
   ./sync-renders.sh claude.md

   # 不加参数，一键同步所有的 71 套品牌模块
   ./sync-renders.sh
   ```

3. **刷新浏览器预览**  
   脚本会在毫秒级内完成同步更新。刷新浏览器中的 HTML 文件，即可看到最新效果！

---

## 📐 Layout 结构资产（与 Catalog 平级）

除 catalog 视觉 token 外，系统提供 **layout recipe** 层，负责页面区域划分、slot、响应式与信息密度。另有 **global rules** 层（`references/global-rules.md`，英文主规范；`references/global-rules.zh-CN.md` 为中文翻译）规定 i18n、dark/light、控件形态、一致性、React 组件化 select 等跨 catalog 行为；默认参与 AI 生成与 layout render，可用 `--no-global` 或对话中声明「不使用 global」关闭。

| 资产链 | 源文件 | 预览 |
| ------ | ------ | ---- |
| Global Rules | `references/global-rules.md` canonical（+ `references/global-rules.zh-CN.md` 翻译 + 用户配置中心 `global-rules.local.md`） | layout HTML notes 区 Global Rules 卡片 |
| Catalog | `references/catalogs/**/*.md` | `renders/<category>/<slug>.html` |
| Layout | `references/layouts/<slug>.md` | `renders/layouts/<slug>.html` |
| Block | `references/blocks/**/*.md` | `renders/blocks/<id>.html` |
| Local Extensions | `references/local/` | Render Ops 中标记 source |

当前内置 20 个 layout，覆盖 marketing、docs、workspace、dashboard、settings、runtime 等常见 Dig 产品界面。索引入口：

- 源文件索引：`references/layouts/README.md`
- 预览索引：`renders/layouts/index.html`

### 同步命令

```bash
# 同步全部 layout 预览（20 recipes，含 global rules）
./sync-renders.sh --layouts

# 同步单个 layout
./sync-renders.sh layout dashboard-overview

# 审查对照：生成不含 global rules 的版本（覆盖同路径 HTML）
./sync-renders.sh layout dashboard-overview --no-global
./sync-renders.sh --layouts --no-global

# Playwright 结构校验（默认 render 含 global 规则检查）
npm run validate:layouts

# 同步 block 状态矩阵预览
./sync-renders.sh --blocks

# 同步全部 catalog / layout / block render
./sync-renders.sh --all
dig-ui-skill render all

# Render Ops 总校验
dig-ui-skill validate renders
npm run validate:renders

# 校验无 global 版本时，可指定单个 HTML
node validate-dig-layout-preview.mjs renders/layouts/dashboard-overview.html
```

### Layout Markdown 协议

每个 layout 文件都应包含这些部分：

1. **Frontmatter**：`name`、`name_zh`、`slug`、`page_type`、`default_catalog`、`status`、`recommended_catalogs`、`description_zh`、`description_en`。
1. **Slots**：用 YAML 定义结构区域。需要强校验的区域设为 `required: true`，并在 Preview HTML 中加入同名 `data-slot`。
1. **Applicable Scenarios**：写清楚适用页面，例如 dashboard 首页、单次 run 详情、设置表单。
1. **Avoid When**：写清楚不该使用的情况，并指向更合适的 layout。
1. **Recommended Catalogs**：列出推荐 catalog，例如 `dig, mono, wise`，并说明原因。
1. **Layout Rules**：只写结构规则，不写品牌色。例如“主内容占 8 栏，辅助区占 4 栏”“不允许卡片套卡片”。
1. **Responsive Rules**：写 desktop / tablet / mobile 的顺序、折叠、降密度策略。
1. **Preview HTML**：可渲染的结构样例，必须使用 `--dig-*` token 或 `assets/layout-preview.css` 中的 primitive class。
1. **Preview CSS**：只写结构 CSS，断点使用 `@container layout-viewport (max-width: …)`，不要用普通 `@media` 代替。
1. **QA Notes**：写人工验收问题，例如首屏是否能 5 秒读懂、移动端是否横向滚动、操作按钮是否贴近对象。

### 用新版流程生成页面

如果你已经写好了一个页面的基础 layout，以前常见做法是直接告诉 LLM “把这个页面改成 PayPal 风格”。新版建议把这件事拆成两步：先稳定结构，再应用视觉。

```text
页面需求 / 已有页面实现
→ 选择或对齐一个 layout recipe
→ 选择一个 catalog
→ 结合 primitive 规则生成页面
→ 用 layout QA / catalog 规则 / validator 复查
```

三层职责要保持清楚：

- **Global rules = 跨 catalog 行为**：i18n、dark/light、控件形态、一致性、React 组件化 select、交互纪律。`references/global-rules.md` 是英文主规范，`references/global-rules.zh-CN.md` 是中文翻译。
- **Layout recipe = 骨架**：决定 slot、grid、信息密度、响应式顺序。
- **Catalog = 皮肤 / 品牌气质**：决定颜色、字体、圆角、surface、按钮和组件视觉。
- **Block library = 模块协议**：决定可复用 primitive 和 product module 的 slots、states、responsive rules 与 anti-patterns。
- **Local extensions = 项目沉淀**：通过 `references/local/` 扩展项目自己的 layout / block。
- **Primitive = 底层纪律**：决定 shell、grid、间距、focus、触控高度、基础 class。

**规则优先级**：用户 prompt > `global-rules.local.md` > `references/local/` > 当前安装语言包 > `references/shared/` manifest。用户说「不使用 global」时跳过 global rules。

## 🧩 Block Library

Block Library 位于 `references/blocks/`，包含两类资产：

- `primitives/`：button、input、select、form-row、toast、modal、tooltip、tabs。
- `product/`：table-toolbar、runtime-log-stream、run-status-header、step-timeline、settings-row、empty-state、notification-item、search-result-row。

每个 block 必须包含 Use When、Avoid When、Slots、Token Binding、States、Responsive Rules、Accessibility、Anti-Patterns、QA Notes。修改 block 后运行：

```bash
./sync-renders.sh --blocks
npm run validate:renders
```

## 🧱 Local Layout / Block Extensions

项目级扩展位于 `references/local/`。不要直接复制官方 layout/block 后静默修改，优先使用 `extends`：

```yaml
slug: project-agent-run-detail
extends: agent-run-detail
owner: ops-platform
status: active
task_type: execution
```

真正替换官方行为时放入 `references/local/overrides/`，并写明 `replacement_target`、`owner`、`reason`、`reviewed_at`。

### 个人本地 Global Rules

如果你希望长期保留个人生成偏好，推荐通过 CLI 创建仓库外配置中心：

```bash
npx dig-ui-skill init-local
npx dig-ui-skill sync-local --all
```

个人规则的唯一真源是 `~/.config/dig-ui-skill/global-rules.local.md`；各工具目录里的 `references/global-rules.local.md` 只是同步副本或软链接，不进入仓库提交。适合写入这类个人默认规则：

- 所有界面必须支持 i18n，默认至少有中文 / 英文（`zh-CN` / `en`）。
- 所有界面必须支持 dark / light 主题切换，并通过 token 或主题变量实现。
- 所有按钮默认使用药丸形态，保持 `44px` 以上可点击高度。
- React 表单中的 select / option 默认使用项目内 React 组件（例如 `Select`、`SelectTrigger`、`SelectContent`、`SelectOption`），不要在产品 UI 中直接写裸 `<select>` / `<option>`；HTML layout 预览可继续用 `.dig-select` 表达结构和视觉。
- React 产品 UI 中的 alert / confirm / prompt 使用项目内 `Alert`、`Toast`、`Dialog`、`AlertDialog`、`ConfirmDialog` 等组件，不直接使用浏览器原生阻塞弹窗。

编辑配置中心后，先显式推送到各工具；如果需要检查 layout render，再重新同步 layout：

```bash
npx dig-ui-skill sync-local --all --from-config
./sync-renders.sh layout dashboard-overview
```

如果本次审查只想看 layout 原始结构，不希望加载 global rules：

```bash
./sync-renders.sh layout dashboard-overview --no-global
node validate-dig-layout-preview.mjs renders/layouts/dashboard-overview.html
```

local manifest 会按 rule id 与默认 `global-rules.md` 合并；例如你可以保持 `pill-buttons`、`consistency` 和 `react-select` 的 validator 开启，也可以在本地关闭某一项校验。个人规则可用中文或英文书写，但建议保留英文主规范中的 section heading 与 rule id，便于跨工具稳定合并。

### 让宿主 Agent 写入个人偏好

不需要为 `dig-ui-skill` 配置额外 AI API key。Codex / Cursor / Claude Code 本身已经具备自然语言理解能力；当用户要求更新个人 UI 偏好时，Agent 应读取：

```text
references/local-rules-builder.md
```

然后把偏好写入：

```text
~/.config/dig-ui-skill/global-rules.local.md
```

用户可以这样说：

```text
使用 dig-ui。把我的本地 global rules 更新一下：
Header 固定在顶部，高度紧凑，右侧放语言切换、主题切换和用户菜单。
```

Agent 可使用这些机械 helper：

```bash
npx dig-ui-skill local path
npx dig-ui-skill local show
npx dig-ui-skill local add --section "Header / Topbar" "Header stays sticky at the top with compact height."
npx dig-ui-skill local sync
```

推荐工作流：

1. **判断页面类型**  
   先判断你的页面更像哪个 recipe。例如控制台首页用 `dashboard-overview`，运行控制台用 `runtime-console`，单次任务详情用 `agent-run-detail`，设置表单用 `settings-form`，高密度表格用 `data-table-workspace`，营销首屏用 `marketing-hero`。

1. **让 LLM 先对齐 layout recipe**  
   要求 LLM 保留业务内容，但按 layout 的 slots、layout rules、responsive rules 和 QA Notes 调整结构。这个阶段重点是修正信息架构、移动端顺序、卡片嵌套、横向滚动和操作按钮位置。

1. **再指定 catalog**  
   结构稳定后，再要求 LLM 应用某个 catalog，例如 `references/catalogs/fintech/paypal.md`。这个阶段重点是使用 catalog 的 `--dig-*` token、组件映射和视觉规则，不要让 catalog 改变页面信息架构。

1. **生成后复查**  
   对照 layout recipe 看结构是否成立；对照 catalog 看视觉是否符合目标风格；对照 primitive 看 grid、间距、focus、触控高度和移动端是否守规矩。

可以直接复制下面的 prompt：

```text
我已经有一个页面基础实现。请按新版 Dig UI 流程重构：

1. 先将页面结构对齐到 `references/layouts/dashboard-overview.md`：
   - 保留业务内容
   - 按 layout 的 slots、layout rules、responsive rules 调整结构
   - 避免卡片套卡片
   - 移动端不要出现横向滚动
   - 操作按钮要靠近被操作对象

2. 再应用 `references/catalogs/fintech/paypal.md` 的 catalog：
   - 使用 catalog 中的 `--dig-*` token
   - 遵循组件映射、按钮、surface、typography 规则
   - 不要写死品牌 hex
   - 不要让 catalog 改变 layout 的信息架构

3. 最终输出可用页面代码，并说明：
   - 使用了哪个 layout recipe
   - 使用了哪个 catalog
   - 哪些地方为了响应式做了结构调整
```

简单记法：不要只说“帮我套 PayPal 风格”，而是说“用 `dashboard-overview` 这个结构，套 `paypal` 这个视觉”。这样 LLM 不容易为了追求品牌气质，把 dashboard 改成 marketing page，也不容易破坏信息密度和移动端可用性。

### 修改现有 layout 的 SOP

适用于调整 slot、结构比例、响应式顺序、预览 HTML/CSS、适用场景或 QA 说明。

1. **确认要改哪个 layout**  
   先打开 `renders/layouts/index.html` 或 `references/layouts/README.md`，根据页面类型选择最接近的 recipe。例如：

   - 控制台首页：`dashboard-overview`
   - Agent 运行控制台：`runtime-console`
   - 单次 run 详情：`agent-run-detail`
   - 高密度表格工作台：`data-table-workspace`

1. **编辑源文件**  
   打开 `references/layouts/<slug>.md`。优先改 Markdown 协议字段，不要直接改 `renders/layouts/<slug>.html`，因为 render 文件会被同步脚本覆盖。

1. **保持 slot 与 Preview HTML 对齐**  
   如果在 `Slots` 中把某个区域设为 `required: true`，必须在 `Preview HTML` 中提供对应节点：

   ```html
   <section data-slot="primary_panel">...</section>
   ```

   如果删除或重命名 slot，要同步更新 `Slots`、`Preview HTML`、`Layout Rules` 和 `QA Notes`。

1. **只在 Preview CSS 写结构，不写品牌视觉**  
   可以写 grid、gap、column span、order、stacking、overflow 策略。不要写死品牌 hex、专属渐变或一次性装饰。需要颜色、字体、圆角、阴影时使用 `var(--dig-*)` token 或已有 primitive class。

1. **使用 container query 做响应式**  
   Layout preview 在同一页面里同时展示 1440 / 900 / 390 三个容器，所以断点必须这样写：

   ```css
   @container layout-viewport (max-width: 840px) {
     .layout-example {
       grid-template-columns: 1fr;
     }
   }
   ```

1. **同步单个 layout**  

   ```bash
   ./sync-renders.sh layout <slug>
   ```

   这会重新生成 `renders/layouts/<slug>.html`，并刷新 `renders/layouts/index.html`。

1. **浏览器人工复查**  
   打开 `renders/layouts/<slug>.html`，逐项检查：

   - Desktop 1440px：首屏主焦点是否清楚，grid 比例是否合理。
   - Tablet 900px：主次内容是否按规则堆叠，操作是否仍靠近对象。
   - Mobile 390px：是否无横向滚动，按钮是否可点，表格/列表是否降密度。
   - Catalog 切换：在 `dig`、`mono`、`editorial`、`wise`、`apple` 中切换，确认结构不依赖单一视觉风格。

1. **运行结构校验**  

   ```bash
   npm run validate:layouts
   ```

   校验会检查横向滚动、文本溢出、required slot 缺失、卡片套卡片、移动端 tap target、字号下限等问题。出现 WARN 时优先修；出现 FAIL 时不要合入或交付。

### 新增 layout 的 SOP

适用于新增一个页面类型或已有 20 个 recipe 无法覆盖的新结构。

1. **先判断是否真的需要新增**  
   如果只是 dashboard 的轻微变体，优先扩展 `dashboard-overview` 的 rules 或新增 QA Notes；只有信息架构明显不同，才新增 layout。

1. **从模板复制**  

   ```bash
   cp references/layouts/_template.md references/layouts/<new-slug>.md
   ```

1. **填写 frontmatter**  
   `slug` 必须与文件名一致。`page_type` 建议使用已有枚举：`marketing`、`docs`、`dashboard`、`runtime`、`settings`、`workspace`。`status` 新增时先用 `draft`。

1. **定义 slots**  
   把页面骨架拆成稳定区域，例如 `topbar`、`sidebar`、`primary_panel`、`secondary_panel`、`activity_feed`。核心区域设为 `required: true`；辅助区域可以设为 `false`。

1. **写适用与禁用场景**  
   `Applicable Scenarios` 说明什么时候选它；`Avoid When` 说明什么时候不要选它，并指向替代 layout。这能帮助 AI 后续少选错结构。

1. **写 Layout / Responsive Rules**  
   明确 desktop 的 grid 占比、tablet 的堆叠顺序、mobile 的降密度策略。规则应能指导真实页面实现，而不只是描述预览长什么样。

1. **编写 Preview HTML**  
   Preview HTML 要足够像真实产品界面，但不要依赖外部图片。每个 required slot 必须有对应 `data-slot`。优先复用这些 primitive class：

   - `dig-topbar`
   - `dig-control-row`
   - `dig-surface`
   - `dig-button-primary`
   - `dig-button-secondary`
   - `dig-tag`
   - `dig-table-row`
   - `dig-log-line`
   - `dig-body`
   - `dig-meta`

1. **编写 Preview CSS**  
   只写该 layout 必要的结构 CSS。优先使用 `display: grid`、`grid-template-columns`、`grid-column`、`gap: var(--dig-space-*)`、`@container layout-viewport`。不要写一次性品牌装饰。

1. **同步并打开预览**  

   ```bash
   ./sync-renders.sh layout <new-slug>
   ```

   然后打开 `renders/layouts/<new-slug>.html` 和 `renders/layouts/index.html`。

1. **至少做两轮复查**  
   第一轮只看结构：slot 是否完整、主次是否清楚、移动端是否可用。第二轮切换 catalog：至少检查 `dig` 与 `mono`，如果是营销页再看 `editorial` 或 `apple`，如果是轻量消费级界面再看 `wise`。

1. **运行校验**  

   ```bash
   npm run validate:layouts
   ```

   新增 layout 必须做到 `0 FAIL`。如果有 WARN，除非有明确理由，否则也应修到 `0 WARN`。

1. **更新说明文档**  
   如果这是正式新增到布局库的 recipe，同步更新 `references/layouts/README.md` 的 layout 库表格。必要时也在 `updates/` 新增一条更新记录。

### Layout 运维注意事项

- **不要直接维护 render 文件**：`renders/layouts/*.html` 是编译产物，源头永远是 `references/layouts/*.md`。
- **不要让 layout 绑定单一 catalog**：Layout 可以推荐 catalog，但不应写死品牌色、字体或专属视觉装饰。
- **不要卡片套卡片**：如果 `.dig-surface` 里再嵌 `.dig-surface`，validator 会报 WARN，通常应该拍平结构。
- **required slot 要真实存在**：slot 名称大小写和下划线要与 `data-slot` 完全一致。
- **移动端优先保证可操作**：不要把表格强行缩小到不可读；必要时改成 stacked rows、摘要卡片或分组列表。
- **改结构后要重新同步和校验**：`./sync-renders.sh layout <slug>` 负责生成预览，`npm run validate:layouts` 负责结构检查。

Hub 入口：[renders/layouts/index.html](renders/layouts/index.html)

---

## 🎨 史诗级毛玻璃 Hub 手册导航中心 (`renders/index.html`)

为了方便设计师和开发者极其直观地在 71 套品牌设计系统中探索，我们开发了**设计系统 Hub 首页**：

- **专属强调色 Glow Hover 动效**：每个品牌卡片在 hover 时，会自动读取并在背景散发该品牌专属强调色（如 Stripe 的紫色、Claude 的暖色、Ferrari 的红色）的柔和光影。
- **实时模糊搜索 (Search)**：支持在顶部输入框输入任意品牌名称或关键词进行毫秒级过滤。
- **智能分类导航标签 (Tabs)**：以毛玻璃卡片和极高保真的排版设计，将 71 个模版有序归类为 AI 平台、开发工具、DevOps、金融科技等 9 大分类。

---

## 🆕 如何分类或新增一个设计系统模板

为了更好地组织和隔离模板，系统现已全面启用 **场景语义分类目录**：

- `ai-llm` (AI & LLM 平台，如 `claude`, `together.ai`)
- `dev-tools` (开发者工具 & IDE，如 `cursor`, `vercel`)
- `devops` (后端、数据库与运维，如 `supabase`, `mongodb`)
- `saas` (效率与 SaaS 软件，如 `linear.app`, `notion`)
- `creative-tools` (设计与创意工具，如 `figma`, `framer`)
- `fintech` (金融科技与加密货币，如 `stripe`, `wise`)
- `ecommerce` (电商与零售，如 `shopify`, `airbnb`)
- `media-consumer` (媒体与消费科技，如 `apple`, `spacex`)
- `automotive` (汽车与工业，如 `ferrari`, `tesla`)
- `other` (其它通用基础分类，如 `dig`, `mono`, `editorial`)

当你想要衍生或新增一套全新风格时，只需三步：

1. **新建 Markdown 字典**
   在对应的分类目录下新建你的 MD 文件，例如：`references/catalogs/saas/slack.md`，并在里面写好 YAML Frontmatter、Description 以及 CSS Tokens 变量块。
1. **执行编译指令**
   在终端运行：

   ```bash
   ./sync-renders.sh slack
   ```

   **脚本会自动发现缺失的 HTML 文件，并自动在对应的子目录下克隆生成一个 `slack.html` 预览页**（例如 `renders/saas/slack.html`），随后无缝注入你刚写的 CSS 变量、Eyebrow、H1 标题和 original description！
1. **完成！前往微调**
   打开新生成的 `renders/saas/slack.html`，刷新浏览器，即可在 1 秒内拥有一个跑通的全新主题预览页，现在你可以继续在上面自由修改 DOM 结构和样式了。

### 💡 改变类目说明

本系统完全支持动态分类移动。如果你想将一个已有的模版移动到另一个类目：

1. 直接将 `references/catalogs/` 下的 `.md` 字典移动到新的子目录下。
1. 同时将 `renders/` 下的对应 `.html` 预览移动到同名的新子目录下。
1. 运行 `./sync-renders.sh` 刷新编译链接，随后 Python 引擎会自动重写路径并对齐 relative paths！
