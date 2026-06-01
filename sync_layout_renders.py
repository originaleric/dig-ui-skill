#!/usr/bin/env python3
# sync_layout_renders.py
# Compiles references/layouts/*.md into renders/layouts/*.html preview pages.

import os
import re
import sys
import json
import html as html_lib

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
LAYOUT_DIR = os.path.join(PROJECT_DIR, "references", "layouts")
CATALOG_DIR = os.path.join(PROJECT_DIR, "references", "catalogs")
RENDER_DIR = os.path.join(PROJECT_DIR, "renders", "layouts")
GLOBAL_RULES_FILE = os.path.join(PROJECT_DIR, "references", "global-rules.md")
GLOBAL_RULES_LOCAL_FILE = os.path.join(PROJECT_DIR, "references", "global-rules.local.md")
SKIP_LOCAL_RULES = os.environ.get("DIG_UI_SKIP_LOCAL_RULES") == "1"

CATALOG_MAP = {
    "dig": os.path.join(CATALOG_DIR, "other", "dig.md"),
    "mono": os.path.join(CATALOG_DIR, "other", "mono.md"),
    "editorial": os.path.join(CATALOG_DIR, "other", "editorial.md"),
    "wise": os.path.join(CATALOG_DIR, "fintech", "wise.md"),
    "apple": os.path.join(CATALOG_DIR, "media-consumer", "apple.md"),
}

CATALOG_LABELS = {
    "dig": "Dig",
    "mono": "Mono",
    "editorial": "Editorial",
    "wise": "Wise",
    "apple": "Apple",
}


def parse_frontmatter(content):
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return {}
    meta = {}
    for line in match.group(1).split("\n"):
        if ":" in line:
            key, _, val = line.partition(":")
            meta[key.strip()] = val.strip().strip("\"'")
    return meta


def extract_markdown_section(content, heading):
    pattern = rf"## {re.escape(heading)}\s*\n\n(.*?)(?=\n## |\Z)"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return ""
    return match.group(1).strip()


def extract_fenced_block(content, section_heading, lang=None):
    section = extract_markdown_section(content, section_heading)
    if not section:
        return ""
    fence = rf"```{lang}\s*\n(.*?)\n```" if lang else r"```(?:html|css|yaml)?\s*\n(.*?)\n```"
    match = re.search(fence, section, re.DOTALL)
    return match.group(1).strip() if match else ""


def parse_slots_yaml(content):
    yaml_block = extract_fenced_block(content, "Slots", "yaml")
    if not yaml_block:
        return {}
    slots = {}
    current = None
    for line in yaml_block.split("\n"):
        slot_match = re.match(r"^\s{2}(\w+):\s*$", line)
        if slot_match:
            current = slot_match.group(1)
            slots[current] = {}
            continue
        if current:
            prop_match = re.match(r"^\s{4}(\w+):\s*(.+)$", line)
            if prop_match:
                key, val = prop_match.groups()
                val = val.strip().strip("\"'")
                if val in ("true", "false"):
                    val = val == "true"
                slots[current][key] = val
    return slots


def rules_to_list(rules_md):
    items = []
    for line in rules_md.split("\n"):
        line = line.strip()
        if line.startswith("- "):
            items.append(line[2:].strip())
    return items


def parse_global_rules_manifest(content):
    """Extract YAML manifest block from a global rules markdown file."""
    section = extract_markdown_section(content, "Manifest（供 render 注入）")
    if not section:
        return []
    yaml_block = extract_fenced_block_from_text(section, "yaml")
    if not yaml_block:
        return []
    rules = []
    current = None
    in_validate = False
    for line in yaml_block.split("\n"):
        id_match = re.match(r"^\s{2}-\s+id:\s*(.+)$", line)
        if id_match:
            current = {"id": id_match.group(1).strip().strip("\"'"), "summary": ""}
            rules.append(current)
            in_validate = False
            continue
        summary_match = re.match(r"^\s{4}summary:\s*(.+)$", line)
        if summary_match and current is not None:
            current["summary"] = summary_match.group(1).strip().strip("\"'")
            continue
        validate_start = re.match(r"^\s{4}validate:\s*$", line)
        if validate_start and current is not None:
            current["validate"] = {}
            in_validate = True
            continue
        validate_bool = re.match(r"^\s{6}(\w+):\s*(true|false)\s*$", line)
        if validate_bool and current is not None and in_validate:
            key, val = validate_bool.groups()
            current.setdefault("validate", {})[key] = val == "true"
    return rules


