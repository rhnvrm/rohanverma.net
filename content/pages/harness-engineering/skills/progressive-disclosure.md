+++
title = "Progressive Disclosure"
weight = 23
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Skills & Knowledge"
og_image = "/images/pages/harness-engineering/progressive-disclosure.png"
+++

![Daya, darwaza tod do!](/images/pages/harness-engineering/progressive-disclosure.png)

*In [CID](https://en.wikipedia.org/wiki/C.I.D._(Indian_TV_series)), every episode follows the same format: ACP Pradyuman gets a clue, asks "aur batao" (tell me more), gets progressively deeper into the case, then finally shouts "Daya, darwaza tod do!" (Daya, break the door!). Skills work the same way: the agent gets the SKILL.md first, then loads references/, scripts/, examples/ only when it needs them. You don't break down the context window door until you actually need what's behind it.*

You can't load everything into one [context window](@/pages/harness-engineering/agents/context-windows.md). Progressive disclosure is how you deal with that: load what the agent needs now, not everything it might need later.

---

[Skills](@/pages/harness-engineering/skills/skills.md) follow a disclosure pattern. "What I Do" (3-5 bullets) → "When to Use Me" → "Quick Start" (copy-paste recipes) → "Full Reference" → "Related Skills." The agent reads the top, decides if it needs the rest, and goes deeper only when the task demands it.

[Pi](@/pages/harness-engineering/economics/pi.md) loads skills based on trigger keywords when a task matches. The agent doesn't get the full git skill until it's doing git work. The mesh skill stays unloaded until someone mentions coordination. This is demand-driven, not front-loaded.

The file structure supports this. `SKILL.md` is always loaded (the overview). An optional `references/` directory holds deeper detail, loaded on demand when the agent needs specifics. The standard skill is 100-250 lines. The largest (q-tasks) is about 250 lines with a detailed CLI reference. Most are much shorter. You can browse the [skills directory on GitHub](https://github.com/oddship/bosun/tree/main/skills).

---

Progressive disclosure combined with an orchestrator spawning specialist agents works better than trying to front-load everything. The orchestrator agent loads the planning skills. The coding agent loads the git and project skills. The review agent loads the editorial skills. Each agent's context is focused on what it's doing.

This also connects to [pi-weaver](@/pages/harness-engineering/research/pi-weaver/_index.md). When the model checkpoints and rewinds, the context after the rewind contains only what the model decided to carry forward, a form of progressive disclosure for the model's own work history. The pattern applies at multiple levels: what skills to load, what context to keep, what to discard.

---

Further reading on skills and harness design from others in the space:

- [Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) — HumanLayer
- [Agent Skills Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Anthropic
- [The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) — LangChain
