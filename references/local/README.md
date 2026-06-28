# Dig UI Local Extensions

Project-specific layout and block assets live here. They let a team keep reusable product structure without changing the official Dig UI language pack.

## Priority

```text
user prompt
> references/global-rules.local.md
> references/local/
> installed language package
> references/shared/
```

## Rules

- Prefer `extends` over copying an official asset.
- Use a project or business namespace, such as `project-*`, to avoid slug collisions.
- Put true replacements in `overrides/` and include `owner`, `reason`, `reviewed_at`, and `replacement_target`.
- Local assets must have render fixtures before they are considered maintainable.
- Local assets are not part of official language parity checks.
