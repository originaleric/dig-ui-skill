# 2026-07-12 Style Catalog 与 Custom Style 工作流落地

## 背景

Dig UI 之前已有 brand catalog 和 color palette catalog，但用户在实际风格归纳中还会从「截图气质」「完整界面语言」「材质/形态/插画/组件语法」切入。这类需求不只是配色问题，也不是品牌 catalog 的同一抽象。

本次更新新增 `style-catalog` 作为与 brand catalog、color palette catalog 并列的 catalog 类型，并把用户自定义 style 接入与 palette 一致的导出、导入和同步工作流。

## 变更

- 新增 `references/catalogs/styles/`，首批内置 style：
  - `cozy-arcade`：移动游戏陪伴、吉祥物、任务卡、装备选择和奖励芯片风格。
  - `quant-signal-console`：高密度实时信号控制台、预测市场、量化交易和 AI agent ops 风格。
- `references/shared/catalog-manifest.yaml` 增加 `style_v1` token contract 与 style render archetype token 约束。
- `sync_renders.py` 支持 `styles` 分类、Style Contract 校验、style render archetype、Style Lab 注入和 customstyle 导出。
- 新增专属 render archetype：
  - `mobile-game-companion`
  - `signal-ops-console`
- Style Lab 支持把当前 `Style Contract`、`render.archetype` 和最终 `--dig-*` token 导出为 `dig.style.export.v1` customstyle 资产。
- 新增 `dig-ui-skill style` CLI：
  - `style path`
  - `style list`
  - `style import <json|md|zip> [target|--all]`
  - `style sync [target|--all]`
  - `style show <id-or-file>`
- 用户自定义 style 的真源为 `~/.config/dig-ui-skill/styles/`，安装目录下的 `references/local/styles/` 只是同步副本。
- `install` / `update` 会保护并重新同步用户 style，不把用户资产写入内置 catalog。
- `style import` 会校验 `schema`、`token_contract`、`render.archetype`、Style Contract 和 required `--dig-*` token；缺少核心 token 或使用不可用占位值会被拒绝。
- Style export 修复为以最终合并后的 `styleTokens` 为唯一真相源重建 CSS，避免 JSON `tokens` 与 `.tokens.css` 在用户改色后分叉。

## 文档同步

- README / README.zh-CN 更新 catalog preview 数量、style catalog、Style Lab 和用户 style CLI 说明。
- INSTALL 更新 update 保留策略、用户 style 真源目录和 style helper 命令。
- USAGE 新增 Style Catalog 与 Style Lab 工作流。
- SKILL / SKILL.en / SKILL.zh-CN 更新读取优先级与 catalog 选择规则，区分 `style-catalog` 和用户本地 `customstyle`。
- `references/catalogs/README.md` / `.en.md` / `.zh-CN.md` 增加 style catalog 创建规则、token contract、render archetype 和 customstyle 维护边界。
- `references/local/README.md` 增加 synced user styles 说明。

## 校验

已通过：

```bash
node --check bin/dig-ui-skill.mjs
node --check validate-dig-render-ops.mjs
node --check tests/2026-07-12/dig-ui-color-style-prodtest.mjs
npm run validate:renders
npm run validate:catalogs
node tests/2026-07-12/dig-ui-color-style-prodtest.mjs
git diff --check
```

结果：

- `validate:renders`: 0 FAIL, 0 WARN
- `validate:catalogs`: passed for 76 preview(s)
- 第 1 轮生产模拟发现 Style export 的 JSON `tokens` 与 `.tokens.css` 分叉问题。
- 第 2 轮修复后生产模拟通过。
- 第 3 轮独立生产模拟通过，覆盖 Palette Lab 改色、Style Lab 改色、CLI import/show、palette regenerate 和 style regenerate。

## 生产模拟报告

- `tests/2026-07-12/2026-07-12-第1轮-生产模拟测试报告.md`
- `tests/2026-07-12/2026-07-12-第2轮-生产模拟测试报告.md`
- `tests/2026-07-12/2026-07-12-第3轮-生产模拟测试报告.md`
- `tests/2026-07-12/dig-ui-color-style-prodtest-evidence.json`

## 维护约定

- 内置 style 修改必须同步 `Style Contract`、`render.archetype` 与 `Dig UI CSS Tokens`。
- Style Lab 的临时改色不是 canonical source，确认采用后必须显式回写 Markdown 或导入为用户个人 customstyle。
- 用户 customstyle 属于仓库外资产，不写入内置 catalog，也不通过 manifest 伪装成官方 style。
- 新增 style catalog 应优先使用稳定、语义化 slug，例如 `signal-ops-console`，避免使用只描述颜色或一张截图文件名的 slug。
