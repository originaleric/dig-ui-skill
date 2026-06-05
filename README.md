# Dig UI Skill

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](./LICENSE)
[![npm package](https://img.shields.io/badge/npm-dig--ui--skill-red.svg)](https://www.npmjs.com/package/dig-ui-skill)

> Prompt-as-code design system assets for Codex, Cursor, and Claude Code.

Dig UI Skill is an AI-first design system packaged as structured Markdown, static HTML previews, and a small installer CLI. Instead of shipping a conventional component library, it gives AI coding agents the design rules, layout recipes, token contracts, and visual references they need to generate consistent product UI.

[中文文档](./README.zh-CN.md) · [Installation](./INSTALL.md) · [Usage Guide](./USAGE.md) · [React Loader](./react/README.md)

## Why This Exists

AI agents are good at producing UI quickly, but they drift when a project does not give them a durable design language. Dig UI Skill makes that design language explicit:

- **Global rules** define cross-project behavior such as i18n, dark/light mode, control shape, select usage, and interaction discipline.
- **Catalogs** define visual taste through tokens, typography, surface rules, and component mappings.
- **Layout recipes** define information architecture, slots, responsive order, and QA notes.
- **Rendered previews** give humans a fast way to inspect the design assets before using them in production code.
- **CLI installers** keep the same skill synchronized across Codex, Cursor, and Claude Code.

## What's Included

- 71 catalog references across AI, SaaS, fintech, dev tools, DevOps, creative tools, commerce, media, automotive, and Dig-native styles.
- 20 layout recipes for dashboards, docs, runtime consoles, tables, settings forms, onboarding, pricing, search, auth, and marketing pages.
- Static preview hub at `renders/index.html`.
- Layout preview hub at `renders/layouts/index.html`.
- Playwright-based layout validation via `npm run validate:layouts`.
- Optional local rule synchronization through `~/.config/dig-ui-skill/global-rules.local.md`.

## Quick Start

Install the skill into one AI tool:

```bash
npx dig-ui-skill install codex
npx dig-ui-skill install cursor
npx dig-ui-skill install claude-code
```

Install it everywhere:

```bash
npx dig-ui-skill install --all
npx dig-ui-skill status
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

Choose a layout recipe first:

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
Use references/layouts/dashboard-overview.md for structure.
Apply references/catalogs/other/dig.md for visual language.
Keep copy in i18n dictionaries, support dark/light mode, and use tokenized controls.
```

Validate layout previews after changing recipes:

```bash
./sync-renders.sh --layouts
npm run validate:layouts
```

## Repository Structure

```text
dig-ui-skill/
├── SKILL.md                         # Skill entry used by Codex-compatible tools
├── references/
│   ├── global-rules.md              # Cross-catalog behavior rules
│   ├── global-rules.local.example.md
│   ├── tokens.md                    # Shared token contract
│   ├── primitives.md                # Base layout and interaction rules
│   ├── catalogs/                    # Visual catalogs
│   └── layouts/                     # Layout recipes
├── renders/                         # Static preview output
├── assets/                          # Preview CSS and Dig visual assets
├── adapters/                        # Tool-specific adapters
├── agents/                          # Agent metadata
├── react/                           # React 3D logo loader
├── bin/dig-ui-skill.mjs             # Installer and sync CLI
├── sync-renders.sh                  # Render synchronization entry point
├── sync_renders.py                  # Catalog preview compiler
├── sync_layout_renders.py           # Layout preview compiler
└── validate-dig-layout-preview.mjs  # Layout QA validator
```

## Local Rules

Team defaults live in:

```text
references/global-rules.md
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

The repository ignores `references/global-rules.local.md` so personal preferences do not leak into public releases.

## Development

Install dependencies:

```bash
npm install
```

Build the 3D loader bundle:

```bash
npm run build:loader
```

Sync catalog previews:

```bash
./sync-renders.sh
```

Sync layout previews:

```bash
./sync-renders.sh --layouts
```

Validate layout previews:

```bash
npm run validate:layouts
```

## Open Source Notes

The catalog files describe design-language references inspired by public product surfaces. Brand names, product names, logos, and trademarks belong to their respective owners. This project is not affiliated with, endorsed by, or sponsored by those companies.

If you contribute a new catalog, prefer descriptive design-system analysis over copied proprietary assets. Do not add private brand files, licensed fonts, screenshots, or confidential design tokens.

## License

Licensed under the [Apache License 2.0](./LICENSE).
