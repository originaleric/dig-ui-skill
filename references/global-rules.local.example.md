# Dig UI Global Rules — Local Override（示例）

复制本文件为同目录下的 `global-rules.local.md`（已加入 `.gitignore`），即可在本地覆写或补充 global rules，无需修改仓库内的 `global-rules.md`。

## 使用方式

推荐通过 CLI 管理个人规则（配置中心在仓库外，不会进入 git）：

```bash
npx dig-ui-skill init-local
npx dig-ui-skill sync-local --all --from-config
```

也可在各工具 skill 目录手动复制：

```bash
cp references/global-rules.local.example.md references/global-rules.local.md
```

编辑 `global-rules.local.md` 后：

- AI 生成 / 审查时：local 规则优先于 `global-rules.md`。
- layout render：`./sync-renders.sh layout <slug>` 会在 HTML notes 区展示 local 来源，manifest 按 rule id 合并。
- `--no-global` render 会跳过 local 与默认 global rules（不加载 global CSS、不注入 manifest 校验项）。

## 示例覆写

在下方用与 `global-rules.md` 相同的 `##` 章节标题覆写规则；同标题下 local 条目覆盖默认条目。

## 按钮与表单控件

- 内部工具页允许次按钮使用 `var(--dig-radius-sm)` 方角变体（仅 internal admin）。

## i18n

- 默认语言改为 `en`；仍保留 zh-CN 切换。

## Manifest（供 render 注入）

本地 manifest 按 `id` 与默认规则合并；`validate` 字段可关闭对应校验。

```yaml
rules:
  - id: pill-buttons
    summary: 内部工具页允许次按钮方角变体
    validate:
      buttonPillRadius: false
```
