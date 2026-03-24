+++
title = "Token Caching"
weight = 25
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Cache read tokens cost about a tenth of fresh input. That changes [the economics](@/pages/harness-engineering/the-economics.md).

---

[Pi](@/pages/harness-engineering/pi.md) uses provider-native caching — not a custom layer — via `cache_control` blocks on the system prompt and last user message. Four token categories get tracked: input, output, cacheRead, cacheWrite. In multi-turn sessions, 50-90% of input tokens can come from cache. The cost difference is real.

One small detail with big impact: the system prompt includes only the date, not the time. If the prompt included a timestamp that changed every minute, the cache would invalidate constantly. Date-only means the cache holds across reloads within a day. The kind of optimization you only think about after watching your cache hit rate and wondering why it's low.

---

Provider TTLs vary: 5 minutes (Anthropic), 1 hour (OpenAI), 24 hours (self-hosted). The Anthropic TTL is tight — a 5-minute pause between prompts and you're paying full price again. This matters for the [model tier](@/pages/harness-engineering/model-tiers.md) decision: an Opus session with good cache hits might cost less than you'd expect, but only if you're actively working. Walk away for coffee and the cache is gone.

---

Something I want to try: cache-aware forking. Read a 10,000-token codebase once (cached), then branch into three parallel investigations that all reuse the cached context. Each branch pays only for its unique input, not the shared base. [Coordination](@/pages/harness-engineering/coordination.md) and caching overlap here — multi-agent work gets cheaper when agents share a cached context foundation.

---

[Model tiers](@/pages/harness-engineering/model-tiers.md) decide *which* model you use. Caching decides *how much of the context you pay for twice*. They're the two cost levers. Tiers are the coarse knob — 55x variance between lite and oracle. Caching is the fine knob — 10x variance between cached and uncached reads within the same tier. Together they explain why the actual spend is so much lower than the raw token math would suggest.
