---
version: alpha
name: Sentri Inspired
description: An inspired interpretation of Sentri's design language — a developer-tools brand built on a deep purple-violet midnight canvas, electric lime accents, and a slightly subversive illustrated personality. The system pairs a custom display sans (chunky, playful, near-condensed) with the open Rubik family for UI copy and Monaco for code, then leans on dark-on-light pricing surfaces, sticker-style mascots, and a single-color CTA hierarchy where black-violet buttons read as the primary action against either polarity.

colors:
  primary: "#150f23"
  ink-deep: "#1f1633"
  on-primary: "#ffffff"
  accent-lime: "#c2ef4e"
  accent-pink: "#fa7faa"
  accent-violet: "#6a5fc1"
  accent-violet-deep: "#422082"
  accent-violet-mid: "#79628c"
  surface-canvas-dark: "#1f1633"
  surface-canvas-light: "#ffffff"
  surface-night: "#150f23"
  surface-press-light: "#f0f0f0"
  surface-press-stronger: "#efefef"
  hairline-violet: "#362d59"
  hairline-cool: "#cfcfdb"
  hairline-cloud: "#e5e7eb"
  ink: "#1f1633"
  ink-press: "#1a1a1a"
  on-dark-muted: "#bdb8c0"
  on-dark-faint: "#3f3849"
  ring-focus: "#9dc1f5"

typography:
  display-hero:
    fontFamily: "Sentri Display, Rubik, system-ui, sans-serif"
    fontSize: 88px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  display-large:
    fontFamily: "Sentri Display, Rubik, system-ui, sans-serif"
    fontSize: 60px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0
  heading-xl:
    fontFamily: "Rubik, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-lg:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 27px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  heading-md:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  heading-sm:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  body-lg:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 2.0
    letterSpacing: 0
  body-strong:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  body-md:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  eyebrow:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  button-cap:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: 0.2px
  button-cap-light:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.29
    letterSpacing: 0.2px
  caption:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  micro-cap:
    fontFamily: "Rubik, -apple-system, system-ui, sans-serif"
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1.8
    letterSpacing: 0.25px
  code:
    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code-strong:
    fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  xxl: 18px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-primary-pressed:
    backgroundColor: "{colors.surface-press-stronger}"
    textColor: "{colors.ink-press}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-inverted:
    backgroundColor: "{colors.on-primary}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-inverted-pressed:
    backgroundColor: "{colors.surface-press-light}"
    textColor: "{colors.ink-press}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-ghost-on-dark:
    backgroundColor: "{colors.on-dark-faint}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.xl}"
    padding: 8px
  button-violet-token:
    backgroundColor: "{colors.accent-violet-mid}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-cap-light}"
    rounded: "{rounded.xl}"
    padding: 8px 16px
  button-disabled:
    backgroundColor: "{colors.hairline-cloud}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.button-cap}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  pill-neutral-dark:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  chip-lime-keyword:
    backgroundColor: "{colors.accent-lime}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.display-hero}"
    rounded: "{rounded.xs}"
    padding: 0 12px
  text-input:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  text-input-focused:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  select-violet:
    backgroundColor: "{colors.accent-violet-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card-pricing:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  card-pricing-featured:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  card-feature-dark:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xxl}"
    padding: 32px
  card-spotlight-violet:
    backgroundColor: "{colors.accent-violet-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xxl}"
    padding: 32px
  code-block:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 16px
  link-on-dark:
    backgroundColor: "{colors.surface-canvas-dark}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  link-on-light:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  nav-bar-light:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 16px 24px
  footer-light:
    backgroundColor: "{colors.surface-canvas-light}"
    textColor: "{colors.ink-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 32px 24px
---

## Dig UI CSS Tokens

