# Dig UI Skill方案

## Summary

构建一个规则型、多 Catalog 的 `dig-ui` skill，目标不是生成具体页面排版，而是为 Dig 的网页、控制台、营销页、文档页提供一套统一的 CSS 设计语言层。

它会融合两类参考：

- `ui-ux-pro-max`：提供“可检索、可组合”的设计系统思路
- `guizang-ppt-skill-main`：提供“强审美约束”的字体分工、色彩纪律、网格节奏、细节语言

最终 `dig-ui` 不做页面模板，不先管 section 排布，而是沉淀成一套可切换的 catalog 体系，先统一：

- 颜色 token
- 字体系统
- 字号与层级
- spacing / radius / border / shadow
- grid 与背景纹理
- 交互细节规则
- CSS 变量命名约定
- skill 使用流程

## Key Changes

### 1. Skill 形态与目录

新增一个本地 skill：`dig-ui`

建议结构：

- `.codex/skills/dig-ui/SKILL.md`
- `.codex/skills/dig-ui/references/catalogs.md`
- `.codex/skills/dig-ui/references/tokens.md`
- `.codex/skills/dig-ui/references/primitives.md`
- `.codex/skills/dig-ui/references/checklist.md`

定位：

- `SKILL.md` 负责工作流和使用方式
- `catalogs.md` 定义 3 套 catalog
- `tokens.md` 定义颜色、字体、字号、间距、阴影、边框等变量
- `primitives.md` 定义 grid、surface、button、tag、panel、section 背景、divider 等基础 CSS 语言
- `checklist.md` 定义视觉自检标准

### 2. Skill 工作流定义

`dig-ui` 的使用流程固定为：

1. 判断页面类型
   - marketing
   - docs
   - dashboard
   - runtime / console
2. 选择 catalog
   - 默认推荐 `runtime`
   - 需要极简时用 `mono`
   - 需要更强品牌作者性时用 `editorial`
3. 输出 CSS 设计决策
   - token
   - font stack
   - type scale
   - grid / spacing
   - surface / border / glow / texture
4. 最后才允许进入页面排版或组件实现

Skill 要明确要求：

- 先选 catalog，再写 CSS
- 任何页面都只能基于 catalog token 扩展，不允许临时自造颜色体系
- 不允许直接复制 `guizang` 的杂志模板，只吸收其“约束方法”
- 不允许回退到泛 SaaS 紫蓝渐变默认审美

### 3. Catalog 体系

采用 3 套 catalog。

#### A. `runtime`

Dig 主系，默认 catalog。

风格目标：

- Developer tool
- AI runtime
- orchestration / agent / infra
- 稳重、运行态、工程感
- 少量 editorial 细节提升识别度

颜色建议：

- bg: `#06121a`
- bg-soft: `#0b1b26`
- panel: `rgba(11, 27, 38, 0.78)`
- panel-strong: `rgba(16, 32, 44, 0.92)`
- text: `#ecf3f8`
- muted: `#8aa0b2`
- accent: `#37d67a`
- accent-2: `#4fb3ff`
- border: `rgba(138, 160, 178, 0.16)`
- grid-line: `rgba(138, 160, 178, 0.08)`

字体建议：

- UI Sans: `Plus Jakarta Sans`
- CJK Sans: `Noto Sans SC`
- Mono: `IBM Plex Mono`

用途分工：

- 标题：`Plus Jakarta Sans`
- 正文：`Plus Jakarta Sans / Noto Sans SC`
- 元信息、label、code、eyebrow：`IBM Plex Mono`

#### B. `mono`

黑白灰副系。

风格目标：

- 终端感
- 设计稿对照感
- 更克制、更抽象
- 适合文档页、实验页、占位阶段

颜色建议：

