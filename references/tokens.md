# Dig UI Token 规范

## Token 命名

所有公开设计 token 统一使用 `--dig-*` 前缀。

建议按以下分组组织：

- color
- typography
- spacing
- radius
- shadow
- motion

## 核心 Token 结构

### 颜色

```css
--dig-bg
--dig-bg-soft
--dig-surface
--dig-surface-strong
--dig-text
--dig-text-muted
--dig-accent
--dig-accent-2
--dig-border
--dig-grid-line
--dig-success
--dig-warning
--dig-danger
```

### 字体与字号

```css
--dig-font-sans
--dig-font-serif
--dig-font-mono
--dig-text-xs
--dig-text-sm
--dig-text-md
--dig-text-lg
--dig-text-xl
--dig-text-2xl
--dig-text-3xl
--dig-text-4xl
--dig-text-5xl
--dig-leading-tight
--dig-leading-normal
--dig-leading-relaxed
--dig-tracking-tight
--dig-tracking-normal
--dig-tracking-wide
```

### 间距 / 圆角 / 阴影

```css
--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 32px;
--dig-space-7: 48px;
--dig-space-8: 64px;

--dig-radius-sm: 10px;
--dig-radius-md: 16px;
--dig-radius-lg: 24px;
--dig-radius-pill: 999px;

--dig-shadow-soft
--dig-shadow-panel
--dig-glow-accent
--dig-glow-secondary
```

## Catalog 来源

具体 catalog 的硬编码样式定义拆分在：

- [catalogs/other/dig.md](catalogs/other/dig.md)
- [catalogs/other/mono.md](catalogs/other/mono.md)
- [catalogs/other/editorial.md](catalogs/other/editorial.md)
- [catalogs/fintech/wise.md](catalogs/fintech/wise.md)
- [catalogs/media-consumer/apple.md](catalogs/media-consumer/apple.md)

这里保留统一 token 结构，不重复完整 catalog 细节。

## Catalog 快速参考

### `dig`

```css
--dig-bg: #06121a;
--dig-bg-soft: #0b1b26;
--dig-surface: rgba(11, 27, 38, 0.78);
--dig-surface-strong: rgba(16, 32, 44, 0.92);
--dig-text: #ecf3f8;
--dig-text-muted: #8aa0b2;
--dig-accent: #37d67a;
--dig-accent-2: #4fb3ff;
--dig-border: rgba(138, 160, 178, 0.16);
--dig-grid-line: rgba(138, 160, 178, 0.08);
```

字体建议：

- sans：`Plus Jakarta Sans`, `Noto Sans SC`, sans-serif
- mono：`IBM Plex Mono`, monospace

### `mono`

```css
--dig-bg: #050505;
--dig-bg-soft: #101010;
--dig-surface: rgba(16, 16, 16, 0.76);
--dig-surface-strong: rgba(10, 10, 10, 0.92);
--dig-text: #f2f2f2;
--dig-text-muted: #9a9a9a;
--dig-accent: #f2f2f2;
--dig-accent-2: #6f6f6f;
--dig-border: rgba(255, 255, 255, 0.14);
--dig-grid-line: rgba(255, 255, 255, 0.07);
```

字体建议：

- 沿用 `dig` 的字体栈
- 字重对比更克制

### `editorial`

```css
--dig-bg: #f4efe6;
--dig-bg-soft: #ebe3d6;
--dig-surface: rgba(255, 255, 255, 0.72);
--dig-surface-strong: rgba(255, 255, 255, 0.88);
--dig-text: #161514;
--dig-text-muted: #6a655d;
--dig-accent: #1f4e46;
--dig-accent-2: #9c6b3a;
--dig-border: rgba(22, 21, 20, 0.12);
--dig-grid-line: rgba(22, 21, 20, 0.06);
```

字体建议：

- heading serif：`Playfair Display`
- 中文 serif 强调：`Noto Serif SC`
- body / UI sans：`Plus Jakarta Sans`, `Noto Sans SC`
- mono：`IBM Plex Mono`

### `wise`

```css
--dig-bg: #fbfcf5;
--dig-bg-soft: #eef4e7;
--dig-surface: rgba(255, 255, 255, 0.86);
--dig-surface-strong: rgba(247, 249, 242, 0.96);
--dig-text: #07110a;
--dig-text-muted: #526052;
--dig-accent: #9fe870;
--dig-accent-strong: #78d94a;
--dig-accent-2: #163300;
--dig-border: rgba(7, 17, 10, 0.12);
--dig-grid-line: rgba(22, 51, 0, 0.06);
```

字体建议：

- display：`Archivo Black`, `Noto Sans SC`, sans-serif
- sans：`Archivo`, `Noto Sans SC`, sans-serif
- mono：`IBM Plex Mono`

### `apple`

```css
--dig-bg: #f5f5f7;
--dig-bg-soft: #ffffff;
--dig-surface: rgba(255, 255, 255, 0.72);
--dig-surface-strong: rgba(255, 255, 255, 0.9);
--dig-text: #1d1d1f;
--dig-text-muted: #6e6e73;
--dig-accent: #0071e3;
--dig-accent-strong: #005bbf;
--dig-accent-2: #7d7aff;
--dig-border: rgba(29, 29, 31, 0.12);
--dig-grid-line: rgba(29, 29, 31, 0.045);
```

字体建议：

- display / sans：system font stack，优先 `-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`, `PingFang SC`
- mono：`SFMono-Regular`, `SF Mono`, `ui-monospace`

## 默认字号层级

除非页面有明确理由偏离，否则默认使用这套 scale：

- `xs`: 12px
- `sm`: 14px
- `md`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 32px
- `4xl`: 40px
- `5xl`: 56px

使用建议：

- hero / 主标题：`4xl` 到 `5xl`
- section title：`2xl` 到 `3xl`
- panel title：`lg` 到 `xl`
- body：`md`
- meta / tag / kicker：`xs` 到 `sm`
- 数字强调：`3xl` 到 `4xl`
