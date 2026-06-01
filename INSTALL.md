# Dig UI Skill 安装指南

`dig-ui-skill` 提供统一 CLI，将同一套设计系统 skill 安装到 Codex、Cursor、Claude Code 等工具的个人 skill 目录。

## 快速开始

```bash
# 从 npm（发布后）或 GitHub 仓库根目录
npx dig-ui-skill install cursor
npx dig-ui-skill install codex
npx dig-ui-skill install claude-code
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
- `references/`（**除** `global-rules.local.md`）
- `assets/`
- `renders/`
- `sync_*` 脚本与 `validate-dig-layout-preview.mjs`
- `README.md` / `USAGE.md`

**永远不会覆盖** `references/global-rules.local.md`。若本地尚无 personal rules，CLI 会提示可从 `references/global-rules.local.example.md` 手动复制，但不会自动创建。

```bash
npx dig-ui-skill update cursor
npx dig-ui-skill update --all
```

## CLI 选项

| 选项 | 说明 |
|------|------|
| `--all` | 一次安装/更新三端 |
| `--link` | 使用 symlink（适合本机开发调试） |
| `--source <path>` | 从本地仓库路径安装 |
| `--project <path>` | Cursor：额外安装项目 `.cursor/rules/dig-ui.mdc` |

示例：

```bash
# 开发模式：symlink 到当前仓库
npx dig-ui-skill install cursor --link --source .

# 查看各端安装状态、版本、local rules 是否存在
npx dig-ui-skill status
```

## 个人 Global Rules

团队默认规则在 `references/global-rules.md`。个人偏好请放在 **不被更新覆盖** 的本地文件：

```bash
cp references/global-rules.local.example.md references/global-rules.local.md
```

编辑 `global-rules.local.md` 后，AI 会优先应用 local 规则；layout render 同步脚本也会合并 local manifest。

## 手动安装（无 CLI）

若无法使用 npx，可手动复制或软链接仓库到对应目录，例如：

```bash
mkdir -p ~/.cursor/skills
cp -R /path/to/dig-ui-skill ~/.cursor/skills/dig-ui
# 或
ln -sfn /path/to/dig-ui-skill ~/.cursor/skills/dig-ui
```

项目 rule 模板见 `adapters/cursor/dig-ui.mdc`。