- bg: `#050505`
- bg-soft: `#101010`
- panel: `rgba(16,16,16,0.76)`
- panel-strong: `rgba(10,10,10,0.92)`
- text: `#f2f2f2`
- muted: `#9a9a9a`
- accent: `#f2f2f2`
- accent-2: `#6f6f6f`
- border: `rgba(255,255,255,0.14)`
- grid-line: `rgba(255,255,255,0.07)`

字体建议：

- 沿用 `runtime`
- 但 headline 减少夸张权重，整体更平

#### C. `editorial`

带杂志感的 Dig 变体，不是 PPT 模板。

风格目标：

- 保留 Dig 工程底色
- 引入 `guizang` 的“衬线重音 + mono 元数据 + 网格节奏”
- 用于品牌页、叙事型专题、发布页

颜色建议：

- bg: `#f4efe6`
- bg-soft: `#ebe3d6`
- panel: `rgba(255,255,255,0.72)`
- panel-strong: `rgba(255,255,255,0.88)`
- text: `#161514`
- muted: `#6a655d`
- accent: `#1f4e46`
- accent-2: `#9c6b3a`
- border: `rgba(22,21,20,0.12)`
- grid-line: `rgba(22,21,20,0.06)`

字体建议：

- Heading Serif: `Playfair Display`
- CJK Heading Serif: `Noto Serif SC`
- Body Sans: `Noto Sans SC` 或 `Plus Jakarta Sans`
- Mono: `IBM Plex Mono`

用途分工：

- 标题可用 serif
- 正文仍坚持 sans，提高 UI 可读性
- 不做纯杂志网站，不做大面积长文 serif

### 4. Token 规范

统一 CSS 变量前缀为 `--dig-*`。

核心 token 组：

- Color
  - `--dig-bg`
  - `--dig-bg-soft`
  - `--dig-surface`
  - `--dig-surface-strong`
  - `--dig-text`
  - `--dig-text-muted`
  - `--dig-accent`
  - `--dig-accent-2`
  - `--dig-border`
  - `--dig-grid-line`
  - `--dig-success`
  - `--dig-warning`
  - `--dig-danger`
- Typography
  - `--dig-font-sans`
  - `--dig-font-serif`
  - `--dig-font-mono`
  - `--dig-text-xs/sm/md/lg/xl/2xl/3xl/4xl/5xl`
  - `--dig-leading-tight/normal/relaxed`
  - `--dig-tracking-tight/normal/wide`
- Space
  - `--dig-space-1` = `4px`
  - `--dig-space-2` = `8px`
  - `--dig-space-3` = `12px`
  - `--dig-space-4` = `16px`
  - `--dig-space-5` = `24px`
  - `--dig-space-6` = `32px`
  - `--dig-space-7` = `48px`
  - `--dig-space-8` = `64px`
- Radius
  - `--dig-radius-sm` = `10px`
  - `--dig-radius-md` = `16px`
  - `--dig-radius-lg` = `24px`
  - `--dig-radius-pill` = `999px`
- Shadow / Glow
  - `--dig-shadow-soft`
  - `--dig-shadow-panel`
  - `--dig-glow-accent`
  - `--dig-glow-secondary`

### 5. Type Scale 与字体纪律

统一 type scale，不按页面临时调。

建议基准：

- `xs` 12
- `sm` 14
- `md` 16
- `lg` 18
- `xl` 20
- `2xl` 24
- `3xl` 32
- `4xl` 40
- `5xl` 56

标题规则：

- marketing / hero 大标题：`40-56px`
- section title：`24-32px`
- panel title：`18-20px`
- body：`16px`
- meta / eyebrow / tag：`12-13px`
- data / numeric emphasis：`32-48px`

字体分工规则直接吸收 `guizang` 的优点：

- Sans：正文、按钮、UI、表单、导航
- Mono：标签、状态、编号、代码、数据源、kicker
- Serif：只允许用于 `editorial` catalog 的大标题、quote、重点数字，不进入普通正文

### 6. Grid 与背景语言

