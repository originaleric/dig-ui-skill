#!/usr/bin/env python3
# Compiles references/blocks/**/*.md into renders/blocks/*.html preview pages.

import html
import json
import os
import re

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
BLOCK_DIR = os.path.join(PROJECT_DIR, "references", "blocks")
RENDER_DIR = os.path.join(PROJECT_DIR, "renders", "blocks")
FIXTURE_DIR = os.path.join(PROJECT_DIR, "references", "render-fixtures", "blocks")
SCHEMA_VERSION = "2"
LOCALIZED_MARKDOWN_PATTERN = re.compile(r"\.(en|zh-CN)\.md$")

REQUIRED_STATES = [
    "default",
    "hover",
    "focus-visible",
    "disabled",
    "loading",
    "error",
    "mobile",
]

CATALOG_PREVIEW_SKINS = [
    {
        "id": "dig",
        "label": "Dig",
        "description": "Default Dig product preview",
        "tokens": {
            "--dig-bg": "#06121a",
            "--dig-surface": "rgba(16,32,44,.92)",
            "--dig-surface-raised": "rgba(20,39,53,.96)",
            "--dig-control-bg": "rgba(9,21,31,.92)",
            "--dig-text": "#ecf3f8",
            "--dig-muted": "#8aa0b2",
            "--dig-accent": "#37d67a",
            "--dig-accent-2": "#86e7ff",
            "--dig-warning": "#f6c76d",
            "--dig-danger": "#f06a6a",
            "--dig-danger-text": "#180909",
            "--dig-border": "rgba(138,160,178,.22)",
            "--dig-border-strong": "rgba(138,160,178,.38)",
        },
    },
    {
        "id": "mono",
        "label": "Mono",
        "description": "Dense debugging preview",
        "tokens": {
            "--dig-bg": "#0d0f10",
            "--dig-surface": "rgba(24,26,28,.94)",
            "--dig-surface-raised": "rgba(31,34,36,.98)",
            "--dig-control-bg": "rgba(12,13,14,.92)",
            "--dig-text": "#f1f3f2",
            "--dig-muted": "#9da3a0",
            "--dig-accent": "#f4f7f5",
            "--dig-accent-2": "#b9c0bc",
            "--dig-warning": "#d8c27a",
            "--dig-danger": "#ff7777",
            "--dig-danger-text": "#180909",
            "--dig-border": "rgba(177,184,180,.22)",
            "--dig-border-strong": "rgba(210,216,212,.36)",
        },
    },
    {
        "id": "editorial",
        "label": "Editorial",
        "description": "Narrative and report preview",
        "tokens": {
            "--dig-bg": "#11100e",
            "--dig-surface": "rgba(34,32,28,.94)",
            "--dig-surface-raised": "rgba(43,40,34,.98)",
            "--dig-control-bg": "rgba(18,17,15,.92)",
            "--dig-text": "#f7f1e8",
            "--dig-muted": "#b5a999",
            "--dig-accent": "#f2c86b",
            "--dig-accent-2": "#e9a66a",
            "--dig-warning": "#f2c86b",
            "--dig-danger": "#e46f67",
            "--dig-danger-text": "#1d0b08",
            "--dig-border": "rgba(214,197,169,.22)",
            "--dig-border-strong": "rgba(242,200,107,.42)",
        },
    },
    {
        "id": "wise",
        "label": "Wise",
        "description": "Mobile fintech preview",
        "tokens": {
            "--dig-bg": "#07130f",
            "--dig-surface": "rgba(16,38,28,.94)",
            "--dig-surface-raised": "rgba(23,50,37,.98)",
            "--dig-control-bg": "rgba(8,25,18,.92)",
            "--dig-text": "#f1fff7",
            "--dig-muted": "#9fc0ad",
            "--dig-accent": "#9fe870",
            "--dig-accent-2": "#65d6ad",
            "--dig-warning": "#ffe27a",
            "--dig-danger": "#ff7373",
            "--dig-danger-text": "#1b0808",
            "--dig-border": "rgba(159,232,112,.24)",
            "--dig-border-strong": "rgba(159,232,112,.46)",
        },
    },
    {
        "id": "apple",
        "label": "Apple",
        "description": "Premium product preview",
        "tokens": {
            "--dig-bg": "#f5f5f7",
            "--dig-surface": "rgba(255,255,255,.9)",
            "--dig-surface-raised": "rgba(255,255,255,.98)",
            "--dig-control-bg": "rgba(232,232,237,.82)",
            "--dig-text": "#1d1d1f",
            "--dig-muted": "#6e6e73",
            "--dig-accent": "#0071e3",
            "--dig-accent-2": "#5e5ce6",
            "--dig-warning": "#b26a00",
            "--dig-danger": "#d70015",
            "--dig-danger-text": "#ffffff",
            "--dig-border": "rgba(29,29,31,.16)",
            "--dig-border-strong": "rgba(29,29,31,.28)",
        },
    },
]


def escape(value):
    return html.escape(str(value), quote=True)


def parse_frontmatter(content):
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return {}
    meta = {}
    for line in match.group(1).split("\n"):
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        meta[key.strip()] = val.strip().strip("\"'")
    return meta


def extract_section(content, heading):
    match = re.search(rf"^## {re.escape(heading)}\s*\n(.*?)(?=\n## |\Z)", content, re.MULTILINE | re.DOTALL)
    return match.group(1).strip() if match else ""


def parse_bullets(section):
    items = []
    for line in section.splitlines():
        stripped = line.strip()
        if stripped.startswith("- "):
            items.append(stripped[2:].strip())
    return items


def parse_slots(content):
    slots = []
    for match in re.finditer(r"`([^`]+)`", extract_section(content, "Slots")):
        slot = match.group(1).strip()
        if slot and slot not in slots:
            slots.append(slot)
    return slots


