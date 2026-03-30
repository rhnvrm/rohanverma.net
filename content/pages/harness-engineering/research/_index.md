+++
title = "Research"
sort_by = "weight"
weight = 9
template = "pages-section.html"
page_template = "pages-page.html"
draft = false

[extra]
section_title = "Research"
+++

Most of [harness engineering](@/pages/harness-engineering/_index.md) is infrastructure work: building the loop, encoding skills, wiring agents together. This section is where I test whether the infrastructure actually changes outcomes.

The methodology is simple: pick a harness feature, run it against a benchmark with and without, and write up what happened honestly. Not just the numbers. The session traces, the economics, the failure modes.

---

### [pi-weaver](@/pages/harness-engineering/research/pi-weaver/_index.md)

Teaching agents to undo. Checkpoint, rewind, retry.

15-task Terminal-Bench 2.0 eval with Claude Sonnet 4.6. Both variants scored 11/15, different tasks. Weaver 5% cheaper overall. The interesting part is which tasks it helps and which it hurts.

22 pages: per-task session traces, token economics, a taxonomy of when self-correction works, and an honest accounting of when it becomes self-licensed grinding.

[Read the write-up →](@/pages/harness-engineering/research/pi-weaver/_index.md)
