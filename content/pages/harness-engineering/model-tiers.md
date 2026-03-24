+++
title = "Model Tiers"
weight = 18
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Agents reference tier names, not model strings. Four tiers: lite, medium, high, oracle. Defined in `config.toml`, resolved at spawn time. Change one line, every agent updates.

---

This sounds like a minor abstraction. It's not. The cost variance between tiers is about 55x. Lite (Haiku) ran 2,287 sessions for $140 total. High (Opus) ran 430 sessions for $1,444. That makes tier selection a real engineering decision, not just a preference.

[The daemon](@/pages/harness-engineering/the-daemon.md) uses lite — cheap for [session summarization](@/pages/harness-engineering/session-summarization.md), handoff filling, background housekeeping. Main coding sessions use high. Deep reasoning tasks — architecture reviews, complex debugging — use oracle. The tier system means I think about *what kind of thinking* each task needs, not which specific model to invoke.

---

The deeper value is provider decoupling. Agent definitions are markdown files with `${models.high}` variables. A preprocessor interpolates them against `config.toml` and writes the final definitions. Swap Anthropic for OpenAI by changing 4 lines in config, not editing 40 agent files. When a new model drops — or a provider changes pricing — the update is mechanical.

This is how [Pi](@/pages/harness-engineering/pi.md) and [the sandbox](@/pages/harness-engineering/the-sandbox.md) work together. Pi defines agents as markdown. The sandbox's config preprocessor resolves the variables. The result is deterministic: same config, same agents, every time.

---

The 55x cost variance also explains why [the economics](@/pages/harness-engineering/the-economics.md) look the way they do. Cost is extremely top-heavy — the top 10% of sessions account for almost all spend. Those are the high and oracle tier sessions. The hundreds of lite sessions that keep the system running are nearly free. The tier system makes this explicit rather than accidental.