def list_block_files():
    files = []
    if not os.path.exists(BLOCK_DIR):
        return files
    for root, _, names in os.walk(BLOCK_DIR):
        for name in names:
            if not name.endswith(".md"):
                continue
            if name.startswith("README"):
                continue
            if LOCALIZED_MARKDOWN_PATTERN.search(name):
                continue
            files.append(os.path.join(root, name))
    return sorted(files)


def fallback_examples(block_id, states):
    examples = []
    preferred = [state for state in states if state in ("default", "basic", "streaming", "unread", "enabled")]
    seed = preferred[0] if preferred else (states[0] if states else "default")
    examples.append({
        "id": "basic",
        "title": "Basic usage",
        "description": f"Default {block_id} contract with its primary slots visible.",
        "state": seed,
        "slots_used": [],
        "behavior": "Use this example to verify baseline structure before applying catalog skins.",
        "qa": "All documented slots must remain visible or intentionally represented in anatomy.",
    })
    for state in states:
        if state in (seed, "mobile"):
            continue
        examples.append({
            "id": state.replace("_", "-"),
            "title": state.replace("-", " ").title(),
            "description": f"{block_id} behavior when the semantic state is {state}.",
            "state": state,
            "slots_used": [],
            "behavior": "Keep the same block contract while changing only state-driven affordances.",
            "qa": "Confirm layout does not jump and the state is perceivable without relying on color alone.",
        })
        if len(examples) >= 4:
            break
    return examples


def fallback_state_semantics(states):
    labels = {
        "default": ("Ready", "Initial usable state", "Baseline preview renders without warnings."),
        "basic": ("Ready", "Initial usable state", "Baseline preview renders without warnings."),
        "hover": ("Pointer emphasis", "Pointer enters actionable surface", "Emphasis appears without moving layout."),
        "focus-visible": ("Keyboard focus", "Keyboard navigation reaches the control", "Visible focus ring is present."),
        "disabled": ("Unavailable", "Permission, prerequisite, or async lock prevents action", "Disabled surface is not interactive."),
        "loading": ("Pending", "Async validation or mutation is in progress", "Action text and controls remain stable."),
        "error": ("Needs attention", "Validation, network, or system failure", "Error copy is explicit and tied to the failed area."),
        "empty": ("No data", "Query, filter, or source returns no items", "Recovery action or useful next step is visible."),
        "mobile": ("Narrow viewport", "Viewport under mobile breakpoint", "Content stacks without overlap."),
    }
    return {
        state: {
            "meaning": labels.get(state, (state.replace("-", " ").title(), "", ""))[0],
            "trigger": labels.get(state, ("", "State-specific product condition", ""))[1],
            "qa": labels.get(state, ("", "", "Preview remains understandable and stable."))[2],
        }
        for state in states
    }


def load_fixture(block_id):
    fixture_path = os.path.join(FIXTURE_DIR, f"{block_id}.json")
    if not os.path.exists(fixture_path):
        states = REQUIRED_STATES
        return {
            "name": "generated-required-states",
            "states": states,
            "examples": fallback_examples(block_id, states),
            "state_semantics": fallback_state_semantics(states),
            "path": "generated",
        }
    with open(fixture_path, "r", encoding="utf-8") as f:
        fixture = json.load(f)
    states = fixture.get("states") or REQUIRED_STATES
    examples = fixture.get("examples") or fallback_examples(block_id, states)
    state_semantics = fixture.get("state_semantics") or fallback_state_semantics(states)
    return {
        "name": os.path.basename(fixture_path),
        "states": states,
        "examples": examples,
        "state_semantics": state_semantics,
        "path": os.path.relpath(fixture_path, PROJECT_DIR),
    }


def button(label, kind="primary", slot_name="label", disabled=False, extra_class=""):
    disabled_attr = " disabled" if disabled else ""
    classes = f"demo-button {kind} {extra_class}".strip()
    return f'<button class="{escape(classes)}" data-slot="{escape(slot_name)}"{disabled_attr}>{label}</button>'


def badge(label, tone="neutral", slot_name="status"):
    return f'<span class="badge {escape(tone)}" data-slot="{escape(slot_name)}">{escape(label)}</span>'


def icon(label, slot_name="icon"):
    return f'<span class="icon-box" data-slot="{escape(slot_name)}">{escape(label)}</span>'


def render_button_preview(state):
    loading = state == "loading"
    disabled = state == "disabled"
    kind = "danger" if state in ("destructive", "error") else "primary"
    label = "Saving..." if loading else ("Delete run" if kind == "danger" else "Run action")
    return f"""
          <div class="button-strip" data-renderer="button">
            {button(label, kind, "label", disabled or loading)}
            {button("[i] Inspect", "secondary", "icon", disabled)}
            {button("Command K", "ghost", "shortcut", disabled)}
            {button("...", "quiet", "loading_indicator", disabled)}
          </div>"""


def render_input_preview(state):
    error = state == "error"
    disabled = state == "disabled"
    loading = state == "loading"
    helper = "API key is required." if error else ("Checking value..." if loading else "Use a project-scoped value.")
    value = "" if state == "empty" else "dig-agent-prod"
    return f"""
          <label class="field-stack input-demo" data-renderer="input">
            <span class="field-label" data-slot="label">Environment name</span>
            <div class="control-shell {'is-error' if error else ''} {'is-disabled' if disabled else ''}" data-slot="control">
              <span class="control-prefix" data-slot="prefix_icon">ENV</span>
              <input value="{escape(value)}" placeholder="dig-agent-prod" {'disabled' if disabled else ''} />
              <button class="control-action" data-slot="suffix_action" {'disabled' if disabled else ''}>Clear</button>
            </div>
            <span class="helper {'danger-text' if error else ''}" data-slot="{'error' if error else 'helper'}">{escape(helper)}</span>
          </label>"""


