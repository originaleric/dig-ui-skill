# Global Rules 本地偏好助手方案

## 背景

`dig-ui-skill` 已经支持共享 global rules、中文翻译文件和用户本地 `global-rules.local.md` 覆写机制。但用户如果想长期沉淀自己的 UI 偏好，仍需要手动打开本地规则文件、判断应该写到哪个章节、再同步到 Codex / Cursor / Claude Code。

目标是让用户可以直接对 Codex / Cursor / Claude Code 这类宿主 Agent 表达偏好，例如：

```text
使用 dig-ui。把我的本地 global rules 更新一下：
Header 固定在顶部，高度紧凑，右侧放语言切换、主题切换和用户菜单。
```

宿主 Agent 使用 `dig-ui-skill` 提供的 workflow 文档理解偏好、生成 local rules patch；CLI 只负责本地文件写入、展示、同步等机械动作。这样不需要用户额外配置 OpenAI / Anthropic / Gemini API key。

## 目标体验

用户只需要表达偏好，不需要知道文件路径和章节结构：

```text
使用 dig-ui。更新我的本地 global rules：
后台表格默认 compact density，hover 不要太明显。
```

```text
Use dig-ui. Add this to my local global rules:
Marketing footer uses four link columns and keeps a newsletter CTA.
```

宿主 Agent 完成：

1. 读取英文主规范 `references/global-rules.md`。
2. 读取本地偏好构建指南 `references/local-rules-builder.md`。
3. 读取现有用户配置中心：

```text
~/.config/dig-ui-skill/global-rules.local.md
```

4. 判断偏好属于哪个 canonical section。
5. 生成并写入 local rules patch，保留用户手写内容。
6. 调用 CLI 同步到 Codex / Cursor / Claude Code：

```bash
npx dig-ui-skill sync-local --all --from-config
```

7. 输出写入位置和变更摘要。

## 设计原则

- 不要求用户配置额外 AI API key。
- 不在 CLI 内置远程 AI provider。
- 让 Codex / Cursor / Claude Code 使用自身原生 AI 能力完成自然语言理解、章节路由和 bullet 改写。
- CLI 只提供可重复、可测试、不会误解语义的机械能力：路径、展示、写入、同步、去重、备份。
- 共享规则仍以 `references/global-rules.md` 英文 canonical 为准，中文翻译只做阅读对照。

## 架构分层

建议分三层实现：

1. **Skill workflow 文档**

   新增：

   ```text
   references/local-rules-builder.md
   ```

   该文件教宿主 Agent 如何把用户自然语言偏好转成 `global-rules.local.md` 的 patch。

2. **CLI mechanical helper**

   `dig-ui-skill local ...` 只负责稳定的本地文件操作和同步。

3. **用户自然语言入口**

   用户直接对 Codex / Cursor / Claude Code 表达偏好；宿主 Agent 按 workflow 文档和 CLI helper 完成更新。

## Local Rules Builder 文档设计

建议新增 `references/local-rules-builder.md`：

```md
# Local Rules Builder

Use this guide when the user asks to add, update, remove, or refine personal Dig UI preferences.

## Source of Truth

Write personal preferences to:

~/.config/dig-ui-skill/global-rules.local.md

Never edit references/global-rules.md for personal preferences.

## Workflow

1. Read references/global-rules.md.
2. Read existing ~/.config/dig-ui-skill/global-rules.local.md if present.
3. Route the user preference to the closest canonical heading.
4. Preserve existing user-written content.
5. Add concise bullets under the matched heading.
6. Run `npx dig-ui-skill sync-local --all --from-config`.

## Canonical Sections

- Header / Topbar
- Footer
- Sidebar / Navigation
- Main Content / Page Sections
- Toolbars / Filters / Actions
- Collections / Lists / Tables / Grids
- Cards / Panels / Empty States
- Forms / Settings Rows
- Responsive Behavior
- CSS / Primitive Discipline
```

这个文件是给 Agent 读的，不是给 CLI 解析的唯一来源。CLI 可以提供辅助命令，但自然语言理解主要交给宿主 Agent。

## 命令设计

CLI 仍然建议新增 `local` 子命令，但定位为 mechanical helper，而不是 AI 大脑：

```bash
npx dig-ui-skill local path
npx dig-ui-skill local show
npx dig-ui-skill local sync
npx dig-ui-skill local init
npx dig-ui-skill local add --section "Header / Topbar" "<bullet>"
npx dig-ui-skill local set <section> "<preference>"
npx dig-ui-skill local remove <section>
```

也可以提供别名：

```bash
npx dig-ui-skill prefer --section "Collections / Lists / Tables / Grids" "<bullet>"
```

推荐第一阶段先实现：

```bash
npx dig-ui-skill local path
npx dig-ui-skill local show
npx dig-ui-skill local sync
npx dig-ui-skill local add --section "<canonical section>" "<bullet>"
```

用户自然语言入口由宿主 Agent 调用这些命令来完成。

## 文件写入策略

工具或 Agent 不要随意 append 到文件末尾，而是维护结构化 Markdown：

