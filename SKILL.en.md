---
name: dig-ui
description: Dig UI design system skill for product UI generation and review. Use when the user mentions dig-ui, dig-ui-skill, Dig UI, catalog/wise, catalog/dig, CSS token, layout recipe, block library, dashboard, runtime, marketing, docs, or frontend UI review. Read global-rules.md first, then local rules and local extensions when present.
---

# dig-ui

Dig UI is an AI-executable product interface design system. It combines `dig-read + workflow + layout + catalog + block + token + global/local rules + render ops` so agents can generate, review, and maintain consistent product UI.

## Reading Priority

1. Current user prompt
2. `references/global-rules.local.md` when present
3. `references/local/` when present for project-level layout / block extensions
4. Installed-language `references/global-rules.md`
5. Installed-language `references/dig-read.md`, `references/anti-tells.md`, `references/preflight.md`, and `references/workflows/`
6. Installed-language `references/layouts/`, `references/catalogs/`, and `references/blocks/`
7. `references/shared/` manifests, tokens, and primitives

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

Do not mix multiple base catalogs in one page or coherent component group.

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

Before delivery, read `references/preflight.md`. If a catalog, layout, or block changed, run or recommend:

```bash
dig-ui-skill render all
dig-ui-skill validate renders
```

Render output is for maintenance preview only. It is not a second source of truth. When render and Markdown conflict, Markdown / manifest wins.

## Runtime Naming Boundary

`runtime` has historically meant both page type and visual skin. Prefer:

- `task_type: execution` for run, debugging, and observability tasks
- `catalog: runtime` only if a future runtime visual skin is formalized

Keep legacy `page_type: runtime` only for compatibility with existing layouts, renders, and validators.
