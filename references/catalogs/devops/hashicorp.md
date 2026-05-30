---
version: alpha
name: HashiCorp
description: "An enterprise-infrastructure marketing canvas built around a near-black ground (#000000) and a system of per-product accent colors — Terraform purple, Vault yellow, Consul pink, Waypoint cyan, Vagrant blue — that act as identity tokens rather than decorative palette. Display type is hashicorpSans set in 600/700 with tight 1.17–1.21 line-heights; body type runs the same family at 500 weight with relaxed 1.50–1.71 line-heights. Cards live as charcoal surfaces with 1px translucent gray borders; product showcase cards lift into per-product chromatic gradients. The system reads as confident, technical, and intentionally multi-product — every section quietly signals which HashiCorp tool it represents."

colors:
  primary: "#000000"
  on-primary: "#ffffff"
  accent-blue: "#2b89ff"
  ink: "#ffffff"
  ink-muted: "#b2b6bd"
  ink-subtle: "#656a76"
  canvas: "#000000"
  surface-1: "#15181e"
  surface-2: "#1f232b"
  surface-3: "#3b3d45"
  hairline: "#3b3d45"
  hairline-soft: "#252830"
  inverse-canvas: "#ffffff"
  inverse-ink: "#000000"
  product-terraform: "#7b42bc"
  product-terraform-bright: "#911ced"
  product-vault: "#ffcf25"
  product-consul: "#e62b1e"
  product-waypoint: "#14c6cb"
  product-waypoint-deep: "#12b6bb"
  product-vagrant: "#1868f2"
  product-nomad: "#00ca8e"
  product-boundary: "#f24c53"
  amber-100: "#fbeabf"
  amber-200: "#bb5a00"
  blue-7: "#101a59"
  semantic-success: "#00ca8e"
  semantic-warning: "#ffcf25"
  semantic-error: "#e62b1e"
  semantic-visited: "#a737ff"

typography:
  display-xl:
    fontFamily: hashicorpSans
    fontSize: 80px
    fontWeight: 700
    lineHeight: 1.17
    letterSpacing: -2.5px
  display-lg:
    fontFamily: hashicorpSans
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: -1.6px
  display-md:
    fontFamily: hashicorpSans
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: -1.0px
  headline:
    fontFamily: hashicorpSans
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.21
    letterSpacing: -0.6px
  card-title:
    fontFamily: hashicorpSans
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.4px
  subhead:
    fontFamily: hashicorpSans
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.2px
  body-lg:
    fontFamily: hashicorpSans
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.69
    letterSpacing: 0
  body:
    fontFamily: hashicorpSans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.50
    letterSpacing: 0
  body-sm:
    fontFamily: hashicorpSans
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.71
    letterSpacing: 0
  caption:
    fontFamily: hashicorpSans
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.38
    letterSpacing: 0.2px
  button:
    fontFamily: hashicorpSans
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.29
    letterSpacing: 0
  eyebrow:
    fontFamily: hashicorpSans
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.23
    letterSpacing: 0.6px

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  pill: 9999px
  full: 9999px

spacing:
  hair: 1px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.inverse-canvas}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  button-primary-pressed:
    backgroundColor: "{colors.inverse-canvas}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  button-tertiary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  button-product-terraform:
    backgroundColor: "{colors.product-terraform}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  button-product-vault:
    backgroundColor: "{colors.product-vault}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  button-product-waypoint:
    backgroundColor: "{colors.product-waypoint}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  product-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  product-card-terraform:
    backgroundColor: "{colors.product-terraform}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  product-card-vault:
    backgroundColor: "{colors.product-vault}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  product-card-waypoint:
    backgroundColor: "{colors.product-waypoint}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  feature-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-card-featured:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 32px
  resource-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  product-pill:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    height: 64px
  comparison-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
  cta-banner:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.subhead}"
    rounded: "{rounded.xxl}"
    padding: 48px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 64px 32px
---

