#!/usr/bin/env python3
# sync_renders.py
# Next-generation high-fidelity design system compiler for Dig UI.
# Automatically syncs CSS Tokens, Name, and original Description from Markdown to HTML views.
# Features free Google Translate API engine, bilingual Frontmatter parsing, and dynamic index hub updating.

import os
import sys
import re
import urllib.request
import urllib.parse
import json
import html

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_DIR = os.path.join(PROJECT_DIR, "references", "catalogs")
RENDER_DIR = os.path.join(PROJECT_DIR, "renders")
LOCALIZED_MARKDOWN_RE = re.compile(r"\.(en|zh-CN)\.md$")
PALETTE_REQUIRED_FRONTMATTER = {
    "kind": "color-palette-catalog",
    "category": "palettes",
    "token_contract": "palette_v1",
}
STYLE_REQUIRED_FRONTMATTER = {
    "kind": "style-catalog",
    "category": "styles",
    "token_contract": "style_v1",
}
BRAND_V1_REQUIRED_TOKEN_ROLES = [
    "--dig-bg",
    "--dig-bg-soft",
    "--dig-surface",
    "--dig-surface-strong",
    "--dig-surface-elevated",
    "--dig-text",
    "--dig-text-muted",
    "--dig-text-soft",
    "--dig-accent",
    "--dig-accent-2",
    "--dig-border",
    "--dig-grid-line",
    "--dig-control-bg",
    "--dig-control-bg-hover",
]
PALETTE_V1_ADDITIONAL_TOKEN_ROLES = [
    "--dig-accent-strong",
    "--dig-accent-2-strong",
    "--dig-border-strong",
]
STYLE_V1_ADDITIONAL_TOKEN_ROLES = [
    "--dig-accent-strong",
    "--dig-accent-2-strong",
    "--dig-border-strong",
    "--dig-stroke-width",
    "--dig-stroke-width-strong",
    "--dig-shadow-chunky",
    "--dig-motion-bounce",
]
STYLE_REQUIRED_CONTRACT_MARKERS = [
    "best_for:",
    "avoid_for:",
    "mood:",
    "shape_language:",
    "surface_language:",
    "illustration_language:",
    "component_mapping:",
    "motion_language:",
]
STYLE_THEME_TOKEN_ROLES = [
    "--dig-bg", "--dig-bg-soft", "--dig-surface", "--dig-surface-strong",
    "--dig-surface-elevated", "--dig-text", "--dig-text-muted", "--dig-text-soft",
    "--dig-accent", "--dig-accent-2", "--dig-border", "--dig-border-strong",
    "--dig-grid-line", "--dig-control-bg", "--dig-control-bg-hover", "--dig-success",
    "--dig-warning", "--dig-danger", "--dig-info",
]
MOBILE_GAME_COMPANION_TOKEN_ROLES = [
    "--dig-game-sky-start",
    "--dig-game-sky-mid",
    "--dig-game-sky-end",
    "--dig-game-hill-front",
    "--dig-game-hill-mid",
    "--dig-game-hill-back",
    "--dig-game-cloud",
    "--dig-mascot-primary",
    "--dig-mascot-secondary",
    "--dig-mascot-face",
    "--dig-mascot-belly",
    "--dig-mission-surface",
    "--dig-coach-surface-start",
    "--dig-coach-surface-end",
    "--dig-gear-surface",
    "--dig-gear-icon-surface",
    "--dig-game-on-accent",
]
SIGNAL_OPS_CONSOLE_TOKEN_ROLES = [
    "--dig-signal-paper-bg",
    "--dig-signal-paper-panel",
    "--dig-signal-paper-border",
    "--dig-signal-terminal-bg",
    "--dig-signal-terminal-panel",
    "--dig-signal-terminal-border",
    "--dig-signal-terminal-text",
    "--dig-signal-terminal-muted",
    "--dig-signal-terminal-tape-bg",
    "--dig-signal-positive",
    "--dig-signal-negative",
    "--dig-signal-warning",
    "--dig-signal-info",
    "--dig-signal-grid-line",
    "--dig-signal-tape-bg",
    "--dig-signal-node",
    "--dig-signal-node-active",
    "--dig-signal-book-bid",
    "--dig-signal-book-ask",
    "--dig-signal-chart-line",
    "--dig-signal-chart-fill",
]
PALETTE_REQUIRED_ANCHORS = ["canvas", "ink", "primary", "support"]
PALETTE_REQUIRED_DERIVED_ROLES = ["surface", "muted", "focus", "disabled", "overlay"]
PALETTE_REQUIRED_SITE_ROLES = [
    "page_background",
    "headline",
    "body_text",
    "muted_text",
    "cta_background",
    "cta_text",
    "card_background",
    "card_text",
    "link",
    "illustration_highlight",
    "focus_ring",
    "disabled_text",
    "overlay",
]
DEFAULT_PALETTE_SUPPORT_CANDIDATES = [
    {"label": "Sky Information", "value": "#4FB3FF", "strong": "#2697EB"},
    {"label": "System Blue", "value": "#0071E3", "strong": "#006EDB"},
    {"label": "Periwinkle", "value": "#7A7FAD", "strong": "#5E6390"},
    {"label": "Soft Gold", "value": "#B68A35", "strong": "#8A6724"},
    {"label": "Sage Gray", "value": "#6F8F7A", "strong": "#4F6F59"},
]

def is_canonical_catalog_markdown(file_name):
    return (
        file_name.endswith(".md")
        and file_name != "README.md"
        and not LOCALIZED_MARKDOWN_RE.search(file_name)
    )

def clean_description(desc):
    if not desc:
        return ""
    desc = desc.strip()
    if desc.startswith('|') or desc.startswith('>'):
        desc = desc[1:].strip()
    desc = re.sub(r'\s+', ' ', desc)
    return desc.strip()

def parse_frontmatter_value(md_content, key):
    match = re.search(rf'^{re.escape(key)}:\s*["\']?([^"\'\n]+)', md_content, re.MULTILINE)
    return match.group(1).strip() if match else ""

def parse_hex_color(value):
    value = (value or "").strip()
    short_match = re.fullmatch(r"#([0-9a-fA-F]{3})", value)
    if short_match:
        chars = short_match.group(1)
        return tuple(int(ch * 2, 16) for ch in chars)
    long_match = re.fullmatch(r"#([0-9a-fA-F]{6})", value)
    if long_match:
        raw = long_match.group(1)
        return tuple(int(raw[i:i + 2], 16) for i in (0, 2, 4))
    return None

def is_light_color(value):
    rgb = parse_hex_color(value)
    if not rgb:
        return False
    red, green, blue = rgb
    # Relative luminance approximation is enough for render chrome intent.
    luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255
    return luminance >= 0.68

def has_explicit_render_archetype(md_content):
    return bool(re.search(r'\nrender:\s*\n(?:[^\n]*\n)*?\s*archetype:\s*["\']?[^"\'\n]+', md_content))

def parse_render_setting(md_content, key):
    render_match = re.search(r'\nrender:\s*\n(.*?)(?:\n[a-zA-Z0-9_-]+:\s|\n---|\n##|\Z)', md_content, re.DOTALL)
    if not render_match:
        return ""
    setting_match = re.search(rf'^\s*{re.escape(key)}:\s*["\']?([^"\'\n]+)', render_match.group(1), re.MULTILINE)
    return setting_match.group(1).strip() if setting_match else ""

def strip_legacy_inline_preview_overrides(html_content):
    # Older template renders carried a hard-coded dotted body background in an
    # inline style block. Style renders must inherit the tokenized shared CSS
    # background instead, otherwise catalog tokens are not the source of truth.
    legacy_body_before = re.compile(
        r'\n\s*body::before\s*\{\s*'
        r'background:\s*radial-gradient\(circle,\s*#52525b\s+1px,\s*transparent\s+1px\);\s*'
        r'background-size:\s*8px\s+8px;\s*'
        r'opacity:\s*0\.62;\s*'
        r'\}\s*',
        re.MULTILINE,
    )
    return legacy_body_before.sub("\n", html_content)

