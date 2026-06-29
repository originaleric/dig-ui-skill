# Dig UI Global Rules

Default cross-catalog and cross-layout behavior rules for Dig product UI generation and review. These rules apply by default unless the user explicitly opts out.

`references/global-rules.md` is the canonical English source. `references/global-rules.zh-CN.md` is a Chinese translation for reading and review. Rule ids and section headings should stay aligned across both files.

## Priority

1. Current user prompt
2. `references/global-rules.local.md` when present
3. This file, `references/global-rules.md`
4. Catalog rules in `references/catalogs/**/*.md`
5. Layout recipes and primitives

## Opt-Out

If the user explicitly says "no global rules", "skip global", or "do not use global", skip this file and any local global rules for the current task. Use only catalog, layout, and primitive guidance.

## i18n

- Visible UI copy must come from language resources, dictionaries, or equivalent centralized content, not mixed hard-coded strings inside components.
- At minimum, cover navigation, page titles, form labels, buttons, states, and error messages.
- Language switching should use a `zh-CN` / `en` segmented pill; Chinese may display as `中`, English as `EN`.
- Changing language must update `document.documentElement.lang` and persist the user's preference in localStorage or an equivalent settings store.
- When a header or topbar exists, place the language control near the theme control, usually in the top-right control group.

## Dark / Light Theme

- Every Dig product UI must provide both `dark` and `light` modes.
- Theme switching only changes token values, CSS variables, theme objects, or equivalent theme values; it must not change component semantics or structure.
- Component styles must reference `--dig-*` tokens or project theme variables, avoiding hard-coded dark/light hex values inside components.
- Global rules define theme behavior only; they do not provide cross-catalog color values. `dark` / `light` tokens must be derived from the selected catalog's brand colors, background, surface, and text relationships.
- Do not use the `dig` catalog's deep-blue background (`#06121a` / `#0b1b26`) as the default or fallback dark background for other catalogs. Use it only when the selected catalog is explicitly `dig`.
- Light mode must at least cover `--dig-bg`, `--dig-bg-soft`, `--dig-surface`, `--dig-surface-strong`, `--dig-surface-elevated`, `--dig-text`, `--dig-text-muted`, `--dig-text-soft`, `--dig-border`, `--dig-grid-line`, `--dig-control-bg`, and `--dig-control-bg-hover`.
- Theme switching should use a `dark` / `light` segmented pill. The active item uses `--dig-accent`; inactive items use muted text and transparent backgrounds.
- Theme controls must stay visually quieter than the primary CTA and should be smaller than primary buttons.

## Buttons / Form Controls

- Primary buttons, secondary buttons, form inputs, select triggers, and select options default to pill geometry: `border-radius: var(--dig-radius-pill)`.
- Buttons must keep a minimum touch height of `44px`; hover and focus states must not change height, padding, or radius.
- Form controls, selects, and control bars must use `--dig-control-bg` / `--dig-control-bg-hover`, not fixed dark rgba values.

## Layout / Components Consistency

> This section defines page-level structure and repeated-component consistency. Users may add personal preferences in `global-rules.local.md` using the same subheadings, for example overriding only `Header`, `Footer`, or `Collections`.

### Layout Shell

- A product or page group must establish a stable layout shell before expanding individual pages. Do not reinvent the overall structure and CSS on every page.
- `header`, `footer`, `sidebar`, `topbar`, `main content`, `secondary panel`, and `modal/drawer` placement, width strategy, spacing, z-index, scroll regions, and responsive breakpoints should reuse one rule set.
- Visual variation should come from catalog tokens, layout recipes, or explicit variants. Do not create local style drift with one-off colors, radii, shadows, borders, or background patterns.

### Header / Topbar

- Header / topbar height, horizontal padding, brand area, primary navigation, tool area, language switcher, theme switcher, and user menu placement must stay stable within one product.
- Primary CTAs, secondary actions, icon buttons, and search entry points inside the header should use the same button/control primitives. Do not change interaction density or visual hierarchy between pages.
- Sticky / fixed / static header behavior must be consistent per page group. Scroll shadows, borders, and blur effects must use tokenized styles.

### Footer

- Footer columns, link groups, copyright, social links, auxiliary notes, and CTA areas must use a stable structure. Do not mix multiple footer information architectures within one site.
- Marketing, docs, and dashboard surfaces may use different footer variants, but each variant must be clearly named and reuse shared spacing, typography, and divider tokens.

