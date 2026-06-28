---
version: alpha
name: PostHog
description: |
  A playful developer-tools system rendered on a warm cream canvas with hand-drawn hedgehog mascots dotted across every page like marginalia in a sketchbook. The chrome reads like a friendly engineering blog: olive-gray ink (#4d4f46) for body, deep olive-charcoal (#23251d) for headlines, IBM Plex Sans Variable typography in tight 1.43-line-height paragraphs, and a single saturated yellow-orange CTA pill (#f7a501) carrying every primary action. The system actively rejects the genre's typical somber dark-tech aesthetic in favor of a creamy, textbook-illustration sensibility — bordered cards stack on the cream canvas with 4–6px radii, doc sidebars use rounded outline-icon mini-illustrations, and the home page leans on cartoon characters (hedgehogs in lab coats, hedgehogs at terminals, hedgehogs in lounge chairs) as its signature decoration. Code samples and product analytics charts live inside white-on-cream cards with thin olive borders; the contrast between the playful illustration and the data-dense product imagery is the brand's signature voice.

colors:
  primary: "#f7a501"
  primary-pressed: "#dd9001"
  primary-active: "#b17816"
  on-primary: "#23251d"
  ink: "#23251d"
  body: "#4d4f46"
  charcoal: "#33342d"
  mute: "#6c6e63"
  ash: "#9b9c92"
  stone: "#b6b7af"
  hairline: "#bfc1b7"
  hairline-soft: "#dcdfd2"
  on-dark: "#ffffff"
  canvas: "#eeefe9"
  surface-soft: "#e5e7e0"
  surface-card: "#ffffff"
  surface-doc: "#fcfcfa"
  surface-dark: "#23251d"
  link-blue: "#1d4ed8"
  link-teal: "#1078a3"
  accent-blue: "#2c84e0"
  accent-blue-soft: "#dceaf6"
  accent-red: "#cd4239"
  accent-red-soft: "#f7d6d3"
  accent-green: "#2c8c66"
  accent-green-soft: "#d9eddf"
  accent-purple: "#7c44a6"
  accent-purple-soft: "#e7d8ee"
  focus-ring: "rgba(59,130,246,0.5)"

typography:
  display-xl:
    fontFamily: IBM Plex Sans Variable
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0
  display-lg:
    fontFamily: IBM Plex Sans Variable
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.33
    letterSpacing: -0.6px
  heading-lg:
    fontFamily: IBM Plex Sans Variable
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: -0.5px
  heading-md:
    fontFamily: IBM Plex Sans Variable
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0
  heading-sm:
    fontFamily: IBM Plex Sans Variable
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0
    textTransform: uppercase
  heading-sm-mixed:
    fontFamily: IBM Plex Sans Variable
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.56
    letterSpacing: 0
  body-md:
    fontFamily: IBM Plex Sans Variable
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: IBM Plex Sans Variable
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: IBM Plex Sans Variable
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.71
    letterSpacing: 0
  body-sm-strong:
    fontFamily: IBM Plex Sans Variable
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.71
    letterSpacing: 0
  body-xs:
    fontFamily: IBM Plex Sans Variable
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0
  caption-md:
    fontFamily: IBM Plex Sans Variable
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.71
    letterSpacing: 0
  caption-sm:
    fontFamily: IBM Plex Sans Variable
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  caption-xs:
    fontFamily: IBM Plex Sans Variable
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0
    textTransform: uppercase
  utility-xs:
    fontFamily: IBM Plex Sans Variable
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0
    textTransform: uppercase
  link-md:
    fontFamily: IBM Plex Sans Variable
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-md:
    fontFamily: IBM Plex Sans Variable
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0
  button-sm:
    fontFamily: IBM Plex Sans Variable
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  code-sm:
    fontFamily: ui-monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  code-xs:
    fontFamily: Source Code Pro
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    height: 40px
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
    height: 40px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  button-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ash}"
    rounded: "{rounded.md}"
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 36px
  text-input-focused:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  search-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 36px
  product-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  doc-card:
    backgroundColor: "{colors.surface-doc}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  feature-tile:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-sm-mixed}"
    rounded: "{rounded.md}"
    padding: 20px
  pricing-tier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 32px
  hedgehog-mascot-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 24px
  product-tab:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  product-tab-active:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
  pill-tab:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  pill-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
  badge-uppercase:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.utility-xs}"
    rounded: "{rounded.none}"
  badge-promo:
    backgroundColor: "{colors.accent-blue-soft}"
    textColor: "{colors.link-blue}"
    typography: "{typography.caption-xs}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  banner-tip-blue:
    backgroundColor: "{colors.accent-blue-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  banner-tip-green:
    backgroundColor: "{colors.accent-green-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  banner-tip-red:
    backgroundColor: "{colors.accent-red-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  banner-tip-purple:
    backgroundColor: "{colors.accent-purple-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  code-block:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.md}"
    padding: 16px 20px
  inline-code:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-xs}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    height: 56px
  sub-nav-strip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.body-xs}"
    rounded: "{rounded.none}"
    height: 40px
  doc-sidebar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-xs}"
    rounded: "{rounded.none}"
    width: 240px
  footer-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-xs}"
    rounded: "{rounded.none}"
    padding: 32px 24px
  link-inline:
    textColor: "{colors.link-teal}"
    typography: "{typography.link-md}"
