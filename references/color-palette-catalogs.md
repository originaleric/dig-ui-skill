# Color Palette Catalogs

Color palette catalogs are color-first visual systems. They sit beside brand-first catalogs and do not replace them.

Brand catalogs answer:

```text
What should this interface feel like if it follows a known brand or product language?
```

Color palette catalogs answer:

```text
What should this interface feel like if it follows a curated site palette?
```

Use a color palette catalog when the user asks for a mood, color composition, site palette, or visual direction without naming a brand. Use a brand catalog when the user names a company, product, or established visual language.

## Naming

Palette catalogs use stable numeric slugs:

```text
palette01
palette02
palette03
```

The slug is intentionally neutral. The catalog file should carry descriptive metadata such as mood, best-fit page types, and contrast notes.

The slug must be identical across the filename, frontmatter, render URL, and registry entry. For example, `references/catalogs/palettes/palette01.md` must declare `slug: palette01` and renders to `renders/palettes/palette01.html`.

Palette files must be direct children of `references/catalogs/palettes/`. Do not place palette catalogs in nested folders such as `references/catalogs/palettes/archive/`.

## Frontmatter

Palette catalogs are first-class catalog entries, not loose Markdown notes. A new palette file under `references/catalogs/palettes/` must declare frontmatter:

```yaml
---
slug: palette01
name: Palette 01
name_zh: Palette 01
name_en: Palette 01
kind: color-palette-catalog
category: palettes
token_contract: palette_v1
status: draft
---
```

Field ownership:

- `kind` identifies the catalog type.
- `category` must match the directory and render registry group.
- `token_contract` selects the required Dig token roles.
- `slug` must match the file basename and use the stable numeric form `paletteNN`, with at least two digits such as `palette01`.

Validator tooling may temporarily infer `palette_v1` from `kind: color-palette-catalog` for legacy migration messages, but newly created palette catalogs must set `token_contract: palette_v1` explicitly.

## Palette Contract

The canonical palette facts must live in a `## Palette Contract` fenced YAML block. Validators read this block as the source of truth and ignore examples elsewhere in the Markdown file.

## Source Anchors

Each palette starts from four anchor colors:

```yaml
anchors:
  canvas: "#f7f7f7"
  ink: "#000000"
  primary: "#0071e3"
  support: "#4fb3ff"
```

Recommended anchor roles:

- `canvas`: page background or dominant surface.
- `ink`: primary text and high-contrast foreground.
- `primary`: main action and active state.
- `support`: secondary accent, link support, illustration highlight, or information tint.

Optional anchors may be added only when the palette needs them:

- `surface`
- `muted`
- `danger`
- `warning`
- `success`

Optional anchors do not replace `derived_roles`; they only provide additional inputs. Runtime roles such as `surface`, `muted`, `focus`, `disabled`, and `overlay` must still be declared explicitly.

## Preview Candidates

Palette renders include a Palette Lab for trying alternate anchor colors without changing source files. Candidate colors are optional and are read from the canonical `## Palette Contract` block when present. They should be treated as preview inputs until the user explicitly approves them and the catalog tokens are updated.

Phase 1 supports support-color candidates:

```yaml
candidates:
  support:
    - label: Sky Information
      value: "#4fb3ff"
      strong: "#2697eb"
    - label: Soft Gold
      value: "#b68a35"
      strong: "#8a6724"
```

Rules:

- `value` maps to `--dig-accent-2`.
- `strong` maps to `--dig-accent-2-strong`.
- Clicking a candidate in the render page updates live CSS variables only.
- Palette Lab also exposes `--dig-accent-strong` and `--dig-accent-2-strong` as explicit editable token rows so strong colors do not silently drift from their base accents.
- A preview choice is not canonical until the copied token values are written back into `## Dig UI CSS Tokens` and the `## Palette Contract` stays aligned.
- Do not auto-write palette Markdown from the render page in Phase 1.

## Radix-Inspired Scale

For every chromatic anchor that behaves like a UI color, derive a role-aware scale. This follows the Radix Colors idea that scale steps should map to UI use cases rather than arbitrary lightness stops.

```text
1-2   backgrounds
3-5   component backgrounds, hover, selected
6-8   borders, focus rings, stronger separators
9-10  solid action backgrounds and solid hover
11-12 text on subtle backgrounds
```

Dig does not need to expose Radix variable names. Use Dig semantic aliases over the generated scale:

```css
--dig-accent: var(--dig-primary-9);
--dig-accent-strong: var(--dig-primary-10);
--dig-accent-2: var(--dig-support-9);
--dig-accent-2-strong: var(--dig-support-10);
```

Phase 1 uses manual curated stops only. If a curated palette has fewer than 12 reliable stops, document the curated stops and state which semantic roles they serve. Agents must not invent missing scale stops from the four anchors.

## Site Palette Roles

In addition to scale-derived tokens, every palette catalog should declare site-level roles inspired by whole-site palette systems:

