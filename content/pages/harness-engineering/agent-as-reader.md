+++
title = "Agent as Reader"
weight = 26
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

An LLM doesn't just load a [skill](@/pages/harness-engineering/skills.md) — it interprets it with judgment. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's not config parsing. That's reading documentation the way a new team member would.

---

Skills are markdown, not YAML config or JSON schemas, for a reason. Prose carries nuance. "Don't use this function during deployments" is a judgment call an LLM can interpret. A boolean flag can't express that. "Prefer this approach unless the codebase already uses the other pattern." That's a sentence only a reader can act on. Config can say yes or no. A reader can say "it depends."

A new engineer loading a project skill immediately knows the worktree path, build command, and why the dev server needs to run in tmux. No Slack archaeology required. The agent gets the same onboarding, except it loads in seconds instead of days.

---

But there's a limit. Skill docs can drift from reality, just like any documentation. A review session discovered [meta-skill](@/pages/harness-engineering/meta-skills.md) documentation diverging from actual skill definitions — the meta-skill described a format that the skills themselves had evolved past. Skills need maintenance like any documentation. The agent reads what's written, not what's true.

[The Day-50 problem](@/pages/harness-engineering/the-day-50-problem.md) shows up here too. The agent reads skills faithfully. But the skills can only encode what I know to write down. The undocumented invariants — the things that are "obvious" to anyone who's been in the codebase for months — those aren't in any skill. The agent reads well. The gap is in what's available to read.

---

[Pi](@/pages/harness-engineering/pi.md)'s own source code is readable by agents — paths to docs are injected into the system prompt. When something breaks, an agent that can read the harness source figures out *why*. One running in a black box can only observe that it broke. [Progressive disclosure](@/pages/harness-engineering/progressive-disclosure.md) governs how much it reads at once. The reader model governs how well it understands what it reads.