def render_select_preview(state):
    error = state == "error"
    disabled = state == "disabled"
    return f"""
          <div class="field-stack select-demo" data-renderer="select">
            <span class="field-label" data-slot="label">Severity</span>
            <button class="select-trigger {'is-error' if error else ''}" data-slot="trigger" {'disabled' if disabled else ''}>
              <span data-slot="value">{'Failed only' if error else 'Warning and above'}</span>
              <span>v</span>
            </button>
            <div class="option-list" data-slot="option_list">
              <span>All events</span><span class="is-selected">Warning and above</span><span>Errors only</span>
            </div>
            <span class="helper {'danger-text' if error else ''}" data-slot="{'error' if error else 'helper'}">{'Choose at least one severity.' if error else 'Filters the live stream.'}</span>
          </div>"""


def render_form_row_preview(state):
    error = state == "error"
    disabled = state == "disabled"
    return f"""
          <div class="form-row-demo" data-renderer="form-row">
            <div>
              <span class="field-label" data-slot="label">Retry budget <span data-slot="required_marker">*</span></span>
              <span class="helper {'danger-text' if error else ''}" data-slot="{'error' if error else 'helper'}">{'Enter a value from 1 to 8.' if error else 'Applies to tool calls in this run.'}</span>
            </div>
            <div class="stepper" data-slot="control">
              <button {'disabled' if disabled else ''}>-</button><strong>{'0' if error else '3'}</strong><button {'disabled' if disabled else ''}>+</button>
            </div>
            {button("Reset", "quiet", "action", disabled)}
          </div>"""


def render_toast_preview(state):
    error = state == "error"
    loading = state == "loading"
    return f"""
          <div class="toast-demo {'is-error' if error else ''}" data-renderer="toast">
            {icon("!" if error else "i", "icon")}
            <div class="toast-copy">
              <strong data-slot="title">{'Export failed' if error else 'Run archived'}</strong>
              <span data-slot="description">{'Storage permission was denied.' if error else 'The run moved to archived history.'}</span>
            </div>
            {button("Retry" if error else ("Working" if loading else "Undo"), "secondary", "action", loading)}
            <button class="icon-button" data-slot="dismiss" aria-label="Dismiss">x</button>
          </div>"""


def render_modal_preview(state):
    error = state == "error"
    disabled = state == "disabled"
    return f"""
          <div class="modal-demo" data-renderer="modal">
            <div class="modal-top">
              <strong data-slot="title">{'Delete failed step?' if error else 'Pause agent run?'}</strong>
              <button class="icon-button" data-slot="close" aria-label="Close">x</button>
            </div>
            <p data-slot="description">{'This action affects the current execution timeline.' if not error else 'The step still owns active child tasks.'}</p>
            <div class="modal-body" data-slot="body">Run ID: run_42a9, owner: platform, status: active.</div>
            <div class="modal-actions">
              {button("Cancel", "secondary", "secondary_action", False)}
              {button("Pause run", "primary", "primary_action", disabled)}
            </div>
          </div>"""


def render_tooltip_preview(state):
    return f"""
          <div class="tooltip-demo" data-renderer="tooltip">
            <button class="icon-button" data-slot="trigger" aria-label="Explain latency">?</button>
            <div class="tooltip-bubble" data-slot="content">
              <span class="tooltip-arrow" data-slot="arrow"></span>
              P95 latency includes model and tool time. <kbd data-slot="shortcut">Shift L</kbd>
            </div>
          </div>"""


def render_tabs_preview(state):
    selected = "Trace" if state == "selected" else "Overview"
    return f"""
          <div class="tabs-demo" data-renderer="tabs">
            <div class="tab-list" data-slot="tab_list">
              <button class="tab {'is-selected' if selected == 'Overview' else ''}" data-slot="tab">Overview</button>
              <button class="tab {'is-selected' if selected == 'Trace' else ''}" data-slot="tab">Trace <span data-slot="badge">8</span></button>
              <button class="tab" data-slot="tab">Artifacts</button>
              <button class="icon-button" data-slot="overflow_menu" aria-label="More tabs">...</button>
            </div>
            <div class="tab-panel" data-slot="panel">{selected} content with run health and recent events.</div>
          </div>"""


def render_table_toolbar_preview(state):
    disabled = state == "disabled"
    return f"""
          <div class="toolbar-demo" data-renderer="table-toolbar">
            <div class="search-box" data-slot="search">Search runs</div>
            <div class="toolbar-row">
              {button("Status: active", "secondary", "filters", disabled)}
              {button("Sort: newest", "secondary", "sort", disabled)}
              {button("3 selected", "secondary", "bulk_actions", disabled)}
            </div>
            <div class="toolbar-row">
              {button("New run", "primary", "primary_action", disabled)}
              {button("Export", "ghost", "export", disabled)}
              {button("Dense", "quiet", "density", disabled)}
            </div>
          </div>"""


def render_runtime_log_stream_preview(state):
    error = state == "error"
    empty = state == "empty"
    return f"""
          <div class="log-stream" data-renderer="runtime-log-stream">
            <div class="log-toolbar" data-slot="toolbar">
              {badge('LIVE' if state == 'streaming' else state.upper(), 'danger' if error else 'success', 'severity_filter')}
              {button("Copy", "quiet", "copy_action", False)}
              {button("Export", "quiet", "export_action", False)}
            </div>
            <div class="log-row {'is-error' if error else ''}" data-slot="log_row">
              <span class="mono" data-slot="timestamp">12:04:19.284</span>
              <code data-slot="payload">{'No matching log entries.' if empty else ('tool call failed: timeout after 30s' if error else 'agent.step.completed {"tokens":1240,"tool":"search"}')}</code>
            </div>
            <div class="log-row" data-slot="log_row">
              <span class="mono" data-slot="timestamp">12:04:20.018</span>
              <code data-slot="payload">memory.write completed in 42ms</code>
            </div>
          </div>"""


