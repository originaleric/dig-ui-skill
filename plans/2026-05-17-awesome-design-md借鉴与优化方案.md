# awesome-design-md 借鉴与优化方案

通过对比 `awesome-design-md` 和 `dig-ui-skill` 仓库，两者的核心思想高度一致：**都是通过编写结构化的 Markdown 文档，将设计系统（Design System）转化为 AI 可以直接阅读并生成代码的上下文（Context）。**

`dig-ui-skill` 在工作流定义、多套 Catalog 变体切换以及明确的设计边界控制上表现优异。借鉴 `awesome-design-md` 的架构，我们可以在**降低 AI 幻觉、提升代码生成的精确度**上进行以下优化：

## 1. 将松散的文本描述，升级为严格的“Token 映射语法” (优先级最高)

当前组件描述过于依赖自然语言（如：“绿色主按钮，文字使用深底反差”），容易导致 AI 在生成代码时猜测具体的尺寸和圆角。

**优化方案**：在各 catalog 文件中增加明确的组件定义层，将组件的几何特征（宽高、边距）和颜色严格映射到 `--dig-*` 变量上。

```yaml
components:
  button-primary:
    backgroundColor: "{colors.dig-accent-strong}"
    textColor: "{colors.dig-bg}"
    typography: "{typography.body-md}"  # 明确绑定字号/字重
    rounded: "{radius.md}"             # 明确绑定圆角
    padding: 12px 24px                 # 明确几何尺寸
```

## 2. 聚合并收敛 Typography（排版系统）

当前 `dig-ui-skill` 拆分了散落的字号、行高、字距变量，通过文本建议绑定。AI 在生成时需要自行拼凑。

**优化方案**：将字族、字号、行高、字重、字距打包成一个单一的语义化 Token，让 AI 在写标题时一键套用。

```yaml
typography:
  hero-title:
    fontFamily: "var(--dig-font-sans)"
    fontSize: "var(--dig-text-5xl)"
    lineHeight: "var(--dig-leading-tight)"
    letterSpacing: "-0.04em"
    fontWeight: "800"
```

## 3. 补充明确的“响应式折叠策略 (Responsive Behavior)”

当前 catalog 中缺少针对不同屏幕尺寸的系统性折叠指令，这会导致 AI 生成移动端代码时效果不可控。

**优化方案**：在 catalog 文件中增加 `## 响应式策略` 章节。
示例：
- “平板端（768px）网格由 4 列变为 2 列，移动端变为 1 列。”
- “移动端主标题字号从 56px 强制降至 36px。”
- “交互组件在移动端的最小触控区域必须达到 44x44px。”

## 4. 统一 Token 的表达范式 (Machine Readability)

**优化方案**：除了现有的原生 CSS 变量定义外，可以考虑在文档中采用类似 Tailwind Config 的 JSON/YAML 结构描述。AI 对嵌套结构数据的解析和应用能力远强于对纯 CSS 代码块的解析。

---
**实施建议**：
无需完全重构现有的 `dig-ui-skill` 体系。只需在相应的 catalog 文件（如 `runtime.md`、`apple.md`）中补充 **`## Components 严格映射`** 和 **`## 响应式行为`** 两个核心章节即可大幅提升 AI 生成代码的精确度。
