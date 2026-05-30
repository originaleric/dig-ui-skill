---
version: alpha
name: Stripi Inspired
description: An inspired interpretation of Stripi's design language — a financial-infrastructure brand built on a deep navy ink, an electric indigo primary, and a recurring atmospheric gradient mesh that occupies the upper third of nearly every marketing page. The system pairs the proprietary Sohne family at thin (300) weights with negative letter-spacing for editorial-density display headlines, and uses tabular-figure body type where money and numerics matter. Buttons are tight-radius pills, cards live on near-white surfaces, and the dashboard track flips polarity to a familiar dark-app shell.

colors:
  primary: "#533afd"
  primary-deep: "#4434d4"
  primary-press: "#2e2b8c"
  primary-soft: "#665efd"
  primary-bg-subdued-hover: "#b9b9f9"
  brand-dark-900: "#1c1e54"
  ink: "#0d253d"
  ink-secondary: "#273951"
  ink-mute: "#64748d"
  ink-mute-2: "#61718a"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  canvas-soft: "#f6f9fc"
  canvas-cream: "#f5e9d4"
  hairline: "#e3e8ee"
  hairline-input: "#a8c3de"
  ruby: "#ea2261"
  magenta: "#f96bee"
  lemon: "#9b6829"
  shadow-blue: "#003770"

typography:
  display-xxl:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 56px
    fontWeight: 300
    lineHeight: 1.03
    letterSpacing: -1.4px
    fontFeature: ss01
  display-xl:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: -0.96px
    fontFeature: ss01
  display-lg:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.64px
    fontFeature: ss01
  display-md:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 26px
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: -0.26px
    fontFeature: ss01
  heading-lg:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 22px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.22px
    fontFeature: ss01
  heading-md:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: -0.2px
    fontFeature: ss01
  heading-sm:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: 0
    fontFeature: ss01
  body-lg:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: 0
    fontFeature: ss01
  body-md:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 15px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: 0
    fontFeature: ss01
  body-tabular:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: -0.42px
    fontFeature: tnum
  button-md:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    fontFeature: ss01
  button-sm:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
    fontFeature: ss01
  caption:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.39px
    fontFeature: tnum
  micro:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 11px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: 0
    fontFeature: ss01
  micro-cap:
    fontFamily: "sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0.1px
    fontFeature: ss01

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px

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
  button-primary-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  button-primary-pill-pressed:
    backgroundColor: "{colors.primary-press}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  button-on-dark:
    backgroundColor: "{colors.brand-dark-900}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  text-input-focused:
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
    backgroundColor: "{colors.brand-dark-900}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-cream-band:
    backgroundColor: "{colors.canvas-cream}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-dashboard-mockup:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-tabular}"
    rounded: "{rounded.lg}"
    padding: 24px
  pill-tag-soft:
    backgroundColor: "{colors.primary-bg-subdued-hover}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.micro-cap}"
    rounded: "{rounded.pill}"
    padding: 4px 8px
  nav-bar-on-mesh:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 16px 24px
  link-on-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
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
css
--dig-bg: #ffffff;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #ffffff;
--dig-surface-elevated: #ffffff;
--dig-text: #0d253d;
--dig-text-muted: #0d253d;
--dig-text-soft: #0d253d;
--dig-accent: #533afd;
--dig-accent-strong: #533afd;
--dig-accent-2: #533afd;
--dig-accent-2-strong: #533afd;
--dig-border: #e3e8ee;
--dig-border-strong: #e3e8ee;
--dig-grid-line: #e3e8ee;
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #533afd;

--dig-font-sans: sohne-var, 'SF Pro Display', system-ui, -apple-system, sans-serif;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 10px;
--dig-text-sm: 11px;
--dig-text-md: 13px;
--dig-text-lg: 14px;
--dig-text-xl: 15px;
--dig-text-2xl: 16px;
--dig-text-3xl: 18px;
--dig-text-4xl: 20px;
--dig-text-5xl: 22px;

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