```yaml
site_roles:
  page_background: "{anchors.canvas}"
  headline: "{anchors.ink}"
  body_text: "{anchors.ink}"
  muted_text: "derived"
  cta_background: "{anchors.primary}"
  cta_text: "contrast"
  card_background: "derived"
  card_text: "{anchors.ink}"
  link: "{anchors.primary}"
  illustration_highlight: "{anchors.support}"
  focus_ring: "derived_roles.focus"
  disabled_text: "derived_roles.disabled"
  overlay: "derived_roles.overlay"
```

These roles let agents apply a palette to a whole page without guessing where each color belongs.

Every palette must also declare runtime derived roles:

```yaml
derived_roles:
  surface: "#ffffff"
  muted: "#6b7280"
  focus: "#0071e3"
  disabled: "rgba(0, 0, 0, 0.32)"
  overlay: "rgba(0, 0, 0, 0.42)"
```

## Dig UI CSS Tokens

Every palette catalog must still emit the required Dig token roles:

```css
--dig-bg
--dig-bg-soft
--dig-surface
--dig-surface-strong
--dig-surface-elevated
--dig-text
--dig-text-muted
--dig-text-soft
--dig-accent
--dig-accent-strong
--dig-accent-2
--dig-accent-2-strong
--dig-border
--dig-border-strong
--dig-grid-line
--dig-control-bg
--dig-control-bg-hover
```

Palette catalogs may introduce additional scale tokens such as:

```css
--dig-primary-1 ... --dig-primary-12
--dig-support-1 ... --dig-support-12
--dig-neutral-1 ... --dig-neutral-12
```

Components should consume semantic tokens first. Scale tokens are for palette construction, illustrations, charts, and carefully documented variants.

## Minimum Skeleton

````markdown
---
slug: palette01
name: Palette 01
name_zh: Palette 01
name_en: Palette 01
kind: color-palette-catalog
category: palettes
token_contract: palette_v1
status: draft
description_zh: 一套清晰、系统原生、高对比的产品工作台配色。
description_en: A crisp color-first product palette for dashboards and product workspaces.
---

# Palette 01

## Palette Contract

```yaml
best_for:
  - dashboard
  - product workspace
  - developer tool
mood:
  - crisp
  - system-native
  - high-contrast
anchors:
  canvas: "#f7f7f7"
  ink: "#000000"
  primary: "#0071e3"
  support: "#4fb3ff"
derived_roles:
  surface: "#ffffff"
  muted: "#6b7280"
  focus: "#0071e3"
  disabled: "rgba(0, 0, 0, 0.32)"
  overlay: "rgba(0, 0, 0, 0.42)"
site_roles:
  page_background: "{anchors.canvas}"
  headline: "{anchors.ink}"
  body_text: "{anchors.ink}"
  muted_text: "derived_roles.muted"
  cta_background: "{anchors.primary}"
  cta_text: "#ffffff"
  card_background: "derived_roles.surface"
  card_text: "{anchors.ink}"
  link: "{anchors.primary}"
  illustration_highlight: "{anchors.support}"
  focus_ring: "derived_roles.focus"
  disabled_text: "derived_roles.disabled"
  overlay: "derived_roles.overlay"
derivation:
  method: manual-curated-stops
  inspiration: radix-inspired-role-scale
  generator: none
  generator_status: future
contrast:
  body_text_on_page_background: "AA"
  cta_text_on_cta_background: "AA"
```

## Dig UI CSS Tokens

```css
--dig-bg: #f7f7f7;
--dig-bg-soft: #ffffff;
--dig-surface: #ffffff;
--dig-surface-strong: #f1f5f9;
--dig-surface-elevated: #ffffff;
--dig-text: #000000;
--dig-text-muted: #4b5563;
--dig-text-soft: #6b7280;
--dig-accent: #0071e3;
--dig-accent-strong: #006edb;
--dig-accent-2: #4fb3ff;
--dig-accent-2-strong: #2697eb;
--dig-border: rgba(0, 0, 0, 0.56);
--dig-border-strong: rgba(0, 0, 0, 0.75);
--dig-grid-line: rgba(0, 0, 0, 0.56);
--dig-control-bg: rgb(250, 250, 252);
--dig-control-bg-hover: rgb(245, 245, 247);
--dig-font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--dig-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
--dig-text-md: 16px;
--dig-text-5xl: 56px;
--dig-leading-normal: 1.55;
--dig-leading-tight: 1.05;
--dig-radius-md: 8px;
--dig-radius-pill: 999px;
```
````

## Rules

- Do not mix multiple palette catalogs in one page or page group.
- Do not mix a palette catalog with a brand catalog unless the user explicitly asks for a hybrid. If hybridizing, choose one as the base and document the other as inspiration only.
- Palette catalogs must define where colors are used, not only list hex values.
- Palette catalogs must keep `category`, directory, manifest group, and render registry group aligned as `palettes`.
- Palette catalog filename, frontmatter `slug`, render URL, and registry slug must match exactly.
- Palette catalog files must be direct children of `references/catalogs/palettes/`; nested palette folders are not part of Phase 1.
- New palette catalogs must explicitly declare `token_contract: palette_v1`.
- Preserve accessibility: text roles must have documented contrast against their intended backgrounds.
- Preserve page semantics: changing palette must not change layout, component semantics, or interaction model.
