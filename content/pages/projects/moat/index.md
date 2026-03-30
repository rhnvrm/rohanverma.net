+++
title = "moat"
description = "Markdown + oat. A static site generator in one Go binary."
date = 2026-03-30
weight = 5

[extra]
github_url = "https://github.com/oddship/moat"
website_url = "https://oddship.github.io/moat/"
+++

A zero-config static site generator. Write markdown, run `moat build`, get a site with sidebar nav, search, dark mode, and syntax highlighting. No layout files needed. Moat has a built-in [oat](https://oat.ink) layout.

## Features

- **Zero config** — directory structure is the config, number prefixes control ordering
- **Built-in search** — client-side search index with sidebar UI
- **Wiki links** — `[[Page Title]]` resolves to internal page URLs
- **Syntax highlighting** — 70 Chroma themes with automatic light/dark mode
- **Layout inheritance** — base layout with `{{ block }}`/`{{ define }}` variants
- **Shortcodes** — reusable components inside markdown

```bash
go install github.com/oddship/moat@latest
moat build docs/ _site/
```
