+++
title = "Meta-Skills"
weight = 6
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

A skill for creating skills. An agent template for creating agents. That's the multiplier.

---

There are five meta-skills: creating [skills](@/pages/harness-engineering/skills.md), creating agents, creating extensions, creating commands, creating tools. Each one encodes the format, conventions, file placement, and registration steps so I don't think about scaffolding. "Create a skill for debugging feed latency" and the meta-skill handles the rest.

Maybe 15 minutes saved per skill. Across 38 skills, plus every future one, that adds up. But the real value isn't time saved — it's friction removed. When creating a new skill is easy, I create skills more often. When I create skills more often, the agent gets better faster. The bootstrapping compounds.

---

I keep coming back to this pattern from [the loop](@/pages/harness-engineering/the-loop.md): make the thing that makes the things. Invest in the tooling that produces more tooling. It feels slow at first — you could just write the skill directly. But the meta-skill ensures consistency, and consistency matters when you have 38 skills that need to compose with each other.

The system builds itself. Not autonomously — I still decide what skills to create and when. But the mechanical parts of creating them are handled. I focus on what the skill should *teach*, not how to format it.
