---
version: alpha
name: Shopifi Inspired
description: An inspired interpretation of Shopifi's design language — a cinematic commerce platform that runs two parallel design tracks. The marketing-hero and product-narrative pages live on near-black canvases with full-bleed photography of merchants, giant Neue Haas Grotesk display type at thin weights, and a single black-pill CTA stroked in white. The transactional pages (pricing, signup, dashboards) flip to a cream-mint canvas with pastel aloe and pistachio greens, the same pill button vocabulary, and Inter for UI body. The two tracks share typographic DNA but diverge sharply in canvas polarity — and that choice is the brand.

colors:
  primary: "#000000"
  ink: "#000000"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  canvas-night: "#000000"
  canvas-night-elevated: "#0a0a0a"
  canvas-light: "#ffffff"
  canvas-cream: "#fbfbf5"
  surface-elevated-dark: "#1e2c31"
  shade-30: "#d4d4d8"
  shade-40: "#a1a1aa"
  shade-50: "#71717a"
  shade-60: "#52525b"
  shade-70: "#3f3f46"
  hairline-light: "#e4e4e7"
  hairline-dark: "#1e2c31"
  aloe-10: "#c1fbd4"
  pistachio-10: "#d4f9e0"
  link-cool-1: "#9dabad"
  link-cool-2: "#9797a2"
  link-cool-3: "#bdbdca"
  link-mint: "#99b3ad"

typography:
  display-xxl:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 96px
    fontWeight: 330
    lineHeight: 1.0
    letterSpacing: 2.4px
    fontFeature: ss03
  display-xl:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 70px
    fontWeight: 330
    lineHeight: 1.0
    letterSpacing: 0
    fontFeature: ss03
  display-lg:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 55px
    fontWeight: 330
    lineHeight: 1.16
    letterSpacing: 0
    fontFeature: ss03
  display-md:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 330
    lineHeight: 1.14
    letterSpacing: 0
    fontFeature: ss03
  heading-xl:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.28
    letterSpacing: 0.42px
    fontFeature: ss03
  heading-lg:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: 0.36px
    fontFeature: ss03
  heading-md:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.3px
    fontFeature: ss03
  heading-sm:
    fontFamily: "NeueHaasGrotesk Display, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0.72px
    fontFeature: ss03
  body-lg:
    fontFamily: "Inter Variable, Inter, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 550
    lineHeight: 1.56
    letterSpacing: 0
    fontFeature: ss03
  body-md:
    fontFamily: "Inter Variable, Inter, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 420
    lineHeight: 1.5
    letterSpacing: 0
    fontFeature: ss03
  body-strong:
    fontFamily: "Inter Variable, Inter, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 550
    lineHeight: 1.5
    letterSpacing: 0
    fontFeature: ss03
  caption:
    fontFamily: "Inter Variable, Inter, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.49
    letterSpacing: 0.28px
    fontFeature: ss03
  micro:
    fontFamily: "Inter Variable, Inter, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.13px
    fontFeature: ss03
  eyebrow-cap:
    fontFamily: "Inter Variable, Inter, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.72px
    fontFeature: ss03
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
    fontFeature: ss03

rounded:
  xs: 4px
  sm: 5px
  md: 8px
  lg: 12px
  xl: 20px
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
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-primary-pill-pressed:
    backgroundColor: "{colors.shade-70}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-outline-on-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 12px 26px
  button-outline-on-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-aloe-pill:
    backgroundColor: "{colors.aloe-10}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  text-input:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  card-pricing:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-pricing-featured:
    backgroundColor: "{colors.aloe-10}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-feature-cinematic:
    backgroundColor: "{colors.canvas-night-elevated}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-pistachio-band:
    backgroundColor: "{colors.pistachio-10}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-photo-frame:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 0px
  pill-tag-mint:
    backgroundColor: "{colors.aloe-10}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow-cap}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  pill-tag-shade:
    backgroundColor: "{colors.shade-30}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow-cap}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  nav-bar-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 16px 24px
  nav-bar-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 16px 24px
  link-on-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 0px
  footer-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 64px 24px
  footer-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
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
--dig-text: #000000;
--dig-text-muted: #000000;
--dig-text-soft: #000000;
--dig-accent: #000000;
--dig-accent-strong: #000000;
--dig-accent-2: #000000;
--dig-accent-2-strong: #000000;
--dig-border: rgba(0,0,0,0.1);
--dig-border-strong: rgba(0,0,0,0.1);
--dig-grid-line: rgba(0,0,0,0.1);
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #000000;

