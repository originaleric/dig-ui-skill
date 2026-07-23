---
slug: quant-signal-console
name: Quant Signal Console
name_zh: 量化信号控制台
name_en: Quant Signal Console
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 一套从用户截图归纳出的高密度实时信号控制台风格，适合预测市场、量化交易、AI agent 调度、仿真监控和实时决策系统。
description_en: A dense real-time signal console style distilled from user-provided screenshots, suited for prediction markets, quant trading, AI agent orchestration, simulation monitoring, and real-time decision systems.
render:
  archetype: signal-ops-console
  page_type: execution
  density: compact
  canvas: theme-dual
---

# Quant Signal Console / 量化信号控制台

## Overview

Quant Signal Console is a style-first catalog for dense, real-time decision systems. It should not be reduced to "white Bloomberg screen" or "black terminal." The style survives across two theme modes: a paper-light research console and a terminal-dark trading desk. Its core is the language of live signals, tiny monospace labels, dot-matrix numerals, order books, topology graphs, charts, tape strips, and agent execution pipelines.

量化信号控制台是一套用于高密度实时系统的 style-first catalog。它的本体不是白底或黑底，而是“实时信号 + 量化仪表 + agent 调度 + 仿真执行”的视觉语法。Light 模式更像纸面研究报告和实验室控制台；dark 模式更像夜盘交易终端和实时监控屏。

## Style Contract

```yaml
best_for:
  - prediction market terminal
  - quant trading dashboard
  - AI agent ops console
  - market simulation
  - realtime signal scanner
  - order book and execution cockpit
  - dense analytics cockpit
avoid_for:
  - consumer onboarding
  - lifestyle marketing
  - playful mascot flow
  - low-density SaaS landing page
  - editorial storytelling
mood:
  - realtime
  - analytical
  - instrumented
  - tactical
  - data-dense
  - simulation-driven
source_reference:
  type: user-provided-screenshots
  summary: "Dense market and agent-operation screenshots combining prediction-market metrics, dot-matrix numerals, order books, live tapes, topology graphs, mini charts, and red/green signal states in both paper-light and terminal-dark modes."
shape_language:
  stroke: "Thin 1px instrument borders, stronger outlines only for active trades, selected pipeline steps, and critical signals."
  radius: "Small radii, clipped panels, compact rounded chips, and terminal-like segmented controls."
  density: "High information density with clear grids, tiny labels, and stable module boundaries."
  controls: "Compact buttons and tabs may be below marketing size, but execution actions must remain readable and stable."
surface_language:
  canvas: "Theme-dual: paper-light for research/report mode, terminal-dark for live trading or night-monitoring mode."
  panels: "Flat instrument panels with thin borders, subtle fills, and minimal elevation."
  data_regions: "Tables, tape strips, charts, maps, and pipeline cards sit in fixed modules rather than decorative cards."
  emphasis: "Use status fills, signal color, and numeric weight instead of glow-heavy hero treatment."
illustration_language:
  charts: "Mini candlesticks, sparklines, bar distributions, node graphs, and signal paths are first-class visual material."
  topology: "Network graphs and agent paths use dots, lines, and labels rather than figurative illustration."
  typography: "Dot-matrix numerals and monospace labels carry the retro terminal character."
component_mapping:
  metric_tape: "Top or bottom live tape for session, UTC, wallet, PnL, win rate, edge, latency, or throughput."
  signal_card: "Compact current opportunity, confidence, odds, edge, and recommended action."
  order_book: "Bid/ask ladder, size, spread, price, and fill state."
  agent_pipeline: "Scan, signal, predict, compare, execute, review, or similar staged process."
  topology_map: "Relationship graph, swarm topology, signal path, market cluster, or dependency map."
  micro_chart: "Tiny chart module for trend, distribution, PnL, latency, or volume."
motion_language:
  energy: "Realtime but restrained: blinking live dots, updating numerals, tape scroll, and progress pulse."
  limits: "No cyberpunk neon wash, no large hero animation, no decorative particle field that harms data readability."
theme_modes:
  paper_light: "White, warm off-white, pale gray, red/green/gold signal accents, research-report precision."
  terminal_dark: "Near-black, deep graphite panels, mint/teal positive states, red negative states, low-glare trading-desk contrast."
accessibility:
  contrast: "Signal color must never be the only state cue; pair color with labels, arrows, signs, or patterns."
  density: "Tiny labels are acceptable for chrome, but primary values and actions must remain readable."
  stability: "Live updates must not resize panels, tables, or pipeline steps."
```

