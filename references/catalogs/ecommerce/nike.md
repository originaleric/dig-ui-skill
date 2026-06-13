---
version: alpha
name: Nike
description: |
  A photography-first commerce system built on extreme typographic contrast — towering uppercase Futura display lockups burned into editorial campaign imagery, sitting above a dense, neutral, near-monochrome retail chrome of pill-shaped black CTAs, gray search and tag pills, and tight 8px-grid product cards. The brand's voice is athletic, kinetic, and absolute: pure black, pure white, a single soft surface gray, and a deliberately small set of semantic accents (sale red, success green, restrained category tints) — every chromatic moment is reserved for editorial photography or pricing signal, never decorative chrome.

colors:
  primary: "#111111"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  soft-cloud: "#f5f5f5"
  ink: "#111111"
  charcoal: "#39393b"
  ash: "#4b4b4d"
  mute: "#707072"
  stone: "#9e9ea0"
  hairline: "#cacacb"
  hairline-soft: "#e5e5e5"
  sale: "#d30005"
  sale-deep: "#780700"
  success: "#007d48"
  success-bright: "#1eaa52"
  info: "#1151ff"
  info-deep: "#0034e3"
  accent-pink: "#ed1aa0"
  accent-pink-soft: "#ffb0dd"
  accent-purple-soft: "#beaffd"
  accent-purple-pale: "#d6d1ff"
  accent-teal: "#0a7281"
  accent-pink-deep: "#4c012d"

typography:
  display-campaign:
    fontFamily: Nike Futura ND
    fontSize: 96px
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: 0
    textTransform: uppercase
  heading-xl:
    fontFamily: Helvetica Now Display Medium
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-lg:
    fontFamily: Helvetica Now Display Medium
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-md:
    fontFamily: Helvetica Now Display Medium
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: 0
  body-md:
    fontFamily: Helvetica Now Text
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: Helvetica Now Text Medium
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  button-lg:
    fontFamily: Helvetica Now Display Medium
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  button-md:
    fontFamily: Helvetica Now Text Medium
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  button-sm:
    fontFamily: Helvetica Now Text Medium
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  link-md:
    fontFamily: Helvetica Now Text
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: 0
    textDecoration: underline
  caption-md:
    fontFamily: Helvetica Now Text Medium
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  caption-sm:
    fontFamily: Helvetica Now Text Medium
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  utility-xs:
    fontFamily: Helvetica Neue
    fontSize: 9px
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: 0

rounded:
  none: 0px
  sm: 18px
  md: 24px
  lg: 30px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 18px
  xl: 24px
  xxl: 30px
  section: 48px

components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 16px 32px
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.soft-cloud}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 16px 32px
    height: 48px
  button-outline-on-image:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
  button-icon-circular:
    backgroundColor: "{colors.soft-cloud}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 40px
  search-pill:
    backgroundColor: "{colors.soft-cloud}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    height: 40px
  search-pill-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  filter-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
  badge-promo:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  badge-sale-text:
    textColor: "{colors.sale}"
    typography: "{typography.caption-md}"
  product-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    padding: 0px
  product-card-image:
    backgroundColor: "{colors.soft-cloud}"
    rounded: "{rounded.none}"
  swatch-dot:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 12px
  swatch-dot-active:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 12px
  campaign-tile:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-campaign}"
    rounded: "{rounded.none}"
  category-icon-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.none}"
  member-benefit-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.heading-lg}"
    rounded: "{rounded.none}"
  faq-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-md}"
    rounded: "{rounded.none}"
    padding: 24px 0px
  pdp-disclosure-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    padding: 24px 0px
  utility-bar:
    backgroundColor: "{colors.soft-cloud}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.none}"
    height: 36px
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    height: 56px
  filter-sidebar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.mute}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.none}"
---

## Dig UI CSS Tokens

