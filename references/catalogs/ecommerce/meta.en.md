---
version: alpha
name: Meta
description: Meta's design system spans hardware commerce (Quest VR, Ray-Ban Meta AI glasses) and brand surfaces with a confident product-merchandising voice. The system pairs a stark white canvas with full-bleed photographic product cards, a confident Optimistic VF wordmark/headline face, dual-CTA hero patterns (black primary + outlined secondary), and a saturated cobalt blue (#0064E0) for in-product purchase actions. Pill-shaped 100px-radius buttons, generous 24-32px card rounding, and tight three-tier text hierarchy carry across homepage, product detail (PDP), buy-now configurator, and accessory subpages.

colors:
  primary: "#0064e0"
  primary-deep: "#0457cb"
  primary-soft: "#0091ff"
  on-primary: "#ffffff"
  ink-button: "#000000"
  on-ink-button: "#ffffff"
  fb-blue: "#1876f2"
  meta-link: "#385898"
  oculus-purple: "#a121ce"
  success: "#31a24c"
  success-bg: "#24e400"
  attention: "#f2a918"
  warning: "#f7b928"
  warning-bg: "#ffe200"
  critical: "#e41e3f"
  critical-strong: "#f0284a"
  canvas: "#ffffff"
  surface-soft: "#f1f4f7"
  ink-deep: "#0a1317"
  ink: "#1c1e21"
  charcoal: "#444950"
  slate: "#4b4c4f"
  steel: "#5d6c7b"
  stone: "#8595a4"
  hairline: "#ced0d4"
  hairline-soft: "#dee3e9"
  disabled-text: "#bcc0c4"

typography:
  hero-display:
    fontFamily: Optimistic VF
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.16
    fontFeature: "ss01, ss02"
  display-lg:
    fontFamily: Optimistic VF
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.17
    fontFeature: "ss01, ss02"
  heading-lg:
    fontFamily: Optimistic VF
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.28
    fontFeature: "ss01, ss02"
  heading-md:
    fontFamily: Optimistic VF
    fontSize: 28px
    fontWeight: 300
    lineHeight: 1.21
    fontFeature: "ss01, ss02"
  heading-sm:
    fontFamily: Optimistic VF
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
    fontFeature: "ss01, ss02"
  subtitle-lg:
    fontFamily: Optimistic VF
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.44
  subtitle-md:
    fontFamily: Optimistic VF
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  body-md-bold:
    fontFamily: Optimistic VF
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.50
    letterSpacing: -0.16px
  body-md:
    fontFamily: Optimistic VF
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.16px
  body-sm-bold:
    fontFamily: Optimistic VF
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: -0.14px
  body-sm:
    fontFamily: Optimistic VF
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: -0.14px
  caption-bold:
    fontFamily: Optimistic VF
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
  caption:
    fontFamily: Optimistic VF
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
  button-md:
    fontFamily: Optimistic VF
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: -0.14px
  link-md:
    fontFamily: Optimistic VF
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.50
    letterSpacing: -0.16px

rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 16px
  xxl: 24px
  xxxl: 32px
  feature: 40px
  full: 100px
  circle: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 10px
  md: 12px
  base: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  section-sm: 48px
  section: 64px
  section-lg: 80px
  hero: 120px

components:
  button-primary:
    backgroundColor: "{colors.ink-button}"
    textColor: "{colors.on-ink-button}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "14px 30px"
  button-primary-pressed:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.on-ink-button}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled-text}"
    textColor: "{colors.canvas}"
  button-buy-cta:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "14px 30px"
  button-buy-cta-pressed:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-deep}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    border: "2px solid {colors.ink-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-deep}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "10px 22px"
    border: "2px solid rgba(10, 19, 23, 0.12)"
  button-pill-tab:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-bold}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
    border: "1px solid {colors.hairline}"
  button-pill-tab-active:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.canvas}"
  button-icon-circular:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: 40px
  card-product-feature:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline-soft}"
  card-feature-photo:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xxxl}"
    padding: "0"
    border: "none"
  card-promo-strip:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.section}"
  card-icon-feature:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  card-checkout-summary:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline-soft}"
    shadow: "rgba(20, 22, 26, 0.3) 0px 1px 4px 0px"
  product-thumbnail:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.xl}"
    padding: "{spacing.base}"
    aspect-ratio: "1 / 1"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
    border: "1px solid {colors.hairline}"
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.fb-blue}"
  text-input-error:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.critical-strong}"
  search-pill:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.md} {spacing.lg}"
    height: 40px
  radio-option:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid rgba(10, 19, 23, 0.12)"
  radio-option-selected:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    border: "2px solid #0143b5"
  color-swatch-circle:
    rounded: "{rounded.circle}"
    size: 32px
    border: "2px solid {colors.canvas}"
  badge-promo-yellow:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-attention:
    backgroundColor: "{colors.attention}"
    textColor: "{colors.canvas}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.canvas}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-critical:
    backgroundColor: "{colors.critical}"
    textColor: "{colors.canvas}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  promo-banner:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-sm-bold}"
    padding: "{spacing.md} {spacing.xl}"
  faq-accordion-item:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline-soft}"
  why-buy-tile:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl} {spacing.xl}"
    border: "1px solid {colors.hairline-soft}"
  warranty-card:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.xxl}"
    padding: "{spacing.xxl}"
  footer-region:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm}"
    padding: "{spacing.section} {spacing.xxl}"
    border: "1px solid {colors.hairline-soft}"
  hero-band-marketing:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.canvas}"
    typography: "{typography.hero-display}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.section-lg}"
  product-gallery-pdp:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xxxl}"
    padding: "{spacing.base}"
  color-sku-picker-row:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.lg}"
    padding: "{spacing.base}"
  feature-icon-row:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline-soft}"
  tech-specs-table:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.hairline-soft}"
  testimonial-customer-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline-soft}"
