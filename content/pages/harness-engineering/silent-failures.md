+++
title = "Silent Failures"
weight = 27
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

No exceptions. No stack traces. The code compiles, the tests pass, and the behavior is wrong. This is [the Day-50 problem](@/pages/harness-engineering/the-day-50-problem.md) — agents breaking on mature codebases — at its most frustrating.

---

A data store silently returning stale results. Two versions of the same library imported across different modules: one from a direct dependency, one transitive. When comparisons crossed the library boundary, equality checks silently failed. No error. No crash. Just wrong results. The kind of bug where the symptom (data not updating) is layers removed from the cause (import mismatch).

When there are no exceptions, stack traces can't guide you. You're doing detective work, not debugging. Following data flows, checking assumptions, asking "what would have to be true for this behavior to make sense?" That's a fundamentally different skill than reading an error message and fixing the line it points to.

---

Another pattern: a service startup failing because it tried to call a dependency that had been decommissioned months ago. Code compiled fine. Nobody had removed the import because nobody had touched that file. The dead dependency was invisible until runtime, in production, under specific conditions.

Or: a premature abstraction that's now more complex than the problem it solves. Three layers of indirection that made sense when the original author wrote them but now obscure the actual logic. Agents need to recognize and *remove* these, not work around them. That requires understanding intent, not just structure.

---

Agents struggle here because these bugs require understanding architectural assumptions, not just reading code. [Skills](@/pages/harness-engineering/skills.md) help — they encode the conventions that prevent *new* silent failures. [Session history](@/pages/harness-engineering/session-history.md) helps — past investigations of similar patterns are searchable. But some bugs require human judgment about what the code was *supposed* to do versus what it does.

Why I keep saying the agent does [the boring stuff](@/pages/harness-engineering/the-boring-stuff.md) and I do the hard stuff. Silent failures are the hard stuff. The agent can trace the data flow, run the comparisons, check the imports. I have to recognize the *class* of failure and know where to look. [The loop](@/pages/harness-engineering/the-loop.md) makes the agent slightly better at this over time — but "slightly" is the honest word.
