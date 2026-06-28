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
SCHEMA_VERSION = "1"

REQUIRED_STATES = [
    "default",
    "hover",
    "focus-visible",
    "disabled",
    "loading",
    "error",
    "mobile",
]


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


def list_block_files():
    files = []
    if not os.path.exists(BLOCK_DIR):
        return files
    for root, _, names in os.walk(BLOCK_DIR):
        for name in names:
            if name.endswith(".md") and name != "README.md":
                files.append(os.path.join(root, name))
    return sorted(files)


def load_fixture(block_id):
    fixture_path = os.path.join(FIXTURE_DIR, f"{block_id}.json")
    if not os.path.exists(fixture_path):
        return {
            "name": "generated-required-states",
            "states": REQUIRED_STATES,
            "path": "generated",
        }
    with open(fixture_path, "r", encoding="utf-8") as f:
        fixture = json.load(f)
    states = fixture.get("states") or REQUIRED_STATES
    return {
        "name": os.path.basename(fixture_path),
        "states": states,
        "path": os.path.relpath(fixture_path, PROJECT_DIR),
    }


def render_state_card(block_id, state):
    label = html.escape(state)
    disabled = " disabled" if state == "disabled" else ""
    state_class = f" state-{state.replace('-', '_')}"
    return f"""
      <article class="state-card{state_class}">
        <div class="state-head">
          <span>{label}</span>
          <code>{html.escape(block_id)}</code>
        </div>
        <div class="state-body">
          <button class="demo-button"{disabled}>{'Loading...' if state == 'loading' else 'Action'}</button>
          <div class="demo-row">
            <strong>{'Error state' if state == 'error' else 'Primary label'}</strong>
            <span>{'Something needs attention.' if state == 'error' else 'Secondary metadata and helper text.'}</span>
          </div>
        </div>
      </article>"""


def render_block_page(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    meta = parse_frontmatter(content)
    block_id = meta.get("id", os.path.basename(file_path)[:-3])
    category = meta.get("category", "product")
    description = meta.get("description", "")
    states_text = extract_section(content, "States")
    fixture = load_fixture(block_id)
    states = fixture["states"]
    if not states:
        states = [candidate for candidate in REQUIRED_STATES if candidate in states_text] or REQUIRED_STATES

    source_rel = os.path.relpath(file_path, PROJECT_DIR)
    state_cards = "\n".join(render_state_card(block_id, state) for state in states)
    return f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dig UI Block — {html.escape(block_id)}</title>
    <style>
      :root {{
        color-scheme: dark;
        --dig-bg: #06121a;
        --dig-surface: rgba(16,32,44,.92);
        --dig-surface-raised: rgba(20,39,53,.96);
        --dig-text: #ecf3f8;
        --dig-muted: #8aa0b2;
        --dig-accent: #37d67a;
        --dig-danger: #f06a6a;
        --dig-border: rgba(138,160,178,.2);
        --dig-radius: 8px;
        --dig-radius-pill: 999px;
      }}
      body {{ margin:0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background:var(--dig-bg); color:var(--dig-text); }}
      main {{ width:min(1180px, calc(100% - 32px)); margin:0 auto; padding:32px 0 56px; }}
      header {{ display:grid; gap:10px; margin-bottom:24px; }}
      h1 {{ margin:0; font-size:32px; }}
      p {{ margin:0; color:var(--dig-muted); line-height:1.6; }}
      .meta {{ display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }}
      .chip {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius-pill); padding:4px 10px; color:var(--dig-muted); font-size:12px; }}
      .grid {{ display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px; }}
      .state-card {{ border:1px solid var(--dig-border); border-radius:var(--dig-radius); background:var(--dig-surface); padding:14px; min-height:150px; }}
      .state-head {{ display:flex; justify-content:space-between; gap:12px; color:var(--dig-muted); font-size:12px; margin-bottom:14px; }}
      code {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color:var(--dig-accent); }}
      .state-body {{ display:grid; gap:12px; }}
      .demo-button {{ min-height:44px; border:1px solid transparent; border-radius:var(--dig-radius-pill); background:var(--dig-accent); color:var(--dig-bg); font-weight:700; padding:0 16px; }}
      .demo-button:focus-visible, .state-focus_visible .demo-button {{ outline:2px solid var(--dig-accent); outline-offset:3px; }}
      .demo-button:disabled {{ opacity:.45; cursor:not-allowed; }}
      .demo-row {{ display:grid; gap:4px; border:1px solid var(--dig-border); background:var(--dig-surface-raised); border-radius:var(--dig-radius); padding:12px; }}
      .demo-row span {{ color:var(--dig-muted); font-size:13px; }}
      .state-error .demo-row strong {{ color:var(--dig-danger); }}
      .state-mobile {{ max-width:320px; }}
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>{html.escape(block_id)}</h1>
        <p>{html.escape(description)}</p>
        <div class="meta">
          <span class="chip">category: {html.escape(category)}</span>
          <span class="chip">source: {html.escape(source_rel)}</span>
          <span class="chip">asset source: official</span>
          <span class="chip">catalog: all</span>
          <span class="chip">fixture: {html.escape(fixture["name"])}</span>
          <span class="chip">schema version: {SCHEMA_VERSION}</span>
          <span class="chip">language: installed</span>
        </div>
      </header>
      <section class="grid" aria-label="Block states">
{state_cards}
      </section>
    </main>
  </body>
</html>
"""


def render_index(pages):
    links = "\n".join(
        f'<li><a href="{html.escape(name)}.html">{html.escape(name)}</a></li>'
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
        print(f"✅ Synced block render: renders/blocks/{block_id}.html")

    with open(os.path.join(RENDER_DIR, "index.html"), "w", encoding="utf-8") as f:
        f.write(render_index(sorted(pages)))
    print("✅ Synced block render index: renders/blocks/index.html")


if __name__ == "__main__":
    main()