---

## Dig UI CSS Tokens

```css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #1c1e21;
--dig-text-muted: #1c1e21;
--dig-text-soft: #1c1e21;
--dig-accent: #0064e0;
--dig-accent-strong: #0064e0;
--dig-accent-2: #0064e0;
--dig-accent-2-strong: #0064e0;
--dig-border: #ced0d4;
--dig-border-strong: #ced0d4;
--dig-grid-line: #dee3e9;
--dig-success: #31a24c;
--dig-warning: #f7b928;
--dig-danger: #f06a6a;
--dig-info: #0064e0;

--dig-font-sans: Optimistic VF;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 24px;
--dig-text-2xl: 28px;
--dig-text-3xl: 36px;
--dig-text-4xl: 48px;
--dig-text-5xl: 64px;

--dig-radius-sm: 4px;
--dig-radius-md: 6px;
--dig-radius-lg: 8px;
--dig-radius-xl: 16px;
--dig-radius-pill: 9999px;

--dig-space-1: 8px;
--dig-space-2: 10px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 12px;
--dig-space-6: 20px;
--dig-space-7: 24px;
--dig-space-8: 32px;

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

Meta 的商务界面（主页、Quest 配置器、Ray-Ban 产品详细信息、处方页面）看起来就像是一个自信的硬件销售商。品牌的声音是摄影第一：大型、全出血的产品图像在首屏空间中占据主导地位，其余部分则由空白和紧凑的印刷层次结构占据。该系统具有可识别的双 CTA 模式 - 营销界面上的黑色药丸形状的主色在立即购买流程中转变为饱和的钴蓝色 ({colors.primary})，并与用于辅助导航的轮廓幽灵按钮配对。

乐观的 VF——Meta 的可变显示面——锚定了整个系统，范围从 64 像素的英雄显示到 12 像素的标题。脸部的“ss01”和“ss02”风格集在每个标题角色中切换，有助于该品牌略显人文主义、友好的几何特征。低于 768px 时，系统会彻底崩溃：英雄堆叠，药丸导航变成汉堡包，三层功能网格扁平化为单列，产品配置器将其右轨摘要放入粘性底部栏中。

**主要特征：**
- 纯白色画布 ({colors.canvas}) 带有全出血产品摄影，展示瓷砖上带有“{rounded.xxxl}” (32px) 角柔化
- 两层主按钮系统：营销 CTA 使用 {colors.ink-button} 药丸；商业 CTA 在立即购买面板中使用 {colors.primary} 钴丸
- 乐观的VF作为通用显示器+体面具有一致的`ss01，ss02` OpenType特征
- 药丸形按钮 ({rounded.full}) 和“{rounded.xxxl}”/“{rounded.feature}”卡片作为主要几何签名
- 饱和促销横幅（黄色{colors.warning}、深色{colors.ink-deep}）在导航上方谨慎使用，以提供有时限的优惠
- 无卡镀铬的照相功能卡（无边框、无阴影）——产品图像是表面处理## 颜色系统 (Colors)

> 来源页面：meta.com/（主页）、/ai-glasses/ray-ban-meta-skyler-gen-2/（PDP）、/quest/quest-3s/buy-now/（配置器）、/ai-glasses/prescription/（镜片追加销售）。所有四个页面的令牌覆盖率都是相同的——设计系统是真正统一的。### 品牌与主色
- **钴原色** ({colors.primary})：立即购买的 CTA 颜色。用于商务流程和右轨购买面板内的每个“添加到购物车”、“配置”、“预订”按钮。
- **深钴色** ({colors.primary-deep})：钴原色的压制状态和深色表面变体；也是活动链接颜色。
- **软钴色** ({colors.primary-soft})：用于信息标注的半透明背景色调（“{colors.primary-soft}”，15% Alpha）。
- **Facebook Blue** ({colors.fb-blue})：选定的单选/复选框状态和内联表单控件激活颜色。
- **Meta Link Blue** ({colors.meta-link})：保留用于传统导航和页脚链接功能。
- **Oculus Purple** ({colors.oculus-purple})：VR 产品强调 — 用于 Quest 品牌表面以强调类别。### 表面与背景
- **画布白色** ({colors.canvas})：页面背景和主卡片表面。
- **Soft Cloud** ({colors.surface-soft})：微妙的产品缩略图和保修卡背景；也是搜索药丸休息状态。
- **发际线灰色** ({colors.hairline})：1px 输入边框和表单控制分隔线。
- **Hairline Soft** ({colors.hairline-soft})：用于卡片、页脚分隔符和分节符的更安静的分隔符。### 文本色
- **深墨** ({colors.ink-deep})：浅色表面上的主要标题和正文文本。
- **Ink** ({colors.ink})：标准正文和辅助标题文本。
- **木炭** ({colors.charcoal})：第三级正文文本和表单按钮标签。
- **Slate** ({colors.slate})：节标题副本和支持缩微副本。
- **Steel** ({colors.steel})：更安静的标题文本和页脚链接层次结构。
- **Stone** ({colors.stone})：禁用或不强调的标签。### 语义色
- **成功** ({colors.success})：“有货”、“免费退货”确认。
- **注意** ({colors.attention})：中等优先级警报和定时标注。
- **警告** ({colors.warning})：促销横幅（“享受 25% 折扣……”）和限时标签。
- **严重** ({colors.ritic})：验证错误、破坏性反馈。
- **Critical Strong** ({colors.ritic-strong})：表单输入错误边框和内联错误标签。## 排版与字体系统 (Typography)



### 字体家族
**Optimistic VF** 是 Meta 专有的可变显示面。后备字体：Montserrat、Helvetica、Arial、Noto Sans。变量轴的范围从 300（轻标题-md，用于编辑介绍标题，如“展望”）到 500（显示、英雄、标题-sm），直至 700（副标题、正文强调、按钮标签）。文体集“ss01”和“ss02”在每个标题角色中都会打开——它们软化了几何形状，并赋予字体略带人文气息。

辅助 Helvetica 后备链用于规格表和页脚细则内的技术缩微副本 (12px)。### 字体层级
|代币|尺寸|重量 |行高|字母间距|开放式 |使用 |
|---|---|---|---|---|---|---|
| `{typography.hero-display}` | 64 像素 | 500 | 500 1.16 | 1.16 0 | SS01、SS02 |主页英雄（“享受 25% 折扣……”，类别开场白）|
| `{typography.display-lg}` | 48 像素 | 500 | 500 1.17 | 1.17 0 | SS01、SS02 |部分开启显示器（“专为处方而设计。为舒适而打造。”）|
| `{typography.heading-lg}` | 36 像素 | 500 | 500 1.28 | 1.28 0 | SS01、SS02 |小节标题（“为什么从 Meta 购买”、“技术规格”）|
| `{typography.heading-md}` | 28 像素 | 300 | 300 1.21 | 1.21 0 | SS01、SS02 |重量较轻的编辑副标题（“展望未来”、“为处方而打造”）|
| `{typography.heading-sm}` | 24 像素 | 500 | 500 1.25 | 1.25 0 | SS01、SS02 |卡片标题、功能图块标题 |
| `{typography.subtitle-lg}` | 18 像素 | 700 | 1.44 | 1.44 0 | — |粗体标注、常见问题标题 |
| `{typography.subtitle-md}` | 18 像素 | 400 | 1.44 | 1.44 0 | — |正文主线和较长的字幕 |
| `{typography.body-md}` | 16 像素 | 400 | 1.50 | 1.50 -0.16 像素 | — |主要正文 |
| `{typography.body-md-bold}` | 16 像素 | 700 | 1.50 | 1.50 -0.16 像素 | — |身体强调和链接-md |
| `{typography.body-sm}` | 14 像素 | 400 | 1.43 | 1.43 -0.14 像素 | — |辅助正文，辅助文本 |
| `{typography.body-sm-bold}` | 14 像素 | 700 | 1.43 | 1.43 -0.14 像素 | — |药丸标签、页脚标题 |
| `{typography.caption-bold}` | 12 像素 | 700 | 1.33 | 1.33 0 | — |徽章标签、时间戳 |
| `{typography.caption}` | 12 像素 | 400 | 1.33 | 1.33 0 | — |页脚细则、合法缩微副本 |
| `{typography.button-md}` | 14 像素 | 700 | 1.43 | 1.43 -0.14 像素 | — |药丸按钮标签|
| `{typography.link-md}` | 16 像素 | 700 | 1.50 | 1.50 -0.16 像素 | — |内嵌导航链接|### 排版原则
- 身体角色上的负字母间距（`-0.14px` 到 `-0.16px`）会稍微收紧字体 — Optimistic VF 是为这种舒适但不压缩的设置而设计的。
- 编辑副标题使用 300 字重在 500 字重的显示标题和 400 字重的正文之间引入视觉休息，从而创建三层视觉节奏。
- 所有标题都带有“ss01，ss02”风格集 - 该设计将它们视为配对的替代包，从来没有一个没有另一个。
- 按钮、药丸选项卡和页脚标题共享“{typography.body-sm-bold}”（14px / 700 / -0.14px），在交互元素之间创建紧密的视觉关系。## 布局与间距 (Layout)



### 间距系统
- **基本单位**：4 像素增量，8 像素作为主要步长。
- **标记**：`{spacing.xxs}` (4px) · `{spacing.xs}` (8px) · `{spacing.sm}` (10px) · `{spacing.md}` (12px) · `{spacing.base}` (16px) · `{spacing.lg}` (20px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.xxxl}` (40px) · `{spacing.section-sm}` (48px) · `{spacing.section}` (64px) · `{spacing.section-lg}` (80px) · `{spacing.hero}` (120px)。
- **部分节奏**：营销部分以“{spacing.section-lg}”（80px）分开；产品详细信息部分压缩为“{spacing.section}”（64px）；常见问题解答堆栈进一步收紧至“{spacing.xxl}”（32 像素）。
- **卡内部填充**：标准 `{spacing.xxl}` (32px)；图标功能图块压缩为“{spacing.xl}”（24px）；促销条卡扩展到“{spacing.section}”（64px）以显示英雄的存在。### 网格与容器
- 营销页面最大宽度约为 1280 像素，间距为 32–48 像素。
- PDP 布局使用 2 列分割：英雄画廊（约 58% 宽度）+ 粘性购买栏（约 42%，栏上有“最大宽度：380px”）。
- 三合一功能网格（“为什么从 Meta 购买”）使用 24px 列间隙；六联产品缩略图行（颜色/SKU 选择器）使用 12 像素间隙。### 留白哲学
空白是产品摄影第一。英雄部分为产品图像提供了视口高度的 50-70%；副本被给予氧气以在“{spacing.xxl}”上方和下方的“{spacing.xxxl}”块中呼吸。在配置器内部，空白区域收紧——立即购买面板信息密集，选项组之间有“{spacing.base}”到“{spacing.lg}”的节奏。## 层级与深度 (Elevation & Depth)

