+++
title = "Harness Engineering"
description = "On building the infrastructure around AI coding agents — the boring stuff that makes the interesting stuff possible."
sort_by = "weight"
template = "pages-section.html"
page_template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

Most writing about AI coding comes from two ends: people excited about generating code, or experienced engineers explaining why it doesn't replace thinking. The middle is underrepresented. People with enough experience to build real infrastructure but who haven't stopped experimenting. That's where I am, and I think the perspective is useful.

---

After eight months of iterating on AI coding setups, the thesis has sharpened:

> Harness engineering isn't important for the *thinking* part of LLMs — it's important for the "automate the boring stuff" part. The agent types. I think. That's the split.

I've been building a sandboxed development environment called [bosun](https://github.com/oddship/bosun), running on [Pi](https://github.com/badlogic/pi-mono). A daemon for background automation. A task agent. Multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh). 38 skills across about 4,000 sessions since August 2025.

The value isn't in any single session. It's in the loop. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn. That's the bet, anyway.

---

### The Thesis

[The Boring Stuff](@/pages/harness-engineering/the-boring-stuff.md) — the split between what the agent does and what I do.

[The Loop](@/pages/harness-engineering/the-loop.md) — why compounding knowledge is the real bet.

### The System

[The Sandbox](@/pages/harness-engineering/the-sandbox.md) — Nix + bubblewrap + config.toml. Why isolation matters.

[Skills](@/pages/harness-engineering/skills.md) — markdown docs an LLM interprets with judgment.

[The Day-50 Problem](@/pages/harness-engineering/the-day-50-problem.md) — agents work on greenfield, break on mature projects.

[Meta-Skills](@/pages/harness-engineering/meta-skills.md) — a skill for creating skills. The multiplier.

[Coordination](@/pages/harness-engineering/coordination.md) — pi-mesh, file-based messaging, reservations.

[The Omakase Tradeoff](@/pages/harness-engineering/the-omakase-tradeoff.md) — why control matters more than defaults.

### The Feedback Loop

[Session History](@/pages/harness-engineering/session-history.md) — the first thing that paid off.

[The Daemon](@/pages/harness-engineering/the-daemon.md) — background automation. Session summarization, handoffs, chronicles.

[Q, the Task Agent](@/pages/harness-engineering/q-the-task-agent.md) — executive function for agents.

### Context

[Pi](@/pages/harness-engineering/pi.md) — the harness this runs on.

[How It Evolved](@/pages/harness-engineering/how-it-evolved.md) — from copy-paste to multi-agent, Aug 2025 to now.

[The Economics](@/pages/harness-engineering/the-economics.md) — costs, model choices, tuition not overhead.

[Where to Start](@/pages/harness-engineering/where-to-start.md) — you don't need all of this.