## Dig UI CSS Tokens

```css
css
--dig-bg: #000000;
--dig-bg-soft: #000000;
--dig-surface: #000000;
--dig-surface-strong: #000000;
--dig-surface-elevated: #000000;
--dig-text: #ffffff;
--dig-text-muted: #ffffff;
--dig-text-soft: #ffffff;
--dig-accent: #000000;
--dig-accent-strong: #000000;
--dig-accent-2: #000000;
--dig-accent-2-strong: #000000;
--dig-border: #3b3d45;
--dig-border-strong: #3b3d45;
--dig-grid-line: #252830;
--dig-success: #00ca8e;
--dig-warning: #ffcf25;
--dig-danger: #e62b1e;
--dig-info: #000000;

--dig-font-sans: hashicorpSans;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 13px;
--dig-text-md: 14px;
--dig-text-lg: 16px;
--dig-text-xl: 18px;
--dig-text-2xl: 20px;
--dig-text-3xl: 22px;
--dig-text-4xl: 28px;
--dig-text-5xl: 40px;

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

MongoDB 具有强烈的双模式视觉标识 — 深色深青色英雄带与明显无误的明亮 MongoDB 绿色 ({colors.brand-green}) CTA 药丸搭配鲜明的白色文档和定价表面。主页打开时显示“一个数据平台。无限的人工智能潜力”。标题是深海军英雄，绿色药丸坐在视觉中心作为主要 CTA。在页面下方，嵌入的代码模型卡（终端美学）位于黑色英雄带上，分解为下面的白色功能卡。定价页面呈现 3 层比较（免费/灵活/专用），其中特色层以柔和的薄荷色背景和亮绿色边框突出显示。 MongoDB 大学页面显示了一个课程目录网格，其中每个图块都带有一个彩色类别标签（橙色、紫色、绿色、青色）——这些是 MongoDB 的类别编码强调色，也是品牌绿色之外唯一出现饱和颜色的地方。

该系统使用欧几里得圆A作为其显示面。脸部是现代几何形状——自信但不过分俏皮——并且与数据库产品的开发工具美学和学习表面的教育定位自然搭配。卡片使用“{rounded.lg}”（12px）角；按钮普遍使用“{rounded.full}”药丸。品牌青色调色板 ({colors.brand-teal-deep}) 锚定英雄带、页脚、代码模型和深色 CTA 横幅。

**主要特征：**
- 深海军蓝/青色英雄乐队 ({colors.brand-teal-deep}) 搭配明亮的 MongoDB 绿色 ({colors.brand-green}) CTA 药丸
- 纯白色定价/文档表面，带有课程瓷砖的彩色类别标签（紫色、橙色、绿色、青色）
- 欧几里得圆 A 横跨每个 UI 表面
- 药丸形按钮 ({rounded.full}) 和 12px 圆形卡片
- 3 级定价比较（免费/灵活/专用）以及特色薄荷亮点级别
- 带有终端审美深色画布的代码样机卡## 颜色系统 (Colors)

> 源页面：hashicorp.com/en（主页）、/en/infrastruction-cloud、/en/products/terraform、/en/pricing、/en/resources?contentType=PDF。### 品牌与主色
- **黑色** ({colors.primary})：系统主表面。画布、页脚、比较表、英雄 — 全黑。
- **白色** ({colors.on-primary})：黑色上的反色文本； `button-primary` 的画布。
- **强调蓝色** ({colors.accent-blue})：营销界面上的超链接。
- **已访问紫色** ({colors.semantic-visited})：已访问链接状态。### 表面与背景
- **Canvas** ({colors.canvas})：默认页面背景。
- **表面 1** ({colors.surface-1})：比画布高出一步的木炭 — 功能卡、定价卡、资源图块。
- **Surface 2** ({colors.surface-2})：上面两个步骤 - 特色定价卡、辅助按钮、悬停产品镶边。
- **Surface 3** ({colors.surface-3})：以上三个步骤 - 小碎片、徽章、子导航背景。
- **发际线** ({colors.hairline})：卡片和分隔线上的 1 像素边框。
- **Hairline Soft** ({colors.hairline-soft})：更精细的分隔符 — 比较表行。
- **Inverse Canvas** ({colors.inverse-canvas})：纯白色 - 仅用作“button-primary”的表面。### 文本色
- **Ink** ({colors.ink})：所有标题和强调的正文类型 - 纯白色。
- **Ink Muted** ({colors.ink-muted})：#b2b6bd 处的辅助类型 — 元信息、页脚列。
- **Ink Subtle** ({colors.ink-subtle})：#656a76 处的第三类型 — 表单辅助文本、时间戳、脚注。### Per-Product Identity (signature)
HashiCorp 的营销并不是由单一的强调色组合在一起，而是由特定于产品的强调色系统组合在一起，每个强调色都用于标记一个部分代表哪种工具。

- **Terraform Purple** ({colors.product-terraform})：Terraform 部分、Terraform CTA、家庭英雄上的紫色 3D 立方体。
- **Terraform Bright** ({colors.product-terraform-b​​right})：饱和突出显示 - Terraform 页面上的链接强调。
- **Vault Yellow** ({colors.product-vault})：Vault 部分和 CTA。
- **Consul Red** ({colors.product-consul})：Consul 部分。
- **航点青色** ({colors.product-waypoint})：航点部分，用于悬停/活动的深度变体“{colors.product-waypoint-deep}”。
- **Vagrant Blue** ({colors.product-vagrant})：Vagrant 部分。
- **Nomad Green** ({colors.product-nomad})：Nomad 部分。
- **边界珊瑚** ({colors.product-boundary})：边界部分。### 语义色
- **成功** ({colors.semantic-success})：积极状态（也被重用为 Nomad green）。
- **警告** ({colors.semantic-warning})：警告状态（也是 Vault 黄色）。
- **错误** ({colors.semantic-error})：错误状态（也是领事红色）。
- **Amber 100** ({colors.amber-100})：柔和的暖色高光 - 提取但很少使用。
- **琥珀色 200** ({colors.amber-200})：用于警告徽章的饱和琥珀色。
- **蓝色 7** ({colors.blue-7})：统一核心渐变中使用的深海军蓝。## 排版与字体系统 (Typography)



### 字体家族
- **hashicorpSans** — HashiCorp 的专有营销字体。几何、干净、略带人文主义。后备堆栈 `__hashicorpSans_Fallback_96f0ca` （系统字体），然后是 `-apple-system, BlinkMacSystemFont, Segoe UI, helvetica, arial`。

同一个系列包含显示屏、主体、按钮和标题 - 没有单独的显示屏 + 主体配对。层次结构是通过粗细（500 主体/600 重点/700 显示）和有意的行高对比度（显示紧，主体放松）来体现的。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 80 像素 | 700 | 1.17 | 1.17 -2.5 像素 |最大英雄头条|
| `{typography.display-lg}` | 56 像素 | 700 | 1.18 | 1.18 -1.6 像素 |章节开场头条|
| `{typography.display-md}` | 40 像素 | 600 | 1.19 | 1.19 -1.0 像素 |子版块标题|
| `{typography.headline}` | 28 像素 | 600 | 1.21 | 1.21 -0.6 像素 |定价层标题、CTA 横幅标题 |
| `{typography.card-title}` | 22 像素 | 600 | 1.18 | 1.18 -0.4 像素 |功能卡标题 |
| `{版式.subhead}` | 20 像素 | 600 | 1.35 | 1.35 -0.2 像素 |长篇介绍段落 |
| `{typography.body-lg}` | 18 像素 | 500 | 500 1.69 | 1.69 0 |英雄副标题，主角正文|
| `{typography.body}` | 16 像素 | 500 | 500 1.50 | 1.50 0 |默认正文 |
| `{typography.body-sm}` | 14 像素 | 500 | 500 1.71 | 1.71 0 |卡体、页脚栏 |
| `{typography.caption}` | 13 像素 | 500 | 500 1.38 | 1.38 0.2 像素 |元，比较单元格标签 |
| `{版式.按钮}` | 14 像素 | 600 | 1.29 | 1.29 0 |药丸/方形 CTA 按钮 |
| `{typography.eyebrow}` | 12 像素 | 600 | 1.23 | 1.23 0.6 像素 |大写款眉毛|### 排版原则
- **显示屏上紧，身体上放松。**显示屏的行高为 1.17–1.21；身体提升至 1.50–1.71。尺寸+行高的对比具有层次感。
- **权重等级较小。** 500 主体/600 重点/700 显示。没有光/黑极端——这个品牌读起来就像是精心设计的。
- **眉正跟踪大写 12px 是章节标题。** 每个有意义的章节在标题上方都有一个。
- **无单声道。** 尽管是开发人员工具品牌，但营销界面不使用等宽字体 - 代码语音保留用于产品内界面。### 字体备选说明
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
| `{typography.caption-xs}` | 12 像素 | 600 | 1.33 | 1.33 0（大写）|内联徽章标签|
| `{typography.utility-xs}` | 12 像素 | 700 | 1.33 | 1.33 0（大写）|节眉实用文本，页脚类别页眉 |
| `{typography.link-md}` | 16 像素 | 400 | 1.5 | 1.5 0 |内联正文锚链接 |
| `{typography.button-md}` | 14 像素 | 700 | 1.5 | 1.5 0 |标准主/辅助按钮标签 |
| `{typography.button-sm}` | 13 像素 | 500 | 500 1 | 0 |药丸芯片/紧凑型 CTA |
| `{typography.code-sm}` | 14 像素 | 400 | 1.43 | 1.43 0 |代码块内容 |
| `{typography.code-xs}` | 14 像素 | 500 | 500 1.43 | 1.43 0 |内嵌代码芯片 |## 布局与间距 (Layout)



### 间距系统
- **基本单位**：8px（主要增量为 4 / 8 / 12 / 16 / 24 / 32 / 48）。
- **标记（前面的内容）**： `{spacing.hair}` 1px · `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px。
- 卡片内部填充：产品卡片上的“{spacing.lg}” 24px；定价卡上的“{spacing.xl}”为 32 像素； CTA 横幅上的“{spacing.xxl}”为 48 像素。
- 按钮内边距：“{components.button-primary}”上垂直 10 像素、水平 18 像素。
- 通用节奏常数：“{spacing.section}”（96px）主要部分之间的垂直间隙。### 网格与容器
- 最大内容宽度约为 1280 像素，侧边距从桌面上的“{spacing.xxl}”缩放到移动设备上的“{spacing.lg}”。
- 产品卡片网格在桌面上为 3 合一，在平板电脑上为 2 合，在移动设备上为 1 合。
- 桌面版的定价层级网格为三层；下面的比较表使用固定宽度的左栏。
- 资源目录（PDF 库）使用 4 层密集缩略图网格。### 留白哲学
深色画布是空白。各部分通过表面升力（画布→表面-1）而不是通过白色间隙分隔。在一个部分中，慷慨的 `{spacing.xl}` 32px 间隙单独的卡片； `{spacing.lg}` 24px 分隔行。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0（平）|无阴影，无边框 |画布安装显示类型、英雄、页脚|
| 1（木炭升降机）| `{colors.surface-1}` 背景 + 1px `rgba(178,182,189,0.1)` 边框 |默认卡、资源图块、定价卡 |
| 2（表面2升力）| `{colors.surface-2}` 背景 + 1px `{colors.hairline}` 边框 |特色定价卡、悬停卡、子导航 |
| 3（产品色彩）|每个产品的强调色背景 — Terraform 紫色、Vault 黄色、Waypoint 青色 |产品展示卡 |

