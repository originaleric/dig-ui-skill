---
version: alpha
name: MongoDB
description: MongoDB carries a strong dual-mode visual identity — dark deep-teal hero bands with bright MongoDB green ({colors.brand-green}) CTAs paired with stark white documentation surfaces. The signature green pill button is unmistakable across product, pricing, learning, and AI use-case surfaces. The system uses Euclid Circular A as its display face, anchors a 3-tier pricing comparison (Free / Flex / Dedicated), and presents extensive course catalogs in card grids with colored category tags. Coverage spans homepage, Atlas product page, Community Edition, MongoDB University, AI use cases, and pricing.

colors:
  primary: "#00ed64"
  primary-deep: "#00b545"
  primary-pressed: "#008c34"
  on-primary: "#001e2b"
  brand-green: "#00ed64"
  brand-green-dark: "#00684a"
  brand-green-mid: "#00a35c"
  brand-green-soft: "#c3f0d2"
  brand-teal-deep: "#001e2b"
  brand-teal: "#003d4f"
  brand-teal-mid: "#00684a"
  accent-purple: "#7b3ff2"
  accent-orange: "#fa6e39"
  accent-pink: "#f06bb8"
  accent-blue: "#3d4f9f"
  semantic-warning-bg: "#fff8e0"
  semantic-warning-text: "#946f3f"
  canvas: "#ffffff"
  canvas-dark: "#001e2b"
  surface: "#f9fbfa"
  surface-soft: "#f4f7f6"
  surface-feature: "#e3fcef"
  hairline: "#e1e5e8"
  hairline-soft: "#eceff1"
  hairline-strong: "#c1ccd6"
  hairline-dark: "#1c2d38"
  ink: "#001e2b"
  charcoal: "#1c2d38"
  slate: "#3d4f5b"
  steel: "#5c6c7a"
  stone: "#7c8c9a"
  muted: "#a8b3bc"
  on-dark: "#ffffff"
  on-dark-muted: "#a8b3bc"

typography:
  hero-display:
    fontFamily: Euclid Circular A
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.10
    letterSpacing: -1.5px
  display-lg:
    fontFamily: Euclid Circular A
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -1px
  heading-1:
    fontFamily: Euclid Circular A
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: -0.5px
  heading-2:
    fontFamily: Euclid Circular A
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.5px
  heading-3:
    fontFamily: Euclid Circular A
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.30
  heading-4:
    fontFamily: Euclid Circular A
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.35
  heading-5:
    fontFamily: Euclid Circular A
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.40
  subtitle:
    fontFamily: Euclid Circular A
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.50
  body-md:
    fontFamily: Euclid Circular A
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  body-md-medium:
    fontFamily: Euclid Circular A
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.55
  body-sm:
    fontFamily: Euclid Circular A
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
  body-sm-medium:
    fontFamily: Euclid Circular A
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.50
  caption:
    fontFamily: Euclid Circular A
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.40
  caption-bold:
    fontFamily: Euclid Circular A
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.40
  micro:
    fontFamily: Euclid Circular A
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.40
  micro-uppercase:
    fontFamily: Euclid Circular A
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 1px
  button-md:
    fontFamily: Euclid Circular A
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.30
  code-md:
    fontFamily: Source Code Pro
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  section-sm: 48px
  section: 64px
  section-lg: 96px
  hero: 120px

