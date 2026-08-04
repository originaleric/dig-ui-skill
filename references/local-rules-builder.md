# Local Rules Builder

Use this guide when the user asks to add, update, remove, or refine personal Dig UI preferences.

This workflow is designed for any compatible Host Agent. The Host Agent handles natural-language understanding and writes a focused local rules patch. The `dig-ui-skill` CLI only provides mechanical helpers for local file paths, display, writing, import, export, and synchronization.

## Source of Truth

Write personal preferences to:

```text
~/.config/dig-ui-skill/global-rules.local.md
```

Never edit `references/global-rules.md` for personal preferences. That file is the canonical shared English rules file. `references/global-rules.zh-CN.md` is a translation for reading and review.

## Workflow

1. Read `references/global-rules.md`.
2. Read this file.
3. Read existing `~/.config/dig-ui-skill/global-rules.local.md` if present; otherwise inspect `references/global-rules.local.example.md` for the published example structure.
4. Route the user preference to the closest canonical heading.
5. Preserve existing user-written content and comments.
6. Add concise bullets under the matched heading.
7. For `local add`, always use `--no-sync` first. Then run `npx dig-ui-skill local sync --all --from-config` unless the user specifies one target; synchronize only that target with `--from-config` when scoped.
8. Report the section, file path, and per-target sync result.

Only persist a preference when the user explicitly asks to add, update, remove, refine, remember, or otherwise save it. Do not write local rules for exploratory discussion, suggestions, or ambiguous preferences.

## Canonical Sections

- `i18n`
- `Dark / Light Theme`
- `Buttons / Form Controls`
- `Header / Topbar`
- `Footer`
- `Sidebar / Navigation`
- `Main Content / Page Sections`
- `Toolbars / Filters / Actions`
- `Collections / Lists / Tables / Grids`
- `Cards / Panels / Empty States`
- `Forms / Settings Rows`
- `Responsive Behavior`
- `CSS / Primitive Discipline`
- `Select (HTML Preview / React)`
- `Interaction / Icons`

If no section clearly matches, use `Layout / Components Consistency`.

## Writing Rules

- Use canonical English section headings even when the bullet is written in Chinese.
- Keep bullets short, durable, and preference-like.
- Do not add implementation-only details unless the user asked for them.
- Do not modify shared files for personal preferences.
- Do not duplicate an existing bullet.
- Prefer adding one or two bullets over rewriting a whole section.

## CLI Helpers

Use these helpers when available:

```bash
npx dig-ui-skill local path
npx dig-ui-skill local show
npx dig-ui-skill local init
npx dig-ui-skill local sync --all --from-config
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
npx dig-ui-skill local import --from ./global-rules.local.md
npx dig-ui-skill local export --output ./global-rules.local.md
```

`local add --section` is intentionally not an AI command. The Host Agent should choose the section and wording, then call the CLI to write and sync. A plain `local add` attempts to synchronize all installed targets but does not overwrite drifted copies; Host Agents should use `--no-sync`, then explicitly synchronize with `--from-config`.

## Routing Hints

| User intent | Section |
| --- | --- |
| language, translation, visible copy, locale | `i18n` |
| dark/light, color mode, theme switcher, theme persistence | `Dark / Light Theme` |
| button, input, textarea, checkbox, radio, control state | `Buttons / Form Controls` |
| header, topbar, language switcher, theme switcher, user menu | `Header / Topbar` |
| footer, copyright, social links, newsletter | `Footer` |
| sidebar, side nav, navigation, menu, collapsed state | `Sidebar / Navigation` |
| main area, sections, page title, empty state, error state | `Main Content / Page Sections` |
| toolbar, filters, search, sort, pagination, export, bulk actions | `Toolbars / Filters / Actions` |
| table, list, grid, feed, timeline, density, compact | `Collections / Lists / Tables / Grids` |
| card, panel, stat, empty state container | `Cards / Panels / Empty States` |
| form, settings, label, helper text, submit bar | `Forms / Settings Rows` |
| mobile, responsive, breakpoint, drawer collapse | `Responsive Behavior` |
| CSS, primitive, token, spacing, radius, shadow, class naming | `CSS / Primitive Discipline` |
| select, option, combobox, listbox, popover | `Select (HTML Preview / React)` |
| hover, focus, active state, icon | `Interaction / Icons` |

## Example

User says:

```text
使用 dig-ui。把我的本地 global rules 更新一下：Header 固定在顶部，高度紧凑，右侧放语言切换、主题切换和用户菜单。
```

Agent should add:

```md
## Header / Topbar

- Header stays sticky at the top with compact height.
- Keep language switcher, theme switcher, and user menu in one right-aligned control group.
```

Then run:

```bash
npx dig-ui-skill local sync --all --from-config
```
