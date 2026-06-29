# Dig UI Global Rules（中文翻译）

跨 catalog、跨 layout 的默认行为约束。所有 Dig 产品界面生成与审查默认遵循本文件，除非用户显式关闭。

`references/global-rules.md` 是英文主规范。本文件是中文翻译，用于阅读和审查对照。两个文件的 rule id 和章节结构应保持一致。

## 优先级

1. 用户当前 prompt
2. `references/global-rules.local.md`（若存在）
3. 英文主规范 `references/global-rules.md`
4. catalog（`references/catalogs/**/*.md`）
5. layout recipe 与 primitives

## 跳过条件

用户明确说「不使用 global」「skip global」「no global rules」时，本次任务跳过 global rules，只按 catalog / layout / primitives 执行。

## i18n

- 界面文案必须来自语言包、字典或等价的集中资源，不要在组件中混写硬编码文案。
- 至少覆盖：导航、页面标题、表单 label、按钮、状态与错误提示。
- 语言切换使用 `zh-CN` / `en` segmented pill；中文可显示「中」，英文显示「EN」。
- 切换语言时同步更新 `document.documentElement.lang`，并持久化到 localStorage 或等价用户设置。
- 有 header / topbar 时，语言控制通常与 theme 控制同组，位于右上角。

## Dark / Light 主题

- 所有 Dig 产品界面必须提供 `dark` / `light` 两套模式。
- 主题切换只替换 token、CSS variables、theme object 或等价主题值，不改组件语义和结构。
- 组件样式必须引用 `--dig-*` token 或项目内主题变量，避免在组件里写死暗色 / 亮色 hex。
- Global rules 只规定主题机制，不提供跨 catalog 的颜色值；`dark` / `light` token 必须从当前选用 catalog 的品牌色、背景、surface 与文字关系派生。
- 不得把 `dig` catalog 的深蓝背景（如 `#06121a` / `#0b1b26`）作为其他 catalog 的 dark 默认值或兜底值；只有当前 catalog 明确选择 `dig` 时才能使用这组背景。
- light 模式至少覆盖：`--dig-bg`、`--dig-bg-soft`、`--dig-surface`、`--dig-surface-strong`、`--dig-surface-elevated`、`--dig-text`、`--dig-text-muted`、`--dig-text-soft`、`--dig-border`、`--dig-grid-line`、`--dig-control-bg`、`--dig-control-bg-hover`。
- 模式切换使用 `dark` / `light` segmented pill；active 项使用 `--dig-accent`，inactive 项只使用 muted text 与透明背景。
- 控制条不得抢主 CTA 的视觉层级；尺寸应小于主按钮。

## 按钮与表单控件

- 主按钮、次按钮、表单 input、select trigger、select option 默认使用药丸形态：`border-radius: var(--dig-radius-pill)`。
- 按钮最小触控高度 `44px`；hover / focus 不改变高度、padding 或圆角。
- 表单、select、控制条背景使用 `--dig-control-bg` / `--dig-control-bg-hover`，不使用固定 rgba 暗色值。

## Layout / Components Consistency（一致性）

> 本章节用于约束页面级结构与重复组件的一致性。用户可在 `global-rules.local.md` 中按相同小标题补充个人偏好，例如只覆盖 `Header`、`Footer` 或 `Collections`。

### Layout Shell（页面骨架）

- 同一产品或同一页面组必须先建立稳定的 layout shell，再扩展具体页面；不要让每个页面重新发明整体结构和 CSS。
- `header`、`footer`、`sidebar`、`topbar`、`main content`、`secondary panel`、`modal/drawer` 的位置、宽度策略、spacing、z-index、滚动区域与响应式断点应复用同一套规则。
- 视觉变化应来自 catalog token、layout recipe 或明确的 variant；不要用一次性颜色、圆角、阴影、边框、背景图案制造局部风格漂移。

### Header / Topbar

- Header / topbar 的高度、左右 padding、品牌区、主导航、工具区、语言切换、主题切换、用户菜单位置必须在同一产品内保持稳定。
- Header 中的主 CTA、次级操作、图标按钮、搜索入口应使用同一套按钮与控件 primitive；不要在不同页面中改变交互密度和视觉层级。
- Header sticky / fixed / static 策略必须按页面组统一；若有滚动阴影、border 或 blur，必须使用 token 化样式。

### Footer

- Footer 的列数、链接分组、版权、社交链接、辅助说明与 CTA 区域必须使用稳定结构；不要在同一站点中混用多套 footer 信息架构。
- Marketing / docs / dashboard 可使用不同 footer variant，但 variant 必须有明确命名，并复用同一套 spacing、typography 与 divider token。

### Sidebar / Navigation