```css
css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #1f1633;
--dig-text-muted: #1f1633;
--dig-text-soft: #1f1633;
--dig-accent: #150f23;
--dig-accent-strong: #150f23;
--dig-accent-2: #150f23;
--dig-accent-2-strong: #6a5fc1;
--dig-border: rgba(0,0,0,0.1);
--dig-border-strong: rgba(0,0,0,0.1);
--dig-grid-line: rgba(0,0,0,0.1);
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #150f23;

--dig-font-sans: Sentri Display, Rubik, system-ui, sans-serif;
--dig-font-mono: Monaco, Menlo, Ubuntu Mono, monospace;
--dig-font-serif: serif;

--dig-text-xs: 10px;
--dig-text-sm: 14px;
--dig-text-md: 15px;
--dig-text-lg: 16px;
--dig-text-xl: 20px;
--dig-text-2xl: 24px;
--dig-text-3xl: 27px;
--dig-text-4xl: 30px;
--dig-text-5xl: 60px;

--dig-radius-sm: 6px;
--dig-radius-md: 8px;
--dig-radius-lg: 10px;
--dig-radius-xl: 12px;
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

> **源页面：**主页（`/欢迎/`）、产品/错误监控、联系人/企业、定价。### 品牌与主色
- **午夜紫罗兰** (`{colors.primary}` — `#150f23`)：系统的主要动作颜色和最深的表面色调。用于浅色表面、代码块背景和最强暗卡上的填充主按钮。
- **墨水紫**（`{colors.ink-deep}` — `#1f1633`）：与主要颜色略有提升，这是营销英雄画布和浅色表面上的默认正文文本颜色 - 单个标记具有背景和墨水的双重作用。
- **电石灰** (`{colors.accent-lime}` — `#c2ef4e`)：签名突出显示颜色。作为语法突出显示芯片围绕各个标题关键字（“{rounded.xs}”角，无 padding-y，12px padding-x）。也用作波浪形页脚分隔线。从来没有按钮背景。
- **Hot Pink** (`{colors.accent-pink}` — `#fa7faa`)：用于贴纸轮廓、图表点和支持强调的辅助标点颜色 - 绝不在按钮上，绝不在正文尺寸的字体上。
- **紫罗兰色链接** (`{colors.accent-violet}` — `#6a5fc1`)：当需要强调超出下划线时的内联链接颜色。
- **深紫色** (`{colors.accent-violet-deep}` — `#422082`)：联系表单上的选择下拉菜单填充；也用于黑暗部分内的聚光灯卡。
- **中紫罗兰**（`{colors.accent-violet-mid}` — `#79628c`）：深色表面上的标签芯片填充和微弱强调。### 表面与背景
- **深色画布** (`{colors.surface-canvas-dark}` — `#1f1633`)：英雄、产品和功能页面背景。承载着最深的大气重量。
- **Night** (`{colors.surface-night}` — `#150f23`)：深色画布上的卡片、代码块和“特色”定价层。
- **Light Canvas** (`{colors.surface-canvas-light}` — `#ffffff`)：定价、联系方式和密集参考页面背景。
- **Surface Press Light** (`{colors.surface-press-light}` — `#f0f0f0`) 和 **Press Stronger** (`{colors.surface-press-stronger}` — `#efefef`)：深色表面上倒置按钮的按下/活动填充。
- **发丝紫** (`{colors.hairline-violet}` — `#362d59`)：深色卡片上的 1 像素边框。
- **发际线酷** (`{colors.hairline-cool}` — `#cfcfdb`)：文本输入和表单字段上的 1 像素边框。
- **发丝云** (`{colors.hairline-cloud}` — `#e5e7eb`)：浅色画布上的定价表分隔线和定价卡边框。### 文本色
- **On Primary** (`{colors.on-primary}` — `#ffffff`)：深色画布上的所有文本，填充的深色按钮上的所有 CTA 标签。
- **Ink** (`{colors.ink}` — `#1f1633`)：浅色画布上的正文；与深色画布相同的六角形，重新用作类型。
- **Ink Press** (`{colors.ink-press}` — `#1a1a1a`)：为倒置按钮的按下/活动状态保留。
- **On Dark Muted** (`{colors.on-dark-muted}` — `rgba(255,255,255,0.72)`)：深色画布上的辅助文本、标题和表格单元格值。
- **On Dark Faint** (`{colors.on-dark-faint}` — `rgba(255,255,255,0.18)`)：半透明的黑暗表面 — 用于幽灵按钮填充和变暗的导航项。### 语义色
- **焦点环** (`{colors.ring-focus}` — `rgba(59,130​​,246,0.5)`)：半透明蓝色焦点环 — 系统中唯一的蓝色，保留用于表单字段上的键盘焦点。## 排版与字体系统 (Typography)



### 字体家族
显示层是一种专有的几何无衬线，具有厚实、近乎压缩的比例和略微颠覆性的个性（关闭光圈、光学应力字母形式）。当不可用时，请回退到较重的**魔方**以获得视觉连续性。

