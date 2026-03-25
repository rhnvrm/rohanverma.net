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

[Bubblewrap](@/pages/harness-engineering/bubblewrap.md) — filesystem isolation via bwrap.

[Nix for Dev Envs](@/pages/harness-engineering/nix-for-dev-envs.md) — reproducible tooling. No "works on my machine."

[Config as Code](@/pages/harness-engineering/config-as-code.md) — config.toml, single source of truth.

[Skills](@/pages/harness-engineering/skills.md) — markdown docs an LLM interprets with judgment.

[Progressive Disclosure](@/pages/harness-engineering/progressive-disclosure.md) — load what the agent needs now, not everything.

[Agent as Reader](@/pages/harness-engineering/agent-as-reader.md) — skills as docs an LLM interprets like a new team member.

[The Day-50 Problem](@/pages/harness-engineering/the-day-50-problem.md) — agents work on greenfield, break on mature projects.

[Silent Failures](@/pages/harness-engineering/silent-failures.md) — when code compiles but behavior is wrong.

[Meta-Skills](@/pages/harness-engineering/meta-skills.md) — a skill for creating skills. The multiplier.

[Coordination](@/pages/harness-engineering/coordination.md) — pi-mesh, file-based messaging, reservations.

[File-Based Messaging](@/pages/harness-engineering/file-based-messaging.md) — no server, just files on disk.

[Tmux as Process Model](@/pages/harness-engineering/tmux-as-process-model.md) — visible agents, not hidden processes.

[Model Tiers](@/pages/harness-engineering/model-tiers.md) — decoupling agents from model names.

[Context Windows](@/pages/harness-engineering/context-windows.md) — the constraint that shapes everything.

[The Omakase Tradeoff](@/pages/harness-engineering/the-omakase-tradeoff.md) — why control matters more than defaults.

### The Feedback Loop

[Session History](@/pages/harness-engineering/session-history.md) — the first thing that paid off.

[The Daemon](@/pages/harness-engineering/the-daemon.md) — background automation. Session summarization, handoffs, chronicles.

[Session Summarization](@/pages/harness-engineering/session-summarization.md) — how the daemon auto-summarizes sessions into knowledge.

[Handoffs](@/pages/harness-engineering/handoffs.md) — /handoff and /pickup for context transfer between sessions.

[Chronicles](@/pages/harness-engineering/chronicles.md) — builder's logs generated from session data.

[Q, the Task Agent](@/pages/harness-engineering/q-the-task-agent.md) — executive function for agents.

[Token Caching](@/pages/harness-engineering/token-caching.md) — cache reads at 1/10th the cost.

### Context

[Pi](@/pages/harness-engineering/pi.md) — the harness this runs on.

[How It Evolved](@/pages/harness-engineering/how-it-evolved.md) — from copy-paste to multi-agent, Aug 2025 to now.

[The Economics](@/pages/harness-engineering/the-economics.md) — costs, model choices, tuition not overhead.

[Start Manual, Automate Later](@/pages/harness-engineering/start-manual-automate-later.md) — the recurring pattern.

[Evaluator as QA](@/pages/harness-engineering/evaluator-as-qa.md) — why the agent judging work shouldn't be the one doing it.

[Harness Assumptions Decay](@/pages/harness-engineering/harness-assumptions-decay.md) — every component encodes a model limitation that may already be stale.

[The XKCD Math](@/pages/harness-engineering/the-xkcd-math.md) — is it worth automating?

[Where to Start](@/pages/harness-engineering/where-to-start.md) — you don't need all of this.