RULE_VALIDATE_DEFAULTS = {
    "pill-buttons": {"buttonPillRadius": True},
    "react-select": {"requireDigSelectClass": True, "selectPillRadius": True},
    "native-select": {"requireDigSelectClass": True, "selectPillRadius": True},
}


def enrich_rule_validate(rule):
    rule = dict(rule)
    defaults = RULE_VALIDATE_DEFAULTS.get(rule.get("id"), {})
    validate = dict(defaults)
    validate.update(rule.get("validate") or {})
    rule["validate"] = validate
    return rule


def merge_manifest_rules(base_rules, local_rules):
    merged = {}
    for rule in base_rules:
        merged[rule["id"]] = enrich_rule_validate(rule)
    for rule in local_rules:
        rid = rule["id"]
        if rid in merged:
            existing = merged[rid]
            if rule.get("summary"):
                existing["summary"] = rule["summary"]
            merged_validate = dict(existing.get("validate", {}))
            merged_validate.update(rule.get("validate") or {})
            existing["validate"] = merged_validate
            merged[rid] = enrich_rule_validate(existing)
        else:
            merged[rid] = enrich_rule_validate(rule)
    return list(merged.values())


def resolve_manifest_checks(manifest_rules):
    checks = {
        "buttonPillRadius": False,
        "requireDigSelectClass": False,
        "selectPillRadius": False,
    }
    for rule in manifest_rules:
        for key, val in (rule.get("validate") or {}).items():
            if key in checks and isinstance(val, bool):
                checks[key] = val
    return checks


def build_global_rules_css_overrides(manifest_rules):
    checks = resolve_manifest_checks(manifest_rules)
    blocks = []
    if not checks["buttonPillRadius"]:
        blocks.append(
            "html[data-global-rules-enabled=\"true\"] .dig-button-primary,\n"
            "html[data-global-rules-enabled=\"true\"] .dig-button-secondary {\n"
            "  border-radius: var(--dig-radius-sm);\n"
            "}"
        )
    if not checks["selectPillRadius"]:
        blocks.append(
            "html[data-global-rules-enabled=\"true\"] .dig-input,\n"
            "html[data-global-rules-enabled=\"true\"] .dig-select {\n"
            "  border-radius: var(--dig-radius-sm);\n"
            "}"
        )
    if not blocks:
        return ""
    return "\n\n".join(blocks) + "\n"


def load_global_rules_section_summaries(path):
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    summaries = []
    skip = {"优先级", "跳过条件", "Manifest（供 render 注入）"}
    for match in re.finditer(r"^## (.+)$", content, re.MULTILINE):
        heading = match.group(1).strip()
        if heading in skip:
            continue
        section = extract_markdown_section(content, heading)
        items = rules_to_list(section)
        if items:
            summaries.append({"section": heading, "items": items[:3]})
    return summaries


def extract_fenced_block_from_text(text, lang=None):
    fence = rf"```{lang}\s*\n(.*?)\n```" if lang else r"```(?:html|css|yaml)?\s*\n(.*?)\n```"
    match = re.search(fence, text, re.DOTALL)
    return match.group(1).strip() if match else ""


def load_merged_section_summaries():
    skip = {"优先级", "跳过条件", "Manifest（供 render 注入）", "使用方式", "示例覆写"}
    by_section = {}

    for path in (GLOBAL_RULES_FILE, GLOBAL_RULES_LOCAL_FILE):
        if not os.path.exists(path):
            continue
        for entry in load_global_rules_section_summaries(path):
            if entry["section"] in skip:
                continue
            by_section[entry["section"]] = entry

    return list(by_section.values())


