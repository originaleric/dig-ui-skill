# 2026-07-13 DigKit Bridge Runtime 协议落地

## 背景

DigKit 新增 `ui.design` capability 后，需要通过真实 `dig-ui-skill` binary 调用 Dig UI 设计系统能力。生产模拟测试发现当前 CLI 只支持 install/update/render/validate/local/palette/style 等管理命令，不支持 DigKit 约定的 bridge 文件协议：

```bash
dig-ui-skill run --input-json <path> --output-json <path>
```

这会导致 DigKit real-binary smoke 在真实 binary 阶段返回 `DEPENDENCY_FAILURE`，主链路无法生成 artifact 和 apply plan。

## 变更

- 新增稳定 CLI 子命令：
  - `dig-ui-skill run --input-json <path> --output-json <path>`
- `run` 读取 DigKit `ui.design` 输入 JSON，并输出 bridge envelope：
  - `summary`
  - `task`
  - `catalog`
  - `layout`
  - `metadata`
  - `artifact_outputs`
  - `apply_plan`
- `apply_plan` 使用 `dig-ui-skill.apply_plan.v1`，通过 `content_artifact_label` / `diff_artifact_label` 交给 DigKit materializer 替换为真实 artifact ref。
- `artifact_outputs` 使用 label + inline content 交给 DigKit 物化，Dig UI Skill 不直接生成 DigKit artifact ID。
- bridge 自动选择基础 layout / catalog：
  - 未指定 catalog 时使用 `dig`
  - 未指定 layout 时按 prompt / task / target 粗分到 runtime-console、data-table-workspace、settings-form、docs-article、report-insight 或 dashboard-overview
- `options.return_patch=true` 时生成可物化的源码 artifact、diff artifact 与 apply plan。
- 生成源码时按 HTML / Vue / JSX 属性上下文转义 catalog 与 layout，避免输入破坏目标源码。
- `context_files.path` 只接受安全相对源码路径；绝对路径、`..` 逃逸、空路径和控制字符路径会被忽略并回退到默认目标。
- 新增 `npm run test:bridge` contract smoke，覆盖：
  - 正常 DigKit bridge 输出
  - 属性注入输入的转义
  - unsafe context path 回退
  - valid context path 规范化与 expected digest

## 文档同步

- README / README.zh-CN 增加 DigKit bridge runtime 能力说明、命令示例和目录注释。
- INSTALL 增加 `--input-json` / `--output-json` 选项与 DigKit Bridge Runtime 小节。
- USAGE 增加 DigKit Bridge Runtime 工作流、输出 envelope 和边界约定。
- package scripts 增加 `test:bridge`。

## 校验

已通过：

```bash
node --check bin/dig-ui-skill.mjs
node --check tests/2026-07-13/digkit-bridge-contract.mjs
npm run test:bridge
npm run validate:renders
npm run validate:catalogs
DIG_UI_SKILL_BINARY=/path/to/dig-ui-skill/bin/dig-ui-skill.mjs /Users/dig/.gvm/gos/go1.24.8/bin/go run ./tests/2026-07-13/ui_prod_real_smoke
```

结果：

- `test:bridge`: passed
- `validate:renders`: 0 FAIL, 0 WARN
- `validate:catalogs`: passed for 76 preview(s)
- DigKit real-binary smoke: `status=pass`
- MCP 暴露边界保持只暴露 `ui.design`
- artifact disabled 负例保持 rejected

## 维护约定

- `run` 是 DigKit bridge runtime 协议，不替代 AI agent 的完整 Dig Read / layout / catalog / block 工作流。
- Dig UI Skill 负责输出可物化的 design envelope；DigKit 负责 artifact writer、canonical digest、审批、workspace policy、幂等与真实文件写入。
- 修改 bridge 输出 schema 时必须同步 `tests/2026-07-13/digkit-bridge-contract.mjs`，并重跑 DigKit real-binary smoke。
- 不要把用户自定义 palette/style 或本地 global rules 写入 bridge 输出的内置资产目录。
