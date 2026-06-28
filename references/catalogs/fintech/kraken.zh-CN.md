## Dig UI CSS Tokens

```css
--dig-bg: #ffffff;
--dig-bg-soft: #f6f7fb;
--dig-surface: #ffffff;
--dig-surface-strong: #f5f3ff;
--dig-surface-elevated: #ffffff;
--dig-text: #101114;
--dig-text-muted: #686b82;
--dig-text-soft: #9497a9;
--dig-accent: #7132f5;
--dig-accent-strong: #7132f5;
--dig-accent-2: #7132f5;
--dig-accent-2-strong: #7132f5;
--dig-border: #5b1ecf;
--dig-border-strong: #5b1ecf;
--dig-grid-line: #5b1ecf;
--dig-success: #37d67a;
--dig-warning: #f3b64c;
--dig-danger: #f06a6a;
--dig-info: #7132f5;

--dig-font-sans: "Inter", sans-serif;
--dig-font-mono: monospace;
--dig-font-serif: serif;

--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 20px;
--dig-text-2xl: 24px;
--dig-text-3xl: 32px;
--dig-text-4xl: 40px;
--dig-text-5xl: 56px;

--dig-radius-sm: 6px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 16px;
--dig-radius-pill: 9999px;

--dig-space-1: 4px;
--dig-space-2: 8px;
--dig-space-3: 12px;
--dig-space-4: 16px;
--dig-space-5: 24px;
--dig-space-6: 32px;
--dig-space-7: 48px;
--dig-space-8: 64px;

--dig-stroke-thin: 1px;
--dig-stroke-strong: 1.5px;
--dig-shadow-soft: 0 18px 48px rgba(0, 0, 0, 0.24);
--dig-shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.3);
--dig-leading-tight: 1.15;
--dig-leading-snug: 1.3;
--dig-leading-normal: 1.55;
--dig-leading-relaxed: 1.72;
--dig-tracking-tight: -0.03em;
--dig-tracking-normal: 0;
--dig-tracking-wide: 0.08em;
```

# Design System Inspired by Kraken

## 1. Visual Theme & Atmosphere

Kraken 的网站是一个干净、值得信赖的加密货币交易所，使用紫色作为其主导品牌颜色。该设计在白色背景上运行，并使用 Kraken Purple（“#7132f5”、“#5741d8”、“#5b1ecf”）创建独特、专业的加密身份。专有的 Kraken-Brand 字体以粗体 (700) 粗细和负跟踪处理显示标题，而 Kraken-Product（使用 IBM Plex Sans 后备）则充当 UI 主力。

**主要特征：**
- Kraken Purple (`#7132f5`) 作为主要品牌，具有深色变体 (`#5741d8`、`#5b1ecf`)
- Kraken-品牌（展示）+ Kraken-产品（UI）双字体系统
- 近乎黑色（`#101114`）文本，带有凉爽的蓝灰色中性比例
- 12px 半径按钮（圆形但不是丸状）
- 微妙的阴影 (`rgba(0,0,0,0.03) 0px 4px 24px`) — 耳语级别
- 绿色口音（`#149e61`）表示积极/成功状态## 2. Color Palette & Roles



### Primary
- **Kraken Purple** (`#7132f5`)：主要 CTA、品牌口音、链接
- **紫色深色** (`#5741d8`)：按钮边框，轮廓变体
- **深紫色** (`#5b1ecf`)：最深的紫色
- **Purple Subtle** (`rgba(133,91,251,0.16)`)：紫色 16% — 微妙的按钮背景
- **近黑色** (`#101114`)：主要文本### Neutral
- **冷灰色** (`#686b82`)：主要中性，边框不透明度为 24%
- **银蓝色** (`#9497a9`)：辅助文本，静音元素
- **白色** (`#ffffff`)：主表面
- **边框灰色** (`#dedee5`)：分隔线边框### 语义色
- **绿色** (`#149e61`)：徽章不透明度为 16% 时成功/积极
- **绿暗** (`#026b3f`)：徽章文本## 3. Typography Rules



