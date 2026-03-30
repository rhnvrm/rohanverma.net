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
Most writing about AI coding lands in one of two camps: people showing off what the model can generate, or experienced engineers explaining why none of this replaces judgment. I care about the middle: what happens when you keep the judgment, keep experimenting, and start building infrastructure around the model instead of treating the model itself as the product. That is what I mean by harness engineering.

The term seems to have emerged naturally among software engineers running into the same class of problems from different directions. [OpenAI](https://openai.com/index/harness-engineering/) uses it. [Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) uses it. [Codagent](https://codagent.beehiiv.com/p/slot-machines-and-safety-nets) got at the same idea from the field. My version comes from eight months of building [bosun](https://github.com/oddship/bosun) on [Pi](https://github.com/badlogic/pi-mono): a sandboxed environment, a daemon for background automation, a task agent, multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh), 38 skills, and more than 4,000 sessions since August 2025. At some point, "prompting" is no longer the interesting part. The interesting part is everything around the model that makes it usable day after day.

That matters because agents are non-deterministic slot machines. Sometimes they are brilliant. Sometimes they confidently wander off. Sometimes the exact same task works on the second try for no satisfying reason. The harness is the safety net. It is the sandbox, the review loop, the skill system, the session history, the checkpoints, the task structure, the coordination layer, and all the boring glue that turns inconsistent raw capability into something I can actually trust in practice.

These pages started as blog posts. Then they got too long. Then I realized I did not want "finished" posts anyway — I wanted living pages I could keep updating as the system changed and as my opinions sharpened. So this section is half field notes, half wiki: a map of what I have built, what I think is working, and where I think most of the leverage actually is.

My thesis is simple: the agent handles the typing, I handle the thinking. Not because the model is useless, but because the highest-leverage setup I have found is one where the model does the fast mechanical work and the harness keeps that work inside a loop that improves over time. By "the loop," I mean the compounding cycle where each skill, workflow, guardrail, and automation makes future sessions better — not just this session, but every session after it, including the ones run by other agents.

What follows is an orientation to that loop. The first section explains the core split between agent labor and human judgment. The next sections cover the system itself: sandboxing, skills, coordination, context management, and the design choices that make the setup reliable. After that come the feedback loops — session history, handoffs, automation, evaluation, and the mechanisms that let the harness learn from repeated use. And finally there is the surrounding context: economics, tradeoffs, failure modes, and where I think this approach is heading.

![bell curve](/images/pages/bell-curve.webp)

*(Best viewed in light mode.)*

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

[The Review Loop](@/pages/harness-engineering/the-review-loop.md) — audit, visual check, content review. Single-pass confidence is fake.

[The Foreman Problem](@/pages/harness-engineering/the-foreman-problem.md) — the orchestrator costs more than the workers. That's not obviously wrong.

[Where to Start](@/pages/harness-engineering/where-to-start.md) — you don't need all of this.

### Research

[pi-weaver](@/pages/harness-engineering/research/pi-weaver/_index.md) — teaching agents to undo. Checkpoint, rewind, retry. 15-task eval against Terminal-Bench 2.0.