--dig-font-sans: NeueHaasGrotesk Display, Helvetica, Arial, sans-serif;
--dig-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 13px;
--dig-text-md: 14px;
--dig-text-lg: 16px;
--dig-text-xl: 18px;
--dig-text-2xl: 20px;
--dig-text-3xl: 24px;
--dig-text-4xl: 28px;
--dig-text-5xl: 48px;

--dig-radius-sm: 5px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 20px;
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

Shopifi 运行两个并行的设计轨道，它们共享印刷 DNA 和单个按钮词汇，但画布极性有所不同。营销轨迹基于“{colors.canvas-night}”（“#000000”）——商家的全出血电影摄影、Neue Haas Grotesk Display 中的巨型“{typography.display-xxl}”标题，重量为 330（薄薄的，几乎是社论剪辑），以及一个 CTA：白色描边的黑色药丸，其形式为“按钮轮廓在黑暗中”。这些页面读起来就像一本高端印刷杂志的跨页：大量的黑色、大量的负空间、不与文字竞争的摄影、每个乐队只有一个动作。

交易轨道翻转到“{colors.canvas-light}”和“{colors.canvas-cream}”（一种比纯白色稍暖的灰白色）。定价层、比较表和注册流程位于这块较浅的画布上，具有相同的药丸按钮系统，但极性相反（带有白色文本的实心黑色药丸，或用于特色/“开始免费试用”层的“{colors.aloe-10}”薄荷药丸）。重点色——“{colors.aloe-10}”薄荷色和“{colors.pistachio-10}”开心果色——仅出现在光轨上，而不会出现在电影黑暗英雄页面上。

版式分为三个系列。 **Neue Haas Grotesk Display** 的轻薄重量 (330–500) 可处理每一次展示、标题和编辑时刻 — 该品牌的标志就是轻薄的展示剪裁。权重为 420–550 的 **Inter Variable** 可以处理每个 UI 主体、按钮标签、标题和表单字段 - 不会影响显示的实用文本。 **ui-monospace** 仅出现在代码块和罕见的技术眉毛中。在所有三个系列中，OpenType“ss03”风格集均已启用 - 这是该品牌的字符级签名，普遍适用。

**主要特征：**
- 两个画布系统：“{colors.canvas-night}”用于电影营销，“{colors.canvas-light}”/“{colors.canvas-cream}”用于交易表面 - 从未混合。
- 药丸形状（`{rounded.pill}`）是两个轨道上唯一的按钮形状；按钮不存在圆角矩形。
- 轻薄 (330) 显示排版是标志； 96 像素/重量 330 的“{typography.display-xxl}”是该品牌最响亮的视觉效果。
- 芦荟和开心果绿（“{colors.aloe-10}”、“{colors.pistachio-10}”）是为轻轨保留的——它们标志着商业、增长、交易成功。
- 摄影是全出血、边到边的，绝不嵌入电影轨道上的卡片中；商家和店面图像可以像渐变和插图一样在其他地方起到很大的视觉提升作用。
- OpenType `ss03` 风格集在每个文本角色中启用 - 一个跨两个轨道进行跟踪的字符级统一器。
- 显示屏尺寸上的紧密字母间距（96 像素显示屏上的 2.4 像素正跟踪）为轻薄的重量提供了额外的光学空气。## 颜色系统 (Colors)

