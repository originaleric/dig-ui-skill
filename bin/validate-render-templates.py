#!/usr/bin/env python3
"""Dependency-free regressions for generated chart semantics and data parity.

Run with the oldest supported Python as well as the current interpreter; loading
the generator is deliberate so unsupported syntax fails before any tests run.
"""
import contextlib
import html
import io
import json
import re
import runpy
import shutil
import subprocess
import sys
import unittest
import xml.etree.ElementTree as ET
from datetime import date, timedelta
from pathlib import Path
from tempfile import TemporaryDirectory


ROOT = Path(__file__).resolve().parent.parent
GENERATOR = runpy.run_path(str(ROOT / "sync_renders.py"))
MONOCHROME_ROLES = [
    "--dig-on-accent", "--dig-chart-line", "--dig-chart-fill",
    "--dig-field-line", "--dig-field-node", "--dig-field-halo",
]
CHILD_STYLE_SOURCE = """---
slug: paper-infographic
name_en: Child fixture
name_zh: 子风格样例
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
extends: cozy-arcade
description_en: Child fixture
description_zh: 子风格样例
render:
  archetype: token-sheet
---

## Style Contract

```yaml
best_for:
  - validation
avoid_for:
  - production
```

## Dig UI Shared Tokens

```css
--dig-radius-md: 10px;
```

## Dig UI CSS Tokens

```css
--dig-bg: #f5edd8;
--dig-bg-soft: #f0e3c6;
--dig-accent: #efbb41;
--dig-on-accent: #292119;
```
"""


