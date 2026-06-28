# 2026-06-28 Taste Skill 借鉴完整落地

本次更新将 `taste-skill` 中值得借鉴的 agent 执行纪律完整落地到 Dig UI Skill：先判断场景，再选择 layout/catalog/block，最后通过 anti-tells、preflight、render ops 和 validator 收口。

## 核心能力

- 新增 `references/dig-read.md` 与 `references/shared/dig-read-manifest.yaml`，固化 Dig Read 和四个产品化 dials。
- 四个 dials 为 `INFORMATION_DENSITY`、`BRAND_EXPRESSIVENESS`、`INTERACTION_ENERGY`、`OPERATIONAL_CRITICALITY`。
- 新增 `references/anti-tells.md`，过滤泛 AI SaaS、假 terminal、execution landing 化、card 泛滥等 Dig 反模式。
- 新增 `references/preflight.md`，把交付前检查变成稳定 gate。
- 新增 `references/workflows/`，覆盖 review、redesign、execution、image-reference 场景。
- 拆清 `runtime` 语义：保留 legacy `page_type: runtime`，新增 `task_type: execution` 作为运行/调试类任务归类。

## Block Library

- 新增 `references/blocks/`，覆盖 primitive 与 product blocks。
- primitive blocks：button、input、select、form-row、toast、modal、tooltip、tabs。
- product blocks：table-toolbar、runtime-log-stream、run-status-header、step-timeline、settings-row、empty-state、notification-item、search-result-row。
- 新增 `renders/blocks/` 状态矩阵预览，并由 `sync_block_renders.py` 从 Markdown 与 fixture 生成。

## 双语与安装

- 新增 `SKILL.en.md` / `SKILL.zh-CN.md`，安装时通过 `--lang en|zh-CN` 选择语言。
- 新增 `references/locales/en/` 与 `references/locales/zh-CN/` 源语言包。
- 安装后只保留所选语言的 `SKILL.md` 与 canonical references，并写入 `dig-ui-language.json`。
- layout、catalog、block 的稳定 id 和机器字段保持 shared；agent 可读说明按语言包维护。

## Render Ops 与 Local Extensions

- 新增 `references/render-ops.md` 与 `references/render-fixtures/`。
- `renders/index.html` 作为统一入口，串起 catalog、layout、block 三类运维预览。
- 新增 `references/local/` 项目级 layout / block 扩展层，包含 `layouts/`、`blocks/`、`overrides/`。
- local layout / block 推荐使用 `extends`，真正替换官方行为时进入 `overrides/` 并写明 owner、reason、reviewed_at。

## CLI 与验证

- `dig-ui-skill render catalogs|layouts|blocks|all`
- `dig-ui-skill validate renders`
- `npm run sync:blocks`
- `npm run sync:all`
- `npm run validate:renders`

## 验证

```bash
node bin/dig-ui-skill.mjs --help
node bin/dig-ui-skill.mjs render blocks
npm run validate:catalogs
npm run validate:layouts
npm run validate:renders
HOME=/private/tmp/dig-ui-skill-home node bin/dig-ui-skill.mjs install codex --source . --lang en
```