> **源页面：**主页 (`/`)、`/start`、`/website/builder`、`/pricing`。### 品牌与主色
- **芦荟** (`{colors.aloe-10}` — `#c1fbd4`)：特色层和“增长”口音。用作浅色表面上的药丸按钮背景，并用作定价比较范围中的功能卡填充。
- **开心果** (`{colors.pistachio-10}` — `#d4f9e0`)：比芦荟更柔软；用作光轨上的宽截面带填充，以在不离开绿色系列的情况下表示不同类别的特征。
- **酷链接色调**（`{colors.link-cool-1}` `#9dabad`、`{colors.link-cool-2}` `#9797a2`、`{colors.link-cool-3}` `#bdbdca`、`{colors.link-mint}` `#99b3ad`）：在深色表面上使用静音页脚/第三级链接颜色，以在主要白色类型下方创建安静的层次结构。### 表面与背景
- **Canvas Night** (`{colors.canvas-night}` — `#000000`)：纯黑色英雄、电影专题页面、页脚。
- **Canvas Night Elevated** (`{colors.canvas-night-elevated}` — `#0a0a0a`)：电影表面、视频帧上的卡片。
- **Surface Elevated Dark** (`{colors.surface-elevated-dark}` — `#1e2c31`)：在一小部分深色卡片上使用的深色青色偏移表面，可在不破坏黑色的情况下引入微妙的深度。
- **Canvas Light** (`{colors.canvas-light}` — `#ffffff`)：定价、注册、比较表。
- **Canvas Cream** (`{colors.canvas-cream}` — `#fbfbf5`)：定价页面背景画布上使用的略带暖色的灰白色 — 与 #ffffff` 无形不同，但增加了编辑的温暖感。
- **发丝光** (`{colors.hairline-light}` — `#e4e4e7`)：光卡、桌子分隔板上的 1 像素边框。
- **发际线深色** (`{colors.hairline-dark}` — `#1e2c31`)：具有可见镀铬的罕见深色卡片上有 1 像素边框。### Shade Ladder
- **Shade-30** (`{colors.shade-30}` — `#d4d4d8`)：标签/芯片背景为浅色，页脚细线为深色。
- **Shade-40** (`{colors.shade-40}` — `#a1a1aa`)：浅色上的第三文本，深色上的第二文本。
- **Shade-50** (`{colors.shade-50}` — `#71717a`)：灯光辅助文本。
- **Shade-60** (`{colors.shade-60}` — `#52525b`)：浅色为第三级文本，深色为深级文本。
- **Shade-70** (`{colors.shade-70}` — `#3f3f46`)：主药丸按钮的按下状态；深暗的表面口音。### 文本色
- **Ink** (`{colors.ink}` — `#000000`)：浅色画布上的所有文本。
- **On Primary** (`{colors.on-primary}` — `#ffffff`)：深色画布上的所有文本 + 填充药丸标签。## 排版与字体系统 (Typography)



### 字体家族
显示级别是 **Neue Haas Grotesk Display**，重量较轻 (330–500)。当不可用时，请回退到轻量级的 **Helvetica**，然后是 Arial。轻薄切割是品牌——没有替代品应该默认重量为 400+。

UI 层的 **Inter Variable** 为 420–550，这是一种具有次粗细精度的可变字体，可让系统跨越正文 (420)、粗体 (550) 和标题 (500)，而无需跳转到较重的层级。 Inter 通过 Google Fonts 开源。

代码层是 **ui-monospace**，系统单声道 — 优于网络字体单声道，以避免不必要的下载。

OpenType `ss03` 风格集在每个角色中都启用。它改变了特定的字形形式（小写“a”、“g”、单层数字）以获得稍微更几何的字符。通过 body 元素或根元素上的 `font-feature-settings: "ss03"` 应用。### 字体层级
|代币|尺寸|重量 |行高|字母间距|使用 |
|---|---|---|---|---|---|
| `{typography.display-xxl}` | 96 像素 | 330 | 330 1.0 | 2.4 像素 |电影英雄标题|
| `{typography.display-xl}` | 70 像素 | 330 | 330 1.0 | 0 |电影页面的开场白 |
| `{typography.display-lg}` | 55 像素 | 330 | 330 1.16 | 1.16 0 |定价页页面标题|
| `{typography.display-md}` | 48 像素 | 330 | 330 1.14 | 1.14 0 |轻轨上的小节标题|
| `{typography.heading-xl}` | 28 像素 | 500 | 500 1.28 | 1.28 0.42 像素 |卡标题/定价等级名称 |
| `{typography.heading-lg}` | 24 像素 | 400 | 1.14 | 1.14 0.36 像素 |紧凑的卡片标题 |
| `{typography.heading-md}` | 20 像素 | 500 | 500 1.4 | 1.4 0.3 像素 |部分小标题|
| `{typography.heading-sm}` | 18 像素 | 500 | 500 1.25 | 1.25 0.72 像素 |眉/小款标签|
| `{typography.body-lg}` | 18 像素 | 550 | 550 1.56 | 1.56 0 |营销体领先，体大|
| `{typography.body-md}` | 16 像素 | 420 | 420 1.5 | 1.5 0 |默认 UI 主体、药丸按钮标签 |
| `{typography.body-strong}` | 16 像素 | 550 | 550 1.5 | 1.5 0 |强调身体跑|
| `{typography.caption}` | 14 像素 | 500 | 500 1.49 | 1.49 0.28 像素 |辅助副本、脚注 |
| `{typography.micro}` | 13 像素 | 500 | 500 1.5 | 1.5 -0.13 像素 |定价细则 |
| `{typography.eyebrow-cap}` | 12 像素 | 400 | 1.2 | 1.2 0.72 像素 |大标题上方全大写眉毛|
| `{typography.code}` | 16 像素 | 400 | 1.5 | 1.5 0 |代码块|### 排版原则
- **显示屏薄度是品牌特色。** 始终以权重 330 渲染显示屏尺寸 — 切勿使用 400 以上的权重。纤薄是一种刻意的编辑选择，让巨大的尺寸显得安静。
- **在 NHGD 中展示，在 Inter 中展示身体。** 不要将身体角色推到 NHGD；不要把显示角色推给国际米兰。
- **显示跟踪提升。** 96px 英雄获得 +2.4px 正向跟踪 - 薄字形需要空气。在 70 像素及以下，跟踪返回到 0。### 字体备选说明
Neue Haas Grotesk Display 的开放替代品： **Helvetica Now Display**（专有）或 **Inter Display** 轻量级（开源）是最接近的匹配。避免使用默认重量的 Helvetica Neue——它对于该品牌的薄层来说太重了。 **Inter Variable** 是通过 Google Fonts 开源的，并且是规范的字体 - 无需替代。## 布局与间距 (Layout)