产品的色彩水平不是“模态提升”——它是一种识别手段。 Terraform 卡与功能卡位于同一 z 平面；区别在于意义，而不是深度。### 装饰性深度
- **3D 产品视觉效果** — 等距紫色立方体 (Terraform)、半透明黄色保险箱 (Vault) 和类似的产品着色插图位于英雄部分的右列。
- **1px 半透明灰色细线** 是主导边缘 - 边界可见，无需竞争。
- **在黑暗中没有阴影。** 卡片通过表面变化升起，从不产生阴影。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 4 像素 |小芯片/徽章|
| `{rounded.sm}` | 6 像素 |内嵌标签 |
| `{rounded.md}` | 8 像素 |所有 CTA 按钮、表单输入、列表项 |
| `{rounded.lg}` | 12 像素 |功能卡、产品卡、定价卡|
| `{rounded.xl}` | 16 像素 |大型插图瓷砖 |
| `{rounded.xxl}` | 24 像素 | CTA 横幅面板 |
| `{rounded.pill}` | 9999 像素 |眉型品丸（小片）|
| `{rounded.full}` | 9999 像素 |阿凡达圈（营销上罕见）|### Photography & Illustration Geometry
- 产品 3D 插图在其容器内使用全出血 — 无圆形内部遮罩。
- 客户选框中的徽标芯片位于“{rounded.sm}”6px 瓷砖上，发际线为 1px。
- 资源缩略图使用“{rounded.lg}”12px 角。## 核心组件 (Components)



