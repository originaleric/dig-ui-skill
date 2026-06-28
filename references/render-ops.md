# Render Ops

Render Ops defines how maintainers inspect Dig UI assets without turning preview HTML into a second source of truth.

## Render Types

- `renders/catalogs/`: visual language previews for catalog tokens and archetypes.
- `renders/layouts/`: page skeleton previews for slots, responsive behavior, fixtures, and catalog switching.
- `renders/blocks/`: block contract pages for primitives and product modules, with examples, anatomy, state semantics, and catalog compatibility checks through `?catalog=<slug>`.

## Source Of Truth

Render output must be generated from Markdown frontmatter, body sections, shared manifests, fixtures, and catalog tokens. If render output conflicts with Markdown, the Markdown and manifest win, and validation should report stale render output.

## Required Metadata

Every generated render page should show:

- installed language
- asset source: `official` or `local`
- compatible catalog scope
- selected preview catalog when a render supports catalog switching
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
- Block fixtures should define block-specific `examples` first and `state_semantics` second. States are semantic coverage, not the primary page layout.
- Fixtures must be small JSON files that describe maintainable render data, not separate design documents.
