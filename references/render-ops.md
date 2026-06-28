# Render Ops

Render Ops defines how maintainers inspect Dig UI assets without turning preview HTML into a second source of truth.

## Render Types

- `renders/catalogs/`: visual language previews for catalog tokens and archetypes.
- `renders/layouts/`: page skeleton previews for slots, responsive behavior, fixtures, and catalog switching.
- `renders/blocks/`: block state matrix previews for primitives and product modules.

## Source Of Truth

Render output must be generated from Markdown frontmatter, body sections, shared manifests, fixtures, and catalog tokens. If render output conflicts with Markdown, the Markdown and manifest win, and validation should report stale render output.

## Required Metadata

Every generated render page should show:

- installed language
- asset source: `official` or `local`
- catalog
- fixture
- schema version
- source Markdown path

## Maintenance Commands

```bash
dig-ui-skill render catalogs
dig-ui-skill render layouts
dig-ui-skill render blocks
dig-ui-skill render all
dig-ui-skill validate renders
```

## Fixture Rules

- Layout fixtures should cover `normal`, `empty`, `error`, and `mobile`.
- Block fixtures should cover `default`, `disabled`, `loading`, `error`, `focus-visible`, and `mobile`.
- Fixtures must be small JSON files that describe state, not separate design documents.