- Sidebar、侧边导航、二级导航的宽度、分组标题、active 状态、折叠状态、icon/text 对齐与 hover/focus 样式必须统一。
- 当前页、父级展开、disabled、badge/count、loading 等状态必须成套覆盖；不要只给单个页面临时补状态样式。

### Main Content / Page Sections

- Main content 的 max-width、grid、section gap、标题区、说明文案、主操作区、空态与错误态必须在同一页面组内保持一致。
- 页面 section 的标题、描述、右侧操作、内容容器、分隔线与背景层级必须复用 section primitive；不要把每个 section 做成独立风格。

### Toolbars / Filters / Actions

- 批量操作、筛选、排序、分页、搜索、导出等控制区必须和所在 page/list/table pattern 配套；不要每个页面单独发明 toolbar 布局。
- Toolbar 内控件顺序、间距、对齐、换行、移动端折叠方式必须稳定；搜索、filter、primary action 的优先级不能跨页面漂移。

### Collections / Lists / Tables / Grids

- 同一页面内，同类 collection 必须复用同一种 pattern，例如 `table`、`row list`、`card list`、`feed`、`timeline`、`grid`；pattern 由信息类型决定，不要在同一业务列表里混用多套排列方式。
- 同一个 collection 实例内，item 的主信息、辅助信息、状态、操作区位置必须稳定；default、hover、focus-visible、selected、disabled、loading、empty、error 状态必须成套覆盖。
- 允许 `compact` / `comfortable` / `spacious` 等密度变体，但密度必须挂在页面、区域或组件实例上统一生效；不要让相邻同类组件高度和间距无规则变化。

### Cards / Panels / Empty States

- 同类 card、panel、stat block、empty state 必须复用同一套 header、body、footer、action slot、icon/media slot 结构。
- Card / panel 的 radius、border、shadow、surface、padding 与 hover state 必须来自 token 或明确 variant；不要为局部内容临时创造新容器风格。

### Forms / Settings Rows

- 表单行、label、helper text、error text、required 标记、field group、submit bar 的布局和间距必须在同一页面组内稳定。
- Settings row、preference item、开关项、危险操作区必须复用同一套 row primitive，并覆盖 disabled、loading、error、success 状态。

### Responsive Behavior

- 响应式降级必须保持语义一致：桌面 table 可在移动端转为 stacked row/card，但字段顺序、状态位置、主操作优先级和信息层级必须与桌面端保持一致。
- Header、sidebar、toolbar、collection、modal/drawer 的移动端折叠方式必须按页面组统一；不要每个页面采用不同断点或不同抽屉行为。

### CSS / Primitive Discipline

- 重复组件必须复用同一套 primitive 或 component class，例如按钮组、筛选条、搜索框、分页器、状态 badge、数据卡、表单行、设置项、通知项、列表项；不要为相同语义写多套近似 CSS。
- 组件的 padding、gap、border、radius、divider、hover background、shadow、density 必须通过 token、component class 或项目内 primitive 表达，不要在局部临时写独立 CSS。

## Select（HTML Preview / React）

- 静态 HTML 运维预览如果需要轻量控件，可以使用原生 `<select class="dig-select">` + `<option>`；产品级 React UI 仍应使用项目内 Select 组件。
- React 产品实现：使用项目内 React 组件（例如 `Select`、`SelectTrigger`、`SelectContent`、`SelectOption`）表达下拉，不在产品 UI 中直接写裸 `<select>` / `<option>`。
- select 与 input 同样使用 pill 圆角与 `--dig-control-bg` token。
- option 列表背景使用 `--dig-surface-strong`；active / hover option 使用 accent tint，不改变 option 高度。

## 交互与图标

- hover / focus 保持克制，优先 color、border、glow、opacity 变化，不做跳动位移。
- 图标优先 Lucide 风格线性图标，不用 emoji 式装饰。
- active 状态比 hover 更深，不做 scale 或 translate 动画。

## Manifest（供 render 注入）

```yaml
rules:
  - id: i18n
    summary: 文案来自语言包；zh-CN/en 切换同步 html[lang] 并持久化
  - id: theme-mode
    summary: dark/light 双模式；只换 token/theme values，不写死颜色
  - id: pill-buttons
    summary: 主/次按钮与表单控件默认 pill 圆角，min-height 44px
    validate:
      buttonPillRadius: true
  - id: consistency
    summary: 页面结构、重复组件、collection pattern 与响应式规则保持一致
  - id: react-select
    summary: HTML preview 用 .dig-select；React 产品 UI 用项目内 Select 组件
    validate:
      requireDigSelectClass: true
      selectPillRadius: true
  - id: interaction
    summary: 克制 hover/focus；Lucide 风格线性图标
```
