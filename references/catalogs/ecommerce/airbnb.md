---
version: alpha
name: Airbnb
description: A warm, generous consumer marketplace anchored on a clean white canvas and Airbnb Rausch (#ff385c), the single brand voltage that carries every primary CTA, search-button orb, and rating dot. Type runs Airbnb Cereal VF at modest weights — display sits at 22–28px in weight 500/600 rather than the heavy 700+ that fintech and enterprise systems use; the brand trusts photography and generous whitespace over typographic muscle. Three product entries (Homes, Experiences, Services) sit in the top nav with hand-illustrated 32-icon glyphs and "NEW" badges, signaling a marketplace expansion rather than a feature dump. Pill-shaped search bars (`{rounded.full}`), softly rounded property cards (`{rounded.lg}` ~14px), and 32px button radii read as friendly and human — there is no hard corner anywhere except the body grid.

colors:
  primary: "#ff385c"
  primary-active: "#e00b41"
  primary-disabled: "#ffd1da"
  primary-error-text: "#c13515"
  primary-error-text-hover: "#b32505"
  luxe: "#460479"
  plus: "#92174d"
  ink: "#222222"
  body: "#3f3f3f"
  muted: "#6a6a6a"
  muted-soft: "#929292"
  hairline: "#dddddd"
  hairline-soft: "#ebebeb"
  border-strong: "#c1c1c1"
  canvas: "#ffffff"
  surface-soft: "#f7f7f7"
  surface-card: "#ffffff"
  surface-strong: "#f2f2f2"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  legal-link: "#428bff"
  star-rating: "#222222"
  scrim: "#000000"

typography:
  display-xl:
    fontFamily: "'Airbnb Cereal VF', Circular, -apple-system, system-ui, Roboto, 'Helvetica Neue', sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: 0
  display-lg:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: -0.44px
  display-md:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: 0
  display-sm:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.18px
  title-md:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  title-sm:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  rating-display:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px
  body-md:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  caption:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
    letterSpacing: 0
  caption-sm:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.23
    letterSpacing: 0
  badge:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: 0
  micro-label:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0
  uppercase-tag:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 8px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.32px
    textTransform: uppercase
  button-md:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  button-sm:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
    letterSpacing: 0
  link:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  nav-link:
    fontFamily: "'Airbnb Cereal VF', Circular, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 14px
  lg: 20px
  xl: 32px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 14px 24px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 13px 23px
    height: 48px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
  button-pill-rausch:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 10px 20px
  search-orb:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    height: 48px
  icon-button-circle:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 32px
  icon-button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 40px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 80px
  product-tab-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.none}"
  product-tab-inactive:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
  search-bar-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 14px 24px
    height: 64px
  search-field-segment:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: 8px 24px
  category-strip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.button-sm}"
  category-tab-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.none}"
  property-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
  property-card-photo:
    rounded: "{rounded.md}"
  experience-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
  city-link-block:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
  rating-display-card:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.rating-display}"
  guest-favorite-badge:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  new-tag:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.uppercase-tag}"
    rounded: "{rounded.full}"
    padding: 2px 6px
  amenity-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: 12px 0
  reviews-card:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  host-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 24px
  reservation-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  date-picker-day:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
  date-picker-day-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px 12px
    height: 56px
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 48px 80px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  legal-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.caption-sm}"
---

## Dig UI CSS Tokens

