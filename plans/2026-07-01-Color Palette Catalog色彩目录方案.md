# Color Palette Catalog 色彩目录方案

## 1. 背景

当前 `dig-ui-skill` 的 catalog 主要以品牌、产品类型或设计语言划分，例如 `dig`、`mono`、`editorial`、`wise`、`apple`，以及后续扩展出的各类品牌 inspired catalog。

这套结构适合回答：

```text
这个页面应该像哪个品牌、产品或设计语言？
```

但还有另一类常见需求不是从品牌切入，而是从整体网站配色切入：

```text
我想要一套好的网站整体配色。
```

这类需求更接近 Happy Hues 一类网站的思路：先维护一组完整 palette，明确页面背景、文字、按钮、卡片、链接、插画高亮等角色色，再把它应用到页面。

同时，Radix Colors 的价值在于：它不是只给颜色，而是把色阶和 UI 角色绑定起来。每条 scale 都有明确的使用位置，例如背景、hover、selected、border、solid action、text。这个机制可以作为 Dig palette 的衍生色阶规则。

因此建议新增一种不与原有 brand catalog 冲突的 catalog 类型：

```text
Color Palette Catalog
```

## 2. 核心判断

Color Palette Catalog 和 Brand Catalog 是并列关系，不是替代关系。

- Brand Catalog：以品牌、产品类型或成熟视觉语言为入口。
- Color Palette Catalog：以整体配色、mood、网站视觉氛围为入口。

示例：

```text
brand catalog:
  dig
  mono
  editorial
  wise
  apple
  linear.app
  spotify

palette catalog:
  palette01
  palette02
  palette03
```

选择规则：

- 用户提品牌、产品或明确 visual language：优先 brand catalog。
- 用户提整体配色、mood、网站 palette、颜色组合：优先 palette catalog。
- 用户同时提品牌和 palette：选择一个作为 base，另一个只作为 inspiration，避免混合两套基础系统。

## 2.1 系统不变量

Palette catalog 不能只是新增一个 Markdown 目录。它必须被整个 `dig-ui-skill` 工具链作为一等 catalog 类型识别。

落地前必须同时满足这些不变量：

- `references/shared/catalog-manifest.yaml` 能声明 palette catalog 的 `kind`、`category`、`status` 和 required token roles。
- catalog token contract 必须分层或版本化，新增 palette 强约束不能反向破坏现有 brand catalog。
- 新建 catalog 文件必须显式声明 `category` 和 `token_contract`；按 `kind` 推导 contract 只作为旧文件或过渡期兼容 fallback，不能成为新 palette 的隐式规则。
- `sync_renders.py` 的 render registry 能识别 `palettes` 分类，并把 `palette01` 注册进 `renders/index.html`。
- `validate-dig-render-ops.mjs` 能校验 palette catalog 的结构、双语文件、required token roles、site roles 和 render 资产。
- `SKILL.md` / `dig-read.md` 的 catalog 选择规则能区分 brand-first 和 palette-first 入口。
- 第一个 `palette01.md` 只有在上述契约存在后再创建，避免出现“文件存在但工具链不认识”的半成品状态。

## 3. Palette Catalog 的基本结构

每个 palette catalog 以 4 个主色锚点开始：

```yaml
anchors:
  canvas: "#f7f7f7"
  ink: "#000000"
  primary: "#0071e3"
  support: "#4fb3ff"
```

角色解释：

- `canvas`：页面主背景或最大面积底色。
- `ink`：主文字、高对比前景、核心信息。
- `primary`：主强调色、CTA、active 状态。
- `support`：第二强调色、辅助视觉、信息蓝、插画高亮。

4 个 anchor 只是输入，不是完整 catalog source of truth。每个 palette 还必须声明由 anchor 推导或手工指定的运行态角色：

```yaml
derived_roles:
  surface: "#ffffff"
  muted: "#6b7280"
  focus: "#0071e3"
  disabled: "rgba(0, 0, 0, 0.32)"
  overlay: "rgba(0, 0, 0, 0.42)"
  danger: "#d92d2d"
  warning: "#a86600"
  success: "#2aa7b8"
```