## Visual Grammar

- Treat the screen as an instrument panel, not a marketing dashboard.
- Use tiny uppercase labels, monospace values, dot-matrix display numerals, compact tabs, and thin module separators.
- Keep data modules visually tight: tape, metrics, signal cards, order book, pipeline, topology, and micro charts should align to a clear grid.
- Use red and green as semantic signal colors, with gold/amber for edge, confidence, or opportunity.
- Support both `paper-light` and `terminal-dark`; the style identity comes from information language, not background color.
- Prefer numeric drama over decorative drama: big PnL, odds, countdown, confidence, throughput, and latency values.

## Avoid

- Do not describe the style as only white-background or only dark-terminal.
- Do not use generic purple-blue AI SaaS gradients.
- Do not use large rounded SaaS cards for every module; this style needs instrument panels and grid lines.
- Do not hide critical trading or execution states behind color alone.
- Do not let live-feed decoration compete with order book, topology, or signal readability.

## Dig UI CSS Tokens

```css
--dig-bg: #f5f3ee;
--dig-bg-soft: #ebe8df;
--dig-surface: #fbfaf5;
--dig-surface-strong: #ece9e1;
--dig-surface-elevated: #ffffff;
--dig-text: #171717;
--dig-text-muted: #696b67;
--dig-text-soft: #969892;
--dig-accent: #d4485a;
--dig-accent-strong: #a93242;
--dig-accent-2: #3aa66f;
--dig-accent-2-strong: #24784e;
--dig-border: #d7d3c9;
--dig-border-strong: #20201e;
--dig-grid-line: rgba(24, 24, 22, 0.08);
--dig-control-bg: #f4f2ec;
--dig-control-bg-hover: #ebe7dc;
--dig-success: #3aa66f;
--dig-warning: #c39322;
--dig-danger: #d4485a;
--dig-info: #2784c7;
--dig-font-sans: "Inter", "IBM Plex Sans", "PingFang SC", "Noto Sans SC", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--dig-font-display: "IBM Plex Mono", "Berkeley Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
--dig-font-mono: "IBM Plex Mono", "Berkeley Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
--dig-font-serif: ui-serif, Georgia, "Times New Roman", serif;
--dig-text-xs: 10px;
--dig-text-sm: 12px;
--dig-text-md: 14px;
--dig-text-lg: 16px;
--dig-text-xl: 20px;
--dig-text-2xl: 26px;
--dig-text-3xl: 34px;
--dig-text-4xl: 48px;
--dig-text-5xl: 72px;
--dig-leading-tight: 1.02;
--dig-leading-normal: 1.42;
--dig-tracking-tight: 0;
--dig-radius-sm: 4px;
--dig-radius-md: 8px;
--dig-radius-lg: 12px;
--dig-radius-xl: 18px;
--dig-radius-pill: 999px;
--dig-stroke-width: 1px;
--dig-stroke-width-strong: 2px;
--dig-shadow-panel: 0 1px 0 rgba(24, 24, 22, 0.08), 0 18px 44px rgba(24, 24, 22, 0.08);
--dig-shadow-soft: 0 10px 28px rgba(24, 24, 22, 0.08);
--dig-shadow-chunky: 0 2px 0 #20201e;
--dig-glow-accent: 0 0 0 1px rgba(212, 72, 90, 0.22), 0 16px 28px rgba(212, 72, 90, 0.14);
--dig-glow-secondary: 0 0 0 1px rgba(58, 166, 111, 0.22), 0 16px 28px rgba(58, 166, 111, 0.12);
--dig-motion-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
--dig-signal-paper-bg: #f5f3ee;
--dig-signal-paper-panel: #fbfaf5;
--dig-signal-paper-border: #d7d3c9;
--dig-signal-terminal-bg: #080909;
--dig-signal-terminal-panel: #111414;
--dig-signal-terminal-border: #2a302e;
--dig-signal-terminal-text: #f6f8f4;
--dig-signal-terminal-muted: #8f9995;
--dig-signal-terminal-tape-bg: rgba(255, 255, 255, 0.035);
--dig-signal-positive: #4bd8a0;
--dig-signal-negative: #ff5268;
--dig-signal-warning: #c99b24;
--dig-signal-info: #4aa3ff;
--dig-signal-grid-line: rgba(105, 107, 103, 0.18);
--dig-signal-tape-bg: rgba(23, 23, 23, 0.04);
--dig-signal-node: #171717;
--dig-signal-node-active: #d4485a;
--dig-signal-book-bid: rgba(58, 166, 111, 0.22);
--dig-signal-book-ask: rgba(212, 72, 90, 0.2);
--dig-signal-chart-line: #3aa66f;
--dig-signal-chart-fill: rgba(58, 166, 111, 0.14);
```