```css
css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #f2f2f2;
--dig-surface-elevated: #ffffff;
--dig-text: #222222;
--dig-text-muted: #3f3f3f;
--dig-text-soft: #6a6a6a;
--dig-accent: #ff385c;
--dig-accent-strong: #e00b41;
--dig-accent-2: #ff385c;
--dig-accent-2-strong: #ff385c;
--dig-border: #dddddd;
--dig-border-strong: #c1c1c1;
--dig-grid-line: #ebebeb;
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #ff385c;

--dig-font-sans: 'Airbnb Cereal VF', Circular, -apple-system, system-ui, Roboto, 'Helvetica Neue', sans-serif;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 8px;
--dig-text-sm: 11px;
--dig-text-md: 12px;
--dig-text-lg: 13px;
--dig-text-xl: 14px;
--dig-text-2xl: 16px;
--dig-text-3xl: 20px;
--dig-text-4xl: 21px;
--dig-text-5xl: 22px;

--dig-radius-sm: 8px;
--dig-radius-md: 14px;
--dig-radius-lg: 20px;
--dig-radius-xl: 32px;
--dig-radius-pill: 9999px;

--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 12px;
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

Airbnb 是一个慷慨的、以摄影为主导的消费市场的典型例子。基础画布是**纯白色**（`{colors.canvas}` — #ffffff），带有深近乎黑色的墨水（`{colors.ink}` — #222222）用于标题和正文，以及**Rausch**（`{colors.primary}` — #ff385c）的单电压，承载每个主要 CTA、搜索按钮球、心脏保存状态和内联品牌链接。主线营销中没有次要品牌颜色 - **豪华紫色** (`{colors.luxe}` — #460479) 和 **Plus 洋红色** (`{colors.plus}` — #92174d) 标记是仅出现在 Airbnb Luxe / Plus 环境中的子品牌强调色。

类型运行 **Airbnb Cereal VF**（Airbnb 许可证的自定义可变字体），**Circular** 作为历史性的内部后备和下面的系统堆栈。谷物的权重适中——显示标题以 22-28 像素呈现，权重为 500-600，而不是金融或企业系统所依赖的 700+ 权重。主页上的英雄 h1（“未来度假的灵感”）只有 28px / 700，在典型的 SaaS 页面上会感觉很小；在这里它之所以有效，是因为布局依靠摄影（城市拼贴画、财产卡）来获得视觉重量，而不是印刷力量。

形状语言**柔和**。按钮半径为 8 像素 (`{rounded.sm}`)，属性卡约为 14 像素 (`{rounded.md}`)，搜索栏完全呈药丸形状 (`{rounded.full}`)，愿望清单心形和搜索球为圆形 (`{rounded.full}`)，类别条圆角为 32 像素 (`{rounded.xl}`)。除了身体网格本身之外，任何地方基本上都没有硬角——每个交互元素都是圆形的。

**主要特征：**
- 单一强调色：“{colors.primary}”（#ff385c —“Rausch”）包含每个主要 CTA、搜索球、爱心保存状态和品牌字标。很少使用——大多数页面都是 90% 白色 + 墨水，带有一两个劳施矩。
- 自定义变量类型：`Airbnb Cereal VF`。显示权重为 500-700，主体为 400。适度的权重是有意为之的——系统相信摄影的视觉分量。
- 三个产品顶部导航：主页、体验、服务 - 每个新产品上都有一个手绘的 32 像素图标和“新”徽章 (`{component.new-tag}`)。活动选项卡使用下划线规则（“{component.product-tab-active}”）。
- 药丸形全局搜索栏：白色表面，完全圆形（`{rounded.full}`），以 1px 细线划分为Where / When / Who 段，以圆形 Rausch 搜索球（`{component.search-orb}`）终止。
- 属性卡以照片优先：具有“{rounded.md}”角剪裁的长宽比矩形、可滑动的图像轮播、左上角的“宾客最爱”浮动徽章、右上角的心形图标，然后是下方的 4-5 行元数据。
- 编辑下拉菜单（页脚、语言选择器）是白色画布上干净的文本列——没有卡片表面，没有阴影。
- 设计系统将高度限制在一个阴影层（`box-shadow: rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px`）——用于悬停浮动卡片和搜索/帐户下拉菜单。
- 8px 基础间距系统，主要部分位于“{spacing.section}”（64px）——宽敞但不够通风，感觉像社论杂志；市场密度要求每卷轴有更多卡片。## 颜色系统 (Colors)



### 品牌与主色
- **Rausch** (`{colors.primary}` — #ff385c)：单一品牌颜色。用于主要 CTA 背景（保留、继续）、搜索球、属性卡上的心形保存状态以及内联品牌链接。消费者出行中最容易辨识的颜色。
- **Rausch Active** (`{colors.primary-active}` — #e00b41)：按下/指针向下的变体 — 稍微更饱和。用于“{component.button-primary-active}”。
- **Rausch 禁用** (`{colors.primary-disabled}` — #ffd1da)：禁用的 CTA 上使用的淡色调。
- **Luxe Purple** (`{colors.luxe}` — #460479)：Airbnb Luxe 的子品牌口音。仅出现在 Luxe 品牌的表面内 - 从未出现在主线营销中。
- **Plus Magenta** (`{colors.plus}` — #92174d)：Airbnb Plus 的子品牌口音。与 Luxe 的范围相同——仅限子产品。### 表面与背景
- **Canvas** (`{colors.canvas}` — #ffffff)：每个公共页面的默认页面底板。 Airbnb 在公共网站上没有深色模式。
- **Surface Soft** (`{colors.surface-soft}` — #f7f7f7)：最浅的填充 — 用于禁用字段、子导航悬停背景和内联搜索过滤器带。
- **表面强**（`{colors.surface-strong}` — #f2f2f2）：稍重的填充 — 圆形图标按钮表面（例如，面包屑后退箭头和列表工具栏按钮）。### Hairlines & Borders
- **发际线** (`{colors.hairline}` — #dddddd)：默认 1px 边框色调 — 搜索栏分隔符、表格分隔符、页脚列分隔符、卡片 1px 边框。
- **Hairline Soft** (`{colors.hairline-soft}` — #ebebeb)：用于长滚动编辑正文分隔符的较轻分隔符。
- **边框强**（`{colors.border-strong}` — #c1c1c1）：在禁用轮廓按钮和焦点后的表单输入轮廓上使用较重的笔触。### 文本色
- **Ink** (`{colors.ink}` — #222222)：浅色表面上的主要文本颜色。显示标题、正文段落、主要导航链接和大多数内嵌链接文本。从来没有纯黑。
- **Body** (`{colors.body}` — #3f3f3f)：在长篇评论和舒适副本中使用的辅助运行文本颜色，其中墨水感觉太重。
- **静音**（`{colors.muted}` — #6a6a6a）：城市链接块内的副标题（“小屋出租”、“别墅出租”）、非活动产品选项卡标签、页脚类别子标签、“查看全部”链接。
- **柔和柔和** (`{colors.muted-soft}` — #929292)：禁用的链接文本。非常谨慎地使用。
- **星级评级**（`{colors.star- rating}` — #222222）：相同的墨水标记 — Airbnb 的星级图标和“4.81”评级数字均以墨水呈现，而不是黄色/金色，这是一个有意的品牌选择（黄色星星在旅行环境中感觉廉价）。
- **On Primary** (`{colors.on-primary}` — #ffffff)：Rausch CTA 上的白色文本。### 语义色
- **错误** (`{colors.primary-error-text}` — #c13515)：表单验证的内联错误文本。与 Rausch 不同——红色稍深、更饱和。
- **错误悬停** (`{colors.primary-error-text-hover}` — #b32505)：链接悬停时变暗。
- **法律链接蓝色** (`{colors.legal-link}` — #428bff)：合法副本内的内嵌链接（隐私、条款）。仅在合法子带内使用。### Scrim
- **Scrim**（`{colors.scrim}` — #000000，不透明度为 50%）：全局模态背景色调 — 日期选择器、登录对话框、语言选择器。存储为基本十六进制；不透明度在渲染时应用。## 排版与字体系统 (Typography)



### 字体家族
该系统运行**Airbnb Cereal VF**来处理所有内容——显示、正文、导航、标题、缩微文本。后备走“Circular、-apple-system、system-ui、Roboto、“Helvetica Neue”、sans-serif”。 **Circular** 是历史悠久的内部字体，至今仍保留为第一个非可变后备字体；系统堆栈支持它。

没有单独的显示系列。可变字体承载整个比例。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography. rating-display}` | 64 像素 | 700 | 1.1| -1 像素 |列表详细评级显示（“4.81”）|
| `{typography.display-xl}` | 28 像素 | 700 | 1.43 | 1.43 0 |主页 h1（“未来度假的灵感”）|
| `{typography.display-lg}` | 22 像素 | 500 | 500 1.18 | 1.18 -0.44 像素 |房源详情 h1（“靠近巴厘岛费特希耶阿利亚海滩……”）|
| `{typography.display-md}` | 21 像素 | 700 | 1.43 | 1.43 0 |列表详细信息内的部分标题（“这个地方提供什么”）|
| `{typography.display-sm}` | 20 像素 | 600 | 1.20 | 1.20 -0.18 像素 |小节标题（“要了解的事情”）|
| `{typography.title-md}` | 16 像素 | 600 | 1.25 | 1.25 0 |城市链接块标题（“威尔明顿”、“雅典”）|
| `{typography.title-sm}` | 16 像素 | 500 | 500 1.25 | 1.25 0 |页脚列标题（“支持”、“托管”、“Airbnb”）|
| `{typography.body-md}` | 16 像素 | 400 | 1.5 | 1.5 0 |列表副本内的默认运行文本 |
| `{typography.body-sm}` | 14 像素 | 400 | 1.43 | 1.43 0 |卡片元线、日期、价格、距离文本 |
| `{typography.caption}` | 14 像素 | 500 | 500 1.29 | 1.29 0 |搜索字段分段标签（“地点”、“时间”、“谁”）|
| `{typography.caption-sm}` | 13 像素 | 400 | 1.23 | 1.23 0 |页脚法律行（“© 2026 Airbnb, Inc.”）|
| `{typography.badge}` | 11 像素 | 600 | 1.18 | 1.18 0 | “客人最爱”浮动徽章文字|
| `{typography.micro-label}` | 12 像素 | 700 | 1.33 | 1.33 0 |卡便利微型标签（“Inline 6”）|
| `{typography.uppercase-tag}` | 8 像素 | 700 | 1.25 | 1.25 0.32px（大写）|产品导航选项卡上的“NEW”徽章 |
| `{typography.button-md}` | 16 像素 | 500 | 500 1.25 | 1.25 0 |主 CTA 按钮标签 |
| `{typography.button-sm}` | 14 像素 | 500 | 500 1.29 | 1.29 0 |药丸按钮标签（类别条）|
| `{typography.link}` | 14 像素 | 400 | 1.43 | 1.43 0 |内联正文链接 |
| `{typography.nav-link}` | 16 像素 | 600 | 1.25 | 1.25 0 |顶级产品导航标签（主页、体验、服务）|### 排版原则
显示重量保持适度。 28px / 700 的主页 h1 故意很小——它隐藏在搜索栏下方，因此摄影和城市链接网格具有视觉层次结构。 22px / 500 处的列表细节 h1 更加安静；列表照片横幅完成其上方的工作。