### Font Families
- **显示**：`Kraken-Brand`，后备：`IBM Plex Sans、Helvetica、Arial`
- **UI / Body**：`Kraken-Product`，后备：`Helvetica Neue、Helvetica、Arial`### 字体层级
|角色 |字体|尺寸|重量 |行高|字母间距|
|------|------|------|--------|-------------|----------------|
|显示英雄 | Kraken-品牌| 48 像素 | 700 | 1.17 | 1.17 -1 像素 |
|章节标题 | Kraken-品牌| 36 像素 | 700 | 1.22 | 1.22 -0.5 像素 |
|副标题| Kraken-品牌| 28 像素 | 700 | 1.29 | 1.29 -0.5 像素 |
|专题标题 | Kraken-产品 | 22 像素 | 600 | 1.20 | 1.20正常 |
|身体| Kraken-产品 | 16 像素 | 400 | 1.38 | 1.38正常 |
|身体中等| Kraken-产品 | 16 像素 | 500 | 500 1.38 | 1.38正常 |
|按钮| Kraken-产品 | 16 像素 | 500–600 | 1.38 | 1.38正常 |
|标题| Kraken-产品 | 14 像素 | 400–700 | 1.43–1.71 |正常 |
|小| Kraken-产品 | 12 像素 | 400–500 | 1.33 | 1.33正常 |
|微| Kraken-产品 | 7 像素 | 500 | 500 1.00 |大写|## 4. Component Stylings



### 按钮设计
**原色紫色**
- 背景：`#7132f5`
- 文本：`#ffffff`
- 内边距：13 像素 16 像素
- 半径：12px

**紫色轮廓**
- 背景：`#ffffff`
- 文本：`#5741d8`
- 边框：`1px 实线 #5741d8`
- 半径：12px

**紫色微妙**
- 背景：`rgba(133,91,251,0.16)`
- 文本：`#7132f5`
- 内边距：8px
- 半径：12px

**白色按钮**
- 背景：`#ffffff`
- 文本：`#101114`
- 半径：10px
- 阴影：`rgba(0,0,0,0.03) 0px 4px 24px`

**二级灰色**
- 背景：`rgba(148,151,169,0.08)`
- 文本：`#101114`
- 半径：12px### Badges
- 成功：`rgba(20,158,97,0.16)`背景，`#026b3f`文本，6px半径
- 中性：`rgba(104,107,130,0.12)` bg，`#484b5e`文本，8px半径## 5. Layout Principles



### Spacing: 1px, 2px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 13px, 15px, 16px, 20px, 24px, 25px

### Border Radius: 3px, 6px, 8px, 10px, 12px, 16px, 9999px, 50%


## 6. Depth & Elevation

- 微妙：`rgba(0,0,0,0.03) 0px 4px 24px`
- 微：`rgba(16,24,40,0.04) 0px 1px 4px`## 7. Do's and Don'ts



### 推荐事项
- 使用 Kraken Purple (#7132f5) 作为 CTA 和链接
- 对所有按钮应用 12px 半径
- 使用 Kraken-Brand 作为标题，使用 Kraken-Product 作为正文### 禁止事项
- 不要使用药丸按钮 - 12px 是按钮的最大半径
- 不要使用定义范围之外的其他紫色## 8. Responsive Behavior

断点：375px、425px、640px、768px、1024px、1280px、1536px## 9. Agent Prompt Guide



### Quick Color Reference
- 品牌：Kraken Purple (`#7132f5`)
- 深色变体：`#5741d8`
- 文本：近黑色 (`#101114`)
- 辅助文本：`#9497a9`
- 背景：白色（`#ffffff`）### Example Component Prompts
- “创建英雄：白色背景。Kraken-Brand 48px 粗细 700，字母间距 -1px。紫色 CTA（#7132f5，12px 半径，13px 16px 填充）。”
