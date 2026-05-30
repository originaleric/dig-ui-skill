# 2026-05-29 Dig 专属 Catalog 重命名与预览文案独立化

## 更新概览

本次更新将原先作为 Dig 默认产品语言的 `runtime` catalog 正式重命名为 `dig`，让 Dig 专属 UI 风格在目录、文档、预览页和导航中心中拥有明确身份。

同时，批量清理预览页面中硬编码的 `Runtime` 示例文案，改为跟随当前 catalog 风格名展示，避免其它品牌或风格预览看起来依赖 Dig 的 runtime 语义。

## 详细改动

1. **重命名 Dig 专属基础 catalog**
   - 将 `references/catalogs/other/runtime.md` 重命名为 `references/catalogs/other/dig.md`。
   - 将 `renders/other/runtime.html` 重命名为 `renders/other/dig.html`。
   - 将文档标题从 `Runtime Catalog` 更新为 `Dig Catalog`。
   - 将预览页标题、hero 名称和描述同步更新为 `Dig`。

2. **更新目录索引与默认选择**
   - 更新 `SKILL.md` 中的 catalog 列表，将默认产品语言从 `runtime` 改为 `dig`。
   - 更新 `README.md`、`USAGE.md`、`references/tokens.md`、`references/primitives.md`、`references/checklist.md` 与 `references/catalogs/README.md` 中的身份引用。
   - 更新 `renders/index.html` 的导航中心数据，将 `other` 分类下的卡片从 `runtime` 改为 `dig`，链接指向 `./other/dig.html`。

3. **只为 Dig 预览启用 Memo 风格点阵背景**
   - 在 `renders/other/dig.html` 内单独覆盖 `body::before`。
   - 使用 8px 间距的点状背景，参考 Memo 画布的点阵密度。
   - 未修改全局 `assets/catalog-preview.css`，因此其它 catalog 不受影响。

4. **预览文案改为跟随当前风格名**
   - 将 `Deploy Runtime` 改为 `Apply {风格名}`。
   - 将 `Runtime Health` 改为 `{风格名} Health`。
   - 将 `Agent / Runtime` 改为 `Agent / {风格名}`。
   - 将 “Dig 的 runtime 语言...” 改为 “{风格名} 风格...”。
   - 该规则已应用到现有 render 页面，避免所有风格共用 runtime 示例语义。

5. **同步渲染脚本基线**
   - 更新 `sync_renders.py`，新增 HTML 预览时优先使用 `renders/other/dig.html` 作为基线。
   - 更新脚本中的旧 runtime 文案替换规则，改为更通用的“当前风格”表达。

## 价值与影响

这次更新明确了 `dig` 是 Dig 专属默认产品语言，而 `runtime` 回到普通产品场景语义，不再作为 catalog 身份名称出现。

后续维护 catalog 时可以更清晰地区分：

- `dig`：Dig 默认产品 UI 风格；
- `mono`：黑白灰、终端感变体；
- `editorial`：叙事与品牌表达变体；
- 其它品牌 catalog：各自独立，不再继承 Runtime 文案痕迹。

这也让导航中心和每个预览页的语义更一致：风格卡片展示的是自身风格，而不是被旧的 runtime 模板文案覆盖。
