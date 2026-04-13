+++
title = "The Z/L Continuum"
weight = 1
template = "pages-page.html"
date = 2026-04-14
draft = false

[extra]
section_title = "Notes"
+++

I didn’t attend AI Engineer Europe 2026, so this is a reaction note, not an attendee report. I wrote it after reading Alex Volkov’s recap thread: <https://x.com/altryne/status/2043748676099866771>.

The debate he surfaced is straightforward:

> "Code is a liability." (Ryan Lopopolo, OpenAI)

vs

> "Read every fucking line of critical code." (Mario Zechner, Pi)

Alex called this the **Z/L Continuum**: one end delegates heavily to agents, the other keeps strict human ownership of critical code.

That framing is useful. It names a real tension. But I don’t think it is a personality test. I think it is a risk policy.

As I wrote in the [Harness Engineering intro](@/pages/harness-engineering/_index.md):

> "Most writing about AI coding lands in one of two camps: people showing off what the model can generate, or experienced engineers explaining why none of this replaces judgment. I care about the middle: what happens when you keep the judgment, keep experimenting, and start building infrastructure around the model instead of treating the model itself as the product. That is what I mean by harness engineering."

I still agree with that middle. We have not converged on one universally correct approach yet. Different teams, different risk profiles, different constraints. So I care less about picking a camp and more about choosing defaults that are pragmatic for the code in front of me.

---

### Where I land

I use blast radius as the deciding variable:

- Low risk work (drafts, scaffolding, repetitive refactors): delegate aggressively.
- Medium risk work (typical user-facing features): delegate execution, but keep a strict review loop.
- High risk work (auth, security, money, destructive ops): human owns final reasoning and line-by-line review.

This is a default, not doctrine. Same split as [The Boring Stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md): the agent handles the typing, I handle the thinking.

---

### The harness lens

The more useful question is not "Are you Z or L?" The useful question is: **what does your process force before code ships?**

For me, that means:

1. Containment first ([The Sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md)).
2. Shared conventions via skills ([Skills](@/pages/harness-engineering/skills/skills.md)).
3. Independent review, not self-grading ([The Review Loop](@/pages/harness-engineering/feedback/the-review-loop.md), [Evaluator as QA](@/pages/harness-engineering/feedback/evaluator-as-qa.md)).
4. Session memory so quality compounds over time ([The Loop](@/pages/harness-engineering/thesis/the-loop.md)).

Without that harness, heavy delegation becomes YOLO very quickly.

---

### Bottom line

In practice, this debate is mostly operational:

- no harness + high delegation = speed now, cleanup later;
- no delegation = safer code, but less leverage;
- good harness = you can delegate more safely over time.

So when people ask where I sit on the continuum, my answer is simple: it depends on blast radius, and the harness sets the default.

See also:
- [Assistive vs Agentic](@/pages/harness-engineering/thesis/assistive-vs-agentic.md)
- [The Loop](@/pages/harness-engineering/thesis/the-loop.md)
- [The Review Loop](@/pages/harness-engineering/feedback/the-review-loop.md)
- [The Economics](@/pages/harness-engineering/economics/the-economics.md)
- [The Day-50 Problem](@/pages/harness-engineering/failure-modes/the-day-50-problem.md)