UI 层是 **Rubik** — Google 字体上的开源希伯来语/拉丁文 sans — 具有系统回退（`-apple-system、system-ui、Segoe UI、Helvetica、Arial`）。 Rubik 处理每个正文、标题、按钮和眉毛角色。

代码层是 **Monaco**，带有 Menlo 和 Ubuntu Mono 后备 - 用于代码块、安装片段和内联令牌。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-hero}` | 88 像素 | 700 | 1.2 | 1.2 0 |营销英雄头条（单线关注）|
| `{typography.display-large}` | 60 像素 | 500 | 500 1.1| 0 |深色表面上的开槽器 |
| `{typography.heading-xl}` | 30 像素 | 500 | 500 1.2 | 1.2 0 |浅色表面上的页面标题（例如，“各种规模的开发团队的定价计划”）|
| `{typography.heading-lg}` | 27 像素 | 500 | 500 1.25 | 1.25 0 |小节标题、大卡片标题 |
| `{typography.heading-md}` | 24 像素 | 500 | 500 1.25 | 1.25 0 |卡片标题、页内部分标题 |
| `{typography.heading-sm}` | 20 像素 | 600 | 1.25 | 1.25 0 |紧凑的卡片标题、列表组标题 |
| `{typography.body-lg}` | 16 像素 | 400 | 2.0 | 0 |营销段落正文——英雄潜台词中使用的轻快、两行开头的变体 |
| `{typography.body-strong}` | 16 像素 | 600 | 1.5 | 1.5 0 |强调体跑，引句|
| `{typography.body-md}` | 16 像素 | 500 | 500 1.5 | 1.5 0 |默认 UI 主体、表格单元格、表单标签 |
| `{typography.eyebrow}` | 15 像素 | 500 | 500 1.4 | 1.4 0 |大标题上方的节眉，全部大写 |
| `{typography.button-cap}` | 14 像素 | 700 | 1.14 | 1.14 0.2 像素 |填充按钮标签（大写）|
| `{typography.button-cap-light}` | 14 像素 | 500 | 500 1.29 | 1.29 0.2 像素 |幽灵/轮廓按钮标签（大写）|
| `{typography.caption}` | 14 像素 | 400 | 1.43 | 1.43 0 |页脚文本、精美印刷、辅助副本 |
| `{typography.micro-cap}` | 10 像素 | 600 | 1.8 | 1.8 0.25 像素 |状态标签、徽章文字、微眉|
| `{typography.code}` | 16 像素 | 400 | 1.5 | 1.5 0 |代码块内容 |
| `{typography.code-strong}` | 16 像素 | 700 | 1.5 | 1.5 0 |突出显示的代码关键字 |### 排版原则
- **两个领先的世界。** 营销文案在“{typography.body-lg}”上使用 2.0 行高 — 极其通风、宽敞的呼吸空间。功能性 UI 副本在“{typography.body-md}”上使用 1.5 行高 — 更密集，更接近控制台输出。这个选择是经过深思熟虑的：营销读起来像散文，产品读起来像日志。
- **带有跟踪的大写字母。** 所有按钮标签和眉毛均为大写，并带有 0.2 像素跟踪。这是该品牌的印刷签名——应用于 UI 可供性的控制台提示节奏。
- **标题作为语法。** 英雄显示是结构化的，因此单个关键字可以包含在“{colors.accent-lime}”突出显示芯片中，而不会破坏阅读顺序。将石灰片视为字形级装饰，而不是单独的组件。### 字体备选说明
Rubik 在 Google 字体上是开源的，并且是除英雄显示之外的所有内容的安全默认值。对于专有的display sans，合适的开放替代品是**Space Grotesk**（较重的重量）、**Archivo**（半压缩重量）或**Hubot Sans**，在较重的末端具有光学尺寸轴 - 所有这些都具有相同的厚实、近压缩的轮廓。替换时将线高调低 0.05，因为专有面在大尺寸时具有更紧的引线。## 布局与间距 (Layout)



### 间距系统
- **基本单位**：8px
- **标记**： `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.section}` 96像素
- **部分填充**：桌面上主要页面带之间的“{spacing.section}”为 96 像素，在移动设备上折叠为“{spacing.xxl}”32 像素至 48 像素。
- **卡内部填充**：定价卡和大功能卡上的“{spacing.xxl}”为 32 像素； `{spacing.lg}` 16px（紧凑标签/徽章组）。
- **表单字段填充**：`{spacing.sm}` 8px 垂直，`{spacing.md}` 12px 水平 — 直接匹配文本输入标记。### 网格与容器
- 营销页面使用宽中心容器和宽大的外排水沟；最大宽度约为 1152px（提取的断点之一），内部内容在 12 个概念列上弯曲。
- 定价在桌面上分为 4 层卡片行，在中宽度上折叠为 2 层卡片，在移动设备上折叠为 1 层卡片。
- 联系表单在单个浅色画布面板内使用 2 列字段布局（名字/姓氏并排）。
- 断点阶梯位于 1440 → 1152 → 992 → 768 → 640 → 576 — 请参阅响应行为。### 留白哲学
深色画布吸收空白的方式与光线不同。在黑暗的表面上，该品牌在带子之间慷慨地拉伸“{spacing.section}”，以便漂浮的吉祥物和星空纹理有呼吸的空间。在浅色表面（定价、联系）上，空白会收紧——内容密度优先，因为用户正在扫描、比较和采取行动。经验法则：英雄和特征表面宽敞，事务表面密集。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0 |平铺在画布上，没有阴影|默认表面，深色或浅色 |
| 1 | `box-shadow: rgba(0,0,0,0.08) 0 2px 8px 0` |深色画布上的倒置按钮（浅色填充从深色表面升起）|
| 2 | `box-shadow: rgba(0,0,0,0.1) 0 10px 15px -3px, rgba(0,0,0,0.1) 0 4px 6px -4px` |浅色画布上的浮动卡片、莫代尔 |
| 3 | `box-shadow: rgb(21,15,35) 0 0 8px 6px` |在深色英雄的主 CTA 周围发光光环 - 深色本身变成阴影，在按钮周围创建一个画布小插图 |
| 4 | `box-shadow: rgba(0,0,0,0.18) 0 0.5rem 1.5rem` |在深色画布上按下倒置按钮 |### 装饰性深度
Sentri 的深度并非来自阴影 - 它来自英雄画布上的 **星空纹理**（低不透明度下的微妙的紫罗兰色白色针刺）、**浮动贴纸吉祥物**（用手工渲染的轮廓和饱和填充绘制，分层在画布上方，没有阴影），以及页脚上方的 **石灰波浪形分隔线**。这些说明性元素的作用就像阴影堆栈在扁平化设计系统中所做的那样——它们告诉眼睛一个部分的结束位置和另一个部分的开始位置。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 4 像素 |徽章、地位丸、石灰关键词突出芯片 |
| `{rounded.sm}` | 6 像素 |文本输入、搜索框 |
| `{rounded.md}` | 8 像素 |主按钮和反向按钮、代码块、选择下拉菜单 |
| `{rounded.lg}` | 10 像素 |通用 div、容器块 |
| `{rounded.xl}` | 12 像素 |定价卡、功能卡、导航药丸 chrome |
| `{rounded.xxl}` | 18 像素 |图像容器、大型英雄插图|
| `{rounded.full}` | 9999 像素 |头像，圆形图标按钮|### Photography Geometry
该网站不使用传统摄影——它使用**插图贴纸和产品 UI 屏幕截图**，其几何角色大致相同。产品 UI 模拟位于“{rounded.xxl}”18px 容器内，通常稍微偏离轴倾斜，与没有边框的黑色画布相对。贴纸吉祥物根本没有容器——它们直接分层在画布上，通常重叠部分边界以打破网格。头像处理（在客户徽标条中）是简单的灰度文字标记，而不是照片。## 核心组件 (Components)

> **没有记录悬停状态。** 下面的每个规范仅显示默认和按下/活动状态。变体是前面的“组件：”块中的正式条目。### 按钮设计
**`button-primary`** — 浅色表面上的主要 CTA。
- 背景“{colors.primary}”，文本“{colors.on-primary}”，输入“{typography.button-cap}”（大写，14px / 700，0.2px跟踪），填充“{spacing.md} {spacing.lg}”（12px 16px），圆角“{rounded.md}”。在深色英雄表面上，添加 3 级发光光环以进行强调。
- 按下状态位于“button-primary-pressed”中：背景翻转为“{colors.surface-press-stronger}”，文本翻转为“{colors.ink-press}”。该按钮在按下时可以有效地交换极性。

**`按钮倒置`** — 深色画布上的主导 CTA；视觉上相同的层次结构，极性翻转。
- 背景“{colors.on-primary}”（白色），文本“{colors.ink-deep}”，相同的“{typography.button-cap}”，圆形“{rounded.md}”。
- 按下“button-inverted-pressed”：背景变为“{colors.surface-press-light}”，文本变为“{colors.ink-press}”。

**`button-ghost-on-dark`** — 深色画布上的辅助 CTA（例如，“开始使用”旁边的“获取演示”）。
- 半透明填充“{colors.on-dark-faint}”，文本“{colors.on-primary}”，类型“{typography.button-cap}”，填充“{spacing.sm}”(8px)，圆形“{rounded.xl}”。半透明填充让画布纹理显现出来。

**`button-violet-token`** — 在产品导航中内嵌使用的药丸状标签/类别按钮。
- 背景“{colors.accent-violet-mid}”，文本“{colors.on-primary}”，类型“{typography.button-cap-light}”，填充“{spacing.sm} {spacing.lg}”(8px 16px)，圆形“{rounded.xl}”，1px细线边框为稍深的紫罗兰色。

**`按钮禁用`**
- 背景“{colors.hairline-cloud}”，文本“{colors.on-dark-muted}”，其他方面与“button-primary”相同。### 卡片与容器
**`卡定价`** — 定价页面上的标准等级卡。
- 背景“{colors.surface-canvas-light}”，文本“{colors.ink-deep}”，填充“{spacing.xxl}”32px，圆形“{rounded.xl}”12px，1px“{colors.hairline-cloud}”边框。标题位于“{typography.heading-md}”顶部，价格位于“{typography.display-large}”，功能列表位于“{typography.body-md}”，主要 CTA 固定在卡片底部。

**`卡定价特色`** — 深色倒置“特色”层（Sentri 使用商业层作为特色层）。
- 背景“{colors.surface-night}”，文本“{colors.on-primary}”，其他结构与“card-pricing”相同。倒置（而不是带有重音边框的浅色卡片）是该品牌的独特选择——特色层解读为品牌的声音，而不是营销装饰。

**`card-feature-dark`** — 深色表面上的大型功能带卡，用于锚定产品功能说明。
- 背景“{colors.ink-deep}”，文本“{colors.on-primary}”，填充“{spacing.xxl}”32px，圆角“{rounded.xxl}”18px。通常包含 UI 模拟加上 27px 标题和 16px 正文。

**`card-spotlight-violet`** — 具有更深紫色填充的强调功能卡，用于“仅哨兵”功能带。
- 背景“{colors.accent-violet-deep}”、文本“{colors.on-primary}”、填充“{spacing.xxl}”、圆角“{rounded.xxl}”。深紫色读起来是一个特色亮点，但没有脱离该品牌的紫色系列。

**`代码块`** — 代码/安装片段。
- 背景“{colors.surface-night}”，文本“{colors.on-primary}”在“{typography.code}”中呈现。内边距 `{spacing.lg}` 16px，圆角 `{rounded.md}`。在深色画布上，代码块几乎没有从画布上抬起——只有稍深的填充将其区分开来。### 输入框与表单
**`文本输入`** — 联系表单第一个/最后一个/电子邮件等。字段。
- 背景“{colors.surface-canvas-light}”，文本“{colors.ink-deep}”，类型“{typography.body-md}”，填充“{spacing.sm} {spacing.md}”(8px 12px)，圆形“{rounded.sm}”6px，1px“{colors.hairline-cool}”边框。
- “text-input-focused”中的焦点状态：相同的填充，但添加了一个插入阴影“rgba(0,0,0,0.15) 0 2px 10px inset”以建议向内按压的深度。

**`select-violet`** — 深色接触面板内使用的下拉变体。
- 背景“{colors.accent-violet-deep}”，文本“{colors.on-primary}”，类型“{typography.body-md}”，填充“{spacing.sm} {spacing.lg}”，圆角“{rounded.md}”。之所以与众不同，是因为它不模仿纯文本输入——它读起来就像一个刻意的品牌表面。### Navigation
**`nav-bar-light`** — 轻量页面的标准顶部导航（定价、联系方式、文档）。
- 背景“{colors.surface-canvas-light}”，文本“{colors.ink-deep}”，输入“{typography.body-md}”。左侧约 145×32 像素处的徽标文字标记，中间栏的主要导航项目带有下拉插入符号，右侧有一个“获取演示”幽灵 +“开始使用”填充的“按钮-主”对。内边距 `{spacing.lg} {spacing.xl}` (16px 24px)。

**顶部导航（深色版本）** — 用于主页；结构相同但极性相反，位于“{colors.surface-canvas-dark}”上。右侧按钮变为“按钮反转”。

**移动导航** — 在 768px 断点下方折叠为汉堡包切换；下拉插入符号变成全角手风琴项目。### Pills, Badges, and Highlight Chips
**`药丸中性-黑暗`** — 黑暗表面上的小状态/类别药丸。
- 背景“{colors.surface-night}”，文本“{colors.on-primary}”，输入“{typography.caption}”12px，填充“{spacing.xs} {spacing.sm}”(4px 8px)，圆角“{rounded.xs}”4px。

**`chip-lime-keyword`** — 签名内联突出显示将单个单词包裹在英雄显示标题内。
- 背景“{colors.accent-lime}”，文本“{colors.ink-deep}”，类型与周围的“{typography.display-hero}”匹配，圆角“{rounded.xs}”4px，填充“0{spacing.md}”（水平12px，垂直0，因此芯片紧贴大写高度）。### Signature Components
**贴纸吉祥物层** - 用手工渲染轮廓和饱和“{colors.accent-pink}”/“{colors.accent-lime}”填充绘制的插图人物（宇航员、卡通怪物、交通锥、调试头像）。吉祥物放置在区域交界处，通常与区域边界重叠其高度的 30-40%，没有容器或阴影。它们充当装饰性部分标记和品牌个性载体 - 永远不会在卡片内，也永远不会作为按钮。

**石灰波浪形页脚分隔线** — 一条手绘的“{colors.accent-lime}”波浪线，〜3px笔画，位于页脚上方，以整个容器宽度。用充满个性的花饰取代原本 1 像素的发际线分隔线。

**星空英雄纹理** — 淡淡的紫罗兰色白色针孔图案，以非常低的不透明度覆盖在英雄画布上。为深色画布增添大气深度，无需可见装饰。作为背景图像实现，而不是作为重复的 CSS。

**Window-Chrome UI 模拟** — 产品 UI 屏幕截图位于“{rounded.xxl}”容器中，通常离轴倾斜 ±2-3 度，在深色功能页面上定位重叠的部分边界。镀铬本身只是一个带有微妙发际线的圆形图像；内容是实际的产品UI。

**`link-on-dark`** — 深色表面上正文副本中的内联链接。默认文本是在“{typography.body-md}”中呈现的“{colors.on-primary}”，并带有持久下划线；下划线是整个可供性，没有颜色变化。与副本齐平，没有填充，继承的“{rounded.xs}”之外没有圆角。

**`link-on-light`** — 灯光表面上正文副本中的内联链接。与“link-on-dark”形状契约相同，但文本是“{colors.ink-deep}”。在定价、联系人和文档界面中使用。

**`footer-light`** — light-canvas 模板上的站点范围页脚（定价、联系方式、文档）。
- 背景“{colors.surface-canvas-light}”，文本“{colors.ink-deep}”，输入“{typography.caption}”，填充“{spacing.xxl} {spacing.xl}”(32px 24px)。顶部是石灰波浪形分隔线 - 请参阅“签名组件”。包含三到四列链接组、右下角水平条中的社交图标以及“{typography.caption}”最底部的一个小的法律/版权行。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 为显示标题和页脚波形分隔线内的关键字突出显示块保留“{colors.accent-lime}”——切勿将其用作按钮背景，切勿用作正文。
- 将每个“button-primary”与大写的“{typography.button-cap}”配对，并带有 0.2px 跟踪 — 节奏是品牌的一部分，而不是风格选择。
- 将深色画布 (`{colors.surface-canvas-dark}`) 和浅色画布 (`{colors.surface-canvas-light}`) 视为两个完整的世界 - 让一个拥有营销/功能页面，另一个拥有交易页面，没有半途而废。
- 使用贴纸吉祥物打破部分边界——让它们重叠、倾斜和浮动；将他们限制在牌内会耗尽他们的个性。
- 对于特色定价列，使用“卡片定价特色”（深色倒置层）而不是带重音边框的浅色层。
- 在功能性 UI 界面上默认正文线高为 1.5，在营销界面上默认正文线高为 2.0 — 差异是故意的。### 禁止事项
- 不要引入除“{colors.accent-lime}”和“{colors.accent-pink}”之外的其他强调色——添加青色、橙色或黄色会淡化紫罗兰色和青柠色的特征。
- 不要对深色画布上的卡片应用阴影 - 深度来自纹理和插图，而不是来自会使紫罗兰色变得浑浊的明暗阴影。
- 不要将“{typography.display-hero}”（88px）用于除营销英雄之外的任何内容 - 即使子页面上限为“{typography.display-large}”（60px）。
- 不要将正文放在“{colors.accent-lime}”中——它是色块颜色，而不是字体颜色，并且会破坏正文尺寸的对比度。
- 不要将“{colors.primary}”按钮软化为紫罗兰色——接近黑色才是重点；无论画布极性如何，它都被视为最权威的操作。
- 不要将带插图的吉祥物放在卡片或受限容器内 - 它们的作用是打破网格，而不是占据网格。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
| 4K / 宽屏 | ≥ 1440 像素 |完整的 4 层定价行，英雄插图全尺寸位于标题旁边 |
|桌面| 1152–1440 像素 |默认内容最大宽度为 1152px，所有 4 层模式均保持 |
|笔记本电脑 | 992–1151 像素 |定价下降至 2 行，资产净值保持水平 |
|平板电脑| 768–991 像素 | 2 列特征网格折叠为 1 列；导航仍然水平但压缩|
|移动大| 640–767 像素 |汉堡导航出现；英雄显示从 88px 下降到 ~56px |
|手机 | 576–639 像素 |单列一切；部分内边距从 96 像素折叠到 32–48 像素 |
|小型手机| 1–575 像素 |紧凑模式；贴纸吉祥物尺寸减小或完全隐藏以保留内容优先级 |### Touch Targets
- 主按钮在移动设备上的最小尺寸为 44×44 像素（12 像素垂直填充 × 16 像素字体 + 行高 = ~44 像素）。维持 WCAG AAA 触摸目标规范。
- 即使在小的移动断点处，导航和功能表面中的药丸标签和徽章也保持在 32×32 像素以上；如有必要，它们会放大而不是缩小。
- 移动联系页面上的表单字段最小高度保持在 44 像素。### Collapsing Strategy
- **英雄显示标题**在断点楼梯上从 88px → 60px → 48px 下降；石灰关键字芯片在每一步都保留填充和角半径。
- **定价等级** 从 4-up → 2-up → 1-up 阶梯式定价。特色深色层始终保持视觉上的独特性——它在任何断点处都不会失去其反转。
- **贴纸吉祥物**逐渐不再被重视：在桌面上它们与部分边界重叠；在平板电脑上，它们会转变为内联部分填充；在小型移动设备上，大多数内容都通过“display: none”隐藏，以保持内容可扫描。
- **顶部导航** 折叠成低于 768 像素的汉堡包；下拉菜单使用与页面相同的画布极性（英雄为深色，定价为浅色）。
- **代码块**在每个断点处保留 16px Monaco - 它们永远不会缩小 - 但在溢出时切换到水平滚动而不是换行。### Image Behavior
- 产品 UI 模拟按比例缩放；在小型移动设备上，它们通常锚定在水平溢出的一侧，而不是缩小到难以辨认。
- 贴纸吉祥物在移动断点处缩放 50-70%，保留其个性，但将屏幕空间让给内容。
- 石灰页脚波浪线将 SVG 缩放到容器宽度，同时保持笔划宽度视觉上一致。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。不要重建系统——扩展它。
2. 直接引用组件名称和标记（“{colors.accent-lime}”、“{button-primary}-pressed”、“{rounded.xxl}”）——不要转述。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”——“broken-ref”、“contrast-ratio”和“orphaned-tokens”警告会自动标记问题。
4. 添加新变体作为单独的组件条目（`-pressed`、`-disabled`、`-focused`）——不要将它们埋在散文中。
5. 产品 UI 主体默认为“{typography.body-md}”，营销散文默认为“{typography.body-lg}”——主要区别在于有意和承重。
6. 保持“{colors.accent-lime}”稀缺——每个视口一个石灰元素。签名之所以有效，是因为它很罕见。
7. 当偏振新表面时，选择一个画布（“{colors.surface-canvas-dark}”或“{colors.surface-canvas-light}”）并提交；不要将两者混合在一个页面带上。