def render_run_status_header_preview(state):
    error = state == "error"
    return f"""
          <div class="run-header" data-renderer="run-status-header">
            <div>
              <div class="run-title" data-slot="title">Agent run #4821</div>
              <div class="run-meta" data-slot="metadata">prod / platform / commit a18c2</div>
            </div>
            {badge('failed' if error else 'running', 'danger' if error else 'success', 'status')}
            <span class="duration" data-slot="duration">04:18</span>
            <div class="header-actions" data-slot="secondary_actions">
              {button("Replay", "secondary", "secondary_actions", False)}
              {button("Pause" if not error else "Inspect", "primary", "primary_action", False)}
              {button("Stop", "danger", "danger_action", False)}
            </div>
          </div>"""


def render_step_timeline_preview(state):
    error = state == "error"
    return f"""
          <div class="timeline" data-renderer="step-timeline">
            <div class="timeline-item {'is-error' if error else ''}">
              <span class="step-dot" data-slot="step_index">1</span>
              {badge('failed' if error else 'complete', 'danger' if error else 'success', 'status')}
              <strong data-slot="title">{'Call retrieval tool' if not error else 'Validate tool output'}</strong>
              <span class="mono" data-slot="timestamp">12:04:18</span>
              <span data-slot="duration">1.42s</span>
              <p data-slot="details">{'Result payload exceeded schema budget.' if error else 'Returned 6 ranked documents.'}</p>
              {button("Open", "quiet", "action", False)}
            </div>
          </div>"""


def render_settings_row_preview(state):
    error = state == "error"
    disabled = state == "disabled"
    saved = state == "saved"
    return f"""
          <div class="settings-row" data-renderer="settings-row">
            <div class="settings-copy">
              <strong data-slot="label">Auto-pause on error</strong>
              <span data-slot="description">Stops the run when a critical tool fails.</span>
            </div>
            <label class="switch" data-slot="control"><input type="checkbox" {'checked' if not disabled else ''} {'disabled' if disabled else ''} /><span></span></label>
            {badge('error' if error else ('saved' if saved else 'enabled'), 'danger' if error else 'success', 'status')}
            {button("Save", "secondary", "action", disabled)}
            {button("Reset", "danger", "danger_action", disabled)}
          </div>"""


def render_empty_state_preview(state):
    error = state == "error"
    return f"""
          <div class="empty-state-demo {'is-error' if error else ''}" data-renderer="empty-state">
            {icon("!" if error else "0", "icon")}
            <strong data-slot="title">{'Could not load runs' if error else 'No runs match filters'}</strong>
            <p data-slot="description">{'Refresh the source or check credentials.' if error else 'Try clearing status and owner filters.'}</p>
            <a href="#" data-slot="learn_more">Learn about run filters</a>
            <div class="empty-actions">
              {button("Clear filters", "primary", "primary_action", False)}
              {button("View docs", "secondary", "secondary_action", False)}
            </div>
          </div>"""


def render_notification_item_preview(state):
    unread = state in ("unread", "selected")
    error = state == "error"
    return f"""
          <div class="notification-item {'is-unread' if unread else ''} {'is-error' if error else ''}" data-renderer="notification-item">
            {icon("!" if error else ("*" if unread else "-"), "status_icon")}
            <div class="notification-copy">
              <strong data-slot="title">{'Run requires attention' if error else 'Deployment run completed'}</strong>
              <span data-slot="summary">{'Tool output validation failed.' if error else 'All checks passed in production.'}</span>
              <small><span data-slot="actor">Dig Bot</span> / <span data-slot="timestamp">2m ago</span></small>
            </div>
            <span data-slot="read_state">{'unread' if unread else 'read'}</span>
            <div data-slot="actions">{button("Open", "quiet", "actions", False)}</div>
          </div>"""


def render_search_result_row_preview(state):
    empty = state == "empty"
    error = state == "error"
    return f"""
          <div class="search-result-row {'is-error' if error else ''}" data-renderer="search-result-row">
            {icon("!" if error else ("-" if empty else "R"), "type_icon")}
            <div class="result-copy">
              <strong data-slot="title">{'Search failed' if error else ('No matching result' if empty else 'Runtime log stream')}</strong>
              <span data-slot="source">references/blocks/product/runtime-log-stream.md</span>
              <p data-slot="snippet">{'Index unavailable.' if error else ('Try a broader query.' if empty else 'Use <mark data-slot="match_highlight">runtime</mark> stream for agent execution logs.')}</p>
              <small data-slot="metadata">block / product / updated today</small>
            </div>
            <div data-slot="actions">{button("Open", "quiet", "actions", False)}</div>
          </div>"""


BLOCK_RENDERERS = {
    "button": render_button_preview,
    "input": render_input_preview,
    "select": render_select_preview,
    "form-row": render_form_row_preview,
    "toast": render_toast_preview,
    "modal": render_modal_preview,
    "tooltip": render_tooltip_preview,
    "tabs": render_tabs_preview,
    "table-toolbar": render_table_toolbar_preview,
    "runtime-log-stream": render_runtime_log_stream_preview,
    "run-status-header": render_run_status_header_preview,
    "step-timeline": render_step_timeline_preview,
    "settings-row": render_settings_row_preview,
    "empty-state": render_empty_state_preview,
    "notification-item": render_notification_item_preview,
    "search-result-row": render_search_result_row_preview,
}