Stripi 的设计语言以渐变网格开启。柔和的奶油色、果子露橙、薰衣草色、电靛蓝和红宝石色的宽水平带占据了几乎每个营销页面的上三分之一——该品牌立即可识别的氛围背景。类型和产品 UI 模型漂浮在“{colors.canvas}”（白色）上方，渐变充当装饰和视觉锚点。页面的下部返回到白色，并带有“{colors.canvas-soft}”（几乎没有着色的冷灰白色）的功能说明，以及仪表板产品模型，以深海军蓝的形式合成为人造 IDE/控制台面板。

颜色系统有两个主要作用。 **靛蓝**（`{colors.primary}` — `#533afd`）是该品牌的标志性 CTA 颜色，用量很少：每条带一粒填充药丸。 **深海军蓝**（`{colors.ink}` — `#0d253d`）是通用正文文本颜色和仪表板模型的填充、特色定价层以及仪表板轨道上的深色应用程序表面。红宝石 (`{colors.ruby}`) 和洋红色 (`{colors.magenta}`) 出现在渐变网格内，并作为产品 UI 模型中的强调点；它们不用作按钮颜色。

版式围绕 **Sohne** 构建，字重为 300，字母间距为负——该品牌的编辑密度显示标志。显示尺寸 (32–56px) 使用 -1.4px 到 -0.64px 跟踪；主体尺寸使用 0；表格标题大小（金钱和数字很重要）使用 OpenType `tnum` 功能以及收紧的 -0.36 到 -0.42px 跟踪。 “ss01”风格集在所有角色中启用。

**主要特征：**
- 每个营销英雄上的渐变网格背景 - 奶油色/橙色/薰衣草/靛蓝/红宝石水平地覆盖页面的上三分之一。
- 单靛蓝 CTA 层次结构：填充的“{colors.primary}”药丸是营销界面上唯一填充的按钮。
- Sohne 薄（重量 300）显示层，负跟踪范围为 -1.4px 到 -0.2px，具体取决于尺寸。
- 表格数字主体类型（“tnum”）适用于任何包含金钱或数字的单元格 - 该品牌安静的财务数据信号。
- 深色应用程序仪表板轨道：深海军产品 UI 模型位于白色画布上方，通常包含渲染代码或仪表板表格。
- 药丸形按钮 (`{rounded.pill}` 9999px)，带有紧密的 `8px 16px` 填充 — 简短、果断、事务性。
- 奶油色带功能卡（“{colors.canvas-cream}”）在蓝色/白色部分之间引入了温暖的插曲，而不会破坏品牌的色彩逻辑。## 颜色系统 (Colors)

