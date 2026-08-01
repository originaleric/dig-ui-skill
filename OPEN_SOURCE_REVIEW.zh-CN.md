# dig-ui-skill 开源 Review

Review 日期：2026-06-05

## 结论

项目已经具备开源基础：有清晰的 skill 入口、CLI、多端安装路径、参考资产、渲染预览和 layout 校验。当前最值得优先补齐的是贡献路径、安全策略、商标/第三方品牌免责声明，以及发布前的 npm/GitHub 元数据。

## 已补齐

- `README.md` / `README.zh-CN.md`：使用同一套开源首页结构，突出定位、特性、快速开始、最新动态、开发命令、开源说明和协议。
- `INSTALL.md` / `INSTALL.zh-CN.md`、`USAGE.md` / `USAGE.zh-CN.md`：英文作为默认文档，中文镜像保留详尽安装与维护说明；两种语言的首页和指南互相链接。
- `LICENSE`：新增 Apache-2.0 协议文本。
- `package.json` / `package-lock.json`：补充 `license: "Apache-2.0"`，并把中文 README 纳入 npm package files。

## 高优先级问题

1. **第三方品牌与商标边界需要更清楚**

   仓库包含大量以公开产品为参考的 catalog。开源时应明确说明：品牌名和商标归原权利人所有；项目只做设计语言分析，不复制专有资产、授权字体、截图或私有 token。

2. **缺少贡献流程**

   建议新增 `CONTRIBUTING.md`，写清楚新增 catalog/layout 的规范、同步命令、校验命令、PR checklist，以及禁止提交 `references/global-rules.local.md`、私有截图、密钥、授权字体。

3. **缺少安全策略**

   建议新增 `SECURITY.md`，说明漏洞报告渠道。即便项目主要是文档和 CLI，安装器会写用户目录，仍然需要说明安全问题如何披露。

4. **npm 发布元数据还不完整**

   建议在 `package.json` 补充 `repository`、`homepage`、`bugs`、`keywords`、`engines`。这些字段会影响 npm 页面可信度和可发现性。

## 中优先级建议

1. **CI 还没有仓库级自动校验**

   建议加 GitHub Actions，至少跑：

   ```bash
   npm ci
   npm run validate:layouts
   npm pack --dry-run
   ```

2. **发布产物边界需要二次确认**

   `package.json.files` 已经限制 npm 包内容，但发布前建议固定跑 `npm pack --dry-run`，确认不会把本地规则、临时文件、内部计划或非必要更新记录打入包内。

3. **双语文档需要持续同步**

   当前默认英文入口和中文镜像已经齐全。后续新增 CLI 能力、workflow 或对外承诺时，应同步更新两种语言的 README、安装指南和使用指南，并在发布前检查链接与 npm pack 产物。

4. **版本策略需要公开**

   建议增加 `CHANGELOG.md`，采用 SemVer，并明确：

   - catalog/layout 新增是 minor；
   - token 字段删除或 CLI 行为变化是 major；
   - preview 文案和非破坏性修复是 patch。

## 低优先级建议

- 在 README 增加 preview 截图或 GIF，展示 `renders/index.html` 和 layout preview。
- 增加 `CODE_OF_CONDUCT.md`，如果计划接受外部贡献。
- 增加 issue templates：bug report、catalog request、layout request。
- 不发布 `plans/` 与 `updates/` 等内部决策、实现记录；它们保留在本地工作区即可。

## 协议建议

推荐使用 **Apache License 2.0**。

理由：

- 它是宽松许可证，允许商用、修改、分发和私有使用，适合工具、CLI、文档资产和设计系统基础设施。
- 相比 MIT，它额外提供明确的专利授权和专利终止条款，对企业用户更友好。
- 它保留版权和许可证声明要求，适合需要传播来源说明的开源项目。
- 对这个项目来说，不建议 GPL/AGPL，因为强 copyleft 会降低前端团队和商业产品集成意愿。

补充建议：Apache-2.0 只能覆盖本仓库原创代码和原创文档，不能授权第三方商标、Logo、字体、截图或专有设计资产。README 中应持续保留品牌免责声明。
