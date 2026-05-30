# dig-ui-skill 开源与三端全局安装方案

## Summary

将 `dig-ui-skill` 开源为一个“Agent Skills 标准 + 多工具适配层”的仓库：核心资料只维护一份，Codex 和 Claude Code 直接读取 `SKILL.md`，Cursor 通过 `.cursor/rules/*.mdc` 或 `AGENTS.md` 引用同一套 Dig UI 规范。

发布形态同时支持 GitHub clone 和后续 NPM CLI 安装：

- v1：GitHub clone + symlink，最稳定，适合快速开源。
- v1.1：提供 NPM CLI，降低安装门槛。

参考当前官方机制：

- Claude Code 支持个人 skills 放在 `~/.claude/skills/<skill-name>/SKILL.md`。
- Cursor 推荐使用 `.cursor/rules/*.mdc`，`.cursorrules` 已是 legacy。
- Codex 当前使用 `~/.codex/skills/<skill-name>/SKILL.md` 作为全局 skill 目录。

## Key Changes

- 保留仓库根部 `SKILL.md` 作为核心入口，增强 frontmatter：
  - `name: dig-ui`
  - `description` 覆盖 Dig UI、Dig 设计系统、CSS token、catalog、dashboard、runtime、marketing、docs、frontend UI review 等自然触发词。
  - 不加入有副作用的 `allowed-tools`，让开源用户安装更放心。
- 新增适配层：
  - `adapters/cursor/dig-ui.mdc`：Cursor Project Rule，类型为 Agent Requested，内容只做简短导航并引用核心规范。
  - `adapters/agents/AGENTS.md`：通用 agent 指令入口，给 Cursor、Claude、Codex 等都能读。
  - `adapters/claude/CLAUDE.md`：Claude Code 项目级 fallback，内容导入或指向 `SKILL.md`。
- 新增安装文档：
  - `INSTALL.md`：Codex、Claude Code、Cursor 三端安装步骤。
  - `PUBLISHING.md`：GitHub release、NPM 包、版本号、发布检查清单。
- 新增可选 CLI：
  - `bin/dig-ui-skill`
  - 支持 `dig-ui-skill install codex|claude|cursor --target <repo>`。
  - NPM 包后续可通过 `npx dig-ui-skill install codex` 使用。

## Global Install Steps

### GitHub clone 方式，推荐作为 v1

```bash
git clone https://github.com/<org>/dig-ui-skill.git ~/.local/share/dig-ui-skill
```

### Codex 全局安装

```bash
mkdir -p ~/.codex/skills
ln -sfn ~/.local/share/dig-ui-skill ~/.codex/skills/dig-ui
```

验证方式：

```text
在任意目标仓库开启 Codex 新会话，询问：
“按 Dig UI runtime catalog 优化这个 dashboard。”
```

预期结果：

- Codex 能发现 `dig-ui`。
- Codex 会读取 `~/.codex/skills/dig-ui/SKILL.md`。
- Codex 在需要时继续读取 `references/catalogs/`、`references/tokens.md`、`references/primitives.md`、`references/checklist.md`。

### Claude Code 全局安装

```bash
mkdir -p ~/.claude/skills
ln -sfn ~/.local/share/dig-ui-skill ~/.claude/skills/dig-ui
```

验证方式：

```bash
claude
```

然后在 Claude Code 中测试：

```text
/dig-ui
```

或直接询问：

```text
请用 Dig UI 的 runtime catalog 审查这个页面的 CSS token。
```

预期结果：

- Claude Code 能在 skills 列表中看到 `dig-ui`。
- 可以通过 `/dig-ui` 直接调用。
- 也能在 Dig UI 相关任务中自动触发。

### Cursor 项目安装

Cursor 当前更适合通过 Project Rules 使用共享规范。推荐将共享 rule 软链接到每个目标项目：

```bash
mkdir -p .cursor/rules
ln -sfn ~/.local/share/dig-ui-skill/adapters/cursor/dig-ui.mdc .cursor/rules/dig-ui.mdc
```

Cursor 全局补充建议：在 Cursor Settings > Rules > User Rules 中加入一段极短规则：