components:
  button-primary:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "10px 22px"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.muted}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "10px 22px"
    border: "1px solid {colors.hairline-strong}"
  button-on-dark:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "10px 22px"
  button-secondary-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "10px 22px"
    border: "1px solid {colors.hairline-dark}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.brand-green-dark}"
    typography: "{typography.body-sm-medium}"
    padding: "0"
  card-base:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline}"
  card-feature:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline}"
  card-product-deploy:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline}"
  card-feature-dark:
    backgroundColor: "{colors.brand-teal-deep}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
  card-course:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline}"
  card-cert:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline}"
  pricing-card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline}"
  pricing-card-featured:
    backgroundColor: "{colors.surface-feature}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
    border: "2px solid {colors.brand-green}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    border: "1px solid {colors.hairline-strong}"
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.brand-green-dark}"
  search-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.steel}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    height: 44px
    border: "1px solid {colors.hairline-strong}"
  search-pill-large:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.steel}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    height: 56px
    border: "1px solid {colors.hairline-strong}"
  pill-tab:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm-medium}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.md}"
    border: "1px solid {colors.hairline}"
  pill-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    border: "1px solid {colors.ink}"
  segmented-tab:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm-medium}"
    padding: "{spacing.sm} {spacing.md}"
    border: "0 0 2px transparent solid"
  segmented-tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.brand-green-dark}"
    typography: "{typography.body-sm-medium}"
    border: "0 0 2px {colors.brand-green-dark} solid"
  badge-green:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-green-soft:
    backgroundColor: "{colors.brand-green-soft}"
    textColor: "{colors.brand-green-dark}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-purple:
    backgroundColor: "{colors.accent-purple}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-orange:
    backgroundColor: "{colors.accent-orange}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-popular:
    backgroundColor: "{colors.brand-teal-deep}"
    textColor: "{colors.brand-green}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  promo-banner:
    backgroundColor: "{colors.brand-teal-deep}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm-medium}"
    padding: "{spacing.sm} {spacing.md}"
  hero-band-dark:
    backgroundColor: "{colors.brand-teal-deep}"
    textColor: "{colors.on-dark}"
    rounded: "0"
    padding: "{spacing.hero}"
  hero-platform-card:
    backgroundColor: "{colors.brand-teal-mid}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
  cta-banner-dark:
    backgroundColor: "{colors.brand-teal-deep}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.section}"
  code-block:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  code-mockup-card:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  comparison-table:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  comparison-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: "{spacing.md} {spacing.lg}"
    border: "0 0 1px {colors.hairline-soft} solid"
  service-tile:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline}"
  why-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  customer-testimonial-card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline}"
  logo-wall-item:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.body-md-medium}"
    padding: "{spacing.lg}"
  faq-accordion-item:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
    border: "0 0 1px {colors.hairline} solid"
  footer-region:
    backgroundColor: "{colors.brand-teal-deep}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: "{spacing.section} {spacing.xxl}"
  footer-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-sm}"
    padding: "{spacing.xxs} 0"
---

## Dig UI CSS Tokens

