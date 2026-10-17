# Dig UI Skill Usage Guide

[中文](./USAGE.zh-CN.md) · [English README](./README.md) · [Installation](./INSTALL.md)

This guide explains how to use and maintain Dig UI Skill as an agent-readable product UI design system. Markdown assets are the source of truth; HTML under `renders/` is used for catalog preview and visual maintenance.

## The Core Model

Dig UI follows a deliberate chain. It keeps product structure, visual language, reusable behavior, and delivery checks separate so an agent can reason about them without treating a screenshot as the specification.

```text
Dig Read -> Layout -> Catalog -> Blocks -> Anti-Tells -> Preflight
```

Add optional Shaders effects after choosing the page structure and base catalog. Their recipe JSON owns composition and runtime configuration; catalog Markdown continues to own the visual system.

| Layer | What it decides | Source |
| --- | --- | --- |
| Dig Read | Task framing, candidate assets, and product dials. | `references/dig-read.md` |
| Layout | Information architecture, slots, responsive order, and QA. | `references/layouts/` |
| Catalog | Tokens, typography, surfaces, components, density, and tone. | `references/catalogs/` |
| Blocks | Reusable primitive and product-module behavior. | `references/blocks/` |
| Effects | Shaders composition, theme bindings, mounting, and fallback. | `references/effects/` |
| Workflows | Repeatable review, redesign, execution, and image-reference processes. | `references/workflows/` |
| Anti-Tells / Preflight | AI UI drift filtering and delivery gates. | `references/anti-tells.md`, `references/preflight.md` |

Use this prompt as a starting point:

```text
Use Dig UI. First frame the task with references/dig-read.md, then choose a layout,
one catalog, and any relevant blocks. Check references/anti-tells.md and
references/preflight.md before delivery.
```

<a name="visual-system"></a>

## Choosing A Visual System

Choose one base visual system per page or component group. Catalog, Palette, and Style are three ways into the same catalog system: use the entry that best matches the source of the visual decision, and do not combine them as competing bases.

| Starting point | Choose | Example |
| --- | --- | --- |
| A known product or mature brand language | Catalog | `references/catalogs/fintech/wise.md` |
| Color, mood, anchors, or palette relationships | Palette | `references/catalogs/palettes/palette01.md` |
| A full non-brand visual grammar or reference style | Style | `references/catalogs/styles/quant-signal-console.md` |
| An exported personal asset | Custom palette or custom style | `references/local/palettes/`, `references/local/styles/` |

Before selecting an internal style, read [`references/catalogs/styles/README.md`](./references/catalogs/styles/README.md). It routes styles by appropriate task, avoid boundary, and render archetype.

<a name="palette"></a>

### Palette

Palette catalogs are for color-first exploration. Palette Lab can export a user-owned asset that is imported into the configuration directory and then synced to installed tools.

```bash
npx dig-ui-skill palette import ~/Downloads/palette.custompalette.zip codex
npx dig-ui-skill palette list
npx dig-ui-skill palette sync --all
```

<a name="style"></a>

### Style

Style catalogs package the wider visual grammar: material, surface behavior, component tone, render archetype, and light/dark token maps. Style Lab temporarily tunes six core color roles in the active mode; Light and Dark remain independent and export together as one `customstyle` asset.

```bash
npx dig-ui-skill style import ~/Downloads/style.customstyle.zip codex
npx dig-ui-skill style list
npx dig-ui-skill style sync --all
```

Both user-owned asset types remain outside this repository:

```text
~/.config/dig-ui-skill/palettes/
~/.config/dig-ui-skill/styles/
```

Brand catalog previews expose Brand Lab as well. It temporarily tunes the same reusable color roles and exports a `custompalette`, which uses the existing palette import and sync workflow.

They are synced into an installed skill's `references/local/` directory, not written back to the built-in catalog set.

<a name="shaders-effects"></a>
<a name="independent-effects"></a>

## Using Shaders In Dig UI