```css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #111111;
--dig-text-muted: #111111;
--dig-text-soft: #111111;
--dig-accent: #111111;
--dig-accent-strong: #111111;
--dig-accent-2: #111111;
--dig-accent-2-strong: #111111;
--dig-border: #cacacb;
--dig-border-strong: #cacacb;
--dig-grid-line: #e5e5e5;
--dig-success: #007d48;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #1151ff;

--dig-font-sans: Nike Futura ND;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 9px;
--dig-text-sm: 12px;
--dig-text-md: 14px;
--dig-text-lg: 16px;
--dig-text-xl: 24px;
--dig-text-2xl: 32px;
--dig-text-3xl: 96px;
--dig-text-4xl: 40px;
--dig-text-5xl: 56px;

--dig-radius-sm: 18px;
--dig-radius-md: 24px;
--dig-radius-lg: 30px;
--dig-radius-xl: 16px;
--dig-radius-pill: 9999px;

--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 12px;
--dig-space-6: 18px;
--dig-space-7: 24px;
--dig-space-8: 30px;

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

耐克的商务系统建立在一个几乎极其简单的理念之上：摄影会说话，镀铬不会。每一页读起来都像是一篇体育社论——高耸的大写 Futura 显示锁定（“{typography.display-campaign}”）融入全屏广告活动图像中，而其他所有内容（导航、过滤器、按钮、卡片、页脚）则在“{colors.canvas}”和“{colors.soft-cloud}”上简化为中性排版和药丸几何形状。没有装饰渐变，没有柔和的阴影怀旧，没有用于“色调”的强调色 - 系统节省了产品摄影的所有色能和实际需要发出信号的少数时刻（销售价格“{colors.sale}”，成功“{colors.success}”，样本点）。

其结果是一个感觉物理的布局 - 活动英雄、产品网格、运动图块、页脚 - 像印刷目录一样堆叠，而不是像典型的 SaaS 登陆页面那样动画。密度高但不拥挤，因为该系统依赖于三个无情的设备：“{colors.soft-cloud}”上的方形或接近方形的 1:1 产品图像、锚定每个可操作表面的药丸形黑色 CTA (“{rounded.full}”) 以及紧密的 8 像素间距比例，使卡片和过滤器在 PLP、PDP 和编辑页面上保持数学对齐。

在“/men”、越野跑系列、Zegama PDP、“/membership”和 Jordan Golf 中，相同的镀铬以相同的比例出现——只是摄影和文案发生了变化。这就是该系统的标志：图像中最大限度的编辑表达，其他地方最大限度的机械约束。

**主要特征：**
- 编辑活动英雄“{typography.display-campaign}”（Nike Futura ND，96px，行高 0.9，大写）直接烧成全出血摄影
- 纯黑/白/单灰 UI 调色板：“{colors.ink}”、“{colors.canvas}”和“{colors.soft-cloud}”占据约 95% 的镀铬表面积
- 药丸几何图形随处可见：每个 CTA、搜索字段、过滤芯片和徽章都使用“{rounded.full}”（30 像素）或“{rounded.md}”（24 像素）——系统中没有尖角按钮
- 产品卡具有零半径、零阴影，直接位于“{colors.soft-cloud}”样本背景上 - 照片就是卡
- 双色调 CTA 层次结构：“{component.button-primary}”（在任何亮色上为黑色）与“{component.button-secondary}”（在任何亮色上为“{colors.soft-cloud}”） — 切勿在同一表面上同时使用这两种颜色
- 8 像素间距系统，部分节奏为“{spacing.section}”（48 像素），在 PLP、PDP 和编辑页面上创建一致的垂直呼吸
- 销售信号是零售版中唯一出现非中性颜色的地方：`{colors.sale}` 价格 + 删除线原价，无徽章背景## 颜色系统 (Colors)

> **源页面：** `/men`（主要）、`/w/mens-acg-trail-running-shoes-...`、`/t/acg-zegama-...`、`/membership`、`/w/jordan-golf-...`。五款产品的镀铬调色板都是相同的——只是摄影有所不同。### 品牌与主色
- **Nike Black** (`{colors.ink}` — `#111111`)：该品牌唯一的“颜色”。它是主要的 CTA、样本点、活动过滤芯片、活动叠加层、标题颜色和正文。当耐克想要断言任何事情时，它就会变黑。
- **纯白色**（`{colors.on-primary}`、`{colors.canvas}` — `#ffffff`）：与黑色平等的搭档。包含每个页面背景、图像上的 CTA 以及“{colors.ink}”表面上的反向文本。### 表面与背景
- **Soft Cloud** (`{colors.soft-cloud}` — `#f5f5f5`)：整个系统中最常用的非白色表面。产品卡片图像背景、搜索丸、辅助 CTA、实用工具栏、运动类别样本图块。它是每张产品照片舞台的“颜色”。
- **发际线** (`{colors.hairline}` — `#cacacb`)：过滤器行、页脚列和 PDP 披露行之间的 1px 分隔线。
- **Hairline Soft** (`{colors.hairline-soft}` — `#e5e5e5`)：在粘性条和标签条下插入 1px 阴影，这是系统使用的唯一“阴影”。### 文本色
- **Ink** (`{colors.ink}` — `#111111`)：浅色表面上的主要文本 — 标题、产品名称、价格、导航。
- **木炭** (`{colors.charcoal}` — `#39393b`)：墨水太重的地方稍微软一些。
- **Ash** (`{colors.ash}` — `#4b4b4d`)：禁用深色表面上的辅助边框和非常低强调的实用文本。
- **静音** (`{colors.mute}` — `#707072`)：产品类别字幕（“男士越野跑鞋”）、页脚链接文本、辅助元数据。
- **Stone** (`{colors.stone}` — `#9e9ea0`)：深色表面上的反向辅助文本和最低强调的实用文本。### 语义色
- **Sale** (`{colors.sale}` — `#d30005`)：折扣价格颜色和“% off”副本 - 整个零售铬合金中唯一的红色。
- **Sale Deep** (`{colors.sale-deep}` — `#780700`)：销售价格悬停/按下和暗模式销售锚点。
- **成功** (`{colors.success}` — `#007d48`)：确认消息、库存指示器、资格标记。
- **Success Bright** (`{colors.success-bright}` — `#1eaa52`)：在黑暗表面上的逆成功。
- **信息** (`{colors.info}` — `#1151ff`)：会员体验标注中的信息链接/徽章重音。
- **Info Deep** (`{colors.info-deep}` — `#0034e3`)：信息重音的按下状态。### Category Accents (sport / collection chips)
这些很少出现——几乎完全以小芯片背景、样本点或编辑图块中的类别插图的形式出现。它们从不用作文本或主要 CTA 颜色。
- **Accent Pink** (`{colors.accent-pink}` — `#ed1aa0`)：SKIMS / 女装系列时刻。
- **Accent Pink Soft** (`{colors.accent-pink-soft}` — `#ffb0dd`)：会员体验图块上的柔和色调。
- **Accent Purple Soft** (`{colors.accent-purple-soft}` — `#beaffd`)：编辑样本点，软类别芯片。
- **强调紫色淡色** (`{colors.accent-purple-pale}` — `#d6d1ff`)：最轻的软瓷砖填充。
- **Accent Teal** (`{colors.accent-teal}` — `#0a7281`)：锁定时的越野/户外/ACG 编辑口音。
- **Accent Pink Deep** (`{colors.accent-pink-deep}` — `#4c012d`)：最深的编辑叠加色调，用作传统/乔丹瓷砖上的水洗。## 排版与字体系统 (Typography)