该系统主要是平坦运行的。标高是为两个交互层保留的：

|水平|治疗 |使用 |
|---|---|---|
| 0（平）|没有影子； `{rounded.xxxl}` 舍入 + `{colors.hairline-soft}` 边框 |默认产品卡，为什么购买瓷砖|
| 1（微妙）| `rgba(0, 0, 0, 0.2) 1 像素 1 像素 0 像素 0 像素` |药丸标签激活指示器|
| 2（粘性面板）| `rgba(20, 22, 26, 0.3) 0px 1px 4px 0px` | PDP右轨购买汇总，粘性移动结帐栏|### 装饰性深度
- 摄影作为深度：“{rounded.xxxl}”卡片上的全出血产品图像可营造没有阴影的大气层次感。
- 半透明叠加（`rgba(255, 255, 255, 0.1)` 到 `rgba(10, 19, 23, 0.12)`）覆盖深色英雄摄影，以提高叠加文本的易读性。
- 配件卡内的装饰性柔和色调 - 柔和的粉色、冰蓝色、薄荷色 - 短暂出现在产品切口后面，但并未正式化为系统标记（视为照片内容）。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 2 像素 |内联复选框标记、精美的 UI 角 |
| `{rounded.sm}` | 4 像素 |标签、微控制器|
| `{rounded.md}` | 6 像素 |方形缩略图四舍五入|
| `{rounded.lg}` | 8 像素 |表单输入、单选选项容器 |
| `{rounded.xl}` | 16 像素 |标准功能卡、常见问题解答手风琴项目 |
| `{rounded.xxl}` | 24 像素 |保修/配件瓷砖、幽灵式行动卡|
| `{rounded.xxxl}` | 32 像素 |摄影专题卡、大促销条|
| `{rounded.feature}` | 40 像素 |配件英雄面板，“专为处方而打造”卡|
| `{rounded.full}` | 100 像素 |药丸按钮、标签芯片、徽章 |
| `{rounded.circle}` | 50% |颜色样本，圆形图标按钮|### Photography Geometry
- 产品英雄摄影比矩形更频繁地位于“{rounded.xxxl}”（32px）框架中。
- 颜色/材质样本是完美的圆形（“{rounded.circle}”，直径 32 像素，选择时为 2 像素白色边框环）。
- 方形产品缩略图（`宽高比：1/1`）使用`{rounded.xl}`舍入。
- 六合一“颜色和 SKU”选择器行使用具有“{rounded.lg}”（8px）角的 1:1 宽高比图块 — 比英雄摄影框架更紧密，以区分选择网格上下文和展示上下文。## 核心组件 (Components)

