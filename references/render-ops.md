# Render Ops

Render Ops defines how maintainers inspect catalog visual-language assets without turning preview HTML into a second source of truth.

## Render Types

- `renders/index.html`: catalog hub.
- `renders/<category>/<slug>.html`: visual language previews for catalog tokens and archetypes.

Layout recipes and block contracts are Markdown protocol assets. They are reviewed through their source files, manifests, and QA notes instead of generated HTML render pages.

## Source Of Truth

Catalog render output must be generated from Markdown frontmatter, body sections, shared manifests, and catalog tokens. If render output conflicts with Markdown, the Markdown and manifest win, and validation should report stale render output.

## Required Metadata

Every generated render page should show:

- installed language
- asset source: `official` or `local`
- compatible catalog scope
- schema version
- source Markdown path

## Maintenance Commands

```bash
dig-ui-skill render catalogs
dig-ui-skill render all
dig-ui-skill validate renders
```

`render all` is kept as a convenience alias for catalog render sync.

## Style Render Integrity

For `style-catalog` previews, Markdown remains the source of truth and the render must expose it without drift:

- `## Dig UI CSS Tokens` is the light token map and `## Dig UI Dark Tokens` is the dark token map; both are required by `style_v1`.
- The preview must switch modes by replacing token values only, persist the selected mode, and keep its component structure unchanged.
- Style Lab exports both maps as `theme_tokens.light` / `theme_tokens.dark`, plus light and dark token CSS files. The exported JSON must be importable by `dig-ui-skill style import`.
- Re-running catalog sync must be idempotent: one preview owns one dark-token override and one theme control.

## Layout / Block Review

- Layout recipes must document slots, applicable scenarios, avoid-when rules, responsive behavior, and QA notes.
- Block contracts must document slots, states, token binding, responsive behavior, accessibility, anti-patterns, and QA notes.
- Local layout/block extensions should use `extends` and document owner, intent, and review date.