### 字体家族
- **Nike Futura ND**（仅限展示活动）——专有的几何无衬线，用于将高大的大写标题刻在活动英雄摄影中。回退到 Helvetica Now Text Medium → Helvetica → Arial。
- **Helvetica Now Display Medium**（标题 16–32px）- 现代 Helvetica 剪裁，适合显示尺寸；包含每个部分的标题、PDP 产品名称和对话框标题。
- **Helvetica Now Text Medium** (UI 12–16px) — 按钮、标题、样本标签、徽章文本。系统的 UI 主力。
- **Helvetica Now Text**（正文和链接）- 长格式正文和带下划线的内联链接。
- **Neue Frutiger 阿拉伯语** — 在“{typography.heading-lg}”和标题大小处对阿拉伯语语言环境进行 RTL 配对。
- **Helvetica Neue 9px** — 仅合法精细打印实用程序行（`{typography.utility-xs}`）。

在没有 Nike 专有字体的系统上进行替换时：将 **Inter**（机身镀铬使用 Display 700，按钮使用 Display 500）与 **Bebas Neue** 或 **Anton** 配对，行高为 96 像素/0.9，用于营销活动标题层。稍微收紧替代品上的字母间距 (-0.5%) 以近似 Futura ND 的光学重量。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-campaign}` | 96 像素 | 500 | 500 0.9 | 0.9 0 |社论活动标题融入英雄摄影（大写）|
| `{typography.heading-xl}` | 32 像素 | 500 | 500 1.2 | 1.2 0 |部分标题 —“特色鞋类”、“最新服装”、PDP 产品标题栏 |
| `{typography.heading-lg}` | 24 像素 | 500 | 500 1.2 | 1.2 0 |款/会员优惠卡标题、大号CTA标签、PDP价格|
| `{typography.heading-md}` | 16 像素 | 500 | 500 1.75 | 1.75 0 |卡片标题、FAQ 行标签、过滤器组标题 |
| `{typography.body-md}` | 16 像素 | 400 | 1.5 | 1.5 0 |正文、搜索药丸占位符、产品说明 |
| `{typography.body-strong}` | 16 像素 | 500 | 500 1.5 | 1.5 0 |产品卡名称、过滤器行标签、主导航链接 |
| `{typography.button-lg}` | 24 像素 | 500 | 500 1.2 | 1.2 0 |英雄区块内的按信活动 CTA |
| `{typography.button-md}` | 16 像素 | 500 | 500 1.5 | 1.5 0 |整个系统的标准药丸 CTA |
| `{typography.button-sm}` | 14 像素 | 500 | 500 1.5 | 1.5 0 |紧凑型药丸 CTA、徽章标签、地理选择按钮 |
| `{typography.link-md}` | 16 像素 | 500 | 500 1.75 | 1.75 0 |带下划线的内联链接，“查看产品详细信息”|
| `{typography.caption-md}` | 14 像素 | 500 | 500 1.5 | 1.5 0 |产品副标题（“男士越野跑鞋”）、过滤器计数、页脚链接 |
| `{typography.caption-sm}` | 12 像素 | 500 | 500 1.5 | 1.5 0 |滤光片标签、徽章文字、颜色计数 |
| `{typography.utility-xs}` | 9 像素 | 500 | 500 1.75 | 1.75 0 |合法版权/最底部的精美印刷行|### 排版原则
该系统在极端的印刷对比度上运行：单个 96 像素大写显示层保留用于编辑活动时刻，而安静的 12-16 像素 Helvetica Now 文本/中层则承载其他所有内容。几乎没有中间地带 - 从“{typography.heading-xl}”（32px）直接跳转到“{typography.body-strong}”（16px）是有意的，并在每个页面上创建“上面的广告牌，下面的目录”效果。字母间距保留为 0（Futura ND 和 Helvetica Now 均经过裁剪，以实现在比例上紧密的光学配合）。### 字体备选说明
与 Nike 显示层最接近的开源路径是 **Bebas Neue**（免费，几何压缩），尺寸为 96px/0.9/大写/500。对于 UI 文本，**Inter** 是最安全的替代品 - 匹配权重 400/500，并且系统在按钮和标题尺寸下的读取几乎相同。## 布局与间距 (Layout)



### 间距系统
- **基本单位：** 8px
- **标记（前面的内容）：** `{spacing.xxs}` (2px) · `{spacing.xs}` (4px) · `{spacing.sm}` (8px) · `{spacing.md}` (12px) · `{spacing.lg}` (18px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (30px) · `{spacing.section}` (48px+)
- **通用节奏：** 集合中的每个页面都使用 `{spacing.section}` (48px) 作为主要内容块之间的垂直间隙（活动英雄 → 趋势行 → 特色行 → 按运动分类 → 最新服装 → 页脚）。 PLP 卡网格使用“{spacing.sm}”(8px) 间距。 PDP 显示行以“{spacing.xl}”（24 像素）垂直内边距堆叠。
- **卡片内部填充：** 产品卡片使用 0px 内部填充 — 图像为全出血；元数据行位于正下方，名称、副标题和价格之间有“{spacing.sm}”（8 像素）间隙。### 网格与容器
- **最大宽度：** ~1440px 内容区域，边缘间距在 1920px 时增长到 ~80px（系统让非常宽的视口呼吸而不是拉伸）。
- **列模式：** PLP 列表在桌面上使用 3 合一，在 1023 像素时折叠为 2 合，在 599 像素时折叠为 1 合。男士主页“/men”混合了 2 幅竞选英雄行、3 幅或 4 幅“当下流行”行、水平滚动的“按运动购物”栏和 4 幅“最新服装”缩略图网格。
- **过滤器侧边栏：** 桌面 PLP 上约 220 像素的固定宽度左栏，在窄宽度时折叠成“隐藏过滤器”切换按钮。### 留白哲学
空白是一种分隔的工具，而不是呼吸的工具。各部分以“{spacing.section}”节奏直接垂直相互对接，产品照片在网格内边缘到边缘平铺 - 产品图像本身没有填充。 “空气”来自照片的“{colors.soft-cloud}”背景，而不是来自布局边距。标题上方没有装饰性空白；它们位于区域分隔线的正下方。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0 — 平 |无阴影，无边框 |卡片、按钮、部分的默认设置——主要处理方式 |
| 1 — 发际线分隔线 | 1px 实心`{colors.hairline}` |过滤器行分隔符、页脚列边框、PDP 公开行分隔符 |
| 2 — 插入底线| `box-shadow：插入 0 -1px 0 {colors.hairline-soft}` |粘性实用程序/子导航栏底部边缘，选项卡条下划线 |

该系统在其零售版中根本没有投影高度。卡片不会在页面上浮起。唯一的深度提示是粘条上 1 像素的嵌入细线以及全出血摄影和“{colors.soft-cloud}”产品背景之间的对比度。### 装饰性深度
Nike 系统的深度完全来自摄影，而不是 CSS 效果：
- **社论活动图块**通过电影视角创造深度 - 小径上的跑步者、庭院中的模特 - Futura 显示标题以白色或“{colors.ink}”直接覆盖在图像上。
- **产品卡片摄影**是在平面“{colors.soft-cloud}”上拍摄的，以消除任何背景深度，因此产品本身是页面上唯一具有形式的东西。
- 主页上的**运动类别图块**采用全出血电影摄影，左下角固定有一个小“{component.button-outline-on-image}”药丸，在大气图像的衬托下呈现出清晰的白色药丸的瞬间。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.none}` | 0 像素 |卡片、活动图块、产品图像、导航、页脚 - 系统中的每个容器 |
| `{rounded.sm}` | 18 像素 |会员福利锁定中的头像/图标容器|
| `{rounded.md}` | 24 像素 |搜索药丸、搜索提交、过滤输入 |
| `{rounded.lg}` | 30 像素 |每个 CTA 药丸 — 主要、次要、图像上、过滤芯片、地理选择器、“通知我”|
| `{rounded.full}` | 9999 像素 |颜色样本点和圆形图标按钮（返回、分享、收藏夹、轮播桨）|### Photography Geometry
- **产品卡：** 一致的 1:1 正方形或近正方形（高产品作物上约为 4:5 肖像），卡片内全出血，无填充，位于“{colors.soft-cloud}”背景上。
- **社论活动英雄：** ~16:9 或更宽的电影裁剪，在内容最大宽度上全出血，Futura 显示标题烧入左下或左上三分之一。
- **运动类导轨：** 4:5 肖像全出血缩略图，左下角固定有一个小 CTA 药丸。
- **PDP 主图像：** 方形主图像，左侧带有垂直缩略图栏（约 5-7 个缩略图以小尺寸堆叠），无需离开页面即可快速进行颜色/角度浏览。
- **头像/类别图标卡：** 在“{colors.canvas}”上约 80–96 像素处居中的插图图标，下面带有“{typography.caption-md}”标签。## 核心组件 (Components)

