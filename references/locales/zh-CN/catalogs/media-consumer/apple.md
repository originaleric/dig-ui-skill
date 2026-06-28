# Apple-Inspired Catalog

## 适用场景

- Dig 的高端产品发布页、功能亮点页、下载页和设备联动页
- 需要强调“内容先行、产品真实、界面安静”的 marketing / product hybrid 页面
- 需要更强系统级可信感、轻透层级、圆润控件和精密排版的体验
- macOS / iOS 风格的 console shell、setup flow、feature reveal 和 app preview

## 风格关键词

- content-first
- liquid-glass
- quiet-premium
- system-native
- product-theater
- soft-depth
- familiar-delight

## 参考来源

- Apple 官网当前产品页：大面积留白、产品实物优先、中心式 hero、短句标题和清晰 CTA。
- Apple 2025 软件设计发布：Liquid Glass 强调半透明材质、折射感、动态控件、导航和 widget 层级。
- Apple Developer Design guidance：延续系统字体、清晰层级、熟悉控件和内容聚焦。

这套 catalog 只借鉴公开视觉语言和交互气质，不复制 Apple logo、设备图、专有插画、营销文案或品牌资产。

## 颜色 Token

```css
--dig-bg: #f5f5f7;
--dig-bg-soft: #ffffff;
--dig-surface: rgba(255, 255, 255, 0.72);
--dig-surface-strong: rgba(255, 255, 255, 0.9);
--dig-surface-elevated: rgba(255, 255, 255, 0.96);
--dig-text: #1d1d1f;
--dig-text-muted: #6e6e73;
--dig-text-soft: #86868b;
--dig-accent: #0071e3;
--dig-accent-strong: #005bbf;
--dig-accent-2: #7d7aff;
--dig-accent-2-strong: #5e5ce6;
--dig-border: rgba(29, 29, 31, 0.12);
--dig-border-strong: rgba(29, 29, 31, 0.2);
--dig-grid-line: rgba(29, 29, 31, 0.045);
--dig-success: #34c759;
--dig-warning: #ff9f0a;
--dig-danger: #ff3b30;
--dig-info: #007aff;
```

使用规则：

- `--dig-bg` 用于全局浅灰背景，`--dig-bg-soft` 用于强内容区和产品舞台。
- `--dig-surface` 用于 glass bar、浮动 nav、控制面板和轻量卡片。
- `--dig-accent` 只用于主链接、主 CTA、active 状态和小面积系统强调。
- `--dig-accent-2` 用作 secondary glow、智能能力提示或多设备联动的弱强调，不做大面积渐变背景。
- 深色块只在需要“影院式”产品展示时局部使用，不能把整页做成黑色科技模板。

## 字体系统

```css
--dig-font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "PingFang SC", "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
--dig-font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
--dig-font-mono: "SFMono-Regular", "SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace;
--dig-font-serif: "New York", "Noto Serif SC", Georgia, serif;
```

使用规则：

- display 和 UI 都以 system font 为主，靠字号、字重和留白建立层级。
- 不使用外放的品牌字体，不做杂志式衬线主标题。
- mono 只用于 build id、device id、runtime metrics、版本号和短状态码。
- 中文优先使用 `PingFang SC`，保持系统原生感。

## 字号与行高

```css
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 19px;
--dig-text-xl: 22px;
--dig-text-2xl: 28px;
--dig-text-3xl: 40px;
--dig-text-4xl: 56px;
--dig-text-5xl: 76px;

--dig-leading-tight: 1.02;
--dig-leading-snug: 1.12;
--dig-leading-normal: 1.48;
--dig-leading-relaxed: 1.64;

--dig-tracking-tight: 0;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.04em;
```

推荐绑定 (Typography Tokens)：

```yaml
typography:
  hero-display:
    fontFamily: "var(--dig-font-display)"
    fontSize: "var(--dig-text-5xl)"
    lineHeight: "var(--dig-leading-tight)"
    letterSpacing: "0"
    fontWeight: "700"
  product-headline:
    fontFamily: "var(--dig-font-display)"
    fontSize: "var(--dig-text-4xl)"
    lineHeight: "1.04"
    letterSpacing: "0"
    fontWeight: "700"
  section-title:
    fontFamily: "var(--dig-font-display)"
    fontSize: "var(--dig-text-3xl)"
    lineHeight: "1.1"
    letterSpacing: "0"
    fontWeight: "700"
  panel-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-xl)"
    lineHeight: "1.22"
    letterSpacing: "0"
    fontWeight: "650"
  body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-md)"
    lineHeight: "var(--dig-leading-normal)"
    letterSpacing: "0"
    fontWeight: "400"
  small-body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-sm)"
    lineHeight: "var(--dig-leading-normal)"
    letterSpacing: "0"
    fontWeight: "400"
  nav-chip:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-sm)"
    lineHeight: "1.2"
    letterSpacing: "0"
    fontWeight: "500"
  metric:
    fontFamily: "var(--dig-font-display)"
    fontSize: "48px"
    lineHeight: "1.04"
    letterSpacing: "0"
    fontWeight: "700"
```

## 间距与圆角

```css
--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 36px;
--dig-space-7: 56px;
--dig-space-8: 88px;

--dig-radius-sm: 10px;
--dig-radius-md: 18px;
--dig-radius-lg: 28px;
--dig-radius-xl: 40px;
--dig-radius-pill: 999px;
```

使用建议：