### 按钮设计
**`button-primary`** — 白色圆角矩形 CTA。用作所有页面上的主要 CTA。
- 背景“{colors.inverse-canvas}”，文本“{colors.inverse-ink}”，类型“{typography.button}”，填充10px 18px，圆角“{rounded.md}”。
- 按下状态位于“button-primary-pressed”中。

**`button-secondary`** — 木炭圆角矩形。辅助 CTA，“阅读文档”/“与销售人员交谈”。
- 背景“{colors.surface-2}”，文本“{colors.ink}”，类型“{typography.button}”，圆形“{rounded.md}”，内边距10px 18px。

**`button-tertiary`** — 画布上的裸幽灵按钮，仅进行文本处理。
- 背景“{colors.canvas}”，文本“{colors.ink}”，类型“{typography.button}”，圆形“{rounded.md}”，内边距10px 18px。

**`button-product-terraform`** — Terraform 页面上的 Terraform 色调 CTA。
- 背景“{colors.product-terraform}”，文本“{colors.ink}”，类型“{typography.button}”，圆形“{rounded.md}”，内边距10px 18px。

**`button-product-vault`** — Vault-黄色 CTA。
- 背景“{colors.product-vault}”，文本“{colors.inverse-ink}”（黄色需要深色文本），类型“{typography.button}”，圆形“{rounded.md}”，内边距10px 18px。

