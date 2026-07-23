---
name: dig-ui
description: Dig UI design system skill for product UI generation and review. Use when the user mentions dig-ui, dig-ui-skill, Dig UI, catalog/wise, catalog/dig, CSS token, layout recipe, block library, dashboard, runtime, marketing, docs, or frontend UI review. Read global-rules.md first, then local rules and local extensions when present.
---

# dig-ui

Dig UI is an AI-executable product interface design system. It combines `dig-read + workflow + layout + catalog + block + token + global/local rules + render ops` so agents can generate, review, and maintain consistent product UI.

## Reading Priority

1. Current user prompt
2. `references/local/palettes/` or `~/.config/dig-ui-skill/palettes/` when the user requests a local/custom palette
3. `references/local/styles/` or `~/.config/dig-ui-skill/styles/` when the user requests a local/custom style
4. `references/global-rules.local.md` when present
5. `references/local/` when present for project-level layout / block extensions
6. Installed-language `references/global-rules.md`
7. Installed-language `references/dig-read.md`, `references/anti-tells.md`, `references/preflight.md`, and `references/workflows/`
8. Installed-language `references/layouts/`, `references/catalogs/`, and `references/blocks/`
9. `references/shared/` manifests, tokens, and primitives

If the user explicitly says "no global rules", "skip global", or "do not use global", skip global rules and local global rules for this task. Layouts, catalogs, blocks, and primitives may still be used.

## Workflow

### 1. Output Dig Read

For page generation or UI review, first read `references/dig-read.md`, then state:

```text
<task type> page for <target user / job>,
using <layout> layout + <catalog> catalog.
```

Then provide four dials:

- `INFORMATION_DENSITY`
- `BRAND_EXPRESSIVENESS`
- `INTERACTION_ENERGY`
- `OPERATIONAL_CRITICALITY`

If the task clearly matches review, redesign, execution, or image-reference work, also read the matching workflow in `references/workflows/`.

### 2. Choose Layout

Read `references/layouts/README.md`, then the closest layout file. Layouts define information structure, slots, responsive order, and QA notes. They do not define brand color.

When `references/local/manifest.yaml` or `references/local/layouts/` exists, check whether a project-level layout applies first. Local layouts should use `extends` rather than silently copying official layouts.

### 3. Choose Catalog

Choose one catalog before writing CSS. User choice wins. If unspecified, infer from the layout `default_catalog` and `recommended_catalogs`.

Common catalogs:

- `dig`: default Dig product language
- `mono`: restrained, grayscale, dense debugging
- `editorial`: narrative, launch, brand expression
- `wise`: mobile-first consumer fintech
- `apple`: premium launch and system-native feel
- `paletteXX`: color-first palette catalog for overall site color composition, mood, or color combinations
- `style-catalog`: complete visual grammar for non-brand styles, screenshot-derived styles, material/shape/illustration/component-language requests, such as `cozy-arcade` and `quant-signal-console`
- `custompalette`: a user-local Palette Lab import stored under `~/.config/dig-ui-skill/palettes/` and optionally synced to `references/local/palettes/`; it belongs to the user and is not written into built-in catalogs
- `customstyle`: a user-local Style Lab import stored under `~/.config/dig-ui-skill/styles/` and optionally synced to `references/local/styles/`; it belongs to the user and is not written into built-in catalogs

Use brand catalogs when the user names a brand, product, or established visual language. Use palette catalogs when the user asks for mood, overall palette, or color composition. Use style catalogs when the user asks for a complete visual language that is not primarily a brand or color palette. Use customstyle when the user explicitly names a local style asset or asks to reuse a previously exported style. Do not mix multiple base catalogs in one page or coherent component group.

When using a built-in style catalog, read `references/catalogs/styles/README.md` before selecting the specific style. It routes by task, avoid boundary, and render archetype so a style is not chosen only for a similar color or headline mood.

### 4. Choose Blocks

When common components or product modules are involved, read `references/blocks/README.md` and relevant block files. Prefer block protocols over inventing repeated local structures.

Common blocks:

- primitive: button, input, select, form-row, toast, modal, tooltip, tabs
- product: table-toolbar, runtime-log-stream, run-status-header, step-timeline, settings-row, empty-state, notification-item, search-result-row

When `references/local/blocks/` exists, check whether a project-level block applies first.

### 5. Apply Tokens / Primitives / Global Rules

Before component styling, define tokens, font, type scale, spacing, radius, shadow, and background/grid behavior. Component styles reference `--dig-*` tokens or project theme variables, avoiding hard-coded dark/light hex values.

### 6. Filter Anti-Tells

Before delivery, read `references/anti-tells.md` and remove common AI UI tells, especially:

- generic purple-blue AI SaaS gradients
- every section inside a card
- runtime / execution pages turned into landing pages
- table / card / feed mixed for one business list
- glow used instead of real status hierarchy

### 7. Preflight And Render Ops

Before delivery, read `references/preflight.md`. If catalog or render-related assets changed, run or recommend:

```bash
dig-ui-skill render all
dig-ui-skill validate renders
```

Render output is for catalog visual maintenance preview only. It is not a second source of truth. Layout and block assets remain Markdown contracts. When render and Markdown conflict, Markdown / manifest wins.

## Runtime Naming Boundary

`runtime` has historically meant both page type and visual skin. Prefer:

- `task_type: execution` for run, debugging, and observability tasks
- `catalog: runtime` only if a future runtime visual skin is formalized

Keep legacy `page_type: runtime` only for compatibility with existing layouts and historical assets.
