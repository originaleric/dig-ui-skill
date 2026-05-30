---
version: alpha
name: Binance
description: A confident financial-platform interface anchored on a deep near-black canvas, where Binance's iconic yellow (#FCD535) carries every primary CTA, brand accent, and value-claim moment. Type runs Binance's custom BinanceNova / BinancePlex stack at modest weights — the system trusts size and yellow voltage over bold weight. Marketing and product surfaces default to the dark theme; transactional surfaces (buy crypto, deposit, exchange) flip to a light theme that shares the same yellow CTAs and gray-blue hairlines. Trading green (up) and red (down) accents thread through both modes for price-direction signals.

colors:
  primary: "#fcd535"
  primary-active: "#f0b90b"
  primary-disabled: "#3a3a1f"
  ink: "#181a20"
  body: "#eaecef"
  body-on-light: "#181a20"
  muted: "#707a8a"
  muted-strong: "#929aa5"
  hairline-on-light: "#eaecef"
  hairline-on-dark: "#2b3139"
  border-strong: "#cdd1d6"
  canvas-light: "#ffffff"
  canvas-dark: "#0b0e11"
  surface-card-dark: "#1e2329"
  surface-elevated-dark: "#2b3139"
  surface-soft-light: "#fafafa"
  surface-strong-light: "#f5f5f5"
  on-primary: "#181a20"
  on-dark: "#ffffff"
  trading-up: "#0ecb81"
  trading-down: "#f6465d"
  accent-turquoise: "#2dbdb6"
  info: "#3b82f6"
  info-ring: "#3b82f6"

typography:
  hero-display:
    fontFamily: "BinanceNova, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px
  display-lg:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.5px
  display-md:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.3px
  display-sm:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  title-lg:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  title-sm:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  number-display:
    fontFamily: "BinancePlex, BinanceNova, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.3px
  number-md:
    fontFamily: "BinancePlex, BinanceNova, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  number-sm:
    fontFamily: "BinancePlex, BinanceNova, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  button:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "BinanceNova, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 40px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  button-primary-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 14px 32px
  button-secondary-on-dark:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  button-secondary-on-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.button}"
  button-trading-up:
    backgroundColor: "{colors.trading-up}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 8px 20px
  button-trading-down:
    backgroundColor: "{colors.trading-down}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 8px 20px
  button-subscribe:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 6px 16px
    height: 28px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  top-nav-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 64px
  top-nav-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-band-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.hero-display}"
    padding: 80px
  stat-callout-card:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.number-display}"
  trust-badge:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.lg}"
    padding: 16px 20px
  markets-table-card:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 24px
  markets-row:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.number-md}"
    padding: 12px 0
  price-up-cell:
    backgroundColor: transparent
    textColor: "{colors.trading-up}"
    typography: "{typography.number-md}"
  price-down-cell:
    backgroundColor: transparent
    textColor: "{colors.trading-down}"
    typography: "{typography.number-md}"
  search-input-on-dark:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 10px 16px
    height: 40px
  text-input-on-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 16px
    height: 40px
  funds-safu-band:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.primary}"
    typography: "{typography.display-lg}"
    padding: 80px
  feature-photo-card:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xl}"
  qr-promo-card:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  faq-row:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.md}"
    padding: 20px 0
  cta-band-dark:
    backgroundColor: "{colors.surface-card-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.xl}"
    padding: 48px
  arena-hero-gradient:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.primary}"
    typography: "{typography.display-lg}"
    padding: 80px
  cookie-consent-card:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  buy-crypto-amount-card:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.number-display}"
    rounded: "{rounded.lg}"
    padding: 24px
  steps-card:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.lg}"
    padding: 24px
  price-chart-card:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  conversion-cell:
    backgroundColor: transparent
    textColor: "{colors.body-on-light}"
    typography: "{typography.body-md}"
  trader-row:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    padding: 12px 0
  footer-light:
    backgroundColor: "{colors.surface-soft-light}"
    textColor: "{colors.body-on-light}"
    typography: "{typography.body-md}"
    padding: 64px
---

## Dig UI CSS Tokens