> **根据系统策略没有记录悬停状态**。每个规格仅涵盖默认和活动/按下；变体作为单独的“组件：”条目存在于前面的内容中。### 按钮设计
**`button-primary`** — 通用 Nike CTA
- 背景“{colors.ink}”，文本“{colors.on-primary}”，类型“{typography.button-md}”，填充“16px 32px”，高度“{spacing.section}”(48px)，圆形“{rounded.lg}”(30px丸)。
- 用于系统中的每个主要操作：“注册”、“通知我”、“购买”、“土耳其”地理确认、运动板块上的“商店”覆盖、“继续”。
- 按下状态处于“button-primary-active”状态 - 背景保持“{colors.ink}”，而表面则缩小到“scale(0.5)”，透明度为“opacity: 0.5”（从所有五个页面中提取的耐克标志性“点击折叠”反馈）。

**`button-secondary`** — 浅色表面上的软替代品
- 背景“{colors.soft-cloud}”，文本“{colors.ink}”，类型“{typography.button-md}”，填充“16px 32px”，圆角“{rounded.lg}”。
- 当主要 CTA 已经存在时，用作较低强调的替代选项，例如黑色“Türkiye”确认旁边的“美国”地理衰退；轻卡上的“取消”或“发现更多”。

**`button-outline-on-image`** — 在摄影上叠加 CTA
- 背景“{colors.canvas}”，文本“{colors.ink}”，类型“{typography.button-md}”，填充“12px 24px”，圆角“{rounded.lg}”。
- 清晰的白色药丸固定在每个全屏运动类别和社论活动板块的左下角。