def render_unknown_preview(block_id, state):
    return f"""
          <div class="unknown-demo" data-renderer="{escape(block_id)}">
            {badge(state, "neutral", "status")}
            <strong data-slot="label">{escape(block_id)}</strong>
            <span data-slot="description">No block-specific renderer has been registered.</span>
          </div>"""


def render_block_body(block_id, state):
    renderer = BLOCK_RENDERERS.get(block_id)
    if renderer is None:
        return render_unknown_preview(block_id, state)
    return renderer(state)


def render_catalog_options():
    return "\n".join(
        f'              <option value="{escape(skin["id"])}">{escape(skin["label"])} - {escape(skin["description"])}</option>'
        for skin in CATALOG_PREVIEW_SKINS
    )


def render_catalog_css():
    blocks = []
    for skin in CATALOG_PREVIEW_SKINS:
        token_lines = "\n".join(
            f"        {name}: {value};"
            for name, value in skin["tokens"].items()
        )
        blocks.append(f'      html[data-catalog="{escape(skin["id"])}"] {{\n{token_lines}\n      }}')
    return "\n".join(blocks)


def render_catalog_script():
    supported = json.dumps([skin["id"] for skin in CATALOG_PREVIEW_SKINS])
    return f"""
    <script>
      (function () {{
        const supportedCatalogs = {supported};
        const params = new URLSearchParams(window.location.search);
        const requested = params.get("catalog") || "dig";
        const catalog = supportedCatalogs.includes(requested) ? requested : "dig";
        const root = document.documentElement;
        const select = document.getElementById("catalogSelect");
        const chip = document.getElementById("previewCatalogChip");
        root.dataset.catalog = catalog;
        if (chip) chip.textContent = catalog;
        if (select) {{
          select.value = catalog;
          select.addEventListener("change", function () {{
            const next = select.value;
            const nextParams = new URLSearchParams(window.location.search);
            nextParams.set("catalog", next);
            window.location.href = window.location.pathname + "?" + nextParams.toString() + "#skin-check";
          }});
        }}
      }})();
    </script>"""


def render_list(items, empty_text):
    if not items:
        return f"<p>{escape(empty_text)}</p>"
    return "<ul>" + "".join(f"<li>{escape(item)}</li>" for item in items) + "</ul>"


def render_slot_anatomy(slots):
    if not slots:
        return "<p>No explicit slots are documented yet.</p>"
    items = "\n".join(
        f'          <li data-slot="{escape(slot)}"><code>{escape(slot)}</code><span>Documented block slot</span></li>'
        for slot in slots
    )
    return f"""
        <ul class="anatomy-list">
{items}
        </ul>"""


def render_example(block_id, example):
    state = example.get("state", "default")
    slots = example.get("slots_used") or []
    slot_chips = "".join(f"<span>{escape(slot)}</span>" for slot in slots) if slots else "<span>documented slots</span>"
    return f"""
      <article class="example" data-example-id="{escape(example.get('id', state))}" data-state="{escape(state)}">
        <div class="example-copy">
          <h3>{escape(example.get('title', state.replace('-', ' ').title()))}</h3>
          <p>{escape(example.get('description', ''))}</p>
        </div>
        <div class="example-preview" aria-label="{escape(block_id)} {escape(state)} preview">
{render_block_body(block_id, state)}
        </div>
        <dl class="example-notes">
          <div><dt>Slots</dt><dd>{slot_chips}</dd></div>
          <div><dt>Behavior</dt><dd>{escape(example.get('behavior', 'Keep the block contract stable while state changes.'))}</dd></div>
          <div><dt>QA</dt><dd>{escape(example.get('qa', 'Check layout stability, focus affordance, and readable copy.'))}</dd></div>
        </dl>
      </article>"""


def render_examples(block_id, examples):
    return "\n".join(render_example(block_id, example) for example in examples)


def render_state_semantics(states, semantics):
    rows = []
    fallback = fallback_state_semantics(states)
    for state in states:
        item = semantics.get(state) or fallback.get(state) or {}
        rows.append(f"""
          <tr>
            <th scope="row"><code>{escape(state)}</code></th>
            <td>{escape(item.get("meaning", state.replace("-", " ").title()))}</td>
            <td>{escape(item.get("trigger", "State-specific product condition"))}</td>
            <td>{escape(item.get("qa", "Preview remains understandable and stable."))}</td>
          </tr>""")
    return "\n".join(rows)


def render_skin_check(block_id, first_state):
    return f"""
      <details id="skin-check" class="skin-check" open>
        <summary>Skin compatibility check</summary>
        <div class="skin-check-body">
          <div class="preview-controls">
            <label class="preview-control" for="catalogSelect">
              <span>Catalog preview</span>
              <select id="catalogSelect" class="dig-select" aria-label="Select catalog preview">
{render_catalog_options()}
              </select>
            </label>
            <span class="preview-note">Selecting a catalog jumps back here with matching preview tokens. This checks skin compatibility only; the block contract above stays the source of truth.</span>
          </div>
          <div class="skin-preview" data-block="{escape(block_id)}" data-renderer="{escape(block_id)}">
{render_block_body(block_id, first_state)}
          </div>
        </div>
      </details>"""


