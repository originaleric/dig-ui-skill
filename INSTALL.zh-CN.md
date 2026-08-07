# Dig UI Skill 安装指南

[English](./INSTALL.md) · [中文首页](./README.zh-CN.md) · [中文使用指南](./USAGE.zh-CN.md)

`dig-ui-skill` 提供统一 CLI，将同一套设计系统 skill 安装到 Codex、Cursor、Claude Code 等工具的个人 skill 目录。

<a name="installation"></a>

## 快速开始

```bash
# 从 npm（发布后）或 GitHub 仓库根目录
npx dig-ui-skill install cursor
npx dig-ui-skill install codex
npx dig-ui-skill install claude-code
npx dig-ui-skill install codex --lang zh-CN
npx dig-ui-skill install codex --lang en
npx dig-ui-skill update cursor
npx dig-ui-skill export workbuddy
npx dig-ui-skill status
```

本地开发时从当前仓库安装：

```bash
node bin/dig-ui-skill.mjs install cursor --source .
npx dig-ui-skill install --all --source .
```

## 安装路径

| 工具 | 路径 |
|------|------|
| Codex | `~/.codex/skills/dig-ui` |
| Cursor | `~/.cursor/skills/dig-ui` |
| Claude Code | `~/.claude/skills/dig-ui` |

> Cursor 内置目录 `~/.cursor/skills-cursor` 由 Cursor 托管，CLI **不会**写入该目录。

## Codex

```bash
npx dig-ui-skill install codex
```

验证：在任意仓库新开 Codex 会话，询问「按 Dig UI dig catalog 审查这个页面的 CSS token」，应能读取 `~/.codex/skills/dig-ui/SKILL.md`。

## Claude Code

```bash
npx dig-ui-skill install claude-code
# 别名
npx dig-ui-skill install claude
```

验证：运行 `claude`，用 `/dig-ui` 或自然语言触发 Dig UI 相关任务。

## WorkBuddy

WorkBuddy 通过「技能」界面导入本地 Skill 包，因此 CLI 只生成自包含的上传 ZIP，不会写入 WorkBuddy 的内部目录：

```bash
npx dig-ui-skill export workbuddy
npx dig-ui-skill export workbuddy --output ~/Downloads/dig-ui-workbuddy.zip
npx dig-ui-skill export workbuddy --lang en
```

导出包会包含所选语言，以及当前存在的用户 local rules、palette 与 style。`--output` 可省略，默认输出为 `~/.config/dig-ui-skill/dig-ui-workbuddy.zip`；每次导出都会直接覆盖目标 ZIP。在 WorkBuddy 中选择「技能 → 添加技能 → 上传技能」，然后选择该文件。

## Cursor

### 个人 skill（推荐）

```bash
npx dig-ui-skill install cursor
```

安装到 `~/.cursor/skills/dig-ui`。Cursor 会在相关任务中自动发现该 skill。

### 项目级硬触发（可选）

若希望在特定仓库中更稳定地触发 Dig UI，可额外安装项目 rule：

```bash
npx dig-ui-skill install cursor --project .
# 或指定路径
npx dig-ui-skill install cursor --project /path/to/your/repo
```

会在目标项目创建 `.cursor/rules/dig-ui.mdc`，指向已安装的个人 skill 目录。

## 更新策略

`update` 会覆盖标准资产：

- `SKILL.md`
- 从 domain-first 语言源文件展开后的 `references/layouts/`、`references/catalogs/`、`references/blocks/`
- `dig-ui-language.json`
- `references/`（**除** `global-rules.local.md`）
- `references/local/palettes/` 与 `references/local/styles/` 会从用户配置中心重新同步，不从仓库覆盖用户资产
- `assets/`
- `renders/`
- `bin/`
- `sync-renders.sh`、`sync_renders.py` 与 `validate-dig-catalog-preview.mjs` / `validate-dig-render-ops.mjs`
- `README.md` / `README.zh-CN.md` / `USAGE.md` / `USAGE.zh-CN.md` / `INSTALL.md` / `INSTALL.zh-CN.md`

**永远不会覆盖** `references/global-rules.local.md`。若本地尚无 personal rules，CLI 会提示可从 `references/global-rules.local.example.md` 手动复制，但不会自动创建。

用户自定义 palette / style 属于仓库外资产，唯一真源在：

```bash
~/.config/dig-ui-skill/palettes/
~/.config/dig-ui-skill/styles/
```

`update` 后如果这些目录存在，CLI 会重新同步到已安装 skill 的 `references/local/palettes/` 与 `references/local/styles/`。内置仓库不会写入或覆盖这些用户自定义资产。

```bash
npx dig-ui-skill update cursor
npx dig-ui-skill update --all
```

## CLI 选项

| 选项 | 说明 |
|------|------|
| `--all` | 一次安装/更新/同步三端 |
| `--link` | skill 安装使用 symlink（适合本机开发调试） |
| `--link-local` | local 规则同步使用 symlink |
| `--with-local` | `update` 后同步用户 local 规则 |
| `--from-config` | 冲突时用配置中心覆盖目标 |
| `--from <target\|file>` | 指定 local 规则导入来源 |
| `--output <file>` | 指定 local 规则或 WorkBuddy 包导出位置 |
| `--force` | 覆盖冲突的 local 规则或已有 local 规则导出；WorkBuddy 导出始终直接覆盖 ZIP。 |
| `--backup` | local 规则覆盖前生成 `.backup` |
| `--skip-conflicts` | 跳过冲突目标 |
| `--source <path>` | 从本地仓库路径安装 |
| `--project <path>` | Cursor：额外安装项目 `.cursor/rules/dig-ui.mdc` |
| `--lang <en\|zh-CN>` | 安装指定语言；未指定时默认 `zh-CN`，更新时优先沿用已安装语言 |
Palette helper：

