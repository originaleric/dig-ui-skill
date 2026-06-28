---
id: search-result-row
category: product
status: active
description: Search result row protocol for global search, docs search, run search, and settings search.
applicable_layouts: [search-results, docs-article, data-table-workspace]
compatible_catalogs: [dig, mono]
---

# Search Result Row

## Use When
- Showing ranked or filtered results with title, source, snippet, metadata, and quick actions.

## Avoid When
- The content is an event or alert stream; use `notification-item`.

## Slots
- `type_icon`, `title`, `source`, `snippet`, `metadata`, `match_highlight`, `actions`.

## Token Binding
- Use `--dig-surface`, `--dig-surface-hover`, `--dig-border`, `--dig-text`, `--dig-muted`, and highlight tokens.

## States
- default, hover, focus-visible, selected, loading, empty, error, mobile.

## Responsive Rules
- Keep title and source visible. Clamp snippets to two lines on mobile and move secondary metadata below.

## Accessibility
- Search highlight must not be color-only; preserve readable contrast and keyboard focus.

## Anti-Patterns
- Do not mix result rows with card/feed layouts in the same result set. Do not overemphasize snippets over titles.

## QA Notes
- Check long queries, no results, keyboard navigation, selected state, and mixed result types.
