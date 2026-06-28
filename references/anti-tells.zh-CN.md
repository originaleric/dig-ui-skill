# Dig Anti-Tells

Dig anti-tells 用于过滤 AI 生成界面里高频出现、但不符合 Dig 产品气质的坏味道。

## 全局反模式

- 不要用通用紫蓝 AI SaaS 渐变替代真实的信息层级。
- 不要把每个 section 都塞进大 card。
- 不要给每个 section 都加 eyebrow。
- 不要在同一业务列表中混用 table、card、feed。
- 不要在页面中途随机切换深色和浅色 surface。
- 不要用 glow 替代明确的状态、严重程度、focus 或层级。

## Execution / Runtime 反模式

- 不要把 execution 页面做成 marketing hero。
- 需要真实日志流或状态表时，不要使用装饰性假 terminal。
- Retry、Cancel、Copy、Export 不要脱离 run 上下文。
- 不要给每条日志或每个 timeline step 都套超大的 card。
- 不要用装饰容器稀释 JSON、trace、log 等调试信息。

## Dashboard 反模式

- 操作型 dashboard 需要扫描效率时，不要做得过度空旷。
- 不要把无关指标做成完全同质的卡片阵列。
- 需要 label、state、action 时，不要写营销文案。

## Component 反模式

- 同一语义角色不要重复发明 input、button、badge、row 样式。
- 不要漏掉 disabled、loading、error、focus-visible、mobile 状态。
- 标准图标按钮更清晰时，不要用文字控件硬撑。