---

## Dig UI CSS Tokens

```css
--dig-bg: #eeefe9;
--dig-bg-soft: #eeefe9;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #23251d;
--dig-text-muted: #4d4f46;
--dig-text-soft: #4d4f46;
--dig-accent: #f7a501;
--dig-accent-strong: #b17816;
--dig-accent-2: #f7a501;
--dig-accent-2-strong: #f7a501;
--dig-border: #bfc1b7;
--dig-border-strong: #bfc1b7;
--dig-grid-line: #dcdfd2;
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #f7a501;

--dig-font-sans: IBM Plex Sans Variable;
--dig-font-mono: ui-monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 13px;
--dig-text-md: 14px;
--dig-text-lg: 15px;
--dig-text-xl: 16px;
--dig-text-2xl: 18px;
--dig-text-3xl: 20px;
--dig-text-4xl: 21px;
--dig-text-5xl: 24px;

--dig-radius-sm: 4px;
--dig-radius-md: 6px;
--dig-radius-lg: 8px;
--dig-radius-xl: 16px;
--dig-radius-pill: 9999px;

--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 12px;
--dig-space-6: 16px;
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

> **源页面：** `/`（主页）、`/pricing`（定价详细信息）、`/docs/product-analytics`（文档文章）、`/workflows`（产品功能页面）。所有四个页面的镀铬调色板都是相同的 - 只有文档特定的重音（标注横幅粉彩、代码块深色表面）专门出现在文档体验中。### 品牌与主色
- **PostHog Yellow** (`{colors.primary}` — `#f7a501`)：通用主要 CTA。每个导航右上角的粘性“开始 - 免费”药丸、英雄 CTA、定价层订阅按钮、页脚注册药丸。系统唯一的饱和色矩。
- **黄色压制** (`{colors.primary-pressed}` — `#dd9001`)：主要药丸的压制状态。
- **黄色活动**（`{colors.primary-active}` — `#b17816`）：深压黄色+系统的金色边框强调（内联表单元素上罕见的1px黄金规则）。### 表面与背景
- **Canvas** (`{colors.canvas}` — `#eeefe9`)：温暖的奶油色页面背景。每个页面都端到端；该品牌最具特色的表面选择。
- **软表面** (`{colors.surface-soft}` — `#e5e7e0`)：按钮辅助填充、子导航条背景、内联代码芯片背景。
- **Surface Card** (`{colors.surface-card}` — `#ffffff`)：真正的白卡和平铺背景位于奶油色画布上。主要卡面。
- **Surface Doc** (`{colors.surface-doc}` — `#fcfcfa`)：文档文章主体卡内使用的淡奶油色暖白色 — 比纯白色稍微柔和，以保持页面色调统一。
- **Surface Dark** (`{colors.surface-dark}` — `#23251d`)：深橄榄木炭用作代码块背景。与“{colors.ink}”相同的十六进制——该品牌在文本和深色代码表面上使用一种接近黑色的橄榄色。
- **发际线** (`{colors.hairline}` — `#bfc1b7`)：1px 卡片边框、表格规则、页脚列分隔线。
- **Hairline Soft** (`{colors.hairline-soft}` — `#dcdfd2`)：卡内行分隔线，软插入规则。
- **On Dark** (`{colors.on-dark}` — `#ffffff`)：`{colors.surface-dark}` 代码块上的主要文本。### 文本色
- **Ink** (`{colors.ink}` — `#23251d`)：标题、浅色按钮文本、主要导航链接 — 深橄榄木炭色，与奶油色相比，读起来接近黑色。
- **Body** (`{colors.body}` — `#4d4f46`)：默认段落文本、文档文章正文、悬停前的内联链接颜色。该品牌最常用的文字颜色。
- **木炭** (`{colors.charcoal}` — `#33342d`)：强调正文，其中正文太软。
- **静音** (`{colors.mute}` — `#6c6e63`)：元数据、页脚链接文本、列表中的辅助注释。
- **Ash** (`{colors.ash}` — `#9b9c92`)：禁用状态文本和最低强调实用程序。
- **Stone** (`{colors.stone}` — `#b6b7af`)：最不强调的标题文本和禁用的图标颜色。### 语义色
- **Link Blue** (`{colors.link-blue}` — `#1d4ed8`)：正文散文内的内联锚链接。系统的主要信息链接颜色。
- **链接青色** (`{colors.link-teal}` — `#1078a3`)：文档文章内联链接变体，与正文文本配对。
- **强调蓝色** (`{colors.accent-blue}` — `#2c84e0`) + **强调蓝色软** (`{colors.accent-blue-soft}` — `#dceaf6`)：文档内的“💡提示/信息”标注横幅。
- **强调红色** (`{colors.accent-red}` — `#cd4239`) + **强调红色软** (`{colors.accent-red-soft}` — `#f7d6d3`)：“⚠️警告/小心”标注横幅。
- **强调绿色** (`{colors.accent-green}` — `#2c8c66`) + **强调绿色软** (`{colors.accent-green-soft}` — `#d9eddf`)：“✅ 成功/积极”标注横幅。
- **强调紫色** (`{colors.accent-purple}` — `#7c44a6`) + **强调紫色软** (`{colors.accent-purple-soft}` — `#e7d8ee`)：“📘 注意/参考”标注横幅。
- **焦点环** (`{colors.focus-ring}` — `rgba(59,130​​,246,0.5)`)：交互元素周围的半透明蓝色浏览器默认焦点环。## 排版与字体系统 (Typography)



