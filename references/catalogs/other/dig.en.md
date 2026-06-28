# Dig Catalog

## 适用场景

- Dig 官网首页
- runtime / orchestration / agent 控制台
- dashboard
- 需要体现“运行中、可部署、可观测”的产品界面

## 风格关键词

- engineered
- operational
- crisp
- active system
- dark mineral
- run-state

## 颜色 Token

```css
--dig-bg: #06121a;
--dig-bg-soft: #0b1b26;
--dig-surface: rgba(11, 27, 38, 0.78);
--dig-surface-strong: rgba(16, 32, 44, 0.92);
--dig-surface-elevated: rgba(20, 39, 53, 0.96);
--dig-text: #ecf3f8;
--dig-text-muted: #8aa0b2;
--dig-text-soft: #62798c;
--dig-accent: #37d67a;
--dig-accent-strong: #20bf66;
--dig-accent-2: #4fb3ff;
--dig-accent-2-strong: #2697eb;
--dig-border: rgba(138, 160, 178, 0.16);
--dig-border-strong: rgba(138, 160, 178, 0.28);
--dig-grid-line: rgba(138, 160, 178, 0.08);
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #4fb3ff;
--dig-control-bg: rgba(5, 18, 27, 0.68);
--dig-control-bg-hover: rgba(16, 32, 44, 0.86);
```

主题规则：

- Dig 默认优先 dark，但必须提供 `dark` / `light` 两套模式。
- dark/light 不应改组件语义，只替换 token 值；组件样式必须引用 token，避免写死暗色或亮色。
- light 模式至少覆盖 `--dig-bg`、`--dig-bg-soft`、`--dig-surface`、`--dig-surface-strong`、`--dig-surface-elevated`、`--dig-text`、`--dig-text-muted`、`--dig-text-soft`、`--dig-border`、`--dig-grid-line`、`--dig-control-bg`、`--dig-control-bg-hover`。
- 表单、select、控制条必须使用 `--dig-control-bg` / `--dig-control-bg-hover`，不能使用固定 `rgba(5, 18, 27, ...)`。

## 字体系统

```css
--dig-font-sans: "Plus Jakarta Sans", "Noto Sans SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "Noto Serif SC", serif;
```

使用规则：

- 标题、正文、按钮、导航默认都使用 sans。
- meta、状态、编号、命令、时间戳使用 mono。
- serif 不作为 dig 的常规 UI 字体。

## 字号与行高

```css
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 20px;
--dig-text-2xl: 24px;
--dig-text-3xl: 32px;
--dig-text-4xl: 40px;
--dig-text-5xl: 56px;

--dig-leading-tight: 1.15;
--dig-leading-snug: 1.3;
--dig-leading-normal: 1.55;
--dig-leading-relaxed: 1.72;

--dig-tracking-tight: -0.03em;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.08em;
```

推荐绑定 (Typography Tokens)：

```yaml
typography:
  hero-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-5xl)"
    lineHeight: "var(--dig-leading-tight)"
    letterSpacing: "-0.04em"
    fontWeight: "800"
  section-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-3xl)"
    lineHeight: "var(--dig-leading-tight)"
    letterSpacing: "-0.03em"
    fontWeight: "800"
  panel-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-xl)"
    lineHeight: "var(--dig-leading-snug)"
    letterSpacing: "-0.02em"
    fontWeight: "700"
  body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-md)"
    lineHeight: "var(--dig-leading-normal)"
    letterSpacing: "0"
    fontWeight: "500"
  small-body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-sm)"
    lineHeight: "var(--dig-leading-normal)"
    letterSpacing: "0"
    fontWeight: "500"
  meta-kicker:
    fontFamily: "var(--dig-font-mono)"
    fontSize: "var(--dig-text-xs)"
    lineHeight: "1.4"
    letterSpacing: "0.08em"
    fontWeight: "600"
  numeric-emphasis:
    fontFamily: "var(--dig-font-mono)"
    fontSize: "var(--dig-text-4xl)"
    lineHeight: "var(--dig-leading-tight)"
    letterSpacing: "-0.04em"
    fontWeight: "800"
```

