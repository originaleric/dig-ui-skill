# Dig UI Skill

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](./LICENSE)
[![npm package](https://img.shields.io/badge/npm-dig--ui--skill-red.svg)](https://www.npmjs.com/package/dig-ui-skill)

> Prompt-as-code design system assets for Codex, Cursor, and Claude Code.

Dig UI Skill is an AI-first design system packaged as structured Markdown, static HTML previews, and a small installer CLI. Instead of shipping a conventional component library, it gives AI coding agents the design rules, layout recipes, token contracts, and visual references they need to generate consistent product UI.

[中文文档](./README.zh-CN.md) · [Installation](./INSTALL.md) · [Usage Guide](./USAGE.md)

## Why This Exists

AI agents are good at producing UI quickly, but they drift when a project does not give them a durable design language. Dig UI Skill makes that design language explicit:

- **Global rules** define cross-project behavior such as i18n, dark/light mode, control shape, layout/component consistency, select usage, and interaction discipline. The canonical rules are English-first, with a Chinese translation for review.
- **Dig Read** defines the agent's first reasoning pass: identify the task, choose layout/catalog/block assets, and set density, brand, interaction, and criticality dials before writing UI.
- **Catalogs** define visual taste through tokens, typography, surface rules, component mappings, color-first palette systems, and complete style grammars.
- **Layout recipes** define information architecture, slots, responsive order, and QA notes.
- **Blocks** define reusable primitive and product-module protocols such as inputs, modals, runtime log streams, table toolbars, notification items, search result rows, and settings rows.
- **Anti-tells, preflight, and workflows** keep common AI UI drift out of generated surfaces and make review/redesign/execution tasks repeatable.
- **Rendered previews** give humans a fast way to inspect catalog visual language before using it in production code.
- **Local extensions** let projects add their own layouts, blocks, palettes, and styles through `references/local/` without forking the official assets.
- **CLI installers** keep the same skill synchronized across Codex, Cursor, and Claude Code.

## What's Included

- 76 catalog previews across AI, SaaS, fintech, dev tools, DevOps, creative tools, commerce, media, automotive, Dig-native styles, color palette catalogs, and style catalogs.
- 20 layout recipes for dashboards, docs, runtime consoles, tables, settings forms, onboarding, pricing, search, auth, and marketing pages.
- Static catalog preview hub at `renders/index.html`.
- Color palette catalog support through `references/catalogs/palettes/`, starting with `palette01`.
- Palette Lab in palette renders for trying anchor colors, exporting a ZIP with JSON + HTML, and importing user-owned custom palettes into `~/.config/dig-ui-skill/palettes/`.
- Style catalog support through `references/catalogs/styles/`, starting with `cozy-arcade` and `quant-signal-console`.
- Style Lab in style renders for exporting a complete `Style Contract`, render archetype, and `--dig-*` tokens as user-owned custom styles in `~/.config/dig-ui-skill/styles/`.
- Layout and block assets are Markdown contracts, maintained in `references/layouts/` and `references/blocks/`.
- Dig Read and product dials adapted from taste-skill style execution discipline: `references/dig-read.md`.
- Dig anti-pattern filters, preflight gate, and workflow playbooks: `references/anti-tells.md`, `references/preflight.md`, and `references/workflows/`.
- Render ops validation via `npm run validate:renders`.
- Optional local rule synchronization through `~/.config/dig-ui-skill/global-rules.local.md`.
- Optional user palette/style synchronization through `~/.config/dig-ui-skill/palettes/` and `~/.config/dig-ui-skill/styles/`.

## Highlight: Personal Rules Through Your AI Agent

Dig UI lets users teach their IDE agent long-term UI preferences without configuring another AI API key. Ask Codex, Cursor, or Claude Code to update your local global rules:

```text
Use dig-ui. Add this to my local global rules:
Header stays compact and sticky, with language switcher, theme switcher, and user menu on the right.
```

The agent reads `references/local-rules-builder.md`, writes `~/.config/dig-ui-skill/global-rules.local.md`, then syncs it across installed tools. CLI helpers are available for mechanical writes:

```bash
npx dig-ui-skill local add --section "Header / Topbar" "Header stays compact and sticky."
```

## Quick Start

Install the skill into one AI tool:

```bash
npx dig-ui-skill install codex
npx dig-ui-skill install cursor
npx dig-ui-skill install claude-code
```

Choose the installed language:

```bash
npx dig-ui-skill install codex --lang zh-CN
npx dig-ui-skill install codex --lang en
```

Install it everywhere:

```bash
npx dig-ui-skill install --all
npx dig-ui-skill status
```

Import a custom palette exported from Palette Lab:

```bash
npx dig-ui-skill palette import ~/Downloads/palette01.custompalette-20260710-120000.zip codex
npx dig-ui-skill palette list
npx dig-ui-skill palette sync --all
```

Import a custom style exported from Style Lab:

```bash
npx dig-ui-skill style import ~/Downloads/quant-signal-console.customstyle-20260712-120000.zip codex
npx dig-ui-skill style list
npx dig-ui-skill style sync --all
```

## Use In Your AI Tool

### Codex

Install:

```bash
npx dig-ui-skill install codex
```

Then open a new Codex session in any project and ask for Dig UI explicitly:

```text
Use the dig-ui skill. Review this page against the Dig catalog and the dashboard-overview layout.
```

Update later:

```bash
npx dig-ui-skill update codex
```

### Cursor

Install the personal skill:

```bash
npx dig-ui-skill install cursor
```

For a repository where you want more reliable activation, also install the project rule:

```bash
npx dig-ui-skill install cursor --project /path/to/your/repo
```

Then ask Cursor to use Dig UI:

```text
Use Dig UI. Apply references/layouts/settings-form.md and references/catalogs/other/dig.md to this screen.
```

Update later:

```bash
npx dig-ui-skill update cursor
```

### Claude Code

Install:

```bash
npx dig-ui-skill install claude-code
# alias
npx dig-ui-skill install claude
```

Then trigger it with `/dig-ui` if available, or by natural language:

```text
Use Dig UI to refactor this UI. Start from the runtime-console layout and apply the mono catalog.
```

Update later:

```bash
npx dig-ui-skill update claude-code
```

Use the local repository as the source while developing:

```bash
node bin/dig-ui-skill.mjs install cursor --source .
node bin/dig-ui-skill.mjs install --all --source .
```

## Daily Workflow

Start with Dig Read:

```text
references/dig-read.md
```

Use it to identify the task type, target user/job, likely layout, catalog, and dials:

```text
execution page for engineers debugging an agent run,
using agent-run-detail layout + mono catalog.

INFORMATION_DENSITY: 8
BRAND_EXPRESSIVENESS: 3
INTERACTION_ENERGY: 6
OPERATIONAL_CRITICALITY: 9
```

Then choose a layout recipe:

```text
references/layouts/dashboard-overview.md
```

Then choose a catalog:

```text
references/catalogs/other/dig.md
references/catalogs/other/mono.md
references/catalogs/fintech/wise.md
references/catalogs/media-consumer/apple.md
```

Ask your AI coding agent to combine them:

```text
Use references/dig-read.md first.
Use references/layouts/dashboard-overview.md for structure.
Apply references/catalogs/other/dig.md for visual language.
Use references/anti-tells.md and references/preflight.md before delivery.
Keep copy in i18n dictionaries, support dark/light mode, and use tokenized controls.
```

Sync catalog render ops views after changing catalogs:

```bash
dig-ui-skill render all
dig-ui-skill validate renders
```

## Repository Structure

```text
dig-ui-skill/
├── SKILL.md                         # Skill entry used by Codex-compatible tools
├── references/
│   ├── global-rules.md              # Cross-catalog behavior rules
│   ├── global-rules.zh-CN.md        # Chinese translation of global rules
│   ├── global-rules.local.example.md
│   ├── dig-read.md                  # Agent task framing and Dig product dials
│   ├── tokens.md                    # Shared token contract
│   ├── primitives.md                # Base layout and interaction rules
│   ├── shared/                      # Stable manifests for layouts, catalogs, and blocks
│   ├── workflows/                   # Repeatable agent workflows
│   ├── blocks/                      # Block library; source keeps .en.md / .zh-CN.md siblings
│   ├── local/                       # Project-level layout/block extensions and synced user palettes/styles
│   ├── anti-tells.md                # Installed-language Dig anti-pattern filters
│   ├── preflight.md                 # Installed-language delivery gate
│   ├── catalogs/                    # Visual catalogs; source keeps .en.md / .zh-CN.md siblings
│   └── layouts/                     # Layout recipes; source keeps .en.md / .zh-CN.md siblings
├── renders/                         # Catalog preview output
├── assets/                          # Catalog preview CSS and Dig visual assets
├── adapters/                        # Tool-specific adapters
├── agents/                          # Agent metadata
├── bin/dig-ui-skill.mjs             # Installer and sync CLI
├── sync-renders.sh                  # Render synchronization entry point
├── sync_renders.py                  # Catalog preview compiler
├── validate-dig-catalog-preview.mjs # Catalog QA validator
└── validate-dig-render-ops.mjs      # Render ops and parity validator
```

## Render Ops And Local Extensions

Render ops has one maintenance view:

```text
renders/index.html          # catalog hub
```

Layout and block assets are reviewed through their Markdown contracts, manifests, and QA notes instead of generated HTML pages. Project-specific assets live in `references/local/`. Prefer `extends` for local layouts and blocks, and put true replacements in `references/local/overrides/` with an owner and reason.

## Local Rules

Team defaults live in:

```text
references/global-rules.md
```

This English file is the canonical source. A Chinese translation is available at:

```text
references/global-rules.zh-CN.md
```

Personal overrides should live outside the repository:

```text
~/.config/dig-ui-skill/global-rules.local.md
```

Create and sync them with:

```bash
npx dig-ui-skill init-local
npx dig-ui-skill sync-local --all --from-config
```

Host agents can help write personal preferences without any extra API key. Ask Codex, Cursor, or Claude Code to use Dig UI and update your local global rules; the agent should read `references/local-rules-builder.md`, write `~/.config/dig-ui-skill/global-rules.local.md`, then sync it.

CLI helpers are also available:

```bash
npx dig-ui-skill local path
npx dig-ui-skill local show
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
```

The repository ignores `references/global-rules.local.md` so personal preferences do not leak into public releases.

## Development

Install dependencies:

```bash
npm install
```

Sync catalog previews:

```bash
./sync-renders.sh
```

Validate previews:

```bash
npm run validate:catalogs
npm run validate:renders
```

## Open Source Notes

The catalog files describe design-language references inspired by public product surfaces. Brand names, product names, logos, and trademarks belong to their respective owners. This project is not affiliated with, endorsed by, or sponsored by those companies.

If you contribute a new catalog, prefer descriptive design-system analysis over copied proprietary assets. Do not add private brand files, licensed fonts, screenshots, or confidential design tokens.

## License

Licensed under the [Apache License 2.0](./LICENSE).