def build_global_rules_context(no_global=False):
    if no_global:
        return {
            "enabled": False,
            "sources": [],
            "manifest": {"enabled": False, "rules": []},
            "summary_html": (
                '<p class="global-rules-disabled">Global Rules: disabled for review</p>'
            ),
        }

    sources = []
    manifest_rules = []

    if os.path.exists(GLOBAL_RULES_FILE):
        sources.append("references/global-rules.md")
        with open(GLOBAL_RULES_FILE, "r", encoding="utf-8") as f:
            base_content = f.read()
        manifest_rules = parse_global_rules_manifest(base_content)

    local_rules = []
    if not SKIP_LOCAL_RULES and os.path.exists(GLOBAL_RULES_LOCAL_FILE):
        sources.append("references/global-rules.local.md")
        with open(GLOBAL_RULES_LOCAL_FILE, "r", encoding="utf-8") as f:
            local_content = f.read()
        local_rules = parse_global_rules_manifest(local_content)

    manifest_rules = merge_manifest_rules(manifest_rules, local_rules)
    summary_sections = load_merged_section_summaries()

    manifest = {"enabled": True, "sources": sources, "rules": manifest_rules}

    summary_parts = ['<ul class="global-rules-summary">']
    for entry in summary_sections:
        summary_parts.append(f"<li><strong>{html_lib.escape(entry['section'])}</strong>")
        summary_parts.append("<ul>")
        for item in entry["items"]:
            summary_parts.append(f"<li>{html_lib.escape(item)}</li>")
        summary_parts.append("</ul></li>")
    summary_parts.append("</ul>")

    if sources:
        source_labels = ", ".join(html_lib.escape(s) for s in sources)
        summary_parts.append(f'<p class="global-rules-sources">Sources: {source_labels}</p>')

    return {
        "enabled": True,
        "sources": sources,
        "manifest": manifest,
        "summary_html": "".join(summary_parts),
        "css_overrides": build_global_rules_css_overrides(manifest_rules),
    }


def build_global_rules_html(global_ctx):
    return global_ctx["summary_html"]


def extract_catalog_tokens(catalog_path):
    if not os.path.exists(catalog_path):
        return []
    with open(catalog_path, "r", encoding="utf-8") as f:
        content = f.read()
    tokens = []
    seen = set()
    for block in re.findall(r"```css\s*\n(.*?)\n```", content, re.DOTALL):
        for line in block.split("\n"):
            line = line.strip()
            if line.startswith("--dig-"):
                name = line.split(":")[0].strip()
                if name not in seen:
                    seen.add(name)
                    tokens.append("  " + line.rstrip(";") + ";")
    return tokens


def catalog_color_scheme(slug):
    if slug in ("wise", "apple", "editorial"):
        return "light"
    return "dark"


def build_catalog_css_blocks():
    blocks = []
    for slug, path in CATALOG_MAP.items():
        tokens = extract_catalog_tokens(path)
        if not tokens:
            continue
        scheme = catalog_color_scheme(slug)
        token_lines = "\n".join(tokens)
        blocks.append(
            f'html[data-catalog="{slug}"] {{\n'
            f"  color-scheme: {scheme};\n"
            f"{token_lines}\n"
            f"}}"
        )
    return "\n\n".join(blocks)


def build_catalog_switcher(default_catalog):
    buttons = []
    for slug, label in CATALOG_LABELS.items():
        active = " active" if slug == default_catalog else ""
        buttons.append(
            f'<button type="button" class="catalog-btn{active}" data-catalog="{slug}">{label}</button>'
        )
    return "\n".join(buttons)


def build_slots_html(slots):
    if not slots:
        return "<p class=\"note-empty\">No slots defined.</p>"
    rows = []
    for name, props in slots.items():
        req = props.get("required", False)
        role = props.get("role", "")
        desc = props.get("description", "")
        badge = "required" if req else "optional"
        rows.append(
            f"<li><strong>{html_lib.escape(name)}</strong> "
            f"<span class=\"slot-badge slot-{badge}\">{badge}</span> "
            f"<span class=\"slot-role\">{html_lib.escape(role)}</span> — "
            f"{html_lib.escape(desc)}</li>"
        )
    return "<ul class=\"slots-list\">" + "".join(rows) + "</ul>"


