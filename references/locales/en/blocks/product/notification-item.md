---
id: notification-item
category: product
status: active
description: Notification row protocol for inboxes, alerts, approvals, and system events.
applicable_layouts: [notification-inbox, dashboard-overview]
compatible_catalogs: [dig, mono]
---

# Notification Item

## Use When
- Showing a time-ordered event, alert, approval request, or user-facing system notification.

## Avoid When
- The item is a searchable document result; use `search-result-row`.

## Slots
- `status_icon`, `title`, `summary`, `timestamp`, `actor`, `actions`, `read_state`.

## Token Binding
- Use `--dig-surface`, `--dig-surface-hover`, `--dig-border`, `--dig-text`, `--dig-muted`, and semantic status tokens.

## States
- unread, read, selected, hover, focus-visible, loading, error, archived, mobile.

## Responsive Rules
- Keep the title and timestamp visible on mobile; move secondary actions into an overflow menu.

## Accessibility
- Mark unread state textually, not by color alone. Action menus need labels and keyboard access.

## Anti-Patterns
- Do not make every notification a large card. Do not hide severity behind decorative color only.

## QA Notes
- Check unread density, timestamp alignment, long titles, bulk selection, and mobile overflow.
