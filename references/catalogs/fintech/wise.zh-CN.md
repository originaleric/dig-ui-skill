# Wise-Inspired Catalog

render:
  archetype: finance-mobile-app
  page_type: fintech
  density: comfortable
  canvas: mobile-first

## 适用场景

- 移动端优先的 Dig 产品页
- 面向普通用户的 fintech / wallet / payment / sharing 体验
- 需要更强品牌记忆点、圆润操作感和消费级信任感的界面
- referral、invite、account、transfer、card、profile 这类强动作页面

## 风格关键词

- borderless-money
- acid-green
- soft-fintech
- mobile-first
- rounded-system
- bold-human
- transparent-pricing

## 参考来源

- 用户提供的 Wise App 截图：绿色胶囊按钮、深苔绿宣传卡、大号压缩标题、白底大圆角 mobile surface。
- Wise 官网公开页：强调快速跨境转账、透明价格、安全、全球覆盖和 app download 场景。
- Wise 官方 rebrand 说明：新视觉包含 fresh green palette、bold font，并从全球货币、语言和地点获得灵感。

## 颜色 Token

```css
--dig-bg: #fbfcf5;
--dig-bg-soft: #eef4e7;
--dig-surface: rgba(255, 255, 255, 0.86);
--dig-surface-strong: rgba(247, 249, 242, 0.96);
--dig-surface-elevated: rgba(255, 255, 255, 0.98);
--dig-text: #07110a;
--dig-text-muted: #526052;
--dig-text-soft: #8b9488;
--dig-accent: #9fe870;
--dig-accent-strong: #78d94a;
--dig-accent-2: #163300;
--dig-accent-2-strong: #0d2400;
--dig-border: rgba(7, 17, 10, 0.12);
--dig-border-strong: rgba(7, 17, 10, 0.22);
--dig-grid-line: rgba(22, 51, 0, 0.06);
--dig-success: #2f7d32;
--dig-warning: #a66b00;
--dig-danger: #c43d3d;
--dig-info: #2f6f7e;
```

使用规则：

- `--dig-accent` 只用于主 CTA、active chip、badge、小型通知点和重要收益数字。
- `--dig-accent-2` 用于大面积品牌 hero、invite/referral 卡、底部浮动导航或强调 banner。
- 背景保持接近白，但不要纯白到医疗软件感；需要一点暖绿底色。
- 功能卡使用浅灰绿，不使用冷蓝灰 SaaS surface。

## 字体系统

```css
--dig-font-sans: "Archivo", "Noto Sans SC", sans-serif;
--dig-font-display: "Archivo Black", "Noto Sans SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "Noto Serif SC", serif;
```

使用规则：

- display 只用于 hero、promo、profile name、referral headline 这类强品牌标题。
- UI、正文、按钮、表单使用 sans，保持高可读和高亲和。
- mono 只用于金额 ID、汇率、状态、交易编号，不要把 Wise-inspired 做成终端风。
- 中文大标题可用 `Noto Sans SC` 的 800/900 字重承接 display 气质。

## 字号与行高

```css
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 22px;
--dig-text-2xl: 28px;
--dig-text-3xl: 38px;
--dig-text-4xl: 52px;
--dig-text-5xl: 72px;

--dig-leading-tight: 0.98;
--dig-leading-snug: 1.12;
--dig-leading-normal: 1.52;
--dig-leading-relaxed: 1.72;

--dig-tracking-tight: -0.055em;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.08em;
```

推荐绑定 (Typography Tokens)：

```yaml
typography:
  hero-display:
    fontFamily: "var(--dig-font-display)"
    fontSize: "var(--dig-text-5xl)"
    lineHeight: "0.98"
    letterSpacing: "-0.06em"
    fontWeight: "900"
  referral-card-headline:
    fontFamily: "var(--dig-font-display)"
    fontSize: "var(--dig-text-4xl)"
    lineHeight: "1.02"
    letterSpacing: "-0.055em"
    fontWeight: "900"
  section-title:
    fontFamily: "var(--dig-font-display)"
    fontSize: "var(--dig-text-3xl)"
    lineHeight: "1.08"
    letterSpacing: "-0.04em"
    fontWeight: "850"
  panel-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-xl)"
    lineHeight: "1.18"
    letterSpacing: "-0.02em"
    fontWeight: "800"
  body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-md)"
    lineHeight: "1.52"
    letterSpacing: "0"
    fontWeight: "520"
  small-body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-sm)"
    lineHeight: "1.5"
    letterSpacing: "0"
    fontWeight: "520"
  chip-meta:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-sm)"
    lineHeight: "1.2"
    letterSpacing: "0"
    fontWeight: "750"
  money-emphasis:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "44px"
    lineHeight: "1"
    letterSpacing: "-0.045em"
    fontWeight: "850"
```

## 间距与圆角

```css
--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 34px;
--dig-space-7: 56px;
--dig-space-8: 80px;

--dig-radius-sm: 12px;
--dig-radius-md: 20px;
--dig-radius-lg: 30px;
--dig-radius-xl: 42px;
--dig-radius-pill: 999px;
```

使用建议：