def build_recommended_catalogs_html(catalogs):
    if not catalogs:
        return "<p class=\"note-empty\">—</p>"
    chips = []
    for slug in catalogs:
        label = CATALOG_LABELS.get(slug, slug)
        chips.append(f'<span class="catalog-rec-chip">{html_lib.escape(label)}</span>')
    return '<div class="catalog-rec-row">' + "".join(chips) + "</div>"


def build_rules_html(items):
    if not items:
        return "<p class=\"note-empty\">—</p>"
    return "<ul class=\"rules-list\">" + "".join(
        f"<li>{html_lib.escape(item)}</li>" for item in items
    ) + "</ul>"


def render_layout_page(md_path, no_global=False):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    meta = parse_frontmatter(content)
    slug = meta.get("slug", os.path.basename(md_path)[:-3])
    name = meta.get("name", slug)
    name_zh = meta.get("name_zh", name)
    page_type = meta.get("page_type", "dashboard")
    status = meta.get("status", "draft")
    default_catalog = meta.get("default_catalog", "dig")
    desc_zh = meta.get("description_zh", "")
    desc_en = meta.get("description_en", "")

    preview_html = extract_fenced_block(content, "Preview HTML", "html")
    preview_css = extract_fenced_block(content, "Preview CSS", "css")
    slots = parse_slots_yaml(content)
    layout_rules = rules_to_list(extract_markdown_section(content, "Layout Rules"))
    responsive_rules = rules_to_list(extract_markdown_section(content, "Responsive Rules"))
    qa_notes = rules_to_list(extract_markdown_section(content, "QA Notes"))
    applicable = rules_to_list(extract_markdown_section(content, "Applicable Scenarios"))
    avoid_when = rules_to_list(extract_markdown_section(content, "Avoid When"))
    recommended_raw = meta.get("recommended_catalogs", "")
    if not recommended_raw:
        rec_section = extract_markdown_section(content, "Recommended Catalogs")
        recommended_raw = rec_section.replace("\n", ", ")
    recommended_catalogs = [c.strip() for c in re.split(r"[,，\n]", recommended_raw) if c.strip()]

    if not preview_html:
        print(f"⚠️ Warning: No Preview HTML in {slug}.md, skipping.")
        return None

    catalog_css = build_catalog_css_blocks()
    switcher = build_catalog_switcher(default_catalog)
    global_ctx = build_global_rules_context(no_global=no_global)

    viewport_block = preview_html

    return {
        "slug": slug,
        "meta": meta,
        "html": generate_full_html(
            slug=slug,
            name=name,
            name_zh=name_zh,
            page_type=page_type,
            status=status,
            default_catalog=default_catalog,
            desc_zh=desc_zh,
            desc_en=desc_en,
            preview_html=viewport_block,
            preview_css=preview_css,
            catalog_css=catalog_css,
            switcher=switcher,
            slots_html=build_slots_html(slots),
            layout_rules_html=build_rules_html(layout_rules),
            responsive_rules_html=build_rules_html(responsive_rules),
            qa_notes_html=build_rules_html(qa_notes),
            applicable_html=build_rules_html(applicable),
            avoid_when_html=build_rules_html(avoid_when),
            recommended_catalogs_html=build_recommended_catalogs_html(recommended_catalogs),
            global_rules_enabled=global_ctx["enabled"],
            global_rules_html=build_global_rules_html(global_ctx),
            global_rules_manifest=json.dumps(global_ctx["manifest"], ensure_ascii=False),
            global_rules_css_overrides=global_ctx.get("css_overrides", ""),
        ),
    }


