# Dig UI Primitive 约定

## 布局与 Grid

在做具体页面编排前，先建立可复用的结构基线。

默认建议：

- 页面最大宽度：`1280px` 或 `1440px`
- grid：12 columns
- 桌面 gutter：`24px`
- 移动端 gutter：`16px`
- section padding：`32px` 到 `48px`
- panel 内部 spacing：`20px` 到 `24px`

推荐的 primitive 命名：

```css
.dig-shell
.dig-section
.dig-surface
.dig-surface-strong
.dig-grid-overlay
.dig-divider
.dig-tag
.dig-kicker
.dig-meta
.dig-stat
.dig-button-primary
.dig-button-secondary
```

## 背景语言

### `dig`

- 允许轻微技术感 grid
- 允许径向 accent glow
- 允许柔和氛围渐变
- 背景应表达“活跃系统”，而不是游戏 UI

### `mono`

- grid 要更浅、更弱
- glow 应极少或没有
- 纹理可以轻微借鉴终端或蓝图感

### `editorial`

- 减少 glow
- 降低 grid 可见度
- 更强调纸感、墨感和留白，而不是系统炫技

### `wise`

- 以白到浅绿的底为主，避免暗色控制台感
- 允许深苔绿大色块承载 hero、referral、CTA 或 app mockup
- 大圆角、大胶囊、大标题优先，整体要像移动 App 可直接点击
- 背景 pattern 只能是极淡 currency / orbit / dot 暗示，不能抢文字和金额信息

## 字体使用纪律

### Sans

用于：

- 正文
- 导航
- 按钮
- 表单
- 卡片
- 信息密度高的 UI

### Mono

用于：

- meta 标签
- 状态标签
- 代码
- eyebrow / kicker 文本
- ID、时间戳、技术注释

### Serif

只在 `editorial` 中用于：

- headline
- pull quote
- 重点数字强调

不要把 serif 用在普通 UI 正文或高密度产品文案里。

## 交互规则

- hover 优先改变 color、border、opacity、shadow、glow。
- 避免大幅位移和 layout shift。
- 所有可交互元素必须支持 `:focus-visible`。
- 动效时长保持简短可控，通常 `150ms` 到 `250ms`。

## 图标系统

- 优先使用 Lucide 这类线性图标。
- 避免 emoji 或过于玩乐化的图标风格。
- 图标以产品清晰度为第一目标，装饰性为第二目标。