### 间距系统
- **基本单元**：8px（具有更密集的子单元 1、2、3、4，用于精细工作）。
- **令牌**： `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.huge}` 64 像素。
- **部分填充**：电影营销页面上的`{spacing.huge}` 64–128px（极端的负空间是重点）；在密度优先的事务页面上折叠至约 48 像素。
- **卡内部填充**：定价卡上的 `{spacing.xxl}` 32px；紧凑标记行上的“{spacing.xl}”为 24 像素。### 网格与容器
- 电影英雄页面使用宽的最大宽度容器（~1440–1600px），边缘出血摄影可以逃离容器。
- 定价根据视口通过 4-up → 2-up → 1-up 层级进行折叠。
- 正文内容集中在长页面上约 720–840 像素的阅读栏中。### 留白哲学
电影轨道将空白视为品牌最有价值的资产——内容块之间通常有 128-192 像素的垂直空间，其余部分由摄影填充。由于用户正在扫描、比较和采取行动，因此频段之间的交易轨道收紧至约 48-64 像素。两种空白哲学之间的对比是品牌声音的一部分。## 层级与深度 (Elevation & Depth)

|水平|治疗 |使用 |
|---|---|---|
| 0 |平坦、无阴影|默认表面 |
| 1 | `0 1px 2px rgba(255,255,255,0.05)，插入 0 1px 0 rgba(255,255,255,0.04)` |深色卡片上微妙的插图突出显示（顶部边缘光泽）|
| 2 | `0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.2)` |带有发际线+阴影堆栈的深色高架卡|
| 3 | `0 8px 8px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1)` |光表面上的堆叠阴影卡；分层的微小阴影产生柔和的光晕|
| 4 | `0 25px 50px -12px rgba(0,0,0,0.25)` |模态/浮动面板灯 |### 装饰性深度
在电影轨道上，深度来自摄影——卡片后面分层的全出血商人图像，微妙的嵌入顶部边缘高光创造了光线照射到玻璃表面的错觉。在光轨上，分层的微小阴影堆栈（第 3 级）在定价卡周围产生柔和的纸状光晕 - 深度而不刺耳。## 几何与形状 (Shapes)



### 圆角半径级配
|代币|价值|使用 |
|---|---|---|
| `{rounded.xs}` | 4 像素 |输入，细线标签 |
| `{rounded.sm}` | 5 像素 |图像容器（小）|
| `{rounded.md}` | 8 像素 |表单输入、视频帧、较小的卡片 |
| `{rounded.lg}` | 12 像素 |定价卡、功能卡 |
| `{rounded.xl}` | 20px（某些非对称卡上仅限顶部）|英雄相框，电影卡镀铬|
| `{rounded.pill}` | 9999 像素 |所有纽扣、药丸标签、薄荷片 |### Photography Geometry
摄影是全出血、无边框的。在电影页面上，它完全脱离了容器；在事务页面上，它位于“{rounded.lg}”容器内，没有阴影。客户徽标条中的头像处理是统一高度（~24-32px）的简单灰度文字标记，在单个水平条中对齐。## 核心组件 (Components)