先定义 CSS primitives，不定义具体页面布局。

Grid 建议：

- 页面外层最大宽度：`1280px` 或 `1440px`
- 12-column grid
- 默认 gutter：`24px`
- 桌面 section padding：`32-48px`
- 移动端 gutter：`16px`
- panel 内部 spacing：`20-24px`

背景语言：

- `runtime` / `mono`
  - 允许 subtle grid
  - 允许 radial glow
  - 允许浅层噪点或 scanline 感
- `editorial`
  - grid 更淡
  - 减少 glow
  - 强调纸感底色和留白

需要定义的基础 CSS primitive：

- `.dig-shell`
- `.dig-section`
- `.dig-surface`
- `.dig-surface-strong`
- `.dig-grid-overlay`
- `.dig-kicker`
- `.dig-meta`
- `.dig-stat`
- `.dig-divider`
- `.dig-tag`
- `.dig-button-primary`
- `.dig-button-secondary`

### 7. 细节规则

必须写进 skill 的细节约束：

- 不使用默认紫色科技感
- 不使用高饱和霓虹混搭
- hover 只改 color / border / glow，不做大位移
- 所有 clickable 元素必须有 focus-visible
- icon 统一走 Lucide 线性图标
- hero 区域允许大留白，但 panel 区域坚持工程化密度
- 数据状态优先用 color + text 双编码，不只靠颜色
- `editorial` catalog 也必须保留产品 UI 的清晰边界，不做纯视觉海报

## Public Interfaces / Skill Contract

`dig-ui` 对外暴露的不是脚本 API，而是一套稳定调用协议：

- 输入：
  - 页面类型
  - 使用场景
  - 目标语气
  - catalog 选择
- 输出：
  - catalog 推荐
  - CSS token 表
  - font / scale / spacing / grid 规则
  - 可用 primitive 清单
  - 禁止事项

`SKILL.md` 里应明确约定 3 个调用入口：

- “为 Dig 页面选择 catalog”
- “为当前页面输出 dig-ui token”
- “基于 dig-ui 规则审查现有 CSS 是否跑偏”

## Test Plan

### 1. Catalog 选择测试

验证 skill 在以下输入下能稳定选对 catalog：

- 官网 hero / 产品首页 -> `runtime`
- 极简 docs / changelog / placeholder -> `mono`
- 发布页 / 专题页 / brand story -> `editorial`

### 2. Token 完整性测试

每个 catalog 都必须能完整输出：

- 背景色
- surface 色
- 文本层级
- accent / secondary accent
- border / grid-line
- 字体栈
- 字号层级
- spacing / radius / shadow

不能只给部分 token。

### 3. CSS 一致性测试

拿现有 `/Users/dig/Documents/文稿 - XinYe的MacBook Pro (5)/Projects/DigFrontend/OffcialSite/src/styles/globals.css` 对照检查：

- 当前 Dig 主题是否可映射到 `runtime`
- 当前 Mono 主题是否可映射到 `mono`
- 是否还存在未进入 token 系统的散落颜色
- 是否存在 catalog 间不一致的 spacing / radius / hover 行为

### 4. 审美边界测试

人工 review 3 类页面草案：

- runtime 页面不能滑向普通 SaaS 模板
- mono 页面不能变成“什么都没有”的线框稿
- editorial 页面不能失去 Dig 的工程产品感

## Assumptions

- 当前 Dig 官方站现有 `dig + mono` 主题将作为 `dig-ui` 的基础事实来源，不推翻重做。
- `dig-ui` 第一阶段只做 skill 规范，不做自动生成脚本。
- 第一阶段不处理具体 layout 模板，只处理 CSS 设计语言层。
- catalog 数量固定为 3 套，先保证稳定性，不扩到 4 套以上。
- `runtime` 是默认官方主 catalog；`mono` 和 `editorial` 是可切换变体，不与主系竞争品牌主位。