> 根据无悬停策略，以下任何组件的悬停状态均未记录。仅默认和按下/活动状态。### 按钮设计
**`button-primary`** — 用于营销界面（“商店”、“预订”）的黑色药丸主要 CTA。
- 背景“{colors.ink-button}”、文本“{colors.on-ink-button}”、排版“{typography.button-md}”、填充“14px 30px”、圆形“{rounded.full}”。
- 按下状态“button-primary-pressed”将背景翻转为“{colors.charcoal}”。
- 禁用状态“button-primary-disabled”使用“{colors.disabled-text}”背景。

**`button-buy-cta`** — 用于商业流程的钴丸主要 CTA（“添加到购物车”、“配置”、“继续”）。
- 背景“{colors.primary}”，文本“{colors.on-primary}”，排版“{typography.button-md}”，填充“14px 30px”，圆形“{rounded.full}”。
- 按下状态“button-buy-cta-pressed”将背景加深到“{colors.primary-deep}”。
- 此变体仅出现在立即购买配置器和 PDP 购买轨道内。营销界面使用“button-primary”代替。

**`按钮辅助`** — 概述幽灵 CTA，通常与双 CTA 英雄模式中的主要配对。
- 背景透明，文本“{colors.ink-deep}”，边框“2px实心{colors.ink-deep}”，排版“{typography.button-md}”，填充“12px 28px”，圆角“{rounded.full}”。