### 按钮设计
**`button-primary-pill`** — 整个系统中占主导地位的 CTA。
- 背景“{colors.primary}”（黑色），文本“{colors.on-primary}”，类型“{typography.body-md}”，填充“{spacing.md} {spacing.xl}”（12px 24px），圆形“{rounded.pill}”9999px。
- 按下状态“button-primary-pill-pressed”：背景提升到“{colors.shade-70}”。

**`button-outline-on-dark`** — 电影英雄 CTA。
- 背景“{colors.canvas-night}”（在画布上透明），2px实心“{colors.on-primary}”边框，文本“{colors.on-primary}”，相同的药丸几何形状。

**`button-outline-on-light`** — 相当于光轨。
- 背景“{colors.canvas-light}”，1px实心“{colors.ink}”边框，文本“{colors.ink}”，相同的药丸几何形状。

**`button-aloe-pill`** — 定价页面上的特色 CTA。
- 背景“{colors.aloe-10}”，文本“{colors.ink}”，相同的药丸几何形状。用于“开始免费试用”层。### 卡片与容器
**`卡定价`** — 定价页面上的标准等级卡。
- 背景“{colors.canvas-light}”，填充“{spacing.xxl}”，圆形“{rounded.lg}”12px，1px“{colors.hairline-light}”边框。标题为“{typography.heading-xl}”，价格为“{typography.display-md}”，正文为“{typography.body-md}”，CTA 作为“button-primary-pill”固定在底部。

**`卡定价功能`** — 突出显示的定价等级。
- 背景“{colors.aloe-10}”，其他方面与“卡定价”相同。薄荷色填充（而不是品牌颜色边框）是该品牌独特的特色层选择。

**`card-feature-cinematic`** — 电影轨道上的功能卡。
- 背景“{colors.canvas-night-elevated}”、文本“{colors.on-primary}”、圆形“{rounded.lg}”，通常带有顶部边缘插入突出显示（1 级标高）。可容纳全出血照片或一份大型声明。

**`开心果带卡`** — 宽水平带卡，用于突出光轨上的一类功能。
- 背景“{colors.pistachio-10}”，文本“{colors.ink}”，圆角“{rounded.lg}”12px，填充“{spacing.xxl}”。

**`卡片相框`** — 电影页面上的全出血摄影容器。
- 背景 `{colors.canvas-night}`，内边距 0，圆角 `{rounded.xl}` 20px（通常仅在顶部）。照片就是内容；卡片内没有内部填充，没有覆盖文本。### 输入框与表单
**`文本输入`** — 光表面上的标准文本输入。
- 背景“{colors.canvas-light}”、文本“{colors.ink}”、类型“{typography.body-md}”、填充“{spacing.sm}+ {spacing.md}”(10px 12px)、圆形“{rounded.md}”8px、1px“{colors.hairline-light}”边框。### Navigation
**`nav-bar-light`** — 浅色页面上的顶部导航。
- 背景“{colors.canvas-light}”，文本“{colors.ink}”，填充“{spacing.lg} {spacing.xl}”。徽标文字标记位于左侧，导航项居中，右侧有两个药丸按钮（“button-outline-on-light”表示“登录”，“button-primary-pill”表示“开始免费试用”）。

**`nav-bar-dark`** — 电影页面上的顶部导航。
- 背景“{colors.canvas-night}”，文本“{colors.on-primary}”，其他结构相同。右侧有两个药丸按钮（两者均为“深色按钮轮廓”，最右边的按钮通过字体粗细更加突出）。### Pills, Tags, and Chips
**`pill-tag-mint`** — 浅色表面上的小标签，表示功能类别。
- 背景“{colors.aloe-10}”，文本“{colors.ink}”，类型“{typography.eyebrow-cap}”，填充“{spacing.xs} {spacing.md}”，圆形“{rounded.pill}”。

**`pill-tag-shade`** — 浅色表面上的中性标签。
- 背景“{colors.shade-30}”，文本“{colors.ink}”，其他形状与“pill-tag-mint”相同。### Signature Components
**电影摄影层** — 英雄的全出血商家照片。无覆盖稀松布，图像上无文字；相反，该类型位于照片上方或下方干净的负空间中。该品牌将摄影视为一种社论传播，而不是装饰。