class StyleTokenContractTests(unittest.TestCase):
    def test_canonical_styles_remain_valid(self):
        for source in (ROOT / "references/catalogs/styles").glob("*.md"):
            if not GENERATOR["is_canonical_catalog_markdown"](source.name):
                continue
            with self.subTest(style=source.stem):
                GENERATOR["validate_palette_contract"](
                    source.read_text(), "styles", source.stem, str(source))

    def test_monochrome_requires_each_role_in_each_theme(self):
        source = (ROOT / "references/catalogs/styles/monochrome.md").read_text()
        for mode, heading in [("light", "Dig UI CSS Tokens"), ("dark", "Dig UI Dark Tokens")]:
            block = GENERATOR["extract_fenced_code_block_from_section"](source, heading, "css")
            for token in MONOCHROME_ROLES:
                for value in [None, "", "~"]:
                    with self.subTest(mode=mode, token=token, value=value):
                        replacement = "" if value is None else token + ": " + value + ";"
                        broken, count = re.subn(re.escape(token) + r":\s*[^;]*;", replacement, block)
                        self.assertEqual(count, 1)
                        output = io.StringIO()
                        with contextlib.redirect_stdout(output), self.assertRaises(SystemExit):
                            GENERATOR["validate_palette_contract"](
                                source.replace(block, broken), "styles", "monochrome", "in-memory.md")
                        self.assertIn(mode + " theme missing token role", output.getvalue())
                        self.assertIn(token, output.getvalue())

    def test_child_artifacts_share_effective_themes(self):
        resolved = GENERATOR["resolve_child_styles"](
            ROOT / "references/catalogs", ROOT / "references/style-sources"
        )
        GENERATOR["validate_style_preview_sources"](ROOT / "references/catalogs", ROOT / "renders", resolved)
        hub = GENERATOR["parse_existing_catalog_data"]((ROOT / "renders/index.html").read_text())
        effect_html = (ROOT / "renders/effects/index.html").read_text()
        effect_data = json.loads(re.search(
            r'<script id="effect-data" type="application/json">(.*?)</script>', effect_html, re.DOTALL
        ).group(1))
        themes = {theme["id"]: theme["theme_tokens"] for theme in effect_data["themes"]}
        for path, (parent_slug, expected) in resolved.items():
            with self.subTest(child=path.stem):
                self.assertTrue(path.is_file(), f"Missing generated style {path}")
                self.assertEqual(path.read_text(), expected, f"Rebuild stale generated style {path}")
                item, = [entry for entry in hub["styles"]["items"] if entry["slug"] == path.stem]
                self.assertEqual(item["derived_from"], parent_slug)
                self.assertEqual(item["link"], f"./styles/{path.stem}.html")
                light, _ = GENERATOR["style_theme_tokens"](expected)
                self.assertEqual((item["bg"], item["accent"]), (light["--dig-bg"], light["--dig-accent"]))
                for slug in (parent_slug, path.stem):
                    source = path.with_name(f"{slug}.md").read_text()
                    preview = (ROOT / f"renders/styles/{slug}.html").read_text()
                    expected_modes = GENERATOR["style_theme_tokens"](source)
                    for mode, attr, expected_tokens in zip(
                        ("light", "dark"), ("data-style-token-block", "data-style-dark-token-block"), expected_modes
                    ):
                        block = html.unescape(re.search(rf'{attr}="([^"]*)"', preview).group(1))
                        self.assertEqual(GENERATOR["parse_css_tokens"](block), expected_tokens, f"{slug} {mode} preview")
                        self.assertEqual(themes[slug][mode], expected_tokens, f"{slug} {mode} Effects Lab")

    def test_child_preview_preserves_literal_names_and_descriptions(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ("sync_renders.py", "renders/other/dig.html", "renders/index.html",
                         "references/catalogs/styles/cozy-arcade.md"):
                destination = root / name
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / name, destination)
            author = root / "references/style-sources/paper-infographic.md"
            author.parent.mkdir()
            name = r"Fixture \1 & Notes"
            preview_path = root / "renders/styles/paper-infographic.html"
            for description in (r"Read C:\temp\notes.", r"Read C:\icons\grid."):
                with self.subTest(description=description):
                    author.write_text(CHILD_STYLE_SOURCE.replace("name_en: Child fixture", f"name_en: {name}")
                                      .replace("description_en: Child fixture", f"description_en: {description}"),
                                      encoding="utf-8")
                    built = subprocess.run(
                        [sys.executable, "-B", str(root / "sync_renders.py"), author.stem],
                        capture_output=True, text=True,
                    )
                    self.assertEqual(built.returncode, 0, built.stdout + built.stderr)
                    preview = preview_path.read_text(encoding="utf-8")
                    self.assertIn(f"<title>Dig UI {html.escape(name)} Render</title>", preview)
                    for css_class, value in (("brand-name-label", name), ("brand-title-h1", name),
                                             ("brand-description-p", description)):
                        match = re.search(rf'class="{css_class}"[^>]*\bdata-en="([^"]*)"', preview)
                        self.assertIsNotNone(match, css_class)
                        self.assertEqual(html.unescape(match[1]), value)
                    if description == r"Read C:\temp\notes.":
                        # The next rebuild must also repair a preview with an old interpreted newline.
                        preview_path.write_text(preview.replace(html.escape(name), "Old\nname")
                                                .replace("子风格样例</p>", "Old\ndescription</p>"), encoding="utf-8")

    def test_child_build_preserves_multiline_css_and_rejects_a_missing_delimiter(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            styles = root / "references/catalogs/styles"
            sources = root / "references/style-sources"
            (root / "renders/other").mkdir(parents=True)
            styles.mkdir(parents=True)
            sources.mkdir()
            for name in ("sync_renders.py", "renders/other/dig.html", "renders/index.html"):
                shutil.copyfile(ROOT / name, root / name)
            parent = (ROOT / "references/catalogs/styles/cozy-arcade.md").read_text()
            parent_modes = GENERATOR["style_theme_tokens"](parent)
            parent_light = GENERATOR["extract_fenced_code_block_from_section"](parent, "Dig UI CSS Tokens", "css")
            (styles / "cozy-arcade.md").write_text(parent.replace(
                parent_light,
                parent_light + '\n/* --dig-leading-normal: 5; */\n'
                '--dig-label: "/* literal {}; --dig-leading-normal: 6; */";',
                1,
            ))
            author = sources / "paper-infographic.md"
            source = CHILD_STYLE_SOURCE
            command = [sys.executable, "-B", str(root / "sync_renders.py"), "paper-infographic"]
            index_file = root / "renders/index.html"
            original_index = index_file.read_bytes()
            for malformed in ("#f5edd8\n--dig-bg-soft:", "#f5edd8 --dig-bg-soft:"):
                author.write_text(source.replace("#f5edd8;\n--dig-bg-soft:", malformed, 1))
                failed = subprocess.run(command, capture_output=True, text=True)
                self.assertNotEqual(failed.returncode, 0)
                self.assertIn("missing a semicolon after --dig-bg", failed.stdout)
                self.assertFalse((styles / author.name).exists())
                self.assertEqual(index_file.read_bytes(), original_index)
            value = "rgb(\n  239 187 65\n)"
            author.write_text(source.replace("--dig-accent: #efbb41;", f"--dig-accent: {value};", 1))
            built = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(built.returncode, 0, built.stdout + built.stderr)
            catalog = GENERATOR["parse_existing_catalog_data"](index_file.read_text())
            previous = GENERATOR["parse_existing_catalog_data"](original_index.decode("utf-8"))
            self.assertEqual(catalog["other"], previous["other"])
            item, = [entry for entry in catalog["styles"]["items"] if entry["slug"] == author.stem]
            self.assertEqual(item["accent"], value)
            preview = (root / "renders/styles/paper-infographic.html").read_text()
            self.assertRegex(preview, r"--dig-accent: rgb\(\s*239 187 65\s*\);")
            light, dark = GENERATOR["style_theme_tokens"]((styles / author.name).read_text())
            for tokens, inherited in zip((light, dark), parent_modes):
                self.assertEqual(tokens["--dig-leading-normal"], inherited["--dig-leading-normal"])
                self.assertEqual(tokens["--dig-label"], '"/* literal {}; --dig-leading-normal: 6; */"')
            rerun = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(rerun.returncode, 0, rerun.stdout + rerun.stderr)
            self.assertEqual((root / "renders/styles/paper-infographic.html").read_text(), preview)

            author.unlink()
            (styles / author.name).unlink()
            (root / "renders/styles/paper-infographic.html").unlink()
            rebuilt = subprocess.run([*command[:-1], "cozy-arcade"], capture_output=True, text=True)
            self.assertEqual(rebuilt.returncode, 0, rebuilt.stdout + rebuilt.stderr)
            styles_index = GENERATOR["parse_existing_catalog_data"](index_file.read_text())["styles"]
            self.assertEqual([entry["slug"] for entry in styles_index["items"]], ["cozy-arcade"])
            self.assertEqual(styles_index["items"], styles_index["brands"])

    def test_retired_style_preview_is_reported_and_preserved(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            previews = root / "renders/styles"
            previews.mkdir(parents=True)
            preview = previews / "retired.html"
            preview.write_text("old generated preview")
            output = io.StringIO()
            with contextlib.redirect_stdout(output), self.assertRaises(SystemExit):
                GENERATOR["validate_style_preview_sources"](root / "references/catalogs", root / "renders", {})
            self.assertIn("renders/styles/retired.html", output.getvalue())
            self.assertEqual(preview.read_text(), "old generated preview")

    def test_style_build_rejects_unterminated_comments_before_writing_outputs(self):
        with TemporaryDirectory() as directory:
            root = Path(directory)
            styles = root / "references/catalogs/styles"
            source_dir = root / "references/style-sources"
            (root / "renders/other").mkdir(parents=True)
            styles.mkdir(parents=True)
            source_dir.mkdir()
            for name in ("sync_renders.py", "renders/other/dig.html", "renders/index.html",
                         "references/catalogs/styles/cozy-arcade.md", "references/catalogs/styles/monochrome.md"):
                shutil.copyfile(ROOT / name, root / name)
            (source_dir / "paper-infographic.md").write_text(CHILD_STYLE_SOURCE)
            command = [sys.executable, "-B", str(root / "sync_renders.py")]
            parent = styles / "cozy-arcade.md"
            original = parent.read_text()
            light_heading = "Dig UI CSS Tokens"
            example = "\n".join(("~~~~markdown", "```css", "--dig-leading-normal: 5;", "```", "~~~~"))
            parent.write_text(original.replace(f"## {light_heading}\n", f"## {light_heading}\n\n{example}\n", 1))
            built = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(built.returncode, 0, built.stdout + built.stderr)
            child = styles / "paper-infographic.md"
            self.assertEqual(
                GENERATOR["style_theme_tokens"](child.read_text())[0]["--dig-leading-normal"],
                GENERATOR["style_theme_tokens"](original)[0]["--dig-leading-normal"],
            )
            outputs = [child, *(root / "renders").rglob("*.html")]
            snapshot = {file: file.read_bytes() for file in outputs}

            author = source_dir / child.name
            for file, heading, slug in (
                (parent, light_heading, "cozy-arcade"),
                (parent, "Dig UI Dark Tokens", "paper-infographic"),
                (author, "Dig UI Shared Tokens", "paper-infographic"),
                (styles / "monochrome.md", light_heading, None),
            ):
                with self.subTest(source=file.name, heading=heading):
                    original = file.read_text()
                    block = GENERATOR["extract_fenced_code_block_from_section"](original, heading, "css")
                    self.assertTrue(block)
                    file.write_text(original.replace(block, block + "\n/* --dig-leading-normal: 5;", 1))
                    if not slug:
                        # A pending child edit would update its generated Markdown during a normal build.
                        author.write_text(author.read_text().replace("## Style Contract", "Pending edit.\n\n## Style Contract", 1))
                    failed = subprocess.run(command + ([slug] if slug else []), capture_output=True, text=True)
                    self.assertNotEqual(failed.returncode, 0)
                    self.assertIn(file.name, failed.stdout)
                    self.assertIn(f"## {heading}: unterminated CSS comment", failed.stdout)
                    self.assertEqual({path: path.read_bytes() for path in outputs}, snapshot)
                    file.write_text(original)

    def test_sparse_child_uses_frozen_parent_modes(self):
        parent = (ROOT / "references/catalogs/styles/cozy-arcade.md").read_text()
        source = """---
slug: sparse-child
name_en: Sparse Child
name_zh: 子风格
status: draft
description_en: Test style
description_zh: 测试风格
kind: style-catalog
category: styles
token_contract: style_v1
extends: cozy-arcade
---

## Style Contract

```yaml
best_for:
  - short reports
avoid_for:
  - mascot scenes
source_reference: {}
shape_language:
  radius: "Small panels."
```

## Dig UI Shared Tokens

```css
--dig-stroke-width: 1px;
```

## Dig UI CSS Tokens

```css
--dig-radius-md: 10px;
```
"""
        compiled = GENERATOR["compile_child_style"](source, parent, "cozy-arcade")
        light, dark = GENERATOR["style_theme_tokens"](compiled)
        self.assertEqual((light["--dig-radius-md"], dark["--dig-radius-md"]), ("10px", "16px"))
        self.assertEqual((light["--dig-stroke-width"], dark["--dig-stroke-width"]), ("1px", "1px"))
        self.assertIn('  depth: "Chunky offset shadows', compiled)
        self.assertIn("source_reference: {}", compiled)
        self.assertIn("render:\n  archetype: mobile-game-companion", compiled)
        self.assertNotIn("gamified fitness", compiled)
        cleared = source.replace("source_reference: {}", "source_reference: {}\naccessibility: {}")
        compiled = GENERATOR["compile_child_style"](cleared, parent, "cozy-arcade")
        self.assertIn("accessibility: {}", compiled)
        self.assertNotIn("target_size:", compiled)

        switched = source.replace("extends: cozy-arcade", "extends: cozy-arcade\nrender:\n  archetype: token-sheet")
        linked_parent = parent.replace("0 6px 0 #2c211c", "0 6px 0 var(--dig-game-on-accent)")
        linked_parent = linked_parent.replace("--dig-game-on-accent: #ffffff", "--dig-game-on-accent: var(--dig-mascot-face)")
        compiled = GENERATOR["compile_child_style"](switched, linked_parent, "cozy-arcade")
        self.assertNotIn("page_type: mobile-consumer", compiled)
        for tokens in GENERATOR["style_theme_tokens"](compiled):
            self.assertEqual(tokens["--dig-game-on-accent"], "var(--dig-mascot-face)")
            self.assertIn("--dig-mascot-face", tokens)
            self.assertNotIn("--dig-game-sky-start", tokens)

    def test_invalid_child_relationships_and_missing_roles(self):
        parent = (ROOT / "references/catalogs/styles/cozy-arcade.md").read_text()
        child = CHILD_STYLE_SOURCE
        for failure, expected in (
            ("missing", "missing parent"),
            ("self", "cannot extend itself"),
            ("cross-type", "must be a public style-catalog"),
            ("nested", "only one level"),
            ("duplicate", "duplicate catalog slug"),
            ("invalid-parent", "dark theme missing token role '--dig-danger'"),
            ("required-child-role", "missing token role '--dig-on-accent'"),
        ):
            with self.subTest(failure=failure), TemporaryDirectory() as directory:
                root = Path(directory)
                catalogs = root / "catalogs"
                styles = catalogs / "styles"
                sources = root / "style-sources"
                (catalogs / "other").mkdir(parents=True)
                styles.mkdir()
                sources.mkdir()
                parent_path = (catalogs / "other" if failure == "cross-type" else styles) / "cozy-arcade.md"
                if failure == "invalid-parent":
                    dark = GENERATOR["extract_fenced_code_block_from_section"](parent, "Dig UI Dark Tokens", "css")
                    parent_to_write = parent.replace(dark, re.sub(r"--dig-danger:\s*[^;]*;", "", dark), 1)
                else:
                    parent_to_write = parent
                if failure != "missing":
                    parent_path.write_text(parent_to_write)
                if failure == "self":
                    child_to_write = child.replace("extends: cozy-arcade", "extends: paper-infographic")
                elif failure == "nested":
                    (sources / "outer.md").write_text(child.replace("slug: paper-infographic", "slug: outer"))
                    child_to_write = child.replace("extends: cozy-arcade", "extends: outer")
                elif failure == "required-child-role":
                    child_to_write = re.sub(r"--dig-on-accent:[^;]*;", "", child)
                    child_to_write = child_to_write.replace("archetype: token-sheet", "archetype: monochrome-workspace")
                else:
                    child_to_write = child
                if failure == "duplicate":
                    # Mentioning the generated notice in the body does not assign ownership.
                    (styles / "paper-infographic.md").write_text(child + "\n" + GENERATOR["GENERATED_STYLE_NOTICE"] + "\n")
                (sources / "paper-infographic.md").write_text(child_to_write)
                output = io.StringIO()
                with contextlib.redirect_stdout(output), self.assertRaises(SystemExit):
                    GENERATOR["resolve_child_styles"](catalogs, sources)
                self.assertIn("paper-infographic", output.getvalue())
                self.assertIn(expected, output.getvalue())


class MonochromeTemplateTests(unittest.TestCase):
    def setUp(self):
        self.sample = GENERATOR["build_monochrome_section"]()

    def test_chart_names_descriptions_and_data_agree(self):
        for period, days in [("week", 7), ("month", 30)]:
            with self.subTest(period=period):
                fragment = self.sample.split('data-range="' + period + '">', 1)[1]
                fragment = fragment.split("</details>", 1)[0]
                svg = ET.fromstring(re.search(r'<svg class="mc-chart".*?</svg>', fragment, re.S).group())
                self.assertEqual(svg.get("role"), "img")
                self.assertIsNone(svg.get("aria-hidden"))
                title, description = svg.find("title"), svg.find("desc")
                self.assertEqual(svg.get("aria-labelledby"), title.get("id"))
                self.assertEqual(svg.get("aria-describedby"), description.get("id"))
                rows = re.findall(r'<th scope="row">([\d-]+)</th><td>(\d+)</td>', fragment)
                self.assertEqual(len(rows), days)
                dates = [date.fromisoformat(day) for day, _ in rows]
                values = [int(value) for _, value in rows]
                self.assertTrue(all(b - a == timedelta(days=1) for a, b in zip(dates, dates[1:])))
                total = int(re.search(r'<p class="mc-chart-total"><strong>(\d+)</strong>', fragment).group(1))
                self.assertEqual(total, sum(values))
                for language in ["data-zh", "data-en"]:
                    self.assertIn(str(days), title.get(language))
                    for value in [dates[0].isoformat(), dates[-1].isoformat(), total, min(values), max(values)]:
                        self.assertIn(str(value), description.get(language))
                # Every curve endpoint represents the same daily value as the
                # accessible table, within the fixed 0..40 chart domain.
                curve = svg.find("path[@class='mc-line']").get("d")
                coordinates = re.findall(r'([MC])([\d. ]+)', curve)
                plotted = [list(map(float, numbers.split()))[-2:] for _, numbers in coordinates]
                self.assertEqual(len(plotted), days)
                for i, ((x, y), value) in enumerate(zip(plotted, values)):
                    self.assertAlmostEqual(x, 36 + 354 * i / (days - 1), places=2)
                    self.assertEqual(y, 190 - 4 * value)
                    self.assertTrue(0 <= value <= 40)

    def test_week_is_the_last_seven_days_of_month(self):
        tables = re.findall(r'<tbody>(.*?)</tbody>', self.sample, re.S)
        rows = [re.findall(r'<tr>.*?</tr>', table) for table in tables]
        self.assertEqual(rows[0], rows[1][-7:])

    def test_accessible_ids_are_unique_and_graphics_stay_distinct(self):
        ids = re.findall(r'\bid="([^"]+)"', self.sample)
        self.assertEqual(len(ids), len(set(ids)))
        self.assertIn('<svg viewBox="0 0 720 320" aria-hidden="true"', self.sample)
        self.assertEqual(self.sample.count('class="mc-chart-period"'), 2)
        self.assertEqual(self.sample.count('class="mc-chart"'), 2)


if __name__ == "__main__":
    unittest.main()