### 字体家族
**IBM Plex Sans Variable** 是系统的主要外观 — 用于每个页面上的每个文本角色，粗细为 400（常规）、500（中）、600（半粗体）、700（粗体）和 800（超粗体）。通过“IBM Plex Sans”→“-apple-system”→“system-ui”→广泛的跨平台 sans 堆栈回退。

**ui-monospace** + **Source Code Pro** 包含 14px / 1.43 行高的代码示例和内联代码芯片。 Source Code Pro 是显式显示等宽字体； ui-monospace 处理内联 `<code>` 芯片。

具有品牌特色的选择是**混合重量阶梯**（400 / 500 / 600 / 700 / 800） - 大多数铬合金都在 400-700 范围内，重量 800 专门为家庭和定价的较大显示标题保留。这给系统带来了“工程博客”的感觉：层次结构是根据重量对比而不是尺寸构建的。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 36 像素 | 700 | 1.5 | 1.5 0 |英雄标题（“构建产品的新方法”）|
| `{typography.display-lg}` | 24 像素 | 800 | 1.33 | 1.33 -0.6 像素 |部分标题，定价等级名称 |
| `{typography.heading-lg}` | 21 像素 | 700 | 1.4 | 1.4 -0.5 像素 |小节标题，文档文章 H2 |
| `{typography.heading-md}` | 20 像素 | 700 | 1.4 | 1.4 0 |卡片组标题、网格内标题 |
| `{typography.heading-sm}` | 18 像素 | 700 | 1.5 | 1.5 0（大写）|科眉（“了解产品用途”）|
| `{typography.heading-sm-mixed}` | 18 像素 | 600 | 1.56 | 1.56 0 |混合大小写的卡片标题（无大写转换）|
| `{typography.body-md}` | 16 像素 | 400 | 1.5 | 1.5 0 |正文，默认段落 |
| `{typography.body-strong}` | 16 像素 | 600 | 1.5 | 1.5 0 |内联强调、主要导航链接、卡片内标签 |
| `{typography.body-sm}` | 15 像素 | 400 | 1.71 | 1.71 0 |文档文章正文、营销卡说明 |
| `{typography.body-sm-strong}` | 15 像素 | 600 | 1.71 | 1.71 0 |文档文章中的小节强调 |
| `{typography.body-xs}` | 14 像素 | 500 | 500 1.43 | 1.43 0 |文档侧边栏项目、元数据、列表内标题 |
| `{typography.caption-md}` | 14 像素 | 700 | 1.71 | 1.71 0 |卡眉、链接簇头|
| `{typography.caption-sm}` | 13 像素 | 500 | 500 1.5 | 1.5 0 |紧凑的元数据标题|
| `{typography.caption-xs}` | 12 像素 | 600 | 1.33 | 1.33 0（大写）|内联徽章标签 |
| `{typography.utility-xs}` | 12 像素 | 700 | 1.33 | 1.33 0（大写）|节眉实用文本，页脚类别页眉|
| `{typography.link-md}` | 16 像素 | 400 | 1.5 | 1.5 0 |内联正文锚链接 |
| `{typography.button-md}` | 14 像素 | 700 | 1.5 | 1.5 0 |标准主/辅助按钮标签 |
| `{typography.button-sm}` | 13 像素 | 500 | 500 1 | 0 |药丸芯片/紧凑型 CTA |
| `{typography.code-sm}` | 14 像素 | 400 | 1.43 | 1.43 0 |代码块内容 |
| `{typography.code-xs}` | 14 像素 | 500 | 500 1.43 | 1.43 0 |内嵌代码芯片|### 排版原则
层次结构是根据粗细+大小+偶尔的大写转换明确构建的——没有斜体样式，没有装饰性显示变体，没有专有的字体。最大显示时刻使用权重 800，跟踪 -0.6px，主体稳定在 400，行高 1.5；其他一切都填满了两者之间的范围。部分眉毛（“{typography.heading-sm}”和“{typography.utility-xs}”）始终呈现大写，这使文档布局具有教科书章节的感觉。### 字体备选说明
IBM Plex Sans Variable 是开源的并且由 Google Fonts 托管。不需要替代品——直接加载。如果确实需要替补，**国际米兰**是所有五个重量中最接近的几何匹配；与 Inter 在显示尺寸上的字母间距 -0.5 到 -0.6px 配对，以近似 Plex 的显示跟踪。对于等宽字体，**JetBrains Mono** 是 Source Code Pro 在正文尺寸方面近乎完美的替代品。## 布局与间距 (Layout)



