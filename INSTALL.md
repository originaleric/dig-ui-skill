# Dig UI Skill Installation Guide

[中文](./INSTALL.zh-CN.md) · [English README](./README.md) · [English usage guide](./USAGE.md)

`dig-ui-skill` provides one CLI for installing the same design-system skill into the personal skill directories of Codex, Cursor, and Claude Code.

<a name="installation"></a>

## Quick Start

```bash
# From npm after publishing, or from the repository root
npx dig-ui-skill install cursor
npx dig-ui-skill install codex
npx dig-ui-skill install claude-code
npx dig-ui-skill install codex --lang en
npx dig-ui-skill install codex --lang zh-CN
npx dig-ui-skill update cursor
npx dig-ui-skill status
```

During local development, install from this checkout:

```bash
node bin/dig-ui-skill.mjs install cursor --source .
node bin/dig-ui-skill.mjs install --all --source .
```

## Install Locations

| Tool | Install location |
| --- | --- |
| Codex | `~/.codex/skills/dig-ui` |
| Cursor | `~/.cursor/skills/dig-ui` |
| Claude Code | `~/.claude/skills/dig-ui` |

Cursor manages `~/.cursor/skills-cursor` itself. The CLI never writes there.

## Codex

```bash
npx dig-ui-skill install codex
```

Start a Codex task in any repository and ask it to review a page against the Dig catalog. It should discover `~/.codex/skills/dig-ui/SKILL.md`.

## Cursor

```bash
npx dig-ui-skill install cursor
```

For a stronger trigger in one repository, also install the project rule:

```bash
npx dig-ui-skill install cursor --project .
npx dig-ui-skill install cursor --project /path/to/your/repo
```

The command creates `.cursor/rules/dig-ui.mdc` in the target repository and points it to the personal skill.

## Claude Code

```bash
npx dig-ui-skill install claude-code
# Alias
npx dig-ui-skill install claude
```

Use `/dig-ui` or a natural-language task that mentions Dig UI.

## Updating

`update` refreshes the standard skill assets, including language files, references, preview assets, adapters, the CLI, and both English and Chinese top-level documentation. It never overwrites `references/global-rules.local.md`.

```bash
npx dig-ui-skill update cursor
npx dig-ui-skill update --all
```

User-owned palettes and styles are stored outside the repository and remain intact:

```text
~/.config/dig-ui-skill/palettes/
~/.config/dig-ui-skill/styles/
```

After an update, they are synced back into each installed skill under `references/local/palettes/` and `references/local/styles/`.

## Key Options

| Option | Meaning |
| --- | --- |
| `--all` | Install, update, or sync every supported tool. |
| `--link` | Use a symlink for local skill development. |
| `--link-local` | Symlink local rules from the user configuration directory. |
| `--with-local` | Sync user local rules after `update`. |
| `--from-config` | Resolve a local-rule conflict with the configuration copy. |
| `--from <target\|file>` | Select a local-rule import source. |
| `--output <file>` | Select a local-rule export destination. |
| `--force` | Replace a conflicting local-rule source or existing export. |
| `--backup` | Create a `.backup` before overwriting. |
| `--skip-conflicts` | Continue while skipping conflicting targets. |
| `--source <path>` | Install from a local repository. |
| `--project <path>` | Add Cursor's project rule. |
| `--lang <en|zh-CN>` | Install a language; `zh-CN` is the default. |

## Custom Palettes And Styles

```bash
# Import and sync a Palette Lab export
npx dig-ui-skill palette import ~/Downloads/palette.custompalette.zip codex
npx dig-ui-skill palette list
npx dig-ui-skill palette sync --all

# Import and sync a Style Lab export
npx dig-ui-skill style import ~/Downloads/style.customstyle.zip codex
npx dig-ui-skill style list
npx dig-ui-skill style sync --all
```

Custom palette and style assets belong to the user. They are not written into the built-in catalog directories or tracked as official assets.

## Local Rules

Personal UI preferences have one repository-external source of truth:

```text
~/.config/dig-ui-skill/global-rules.local.md
```

[`references/global-rules.local.example.md`](./references/global-rules.local.example.md) is the tracked, readable template. `local init` copies it into the user configuration; edit that copy rather than the repository example.

```bash
npx dig-ui-skill local init
npx dig-ui-skill local sync --all
npx dig-ui-skill local sync --all --from-config
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
npx dig-ui-skill local import --from codex --force --backup
npx dig-ui-skill local import --from ./global-rules.local.md
npx dig-ui-skill local export --output ./global-rules.local.md
```

See the [English usage guide](./USAGE.md) for workflows and maintenance, or the [Chinese installation guide](./INSTALL.zh-CN.md) for the detailed Chinese reference.