def generate_full_html(
    slug,
    name,
    name_zh,
    page_type,
    status,
    default_catalog,
    desc_zh,
    desc_en,
    preview_html,
    preview_css,
    catalog_css,
    switcher,
    slots_html,
    layout_rules_html,
    responsive_rules_html,
    qa_notes_html,
    applicable_html,
    avoid_when_html,
    recommended_catalogs_html,
    global_rules_enabled=True,
    global_rules_html="",
    global_rules_manifest="{}",
    global_rules_css_overrides="",
):
    desc = desc_zh or desc_en
    global_enabled_attr = "true" if global_rules_enabled else "false"
    global_stylesheet = (
        '    <link rel="stylesheet" href="../../assets/layout-preview-global.css" />\n'
        if global_rules_enabled
        else ""
    )
    global_css_override_block = ""
    if global_rules_enabled and global_rules_css_overrides.strip():
        global_css_override_block = f"""
      /* Global rules manifest overrides */
{global_rules_css_overrides}"""
    return f"""<!doctype html>
<html lang="zh-CN" data-catalog="{default_catalog}" data-global-rules-enabled="{global_enabled_attr}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dig UI Layout — {html_lib.escape(name)}</title>
    <link rel="stylesheet" href="../../assets/layout-preview.css" />
{global_stylesheet}    <script type="application/json" id="dig-global-rules-manifest">{global_rules_manifest}</script>
    <style>
{catalog_css}
{global_css_override_block}
      /* Layout render shell */
      body {{
        margin: 0;
        min-height: 100vh;
        font-family: var(--dig-font-sans, sans-serif);
        background: linear-gradient(135deg, var(--dig-bg), var(--dig-bg-soft));
        color: var(--dig-text);
      }}

      .layout-render-shell {{
        width: min(1520px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 64px;
      }}

      .layout-render-header {{
        margin-bottom: 32px;
      }}

      .layout-render-header .eyebrow {{
        display: inline-flex;
        padding: 4px 12px;
        border: 1px solid var(--dig-border);
        border-radius: 999px;
        font-family: var(--dig-font-mono, monospace);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--dig-text-muted);
      }}

      .layout-render-header h1 {{
        margin: 16px 0 8px;
        font-size: var(--dig-text-3xl, 32px);
        font-weight: 800;
        letter-spacing: -0.03em;
      }}

      .layout-render-header .desc {{
        margin: 0 0 20px;
        color: var(--dig-text-muted);
        max-width: 640px;
        line-height: 1.55;
      }}

      .layout-meta-row {{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px;
      }}

      .meta-chip {{
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid var(--dig-border);
        font-size: 12px;
        font-family: var(--dig-font-mono, monospace);
        color: var(--dig-text-soft);
      }}

      .catalog-switcher {{
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
      }}

      .catalog-switcher-label {{
        font-size: 13px;
        color: var(--dig-text-muted);
        margin-right: 8px;
      }}

      .catalog-btn {{
        min-height: 36px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid var(--dig-border);
        background: var(--dig-surface);
        color: var(--dig-text-muted);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.18s ease;
      }}

      .catalog-btn.active {{
        background: var(--dig-accent);
        color: var(--dig-bg);
        border-color: transparent;
      }}

      .catalog-btn:focus-visible {{
        outline: 2px solid var(--dig-accent);
        outline-offset: 2px;
      }}

      .viewport-section {{
        margin-bottom: 40px;
      }}

      .viewport-label {{
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 12px;
        font-family: var(--dig-font-mono, monospace);
        font-size: 12px;
        color: var(--dig-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }}

      .viewport-label span {{
        font-size: 11px;
        color: var(--dig-text-soft);
        text-transform: none;
        letter-spacing: 0;
      }}

      .viewport-preview {{
        border: 1px solid var(--dig-border);
        border-radius: var(--dig-radius-md, 16px);
        background: var(--dig-surface-strong);
        overflow-x: auto;
        overflow-y: hidden;
        box-shadow: var(--dig-shadow-soft, 0 8px 32px rgba(0,0,0,0.12));
      }}

      .viewport-frame {{
        margin: 0 auto;
        background: var(--dig-bg);
        overflow-x: auto;
        overflow-y: hidden;
        container-type: inline-size;
        container-name: layout-viewport;
        flex-shrink: 0;
      }}

      .viewport-desktop .viewport-frame {{ width: 1440px; }}
      .viewport-tablet .viewport-frame {{ width: 900px; }}
      .viewport-mobile .viewport-frame {{ width: 390px; }}

      .layout-render-notes {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid var(--dig-border);
      }}

      .notes-card {{
        padding: 20px;
        border: 1px solid var(--dig-border);
        border-radius: var(--dig-radius-md, 16px);
        background: var(--dig-surface);
      }}

      .notes-card h3 {{
        margin: 0 0 12px;
        font-size: 14px;
        font-weight: 700;
      }}

      .notes-card ul {{
        margin: 0;
        padding-left: 18px;
        font-size: 13px;
        color: var(--dig-text-muted);
        line-height: 1.55;
      }}

      .slots-list {{
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
      }}

      .slots-list li {{
        margin-bottom: 8px;
        color: var(--dig-text-muted);
      }}

      .slot-badge {{
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 4px;
        font-family: var(--dig-font-mono, monospace);
      }}

      .slot-required {{ background: color-mix(in srgb, var(--dig-accent) 25%, transparent); color: var(--dig-text); }}
      .slot-optional {{ background: var(--dig-surface-elevated); color: var(--dig-text-soft); }}
      .slot-role {{ color: var(--dig-text-soft); font-size: 11px; }}

      .catalog-rec-row {{
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }}

      .catalog-rec-chip {{
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid var(--dig-border);
        font-size: 12px;
        font-family: var(--dig-font-mono, monospace);
        color: var(--dig-text-muted);
        background: var(--dig-surface-elevated);
      }}

      .back-link {{
        display: inline-block;
        margin-bottom: 16px;
        font-size: 13px;
        color: var(--dig-accent-2, var(--dig-accent));
        text-decoration: none;
      }}

      .back-link:hover {{ text-decoration: underline; }}

      .global-rules-summary {{
        margin: 0;
        padding-left: 18px;
        font-size: 13px;
        color: var(--dig-text-muted);
        line-height: 1.55;
      }}

      .global-rules-summary ul {{
        margin: 4px 0 8px;
        padding-left: 16px;
      }}

      .global-rules-sources {{
        margin: 8px 0 0;
        font-size: 11px;
        font-family: var(--dig-font-mono, monospace);
        color: var(--dig-text-soft);
      }}

      .global-rules-disabled {{
        margin: 0;
        font-size: 13px;
        font-family: var(--dig-font-mono, monospace);
        color: var(--dig-warning, #f3b64c);
      }}

      /* Per-layout preview CSS from markdown */
{preview_css}
    </style>
  </head>
  <body>
    <main class="layout-render-shell">
      <a class="back-link" href="./index.html">← Layout index</a>
      <header class="layout-render-header">
        <span class="eyebrow">Layout / Dig UI</span>
        <h1>{html_lib.escape(name)} <span style="font-weight:500;color:var(--dig-text-muted);font-size:0.65em;">{html_lib.escape(name_zh)}</span></h1>
        <p class="desc" data-zh="{html_lib.escape(desc_zh)}" data-en="{html_lib.escape(desc_en)}">{html_lib.escape(desc)}</p>
        <div class="layout-meta-row">
          <span class="meta-chip">slug: {html_lib.escape(slug)}</span>
          <span class="meta-chip">type: {html_lib.escape(page_type)}</span>
          <span class="meta-chip">status: {html_lib.escape(status)}</span>
        </div>
        <div class="catalog-switcher">
          <span class="catalog-switcher-label">Catalog</span>
          {switcher}
        </div>
      </header>

      <section class="viewport-section viewport-desktop">
        <div class="viewport-label">Desktop <span>1440px</span></div>
        <div class="viewport-preview viewport-desktop">
          <div class="viewport-frame">
            {preview_html}
          </div>
        </div>
      </section>

      <section class="viewport-section viewport-tablet">
        <div class="viewport-label">Tablet <span>900px</span></div>
        <div class="viewport-preview viewport-tablet">
          <div class="viewport-frame">
            {preview_html}
          </div>
        </div>
      </section>

      <section class="viewport-section viewport-mobile">
        <div class="viewport-label">Mobile <span>390px</span></div>
        <div class="viewport-preview viewport-mobile">
          <div class="viewport-frame">
            {preview_html}
          </div>
        </div>
      </section>

      <aside class="layout-render-notes">
        <div class="notes-card global-rules-card">
          <h3>Global Rules</h3>
          {global_rules_html}
        </div>
        <div class="notes-card">
          <h3>Recommended Catalogs</h3>
          {recommended_catalogs_html}
        </div>
        <div class="notes-card">
          <h3>Applicable Scenarios</h3>
          {applicable_html}
        </div>
        <div class="notes-card">
          <h3>Avoid When</h3>
          {avoid_when_html}
        </div>
        <div class="notes-card">
          <h3>Slots</h3>
          {slots_html}
        </div>
        <div class="notes-card">
          <h3>Layout Rules</h3>
          {layout_rules_html}
        </div>
        <div class="notes-card">
          <h3>Responsive Rules</h3>
          {responsive_rules_html}
        </div>
        <div class="notes-card">
          <h3>QA Notes</h3>
          {qa_notes_html}
        </div>
      </aside>
    </main>
    <script>
      (function () {{
        const root = document.documentElement;
        const saved = localStorage.getItem('dig-layout-catalog');
        if (saved && document.querySelector('[data-catalog="' + saved + '"]')) {{
          root.dataset.catalog = saved;
        }}
        document.querySelectorAll('.catalog-btn').forEach(function (btn) {{
          btn.classList.toggle('active', btn.dataset.catalog === root.dataset.catalog);
          btn.addEventListener('click', function () {{
            root.dataset.catalog = btn.dataset.catalog;
            localStorage.setItem('dig-layout-catalog', btn.dataset.catalog);
            document.querySelectorAll('.catalog-btn').forEach(function (b) {{
              b.classList.toggle('active', b.dataset.catalog === root.dataset.catalog);
            }});
          }});
        }});
      }})();
    </script>
  </body>
</html>
"""