**`button-product-waypoint`** — 路点-青色 CTA。
- 背景“{colors.product-waypoint}”，文本“{colors.inverse-ink}”，类型“{typography.button}”，圆形“{rounded.md}”，内边距10px 18px。

（Vagrant 蓝、Nomad 绿、Consul 红、边界珊瑚遵循相同的模式及其各自的“{colors.product-*}”标记。）### 卡片与容器
**`产品卡`** — 默认产品展示卡 — Surface-1 木炭。
- 背景“{colors.surface-1}”，文本“{colors.ink}”，类型“{typography.body}”，圆形“{rounded.lg}”，内边距24px。

**`product-card-terraform`** — 带有 Terraform 紫色地面的产品卡（用作身份表面，而不是模态高程）。
- 背景“{colors.product-terraform}”，文本“{colors.ink}”，类型“{typography.body}”，圆形“{rounded.lg}”，内边距 24 像素。

**`产品卡-保险库`** — 保险库黄色地面。
- 背景“{colors.product-vault}”，文本“{colors.inverse-ink}”，其他结构相同。

**`产品卡航路点`** — 航路点-青色地面。
- 背景“{colors.product-waypoint}”，文本“{colors.inverse-ink}”，其他结构相同。

（其他产品变体采用相同的形状及其各自的产品标记。）