### 间距系统
- **基本单位：** 8px（更精细的 2/4/6px 步长，用于标注横幅和药丸按钮中的紧密内联间隙）。
- **标记（前面的内容）：** `{spacing.xxs}` (2px) · `{spacing.xs}` (4px) · `{spacing.sm}` (8px) · `{spacing.md}` (12px) · `{spacing.lg}` (16px) · `{spacing.xl}` (24px) · `{spacing.xxl}` (32px) · `{spacing.section}` (80px)。
- **通用部分节奏：** 集合中的每个页面都使用 `{spacing.section}` (80px) 作为主要内容块之间的垂直间隙。卡片网格使用 `{spacing.lg}` (16px) 间距；产品卡的卡内部填​​充位于“{spacing.xl}”（24 像素），定价层卡的卡内部填​​充位于“{spacing.xxl}”（32 像素）。### 网格与容器
- **最大宽度：** 桌面上约 1280 像素内容区域，带 24 像素装订线（超宽时约 48 像素）。文档文章正文的最大宽度约为 720 像素，侧边栏将文章列推到中心右侧，宽度为 240 像素。
- **营销卡网格：** 桌面上 4 幅，1024 像素 3 幅，768 像素 2 幅，480 像素 1 幅。卡保留固定的 1:1 或 4:3 比例。
- **定价层网格：** 桌面上为 3-up，带有计划信息的左栏，在平板电脑上折叠为 2-up + 1，在移动设备上折叠为 1-up。
- **文档布局：** 桌面 240px 粘性左侧边栏 + ~720px 文章正文 + （可选）200px 右侧目录栏 = ~1160px 内容宽度。
- **页脚：** 桌面上为 6 列水平链接网格，平板电脑上为 3 联，移动设备上为 2 联。### 留白哲学
营销页面上的空白很慷慨，文档页面上的空白很紧凑。主页和工作流程页面堆叠了带有“{spacing.lg}”（16px）装订线和 24px 内部填充的图块，而文档文章则将段落之间的内部间距收紧为“{spacing.md}”（12px），以最大限度地提高信息密度。奶油色画布连续贯穿每个部分——没有装饰性分隔线，没有阴影部分带；只有部分眉和页脚列下方 1 像素的细线规则分隔内容块。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0 — 平 |无边框，无阴影|画布上画布块、英雄文本、正文部分的默认设置 |
| 1 — 细线边框| 1px 实心`{colors.hairline}` |营销卡、定价层卡、文档侧边栏项目、页脚栏规则 |
| 2 — 发际线柔软| 1px 实心 `{colors.hairline-soft}` |相邻行之间的卡内行分隔线 |
| 3 — 反转暗码块 | `{colors.surface-dark}` 填充 |文档卡内的代码示例 - 系统唯一的“升高”表面使用颜色，而不是阴影 |