```css
css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #181a20;
--dig-text-muted: #eaecef;
--dig-text-soft: #707a8a;
--dig-accent: #fcd535;
--dig-accent-strong: #f0b90b;
--dig-accent-2: #fcd535;
--dig-accent-2-strong: #fcd535;
--dig-border: rgba(0,0,0,0.1);
--dig-border-strong: #cdd1d6;
--dig-grid-line: rgba(0,0,0,0.1);
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #3b82f6;

--dig-font-sans: BinanceNova, -apple-system, BlinkMacSystemFont, sans-serif;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 13px;
--dig-text-md: 14px;
--dig-text-lg: 16px;
--dig-text-xl: 20px;
--dig-text-2xl: 24px;
--dig-text-3xl: 32px;
--dig-text-4xl: 40px;
--dig-text-5xl: 48px;

--dig-radius-sm: 4px;
--dig-radius-md: 6px;
--dig-radius-lg: 8px;
--dig-radius-xl: 12px;
--dig-radius-pill: 9999px;

--dig-space-1: 8px;
--dig-space-2: 12px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 16px;
--dig-space-6: 24px;
--dig-space-7: 32px;
--dig-space-8: 48px;

--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 18px 48px rgba(0, 0, 0, 0.24);
--dig-shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.3);
--dig-leading-tight: 1.15;
--dig-leading-snug: 1.3;
--dig-leading-normal: 1.55;
--dig-leading-relaxed: 1.72;
--dig-tracking-tight: -0.03em;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.08em;
```

## 行业纵览 (Overview)

币安看起来像是一个金融交易平台，希望给人一种既权威又充满活力的感觉。基本氛围是**深近乎黑色的画布**（`{colors.canvas-dark}` — #0b0e11），带有白色字体和单一的、无处不在的口音：**币安黄**（`{colors.primary}` — #FCD535）。这种黄色几乎完成了该品牌的所有繁重工作——它承载了每一个主要的 CTA、每一个价值主张标题（“资金安全”）、每一个“注册”药丸、每一个特色等级指示器以及文字标记本身。没有次要品牌颜色。系统信任黄色电压来完成品牌工作，并且它携带它。

Type 运行 Binance 的自定义 **BinanceNova**（显示 + 正文）和 **BinancePlex**（数字/金融显示）堆栈。 BinanceNova 带有显示标题、章节标题和正文。 BinancePlex 出现在价格行情、大型统计数字（交易量、用户数量、奖池）上——任何数字想要感觉“表格化且可靠”的地方。两者都以适中的权重运行——显示尺寸使用权重 600-700（比典型的营销更大胆，因为交易平台需要数字一目了然），正文保持在 400。