**`button-icon-circular`** — chrome 图标控件
- 背景`{colors.soft-cloud}`或透明，图标`{colors.ink}`，圆形`{rounded.full}`，大小40px。
- 用于后退箭头、轮播桨（左/右）、心愿单、分享和“隐藏过滤器”切换。

**`过滤器芯片`** + **`过滤器芯片活动`**
- 默认：背景“{colors.canvas}”、文本“{colors.ink}”、1px 细线“{colors.hairline}”、类型“{typography.button-md}”、圆形“{rounded.lg}”、填充“8px 16px”。
- 活动：背景“{colors.ink}”，文本“{colors.on-primary}”——选择时芯片会完全翻转。没有中间状态。### 输入框与表单
**`搜索药丸`** + **`以搜索药丸为中心`**
- 默认：背景“{colors.soft-cloud}”，文本“{colors.ink}”，类型“{typography.body-md}”，圆角“{rounded.md}”(24px)，填充“8px 16px”，高度“40px”。固定在主导航右侧，带有一个小放大镜图标。
- 聚焦：背景`{colors.canvas}`，2px实心边框`{colors.ink}`，带有12px外光晕`{colors.soft-cloud}`（系统唯一的“聚焦环”效果）。药丸形状保持“{rounded.md}”，因此光环看起来像柔软的手套，而不是坚硬的轮廓。### 卡片与容器
**`产品卡**
- 容器：背景`{colors.canvas}`，圆角`{rounded.none}`，填充0，无阴影。
- 图像区域：`{component.product-card-image}` — `{colors.soft-cloud}` 方块上的全出血产品照片。
- 下图（按此顺序，中间有“{spacing.sm}”）：样本点行（12px 圆形的 3-6 个点）、促销徽章（如果适用）（“{component.badge-promo}”“刚刚推出”、“即将推出”、“回收材料”）、产品名称“{typography.body-strong}”“{colors.ink}”、类别副标题“{typography.caption-md}” `{colors.mute}`，价格行。
- 价格行：常规价格`{typography.body-strong}``{colors.ink}`。如果促销：折扣价“{colors.sale}”，后面加上删除线的原始“{colors.mute}”，后面加上“{colors.sale}”中的“% off”。

**`campaign-tile`** — 品牌的标志性编辑单位
- 带有“{typography.display-campaign}”标题的全出血摄影（大写，96 像素，行高 0.9）。
- 标题颜色是根据底层图像读取的“{colors.canvas}”或“{colors.ink}”中的任何一个 - 未参数化；按资产选择。
- 锚定在图块左下角的单个“{component.button-outline-on-image}”药丸带有号召性用语。

**`类别图标卡`**
- 容器：背景“{colors.canvas}”，圆形“{rounded.none}”。
- 居中的类别插图（~80px）+正下方的标签“{typography.caption-md}”“{colors.ink}”。用于 `/men` 上的“最新服装”4-8 幅图标条。

**`会员优惠卡`**
- 深色图像背景上的全出血照片卡；复制左下角的插槽，其中包含“{typography.heading-lg}”标题“{colors.on-primary}”和下面的“{component.button-outline-on-image}”“探索”药丸。
- 用于“/membership”“会员福利”3-up 网格。

**`样本点`** + **`样本点活动`**
- 12px 圆圈，圆角`{rounded.full}`，默认状态下无边框。在每个产品卡和 PDP 颜色选择器上呈现颜色选项。
- 默认：填充色系的实际产品颜色（在运行时从产品图像中提取），白色/浅色色系的“{colors.hairline}”中的 1px 细微外环，以便它们在“{colors.canvas}”上保持可见。
- Active：相同的填充，具有 2px `{colors.ink}` 外环和 2px 白色内部间隙，创建 Nike 标志性同心环“选定”状态。默认和活动之间没有大小变化。

**`徽章促销`**
- 背景“{colors.canvas}”，带有 1px 细线“{colors.hairline}”，文本“{colors.ink}”，类型“{typography.caption-sm}”，圆形“{rounded.lg}”，填充“4px 12px”。
- 位于产品图像顶部（卡片左上角），并带有“刚刚推出”、“即将推出”、“再生材料”、“会员专享”等文案。

**`徽章销售文本`**
- `{colors.sale}` 中的内联价格行文本，没有背景 - 系统中唯一没有容器的“徽章”。### Navigation
**`实用工具栏`** — 顶部实用工具条
- 背景“{colors.soft-cloud}”，文本“{colors.ink}”，类型“{typography.caption-sm}”，高度~36px，圆形“{rounded.none}”。
- 右对齐簇：“查找商店·帮助·加入我们·登录”。始终在场；永远不会崩溃。

**`primary-nav`** — 主导航
- 背景“{colors.canvas}”，文本“{colors.ink}”，为导航链接输入“{typography.body-strong}”，高度 56–64px，圆形“{rounded.none}”。
- 布局：耐克旋风标志位于左侧 (32×32)，居中导航行（“新品和精选·男士·女士·儿童·乔丹·耐克 SKIMS·运动”），右侧集群（搜索药丸、愿望清单心形图标、包图标）。
- 活动部分在“{colors.ink}”中获得 2px 底部下划线 — 无背景填充。

**子导航条** (PLP) — 显示在主导航下，带有面包屑 + 排序 + 隐藏过滤器控件。
- 相同的“{colors.canvas}”背景，带有 1px 内嵌细线软底边缘。
- 左：“{typography.caption-md}”“{colors.mute}”中的面包屑，以“/”分隔。
- 右：“隐藏过滤器”切换+“排序方式：...”下拉菜单 - 均位于带有 V 形图标的“{typography.button-md}”中。

**顶部导航（移动）**
- 汉堡菜单图标（左）、Nike 旋风图标（中）、搜索 + 包图标（右）。
- 搜索药丸会折叠成宽度较窄的仅图标按钮；点击可展开带有“{rounded.md}”的全角覆盖搜索药丸。
- 主导航折叠成一个全高抽屉，从左侧滑入，自上而下列出导航行，并带有“{spacing.xl}”垂直填充。### Signature Components
**`pdp-disclosure-row`** — PDP 信息手风琴行
- “查看产品详细信息”、“运输和退货”、“评论 (n)”的堆叠行，每个行下方带有“{spacing.xl}”垂直填充和 1 像素“{colors.hairline}”分隔线。
- 标签“{typography.body-strong}”“{colors.ink}”左对齐； V 形“{colors.ink}”右对齐。

**`faq-row`** — `/membership` 常见问题手风琴
- 与“pdp-disclosure-row”相同的模式，但具有“{typography.heading-md}”标签权重；每个下面有 1px `{colors.hairline}` 分隔线。

**`过滤器侧边栏`** — PLP 左导轨
- 容器“{colors.canvas}”，圆形“{rounded.none}”。
- 节标题“{typography.body-strong}”“{colors.ink}”，组之间具有“{spacing.lg}”(18px)垂直间隙。
- 主动滤镜获得 1 像素墨水下划线；括号中的计数使用“{colors.mute}”。

**`页脚`**
- 背景“{colors.canvas}”，带有单个 1px“{colors.hairline}”顶部分隔线。
- 四列：资源/帮助/公司/促销和折扣，每列都有列标题“{typography.body-strong}”“{colors.ink}”和链接列表“{typography.caption-md}”“{colors.mute}”。
- 列下方：一条水平线，然后是带有“{typography.utility-xs}”“{colors.mute}”（版权、区域设置切换器、术语、隐私、供应链法案）的精美印刷行。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 专门为编辑活动英雄锁定保留“{typography.display-campaign}”——切勿将 96px Futura 用于部分标题或产品标题。
- 使用“{component.button-primary}”（“{colors.ink}”药丸）作为每个视口的单个主要操作。最多将其与“{component.button-secondary}”（“{colors.soft-cloud}”药丸）配对以获得软替代方案。
- 在“{colors.soft-cloud}”上展示每张产品照片 - 灰色是系统的“工作室”。
- 将所有 CTA 保持为药丸形状，位于“{rounded.lg}”（30 像素）。切勿引入方形或“{rounded.sm}”按钮。
- 仅在价格行上使用“{colors.sale}”——切勿在背景、徽章或镶边上使用。
- 以“{spacing.section}”（48px）节奏堆叠内容部分，它们之间没有装饰性分隔线；摄影的出血边缘是分隔线。
- 在左下角使用“{component.button-outline-on-image}”（白色药丸）锚定图像上的 CTA——系统通用的“购买此图像”位置。### 禁止事项
- 不要引入阴影或卡片高度。卡片平放在页面上；唯一的深度提示是粘性条上 1 像素的嵌入细线。
- 请勿将任何类别强调色（“{colors.accent-pink}”、“{colors.accent-purple-soft}”、“{colors.accent-teal}”）用于主镶边 — 它们仅属于样本点、软图块填充和编辑时刻。
- 不要将“{colors.ink}”替换为类似“{colors.charcoal}”的接近黑灰色的 CTA — Nike 的主要药丸是真正的“#111111”。
- 请勿在产品卡内填充内容。图像是全出血的；元数据位于行之间的“{spacing.sm}”（8px）正下方。
- 不要将两个广告活动图块以相同的比例放置在同一行中 - Nike 将单个全出血编辑图块与 2 幅或 4 幅产品/类别网格交替放置。
- 除了“{typography.link-md}”内联链接和活动的主要导航指示器之外，不要在任何内容下划线。按钮、标题和价格保持无下划线。
- 不要引入第三种按钮形状。药丸或圆形图标——这就是整个按钮形状的词汇。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|超宽 | 1920 像素以上 |内容最大宽度保持在~1440px；外排水沟每侧增长至约 80 像素 |
|桌面大| 1440 像素 |默认桌面布局 — 3 幅产品网格、4 幅服装条、完整的主导航 |
|桌面| 1200 像素 |与大号相同，外排水沟稍窄 |
|桌面小| 1024 像素 |过滤器侧边栏开始压缩；运动导轨显示 ~3 个可见瓷砖 |
|平板电脑| 1023–961 像素 | 3-up PLP 折叠为 2-up； “隐藏过滤器”成为默认切换 |
|平板电脑窄| 960–640 像素 |主导航中心集群折叠成汉堡抽屉；搜索药丸变为仅图标 |
|移动景观| 639–600 像素 | 2-up PLP 折叠为 1-up；通过图像和元数据堆叠，产品卡变为全宽 |
|移动 | 599–320 像素 |单列一切；活动图块以全屏宽度呈现，Futura 尺寸较短 (~64px) |### Touch Targets
所有交互元素均符合 WCAG AAA（最小 44×44 像素）。药丸（“{component.button-primary}”、“{component.button-secondary}”）的高度为 48 像素，水平内边距为 32 像素。图标圆形按钮 (`{component.button-icon-circular}`) 位于 40 像素处 — Nike 的 PDP 旋转木马桨和心愿单心形按钮位于 AAA 下方但位于 AA 上方，尺寸为 40×40，命中目标填充将可点击区域扩展至 48 像素以上。过滤芯片药丸高度为 40 像素，填充为 16 像素。### Collapsing Strategy
- **主要导航：**桌面中心集群→由旋风左侧的汉堡包触发的移动抽屉。
- **PLP 网格：** 3-up → 2-up → 1-up 在 1023、599 及以下；在移动设备上，间距从“{spacing.sm}”下降到“{spacing.xs}”。
- **过滤器侧边栏：** 220px 固定→“隐藏过滤器”切换→移动设备上的画布外全屏过滤器抽屉。
- **运动导轨：** 桌面水平滚动，约 5 个可见 → 移动水平滚动，约 1.5 个可见（查看下一张卡片模式）。
- **章节间距：** `{spacing.section}` 48px 桌面 → 32px 平板电脑 → 24px 移动设备，以在小屏幕上保持紧凑的编辑节奏。
- **编辑活动标题：** 桌面 96 像素 → 平板电脑 64 像素 → 移动设备 48 像素，所有尺寸的行高均保持在 0.9。### Image Behavior
- 产品图像在所有断点上均以相同的 1:1 比例响应 - 图像会缩放，而比例则不会。
- 编辑活动图块使用艺术指导裁剪：桌面上 16:9 宽的英雄会替换为移动设备上 4:5 的肖像，因此人物保持居中，标题仍然有烙印空间。
- 当用户滚动到下一个网格行时，所有非关键产品图像都会延迟加载。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。从前面的内容中提取其 YAML 条目并验证每个属性是否解析。
2. 直接引用组件名称和标记（“{colors.ink}”、“{component.button-primary-active}”、“{rounded.lg}”）——不要在散文中解释颜色名称或半径。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”——“broken-ref”、“contrast-ratio”和“orphaned-tokens”警告会自动标记问题。
4. 添加新变体作为单独的组件条目（`-active`、`-disabled`、`-focused`）——不要将它们埋在散文中。 Nike 的按下状态（`scale(0.5) opacity 0.5`）是故意的，并且必须是它自己的条目，而不是悬停替身。
5.默认正文为`{typography.body-md}`；使用“{typography.body-strong}”获取产品名称和主要导航链接；严格保留“{typography.display-campaign}”用于英雄战役锁定。
6. 保持每个视口中“{colors.ink}”稀缺——如果同一折叠中出现多个纯黑色药丸或块，请将其中之一中和为“{component.button-secondary}”或“{component.button-outline-on-image}”。
7. 在引入新组件时，在添加新标记之前询问是否可以用现有的丸+平卡+摄影-“{colors.soft-cloud}”词汇来表达。该系统的优势在于它几乎不需要新的。## 已知局限与补充说明 (Known Gaps)

- **未捕获移动屏幕截图** - 上述响应行为从桌面证据和从令牌中提取的断点列表综合了 Nike 已知的移动模式（汉堡抽屉、1-up 网格、标题缩小）。
- **系统策略未记录的悬停状态** — Nike 的 CSS 使用 `--pds-color-element-hover` 和 `--pds-color-text-hover` 标记，但这些不包含在此处。
- 无法从捕获的表面确认超出地理选择器和国家确认药丸对的**对话框/模式样式**；包、心愿单和登录覆盖层未记录。
- 用于结帐、注册和地址表单的 **表单字段样式** 不存在于捕获的表面中 - 仅记录了搜索药丸。
- **购物袋和心愿单**图标状态变体（填充计数徽章）在捕获的页面中不可见。
