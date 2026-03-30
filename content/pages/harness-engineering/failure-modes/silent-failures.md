+++
title = "Silent Failures"
weight = 27
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Failure Modes"
+++

This page is about the category of bug that scares me most when working with agents: code compiles, tests pass, behavior is wrong. No exceptions. No stack traces. The agent declares success and moves on. These are silent failures, and they're the hardest class of problem for any automated system to catch.

It's [the Day-50 problem](@/pages/harness-engineering/failure-modes/the-day-50-problem.md) at its most frustrating. Mature codebases full of implicit assumptions that aren't in any test suite.

---

A data store silently returning stale results. Two versions of the same library imported across different modules: one from a direct dependency, one transitive. When comparisons crossed the library boundary, equality checks silently failed. No error. No crash. Just wrong results. The kind of bug where the symptom (data not updating) is layers removed from the cause (import mismatch).

When there are no exceptions, stack traces can't guide you. You're doing detective work, not debugging. Following data flows, checking assumptions, asking "what would have to be true for this behavior to make sense?" That's a fundamentally different skill than reading an error message and fixing the line it points to.

---

Another pattern: a service startup failing because it tried to call a dependency that had been decommissioned months ago. Code compiled fine. Nobody had removed the import because nobody had touched that file. The dead dependency was invisible until runtime, in production, under specific conditions.

Or: a premature abstraction that's now more complex than the problem it solves. Three layers of indirection that made sense when the original author wrote them but now obscure the actual logic. Agents need to recognize and *remove* these, not work around them. That requires understanding intent, not just structure.

---

Agents struggle here because these bugs require understanding architectural assumptions, not just reading code. [Skills](@/pages/harness-engineering/skills/skills.md) help. They encode the conventions that prevent *new* silent failures. [Session history](@/pages/harness-engineering/feedback/session-history.md) helps. Past investigations of similar patterns are searchable. But some bugs require human judgment about what the code was *supposed* to do versus what it does.

Why I keep saying the agent does [the boring stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) and I do the hard stuff. Silent failures are the hard stuff. The agent can trace the data flow, run the comparisons, check the imports. I have to recognize the *class* of failure and know where to look. [The loop](@/pages/harness-engineering/thesis/the-loop.md) makes the agent slightly better at this over time, but "slightly" is the honest word.

These examples come from real sessions. The import mismatch bug was a NATS client version conflict in the zero-agent repo. The decommissioned dependency was a monitoring service call that had been dead for weeks. I don't have a neat solution for any of them. The harness helps with prevention (skills encode conventions), detection (review agents, verify agents), and memory (session history makes past investigations searchable). But silent failures remain the category where I trust the agent least and check the hardest.
