# 参照 Taste Skill 的 Dig UI 架构优化落地

## 背景

本次更新的主线不是单独优化 block，而是参照 `taste-skill` 的执行纪律，对 Dig UI Skill 做一次系统级架构收口：让 agent 在生成或审查界面前，先完成语义判断、资产选择、反模式过滤、预检和渲染校验，再进入具体页面或组件实现。

Block library 是这次架构优化的一部分，用来补齐可复用界面协议和运维预览能力；它不是本次更新的唯一重点。

## 架构主线

- 增加 Dig Read，让 agent 先读懂任务意图，再选择 layout、catalog、block 与渲染资产。
- 引入 Dig 专属产品化 dials：`INFORMATION_DENSITY`、`BRAND_EXPRESSIVENESS`、`INTERACTION_ENERGY`、`OPERATIONAL_CRITICALITY`。
- 新增 Anti-Tells，把泛 AI SaaS 渐变、假 terminal、假 dashboard、card 泛滥、execution landing 化等反模式显式写入规则。
- 新增 Preflight，把交付前检查从临时经验变成稳定 gate。
- 新增 workflows，覆盖 review、redesign、execution、image-reference 等 agent 工作流。
- 拆清 `runtime` 语义：保留 legacy `page_type: runtime`，新增 `task_type: execution` 表达运行、调试、观测类任务，避免把 runtime 同时当页面类型、catalog 和业务语义。

## 资产组织

- 继续保持 domain-first 目录结构，语言版本通过同一 domain 下的 `.en.md` / `.zh-CN.md` 维护，而不是按语言拆根目录。
- `layout` 继续负责页面信息架构、slot、响应式顺序和 QA。
- `catalog` 继续负责视觉语言、token、typography、surface 和组件映射。
- `block` 负责可复用界面协议，补齐 primitive 与 product module 级别的结构、状态、slot 和 QA。
- 新增 `references/local/`，为项目级 layout / block 扩展提供落点；local asset 优先用 `extends`，真正替换官方行为时进入 `overrides/` 并写明 owner、reason、reviewed_at。

## Block Library 作为架构补齐

本次补齐 16 个官方 block：

- Primitive：`button`、`input`、`select`、`form-row`、`toast`、`modal`、`tooltip`、`tabs`
- Product：`table-toolbar`、`runtime-log-stream`、`run-status-header`、`step-timeline`、`settings-row`、`empty-state`、`notification-item`、`search-result-row`

Block 维护方式从“统一状态矩阵”升级为“协议说明页”：

- `Use when` / `Avoid when`
- `Examples`
- `Anatomy`
- `State semantics`
- `Accessibility`
- `Anti-patterns`

每个官方 block 都有同名 fixture：`references/render-fixtures/blocks/<id>.json`。fixture 维护专属 `examples` 与 `state_semantics`，用于表达真实使用场景和状态语义，不再把所有 block 套进同一组卡片状态。

## Render Ops 与运维预览

- `renders/index.html` 作为 catalog / layout / block 三类预览入口。
- `renders/layouts/` 继续用于检查 layout skeleton、slot、fixture 和响应式行为。
- `renders/blocks/` 从状态矩阵改为 block contract pages。
- block 页面底部保留 `Skin compatibility check`，用于检查不同 catalog token 下的可读性与兼容性；catalog 切换不再决定 block 的业务语义。
- `sync_block_renders.py` 只读取 canonical block 文件，避免 `.en.md` / `.zh-CN.md` 重复覆盖渲染输出。

## CLI 与验证

- `dig-ui-skill render catalogs|layouts|blocks|all`
- `dig-ui-skill validate renders`
- `npm run sync:blocks`
- `npm run sync:all`
- `npm run validate:blocks`
- `npm run validate:renders`

验证层新增和加强：

- 新增 `validate-dig-block-preview.mjs`，用 Playwright 验证 block 页面在 `dig`、`mono`、`editorial`、`wise`、`apple` 下的 query、select、chip 与跳转行为。
- `validate-dig-render-ops.mjs` 增加 block contract 护栏：必须有 contract mode、examples、state semantics，不允许回退到旧 `state-card` 矩阵。
- 官方 block fixture 变成强约束：校验 fixture 存在、`block` id 匹配、`states`、`examples`、`state_semantics`、example state 合法性。
- `bin/dig-ui-skill.mjs` 与 `package.json` 补齐 block 同步脚本和 block validator 的安装/发布清单，避免本地可用但安装后缺文件。

## 文档同步

- README / README.zh-CN 更新为新的 render ops 口径。
- USAGE 更新为架构优先工作流，明确 Dig Read、layout、catalog、block、Anti-Tells、Preflight、Render Ops 的执行顺序。
- INSTALL 更新安装清单和 Render Ops 校验说明，补齐 block validator 分发口径。
- SKILL / SKILL.en / SKILL.zh-CN 更新读取优先级和 workflow 触发规则，确保 agent 入口与文档主线一致。
- `references/render-ops.md` 明确 block render 是“协议说明页 + 兼容性检查”，不是第二套设计源。
- 更新说明强调：Markdown、shared manifest、fixture 和 catalog token 才是 source of truth，render HTML 只是运维视图。

## 校验结果

已通过：

```bash
node bin/dig-ui-skill.mjs --help
node bin/dig-ui-skill.mjs render blocks
npm run validate:catalogs
npm run validate:layouts
npm run validate:blocks
npm run validate:renders
node bin/dig-ui-skill.mjs validate renders
HOME=/private/tmp/dig-ui-skill-home node bin/dig-ui-skill.mjs install codex --source . --lang en
```

数据级检查结果：

- 16 个 manifest block 均有 fixture。
- 无多余 fixture。
- example 引用的 state 均合法。
- 每个 state 均有 `state_semantics`。

## 维护约定

- 新增或调整架构规则时，优先更新 Dig Read、Anti-Tells、Preflight、Workflow 或 Render Ops，而不是把经验散落在单个模板里。
- 新增 layout 时，先定义信息架构与 slot，再决定 catalog。
- 新增 catalog 时，只表达视觉语言，不承担页面结构语义。
- 新增官方 block 时，必须同时新增 Markdown 协议、双语资产、同名 fixture、渲染支持和 validator 覆盖。
- local layout / block 应通过 `references/local/` 扩展，不直接改官方资产来表达项目私有规则。