**`button-ghost`** — 用于第三级 CTA 的更安静的轮廓变体。
- 背景透明，文本“{colors.ink-deep}”，边框“2px 实心 rgba(10, 19, 23, 0.12)”，排版“{typography.button-md}”，填充“10px 22px”，圆形“{rounded.full}”。

**`button-pill-tab`** + **`button-pill-tab-active`** — 页面顶部类别导航药丸（“眼镜/任务/应用程序”）。
- 无效：背景“{colors.canvas}”、文本“{colors.ink}”、边框“1px 实线{colors.hairline}”、填充“8px 16px”、圆角“{rounded.full}”。
- 活动：背景“{colors.ink-deep}”，文本“{colors.canvas}”。活动状态下没有边框 - 黑色填充取代它。

**`button-icon-circular`** — 40×40px 圆形实用按钮（轮播箭头、分享、收藏夹）。
- 背景“{colors.canvas}”，图标颜色“{colors.ink}”，圆形“{rounded.circle}”。### 卡片与容器
**`卡片产品功能`** — 带有产品照片和副本的白色功能卡（主页“专为运动而设计”、“高级。从内到外。”）。
- 背景“{colors.canvas}”、圆形“{rounded.xxxl}”、填充“{spacing.xxl}”、边框“1px 实线{colors.hairline-soft}”。

**`卡片特色照片`** — 无镀铬的边对边摄影展示瓷砖（主页“专为处方而打造”全出血眼镜卡）。
- 背景“{colors.canvas}”（仅在角落可见），圆形“{rounded.xxxl}”，无填充，无边框。图像填满卡片；副本以白色覆盖在左下角。

**`card-promo-strip`** — 带有嵌入式副本 + CTA 的深色全角促销卡（主页“Meta Quest 带来虚拟现实的魔力”宽条）。
- 背景“{colors.ink-deep}”、文本“{colors.canvas}”、圆形“{rounded.xxxl}”、填充“{spacing.section}”。

**`card-icon-feature`** — 带有线条图标、标题和简短副本的三部分功能图块（“2 天免费送货”、“30 天免费退货”、“无忧保修”、“立即购买，稍后付款”）。
- 背景“{colors.canvas}”、圆形“{rounded.xl}”、填充“{spacing.xl}”、边框“1px 实线{colors.hairline-soft}”。

**`card-checkout-summary`** — PDP 右栏粘性摘要，包含标题、价格、颜色选择器、“添加到购物车”按钮。
- 背景`{colors.canvas}`，圆形`{rounded.xl}`，填充`{spacing.xl}`，边框`1pxsolid {colors.hairline-soft}`，阴影`rgba(20, 22, 26, 0.3) 0px 1px 4px 0px`。

**`产品缩略图`** — 用于颜色/SKU 选择器和“人们也购买”行的方形产品图像单元。
- 背景“{colors.surface-soft}”、圆角“{rounded.xl}”、填充“{spacing.base}”、宽高比“1 / 1”。

