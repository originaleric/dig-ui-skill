# dig-ui-skill 多工具安装与更新 CLI 方案

## Summary

为 `dig-ui-skill` 增加一个统一命令行入口，让用户可以像使用开源工具一样安装和更新，并按目标编程工具分发到 Codex、Cursor、Claude Code 等目录。默认安装团队规则，保留用户自己的 `global-rules.local.md`，避免更新时覆盖个人偏好。

## Key Changes

- 新增 CLI：`dig-ui-skill`
  - 推荐命令：
    ```bash
    npx dig-ui-skill install cursor
    npx dig-ui-skill install codex
    npx dig-ui-skill install claude-code
    npx dig-ui-skill update cursor
    npx dig-ui-skill status
    ```
  - `install` 首次安装；`update` 拉取/复制最新 skill 内容；`status` 显示当前安装路径、版本、local rules 是否存在。
- 工具分发路径：
  - Codex：`~/.codex/skills/dig-ui`
  - Cursor：`~/.cursor/skills/dig-ui`
  - Claude Code：`~/.claude/skills/dig-ui`
- 更新策略：
  - 覆盖 `SKILL.md`、`references/`、`assets/`、`sync_*`、README/USAGE 等标准资产。
  - 永远不覆盖 `references/global-rules.local.md`。
  - 若本地没有 local rules，可从 `references/global-rules.local.example.md` 提示用户复制，但不自动创建个人偏好。
- Cursor 额外支持：
  - `dig-ui-skill install cursor --project .` 可额外创建 `.cursor/rules/dig-ui.mdc`，作为项目硬触发入口。
  - 默认个人安装仍走 `~/.cursor/skills/dig-ui`，不再写入 `~/.cursor/skills-cursor`。

## Implementation Changes

- 在仓库加入：
  - `bin/dig-ui-skill.mjs`：CLI 入口。
  - `adapters/cursor/dig-ui.mdc`：项目级 Cursor rule 模板。
  - `INSTALL.md`：Codex / Cursor / Claude Code 安装说明。
- 更新 `package.json`：
  - 增加 `bin` 字段：
    ```json
    {
      "bin": {
        "dig-ui-skill": "bin/dig-ui-skill.mjs"
      }
    }
    ```
  - 后续可发布 npm 包；发布前也可用 GitHub npx 方式测试。
- CLI 行为：
  - 默认使用 copy 安装，跨工具最稳定。
  - 可选 `--link` 使用 symlink，适合本机开发调试。
  - 可选 `--source <path>` 从本地仓库安装，方便开发版：
    ```bash
    npx dig-ui-skill install cursor --source .
    ```
  - 可选 `--all` 一次安装到三端：
    ```bash
    npx dig-ui-skill install --all
    ```

## Test Plan

- 本地干净目录测试：
  - `node bin/dig-ui-skill.mjs install cursor --source .`
  - 确认 `~/.cursor/skills/dig-ui/SKILL.md` 存在。
  - 确认 `references/global-rules.local.md` 若已存在不会被覆盖。
- 三端路径测试：
  - Codex、Cursor、Claude Code 各执行一次 `install` 和 `update`。
  - 运行 `status` 确认版本、路径、local rules 状态正确。
- Cursor 项目触发测试：
  - 执行 `dig-ui-skill install cursor --project /path/to/project`。
  - 确认生成 `.cursor/rules/dig-ui.mdc`。
  - 在 Cursor 新会话中用 `dig-ui-skill catalog/wise` 触发，确认读取 `global-rules.local.md`。
- 回归测试：
  - `npm run validate:layouts`
  - 确认现有 layout render 不受 CLI 增加影响。

## Assumptions

- v1 先支持本机安装/更新，不做自动后台更新。
- npm 包名暂定 `dig-ui-skill`；发布前若名称不可用，再改为 scoped package。
- Cursor 的正确个人 skill 目录是 `~/.cursor/skills/dig-ui`；`~/.cursor/skills-cursor` 是 Cursor 内置托管目录，不写入。
- 用户个人偏好只放在 `global-rules.local.md`，CLI 更新必须保护它。
