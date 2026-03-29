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

[The daemon](@/pages/harness-engineering/the-daemon.md) uses lite — cheap for [session summarization](@/pages/harness-engineering/session-summarization.md), handoff filling, background housekeeping. Main coding sessions use high. Deep reasoning tasks (architecture reviews, complex debugging) use oracle. The tier system means I think about *what kind of thinking* each task needs, not which specific model to invoke.

---

Provider decoupling matters more than the tiers themselves. Agent definitions are markdown files with `${models.high}` variables. A preprocessor interpolates them against `config.toml` and writes the final definitions. Swap Anthropic for OpenAI by changing 4 lines in config, not editing 40 agent files. When a new model drops, or a provider changes pricing — the update is mechanical.

[Pi](@/pages/harness-engineering/pi.md) and [the sandbox](@/pages/harness-engineering/the-sandbox.md) connect here. Pi defines agents as markdown. The sandbox's config preprocessor resolves the variables. The result is deterministic: same config, same agents, every time.

---

Anthropic's own harness work illustrates why tiers matter in a different way. Their long-running coding harness required sprint decomposition on Opus 4.5 — the model couldn't sustain coherence across a full build without breaking the work into chunks. Opus 4.6 removed that need entirely. The model could run for over two hours coherently without sprints. Their takeaway: "every component in a harness encodes an assumption about what the model can't do on its own, and those assumptions are worth stress testing, both because they may be incorrect, and because they can quickly go stale as models improve." Tiers make this practical. When a new model drops, you test whether the high-tier tasks still need a high-tier model, or whether medium handles them now. The abstraction layer means you're testing capability, not rewriting agent definitions.

The 55x cost variance also explains why [the economics](@/pages/harness-engineering/the-economics.md) look the way they do. Cost is extremely top-heavy: the top 10% of sessions account for almost all spend. Those are the high and oracle tier sessions. The hundreds of lite sessions that keep the system running are nearly free. The tier system makes this explicit rather than accidental.
