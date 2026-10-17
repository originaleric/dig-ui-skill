# Effects

For practical Shaders selection, component composition, theme binding and JS/React mounting, start with the [English usage guide](../../USAGE.md#shaders-effects) or [中文使用指南](../../USAGE.zh-CN.md#shaders-effects). This document defines the shared configuration, adapter and maintenance contracts.

Effects are independent from catalogs. Combine `layout + one base catalog + blocks + effects`. Shaders is the rendering provider, not a catalog type. Select by placement, reading density, interaction energy and operational criticality; there are no catalog allowlists.

The canonical recipe is JSON (`dig.effect.v1`), with a stable id/revision, bilingual name, source, pinned provider, ordered composition, parameter controls, light/dark bindings, mount, runtime, static fallback and resource manifest. `references/shared/effect-manifest.yaml` indexes original recipes. The component registry is generated from Shaders 4.0.4 via `npm run build:effects`; do not invent props.

The five bundled starting recipes use FlowingGradient, DotGrid, CursorRipples, SimplexNoise and RadialGradient. Compose additional registered components in recipe JSON, keeping parameter targets and layer references valid. The Lab previews complete recipes and renders their declared controls; it does not author a new component tree through a visual picker. Provider code and licenses are local in exports, and React remains a host dependency.

## Agent workflow

1. Complete Dig Read and choose the layout/catalog/blocks as usual.
2. Read the selected Effect JSON. Map semantic colors from the active catalog through `{ "token": "--dig-accent" }`; use light/dark overrides only when needed. Effects do not change catalog selection or business semantics.
3. Establish a positioned, isolated host. Put readable DOM and controls above decoration, with `position: relative; z-index: 1`. Declare background, hero-background, illustration or local-container placement. Keep clip and pointer ownership explicit.
4. Mount the shared adapter. In JavaScript import `mountEffect` from `assets/effects/runtime.mjs`; call `destroy()` when the host is removed. In React use `adapters/react/DigEffect.jsx`, which owns the same lifecycle and supports Strict Mode and client-only mounting. React remains the host application's dependency.
5. Set `mode` / `theme`, or refresh on theme changes. Token names are resolved to actual colors before reaching Shaders. The Lab resolves CSS colors, including color-mix. For custom hosts pass `tokens: () => resolvedTokenMap` if the theme is scoped outside the document root.
6. Respect reduced motion, hidden/offscreen hosts and scene dials. The runtime shows static fallback and destroys the GPU instance when paused, hidden or disabled; it never relies only on speed zero or opacity zero. Resume/retry is explicit through the controller. GPU failure does not remove content.
7. Verify actual native pointer input, keyboard controls, scrolling, both themes, narrow viewports, resource cleanup and export recovery.

The `ready` promise resolves once the initial decoration is usable, including a static fallback; it does not wait for every later update. A cancelled provider initialization keeps a static fallback until its old instance returns and is released.

Controller methods: `ready`, `update(recipe)`, `refreshTheme(mode)`, `pause()`, `resume()`, `setStatic(boolean)`, `setContext(dials)`, `destroy()`, `getState()`. Caller owns host CSS; the adapter owns only its decoration layer. `mount.scroll` is `host` (absolute) or `viewport` (fixed); size/visibility are measured on that layer, and viewport mounting requires no transformed containing ancestor. Dig Read dials use the existing 1–10 scale; density/criticality >= 8 or interaction energy <= 2 select static fallback. The underlying Shaders pointer tracker uses window events and canvas bounds, so overlaid controls remain usable without synthetic event forwarding.

## Recipes and Lab

Original recipes: flowing-ribbon, dot-field, cursor-ripples, soft-grain, radial-halo. Open `renders/effects/index.html`, or generate a personal preview:

```bash
npx dig-ui-skill effect preview --output ./effect-lab.html
npx dig-ui-skill effect preview flowing-ribbon --output ./ribbon.html
```

Official builds contain only official assets; personal previews may load local assets, and exports exclude unrelated personal themes. Installed local copies also resolve offline when the user configuration center is unavailable.

The standalone Lab includes local provider code, bilingual UI and theme data. It supports recipe/parameter selection, all built-in catalogs, custom palette/style loading, separate light/dark mode, placement/viewport controls, pause/static preview, scoped drafts, reset, undo/redo, changes, JSON/ZIP reopening and ZIP export. Repeated exports of identical content reuse their revision; changed content advances beyond the last successful export, including after refresh/reset. Export history is scoped to the asset and browser origin; supported Web Locks serialize same-origin tab exports. Storage-disabled contexts retain only session history. Some catalogs expose only one canonical theme; the Lab derives the missing mode from that catalog's accent and records `derived_modes` in its theme data. This does not amend the catalog source.

Serve on localhost or HTTPS for WebGPU. File previews retain a static fallback when browser capabilities are unavailable. Assets and fonts are bundled locally, with no CDN, account or cloud editor dependency.

Reopening an imported asset restores its draft only when the original baseline, id and revision match. Object field order does not invalidate a baseline. The multi-asset Lab can recover its selected imported asset from that saved draft after reload; standalone single-asset previews stay scoped to the packaged asset. Mismatched drafts are retained with a notice. Browser back/forward restoration remounts one controller while retaining the page's edits, theme, native controls and pause/static state. Late import/export completions from an inactive page cannot commit state or downloads.

Selection records also identify the packaged baseline. A matched imported draft can replace the initial Lab entry with the same id while that packaged source is unchanged; a changed packaged source takes precedence and retains the unmatched draft for explicit reopening. Older selections without this marker recover a newer imported revision conservatively. Language switching updates labels in place; it does not recreate controls, the preview host or its controller. Importing another asset retains the host, preview width and native form state.

Dynamic drivers follow the pinned Shaders contract: map channels are `alpha`, `alphaInverted`, `luminance`, `luminanceInverted`; auto-animation modes are `loop` and `ping-pong`. Scalar drivers target numeric props and both output endpoints must satisfy the prop bounds; descending ranges are allowed. Mouse-position drivers target only registry props marked as positions. Each driver accepts its own fields, required ranges and SDK enums. The same checks apply to composition and theme overrides.

Universal compositor props follow the same pinned SDK: all 20 blend modes are supported, including `normal-oklch` and `normal-oklab`; mask types are `alpha`, `alphaInverted`, `luminance` and `luminanceInverted`. Import, export, Lab and adapters share this validation. Unknown enums, missing mask sources and cyclic layer references are rejected.

Recipe updates replace configuration. The shared resolver completes the SDK's seven transform defaults before both creation and updates, so deleting an inner transform field resets it instead of retaining a previous value. Explicitly cleared transform/boundingBox values resolve to absent props using the SDK's creation semantics; the existing effective-prop comparison rebuilds when needed. Partial bounding boxes and flow/driver objects retain the SDK's replacement semantics. This applies recursively and does not add defaults to stored or exported recipes; an updated static composition renders the same as a fresh mount of that configuration.

## Personal assets and project application

```bash
npx dig-ui-skill effect list
npx dig-ui-skill effect show flowing-ribbon
npx dig-ui-skill effect export flowing-ribbon --output ./ribbon.zip
npx dig-ui-skill effect import ./ribbon.zip codex
npx dig-ui-skill effect sync --all
npx dig-ui-skill effect install flowing-ribbon --project ./my-app
npx dig-ui-skill effect check --project ./my-app
npx dig-ui-skill effect diff flowing-ribbon --project ./my-app
npx dig-ui-skill effect update --project ./my-app
npx dig-ui-skill effect restore flowing-ribbon --project ./my-app
```

Personal truth: `~/.config/dig-ui-skill/effects/` (or `DIG_UI_CONFIG_HOME/effects`); installed copies: `references/local/effects/`. Import is idempotent for identical content, requires a newer revision for changed content, and saves the previous asset before explicit replacement. Personal import and project install/update share this rule: object field order is ignored, array order remains significant, and same-revision changed content or downgrades require explicit `--force`. ZIP exports use stored entries; compressed/encrypted third-party ZIPs are rejected with an actionable error. Embedded resources require a relative path, MIME, SHA-256, source and license; export packages must carry matching bytes. Recipes are bounded to 24 MiB of UTF-8 JSON and stored ZIP input/output share a 96 MiB bound. JS entry files load effect.json over localhost/HTTPS; React entry files import it through the host JSON-capable bundler. Standalone preview.html keeps its embedded recipe for direct reopening; preview producers require complete light/dark theme data and valid selections.

Project installation writes `components/dig-effects/<id>/` with effect.json, standalone preview, JS and React entry files, runtime, resources and licenses. `.dig-ui-effects.json` tracks origin recipe/revision, generated file hashes and backups. Update checks local edits, missing/untracked files and downgrades; it preserves conflicts by default. When recipe, source, generated files and the pristine target match, repeated install/update leaves records and backups unchanged. Generator changes and explicit forced repairs still write a recoverable snapshot. `--force` explicitly replaces tracked local edits while retaining a backup. `restore` returns the latest distinct prior snapshot, skipping legacy duplicates only when recipe/source, file bytes, baseline hashes, directory structure and permission modes match the current state. Native filenames, empty directories and executable file modes are preserved; archive resource names keep their stricter portable path rules. Backup bytes and names are checked before and after staging. ID-based update/diff/check follow the recorded source; source identity changes are rejected. A missing installation directory can be repaired with an explicit --force update. Writes use a heartbeat file lock (a dead writer becomes recoverable after its 10-second stale window), staging and a recovery journal; the next command recovers an interrupted operation. Do not hand-edit installation records or pending recovery files.

Effects exported with themes carry those independent theme values for portable preview; themes never become recipe ownership. Native Vue/Svelte/Solid wrappers can be added when a concrete host requires them; no such host is part of the current scope.

`update` requires an already installed asset, including when given an explicit JSON/ZIP source; use `install` to register a new asset. Previously persisted recipes/history with driver values accepted by the older validator remain inspectable and recoverable, so a valid newer revision (or explicit forced replacement) can repair them. This read compatibility does not admit invalid new inputs or bypass runtime validation; restoring an old invalid driver does not make it renderable.

`show` and `list` diagnose legacy driver assets with a repair warning; sync and skill maintenance preserve their validated data for offline inspection. The multi-asset Lab includes only strictly valid recipes, retaining a valid packaged/copied entry when an invalid personal override is skipped. Malformed personal files emit diagnostics without blocking unrelated assets; sync preserves a valid installed copy when the matching source is unreadable. Repairing an invalid existing configuration requires explicit `import --force`, which saves its original bytes in the existing history directory before replacement. Incoming assets, exports, project installation and runtime mounting remain strict.

## Licensing and validation

Provider code: MIT (`assets/effects/SHADERS-LICENSE.txt` plus THIRD-PARTY-NOTICES.txt). Original recipes/adapters: project Apache-2.0. No shaders.com preset/section content is redistributed. Record rights for user resources before packaging.

```bash
npm run build:effects
npm run validate:effects
npm run test:effects:browser
npm run validate:catalogs
npm run validate:renders
```

Browser tests use real local Shaders rendering and native UI interactions, plus injected provider failures for deterministic lifecycle checks. Device performance reports must name the tested device and scene; do not claim universal frame budgets from a single machine.
