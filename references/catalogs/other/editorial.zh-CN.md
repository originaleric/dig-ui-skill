# Editorial Catalog

## 适用场景

- 发布页
- 品牌叙事页
- 概念展示页
- 需要更强“作者风格”的 Dig 页面

## 风格关键词

- authored
- refined
- editorial
- serif-accented
- paper-like
- narrative

## 颜色 Token

```css
--dig-bg: #f4efe6;
--dig-bg-soft: #ebe3d6;
--dig-surface: rgba(255, 255, 255, 0.72);
--dig-surface-strong: rgba(255, 255, 255, 0.88);
--dig-surface-elevated: rgba(255, 255, 255, 0.94);
--dig-text: #161514;
--dig-text-muted: #6a655d;
--dig-text-soft: #8c857b;
--dig-accent: #1f4e46;
--dig-accent-strong: #163b35;
--dig-accent-2: #9c6b3a;
--dig-accent-2-strong: #7f5328;
--dig-border: rgba(22, 21, 20, 0.12);
--dig-border-strong: rgba(22, 21, 20, 0.2);
--dig-grid-line: rgba(22, 21, 20, 0.06);
--dig-success: #356b58;
--dig-warning: #a87740;
--dig-danger: #a35f52;
--dig-info: #5e7d96;
```

## 字体系统

```css
--dig-font-sans: "Plus Jakarta Sans", "Noto Sans SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "Playfair Display", "Noto Serif SC", serif;
```

使用规则：

- serif 只用于 headline、pull quote、重点数字
- 正文、按钮、导航、说明文案仍然使用 sans
- meta、序号、注释使用 mono

## 字号与行高

```css
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 22px;
--dig-text-2xl: 28px;
--dig-text-3xl: 36px;
--dig-text-4xl: 48px;
--dig-text-5xl: 64px;

--dig-leading-tight: 1.08;
--dig-leading-snug: 1.24;
--dig-leading-normal: 1.62;
--dig-leading-relaxed: 1.8;

--dig-tracking-tight: -0.035em;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.12em;
```

推荐绑定 (Typography Tokens)：

```yaml
typography:
  hero-serif-title:
    fontFamily: "var(--dig-font-serif)"
    fontSize: "var(--dig-text-5xl)"
    lineHeight: "1.02"
    letterSpacing: "-0.04em"
    fontWeight: "700"
  section-serif-title:
    fontFamily: "var(--dig-font-serif)"
    fontSize: "var(--dig-text-3xl)"
    lineHeight: "1.08"
    letterSpacing: "-0.03em"
    fontWeight: "700"
  panel-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-xl)"
    lineHeight: "1.24"
    letterSpacing: "-0.01em"
    fontWeight: "650"
  body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-md)"
    lineHeight: "1.62"
    letterSpacing: "0"
    fontWeight: "450"
  lead-body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-lg)"
    lineHeight: "1.7"
    letterSpacing: "0"
    fontWeight: "450"
  meta-kicker:
    fontFamily: "var(--dig-font-mono)"
    fontSize: "var(--dig-text-xs)"
    lineHeight: "1.45"
    letterSpacing: "0.12em"
    fontWeight: "600"
  quote-numeric:
    fontFamily: "var(--dig-font-serif)"
    fontSize: "var(--dig-text-4xl)"
    lineHeight: "1.05"
    letterSpacing: "-0.04em"
    fontWeight: "700"
```

## 间距与圆角

```css
--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 32px;
--dig-space-7: 52px;
--dig-space-8: 72px;

--dig-radius-sm: 8px;
--dig-radius-md: 14px;
--dig-radius-lg: 22px;
--dig-radius-xl: 30px;
--dig-radius-pill: 999px;
```

使用建议：

- section padding：`40px` 到 `56px`
- panel padding：`24px`
- hero 区块留白明显大于 runtime
- 面板圆角：`14px`
- 大容器圆角：`22px`

## Border / Shadow / Glow

```css
--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 12px 34px rgba(44, 32, 18, 0.08);
--dig-shadow-panel: 0 22px 56px rgba(44, 32, 18, 0.12);
--dig-glow-accent: 0 0 0 1px rgba(31, 78, 70, 0.14), 0 0 24px rgba(31, 78, 70, 0.04);
--dig-glow-secondary: 0 0 0 1px rgba(156, 107, 58, 0.14), 0 0 20px rgba(156, 107, 58, 0.04);
```

规则：

- 阴影要像纸面悬浮，而不是 UI 发光
- glow 只是轻度呼吸感，不是视觉主角
- border 比 glow 更重要

## Grid 与背景

```css
--dig-shell-max: 1360px;
--dig-grid-columns: 12;
--dig-grid-gutter: 28px;
--dig-grid-gutter-mobile: 16px;
--dig-grid-cell-min: 72px;
```

背景规则：

- 可以用纸感暖底色
- grid 很淡，仅作秩序提示
- 允许轻微分层和留白节奏
- 不做技术霓虹和强 dashboard 感背景

## 组件级样式语言 (Components Strict Mapping)

```yaml
components:
  button-primary:
    backgroundColor: "var(--dig-accent-strong)"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-sm)"
    padding: "12px 24px"
    border: "none"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "var(--dig-text)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-sm)"
    padding: "12px 24px"
    border: "var(--dig-stroke-thin) solid var(--dig-border-strong)"
  tag-chip:
    backgroundColor: "var(--dig-bg-soft)"
    textColor: "var(--dig-text-muted)"
    typography: "{typography.meta-kicker}"
    rounded: "var(--dig-radius-sm)"
    padding: "4px 10px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  panel:
    backgroundColor: "var(--dig-surface-elevated)"
    textColor: "var(--dig-text)"
    rounded: "var(--dig-radius-md)"
    padding: "var(--dig-space-5)"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
    boxShadow: "var(--dig-shadow-soft)"
```

## 响应式行为策略 (Responsive Behavior)

- **断点规则**：
  - Desktop (`>= 1024px`)：留白节奏大，居中呈现，hero title 保持 `64px`。
  - Tablet (`768px - 1023px`)：边距调整为 `40px`，hero title `48px`。
  - Mobile (`< 768px`)：外边距缩减至 `20px`，serif title 控制在 `36px`，保持阅读器般的清晰度。
- **触控与缩放**：
  - 移动端下可交互控件不低于 `44px`。
  - 移动端文本绝对不能小于 `16px` 以保证良好的阅读体验。

## 交互规则

- hover 以色彩加深、下划线、边框强化为主
- transition：`160ms` 到 `220ms`
- focus-visible 明确，但不做强科技 glow
- 动态要服务叙事，不制造 UI 噪声

## 禁止事项

- 不要把正文大面积改成 serif
- 不要把 editorial 做成纯杂志封面，失去产品可用性
- 不要混入 runtime 的重 glow 和高技术背景