```text
When the user asks for Dig UI, Dig design system, Dig tokens, or Dig visual style, prefer the dig-ui project rule if present and ask to install it if missing.
```

预期结果：

- 目标项目中出现 `.cursor/rules/dig-ui.mdc`。
- Cursor Agent sidebar 能看到 Dig UI rule。
- 当用户提到 Dig UI、Dig 风格、Dig token 或 Dig 设计系统时，Cursor 会优先使用该规则。

### NPM 方式，作为 v1.1

```bash
npm install -g dig-ui-skill
dig-ui-skill install codex
dig-ui-skill install claude
dig-ui-skill install cursor --target .
```

CLI 行为：

- `install codex`：创建或更新 `~/.codex/skills/dig-ui`。
- `install claude`：创建或更新 `~/.claude/skills/dig-ui`。
- `install cursor --target .`：创建或更新目标项目的 `.cursor/rules/dig-ui.mdc`。
- 默认使用 symlink；如果用户传入 `--copy`，则复制文件，适合不希望依赖本地共享目录的场景。

## Implementation Details

### 共享核心

Codex 和 Claude Code 都直接使用同一份 `SKILL.md`，软链接安装到各自个人 skills 目录，保证仓库更新后全局立即生效。

Cursor 没有同等的文件型全局 skill 目录，因此采用“全局仓库 + 每个项目软链接 `.cursor/rules/dig-ui.mdc`”作为可靠路径。

### Cursor Rule 示例

`adapters/cursor/dig-ui.mdc` 建议结构：

```md
---
description: Use Dig UI design system, catalogs, CSS tokens, typography, spacing, surfaces, dashboard/runtime/marketing/docs visual language.
globs:
alwaysApply: false
---

Use the Dig UI skill from `~/.local/share/dig-ui-skill`.

Start from `SKILL.md`, then load only the needed catalog/token/checklist references.

When implementing or reviewing UI:
- Choose one catalog before writing styles.
- Prefer `runtime` when there is no explicit reason to use another catalog.
- Use `references/tokens.md`, `references/primitives.md`, and `references/checklist.md` as needed.
- Avoid generic purple SaaS gradients and noisy neon palettes.
```

### README 首页结构

开源仓库 README 首页放三个入口：

- Install for Codex
- Install for Claude Code
- Install for Cursor

README 不应只介绍设计理念，也要让用户在 60 秒内完成安装和验证。

### 开源清理

发布前移除或忽略不该进入开源包的内容：

- `node_modules/`
- `.DS_Store`
- `.specstory/`
- 个人本机绝对路径
- 临时渲染缓存或非必要大文件

建议补齐 `.gitignore`，确保后续不会误提交本地环境文件。

## Test Plan

- Codex：
  - 新开任意仓库会话。
  - 询问“按 Dig UI runtime catalog 优化这个 dashboard”。
  - 确认可发现并读取 `dig-ui`。
- Claude Code：
  - 运行 `claude`。
  - 用 `/skills` 或直接 `/dig-ui` 验证 skill 可见。
  - 再问 Dig UI token 任务，确认能自动触发。
- Cursor：
  - 在目标项目安装 `.cursor/rules/dig-ui.mdc`。
  - 打开 Agent sidebar 确认规则可用。
  - 请求 Dig 风格 UI 实现，确认规则被引用。
- 开源包验证：
  - 从干净目录 clone。
  - 按 `INSTALL.md` 三端安装。
  - 确认软链接路径、相对引用、catalog 文档读取都正常。

## Assumptions

- GitHub 仓库地址暂用 `https://github.com/<org>/dig-ui-skill.git`，发布时替换为真实地址。
- v1 先用 Git clone + symlink，稳定后再发布 NPM CLI。
- Cursor 的“全局”按官方能力采用 User Rules + 项目规则软链接组合；不伪装成真正的全局文件型 skill。
- `dig-ui-skill` 的核心资料仍由 `SKILL.md`、`references/`、`assets/`、`renders/` 组成，适配层只负责让不同 agent 更容易发现和调用它。