Shaders adds gradients, patterns, grain, and pointer feedback to a page. Choose your layout, one base catalog, and blocks first; add an Effects recipe wherever decoration serves the content. Current integration uses Shaders 4.0.4 and supports JavaScript and React.

The examples below run from this checkout. With `dig-ui-skill` 1.1.0 or later, replace `node bin/dig-ui-skill.mjs` with `npx dig-ui-skill`. Generated previews and exports bundle the provider locally. React integration uses the host application's React dependency.

### 1. Start With A Recipe And Preview

| Recipe | Components | Useful starting point |
| --- | --- | --- |
| `flowing-ribbon` | FlowingGradient | Animated hero or background |
| `dot-field` | DotGrid | Patterned background or local illustration |
| `cursor-ripples` | FlowingGradient + CursorRipples | Pointer feedback in a local region |
| `soft-grain` | SimplexNoise | Subtle texture |
| `radial-halo` | RadialGradient | A localized color halo |

```bash
node bin/dig-ui-skill.mjs effect list
node bin/dig-ui-skill.mjs effect show flowing-ribbon
node bin/dig-ui-skill.mjs effect preview flowing-ribbon --output ./effect-lab.html
```

Serve effect-lab.html from your project's localhost/HTTPS development server. In Effect Lab, adjust the declared parameters, choose a base theme or import a custom palette/style, switch Light/Dark, and test placement, width, pause, or static preview. Save with **Export effect**, then reopen the JSON/ZIP with **Open effect JSON / ZIP**. Drafts, undo/redo, and reset are scoped to the asset baseline; a mismatched old draft is retained with a notice.

The Lab selects recipes and exposes their declared controls. Author new component trees in JSON, then import them for preview.

### 2. Compose Shaders Components

Start from a complete, valid recipe rather than a partial schema:

```bash
node bin/dig-ui-skill.mjs effect show flowing-ribbon > ./my-effect.json
```

Change its id to `my-effect`, give it bilingual names, and record your source. For example, replace its composition array with a FlowingGradient followed by a translucent SimplexNoise layer. Keep the `ribbon` id so the existing speed/distortion/seed controls still target the right layer:

```json
[
  {
    "id": "ribbon",
    "type": "FlowingGradient",
    "props": {
      "colorA": { "token": "--dig-bg" },
      "colorB": { "token": "--dig-accent" },
      "colorC": { "token": "--dig-accent-2" },
      "colorD": { "token": "--dig-bg-soft" },
      "speed": 0.2, "distortion": 0.4, "seed": 12,
      "colorSpace": "oklch"
    }
  },
  {
    "id": "grain", "type": "SimplexNoise",
    "props": { "opacity": 0.12, "blendMode": "softLight" }
  }
]
```

This is a **composition fragment**, not an independently importable recipe. Preserve the remaining schema, provider, parameters, mount, runtime, fallback, and assets fields from the complete JSON. Layer order controls composition; use `Group` with children for nesting, and `maskSource` / `maskType` to reference a mask layer. The pinned SDK supports 20 blend modes and four mask types: alpha, alphaInverted, luminance, luminanceInverted.

Look up component names and props in the generated [registry](./assets/effects/components.mjs), inspect the original [recipes](./references/effects/), and follow the [Effects protocol](./references/effects/README.md). Match each parameter control to a layer/prop and its supported range or choices. Live DOM/camera capture is outside this integration. Unknown components, props, enums, missing references, and cycles are rejected.

```bash
node bin/dig-ui-skill.mjs effect import ./my-effect.json
node bin/dig-ui-skill.mjs effect preview my-effect --output ./my-effect-lab.html
```

### 3. Bind Themes And Keep Content Usable

Use semantic colors such as `{ "token": "--dig-accent" }` in the recipe; the adapter resolves them to real colors from the host before passing them to Shaders. Apply the chosen catalog's `--dig-*` tokens to the page. Use `theme_bindings.light` / `.dark` for explicit layer.prop overrides, or pass `tokens: () => resolvedTokenMap` for a custom token source. Change tokens first, then call `refreshTheme('dark')` or set the React `theme` prop.

