# Dig UI Global Rules — Local Override Example

Copy or sync this file as `global-rules.local.md` to override or extend global rules locally without editing the shared canonical file.

`references/global-rules.md` is the canonical English source. `references/global-rules.zh-CN.md` is a Chinese translation. Local rules may be written in any language, but using the same English section headings and stable rule ids is recommended for cross-tool consistency.

## Usage

Prefer the CLI-managed user config outside the repository:

```bash
npx dig-ui-skill local init
npx dig-ui-skill local sync --all --from-config
```

Manual copy is also supported inside a tool skill directory:

```bash
cp references/global-rules.local.example.md references/global-rules.local.md
```

After editing `global-rules.local.md`:

- AI generation / review: local rules take priority over `global-rules.md`.
- Local rules are applied by agents before catalog/layout/block guidance; use `dig-ui-skill validate renders` to check localized assets and catalog render health.
- `--no-global` skips both local and default global rules.

## Example Overrides

Use the same section headings as `global-rules.md` when possible. Add only the local preference you want to override or extend.

## Buttons / Form Controls

- Internal admin pages may use `var(--dig-radius-sm)` for secondary buttons, while primary actions remain pill-shaped.

## Layout / Components Consistency

### Header / Topbar

- Internal tools prefer a compact topbar height and keep environment switcher, theme switcher, and user menu in one right-aligned control group.

### Collections / Lists / Tables / Grids

- Back-office data tables default to `compact` density; marketing and docs collections default to `comfortable` density.

## i18n

- Default language is `en`, while `zh-CN` switching remains available.

## Manifest (For Render Injection)

Local manifests merge with the default manifest by `id`. Use `validate` fields to turn local validation behavior on or off.

```yaml
rules:
  - id: pill-buttons
    summary: Internal secondary buttons may use a smaller radius
    validate:
      buttonPillRadius: false
  - id: consistency
    summary: Internal tools default to compact tables and compact topbars
```
