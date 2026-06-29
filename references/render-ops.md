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

## Layout / Block Review

- Layout recipes must document slots, applicable scenarios, avoid-when rules, responsive behavior, and QA notes.
- Block contracts must document slots, states, token binding, responsive behavior, accessibility, anti-patterns, and QA notes.
- Local layout/block extensions should use `extends` and document owner, intent, and review date.