```bash
# 查看用户 palette 配置目录
npx dig-ui-skill palette path

# 导入 Palette Lab 导出的 JSON 或 ZIP，并同步到某个工具
npx dig-ui-skill palette import ~/Downloads/palette01.custompalette-20260710-120000.zip codex

# 查看、打印、同步用户 palette
npx dig-ui-skill palette list
npx dig-ui-skill palette show palette01.custompalette-20260710-120000
npx dig-ui-skill palette sync --all
```

Style helper：

```bash
# 查看用户 style 配置目录
npx dig-ui-skill style path

# 导入 Style Lab 导出的 JSON、Markdown 或 ZIP，并同步到某个工具
npx dig-ui-skill style import ~/Downloads/quant-signal-console.customstyle-20260712-120000.zip codex

# 查看、打印、同步用户 style
npx dig-ui-skill style list
npx dig-ui-skill style show quant-signal-console
npx dig-ui-skill style sync --all
```

`style_v1` Markdown 必须同时包含 `## Dig UI CSS Tokens` 与 `## Dig UI Dark Tokens`。Style Lab 导出的 ZIP 会包含两套 token CSS 与 `theme_tokens.light` / `theme_tokens.dark`；旧版 JSON 资产仍可导入，但不具备双主题事实源资格。

示例：

```bash
# 开发模式：symlink 到当前仓库
npx dig-ui-skill install cursor --link --source .

# 查看各端安装状态、版本、local rules 是否存在
npx dig-ui-skill status
```

## Render Ops

```bash
npx dig-ui-skill render catalogs
npx dig-ui-skill render all
npx dig-ui-skill validate renders
```

`render` 用于生成 catalog 运维预览；`validate renders` 会检查 render ops 资产、双语 parity、layout/block Markdown 协议完整性、catalog preview switching，以及 style 的 light/dark token、主题控件和导出契约。

Layout 和 Block 不再生成 HTML render 页面；它们是 Markdown 协议资产。Markdown、shared manifest 和 catalog token 仍是 source of truth。

## 个人 Global Rules

团队默认规则在 `references/global-rules.md`，该文件是英文主规范；中文翻译在 `references/global-rules.zh-CN.md`。个人偏好请放在 **用户配置中心**（仓库外，不会被 git 跟踪）：

```bash
~/.config/dig-ui-skill/global-rules.local.md
```

这是个人规则的唯一真源。各工具 skill 目录里的 `references/global-rules.local.md` 只是同步副本（或通过 `--link-local` 软链接指向配置中心）。

仓库中已跟踪的 [`references/global-rules.local.example.md`](./references/global-rules.local.example.md) 是可阅读的起始模板。`local init` 会将其复制到用户配置中心；请编辑该副本，不要修改仓库示例。

### 初始化与同步

```bash
# 从示例初始化用户配置（已存在则不会覆盖）
npx dig-ui-skill local init

# 同步到 Cursor / Codex / Claude Code（目标尚无 local 文件时）
npx dig-ui-skill local sync --all

# 编辑配置中心后，显式推送覆盖各端副本
npx dig-ui-skill local sync --all --from-config

# 只同步某一端
npx dig-ui-skill local sync cursor --from-config

# 更新标准资产后一并同步 local 规则（内容不一致时需加 --from-config）
npx dig-ui-skill update --all --with-local --from-config
```

### Local Rules Helper

宿主 Agent 可以读取 `references/local-rules-builder.md`，再调用以下机械 helper 写入个人偏好：

```bash
# 查看用户配置中心路径
npx dig-ui-skill local path

# 查看当前个人规则
npx dig-ui-skill local show

# 按 canonical section 添加一条偏好，并默认同步到各端
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."

# 只同步个人规则
npx dig-ui-skill local sync --all --from-config
```

### 冲突处理

当配置中心与某工具目录的 local 文件内容不一致时，默认 **不覆盖** 并提示冲突。可显式选择：

| 选项 | 说明 |
|------|------|
| `--from-config` | 用配置中心覆盖目标工具 |
| `--backup` | 覆盖前生成 `.backup` 文件 |
| `--skip-conflicts` | 跳过冲突目标，继续处理其他工具 |

```bash
# 从 Cursor 导入已有 local 规则到配置中心
npx dig-ui-skill local import --from cursor --force --backup

# 从已有标准 local.md 导入配置中心
npx dig-ui-skill local import --from ./global-rules.local.md

# 导出配置中心规则为可移植 Markdown 文件
npx dig-ui-skill local export --output ./global-rules.local.md

# 强制用配置中心覆盖，并备份目标文件
npx dig-ui-skill local sync --all --from-config --backup
```

### 高级：软链接模式

本机开发调试时，可让各工具直接指向配置中心文件：

```bash
npx dig-ui-skill local sync --all --link-local
npx dig-ui-skill update --all --with-local --link-local
```

### 手动方式（无 CLI）

若无法使用 CLI，仍可在各工具 skill 目录手动复制：

```bash
cp references/global-rules.local.example.md references/global-rules.local.md
```

编辑后，AI 会优先应用 local 规则；`dig-ui-skill validate renders` 会检查 local/global 规则相关的资产一致性。

## 手动安装（无 CLI）

若无法使用 npx，可手动复制或软链接仓库到对应目录，例如：

```bash
mkdir -p ~/.cursor/skills
cp -R /path/to/dig-ui-skill ~/.cursor/skills/dig-ui
# 或
ln -sfn /path/to/dig-ui-skill ~/.cursor/skills/dig-ui
```

项目 rule 模板见 `adapters/cursor/dig-ui.mdc`。
