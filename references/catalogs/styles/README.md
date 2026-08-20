# Style Catalog Routing

Style catalogs are a third base-catalog line alongside brand catalogs and color palettes. Use exactly one when the request is led by an interface grammar, material language, component character, or non-brand visual direction. Do not combine a style catalog with a brand or palette as a second base system.

| Style | Choose when | Avoid when | Render archetype |
| --- | --- | --- | --- |
| `cozy-arcade` | mascot-led habit, fitness, kids, reward loop | enterprise or critical workflow | `mobile-game-companion` |
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

When several rows match, choose the one whose **avoid** boundary least conflicts with the task. If no row has a clear fit, use the layout's recommended brand catalog rather than forcing a style.

## Theme Contract

Every style catalog has `## Dig UI CSS Tokens` for light mode and `## Dig UI Dark Tokens` for dark mode. Both token maps are exported by Style Lab as `theme_tokens.light` and `theme_tokens.dark`. Legacy customstyles without `theme_tokens` remain importable, but must be upgraded before being used as a dual-theme source of truth.