这些角色用于避免 agent 在实现时临时发明 grays、disabled、focus ring、overlay 或 status colors。

## 4. Radix-Inspired 衍生色阶

对 `primary`、`support` 等 chromatic anchor，可以通过 Radix-inspired 的 12-step 规则生成角色色阶。

建议语义：

```text
1-2   backgrounds
3-5   component backgrounds, hover, selected
6-8   borders, focus rings, stronger separators
9-10  solid action backgrounds and solid hover
11-12 text on subtle backgrounds
```

Dig 不直接暴露 Radix 命名，而是保留 Dig 语义 token：

```css
--dig-primary-1 ... --dig-primary-12
--dig-support-1 ... --dig-support-12
--dig-neutral-1 ... --dig-neutral-12

--dig-accent: var(--dig-primary-9);
--dig-accent-strong: var(--dig-primary-10);
--dig-accent-2: var(--dig-support-9);
--dig-accent-2-strong: var(--dig-support-10);
```

### 4.1 分阶段生成策略

为了避免不同 agent 根据同一组 anchor 生成出不同色阶，v1 不做自动生成器。

v1 采用：

```text
manual curated stops only
```

也就是说，`palette01.md` 必须显式写出每个被使用的 scale stop 和 semantic token mapping。可以声明它遵循 Radix-inspired 角色，但不能只写“自动生成”。

v2 才引入 deterministic generator。生成器落地前必须明确：

- 色彩空间：优先 OKLCH，或明确使用 `@radix-ui/colors` 中既有 scale。
- 输入：4 个 anchor color，以及 dark / light profile 的 canvas 和 ink。
- 输出：primary / support / neutral scale，以及 Dig semantic token mapping。
- 对比度阈值：正文文字至少 4.5:1，大号文字至少 3:1，关键 UI 边界和 focus ring 至少 3:1。
- 覆写规则：人工 curated stop 优先于生成结果，但必须写明原因。

如果某个 curated palette 只有 4 到 7 个可靠色值，也可以先不用强行生成完整 12 阶；但必须声明每个色值对应的 UI 角色，并明确缺失的 scale stop 不可被 agent 自行推断。

## 5. Site Palette Roles

Palette catalog 必须声明整站角色色，而不只是列 hex。

建议结构：

```yaml
site_roles:
  page_background: "{anchors.canvas}"
  headline: "{anchors.ink}"
  body_text: "{anchors.ink}"
  muted_text: "derived"
  cta_background: "{anchors.primary}"
  cta_text: "contrast"
  card_background: "derived"
  card_text: "{anchors.ink}"
  link: "{anchors.primary}"
  illustration_highlight: "{anchors.support}"
  focus_ring: "derived_roles.focus"
  disabled_text: "derived_roles.disabled"
  overlay: "derived_roles.overlay"
```

这层的目标是让 agent 能直接判断：

- 背景用哪一个颜色
- 文字用哪一个颜色
- CTA 用哪一个颜色
- 卡片和 surface 用哪一个颜色
- 插画、tag、link、highlight 用哪一个颜色

## 6. Dig Token Mapping

Catalog token contract 分为两层：

1. `brand_v1`：现有 brand catalog 继续遵守的兼容层。
2. `palette_v1`：palette catalog 必须遵守的增强层。

`palette_v1` 包含完整 Dig 语义 token：

```css
--dig-bg
--dig-bg-soft
--dig-surface
--dig-surface-strong
--dig-surface-elevated
--dig-text
--dig-text-muted
--dig-text-soft
--dig-accent
--dig-accent-strong
--dig-accent-2
--dig-accent-2-strong
--dig-border
--dig-border-strong
--dig-grid-line
--dig-control-bg
--dig-control-bg-hover
```

组件实现优先使用语义 token，而不是直接消费色阶 token。色阶 token 主要用于 palette 构建、插画、图表、局部 variant 和高级调试。