该系统在营销或产品镶边中没有投影高度。卡片平放在奶油色上，带有细橄榄色边框。单个反转时刻是文档文章主体卡内使用的深色代码块表面。### 装饰性深度
深度完全来自插图和柔和的标注带系统，而不是来自 CSS 效果：
- **手绘刺猬吉祥物** - 穿着各种服装的角色（实验室外套、终端、躺椅、放大镜、吊床、帽子）作为旁注散布在页面上。始终呈现为平面彩色插图，而不是照片。
- **柔和的标注横幅** — `{component.banner-tip-blue}` / `-green` / `-red` / `-purple` 文档文章内的软色侧栏面板，每个面板都带有表情符号图标 (💡 ✅ ⚠️ 📘) 并带有提示/警告/注释副本。
- **代码块** — “{colors.surface-dark}”上的全角深色橄榄木炭面板，带有白色代码文本。该系统最具电影感的表面，用于白色文档卡内部。
- **文档侧边栏中的概述产品图标** - 小圆角方形迷你插图（图表图标、漏斗图、会话重播图标）标记每个主要产品部分。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.none}` | 0 像素 |子导航条、页脚、文档侧边栏、主导航 — 平面结构表面 |
| `{rounded.xs}` | 2 像素 |内联`<code>`芯片，微规则亮点|
| `{rounded.sm}` | 4 像素 |内联按钮、表单输入、微芯片 |
| `{rounded.md}` | 6 像素 |营销卡、定价卡、文档卡、代码块、每个标准 CTA |
| `{rounded.lg}` | 8 像素 |选项卡顶角（活动选项卡上的“6px 6px 0 0”）和罕见的大型容器 |
| `{rounded.full}` | 9999 像素 |药丸片和药丸式 CTA（导航中的“开始使用 - 免费”粘性 CTA）|

几乎所有事物的半径词汇都集中在 4-6px 左右；唯一全面的元素是药丸式粘性导航 CTA 和内联药丸芯片。### Photography Geometry
没有摄影。视觉元素仅限于：
- **刺猬角色插图** — 平面彩色卡通刺猬，范围从约 80 像素（卡片吉祥物）到约 240 像素（英雄插图）。始终保持原生状态，从未裁剪为框架。
- **文档侧边栏中的产品图标轮廓** — 20–24px 圆角方形插图。
- **内联表情符号**位于标注横幅内 14–16 像素 (💡 ✅ ⚠️ 📘) — 用作功能性图标而不是装饰。
- 主页上的**部分插图** - 小刺猬小插图与每个“了解产品用法”/“养成粘性习惯”/“发布前测试”功能行配对。## 核心组件 (Components)

> **根据系统策略没有记录悬停状态**。每个规格仅涵盖默认和活动/按下。### 按钮设计
**`button-primary`** — 通用 PostHog CTA
- 背景“{colors.primary}”（黄橙色）、文本“{colors.on-primary}”（深橄榄色）、类型“{typography.button-md}”、内边距“8px 16px”、高度“40px”、圆角“{rounded.md}”。
- 用于“开始使用 - 免费”（粘性顶部导航 CTA）、“注册”、“免费试用”、“订阅” - 每个主要操作。
- 按下状态位于“button-primary-pressed”中 - 背景下降为“{colors.primary-pressed}”。

**`button-secondary`** — 奶油色画布上的柔软替代品
- 背景`{colors.surface-soft}` (`#e5e7e0`)，文本`{colors.ink}`，类型`{typography.button-md}`，填充`8px 16px`，高度`40px`，圆角`{rounded.md}`。
- “与销售人员交谈”、“阅读文档”、“观看演示”——第二层操作与黄色主要操作配对。

**`button-tertiary`** — 幽灵文本按钮
- 背景透明，文本“{colors.ink}”，类型“{typography.button-md}”，填充“8px 12px”，圆角“{rounded.md}”。
- 最低强调操作：“查看所有文档 →”、“浏览所有功能”。

**`按钮禁用`**
- 背景“{colors.surface-soft}”，文本“{colors.ash}” — 平坦柔和的奶油灰色。### Tabs & Chips
**`product-tab`** + **`product-tab-active`** — 主要产品部分选项卡
- 默认：透明背景，文本“{colors.body}”，类型“{typography.body-strong}”，填充“8px 12px”，圆角“{rounded.md}”。
- 活动：背景翻转为“{colors.surface-card}”（白色），文本“{colors.ink}”——标签卡从奶油色画布上升起，作为选择的视觉信号。

