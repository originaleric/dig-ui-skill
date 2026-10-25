# Dig Block Library

Blocks are AI-readable component and module protocols. They describe when to use a UI unit, how it binds to tokens, which slots and states are required, and which anti-patterns to avoid.

## Schema

```yaml
required_frontmatter:
  id: stable kebab-case id
  category: primitive | product
  status: draft | active | deprecated
  description: one sentence purpose
  applicable_layouts: array; use [all] only when genuinely layout-agnostic
  compatible_catalogs: array; use [all] only when genuinely catalog-agnostic
optional_frontmatter:
  extends: official block id when this block extends another block
  owner: required for local blocks
  replacement: required when status is deprecated
  task_types: e.g. execution, dashboard, settings, docs, marketing
required_sections:
  - Use When
  - Avoid When
  - Slots
  - Token Binding
  - States
  - Responsive Rules
  - Accessibility
  - Anti-Patterns
  - QA Notes
```

## Slot Usage

Slots list available parts; an instance does not need to render every slot. Provide `description` / `helper` only as needed, while preserving necessary labels, accessible names, errors, constraints, and risk explanations. If a block requires a reason or next step, clear title, body, or action copy can convey it without a duplicate description. Apply the UI Copy / Information Hierarchy rules in `references/global-rules.md` when deciding which visible copy to keep.

## Index

Primitive: `button`, `input`, `select`, `form-row`, `toast`, `modal`, `tooltip`, `tabs`.

Product: `table-toolbar`, `runtime-log-stream`, `run-status-header`, `step-timeline`, `settings-row`, `empty-state`, `notification-item`, `search-result-row`.
