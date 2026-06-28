# Mono Catalog

## 适用场景

- Dig 文档页
- changelog / placeholder / index 页
- 需要中性基线的实验页
- 需要更强终端感和灰度节制的界面

## 风格关键词

- grayscale
- restrained
- terminal-like
- blueprint
- reduced
- controlled

## 颜色 Token

```css
--dig-bg: #050505;
--dig-bg-soft: #101010;
--dig-surface: rgba(16, 16, 16, 0.76);
--dig-surface-strong: rgba(10, 10, 10, 0.92);
--dig-surface-elevated: rgba(22, 22, 22, 0.96);
--dig-text: #f2f2f2;
--dig-text-muted: #9a9a9a;
--dig-text-soft: #6f6f6f;
--dig-accent: #f2f2f2;
--dig-accent-strong: #ffffff;
--dig-accent-2: #6f6f6f;
--dig-accent-2-strong: #949494;
--dig-border: rgba(255, 255, 255, 0.14);
--dig-border-strong: rgba(255, 255, 255, 0.22);
--dig-grid-line: rgba(255, 255, 255, 0.07);
--dig-success: #d8d8d8;
--dig-warning: #b5b5b5;
--dig-danger: #8a8a8a;
--dig-info: #cfcfcf;
```

## 字体系统

```css
--dig-font-sans: "Plus Jakarta Sans", "Noto Sans SC", sans-serif;
--dig-font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
--dig-font-serif: "Noto Serif SC", serif;
```

使用规则：

- sans 仍是正文默认字体
- mono 的出现频率可以比 runtime 稍高
- serif 默认不用

## 字号与行高

```css
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 20px;
--dig-text-2xl: 24px;
--dig-text-3xl: 30px;
--dig-text-4xl: 38px;
--dig-text-5xl: 52px;

--dig-leading-tight: 1.15;
--dig-leading-snug: 1.3;
--dig-leading-normal: 1.58;
--dig-leading-relaxed: 1.76;

--dig-tracking-tight: -0.025em;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.1em;
```

推荐绑定 (Typography Tokens)：

```yaml
typography:
  hero-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-5xl)"
    lineHeight: "1.05"
    letterSpacing: "-0.03em"
    fontWeight: "700"
  section-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-3xl)"
    lineHeight: "1.15"
    letterSpacing: "-0.02em"
    fontWeight: "700"
  panel-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-lg)"
    lineHeight: "1.3"
    letterSpacing: "-0.01em"
    fontWeight: "600"
  body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-md)"
    lineHeight: "1.58"
    letterSpacing: "0"
    fontWeight: "450"
  small-body:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-sm)"
    lineHeight: "1.58"
    letterSpacing: "0"
    fontWeight: "450"
  meta-kicker:
    fontFamily: "var(--dig-font-mono)"
    fontSize: "var(--dig-text-xs)"
    lineHeight: "1.4"
    letterSpacing: "0.1em"
    fontWeight: "600"
  numeric-emphasis:
    fontFamily: "var(--dig-font-mono)"
    fontSize: "var(--dig-text-4xl)"
    lineHeight: "1.05"
    letterSpacing: "-0.03em"
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
--dig-space-7: 48px;
--dig-space-8: 64px;

--dig-radius-sm: 8px;
--dig-radius-md: 14px;
--dig-radius-lg: 20px;
--dig-radius-xl: 28px;
--dig-radius-pill: 999px;
```

使用建议：

- section padding：`32px` 到 `40px`
- panel padding：`20px`
- 按钮高度：`40px` 到 `44px`
- 面板圆角：`14px`
- 大容器圆角：`20px`

## Border / Shadow / Glow

```css
--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 12px 32px rgba(0, 0, 0, 0.18);
--dig-shadow-panel: 0 18px 54px rgba(0, 0, 0, 0.24);
--dig-glow-accent: 0 0 0 1px rgba(255, 255, 255, 0.16), 0 0 24px rgba(255, 255, 255, 0.06);
--dig-glow-secondary: 0 0 0 1px rgba(148, 148, 148, 0.14), 0 0 18px rgba(148, 148, 148, 0.05);
```

规则：

- 阴影更浅，边界更重要
- glow 不是主要视觉特征
- 面板更像“精密黑板”而不是“发光控制台”

## Grid 与背景

```css
--dig-shell-max: 1360px;
--dig-grid-columns: 12;
--dig-grid-gutter: 24px;
--dig-grid-gutter-mobile: 16px;
--dig-grid-cell-min: 68px;
```

背景规则：

- 允许 very subtle grid
- 可以有轻微 scanline 或 blueprint 感
- 大面积渐变要非常克制
- 背景不应喧宾夺主

## 组件级样式语言 (Components Strict Mapping)

```yaml
components:
  button-primary:
    backgroundColor: "var(--dig-accent-strong)"
    textColor: "var(--dig-bg)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-sm)"
    padding: "10px 20px"
    border: "var(--dig-stroke-strong) solid var(--dig-border-strong)"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "var(--dig-text)"
    typography: "{typography.body}"
    rounded: "var(--dig-radius-sm)"
    padding: "10px 20px"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  tag-chip:
    backgroundColor: "var(--dig-surface-elevated)"
    textColor: "var(--dig-text-muted)"
    typography: "{typography.meta-kicker}"
    rounded: "var(--dig-radius-sm)"
    padding: "4px 8px"
    textTransform: "uppercase"
    border: "var(--dig-stroke-thin) solid var(--dig-border)"
  panel:
    backgroundColor: "var(--dig-surface)"
    textColor: "var(--dig-text)"
    rounded: "var(--dig-radius-md)"
    padding: "var(--dig-space-5)"
    border: "var(--dig-stroke-strong) solid var(--dig-border-strong)"
```

## 响应式行为策略 (Responsive Behavior)

- **断点规则**：
  - Desktop (`>= 1024px`)：最高宽度 `1360px`，大面积留白与精确的网格对齐。
  - Tablet (`768px - 1023px`)：边距减小到 `32px`，hero title 减小至 `40px`。
  - Mobile (`< 768px`)：单列布局，边距 `16px`，面板边距 `16px`。
- **触控与缩放**：
  - 按钮区域移动端最小高度保证 `44px`。
- **组件折叠**：
  - 侧栏菜单可折叠，长列表数据改为紧凑垂直卡片。

## 交互规则

- hover 变化比 runtime 更轻
- transition：`140ms` 到 `200ms`
- focus 反馈必须清楚，但不要发光过强
- 不做彩色状态跳变

## 禁止事项

- 不要突然插入绿色、蓝色等品牌高彩度色
- 不要为了“高级”把可读性压太低
- 不要把 mono 做成廉价 wireframe
