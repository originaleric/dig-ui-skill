# Dig Read And Dials

Dig Read is the short design inference an agent writes before selecting a layout, catalog, and blocks. It turns a user request into an executable UI context.

## Format

```text
Dig Read:
<task type> page for <target user / job>;
using <layout> layout + <catalog> catalog;
blocks: <primary blocks or "none yet">.

INFORMATION_DENSITY: <1-10>
BRAND_EXPRESSIVENESS: <1-10>
INTERACTION_ENERGY: <1-10>
OPERATIONAL_CRITICALITY: <1-10>
```

## Dial Meanings

### INFORMATION_DENSITY

- `1-3`: spacious, brand-led, empty-state, or marketing surfaces.
- `4-6`: ordinary product pages with balanced scanning and whitespace.
- `7-10`: dashboards, tables, logs, run details, inspectors, and dense workspaces.

### BRAND_EXPRESSIVENESS

- `1-3`: quiet operational UI where task clarity wins.
- `4-6`: recognizable Dig product feel without decorative dominance.
- `7-10`: stronger launch, onboarding, marketing, or brand moments.

### INTERACTION_ENERGY

- `1-3`: static controls with basic hover, focus, and active states.
- `4-6`: normal product feedback and clear state changes.
- `7-10`: live status, streaming logs, progress, step transitions, and runtime feedback.

### OPERATIONAL_CRITICALITY

- `1-3`: informational or exploratory surfaces.
- `4-6`: ordinary work pages with reversible actions.
- `7-10`: billing, deployment, permissions, destructive actions, debugging, failures, and recovery paths.

## Selection Rules

- Layout comes before catalog. Layout defines information structure; catalog defines visual language.
- User-specified catalog wins. If unspecified, use the layout `default_catalog` and `recommended_catalogs`.
- Blocks are selected after layout because they fill slots and repeated module needs.
- Dials do not create a new style system. They tune spacing, density, state coverage, motion, and visual emphasis inside the chosen layout/catalog/block contract.
- For execution surfaces, prefer `task_type: execution`; treat `runtime` as a legacy page type or future catalog/skin only when the user clearly means visual language.

## Example

```text
Dig Read:
execution run detail page for engineers debugging an agent run;
using agent-run-detail layout + dig catalog;
blocks: run-status-header, step-timeline, runtime-log-stream.

INFORMATION_DENSITY: 8
BRAND_EXPRESSIVENESS: 4
INTERACTION_ENERGY: 7
OPERATIONAL_CRITICALITY: 9
```
