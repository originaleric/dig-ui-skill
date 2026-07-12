---
slug: cozy-arcade
name: Cozy Arcade
name_zh: 软萌街机
name_en: Cozy Arcade
kind: style-catalog
category: styles
token_contract: style_v1
status: draft
description_zh: 一套从用户截图归纳出的软萌游戏化移动 UI 风格，适合健身打卡、习惯养成、儿童学习、宠物陪伴和轻量奖励系统。
description_en: A cozy gamified mobile UI style distilled from a user-provided screenshot, suited for fitness streaks, habit play, kids learning, mascot companions, and lightweight reward systems.
render:
  archetype: mobile-game-companion
  page_type: mobile-consumer
  density: comfortable
  canvas: illustrated-light
---

# Cozy Arcade / 软萌街机

## Overview

Cozy Arcade is a style-first catalog for playful mobile products. It combines a soft cartoon world, kawaii mascot focus, chunky outlined panels, toy-like controls, and reward-driven product states. Color is part of the system, but the style is carried by shape, stroke, surface treatment, mascot hierarchy, and game-loop components.

软萌街机是一套 style-first catalog。它不是单纯配色，而是定义一种可爱的移动产品视觉语法：柔和卡通世界、吉祥物中心、粗描边面板、玩具质感按钮、任务奖励和装备选择。适合让“坚持、练习、完成任务”变得轻松、有反馈、有陪伴感。

## Style Contract

```yaml
best_for:
  - gamified fitness
  - habit tracker
  - kids learning
  - mascot companion
  - reward loop
  - playful mobile onboarding
avoid_for:
  - enterprise dashboard
  - dense data table
  - regulated finance workflow
  - medical critical path
  - developer console
mood:
  - cozy
  - kawaii
  - toy-like
  - encouraging
  - soft-cartoon
  - game-loop-driven
source_reference:
  type: user-provided-screenshot
  summary: "Two mobile screens showing a gamified jump-rope flow with mascot, forest cartoon background, thick outlined cards, pill CTAs, gear picker, and reward chips."
shape_language:
  stroke: "2px to 3px warm ink outlines on primary cards, buttons, and selection rows."
  radius: "Large rounded cards, pill CTAs, circular badges, and sticker-like chips."
  depth: "Chunky offset shadows and soft toy-like elevation instead of glass blur."
  controls: "Big thumb-friendly controls with stable height; buttons feel pressable but do not jump layout."
surface_language:
  canvas: "Warm cream or illustrated cartoon scene."
  panels: "Cream or pastel surfaces with strong warm-ink border."
  primary_action: "Coral pill with dark outline and chunky lower shadow."
  support_action: "Mint, sky, lavender, or cream panels used for reward and coach states."
illustration_language:
  mascot: "Mascot is a first-order layout object, centered or staged, never a tiny decorative corner."
  background: "Soft cartoon environment with layered hills, clouds, fences, trees, or simple game-world scenery."
  icons: "Use simple line icons or sticker symbols; avoid enterprise outline-only minimalism."
component_mapping:
  mission_card: "Daily goal, today's pick, streak task, or suggested workout."
  coach_panel: "AI coach, boost, plan preview, next action."
  mascot_stage: "Character, level, mood, speech bubble, progress feedback."
  gear_picker: "Large selectable equipment rows with icon tile, description, and selected check."
  reward_chip: "Small pill for points, combo, blocks, voice, multiplier, or mode."
  primary_cta: "Single dominant bottom action; copy should be short and action-first."
motion_language:
  energy: "Playful micro-bounce for completion and selection; calm idle motion for mascot."
  limits: "No large layout shifts, no aggressive parallax, no neon arcade flash."
accessibility:
  contrast: "Warm ink text must stay AA on cream and pastel surfaces."
  target_size: "Interactive rows and CTA buttons stay at least 44px high."
  copy: "Keep labels short; do not make cute language obscure the action."
```

## Visual Grammar

- Use thick warm-ink outlines on interactive panels and important cards.
- Prefer rounded rectangles, pill buttons, circular badges, and sticker chips.
- Let the mascot or illustrated world be the emotional center of the screen.
- Use shadows as physical depth: offset, readable, and slightly toy-like.
- Keep information density moderate. The UI can be fun, but each screen needs one obvious next action.
- Treat rewards and settings as game objects: chips, slots, rows, badges, and small meters.

## Avoid

- Do not reduce this style to coral and mint colors only.
- Do not use dark SaaS gradients, glassmorphism, neon glow, or cyber console chrome.
- Do not place many unrelated cards on a screen; repeated cards should still feel like one game board.
- Do not use tiny enterprise controls for the primary loop.
- Do not let the background illustration compete with task labels, CTA text, or progress state.

## Dig UI CSS Tokens

