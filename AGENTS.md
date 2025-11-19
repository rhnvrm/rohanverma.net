# Project Context: rohanverma.net

## Overview
This is a static site built with **Zola** (Rust-based static site generator), using **Nix** for the development environment and **Just** as a command runner.

## Development Workflow

### 1. Environment Setup
The project uses `flake.nix` to provide all dependencies (Zola, Node.js, etc.).
- **Always** run commands via `just` or within `nix develop`.
- **Headless Browsing:** The system has Playwright browsers pre-installed in NixOS. Use `npx playwright test` directly; do NOT run `npx playwright install`.
- **MCP Servers:** Playwright MCP server is configured in `.amp/settings.json` using `npx @playwright/mcp@latest`.

### 2. Common Commands (Justfile)
- **Start Server:** `just serve`
    - Runs Zola server on port `1112`.
    - Accessible at `http://localhost:1112`.
- **Build Site:** `just build`
    - Output goes to `public/`.
- **Check Environment:** `just check`
    - Verifies Zola, Just, and Git versions.
- **Clean:** `just clean`
    - Removes `public/` directory.

### 3. Architecture & Key Files
- **Content:** `content/` (Markdown files)
- **Templates:** `templates/` (Tera templates)
- **Styles:** `sass/` (SCSS files)
- **Static Assets:** `static/`
- **Config:** `config.toml`

### 4. Testing & Verification
- **Manual Verification:** Since this is a static site, verify changes by running `just serve` and checking the output with `curl http://localhost:1112`.
- **End-to-End Tests:** (Future) If adding E2E tests, place them in `e2e/` and run with `npx playwright test`.

## Rules for Agents
1. **Use `just`:** Prefer `just <command>` over raw `zola` commands to ensure the Nix environment is loaded.
2. **No Ghost Dependencies:** Do not assume tools are installed unless they are in `flake.nix` or the system `playwright.nix`.
3. **Port 1112:** The server runs on port 1112, not the default 1111.
