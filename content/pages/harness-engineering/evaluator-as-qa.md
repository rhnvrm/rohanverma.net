+++
title = "Evaluator as QA"
weight = 20
template = "pages-page.html"
date = 2026-03-25
draft = true

[extra]
section_title = "Harness Engineering"
+++

The agent doing the work shouldn't be the one judging it. This sounds obvious when you say it out loud — we don't let developers approve their own pull requests — but it's the default in most agent setups. One agent writes code, checks if it works, and moves on. The problem is that models are bad at criticizing their own output. They'll find a bug, talk themselves into thinking it's fine, and approve the work anyway.

---

Anthropic documented this clearly in their [harness design work](https://www.anthropic.com/engineering/harness-design-long-running-apps). When asked to evaluate their own output, agents "confidently praise the work — even when, to a human observer, the quality is obviously mediocre." This showed up hardest on subjective tasks like frontend design, where there's no binary pass/fail. But even on tasks with verifiable outcomes, the generator still exhibited poor judgment about its own work.

Their fix was structural: separate the generator from the evaluator. A dedicated evaluator agent with calibrated criteria — few-shot examples, explicit scoring rubrics, hard thresholds that trigger rework. The evaluator used Playwright to actually click through the running application, filing bugs against specific contract criteria. Sprint 3 alone had 27 criteria covering the level editor.

The separation doesn't magically make the evaluator honest. It's still an LLM inclined to be generous toward LLM output. But here's the key insight: tuning a standalone evaluator to be skeptical is far more tractable than making a generator critical of its own work. You can iterate on the evaluator's prompt — read its logs, find where its judgment diverged from yours, tighten the criteria — without touching the generator at all. Once that external feedback exists, the generator has something concrete to iterate against.

---

Bosun has the same separation, arrived at independently. The `verify` agent reviews code changes. The `review` agent does deeper analysis. The `editorial` agent checks writing. None of them wrote the thing they're judging. When the verify agent flags a problem, the coding agent gets specific feedback instead of self-reassurance.

The pattern extends beyond code. [Chronicles](@/pages/harness-engineering/chronicles.md) use a two-agent pipeline: an analyzer identifies what's significant, a scribe writes the narrative. The scribe doesn't decide what matters — that judgment is already made.

---

Getting an evaluator to be useful takes real work. Anthropic describes "several rounds" of reading evaluator logs and updating prompts before the grading matched their expectations. I've had the same experience: the first version of any review agent is too lenient. You tighten it by watching it work and fixing the places where it lets things slide.

The reward is that evaluation quality compounds separately from generation quality. Better models make both better, but you can improve them independently. That's what makes this more tractable than the "just tell the agent to be more careful" approach, which never seems to stick.

This connects to [the omakase tradeoff](@/pages/harness-engineering/the-omakase-tradeoff.md) — owning your evaluator means tuning it to your standards, not someone else's. To [coordination](@/pages/harness-engineering/coordination.md) — multi-agent work makes the separation natural. And to [the boring stuff](@/pages/harness-engineering/the-boring-stuff.md) — QA is mechanical work where agents genuinely help, as long as they're not grading their own homework.