```md
# Dig UI Global Rules — Local Override

## Header / Topbar

- Header uses compact height by default.
- Keep language switcher, theme switcher, and user menu in one right-aligned control group.

## Collections / Lists / Tables / Grids

- Back-office data tables default to `compact` density.
- Table hover states should stay subtle and tokenized.
```

原则：

- 使用英文 canonical 的 section heading，方便跨工具和未来 manifest 合并。
- bullet 内容可保留用户输入语言，中文或英文都可以。
- 如果目标章节不存在，自动创建。
- 如果同一偏好重复出现，提示已存在，不重复写入。
- 写入前保留原文件内容和用户手写注释。

## Agent 路由策略

宿主 Agent 拥有原生 AI 能力，应优先根据 `references/global-rules.md` 和 `references/local-rules-builder.md` 判断章节。CLI 可保留关键词路由作为 fallback 或非 Agent 场景使用：

| 用户关键词 | 写入章节 |
| ---------- | -------- |
| header、topbar、顶部、导航栏、用户菜单、主题切换、语言切换 | `## Header / Topbar` |
| footer、底部、版权、社交链接、newsletter | `## Footer` |
| sidebar、side nav、侧边栏、导航、菜单、折叠 | `## Sidebar / Navigation` |
| main、section、页面主体、内容区、标题区、空态、错误态 | `## Main Content / Page Sections` |
| toolbar、filter、筛选、搜索、排序、分页、导出、批量操作 | `## Toolbars / Filters / Actions` |
| table、list、grid、列表、表格、卡片列表、密度、compact | `## Collections / Lists / Tables / Grids` |
| card、panel、stat、empty state、卡片、面板、空状态 | `## Cards / Panels / Empty States` |
| form、settings、label、helper、error、submit、设置项、表单 | `## Forms / Settings Rows` |
| mobile、responsive、breakpoint、drawer、移动端、响应式 | `## Responsive Behavior` |
| css、primitive、token、spacing、radius、shadow、class | `## CSS / Primitive Discipline` |

如果无法判断章节：

- 默认写入 `## Layout / Components Consistency`。
- 输出提示：`Could not confidently route this preference; added to the parent consistency section.`

## 同步策略

Agent 写入或 CLI `local add` 后，默认应执行：

```bash
npx dig-ui-skill sync-local --all --from-config
```

可支持选项：

```bash
--no-sync
--target codex
--target cursor
--target claude-code
```

示例：

```bash
npx dig-ui-skill local add --section "Header / Topbar" "Header is sticky and uses a tokenized border on scroll instead of blur." --target codex
npx dig-ui-skill local add --section "Collections / Lists / Tables / Grids" "Back-office data tables default to compact density." --no-sync
```

## 交互输出

成功写入时输出：

```text
Added local preference
  section: Header / Topbar
  file: ~/.config/dig-ui-skill/global-rules.local.md
  synced: codex, cursor, claude-code
```

重复偏好时输出：

```text
Skipped duplicate preference
  section: Header / Topbar
```

无法判断章节时输出：

```text
Added local preference
  section: Layout / Components Consistency
  note: Could not confidently route this preference.
```

## 后续增强

1. **Agent rewrite workflow**

   不在 CLI 中接远程 AI。由 Codex / Cursor / Claude Code 根据 `references/local-rules-builder.md` 把用户偏好改写成稳定 bullet，再调用 CLI 写入。

   用户入口示例：

   ```text
   使用 dig-ui。把这个偏好整理进我的 local rules：
   Header 要更紧凑，固定顶部，右侧保留语言、主题、用户菜单。
   ```

2. **交互确认模式**

   当关键词命中多个章节时，提示用户选择：

   ```text
   This preference may belong to:
   1. Header / Topbar
   2. Toolbars / Filters / Actions
   ```

3. **规则 lint**

   检查 local rules 是否存在：

   - 重复 bullet
   - 不存在的 section heading
   - 和 canonical rules 冲突的描述
   - manifest id 拼写错误

4. **本地偏好预览**

   提供：

   ```bash
   npx dig-ui-skill local show --merged
   ```

   展示 `global-rules.md` + `global-rules.local.md` 合并后的有效规则摘要。

5. **Agent-friendly patch protocol**

   允许 Agent 先输出结构化 proposal，再调用 CLI：

   ```json
   {
     "section": "Header / Topbar",
     "bullets": [
       "Header uses compact height by default.",
       "Keep language switcher, theme switcher, and user menu in one right-aligned control group."
     ]
   }
   ```

   CLI 只验证 section、去重、写入和同步。

## 第一阶段实现范围

建议先实现最小闭环：

- `references/local-rules-builder.md`
- `local path`
- `local show`
- `local sync`
- `local add --section "<canonical section>" "<bullet>"`
- 写入 `~/.config/dig-ui-skill/global-rules.local.md`
- 默认同步到已安装工具
- 保留用户手写内容，不覆盖已有 local rules
- 在 `SKILL.md` 中说明：当用户要求更新个人 UI 偏好时，读取 `references/local-rules-builder.md`

这样即可支持用户通过一条自然语言指令，让宿主 Agent 沉淀自己的 global rules 偏好，同时不需要配置任何额外 AI API key。
