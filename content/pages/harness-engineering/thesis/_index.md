+++
title = "The Thesis"
sort_by = "weight"
weight = 1
date = 2026-04-02
template = "pages-section.html"
page_template = "pages-page.html"
draft = false

[extra]
section_title = "The Thesis"
+++

**The infrastructure around the model matters more than the model itself.** Models get better every quarter. Prompting tricks get obsoleted with each release. But the harness you build around them compounds. Each piece -- the sandbox, the review loop, the skill system, the session history, the coordination layer -- makes every future session better, not just the current one, and not just for you but for every agent in the system.

The argument has four parts. [The boring stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) is where the actual leverage is: conventions, file structure, handoffs, verification. Not clever prompts. [The loop](@/pages/harness-engineering/thesis/the-loop.md) explains why this compounds: sessions leave artifacts, artifacts feed future sessions, and each round starts with more context than the last. You build this infrastructure by [starting manual and automating later](@/pages/harness-engineering/thesis/start-manual-automate-later.md), because premature automation encodes the wrong patterns. And the compounding only works in [agentic mode](@/pages/harness-engineering/thesis/assistive-vs-agentic.md), where the agent operates inside a persistent environment that keeps artifacts around. Autocomplete gives you a faster session. The harness gives you a faster *next* session.

---

[The Boring Stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) — the split between what the agent does and what I do.

[The Loop](@/pages/harness-engineering/thesis/the-loop.md) — why compounding knowledge is the real bet.

[Start Manual, Automate Later](@/pages/harness-engineering/thesis/start-manual-automate-later.md) — the recurring pattern.

[Assistive vs Agentic](@/pages/harness-engineering/thesis/assistive-vs-agentic.md) — why the loop only works in agentic mode, and why the skeptics are half-right.
