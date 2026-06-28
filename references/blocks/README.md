# Dig Block Library

Blocks 是 AI 可读的组件 / 模块协议，用来说明一个 UI 单元什么时候使用、如何绑定 token、需要哪些 slots 和 states，以及要避免哪些反模式。

## Schema

```yaml
required_frontmatter:
  id: 稳定 kebab-case id
  category: primitive | product
  status: draft | active | deprecated
  description: 一句话说明用途
  applicable_layouts: 数组；只有真正 layout 无关时才用 [all]
  compatible_catalogs: 数组；只有真正 catalog 无关时才用 [all]
optional_frontmatter:
  extends: 扩展官方 block 时填写
  owner: local block 必填
  replacement: status 为 deprecated 时必填
  task_types: 例如 execution, dashboard, settings, docs, marketing
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

## Index

Primitive: `button`, `input`, `select`, `form-row`, `toast`, `modal`, `tooltip`, `tabs`.

Product: `table-toolbar`, `runtime-log-stream`, `run-status-header`, `step-timeline`, `settings-row`, `empty-state`, `notification-item`, `search-result-row`.
