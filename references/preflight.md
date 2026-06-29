# Dig Pre-Flight Check

生成或审查 UI 交付前，使用本文件作为硬性复查 gate。

## 必查项

- 页面生成或审查任务已经输出 Dig Read。
- layout 和 catalog 选择明确。
- 用户未指定 catalog 时，说明默认选择依据。
- 任务需要判断时，给出 dials。
- 同一页面或同一组组件只使用一个基础 catalog。
- layout required slots 已实现。
- 选择了合适 blocks，而不是临时发明结构。
- 覆盖 loading、empty、error、disabled、focus-visible、mobile 状态。
- execution 页面没有被做成 marketing 页面。
- 同一业务列表没有混用 table、feed、card。
- dark / light 通过 token 切换，不写死颜色。
- destructive action 有确认或明确恢复路径。

## Render 检查

- catalog render 通过视觉审查。
- layout recipe 按 QA Notes 完成人工结构复查。
- block contract 覆盖必需 slots、states、responsive rules 与 accessibility。
- catalog render 输出相对 Markdown 与 catalog token 是最新的。