**`保修卡`** — 保修 + 财务优惠的促销标注（“1 年保修”、“Meta Horizo​​n+”）。
- 背景“{colors.surface-soft}”，圆角“{rounded.xxl}”，填充“{spacing.xxl}”。使用柔和色调的变体以获得额外的好处。

**`为什么购买瓷砖`** — 位于较低营销区域的 4 层安心瓷砖行。
- 背景“{colors.canvas}”、圆形“{rounded.xl}”、填充“{spacing.xxl} {spacing.xl}”、边框“1px 实线{colors.hairline-soft}”。标题为“{typography.subtitle-lg}”，正文为“{typography.body-sm}”。### 输入框与表单
**`文本输入`** — 标准表单字段（页脚电子邮件订阅、支持表单）。
- 背景“{colors.canvas}”，文本“{colors.ink}”，边框“1px实线{colors.hairline}”，圆形“{rounded.lg}”，填充“{spacing.md}”，高度44px。

**`以文本输入为中心`** — 激活状态。
- 边框切换为“2px 实心{colors.fb-blue}”。

**`text-input-error`** — 验证错误状态。
- 边框切换为“1px 实线{colors.ritic-strong}”；下面“{colors.ritic-strong}”“{typography.body-sm}”中的错误标签。

**`search-pill`** — 顶部导航搜索字段。
- 背景“{colors.surface-soft}”，文本“{colors.steel}”，排版“{typography.body-sm}”，圆形“{rounded.full}”，高度40px。

**`radio-option`** + **`radio-option-selected`** — 配置器选项卡（存储、颜色变体、运输选项）。
- 不活动：背景“{colors.canvas}”、圆形“{rounded.lg}”、填充“{spacing.lg}”、边框“1px 实心 rgba(10, 19, 23, 0.12)”。
- 选定：边框切换为“2pxsolid #0143b5”（深钴色）——钴色主题持续存在于表单控制选择信号中。

**`color-swatch-circle`** — 圆形颜色/材料选择器（雷朋镜框饰面、玻璃颜色）。
- 32 像素直径、“{rounded.circle}”、“2 像素实心 {colors.canvas}” 环选择样本自身的填充颜色。### Badges & Status
**`badge-promo-yellow`** — 限时优惠筹码（“限时”、“促销”）。
- 背景“{colors.warning}”，文本“{colors.ink-deep}”，排版“{typography.caption-bold}”，圆形“{rounded.full}”，填充“4px 10px”。

**`badge-attention`** — 中等优先级状态指示器（“几乎消失”、“销售很快”）。
- 背景“{colors.attention}”，文本“{colors.canvas}”，排版“{typography.caption-bold}”，圆形“{rounded.full}”，填充“4px 10px”。

**`徽章成功`** — 肯定状态（“有货”、“已验证”、“免费送货”）。
- 背景“{colors.success}”，文本“{colors.canvas}”，排版“{typography.caption-bold}”，圆形“{rounded.full}”，填充“4px 10px”。

**`徽章关键`** — 紧急/破坏性标签（“缺货”、“停产”、错误芯片）。
- 背景“{colors.ritic}”、文本“{colors.canvas}”、排版“{typography.caption-bold}”、圆形“{rounded.full}”、填充“4px 10px”。

**`促销横幅`** — 顶部导航上方的粘性全宽促销条（“销售排名第一的 AI 眼镜可享受 25% 的折扣”）。
- 背景“{colors.ink-deep}”（或黄色促销变体的“{colors.warning}”）、文本“{colors.canvas}”（或黄色上的“{colors.ink-deep}”）、版式“{typography.body-sm-bold}”、填充“{spacing.md} {spacing.xl}”。包含一行报价副本以及内嵌 CTA 链接。### Navigation
**顶部导航（桌面）** — 带有类别药丸选项卡、搜索、帐户、购物车的粘性白色栏。
- 背景“{colors.canvas}”，高度约 64px，底部“1px 实心{colors.hairline-soft}”。
- 左：元文字标记徽标（61×14 像素）。中心：药丸标签类别导航。右：搜索药丸 + 圆形图标按钮（帐户、购物车）。

**顶部导航（移动）** — 压缩为徽标 + 汉堡包 + 购物车图标。药丸标签导航滑入 768 像素以下的全屏抽屉中。

**促销横幅** — 导航上方的全宽条带，用于限时优惠。
- 背景“{colors.ink-deep}”或“{colors.warning}”（黄色）、文本“{colors.canvas}”或“{colors.ink-deep}”、排版“{typography.body-sm-bold}”、填充“{spacing.md} {spacing.xl}”。带有一行报价副本+内嵌链接。

