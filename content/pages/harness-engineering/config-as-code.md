+++
title = "Config as Code"
weight = 24
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

`config.toml` is the single source of truth. Model tiers, sandbox settings, daemon configuration, agent templates, skill paths — one file controls the whole system.

---

Agent templates use `${models.high}` variables. A preprocessor (`just init`) interpolates them against `config.toml` and generates the runtime files: `.pi/settings.json`, `.pi/agents.json`, `.pi/sandbox.json`, `.pi/bwrap.json`. These generated files are gitignored — they're environment-specific artifacts, not source.

The agent `.md` files *are* checked in. Those are the system prompts, the actual agent definitions. The generated JSON configs are the glue that connects definitions to the local environment. Edit `config.toml`, run `just init`, everything updates.

Change models for every agent by editing one line. Swap providers, adjust context windows, toggle [skills](@/pages/harness-engineering/skills.md). Same config, same output, every time. This is what makes [the sandbox](@/pages/harness-engineering/the-sandbox.md) deterministic.

---

[The daemon](@/pages/harness-engineering/the-daemon.md) auto-discovers workflows from three locations, where later overrides earlier: `packages/*/workflows/*` (packaged defaults), `.pi/workflows/*` (repo-level customization), `workspace/workflows/*` (user-level, gitignored). This layering means the base system ships sensible defaults, projects can customize, and individual users can override without touching shared config.

---

The config-as-code approach has a specific advantage for [model tiers](@/pages/harness-engineering/model-tiers.md): the tier abstraction lives in config, not in agent definitions. When a new model drops, or a provider changes pricing, the update is one line in `config.toml` — not editing every agent file. When I want to test whether Sonnet 4 works as well as Opus for coding tasks, I change the `high` tier definition and run `just init`. Every agent using `${models.high}` picks up the change.

This is the Nix philosophy applied to agent configuration. Declarative, reproducible, diffable. The config is version-controlled. The generated output is deterministic. If something breaks, `git diff config.toml` tells you exactly what changed.