def render_block_page(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    meta = parse_frontmatter(content)
    block_id = meta.get("id", os.path.basename(file_path)[:-3])
    category = meta.get("category", "product")
    description = meta.get("description", "")
    states_text = extract_section(content, "States")
    use_when = parse_bullets(extract_section(content, "Use When"))
    avoid_when = parse_bullets(extract_section(content, "Avoid When"))
    accessibility = parse_bullets(extract_section(content, "Accessibility"))
    anti_patterns = parse_bullets(extract_section(content, "Anti-Patterns"))
    slots = parse_slots(content)
    fixture = load_fixture(block_id)
    states = fixture["states"]
    if not states:
        states = [candidate for candidate in REQUIRED_STATES if candidate in states_text] or REQUIRED_STATES
    examples = fixture.get("examples") or fallback_examples(block_id, states)
    first_state = examples[0].get("state", states[0] if states else "default")

    source_rel = os.path.relpath(file_path, PROJECT_DIR)
    return f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dig UI Block - {escape(block_id)}</title>
    <style>
      :root {{
        color-scheme: dark;
        --dig-bg: #06121a;
        --dig-surface: rgba(16,32,44,.92);
        --dig-surface-raised: rgba(20,39,53,.96);
        --dig-control-bg: rgba(9,21,31,.92);
        --dig-text: #ecf3f8;
        --dig-muted: #8aa0b2;
        --dig-accent: #37d67a;
        --dig-accent-2: #86e7ff;
        --dig-warning: #f6c76d;
        --dig-danger: #f06a6a;
        --dig-danger-text: #180909;
        --dig-border: rgba(138,160,178,.22);
        --dig-border-strong: rgba(138,160,178,.38);
        --dig-radius: 8px;
        --dig-radius-pill: 999px;
      }}
{render_catalog_css()}
      html[data-catalog="apple"] {{ color-scheme: light; }}
      * {{ box-sizing:border-box; }}
      body {{ margin:0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background:var(--dig-bg); color:var(--dig-text); }}
      main {{ width:min(1180px, calc(100% - 32px)); margin:0 auto; padding:32px 0 56px; }}
      header {{ display:grid; gap:10px; margin-bottom:24px; }}
      h1 {{ margin:0; font-size:32px; line-height:1.1; }}
      h2 {{ margin:0 0 12px; font-size:18px; line-height:1.25; }}
      h3 {{ margin:0; font-size:16px; line-height:1.35; }}
      p {{ margin:0; color:var(--dig-muted); line-height:1.6; }}
      ul {{ margin:0; padding-left:18px; color:var(--dig-muted); line-height:1.6; }}
      li + li {{ margin-top:6px; }}
      .preview-controls {{ display:flex; flex-wrap:wrap; align-items:end; gap:10px 14px; margin-top:6px; }}
      .preview-control {{ display:grid; gap:5px; color:var(--dig-muted); font-size:12px; font-weight:700; text-transform:uppercase; }}
      .dig-select {{ min-height:38px; min-width:240px; border:1px solid var(--dig-border); border-radius:var(--dig-radius-pill); background:var(--dig-control-bg); color:var(--dig-text); padding:0 36px 0 12px; font:600 13px Inter, ui-sans-serif, system-ui, sans-serif; }}
      .preview-note {{ min-height:38px; display:inline-flex; align-items:center; color:var(--dig-muted); font-size:12px; }}
      .meta {{ display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }}
      .chip {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius-pill); padding:4px 10px; color:var(--dig-muted); font-size:12px; }}
      .doc-stack {{ display:grid; gap:22px; }}
      .doc-section {{ border-top:1px solid var(--dig-border); padding-top:22px; }}
      .contract-grid {{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:18px; }}
      .contract-panel {{ display:grid; gap:10px; }}
      .example-list {{ display:grid; gap:0; }}
      .example {{ display:grid; grid-template-columns:minmax(220px, 300px) minmax(0, 1fr); gap:18px; align-items:start; border-top:1px solid var(--dig-border); padding:22px 0; }}
      .example:first-child {{ border-top:0; padding-top:4px; }}
      .example-copy {{ display:grid; gap:8px; }}
      .example-preview {{ min-width:0; display:grid; gap:12px; border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-control-bg); padding:18px; }}
      .example-notes {{ grid-column:1 / -1; display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:10px; margin:0; }}
      .example-notes div {{ border-top:1px solid var(--dig-border); padding-top:10px; }}
      .example-notes dt {{ color:var(--dig-muted); font-size:11px; font-weight:800; text-transform:uppercase; }}
      .example-notes dd {{ margin:4px 0 0; color:var(--dig-text); line-height:1.5; }}
      .example-notes dd span {{ display:inline-flex; margin:0 5px 5px 0; border:1px solid var(--dig-border); border-radius:var(--dig-radius-pill); padding:2px 7px; color:var(--dig-muted); font-size:12px; }}
      .anatomy-list {{ display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; padding:0; list-style:none; }}
      .anatomy-list li {{ display:grid; gap:4px; border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-surface); padding:10px; }}
      .anatomy-list span {{ color:var(--dig-muted); font-size:12px; }}
      .semantic-table-wrap {{ overflow:auto; border:1px solid var(--dig-border); border-radius:var(--dig-radius); }}
      table {{ width:100%; border-collapse:collapse; min-width:720px; }}
      th, td {{ border-bottom:1px solid var(--dig-border); padding:10px 12px; text-align:left; vertical-align:top; color:var(--dig-muted); }}
      th {{ color:var(--dig-text); font-weight:800; }}
      tr:last-child th, tr:last-child td {{ border-bottom:0; }}
      .skin-check {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-surface); padding:14px; }}
      .skin-check summary {{ cursor:pointer; color:var(--dig-text); font-weight:800; }}
      .skin-check-body {{ display:grid; gap:14px; margin-top:14px; }}
      .skin-preview {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-control-bg); padding:16px; }}
      code, .mono {{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color:var(--dig-accent); }}
      .demo-button {{ min-height:38px; border:1px solid transparent; border-radius:var(--dig-radius-pill); font-weight:700; padding:0 14px; color:var(--dig-bg); background:var(--dig-accent); white-space:normal; }}
      .demo-button.secondary {{ color:var(--dig-text); background:var(--dig-surface-raised); border-color:var(--dig-border); }}
      .demo-button.ghost, .demo-button.quiet {{ color:var(--dig-muted); background:transparent; border-color:var(--dig-border); }}
      .demo-button.danger {{ color:var(--dig-danger-text); background:var(--dig-danger); }}
      .demo-button:focus-visible, .example[data-state="focus-visible"] .demo-button:first-child, .example[data-state="focus-visible"] .select-trigger, .example[data-state="focus-visible"] .control-shell {{ outline:2px solid var(--dig-accent); outline-offset:3px; }}
      .demo-button:disabled, button:disabled, .is-disabled {{ opacity:.48; cursor:not-allowed; }}
      .button-strip, .toolbar-row, .modal-actions, .header-actions, .empty-actions {{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }}
      .field-stack, .toolbar-demo, .log-stream, .modal-demo, .tabs-demo, .timeline, .empty-state-demo {{ display:grid; gap:10px; }}
      .field-label, .helper, .run-meta, small {{ color:var(--dig-muted); }}
      .field-label {{ font-size:12px; font-weight:700; text-transform:uppercase; }}
      .helper {{ font-size:12px; }}
      .danger-text {{ color:var(--dig-danger); }}
      .control-shell, .select-trigger, .search-box, .option-list, .modal-body, .tab-panel, .log-row, .stepper {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-control-bg); }}
      .control-shell {{ display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:8px; padding:8px 10px; }}
      .control-shell input {{ min-width:0; border:0; outline:0; background:transparent; color:var(--dig-text); font:inherit; }}
      .control-prefix, .control-action {{ color:var(--dig-muted); }}
      .control-action, .icon-button {{ border:1px solid var(--dig-border); background:transparent; color:var(--dig-muted); border-radius:var(--dig-radius); min-height:30px; }}
      .is-error, .example[data-state="error"] .control-shell, .example[data-state="error"] .select-trigger {{ border-color:var(--dig-danger); }}
      .select-trigger {{ min-height:42px; padding:0 12px; color:var(--dig-text); display:flex; align-items:center; justify-content:space-between; }}
      .option-list {{ display:grid; gap:4px; padding:8px; color:var(--dig-muted); font-size:12px; }}
      .is-selected {{ color:var(--dig-accent); }}
      .form-row-demo, .run-header, .settings-row, .notification-item, .search-result-row {{ display:grid; grid-template-columns:1fr auto; gap:12px; align-items:center; }}
      .stepper {{ display:grid; grid-template-columns:32px 36px 32px; align-items:center; text-align:center; overflow:hidden; }}
      .stepper button {{ min-height:32px; border:0; background:transparent; color:var(--dig-text); }}
      .toast-demo {{ display:grid; grid-template-columns:auto 1fr auto auto; gap:10px; align-items:center; border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-surface-raised); padding:10px; }}
      .toast-copy, .settings-copy, .notification-copy, .result-copy {{ display:grid; gap:3px; min-width:0; }}
      .icon-box {{ display:grid; place-items:center; width:32px; height:32px; border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-control-bg); color:var(--dig-accent); font-weight:800; }}
      .modal-demo {{ border:1px solid var(--dig-border-strong); border-radius:var(--dig-radius); background:var(--dig-surface-raised); padding:12px; }}
      .modal-top {{ display:flex; align-items:center; justify-content:space-between; gap:12px; }}
      .modal-body, .tab-panel {{ padding:10px; color:var(--dig-muted); font-size:13px; }}
      .tooltip-demo {{ display:grid; justify-items:start; gap:8px; }}
      .tooltip-bubble {{ position:relative; max-width:260px; border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-surface-raised); padding:10px; color:var(--dig-muted); }}
      .tooltip-arrow {{ position:absolute; top:-5px; left:16px; width:10px; height:10px; background:var(--dig-surface-raised); border-left:1px solid var(--dig-border); border-top:1px solid var(--dig-border); transform:rotate(45deg); }}
      .tab-list {{ display:flex; gap:6px; align-items:center; border-bottom:1px solid var(--dig-border); padding-bottom:8px; }}
      .tab {{ min-height:34px; border:1px solid transparent; border-radius:var(--dig-radius); background:transparent; color:var(--dig-muted); padding:0 10px; }}
      .tab.is-selected {{ color:var(--dig-text); background:var(--dig-control-bg); border-color:var(--dig-border); }}
      .search-box {{ padding:10px 12px; color:var(--dig-muted); }}
      .badge {{ display:inline-flex; align-items:center; width:max-content; min-height:24px; border-radius:var(--dig-radius-pill); border:1px solid var(--dig-border); padding:0 8px; color:var(--dig-muted); font-size:12px; font-weight:700; text-transform:uppercase; }}
      .badge.success {{ color:var(--dig-accent); border-color:var(--dig-border-strong); }}
      .badge.danger {{ color:var(--dig-danger); border-color:var(--dig-danger); }}
      .log-toolbar {{ display:flex; gap:8px; align-items:center; justify-content:space-between; }}
      .log-row {{ display:grid; grid-template-columns:86px 1fr; gap:10px; align-items:start; padding:9px; }}
      .log-row code {{ color:var(--dig-text); white-space:normal; overflow-wrap:anywhere; }}
      .run-title {{ font-weight:800; }}
      .duration {{ color:var(--dig-accent-2); font-weight:800; }}
      .timeline-item {{ display:grid; grid-template-columns:auto auto 1fr; gap:8px; align-items:center; }}
      .timeline-item p {{ grid-column:1 / -1; padding-left:42px; }}
      .step-dot {{ display:grid; place-items:center; width:28px; height:28px; border:1px solid var(--dig-border); border-radius:50%; background:var(--dig-control-bg); color:var(--dig-accent-2); font-weight:800; }}
      .switch input {{ display:none; }}
      .switch span {{ display:block; width:44px; height:24px; border-radius:var(--dig-radius-pill); border:1px solid var(--dig-border); background:var(--dig-control-bg); position:relative; }}
      .switch span:after {{ content:""; position:absolute; top:3px; left:3px; width:16px; height:16px; border-radius:50%; background:var(--dig-muted); }}
      .switch input:checked + span:after {{ left:23px; background:var(--dig-accent); }}
      .empty-state-demo {{ justify-items:start; text-align:left; border:1px dashed var(--dig-border); border-radius:var(--dig-radius); padding:16px; }}
      .notification-item, .search-result-row {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-surface-raised); padding:10px; }}
      .notification-item {{ grid-template-columns:auto 1fr auto; }}
      .notification-item.is-unread {{ border-color:var(--dig-border-strong); }}
      .search-result-row {{ grid-template-columns:auto 1fr auto; }}
      mark {{ background:var(--dig-control-bg); color:var(--dig-warning); border-radius:4px; padding:0 2px; }}
      a {{ color:var(--dig-accent-2); }}
      kbd {{ display:inline-flex; min-height:20px; align-items:center; border:1px solid var(--dig-border); border-radius:5px; padding:0 5px; color:var(--dig-text); font:11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }}
      .example[data-state="mobile"] .example-preview {{ max-width:340px; }}
      @media (max-width: 520px) {{
        main {{ width:min(100% - 20px, 420px); padding-top:20px; }}
        .contract-grid, .example, .example-notes {{ grid-template-columns:1fr; }}
        .form-row-demo, .run-header, .settings-row, .notification-item, .search-result-row, .toast-demo {{ grid-template-columns:1fr; }}
        .log-row {{ grid-template-columns:1fr; }}
      }}
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>{escape(block_id)}</h1>
        <p>{escape(description)}</p>
        <div class="meta">
          <span class="chip">category: {escape(category)}</span>
          <span class="chip">source: {escape(source_rel)}</span>
          <span class="chip">asset source: official</span>
          <span class="chip">compatible catalogs: all</span>
          <span class="chip">preview catalog: <span id="previewCatalogChip">dig</span></span>
          <span class="chip">fixture: {escape(fixture["name"])}</span>
          <span class="chip">schema version: {SCHEMA_VERSION}</span>
          <span class="chip">language: installed</span>
        </div>
      </header>
      <div class="doc-stack" data-render-mode="contract" data-block="{escape(block_id)}" data-renderer="{escape(block_id)}">
        <section class="doc-section contract-grid" aria-label="Block contract">
          <div class="contract-panel">
            <h2>Use when</h2>
            {render_list(use_when, "Use this block when the product surface needs this interaction contract.")}
          </div>
          <div class="contract-panel">
            <h2>Avoid when</h2>
            {render_list(avoid_when, "Avoid substituting this block when a simpler primitive or page-level layout owns the behavior.")}
          </div>
        </section>
        <section id="examples" class="doc-section" aria-label="Block examples">
          <h2>Examples</h2>
          <div class="example-list">
{render_examples(block_id, examples)}
          </div>
        </section>
        <section class="doc-section" aria-label="Block anatomy">
          <h2>Anatomy</h2>
          {render_slot_anatomy(slots)}
        </section>
        <section id="states" class="doc-section" aria-label="State semantics">
          <h2>State semantics</h2>
          <div class="semantic-table-wrap">
            <table>
              <thead><tr><th>State</th><th>Meaning</th><th>Trigger</th><th>QA</th></tr></thead>
              <tbody>
{render_state_semantics(states, fixture.get("state_semantics") or {})}
              </tbody>
            </table>
          </div>
        </section>
        <section class="doc-section contract-grid" aria-label="Quality rules">
          <div class="contract-panel">
            <h2>Accessibility</h2>
            {render_list(accessibility, "Document keyboard, focus, and assistive technology expectations before shipping.")}
          </div>
          <div class="contract-panel">
            <h2>Anti-patterns</h2>
            {render_list(anti_patterns, "Document misuse cases that would make this block misleading or harder to maintain.")}
          </div>
        </section>
        {render_skin_check(block_id, first_state)}
      </div>
    </main>
{render_catalog_script()}
  </body>
