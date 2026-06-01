# Dig UI Global Rules

跨 catalog、跨 layout 的默认行为约束。所有 Dig 产品界面生成与审查默认遵循本文件，除非用户显式关闭。

## 优先级

1. 用户当前 prompt
2. `references/global-rules.local.md`（若存在）
3. 本文件 `references/global-rules.md`
4. catalog（`references/catalogs/**/*.md`）
5. layout recipe 与 primitives

## 跳过条件

用户明确说「不使用 global」「skip global」「no global rules」时，本次任务跳过 global rules，只按 catalog / layout / primitives 执行。

## i18n

- 界面文案必须来自语言包，不要在组件中混写中英文常量。
- 至少覆盖：导航、主标题、表单 label、按钮、状态与错误提示。
- 语言切换使用 `zh-CN` / `en` segmented pill；中文可显示「中」，英文显示「EN」。
- 切换语言时同步更新 `document.documentElement.lang`，并持久化到 localStorage 或等价用户设置。
- 有 header / topbar 时，语言控制通常与 theme 控制同组，位于右上角。

## Dark / Light 主题

- 所有 Dig 产品界面必须提供 `dark` / `light` 两套模式。
- dark/light 只替换 token 值，不改组件语义；组件样式必须引用 `--dig-*` token，避免写死暗色或亮色 hex。
- light 模式至少覆盖：`--dig-bg`、`--dig-bg-soft`、`--dig-surface`、`--dig-surface-strong`、`--dig-surface-elevated`、`--dig-text`、`--dig-text-muted`、`--dig-text-soft`、`--dig-border`、`--dig-grid-line`、`--dig-control-bg`、`--dig-control-bg-hover`。
- 模式切换使用 `dark` / `light` segmented pill；active 项使用 `--dig-accent`，inactive 项只使用 muted text 与透明背景。
- 控制条不得抢主 CTA 的视觉层级；尺寸应小于主按钮。

## 按钮与表单控件

- 主按钮、次按钮、表单 input、select trigger、select option 默认使用药丸形态：`border-radius: var(--dig-radius-pill)`。
- 按钮最小触控高度 `44px`；hover / focus 只改变 color、border、background、glow，不改变高度、padding 或圆角。
- 表单、select、控制条背景使用 `--dig-control-bg` / `--dig-control-bg-hover`，不使用固定 rgba 暗色值。

## 原生 Select（HTML / React）

- HTML layout 预览：使用原生 `<select class="dig-select">` + `<option>`，配合 `assets/layout-preview-global.css` 中的 `.dig-select` 样式（仅在 `data-global-rules-enabled="true"` 且 layout render 引入该文件时生效；`assets/layout-preview.css` 只保留不含 global 覆盖的基础 primitive）。
- React 实现：优先使用原生 `<select>` + `<option>`，或封装为受控组件但 DOM 层保持原生 select；避免引入重型第三方 select 库替代基础下拉。
- select 与 input 同样使用 pill 圆角与 `--dig-control-bg` token。
- option 列表背景使用 `--dig-surface-strong`；active / hover option 使用 accent tint，不改变 option 高度。

## 交互与图标

- hover / focus 保持克制，优先 color、border、glow、opacity 变化，不做跳动位移。
- 图标优先 Lucide 线性图标，不用 emoji 式装饰。
- active 状态比 hover 更深，不做 scale 或 translate 动画。

## Manifest（供 render 注入）

```yaml
rules:
  - id: i18n
    summary: 文案来自语言包；zh-CN/en 切换同步 html[lang] 并持久化
  - id: theme-mode
    summary: dark/light 双模式；只换 token 不写死 hex
  - id: pill-buttons
    summary: 主/次按钮与表单控件默认 pill 圆角，min-height 44px
    validate:
      buttonPillRadius: true
  - id: native-select
    summary: HTML 用 .dig-select；React 优先原生 select/option
    validate:
      requireDigSelectClass: true
      selectPillRadius: true
  - id: interaction
    summary: 克制 hover/focus；Lucide 线性图标
```