Give the host a size and positioned, isolated container. Keep readable content and native controls above decoration. Choose background, hero-background, illustration, or local-container placement. The SDK tracks pointer events against canvas bounds while the decoration layer preserves DOM input, focus, and scrolling.

Reduced motion, pause/static preview, hidden/offscreen hosts, or critical/dense scenes select static fallback. GPU failure leaves content usable. Select by the task and region, and check the actual target device.

### 4. Mount In JavaScript Or React

Install the recipe into an existing application:

```bash
node bin/dig-ui-skill.mjs effect install flowing-ribbon --project ./my-app
```

It generates `my-app/components/dig-effects/flowing-ribbon/` with effect.json, preview.html, mount.mjs, Effect.jsx, runtime, resources, and licenses. Serve JS modules and JSON over localhost/HTTPS; use a JSON/JSX-capable bundler for React.

For a JavaScript page at the application root, establish the host:

```html
<section id="hero" style="position:relative;isolation:isolate;min-height:320px">
  <div style="position:relative;z-index:1">
    <h1>Your content</h1>
    <button type="button">Primary action</button>
  </div>
</section>
```

Then mount it from a module, after applying the catalog tokens:

```js
import { mount } from './components/dig-effects/flowing-ribbon/mount.mjs';

const effect = mount(document.querySelector('#hero'), { mode: 'light' });
await effect.ready;
// Call effect.destroy() when the host page/component is removed.
```

For React, import the generated component relative to your source file:

```jsx
'use client';
import Effect from './components/dig-effects/flowing-ribbon/Effect.jsx';

export default function Hero() {
  return (
    <Effect theme="light" style={{ minHeight: 320 }}>
      <h1>Your content</h1>
      <button type="button">Primary action</button>
    </Effect>
  );
}
```

The React wrapper handles lifecycle cleanup and StrictMode. It also accepts `paused`, `staticPreview`, and `context`. For custom recipe updates use the shared `mountEffect` / `DigEffect` adapter described in the protocol. Updates replace configuration: deleting an inner transform field restores its default instead of inheriting a previous value. Provider defaults remain derived data; stored/exported recipe JSON stays unchanged.

### 5. Export, Sync, Update, And Restore

```bash
# Export, reopen, and sync a personal recipe to installed tools
node bin/dig-ui-skill.mjs effect export flowing-ribbon --output ./ribbon.zip
node bin/dig-ui-skill.mjs effect import ./ribbon.zip --all
node bin/dig-ui-skill.mjs effect sync --all

# Inspect and maintain the application's installed effect
node bin/dig-ui-skill.mjs effect check --project ./my-app
node bin/dig-ui-skill.mjs effect diff flowing-ribbon --project ./my-app
node bin/dig-ui-skill.mjs effect update flowing-ribbon --project ./my-app
node bin/dig-ui-skill.mjs effect restore flowing-ribbon --project ./my-app
```