</html>
"""


def render_index(pages):
    links = "\n".join(
        f'<li><a href="{escape(name)}.html">{escape(name)}</a></li>'
        for name in pages
    )
    return f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dig UI Blocks</title>
    <style>
      body {{ margin:0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background:#06121a; color:#ecf3f8; }}
      main {{ width:min(960px, calc(100% - 32px)); margin:0 auto; padding:40px 0; }}
      a {{ color:#37d67a; }}
      li {{ margin:8px 0; }}
    </style>
  </head>
  <body><main><h1>Dig UI Blocks</h1><ul>{links}</ul></main></body>
</html>
"""


def main():
    os.makedirs(RENDER_DIR, exist_ok=True)
    pages = []
    for file_path in list_block_files():
        with open(file_path, "r", encoding="utf-8") as f:
            meta = parse_frontmatter(f.read())
        block_id = meta.get("id", os.path.basename(file_path)[:-3])
        out_path = os.path.join(RENDER_DIR, f"{block_id}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(render_block_page(file_path))
        pages.append(block_id)
        print(f"Synced block render: renders/blocks/{block_id}.html")

    with open(os.path.join(RENDER_DIR, "index.html"), "w", encoding="utf-8") as f:
        f.write(render_index(sorted(set(pages))))
    print("Synced block render index: renders/blocks/index.html")


if __name__ == "__main__":
    main()
