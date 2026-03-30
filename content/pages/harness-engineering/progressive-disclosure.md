+++
title = "Progressive Disclosure"
weight = 23
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

<!--Again this 38 skills number and lines of code, how is this relevant-->
<!--All of this text is just repated from the Skills page-->
At 38 [skills](@/pages/harness-engineering/skills.md) and 6,800 lines, you can't load everything into one context. Progressive disclosure isn't a nicety — it's a [context window](@/pages/harness-engineering/context-windows.md) constraint. A skill that dumps everything upfront wastes tokens. One that reveals details based on what the agent is actually doing stays useful longer.

---

Skills follow a disclosure pattern. "What I Do" (3-5 bullets) → "When to Use Me" → "Quick Start" (copy-paste recipes) → "Full Reference" → "Related Skills." The agent reads the top, decides if it needs the rest, and goes deeper only when the task demands it.

[Pi](@/pages/harness-engineering/pi.md) loads skills based on trigger keywords when a task matches. The agent doesn't get the full git skill until it's doing git work. The mesh skill stays unloaded until someone mentions coordination. This is demand-driven, not front-loaded.

The file structure supports this too. `SKILL.md` is always loaded — the overview. An optional `references/` directory holds deeper detail, loaded on demand when the agent needs specifics. The standard skill is 100-250 lines. The largest (q-tasks) is about 250 lines with a detailed CLI reference. Most are much shorter.
<!--Maybe you should link to the skills on github-->
---

Same principle for Pi's own documentation. Paths to docs are injected into the system prompt, but the agent reads them only when needed. A harness the agent can inspect on demand works better than one that dumps its entire manual into every prompt.

---

Progressive disclosure combined with agent-based skill loading, matched with an orchestrator spawning specialist agents, works better than trying to front-load everything. The orchestrator agent loads the planning skills. The coding agent loads the git and project skills. The review agent loads the editorial skills. Each agent's context is focused on what it's actually doing.

As models improve, skill loading gets better too — the agent gets smarter about *when* to load *what*. The disclosure structure gives it something worth loading. [Well-structured skills](@/pages/harness-engineering/meta-skills.md) are worth the effort now because they'll work even better later.

<!--Another thing I thought of here, is that with progressive disclosure, it might tie well with pi-weaver as well-->

<!--Refer to these?-->
<!--These might be useful for other pages as well-->
<!--https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents-->
<!--https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices-->
<!--https://blog.langchain.com/the-anatomy-of-an-agent-harness/-->
