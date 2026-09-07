#!/usr/bin/env python3
"""Dependency-free regressions for generated chart semantics and data parity.

Run with the oldest supported Python as well as the current interpreter; loading
the generator is deliberate so unsupported syntax fails before any tests run.
"""
import contextlib
import io
import re
import runpy
import unittest
import xml.etree.ElementTree as ET
from datetime import date, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
GENERATOR = runpy.run_path(str(ROOT / "sync_renders.py"))
MONOCHROME_ROLES = [
    "--dig-on-accent", "--dig-chart-line", "--dig-chart-fill",
    "--dig-field-line", "--dig-field-node", "--dig-field-halo",
]


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
