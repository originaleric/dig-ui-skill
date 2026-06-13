---
version: alpha
name: Supabaze Inspired
description: An inspired interpretation of Supabaze's design language — an open-source database platform built on a clean white-and-near-black system with a single signature emerald-green CTA, a custom humanist sans display tier, and dense product UI mockups composited above the hero. The brand reads as quietly technical: minimal chrome, a near-monochrome palette, and the green primary acting as the only chromatic event on the page.

colors:
  primary: "#3ecf8e"
  primary-deep: "#24b47e"
  primary-soft: "#4ade80"
  ink: "#171717"
  ink-secondary: "#212121"
  ink-mute: "#707070"
  ink-mute-2: "#9a9a9a"
  ink-faint: "#b2b2b2"
  on-primary: "#171717"
  on-dark: "#ffffff"
  canvas: "#ffffff"
  canvas-soft: "#fafafa"
  canvas-night: "#1c1c1c"
  canvas-night-soft: "#202020"
  hairline: "#dfdfdf"
  hairline-strong: "#c7c7c7"
  hairline-cool: "#ededed"
  hairline-cool-2: "#efefef"
  hairline-cool-3: "#d4d4d4"
  accent-purple: "#6b01c2"
  accent-violet: "#644fc1"
  accent-purple-soft: "#eddbf9"
  accent-yellow: "#ffdb13"
  accent-tomato: "#ff2201"
  accent-pink: "#c7007e"
  accent-indigo: "#054cff"
  accent-crimson: "#e2005a"

typography:
  display-xxl:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -1.92px
  display-xl:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -1.44px
  display-lg:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.72px
  display-md:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.42px
  heading-lg:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-md:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-md:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-md:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  caption:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  micro:
    fontFamily: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  code:
    fontFamily: "ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  huge: 64px

components:
  button-primary-green:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  button-primary-green-pressed:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  button-secondary-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  button-on-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  button-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  card-feature-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-pricing:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-pricing-featured:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-feature-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  code-block:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: 16px
  pill-tag-green:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.micro}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  pill-tag-soft:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  nav-bar-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 16px 24px
  link-on-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-mute}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 64px 24px
---

## Dig UI CSS Tokens

```css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #171717;
--dig-text-muted: #171717;
--dig-text-soft: #171717;
--dig-accent: #3ecf8e;
--dig-accent-strong: #3ecf8e;
--dig-accent-2: #3ecf8e;
--dig-accent-2-strong: #644fc1;
--dig-border: #dfdfdf;
--dig-border-strong: #c7c7c7;
--dig-grid-line: #dfdfdf;
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #3ecf8e;

--dig-font-sans: Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif;
--dig-font-mono: ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 13px;
--dig-text-md: 14px;
--dig-text-lg: 16px;
--dig-text-xl: 18px;
--dig-text-2xl: 22px;
--dig-text-3xl: 28px;
--dig-text-4xl: 36px;
--dig-text-5xl: 48px;

--dig-radius-sm: 6px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
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

> **源页面：**主页 (`/`)、`/database`、`/partners/integrations`、`/partners/integrations/powersync`、`/solutions/ai-builders`、`/pricing`。### 品牌与主色
- **Emerald** (`{colors.primary}` — `#3ecf8e`)：CTA 标志颜色。填充按钮背景、品牌文字标记、点指示器。
- **Emerald Deep** (`{colors.primary-deep}` — `#24b47e`)：主色的按下状态提升。
- **Emerald Soft** (`{colors.primary-soft}` — `#4ade80`)：在图表强调和产品 UI 中使用较浅的祖母绿。
- **强调紫色**（`{colors.accent-purple}` — `#6b01c2`）：集成徽标和图表点中使用的罕见强调；从来没有一个按钮。
- **强调紫** (`{colors.accent-violet}` — `#644fc1`)：次要强调与强调紫色的作用相同。
- **强调黄色** (`{colors.accent-yellow}` — `#ffdb13`)：仅限图表强调/状态指示器。
- **强调粉色/深红色/靛蓝/番茄**：保留用于集成徽标和罕见的图表突出显示，绝不作为系统颜色。### 表面与背景
- **Canvas** (`{colors.canvas}` — `#ffffff`)：默认页面背景。
- **Canvas Soft** (`{colors.canvas-soft}` — `#fafafa`)：几乎没有着色的灰白色，用于交替部分带。
- **Canvas Night** (`{colors.canvas-night}` — `#1c1c1c`)：深近黑色用于代码块、仪表板模型、特色定价层。
- **Canvas Night Soft** (`{colors.canvas-night-soft}` — `#202020`)：稍微提升嵌套镀铬的深色。
- **发际线** (`{colors.hairline}` — `#dfdfdf`)：卡片和桌子上的 1 像素边框。
- **发际线强** (`{colors.hairline-strong}` — `#c7c7c7`)：稍暗的边框以强调。
- **Hairline Cool** (`{colors.hairline-cool}` — `#ededed`) / **Hairline Cool 2** (`#efefef`) / **Hairline Cool 3** (`#d4d4d4`)：该品牌的灰色阶梯，用于精细镀铬工作。### 文本色
- **Ink** (`{colors.ink}` — `#171717`)：默认正文。近乎黑色，绝不纯正。
- **Ink secondary** (`{colors.ink-secondary}` — `#212121`)：稍冷的近黑色，用于强调身体。
- **Ink Mute** (`{colors.ink-mute}` — `#707070`)：辅助文本和辅助副本。
- **墨水静音 2** (`{colors.ink-mute-2}` — `#9a9a9a`)：第三文本。
- **Ink Faint** (`{colors.ink-faint}` — `#b2b2b2`)：禁用/占位符文本。
- **On Primary** (`{colors.on-primary}` — `#171717`)：翡翠色主要填充上的文本 — 接近黑色，而不是白色。该按钮读取为带有深色字体的“亮”表面，而不是彩色芯片。
- **On Dark** (`{colors.on-dark}` — `#ffffff`)：画布夜间表面上的文本。## 排版与字体系统 (Typography)



