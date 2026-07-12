# Dig UI Local Extensions

Project-specific layout, block, palette, and style assets live here. They let a team keep reusable product structure and user-approved visual assets without changing the official Dig UI domain assets.

## Priority

```text
user prompt
> references/local/palettes/ or references/local/styles/ when explicitly requested
> references/global-rules.local.md
> references/local/
> installed language assets
> references/shared/
```

## Rules

- Prefer `extends` over copying an official asset.
- Use a project or business namespace, such as `project-*`, to avoid slug collisions.
- Put synced user palettes in `palettes/` and synced user styles in `styles/`; these are local user assets, not built-in catalog entries.
- Put true replacements in `overrides/` and include `owner`, `reason`, `reviewed_at`, and `replacement_target`.
- Local assets must have render fixtures before they are considered maintainable.
- Local assets are not part of official language parity checks.
