# Local Block Rules

Use this file to define project-level blocks that should be reused by agents.

## Extension Rules

- Local blocks should use `extends: <official-block-id>` whenever possible.
- Local blocks must include `owner`, `status`, `category`, `applicable_layouts`, and `compatible_catalogs`.
- Local block ids should use a project or business namespace.
- Local blocks must document slots, states, responsive behavior, accessibility, and anti-patterns clearly enough for agents to reuse them without a rendered fixture.

## Override Rules

Overrides must live in `references/local/overrides/` and include:

```yaml
replacement_target: official-block-id
owner: team-or-person
reason: why the official block is not enough
reviewed_at: YYYY-MM-DD
```