整个系统中唯一一个印刷上响亮的时刻是列表页面上的**评级显示**（“{typography. rating-display}” - 64px / 700）。这是系统仅信任类型来承载层次结构的唯一地方 - 评级数字是峰值信任信号，因此它们得到最响亮的对待。### 字体备选说明
如果 Airbnb Cereal VF 和 Circular 不可用，**Inter** 是最接近的开源替代品。将显示标题的行高调整为约 2%，以匹配 Cereal 稍紧的大写字母高度；否则比例会干净地转移。## 布局与间距 (Layout)



### 间距系统
- **基本单位：** 4px（带 2px 微步）。
- **标记：** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 64px。
- **部分填充（垂直）：** `{spacing.section}` (64px) 用于主要页面区域；比典型的 SaaS 营销 (80–96px) 更紧凑，因为市场页面每次滚动需要更高的卡片密度。
- **卡内部填充：** `{spacing.lg}` (24px) 用于 `{component.host-card}` 和 `{component.reservation-card}`； `{spacing.base}` (16px) 用于属性卡元块； `{spacing.sm}` (8px) 用于标题/日期行间距。
- **排水沟：** 主页城市网格中的卡片之间的“{spacing.base}”（16px）； `{spacing.lg}` (24px) 在页脚列装订线内；密集类别条分隔线上的“{spacing.xs}”（4px）。### 网格与容器
- **最大内容宽度：** ~1280px，以主页和编辑页面为中心。列表详细信息页面的上限接近 1080 像素，以保持照片横幅和预订栏的可读性。
- **城市链接网格（主页页脚）：** 桌面上的 6 列网格，每个单元格在“{typography.title-md}”中包含一个城市名称，在“{typography.body-sm}”中包含一个类别子标签（静音）。
- **列表详细信息：** 2 列，左侧为照片/便利设施主体（约 64% 宽度），右侧为粘性预订卡 (`{component.reservation-card}`)（约 32%）。
- **页脚：** 桌面上的 3 列链接列表（支持/托管/Airbnb），在移动设备上折叠为 1 列。### 留白哲学
该系统为编辑带提供了 64 像素的垂直呼吸空间，但压缩了卡片网格——财产卡和城市链接卡仅相距 16 像素。这种对比是有意为之的：页面读作“开放的英雄，下面是密集的市场”，强化了市场的性质，同时又不会让浏览者感到不知所措。## Elevation

