+++
title = "The Foreman Problem"
weight = 36
template = "pages-page.html"
date = 2026-03-29
draft = false

[extra]
section_title = "Agents & Coordination"
+++

The most expensive agent in a multi-agent session is often the one that doesn't visibly produce the deliverable.

That sounds wrong until you actually look at the numbers.

In this 50-hour session, total cost was about **$220**. Rough breakdown: roughly **$120 on orchestration**, **$50 on eval**, **$30 on wiki writing**, and **$15 on reviews**. By one measure, orchestration overhead was only **13.4%** of turns. By cost, though, it was the majority. The foreman cost more than the crew.

I don't think that's obviously a failure.

I think it's the shape of the work.

---

The orchestrator here wasn't sitting idle. Over **1,510 turns**, it was doing the unglamorous but essential stuff:

- **22 `spawn_agent` calls**
- **30 `mesh_send` calls**
- **20 `capture_pane` checks**
- repeated status checks, review passes, output triage, and course corrections

That work doesn't look like bricks being laid. It looks like waiting, judging, redirecting, comparing options, spotting when an agent has gone vague, deciding whether a result is good enough, and figuring out what to do next.

This is why the cheap-manager fantasy doesn't hold up.

People look at a multi-agent system and assume the manager should be lightweight because the workers are the ones doing the "real" work. But orchestration isn't just message passing. The orchestrator has to make the hardest judgment calls in the whole session.

If three agents give you three plausible pages, someone has to decide which one is actually good. If a review pass says there are broken links, someone has to tell real issues from false positives. If a deckhand fails because of a [sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md) problem, someone has to recognize the failure mode and choose the next move. If prose is technically correct but dead on arrival, someone has to notice.

That's not clerical work. That's taste, judgment, and system-level awareness.

---

The construction analogy is boring but useful.

A foreman doesn't lay the bricks. A foreman also doesn't need to be the fastest bricklayer on site. But if the foreman can't recognize a bad foundation, poor sequencing, or sloppy work, you've saved money in exactly the wrong place.

Same thing here.

In this session, worker agents were often cheaper and narrower. That made sense. Some were good at writing pages. Some were good at audits. Some were good at specific implementation tasks. But the orchestrator had to be smart enough to evaluate all of them. That's why the orchestrator ended up running at expensive rates. It wasn't paying for verbosity. It was paying for judgment.

I think that's the real foreman problem: **orchestration has to be at least as smart as the hardest judgment call in the session**.

If your workers are writing prose, the orchestrator has to know good prose from bad prose.

If your workers are implementing architecture, the orchestrator has to know when a design is fragile.

If your workers are producing eval numbers, the orchestrator has to know when a bug invalidates the whole run.

If it can't do those things, the labor savings below it are fake. You just built a pipeline for scaling bad decisions.

---

This also explains why turn-based overhead can understate the real cost.

The 13.4% figure is useful, but it hides the fact that the expensive cognition was concentrated at the top. One high-capability orchestrator spending a minority of turns on coordination can still dominate total dollars if the workers are cheaper. That is exactly what happened here.

And again, I don't think the answer is "make orchestration cheaper." Not blindly.

The answer is to be honest about what orchestration is doing.

Some of it really is overhead and should be reduced. Repetitive polling, duplicate messages, manual status chasing, weak handoff protocols. All of that should get better. But some of it is irreducible. Somebody has to synthesize context across phases, compare outputs from different agents, and make decisions under uncertainty. That's the job.

The session made this especially clear because the outputs were mixed: code, evaluation, writing, navigation, and editorial quality. A weak orchestrator could maybe keep the queue moving. It could not reliably judge whether the system was producing anything worth shipping.

That connects directly to [model tiers](@/pages/harness-engineering/agents/model-tiers.md). You can and should use cheaper agents for bounded work. But the top of the tree often needs the best model you have, because that's where cross-domain judgment lives. It also connects to [the economics](@/pages/harness-engineering/economics/the-economics.md): the expensive part of these systems is often not generation, it's decision quality. And to [coordination](@/pages/harness-engineering/agents/coordination.md): coordinating agents is not just routing tasks, it's maintaining standards.

So yes, the foreman cost more than the workers.

That isn't the scandal.

The scandal would be pretending you can replace the foreman with the cheapest available model and still trust the result.