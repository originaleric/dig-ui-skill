# Dig UI Skill结构与渲染手册更新

> 日期：2026-05-13  
> 范围：`dig-ui-skill` 目录结构、catalog 拆分、中文化、HTML 渲染手册

## 1. 本次更新概览

本轮把 `dig-ui-skill` 从一份方案文档，推进成了一个可继续迭代的 skill 骨架，并补上了可视化渲染页，方便后续直接对照页面效果做样式微调。

这次更新主要完成了：

- 新建 `dig-ui` 的 `SKILL.md`
- 新建 `agents/openai.yaml`
- 新建 `references/` 体系
- 将 catalog 从单文件拆成独立目录
- 把 skill 主体文案改为中文
- 为每个 catalog 增加独立 HTML 渲染页
- 新增共享的样式预览 CSS

## 2. Skill 主体结构落地

当前目录已经形成以下基础结构：

```text
dig-ui-skill/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── catalogs/
│   │   ├── README.md
│   │   ├── runtime.md
│   │   ├── mono.md
│   │   └── editorial.md
│   ├── tokens.md
│   ├── primitives.md
│   └── checklist.md
├── renders/
│   ├── index.html
│   ├── runtime.html
│   ├── mono.html
│   └── editorial.html
└── assets/
    └── catalog-preview.css
```

其中：

- `SKILL.md` 负责 skill 的触发条件、工作流和边界
- `agents/openai.yaml` 负责 UI 元信息
- `references/` 负责 catalog、token、primitive 和检查规则
- `renders/` 负责可视化预览
- `assets/catalog-preview.css` 负责共享渲染样式

## 3. Catalog 体系拆分

原先 catalog 是集中在一个 `catalogs.md` 中描述的。根据后续维护和“可调样式标准书”的需要，这次已经拆分为：

- `references/catalogs/runtime.md`
- `references/catalogs/mono.md`
- `references/catalogs/editorial.md`
- `references/catalogs/README.md`

这样做的好处是：

- 每套风格可以独立维护
- 每套风格可以写更具体的硬编码样式规范
- 后续如果增加第四套 catalog，不需要挤在一个大文件里
- 渲染页与 catalog 文档之间的映射更直接

## 4. 每套 Catalog 已补充的硬编码样式内容

现在每个 catalog 文件都不再只是抽象描述，而是已经补充了可直接落到实现层的 style 语言，包括：

- 颜色 token
- 字体栈
- serif / sans / mono 使用边界
- 标题、正文、panel title、meta、数字强调的字号建议
- 行高、字距、字重建议
- spacing 与 radius
- border / shadow / glow
- grid 与背景规则
- 组件级样式语言
- 交互规则
- 禁止事项

这意味着：

- catalog 不再只是“方向建议”
- 而是变成了“可约束实现”的风格标准

## 5. Skill 中文化

根据新的要求，这次把 skill 主体切换成中文表达：

- `SKILL.md` 已改成中文
- `references/` 文档主体已改成中文
- `agents/openai.yaml` 的 `short_description` 与 `default_prompt` 已改成中文

保留不变的部分：

- `name: dig-ui`

保留这个英文名，是为了保证 skill 的触发标识稳定，后续可以直接用 `$dig-ui` 调用。

## 6. 新增 HTML 渲染手册

这是本轮最重要的增强。

为了让这套 skill 像一份“品牌 UI 标准书”一样可对照、可调试，新增了：

- `renders/index.html`
- `renders/runtime.html`
- `renders/mono.html`
- `renders/editorial.html`

用途：

- 直接本地打开查看每个 catalog 的实际视觉效果
- 在真实渲染结果上调颜色、字体、字号、按钮、面板和数字表达
- 对照 catalog 文档回写 style 规范

每个 catalog 渲染页当前都包含：

- 颜色系统
- 字体层级
- 按钮与标签
- 面板与状态
- 数字表达
- 关键 token 表

## 7. 共享渲染样式抽离

为了避免三个 HTML 页面各自重复定义样式，这次新增：

- `assets/catalog-preview.css`

这个文件负责渲染手册的公共结构与组件预览样式，例如：

- shell
- hero 区
- 侧边目录
- section 容器
- color swatch
- type card
- button card
- panel card
- stat card
- token table

这样后续调整标准书展示方式时，只需要修改一处，就能同步影响三套 catalog 页面。

## 8. SKILL.md 联动更新

为了让 skill 真正把这些 HTML 预览页作为工作流的一部分，本轮还更新了 `SKILL.md`，加入了渲染页入口：

- `renders/index.html`
- `renders/runtime.html`
- `renders/mono.html`
- `renders/editorial.html`

这样后续在使用 skill 时，就可以明确地把“打开渲染页进行审美对照和微调”纳入流程，而不是只停留在文字规范层。

## 9. 当前状态

截至这一步，`dig-ui-skill` 已经不只是方案稿，而是具备了以下能力：

- 有明确的 skill 入口
- 有独立的 catalog 风格体系
- 有具体可执行的 token 与 style 规则
- 有中文化的说明文档
- 有可直接打开的 HTML 渲染标准书

它现在已经适合继续往两个方向深化：

1. 继续把 catalog 文档打磨得更细，接近正式品牌规范
2. 增加真实可复用的 CSS / token 产物，例如 `tokens.css`、`theme.css` 或更具体的 primitive 样式文件

## 10. 本轮新增或更新的关键文件

新增：

```text
SKILL.md
agents/openai.yaml
references/catalogs/README.md
references/catalogs/runtime.md
references/catalogs/mono.md
references/catalogs/editorial.md
references/tokens.md
references/primitives.md
references/checklist.md
assets/catalog-preview.css
renders/index.html
renders/runtime.html
renders/mono.html
renders/editorial.html
```

更新：

```text
plans/2026-05-13-Dig UI Skill方案.md
```

## 11. 下一步建议

建议下一步优先做下面两件事之一：

- 先把 `runtime` catalog 当作 Dig 主标准继续打磨，做到更贴近最终品牌表达
- 或者开始补可复用 CSS 产物，把这套 skill 从“标准书”推进到“可以直接引用的样式实现”
