# 2026-06-29 取消 Layout 与 Block 渲染入口

## 背景

本次调整重新明确 Dig UI 的三层职责：

- Catalog 负责视觉语言，适合通过 HTML render 给用户直接检查和自定义。
- Layout 负责页面信息结构，是 Markdown contract，不再生成 HTML render。
- Block 负责可复用交互 / 信息协议，是 Markdown contract，不再生成 HTML render 或 fixture。

这样避免 block 被误解成视觉组件库，也避免 layout/block render 成为第二套维护源。

## 变更

- 删除 `renders/layouts/` 与 `renders/blocks/` 生成产物。
- 删除 `sync_layout_renders.py`、`sync_block_renders.py`、`validate-dig-layout-preview.mjs`、`validate-dig-block-preview.mjs`。
- 删除 `references/render-fixtures/`，取消 layout/block 对 fixture 的硬依赖。
- `sync-renders.sh` 只同步 catalog render；旧的 layout/block 参数会提示已退役。
- `dig-ui-skill render` 只支持 `catalogs` 和 `all`，其中 `all` 是 catalog render 的便利别名。
- `validate-dig-render-ops.mjs` 改为检查 catalog render、双语资产、layout/block Markdown contract，并禁止退役 render 目录或脚本重新出现。
- Layout Markdown 中的 `Preview HTML / Preview CSS` 改为 `Implementation Skeleton / Structural Notes`，保留结构样例价值，但不再暗示存在 render 页面。
- README、USAGE、INSTALL、SKILL、preflight、render-ops、local rules 文档同步更新。

## 校验

```bash
./sync-renders.sh --all
npm run validate:renders
npm run validate:catalogs
```

结果：

- `validate:renders`: 0 FAIL, 0 WARN
- `validate:catalogs`: passed for 73 preview(s)

同步时当前环境无法访问翻译服务，脚本使用 fallback 文案完成同步。
