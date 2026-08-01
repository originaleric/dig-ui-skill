# Dig UI Skill Usage Guide

[中文](./USAGE.zh-CN.md) · [English README](./README.md) · [Installation](./INSTALL.md)

This guide explains how to use and maintain Dig UI Skill as an agent-readable product UI design system. Markdown assets are the source of truth; HTML under `renders/` is used for catalog preview and visual maintenance.

## The Core Model

Dig UI follows a deliberate chain. It keeps product structure, visual language, reusable behavior, and delivery checks separate so an agent can reason about them without treating a screenshot as the specification.

```text
Dig Read -> Layout -> Catalog -> Blocks -> Anti-Tells -> Preflight
```

| Layer | What it decides | Source |
| --- | --- | --- |
| Dig Read | Task framing, candidate assets, and product dials. | `references/dig-read.md` |
| Layout | Information architecture, slots, responsive order, and QA. | `references/layouts/` |
| Catalog | Tokens, typography, surfaces, components, density, and tone. | `references/catalogs/` |
| Blocks | Reusable primitive and product-module behavior. | `references/blocks/` |
| Workflows | Repeatable review, redesign, execution, and image-reference processes. | `references/workflows/` |
| Anti-Tells / Preflight | AI UI drift filtering and delivery gates. | `references/anti-tells.md`, `references/preflight.md` |

Use this prompt as a starting point:

```text
Use Dig UI. First frame the task with references/dig-read.md, then choose a layout,
one catalog, and any relevant blocks. Check references/anti-tells.md and
references/preflight.md before delivery.
```

## Choosing A Visual System

Choose one base visual system per page or component group. Catalog, Palette, and Style are three ways into the same catalog system: use the entry that best matches the source of the visual decision, and do not combine them as competing bases.

| Starting point | Choose | Example |
| --- | --- | --- |
| A known product or mature brand language | Catalog | `references/catalogs/fintech/wise.md` |
| Color, mood, anchors, or palette relationships | Palette | `references/catalogs/palettes/palette01.md` |
| A full non-brand visual grammar or reference style | Style | `references/catalogs/styles/quant-signal-console.md` |
| An exported personal asset | Custom palette or custom style | `references/local/palettes/`, `references/local/styles/` |

Before selecting an internal style, read [`references/catalogs/styles/README.md`](./references/catalogs/styles/README.md). It routes styles by appropriate task, avoid boundary, and render archetype.

### Palette

Palette catalogs are for color-first exploration. Palette Lab can export a user-owned asset that is imported into the configuration directory and then synced to installed tools.

```bash
npx dig-ui-skill palette import ~/Downloads/palette.custompalette.zip codex
npx dig-ui-skill palette list
npx dig-ui-skill palette sync --all
```

### Style

Style catalogs package the wider visual grammar: material, surface behavior, component tone, render archetype, and light/dark token maps. Style Lab exports them as `customstyle` assets.

```bash
npx dig-ui-skill style import ~/Downloads/style.customstyle.zip codex
npx dig-ui-skill style list
npx dig-ui-skill style sync --all
```

Both user-owned asset types remain outside this repository:

```text
~/.config/dig-ui-skill/palettes/
~/.config/dig-ui-skill/styles/
```

They are synced into an installed skill's `references/local/` directory, not written back to the built-in catalog set.

## Personal Customization

Teach the agent UI decisions you want to keep: layout, density, hierarchy, and interaction preferences can become user-owned rules without forking an official catalog or adding another AI API key.

```text
Use dig-ui. Add this to my local rules:
Dashboard toolbars keep filters left, primary actions right, and density compact by default.
```

Long-term personal UI preferences are stored outside the repository:

```text
~/.config/dig-ui-skill/global-rules.local.md
```

An agent follows `references/local-rules-builder.md` to route and write the preference. The CLI provides mechanical helpers:

```bash
npx dig-ui-skill init-local
npx dig-ui-skill local show
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
npx dig-ui-skill sync-local --all --from-config
```

The configuration directory is the source of truth. Installed copies are synchronized replicas and should not become project-wide defaults.

## Review And Redesign

For review tasks, preserve the business goal while checking visual and structural fit:

```text
Use Dig UI. Review this settings page with references/workflows/review.md,
references/layouts/settings-form.md, and references/catalogs/other/dig.md.
```

For redesign tasks, stabilize the structure first, then apply the visual system:

```text
Use Dig UI. Preserve the business meaning, align the page to dashboard-overview,
then apply the mono catalog and report the missing states before delivery.
```

Do not use a catalog to rewrite a layout's information architecture. Do not create an HTML render for a layout or block: those are Markdown contracts, while catalog render pages are previews.

## DigKit Bridge Runtime

The CLI can serve DigKit's file-based `ui.design` bridge protocol:

```bash
dig-ui-skill run --input-json input.json --output-json output.json
```

The result is a JSON envelope with `summary`, `task`, `catalog`, `layout`, `metadata`, optional `artifact_outputs`, and an optional `dig-ui-skill.apply_plan.v1`. Dig UI Skill produces the design response; DigKit owns artifact materialization, approval, workspace policy, idempotency, and file writes.

## Maintaining Catalogs

Catalog Markdown is canonical. A catalog should define frontmatter, a visual/semantic contract, and the required `--dig-*` tokens. Style catalogs must provide both `## Dig UI CSS Tokens` and `## Dig UI Dark Tokens`.

After changing catalog assets, regenerate and validate previews:

```bash
./sync-renders.sh
npm run validate:catalogs
npm run validate:renders
```

`validate:renders` also checks language parity, layout/block Markdown contracts, catalog preview switching, and style dual-theme/export contracts.

## Layouts And Blocks

Layouts express page-level structure. Blocks express reusable UI behavior. Treat them as different layers:

- A layout defines slots, grid, hierarchy, responsive order, and QA notes.
- A block defines states, accessibility, responsive behavior, and implementation boundaries for a repeated UI unit.
- A catalog defines visual tokens and component tone, but does not change the layout's information architecture.

When adding a layout or block, update its library index and keep all required language variants and manifest fields in sync. Run `npm run validate:renders` before delivery.

## Development Install

Use the repository as an installation source while developing:

```bash
node bin/dig-ui-skill.mjs install cursor --source .
node bin/dig-ui-skill.mjs install --all --source .
```

Use `--link` for a local development symlink. See the [installation guide](./INSTALL.md) for every option and the [Chinese usage guide](./USAGE.zh-CN.md) for the detailed Chinese maintenance SOP.
