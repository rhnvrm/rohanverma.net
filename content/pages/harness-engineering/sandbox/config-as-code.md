+++
title = "Config as Code"
weight = 24
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "The Sandbox"
+++

`config.toml` is the single source of truth from which other files in the system are generated. Model tiers, sandbox settings, daemon configuration, agent templates, skill paths. One file controls the whole system.

---

The key abstraction here is [pi-agents](https://github.com/oddship/bosun/tree/main/packages/pi-agents), a package that manages agent definitions and their resolution. Agent `.md` files are the system prompts, the actual agent definitions, checked into git. They use `${models.high}` template variables. A preprocessor (`just init`) interpolates them against `config.toml` and generates the runtime files: `.pi/settings.json`, `.pi/agents.json`, `.pi/sandbox.json`, [`.pi/bwrap.json`](@/pages/harness-engineering/sandbox/bubblewrap.md). The generated files are gitignored. They're environment-specific artifacts, not source.

Important distinction: `config.toml` itself is NOT checked into git. The repo contains `config.sample.toml` as a template. Your local `config.toml` has your API keys, your model preferences, your sandbox paths. `just init` detects when `config.toml` changes and warns you to regenerate.

Change models for every agent by editing one line. Swap providers, adjust [context windows](@/pages/harness-engineering/agents/context-windows.md), toggle [skills](@/pages/harness-engineering/skills/skills.md). Same config, same output, every time. That determinism is what makes [the sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md) work.

---

[The daemon](@/pages/harness-engineering/feedback/the-daemon.md) auto-discovers workflows from three locations, where later overrides earlier: `packages/*/workflows/*` (packaged defaults), `.pi/workflows/*` (repo-level customization), `workspace/workflows/*` (user-level, gitignored). This layering means the base system ships sensible defaults, projects can customize, and individual users can override without touching shared config.

---

The config-as-code approach has a specific advantage for [model tiers](@/pages/harness-engineering/agents/model-tiers.md): the tier abstraction lives in config, not in agent definitions. When a new model drops, or a provider changes pricing, the update is one line in `config.toml`. Every agent using `${models.high}` picks up the change after `just init`. When I want to test whether Sonnet 4 works as well as Opus for coding tasks, I change the `high` tier and run the eval.

Nix philosophy, applied to agent configuration. Declarative, reproducible, diffable. The sample config is version-controlled. The generated output is deterministic. If something breaks, `git diff config.sample.toml` tells you what changed in the template, and your local config tells you the rest.
