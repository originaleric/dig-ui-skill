# Dig UI Catalog System

## Overview

`dig-ui` uses catalog-level visual languages. Before writing CSS, choose one catalog, then emit tokens and styles from that catalog's rules.

| Catalog | Best for | Character |
|---|---|---|
| `dig` | Product homepages, runtime views, dashboards, consoles | Engineered, stateful, modern |
| `mono` | Docs, placeholders, experiments, minimal pages | Restrained, grayscale, terminal-adjacent |
| `editorial` | Launch pages, narrative pages, brand expression | Authored, refined, serif-accented |
| `wise` | Mobile-first fintech, payments, accounts, invite flows | Acid green, rounded, translucent, trustworthy |
| `apple` | Premium product launches, system feature pages, app previews, device-linked experiences | Content-first, light-transmissive, system-aware, quietly premium |

## Selection Order

When unsure, choose in this order:

1. `dig`
2. `mono`
3. `editorial`
4. `wise`: only when the page clearly needs consumer fintech, wallet, or mobile-app behavior.
5. `apple`: only when the page clearly needs Apple-like product theater, liquid glass, system integrity, or premium product-launch lighting.

## Rules

- Use only one base catalog within the same page or same component group.
- Do not mix colors from one catalog with the typography system from another catalog.
- First-line implementations should start from the hard-coded tokens and style language in the selected catalog file.
- When extending a catalog, preserve its structure and semantics first, then add local changes.

## Color Palette Catalog

In addition to brand- or product-language catalogs, `dig-ui` supports palette catalogs driven by whole-site color direction, such as `palette01` and `palette02`.

Palette catalogs do not conflict with brand catalogs. They are useful when the user has not specified a brand but has specified an overall palette, color system, or visual mood. Each palette starts from four main color anchors, such as `canvas`, `ink`, `primary`, and `support`, then derives Dig tokens for backgrounds, hover states, borders, solid actions, text, and related roles using Radix-inspired scales.

New palette catalogs must live directly under `references/catalogs/palettes/` and declare this frontmatter:

```yaml
kind: color-palette-catalog
category: palettes
token_contract: palette_v1
```

`kind` identifies the file as a color catalog, `category` binds it to the catalog and render group, and `token_contract` binds it to required token roles. Do not rely on implicit inference to make a new palette pass validation.

Palette files must be placed directly under `references/catalogs/palettes/`, without subdirectories. The filename, frontmatter `slug`, render URL, and registry slug must match exactly and use a two-digit-or-greater `paletteNN` form, such as `palette01.md` with `slug: palette01`.

The official color facts for a palette must live in the fenced YAML block under `## Palette Contract`; the validator reads only this canonical block and does not treat other examples as source-of-truth configuration. CSS tokens must live in the fenced CSS block under `## Dig UI CSS Tokens`.

Palette renders provide a Palette Lab for temporarily tuning anchor colors, selecting candidate support colors, and copying updated tokens. This interaction changes only CSS variables on the current preview page; it does not write back to Markdown automatically. After accepting a change, update both the Palette Contract and CSS tokens manually.

See [../color-palette-catalogs.md](../color-palette-catalogs.md) for the detailed rules.

## Style Catalog

In addition to brand catalogs and color palette catalogs, `dig-ui` supports style catalogs driven by a complete visual grammar, such as `cozy-arcade` and `quant-signal-console`.

Style catalogs fit requests that specify a screenshot style, non-brand style, material language, shape language, illustration style, or component character. They answer not only which colors to use, but also how shape, stroke, surface, illustration, motion, component mapping, and fit/avoid criteria should work.

Before choosing a built-in style, read [styles/README.md](./styles/README.md). It routes all styles by task, avoid boundary, and preview archetype; choose one style catalog as the base visual system for a task.

New style catalogs must live in `references/catalogs/styles/` and declare this frontmatter:

```yaml
kind: style-catalog
category: styles
token_contract: style_v1
```

The official style facts must live in the fenced YAML block under `## Style Contract`. At minimum, cover `best_for`, `avoid_for`, `mood`, `shape_language`, `surface_language`, `illustration_language`, `component_mapping`, and `motion_language`. Light CSS tokens live under `## Dig UI CSS Tokens`; dark CSS tokens live under `## Dig UI Dark Tokens`. Both modes must cover the core surface, text, border, control, and semantic-state roles.

Style catalogs must explicitly declare `render.archetype`. When no dedicated sample exists yet, use the neutral `token-sheet`; do not let one style silently inherit another style's industry sample.

When a style uses a dedicated render archetype, such as `mobile-game-companion` or `signal-ops-console`, that archetype's scene colors, mascot colors, mission card colors, gear-slot colors, signal colors, order-book colors, topology node colors, and related roles must come from catalog tokens. Shared CSS should provide structure and token fallbacks only; it must not carry private visual facts for one style.

Style renders provide a Style Lab export action. It packages the current `Style Contract`, `render.archetype`, visible `--dig-*` tokens, and both `theme_tokens.light` / `theme_tokens.dark` maps into a `dig.style.export.v1` `customstyle` asset. Import exported styles with `dig-ui-skill style import <file>` into `~/.config/dig-ui-skill/styles/`, then sync them with `dig-ui-skill style sync <target|--all>` into `references/local/styles/`. A `customstyle` belongs to the user; it is not written back to `references/catalogs/styles/` and does not become part of the built-in manifest. Legacy assets without `theme_tokens` remain importable for compatibility, but cannot act as a dual-theme source of truth.

## Render Intent

Catalog renders read CSS tokens by default and choose a sample type from the catalog category when possible. For important catalogs, declare an explicit `render` configuration so the preview shows the intended industry and component semantics instead of only a generic token sheet.

Example:

```yaml
render:
  archetype: command-palette-marketing
  page_type: dev-tools
  density: spacious
  canvas: dark-continuous
```

Currently supported `archetype` values:

- `command-palette-marketing`: Developer tools, command palettes, extension marketplaces, keyboard-first experiences.
- `media-player-shell`: Media consumption apps, playback queues, content cards, bottom playback controls.
- `creative-canvas-workspace`: Design and creation tools, canvas, layers, toolbars, collaboration states.
- `commerce-dual-track`: Ecommerce and retail, showing both a marketing hero and transaction cards.
- `inbox-productivity`: Inbox, team collaboration, productivity SaaS, high-frequency lists and reading panes.
- `finance-mobile-app`: Mobile-first finance, balances, transfers, exchange rates, card controls.
- `site-palette-showcase`: Default palette-catalog sample, showing site background, text, CTA, cards, links, and supporting accents.
- `mobile-game-companion`: Gamified mobile apps, mascot stages, mission cards, gear selection, reward chips, and bottom primary actions.
- `signal-ops-console`: Dense realtime signal consoles, showing metric tapes, agent pipelines, topology maps, order books, and micro charts across paper-light and terminal-dark modes.
- `strategy-workspace`: Strategy recommendations, evidence matrices, owners, and review checkpoints.
- `research-workbench`: Samples, methods, evidence, and interpretation in a research workspace.
- `builder-journey`: Modular learning, construction, and collaboration paths.
- `editorial-story`: A narrative product page with one thesis, one supporting signal, and one clear action.
- `token-sheet`: Default fallback that shows only the generic token sample.

When adding a catalog with a clear industry scenario, prefer declaring `render.archetype`. If there is no clear scenario yet, keep the fallback.