### Sidebar / Navigation

- Sidebar and secondary navigation width, group labels, active states, collapsed states, icon/text alignment, and hover/focus styles must be consistent.
- Current page, parent expansion, disabled, badge/count, and loading states must be covered as a set. Do not patch state styles for only one page.

### Main Content / Page Sections

- Main content max-width, grid, section gap, title area, description copy, primary action area, empty states, and error states must stay consistent within one page group.
- Section titles, descriptions, right-side actions, content containers, dividers, and background hierarchy must reuse section primitives. Do not make every section feel like a separate style system.

### Toolbars / Filters / Actions

- Bulk actions, filters, sorting, pagination, search, and export controls must match the surrounding page/list/table pattern. Do not invent a new toolbar layout on every page.
- Toolbar control order, spacing, alignment, wrapping, and mobile collapse behavior must be stable. Search, filters, and primary actions must not drift in priority across pages.

### Collections / Lists / Tables / Grids

- Similar collections on the same page must reuse one pattern, such as `table`, `row list`, `card list`, `feed`, `timeline`, or `grid`. Choose the pattern by information type; do not mix multiple arrangements inside one business list.
- Within one collection instance, primary information, secondary information, status, and action areas must stay in stable positions. Cover default, hover, focus-visible, selected, disabled, loading, empty, and error states as a complete set.
- `compact`, `comfortable`, and `spacious` density variants are allowed, but density must be applied consistently at the page, region, or component-instance level. Do not let neighboring same-type items vary randomly in height or spacing.

### Cards / Panels / Empty States

- Similar cards, panels, stat blocks, and empty states must reuse the same header, body, footer, action slot, and icon/media slot structure.
- Card and panel radius, border, shadow, surface, padding, and hover states must come from tokens or explicit variants. Do not create new local container styles for one-off content.

### Forms / Settings Rows

- Form rows, labels, helper text, error text, required markers, field groups, and submit bars must keep stable layout and spacing within one page group.
- Settings rows, preference items, toggle rows, and destructive action areas must reuse one row primitive and cover disabled, loading, error, and success states.

### Responsive Behavior

- Responsive degradation must preserve semantics. A desktop table may become stacked rows/cards on mobile, but field order, status placement, primary action priority, and information hierarchy must stay aligned with desktop.
- Header, sidebar, toolbar, collection, and modal/drawer mobile collapse behavior must be consistent per page group. Do not use different breakpoints or drawer behaviors on every page.

### CSS / Primitive Discipline

- Repeated components must reuse one primitive or component class set, such as button groups, filter bars, search boxes, pagination, status badges, data cards, form rows, settings rows, notification items, and list items. Do not write several near-identical CSS systems for the same semantic role.
- Component padding, gap, border, radius, divider, hover background, shadow, and density must be expressed through tokens, component classes, or project primitives. Do not write local one-off CSS for repeated components.

## Select (HTML Preview / React)

- Static HTML maintenance previews may use native `<select class="dig-select">` + `<option>` when a preview page needs a lightweight non-product control.
- React product UI must use project-level React components such as `Select`, `SelectTrigger`, `SelectContent`, and `SelectOption`. Do not use bare native `<select>` / `<option>` as final product UI controls.
- Selects and inputs both use pill radius and `--dig-control-bg` tokens.
- Option list backgrounds use `--dig-surface-strong`; active and hover options use accent tint without changing option height.

## Interaction / Icons

- Hover and focus states stay restrained: prefer color, border, glow, and opacity changes rather than motion jumps.
- Prefer Lucide-style linear icons. Do not use emoji-like decorative icons for product controls.
- Active states should be stronger than hover states, but should not use scale or translate animation.

## Manifest (For Render Injection)

```yaml
rules:
  - id: i18n
    summary: UI copy comes from language resources; zh-CN/en switching syncs html[lang] and persists preference
  - id: theme-mode
    summary: Dark/light modes switch token/theme values without hard-coded colors
  - id: pill-buttons
    summary: Primary/secondary buttons and form controls default to pill radius, min-height 44px
    validate:
      buttonPillRadius: true
  - id: consistency
    summary: Page shell, repeated components, collection patterns, and responsive behavior stay consistent
  - id: react-select
    summary: HTML previews use .dig-select; React product UI uses project Select components
    validate:
      requireDigSelectClass: true
      selectPillRadius: true
  - id: interaction
    summary: Restrained hover/focus behavior; Lucide-style linear icons
```