该产品是**多主题**：营销界面（主页、智能货币、期货领域）默认为深色，而交易界面（购买加密货币、存款、取款）则翻转为浅色主题。相同的黄色 CTA 和灰蓝色细线 (`{colors.hairline-on-light}` — #eaecef) 贯穿两者 — 只有画布、表面和文本色调翻转。交易**绿色**（`{colors.trading-up}` — #0ecb81）和**红色**（`{colors.trading-down}` — #f6465d）在两种模式下的表格、图表和价格行情中显示价格方向。

**主要特征：**
- 单一强调色：`{colors.primary}` (#FCD535) 实现所有品牌电压 — 主要 CTA、英雄标题、品牌标志、徽章。很少在黑暗中用于强调，普遍用于事务性对话。
- 自定义类型堆栈：“BinanceNova”（显示 + 正文）和“BinancePlex”（数字、价格、财务数据）。大统计数据始终在 BinancePlex 中呈现，以保持表格一致性。
- 多主题：营销页面默认深色（`{colors.canvas-dark}`）；事务页面翻转灯光（`{colors.canvas-light}`）。黄色 CTA 和绿色/红色交易在两者之间共享。
- 深色主体上的浅色页脚：即使上面的主体是深色的，主页也使用“{colors.surface-soft-light}”（#fafafa）作为页脚——这是一种故意的反转，在视觉上关闭了页面。
- 交易语义：绿色向上/红色向下（`{colors.trading-up}` / `{colors.trading-down}`）表示价格变化，应用为文本颜色而不是徽章背景。
- 卡片表面：“{colors.surface-card-dark}”（#1e2329）用于在黑暗中提升卡片； `{colors.canvas-light}` 用于灯光卡片。没有渐变表面，没有大气背景——整个都是平面色块。
- 边框半径从小到中：“{rounded.md}”（6 像素）用于主按钮，“{rounded.lg}”（8 像素）用于输入和内容卡，“{rounded.xl}”（12 像素）用于提升卡容器，“{rounded.pill}”用于突出功能 CTA。
- 间距遵循 4 倍刻度；主要的编辑带位于“{spacing.section}”（80px）——比典型的仅营销网站稍紧，因为产品页面需要更密集的布局。## 颜色系统 (Colors)



### 品牌与主色
- **Binance Yellow** (`{colors.primary}` — #FCD535)：单一品牌颜色。用于主要 CTA 背景、文字标记、品牌声明标题（“资金安全”）、信任徽章（“第一交易量”）、“{component.stat-callout-card}”中的大统计数字以及内联链接。
- **Binance Yellow Active** (`{colors.primary-active}` — #f0b90b)：新闻/悬停变暗变体。黄色稍微饱和一些。
- **Binance Yellow Disabled** (`{colors.primary-disabled}` — #3a3a1f)：在深色画布上禁用的 CTA 上使用的去饱和深黄色。
- **强调绿松石色** (`{colors.accent-turquoise}` — #2dbdb6)：在 Smart Money 的“立即检查”CTA 上深色表面上很少使用的小型次要强调色。将其视为单一产品的强调色，而不是系统颜色。### 表面与背景
该系统有两种映射到产品上下文的画布模式：

**深色模式（营销默认）：**
- **Canvas Dark** (`{colors.canvas-dark}` — #0b0e11)：主页面地板。接近黑色，带有轻微的暖色调——绝不是纯黑色。
- **Surface Card Dark** (`{colors.surface-card-dark}` — #1e2329)：卡片、导航下拉菜单、深色画布上的辅助按钮、市场表。
- **Surface Elevated Dark** (`{colors.surface-elevated-dark}` — #2b3139)：更轻一步，用于嵌套卡片、悬停导航项和图表背景面板。

**轻型模式（事务性）：**
- **Canvas Light** (`{colors.canvas-light}` — #ffffff)：交易页面的页面底层（购买加密货币、存款表格、帐户对话框）。
- **表面柔光**（`{colors.surface-soft-light}` — #fafafa）：页脚表面和禁用状态。
- **表面强光**（`{colors.surface-strong-light}` — #f5f5f5）：在静音环境中形成输入背景。### Hairlines & Borders
- **灯光上的细线** (`{colors.hairline-on-light}` — #eaecef)：灯光表面上的 1px 边框色调。 Dembrandt 的频率分析证实这是计数最高的代币（出现 1022 次）——币安网大量使用细线。
- **深色发际线** (`{colors.hairline-on-dark}` — #2b3139)：深色表面上的 1px 边框色调。与“{colors.surface-elevated-dark}”相同的十六进制 - 边框感觉像表面台阶，而不是墨线。
- **边框强**（`{colors.border-strong}` — #cdd1d6）：在禁用的辅助按钮上使用较重的边框色调。### 文本色
- **Ink** (`{colors.ink}` — #181a20)：浅色表面上最强的文本。在交易页面上显示标题。
- **Body on Dark** (`{colors.body}` — #eaecef)：深色画布上的默认运行文本 — 故意不是纯白色，稍微凉爽一些。
- **Body on Light** (`{colors.body-on-light}` — #181a20)：与墨迹相同 — 光模式正文文本重复使用墨迹令牌。
- **静音** (`{colors.muted}` — #707a8a)：页脚链接、面包屑、标题、表格列标题。适用于浅色和深色画布。
- **Mated Strong** (`{colors.muted-strong}` — #929aa5)：用于强调标签的第二层静音。
- **On Primary** (`{colors.on-primary}` — #181a20)：黄色主要 CTA 上的黑色文本。
- **深色**（`{colors.on-dark}` — #ffffff）：纯白色，用于深色画布上的高对比度标题。### Trading Semantics
- **Trading Up** (`{colors.trading-up}` — #0ecb81)：价格上涨绿色，用作表格、图表和内联股票箭头中的文本颜色。切勿作为按钮背景。
- **Trading Down** (`{colors.trading-down}` — #f6465d)：价格下跌红色。使用规则与升级相同。### Info / Focus
- **信息** (`{colors.info}` — #3b82f6)：内联信息徽章和对焦环底座。 dembrandt 提出的 Tailwind ‘--tw-ring-color’ 标记 - 用于输入焦点。## 排版与字体系统 (Typography)



### 字体家族
该系统运行 **BinanceNova** 用于显示和正文，并运行 **BinancePlex** 用于数字/财务数据。两者都是币安授权的自定义字体。后备堆栈遍历“-apple-system、BlinkMacSystemFont、“Segoe UI”、Roboto、sans-serif”。

分割是功能性的，而不是装饰性的：
- BinanceNova → 编辑类型（标题、段落、按钮标签、导航）
- BinancePlex → 表格数字类型（价格、交易量、百分比、统计计数器、奖池）

混合它们不是可选的——价格行情上的 BinanceNova 会失去交易平台的特征； BinancePlex 放在一个段落上会感觉等宽冷淡。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 64 像素 | 700 | 1.1| -1 像素 |主页 h1（“316,258,026 用户信任我们”）|
| `{typography.display-lg}` | 48 像素 | 700 | 1.1| -0.5 像素 |品牌头条新闻（“资金安全”）、奖池英雄（“期货大师竞技场”）|
| `{typography.display-md}` | 40 像素 | 600 | 1.15 | 1.15 -0.3 像素 |长滚动页面上的章节标题 |
| `{typography.display-sm}` | 32 像素 | 600 | 1.2 | 1.2 0 | CTA 乐队头条新闻（“币安上安全、低费用的交易”）|
| `{typography.title-lg}` | 24 像素 | 600 | 1.3 | 1.3 0 |子章节标题 |
| `{typography.title-md}` | 20 像素 | 600 | 1.35 | 1.35 0 | QR 促销卡、特色卡标题 |
| `{typography.title-sm}` | 16 像素 | 600 | 1.4 | 1.4 0 |信任徽章、常见问题解答行、步骤标签 |
| `{typography.number-display}` | 40 像素 | 700 | 1.1| -0.3 像素 |大数据（15,000 BTC，429,423,449 美元）— BinancePlex |
| `{typography.number-md}` | 16 像素 | 500 | 500 1.4 | 1.4 0 |市场表价格、表格单元格 — BinancePlex |
| `{typography.number-sm}` | 14 像素 | 500 | 500 1.4 | 1.4 0 |内联价格，变化百分比 — BinancePlex |
| `{typography.body-md}` | 14 像素 | 400 | 1.5 | 1.5 0 |默认运行文本 — BinanceNova |
| `{typography.body-sm}` | 13 像素 | 400 | 1.5 | 1.5 0 | Cookie 同意文本、页脚正文 |
| `{typography.caption}` | 12 像素 | 500 | 500 1.4 | 1.4 0 |小元标签 |
| `{版式.按钮}` | 14 像素 | 600 | 1 | 0 |标准 CTA 按钮标签 |
| `{typography.nav-link}` | 14 像素 | 500 | 500 1.4 | 1.4 0 |顶部导航菜单项 |### 排版原则
显示尺寸使用重量 700 — 比大多数营销系统重。这对于交易平台来说是有意义的：数字需要一目了然，标题需要与图表可视化和密集的数据表竞争。系统不会像 Airtable 或 Stripe 那样将显示权重软化至 400。

`{typography.number-display}` 和较小的数字变体始终使用 **BinancePlex**，即使周围的主体类型使用 BinanceNova。无论上下文如何，价格、交易量和统计计数器都会在 BinancePlex 中呈现——这是系统的“可信数字”声音。### 字体备选说明
如果 BinanceNova 和 BinancePlex 不可用，**Inter** 是 BinanceNova 最接近的开源替代品，而 **JetBrains Mono** 或 **IBM Plex Sans** 是 BinancePlex 最接近的替代品（取决于表格等宽保真度是否比人文主义比例更重要）。将显示标题的行高降低约 3%，以匹配 BinanceNova 更严格的上限高度。## 布局与间距 (Layout)



### 间距系统
- **基本单位：** 4px。
- **标记：** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80 像素。
- **部分填充（垂直）：** `{spacing.section}` (80px) — 比飘逸的营销网站 (96px) 稍紧，因为币安页面将营销带与密集的产品表面（市场表格、FAQ 手风琴）混合在一起。
- **卡片内部填充：** `{spacing.lg}` (24px) 用于内容卡片和市场表格； “{spacing.xl}”（32 像素）用于 QR 促销卡和 CTA 条带； `{spacing.md}` (16px) 用于信任徽章和表行。
- **装订线：** 3-up 网格中的卡片之间的“{spacing.lg}”（24px）；页脚栏间距和密集的常见问题解答列表内的“{spacing.md}”（16px）。### 网格与容器
- **最大内容宽度：** ~1280px 以营销页面为中心；在水平密度很重要的产品表面（市场、智能货币桌子）上约 1440 像素。
- **编辑正文：** 单 12 列网格；产品页面常采用8/4分体（主面板+侧轨）。
- **市场表：** 5 列标题（货币对/最新价格/24 小时变化/24 小时交易量/操作），第一列带有硬币图标 + 符号对。
- **页脚：** 桌面上的 6 列链接列表，在平板电脑上换行为 2-up，在移动设备上换行为 1-up。### 留白哲学
币安比典型的营销网站更密集——长滚动页面将英雄乐队与市场表格、常见问题解答手风琴和功能网格混合在一起，它们之间没有太多喘息空间。系统信任对比度（黄色与深色画布、绿色与红色价格单元格）来完成视觉分离工作，而不是空白。在出现空白的地方，它总是统一的——每个主要带之间的“{spacing.section}”。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
|平|无阴影，无边框 |正文部分、顶部导航、英雄乐队、页脚 |
|柔软发际线| 1px `{colors.hairline-on-dark}` 或 `{colors.hairline-on-light}` |输入、表格分隔符、FAQ 行分隔符、辅助按钮 |
|卡面|深色画布上的“{colors.surface-card-dark}”背景，浅色背景上的“{colors.canvas-light}” - 无阴影 |所有升级卡（市场表卡、二维码促销卡、特色照片卡、信任徽章）|
|微妙的阴影|仅当卡片位于图像上方时才可见微弱的阴影 |在交易页面上的购买加密金额卡上谨慎使用 |
|对焦环| `0 0 0 2px {colors.info-ring}` 50% alpha |输入+按钮键盘焦点状态|

立面理念是**具有色块分离的平坦表面**。 Binance 不使用浓重的阴影或玻璃形态 - 深度来自“{colors.canvas-dark}”和“{colors.surface-card-dark}”之间的对比度（12 级亮度跳跃，读取为清晰的海拔边界）。### 装饰性深度
- **黄色→深色垂直渐变背景**在期货竞技场英雄上：“{colors.primary}”淡入“{colors.canvas-dark}”。这是用于产品发布/事件英雄表面的单页处理，而不是系统范围的签名。
- **硬币堆叠插图** 侧面大型统计块（3D 渲染的加密硬币、奖杯图标）。这些是插图，而不是标记——将其视为内容而不是设计系统表面。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 2 像素 |几乎没有用——保留给非常小的徽章|
| `{rounded.sm}` | 4 像素 |小型内联按钮（内联订阅、向上交易/向下交易）|
| `{rounded.md}` | 6 像素 |标准 CTA 按钮、主按钮、主输入字段 |
| `{rounded.lg}` | 8 像素 |搜索输入、内容卡、信任徽章、子卡 |
| `{rounded.xl}` | 12 像素 |高架卡片容器（市场桌卡、QR 促销卡、CTA 带）|
| `{rounded.pill}` | 9999 像素 |突出的功能 CTA（黑暗期货竞技场“立即加入”上的“注册”药丸）|
| `{rounded.full}` | 9999 像素 / 50% |硬币图标，头像|

币安的半径层次结构比典型的营销系统更严格——大多数表面位于 6-12 像素。药丸半径是一个故意的例外，用于表示“这是页面顶部的操作”。### Photography & Iconography
- 硬币图标呈现为 24×24 或 32×32 圆形字形（通常是圆形轮廓上的 50% 半径 + 内部硬币的品牌颜色）。
- 3D 渲染的硬币堆和奖杯插图是带有轻微地板阴影的全彩插图，而不是平面图标。
- 照片内容（使用应用程序的人部分）裁剪到“{rounded.xl}”（12 像素）角，在移动设备上采用全出血。## 核心组件 (Components)



### 顶部导航栏
**`top-nav-dark`** — 深色画布上的营销顶部导航。 64 像素高，“{colors.canvas-dark}”背景。左侧带有黄色币安文字标记，主要水平菜单（购买加密货币、市场、交易、期货、赚取、Square、智能货币、活动），带有语言选择器的右侧集群、明/暗切换、“登录”文本链接、“注册”“{component.button-primary}”。文字标记使用“{colors.primary}”表示“BINANCE”类型。

**`top-nav-light`** — 轻型画布上的交易顶部导航（购买加密货币、存款页面）。布局相同，但“{colors.canvas-light}”背景和“{colors.ink}”菜单项。### 按钮设计
**`button-primary`** — 签名主要 CTA。背景“{colors.primary}”，文本“{colors.on-primary}”（黄底黑字 - 系统的标志性组合），输入“{typography.button}”，内边距 12px × 24px，高度 40px，圆角“{rounded.md}”(6px)。按下状态：“button-primary-active”变暗为“{colors.primary-active}”(#f0b90b)。禁用状态：“button-primary-disabled”降低饱和度为“{colors.primary-disabled}”。

**`button-primary-pill`** — 主要 CTA 的较大药丸变体，用于页面顶部注册时刻和产品发布英雄（期货竞技场“立即加入”）。相同的黄色 + 黑色组合，内边距 14px × 32px，圆形“{rounded.pill}”(9999px)。谨慎使用——药丸是一个“这就是行动”的信号。

**`button-secondary-on-dark`** — 在 `{colors.canvas-dark}` 上使用，用于不太强调的操作。背景“{colors.surface-card-dark}”，文本“{colors.on-dark}”，圆形“{rounded.md}”。

**`button-secondary-on-light`** — 相当于 Light-canvas。背景“{colors.canvas-light}”，带有“{colors.hairline-on-light}”1px边框，文本“{colors.ink}”。

**`button-tertiary-text`** — 无背景的内嵌文本按钮。用于顶部导航中的“登录”和内联“阅读更多”链接。

**`button-trading-up`** — 用于价格上涨信号（买入/多头操作）的纯绿色按钮。背景“{colors.trading-up}”，文本“{colors.on-dark}”，圆形“{rounded.sm}”(4px)，内边距8px × 20px。比“{component.button-primary}”更小、更紧凑，因为它出现在密集的交易界面中。

**`button-trading-down`** — 用于卖出/空头操作的对称红色变体。相同的形状，背景“{colors.trading-down}”。

**`按钮订阅`** — Smart Money 交易者表中使用的紧凑型黄色 CTA，用于订阅顶级交易者。比主 CTA 更小的高度 (28 像素) 和更紧密的填充 - 适合密集的表格行。同样的黄+黑组合。

**`text-link`** — `{colors.primary}` 中的内联正文链接（深色为黄色，浅色也为黄色）。默认无下划线。类型继承`{typography.body-md}`。### 卡片与容器
**`hero-band-dark`** — 全宽暗带，带有主页 h1 + 副标题 + 双 CTA 对。背景“{colors.canvas-dark}”，填充“{spacing.section}”(80px)。 h1（“316,258,026 用户信任我们”）使用 64px / 700 的“{typography.hero-display}”——系统最大的字体角色。

**`stat-callout-card`** — 内联黄色统计数字（15,000 BTC、7,488,223、$429,423,449）。透明背景，文本“{colors.primary}”，在 BinancePlex 中输入“{typography.number-display}”。用作平面布局块，而不是带有表面的卡片 - 黄色文本本身就具有视觉重量。

**`信任徽章`** — 带有“第一客户服务”/“第一交易量”声明的小黑卡。背景 `{colors.surface-card-dark}`，圆形 `{rounded.lg}` (8px)，内边距 16px × 20px。黄色数字或文字徽章（“No.1”）位于短标签旁边。

**`markets-table-card`** — 主页右侧的市场表。背景“{colors.surface-card-dark}”，圆角“{rounded.xl}”(12px)，填充“{spacing.lg}”(24px)。包含一个选项卡行（热门/新上市/涨幅最大），然后是 5 列的硬币对行，其中包含最新价格、24 小时变化百分比、操作按钮。每行都使用“{component.markets-row}”。

**`markets-row`** — 市场表内的单行。透明背景、12 像素垂直内边距、行之间的细线分隔线。硬币图标（32×32）+左侧符号； `{typography.number-md}` (BinancePlex) 中的最新价格； 24小时按方向更改单元格颜色（“{component.price-up-cell}”或“{component.price-down-cell}”）；右对齐 V 形图标表示“查看详细信息”。

**`price-up-cell`** / **`price-down-cell`** — 用于价格变化的彩色文本单元格。透明背景，文本“{colors.trading-up}”或“{colors.trading-down}”，在 BinancePlex 中输入“{typography.number-md}”。始终与指示方向的小三角箭头配对。

**`特色照片卡`** — “随时随地交易”部分的照片条 — 3 张生活方式照片，展示人们使用币安应用程序的情况。背景“{colors.surface-card-dark}”，圆形“{rounded.xl}”。照片边到边裁剪，图像周围没有内部填充。

**`qr-promo-card`** — “随时随地进行交易。”带有二维码的卡。背景“{colors.surface-card-dark}”，圆形“{rounded.xl}”，填充“{spacing.xl}”(32px)。包含“{typography.title-md}”中的 h2、正文段落、应用商店徽章（iOS / Android）和居中的二维码。

**`funds-safu-band`** — 黄色标题的“FUNDS ARE SAFU”乐队。背景保持“{colors.canvas-dark}”，但标题在“{typography.display-lg}”处使用“{colors.primary}”。在标题下方，三个大的“{component.stat-callout-card}”数字锚定了该区间：BTC 总储备、用户帮助、资金回收。

**`faq-row`** — 单个 FAQ 手风琴行。透明背景，垂直内边距 20 像素，行之间有细线分隔线。关闭状态：“{typography.title-sm}”中的问题 + 右侧的 V 形图标。开放状态：“{typography.body-md}”中的问题+答案正文。

**`cta-band-dark`** — “币安上安全、低费用的交易”页脚前 CTA 带。背景“{colors.surface-card-dark}”（从画布升高一级），圆形“{rounded.xl}”，填充“{spacing.xxl}”（48px）。在“{typography.display-sm}”中携带 h2 和右对齐的“{component.button-primary}”。### Light-Mode Transactional Components
**`buy-crypto-amount-card`** — 购买 BTC 页面上的右轨卡。背景“{colors.canvas-light}”，圆形“{rounded.lg}”(8px)，填充“{spacing.lg}”(24px)。在“{typography.number-display}”（BinancePlex）中携带可编辑的金额输入、货币选择器和用于“继续”/“确认订单”的黄色“{component.button-primary}”。

**`steps-card`** — “如何购买加密货币”3 张卡（输入金额 → 确认订单 → 接收加密货币）。背景“{colors.canvas-light}”，圆角“{rounded.lg}”，填充“{spacing.lg}”。每张卡片都有一个小编号图标、“{typography.title-sm}”步骤名称和正文描述。

**`价格图表卡`** — 带有 BTC 价格图表的“比特币市场”卡。背景“{colors.canvas-light}”，圆形“{rounded.lg}”。顶行带有对选择器（$79,065.04，+0.45%）；主要区域是“{colors.trading-up}”和“{colors.trading-down}”中的烛台/折线图；底行带有时间范围选择器（24H / 1W / 1M / 3M / 1Y / ALL）。

**`conversion-cell`** — BTC ↔ USD 转换表中的一行。透明背景，文本“{colors.body-on-light}”，输入“{typography.body-md}”。左侧配对标签（BTC、USDT等）；右侧为等值美元。### 输入框与表单
**`search-input-on-dark`** — 主页英雄上的“搜索货币”输入。背景“{colors.surface-card-dark}”，文本“{colors.on-dark}”，圆形“{rounded.lg}”(8px)，内边距10px × 16px，高度40px。右侧带有黄色的“{component.button-primary-pill}”（“注册”）。

**`text-input-on-light`** — 交易页面上的标准输入。背景 `{colors.canvas-light}`，1px `{colors.hairline-on-light}` 边框，圆形 `{rounded.md}` (6px)，内边距 10px × 16px，高度 40px。对焦状态继承对焦环阴影。

**`cookie-consent-card`** — 主页上可见的 cookie 横幅卡。背景“{colors.canvas-light}”，圆形“{rounded.lg}”，填充“{spacing.md}”(16px)。正文采用“{typography.body-sm}”（13px / 400），具有三个堆叠按钮选项（接受 Cookie 并继续/拒绝其他 Cookie/管理 Cookie）。### Smart Money Sub-System
**`trader-row`** — /smart-money 上顶级交易者表中的一行。透明背景，垂直内边距 12 像素，行之间有细线分隔线。左侧头像+交易者姓名+私人/公共徽章； ROI %、AUM、创建日期列；右侧黄色“{component.button-subscribe}”。### Signature Components
**`arena-hero-gradient`** — Futures Arena 产品发布英雄。从顶部的“{colors.primary}”到底部的“{colors.canvas-dark}”的垂直渐变，“{typography.display-lg}”中的奖池标题（4,000,000 USDT）居中。 “{component.button-primary-pill}”（“立即加入”）位于标题下方。仅用于产品发布活动界面 - 不要推广到其他英雄。### Footer
**`footer-light`** — 关闭每个页面（包括深色画布页面）的浅灰色页脚。背景“{colors.surface-soft-light}”(#fafafa)，文本“{colors.body-on-light}”。桌面上的 6 列链接列表涵盖社区/关于我们/产品/业务/服务/学习列。垂直内边距 64 像素。深色页面上特意设计的浅色页脚是币安最独特的布局选择之一——它在视觉上以“营销重置”表面关闭页面。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 为主要操作、品牌声明标题和文字标记保留“{colors.primary}”（Binance Yellow）。切勿将其用于次要或装饰目的——黄色的稀缺性使其具有强大的力量。
- 保留“{component.button-primary}”（黄色、黑色文本）作为深色和浅色模式下的通用主要 CTA。相同的按钮在“{colors.canvas-dark}”和“{colors.canvas-light}”上显示相同。
- 仅对明确的买入/卖出或多头/空头操作使用“{component.button-trading-up}”（绿色）和“{component.button-trading-down}”（红色）。切勿将它们用于一般的“确认”或“取消”，因为它们带有语义上的价格方向含义。
- 对每个数字使用 BinancePlex。价格、交易量、百分比、统计计数器——全部都在 BinancePlex 上。将 BinanceNova 混合到数字代码中会破坏交易平台的特性。
- 根据表面意图选择画布模式：黑暗用于营销/产品展示/交易仪表板；用于交易对话框的灯光（购买/存款/取款/表单提交）。
- 使用“{spacing.section}”（80 像素）锚定每个编辑带。币安比空洞的营销网站更密集——80px 是正确的节奏。### 禁止事项
- 不要引入第二种品牌颜色。该系统只有一个重音（“{colors.primary}”），任何扩展都会淡化品牌形象。 Smart Money上的绿松石是一个单一产品的实验，而不是一个系统代币。
- 不要将黄色用于正文或大表面填充。它仅适用于焦点 CTA 和头条新闻。
- 不要使用“{colors.trading-up}”/“{colors.trading-down}”作为卡片上的背景填充。它们是价格方向信号，以文本颜色或小徽章填充的形式表示，而不是以卡片表面的形式表示。
- 不要减轻显示器的重量。 `{typography.hero-display}` 和 `{typography.display-lg}` 有意将权重设置为 700 — 将 400 读作设计组合，而不是交易平台。
- 不要在画布上添加大气渐变（网格、极光、发光效果）。币安信任色块对比——增加大气深度会使交易平台的感觉变得混乱。
- 不要反转“{component.button-primary}”的文本颜色。黄底黑字是该系统的标志——黄底白字失去了对比度和品牌识别度。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|手机 | < 768 像素 |顶部导航栏变成了汉堡包； Hero h1 从 64px 下降到 ~36px；市场表转换为水平滚动的卡片列表；演示网格下降到 1-up；页脚 6 列换行为 2 |
|平板电脑| 768–1024 像素 |顶部导航保持水平但收紧，二级菜单项隐藏在“更多”下拉菜单后面；市场表 2-up；定价/功能网格 2-up |
|桌面| 1024–1440 像素 |包含所有主菜单项的完整顶部导航； 5 列市场表； 8/4 分割的交易仪表板（图表 + 侧栏）|
|宽| > 1440 像素 |与台式机相同，外部呼吸空间更大；最大内容宽度上限为 1280-1440px，具体取决于表面 |### Touch Targets
- 主要 CTA 渲染至少为 40 × 40 像素（`{component.button-primary}` 高度 + 填充）— 符合 WCAG AAA 的 44 × 44 和周围间距。
- 订阅/内联操作按钮为 28 × 28 — 比理想情况更密集，但符合行业交易平台规范。
- 市场表格中的硬币图标为 32 × 32 像素，整行可点击以获得 44 像素以上的有效目标。### Collapsing Strategy
- 顶部导航在 < 768px 时折叠成汉堡包；菜单将作为全屏工作表打开，并在工作表底部固定有相同的黄色口音 CTA。
- 市场表格在移动设备上回流至每个币对的可水平滚动的单张卡。
- 英雄统计数据（“3.16 亿用户”）按比例缩小而不是回缩 - 币安最大的主张必须始终解读为单个区块。
- 交易仪表板从图表+侧轨切换到仅图表，并在移动设备上使用单独的“交易”选项卡。
- 浅色页脚在每个断点处保持全出血 - 它不会折叠成单独的深色变体。### Image Behavior
- 无论断点如何，硬币图标都保持固定的 24/32px 大小。
- “随时随地交易”部分中的生活方式照片可响应式裁剪 - 在桌面上更宽，在移动设备上更高（垂直）。
- 3D 硬币堆叠插图是固定纵横比的资产，可以均匀缩放而无需裁剪。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。直接引用其 YAML 键（“{component.button-primary}”、“{component.markets-row}”）。
2. 添加新组件时，首先决定它是处于深色模式（营销/产品）还是浅色模式（事务）。两者中出现相同的组件，但表面色调翻转。
3. 现有组件的变体（`-active`、`-disabled`）作为单独的条目存在于 `components:` 中，而不是作为嵌套状态对象。
4. 在散文中提到颜色、半径、排版角色或间距值的地方使用“{token.refs}”。
5. 切勿记录悬停。系统仅记录默认和活动/按下状态。
6. Numbers始终使用BinancePlex；复制始终使用 BinanceNova。混合它们是一种系统违规。
7. 交易绿色/红色是语义价格代币——永远不要将它们重新用于“成功”或“错误”通用状态。## 已知局限与补充说明 (Known Gaps)

- dembrandt 频率分析器捕获“#eaecef”（浅色细线，计数 1022）作为最高频率标记。品牌定义的“{colors.primary}”（#FCD535）出现的频率要低得多，因为它几乎不用作重音——它的系统角色必须从屏幕截图中确认。
- BinanceNova 和 BinancePlex 权重轴值并未形式化为可变字体标记 - 仅记录屏幕截图中观察到的静态权重。
- 动画和过渡时间（图表重绘、价格变化闪烁）不在范围内。
- 不会提取超出“{component.text-input-on-light}”默认值的表单验证状态 - 错误/成功输入变体将需要注册或订单确认流程来确认。
- 交易仪表板表面（现货/期货/保证金）不在分析的 URL 集中；他们的订单簿、蜡烛图配置和头寸管理卡未在此处记录。
- 亮/暗主题切换行为（交易页面是否可以根据用户偏好强制变暗）是产品行为，而不是从营销界面提取的。