- 页面 shell 宽度：`1180px` 到 `1320px`
- hero 垂直 padding：`72px` 到 `112px`
- section 间距：`56px` 到 `88px`
- glass nav 高度：`48px` 到 `56px`
- 按钮高度：`40px` 到 `48px`
- chip 高度：`32px` 到 `38px`
- product tile 圆角：`28px` 到 `40px`
- 控制面板圆角：`18px` 到 `24px`

## Border / Shadow / Glass

```css
--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 12px 32px rgba(0, 0, 0, 0.08);
--dig-shadow-panel: 0 24px 70px rgba(0, 0, 0, 0.12);
--dig-shadow-float: 0 18px 48px rgba(0, 0, 0, 0.16);
--dig-glow-accent: 0 0 0 1px rgba(0, 113, 227, 0.2), 0 16px 42px rgba(0, 113, 227, 0.18);
--dig-glow-secondary: 0 0 0 1px rgba(125, 122, 255, 0.16), 0 18px 48px rgba(125, 122, 255, 0.16);
--dig-glass-blur: 24px;
```

规则：

- glass surface 必须保留可读性：背景 blur 不能让正文发灰。
- 阴影柔和、垂直、低饱和，不做厚重卡片阴影。
- border 多使用半透明黑，深色舞台中改为半透明白。
- glow 只能给可交互的主 CTA 或重点产品光泽，不用作背景装饰。

## Grid 与背景

```css
--dig-shell-max: 1240px;
--dig-grid-columns: 12;
--dig-grid-gutter: 24px;
--dig-grid-gutter-mobile: 16px;
--dig-grid-cell-min: 72px;
```

背景规则：

- 默认浅灰 `#f5f5f7`，重点区域用白色或轻微冷灰。
- 产品展示区可以使用大面积纯白、浅灰或局部深色舞台。
- 允许使用玻璃拟态浮层，但不使用离散光球、彩色噪声或厚重背景渐变。
- 内容优先：产品 mock、真实截图、状态数据和 CTA 永远比装饰更醒目。

## 组件级样式语言 (Components Strict Mapping)

```yaml
components:
  global-nav:
    backgroundColor: "var(--dig-surface)"
    backdropFilter: "blur(var(--dig-glass-blur))"
    borderBottom: "var(--dig-stroke-thin) solid var(--dig-border)"
    typography: "{typography.nav-chip}"
    height: "48px"
  hero:
    padding: "var(--dig-space-8) 0"
    textAlign: "center"
  product-stage:
    backgroundColor: "var(--dig-bg-soft)"
    rounded: "var(--dig-radius-xl)"
    padding: "var(--dig-space-6)"
  button-primary:
    backgroundColor: "var(--dig-accent)"
    textColor: "#ffffff"
    typography: "{typography.nav-chip}"
    rounded: "var(--dig-radius-pill)"
    padding: "8px 16px"
    border: "none"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "var(--dig-accent)"
    typography: "{typography.nav-chip}"
    rounded: "var(--dig-radius-pill)"
    padding: "8px 16px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  spec-chip:
    backgroundColor: "var(--dig-bg)"
    textColor: "var(--dig-text-muted)"
    typography: "{typography.small-body}"
    rounded: "var(--dig-radius-pill)"
    padding: "4px 12px"
  glass-panel:
    backgroundColor: "var(--dig-surface)"
    backdropFilter: "blur(var(--dig-glass-blur))"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
    rounded: "var(--dig-radius-md)"
    padding: "var(--dig-space-5)"
```

## 响应式行为策略 (Responsive Behavior)

- **断点规则**：
  - Desktop (`>= 1024px`)：采用 `1180px` 到 `1320px` 宽度的居中 shell，网格多列排布。
  - Tablet (`768px - 1023px`)：网格简化为 2 列，边距从 `88px` 缩减至 `56px`。
  - Mobile (`< 768px`)：强制 1 列，大圆角缩小为 `18px`，大外边距缩减至 `24px`。
- **触控与缩放**：
  - 移动端下，可交互控件最小高度 `44px`。
  - 输入框文字最小 `16px`。
- **排版折叠**：
  - Hero display 在移动端强制缩放至不超过 `48px`。
  - 产品长标题通过折行处理，不强行压缩 tracking。

## 交互规则

- hover：链接和按钮轻微加深，surface 可提高透明度或 shadow，不做夸张位移。
- active：按钮可降亮度，scale 最多 `0.99`。
- focus-visible：蓝色外环，必须清楚但不刺眼。
- transition：`160ms` 到 `260ms`，easing 使用 `cubic-bezier(0.2, 0.8, 0.2, 1)`。
- glass nav 在滚动时可以增强 blur 和边框，但不要遮挡内容。
- 动效应该像系统 UI 一样顺滑、克制、可预期。

## 内容与语气规则

- 标题短，直接讲产品名、能力名或明确结果。
- 副标题解释价值，不堆形容词。
- CTA 文案使用“了解更多”“立即开始”“查看演示”“获取更新”这类清楚动词。
- 数据表达要真实、具体、可解释，避免夸张营销语。
- 中文文案保持简洁，不使用网络感、拟人梗或过度情绪化表达。

## 禁止事项

- 不要使用 Apple logo、苹果产品官方图片、SF Symbols 专有图标集或 Apple 文案。
- 不要复制 apple.com 的具体页面结构、产品名组合或 hero 文案。
- 不要把页面做成蓝紫渐变 SaaS；Apple-inspired 的核心是留白、内容、材质和系统感。
- 不要滥用 glass blur，特别是正文容器和表格区域。
- 不要用过多圆角卡片堆叠，把页面变成普通 card grid。