## Dig UI Dark Tokens

```css
--dig-bg: #080909; --dig-bg-soft: #0e1111; --dig-surface: #111414; --dig-surface-strong: #171b1a; --dig-surface-elevated: #1d2221;
--dig-text: #f5f7f2; --dig-text-muted: #9ba39f; --dig-text-soft: #69736f; --dig-accent: #ff6476; --dig-accent-2: #4bd8a0;
--dig-border: #2a302e; --dig-border-strong: #c7d0ca; --dig-grid-line: rgba(155, 163, 159, .18); --dig-control-bg: #151918; --dig-control-bg-hover: #202624;
--dig-success: #4bd8a0; --dig-warning: #c99b24; --dig-danger: #ff5268; --dig-info: #4aa3ff;
```

The `--dig-signal-*` tokens are archetype tokens for the `signal-ops-console` render. They keep the shared preview reusable: the archetype owns the instrument structure, while this style owns signal color, paper-light and terminal-dark surfaces, graph states, and order-book emphasis.

## Component Rules

### Metric Tape

- Use one-line strips for live session state: UTC, wallet, PnL, edge, win rate, confidence, latency, throughput, or active agents.
- Tape content can be tiny, but must be scannable and separated by clear punctuation, chips, or dividers.
- Positive/negative values need signs or labels, not only color.

### Signal Card

- A signal card has one dominant value, one confidence/edge note, one market label, and one recommended action.
- Use red/green/gold status accents sparingly; a card should not become a rainbow of states.
- Keep action copy explicit: "Buy up", "Short BTC", "Dispatch", "Execute batch", "Review fills".

### Agent Pipeline

- Pipeline stages are compact, sequential, and stateful.
- Each stage should show label, tiny role note, and completion/latency/confidence where relevant.
- Active stages use border, fill, or small dot changes; avoid large movement.

### Topology Map

- Use graph nodes, signal paths, and clusters to explain relationships.
- Labels should be sparse and purposeful; topology is a decision aid, not background art.
- Encode active, risky, and neutral nodes with both shape/size and color.

### Order Book

- Bid/ask ladders should be dense, aligned, and stable.
- Use tinted row bands for depth, but keep text contrast strong.
- Always preserve numeric columns and units when collapsing responsively.

## Theme Modes

Quant Signal Console supports both `paper-light` and `terminal-dark` modes.

```css
--dig-bg-dark: #080909;
--dig-bg-soft-dark: #0e1111;
--dig-surface-dark: #111414;
--dig-surface-strong-dark: #171b1a;
--dig-text-dark: #f5f7f2;
--dig-text-muted-dark: #9ba39f;
--dig-border-dark: #2a302e;
```

Light mode should feel like an exported research console or lab-grade quant report. Dark mode should feel like a night trading desk or realtime operations terminal. Both modes must keep the same module language, typography, signal semantics, and execution hierarchy.
