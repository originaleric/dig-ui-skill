# 挖掘 UI Catalog 体系

## 总览

`dig-ui` 使用 5 套目录。写 CSS 前必须先选一套，再按该目录的硬编码规范输出 token 和样式。

| 目录 | 适用场景 | 气质 |
|---|---|---|
| `dig` | 产品首页、运行时视图、仪表板、控制台 | 工程化、运行状态、现代 |
| `单声道` | 文档、占位页、实验页、极简页面 | 克制、灰阶、终端感 |
| ‘社论’ | 发布页、叙述页、品牌表达页 | 有作者感、精致、带衬线重音 |
| ‘明智’ | 移动端优先、消费级金融科技、付款/账户/邀请体验 | 酸绿色、圆润、透明、可信 |
| ‘苹果’ | 高端产品发布页、系统级功能页、应用预览、设备联动体验 | 内容优先、轻透、系统中断、安静高级 |

## 选择顺序

如果不确定，按下面顺序选：

1. `dig`
2.`单声道`
3.`社论`
4. `wise`：仅当页面明确需要消费者金融科技/钱包/移动应用时使用
5.“苹果”：仅当页面明确需要类似苹果的产品剧院、液体玻璃、系统完整性或高端产品发布光照时使用

## 规则

- 相同页面或相同组组件只能有一个基础目录。
- 禁止将一个目录的颜色和另一个目录的字体系统混搭。
- 所有一线实现都应从目录文件里的硬编码 token 和 style 语言出发。
- 如果需要扩展，先保留原目录的结构和语义，再做局部追加。

## Color Palette Catalog

除了以品牌或产品气质划分的 catalog，`dig-ui` 也允许维护一组以整体网站配色为入口的 palette catalog，例如 `palette01`、`palette02`。

Palette catalog 不和 brand catalog 冲突。它适合用户没有指定品牌，但明确指定了「整体配色」「网站 palette」「视觉 mood」的场景。每个 palette 从 4 个主色锚点开始，例如 `canvas`、`ink`、`primary`、`support`，再通过 Radix-inspired 的角色色阶推导出背景、hover、border、solid action、text 等 Dig token。

新建 palette catalog 必须放在 `references/catalogs/palettes/`，并在 frontmatter 显式声明：

```yaml
kind: color-palette-catalog
category: palettes
token_contract: palette_v1
```

`kind` 说明它是色彩目录，`category` 绑定目录和 render 分组，`token_contract` 绑定 required token roles。不要依赖隐式推断来让新 palette 通过校验。

Palette 文件必须直接放在 `references/catalogs/palettes/` 下，不使用子目录。文件名、frontmatter `slug`、render URL 和 registry slug 必须完全一致，并使用至少两位数字的 `paletteNN` 形式，例如 `palette01.md` 对应 `slug: palette01`。

Palette 的正式色彩事实必须写在 `## Palette Contract` 的 fenced YAML block 里；validator 只读取这个 canonical block，不会把其他示例片段当作真实配置。CSS token 必须写在 `## Dig UI CSS Tokens` 的 fenced CSS block 里。

Palette render 会提供 Palette Lab 试色区，用于临时调整 anchor 颜色、点击候选 support 色并复制更新后的 token。这个交互只改变当前预览页的 CSS variables，不会自动写回 Markdown；确认采用后仍需同步更新 Palette Contract 与 CSS token。

详细规则见 [../color-palette-catalogs.md](../color-palette-catalogs.md)。

## Style Catalog

除了 brand catalog 和 color palette catalog，`dig-ui` 也允许维护以完整视觉语法为入口的 style catalog，例如 `cozy-arcade`、`quant-signal-console`。

Style catalog 适合用户指定「截图风格」「非品牌风格」「材质/形态/插画/组件气质」的场景。它不只回答颜色怎么用，还必须回答 shape、stroke、surface、illustration、motion、component mapping 和适用/不适用场景。

新建 style catalog 必须放在 `references/catalogs/styles/`，并在 frontmatter 显式声明：

```yaml
kind: style-catalog
category: styles
token_contract: style_v1
```

Style 的正式风格事实必须写在 `## Style Contract` 的 fenced YAML block 里。至少覆盖 `best_for`、`avoid_for`、`mood`、`shape_language`、`surface_language`、`illustration_language`、`component_mapping` 和 `motion_language`。CSS token 仍必须写在 `## Dig UI CSS Tokens` 的 fenced CSS block 里。

Style catalog 必须显式声明 `render.archetype`。如果没有合适的专属样张，先使用中性的 `token-sheet`，不要让一个 style 默默继承另一个 style 的行业样张。

如果 style 使用专属 render archetype，例如 `mobile-game-companion` 或 `signal-ops-console`，该 archetype 的场景颜色、吉祥物颜色、任务卡颜色、装备槽颜色、信号色、盘口色、拓扑节点色等必须由 catalog token 提供；共享 CSS 只负责结构和 token fallback，不承载某个 style 的私有视觉事实。

Style render 会提供 Style Lab 导出入口，用于把当前 `Style Contract`、`render.archetype` 和 `--dig-*` token 打包成 `dig.style.export.v1` 的 `customstyle` 资产。导出的 style 应通过 `dig-ui-skill style import <file>` 进入 `~/.config/dig-ui-skill/styles/`，再通过 `dig-ui-skill style sync <target|--all>` 同步到 `references/local/styles/`。`customstyle` 属于用户资产，不写回 `references/catalogs/styles/`，也不进入内置 manifest。

## Render Intent

Catalog render 默认会读取 CSS token，并尽量根据 catalog 所属分类选择样张类型。对于重点 catalog，建议显式声明 `render` 配置，让预览页展示对应行业和组件语义，而不是只展示通用 token 表。

示例：

```yaml
render:
  archetype: command-palette-marketing
  page_type: dev-tools
  density: spacious
  canvas: dark-continuous
```

当前支持的 `archetype`：

- `command-palette-marketing`：开发工具、命令面板、扩展市场、快捷键优先体验。
- `media-player-shell`：媒体消费应用、播放队列、内容卡片、底部播放控制。
- `creative-canvas-workspace`：设计与创作工具、画布、图层、工具栏、协作状态。
- `commerce-dual-track`：电商与零售，同时展示营销首屏和交易卡片。
- `inbox-productivity`：收件箱、团队协作、生产力 SaaS、高频列表和阅读面板。
- `finance-mobile-app`：移动优先金融、余额、转账、汇率、卡片控制。
- `site-palette-showcase`：色彩目录默认样张，展示整站背景、文字、CTA、卡片、链接和辅助强调。
- `mobile-game-companion`：游戏化移动应用、吉祥物舞台、任务卡、装备选择、奖励芯片和底部主动作。
- `signal-ops-console`：高密度实时信号控制台，同时展示 paper-light 与 terminal-dark 下的指标磁带、agent pipeline、拓扑图、盘口和微型图表。
- `token-sheet`：默认 fallback，仅展示通用 token 样张。

新增 catalog 时，若它有清晰行业场景，应优先声明 `render.archetype`。如果暂时没有，保留 fallback 即可。
