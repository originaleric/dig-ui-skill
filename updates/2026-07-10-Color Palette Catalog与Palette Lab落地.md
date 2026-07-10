# 2026-07-10 Color Palette Catalog 与 Palette Lab 落地

## 背景

Dig UI 原有 catalog 主要以品牌、产品类型或成熟视觉语言为入口，例如 `dig`、`mono`、`editorial`、`wise` 和各类品牌 inspired catalog。

本次更新新增一条并列的 color-first catalog 线，用于回答「我想要一套好的网站整体配色」「我想基于 mood / palette 做界面」这类需求。它不替代 brand catalog，而是补齐从整体配色切入的工作流。

## 变更

- 新增 `references/catalogs/palettes/`，首条内置 palette 为 `palette01`。
- 新增 `references/color-palette-catalogs.md`，定义 palette catalog 的 slug、frontmatter、Palette Contract、Radix-inspired 色阶语义、site roles、token mapping 和维护边界。
- `references/shared/catalog-manifest.yaml` 增加 palette catalog 分类与 `palette_v1` token contract。
- `sync_renders.py` 支持 `palettes` 分类，并为 palette render 注入 Palette Lab。
- Palette Lab 支持编辑 `canvas`、`ink`、`primary`、`primary strong`、`support`、`support strong`，点击候选 support 色后实时渲染预览。
- Palette Lab 支持导出 ZIP，包含：
  - `palette01.custompalette-<timestamp>.json`
  - `palette01.custompalette-<timestamp>.html`
- 新增 `dig-ui-skill palette` CLI：
  - `palette path`
  - `palette list`
  - `palette import <json|zip> [target|--all]`
  - `palette sync [target|--all]`
  - `palette show <id-or-file>`
- 用户自定义 palette 的真源为 `~/.config/dig-ui-skill/palettes/`，安装目录下的 `references/local/palettes/` 只是同步副本。
- `install` / `update` 会保护并重新同步用户 palette，不把用户资产写入内置 catalog。
- `palette import` 会校验 `schema`、`token_contract`、anchors/roles 与核心 `--dig-*` token 的一致性，并规范化 hex。
- 导出 HTML 的主按钮文字色改为基于黑/白对比度自动选择，避免浅色主色上出现不可读文字。
- 安装语言包恢复清理源语言副本，安装后的 skill 不再残留 `SKILL.en.md` / `SKILL.zh-CN.md` 或 `references/**/*.en.md` / `references/**/*.zh-CN.md`。

## 文档同步

- README / README.zh-CN 更新 catalog 数量、color palette catalog、Palette Lab 和用户 palette CLI 说明。
- INSTALL 更新 update 保留策略、用户 palette 真源目录和 palette helper 命令。
- USAGE 新增 Color Palette Catalog 与 Palette Lab 工作流。
- SKILL / SKILL.en / SKILL.zh-CN 更新读取优先级与 catalog 选择规则，区分 `paletteXX` 和用户本地 `custompalette`。
- `references/catalogs/README.md` 增加 palette catalog 创建规则、token contract 与 render 维护边界。

## 校验

已通过：

```bash
python3 sync_renders.py palette01
python3 -m py_compile sync_renders.py
node --check bin/dig-ui-skill.mjs
npm run validate:renders
npm run validate:catalogs
HOME=/private/tmp/dig-ui-review-after-p2 node bin/dig-ui-skill.mjs install codex --source .
HOME=/private/tmp/dig-ui-review-after-p2 node bin/dig-ui-skill.mjs install cursor --source . --lang en
HOME=/private/tmp/dig-ui-review-after-p2 node bin/dig-ui-skill.mjs palette import /private/tmp/palette-yellow-contrast.zip codex
HOME=/private/tmp/dig-ui-review-after-p2 node bin/dig-ui-skill.mjs update codex --source .
```

结果：

- `validate:renders`: 0 FAIL, 0 WARN
- `validate:catalogs`: passed for 74 preview(s)
- 导入 role/token 不一致的 palette JSON 会被拒绝。
- `update` 后用户 palette 仍保留在 `references/local/palettes/`。
- 安装后的 zh-CN 与 en skill 均无源语言副本残留。

## 维护约定

- 内置 palette 修改必须同步 `Palette Contract` 与 `Dig UI CSS Tokens`。
- Palette Lab 的临时试色不是 canonical source，确认采用后必须显式回写 Markdown 或导入为用户个人 palette。
- 用户 custom palette 属于仓库外资产，不写入内置 catalog，也不通过 git 跟踪。
- 新增 palette catalog 使用稳定 slug：`palette01`、`palette02`、`palette03`。