该系统本质上有**一个影子层**加上平坦的基线。

- **平坦（无阴影）：** 正文、英雄、页脚、所有编辑带 — 95% 的表面。
- **卡片悬停浮动：** `box-shadow: rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0` — 应用于指针悬停时的属性卡、静止的搜索栏和下拉菜单菜单（帐户菜单、语言选择器、日期选择器）。这是整个系统中的单一阴影定义。
- **模态稀松布：** `{colors.scrim}` 以 50% 不透明度渲染 — 全局模态背景。用于日期选择器、登录对话框、语言选择器。

没有渐进的高度层——系统要么只有一个阴影，要么没有。深度来自摄影、白色表面分离和圆角剪切，而不是来自分层阴影。## 核心组件 (Components)



### 按钮设计
**`button-primary`** — Rausch 填充、白色文本、8px 半径、14×24px 填充、48px 高度、粗细 500。整个系统中最常见的 CTA：“保留”、“继续”、“搜索”、帐户流主选。

**`button-primary-active`** — 按下状态。背景翻转为“{colors.primary-active}”。没有变换，没有阴影变化。

**`button-primary-disabled`** — #ffd1da 处的浅 Rausch 色调，带有白色文本。不允许使用光标。

**`button-secondary`** — 使用墨迹文本和 1px 墨迹轮廓填充白色。 8 像素半径。用于 Rausch 曲面上的“保存”、“取消”和反 CTA。

