# 2026-05-30 Layout 可编辑渲染与 Catalog 平级资产落地

## 更新概览

本次更新将 **layout recipe** 从文字规则升级为与 catalog 平级的可编译设计资产：运维与 AI 可编辑 `references/layouts/` 下的 Markdown，通过同步脚本生成 HTML 预览，并在浏览器中检查三 viewport 响应式与多 catalog 适配效果。

系统现已具备两条清晰的设计资产链：

```text
Catalog：references/catalogs/*.md → renders/<category>/*.html
Layout：references/layouts/*.md   → renders/layouts/*.html
```

最终实现 **20 个 layout recipe**，配套 Playwright 结构校验，并接入 `SKILL.md`、`USAGE.md`、检查清单与 Catalog Hub 入口。

## 分层模型

```text
页面需求 → layout recipe（信息结构）→ catalog（视觉气质）→ primitive（底层约束）
```

- **Layout**：区域划分、slot、grid、响应式顺序、信息密度、适用/禁用场景
- **Catalog**：颜色、字体、圆角、surface 等 token（不写页面骨架）
- **Primitive**：shell 宽度、12 栏 grid、基础 class（`assets/layout-preview.css`）

## 详细改动

### 1. Layout 源文件目录

新增 `references/layouts/`：

- `README.md` — 维护说明与 20 项索引
- `_template.md` — 新建 layout 模板（含 Applicable Scenarios / Avoid When / Recommended Catalogs）
- **20 个 layout Markdown**，均含 frontmatter、slots、layout/responsive rules、Preview HTML/CSS、QA Notes

| 类型 | Layout |
|------|--------|
| marketing | `marketing-hero`、`split-feature-showcase`、`comparison-section`、`pricing-or-plan-grid`、`auth-sign-in`、`error-page`、`integration-gallery` |
| docs | `docs-article`、`report-insight` |
| workspace | `search-results`、`data-table-workspace` |
| dashboard | `dashboard-overview`、`empty-state`、`notification-inbox` |
| settings | `settings-form`、`onboarding-wizard`、`billing-checkout` |
| runtime | `runtime-console`、`agent-run-detail`、`log-inspector` |

### 2. 渲染编译与命令

- 新增 `sync_layout_renders.py` — 解析 layout Markdown，注入 5 套 catalog token，生成三 viewport 预览 shell
- 扩展 `sync-renders.sh` 路由：
  - `./sync-renders.sh --layouts` — 同步全部 layout
  - `./sync-renders.sh layout <slug>` — 同步单个
  - 无参数 / 指定 catalog 名 — 保持原有 catalog 同步行为
- 新增 `assets/layout-preview.css` — 结构 primitive（不含品牌 hex）
- Preview CSS 使用 `@container layout-viewport` 断点，使 shell 内 1440 / 900 / 390 容器正确触发响应式

### 3. Layout 预览页能力

每个 `renders/layouts/<slug>.html` 包含：

- Desktop（1440px）、Tablet（900px）、Mobile（390px）三 viewport
- Catalog 切换：`dig`、`mono`、`editorial`、`wise`、`apple`（前端 `html[data-catalog]`，无需重新编译）
- Notes 区：Recommended Catalogs、Applicable Scenarios、Avoid When、Slots、Layout/Responsive Rules、QA Notes

`renders/layouts/index.html` 为 layout 导航索引，卡片展示 page_type、推荐 catalog 与状态。

### 4. 结构校验

- 新增 `validate-dig-layout-preview.mjs`（Playwright）
- `package.json` 新增脚本：
  - `npm run sync:layouts`
  - `npm run validate:layouts`
- 检查项：横向滚动、文本溢出、required slot 缺失、card 套 card、移动端 tap target 等
- 当前 **20/20 PASS，0 WARN**

### 5. 文档与 Hub 集成

- **SKILL.md**：工作流增加「选择 layout recipe」步骤；交付前对照 layout QA；链接 `renders/layouts/index.html`
- **USAGE.md**：新增 Layout 结构资产章节（同步命令、新增流程）
- **references/checklist.md**：新增 Layout 结构检查项
- **renders/index.html**：Catalog Hub 增加 Layout 手册横幅（20 recipes），链至 `./layouts/index.html`

## 运维工作流

```text
1. 编辑 references/layouts/<slug>.md
2. ./sync-renders.sh layout <slug>  或  ./sync-renders.sh --layouts
3. 打开 renders/layouts/<slug>.html
4. 检查 desktop / tablet / mobile，切换 catalog
5. npm run validate:layouts
```

新增 layout：从 `_template.md` 复制 → 填写协议字段 → 同步 → 至少用 dig + mono 两个 catalog 对照。

## 价值与影响

- **结构可维护**：layout 与 catalog 职责分离，同一 dashboard 骨架可套不同视觉气质
- **可复查**：三 viewport + catalog 切换 + validator，尽早暴露溢出、嵌套 card、slot 缺失等问题
- **可指导实现**：AI 与开发可按 `layout recipe + catalog + primitive` 组合生成更稳定的 Dig 产品界面

本次 **未改动** 现有 catalog 同步逻辑与 71 套品牌 preview 的默认行为；layout 为增量资产层，与 catalog 链并行使用。

## 相关文件

```text
references/layouts/          # 20 个 layout 源文件
renders/layouts/             # 预览 HTML + index
sync_layout_renders.py
sync-renders.sh              # 扩展 layout 路由
assets/layout-preview.css
validate-dig-layout-preview.mjs
plans/2026-05-30-Layout可编辑渲染与Catalog平级资产方案.md
```