注意：当前 shared manifest 中的 required token roles 不能直接原地扩展为增强层，否则会让现有 brand catalog 批量进入失败状态。应先增加版本化或分层字段：

```yaml
token_contracts:
  brand_v1:
    required_token_roles:
      - --dig-bg
      - --dig-bg-soft
      - --dig-surface
      - --dig-surface-strong
      - --dig-surface-elevated
      - --dig-text
      - --dig-text-muted
      - --dig-text-soft
      - --dig-accent
      - --dig-accent-2
      - --dig-border
      - --dig-grid-line
      - --dig-control-bg
      - --dig-control-bg-hover
  palette_v1:
    extends: brand_v1
    required_token_roles:
      - --dig-accent-strong
      - --dig-accent-2-strong
      - --dig-border-strong
```

未来如果要把 brand catalog 升级到更强 token contract，应新增 `brand_v2` 和迁移计划，而不是让 palette 方案隐式扩大所有 catalog 的要求。

## 7. 文件组织建议

新增目录：

```text
references/catalogs/palettes/
  palette01.md
  palette01.en.md
  palette01.zh-CN.md
```

每个文件建议包含：

```yaml
slug: palette01
kind: color-palette-catalog
category: palettes
token_contract: palette_v1
status: draft
best_for:
  - dashboard
  - product workspace
  - developer tool
mood:
  - crisp
  - system-native
  - high-contrast
anchors:
  canvas: "#f7f7f7"
  ink: "#000000"
  primary: "#0071e3"
  support: "#4fb3ff"
derivation:
  method: manual-curated-stops
  inspiration: radix-inspired-role-scale
  generator: none
  generator_status: future
```

Frontmatter 规则：

- `category` 必须和文件所在目录一致：`references/catalogs/palettes/` 下只能是 `category: palettes`。
- 新建 palette catalog 必须显式声明 `token_contract: palette_v1`。Validator 可以在兼容期基于 `kind: color-palette-catalog` fallback 到 `palette_v1`，但 fallback 只能用于旧文件迁移提示，不能让新文件通过强校验。
- `kind` 负责表达 catalog 类型，`category` 负责表达目录和 render 分组，`token_contract` 负责选择 required token roles；三者不要互相替代。

正文补充：

- 适用场景
- 不适用场景
- site roles
- dark / light profile
- Dig token mapping
- accessibility notes
- render intent

双语规则：

- 如果 palette catalog 进入 `references/catalogs/palettes/`，必须和其他 catalog 一样维护 `.en.md` 与 `.zh-CN.md` 对应文件。
- render / validator 不应把 `palette01.md` 当成例外处理，否则本地语言包安装会出现不完整资产。

## 8. Render 方案

Palette catalog 的 render 不应只展示 token 表，而要展示整站角色色如何落位。

建议新增 palette render archetype：

```text
site-palette-showcase
```

在创建第一个 palette 文件前，必须先让 `sync_renders.py` 支持：

- `palettes` registry 分组在兼容期同时输出 `items` 和 `brands`：

  ```json
  {
    "palettes": {
      "name": "Color Palettes",
      "items": [],
      "brands": []
    }
  }
  ```

  `items` 是新语义；`brands` 是 legacy fallback，只为旧 render hub 兼容存在，不代表 palette 是 brand。Render hub 应优先读取 `items`，缺失时 fallback 到 `brands`。兼容期内如果 `items` 和 `brands` 同时存在但内容不一致，应以 `items` 为 source of truth，并在 validator 中报 warning；v2 再移除 legacy 字段。
- `site-palette-showcase` render archetype。
- 中心 render hub 里 palette 分组可见。
- 文案从纯 `brand` 语义逐步过渡为 `catalog item` 或 `entry`，避免 palette 被误称为 brand。

展示内容：

- hero / page background
- headline / body / muted text
- CTA / secondary action
- card / panel / input
- link / tag / highlight
- illustration or abstract accent block
- dark / light profile toggle

目标是让维护者能一眼判断这套 palette 是否像一个真实网站，而不是只看到孤立色块。

