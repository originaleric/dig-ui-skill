# Dig Read 与 Dials

Dig Read 是 agent 在选择 layout、catalog 和 blocks 前写下的设计判断。它把用户的一句话需求转换成可执行的界面语境。

## 格式

```text
Dig Read:
<页面任务>，面向 <目标用户 / 使用目的>；
结构使用 <layout> layout，视觉使用 <catalog> catalog；
blocks: <主要 blocks 或 "暂不需要">。

INFORMATION_DENSITY: <1-10>
BRAND_EXPRESSIVENESS: <1-10>
INTERACTION_ENERGY: <1-10>
OPERATIONAL_CRITICALITY: <1-10>
```

## Dial 含义

### INFORMATION_DENSITY

- `1-3`：空旷、品牌展示、空状态或 marketing 页面。
- `4-6`：常规产品页面，扫描效率和留白平衡。
- `7-10`：dashboard、表格、日志、run detail、inspector、高密工作台。

### BRAND_EXPRESSIVENESS

- `1-3`：克制操作界面，任务清晰优先。
- `4-6`：保留 Dig 产品气质，但不让装饰抢内容。
- `7-10`：发布页、onboarding、marketing、品牌表达更强的场景。

### INTERACTION_ENERGY

- `1-3`：静态控件为主，只保留基础 hover、focus、active。
- `4-6`：常规产品反馈，状态切换清晰。
- `7-10`：运行状态、流式日志、进度、步骤变化和 runtime 反馈更明显。

### OPERATIONAL_CRITICALITY

- `1-3`：展示、阅读、探索型页面。
- `4-6`：普通工作页面，操作可恢复。
- `7-10`：账单、部署、权限、危险操作、调试失败和恢复路径。

## 选择规则

- 先 layout，后 catalog。layout 决定信息结构，catalog 决定视觉语言。
- 用户指定 catalog 时用户优先。未指定时，根据 layout 的 `default_catalog` 与 `recommended_catalogs` 推断。
- blocks 在 layout 之后选择，因为它们填充 slot 和重复模块需求。
- dials 不创造新风格系统，只调节已选 layout/catalog/block 下的 spacing、密度、状态覆盖、动效和视觉强调。
- execution 页面优先使用 `task_type: execution`；`runtime` 只作为 legacy page type 或未来 catalog/skin，除非用户明确指视觉皮肤。

## 示例

```text
Dig Read:
运行详情页，面向调试 agent run 的工程师；
结构使用 agent-run-detail layout，视觉使用 dig catalog；
blocks: run-status-header, step-timeline, runtime-log-stream.

INFORMATION_DENSITY: 8
BRAND_EXPRESSIVENESS: 4
INTERACTION_ENERGY: 7
OPERATIONAL_CRITICALITY: 9
```
