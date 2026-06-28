# Local Layout Rules

Use this file to define project-level layout preferences that apply before official layout recipes.

## Extension Rules

- Local layouts should use `extends: <official-layout-slug>` whenever possible.
- Local layouts must include `owner`, `status`, `task_type`, `default_catalog`, and `required_slots`.
- Local layouts may add slots, but should not remove official required slots unless placed in `overrides/`.
- Local layouts must provide a fixture in `references/render-fixtures/layouts/`.

## Override Rules

Overrides must live in `references/local/overrides/` and include:

```yaml
replacement_target: official-layout-slug
owner: team-or-person
reason: why the official layout is not enough
reviewed_at: YYYY-MM-DD
```