> **源页面：**主页 (`/`)、`/ payment`、`/pricing`、`dashboard.stripe.com/register/ payments`。### 品牌与主色
- **靛蓝** (`{colors.primary}` — `#533afd`)：品牌的标志性 CTA 颜色。填充药丸按钮、链接强调、渐变锚点。
- **Indigo Deep** (`{colors.primary-deep}` — `#4434d4`)：更深的靛蓝用于渐变中间停止并作为新闻状态较温暖的替代品。
- **Indigo Press** (`{colors.primary-press}` — `#2e2b8c`)：主要的按下状态提升。
- **Indigo Soft** (`{colors.primary-soft}` — `#665efd`)：用于产品 UI 强调和图表突出显示的浅靛蓝。
- **靛蓝柔和** (`{colors.primary-bg-subdued-hover}` — `#b9b9f9`)：用作软标签背景的浅靛蓝填充。
- **Brand Dark 900** (`{colors.brand-dark-900}` — `#1c1e54`)：在特色定价层和仪表板镀铬上使用的深海军蓝。
- **Ruby** (`{colors.ruby}` — `#ea2261`)：渐变强调和图表突出显示；从来没有一个按钮。
- **洋红色** (`{colors.magenta}` — `#f96bee`)：渐变网格中更亮的粉色停止点。
- **柠檬** (`{colors.lemon}` — `#9b6829`)：渐变背景中的温暖果子露。### 表面与背景
- **Canvas** (`{colors.canvas}` — `#ffffff`)：默认页面背景。
- **Canvas Soft** (`{colors.canvas-soft}` — `#f6f9fc`)：在渐变英雄下方的功能带上使用冷色灰白色。
- **Canvas Cream** (`{colors.canvas-cream}` — `#f5e9d4`)：用作功能带填充的暖奶油色 — 该品牌的色彩插曲。
- **发际线** (`{colors.hairline}` — `#e3e8ee`)：卡片和桌子上的 1 像素边框。
- **发际线输入** (`{colors.hairline-input}` — `#a8c3de`)：表单输入中使用稍冷的发际线。### 文本色
- **Ink** (`{colors.ink}` — `#0d253d`)：整个品牌的默认正文文本颜色。深海军蓝，绝不是纯黑色。
- **第二墨水** (`{colors.ink-secondary}` — `#273951`)：白色辅助文本。
- **Ink Mute** (`{colors.ink-mute}` — `#64748d`)：辅助文本、标题、表格标签。
- **Ink Mute 2** (`{colors.ink-mute-2}` — `#61718a`)：几乎相当于导航中使用的 ink-mute。
- **On Primary** (`{colors.on-primary}` — `#ffffff`)：靛蓝/深海军蓝表面上的文本。### 语义色
该品牌在营销系统中没有使用单独的语义调色板——错误/成功状态特别存在于仪表板产品 UI 中。## 排版与字体系统 (Typography)



### 字体家族
显示屏和 UI 层为 **Sohne**（专有，由 Klim Type Foundry 授权），重量为 300（薄）和 400（常规）。可变字体 (`sohne-var`) 加载了全局启用的 `font-feature-settings: "ss01"` — 该风格集替代了单层的 `a` 和作为品牌印刷签名一部分的其他字符变体。