**`button-tertiary-text`** — 纯墨迹文本，无表面，无边框。悬停时有下划线。用于“显示更多”类型链接和模式关闭标签。

**`button-pill-rausch`** — 用于特色单元格的药丸状 Rausch CTA（例如，“成为宿主”子 CTA） — 9999 像素半径、10×20 像素填充、14 像素标签。### Search Surface
**`search-bar-pill`** — 签名全局搜索栏。白色填充，9999px半径，64px高度，1px发际线1px阴影边框。在内部按垂直细线规则划分为“{component.search-field-segment}”单元格（地点/时间/人物）。每个片段在“{typography.caption}”中的占位符行上方都有一个大写标题标签。

**`search-orb`** — 终止搜索栏右边缘的圆形 Rausch 球体。 48×48px，全圆形，白色放大镜图标居中。首页最火的单色时刻。### 顶部导航栏
**`顶部导航`** — 白色表面，80 像素高度，1 像素底部发际线。 Airbnb 文字标记位于左侧齐平，三个产品选项卡（主页/体验/服务）位于正中心，帐户实用程序（主机链接、语言地球、帐户菜单）位于右侧齐平。

**`product-tab-active`** — `{typography.nav-link}` 中的墨水标签，32 像素手绘图标，图标标签对下方的 2 像素墨水下划线。

**`product-tab-inactive`** — 静音标签，插图图标，无下划线。单击后变为活动状态。

**`new-tag`** — 一个微小的圆形药丸徽章 (`{rounded.full}`) 锚定在图标的右上角，在 `{typography.uppercase-tag}` 中带有大写的“NEW”标签（8px / 700，0.32px 跟踪，大写）。用于体验和服务以表示新近度。### Listing Cards
**`财产卡`** — 照片优先卡。具有“{rounded.md}”角剪裁的 1:1 宽高比图像、图像轮播点叠加、左上角“客人最爱”浮动徽章 (“{component.guest-favorite-badge}”) 和右上角的心形图标（默认轮廓状态下的“{component.icon-button-circle}”，保存时为 Rausch 填充）。图像下方：4-5 行元 — 标题 (`{typography.title-md}`)、距离/日期 (`{typography.body-sm}` 静音) 和价格 ("$X night") 右对齐。

**`财产卡-照片`** - 照片板本身，作为令牌分开，因为某些表面（愿望清单、搜索结果）仅重用照片而不使用元块。

**`体验卡`** — 用于体验列表的高宽比卡 (4:5)。相同的“{rounded.md}”剪裁，左上角浮动“NEW”徽章，右上角浮动心形，下方有一个单行标题。

**`guest-favorite-badge`** — 白色圆形药丸 (`{rounded.full}`)，11 像素/600 重量。位于照片上方，系统唯一的阴影层应用于高程。### Listing Detail
**`评级显示卡`** — 签名列表详细信息时刻。一个 64px / 700 的评级号码（“4.81”），左右两侧是微小的月桂花环 SVG 装饰。评级下方：“宾客最爱”标语和一排墨水统计列。整个系统中最大的印刷权重。

**`amenity-row`** — `{typography.body-md}` 中的 1 列便利设施图标 + 墨水标签列表。 12px行内边距，行与行之间无边框；部分由上方和下方 1px 细线分隔线封闭。

**`评论卡`** — 评论摘录的 2 列网格。每列在 3 行摘录上方包含一个作者行（头像、姓名、日期），并带有“显示更多”三级链接。

**`host-card`** — 一张带有 `{rounded.md}` 舍入和 24px 填充的白卡，其中包含主机头像、姓名、“超级主机”徽章、响应率统计信息和“联系主机”“{component.button-secondary}”。