Personal truth lives in `~/.config/dig-ui-skill/effects/` (or `DIG_UI_CONFIG_HOME/effects`); `references/local/effects/` is an installed tool's copy. `.dig-ui-effects.json` tracks each application's source, revision, generated hashes, and history. Skill update and project effect update are separate operations; see [installation](./INSTALL.md#effects-installation).

Identical imports/updates are idempotent. Changed content needs a newer revision; downgrades or same-revision replacements need explicit `--force`. ID-based project update/diff follow the recorded source (asset id, JSON, or ZIP), so refresh that source before updating. Project update preserves local edits by default. Forced project replacement retains a snapshot; restore returns the latest distinct prior snapshot, including saved local edits. Restore requires existing history: a first install or unchanged update does not create a previous version. ZIP exports include editable JSON, embedded resources, preview, JS/React entries, provider code, and licenses; record resource source/license before packaging. The CLI accepts stored Dig exports and diagnoses unsupported compressed ZIPs.

If preview stays static, inspect reduced motion, pause/static controls, scene dials, and GPU support. If import/update is rejected, inspect the schema/reference/revision or local-edit diagnostic before considering `--force`. If a draft is stale, reopen its matching original JSON/ZIP; it is retained rather than automatically applied to a different baseline.

<a name="local-rules"></a>

## Personal Customization

Teach the agent UI decisions you want to keep: layout, density, hierarchy, and interaction preferences can become user-owned rules without forking an official catalog or adding another AI API key.

```text
Use dig-ui. Add this to my local rules:
Dashboard toolbars keep filters left, primary actions right, and density compact by default.
```

Long-term personal UI preferences are stored outside the repository:

```text
~/.config/dig-ui-skill/global-rules.local.md
```

Read [`references/global-rules.local.example.md`](./references/global-rules.local.example.md) for a concrete template. `local init` copies it into this user-owned path; the checked-in example remains a reference, not a place for personal edits.

An agent follows `references/local-rules-builder.md` to route and write the preference. The CLI provides mechanical helpers:

```bash
npx dig-ui-skill local init
npx dig-ui-skill local show
npx dig-ui-skill local add --section "Header / Topbar" "Header uses compact height by default."
npx dig-ui-skill local sync --all --from-config
npx dig-ui-skill local import --from ./global-rules.local.md
npx dig-ui-skill local export --output ./global-rules.local.md
```

The configuration directory is the source of truth. Installed copies are synchronized replicas and should not become project-wide defaults.

## WorkBuddy Export

Create a self-contained ZIP for WorkBuddy's **Skills → Add Skill → Upload** flow:

```bash
npx dig-ui-skill export workbuddy
npx dig-ui-skill export workbuddy --output ~/Downloads/dig-ui-workbuddy.zip --lang en
```

The export includes the selected language and any user local rules, palettes, and styles. The default output is `~/.config/dig-ui-skill/dig-ui-workbuddy.zip`; running the command again replaces that ZIP or the path supplied through `--output`.

<a name="review-redesign"></a>

## Review And Redesign

For review tasks, preserve the business goal while checking visual and structural fit:

```text
Use Dig UI. Review this settings page with references/workflows/review.md,
references/layouts/settings-form.md, and references/catalogs/other/dig.md.
```

For redesign tasks, stabilize the structure first, then apply the visual system:

```text
Use Dig UI. Preserve the business meaning, align the page to dashboard-overview,
then apply the mono catalog and report the missing states before delivery.
```

Do not use a catalog to rewrite a layout's information architecture. Do not create an HTML render for a layout or block: those are Markdown contracts, while catalog render pages are previews.

## Maintaining Catalogs

Catalog Markdown is canonical. A catalog should define frontmatter, a visual/semantic contract, and the required `--dig-*` tokens. Style catalogs must provide both `## Dig UI CSS Tokens` and `## Dig UI Dark Tokens`.

After changing catalog assets, regenerate and validate previews:

```bash
./sync-renders.sh
npm run validate:catalogs
npm run validate:renders
```

`validate:renders` also checks language parity, layout/block Markdown contracts, catalog preview switching, and style dual-theme/export contracts.

<a name="layouts-blocks"></a>

## Layouts And Blocks

Layouts express page-level structure. Blocks express reusable UI behavior. Treat them as different layers:

- A layout defines slots, grid, hierarchy, responsive order, and QA notes.
- A block defines states, accessibility, responsive behavior, and implementation boundaries for a repeated UI unit.
- A catalog defines visual tokens and component tone, but does not change the layout's information architecture.

When adding a layout or block, update its library index and keep all required language variants and manifest fields in sync. Run `npm run validate:renders` before delivery.

## Development Install

Use the repository as an installation source while developing:

```bash
node bin/dig-ui-skill.mjs install cursor --source .
node bin/dig-ui-skill.mjs install --all --source .
```

Use `--link` for a local development symlink. See the [installation guide](./INSTALL.md) for every option and the [Chinese usage guide](./USAGE.zh-CN.md) for the detailed Chinese maintenance SOP.