## 间距与圆角

```css
--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 32px;
--dig-space-7: 48px;
--dig-space-8: 64px;

--dig-radius-sm: 10px;
--dig-radius-md: 16px;
--dig-radius-lg: 24px;
--dig-radius-xl: 32px;
--dig-radius-pill: 999px;
```

使用建议：

- 外层 section padding：`32px` 到 `48px`
- panel padding：`20px` 到 `24px`
- 紧凑控制条：`12px` 到 `16px`
- header 内的模式切换、语言切换使用 segmented pill 控制条：外层 `var(--dig-radius-pill)`，内层 active segment 也是 pill
- 按钮高度：`42px` 到 `48px`
- 表单输入框、select trigger、select option 使用药丸形态：`var(--dig-radius-pill)`
- 面板圆角：`16px`
- Hero / 大卡片圆角：`24px`

## Border / Shadow / Glow

```css
--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 18px 48px rgba(0, 0, 0, 0.24);
--dig-shadow-panel: 0 24px 80px rgba(2, 10, 18, 0.34);
--dig-glow-accent: 0 0 0 1px rgba(55, 214, 122, 0.22), 0 0 40px rgba(55, 214, 122, 0.12);
--dig-glow-secondary: 0 0 0 1px rgba(79, 179, 255, 0.18), 0 0 36px rgba(79, 179, 255, 0.1);
```

规则：

- border 默认使用 `--dig-border`，强调时使用 `--dig-border-strong`
- 不做厚重拟物阴影
- glow 只作局部强调，不能铺满整屏

## Grid 与背景

```css
--dig-shell-max: 1440px;
--dig-grid-columns: 12;
--dig-grid-gutter: 24px;
--dig-grid-gutter-mobile: 16px;
--dig-grid-cell-min: 72px;
```

背景规则：

- 可使用深色 radial gradient
- 可叠加轻微 technical grid
- grid 透明度控制在 `0.05` 到 `0.09`
- 不做游戏式霓虹网格

## 组件级样式语言 (Components Strict Mapping)

```yaml
components:
  button-primary:
    backgroundColor: "var(--dig-accent-strong)"
    textColor: "var(--dig-bg)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-sm)"
    padding: "12px 24px"
    border: "none"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "var(--dig-text)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-sm)"
    padding: "12px 24px"
    border: "var(--dig-stroke-strong) solid var(--dig-border-strong)"
  tag-chip:
    backgroundColor: "var(--dig-surface-elevated)"
    textColor: "var(--dig-text-muted)"
    typography: "{typography.meta-kicker}"
    rounded: "var(--dig-radius-pill)"
    padding: "4px 8px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  panel:
    backgroundColor: "var(--dig-surface)"
    textColor: "var(--dig-text)"
    rounded: "var(--dig-radius-md)"
    padding: "var(--dig-space-5)"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
    boxShadow: "var(--dig-shadow-panel)"
    backdropFilter: "blur(12px)"
  form-input:
    backgroundColor: "var(--dig-control-bg, rgba(5, 18, 27, 0.68))"
    textColor: "var(--dig-text)"
    placeholderColor: "var(--dig-text-soft)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-pill)"
    minHeight: "44px"
    padding: "0 16px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  select-trigger:
    backgroundColor: "var(--dig-control-bg, rgba(5, 18, 27, 0.68))"
    textColor: "var(--dig-text)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-pill)"
    minHeight: "44px"
    padding: "0 16px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  select-menu:
    backgroundColor: "var(--dig-surface-strong)"
    textColor: "var(--dig-text)"
    rounded: "var(--dig-radius-md)"
    padding: "6px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
    boxShadow: "var(--dig-shadow-panel)"
    backdropFilter: "blur(12px)"
  select-option:
    backgroundColor: "transparent"
    textColor: "var(--dig-text)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-pill)"
    padding: "10px 14px"
  select-option-active:
    backgroundColor: "rgba(55, 214, 122, 0.13)"
    textColor: "var(--dig-text)"
    rounded: "var(--dig-radius-pill)"
  segmented-control:
    backgroundColor: "var(--dig-surface-elevated)"
    textColor: "var(--dig-text-muted)"
    rounded: "var(--dig-radius-pill)"
    minHeight: "38px"
    padding: "4px"
    gap: "4px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
    boxShadow: "var(--dig-shadow-soft)"
    backdropFilter: "blur(12px)"
  segmented-control-item:
    backgroundColor: "transparent"
    textColor: "var(--dig-text-muted)"
    typography: "{typography.small-body}"
    rounded: "var(--dig-radius-pill)"
    minHeight: "28px"
    padding: "0 10px"
    border: "none"
  segmented-control-item-active:
    backgroundColor: "var(--dig-accent)"
    textColor: "var(--dig-bg)"
    rounded: "var(--dig-radius-pill)"
    boxShadow: "var(--dig-glow-accent)"
  theme-mode-control:
    pattern: "segmented-control"
    options: ["dark", "light"]
    iconStyle: "lucide-line"
    persistKey: "dig-theme"
  language-control:
    pattern: "segmented-control"
    options: ["zh-CN", "en"]
    iconStyle: "lucide-line"
    persistKey: "dig-lang"
```