**`feature-card`** — Surface-1 上的通用功能突出显示。
- 背景“{colors.surface-1}”，文本“{colors.ink}”，类型“{typography.body}”，圆形“{rounded.lg}”，内边距24px。

**`pricing-card`** — `/en/pricing` 上的定价层。
- 背景“{colors.surface-1}”，文本“{colors.ink}”，类型“{typography.body}”，圆形“{rounded.lg}”，内边距32px。

**`定价卡特色`** — 推荐层（通过表面提升在视觉上强调）。
- 背景“{colors.surface-2}”，其他结构相同。

**`resource-card`** — 资源目录中的 PDF/白皮书/指南图块。
- 背景“{colors.surface-1}”，文本“{colors.ink}”，类型“{typography.body-sm}”，圆形“{rounded.lg}”，内边距16px。### 输入框与表单
**`文本输入`** + **`以文本输入为中心`** — 定价席位数和联系表单上的表单字段。
- 背景“{colors.surface-1}”，文本“{colors.ink}”，类型“{typography.body}”，圆形“{rounded.md}”，内边距10px 14px。
- 聚焦状态保留相同的表面；对焦环是一个 1 像素的“{colors.accent-blue}”轮廓。### Pills & Chips
**`产品药丸`** - 在英雄标题上方和资源卡上使用的小产品名称芯片，用于标记某条内容所属的产品。
- 背景“{colors.surface-1}”，文本“{colors.ink-muted}”，类型“{typography.caption}”，圆形“{rounded.pill}”，内边距 4px 10px。### Comparison Table
**`comparison-row`** — 定价比较表内的单行。
- 背景“{colors.canvas}”，文本“{colors.ink-muted}”，输入“{typography.body-sm}”。行分隔符是“{colors.hairline-soft}”。### CTA Banner
**`cta-banner`** — 大型圆形面板，用于带有闭合 CTA 的长格式页面底部。
- 背景“{colors.surface-1}”，文本“{colors.ink}”，类型“{typography.subhead}”，圆形“{rounded.xxl}”，内边距48px。### Navigation
**`顶部导航`** — 左侧带有 HashiCorp 徽标标记的粘性黑色条，居中的主要导航链接，以及右侧的“主要按钮”（“注册”）+“次要按钮”（“登录”）对。
- 背景`{colors.canvas}`，文本`{colors.ink}`，类型`{typography.body-sm}`，高度64px。
- 移动：将主链接折叠成汉堡包；主要 CTA 仍然可见。### Footer
**`footer`** — `{colors.canvas}` 上的密集链接网格，左侧有文字标记，还有 5-6 列标题大小的链接。
- 背景“{colors.canvas}”，文本“{colors.ink-muted}”，类型“{typography.caption}”，内边距 64px 32px。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 保留“{colors.canvas}”（黑色）和“{colors.surface-1}”（木炭）作为系统的两个锚定表面。页面的每个带区都是其中之一。
- 在介绍有关特定 HashiCorp 产品的部分时，请一致使用该产品的“{colors.product-*}”标记 - 用于部分药丸、CTA 按钮和（如果适用）展示卡背景。
- 在 CTA 按钮上使用 `{rounded.md}` 8px； HashiCorp 的品牌被解读为工程品牌，而不是消费者品牌。
- 将紧密的显示行高 (1.17–1.21) 与宽松的正文行高 (1.50–1.71) 配对。对比是品牌声音。
- 在每个有意义的部分上方使用眉毛排版（`{typography.eyebrow}`，大写，0.6px 跟踪）。
- 使用表面提升（画布→表面1→表面2）来表达黑暗的层次结构。
- 预留产品彩色卡，用于产品身份识别；将通用功能卡保留在“{colors.surface-1}”上。### 禁止事项
- 不要发布轻型模式营销页面。 HashiCorp 的营销品牌是黑暗的。
- 不要在记录的“ink”/“ink-muted”/“ink-subtle”集之外引入中色调灰色文本。
- 不要使 CTA 角呈方形 - 使用 `{rounded.md}` 8px，而不是 0px。
- 不要在与该产品无关的页面上为 CTA 使用产品强调色。 Vault 页面上的 Terraform 紫色是一种品牌违规行为。
- 不要在同一视口中组合多个产品重音 - 系统会显示“本节是关于此工具的”，并且混合重音会破坏该信号。
- 不要在黑暗处添加阴影；表面升力带来高程。
- 不要将“hashicorpSans”替换为仅用于显示的标题字体和不同系列的正文字体。该品牌由一个横跨整个层级的家族维系在一起。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|桌面-XL | 1440 像素 |默认桌面布局 |
|桌面| 1280 像素 |维持定价 3-up 网格 |
|平板电脑| 1024 像素 |产品卡网格 3 合 → 2 合 |
|移动-Lg | 768 像素 |定价比较变成了逐层手风琴；导航变成汉堡|
|手机 | 480 像素 |单列一切； display-xl 缩放 80px → ~​​36px |### Touch Targets
- CTA 按钮（`button-primary`、`button-secondary`）在视口中保持 ≥40px 的点击高度。
- 产品药丸在桌面上的高度为 24 像素，在触摸视口上增长到 28 像素。
- 表单输入在触摸视口上保持 ≥44px 的点击目标。### Collapsing Strategy
- **导航**：带有右锚定 CTA 的水平导航会折叠为低于 768 像素的汉堡包覆盖层。主要 CTA 在栏上保持可见。
- **产品卡网格**：3 向上 → 1024 像素处的 2 向上 → 768 像素以下的 1 向上。
- **定价比较表**：折叠成低于 768 像素的每层手风琴以避免水平滚动。
- **显示类型**：移动设备上的“{typography.display-xl}” 80px 向“{typography.display-md}” 40px 缩放，同时保留负跟踪百分比。### Image Behavior
- 3D 产品插图（立方体、保险箱等）保持纵横比且永不裁剪；低于 768px 它们会收缩而不是回流。
- 客户徽标选取框水平缩放，并可能以较窄的宽度包裹到第二行。## 迭代微调指南 (Iteration Guide)

