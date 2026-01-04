+++
title = "Duh"
description = "Browser extension that auto-corrects misspellings using fuzzy matching"
weight = 2

[extra]
github_url = "https://github.com/rhnvrm/duh-extension"
tech_stack = "TypeScript, WXT"
status = "released"
+++

Cross-browser extension that catches and corrects common misspellings in real-time. Uses Levenshtein distance for fuzzy matching and n-gram patterns for multi-word corrections.

## Why Duh?

Autocorrect on mobile is smart. Desktop browsers? Not so much. Duh fills that gap with configurable correction rules and presets.

## Features

- **Fuzzy matching**: Levenshtein distance algorithm with configurable edit distance
- **Multi-word patterns**: N-gram matching (up to 4 words) for phrases like "Looney Toons" → "Looney Tunes"
- **Real-time detection**: 500ms debouncing, non-blocking
- **Keyboard shortcuts**: Tab/Enter to accept, Esc to dismiss
- **Preset system**: Mandela Effect corrections, common typos, custom presets
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
