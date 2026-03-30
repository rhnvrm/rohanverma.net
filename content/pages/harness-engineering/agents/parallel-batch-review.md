+++
title = "Parallel Batch Review"
weight = 30
template = "pages-page.html"
date = 2026-03-30
draft = false

[extra]
section_title = "Agents & Coordination"
+++

Before publishing 81 pages, I needed to check all of them for PII, broken links, employer-sensitive content, factual errors, and AI writing tics. One agent reviewing 81 files sequentially would take forever. So I split the work into batches and spawned six Haiku agents in parallel.

The whole review finished in minutes.

---

The split was by section, not arbitrary. Each batch gets files that share context, so the agent can notice section-level inconsistencies:

| Batch | Scope | Files |
|-------|-------|-------|
| 1 | Essays, Go, Systems, TIL | 11 |
| 2 | Mental Models | 8 |
| 3 | Harness: thesis, sandbox, skills, agents | 18 |
| 4 | Harness: feedback, economics, failure-modes | 21 |
| 5 | Pi-weaver research | 23 |
| 6 | Cross-link and image verification | all |

Batches 1–5 each got the same checklist: flag factual inaccuracies, PII (colleague names, internal URLs, task IDs), employer-internal content (service names, proprietary details), reputation risks, broken cross-links, and AI-isms ("tapestry," "landscape," "delve"). Batch 6 was structural: verify every `@/pages/...` cross-link resolves to an actual file, verify every `/images/...` reference exists in `static/`.

Each agent reported back via `mesh_send`. I collected the six reports and compiled a scorecard.

Result: zero high or medium issues. One low-severity flag: an unverified "top 10% of sessions" claim in the economics page. Fixed it in two minutes.

---

This is [model tiers](@/pages/harness-engineering/agents/model-tiers.md) in practice. Review is read-heavy pattern matching. It does not need frontier reasoning. Haiku is 10-20x cheaper than Sonnet, and for checklist-style review, it is plenty. You would never spawn six Opus agents to grep for PII. You would burn your entire token budget and get the same answer.

The fan-out/fan-in pattern is simple:

1. Orchestrator splits work into batches
2. Spawn one cheap agent per batch with a checklist
3. Agents review independently, no coordination needed
4. Each reports findings via mesh
5. Orchestrator aggregates into a scorecard

The key constraint is that the work must be parallelizable. File-level review is. Each file stands alone. There is no dependency between reviewing `nocebo.md` and reviewing `the-loop.md`. That makes it embarrassingly parallel.

---

When to reach for this pattern: you have 20+ items that need the same treatment, the items are independent, and the task is bounded (checklist, not open-ended judgment). Pre-publish QA. Migration validation. Lint passes. Format checks. Anything where a human would say "I need to check all of these for the same thing."

When not to: if the task requires cross-file reasoning (architecture review, narrative consistency), a single smarter agent reading everything in sequence will do better than six cheap ones reading in isolation.

The interesting failure mode is false confidence. Six agents saying "all clean" feels authoritative. But Haiku can miss subtle issues that Sonnet would catch. For this use case (PII, broken links, obvious AI-isms) it is the right tradeoff. For something like "does the argument in this 2,000-word essay actually hold together," I would use a different model.

---

See also: [model tiers](@/pages/harness-engineering/agents/model-tiers.md), [coordination](@/pages/harness-engineering/agents/coordination.md), [the foreman problem](@/pages/harness-engineering/agents/the-foreman-problem.md)