1. 一次关注一个组件并通过其“components:”标记名称引用它。
2. 引入新部分时，首先确定它是通用特征（表面-1）还是产品标识部分（产品-*颜色）。
3.默认body为`{typography.body}`，权重为500；仅在 CTA 横幅和功能卡内使用“{typography.subhead}”。
4. 编辑后运行“npx @google/design.md lint DESIGN.md”。
5. 添加新产品变体作为单独的组件条目（“product-card-nomad”、“button-product-consul”等）。
6. 将每个产品的调色板视为身份标记，而不是装饰。如果你在产品背景之外寻求产品颜色，那么该品牌就会发生漂移。
7. 眉毛类型在每个部分上方都是强制性的——跳过它会使部分读起来像是浮动的。## 已知局限与补充说明 (Known Gaps)

- 准确的产品颜色十六进制值来自直接提取的 `--mds-color-*` CSS 变量集；它们是 HashiCorp 的标准品牌规格。
- 阴影令牌没有被广泛记录，因为暗表面系统使用表面升力而不是阴影高程。
- 表单字段错误和验证样式在检查的页面上不可见。
- 深色模式是唯一的营销模式——浅色模式的适应没有记录。
- Consul、Nomad、Vagrant 和 Boundary 的产品卡变体遵循记录的 Terraform / Vault / Waypoint 模式，但仅在散文中引用；如果他们需要正式条目，可以添加为“product-card-consul”、“product-card-nomad”等。
