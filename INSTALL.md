# Dig UI Skill 安装指南

`dig-ui-skill` 提供统一 CLI，将同一套设计系统 skill 安装到 Codex、Cursor、Claude Code 等工具的个人 skill 目录。

## 快速开始

```bash
# 从 npm（发布后）或 GitHub 仓库根目录
npx dig-ui-skill install cursor
npx dig-ui-skill install codex
npx dig-ui-skill install claude-code
npx dig-ui-skill install codex --lang zh-CN
npx dig-ui-skill install codex --lang en
npx dig-ui-skill update cursor
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
- `assets/`
- `renders/`
- `bin/`
- `sync-renders.sh`、`sync_renders.py` 与 `validate-dig-catalog-preview.mjs` / `validate-dig-render-ops.mjs`
- `README.md` / `README.zh-CN.md` / `USAGE.md` / `INSTALL.md`

**永远不会覆盖** `references/global-rules.local.md`。若本地尚无 personal rules，CLI 会提示可从 `references/global-rules.local.example.md` 手动复制，但不会自动创建。

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
| `--from-target` | 冲突时把目标导入配置中心 |
| `--backup` | 覆盖前生成 `.backup` |
| `--skip-conflicts` | 跳过冲突目标 |
| `--source <path>` | 从本地仓库路径安装 |
| `--project <path>` | Cursor：额外安装项目 `.cursor/rules/dig-ui.mdc` |
| `--lang <en\|zh-CN>` | 安装指定语言；未指定时默认 `zh-CN`，更新时优先沿用已安装语言 |

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

`render` 用于生成 catalog 运维预览；`validate renders` 会检查 render ops 资产、双语 parity、layout/block Markdown 协议完整性和 catalog preview switching。

Layout 和 Block 不再生成 HTML render 页面；它们是 Markdown 协议资产。Markdown、shared manifest 和 catalog token 仍是 source of truth。

## 个人 Global Rules

团队默认规则在 `references/global-rules.md`，该文件是英文主规范；中文翻译在 `references/global-rules.zh-CN.md`。个人偏好请放在 **用户配置中心**（仓库外，不会被 git 跟踪）：

```bash
~/.config/dig-ui-skill/global-rules.local.md
```

这是个人规则的唯一真源。各工具 skill 目录里的 `references/global-rules.local.md` 只是同步副本（或通过 `--link-local` 软链接指向配置中心）。

### 初始化与同步

```bash
# 从示例初始化用户配置（已存在则不会覆盖）
npx dig-ui-skill init-local

# 同步到 Cursor / Codex / Claude Code（目标尚无 local 文件时）
npx dig-ui-skill sync-local --all

# 编辑配置中心后，显式推送覆盖各端副本
npx dig-ui-skill sync-local --all --from-config

# 只同步某一端
npx dig-ui-skill sync-local cursor --from-config

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
npx dig-ui-skill local sync
```

### 冲突处理

当配置中心与某工具目录的 local 文件内容不一致时，默认 **不覆盖** 并提示冲突。可显式选择：

| 选项 | 说明 |
|------|------|
| `--from-config` | 用配置中心覆盖目标工具 |
| `--from-target` | 把目标工具的 local 文件导入为配置中心主版本 |
| `--backup` | 覆盖前生成 `.backup` 文件 |
| `--skip-conflicts` | 跳过冲突目标，继续处理其他工具 |

```bash
# 从 Cursor 导入已有 local 规则到配置中心
npx dig-ui-skill import-local cursor

# 强制用配置中心覆盖，并备份目标文件
npx dig-ui-skill sync-local --all --from-config --backup
```

### 高级：软链接模式

本机开发调试时，可让各工具直接指向配置中心文件：

```bash
npx dig-ui-skill sync-local --all --link-local
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
