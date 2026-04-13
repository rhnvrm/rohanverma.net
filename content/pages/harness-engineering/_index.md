+++
title = "Harness Engineering"
description = "On building the infrastructure around AI coding agents: the boring stuff that makes the interesting stuff possible."
sort_by = "weight"
weight = 1
template = "pages-section.html"
page_template = "pages-page.html"
draft = false

[extra]
og_image = "/images/pages/harness-engineering/bell-curve.png"
section_title = "Harness Engineering"
featured = true
+++
Most writing about AI coding lands in one of two camps: people showing off what the model can generate, or experienced engineers explaining why none of this replaces judgment. I care about the middle: what happens when you keep the judgment, keep experimenting, and start building infrastructure around the model instead of treating the model itself as the product. That is what I mean by harness engineering.

![bell curve](/images/pages/harness-engineering/bell-curve.png)

The term seems to have emerged naturally among software engineers running into the same class of problems from different directions. [OpenAI](https://openai.com/index/harness-engineering/) uses it. [Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) uses it. [Codagent](https://codagent.beehiiv.com/p/slot-machines-and-safety-nets) got at the same idea from the field.

My version comes from eight months of building [bosun](https://github.com/oddship/bosun) on [Pi](https://github.com/badlogic/pi-mono): a sandboxed environment, a daemon for background automation, a task agent, multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh), 28 skills, and more than 4,000 sessions since August 2025. At some point, "prompting" is no longer the interesting part. The interesting part is everything around the model that makes it usable day after day.

Why does all that infrastructure matter? Because agents are non-deterministic slot machines. Sometimes they are brilliant. Sometimes they confidently wander off. Sometimes the exact same task works on the second try for no satisfying reason. The harness is the safety net. It is the sandbox, the review loop, the skill system, the session history, the checkpoints, the task structure, the coordination layer, and all the boring glue that turns inconsistent raw capability into something I can actually trust in practice.

These pages started as blog posts. Then they got too long. Then I realized I did not want "finished" posts anyway. I wanted living pages I could keep updating as the system changed and as my opinions sharpened. So this section is half field notes, half wiki: a map of what I have built, what I think is working, and where I think most of the leverage actually is.

My [thesis](@/pages/harness-engineering/thesis/_index.md) is simple: the agent handles the typing, I handle the thinking. Not because the model is useless, but because the highest-leverage setup I have found is one where the model does the fast mechanical work and the harness keeps that work inside a loop that improves over time. By [the loop](@/pages/harness-engineering/thesis/the-loop.md), I mean the compounding cycle where each skill, workflow, guardrail, and automation makes future sessions better. Not just this session, but every session after it, including the ones run by other agents. [The boring stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) matters more than clever prompting. Sandboxes, file conventions, config management. And you [start manual, automate later](@/pages/harness-engineering/thesis/start-manual-automate-later.md): do things by hand until the pattern is clear, then let the harness take over.

What follows is the recommended reading order. Start with the thesis to understand the core ideas, then work through the layers: sandbox, skills, agents, feedback loops. After that, the failure modes and economics sections give you the honest version of what goes wrong and what it costs. The worked examples and research at the end show the system in action.

---

### The Thesis

[The Boring Stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md): the split between what the agent does and what I do.

[The Loop](@/pages/harness-engineering/thesis/the-loop.md): why compounding knowledge is the real bet.

[Start Manual, Automate Later](@/pages/harness-engineering/thesis/start-manual-automate-later.md): the recurring pattern.

[Assistive vs Agentic](@/pages/harness-engineering/thesis/assistive-vs-agentic.md): the spectrum from tool to autonomous agent, and where the leverage actually is.

### The Sandbox

[The Sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md): Nix + bubblewrap + config.toml. Why isolation matters.

[Bubblewrap](@/pages/harness-engineering/sandbox/bubblewrap.md): filesystem isolation via bwrap.

[Nix for Dev Envs](@/pages/harness-engineering/sandbox/nix-for-dev-envs.md): reproducible tooling. No "works on my machine."

[Config as Code](@/pages/harness-engineering/sandbox/config-as-code.md): config.toml, single source of truth.

### Skills & Knowledge

[Skills](@/pages/harness-engineering/skills/skills.md): markdown docs an LLM interprets with judgment.

[Progressive Disclosure](@/pages/harness-engineering/skills/progressive-disclosure.md): load what the agent needs now, not everything.

[Agent as Reader](@/pages/harness-engineering/skills/agent-as-reader.md): skills as docs an LLM interprets like a new team member.

[Meta-Skills](@/pages/harness-engineering/skills/meta-skills.md): a skill for creating skills. The multiplier.

### Agents & Coordination

[Model Tiers](@/pages/harness-engineering/agents/model-tiers.md): decoupling agents from model names.

[Context Windows](@/pages/harness-engineering/agents/context-windows.md): the constraint that shapes everything.

[Tmux as Process Model](@/pages/harness-engineering/agents/tmux-as-process-model.md): visible agents, not hidden processes.

[Coordination](@/pages/harness-engineering/agents/coordination.md): pi-mesh, file-based messaging, reservations.

[File-Based Messaging](@/pages/harness-engineering/agents/file-based-messaging.md): no server, just files on disk.

[Collaboration Systems](@/pages/harness-engineering/agents/collaboration-systems.md): when coordination fails at 85% and what to do about it.

[The Foreman Problem](@/pages/harness-engineering/agents/the-foreman-problem.md): the orchestrator costs more than the workers. That's not obviously wrong.

[Parallel Batch Review](@/pages/harness-engineering/agents/parallel-batch-review.md): running 6 haiku agents across 81 pages at once.

### The Feedback Loop

[Session History](@/pages/harness-engineering/feedback/session-history.md): the first thing that paid off.

[The Daemon](@/pages/harness-engineering/feedback/the-daemon.md): background automation. Session summarization, handoffs, chronicles.

[Session Summarization](@/pages/harness-engineering/feedback/session-summarization.md): how the daemon auto-summarizes sessions into knowledge.

[Handoffs](@/pages/harness-engineering/feedback/handoffs.md): /handoff and /pickup for context transfer between sessions.

[Chronicles](@/pages/harness-engineering/feedback/chronicles.md): builder's logs generated from session data.

[Q, the Task Agent](@/pages/harness-engineering/feedback/q-the-task-agent.md): executive function for agents.

[The Review Loop](@/pages/harness-engineering/feedback/the-review-loop.md): audit, visual check, content review. Single-pass confidence is fake.

[Evaluator as QA](@/pages/harness-engineering/feedback/evaluator-as-qa.md): why the agent judging work shouldn't be the one doing it.

[Quarterly Reviews](@/pages/harness-engineering/feedback/quarterly-reviews.md): health scoring, cleanup methodology, and system evolution.

[Browser in the Loop](@/pages/harness-engineering/feedback/browser-in-the-loop.md): CDP bridge for visual review. Annotate in the browser, agent fixes in the code.

### Failure Modes

[The Day-50 Problem](@/pages/harness-engineering/failure-modes/the-day-50-problem.md): agents work on greenfield, break on mature projects.

[Silent Failures](@/pages/harness-engineering/failure-modes/silent-failures.md): when code compiles but behavior is wrong.

[The Omakase Tradeoff](@/pages/harness-engineering/failure-modes/the-omakase-tradeoff.md): why control matters more than defaults.

[Harness Assumptions Decay](@/pages/harness-engineering/failure-modes/harness-assumptions-decay.md): every component encodes a model limitation that may already be stale.

### Economics & Origins

[Pi](@/pages/harness-engineering/economics/pi.md): the harness this runs on.

[How It Evolved](@/pages/harness-engineering/economics/how-it-evolved.md): from copy-paste to multi-agent, Aug 2025 to now.

[The Economics](@/pages/harness-engineering/economics/the-economics.md): costs, model choices, tuition not overhead.

[Token Caching](@/pages/harness-engineering/economics/token-caching.md): cache reads at 1/10th the cost.

[The XKCD Math](@/pages/harness-engineering/economics/the-xkcd-math.md): is it worth automating?

[Where to Start](@/pages/harness-engineering/economics/where-to-start.md): you don't need all of this.

[Claude Code Hooks and Session Memory](@/pages/harness-engineering/economics/claude-code-hooks-and-session-memory.md): the precursor: session memory with Claude Code hooks, before bosun.

### In Practice

[A Worked Example](@/pages/harness-engineering/in-practice/a-worked-example.md): end-to-end: from prompt to shipped code, showing how the pieces fit together.

[Content Import Pipeline](@/pages/harness-engineering/in-practice/content-import-pipeline.md): how this digital garden was built: notes vault to published site in one session.

### Research

[pi-weaver](@/pages/harness-engineering/research/pi-weaver/_index.md): teaching agents to undo. Checkpoint, rewind, retry. 15-task eval against Terminal-Bench 2.0.

### Notes

[The Z/L Continuum](@/pages/harness-engineering/notes/the-z-l-continuum.md): a conference note on delegation vs code ownership, framed as a risk-policy decision.

[Opinionated Shovel Makers vs. Opinionated Diggers](@/pages/harness-engineering/notes/opinionated-shovel-makers-vs-opinionated-diggers.md): why harness tooling should serve product/domain work rather than become the work.