## 9. CLI / 工具化方向

第一阶段只做 schema、manifest、render registry 和 validator 契约。

但第一阶段不应创建 `palette01.md`。第一阶段的完成条件是 schema、manifest、render registry 和 validator 约束达成一致。

第二阶段可增加 CLI：

```bash
dig-ui-skill palette create palette01
dig-ui-skill palette render palette01
dig-ui-skill palette validate palette01
```

后续生成逻辑：

- 输入 4 个 anchor color
- 生成 primary / support / neutral scales
- 映射 Dig semantic token
- 检查 contrast
- 输出 catalog markdown
- 输出 render preview

## 10. 校验规则

Palette catalog 至少校验：

- frontmatter 是否显式声明 `kind: color-palette-catalog`、`category: palettes`、`token_contract: palette_v1`
- `category` 是否和文件目录、manifest 分类、render registry 分组一致
- 是否有 4 个 anchor：`canvas`、`ink`、`primary`、`support`
- 是否有 `derived_roles`：至少 `surface`、`muted`、`focus`、`disabled`、`overlay`
- 是否有 site roles
- 是否输出 required Dig token roles
- 文本 token 和背景 token 是否满足明确 contrast：正文至少 4.5:1，大字至少 3:1，focus ring / key border 至少 3:1
- 是否声明适用场景和不适用场景
- 是否避免与 brand catalog 混用
- 是否有 `.en.md` / `.zh-CN.md` 双语资产
- 是否注册在 shared catalog manifest
- 是否出现在 render registry 和 `renders/index.html`

Validator 扩展顺序：

1. 先扩展 `catalog-manifest.yaml` 为分层 token contract：保留 `brand_v1` 兼容层，新增 `palette_v1` 增强层。
2. Validator 按显式 `token_contract` 选择 required token roles；缺失时才按 `kind` 做兼容 fallback，并输出迁移提示。新建 palette 文件缺失 `token_contract` 应失败，不能用 palette 强约束直接校验旧 brand catalog。
3. 再新增 palette-specific schema 校验：anchors、derived roles、site roles、derivation mode。
4. 再校验 `category` 的一致性：frontmatter、目录、manifest 分类、render registry 分组必须都指向 `palettes`。
5. 最后新增 render 资产校验：`renders/palettes/<slug>.html` 是否存在，中心 index 是否可发现。

## 11. 与现有 Catalog 的关系

这套方案不改变现有 brand catalog。

现有 catalog 继续用于：

- 品牌 inspired 页面
- 行业 / 产品类型页面
- 明确设计语言复刻

palette catalog 用于：

- 用户只指定整体配色或 mood
- 需要快速探索视觉方向
- 不希望绑定某个品牌
- 需要一套可复用的站点配色模板

最终 `dig-ui-skill` 会拥有两个并行入口：

```text
brand-first catalog
palette-first catalog
```

二者共享 layout、block、global rules、token discipline 和 render ops，但 catalog 选择依据不同。

## 12. 下一步

建议按以下顺序推进：

1. 整理并确认本方案。
2. 对齐 shared manifest 的 token contract 分层：保留 `brand_v1`，新增 `palette_v1`，在 `palette_v1` 中补上 `--dig-accent-strong`、`--dig-accent-2-strong`、`--dig-border-strong` 等 palette 必需 token。
3. 新增 palette catalog schema 文档，明确 v1 是 manual curated stops，不启用自动生成。
4. 扩展 validator：先按 `kind` / `token_contract` 校验 manifest / token contract / 双语资产，再校验 palette-specific anchors 和 site roles。
5. 扩展 render registry：加入 `palettes` 分类和 `site-palette-showcase` archetype，并在兼容期同时输出 `items` 与 legacy `brands`。
6. 建立 `references/catalogs/palettes/`。
7. 手写第一个 `palette01.md`、`palette01.en.md`、`palette01.zh-CN.md`。
8. 同步 render preview 并验证 `renders/index.html` 可发现。
9. 再考虑 CLI 自动生成和 Radix scale 计算。