**`pill-tab`** + **`pill-tab-active`** — 紧凑型过滤药丸
- 默认：透明背景，文本“{colors.body}”，类型“{typography.button-sm}”，填充“6px 14px”，圆角“{rounded.full}”。
- 活动：背景翻转为“{colors.ink}”，文本“{colors.on-dark}”——选择时芯片完全翻转。

**`badge-uppercase`** — 纯文本实用程序标签
- 背景透明，“{typography.utility-xs}”中的文本“{colors.body}”（大写）——用作列表中类别前缀（“FEATURE FLAG”、“EXPERIMENT”、“HEATMAP”）。

**`徽章促销`** — 小型内联药丸芯片
- 背景“{colors.accent-blue-soft}”，文本“{colors.link-blue}”，类型“{typography.caption-xs}”，填充“2px 8px”，圆角“{rounded.full}”。
- “新”、“测试版”、“即将推出”药丸标签覆盖在卡片上。### 输入框与表单
**`文本输入`** + **`文本输入聚焦`**
- 默认：背景“{colors.surface-card}”，文本“{colors.ink}”，1px实心“{colors.hairline}”，类型“{typography.body-md}”，填充“8px 12px”，高度“36px”，圆角“{rounded.md}”。
- 聚焦：同一表面； 2px 实线 `{colors.accent-blue}` 边框取代了 1px 发际线 + 半透明 `{colors.focus-ring}` 轮廓。

**`search-input`** — 实用程序搜索字段（文档侧边栏，“询问 PostHog AI”）
- 与“文本输入”尺寸相同，在“{colors.mute}”中左边缘有一个放大镜字形。### 卡片与容器
**`产品卡`** — 营销板块/功能卡
- 容器：背景“{colors.surface-card}”（白色）、1px实心“{colors.hairline}”、填充“{spacing.xl}”（24px）、圆形“{rounded.md}”。
- 布局：左上角的小刺猬插图，“{typography.heading-sm-mixed}”标题，“{typography.body-sm}”描述，可选“{component.button-tertiary}”“了解更多→”链接。

**`doc-card`** — 文档文章正文卡
- 容器：背景`{colors.surface-doc}`（`#fcfcfa`暖白色），1px实心`{colors.hairline}`，填充`{spacing.xl}`（24px），圆形`{rounded.md}`。
- 包含文章正文部分、代码块、标注横幅和文档页面内的表格。

**`feature-tile`** — 小型营销功能块
- 容器：背景“{colors.surface-card}”、1px实心“{colors.hairline}”、填充“{spacing.lg}”(20px)、圆形“{rounded.md}”。
- 用于主页和工作流程页面上的 3 幅或 4 幅网格 - 搭配小图标和 1 行描述。

**`pricing-tier-card`** — 定价计划卡
- 容器：背景“{colors.surface-card}”、1px实心“{colors.hairline}”、填充“{spacing.xxl}”(32px)、圆形“{rounded.md}”。
- 布局：“{typography.display-lg}”中的层名称（24px / 800 / -0.6px），大价格+周期，带有检查图标项目符号的功能清单，底部有主要或次要 CTA。

**`hedgehog-mascot-card`** — 带有边距锚定刺猬的功能卡
- 与“{component.product-card}”相同的镶边，但在右边距或右上角有手绘的刺猬插图——该品牌的标志性卡片变体。### Callout Banners
**`横幅尖端蓝色`** + **`横幅尖端绿色`** + **`横幅尖端红色`** + **`横幅尖端紫色`**
- 背景“{colors.accent-blue-soft}”/“{colors.accent-green-soft}”/“{colors.accent-red-soft}”/“{colors.accent-purple-soft}”，文本“{colors.ink}”，类型“{typography.body-md}”，填充“16px 20px”，圆角“{rounded.md}”。
- 每个前缀都带有内联表情符号图标 (💡 / ✅ / ⚠️ / 📘)，后跟内联标签和正文副本。
- 仅出现在文档文章正文内。四色标注系列是该品牌的信息架构词汇，用于长格式文档中的内联提示/警告/信息。### Code
**`code-block`** — 文档卡内的深色代码示例
- 容器：背景“{colors.surface-dark}”（深橄榄木炭），“{typography.code-sm}”中的文本“{colors.on-dark}”，填充“16px 20px”，圆形“{rounded.md}”。
- 语法突出显示使用柔和的强调色（蓝色表示关键字，绿色表示字符串，紫色表示数字）——绝不是标注横幅中使用的明亮强调色。

