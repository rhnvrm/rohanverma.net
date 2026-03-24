+++
title = "Progressive Disclosure"
weight = 23
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

At 38 [skills](@/pages/harness-engineering/skills.md) and 6,800 lines, you can't load everything into one context. Progressive disclosure isn't a nicety — it's a context window constraint. A skill that dumps everything upfront wastes tokens. One that reveals details based on what the agent is actually doing stays useful longer.

---

Skills follow a disclosure pattern. "What I Do" (3-5 bullets) → "When to Use Me" → "Quick Start" (copy-paste recipes) → "Full Reference" → "Related Skills." The agent reads the top, decides if it needs the rest, and goes deeper only when the task demands it.

[Pi](@/pages/harness-engineering/pi.md) loads skills based on trigger keywords when a task matches. The agent doesn't get the full git skill until it's doing git work. The mesh skill stays unloaded until someone mentions coordination. This is demand-driven, not front-loaded.

The file structure supports this too. `SKILL.md` is always loaded — the overview. An optional `references/` directory holds deeper detail, loaded on demand when the agent needs specifics. The standard skill is 100-250 lines. The largest (q-tasks) is about 250 lines with a detailed CLI reference. Most are much shorter.

---

This is also how the agent reads Pi's own documentation. Paths to docs are injected into the system prompt, but the agent reads them only when needed. A well-structured harness that an agent can inspect on demand is qualitatively different from one that dumps its entire manual into every prompt.

---

Progressive disclosure combined with agent-based skill loading, matched with an orchestrator spawning specialist agents, works better than trying to front-load everything. The orchestrator agent loads the planning skills. The coding agent loads the git and project skills. The review agent loads the editorial skills. Each agent's context is focused on what it's actually doing.

As these models improve, skill loading will only get better. The agent gets smarter about *when* to load *what*. The disclosure structure gives it something good to load. That's why [well-structured skills](@/pages/harness-engineering/meta-skills.md) are worth the effort now.
