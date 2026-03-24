+++
title = "Context Windows"
weight = 30
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

The fundamental constraint. Everything fits in the context window or it doesn't. There's no "load more later" — the model sees what's in the window, period. This shapes the entire system.

---

[Progressive disclosure](@/pages/harness-engineering/progressive-disclosure.md) exists because of this: 38 [skills](@/pages/harness-engineering/skills.md) at 6,800 lines can't all load at once. Skills load on demand, reveal details progressively, stay out of the way until needed.

[Model tiers](@/pages/harness-engineering/model-tiers.md) are shaped by it too — bigger context windows come with more expensive models. The tier system makes this tradeoff explicit. Lite for quick tasks that barely touch the limit, high and oracle for deep work that pushes against it.

[Token caching](@/pages/harness-engineering/token-caching.md) follows from the same constraint: if you're paying for context, don't pay twice for the same tokens. Cache the system prompt, cache the shared codebase, pay only for what's new.

And when a session's context fills up, [session summarization](@/pages/harness-engineering/session-summarization.md) kicks in — Pi compacts it. The compaction summary carries forward as a lossy compression of everything that happened. Auto-resume sends a follow-up prompt so the agent continues working. The summary quality determines how much knowledge survives.

---

86% of sessions are simple — one or two user messages. They barely touch the context limit. 5% are marathons at 50+ messages that push against it constantly. The system handles both because the constraints are visible, not hidden behind abstractions.

---

The constraint isn't going away even as windows grow. Larger windows mean more *can* fit, but also more tokens to pay for. [The economics](@/pages/harness-engineering/the-economics.md) still favor loading less, caching more, and disclosing progressively. A 200k-token window that's 80% cached is cheaper and faster than a 200k-token window filled fresh every turn.

Every level of the system reflects this constraint. Remove it tomorrow and the design would still be good — focused skills, demand-driven loading, structured summaries. The constraint forced good architecture. A 200k-token window wouldn't change any of it. Just move the ceiling.