def generate_index_html(layout_entries):
    cards = []
    for entry in sorted(layout_entries, key=lambda x: x["slug"]):
        meta = entry["meta"]
        slug = entry["slug"]
        name = meta.get("name", slug)
        name_zh = meta.get("name_zh", "")
        page_type = meta.get("page_type", "")
        status = meta.get("status", "draft")
        desc = meta.get("description_zh") or meta.get("description_en", "")
        rec = meta.get("recommended_catalogs", "")
        rec_html = ""
        if rec:
            rec_chips = " ".join(
                f'<span class="layout-rec-tag">{html_lib.escape(CATALOG_LABELS.get(c.strip(), c.strip()))}</span>'
                for c in rec.split(",") if c.strip()
            )
            rec_html = f'<div class="layout-card-rec">{rec_chips}</div>'
        cards.append(f"""
        <a class="layout-card" href="./{slug}.html">
          <span class="layout-card-type">{html_lib.escape(page_type)}</span>
          <h2>{html_lib.escape(name)}</h2>
          <p class="layout-card-zh">{html_lib.escape(name_zh)}</p>
          <p class="layout-card-desc">{html_lib.escape(desc)}</p>
          {rec_html}
          <span class="layout-card-status status-{html_lib.escape(status)}">{html_lib.escape(status)}</span>
        </a>""")

    cards_html = "\n".join(cards)
    return f"""<!doctype html>
<html lang="zh-CN" data-catalog="dig">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dig UI Layout Index</title>
    <link rel="stylesheet" href="../../assets/layout-preview.css" />
    <style>
{build_catalog_css_blocks()}
      body {{
        margin: 0;
        min-height: 100vh;
        font-family: var(--dig-font-sans, sans-serif);
        background: linear-gradient(135deg, var(--dig-bg), var(--dig-bg-soft));
        color: var(--dig-text);
        padding: 32px 16px 64px;
      }}
      .index-shell {{ max-width: 960px; margin: 0 auto; }}
      .index-shell h1 {{ font-size: 36px; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 8px; }}
      .index-shell .lead {{ color: var(--dig-text-muted); margin: 0 0 32px; max-width: 560px; line-height: 1.55; }}
      .layout-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }}
      .layout-card {{
        display: block;
        padding: 24px;
        border: 1px solid var(--dig-border);
        border-radius: var(--dig-radius-md, 16px);
        background: var(--dig-surface);
        text-decoration: none;
        color: inherit;
        transition: border-color 0.18s ease, box-shadow 0.18s ease;
      }}
      .layout-card:hover {{
        border-color: var(--dig-border-strong);
        box-shadow: var(--dig-shadow-soft);
      }}
      .layout-card-type {{
        font-family: var(--dig-font-mono, monospace);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--dig-text-soft);
      }}
      .layout-card h2 {{ margin: 12px 0 4px; font-size: 20px; font-weight: 700; }}
      .layout-card-zh {{ margin: 0; font-size: 14px; color: var(--dig-text-muted); }}
      .layout-card-desc {{ margin: 12px 0 0; font-size: 13px; color: var(--dig-text-soft); line-height: 1.5; }}
      .layout-card-rec {{ display: flex; flex-wrap: wrap; gap: 4px; margin-top: 12px; }}
      .layout-rec-tag {{ font-size: 10px; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--dig-border); font-family: var(--dig-font-mono, monospace); color: var(--dig-text-soft); }}
      .layout-card-status {{
        display: inline-block;
        margin-top: 16px;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 999px;
        font-family: var(--dig-font-mono, monospace);
      }}
      .status-draft {{ background: color-mix(in srgb, var(--dig-warning, #f3b64c) 30%, transparent); }}
      .status-stable {{ background: color-mix(in srgb, var(--dig-success, #37d67a) 30%, transparent); }}
      .back-hub {{ display: inline-block; margin-bottom: 24px; color: var(--dig-accent-2, var(--dig-accent)); font-size: 13px; text-decoration: none; }}
    </style>
  </head>
  <body>
    <div class="index-shell">
      <a class="back-hub" href="../index.html">← Catalog handbook</a>
      <span class="dig-kicker" style="display:block;margin-bottom:8px;">Layout Recipes</span>
      <h1>Layout Index</h1>
      <p class="lead">与 Catalog 平级的结构资产：区域划分、slot、响应式与信息密度可预览、可切换 catalog 对照。</p>
      <div class="layout-grid">
{cards_html}
      </div>
    </div>
  </body>
</html>
"""


