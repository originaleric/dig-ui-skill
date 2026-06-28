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
- `token-sheet`：默认 fallback，仅展示通用 token 样张。

新增 catalog 时，若它有清晰行业场景，应优先声明 `render.archetype`。如果暂时没有，保留 fallback 即可。
