# Dig UI 检查清单

在交付 Dig 风格页面或 Dig CSS 方案前，使用这份清单复查。

## Catalog 一致性

- 这个页面或组件集是否只基于一个 catalog？
- 当前样式是否能清晰读出是 `dig`、`mono`、`editorial` 还是 `wise`？
- 如果使用了 `editorial`，结果是否仍然像产品界面，而不是海报？
- 如果使用了 `wise`，结果是否仍然像可信金融产品，而不是社交娱乐 App？

## Token 完整性

- background、surface、text、accent、border、grid token 是否都已定义？
- typography、spacing、radius、shadow token 是否完整？
- 是否避免了未记录的一次性颜色？

## 字体纪律

- sans 是否仍是正文和高密度 UI 的默认字体？
- mono 是否只用于元信息、标签、代码或状态？
- 如果出现 serif，是否只用于 `editorial` 的强调场景？
- hero、section title、panel title、body、meta 之间层级是否清晰？

## 交互状态

- hover 是否避免了 layout shift？
- 所有 clickable 元素是否都有清晰的 focus 状态？
- transition 是否克制且一致？

## Dig 气质

- 页面是否避开了通用紫色 SaaS 风格？
- 是否避开了吵闹的霓虹混色？
- 是否保留了工程化产品质感？
- 如果是 `dig`，是否有运行中、可操作的感觉？
- 如果是 `mono`，是否显得克制而不是未完成？
- 如果是 `editorial`，是否有作者感但没有破坏产品清晰度？
- 如果是 `wise`，是否有移动端优先、透明可信、圆润大胆的 fintech 感？

## Layout 结构

- 是否选择了与页面类型匹配的 layout recipe？
- required slot 是否都已实现（`data-slot`）？
- 桌面 / tablet / mobile 下是否无横向滚动、无 card 套 card？
- 主 CTA 与操作是否靠近被操作对象？
- 是否对照 layout 的 QA Notes 与 Avoid When？
- 是否用至少 2 个推荐 catalog 验证结构不依赖单一视觉？