### 字体家族
显示和 UI 层是 **Circular**——Lineto 专有的几何人文主义 sans。后备链：“Helvetica Neue”、Helvetica、Arial”。

为了在 Circular 未获得许可时获得最大的品牌保真度，请使用粗细为 500 的 **Inter**（通过 Google Fonts 开源），以 64 像素的“letter-spacing: -1.92px”显示。 Inter 是与 Circular 的几何人文主义特征最接近的开源类比。

代码块使用**系统单声道**（`ui-monospace`，带有 Menlo / Monaco / Consolas 后备）。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-xxl}` | 64 像素 | 500 | 500 1.1| -1.92 像素 |英雄标题|
| `{typography.display-xl}` | 48 像素 | 500 | 500 1.1| -1.44 像素 |开节器|
| `{typography.display-lg}` | 36 像素 | 500 | 500 1.15 | 1.15 -0.72 像素 |子部分/定价层 |
| `{typography.display-md}` | 28 像素 | 500 | 500 1.2 | 1.2 -0.42 像素 |卡片标题|
| `{typography.heading-lg}` | 22 像素 | 500 | 500 1.2 | 1.2 0 |紧凑标题 |
| `{typography.heading-md}` | 18 像素 | 500 | 500 1.4 | 1.4 0 |部分小标题|
| `{typography.body-lg}` | 18 像素 | 400 | 1.55 | 1.55 0 |营销机构负责人|
| `{typography.body-md}` | 16 像素 | 400 | 1.5 | 1.5 0 |默认 UI 主体 |
| `{typography.button-md}` | 14 像素 | 500 | 500 1.0 | 0 |按钮标签|
| `{typography.caption}` | 13 像素 | 400 | 1.45 | 1.45 0 |助手，脚注|
| `{typography.micro}` | 12 像素 | 400 | 1.45 | 1.45 0 |药丸标签，小字 |
| `{typography.code}` | 14 像素 | 400 | 1.5 | 1.5 0 |代码块内容 |### 排版原则
- **整个显示屏的重量为 500。** 中等重量看起来是经过精心设计的，而不是装饰性的。
- **显示负跟踪。** -1.92px at 64px 按比例缩小 - 将圆形人文字母形式收紧为编辑密度。
- **Mono 代码。** 系统 mono 系列 (Menlo / Monaco) — 无专有的 mono web 字体。### 字体备选说明
循环是专有的。使用权重为 500 的 **Inter** 和“letter-spacing: -1.92px”作为显示层。 **Geist Sans**（来自 Vercel 的开源）是显示和正文的另一种接近的替代方案。避免 Helvetica 默认设置——它们比较重并且缺乏几何温暖感。## 布局与间距 (Layout)



### 间距系统
- **基本单位**：8px（带有 2 / 4 / 12 个子标记，用于精细工作）。
- **令牌**： `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.huge}` 64 像素。
- **部分填充**：营销表面上的 64–96 像素。
- **卡内部填充**：功能/定价卡上为 32 像素。### 网格与容器
- 营销页面居中于约 1280 像素的容器中，无边缘出血；该品牌将内容保留在盒子内。
- 价格在 1024 / 768 断点处按 4 价上涨 → 2 价上涨 → 1 价下跌。
- 产品 UI 模型在同一容器内堆叠 2 层或呈现为重叠窗格。### 留白哲学
该品牌使用宽敞的 64-96 像素部分填充，没有大气梯度填充空间 - 白色画布就是设计。组合的产品 UI 模型无需装饰即可分解各个部分。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0 |扁平，1px 发际线 |默认卡 |
| 1 | `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` |微妙的卡举|
| 2 | `盒子阴影：0 8px 24px rgba(0,0,0,0.08)` |浮动复合 UI 模型 |
| 3 | `盒子阴影：0 16px 48px rgba(0,0,0,0.12)` |模态叠加，深度高程 |### 装饰性深度
该品牌的深度是**产品 UI 模型**而不是渐变。堆叠的仪表板/SQL 编辑器/日志窗格与微妙的 2 级阴影组合在一起，以表明空间层次结构。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 4 像素 |表单输入、细线标签 |
| `{rounded.sm}` | 6 像素 |按钮（品牌标志性按钮半径）、代码块 |
| `{rounded.md}` | 8 像素 |紧凑型卡片、警报|
| `{rounded.lg}` | 12 像素 |定价卡、功能卡、产品模型 |
| `{rounded.xl}` | 16 像素 |模态对话框、大型容器 chrome |
| `{rounded.full}` | 9999 像素 |药丸标签、头像 |### Photography Geometry
该品牌使用最少的摄影。客户徽标条以统一的灰度高度（~24–32px）显示文字标记；案例研究卡（罕见）使用嵌入在“{rounded.lg}”容器中的 4:3 照片。## 核心组件 (Components)



### 按钮设计
**`button-primary-green`** — 签名 CTA。
- 背景“{colors.primary}”，文本“{colors.on-primary}”（接近黑色，而不是白色），输入“{typography.button-md}”，填充“{spacing.sm} {spacing.lg}”（8px 16px），圆角“{rounded.sm}”6px。
- 按下状态“button-primary-green-pressed”切换为“{colors.primary-deep}”。

**`button-secondary-outline`** — 白色轮廓替代方案。
- 背景“{colors.canvas}”，文本“{colors.ink}”，1px实线“{colors.hairline-strong}”边框，形状相同。

**`深色按钮`** — 用于深色表面/代码块 CTA。
- 背景“{colors.canvas-night}”，文本“{colors.on-dark}”，形状相同。

**`button-link`** — 纯文本内嵌按钮。
- 透明背景，文本“{colors.ink}”以“{typography.button-md}”呈现，无填充，悬停时带有微妙的下划线。### 卡片与容器
**`card-feature-light`** — 白色功能卡。
- 背景“{colors.canvas}”，填充“{spacing.xxl}”，圆形“{rounded.lg}”12px，1px“{colors.hairline}”边框。

**`卡定价`** — 标准定价层。
- 背景`{colors.canvas}`，填充`{spacing.xxl}`，圆形`{rounded.lg}`，1px`{colors.hairline}`边框。标题为“{typography.heading-lg}”，价格为“{typography.display-md}”，正文为“{typography.body-md}”，CTA“button-primary-green”固定在底部。

**`卡片定价功能`** — 倒置的深色功能层。
- 背景“{colors.canvas-night}”，文本“{colors.on-dark}”，其他结构相同。

**`card-feature-dark`** — 具有深黑色填充的功能卡。
- 背景“{colors.canvas-night}”、文本“{colors.on-dark}”、填充“{spacing.xxl}”、圆角“{rounded.lg}”。用于代码密集的功能解释。

**`code-block`** — 代码片段容器。
- 背景“{colors.canvas-night}”，文本“{colors.on-dark}”在“{typography.code}”中呈现。内边距 `{spacing.lg}` 16px，圆角 `{rounded.sm}` 6px。### 输入框与表单
**`文本输入`** — 标准表单输入。
- 背景“{colors.canvas}”、文本“{colors.ink}”、类型“{typography.body-md}”、填充“{spacing.sm} {spacing.md}”(8px 12px)、圆形“{rounded.sm}”6px、1px“{colors.hairline}”边框。### Navigation
**`nav-bar-light`** — 整个网站的顶部导航。
- 背景“{colors.canvas}”，文本“{colors.ink}”，填充“{spacing.lg} {spacing.xl}”。左侧徽标，主要导航中心，“登录”链接 + 右侧填充的“button-primary-green”。### Pills, Tags, and Chips
**`pill-tag-green`** — 用于“新”或特色指标的绿色小药丸。
- 背景“{colors.primary}”、文本“{colors.on-primary}”、类型“{typography.micro}”、填充“{spacing.xxs} {spacing.sm}”、圆角“{rounded.full}”。

**`药丸标签-软`** — 轻质表面上的中性药丸。
- 背景“{colors.canvas-soft}”，文本“{colors.ink}”，其他形状相同。### Signature Components
**组合产品 UI 模型** — 多层仪表板/SQL 编辑器/日志窗格组合，具有微妙的 2 级阴影。产品是品牌的论据；模型总是位于白色画布上，周围没有任何装饰。

**`link-on-light`** — 正文中的内联链接。
- 在“{typography.body-md}”中呈现的带有持久下划线的文本“{colors.ink}”。

**`footer-light`** — 站点范围的页脚。
- 背景“{colors.canvas}”，文本“{colors.ink-mute}”，输入“{typography.caption}”，填充“{spacing.huge} {spacing.xl}”(64px 24px)。包含 4-5 列链接组、社交图标和一个小的法律行。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 为填充的 CTA 和文字标记重音保留“{colors.primary}”祖母绿 - 它应该很少出现。
- 渲染显示层重量为 500，字母间距为负 — 设计的紧密性是品牌的一部分。
- 使用“{rounded.sm}” 6px 作为按钮 - 方形半径，绝不是药丸形状。
- “{rounded.lg}”容器内的复合产品 UI 模型，带有微妙的 2 级阴影。
- 在祖母绿按钮上使用接近黑色的“{colors.ink}”（不是白色）——绿色读作“亮”，深色字体，这是该品牌的独特选择。
- 对每个代码块应用系统单声道。### 禁止事项
- 不要引入额外的强调色作为系统颜色 - 紫色、黄色和粉色仅属于图表点和集成徽标。
- 不要将显示重量提高到 500 以上 - 该品牌的校准中等重量在 600 以上。
- 请勿使用药丸状纽扣；该品牌的按钮半径约为 6 像素。
- 不要在祖母绿按钮上使用白色文字——该品牌特别在绿色上使用近乎黑色的文字。
- 不要为英雄乐队添加大气渐变——白色画布就是设计。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|宽| ≥ 1440 像素 |集装箱全宽；全尺寸产品模型|
|桌面| 1024–1440 像素 |默认内容最大宽度；定价 4-up |
|平板电脑| 768–1023 像素 |定价 2-up；模型简化为单个面板 |
|手机 | < 768 像素 |定价 1-up；汉堡导航；显示下降 64 → 36px |### Touch Targets
- 移动设备上按钮点击 ≥ 36×36px；垂直填充按比例放大以保持 WCAG AA 最小值。
- 表单字段的最小高度保持在 36 像素。### Collapsing Strategy
- 显示层阶梯 64 → 48 → 36 → 28 → 22px。
- 产品 UI 模型简化为移动设备上的单个主面板。
- 定价阶梯 4-up → 2-up → 1-up；深色特色层总是与众不同。### Image Behavior
产品 UI 模型使用“srcset”和桌面/移动作物；移动作物专注于最具可操作性的内面板。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。
2. 直接引用组件名称和标记。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”。
4. 默认正文为`{typography.body-md}`；对任何面向开发人员的代码片段使用“{typography.code}”。
5、保持祖母绿的稀缺性；每个视口有一个实心绿色按钮。
6. 白色画布的承诺是没有商量余地的——添加大气背景会破坏品牌形象。
