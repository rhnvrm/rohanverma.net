+++
title = "Harness Assumptions Decay"
weight = 21
template = "pages-page.html"
date = 2026-03-25
draft = true

[extra]
section_title = "Harness Engineering"
+++

Every piece of a harness exists because the model couldn't do something on its own. Sprint decomposition because it lost coherence on long tasks. Evaluator agents because it couldn't judge its own work. Context resets because compaction wasn't enough. Each component encodes an assumption about a model limitation, and those assumptions go stale faster than you'd expect.

---

Anthropic put it directly in their [harness design post](https://www.anthropic.com/engineering/harness-design-long-running-apps): "every component in a harness encodes an assumption about what the model can't do on its own, and those assumptions are worth stress testing, both because they may be incorrect, and because they can quickly go stale as models improve." They lived it: Opus 4.5 needed sprint decomposition to maintain coherence. Opus 4.6 didn't. One model release made an entire architectural component unnecessary. The sprint construct, the per-sprint QA contracts, the negotiation phases. All of it was load-bearing scaffolding that stopped being load-bearing when the model got better.

---

I've been through this cycle multiple times. The migration from claude-manager to OpenCode to Pi wasn't just changing tools. It was shedding assumptions at each step.

Claude-manager assumed the model couldn't access files, so I was the clipboard. OpenCode removed that assumption. OpenCode assumed you needed a server-client architecture for multi-agent work. Pi proved a single process worked better. The daemon's session summarization started with elaborate prompts because I assumed Haiku needed hand-holding. It turned out a lighter prompt produced better summaries. The model was more capable than the scaffolding gave it credit for.

Each time, the pattern is the same: build the scaffolding, watch it work, then periodically ask "does this piece still earn its keep?" Sometimes the answer is yes. [Skills](@/pages/harness-engineering/skills.md) and [handoffs](@/pages/harness-engineering/handoffs.md) remain valuable regardless of model improvements, because they solve coordination problems, not capability problems. But the mechanical scaffolding (retry logic, decomposition layers, explicit step-by-step prompts), that stuff decays.

---

The practical question is when to revisit. New model releases are the obvious trigger. But capability improvements aren't always announced — sometimes a model just handles something better and you don't notice because the scaffolding is still doing the work. Anthropic's approach was methodical: remove one component at a time and review the impact. Radical simplification didn't work because they couldn't tell what broke. Incremental removal did.

I do something similar but less formal. When a component annoys me — too slow, too complex, too many edge cases — I try removing it. If nothing breaks, it was dead weight. If something breaks, I know it's still load-bearing and I put it back. The [start manual, automate later](@/pages/harness-engineering/start-manual-automate-later.md) pattern in reverse: start automated, periodically check if the automation is still earning its complexity.

The harness should get simpler over time, not more complex. If it's only growing, you're probably maintaining assumptions the model outgrew months ago. That's the thing about [model tiers](@/pages/harness-engineering/model-tiers.md) and [how it evolved](@/pages/harness-engineering/how-it-evolved.md) — the interesting work isn't building more infrastructure. It's knowing when to tear it down.
