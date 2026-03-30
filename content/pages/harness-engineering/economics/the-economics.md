+++
title = "The Economics"
weight = 14
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Economics & Origins"
+++

The economics of AI coding are in flux. Open-source models are getting cheaper fast, and even the frontier providers keep dropping prices. Here are the honest numbers.

---

Seven months of actual spend: about $700 in subscriptions. Raw API cost, what it would have been per-token, was roughly $3,500. The subscription caps the cost. You get more value the more you use it.

The breakdown by era: Claude Pro ($20/month) for the copy-paste era, maybe $100 total. Claude Max ($200/month) for the OpenCode era. One month consumed $1,534 of compute for $200. Same Max subscription for the Pi/bosun era, with exact cost data from session JSONL logs.

Cost is extremely top-heavy. A small number of deep investigation and architecture sessions account for most of the total spend. Most sessions are cheap: quick questions, small edits, context gathering. In the [pi-weaver research](@/pages/harness-engineering/research/pi-weaver/analysis/economics.md), the eval phase alone (28.5% of time) consumed the most per-call, while the analysis phase cost a fraction of that.

---

The best way to manage costs right now is subscriptions. I don't track per-session costs closely. [The daemon](@/pages/harness-engineering/feedback/the-daemon.md) uses Haiku (cheap). Main sessions use Opus or Sonnet (not cheap). The total is a real number I've chosen to treat as tuition rather than overhead.

Tuition, not overhead. That framing matters. I'm not optimizing for ROI on a per-session basis. I'm investing in learning the paradigm, understanding how agents work, where they break, what makes them better. The [session history](@/pages/harness-engineering/feedback/session-history.md) is the tuition receipt. The [skills](@/pages/harness-engineering/skills/skills.md) are what I learned.

---

The economics will catch up. Models get cheaper. Context windows get larger. The harder questions will be about what to do with these tools, not whether you can afford them. Spending the "expensive" period learning how they work should pay off when the costs drop.

For reference, Anthropic published numbers from their harness work: a solo agent built a retro game maker in 20 minutes for $9. Their full planner/generator/evaluator harness took 6 hours and cost $200, over 20x more expensive. A DAW (digital audio workstation) run cost $124 across nearly 4 hours. The output quality difference was obvious in both cases: the solo run produced a game where the core gameplay was broken, while the harness version actually worked. That tracks with what I see. The expensive sessions aren't waste. They're the ones where the agent does real work instead of producing something that looks right but falls apart when you use it.

Same bet as [the loop](@/pages/harness-engineering/thesis/the-loop.md): invest now, compound later. For a closer look at where the money actually goes in a multi-agent session, see [the foreman problem](@/pages/harness-engineering/agents/the-foreman-problem.md).