**堆叠微小阴影（3 级高程）** — 光轨上的定价卡使用 4 个堆叠微小阴影（每个 1–8 像素 Y 偏移，10% 黑色）来产生柔和的分层纸光晕。这就是该品牌独特的光线深度。

**`link-on-dark`** — 电影页面上的内嵌链接。
- 颜色`{colors.on-primary}`，默认无下划线（链接依赖于上下文）；对于第三级页脚链接，颜色会转变为带有持久下划线的冷色调之一（“{colors.link-cool-1}”等）。

**`footer-dark`** — 电影轨道上的全页宽度页脚。
- 背景“{colors.canvas-night}”，文本“{colors.on-primary}”，输入“{typography.caption}”，填充“{spacing.huge} {spacing.xl}”。包含 4-5 列静音链接组、社交图标和一个小的法律行。

**`footer-light`** — 相当于交易轨道上的内容。
- 背景“{colors.canvas-light}”，文本“{colors.ink}”，其他结构相同。## 推荐与禁止事项 (Do's and Don'ts)



### 推荐事项
- 仅为光轨保留“{colors.aloe-10}”和“{colors.pistachio-10}”——它们不会出现在电影黑页上。
- 始终使用“{rounded.pill}”作为按钮；切勿使用“{rounded.md}”或“{rounded.lg}”。
- 渲染显示层权重为 330；升至 400 或 500 打破了该品牌的薄显示屏标志。
- 在电影页面上使用全出血摄影——让它脱离容器。
- 全局应用 `font-feature-settings: "ss03"`；风格集是该品牌的印刷标志。
- 将黑色画布与白色字体和白色描边轮廓药丸配对；将浅色画布与黑色字体和填充黑色药丸配对。### 禁止事项
- 不要引入第三种画布颜色 - 坚持使用黑色或浅色/奶油色。灰色、米色和蓝色不在系统中。
- 除了微妙的嵌入顶部高光之外，请勿在电影暗卡上添加阴影；电影轨道需要平坦的黑色。
- 不要将英雄表面上的显示层缩小到“{typography.display-md}”（48px）以下；下面它们读作章节标题，而不是显示。
- 不要将芦荟/开心果绿放在文字后面 - 它们是表面填充，而不是文本颜色。
- 不要在任何地方用圆角矩形按钮代替药丸形状。## 响应式行为策略 (Responsive Behavior)



### 屏幕断点
|名称 |宽度|关键变化|
|---|---|---|
|宽| ≥ 1440 像素 |完整的电影英雄与边缘出血摄影；定价 4-up |
|桌面| 1024–1440 像素 |默认内容最大宽度；价格四涨收紧|
|平板电脑| 768–1023 像素 |定价 2-up；电影英雄摄影作物|
|手机 | < 768 像素 |定价 1-up；汉堡导航； display-xxl 下降至 ~56–64px |### Touch Targets
- 药丸按钮在移动设备上通过 12 像素垂直内边距 × 16 像素行高达到 ≥ 44 × 44 像素。符合 WCAG AAA 标准。
- 表单字段在所有断点处的最小高度保持在 44 像素。### Collapsing Strategy
- 显示尺寸通过断点阶梯缩小：移动设备上为 96 → 70 → 55 → 48 → 36px。
- 电影摄影以较小的宽度进行积极裁剪，优先考虑焦点主体而不是边缘出血。
- 定价阶梯 4-up → 2-up → 1-up；特色芦荟层在每一步都保持视觉上的区别。
- 顶部导航在 768 像素以下折叠成汉堡包；菜单继承画布极性。### Image Behavior
摄影在主要断点处使用响应式“srcset”和艺术指导裁剪。移动作物有利于近距离拍摄对象；广泛的作物有利于环境/店面环境。## 迭代微调指南 (Iteration Guide)

1. 一次专注于一个组件。
2. 直接引用组件名称和标记（“{colors.aloe-10}”、“{button-primary-pill}-pressed”、“{rounded.pill}”）。
3. 编辑后运行“npx @google/design.md lint DESIGN.md”。
4. 添加新变体作为单独的条目。
5.默认正文为`{typography.body-md}`；为营销线索保留“{typography.body-lg}”。
6. 保持两个画布轨道分开——设计新页面时，选择电影或事务性，而不是两者都选择。
7、丸剂形状不容协商；新的按钮变体在填充/边框/画布上有所不同，但在形状上却没有变化。