**`预订卡`** — 列表详细信息页面上的粘性右栏卡。白色表面，“{rounded.md}”舍入，1px 细线边框，1px 阴影层标高，24px 填充。包含：每晚价格（“{typography.display-md}”墨水）、日期范围选择器、访客计数步进器、“保留”主要 CTA 全角以及“{typography.body-sm}”下方的费用明细堆栈。### Date Picker
**`date-picker-day`** — 一个 40×40px 的圆形单元格，在 `{typography.body-sm}` 中携带日期数字。默认状态是透明填充、墨迹文本。

**`date-picker-day-selected`** — 墨水填充、白色文本、全圆 (`{rounded.full}`)。两个选定日期之间的范围状态带有连接它们的“{colors.surface-soft}”菱形背景。### Forms
**`文本输入`** — 白色表面，1px 细线轮廓，`{rounded.sm}` 8px 半径，56px 高度，14×12px 填充。上面的堆叠标签（在“{typography.caption}”中静音），“{typography.body-md}”中的占位符文本静音。对焦时，边框加厚为 2 像素墨水，边框颜色翻转为“{colors.ink}”——没有发光，没有环。### Footer
**`footer-light`** — 白色表面（与页面画布匹配 — Airbnb 没有对比页脚），48×80px 填充。三列链接块（支持/托管/Airbnb），由宽大的 24 像素间距分隔。每列以“{typography.title-sm}”墨水标签开头，并以“{typography.body-sm}”墨水堆叠“{component.footer-link}”行。

**`legal-band`** — 页脚列下方的底部条带，包含版权行、语言选择器（地球图标 +“英语（美国）”链接）、货币选择器和社交图标（Facebook、X、Instagram）。所有文本均采用静音“{colors.muted}”，位于“{typography.caption-sm}”。## 响应式行为策略 (Responsive Behavior)

|名称 |宽度|关键变化|
|---|---|---|
|手机 | < 744 像素 |顶部导航折叠为徽标+汉堡；产品标签隐藏在工作表后面；搜索栏折叠成一个可点击的药丸；财产卡一叠一叠；城市网格1列；列表详细信息将预订卡折叠到粘性底栏。 |
|平板电脑| 744–1128 像素 |顶部导航保留产品选项卡，但搜索栏缩小；财产卡二合一；城市网格2-3列；预订卡以较窄的宽度保持粘性右轨。 |
|桌面| 1128–1440 像素 |完整的顶部导航，三个产品选项卡居中；全药丸宽度的搜索栏，所有 3 个部分均可见；财产卡四联；城市网格6列；清单详细信息 2 列，带预订栏。 |
|宽| > 1440 像素 |列表/搜索页面的内容宽度上限为 1440 像素，编辑页面的内容宽度上限为 1280 像素；排水沟吸收其余部分。 |### Touch Targets
- 主要 CTA 至少为 48×48 像素（高于 WCAG AAA）。
- 搜索球是 48×48 像素的圆形 - 页面上点击次数最多的元素。
- 爱心保存按钮是 32×32 像素的圆形 — AAA 的边界，但通过照片卡内宽敞的 12 像素填充进行补偿。
- 日期选择器日单元格为 40×40px 圆形。### Collapsing Strategy
- 顶级产品选项卡会折叠成低于 744 像素的汉堡表。
- 搜索栏的 3 个部分折叠成一个单击条目，可在移动设备上打开全屏搜索覆盖层。
- 房产和城市链接网格在每个断点处干净地删除列计数 - 永远不会回流行；始终减少列。
- 列表详细信息上的预订卡从粘性右栏切换为移动设备上的粘性底部栏，仅包含“预订”CTA + 每晚价格摘要。## 已知局限与补充说明 (Known Gaps)

- **悬停状态颜色：** 故意未根据全球禁止悬停政策进行记录 - Airbnb 的房产卡实际“:hover”样式是微妙的海拔提升，但精确提取并不可靠。
- **加载状态/骨架屏幕：**在提取的表面上不可见。
- **地图视图样式：** 搜索结果地图使用带有自定义 Rausch 标记的 Mapbox 着色图块；没有在这里捕获。
- **表单输入错误状态：**错误文本颜色（`{colors.primary-error-text}`）已记录，但验证失败时的完整输入轮廓+辅助文本组合在捕获的表面中不可见。
- **子品牌调色板：** Luxe (`{colors.luxe}`) 和 Plus (`{colors.plus}`) 被记录为令牌，但它们的完整子系统（版式覆盖、表面处理）存在于单独的子域中，此处未捕获。