**`inline-code`** — 小型内联 `<code>` 芯片
- 背景“{colors.surface-soft}”，“{typography.code-xs}”中的文本“{colors.ink}”，填充“2px 6px”，圆形“{rounded.xs}”(2px)。
- 使用内部散文来标记代码片段和标识符。### Navigation
**`主要导航`**
- 背景“{colors.canvas}”（奶油色 - 与页面相同），文本“{colors.ink}”，高度“56px”，类型“{typography.body-strong}”，圆形“{rounded.none}”。
- 布局（桌面）：左侧为 PostHog 字标 + 刺猬徽标，导航菜单簇（“定价·文档·社区·公司”），带有搜索字形的右侧簇，“登录”链接，以及固定在最右侧的始终黄色的“{component.button-primary}”“开始 - 免费”药丸。

**`sub-nav-strip`** — 辅助导航栏（在主要导航栏下方）
- 背景“{colors.surface-soft}”，文本“{colors.body}”位于“{typography.body-xs}”中，高度“40px”，圆形“{rounded.none}”。
- 位于工作流程/产品页面主导航的正下方，带有部分锚链接和右侧的上下文“开始→”链接。

**`doc-sidebar`** — 粘性文档页面左侧边栏
- 背景“{colors.canvas}”，“{typography.body-xs}”中的文本“{colors.body}”，宽度“240px”，圆形“{rounded.none}”。
- 布局：在顶部搜索输入“Ask PostHog AI”，然后是一个垂直的节标题列表，每个节标题都有一个小的圆形轮廓图标迷你插图，然后在活动标题下缩进的嵌套项目链接。

