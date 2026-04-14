+++
title = "Duh"
description = "A joke browser extension that started with Zerodha misspellings and turned into a typo autocorrect tool"
date = 2026-01-04
weight = 2

aliases = ["/projects/duh-extension/"]
[extra]
github_url = "https://github.com/rhnvrm/duh-extension"
tech_stack = "TypeScript, WXT"
status = "released"
+++

Duh started as a joke project.

Someone misspelled "Zerodha" in an internal chat, and I replied with: "install this extension I just wrote and you'll never misspell Zerodha again." Then I actually built it.

Under the joke, it turned into a useful browser-side autocorrect experiment: fuzzy matching for typo variants and n-gram rules for multi-word corrections.

## Why Duh?

Most desktop browser inputs still have weak autocorrect compared to mobile keyboards. Duh was my way to test a lightweight, configurable correction layer that works directly inside forms and text boxes.

## Features

- **Fuzzy matching**: Levenshtein distance algorithm with configurable edit distance
- **Multi-word patterns**: N-gram matching (up to 4 words) for phrases like "Looney Toons" → "Looney Tunes"
- **Real-time detection**: 500ms debouncing, non-blocking
- **Keyboard shortcuts**: Tab/Enter to accept, Esc to dismiss
- **Preset system**: Common typos, custom presets, and project/team-specific words (including many Zerodha misspellings)
- **Works with SPAs**: MutationObserver detects dynamically added inputs

## Tech Stack

- **Framework**: WXT (next-gen browser extension framework)
- **Language**: TypeScript
- **Build**: Nix flakes for reproducible builds
- **CI/CD**: GitHub Actions with automatic releases
- **Targets**: Chrome (Manifest V3) and Firefox

## Install

Download from [GitHub Releases](https://github.com/rhnvrm/duh-extension/releases):
- `duh-chrome-v0.0.1.zip` for Chrome
- `duh-firefox-v0.0.1.zip` for Firefox