## Dig Chrome 与 i18n

- Dig 页面如果有 header / topbar，应优先放置 `theme-mode-control` 与 `language-control`，位置通常在右上角，与导航 pill 同组。
- 模式切换使用 `dark` / `light` segmented pill，active 项使用 `--dig-accent`，inactive 项只使用 muted text 与透明背景。
- 语言切换使用 `zh-CN` / `en` segmented pill；中文可显示 `中`，英文显示 `EN`。
- 控制条不得抢主 CTA 的视觉层级；尺寸应小于主按钮，active 只表达当前状态。
- i18n 文案必须来自语言包，不要在组件中混写中英文常量；至少覆盖导航、主标题、表单 label、按钮、状态与错误提示。
- 切换语言时同步更新 `document.documentElement.lang`，并持久化到 localStorage 或等价用户设置。

## 响应式行为策略 (Responsive Behavior)

- **断点规则**：
  - Desktop (`>= 1024px`)：标准大屏模式，完整显示多列 grid 面板和全量背景网格。
  - Tablet (`768px - 1023px`)：网格最多 2 列，边距从 `48px` 缩减至 `32px`，hero title 缩减至 `40px`。
  - Mobile (`< 768px`)：强制 1 列流式布局，外边距缩减至 `16px`，面板 padding 缩减至 `16px`。
- **触控与缩放**：
  - 移动端下，所有按钮和可点击区域的最小高度必须保证 `44px` (WCAG 触控标准)。
  - 输入框文字在移动端不能小于 `16px`（防止 iOS 自动放大）。
- **组件折叠**：
  - 控制台侧边栏在移动端折叠为底部导航或抽屉 (Drawer)。
  - 复杂数据表格在移动端转为卡片列表。

## 交互规则

- hover 仅调整 color、background、border、shadow、glow
- transition：`160ms` 到 `220ms`
- `:focus-visible` 必须有 2 层反馈：outline 或 glow + border 变化
- input、select trigger、select option 的 hover/focus 只改变 border、background、glow，不改变高度、padding 或圆角
- segmented control 的 active 状态使用 accent 填充，hover 只提高 inactive 项文字对比或轻微背景，不改变尺寸
- active 状态比 hover 更深，不做跳动位移

## 禁止事项

- 不要使用紫色作为主强调色
- 不要用多种高饱和色并列抢主导
- 不要用过多毛玻璃导致信息发虚
- 不要把 dig 做成消费级 app 的圆润卡片风
