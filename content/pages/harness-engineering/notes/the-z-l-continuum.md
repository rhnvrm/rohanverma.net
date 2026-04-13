+++
title = "The Z/L Continuum"
weight = 1
template = "pages-page.html"
date = 2026-04-14
draft = false

[extra]
section_title = "Notes"
+++

I didn’t attend AI Engineer Europe 2026, so this is a reaction note, not an attendee report. It started from Alex Volkov’s recap thread (<https://x.com/altryne/status/2043748676099866771>), especially one debate that kept resurfacing in his write-up:

> "Code is a liability." (Ryan Lopopolo, OpenAI)

vs

> "Read every fucking line of critical code." (Mario Zechner, Pi)

Alex called this the **Z/L Continuum**: one end delegates almost everything to agents, the other keeps strict human ownership of critical code.

That framing clicked for me. But I don’t read it as a personality type. I read it as a risk decision.

As I wrote in the [Harness Engineering intro](@/pages/harness-engineering/_index.md):

> "Most writing about AI coding lands in one of two camps: people showing off what the model can generate, or experienced engineers explaining why none of this replaces judgment. I care about the middle: what happens when you keep the judgment, keep experimenting, and start building infrastructure around the model instead of treating the model itself as the product. That is what I mean by harness engineering."

I still agree with that. We have not converged on one universally correct way to work with agents yet. There are multiple acceptable approaches, so I’d rather stay pragmatic than pedantic: watch what others are doing, test it in your own context, and keep what holds up.

---

### What stuck with me from Alex's recap

A few takeaways felt especially accurate:

- We’re past the "AI or no AI" phase. Most teams are already using agents.
- The hard part is not generation. It’s orchestration: handoffs, context drift, retries, evals, and reliability when deadlines are real.
- Teams are shipping more, but they’re also carrying more review and operational load.
- His MHC lens (model, harness, context) is useful. Models improve fast, but harness + context decide whether those gains survive in production.

Source:
- Alex Volkov thread/post: <https://x.com/altryne/status/2043748676099866771>

---

### Where I sit right now

I’m in the middle, with a boundary based on blast radius:

- Low risk work (drafts, scaffolding, repetitive refactors): delegate aggressively.
- Medium risk work (typical user-facing features): delegate execution, but keep a strict review loop.
- High risk work (auth, security, money, destructive ops): human owns the final reasoning and line-by-line review.

This is a flexible default, not doctrine. Same principle as [The Boring Stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md): the agent handles the typing, I handle the thinking.

---

### Why this belongs in harness engineering

The useful question is not "Are you Z or L?"

The useful question is: **what does your process force before code ships?**

For me, that means:

1. Containment first ([The Sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md)).
2. Shared conventions via skills ([Skills](@/pages/harness-engineering/skills/skills.md)).
3. Independent review, not self-grading ([The Review Loop](@/pages/harness-engineering/feedback/the-review-loop.md), [Evaluator as QA](@/pages/harness-engineering/feedback/evaluator-as-qa.md)).
4. Session memory so quality compounds over time ([The Loop](@/pages/harness-engineering/thesis/the-loop.md)).

Without that harness, aggressive delegation turns into YOLO very quickly.

---

### Bottom line

The Z/L debate sounds ideological, but in day-to-day engineering it’s mostly operational:

- No harness + high delegation = speed now, cleanup later.
- No delegation = safer code, but less leverage.
- Good harness = you can delegate more safely over time.

So when people ask where I am on the continuum, my answer is simple: it depends on blast radius, and the harness sets the default.

See also:
- [Assistive vs Agentic](@/pages/harness-engineering/thesis/assistive-vs-agentic.md)
- [The Loop](@/pages/harness-engineering/thesis/the-loop.md)
- [The Review Loop](@/pages/harness-engineering/feedback/the-review-loop.md)
- [The Economics](@/pages/harness-engineering/economics/the-economics.md)
- [The Day-50 Problem](@/pages/harness-engineering/failure-modes/the-day-50-problem.md)
