+++
title = "Agent as Reader"
weight = 26
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Skills & Knowledge"
og_image = "/images/pages/harness-engineering/agent-as-reader.png"
+++

![Steamed Skills](/images/pages/harness-engineering/agent-as-reader.png)

*In the Simpsons' ["Steamed Hams"](https://simpsons.fandom.com/wiki/Steamed_Hams) scene, Skinner disguises Krusty Burgers as his own cooking. Here, the fancy language ("applying judgment to domain-specific knowledge transfer documents") is just a dressed-up way of saying the agent is reading a README. That's the whole point: skills are just documentation. The magic is that the reader is an LLM.*

The key insight behind [skills](@/pages/harness-engineering/skills/skills.md) is that LLMs don't just parse instructions. They *read* them. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's not config parsing. That's reading documentation the way a new team member reads the onboarding docs on day one.

This is why skills are markdown and not YAML or JSON schemas. Prose carries nuance. "Don't use this function during deployments" is a judgment call. A boolean flag can't express that. "Prefer this approach unless the codebase already uses the other pattern." That's a sentence only a reader can act on. Config says yes or no. A reader says "it depends."

---

The practical upside: a new engineer loading a project skill immediately knows the worktree path, build command, and why the dev server needs to run in tmux. The agent gets the same onboarding, except it loads in seconds.

The practical downside: documentation drift. Skills can diverge from reality the same way any docs do. I discovered this when a [meta-skill](@/pages/harness-engineering/skills/meta-skills.md) described a format that the actual skills had already evolved past. The agent followed the docs faithfully. The docs were just wrong. This is a real problem, and one reason [Q](@/pages/harness-engineering/feedback/q-the-task-agent.md) has [quarterly review](@/pages/harness-engineering/feedback/quarterly-reviews.md) capabilities and [pi-weaver](@/pages/harness-engineering/research/pi-weaver/_index.md) can rewind when assumptions turn out to be stale. The harness should eventually catch its own drift.

---

This also explains why mega-skills don't work well. A single giant skill that tries to cover everything becomes stale faster and loads too much into [context](@/pages/harness-engineering/agents/context-windows.md). Better to split into atomic skills that compose: the git skill handles git conventions, the project skill handles build commands, the sandbox skill handles isolation. Each one stays small enough to maintain and focused enough to be useful.

[The Day-50 problem](@/pages/harness-engineering/failure-modes/the-day-50-problem.md) shows up here too. The agent reads skills faithfully. But skills can only encode what I know to write down. The undocumented invariants, the things that are "obvious" after months in a codebase, those aren't in any skill. The agent reads well. The gap is in what's available to read.

[Pi](@/pages/harness-engineering/economics/pi.md)'s own source code is readable by agents. Paths to docs are injected into the system prompt. When something breaks, an agent that can read the harness source figures out *why*. [Progressive disclosure](@/pages/harness-engineering/skills/progressive-disclosure.md) governs how much it reads at once. The reader model governs how well it understands what it reads.
