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

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_DIR = os.path.join(PROJECT_DIR, "references", "catalogs")
RENDER_DIR = os.path.join(PROJECT_DIR, "renders")

def clean_description(desc):
    if not desc:
        return ""
    desc = desc.strip()
    if desc.startswith('|') or desc.startswith('>'):
        desc = desc[1:].strip()
    desc = re.sub(r'\s+', ' ', desc)
    return desc.strip()

def google_translate(text, target_lang='zh-CN', source_lang='auto'):
    if not text:
        return ""
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

def main():
    target_catalog = sys.argv[1] if len(sys.argv) > 1 else None
    
    # Find markdown files
    md_files = []
    if target_catalog:
        target_slug = target_catalog.replace(".md", "")
        # Recursively search for target slug
        for root, dirs, files in os.walk(CATALOG_DIR):
            for file in files:
                if file.endswith(".md") and file[:-3] == target_slug:
                    md_files.append(os.path.join(root, file))
        if not md_files:
            print(f"❌ Error: Cannot find catalogs file for '{target_catalog}'")
            sys.exit(1)
        print(f"🎯 Target set to: {target_slug}")
    else:
        for root, dirs, files in os.walk(CATALOG_DIR):
            for file in files:
                if file.endswith(".md"):
                    md_files.append(os.path.join(root, file))

    print(f"🔄 Starting compilation & synchronization of {len(md_files)} catalogs...")

    # Data registry for updating index.html catalogData
    catalog_data = {
        "ai-llm": {"name": "AI & LLM Platforms", "brands": []},
        "dev-tools": {"name": "Developer Tools & IDEs", "brands": []},
        "devops": {"name": "Backend, Database & DevOps", "brands": []},
        "saas": {"name": "Productivity & SaaS", "brands": []},
        "creative-tools": {"name": "Design & Creative Tools", "brands": []},
        "fintech": {"name": "Fintech & Crypto", "brands": []},
        "ecommerce": {"name": "E-commerce & Retail", "brands": []},
        "media-consumer": {"name": "Media & Consumer Tech", "brands": []},
        "automotive": {"name": "Automotive", "brands": []},
        "other": {"name": "General / Core Layouts", "brands": []}
    }

    for md_file in md_files:
        rel_path = os.path.relpath(md_file, CATALOG_DIR)
        category_slug = os.path.dirname(rel_path)
        brand_slug = os.path.basename(md_file)[:-3]
        
        # HTML preview path matching category hierarchy
        html_file = os.path.join(RENDER_DIR, rel_path[:-3] + ".html")
        
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
                        if f.endswith(".html") and f not in ["index.html", "README.html", "dig-coin-loader.html"]:
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

        # Load MD content
        with open(md_file, "r", encoding="utf-8") as f:
            md_content = f.read()
            
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
                if line.strip():
                    tokens_block.append("        " + line.strip())
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

        # Register brand in catalog data
        keywords_zh = description_to_sentences(description_zh)
        keywords_en = description_to_sentences(description_en)
        if category_slug in catalog_data:
            catalog_data[category_slug]["brands"].append({
                "slug": brand_slug,
                "name": brand_name,
                "name_zh": brand_name_zh,
                "name_en": brand_name_en,
                "accent": accent_color,
                "bg": bg_color,
                "keywords_zh": keywords_zh,
                "keywords_en": keywords_en,
                "link": f"./{category_slug}/{brand_slug}.html"
            })

        # 3. Read and upgrade HTML content
        with open(html_file, "r", encoding="utf-8") as f:
            html_content = f.read()
            
        # Parse existing color-scheme from HTML if present
        color_scheme = "color-scheme: dark;"
        cs_match = re.search(r'color-scheme:\s*[a-zA-Z]*;', html_content)
        if cs_match:
            color_scheme = cs_match.group(0)
        elif "light" in brand_slug.lower() or "canvas: \"#fff" in md_content.lower():
            color_scheme = "color-scheme: light;"

        # Update root variables block using regex
        root_pattern = r'(:root\s*\{)[^}]*(\})'
        root_replace = f"\\1\n        {color_scheme}\n{tokens_str}\n    \\2"
        html_content = re.sub(root_pattern, root_replace, html_content)

        # Update title tag
        html_content = re.sub(r'<title>.*?</title>', f'<title>Dig UI {brand_name} Render</title>', html_content)

        # Update eyebrow tag
        html_content = re.sub(
            r'<span class="eyebrow">.*?Catalog / Dig UI</span>',
            f'<span class="eyebrow"><span class="brand-name-label">{brand_name}</span> Catalog / Dig UI</span>',
            html_content
        )

        # Update H1 headline
        html_content = re.sub(r'<h1>.*?</h1>', f'<h1 class="brand-title-h1">{brand_name}</h1>', html_content)

        # Update description <p> (supports data-zh and data-en translation attributes)
        html_content = re.sub(
            r'</h1>\s*<p class="brand-description-p"[^>]*>.*?</p>',
            f'</h1>\n          <p class="brand-description-p" data-zh="{description_zh}" data-en="{description_en}">{description_zh}</p>',
            html_content
        )
        html_content = re.sub(
            r'</h1>\s*<p>.*?</p>',
            f'</h1>\n          <p class="brand-description-p" data-zh="{description_zh}" data-en="{description_en}">{description_zh}</p>',
            html_content
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

        # Inject switcher capsule CSS if not present
        if ".lang-switch-capsule" not in html_content:
            switcher_css = """
      /* Floating Language Switcher */
      .lang-switch-capsule {
        position: fixed;
        top: 24px;
        right: 24px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: var(--dig-surface-elevated, rgba(20, 39, 53, 0.85));
        border: 1px solid var(--dig-border, rgba(138, 160, 178, 0.2));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        padding: 4px 8px;
        border-radius: 99px;
        box-shadow: var(--dig-shadow-soft, 0 8px 32px rgba(0, 0, 0, 0.15));
        z-index: 9999;
      }
      .lang-btn {
        background: transparent;
        border: none;
        color: var(--dig-text-soft, #62798c);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        padding: 4px 10px;
        border-radius: 99px;
        transition: all 0.2s ease;
        font-family: var(--dig-font-sans), sans-serif;
      }
      .lang-btn.active {
        background: var(--dig-accent, #37d67a);
        color: var(--dig-bg, #0f1115);
      }
      .lang-btn:hover:not(.active) {
        color: var(--dig-text, #ecf3f8);
      }
      .lang-split {
        color: var(--dig-border-strong, rgba(138, 160, 178, 0.3));
        font-size: 12px;
        user-select: none;
      }
    </style>"""
            html_content = html_content.replace("</style>", switcher_css)

        # Inject switcher capsule HTML if not present
        if "class=\"lang-switch-capsule\"" not in html_content:
            switcher_html = """<body>
    <!-- Floating Language Switcher Capsule -->
    <div class="lang-switch-capsule">
      <button class="lang-btn" data-lang="zh">中</button>
      <span class="lang-split">/</span>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>"""
            html_content = html_content.replace("<body>", switcher_html)

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
          btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
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

        // Dynamic Token Visualizer
        const rootStyles = getComputedStyle(document.documentElement);
        document.querySelectorAll('.token-val').forEach(el => {
          const tokenName = el.getAttribute('data-token');
          if (tokenName) {
            let value = rootStyles.getPropertyValue(tokenName).trim();
            if (value) {
              if (value.startsWith('#')) {
                value = value.toUpperCase();
              }
              el.textContent = value;
            }
          }
        });
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

        # Save HTML page
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Synced & Bilingualized: renders/{category_slug}/{brand_slug}.html")

    # 5. Synchronize catalogData Registry inside index.html if compiling all
    if not target_catalog:
        index_html_file = os.path.join(RENDER_DIR, "index.html")
        if os.path.exists(index_html_file):
            print("🔄 Re-generating central handbook catalogData registry in renders/index.html...")
            with open(index_html_file, "r", encoding="utf-8") as f:
                index_content = f.read()

            catalog_json = json.dumps(catalog_data, ensure_ascii=False)
            
            # Update the const catalogData block
            index_content_updated = re.sub(
                r'const catalogData = \{.*?\};',
                f'const catalogData = {catalog_json};',
                index_content,
                flags=re.DOTALL
            )

            # Also update the global count calculation if needed, but it's computed dynamically in JavaScript!
            with open(index_html_file, "w", encoding="utf-8") as f:
                f.write(index_content_updated)
            print("🎉 Central handbook registry index.html updated successfully!")

    print("🎉 Sync completed successfully! All previews are perfectly aligned bilingually.")

if __name__ == "__main__":
    main()