**顶部导航（移动）**
- 左侧为汉堡菜单图标，中间为 PostHog 文字标记 + 刺猬，右侧为搜索 + 粘性黄色“开始 — 免费”号召性用语。主导航栏折叠成一个从左侧滑动的全高抽屉。### Footer
**`页脚部分`**
- 背景“{colors.canvas}”，“{typography.body-xs}”中的文本“{colors.body}”，填充“32px 24px”，圆形“{rounded.none}”，顶部规则为 1px“{colors.hairline}”。
- 布局：6 列水平链接网格（产品·资源·公司·社区·定价·法律），每列都有一个“{typography.utility-xs}”（大写）标题和“{typography.body-xs}”“{colors.body}”中的垂直链接列表。
- 底行：PostHog 文字标记 + 小刺猬插图，版权在“{typography.caption-xs}”“{colors.mute}”，最右侧的社交图标行。### Inline
**`link-inline`** — 正文散文锚链接
- 主体散文中的“{colors.link-teal}”（“#1078a3”）默认没有下划线；焦点上出现下划线。该品牌的主要内嵌链接颜色。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 使用“{colors.canvas}”（奶油色 —“#eeefe9”）作为页面主体。切勿用纯白色代替画布。
- 仅为主要 CTA 药丸保留“{colors.primary}”（黄橙色）。 “免费使用”的理念是该品牌的支柱。
- 将品牌文字标记与刺猬插图放在一起渲染，而不是作为独立的文字标记。刺猬是品牌标识。
- 在每个文本角色中使用 IBM Plex Sans Variable — 正文 400、强调 600/700、显示 800。
- 以“{spacing.section}”（80px）节奏堆叠内容部分，它们之间没有装饰性分隔线；让奶油色画布继续不间断。
- 仅在文档​​文章正文中使用“{component.banner-tip-blue}”/“-green”/“-red”/“-purple”作为提示/警告/注释面板 - 将营销镶边排除在四色标注系列之外。
- 将每个代码示例与深色“{component.code-block}”表面配对；内联“<code>”芯片使用“{component.inline-code}”（奶油色表面软芯片）。
- 在主页和工作流程页面的功能图块边缘锚定刺猬吉祥物插图 - 系统的标志性装饰。### 禁止事项
- 不要在卡片上引入阴影。卡片平放在奶油色上，只有细橄榄色边框。
- 不要添加第二个饱和彩色 CTA。黄橙色是系统中唯一响亮的颜色。
- 不要用纯白色或全出血的深色英雄带替换奶油色画布。面霜是这个牌子的。
- 不要使用四色标注横幅粉彩（`{colors.accent-blue-soft}`、`-green`、`-red`、`-purple`）作为营销卡背景。它们仅属于内联文档内容。
- 不要用通用图标集替换刺猬插图。人物系统就是品牌。
- 不要在“{typography.heading-sm}”、“{typography.utility-xs}”和“{typography.caption-xs}”之外使用大写转换。大写字母保留用于眉毛和页脚类别标题。
- 除“{component.pricing-tier-card}”外，请勿在所有侧面填充 32px+ 的卡片。标准卡片的内部填充为 24 像素。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|超宽 | 1920 像素以上 |内容最大宽度保持在 1280px；外边距增长至~80px |
|桌面大| 1440 像素 |默认 — 4-up 功能图块网格，240px 粘性文档侧边栏可见 |
|桌面| 1280 像素 |布局相同，外排水沟较窄 |
|桌面小| 1024 像素 | 4 层瓷砖折叠成 3 层瓷砖；文档侧边栏仍然可见 |
|平板电脑| 768 像素 | 3 层瓷砖折叠成 2 层瓷砖；文档侧边栏折叠成顶部手风琴；主要导航变成汉堡|
|移动 | 480 像素 |单列一切；英雄 `{typography.display-xl}` 缩放 36px → ~​​28px |
|移动窄版 | 320 像素 |部分内边距收紧至 32px |### Touch Targets
所有交互元素均满足WCAG AA（≥40×40px）。 `{component.button-primary}` 和 `{component.button-secondary}` 的高度为 40 像素，内边距为 16 像素。 `{component.text-input}` 位于 36px（在这个尺寸下，正好在 AAA 之下，但在 AA 之上）。 `{component.pill-tab}` 的高度约为 32–36 像素，14 像素填充可通过内联填充延伸至约 44 像素可点击。文档侧边栏项目使用 14 像素文本，行高约为 32 像素 + 垂直填充约为 44 像素点击行。### Collapsing Strategy
- **主要导航：**桌面水平集群 → 平板电脑汉堡抽屉，768 像素。黄色的“开始 - 免费”CTA 在每个断点处都保持可见。
- **子导航条：**桌面水平锚行→平板电脑水平滚动→移动设备选择下拉菜单。
- **营销卡网格：** 4-up → 3-up → 2-up → 1-up（1024、768 和 480 像素）；移动设备上的间距从 16 像素降至 12 像素。
- **定价网格：** 3 合 → 2+1 → 1 合堆叠在平板电脑及以下。
- **文档布局：** 桌面 240 像素侧边栏 + 720 像素文章 → 平板电脑侧边栏折叠为顶部手风琴 → 移动设备完全折叠手风琴。
- **页脚：** 6 幅链接列 → 平板电脑上 3 幅 → 移动设备上 2 幅。
- **部分填充：** `{spacing.section}` (80px) 桌面 → 64px 平板电脑 → 48px 移动设备。
- **英雄标题：** `{typography.display-xl}` (36px) 在桌面上，在移动设备上缩放至 ~28px，行高保持在 1.5。### Image Behavior
系统中唯一的“图像”是渲染为内联 SVG 的手绘刺猬插图。它们通过 CSS `width: auto; 在每个断点和缩放处保留其自然外观。最大宽度：100%`。因为没有摄影，所以不需要响应式艺术指导。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。拉取其 YAML 条目并验证每个属性是否解析。
2. 直接引用组件名称和标记（“{colors.primary}”、“{component.button-primary-pressed}”、“{rounded.md}”）——不要转述。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”——“broken-ref”、“contrast-ratio”和“orphaned-tokens”警告会自动标记问题。
4. 添加新变体作为单独的组件条目（`-pressed`、`-disabled`、`-focused`）——不要将它们埋在散文中。
5. 默认正文为 `{typography.body-md}` (16px / 400 / 1.5);使用“{typography.body-strong}”来强调；严格保留“{typography.display-lg}”（24px / 800）用于营销展示时刻。
6. 每个视口保持“{colors.primary}”稀缺——每个折叠最多一个黄橙色药丸。
7.引入新组件时，在添加新标记之前询问是否可以用现有的card+6px-radius+cream-canvas词汇来表达。该系统的优势在于它几乎不需要新的。## 已知局限与补充说明 (Known Gaps)

- **未捕获移动屏幕截图** - 响应行为从桌面证据和断点堆栈综合 PostHog 的移动模式（汉堡包抽屉、单列网格、文档侧边栏手风琴）。
- **系统策略未记录**悬停状态。
- **产品内应用程序镶边**（PostHog 仪表板、图表、会话重播播放器）不在捕获集中 - 营销网站记录在此处，而不是产品内分析界面。
- **经过身份验证的 chrome**（登录模式、帐户仪表板、计费设置）不在捕获的页面中。
- **表单验证状态**超出捕获的表面中不存在的焦点状态输入。
- **营销插图集** — 完整的刺猬角色姿势库在此不一一列举；具体姿势（实验室外套刺猬、终端刺猬、吊床刺猬）在屏幕截图中可见，但完整的资源库是特定于页面的。