def collect_index_entries():
    """Lightweight index metadata from all layout markdown files."""
    entries = []
    for name in sorted(os.listdir(LAYOUT_DIR)):
        if not name.endswith(".md") or name.startswith("_") or name == "README.md":
            continue
        md_path = os.path.join(LAYOUT_DIR, name)
        with open(md_path, "r", encoding="utf-8") as f:
            content = f.read()
        meta = parse_frontmatter(content)
        slug = meta.get("slug", name[:-3])
        entries.append({"slug": slug, "meta": meta})
    return entries


def write_layout_index(entries=None):
    if entries is None:
        entries = collect_index_entries()
    index_path = os.path.join(RENDER_DIR, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(generate_index_html(entries))
    print("🎉 Updated renders/layouts/index.html")


def parse_cli_args():
    args = sys.argv[1:]
    no_global = False
    target = None
    for arg in args:
        if arg == "--no-global":
            no_global = True
        elif not arg.startswith("-"):
            target = arg
    return target, no_global


def main():
    target, no_global = parse_cli_args()

    if no_global:
        print("ℹ️  Global rules disabled for this render (--no-global)")

    md_files = []
    if target:
        target_slug = target.replace(".md", "")
        candidate = os.path.join(LAYOUT_DIR, f"{target_slug}.md")
        if os.path.isfile(candidate):
            md_files = [candidate]
        else:
            print(f"❌ Error: Cannot find layout file for '{target}'")
            sys.exit(1)
        print(f"🎯 Target layout: {target_slug}")
    else:
        for name in sorted(os.listdir(LAYOUT_DIR)):
            if name.endswith(".md") and not name.startswith("_") and name != "README.md":
                md_files.append(os.path.join(LAYOUT_DIR, name))

    os.makedirs(RENDER_DIR, exist_ok=True)
    print(f"🔄 Compiling {len(md_files)} layout(s)...")

    entries = []
    for md_file in md_files:
        result = render_layout_page(md_file, no_global=no_global)
        if not result:
            continue
        out_path = os.path.join(RENDER_DIR, f"{result['slug']}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(result["html"])
        entries.append(result)
        print(f"✅ Layout render: renders/layouts/{result['slug']}.html")

    if entries:
        write_layout_index()

    print("🎉 Layout sync completed!")


if __name__ == "__main__":
    main()