```css
--dig-bg: #fff1c7;
--dig-bg-soft: #fff8df;
--dig-surface: #fffdf1;
--dig-surface-strong: #f7e9c3;
--dig-surface-elevated: #ffffff;
--dig-text: #251b16;
--dig-text-muted: #6c5b50;
--dig-text-soft: #927f70;
--dig-accent: #ff6f61;
--dig-accent-strong: #e8564d;
--dig-accent-2: #61d59d;
--dig-accent-2-strong: #35ad78;
--dig-border: #2c211c;
--dig-border-strong: #17110e;
--dig-grid-line: rgba(44, 33, 28, 0.12);
--dig-control-bg: #fff7dd;
--dig-control-bg-hover: #ffefbd;
--dig-success: #44c877;
--dig-warning: #ffc857;
--dig-danger: #ff5d5d;
--dig-info: #5bb8ff;
--dig-font-sans: "Nunito Sans", "Baloo 2", "PingFang SC", "Noto Sans SC", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--dig-font-display: "Baloo 2", "Nunito Sans", "PingFang SC", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif;
--dig-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
--dig-font-serif: ui-serif, Georgia, "Times New Roman", serif;
--dig-text-xs: 12px;
--dig-text-sm: 14px;
--dig-text-md: 16px;
--dig-text-lg: 18px;
--dig-text-xl: 22px;
--dig-text-2xl: 28px;
--dig-text-3xl: 36px;
--dig-text-4xl: 48px;
--dig-text-5xl: 64px;
--dig-leading-tight: 1.04;
--dig-leading-normal: 1.45;
--dig-tracking-tight: 0;
--dig-radius-sm: 10px;
--dig-radius-md: 16px;
--dig-radius-lg: 22px;
--dig-radius-xl: 30px;
--dig-radius-pill: 999px;
--dig-stroke-width: 2px;
--dig-stroke-width-strong: 3px;
--dig-shadow-panel: 0 5px 0 #2c211c, 0 18px 28px rgba(44, 33, 28, 0.16);
--dig-shadow-soft: 0 10px 22px rgba(44, 33, 28, 0.14);
--dig-shadow-chunky: 0 6px 0 #2c211c;
--dig-glow-accent: 0 6px 0 #2c211c, 0 18px 28px rgba(255, 111, 97, 0.22);
--dig-glow-secondary: 0 5px 0 #2c211c, 0 16px 24px rgba(97, 213, 157, 0.2);
--dig-motion-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--dig-game-sky-start: #ffb284;
--dig-game-sky-mid: #ffd79c;
--dig-game-sky-end: #aee5ba;
--dig-game-hill-front: #81d260;
--dig-game-hill-mid: #5fbf88;
--dig-game-hill-back: #7ecf84;
--dig-game-cloud: rgba(255, 255, 255, 0.82);
--dig-mascot-primary: #37bef2;
--dig-mascot-secondary: #9beeff;
--dig-mascot-face: #2ab5ee;
--dig-mascot-belly: #ff6f61;
--dig-mission-surface: #eedcf6;
--dig-coach-surface-start: #bd7be8;
--dig-coach-surface-end: #ff6f61;
--dig-gear-surface: #d9f3df;
--dig-gear-icon-surface: #61d59d;
--dig-game-on-accent: #ffffff;
```

The `--dig-game-*`, `--dig-mascot-*`, `--dig-mission-*`, `--dig-coach-*`, and `--dig-gear-*` tokens are archetype tokens for the `mobile-game-companion` render. They keep the shared preview reusable: the archetype owns structure, while this style owns the cartoon world, mascot, and game-loop surface colors.

## Component Rules

### Mascot Stage

- The mascot stage should appear near the primary loop: workout start, lesson start, habit check-in, pet status, or reward reveal.
- Speech bubbles are short and concrete: "Let's hit 1,200 today" is better than long coaching text.
- Use level badges and mood states around the mascot, but keep them subordinate to the character.

### Mission Card

- A mission card has a small label, one task title, one short rationale, and a compact state chip.
- It should use a cream or pastel surface, strong outline, and stable rounded geometry.
- Use this for daily picks, streak goals, lesson suggestions, and next workouts.

### Gear Picker

- Each equipment row needs an icon tile, title, short trust note, and selected state.
- Rows should feel like game loadout slots rather than form radio buttons.
- Selected state can use mint fill, coral check, or a small circular badge.

### Reward Chips

- Chips can represent voice, combo, pet multiplier, points, duration, mode, or difficulty.
- Keep chips small but touch-safe when interactive.
- Avoid too many colors in one row; choose one accent and one support family per screen.

### Primary CTA

- The bottom CTA is the main action anchor.
- Use coral fill, warm-ink outline, pill radius, and chunky shadow.
- Copy should be verb-first and short: "Start jumping", "Begin lesson", "Feed pet", "Claim reward".

## Dark Mode

Cozy Arcade is light-first. Dark mode should feel like an evening game board, not a developer console.

```css
--dig-bg-dark: #1f1715;
--dig-bg-soft-dark: #2b211e;
--dig-surface-dark: #352823;
--dig-surface-strong-dark: #423027;
--dig-text-dark: #fff6df;
--dig-text-muted-dark: #dcc6a9;
--dig-border-dark: #fff0c9;
```

Use dark mode for bedtime, focus, or night-play variants only when the product needs it. Keep mascot visibility, CTA contrast, and reward chip legibility above decorative atmosphere.