- 移动端 screen padding：`20px` 到 `28px`
- 桌面 section padding：`40px` 到 `64px`
- account / wallet card padding：`24px` 到 `32px`
- promo card padding：`36px` 到 `48px`
- 按钮高度：`52px` 到 `60px`
- chip 高度：`44px` 到 `52px`
- 面板圆角：`24px` 到 `30px`
- 大 promo / app mockup 圆角：`36px` 到 `44px`

## Border / Shadow / Glow

```css
--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 16px 40px rgba(22, 51, 0, 0.08);
--dig-shadow-panel: 0 28px 72px rgba(22, 51, 0, 0.12);
--dig-shadow-float: 0 18px 44px rgba(7, 17, 10, 0.16);
--dig-glow-accent: 0 0 0 1px rgba(159, 232, 112, 0.42), 0 18px 42px rgba(159, 232, 112, 0.22);
--dig-glow-secondary: 0 0 0 1px rgba(22, 51, 0, 0.18), 0 18px 44px rgba(22, 51, 0, 0.14);
```

规则：

- 阴影要柔软，像 App 卡片从白底上浮起，不要做重拟物。
- 深绿卡片可以没有明显阴影，靠颜色块和大圆角建立层级。
- glow 只用于绿色主 CTA 的轻微可点击感，不铺满背景。

## Grid 与背景

```css
--dig-shell-max: 1280px;
--dig-grid-columns: 12;
--dig-grid-gutter: 28px;
--dig-grid-gutter-mobile: 18px;
--dig-grid-cell-min: 76px;
```

背景规则：

- 以白到浅绿的底为主，不做暗色 dashboard。
- 可以加入极淡的圆形 currency / orbit pattern，但透明度要低。
- 移动端布局优先大卡片纵向滚动，桌面端可以用 app mockup + conversion panel 双栏。
- 允许局部深苔绿大块面，作为品牌记忆点和 CTA 区。

## 组件级样式语言 (Components Strict Mapping)

```yaml
components:
  button-primary:
    backgroundColor: "var(--dig-accent-strong)"
    textColor: "var(--dig-text)"
    typography: "{typography.chip-meta}"
    rounded: "var(--dig-radius-pill)"
    padding: "16px 32px"
    border: "none"
  button-secondary:
    backgroundColor: "var(--dig-surface-elevated)"
    textColor: "var(--dig-text)"
    typography: "{typography.chip-meta}"
    rounded: "var(--dig-radius-pill)"
    padding: "16px 32px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
    boxShadow: "var(--dig-shadow-soft)"
  chip:
    backgroundColor: "var(--dig-bg-soft)"
    textColor: "var(--dig-text-muted)"
    typography: "{typography.chip-meta}"
    rounded: "var(--dig-radius-pill)"
    padding: "12px 24px"
    border: "none"
  account-card:
    backgroundColor: "var(--dig-bg-soft)"
    rounded: "var(--dig-radius-md)"
    padding: "var(--dig-space-5)"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  promo-card:
    backgroundColor: "var(--dig-accent-2-strong)"
    textColor: "var(--dig-accent)"
    rounded: "var(--dig-radius-lg)"
    padding: "var(--dig-space-6)"
```

## 响应式行为策略 (Responsive Behavior)

- **断点规则**：
  - Desktop (`>= 1024px`)：双栏布局为主（App Mockup + 内容面板），卡片内边距充裕 (`32px` - `48px`)。
  - Tablet (`768px - 1023px`)：单栏垂直堆叠，内边距 `32px`。
  - Mobile (`< 768px`)：优先全屏大卡片，边距 `20px` - `24px`，圆角缩至 `24px`。
- **触控与缩放**：
  - 移动端必须保证极其优秀的触控体验，所有按钮、输入框、chip 高度 `52px` 左右，极易点击。
- **组件折叠**：
  - 桌面端平铺导航在移动端变更为 Bottom Nav 或全屏抽屉式菜单。

## 交互规则

- hover：主按钮加深到 `--dig-accent-strong`，并轻微增加 shadow。
- active：按钮背景略暗，scale 最多 `0.98`，不要大幅位移。
- focus-visible：酸绿色外环 + 深绿内边框，必须足够明显。
- transition：`140ms` 到 `220ms`。
- 移动端 swipe card / carousel 可以有分页点，但分页点只用深绿和淡灰绿。
- 动效要像“钱快速到账”的轻快，不要像游戏 UI 弹跳。

## 内容与语气规则

- 文案要短、直接、可信：金额、速度、费用、安全是第一层信息。
- 适合使用“秒级”“透明”“无隐藏费用”“全球”“到账”等语义锚点。
- 可以用真实人物/头像增强人味，但不要把金融安全感牺牲成社交娱乐感。
- 中文界面标题可以更大胆，但正文必须清楚解释动作后果。

## 禁止事项

- 不要照搬 Wise logo、品牌资产或专有图形。
- 不要把主色改成通用 SaaS 紫色或蓝色。
- 不要用过多渐变破坏 Wise-like 的平面强色块。
- 不要把卡片做得太薄、太小、太企业后台。
- 不要用 emoji 做金融图标；使用线性图标、旗帜圆标或抽象 currency mark。
