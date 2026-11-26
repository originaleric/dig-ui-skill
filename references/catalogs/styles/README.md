# Style Catalog Routing

Style catalogs are a third base-catalog line alongside brand catalogs and color palettes. Use exactly one when the request is led by an interface grammar, material language, component character, or non-brand visual direction. Do not combine a style catalog with a brand or palette as a second base system.

“Paper infographic,” `paper-infographic`, and “纸面图解” select **Paper Infographic** directly. This child of **Cozy Arcade** keeps its outlined shapes and pill controls and uses graph paper, annotations, and gold accents for explainers. Pick Cozy Arcade for character-led tasks and rewards, and Paper Infographic for rules, tutorials, and process explanations across games and other products. Each is a complete style you can use on its own. [Cozy Arcade](./cozy-arcade.md) · [Paper Infographic](./paper-infographic.md)

用户说「用 paper infographic 效果」或「用纸面图解风格」时，直接选用**纸面图解**。它承接**软萌街机**的描边和药丸控件，用方格稿纸、批注和金黄强调组织信息。角色任务和奖励页选软萌街机，玩法教学、规则图解和产品流程说明选纸面图解。两者均可独立用作页面的基础风格。[软萌街机](./cozy-arcade.md) · [纸面图解](./paper-infographic.md)

“Liquid Glass” or 「液态玻璃」 selects the top-level [Liquid Glass style](./liquid-glass.md) for glass controls. Requests for Apple brand or product presentation select the [Apple catalog](../media-consumer/apple.md).

| Style | Choose when | Avoid when | Render archetype |
| --- | --- | --- | --- |
| `cozy-arcade` | mascot-led habit, fitness, kids, reward loop | enterprise or critical workflow | `mobile-game-companion` |
| `paper-infographic` · 纸面图解 | visual explainers, process summaries, information cards and short reports | mascot-led rewards or dense operational consoles | `token-sheet` |
| [`liquid-glass` · 液态玻璃](./liquid-glass.md) | liquid glass, bottom navigation and floating tools for content browsing | dense forms, data tables or critical confirmations | `token-sheet` |
| `brick-builder` | learning path, project assembly, collaborative planning | regulated or dense operational work | `builder-journey` |
| `strategy-report` | strategy, operating review, roadmap, business analysis | realtime trading or playful consumer flow | `strategy-workspace` |
| `research-lab` | experiments, scientific research, engineering analysis | casual social feed or ecommerce | `research-workbench` |
| `archive-dotmatrix` | knowledge base, AI notebook, personal archive | live execution or conversion marketing | `research-workbench` |
| `quant-signal-console` | realtime signals, trading, simulation, agent ops | low-density narrative landing | `signal-ops-console` |
| `concept-minimal` | one product thesis, focused onboarding, premium empty state | dense administration or multi-step operations | `editorial-story` |
| `semantic-translation` | a concept needs one interactive metaphor | task-heavy settings or critical operations | `editorial-story` |
| `business-editorial` | market intelligence, company research, trend narrative | medical or toy-like flow | `editorial-story` |
| `torn-editorial-collage` | creator, culture, community, event surface | forms, finance, or enterprise admin | `editorial-story` |
| `midcentury-noir` | premium service or design-forward product story | data-dense workspace | `editorial-story` |
| `cel-sci-fi` | experimental AI, developer education, launch narrative | persistent operational interface | `editorial-story` |
| `cyberpunk-neon` | experimental launch, creator culture, immersive product narrative | critical operations or dense data entry | `editorial-story` |
| `hologram-moire` | creative workspace, personal AI space, calm product exploration | high-density observability or destructive admin flow | `creative-canvas-workspace` |
| `monochrome` | simple black/white/gray products across workspaces, dashboards, libraries, settings, and focused pages | color-critical work or mandatory semantic color coding | `monochrome-workspace` |

When several rows match, choose the one whose **avoid** boundary least conflicts with the task. If no row has a clear fit, use the layout's recommended brand catalog rather than forcing a style.

## Theme Contract

Every published style catalog has `## Dig UI CSS Tokens` for light mode and `## Dig UI Dark Tokens` for dark mode. Both effective maps are exported by Style Lab as `theme_tokens.light` and `theme_tokens.dark`. Exported customstyles are independent snapshots. Legacy customstyles without `theme_tokens` remain importable, but must be upgraded before being used as a dual-theme source of truth.

Child styles have their own preview, Style Lab and exports. Their published Markdown contains the complete style and records its parent in `derived_from`. See [Render Ops](../../render-ops.md#style-render-integrity) for the single-parent authoring convention.

父子风格都有独立预览、Style Lab 和导出。子风格发布文件含完整主题和合约，`derived_from` 记录来源，导出的个人样式保存当时的值。编写单层子风格时参阅 [Render Ops](../../render-ops.md#style-render-integrity)。