**面包屑 (PDP)** — 产品英雄上方的内嵌路径（“眼镜 › Ray-Ban Meta › Skyler (Gen 2)”）。
- 版式“{typography.body-sm}”，“{colors.stone}”中的分隔点，“{colors.ink}”中的活动叶，“{colors.steel}”中的父链接。### Signature Components
**`英雄乐队营销`** — 全出血摄影英雄，带有重叠副本 + 双 CTA 对。
- 在深色或摄影背景上进行边对边产品摄影。将副本覆盖为“{typography.hero-display}”白色。标题下方：`{typography.subtitle-md}` 中的 1 行副标题，然后是 `button-primary` + `button-secondary` 对。

**`product-gallery-pdp`** — 产品详细信息页面主要英雄：左侧 4 向上垂直缩略图条，大产品图像中心，右侧粘性购买栏。
- 缩略图：80×80px、“{rounded.lg}”、“{colors.surface-soft}”背景、1px“{colors.hairline-soft}”边框（活动边框切换到“{colors.ink-deep}”）。
- 主图像区域：桌面上〜720×720px，“{rounded.xxxl}”舍入，摄影表面。
- 粘性栏使用“卡结帐摘要”。

**`color-sku-picker-row`** — 方形产品变体的六格网格，每个产品变体下方都有名称 + 价格。
- 平铺背景“{colors.surface-soft}”，圆形“{rounded.lg}”，图像填充“{spacing.base}”。活动图块边框切换为“2px 实线{colors.ink-deep}”。磁贴下方：“{typography.body-sm-bold}”中的变体名称和“{typography.body-sm}”中的价格。

**`功能图标行`** — 四大放心福利（“2 天免费送货”、“30 天免费退货”、“无忧保修”、“立即购买，稍后付款”）。
- 4 列网格，每个单元格使用“card-icon-feature”镀铬，顶部有一个 32px 线图标，标题“{typography.subtitle-lg}”，正文“{typography.body-sm}”。

**`faq-accordion`** — 可扩展问答项目的垂直堆栈。
- 每个项目都使用“faq-accordion-item”镀铬。左边是“{typography.subtitle-lg}”中的问题，右边是 V 形图标（“{colors.steel}”，20px）。扩展的答案放在下面的“{typography.body-md}”文本中，并带有“{spacing.base}”顶部填充。

**`tech-specs-table`** — 产品规格的两列键/值表。
- 行布局：左侧规格标签 (`{typography.body-sm-bold}` `{colors.ink}`)，右侧规格值 (`{typography.body-sm}` `{colors.charcoal}`)。行分隔符“1px 实线{colors.hairline-soft}”。每个规范组上方的“{typography.heading-sm}”中的部分标题。

**`客户评价卡`** — 带作者 + 引用 + 照片的小型编辑卡。
- 背景“{colors.canvas}”、圆形“{rounded.xl}”、填充“{spacing.xxl}”、边框“1px 实线{colors.hairline-soft}”。头像圆圈 40px，署名在“{typography.body-sm-bold}”中，引用在“{typography.body-md}”中。