当 Sohne 不可用时，请回退至 **SF Pro Display** 轻量级，然后是 system-ui。为了获得最大的品牌保真度，**Inter**（开源）的权重为 300，显示尺寸上的 `font-feature-settings: "ss01"` 和 `letter-spacing: -1.4px` 非常接近节奏。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-xxl}` | 56 像素 | 300 | 300 1.03 | 1.03 -1.4 像素 |英雄标题|
| `{typography.display-xl}` | 48 像素 | 300 | 300 1.15 | 1.15 -0.96 像素 |开节器|
| `{typography.display-lg}` | 32 像素 | 300 | 300 1.1| -0.64 像素 |卡片标题/小节|
| `{typography.display-md}` | 26 像素 | 300 | 300 1.12 | 1.12 -0.26 像素 |紧凑的卡片标题 |
| `{typography.heading-lg}` | 22 像素 | 300 | 300 1.1| -0.22 像素 |定价层名称 |
| `{typography.heading-md}` | 20 像素 | 300 | 300 1.4 | 1.4 -0.2 像素 |部分小标题|
| `{typography.heading-sm}` | 18 像素 | 300 | 300 1.4 | 1.4 0 |小节标签|
| `{typography.body-lg}` | 16 像素 | 300 | 300 1.4 | 1.4 0 |营销机构负责人|
| `{typography.body-md}` | 15 像素 | 300 | 300 1.4 | 1.4 0 |默认 UI 主体 |
| `{typography.body-tabular}` | 14 像素 | 300 | 300 1.4 | 1.4 -0.42 像素 |货币/数字表（使用“tnum”）|
| `{typography.button-md}` | 16 像素 | 400 | 1.0 | 0 |药丸按钮标签|
| `{typography.button-sm}` | 14 像素 | 400 | 1.0 | 0 |紧凑型药丸标签|
| `{typography.caption}` | 13 像素 | 400 | 1.4 | 1.4 -0.39 像素 |助手，表格标签|
| `{typography.micro}` | 11 像素 | 300 | 300 1.4 | 1.4 0 |精美印刷|
| `{typography.micro-cap}` | 10 像素 | 400 | 1.15 | 1.15 0.1 像素 |全大写眉|### 排版原则
- **薄权重是品牌。** 显示层始终以权重 300 渲染。突破到 400+ 会消除品牌的编辑气息。
- **显示负跟踪。** 56 像素处为 -1.4 像素，20 像素处按比例缩小至 -0.2 像素。负面追踪是品牌的印刷签名。
- **金钱的表格数字。** 任何单元格渲染货币、交易金额或数字计数都使用“字体功能设置：“tnum””加上紧缩跟踪。该品牌通过这个微观细节悄悄地传达了其金融DNA。
- **`ss01` 全局。** 将 `font-feature-settings: "ss01"` 应用到 body 元素，以便为每个文本角色启用样式集替换。### 字体备选说明
Sohne 是专有的。使用权重为 300 的 **Inter**（通过 Google Fonts 开源），并使用 `letter-spacing: -1.4px` 和 `font-feature-settings: "ss01"` 作为显示层 — Inter 是最接近的开源类似物。对于体型尺寸，重量为 300、“font-feature-settings: "tnum"”（如果适用）的 Inter 是标准替代品。避免使用 Helvetica 或系统 UI 默认值——它们比品牌需求更重。## 布局与间距 (Layout)



### 间距系统
- **基本单位**：8px（带有 2 / 4 / 12 个子标记，用于精细工作）。
- **令牌**： `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.huge}` 64 像素。
- **部分填充**：营销表面上的 64–96 像素；仪表板/产品表面上 32–48 像素。
- **卡内部填充**：功能卡上为 32 像素；仪表板模型上的 24px。### 网格与容器
- 营销页面集中在一个约 1200 像素的容器中，渐变网格在上方从边到边延伸。
- 价格在 1024 / 768 断点处按 4 价上涨 → 2 价上涨 → 1 价下跌。
- 仪表板产品模型使用自己的内部网格（12 列表格、3 列卡片网格）呈现为静态复合材料。### 留白哲学
渐变网格占据页面的上三分之一；下面的白色画布有大量的衬垫。部分间隙趋向于 96 像素，而用户比较和操作的仪表板/定价页面上的内容则收紧至 32 像素。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0 |平|默认表面 |
| 1 | `盒子阴影：rgba(0,55,112,0.08) 0 1px 3px` |白色卡举起|
| 2 | `box-shadow: rgba(0,55,112,0.08) 0 8px 24px, rgba(0,55,112,0.04) 0 2px 6px` |浮动面板、镀铬仪表板模型|
| 3 |渐变网格背景|该品牌的主要深度媒介——大气的色彩而不是字面上的阴影|### 装饰性深度
梯度网格是深度系统。作为分层 SVG 或大型背景图像而不是 CSS 渐变实现（实际网格具有不可 CSS 渲染的有机斑点形状）。网布提供品牌标志性的提升力；文字阴影保留用于产品 UI 模型并保持微妙。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 4 像素 |发丝标记，表镀铬 |
| `{rounded.sm}` | 6 像素 |表单输入|
| `{rounded.md}` | 8 像素 |紧凑型卡片、警报|
| `{rounded.lg}` | 12 像素 |定价卡、功能卡 |
| `{rounded.xl}` | 16 像素 |仪表板产品样机 chrome |
| `{rounded.pill}` | 9999 像素 |所有按钮、标签丸|### Photography Geometry
该品牌更多地使用**产品 UI 模型**，而不是摄影。仪表板复合材料在“{rounded.lg}”12px 容器内渲染为人造 IDE/终端/仪表板镶边，并带有微妙的“box-shadow”。真实的照片出现在客户标志条和罕见的案例研究卡中；处理为插图 4:3，没有阴影。## 核心组件 (Components)



### 按钮设计
**`button-primary-pill`** — 整个系统范围内占主导地位的 CTA。
- 背景“{colors.primary}”，文本“{colors.on-primary}”，类型“{typography.button-md}”，填充“{spacing.sm} {spacing.lg}”(8px 16px)，圆角“{rounded.pill}”9999px。
- 按下状态“button-primary-pill-pressed”将背景切换为“{colors.primary-press}”。

**`button-secondary`** — 轮廓样式的替代方案。
- 背景“{colors.canvas}”，文本“{colors.primary}”，1px实心“{colors.primary}”边框，相同的药丸几何形状。

**`深色按钮`** — 用于仪表板/深色表面。
- 背景“{colors.brand-dark-900}”，文本“{colors.on-primary}”，相同的药丸几何形状。### 卡片与容器
**`card-feature-light`** — 白色的功能说明卡。
- 背景`{colors.canvas}`，填充`{spacing.xxl}`，圆形`{rounded.lg}` 12px，1px`{colors.hairline}`边框，可选的1级阴影。

**`卡定价`** — 标准定价层。
- 背景`{colors.canvas}`，填充`{spacing.xxl}`，圆形`{rounded.lg}`，1px`{colors.hairline}`边框。标题“{typography.heading-lg}”，价格“{typography.display-md}”，正文“{typography.body-md}”，CTA 将底部固定为“button-primary-pill”。

**`卡片定价功能`** — 倒置的深色功能层。
- 背景“{colors.brand-dark-900}”，文本“{colors.on-primary}”，其他结构与“card-pricing”相同。深海军蓝填充色是该品牌独特的特色级别选择。

**`card-cream-band`** — 温暖的插曲卡。
- 背景“{colors.canvas-cream}”，文本“{colors.ink}”，填充“{spacing.xxl}”，圆形“{rounded.lg}”。用来用温暖打破靛蓝/白色的节奏。

**`card-dashboard-mockup`** — 合成仪表板/产品 UI 屏幕截图。
- 背景“{colors.canvas}”，输入“{typography.body-tabular}”（带有“tnum”），填充“{spacing.xl}”24px，圆形“{rounded.lg}”12px，2级阴影。通常包含嵌套的迷你模型：代码预览+仪表板表+图表卡。### 输入框与表单
**`文本输入`** — 标准表单字段。
- 背景“{colors.canvas}”，文本“{colors.ink}”，类型“{typography.body-md}”，填充“{spacing.sm} {spacing.md}”（8px 12px），圆形“{rounded.sm}”6px，1px“{colors.hairline-input}”边框。
- 焦点状态“文本输入聚焦”：边框交换为“{colors.primary}”。### Navigation
**`nav-bar-on-mesh`** — 顶部导航栏漂浮在渐变英雄上方。
- 背景“{colors.canvas}”（或透明，具体取决于滚动），文本“{colors.ink}”，填充“{spacing.lg} {spacing.xl}”。左侧为徽标字标，主要导航中心，右侧为登录+填充的“按钮主药丸”。### Pills, Tags, and Chips
**`pill-tag-soft`** — 柔和的靛蓝标签。
- 背景“{colors.primary-bg-subdued-hover}”，文本“{colors.primary-deep}”，类型“{typography.micro-cap}”，填充“4px 8px”，圆形“{rounded.pill}”。### Signature Components
**渐变网格背景** — 柔和的奶油色 → 果子露橙 → 薰衣草色 → 靛蓝 → 红宝石粉色在页面上三分之一处水平模糊。以 SVG 或大背景图像的形式实现 — 不是平面 CSS 渐变（真正的网格具有有机斑点形状）。

**组合仪表板模型** — 多层人造产品 UI 组合：左侧的 IDE 面板、仪表板表格中心、右侧的图表卡，所有这些都在“{rounded.lg}”容器内以小比例渲染，并带有微妙的 2 级阴影。复合材料是该品牌出镜率最高的特征。

**表格数字货币类型** — 每个呈现货币、数量或交易价值的数字都使用 `font-feature-settings: "tnum"`。该品牌默默地发出信号，表明它是一个金融基础设施平台。

**`link-on-light`** — 光表面上的内联链接。
- 在“{typography.body-md}”中呈现的文本“{colors.primary}”，默认情况下没有下划线。

**`footer-light`** — 站点范围的页脚。
- 背景“{colors.canvas}”，文本“{colors.ink-mute}”，输入“{typography.caption}”，填充“{spacing.huge} {spacing.xl}”(64px 24px)。包含 4-6 列链接组、社交图标和一个小的法律行。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 为填充的 CTA 和内联链接强调保留“{colors.primary}”——它应该很少出现，每个区域一个填充按钮。
- 将渐变网格应用于每个营销英雄；裸露的画布英雄感觉不合时宜。
- 以权重 300 渲染显示层，字母间距为负 — 细跟踪是印刷签名。
- 在每个金钱/数字单元格上使用 `font-feature-settings: "tnum"`。
- 在 body 元素上全局应用 `font-feature-settings: "ss01"`。
- 将每个功能说明与合成产品 UI 模型配对；该品牌的论点是“看实际产品”。### 禁止事项
- 不要将展示重量提高到 300 以上——在 400 时，品牌的编辑空气就会崩溃。
- 不要在记录的渐变停止点之外添加新的强调色（奶油色/橙色/薰衣草色/靛蓝/红宝石色/洋红色）。
- 不要使用靛蓝“{colors.primary}”作为正文颜色 - 它是 CTA 和链接颜色，而不是正文尺寸的字体颜色。
- 不要将按钮内边距缩小到“8px 16px”以下——紧密的药丸是品牌交易感的一部分。
- 不要在没有“tnum”的情况下渲染货币单元格——它破坏了安静的财务数据签名。
- 不要用圆角矩形代替药丸形状的按钮。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|宽| ≥ 1440 像素 |边到边全渐变网格；全尺寸仪表板复合材料|
|桌面| 1024–1440 像素 |默认内容最大宽度；定价 4-up |
|平板电脑| 768–1023 像素 |定价 2-up；仪表板组合简化为 2 个面板 |
|手机 | < 768 像素 |定价 1-up；汉堡导航；显示下降 56 → 36px |### Touch Targets
- 通过填充缩放，药丸按钮在移动设备上达到 ≥ 40×40px。在较小的屏幕上，按钮尺寸最大为 44×44 像素，以保持 WCAG AAA。
- 表单字段的最小高度保持在 40 像素。### Collapsing Strategy
- 通过断点显示层阶梯 56 → 48 → 32 → 26 → 22px。
- 渐变网格在移动设备上重新平铺，以保留洗涤效果而不会消失。
- 仪表板组合简化为移动设备上的单面板模型；多层合成仅在桌面+上呈现。
- 定价阶梯为 4 级 → 2 级 → 1 级。### Image Behavior
产品 UI 复合材料在主要断点处使用“srcset”和艺术指导裁剪。移动作物集中于最具可操作性的内面板；桌面作物显示完整的多层构图。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。
2. 直接引用组件名称和标记（`{colors.primary}`、`{button-primary-pill}-pressed`、`{rounded.pill}`）。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”。
4. 添加新变体作为单独的条目。
5. 默认正文为 `{typography.body-md}` (15px)；对任何金钱/数字单元格使用“{typography.body-tabular}”。
6. 在身体上全局涂抹`ss01`；将“tnum”每个元素应用于数字内容。
7. 渐变网格对于营销英雄来说是不可协商的——裸露的画布英雄打破了品牌。