```css
--dig-bg: #ffffff;
--dig-bg-soft: #f9fbfa;
--dig-surface: #f9fbfa;
--dig-surface-strong: #f9fbfa;
--dig-surface-elevated: #f9fbfa;
--dig-text: #001e2b;
--dig-text-muted: #a8b3bc;
--dig-text-soft: #a8b3bc;
--dig-accent: #00ed64;
--dig-accent-strong: #00ed64;
--dig-accent-2: #00ed64;
--dig-accent-2-strong: #00ed64;
--dig-border: #e1e5e8;
--dig-border-strong: #c1ccd6;
--dig-grid-line: #eceff1;
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #00ed64;

--dig-font-sans: Euclid Circular A;
--dig-font-mono: Source Code Pro;
--dig-font-serif: serif;

--dig-text-xs: 11px;
--dig-text-sm: 12px;
--dig-text-md: 13px;
--dig-text-lg: 14px;
--dig-text-xl: 16px;
--dig-text-2xl: 18px;
--dig-text-3xl: 22px;
--dig-text-4xl: 28px;
--dig-text-5xl: 36px;

--dig-radius-sm: 6px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 16px;
--dig-radius-pill: 9999px;

--dig-space-1: 8px;
--dig-space-2: 12px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 16px;
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

MongoDB 具有强烈的双模式视觉标识 — 深色深青色英雄带与明显无误的明亮 MongoDB 绿色 ({colors.brand-green}) CTA 药丸搭配鲜明的白色文档和定价表面。主页打开时显示“一个数据平台。无限的人工智能潜力”。标题是深海军英雄，绿色药丸坐在视觉中心作为主要 CTA。在页面下方，嵌入的代码模型卡（终端美学）位于黑色英雄带上，分解为下面的白色功能卡。定价页面呈现 3 层比较（免费/灵活/专用），其中特色层以柔和的薄荷色背景和亮绿色边框突出显示。 MongoDB 大学页面显示了一个课程目录网格，其中每个图块都带有一个彩色类别标签（橙色、紫色、绿色、青色）——这些是 MongoDB 的类别编码强调色，也是品牌绿色之外唯一出现饱和颜色的地方。

该系统使用欧几里得圆A作为其显示面。脸部是现代几何形状——自信但不过分俏皮——并且与数据库产品的开发工具美学和学习表面的教育定位自然搭配。卡片使用“{rounded.lg}”（12px）角；按钮普遍使用“{rounded.full}”药丸。品牌青色调色板 ({colors.brand-teal-deep}) 锚定英雄带、页脚、代码模型和深色 CTA 横幅。

**主要特征：**
- 深海军蓝/青色英雄乐队 ({colors.brand-teal-deep}) 搭配明亮的 MongoDB 绿色 ({colors.brand-green}) CTA 药丸
- 纯白色定价/文档表面，带有课程瓷砖的彩色类别标签（紫色、橙色、绿色、青色）
- 欧几里得圆 A 横跨每个 UI 表面
- 药丸形按钮 ({rounded.full}) 和 12px 圆形卡片
- 3 级定价比较（免费/灵活/专用）以及特色薄荷亮点级别
- 带有终端审美深色画布的代码样机卡## 颜色系统 (Colors)

> 源页面：mongodb.com/（主页）、/products/platform/atlas-database（Atlas 产品）、/products/self-management/community-edition、learn.mongodb.com/（MongoDB 大学）、/solutions/use-cases/artificial-intelligence (AI)、/pricing（三层比较）。所有六个页面的令牌覆盖率都是相同的。### 品牌与主色
- **MongoDB Green** ({colors.brand-green})：品牌最容易识别的信号——明亮的药丸-CTA颜色
- **Green Dark** ({colors.brand-green-dark})：内联链接颜色，次要绿色
- **中绿** ({colors.brand-green-mid})：中光谱绿色，营造大气色调
- **Green Soft** ({colors.brand-green-soft})：浅薄荷色背景色调，用于成功徽章和特色定价层
- **品牌深青色** ({colors.brand-teal-deep})：英雄乐队的深海军蓝，页脚
- **品牌青色** ({colors.brand-teal})：中光谱青色
- **Brand Teal Mid** ({colors.brand-teal-mid})：英雄平台卡的浅青色### Category Accent (Course Tags)
- **Accent Purple** ({colors.accent-purple})：“数据库与安全”的课程标签
- **Accent Orange** ({colors.accent-orange})：“搜索”的课程标签
- **强调粉红色** ({colors.accent-pink})：课程标签变体
- **Accent Blue** ({colors.accent-blue})：atlas/cloud 主题的课程标签变体### 表面与背景
- **画布白色** ({colors.canvas})：页面背景和主卡表面
- **Canvas Dark** ({colors.canvas-dark})：代码块背景，深色样机画布
- **表面** ({colors.surface})：微妙的部分背景，搜索药丸休息
- **表面柔和** ({colors.surface-soft})：更安静的部分划分
- **表面特征** ({colors.surface-feature})：淡薄荷色背景，用于特色定价层
- **发际线** ({colors.hairline})：1px 边框和主分隔线
- **Hairline Soft** ({colors.hairline-soft})：更安静的分隔线
- **发际线强** ({colors.hairline-strong})：更强的 1px 输入边框
- **发际线深色** ({colors.hairline-dark})：深色表面上的边框### 文本色
- **Ink** ({colors.ink})：主要标题和正文（深海军蓝）
- **木炭** ({colors.charcoal})：强调身体
- **Slate** ({colors.slate})：辅助文本
- **Steel** ({colors.steel})：第三级文本、标题
- **Stone** ({colors.stone})：静音标签
- **静音** ({colors.muted})：禁用，占位符
- **深色** ({colors.on-dark})：深色表面上的白色文本
- **深色静音** ({colors.on-dark-muted})：降低不透明度的白色### 语义色
- **警告背景** ({colors.semantic-warning-bg})：淡黄色标注背景
- **警告文本** ({colors.semantic-warning-text})：警告状态复制颜色## 排版与字体系统 (Typography)



### 字体家族
**Euclid Circular A**（主要）：MongoDB 的几何无衬线字体。后备：-apple-system、BlinkMacSystemFont、“Segoe UI”、Roboto、sans-serif。
**Source Code Pro**（代码）：用于代码模型的等宽字体。后备：“SF Mono”、Menlo、Consolas、等宽字体。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 72 像素 | 500 | 500 1.10 | 1.10 -1.5 像素 | Hero（“一个数据平台”）|
| `{typography.display-lg}` | 56 像素 | 500 | 500 1.15 | 1.15 -1 像素 |主要部分开场白 |
| `{typography.heading-1}` | 48 像素 | 500 | 500 1.20 | 1.20 -0.5 像素 |页面级标题 |
| `{typography.heading-2}` | 36 像素 | 500 | 500 1.25 | 1.25 -0.5 像素 |小节标题|
| `{typography.heading-3}` | 28 像素 | 500 | 500 1.30 | 1.30 0 |卡片标题|
| `{typography.heading-4}` | 22 像素 | 500 | 500 1.35 | 1.35 0 |功能图块标题 |
| `{typography.heading-5}` | 18 像素 | 600 | 1.40 | 1.40 0 |较小的卡片标题，常见问题解答 |
| `{版式.subtitle}` | 18 像素 | 400 | 1.50 | 1.50 0 |英雄字幕、主角正文|
| `{typography.body-md}` | 16 像素 | 400 | 1.55 | 1.55 0 |主要正文 |
| `{typography.body-sm}` | 14 像素 | 400 | 1.50 | 1.50 0 |次要主体、表格单元 |
| `{typography.body-sm-medium}` | 14 像素 | 500 | 500 1.50 | 1.50 0 |活动侧边栏、按钮标签 |
| `{typography.caption-bold}` | 13 像素 | 600 | 1.40 | 1.40 0 |徽章标签|
| `{typography.micro-uppercase}` | 11 像素 | 600 | 1.40 | 1.40 1 像素 |截面眉毛，课程类别标签|
| `{typography.button-md}` | 14 像素 | 600 | 1.30 | 1.30 0 |药丸按钮标签|
| `{typography.code-md}` | 14 像素 | 400 | 1.55 | 1.55 0 |代码模型|### 排版原则
- 72px 显示屏上的紧英雄领先 (1.10)
- 显示尺寸上的负字母间距（-1.5px 到 -0.5px）
- 为按钮和小重点（常见问题解答标题、徽章）预留 600 的重量
- 宽大的主体领先（1.55），提高技术文档的可读性## 布局与间距 (Layout)



### 间距系统
- **基本单位**：4px（8px主要增量）
- **令牌**：`{spacing.xxs}` (4px) 到 `{spacing.hero}` (120px)
- **部分节奏**：营销页面使用“{spacing.section-lg}”（96px）；定价收紧至“{spacing.section}”（64px）### 网格与容器
- 最大宽度为 1280 像素，装订线为 32 像素
- 定价：3层卡排，密集功能对比表如下
- 学习目录：3-up 课程网格、4-up 认证网格
- AI用例：带有大气插图的2列英雄### 留白哲学
营销界面为内容提供了充足的呼吸空间——“{spacing.hero}”（120px）英雄填充深青色带。定价/学习表面急剧收紧。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0（平）|没有影子； `{colors.hairline}` 边框 |默认卡片、表格行|
| 1（微妙）| `rgba(0, 30, 43, 0.04) 0px 1px 2px 0px` |悬停高架瓷砖|
| 2（卡）| `rgba(0, 30, 43, 0.08) 0px 4px 12px 0px` |功能卡|
| 3（模型）| `rgba(0, 30, 43, 0.12) 0px 12px 24px -4px` |英雄代码模型 |
| 4（模态）| `rgba(0, 30, 43, 0.16) 0px 16px 48px -8px` |模态框、下拉菜单 |### 装饰性深度
- 深青色英雄乐队带有大气梯度深度
- 英雄上的代码模型卡使用具有终端美感的画布深色表面
- 淡薄荷色定价功能层使用品牌色调的阴影## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 4 像素 |课程类别标签 |
| `{rounded.sm}` | 6 像素 |类型徽章、代码芯片 |
| `{rounded.md}` | 8 像素 |输入、搜索药丸、代码块 |
| `{rounded.lg}` | 12 像素 |卡片、定价等级、课程图块 |
| `{rounded.xl}` | 16 像素 |更大的功能面板|
| `{rounded.xxl}` | 24 像素 |特色产品展示 |
| `{rounded.full}` | 9999 像素 |所有按钮、状态徽章 |### Photography Geometry
- 英雄插图位于全出血深色背景上
- 课程图块缩略图使用“{rounded.lg}”角
- 客户徽标墙：文字标记高度一致为 60–80 像素## 核心组件 (Components)

> 根据无悬停政策，悬停状态不会被记录。仅默认和按下/活动状态。### 按钮设计
**`button-primary`** — 明亮的 MongoDB 绿色药丸主要 CTA，主导操作。
- 背景“{colors.brand-green}”，文本“{colors.on-primary}”（深海军蓝），排版“{typography.button-md}”，填充“10px 22px”，圆形“{rounded.full}”。
- 按下状态“button-primary-pressed”加深为“{colors.primary-pressed}”。
- 禁用状态“button-primary-disabled”使用“{colors.hairline}”背景。

**`按钮辅助`** — 用于辅助操作的概述药丸。
- 背景透明，文本“{colors.ink}”，边框“1px实线{colors.hairline-strong}”，排版“{typography.button-md}”，填充“10px 22px”，圆角“{rounded.full}”。

**`黑暗按钮`** — 黑暗英雄带上的亮绿色药丸。
- 背景“{colors.brand-green}”，文本“{colors.on-primary}”，排版“{typography.button-md}”，填充“10px 22px”，圆形“{rounded.full}”。

**`button-secondary-on-dark`** — 深色背景上的概述药丸。
- 背景透明，文本“{colors.on-dark}”，边框“1px 实线{colors.hairline-dark}”，排版“{typography.button-md}”，填充“10px 22px”，圆角“{rounded.full}”。

**`button-ghost`** — 更安静的矩形幽灵按钮。
- 背景透明，文本“{colors.ink}”，排版“{typography.button-md}”，填充“8px 12px”，圆角“{rounded.md}”。

**`button-link`** — 内联绿色文本链接。
- 背景透明，文本“{colors.brand-green-dark}”，排版“{typography.body-sm-medium}”，填充“0”。### 卡片与容器
**`card-base`** — 标准内容卡。
- 背景“{colors.canvas}”、圆形“{rounded.lg}”、填充“{spacing.xl}”、边框“1px 实线{colors.hairline}”。

**`card-feature`** — 具有较大填充的功能卡。
- 背景“{colors.canvas}”，圆形“{rounded.lg}”，填充“{spacing.xxl}”，边框“1px 实线{colors.hairline}”。

**`card-product-deploy`** — 产品部署卡（“MongoDB Atlas / Community”）。
- 背景“{colors.canvas}”，圆形“{rounded.lg}”，填充“{spacing.xxl}”，边框“1px 实线{colors.hairline}”。

**`card-feature-dark`** — 英雄乐队上的深色青色功能卡。
- 背景“{colors.brand-teal-deep}”、文本“{colors.on-dark}”、圆形“{rounded.lg}”、填充“{spacing.xxl}”。

**`卡片课程`** — MongoDB 大学课程图块。
- 背景“{colors.canvas}”、圆形“{rounded.lg}”、填充“{spacing.xl}”、边框“1px 实线{colors.hairline}”。
- 顶部：彩色类别标签。下面：标题“{typography.heading-5}”，描述“{typography.body-sm}”，“开始→”链接。

**`card-cert`** — 认证卡。
- 背景“{colors.canvas}”、圆形“{rounded.lg}”、填充“{spacing.xl}”、边框“1px 实线{colors.hairline}”。

**`定价卡`** — 标准定价卡。
- 背景“{colors.canvas}”，圆形“{rounded.lg}”，填充“{spacing.xxl}”，边框“1px 实线{colors.hairline}”。

**`pricing-card-featured`** — 特色定价层（Flex 层、薄荷色背景 + 绿色边框）。
- 背景“{colors.surface-feature}”、圆形“{rounded.lg}”、填充“{spacing.xxl}”、边框“2px 实线{colors.brand-green}”。### 输入框与表单
**`文本输入`** — 标准文本字段。
- 背景`{colors.canvas}`，文本`{colors.ink}`，边框`1px实线{colors.hairline-strong}`，圆形`{rounded.md}`，填充`{spacing.sm} {spacing.md}`，高度44px。

**`以文本输入为中心`** — 激活状态。
- 边框切换为“2px 实线{colors.brand-green-dark}”。

**`search-pill`** — 标准 44 像素搜索栏。
- 背景“{colors.surface}”，文本“{colors.steel}”，排版“{typography.body-md}”，圆形“{rounded.md}”，高度44px，边框“1px实线{colors.hairline-strong}”。

**`search-pill-large`** — 大型 56px 搜索栏（MongoDB 大学目录顶部）。
- 背景“{colors.canvas}”，文本“{colors.steel}”，排版“{typography.body-md}”，圆形“{rounded.md}”，高度56px，边框“1px实线{colors.hairline-strong}”。### Tabs
**`pill-tab`** + **`pill-tab-active`** — 药丸式选项卡导航（定价顶部：“MongoDB Atlas / Enterprise Advanced”）。
- 无效：文本“{colors.steel}”、边框“1px 实心{colors.hairline}”、填充“{spacing.xs} {spacing.md}”、圆角“{rounded.full}”。
- 活动：背景“{colors.ink}”，文本“{colors.on-dark}”。

**`segmented-tab`** + **`segmented-tab-active`** — 下划线样式选项卡导航。
- 无效：文本“{colors.steel}”，无边框。活动：文本“{colors.brand-green-dark}”，“{colors.brand-green-dark}”中 2 像素底部边框。### Badges & Status
**`徽章绿色`** — 亮绿色徽章，用于新产品亮点。
- 背景“{colors.brand-green}”，文本“{colors.on-primary}”，排版“{typography.caption-bold}”，圆形“{rounded.sm}”，填充“2px 8px”。

**`badge-green-soft`** — 用于成功/免费指标的淡薄荷药丸。
- 背景“{colors.brand-green-soft}”，文本“{colors.brand-green-dark}”，排版“{typography.caption-bold}”，圆形“{rounded.full}”，填充“4px 10px”。

**`badge-purple`** — 紫色课程类别标签。
- 背景“{colors.accent-purple}”，文本“{colors.on-dark}”，排版“{typography.caption-bold}”，圆形“{rounded.sm}”，填充“2px 8px”。

**`badge-orange`** — 橙色课程类别标签。
- 背景“{colors.accent-orange}”，文本“{colors.on-dark}”，排版“{typography.caption-bold}”，圆形“{rounded.sm}”，填充“2px 8px”。

**`badge-popular`** —“最受欢迎”等级指示器（带有绿色文本的深青色药丸）。
- 背景“{colors.brand-teal-deep}”，文本“{colors.brand-green}”，排版“{typography.caption-bold}”，圆形“{rounded.full}”，填充“4px 10px”。

**`促销横幅`** — 顶部导航上方的深青色粘性促销条。
- 背景“{colors.brand-teal-deep}”，文本“{colors.on-dark}”，排版“{typography.body-sm-medium}”，填充“{spacing.sm} {spacing.md}”。### Code
**`code-block`** — 代码容器。
- 背景“{colors.canvas-dark}”、文本“{colors.on-dark}”、排版“{typography.code-md}”、圆角“{rounded.md}”、填充“{spacing.md}”。

**`code-mockup-card`** — 英雄乐队上的嵌入式代码模型。
- 背景“{colors.canvas-dark}”、文本“{colors.on-dark}”、圆角“{rounded.lg}”、填充“{spacing.lg}”。携带终端美观的代码片段。### Tables
**`比较表`** — 定价功能比较表。
- 背景“{colors.canvas}”，文本“{colors.ink}”，排版“{typography.body-sm}”，圆形“{rounded.md}”，边框“1px实线{colors.hairline}”。

**`比较行`** — 单独的特征行。
- 背景“{colors.canvas}”，文本“{colors.ink}”，填充“{spacing.md} {spacing.lg}”，底部边框“1px 实线{colors.hairline-soft}”。### Documentation Components
**`service-tile`** — 在“自定义您的部署”6-up 网格中平铺。
- 背景“{colors.canvas}”、圆形“{rounded.lg}”、填充“{spacing.xl}”、边框“1px 实线{colors.hairline}”。

**`why-card`** —“深受建设者喜爱”功能卡。
- 背景“{colors.surface}”，圆形“{rounded.lg}”，填充“{spacing.xl}”。

**`客户评价卡`** — 客户报价卡。
- 背景“{colors.canvas}”，圆形“{rounded.lg}”，填充“{spacing.xxl}”，边框“1px 实线{colors.hairline}”。

**`logo-wall-item`** — 客户徽标文字标记单元。
- 背景透明，文本“{colors.steel}”，排版“{typography.body-md-medium}”，填充“{spacing.lg}”。

**`faq-accordion-item`** — 常见问题解答面板。
- 背景“{colors.canvas}”、圆形“{rounded.md}”、填充“{spacing.xl}”、底部边框“1px 实线{colors.hairline}”。### Navigation
**顶部导航（营销）** — 粘性白色条。
- 背景`{colors.canvas}`，高度~64px，底部边框`1pxsolid {colors.hairline}`。
- 左：MongoDB 叶徽标 +“解决方案/资源/公司/定价”链接。
- 右：“登录”链接 + 亮绿色药丸“免费试用”CTA。### Signature Components
**`hero-band-dark`** — 带有嵌入式代码模型的深青色英雄乐队。
- 背景“{colors.brand-teal-deep}”，文本“{colors.on-dark}”，填充“{spacing.hero}”。
- 布局：居中标题“{typography.hero-display}”、副标题、按钮行、下方“code-mockup-card”。

**`hero-platform-card`** — 浅青色平台展示黑暗英雄的卡片。
- 背景“{colors.brand-teal-mid}”、文本“{colors.on-dark}”、圆形“{rounded.xl}”、填充“{spacing.xxl}”。

**`cta-banner-dark`** — 功能页面底部的深色 CTA 横幅。
- 背景“{colors.brand-teal-deep}”、文本“{colors.on-dark}”、圆形“{rounded.lg}”、填充“{spacing.section}”。

**`footer-region`** — 深青色多列页脚。
- 背景“{colors.brand-teal-deep}”，填充“{spacing.section} {spacing.xxl}”。
- 6 列链接网格。
- “{typography.body-sm-medium}”“{colors.on-dark}”中的部分标题。

**`footer-link`** — 单独的页脚链接。
- 背景透明，文本“{colors.on-dark-muted}”，排版“{typography.body-sm}”，填充“{spacing.xxs} 0”。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 使用“{colors.brand-green}”（明亮的 MongoDB 绿色）作为所有地方的主要 CTA
- 将深青色英雄乐队与亮绿色 CTA 药丸配对
- 将“{rounded.full}”应用于每个按钮、每个状态徽章
- 将“{rounded.lg}”（12px）一致地应用到卡片上
- 仅对课程标签使用类别强调色（紫色、橙色、绿色、青色）
- 在每个 UI 表面上维护欧几里得圆 A
- 使用具有终端审美内容的代码样机卡进行产品展示### 禁止事项
- 不要将亮绿色用于正文或大表面
- 除了品牌绿色和类别编码调色板之外，不要引入额外的强调色
- 不要软化按钮上的边角；该药丸是一个品牌标志
- 不要用白色英雄乐队取代深青色英雄乐队
- 不要在平面文档卡上应用浓重的阴影；为代码模型保留高度
- 不要将 Source Code Pro 用于散文## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|移动（小）| < 480 像素 |单列。英雄 36 像素。定价 1-up。课程目录 1-up。 |
|移动（大）| 480 – 767 像素 |球场瓷砖 2-up。英雄 48 像素。 |
|平板电脑| 768 – 1023 像素 | 2 列特征网格。英雄 56 像素。 |
|桌面| 1024 – 1279 像素 | 3 层定价卡行。三合一课程目录。英雄 64 像素。 |
|宽桌面| ≥ 1280 像素 |完整的 72px 英雄演示。 |### Touch Targets
- 药丸按钮以 40–44px 有效高度渲染
- 表单输入以 44px 高度呈现
- 搜索药丸（大）以 56 像素渲染
- 药丸标签 ~32px → 移动设备上的 44px### Collapsing Strategy
- **促销横幅**保持全宽；在 < 480px 处截断
- **顶部导航**低于 1024px 折叠成汉堡包
- **英雄乐队**：代码模型卡在移动设备上移动到文本下方
- **定价层**：3 列 → 2 列平板电脑 → 1 列移动设备
- **课程目录**：3-up → 2-up 平板电脑 → 1-up 移动设备
- **英雄排版**：72px → 56px → 48px → 36px
- **页脚**：6 列桌面 → 3 列平板电脑 → 手风琴移动设备### Image Behavior
- 大气 AI 图像使用 16:9 比例并进行全出血缩放
- 代码模型卡内容跨断点仍然可读
- 客户徽标墙：文字标记高度一致为 60–80 像素## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件
2.直接引用组件名称和token
3. 编辑后运行 `npx @google/design.md lint DESIGN.md`
4. 添加新变体作为单独的“组件：”条目
5. 正文默认为“{typography.body-md}”
6. 将“{colors.brand-green}”作为所有界面的主要 CTA
7. 始终为药丸形按钮 (`{rounded.full}`)
8. 深青色的英雄乐队构成了主要的 CTA## 已知局限与补充说明 (Known Gaps)

- 画布/表面超出英雄乐队的特定暗模式标记值未浮出水面
- 未提取动画/过渡时间；建议 150–200ms 轻松
- 未明确捕获表单验证成功状态
- 课程图块类别颜色映射是基于观察的
