+++
title = "The Day-50 Problem"
weight = 5
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

Agents work fine on greenfield code but break down on mature projects.

Day 1 of a new project, the agent is great. Clean slate, no legacy decisions, no undocumented invariants. It generates scaffolding, writes tests, sets up CI. You feel like you've found the future.

Day 50, the project has history. There are implicit conventions the README doesn't cover. There's a function that looks wrong but exists for a reason. There's a deployment quirk that only matters on Tuesdays. The agent doesn't know any of this, and it confidently makes changes that break things in ways you don't catch until production.

---

[Skills](@/pages/harness-engineering/skills.md) help. A lot, actually. "The agent loads the right conventions and doesn't rediscover them every session" is a real improvement. But skills encode what I *know* to write down. The Day-50 problem is about what I *don't* know to write down — the stuff that's obvious to me because I've been living in the codebase, but invisible to anyone (or anything) seeing it fresh.

Understanding undocumented legacy code. Making breaking changes safely. Recognizing that a "cleanup" refactor will cascade through three systems that depend on the current behavior. Those still need human judgment.

---

The honest version: I don't have a solution for this. I have mitigations.

Skills encode the conventions I can articulate. [Session history](@/pages/harness-engineering/session-history.md) gives agents access to past decisions and their context. The [coordination](@/pages/harness-engineering/coordination.md) layer lets me run a verify agent that checks changes against existing tests before anything gets committed.

But the gap between "agent is helpful" and "agent is autonomous" is mostly the Day-50 problem. The greenfield demo is seductive. The mature-codebase reality is humbling. I keep investing in [the loop](@/pages/harness-engineering/the-loop.md) because I think the compounding knowledge eventually narrows that gap. But it's a bet, not a certainty.
