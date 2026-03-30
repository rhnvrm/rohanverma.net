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
<!--I think the sentence formation is not a bit natural here, maybe it can be slightly improved? I am not sure, it just feels like its not the best intro paragraph, also I think maybe its not Harness Engineering telling anything about the topic. Maybe the page title can be Something else apart from Harness Engineering maybe you can refer to https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html and https://openai.com/index/harness-engineering/ https://codagent.beehiiv.com/p/slot-machines-and-safety-nets-->

<!--https://codagent.beehiiv.com/p/slot-machines-and-safety-nets this one has a very important point i often make is that agents are also like non deterministic slot machines-->

<!--My point here being, after the following, the main point here needs to be that the the harness engineering term is something that has naturally come up to define what I and what other fellow software engineers have been experimenting on naturally after getting exposed to LLMs -->
Most writing about AI coding comes from two ends: people excited about generating code, or experienced engineers explaining why it doesn't replace thinking. The middle is underrepresented. People with enough experience to build real infrastructure but who haven't stopped experimenting. That's where I am, and I think the perspective is useful.

<!--The bell curve meme in dark mode is hard to view-->
![bell curve](/images/pages/bell-curve.webp)

---

<!--the part about the thesis has emerged here abruptyly what even was the hypothesis that you are suddenly speaking of was my first thought here, like a intro to this missing entirely-->
After eight months of iterating on AI coding setups, the thesis has sharpened:

> Harness engineering isn't important for the *thinking* part of LLMs — it's important for the "automate the boring stuff" part. The agent types. I think. That's the split.
<!--The above also is a very complex sentence-->
<!--This is also abrupt what has been written below-->
I've been building a sandboxed development environment called [bosun](https://github.com/oddship/bosun), running on [Pi](https://github.com/badlogic/pi-mono). A daemon for background automation. A task agent. Multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh). 38 skills across about 4,000 sessions since August 2025.
<!--What is the loop here really nothing has been told-->
The value isn't in any single session. It's in the loop. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn. That's the bet, anyway.

<!--Before giving a TOC directly below some small article like intro to this whole section be there-->

<!--I also want to mention that the idea of these /pages was that i was trying to write blogposts on my website but i did not feel right to write all this down and the posts were getting a bit too long-->

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