**`footer-region`** — 密集的多列站点页脚。
- 背景“{colors.canvas}”，顶部边框“1px 实线{colors.hairline-soft}”，填充“{spacing.section} {spacing.xxl}”。六个列组，其中节标题位于“{typography.body-sm-bold}”“{colors.ink}”中，链接列表位于“{typography.body-sm}”“{colors.steel}”中。底行包含语言选择器、区域选择器、“{typography.caption}”“{colors.stone}”中的法律链接。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 仅为立即购买的 CTA 保留“{colors.primary}”（钴色）——它的视觉重量是有意义的，因为它不会出现在营销页面上。
- 使用“{colors.ink-button}”（黑色）作为营销表面的主要 CTA。与辅助操作的“{colors.button-secondary}”幽灵轮廓配对。
- 将“{rounded.full}”应用于每个按钮、每个类别药丸、每个徽章、每个筹码 - 在 Meta 的系统中按钮永远不会是方形的。
- 将“{rounded.xl}”应用于摄影产品卡，并将“{rounded.xl}”应用于图标功能图块，以保持可见的卡层次结构对比度。
- 为任何乐观 VF 航向同时打开“ss01、ss02”。任何一种风格都离不开另一种风格。
- 使用 300 字重的“{typography.heading-md}”作为编辑小标题 - 它在 500 字重的显示屏上创建了品牌标志性的视觉节奏。### 禁止事项
- 不要使用“{colors.primary}”（钴色）作为营销表面的主按钮 - 它与 Meta 的品牌历史定位（白色画布上的黑色 CTA 营销）相冲突。
- 不要引入钴色 + Oculus 紫色以外的其他强调色。硬件品牌在产品摄影之外故意采用单色。
- 不要软化“{rounded.full}”下方药丸按钮的角。该药丸是一个品牌标志。
- 不要在没有四舍五入的情况下运行功能卡 - “{rounded.xxxl}”是任何摄影表面的最小值。
- 不要将 `{typography.body-md}` 行高降低到 1.50 以下 - 负字母间距已经收紧了度量标准，任何进一步的压缩都会破坏易读性。
- 不要在营销卡上应用浓重的阴影。提升是一个商流信号，而不是营销繁荣。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|移动（小）| < 480 像素 |单列。英雄文本降至“{typography.display-lg}”或更小。药丸标签折叠到汉堡抽屉里。 PDP 画廊堆叠在采购轨道上方；导轨变得粘底栏。 |
|移动（大）| 480 – 767 像素 |与小型相同，但功能图块呈现为两部分。 |
|平板电脑| 768 – 1023 像素 |两列特征网格。药丸标签导航返回。 PDP 画廊 + 购买轨道以压缩比例 (~60/40) 并排渲染。 |
|桌面| 1024 – 1359 像素 |完整的三层和四层功能网格；完整的药丸标签类别导航；标准 58/42 分割的 PDP。 |
|宽桌面| ≥ 1360 像素 |与桌面相同，具有更宽的英雄排水沟和更大的产品摄影。 |### Touch Targets
- 药丸按钮以 40–44px 有效高度渲染（带有 14px 按钮文本 + `14px 30px` 填充）。 WCAG AAA 44 像素地板上方。
- 圆形图标按钮为 40×40px — 在 AA 层；通过覆盖在移动设备上达到 44×44px。
- 颜色样本圆圈为 32×32 像素。为了击中 AAA，样本周围有一个 12 像素的清晰击中区域（有效击中目标约 56 像素）。
- 表单输入以 44px 高度呈现，以与主按钮高度对齐。### Collapsing Strategy
- **促销横幅**在所有断点处保持全宽；在小型移动设备上用省略号截断，保留内联链接可供性。
- **药丸标签导航**低于 768 像素，折叠成汉堡抽屉；活动选项卡呈现为关闭导航内的标签。
- **PDP 布局**：图库堆叠在购买摘要上方，< 1024 像素；摘要变成一个粘性底栏，价格 +“添加到购物车”按钮 < 768 像素。完整的摘要仍然可以在粘滞栏上方滚动。
- **功能网格**（3 向上、4 向上）在 768–1023 像素处折叠为 2 向上，在 < 768 像素处折叠为 1 向上。卡片填充在 1-up 断点处从“{spacing.xxl}”压缩到“{spacing.xl}”。
- **英雄排版**：“{typography.hero-display}”（64 像素）在 < 768 像素时下降为“{typography.heading-lg}”（36 像素），在 < 480 像素时下降为“{typography.heading-sm}”（24 像素）。
- **页脚**：6 列桌面布局在平板电脑上重排为 2 列，在移动设备上重排为手风琴式折叠组。### Image Behavior
- 产品摄影使用 1:1（缩略图、颜色选择器）、4:3（PDP 图库）和 16:9（主页宣传条）比例。
- 英雄摄影是全出血的，带有“{rounded.xxxl}”角；在折叠下方延迟加载。
- 产品变体图像在所有断点上保留其“{rounded.lg}”缩略图 - 它们在移动设备上永远不会显示全角。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。系统内部一致性高——小精度胜复合。
2. 直接引用组件名称和标记（“{colors.primary}”、“{component-name}-pressed”、“{rounded.full}”）——不要转述。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”以捕获损坏的参考、对比度问题、孤立的标记。
4. 添加新变体作为单独的“组件：”条目（“-pressed”、“-disabled”、“-focused”）——不要将它们埋在散文中。
5. 正文默认为“{typography.body-md}”，强调部分默认为“{typography.subtitle-lg}”。标题通过“hero-display→display-lg→heading-lg→heading-md→heading-sm”逐步下降。
6. 保持“{colors.primary}”（钴）稀缺。如果它出现在视口上的立即购买流程之外，请询问该表面是否真的需要看起来像结帐面板。
7. 始终为药丸形按钮（`{rounded.full}`）；方形按钮在此设计语言中表示“第三方小部件”，应从任何工作表面中过滤掉。## 已知局限与补充说明 (Known Gaps)

- 非按钮表单控件（切换、多选）的选定/选中状态在捕获的表面上不可见 - 按照“radio-option-selected”中的钴白图案实现。
- 不提取动画/过渡时间；建议主表面过渡采用 150–250 毫秒的缓出，手风琴展开/折叠采用 300 毫秒的缓入。
- 未定义画布、表面、墨水和细线的特定暗模式标记值；该品牌尚未在这些商业页面上公开公开的暗模式令牌集。
- 配件卡内的柔和装饰色调（淡粉色、冰蓝色、薄荷色）在视觉上出现，但并未正式化 - 将它们视为照片内容，而不是系统颜色。
