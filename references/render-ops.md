# Render Ops

Render Ops defines how maintainers inspect catalog visual-language assets without turning preview HTML into a second source of truth.

## Render Types

- `renders/index.html`: catalog hub.
- `renders/<category>/<slug>.html`: visual language previews for catalog tokens and archetypes.
- `renders/effects/index.html`: independent Effect Lab generated from recipe JSON, theme sources and bundled adapters. It is not a catalog and is validated by Effects tests.

Layout recipes and block contracts are Markdown protocol assets. They are reviewed through their source files, manifests, and QA notes instead of generated HTML render pages.

## Source Of Truth

Catalog render output must be generated from Markdown frontmatter, body sections, shared manifests, and catalog tokens. If render output conflicts with Markdown, the Markdown and manifest win, and validation should report stale render output.

The shared preview canvas defaults to a solid `--dig-bg`, without a decorative page-wide grid or accent gradient. Explicit catalog canvases (such as pearlescent moiré) may retain their own treatment. Chart grids and local sample textures are not part of the shared page background.

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

The CLI render command also regenerates Effect Lab. Use `npm run build:effects` after changing the provider registry, adapter or Lab scripts, and `npm run validate:effects` / `npm run test:effects:browser` to validate effect assets and actual runtime behavior. Effect configuration, not its preview HTML or generated framework code, owns truth.

## Style Render Integrity

For `style-catalog` previews, Markdown remains the source of truth and the render must expose it without drift:

- `## Dig UI CSS Tokens` is the light token map and `## Dig UI Dark Tokens` is the dark token map; both are required by `style_v1`.
- Author top-level styles in `references/catalogs/styles/`. Author a child in `references/style-sources/<slug>.md` with `extends: <public-parent-slug>`. The child sets its own identity, descriptions, `best_for` and `avoid_for`. Its Style Contract and optional token sections each use one fenced block under their heading. The build writes complete Catalog Markdown to `references/catalogs/styles/<slug>.md` with `derived_from`. Import the complete Catalog Markdown or a Style Lab export.
- Start each mode from the parent's effective tokens. Compute the parent dark mode from its light declarations and explicit dark overrides. Apply the child's optional `Dig UI Shared Tokens` before the child's light or dark overrides. Preserve existing explicit dark requirements on top-level sources. Merge `shape_language` and `accessibility` by key and replace the other declared groups whole. An empty optional mapping can clear inherited values. Changing archetype starts a new render configuration.
- A targeted build of the parent updates its children and Catalog previews and drops retired styles from the Catalog index. Run `dig-ui-skill render all` to refresh Effects Lab. Both builds prepare the Catalog Markdown, previews, and index before replacing existing files. The full build also prepares Effects Lab from the final style Markdown. Render validation, npm packing and WorkBuddy export verify that style previews were built from the current Markdown. They also check generated child Markdown, style entries in both indexes, light and dark token values, and the Style Contract and archetype used by Style Lab exports. When retiring a style, remove its Markdown and preview and update the Skill routing, catalog guides, and manifest that reference it.
- The preview must switch modes by replacing token values only, persist the selected mode, and keep its component structure unchanged.
- Style Lab exports both maps as `theme_tokens.light` / `theme_tokens.dark`, plus light and dark token CSS files. The exported JSON must be importable by `dig-ui-skill style import`.
- Re-running catalog sync must be idempotent: one preview owns one dark-token override and one theme control.

## Layout / Block Review

- Layout recipes must document slots, applicable scenarios, avoid-when rules, responsive behavior, and QA notes.
- Block contracts must document slots, states, token binding, responsive behavior, accessibility, anti-patterns, and QA notes.
- Local layout/block extensions should use `extends` and document owner, intent, and review date.
