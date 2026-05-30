# Milestone 日志：动态 Token 渲染与 Python 编译引擎重构

## 📅 更新日期
2026-05-17 (中文：动态 Token 渲染与 Python 编译引擎重构)

---

## 🎯 里程碑概述

在将 71 套品牌设计系统成功全量导入并归类后，我们针对渲染页面的**视觉保真度**、**参数硬编码问题**以及**同步脚本的工程健壮性**进行了全方位的架构重构与深度优化。

本次更新打破了原有 HTML 中静态文字和色块参数的限制，实现了 **100% 动态运行时参数读取与品牌元信息提取**，并将底层的同步流水线全面升级为高吞吐、warning-free 的 **Python 编译内核 (`sync_renders.py`)**，打通了 `dig-ui` 从 Prompt-as-Code 字典到可视化渲染预览的完美闭环。

---

## 🛠 核心更新内容

### 1. 动态 Token 运行时渲染器 (Dynamic Token Visualizer)
*   **解耦硬编码色块**：将 HTML 中所有静态色块的 `style="background:#06121a"` 等内联背景样式全部替换为变量引用：
    *   `style="background: var(--dig-bg)"`
    *   `style="background: var(--dig-accent)"`
    *   `style="background: var(--dig-accent-2)"`
*   **原生 JS 运行时读取器**：在所有预览 HTML 中注入了微秒级的 `Dynamic Token Visualizer` JS 模块。页面加载时，自动调用 `getComputedStyle(document.documentElement)` 读取 `:root` 下由同步脚本写入的**真实编译 Token 值**。
*   **自动标签填充**：将颜色 swatch 的数值显示（如 `#06121A`）、Hero Meta 属性板（如 `Accent`、`Support`、`Body` 和 `Title` 大小与行高）、以及底部 Token 表格全部转换为带有 `data-token` 的动态节点，由 JS 在运行时自动填充，彻底消除了数据展示不一致的缺陷！

### 2. 品牌原厂描述与标题智能提取 (Original Brand Description & Name Compilation)
*   **提取 Frontmatter 描述**：Python 编译引擎能够智能解析每个品牌 Markdown 顶部的 YAML Frontmatter 结构，读取 `name` 和 `description` 元数据。
*   **动态正文写入**：自动将 HTML 中的 Hero 区内容编译更新为每个品牌专属的元信息：
    *   **标题 Eyebrow** 替换为 `{BrandName} Catalog / Dig UI`。
    *   **H1 主标题** 替换为 `{BrandName}`（如 `Intercom`）。
    *   **Description 段落** 替换为该品牌在 `.md` 文件中定义的最真实的原厂设计标准描述，方便设计师与 AI 直接获取开发背景！

### 3. 下一代高灵活性 Python 编译内核 (`sync_renders.py`)
*   **取代 Fragile Shell+Awk 脚本**：原有 `sync-renders.sh` 的 awk 替换机制在遇到复杂的字符转移或多行文本时易失效。我们用纯 Python 构建了全新的同步内核 `sync_renders.py`。
*   **智能路径深度校正**：由于 HTML 转移到了二级分类目录下，需要 `../../assets/` 路径才能正确引用 CSS。编译引擎会自动计算文件深度，完美重写 relative resource paths，彻底解决了静态页面打开时 CSS 丢失的问题。
*   **极致平滑的用户体验**：重构了 `sync-renders.sh` 入口，将指令无缝路由给 Python 内核执行，保证了命令行的使用习惯完全不变，零学习成本。
*   **Warning-Free 优化**：修复了 Python 内正则匹配 spacing 的 `FutureWarning` 隐患，达到了产品级高标准的纯净输出。

### 4. 史诗级毛玻璃暗黑模式导航中心 (`renders/index.html`)
*   **全自动数据整合**：开发了 `generate_index.py`，自动扫描 9 大分类目录下的 71 套品牌，编译出全新的 Hub 门户导航中心。
*   **专属强调色 Glow Hover 动效**：每个品牌卡片在 hover 时，会自动获取并在背景散发该品牌专属强调色（如 Stripe 的紫色、Claude 的暖色、Ferrari 的红色）的柔和光影，视觉效果震撼。
*   **实时模糊搜索 (Search) 与 分类标签切换 (Tabs)**：支持按分类实时筛选，并可按品牌名或关键词进行毫秒级模糊搜索。

---

## 📂 涉及改动文件

*   [`sync_renders.py`](file:///Users/dig/Documents/文稿%20-%20XinYe的MacBook%20Pro%20(5)/Projects/dig-dev/dig-ui-skill/sync_renders.py) — 【新增】核心编译同步引擎。
*   [`sync-renders.sh`](file:///Users/dig/Documents/文稿%20-%20XinYe的MacBook%20Pro%20(5)/Projects/dig-dev/dig-ui-skill/sync-renders.sh) — 【重构】入口包装脚本。
*   [`renders/index.html`](file:///Users/dig/Documents/文稿%20-%20XinYe的MacBook%20Pro%20(5)/Projects/dig-dev/dig-ui-skill/renders/index.html) — 【重构】极具视觉冲击力的导航 Hub 首页。
*   `renders/<category>/*.html` — 【升级】全量 71 套预览 HTML：注入运行时 JS，绑定动态 Swatches，写入原厂 description 并修正 CSS 引用路径。
*   [`README.md`](file:///Users/dig/Documents/文稿%20-%20XinYe的MacBook%20Pro%20(5)/Projects/dig-dev/dig-ui-skill/README.md) — 【更新】同步 71 套模版及全新编译内核的使用说明。
*   [`USAGE.md`](file:///Users/dig/Documents/文稿%20-%20XinYe的MacBook%20Pro%20(5)/Projects/dig-dev/dig-ui-skill/USAGE.md) — 【更新】补充动态 Token 规范及 Python 自动化编译 SOP。