def google_translate(text, target_lang='zh-CN', source_lang='auto'):
    if not text:
        return ""
    if os.environ.get("DIG_UI_ENABLE_TRANSLATE") != "1":
        return text
    try:
        url = "https://translate.googleapis.com/translate_a/single"
        params = {
            "client": "gtx",
            "sl": source_lang,
            "tl": target_lang,
            "dt": "t",
            "q": text
        }
        query_string = urllib.parse.urlencode(params)
        req = urllib.request.Request(f"{url}?{query_string}", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as response:
            data = json.loads(response.read().decode('utf-8'))
            translated = "".join([sentence[0] for sentence in data[0] if sentence[0]])
            return translated
    except Exception as e:
        print(f"⚠️ Translation service failed for '{text[:20]}...': {e}. Falling back to source text.")
        return text

def description_to_sentences(desc):
    if not desc:
        return []
    # Split on sentence terminals like period, question mark, exclamation, or semicolons
    sentences = re.split(r'(?<=[.!?。！？])\s+', desc)
    return [s.strip() for s in sentences if s.strip()]

def escape_attr(value):
    return html.escape(value or "", quote=True)

def parse_frontmatter_fields(md_content):
    match = re.match(r'^---\s*\n(.*?)\n---', md_content, re.DOTALL)
    if not match:
        return {}
    fields = {}
    for line in match.group(1).split("\n"):
        field_match = re.match(r'^([a-zA-Z0-9_-]+):\s*(.*?)\s*$', line)
        if field_match:
            fields[field_match.group(1)] = field_match.group(2).strip().strip('"\'')
    return fields

def normalize_yaml_scalar(value):
    return (value or "").strip().strip('"\'').strip()

def has_meaningful_value(value):
    normalized = normalize_yaml_scalar(value)
    return normalized not in ["", "null", "~"]

def normalize_hex_color(value):
    normalized = normalize_yaml_scalar(value)
    if re.fullmatch(r'#[0-9a-fA-F]{3}', normalized):
        return "#" + "".join([char * 2 for char in normalized[1:]]).upper()
    if re.fullmatch(r'#[0-9a-fA-F]{6}', normalized):
        return normalized.upper()
    return ""

def extract_section_outside_fences(content, heading):
    lines = content.split("\n")
    target = re.compile(rf'^##\s+{re.escape(heading)}\s*$')
    next_heading = re.compile(r'^##\s+')
    collected = []
    collecting = False
    in_fence = False
    fence_char = ""
    fence_length = 0

    for line in lines:
        fence_match = re.match(r'^(`{3,}|~{3,})', line)
        if fence_match:
            marker = fence_match.group(1)
            if not in_fence:
                in_fence = True
                fence_char = marker[0]
                fence_length = len(marker)
            elif marker[0] == fence_char and len(marker) >= fence_length:
                in_fence = False
                fence_char = ""
                fence_length = 0

        if not in_fence and target.match(line):
            collecting = True
            continue
        if collecting and not in_fence and next_heading.match(line):
            break
        if collecting:
            collected.append(line)

    return "\n".join(collected).strip()

def extract_fenced_code_block_from_section(content, heading, language):
    section = extract_section_outside_fences(content, heading)
    if not section:
        return ""
    match = re.search(rf'```{re.escape(language)}\s*\n(.*?)\n```', section, re.DOTALL)
    return match.group(1).strip() if match else ""

def parse_yaml_section_map(content, section_name):
    lines = content.split("\n")
    values = {}
    in_section = False
    base_indent = 0
    for line in lines:
        section_match = re.match(rf'^(\s*){re.escape(section_name)}:\s*$', line)
        if section_match:
            in_section = True
            base_indent = len(section_match.group(1))
            continue
        if not in_section:
            continue
        indent = len(re.match(r'^\s*', line).group(0))
        if line.strip() and indent <= base_indent:
            break
        key_match = re.match(r'^\s+([a-zA-Z0-9_-]+):\s*(.*?)\s*$', line)
        if key_match:
            values[key_match.group(1)] = key_match.group(2)
    return values

def parse_palette_support_candidate_maps(content):
    lines = content.split("\n")
    items = []
    current = None
    in_candidates = False
    in_support = False
    candidates_indent = 0
    support_indent = 0

    for line in lines:
        if not line.strip():
            continue
        indent = len(re.match(r'^\s*', line).group(0))
        if not in_candidates:
            match = re.match(r'^(\s*)candidates:\s*$', line)
            if match:
                in_candidates = True
                candidates_indent = len(match.group(1))
            continue
        if indent <= candidates_indent:
            break
        if not in_support:
            match = re.match(r'^\s*support:\s*$', line)
            if match:
                in_support = True
                support_indent = indent
            continue
        if indent <= support_indent:
            break

        item_match = re.match(r'^\s*-\s*(?:(label|value|strong):\s*(.*?)\s*)?$', line)
        if item_match:
            if current is not None:
                items.append(current)
            current = {}
            if item_match.group(1):
                current[item_match.group(1)] = item_match.group(2)
            continue

        field_match = re.match(r'^\s+(label|value|strong):\s*(.*?)\s*$', line)
        if current is not None and field_match:
            current[field_match.group(1)] = field_match.group(2)

    if current is not None:
        items.append(current)
    return items

def normalize_palette_support_candidates(candidate_maps):
    candidates = []
    errors = []
    for index, candidate in enumerate(candidate_maps, start=1):
        label = normalize_yaml_scalar(candidate.get("label")) or f"Support {index}"
        value = normalize_hex_color(candidate.get("value"))
        strong = normalize_hex_color(candidate.get("strong"))
        if not value:
            errors.append(f"support candidate {index} missing valid value hex")
        if not strong:
            errors.append(f"support candidate {index} missing valid strong hex")
        if value and strong:
            candidates.append({"label": label, "value": value, "strong": strong})
    return candidates, errors

def parse_palette_support_candidates_from_contract(contract_block):
    candidate_maps = parse_palette_support_candidate_maps(contract_block)
    if not candidate_maps:
        return [], []
    return normalize_palette_support_candidates(candidate_maps)

def parse_palette_support_candidates(md_content):
    contract_block = extract_fenced_code_block_from_section(md_content, "Palette Contract", "yaml")
    candidates, errors = parse_palette_support_candidates_from_contract(contract_block)
    if errors:
        fail_catalog("; ".join(errors))
    return candidates or DEFAULT_PALETTE_SUPPORT_CANDIDATES

def parse_css_tokens(content):
    return {
        match.group(1): match.group(2).strip()
        for match in re.finditer(r'(--dig-[\w-]+)\s*:\s*([^;]*);', content)
    }

def fail_catalog(message):
    print(f"❌ Error: {message}")
    sys.exit(1)

def validate_catalog_identity(md_content, category_slug, catalog_slug, rel_path):
    fields = parse_frontmatter_fields(md_content)

    if category_slug.startswith("palettes") and category_slug != "palettes":
        fail_catalog(f"Palette catalogs must be direct files under references/catalogs/palettes ({rel_path})")
    if category_slug.startswith("styles") and category_slug != "styles":
        fail_catalog(f"Style catalogs must be direct files under references/catalogs/styles ({rel_path})")

    if category_slug != "palettes":
        palette_markers = {
            key: value
            for key, value in PALETTE_REQUIRED_FRONTMATTER.items()
            if fields.get(key) == value
        }
        if palette_markers:
            fail_catalog(f"Palette catalog contract must live under references/catalogs/palettes ({rel_path})")
    if category_slug != "styles":
        style_markers = {
            key: value
            for key, value in STYLE_REQUIRED_FRONTMATTER.items()
            if fields.get(key) == value
        }
        if style_markers:
            fail_catalog(f"Style catalog contract must live under references/catalogs/styles ({rel_path})")

    if category_slug == "styles":
        frontmatter_slug = fields.get("slug")
        if frontmatter_slug != catalog_slug:
            fail_catalog(f"Style slug must match filename ({frontmatter_slug or 'missing slug'} != {catalog_slug})")
        for key, expected in STYLE_REQUIRED_FRONTMATTER.items():
            actual = fields.get(key)
            if actual != expected:
                fail_catalog(f"Style frontmatter {key} must be '{expected}', got '{actual or 'missing'}'")
        return
    if category_slug != "palettes":
        return

    frontmatter_slug = fields.get("slug")
    if frontmatter_slug != catalog_slug:
        fail_catalog(f"Palette slug must match filename ({frontmatter_slug or 'missing slug'} != {catalog_slug})")
    if not re.fullmatch(r'palette\d{2,}', catalog_slug):
        fail_catalog(f"Palette slug must use stable numeric form like palette01, got '{catalog_slug}'")
    for key, expected in PALETTE_REQUIRED_FRONTMATTER.items():
        actual = fields.get(key)
        if actual != expected:
            fail_catalog(f"Palette frontmatter {key} must be '{expected}', got '{actual or 'missing'}'")

def validate_palette_contract(md_content, category_slug, catalog_slug, rel_path):
    validate_catalog_identity(md_content, category_slug, catalog_slug, rel_path)
    if category_slug == "styles":
        contract_block = extract_fenced_code_block_from_section(md_content, "Style Contract", "yaml")
        if not contract_block:
            fail_catalog(f"Style {catalog_slug} missing canonical style contract: ## Style Contract fenced yaml block")
        for marker in STYLE_REQUIRED_CONTRACT_MARKERS:
            if marker not in contract_block:
                fail_catalog(f"Style {catalog_slug} missing style contract marker '{marker}'")
        if not has_explicit_render_archetype(md_content):
            fail_catalog(f"Style {catalog_slug} missing explicit render archetype: render.archetype is required for style catalogs")

        token_block = extract_fenced_code_block_from_section(md_content, "Dig UI CSS Tokens", "css")
        if not token_block:
            fail_catalog(f"Style {catalog_slug} missing canonical CSS token block: ## Dig UI CSS Tokens fenced css block")
        tokens = parse_css_tokens(token_block)
        required_tokens = [*BRAND_V1_REQUIRED_TOKEN_ROLES, *STYLE_V1_ADDITIONAL_TOKEN_ROLES]
        if "archetype: mobile-game-companion" in md_content:
            required_tokens = [*required_tokens, *MOBILE_GAME_COMPANION_TOKEN_ROLES]
        if "archetype: signal-ops-console" in md_content:
            required_tokens = [*required_tokens, *SIGNAL_OPS_CONSOLE_TOKEN_ROLES]
        for token in required_tokens:
            if token not in tokens:
                fail_catalog(f"Style {catalog_slug} missing token role '{token}'")
            if not has_meaningful_value(tokens[token]):
                fail_catalog(f"Style {catalog_slug} token role '{token}' has empty value")
        for token in STYLE_THEME_TOKEN_ROLES:
            if token not in tokens or not has_meaningful_value(tokens[token]):
                fail_catalog(f"Style {catalog_slug} light theme missing token role '{token}'")
        dark_token_block = extract_fenced_code_block_from_section(md_content, "Dig UI Dark Tokens", "css")
        if not dark_token_block:
            fail_catalog(f"Style {catalog_slug} missing canonical dark token block: ## Dig UI Dark Tokens fenced css block")
        else:
            dark_tokens = parse_css_tokens(dark_token_block)
            for token in STYLE_THEME_TOKEN_ROLES:
                if token not in dark_tokens or not has_meaningful_value(dark_tokens[token]):
                    fail_catalog(f"Style {catalog_slug} dark theme missing token role '{token}'")
        return
    if category_slug != "palettes":
        return

    contract_block = extract_fenced_code_block_from_section(md_content, "Palette Contract", "yaml")
    if not contract_block:
        fail_catalog(f"Palette {catalog_slug} missing canonical palette contract: ## Palette Contract fenced yaml block")

    anchors = parse_yaml_section_map(contract_block, "anchors")
    for key in PALETTE_REQUIRED_ANCHORS:
        if key not in anchors:
            fail_catalog(f"Palette {catalog_slug} missing anchor '{key}'")
        if not has_meaningful_value(anchors[key]):
            fail_catalog(f"Palette {catalog_slug} anchor '{key}' has empty value")

    derived_roles = parse_yaml_section_map(contract_block, "derived_roles")
    for key in PALETTE_REQUIRED_DERIVED_ROLES:
        if key not in derived_roles:
            fail_catalog(f"Palette {catalog_slug} missing derived role '{key}'")
        if not has_meaningful_value(derived_roles[key]):
            fail_catalog(f"Palette {catalog_slug} derived role '{key}' has empty value")

    site_roles = parse_yaml_section_map(contract_block, "site_roles")
    for key in PALETTE_REQUIRED_SITE_ROLES:
        if key not in site_roles:
            fail_catalog(f"Palette {catalog_slug} missing site role '{key}'")
        if not has_meaningful_value(site_roles[key]):
            fail_catalog(f"Palette {catalog_slug} site role '{key}' has empty value")

    token_block = extract_fenced_code_block_from_section(md_content, "Dig UI CSS Tokens", "css")
    if not token_block:
        fail_catalog(f"Palette {catalog_slug} missing canonical CSS token block: ## Dig UI CSS Tokens fenced css block")

    tokens = parse_css_tokens(token_block)
    for token in [*BRAND_V1_REQUIRED_TOKEN_ROLES, *PALETTE_V1_ADDITIONAL_TOKEN_ROLES]:
        if token not in tokens:
            fail_catalog(f"Palette {catalog_slug} missing token role '{token}'")
        if not has_meaningful_value(tokens[token]):
            fail_catalog(f"Palette {catalog_slug} token role '{token}' has empty value")

    _, candidate_errors = parse_palette_support_candidates_from_contract(contract_block)
    if candidate_errors:
        fail_catalog(f"Palette {catalog_slug} has invalid support candidates: {'; '.join(candidate_errors)}")

def parse_render_intent(md_content, category_slug, brand_slug):
    archetype = None
    render_match = re.search(r'\nrender:\s*\n(.*?)(?:\n[a-zA-Z0-9_-]+:\s|\n---|\n##|\Z)', md_content, re.DOTALL)
    if render_match:
        archetype_match = re.search(r'^\s*archetype:\s*["\']?([^"\'\n]+)', render_match.group(1), re.MULTILINE)
        if archetype_match:
            archetype = archetype_match.group(1).strip()

    brand_defaults = {
        "raycast": "command-palette-marketing",
        "cursor": "command-palette-marketing",
        "warp": "command-palette-marketing",
        "spotify": "media-player-shell",
        "apple": "media-player-shell",
        "figma": "creative-canvas-workspace",
        "miro": "creative-canvas-workspace",
        "webflow": "creative-canvas-workspace",
        "shopify": "commerce-dual-track",
        "airbnb": "commerce-dual-track",
        "nike": "commerce-dual-track",
        "superhuman": "inbox-productivity",
        "notion": "inbox-productivity",
        "linear.app": "inbox-productivity",
        "wise": "finance-mobile-app",
        "revolut": "finance-mobile-app",
        "coinbase": "finance-mobile-app",
    }
    category_defaults = {
        "dev-tools": "command-palette-marketing",
        "creative-tools": "creative-canvas-workspace",
        "media-consumer": "media-player-shell",
        "ecommerce": "commerce-dual-track",
        "fintech": "finance-mobile-app",
        "saas": "inbox-productivity",
        "palettes": "site-palette-showcase",
        "styles": "token-sheet",
    }
    return archetype or brand_defaults.get(brand_slug) or category_defaults.get(category_slug) or "token-sheet"

def build_color_section():
    return """
          <section class="surface section" id="colors">
            <div class="section-head">
              <h3 data-zh="颜色系统" data-en="Color System">颜色系统</h3>
              <p data-zh="用当前 catalog token 检查背景、强调色和 surface 层级。" data-en="Inspect background, accent, and surface hierarchy from the active catalog tokens.">用当前 catalog token 检查背景、强调色和 surface 层级。</p>
            </div>
            <div class="swatch-grid">
              <article class="swatch"><div class="swatch-tone" style="background:var(--dig-bg)"></div><div class="swatch-meta"><strong>Background</strong><div class="meta-small mono token-val" data-token="--dig-bg">--dig-bg</div></div></article>
              <article class="swatch"><div class="swatch-tone" style="background:var(--dig-surface)"></div><div class="swatch-meta"><strong>Surface</strong><div class="meta-small mono token-val" data-token="--dig-surface">--dig-surface</div></div></article>
              <article class="swatch"><div class="swatch-tone" style="background:var(--dig-accent)"></div><div class="swatch-meta"><strong>Accent</strong><div class="meta-small mono token-val" data-token="--dig-accent">--dig-accent</div></div></article>
              <article class="swatch"><div class="swatch-tone" style="background:var(--dig-accent-2)"></div><div class="swatch-meta"><strong>Accent 2</strong><div class="meta-small mono token-val" data-token="--dig-accent-2">--dig-accent-2</div></div></article>
            </div>
          </section>"""

def build_token_section():
    rows = [
        "--dig-bg",
        "--dig-bg-soft",
        "--dig-surface",
        "--dig-surface-strong",
        "--dig-text",
        "--dig-text-muted",
        "--dig-accent",
        "--dig-accent-2",
        "--dig-border",
        "--dig-border-strong",
        "--dig-grid-line",
        "--dig-radius-md",
        "--dig-text-5xl",
        "--dig-shadow-panel",
    ]
    row_html = "\n".join([
        f'                <tr><td><code>{token}</code></td><td class="mono token-val" data-token="{token}">{token}</td></tr>'
        for token in rows
    ])
    return f"""
          <section class="surface section" id="tokens">
            <div class="section-head">
              <h3 data-zh="关键 Token" data-en="Key Tokens">关键 Token</h3>
              <p data-zh="这部分方便你对照 HTML 直接回写 catalog 文档。" data-en="This section serves as a direct reference for catalog document definitions.">这部分方便你对照 HTML 直接回写 catalog 文档。</p>
            </div>
            <div class="table-grid">
              <article class="table-card">
                <table class="token-table">
                  <thead><tr><th data-zh="变量" data-en="Token">Token</th><th data-zh="编译值" data-en="Value">Value</th></tr></thead>
                  <tbody>
{row_html}
                  </tbody>
                </table>
              </article>
            </div>
          </section>"""

def build_palette_lab_section(support_candidates=None, lab_id="palette-lab", title_zh="Palette Lab", title_en="Palette Lab", description_zh="临时试色只更新当前预览页的 CSS variables；确认后再把 token 回写到 catalog。", description_en="Trial colors only update CSS variables in this preview; copy the tokens back to the catalog when approved."):
    candidates = support_candidates or DEFAULT_PALETTE_SUPPORT_CANDIDATES
    candidate_html = "\n".join([
        f'''                <button type="button" class="palette-candidate" data-palette-candidate data-role="support" data-value="{candidate["value"]}" data-strong="{candidate["strong"]}">
                  <span class="palette-candidate-dot" style="--candidate-color: {candidate["value"]}; --candidate-strong: {candidate["strong"]};"></span>
                  <span>{html.escape(candidate["label"])}</span>
                  <code>{candidate["value"]}</code>
                </button>'''
        for candidate in candidates
    ])
    controls = [
        ("canvas", "Canvas", "画布", "--dig-bg"),
        ("ink", "Ink", "文字", "--dig-text"),
        ("primary", "Primary", "主强调色", "--dig-accent"),
        ("primaryStrong", "Primary Strong", "强主强调色", "--dig-accent-strong"),
        ("support", "Support", "第二强调色", "--dig-accent-2"),
        ("supportStrong", "Support Strong", "强第二强调色", "--dig-accent-2-strong"),
    ]
    control_html = "\n".join([
        f'''              <label class="palette-lab-row">
                <span class="palette-lab-role" data-zh="{label_zh}" data-en="{label_en}">{label_zh}</span>
                <span class="palette-lab-token">{token}</span>
                <input class="palette-lab-input" data-palette-input="{role}" inputmode="text" maxlength="9" aria-label="{label_en} hex" />
                <input class="palette-lab-color" data-palette-color="{role}" type="color" aria-label="{label_en} color picker" />
              </label>'''
        for role, label_en, label_zh, token in controls
    ])
    return f"""
            <div class="palette-lab-shell" id="{lab_id}" data-palette-lab>
              <div class="palette-lab-head">
                <div>
                  <h4 data-zh="{title_zh}" data-en="{title_en}">{title_zh}</h4>
                  <p data-zh="{description_zh}" data-en="{description_en}">{description_zh}</p>
                </div>
                <div class="palette-lab-actions">
                  <button type="button" class="btn btn-secondary palette-copy-btn" data-palette-copy data-zh="复制 Token" data-en="Copy Tokens">复制 Token</button>
                  <button type="button" class="btn palette-export-btn" data-palette-export data-zh="导出 ZIP" data-en="Export ZIP">导出 ZIP</button>
                </div>
              </div>
              <div class="palette-lab-grid">
                <div class="palette-lab-controls">
{control_html}
                </div>
                <div class="palette-candidate-panel">
                  <strong data-zh="第二强调色候选" data-en="Support Candidates">第二强调色候选</strong>
                  <div class="palette-candidate-grid">
{candidate_html}
                  </div>
                </div>
                <div class="palette-token-diff" aria-live="polite">
                  <div><code>--dig-bg</code><span data-palette-token="--dig-bg"></span></div>
                  <div><code>--dig-text</code><span data-palette-token="--dig-text"></span></div>
                  <div><code>--dig-accent</code><span data-palette-token="--dig-accent"></span></div>
                  <div><code>--dig-accent-strong</code><span data-palette-token="--dig-accent-strong"></span></div>
                  <div><code>--dig-accent-2</code><span data-palette-token="--dig-accent-2"></span></div>
                  <div><code>--dig-accent-2-strong</code><span data-palette-token="--dig-accent-2-strong"></span></div>
                </div>
              </div>
            </div>"""

def build_style_lab_section(style_contract="", css_token_block="", dark_token_block=""):
    contract_attr = escape_attr(style_contract)
    token_attr = escape_attr(css_token_block)
    controls = [
        ("canvas", "Canvas", "画布", "--dig-bg"),
        ("surface", "Surface", "面板", "--dig-surface"),
        ("ink", "Ink", "文字", "--dig-text"),
        ("primary", "Primary", "主强调色", "--dig-accent"),
        ("support", "Support", "第二强调色", "--dig-accent-2"),
        ("border", "Border", "边框", "--dig-border"),
    ]
    control_html = "\n".join([
        f'''              <label class="palette-lab-row">
                <span class="palette-lab-role" data-zh="{label_zh}" data-en="{label_en}">{label_zh}</span>
                <span class="palette-lab-token">{token}</span>
                <input class="palette-lab-input" data-style-input="{role}" inputmode="text" maxlength="9" aria-label="{label_en} hex" />
                <input class="palette-lab-color" data-style-color="{role}" type="color" aria-label="{label_en} color picker" />
              </label>'''
        for role, label_en, label_zh, token in controls
    ])
    return f"""
            <section class="surface section style-lab-shell" id="style-lab" data-style-lab data-style-contract="{contract_attr}" data-style-token-block="{token_attr}" data-style-dark-token-block="{escape_attr(dark_token_block)}">
              <div class="style-lab-head">
                <div>
                  <h3 data-zh="Style Lab" data-en="Style Lab">Style Lab</h3>
                  <p data-zh="在当前主题内临时试色，切换 Light / Dark 后可分别调整；导出时两套 token 会一起写入 customstyle。" data-en="Temporarily tune the active theme; switch Light / Dark to adjust each set independently. Export keeps both token sets in one customstyle.">在当前主题内临时试色，切换 Light / Dark 后可分别调整；导出时两套 token 会一起写入 customstyle。</p>
                </div>
                <div class="palette-lab-actions">
                  <button type="button" class="btn btn-secondary palette-copy-btn" data-style-copy data-zh="复制当前主题 Token" data-en="Copy Active Theme Tokens">复制当前主题 Token</button>
                  <button type="button" class="btn style-export-btn" data-style-export data-zh="导出 Style" data-en="Export Style">导出 Style</button>
                </div>
              </div>
              <div class="style-lab-tuner" aria-live="polite">
                <div class="palette-lab-controls">
{control_html}
                </div>
                <div class="palette-token-diff">
                  <div><code>--dig-bg</code><span data-style-token="--dig-bg"></span></div>
                  <div><code>--dig-surface</code><span data-style-token="--dig-surface"></span></div>
                  <div><code>--dig-text</code><span data-style-token="--dig-text"></span></div>
                  <div><code>--dig-accent</code><span data-style-token="--dig-accent"></span></div>
                  <div><code>--dig-accent-2</code><span data-style-token="--dig-accent-2"></span></div>
                  <div><code>--dig-border</code><span data-style-token="--dig-border"></span></div>
                </div>
              </div>
              <div class="style-lab-grid">
                <article>
                  <span data-zh="资产边界" data-en="Asset Boundary">资产边界</span>
                  <strong>customstyle</strong>
                  <p data-zh="导出的 style 属于用户资产，应导入到 ~/.config/dig-ui-skill/styles/，再同步到 references/local/styles/。" data-en="Exported styles belong to the user, imported under ~/.config/dig-ui-skill/styles/ and synced to references/local/styles/.">导出的 style 属于用户资产，应导入到 ~/.config/dig-ui-skill/styles/，再同步到 references/local/styles/。</p>
                </article>
                <article>
                  <span data-zh="包含内容" data-en="Contents">包含内容</span>
                  <strong>contract + tokens</strong>
                  <p data-zh="包含 Style Contract、render archetype、页面元信息和当前 --dig-* token 值。" data-en="Includes Style Contract, render archetype, page metadata, and current --dig-* token values.">包含 Style Contract、render archetype、页面元信息和当前 --dig-* token 值。</p>
                </article>
              </div>
            </section>"""

def bilingual_element(tag, zh, en, attrs=""):
    attr_prefix = f" {attrs.strip()}" if attrs.strip() else ""
    return (
        f'<{tag}{attr_prefix} data-zh="{escape_attr(zh)}" data-en="{escape_attr(en)}">'
        f'{html.escape(zh)}</{tag}>'
    )

def build_archetype_section(archetype, brand_name, palette_candidates=None):
    brand = html.escape(brand_name)
    templates = {
        "strategy-workspace": f"""
          <section class="surface section" id="sample">
            <div class="section-head">{bilingual_element("h3", "策略工作台", "Strategy Workspace")}{bilingual_element("p", "决策、证据、负责人和下次复盘保持在同一稳定层级。", "Decision, evidence, owner, and next review stay in one stable hierarchy.")}</div>
            <div class="mini-grid"><article>{bilingual_element("strong", "建议", "Recommendation")}{bilingual_element("span", "整合激活路径", "Consolidate activation path")}</article><article>{bilingual_element("strong", "置信度", "Confidence")}{bilingual_element("span", "高 · 82%", "High · 82%")}</article><article>{bilingual_element("strong", "复盘", "Review")}{bilingual_element("span", "周五 · 负责人：Maya", "Fri · Owner: Maya")}</article></div>
            <div class="table-card"><table class="token-table"><thead><tr>{bilingual_element("th", "证据", "Evidence")}{bilingual_element("th", "信号", "Signal")}{bilingual_element("th", "决策", "Decision")}</tr></thead><tbody><tr>{bilingual_element("td", "激活分群", "Activation cohort")}{bilingual_element("td", "+18%", "+18%")}{bilingual_element("td", "扩大", "Scale")}</tr><tr>{bilingual_element("td", "支持负荷", "Support load")}{bilingual_element("td", "+6%", "+6%")}{bilingual_element("td", "观察", "Monitor")}</tr></tbody></table></div>
          </section>""",
        "research-workbench": f"""
          <section class="surface section" id="sample">
            <div class="section-head">{bilingual_element("h3", "研究工作台", "Research Workbench")}{bilingual_element("p", "观察证据、方法与解释彼此独立且可追溯。", "Observed evidence, method, and interpretation remain distinct and traceable.")}</div>
            <div class="type-grid"><article class="type-card">{bilingual_element("strong", "样本 A-17", "Specimen A-17")}<div class="type-showcase type-hero">0.82</div>{bilingual_element("div", "置信度 / 124 个样本", "confidence / 124 samples", 'class="meta-small mono"')}</article><article class="type-card">{bilingual_element("strong", "方法记录", "Method note")}{bilingual_element("div", "将选定结构与基线比较，并保留单位、来源和限制条件。", "Compare the selected structure against the baseline and retain units, source, and caveat.", 'class="type-showcase type-body"')}</article></div>
          </section>""",
        "builder-journey": f"""
          <section class="surface section" id="sample">
            <div class="section-head">{bilingual_element("h3", "搭建旅程", "Build Journey")}{bilingual_element("p", "可见的组装路径展示已完成、下一步解锁项及其负责人。", "A visible assembly path shows what is done, what unlocks next, and who owns it.")}</div>
            <div class="mini-grid"><article>{bilingual_element("strong", "01 · 选择套件", "01 · Pick kit")}{bilingual_element("span", "已完成", "Complete")}</article><article>{bilingual_element("strong", "02 · 连接模块", "02 · Connect modules")}{bilingual_element("span", "进行中", "In progress")}</article><article>{bilingual_element("strong", "03 · 分享成果", "03 · Share build")}{bilingual_element("span", "下一步解锁", "Unlocked next")}</article></div>
          </section>""",
        "editorial-story": f"""
          <section class="surface section" id="sample">
            <div class="section-head">{bilingual_element("h3", "社论叙事", "Editorial Story")}{bilingual_element("p", "一个主张、一个支撑信号和一个行动共同建立阅读路径。", "One proposition, one supporting signal, and one action establish the reading path.")}</div>
            <div class="type-grid"><article class="type-card">{bilingual_element("strong", "信号", "Signal")}{bilingual_element("div", "让下一步行动清晰可见。", "Make the next move visible.", 'class="type-showcase type-statement"')}</article><article class="type-card">{bilingual_element("strong", "上下文", "Context")}{bilingual_element("div", "紧凑的支撑框架为主张提供证据，而不是把页面堆成卡片墙。", "A compact supporting frame gives the claim evidence without turning the page into a card wall.", 'class="type-showcase type-body"')}</article></div>
          </section>""",
        "command-palette-marketing": f"""
          <section class="surface section archetype-section command-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="命令面板样张" data-en="Command Palette Sample">命令面板样张</h3>
              <p data-zh="展示开发工具 catalog 的快捷入口、扩展卡片和键盘优先体验。" data-en="Shows shortcut-driven entry points, extension cards, and keyboard-first product chrome.">展示开发工具 catalog 的快捷入口、扩展卡片和键盘优先体验。</p>
            </div>
            <div class="command-shell">
              <div class="command-search"><span>⌘ K</span><strong>{brand} Command Center</strong><em>Search actions, extensions, and docs</em></div>
              <div class="command-list">
                <div class="command-row active"><strong>Open AI Chat</strong><span>⌘ ⇧ A</span></div>
                <div class="command-row"><strong>Install Extension</strong><span>⌘ E</span></div>
                <div class="command-row"><strong>Run Workflow</strong><span>⌘ R</span></div>
              </div>
              <div class="mini-grid">
                <article><strong>Store</strong><span>842 extensions</span></article>
                <article><strong>Automation</strong><span>12 active flows</span></article>
                <article><strong>Focus</strong><span>3 pinned commands</span></article>
              </div>
            </div>
          </section>""",
        "media-player-shell": f"""
          <section class="surface section archetype-section media-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="媒体应用样张" data-en="Media App Sample">媒体应用样张</h3>
              <p data-zh="用侧栏、播放上下文、曲目列表和底部控制条验证沉浸式媒体应用 UI。" data-en="Uses sidebar, playback context, track list, and player controls to validate immersive media app UI.">用侧栏、播放上下文、曲目列表和底部控制条验证沉浸式媒体应用 UI。</p>
            </div>
            <div class="media-shell">
              <aside class="media-nav"><strong>{brand}</strong><span class="active">Home</span><span>Search</span><span>Your Library</span><span>Made for you</span></aside>
              <div class="media-main">
                <div class="media-hero-card">
                  <div class="album-art art-1"><span></span></div>
                  <div>
                    <span class="media-kicker">Playlist</span>
                    <h4>Midnight Signal</h4>
                    <p>Daily Mix · 42 songs · Updated today</p>
                    <button class="play-btn">▶</button>
                  </div>
                </div>
                <div class="track-list">
                  <div class="track-row active"><span>01</span><strong>Green Room</strong><em>Editorial Pick</em><b>3:18</b></div>
                  <div class="track-row"><span>02</span><strong>Soft Circuit</strong><em>Focus Radio</em><b>4:02</b></div>
                  <div class="track-row"><span>03</span><strong>Midnight Signal</strong><em>Daily Mix</em><b>2:47</b></div>
                </div>
              </div>
              <aside class="media-queue">
                <strong>Queue</strong>
                <div><span>Up next</span><b>Soft Circuit</b></div>
                <div><span>Device</span><b>Studio Display</b></div>
              </aside>
              <footer class="player-bar"><button class="play-btn">▶</button><strong>Now Playing</strong><span>03:18 / 04:42</span><div class="progress"><i></i></div></footer>
            </div>
          </section>""",
        "creative-canvas-workspace": f"""
          <section class="surface section archetype-section canvas-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="创作画布样张" data-en="Creative Canvas Sample">创作画布样张</h3>
              <p data-zh="展示工具栏、图层、画布对象和多人协作状态。" data-en="Shows toolbar, layers, canvas objects, and collaborative presence.">展示工具栏、图层、画布对象和多人协作状态。</p>
            </div>
            <div class="canvas-shell">
              <div class="tool-strip"><span>Move</span><span>Frame</span><span>Pen</span><span>Comment</span></div>
              <div class="canvas-board">
                <article class="artboard"><strong>{brand} Workspace</strong><p>Component set · Variant preview</p></article>
                <article class="floating-node">Prototype</article>
              </div>
              <aside><strong>Layers</strong><span>Hero frame</span><span>Button / Primary</span><span>Token swatches</span></aside>
            </div>
          </section>""",
        "commerce-dual-track": f"""
          <section class="surface section archetype-section commerce-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="商业双轨样张" data-en="Commerce Dual-Track Sample">商业双轨样张</h3>
              <p data-zh="同时验证营销首屏和交易卡片，避免只看到 token 表。" data-en="Validates both marketing presence and transactional cards beyond the token sheet.">同时验证营销首屏和交易卡片，避免只看到 token 表。</p>
            </div>
            <div class="commerce-shell">
              <article class="commerce-hero"><span>{brand}</span><strong>Sell everywhere with a calmer storefront.</strong><button class="btn btn-primary">Start free</button></article>
              <article class="checkout-card"><strong>Growth plan</strong><div class="price">$29</div><span>Inventory, checkout, analytics</span><button class="btn btn-secondary">Compare plans</button></article>
            </div>
          </section>""",
        "inbox-productivity": f"""
          <section class="surface section archetype-section inbox-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="收件箱效率样张" data-en="Inbox Productivity Sample">收件箱效率样张</h3>
              <p data-zh="展示高频列表、阅读面板和快捷动作的密度关系。" data-en="Shows density relationships across lists, reading panes, and quick actions.">展示高频列表、阅读面板和快捷动作的密度关系。</p>
            </div>
            <div class="inbox-shell">
              <div class="inbox-list">
                <article class="active"><strong>Launch review</strong><span>Design system notes · 8m</span></article>
                <article><strong>Team digest</strong><span>5 updates · 24m</span></article>
                <article><strong>Follow up</strong><span>Customer thread · 1h</span></article>
              </div>
              <div class="inbox-detail"><span>{brand}</span><h4>Make repeated work feel lighter.</h4><p>Fast triage, crisp hierarchy, and calm controls share one surface vocabulary.</p><button class="btn btn-primary">Archive</button></div>
            </div>
          </section>""",
        "finance-mobile-app": f"""
          <section class="surface section archetype-section finance-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="金融移动样张" data-en="Finance App Sample">金融移动样张</h3>
              <p data-zh="验证余额、转账、汇率和卡片控制在移动优先界面中的表现。" data-en="Validates balance, transfer, rate, and card controls in a mobile-first interface.">验证余额、转账、汇率和卡片控制在移动优先界面中的表现。</p>
            </div>
            <div class="finance-shell">
              <article class="phone-card"><span>{brand} Balance</span><strong>$12,480.20</strong><button class="btn btn-primary">Send money</button></article>
              <div class="rate-grid"><article><strong>USD → EUR</strong><span>0.9234</span></article><article><strong>Card</strong><span>Active</span></article></div>
            </div>
          </section>""",
        "site-palette-showcase": f"""
          <section class="surface section archetype-section palette-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="整站配色样张" data-en="Site Palette Sample">整站配色样张</h3>
              <p data-zh="展示 palette 的背景、文字、CTA、卡片、链接和辅助强调如何落到真实网站结构里。" data-en="Shows how page background, text, CTA, cards, links, and support accents land in a real site structure.">展示 palette 的背景、文字、CTA、卡片、链接和辅助强调如何落到真实网站结构里。</p>
            </div>
{build_palette_lab_section(palette_candidates)}
            <div class="commerce-shell palette-shell">
              <article class="commerce-hero">
                <span>{brand}</span>
                <strong>Build a calm product surface from four color anchors.</strong>
                <button class="btn btn-primary">Primary action</button>
              </article>
              <article class="checkout-card">
                <strong>Role mapping</strong>
                <span>Canvas, ink, primary, and support expand into semantic Dig tokens.</span>
                <button class="btn btn-secondary">Secondary action</button>
              </article>
            </div>
          </section>""",
        "mobile-game-companion": f"""
          <section class="surface section archetype-section mobile-game-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="游戏化移动样张" data-en="Gamified Mobile Sample">游戏化移动样张</h3>
              <p data-zh="展示吉祥物舞台、任务卡、装备选择、奖励芯片和底部主动作。" data-en="Shows mascot stage, mission cards, gear selection, reward chips, and a dominant bottom action.">展示吉祥物舞台、任务卡、装备选择、奖励芯片和底部主动作。</p>
            </div>
            <div class="game-phone">
              <div class="game-sky">
                <div class="game-cloud cloud-a"></div>
                <div class="game-cloud cloud-b"></div>
                <div class="game-hills"></div>
                <div class="game-status">
                  <span>J · LV 1</span>
                  <span>58%</span>
                </div>
                <div class="speech-bubble">Let's hit 1,200 today!</div>
                <div class="mascot">
                  <span class="mascot-ear left"></span>
                  <span class="mascot-ear right"></span>
                  <span class="mascot-face"></span>
                  <span class="mascot-belly"></span>
                </div>
              </div>
              <div class="game-panel-stack">
                <article class="mission-card">
                  <span class="mini-label">TODAY'S PICK</span>
                  <strong>Build on it</strong>
                  <p>You've been averaging 3 minutes. Nudge it to 3 today.</p>
                  <b>STEADY</b>
                </article>
                <article class="coach-card">
                  <span class="mini-label">AI COACH</span>
                  <strong>DoubleUnder Boost</strong>
                  <p>Mastery awaits. Four focused blocks are ready.</p>
                  <div class="reward-row"><span>10 min</span><span>4 blocks</span><span>Pet x1.5</span></div>
                  <button class="game-secondary">See plan</button>
                  <button class="game-start">Start</button>
                </article>
                <article class="gear-card selected">
                  <div class="gear-icon" aria-hidden="true"></div>
                  <div><strong>Wrist Sensor</strong><p>Accurate motion tracking</p></div>
                  <span class="gear-check" aria-hidden="true"></span>
                </article>
                <button class="game-primary">Start jumping</button>
              </div>
            </div>
          </section>""",
        "signal-ops-console": f"""
          <section class="surface section archetype-section signal-ops-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="信号控制台样张" data-en="Signal Ops Console Sample">信号控制台样张</h3>
              <p data-zh="展示 paper-light 与 terminal-dark 两种主题下的实时指标、agent pipeline、拓扑图、盘口和微型图表。" data-en="Shows realtime metrics, agent pipelines, topology, order books, and micro charts across paper-light and terminal-dark modes.">展示 paper-light 与 terminal-dark 两种主题下的实时指标、agent pipeline、拓扑图、盘口和微型图表。</p>
            </div>
            <div class="signal-dual-shell">
              <article class="signal-console signal-paper">
                <header class="signal-topbar">
                  <strong>{brand} Signal Desk</strong>
                  <span>LIVE · UTC 20:01:41 · CONF 97.4%</span>
                </header>
                <div class="signal-tape">
                  <span>WALLET 0x9f...1b7</span>
                  <span>ALL-TIME PNL <b class="pos">+$369,000</b></span>
                  <span>WIN RATE <b class="pos">78%</b></span>
                  <span>EDGE <b class="warn">+38</b></span>
                </div>
                <div class="signal-main-grid">
                  <section class="signal-hero-metric">
                    <span>REALIZED PNL · LIVE</span>
                    <strong>381,328</strong>
                    <p><b class="pos">+20 054</b> today · 84 days · +$1.60/sec live</p>
                  </section>
                  <section class="signal-card">
                    <span>LIVE SIGNAL</span>
                    <strong>BTC T DOWN</strong>
                    <p>confidence 94.7% · edge +24</p>
                    <button>Short BTC</button>
                  </section>
                  <section class="signal-pipeline">
                    <div class="done"><b>01</b><span>Scan</span></div>
                    <div class="done"><b>02</b><span>Signal</span></div>
                    <div class="active"><b>03</b><span>Predict</span></div>
                    <div><b>04</b><span>Execute</span></div>
                  </section>
                  <section class="signal-topology" aria-label="relationship graph simulation">
                    <header><span>RELATIONSHIP GRAPH · BTC T+24H</span><b>nodes 69 · edge 125</b></header>
                    <svg class="topology-map" viewBox="0 0 520 210" role="img" aria-label="Signal relationship graph with labeled clusters">
                      <defs>
                        <linearGradient id="topologyPath" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stop-color="var(--dig-signal-positive, #4bd8a0)" stop-opacity="0.36" />
                          <stop offset="50%" stop-color="var(--dig-signal-info, #4aa3ff)" stop-opacity="0.24" />
                          <stop offset="100%" stop-color="var(--dig-signal-negative, #ff5268)" stop-opacity="0.34" />
                        </linearGradient>
                      </defs>
                      <path class="range" d="M28 126 C86 70 146 92 196 116 S304 158 368 112 444 64 496 92" />
                      <path class="edge" d="M54 130 L126 96 L204 126 L276 78 L354 118 L444 72" />
                      <path class="edge weak" d="M126 96 L218 52 L318 96 L432 150" />
                      <path class="edge weak" d="M204 126 L282 164 L354 118" />
                      <g class="node-group bull">
                        <circle cx="54" cy="130" r="12" />
                        <text x="72" y="134">BULL</text>
                      </g>
                      <g class="node-group">
                        <circle cx="126" cy="96" r="7" />
                        <text x="137" y="88">BAYES</text>
                      </g>
                      <g class="node-group active">
                        <circle cx="204" cy="126" r="17" />
                        <text x="177" y="158">MISPRICE</text>
                      </g>
                      <g class="node-group">
                        <circle cx="276" cy="78" r="8" />
                        <text x="288" y="74">ANCHOR</text>
                      </g>
                      <g class="node-group risk">
                        <circle cx="354" cy="118" r="11" />
                        <text x="370" y="122">BEAR</text>
                      </g>
                      <g class="node-group active">
                        <circle cx="444" cy="72" r="14" />
                        <text x="462" y="76">EDGE</text>
                      </g>
                      <circle class="speck pos" cx="92" cy="158" r="3" />
                      <circle class="speck neg" cx="244" cy="44" r="4" />
                      <circle class="speck warn" cx="318" cy="154" r="5" />
                      <circle class="speck pos" cx="478" cy="132" r="3" />
                    </svg>
                    <footer><span><i class="dot pos"></i>bull path</span><span><i class="dot neg"></i>bear signal</span><span><i class="dot warn"></i>cluster hub</span></footer>
                  </section>
                  <section class="signal-book">
                    <div><span>ASK</span><b class="neg">0.4590</b><em style="--depth:76%"></em></div>
                    <div><span>ASK</span><b class="neg">0.4570</b><em style="--depth:42%"></em></div>
                    <div><span>BID</span><b class="pos">0.4555</b><em style="--depth:68%"></em></div>
                    <div><span>BID</span><b class="pos">0.4530</b><em style="--depth:38%"></em></div>
                  </section>
                  <section class="signal-chart" aria-label="edge distribution">
                    <header><span>EDGE DISTRIBUTION · 24H</span><b>+38 avg</b></header>
                    <div class="distribution-plot">
                      <i style="--h:26%; --tone:bid"><span>+12</span></i>
                      <i style="--h:54%; --tone:bid"><span>+21</span></i>
                      <i style="--h:36%; --tone:bid"><span>+18</span></i>
                      <i style="--h:72%; --tone:bid"><span>+42</span></i>
                      <i style="--h:62%; --tone:bid"><span>+38</span></i>
                      <i style="--h:86%; --tone:edge"><span>+76</span></i>
                    </div>
                    <div class="distribution-axis"><span>min +12</span><span>median +31</span><span>max +76</span></div>
                  </section>
                </div>
              </article>
              <article class="signal-console signal-terminal">
                <header class="signal-topbar">
                  <strong>Paper Trading</strong>
                  <span>CONNECTED · 4:08 REMAINING</span>
                </header>
                <div class="signal-tape">
                  <span>BAL $724.56</span>
                  <span>EQUITY $997.31</span>
                  <span>UNREALIZED <b class="neg">-2.69</b></span>
                  <span>RETURN <b class="neg">-0.27%</b></span>
                </div>
                <div class="signal-dark-grid">
                  <section class="signal-order-form">
                    <strong>Place Order</strong>
                    <div class="seg"><button class="active">Up</button><button>Down</button></div>
                    <div class="seg"><button class="active">Buy</button><button>Sell</button></div>
                    <input value="100" aria-label="shares" readonly>
                    <button class="submit">Buy Up</button>
                  </section>
                  <section class="signal-ladder" aria-label="bid ask ladder">
                    <header><span>MARKET</span><span>BID</span><span>ASK</span><span>SPREAD</span></header>
                    <div><b>UP</b><span class="pos">0.5409</span><span>0.5456</span><small>0.0090</small></div>
                    <div><b>DOWN</b><span class="neg">0.4590</span><span>0.4545</span><small>0.0078</small></div>
                    <div><b>LAST TRADE</b><span class="pos">BUY 500</span><span>@ 0.5509</span><small>filled</small></div>
                  </section>
                  <section class="signal-terminal-chart" aria-label="liquidity depth">
                    <header><span>LIQUIDITY DEPTH</span><b>$27.7K</b></header>
                    <div class="depth-plot">
                      <i style="--h:22%; --side:bid"><span>0.52</span></i>
                      <i style="--h:48%; --side:bid"><span>0.53</span></i>
                      <i style="--h:34%; --side:ask"><span>0.54</span></i>
                      <i style="--h:72%; --side:bid"><span>0.55</span></i>
                      <i style="--h:58%; --side:bid"><span>0.56</span></i>
                      <i style="--h:86%; --side:bid"><span>0.57</span></i>
                      <i style="--h:42%; --side:ask"><span>0.58</span></i>
                    </div>
                    <div class="depth-axis"><span>bid depth</span><span>mid 0.5455</span><span>ask wall</span></div>
                  </section>
                </div>
              </article>
            </div>
          </section>""",
    }
    return templates.get(archetype, f"""
          <section class="surface section archetype-section token-preview" id="sample">
            <div class="section-head">
              <h3 data-zh="Catalog 样张" data-en="Catalog Sample">Catalog 样张</h3>
              <p data-zh="当前 catalog 尚未声明专属 render intent，因此使用通用 token 样张。" data-en="This catalog has not declared a dedicated render intent yet, so it uses the generic token sample.">当前 catalog 尚未声明专属 render intent，因此使用通用 token 样张。</p>
            </div>
            <div class="type-grid">
              <article class="type-card"><strong>Hero Title</strong><div class="type-showcase type-hero">{brand}</div><div class="meta-small mono">var(--dig-text-5xl)</div></article>
              <article class="type-card"><strong>Body</strong><div class="type-showcase type-body">Tokenized typography, color, radius, and elevation should remain coherent across reusable components.</div><div class="meta-small mono">var(--dig-text-md)</div></article>
            </div>
          </section>""")

def build_page_grid(archetype, brand_name, palette_candidates=None, category_slug="", style_contract="", css_token_block="", dark_token_block=""):
    palette_lab_link = ""
    if archetype == "site-palette-showcase":
        palette_lab_link = '            <a href="#palette-lab" data-zh="试色" data-en="Palette Lab">试色</a>\n'
    style_lab_link = ""
    style_lab_section = ""
    if category_slug == "styles":
        style_lab_link = '            <a href="#style-lab" data-zh="Style Lab" data-en="Style Lab">Style Lab</a>\n'
        style_lab_section = build_style_lab_section(style_contract, css_token_block, dark_token_block)
    brand_lab_link = ""
    brand_lab_section = ""
    if category_slug not in {"styles", "palettes"}:
        brand_lab_link = '            <a href="#brand-lab" data-zh="品牌试色" data-en="Brand Lab">品牌试色</a>\n'
        brand_lab_section = build_palette_lab_section(
            palette_candidates,
            lab_id="brand-lab",
            title_zh="Brand Lab",
            title_en="Brand Lab",
            description_zh="临时调整当前品牌 preview 的核心颜色角色；导出为可复用的 custompalette 用户资产。",
            description_en="Temporarily tune this brand preview's core color roles, then export a reusable custompalette user asset.",
        )
    return f"""
      <div class="page-grid">
        <aside class="surface side-rail">
          <h2 data-zh="目录" data-en="Contents">目录</h2>
          <nav class="nav-list">
            <a href="#sample" data-zh="风格样张" data-en="Style Sample">风格样张</a>
{palette_lab_link}{style_lab_link}{brand_lab_link}            <a href="#colors" data-zh="颜色" data-en="Colors">颜色</a>
            <a href="#tokens" data-zh="关键 Token" data-en="Key Tokens">关键 Token</a>
          </nav>
        </aside>

        <div class="content">
{build_archetype_section(archetype, brand_name, palette_candidates)}
{style_lab_section}
{brand_lab_section}
{build_color_section()}
{build_token_section()}
        </div>
      </div>"""

def build_hero_side():
    return """
        <aside class="surface surface-strong hero-side">
          <div class="hero-meta">
            <div class="meta-row"><span>Accent</span><span class="token-val" data-token="--dig-accent">--dig-accent</span></div>
            <div class="meta-row"><span>Support</span><span class="token-val" data-token="--dig-accent-2">--dig-accent-2</span></div>
            <div class="meta-row"><span>Body</span><span><span class="token-val" data-token="--dig-text-md">--dig-text-md</span> / <span class="token-val" data-token="--dig-leading-normal">--dig-leading-normal</span></span></div>
            <div class="meta-row"><span>Title</span><span><span class="token-val" data-token="--dig-text-5xl">--dig-text-5xl</span> / <span class="token-val" data-token="--dig-leading-tight">--dig-leading-tight</span></span></div>
          </div>
        </aside>"""

def initial_catalog_data():
    return {
        "ai-llm": {"name": "AI & LLM Platforms", "brands": []},
        "dev-tools": {"name": "Developer Tools & IDEs", "brands": []},
        "devops": {"name": "Backend, Database & DevOps", "brands": []},
        "saas": {"name": "Productivity & SaaS", "brands": []},
        "creative-tools": {"name": "Design & Creative Tools", "brands": []},
        "fintech": {"name": "Fintech & Crypto", "brands": []},
        "ecommerce": {"name": "E-commerce & Retail", "brands": []},
        "media-consumer": {"name": "Media & Consumer Tech", "brands": []},
        "automotive": {"name": "Automotive", "brands": []},
        "other": {"name": "General / Core Layouts", "brands": []},
        "palettes": {"name": "Color Palettes", "items": [], "brands": []},
        "styles": {"name": "Style Catalogs", "items": [], "brands": []}
    }

def catalog_entries_for_group(group):
    if isinstance(group.get("items"), list):
        return group["items"]
    if isinstance(group.get("brands"), list):
        return group["brands"]
    return []

def upsert_catalog_entry(group, entry, use_items=False):
    key = "items" if use_items else "brands"
    group.setdefault(key, [])
    entries = group[key]
    for index, existing in enumerate(entries):
        if existing.get("slug") == entry.get("slug"):
            entries[index] = entry
            break
    else:
        entries.append(entry)

def ensure_catalog_groups(registry):
    baseline = initial_catalog_data()
    for category, baseline_group in baseline.items():
        registry.setdefault(category, {"name": baseline_group["name"]})
        registry[category].setdefault("name", baseline_group["name"])
        if "brands" in baseline_group:
            registry[category].setdefault("brands", [])
        if "items" in baseline_group:
            registry[category].setdefault("items", [])
    return registry

def parse_existing_catalog_data(index_content):
    match = re.search(r'const catalogData = (\{.*?\});\s*(?:function getCatalogItems|// Compute)', index_content, re.DOTALL)
    if not match:
        raise ValueError("Cannot find parseable catalogData block in renders/index.html")
    return json.loads(match.group(1))

def merge_catalog_data(existing_registry, update_registry):
    merged = ensure_catalog_groups(existing_registry)
    for category, update_group in update_registry.items():
        if category not in merged:
            merged[category] = {"name": update_group.get("name", category), "brands": []}
        merged[category]["name"] = update_group.get("name", merged[category].get("name", category))
        if category in ["palettes", "styles"]:
            merged[category].setdefault("items", [])
            merged[category].setdefault("brands", [])
            for entry in catalog_entries_for_group(update_group):
                upsert_catalog_entry(merged[category], entry, use_items=True)
                upsert_catalog_entry(merged[category], entry.copy(), use_items=False)
        else:
            for entry in catalog_entries_for_group(update_group):
                upsert_catalog_entry(merged[category], entry, use_items=False)
    return merged

def write_catalog_registry(index_html_file, catalog_data, target_catalog=None):
    if not os.path.exists(index_html_file):
        return

    with open(index_html_file, "r", encoding="utf-8") as f:
        index_content = f.read()

    registry_data = catalog_data
    if target_catalog:
        try:
            existing_registry = parse_existing_catalog_data(index_content)
        except (ValueError, json.JSONDecodeError) as error:
            print(f"❌ Error: {error}")
            sys.exit(1)
        registry_data = merge_catalog_data(existing_registry, catalog_data)

    catalog_json = json.dumps(registry_data, ensure_ascii=False)
    index_content_updated, replace_count = re.subn(
        r'const catalogData = \{.*?\};',
        f'const catalogData = {catalog_json};',
        index_content,
        flags=re.DOTALL
    )
    if replace_count != 1:
        print("❌ Error: Expected exactly one catalogData block in renders/index.html")
        sys.exit(1)

    with open(index_html_file, "w", encoding="utf-8") as f:
        f.write(index_content_updated)

def main():
    target_catalog = sys.argv[1] if len(sys.argv) > 1 else None

    # Find markdown files
    md_files = []
    if target_catalog:
        target_slug = target_catalog.replace(".md", "")
        # Recursively search for target slug
        for root, dirs, files in os.walk(CATALOG_DIR):
            for file in files:
                if is_canonical_catalog_markdown(file) and file[:-3] == target_slug:
                    md_files.append(os.path.join(root, file))
        if not md_files:
            print(f"❌ Error: Cannot find catalogs file for '{target_catalog}'")
            sys.exit(1)
        print(f"🎯 Target set to: {target_slug}")
    else:
        for root, dirs, files in os.walk(CATALOG_DIR):
            for file in files:
                if is_canonical_catalog_markdown(file):
                    md_files.append(os.path.join(root, file))

    print(f"🔄 Starting compilation & synchronization of {len(md_files)} catalogs...")

    # Data registry for updating index.html catalogData
    catalog_data = initial_catalog_data()

    for md_file in md_files:
        rel_path = os.path.relpath(md_file, CATALOG_DIR)
        category_slug = os.path.dirname(rel_path)
        brand_slug = os.path.basename(md_file)[:-3]

        # HTML preview path matching category hierarchy
        html_file = os.path.join(RENDER_DIR, rel_path[:-3] + ".html")

        # Load and validate source identity before creating or mutating render files.
        with open(md_file, "r", encoding="utf-8") as f:
            md_content = f.read()
        validate_palette_contract(md_content, category_slug, brand_slug, rel_path)

        # Scaffolding: if HTML doesn't exist, clone it
        if not os.path.exists(html_file):
            print(f"🆕 Brand new catalog found ({brand_slug}), generating HTML preview...")
            os.makedirs(os.path.dirname(html_file), exist_ok=True)

            # Prefer other/dig.html as baseline
            template_path = os.path.join(RENDER_DIR, "other", "dig.html")
            if not os.path.exists(template_path):
                # Fallback to any HTML
                html_candidates = []
                for r, d, fs in os.walk(RENDER_DIR):
                    for f in fs:
                        if f.endswith(".html") and f not in ["index.html", "README.html"]:
                            html_candidates.append(os.path.join(r, f))
                if html_candidates:
                    template_path = html_candidates[0]
                else:
                    template_path = None

            if template_path and os.path.exists(template_path):
                with open(template_path, "r", encoding="utf-8") as tf:
                    t_content = tf.read()
                with open(html_file, "w", encoding="utf-8") as hf:
                    hf.write(t_content)
            else:
                print(f"⚠️ Warning: No HTML templates found. Skipping {brand_slug}.")
                continue

        # 1. Extract metadata from Frontmatter
        brand_name = brand_slug.capitalize()
        name_match = re.search(r'name:\s*(.+)', md_content)
        if name_match:
            brand_name = name_match.group(1).strip().strip('"\'')

        brand_name_zh = ""
        name_zh_match = re.search(r'name_zh:\s*(.+)', md_content)
        if name_zh_match:
            brand_name_zh = name_zh_match.group(1).strip().strip('"\'')

        brand_name_en = ""
        name_en_match = re.search(r'name_en:\s*(.+)', md_content)
        if name_en_match:
            brand_name_en = name_en_match.group(1).strip().strip('"\'')

        if not brand_name_zh:
            brand_name_zh = brand_name
        if not brand_name_en:
            brand_name_en = brand_name
        render_archetype = parse_render_intent(md_content, category_slug, brand_slug)
        palette_candidates = parse_palette_support_candidates(md_content) if category_slug == "palettes" else None

        # Parse bilingual descriptions
        description_zh = ""
        desc_zh_match = re.search(r'description_zh:\s*["\'|]?\s*(.*?)(?:\n\n|\n[a-zA-Z0-9_-]+:|\n---|\n##)', md_content, re.DOTALL)
        if desc_zh_match:
            description_zh = clean_description(desc_zh_match.group(1))

        description_en = ""
        desc_en_match = re.search(r'description_en:\s*["\'|]?\s*(.*?)(?:\n\n|\n[a-zA-Z0-9_-]+:|\n---|\n##)', md_content, re.DOTALL)
        if desc_en_match:
            description_en = clean_description(desc_en_match.group(1))

        # Check and auto-translate descriptions if one side is missing
        if description_en and not description_zh:
            print(f"🌐 Translating description_en to Chinese for '{brand_slug}'...")
            description_zh = google_translate(description_en, target_lang='zh-CN')
        elif description_zh and not description_en:
            print(f"🌐 Translating description_zh to English for '{brand_slug}'...")
            description_en = google_translate(description_zh, target_lang='en')
        elif not description_zh and not description_en:
            # Fallback to standard description field or Overview section
            description = ""
            desc_match = re.search(r'description:\s*["\'|]?\s*(.*?)(?:\n\n|\n[a-zA-Z0-9_-]+:|\n---|\n##)', md_content, re.DOTALL)
            if desc_match:
                description = clean_description(desc_match.group(1))
            if not description:
                overview_match = re.search(r'## Overview\s*\n\n(.*?)(?:\n\n|\n##|\n---)', md_content, re.DOTALL)
                if overview_match:
                    description = clean_description(overview_match.group(1))
            if not description:
                description = f"Standard {brand_name} design system catalog featuring specialized components and typography schemas."

            # Detect if standard description is Chinese or English
            is_chinese = bool(re.search(r'[\u4e00-\u9fff]', description))
            if is_chinese:
                description_zh = description
                print(f"🌐 Translating base Chinese description to English for '{brand_slug}'...")
                description_en = google_translate(description_zh, target_lang='en')
            else:
                description_en = description
                print(f"🌐 Translating base English description to Chinese for '{brand_slug}'...")
                description_zh = google_translate(description_en, target_lang='zh-CN')

        # 2. Extract CSS tokens
        tokens_block = []
        css_block_match = re.search(r'## Dig UI CSS Tokens\s*\n\n```css\s*\n(.*?)\n```', md_content, re.DOTALL)
        if css_block_match:
            tokens_raw = css_block_match.group(1).strip()
            for line in tokens_raw.split("\n"):
                clean_line = line.strip()
                if clean_line.startswith("--dig-"):
                    tokens_block.append("        " + clean_line)
        else:
            for line in md_content.split("\n"):
                if line.strip().startswith("--dig-"):
                    tokens_block.append("        " + line.strip())

        if not tokens_block:
            print(f"⚠️ Warning: No CSS tokens block found in {brand_slug}.md, skipping token replacement.")
            continue

        tokens_str = "\n".join(tokens_block)

        # Extract accent and bg color tokens for index.html registry
        accent_match = re.search(r'--dig-accent:\s*([^;]+);', md_content)
        accent_color = accent_match.group(1).strip() if accent_match else "#37d67a"
        bg_match = re.search(r'--dig-bg:\s*([^;]+);', md_content)
        bg_color = bg_match.group(1).strip() if bg_match else "#f5f5f5"

        # Register catalog item in catalog data.
        # Palette and style catalogs use "items" as the source of truth and keep
        # "brands" only as a legacy fallback for older render hubs.
        keywords_zh = description_to_sentences(description_zh)
        keywords_en = description_to_sentences(description_en)
        if category_slug in catalog_data:
            catalog_entry = {
                "slug": brand_slug,
                "name": brand_name,
                "name_zh": brand_name_zh,
                "name_en": brand_name_en,
                "accent": accent_color,
                "bg": bg_color,
                "keywords_zh": keywords_zh,
                "keywords_en": keywords_en,
                "link": f"./{category_slug}/{brand_slug}.html"
            }
            if category_slug in ["palettes", "styles"]:
                catalog_data[category_slug]["items"].append(catalog_entry)
                catalog_data[category_slug]["brands"].append(catalog_entry.copy())
            else:
                catalog_data[category_slug]["brands"].append(catalog_entry)

        # 3. Read and upgrade HTML content
        with open(html_file, "r", encoding="utf-8") as f:
            html_content = f.read()
        if category_slug == "styles":
            html_content = strip_legacy_inline_preview_overrides(html_content)
            html_content = re.sub(
                r'\n\s*html\[data-style-theme="dark"\]\s*\{[\s\S]*?\n\s*\}',
                "",
                html_content,
            )
        style_contract_block = extract_fenced_code_block_from_section(md_content, "Style Contract", "yaml") if category_slug == "styles" else ""
        style_token_block = extract_fenced_code_block_from_section(md_content, "Dig UI CSS Tokens", "css") if category_slug == "styles" else ""
        style_dark_token_block = extract_fenced_code_block_from_section(md_content, "Dig UI Dark Tokens", "css") if category_slug == "styles" else ""

        # Parse color-scheme from render intent and tokens. Style catalogs may be
        # theme-dual even when their base token canvas is light.
        color_scheme = "color-scheme: dark;"
        cs_match = re.search(r'color-scheme:\s*[a-zA-Z ]+;', html_content)
        render_canvas = parse_render_setting(md_content, "canvas")
        inferred_light_scheme = (
            "light" in brand_slug.lower()
            or "canvas: \"#fff" in md_content.lower()
            or "--dig-bg: #fff" in md_content.lower()
            or is_light_color(bg_color)
        )
        if render_canvas == "theme-dual":
            color_scheme = "color-scheme: light dark;"
        elif inferred_light_scheme:
            color_scheme = "color-scheme: light;"
        elif cs_match:
            color_scheme = cs_match.group(0)

        # Style previews own a real two-mode token layer. The base :root block is
        # light; the dark block is activated by html[data-style-theme="dark"]
        # without changing DOM structure or component semantics.
        style_theme_css = ""
        if category_slug == "styles" and style_dark_token_block:
            style_theme_css = f'''\n      html[data-style-theme="dark"] {{
        color-scheme: dark;
        {style_dark_token_block}
      }}'''

        # Update root variables block using regex
        root_pattern = r'(:root\s*\{)[^}]*(\})'
        root_replace = f"\\1\n        {color_scheme}\n{tokens_str}\n    \\2{style_theme_css}"
        html_content = re.sub(root_pattern, root_replace, html_content)

        # Update title tag
        html_content = re.sub(r'<title>.*?</title>', f'<title>Dig UI {html.escape(brand_name_en)} Render</title>', html_content)

        # Update eyebrow tag
        html_content = re.sub(
            r'<span class="eyebrow">.*?Catalog / Dig UI</span>',
            f'<span class="eyebrow"><span class="brand-name-label" data-zh="{escape_attr(brand_name_zh)}" data-en="{escape_attr(brand_name_en)}">{html.escape(brand_name_zh)}</span> Catalog / Dig UI</span>',
            html_content
        )

        # Update H1 headline
        html_content = re.sub(
            r'<h1(?:\s+[^>]*)?>.*?</h1>',
            f'<h1 class="brand-title-h1" data-zh="{escape_attr(brand_name_zh)}" data-en="{escape_attr(brand_name_en)}">{html.escape(brand_name_zh)}</h1>',
            html_content,
            count=1,
            flags=re.DOTALL
        )

        # Update description <p> (supports data-zh and data-en translation attributes)
        html_content = re.sub(
            r'</h1>\s*<p class="brand-description-p"[^>]*>.*?</p>',
            f'</h1>\n          <p class="brand-description-p" data-zh="{escape_attr(description_zh)}" data-en="{escape_attr(description_en)}">{html.escape(description_zh)}</p>',
            html_content
        )
        html_content = re.sub(
            r'</h1>\s*<p>.*?</p>',
            f'</h1>\n          <p class="brand-description-p" data-zh="{escape_attr(description_zh)}" data-en="{escape_attr(description_en)}">{html.escape(description_zh)}</p>',
            html_content
        )

        # Rebuild the central preview body from the selected catalog render archetype.
        page_grid = build_page_grid(
            render_archetype,
            brand_name,
            palette_candidates,
            category_slug,
            style_contract_block,
            style_token_block,
            style_dark_token_block,
        )
        html_content = re.sub(
            r'\n\s*<div class="page-grid">.*?\n\s*</main>',
            f"\n{page_grid}\n    </main>",
            html_content,
            flags=re.DOTALL
        )
        html_content = re.sub(
            r'\n\s*<aside class="surface surface-strong hero-side">.*?\n\s*</aside>\s*\n\s*</section>',
            f"\n{build_hero_side()}\n      </section>",
            html_content,
            flags=re.DOTALL
        )

        # Align relative assets path based on subfolder depth
        html_content = html_content.replace('href="../assets/', 'href="../../assets/')
        html_content = html_content.replace('src="../assets/', 'src="../../assets/')

        # 4. Self-Healing Bilingual Upgrades for compiled previews

        # Standardize static interface translations dynamically
        ui_translations = {
            "<h2>目录</h2>": '<h2 data-zh="目录" data-en="Contents">目录</h2>',
            '<a href="#colors">颜色</a>': '<a href="#colors" data-zh="颜色" data-en="Colors">颜色</a>',
            '<a href="#type">字体层级</a>': '<a href="#type" data-zh="字体层级" data-en="Typography">字体层级</a>',
            '<a href="#buttons">按钮与标签</a>': '<a href="#buttons" data-zh="按钮与标签" data-en="Buttons & Badges">按钮与标签</a>',
            '<a href="#panels">面板与状态</a>': '<a href="#panels" data-zh="面板与状态" data-en="Panels & Status">面板与状态</a>',
            '<a href="#tokens">关键 token</a>': '<a href="#tokens" data-zh="关键 token" data-en="Key Tokens">关键 token</a>',
            '<a href="#tokens">关键 Token</a>': '<a href="#tokens" data-zh="关键 Token" data-en="Key Tokens">关键 Token</a>',
            '<h3>颜色系统</h3>': '<h3 data-zh="颜色系统" data-en="Color System">颜色系统</h3>',
            '<h3>字体层级</h3>': '<h3 data-zh="字体层级" data-en="Typography Hierarchy">字体层级</h3>',
            '<h3>按钮与标签</h3>': '<h3 data-zh="按钮与标签" data-en="Buttons & Badges">按钮与标签</h3>',
            '<h3>面板与状态</h3>': '<h3 data-zh="面板与状态" data-en="Panels & Statuses">面板与状态</h3>',
            '<h3>数字表达</h3>': '<h3 data-zh="数字表达" data-en="Numeric Focus">数字表达</h3>',
            '<h3>关键 Token</h3>': '<h3 data-zh="关键 Token" data-en="Key Tokens">关键 Token</h3>',
            '<h3>关键 token</h3>': '<h3 data-zh="关键 token" data-en="Key Tokens">关键 token</h3>',
            '<th>Token</th>': '<th data-zh="变量" data-en="Token">Token</th>',
            '<th>Value</th>': '<th data-zh="编译值" data-en="Value">Value</th>',
            '<strong>常见颜色</strong>': '<strong data-zh="常见颜色" data-en="Color Tokens">常见颜色</strong>',
            '<strong>颜色</strong>': '<strong data-zh="颜色" data-en="Color Tokens">颜色</strong>',
            '<strong>排版与组件 (YAML)</strong>': '<strong data-zh="排版与组件 (YAML)" data-en="Typography & Components (YAML)">排版与组件 (YAML)</strong>',
            '<strong>Primary</strong>': '<strong data-zh="主动作" data-en="Primary">Primary</strong>',
            '<strong>Secondary</strong>': '<strong data-zh="次要动作" data-en="Secondary">Secondary</strong>',
            '<strong>Ghost</strong>': '<strong data-zh="幽灵按钮" data-en="Ghost">Ghost</strong>',

            # Common baseline description blocks (Dig)
            '<p>深矿物背景 + run green 主动作 + cool blue 技术辅助色</p>': '<p data-zh="深矿物背景 + run green 主动作 + cool blue 技术辅助色" data-en="Dark mineral canvas + run green primary action + cool blue support">深矿物背景 + run green 主动作 + cool blue 技术辅助色</p>',
            '<p>sans 为默认 UI 字体，mono 用于元信息和状态</p>': '<p data-zh="sans 为默认 UI 字体，mono 用于元信息 and 状态" data-en="sans is the default UI voice, with monospace reserved for meta and status">sans 为默认 UI 字体，mono 用于元信息 and 状态</p>',
            '<p>强调动作清晰度，不做夸张位移</p>': '<p data-zh="强调动作清晰度，不做夸张位移" data-en="Emphasis on action clarity, without excessive shifts or layout noise">强调动作清晰度，不做夸张位移</p>',
            '<p>半透明深色 surface，强调结构边界和运行中信息</p>': '<p data-zh="半透明深色 surface，强调结构边界和运行中信息" data-en="Semi-transparent dark surface, accenting structural boundaries and active runtime traces">半透明深色 surface，强调结构边界和运行中信息</p>',
            '<p>数字是关键视觉锚点，可以比正文更有力量</p>': '<p data-zh="数字是关键视觉锚点，可以比正文更有力量" data-en="Numbers are core visual anchors, carrying more gravity than standard body text">数字是关键视觉锚点，可以比正文更有力量</p>',
            '<p>这部分方便你对照 HTML 直接回写 catalog 文档</p>': '<p data-zh="这部分方便你对照 HTML 直接回写 catalog 文档" data-en="This section serves as a direct reference for your catalog document definitions">这部分方便你对照 HTML 直接回写 catalog 文档</p>',

            # Common baseline description blocks (Mono)
            '<p>墨水与纸张：纯白画布上的高对比冷酷表达</p>': '<p data-zh="墨水与纸张：纯白画布上的高对比冷酷表达" data-en="Ink & Paper: High-contrast monospace expression on stark white canvas">墨水与纸张：纯白画布上的高对比冷酷表达</p>',
            '<p>所有文字都使用 monospace，字重起主要分层作用</p>': '<p data-zh="所有文字都使用 monospace，字重起主要分层作用" data-en="All characters run in monospace, using weight scales as primary hierarchy">所有文字都使用 monospace，字重起主要分层作用</p>',
            '<p>没有任何非必需装饰，动作表现为刚性实线框与强反色</p>': '<p data-zh="没有任何非必需装饰，动作表现为刚性实线框与强反色" data-en="Zero non-essential ornaments, actions expressed via rigid borders and strong inversion">没有任何非必需装饰，动作表现为刚性实线框与强反色</p>',
            '<p>刚性单色面板，通过实线细边框与纯黑填充传递状态</p>': '<p data-zh="刚性单色面板，通过实线细边框与纯黑填充传递状态" data-en="Rigid monochromatic panels, streaming states via thin borders and solid fills">刚性单色面板，通过实线细边框与纯黑填充传递状态</p>',
            '<p>等宽数字排列，在统计视图中天然对齐</p>': '<p data-zh="等宽数字排列，在统计视图中天然对齐" data-en="Monospaced digits, naturally aligned for clean statistical scannability">等宽数字排列，在统计视图中天然对齐</p>',
            '<p>严格的 CSS 属性映射关系</p>': '<p data-zh="严格的 CSS 属性映射关系" data-en="Strict CSS custom property mapping schemas">严格的 CSS 属性映射关系</p>',

            # Common baseline description blocks (Editorial)
            '<p>温暖纸感底色 + 深墨绿主强调 + 棕金辅助色</p>': '<p data-zh="温暖纸感底色 + 深墨绿主强调 + 棕金辅助色" data-en="Warm paper canvas + deep forest-green accent + golden-brown support">温暖纸感底色 + 深墨绿主强调 + 棕金辅助色</p>',
            '<p>serif 用于重音与气质，正文与 UI 仍以 sans 为主</p>': '<p data-zh="serif 用于重音与气质，正文与 UI 仍以 sans 为主" data-en="serif sets the tone and atmosphere, while sans remains the primary voice for body and UI">serif 用于重音与气质，正文与 UI 仍以 sans 为主</p>',
            '<p>动作不吵闹，主要依靠颜色加深、边界强化和留白气质</p>': '<p data-zh="动作不吵闹，主要依靠颜色加深、边界强化和留白气质" data-en="Actions remain calm, relying on deeper accents, border reinforcement and breathing space">动作不吵闹，主要依靠颜色加深、边界强化和留白气质</p>',
            '<p>像嵌入页面中的资料卡，而不是 glowing console widget</p>': '<p data-zh="像嵌入页面中的资料卡，而不是 glowing console widget" data-en="Reads like reference cards embedded inside the page, not a glowing console widget">像嵌入页面中的资料卡，而不是 glowing console widget</p>',
            '<p>数字可以带 serif 重音，但标签要保持信息清晰</p>': '<p data-zh="数字可以带 serif 重音，但标签要保持信息清晰" data-en="Numbers carry serif gravity, while descriptions maintain absolute scannability">数字可以带 serif 重音，但标签要保持信息清晰</p>',
            '<p>适合品牌页 and 叙事页的纸感体系</p>': '<p data-zh="适合品牌页 and 叙事页的纸感体系" data-en="A bookish, tactile system perfectly suited for brand and story surfaces">适合品牌页 and 叙事页的纸感体系</p>',

            # Stat notes
            '<div class="note">稳定、克制、可读</div>': '<div class="note" data-zh="稳定、克制、可读" data-en="Stable, restrained, highly legible">稳定、克制、可读</div>',
            '<div class="note">支持主视觉聚焦</div>': '<div class="note" data-zh="支持主视觉聚焦" data-en="Supports bold focal visual anchors">支持主视觉聚焦</div>',
            '<div class="note">用主色或正文色即可</div>': '<div class="note" data-zh="用主色或正文色即可" data-en="Direct expression using primary or body color">用主色或正文色即可</div>',
            '<div class="note">避免装饰性过强</div>': '<div class="note" data-zh="避免装饰性过强" data-en="Avoids excessive ornamental complexity">避免装饰性过强</div>',

            '<div class="note">作者感来自克制重音</div>': '<div class="note" data-zh="作者感来自克制重音" data-en="Editorial confidence via restrained accents">作者感来自克制重音</div>',
            '<div class="note">留白必须更大胆</div>': '<div class="note" data-zh="留白必须更大胆" data-en="Negative spaces must run bolder">留白必须更大胆</div>',
            '<div class="note">仍保持产品边界</div>': '<div class="note" data-zh="仍保持产品边界" data-en="Retain clean product boundaries">仍保持产品边界</div>',
            '<div class="note">不变成杂志封面</div>': '<div class="note" data-zh="不变成杂志封面" data-en="Never turn into a noisy magazine cover">不变成杂志封面</div>',

            '<div class="note">单色等宽渲染</div>': '<div class="note" data-zh="单色等宽渲染" data-en="Monochromatic tabular layout">单色等宽渲染</div>',
            '<div class="note">适合超高频流动</div>': '<div class="note" data-zh="适合超高频流动" data-en="Suited for high-frequency data streams">适合超高频流动</div>',
            '<div class="note">硬朗的纯文本块</div>': '<div class="note" data-zh="硬朗的纯文本块" data-en="Rigid plain-text block layout">硬朗的纯文本块</div>',
            '<div class="note">没有视觉抖动</div>': '<div class="note" data-zh="没有视觉抖动" data-en="Zero visual jitter or shifting">没有视觉抖动</div>',

            # Card placeholders (Dig/Mono/Editorial templates & older compiled variants)
            '<div class="type-showcase type-section">把工作流变成运行中的系统</div>': '<div class="type-showcase type-section" data-zh="把工作流变成运行中的系统" data-en="Turn workflows into running systems">把工作流变成运行中的系统</div>',
            '<div class="type-showcase type-body">当前风格要让人感到系统已经在运行，而不是还停留在概念说明阶段。</div>': '<div class="type-showcase type-body" data-zh="当前风格要让人感到系统已经在运行，而不是还停留在概念说明阶段。" data-en="The current style should make people feel that the system is already running, rather than staying in the conceptual stage.">当前风格要让人感到系统已经在运行，而不是还停留在概念说明阶段。</div>',
            '<p>面板应有明确的组织结构、细边框和轻 glow，像控制平面，而不是毛玻璃社交卡片。</p>': '<p data-zh="面板应有明确的组织结构、细边框和轻 glow，像控制平面，而不是毛玻璃社交卡片。" data-en="Panels should have clear organization, thin borders, and soft glow, like a control console rather than frosted-glass social cards.">面板应有明确的组织结构、细边框和轻 glow，像控制平面，而不是毛玻璃社交卡片。</p>',
            '<p>支持状态色，但状态色必须服务信息表达，不要出现高饱和多色抢主导的问题。</p>': '<p data-zh="支持状态色，但状态色必须服务信息表达，不要出现高饱和多色抢主导的问题。" data-en="Supports state colors, but state colors must serve information delivery. Saturated colors should never compete for visual dominance.">支持状态色，但状态色必须服务信息表达，不要出现高饱和多色抢主导的问题。</p>',
            '<p style="font-size: 13px; opacity: 0.8; margin-top: 8px; margin-bottom: 0;">已升级为严格的 YAML 映射语法（详见 catalog markdown），通过 `{typography.xxx}` 等直接控制组件。</p>': '<p style="font-size: 13px; opacity: 0.8; margin-top: 8px; margin-bottom: 0;" data-zh="已升级为严格的 YAML 映射语法（详见 catalog markdown），通过 `{typography.xxx}` 等直接控制组件。" data-en="Upgraded to strict YAML mapping syntax (see catalog markdown), controlling components via `{typography.xxx}` directly.">已升级为严格的 YAML 映射语法（详见 catalog markdown），通过 `{typography.xxx}` 等直接控制组件。</p>'
        }
        for src, target in ui_translations.items():
            html_content = html_content.replace(src, target)

        # Preview controls are generated from one shared shell. Remove earlier
        # inline capsule variants so every render receives the same local-rule UI.
        html_content = re.sub(
            r'\s*/\* Floating Language Switcher \*/[\s\S]*?(?=\s*</style>)',
            '',
            html_content,
            count=1,
        )
        html_content = re.sub(
            r'\s*<!-- Floating Theme Switcher Capsule; revealed only for dual-theme styles -->\s*<div class="theme-switch-capsule"[^>]*>[\s\S]*?</div>',
            '',
            html_content,
            count=1,
        )
        html_content = re.sub(
            r'\s*<!-- Floating Language Switcher Capsule -->\s*<div class="lang-switch-capsule"[^>]*>[\s\S]*?</div>',
            '',
            html_content,
            count=1,
        )
        html_content = re.sub(
            r'\s*<!-- Preview Control Dock -->\s*<div class="preview-control-dock"[^>]*>[\s\S]*?</div>\s*(?=\s*<main)',
            '',
            html_content,
            count=1,
        )
        preview_controls_html = """\n    <!-- Preview Control Dock -->
    <div class="preview-control-dock">
      <div class="theme-switch-capsule" data-theme-switcher hidden role="group" aria-label="Theme">
        <span class="theme-indicator" aria-hidden="true"></span>
        <button type="button" class="theme-btn" data-theme-mode="light" aria-label="亮色模式" title="亮色模式" aria-pressed="false"><i class="bi bi-brightness-high-fill" aria-hidden="true"></i></button>
        <button type="button" class="theme-btn" data-theme-mode="dark" aria-label="暗色模式" title="暗色模式" aria-pressed="false"><i class="bi bi-moon-stars-fill" aria-hidden="true"></i></button>
      </div>
      <div class="lang-switch-capsule" role="group" aria-label="Language">
        <button type="button" class="lang-btn" data-lang="zh" aria-pressed="false" aria-label="中文" title="中文">中</button>
        <span class="lang-split" aria-hidden="true">/</span>
        <button type="button" class="lang-btn" data-lang="en" aria-pressed="false" aria-label="English" title="English">EN</button>
      </div>
    </div>"""
        html_content = re.sub(
            r"<body(?:\s+[^>]*)?>",
            lambda match: f"{match.group(0)}{preview_controls_html}",
            html_content,
            count=1,
        )

        # Clean up any pre-existing bilingual script controllers (including broken ones) to force update
        html_content = re.sub(
            r'<script>\s*// Interactive Language Switcher Controller.*?</script>\s*</body>',
            '</body>',
            html_content,
            flags=re.DOTALL
        )
        html_content = re.sub(
            r'<script>\s*// Interactive Language Switcher Controller.*?</script>',
            '',
            html_content,
            flags=re.DOTALL
        )
        html_content = re.sub(
            r'<script>\s*// Dynamic Token Visualizer.*?</script>',
            '',
            html_content,
            flags=re.DOTALL
        )
        html_content = html_content.replace("</body></script>", "</body>")

        # Inject or replace standard Javascript block to include setLanguage and listener
        if "Interactive Language Switcher Controller" not in html_content:
            bilingual_js = """
      // Interactive Language Switcher Controller
      function setLanguage(lang) {
        localStorage.setItem('dig-ui-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

        // Toggle active classes on switcher buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
          const isActive = btn.getAttribute('data-lang') === lang;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-pressed', String(isActive));
        });

        // Translate all data-zh/data-en text nodes
        document.querySelectorAll('[data-zh][data-en]').forEach(el => {
          el.textContent = el.getAttribute(`data-${lang}`);
        });
      }

      // Initialise state
      document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('dig-ui-lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en');
        setLanguage(savedLang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
          });
        });

        document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
          link.addEventListener('click', event => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', link.getAttribute('href'));
          });
        });

        const root = document.documentElement;
        const paletteRoleTokens = {
          canvas: '--dig-bg',
          ink: '--dig-text',
          primary: '--dig-accent',
          primaryStrong: '--dig-accent-strong',
          support: '--dig-accent-2',
          supportStrong: '--dig-accent-2-strong'
        };
        const paletteTrackedTokens = [
          '--dig-bg',
          '--dig-text',
          '--dig-accent',
          '--dig-accent-strong',
          '--dig-accent-2',
          '--dig-accent-2-strong'
        ];
        const paletteExportTokens = [
          ...paletteTrackedTokens
        ];
        const styleLabRoleTokens = {
          canvas: '--dig-bg',
          surface: '--dig-surface',
          ink: '--dig-text',
          primary: '--dig-accent',
          support: '--dig-accent-2',
          border: '--dig-border'
        };
        const styleLabTrackedTokens = Object.values(styleLabRoleTokens);
        let styleLabBaseTokens = null;
        const styleLabOverrides = { light: {}, dark: {} };

        function normalizeHex(raw) {
          const value = (raw || '').trim();
          if (/^#[0-9a-fA-F]{3}$/.test(value)) {
            return '#' + value.slice(1).split('').map(char => char + char).join('').toUpperCase();
          }
          if (/^#[0-9a-fA-F]{6}$/.test(value)) {
            return value.toUpperCase();
          }
          return '';
        }

        function cssColorToHex(raw) {
          const value = (raw || '').trim();
          const hex = normalizeHex(value);
          if (hex) return hex;
          const rgbMatch = value.match(/^rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);
          if (!rgbMatch) return '';
          return '#' + rgbMatch.slice(1, 4).map(part => {
            const channel = Math.max(0, Math.min(255, Number(part)));
            return channel.toString(16).padStart(2, '0');
          }).join('').toUpperCase();
        }

        function getTokenValue(token) {
          return getComputedStyle(root).getPropertyValue(token).trim();
        }

        function renderTokenValue(el, value) {
          let displayValue = (value || '').trim();
          if (!displayValue) return;
          const hexValue = normalizeHex(displayValue);
          if (hexValue) {
            displayValue = hexValue;
          }
          el.textContent = '';
          if (hexValue) {
            const dot = document.createElement('span');
            dot.className = 'token-color-dot';
            dot.style.background = hexValue;
            el.appendChild(dot);
          }
          el.appendChild(document.createTextNode(displayValue));
        }

        function refreshTokenVisualizers() {
          document.querySelectorAll('.token-val').forEach(el => {
            const tokenName = el.getAttribute('data-token');
            if (tokenName) {
              renderTokenValue(el, getTokenValue(tokenName));
            }
          });
        }

        function updatePaletteLabState() {
          const lab = document.querySelector('[data-palette-lab]');
          if (!lab) return;

          Object.entries(paletteRoleTokens).forEach(([role, token]) => {
            const value = cssColorToHex(getTokenValue(token));
            const textInput = lab.querySelector(`[data-palette-input="${role}"]`);
            const colorInput = lab.querySelector(`[data-palette-color="${role}"]`);
            if (textInput && value && textInput.value.toUpperCase() !== value) {
              textInput.value = value;
            }
            if (colorInput && value && colorInput.value.toUpperCase() !== value) {
              colorInput.value = value;
            }
          });

          paletteTrackedTokens.forEach(token => {
            const value = getTokenValue(token);
            lab.querySelectorAll(`[data-palette-token="${token}"]`).forEach(el => {
              el.textContent = normalizeHex(value) || value;
            });
          });
          refreshTokenVisualizers();
        }

        function setPaletteRoles(updates) {
          let changed = false;
          Object.entries(updates).forEach(([role, value]) => {
            const token = paletteRoleTokens[role];
            const hex = normalizeHex(value);
            if (!token || !hex) return;
            root.style.setProperty(token, hex);
            changed = true;
          });
          if (changed) {
            updatePaletteLabState();
          }
        }

        function setPaletteRole(role, value) {
          setPaletteRoles({ [role]: value });
        }

        function fallbackCopyText(text) {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          textarea.style.top = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            return document.execCommand('copy');
          } catch (error) {
            console.warn('Palette fallback copy failed', error);
            return false;
          } finally {
            document.body.removeChild(textarea);
          }
        }

        async function copyPaletteTokens(text) {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
              await navigator.clipboard.writeText(text);
              return true;
            } catch (error) {
              console.warn('Palette clipboard copy failed', error);
            }
          }
          return fallbackCopyText(text);
        }

        function buildPaletteTokenCss(tokens = paletteTrackedTokens) {
          return tokens.map(token => {
            const value = getTokenValue(token);
            return `${token}: ${normalizeHex(value) || value};`;
          }).join('\\n');
        }

        function getPaletteSlug() {
          const fileName = window.location.pathname.split('/').pop() || 'dig-palette';
          return fileName.replace(/\\.html$/i, '') || 'dig-palette';
        }

        function formatPaletteTimestamp(date = new Date()) {
          const pad = value => String(value).padStart(2, '0');
          return [
            date.getFullYear(),
            pad(date.getMonth() + 1),
            pad(date.getDate())
          ].join('') + '-' + [
            pad(date.getHours()),
            pad(date.getMinutes()),
            pad(date.getSeconds())
          ].join('');
        }

        function collectPaletteCandidates(lab) {
          const support = Array.from(lab.querySelectorAll('[data-palette-candidate]')).map(button => {
            const label = button.querySelector('span:not(.palette-candidate-dot)')?.textContent?.trim() || '';
            return {
              label,
              value: normalizeHex(button.getAttribute('data-value')) || button.getAttribute('data-value'),
              strong: normalizeHex(button.getAttribute('data-strong')) || button.getAttribute('data-strong')
            };
          });
          return { support };
        }

        function buildPaletteExportPayload(lab) {
          const tokens = {};
          paletteExportTokens.forEach(token => {
            const value = getTokenValue(token);
            if (value) {
              tokens[token] = normalizeHex(value) || value;
            }
          });
          const title = document.querySelector('.brand-title-h1');
          const description = document.querySelector('.brand-description-p');
          const timestamp = formatPaletteTimestamp();
          return {
            schema: 'dig.palette.export.v1',
            token_contract: 'palette_v1',
            source: 'dig-ui-skill/render',
            exported_at: new Date().toISOString(),
            slug: getPaletteSlug(),
            export_id: `${getPaletteSlug()}.custompalette-${timestamp}`,
            name: {
              zh: title?.getAttribute('data-zh') || title?.textContent?.trim() || '',
              en: title?.getAttribute('data-en') || title?.textContent?.trim() || ''
            },
            description: {
              zh: description?.getAttribute('data-zh') || '',
              en: description?.getAttribute('data-en') || ''
            },
            anchors: {
              canvas: tokens['--dig-bg'],
              ink: tokens['--dig-text'],
              primary: tokens['--dig-accent'],
              support: tokens['--dig-accent-2']
            },
            roles: {
              primary_strong: tokens['--dig-accent-strong'],
              support_strong: tokens['--dig-accent-2-strong']
            },
            tokens,
            css: buildPaletteTokenCss(paletteExportTokens),
            candidates: collectPaletteCandidates(lab),
            derivation: {
              status: 'anchors-only',
              note: 'This custom palette exports only Palette Lab managed role tokens. Downstream systems should derive extended scales from these anchors.'
            }
          };
        }

        function escapeHtml(value) {
          return String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
          })[char]);
        }

        function hexToRgb(hex) {
          const normalized = normalizeHex(hex);
          if (!normalized) return null;
          return {
            r: parseInt(normalized.slice(1, 3), 16),
            g: parseInt(normalized.slice(3, 5), 16),
            b: parseInt(normalized.slice(5, 7), 16)
          };
        }

        function relativeLuminance(hex) {
          const rgb = hexToRgb(hex);
          if (!rgb) return 1;
          const channels = [rgb.r, rgb.g, rgb.b].map(channel => {
            const value = channel / 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        }

        function contrastRatio(hexA, hexB) {
          const lumA = relativeLuminance(hexA);
          const lumB = relativeLuminance(hexB);
          const lighter = Math.max(lumA, lumB);
          const darker = Math.min(lumA, lumB);
          return (lighter + 0.05) / (darker + 0.05);
        }

        function readableTextOn(hex) {
          return contrastRatio(hex, '#000000') >= contrastRatio(hex, '#FFFFFF') ? '#000000' : '#FFFFFF';
        }

        function buildPalettePreviewHtml(payload) {
          const tokens = payload.tokens || {};
          const onPrimary = readableTextOn(payload.anchors.primary);
          const swatches = [
            ['Canvas', payload.anchors.canvas],
            ['Ink', payload.anchors.ink],
            ['Primary', payload.anchors.primary],
            ['Primary Strong', payload.roles.primary_strong],
            ['Support', payload.anchors.support],
            ['Support Strong', payload.roles.support_strong]
          ].map(([label, value]) => `
              <article class="swatch">
                <span style="background:${escapeHtml(value)}"></span>
                <strong>${escapeHtml(label)}</strong>
                <code>${escapeHtml(value)}</code>
              </article>`).join('');
          const tokenRows = Object.entries(tokens).map(([token, value]) => `
              <tr><td><code>${escapeHtml(token)}</code></td><td>${escapeHtml(value)}</td></tr>`).join('');
          return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(payload.name.zh || payload.name.en || payload.slug)} Palette Export</title>
    <style>
      :root {
        --bg: ${escapeHtml(payload.anchors.canvas)};
        --ink: ${escapeHtml(payload.anchors.ink)};
        --primary: ${escapeHtml(payload.anchors.primary)};
        --primary-strong: ${escapeHtml(payload.roles.primary_strong)};
        --support: ${escapeHtml(payload.anchors.support)};
        --support-strong: ${escapeHtml(payload.roles.support_strong)};
        --on-primary: ${escapeHtml(onPrimary)};
        --surface: color-mix(in srgb, var(--bg), var(--ink) 6%);
        --surface-strong: color-mix(in srgb, var(--bg), var(--ink) 11%);
        --border: color-mix(in srgb, var(--ink), transparent 76%);
        --border-strong: color-mix(in srgb, var(--ink), transparent 56%);
        --muted: color-mix(in srgb, var(--ink), transparent 32%);
      }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--bg); color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 40px 0; }
      .hero { display: grid; gap: 20px; padding: 32px; border: 1px solid var(--border); border-radius: 16px; background: linear-gradient(135deg, var(--surface), color-mix(in srgb, var(--surface), var(--support) 18%)); }
      h1 { margin: 0; font-size: clamp(42px, 8vw, 92px); line-height: .92; letter-spacing: -0.03em; }
      p { max-width: 68ch; color: var(--muted); font-size: 18px; line-height: 1.7; }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; }
      .button { min-height: 44px; padding: 0 18px; border: 1px solid var(--primary-strong); border-radius: 999px; background: var(--primary); color: var(--on-primary); font-weight: 700; }
      .button.secondary { background: transparent; color: var(--primary); }
      .swatches { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin: 24px 0; }
      .swatch { display: grid; gap: 8px; padding: 14px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }
      .swatch span { width: 42px; height: 42px; border: 1px solid var(--border-strong); border-radius: 999px; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      table { width: 100%; border-collapse: collapse; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }
      td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
      tr:last-child td { border-bottom: 0; }
      td:last-child { text-align: right; color: var(--muted); }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <code>${escapeHtml(payload.export_id)}</code>
        <h1>${escapeHtml(payload.name.zh || payload.name.en || payload.slug)}</h1>
        <p>${escapeHtml(payload.description.zh || payload.description.en || '')}</p>
        <div class="actions">
          <span class="button">Primary Action</span>
          <span class="button secondary">Secondary Action</span>
        </div>
      </section>
      <section class="swatches">${swatches}
      </section>
      <table>${tokenRows}
      </table>
    </main>
  </body>
</html>
`;
        }

        const zipCrcTable = (() => {
          const table = new Uint32Array(256);
          for (let index = 0; index < 256; index += 1) {
            let value = index;
            for (let bit = 0; bit < 8; bit += 1) {
              value = (value & 1) ? (0xEDB88320 ^ (value >>> 1)) : (value >>> 1);
            }
            table[index] = value >>> 0;
          }
          return table;
        })();

        function crc32(bytes) {
          let crc = 0xFFFFFFFF;
          for (const byte of bytes) {
            crc = zipCrcTable[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
          }
          return (crc ^ 0xFFFFFFFF) >>> 0;
        }

        function zipDateParts(date = new Date()) {
          const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
          const day = (date.getFullYear() - 1980) << 9 | ((date.getMonth() + 1) << 5) | date.getDate();
          return { time, day };
        }

        function makeZip(files) {
          const encoder = new TextEncoder();
          const localParts = [];
          const centralParts = [];
          let offset = 0;
          const { time, day } = zipDateParts();

          files.forEach(file => {
            const nameBytes = encoder.encode(file.name);
            const dataBytes = encoder.encode(file.content);
            const crc = crc32(dataBytes);
            const local = new ArrayBuffer(30 + nameBytes.length);
            const localView = new DataView(local);
            localView.setUint32(0, 0x04034b50, true);
            localView.setUint16(4, 20, true);
            localView.setUint16(6, 0x0800, true);
            localView.setUint16(8, 0, true);
            localView.setUint16(10, time, true);
            localView.setUint16(12, day, true);
            localView.setUint32(14, crc, true);
            localView.setUint32(18, dataBytes.length, true);
            localView.setUint32(22, dataBytes.length, true);
            localView.setUint16(26, nameBytes.length, true);
            new Uint8Array(local, 30).set(nameBytes);
            localParts.push(local, dataBytes);

            const central = new ArrayBuffer(46 + nameBytes.length);
            const centralView = new DataView(central);
            centralView.setUint32(0, 0x02014b50, true);
            centralView.setUint16(4, 20, true);
            centralView.setUint16(6, 20, true);
            centralView.setUint16(8, 0x0800, true);
            centralView.setUint16(10, 0, true);
            centralView.setUint16(12, time, true);
            centralView.setUint16(14, day, true);
            centralView.setUint32(16, crc, true);
            centralView.setUint32(20, dataBytes.length, true);
            centralView.setUint32(24, dataBytes.length, true);
            centralView.setUint16(28, nameBytes.length, true);
            centralView.setUint32(42, offset, true);
            new Uint8Array(central, 46).set(nameBytes);
            centralParts.push(central);
            offset += local.byteLength + dataBytes.length;
          });

          const centralSize = centralParts.reduce((sum, part) => sum + part.byteLength, 0);
          const end = new ArrayBuffer(22);
          const endView = new DataView(end);
          endView.setUint32(0, 0x06054b50, true);
          endView.setUint16(8, files.length, true);
          endView.setUint16(10, files.length, true);
          endView.setUint32(12, centralSize, true);
          endView.setUint32(16, offset, true);
          return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' });
        }

        function downloadPaletteZip(payload) {
          const baseName = payload.export_id || `${payload.slug || 'dig-palette'}.custompalette-${formatPaletteTimestamp()}`;
          const jsonName = `${baseName}.json`;
          const htmlName = `${baseName}.html`;
          const zip = makeZip([
            { name: jsonName, content: JSON.stringify(payload, null, 2) + '\\n' },
            { name: htmlName, content: buildPalettePreviewHtml(payload) }
          ]);
          const url = URL.createObjectURL(zip);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${baseName}.zip`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 0);
        }

        function getStyleSlug() {
          const fileName = window.location.pathname.split('/').pop() || 'dig-style';
          return fileName.replace(/\\.html$/i, '') || 'dig-style';
        }

        function collectStyleTokens() {
          const tokens = {};
          document.querySelectorAll('.token-val[data-token]').forEach(el => {
            const token = el.getAttribute('data-token');
            const value = getTokenValue(token);
            if (token && token.startsWith('--dig-') && value) {
              tokens[token] = normalizeHex(value) || value;
            }
          });
          return tokens;
        }

        function parseStyleTokenCss(cssText) {
          const tokens = {};
          for (const match of String(cssText || '').matchAll(/(--dig-[A-Za-z0-9_-]+)\\s*:\\s*([^;]+);/g)) {
            tokens[match[1]] = normalizeHex(match[2]) || match[2].trim();
          }
          return tokens;
        }

        function buildStyleTokenCss(tokens, cssText = '') {
          const lines = [];
          const seen = new Set();
          for (const match of String(cssText || '').matchAll(/(--dig-[A-Za-z0-9_-]+)\\s*:/g)) {
            const token = match[1];
            if (Object.prototype.hasOwnProperty.call(tokens, token)) {
              lines.push(`${token}: ${tokens[token]};`);
              seen.add(token);
            }
          }
          Object.keys(tokens).sort().forEach(token => {
            if (!seen.has(token)) {
              lines.push(`${token}: ${tokens[token]};`);
            }
          });
          return lines.join('\\n');
        }

        function getStyleLabMode() {
          return root.dataset.styleTheme === 'dark' ? 'dark' : 'light';
        }

        function applyStyleLabOverrides() {
          let style = document.getElementById('dig-style-lab-overrides');
          if (!style) {
            style = document.createElement('style');
            style.id = 'dig-style-lab-overrides';
            document.head.appendChild(style);
          }
          style.textContent = ['light', 'dark'].map(mode => {
            const entries = Object.entries(styleLabOverrides[mode]);
            if (!entries.length) return '';
            return `html[data-style-theme="${mode}"] { ${entries.map(([token, value]) => `${token}: ${value};`).join(' ')} }`;
          }).join('\\n');
        }

        function updateStyleLabState() {
          const lab = document.querySelector('[data-style-lab]');
          if (!lab || !styleLabBaseTokens) return;
          Object.entries(styleLabRoleTokens).forEach(([role, token]) => {
            const value = cssColorToHex(getTokenValue(token));
            const textInput = lab.querySelector(`[data-style-input="${role}"]`);
            const colorInput = lab.querySelector(`[data-style-color="${role}"]`);
            if (textInput && value && textInput.value.toUpperCase() !== value) textInput.value = value;
            if (colorInput && value && colorInput.value.toUpperCase() !== value) {
              colorInput.value = value;
            }
          });
          styleLabTrackedTokens.forEach(token => {
            const value = getTokenValue(token);
            lab.querySelectorAll(`[data-style-token="${token}"]`).forEach(el => {
              el.textContent = normalizeHex(value) || value;
            });
          });
          refreshTokenVisualizers();
        }

        function setStyleLabRole(role, value) {
          const token = styleLabRoleTokens[role];
          const hex = normalizeHex(value);
          if (!token || !hex || !styleLabBaseTokens) return;
          styleLabOverrides[getStyleLabMode()][token] = hex;
          applyStyleLabOverrides();
          updateStyleLabState();
        }

        function initStyleTheme() {
          const lab = document.querySelector('[data-style-lab]');
          const switcher = document.querySelector('[data-theme-switcher]');
          const darkTokens = parseStyleTokenCss(lab?.getAttribute('data-style-dark-token-block') || '');
          if (!lab || !switcher || Object.keys(darkTokens).length === 0) return;

          switcher.hidden = false;
          const applyStyleTheme = mode => {
            const resolvedMode = mode === 'dark' ? 'dark' : 'light';
            document.documentElement.dataset.styleTheme = resolvedMode;
            document.documentElement.style.colorScheme = resolvedMode;
            localStorage.setItem('dig-ui-style-theme', resolvedMode);
            switcher.dataset.activeTheme = resolvedMode;
            switcher.querySelectorAll('[data-theme-mode]').forEach(button => {
              button.setAttribute('aria-pressed', String(button.getAttribute('data-theme-mode') === resolvedMode));
            });
            root.dispatchEvent(new CustomEvent('dig-ui-style-theme-change', { detail: { mode: resolvedMode } }));
          };

          const savedTheme = localStorage.getItem('dig-ui-style-theme');
          const defaultTheme = document.body?.dataset.styleThemeDefault === 'dark' ? 'dark' : 'light';
          applyStyleTheme(savedTheme === 'dark' ? 'dark' : savedTheme === 'light' ? 'light' : defaultTheme);
          switcher.querySelectorAll('[data-theme-mode]').forEach(button => {
            button.addEventListener('click', () => applyStyleTheme(button.getAttribute('data-theme-mode')));
          });
        }

        function buildStyleExportPayload(lab) {
          const title = document.querySelector('.brand-title-h1');
          const description = document.querySelector('.brand-description-p');
          const timestamp = formatPaletteTimestamp();
          const slug = getStyleSlug();
          const styleTokenCss = lab.getAttribute('data-style-token-block') || '';
          const styleDarkTokenCss = lab.getAttribute('data-style-dark-token-block') || '';
          const styleTokens = {
            ...(styleLabBaseTokens?.light || parseStyleTokenCss(styleTokenCss)),
            ...styleLabOverrides.light
          };
          const styleDarkTokens = {
            ...(styleLabBaseTokens?.dark || parseStyleTokenCss(styleDarkTokenCss)),
            ...styleLabOverrides.dark
          };
          const styleCss = buildStyleTokenCss(styleTokens, styleTokenCss);
          const styleDarkCss = buildStyleTokenCss(styleDarkTokens, styleDarkTokenCss);
          return {
            schema: 'dig.style.export.v1',
            token_contract: 'style_v1',
            source: 'dig-ui-skill/render',
            exported_at: new Date().toISOString(),
            slug,
            export_id: `${slug}.customstyle-${timestamp}`,
            name: {
              zh: title?.getAttribute('data-zh') || title?.textContent?.trim() || '',
              en: title?.getAttribute('data-en') || title?.textContent?.trim() || ''
            },
            description: {
              zh: description?.getAttribute('data-zh') || '',
              en: description?.getAttribute('data-en') || ''
            },
            render: {
              archetype: document.body.getAttribute('data-render-archetype') || 'token-sheet'
            },
            style_contract: lab.getAttribute('data-style-contract') || '',
            tokens: styleTokens,
            css: styleCss,
            theme_tokens: { light: styleTokens, dark: styleDarkTokens },
            theme_css: { light: styleCss, dark: styleDarkCss },
            derivation: {
              status: 'style-contract-export',
              note: 'This custom style export preserves the canonical Style Contract, render archetype, and visible Dig tokens from the render page.'
            }
          };
        }

        function downloadStyleZip(payload) {
          const baseName = payload.export_id || `${payload.slug || 'dig-style'}.customstyle-${formatPaletteTimestamp()}`;
          const zip = makeZip([
            { name: `${baseName}.json`, content: JSON.stringify(payload, null, 2) + '\\n' },
            { name: `${baseName}.style-contract.yaml`, content: `${payload.style_contract || ''}\\n` },
            { name: `${baseName}.tokens.css`, content: `${payload.css || ''}\\n` },
            { name: `${baseName}.dark.tokens.css`, content: `${payload.theme_css?.dark || ''}\\n` }
          ]);
          const url = URL.createObjectURL(zip);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${baseName}.zip`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 0);
        }

        function initStyleLab() {
          const lab = document.querySelector('[data-style-lab]');
          if (!lab) return;
          styleLabBaseTokens = {
            light: parseStyleTokenCss(lab.getAttribute('data-style-token-block') || ''),
            dark: parseStyleTokenCss(lab.getAttribute('data-style-dark-token-block') || '')
          };
          lab.querySelectorAll('[data-style-input]').forEach(input => {
            input.addEventListener('change', () => setStyleLabRole(input.getAttribute('data-style-input'), input.value));
            input.addEventListener('keyup', () => {
              if (normalizeHex(input.value)) setStyleLabRole(input.getAttribute('data-style-input'), input.value);
            });
          });
          lab.querySelectorAll('[data-style-color]').forEach(input => {
            input.addEventListener('input', () => setStyleLabRole(input.getAttribute('data-style-color'), input.value));
          });
          root.addEventListener('dig-ui-style-theme-change', updateStyleLabState);
          const copyButton = lab.querySelector('[data-style-copy]');
          if (copyButton) {
            copyButton.addEventListener('click', async () => {
              const mode = getStyleLabMode();
              const sourceCss = mode === 'dark'
                ? (lab.getAttribute('data-style-dark-token-block') || '')
                : (lab.getAttribute('data-style-token-block') || '');
              const tokens = { ...styleLabBaseTokens[mode], ...styleLabOverrides[mode] };
              const copied = await copyPaletteTokens(buildStyleTokenCss(tokens, sourceCss));
              const activeLang = localStorage.getItem('dig-ui-lang') || 'zh';
              copyButton.dataset.copyState = copied ? 'success' : 'error';
              copyButton.textContent = copied
                ? (activeLang === 'zh' ? '已复制' : 'Copied')
                : (activeLang === 'zh' ? '复制不可用' : 'Copy unavailable');
              window.setTimeout(() => {
                delete copyButton.dataset.copyState;
                setLanguage(activeLang);
              }, 1200);
            });
          }
          const exportButton = lab.querySelector('[data-style-export]');
          if (exportButton) {
            exportButton.addEventListener('click', () => {
              const activeLang = localStorage.getItem('dig-ui-lang') || 'zh';
              const payload = buildStyleExportPayload(lab);
              downloadStyleZip(payload);
              exportButton.dataset.exportState = 'success';
              exportButton.textContent = activeLang === 'zh' ? '已导出' : 'Exported';
              window.setTimeout(() => {
                delete exportButton.dataset.exportState;
                setLanguage(activeLang);
              }, 1200);
            });
          }
          updateStyleLabState();
        }

        function initPaletteLab() {
          const lab = document.querySelector('[data-palette-lab]');
          if (!lab) return;

          lab.querySelectorAll('[data-palette-input]').forEach(input => {
            input.addEventListener('change', () => {
              setPaletteRole(input.getAttribute('data-palette-input'), input.value);
            });
            input.addEventListener('keyup', () => {
              if (normalizeHex(input.value)) {
                setPaletteRole(input.getAttribute('data-palette-input'), input.value);
              }
            });
          });

          lab.querySelectorAll('[data-palette-color]').forEach(input => {
            input.addEventListener('input', () => setPaletteRole(input.getAttribute('data-palette-color'), input.value));
          });

          lab.querySelectorAll('[data-palette-candidate]').forEach(button => {
            button.addEventListener('click', () => {
              lab.querySelectorAll('[data-palette-candidate]').forEach(item => item.classList.remove('active'));
              button.classList.add('active');
              setPaletteRoles({
                [button.getAttribute('data-role')]: button.getAttribute('data-value'),
                supportStrong: button.getAttribute('data-strong')
              });
            });
          });

          const copyButton = lab.querySelector('[data-palette-copy]');
          if (copyButton) {
            copyButton.addEventListener('click', async () => {
              const tokenCss = buildPaletteTokenCss();
              const copied = await copyPaletteTokens(tokenCss);
              const activeLang = localStorage.getItem('dig-ui-lang') || 'zh';
              copyButton.dataset.copyState = copied ? 'success' : 'error';
              copyButton.textContent = copied
                ? (activeLang === 'zh' ? '已复制' : 'Copied')
                : (activeLang === 'zh' ? '复制不可用' : 'Copy unavailable');
              window.setTimeout(() => {
                delete copyButton.dataset.copyState;
                setLanguage(activeLang);
              }, 1200);
            });
          }

          const exportButton = lab.querySelector('[data-palette-export]');
          if (exportButton) {
            exportButton.addEventListener('click', () => {
              const activeLang = localStorage.getItem('dig-ui-lang') || 'zh';
              const payload = buildPaletteExportPayload(lab);
              downloadPaletteZip(payload);
              exportButton.dataset.exportState = 'success';
              exportButton.textContent = activeLang === 'zh' ? '已导出' : 'Exported';
              window.setTimeout(() => {
                delete exportButton.dataset.exportState;
                setLanguage(activeLang);
              }, 1200);
            });
          }

          updatePaletteLabState();
        }

        // Dynamic Token Visualizer
        refreshTokenVisualizers();
        initPaletteLab();
        initStyleLab();
        initStyleTheme();
      });"""
            if "// Dynamic Token Visualizer" in html_content:
                html_content = re.sub(
                    r'<script>\s*// Dynamic Token Visualizer.*?</script>',
                    f'<script>\n{bilingual_js}\n    </script>',
                    html_content,
                    flags=re.DOTALL
                )
            else:
                html_content = html_content.replace("</body>", f"<script>\n{bilingual_js}\n    </script>\n  </body>")

        default_theme = parse_render_setting(md_content, "default_theme") if category_slug == "styles" else ""
        if category_slug == "styles" and default_theme == "dark":
            html_content = re.sub(r'\sdata-style-theme="[^"]*"', "", html_content, count=1)
            html_content = html_content.replace("<html ", '<html data-style-theme="dark" ', 1)

        html_content = re.sub(
            r'<body[^>]*>',
            f'<body data-render-archetype="{escape_attr(render_archetype)}" data-render-canvas="{escape_attr(render_canvas)}" data-style-theme-default="{escape_attr(default_theme)}">',
            html_content,
            count=1
        )
        html_content = re.sub(r"[ \t]+\n", "\n", html_content)

        # Save HTML page
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Synced & Bilingualized: renders/{category_slug}/{brand_slug}.html")

    # 5. Synchronize catalogData registry. Full sync rewrites from disk; target sync
    # merges only the compiled catalog so the central handbook stays discoverable.
    index_html_file = os.path.join(RENDER_DIR, "index.html")
    if os.path.exists(index_html_file):
        print("🔄 Updating central handbook catalogData registry in renders/index.html...")
        write_catalog_registry(index_html_file, catalog_data, target_catalog=target_catalog)
        print("🎉 Central handbook registry index.html updated successfully!")

    print("🎉 Sync completed successfully! All previews are perfectly aligned bilingually.")

if __name__ == "__main__":
    main()
