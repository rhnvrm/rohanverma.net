+++
title = "pi-weaver"
description = "Teaching agents to undo — checkpoint, rewind, retry."
sort_by = "weight"
template = "pages-section.html"
page_template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

On March 27, antirez [posted](https://x.com/antirez/status/2037488794379653620) about agent harnesses needing the ability to "jump back in history trimming what follows, just injecting some self-steering text." And the harder question: whether models can use this without explicit reinforcement learning.

I built pi-weaver to find out. Three tools — checkpoint, time_lapse, done — that give the model control over its own conversation context. Named after Dota 2's Weaver, whose ultimate reverses position, health, and mana to 5 seconds ago.

We ran 15 Terminal-Bench 2.0 tasks with Sonnet 4.6. Plain pi and pi+weaver both scored 11/15 — same pass rate, different tasks. The interesting question isn't "does it work" but "when does it help and when does it hurt."

---

### The Idea

[The Idea](@/pages/harness-engineering/research/pi-weaver/analysis/the-idea.md) — antirez's question, Dota 2 naming, the experiment.

[The Architecture](@/pages/harness-engineering/research/pi-weaver/analysis/architecture.md) — three iterations to get context-event pruning right.

### What We Found

[The Cache Economics](@/pages/harness-engineering/research/pi-weaver/analysis/economics.md) — when context pruning pays for itself.

[When to Rewind](@/pages/harness-engineering/research/pi-weaver/analysis/time-lapse-patterns.md) — 17 time_lapse calls, cataloged.

[The Task Spectrum](@/pages/harness-engineering/research/pi-weaver/analysis/task-taxonomy.md) — which tasks benefit from self-correction.

[The Decision Framework](@/pages/harness-engineering/research/pi-weaver/analysis/when-weaver-helps.md) — when to enable weaver, when not to.

### The Full Results (15 tasks)

| Task | Plain | Weaver | Verdict |
|------|-------|--------|---------|
| [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md) | ✅ $0.22 | ✅ $0.14 | weaver-helps |
| [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md) | ❌ $0.09 | ❌ $0.58 | weaver-hurts |
| [regex-log](@/pages/harness-engineering/research/pi-weaver/tasks/regex-log.md) | ✅ $0.35 | ✅ $0.30 | neutral |
| [build-cython-ext](@/pages/harness-engineering/research/pi-weaver/tasks/build-cython-ext.md) | ✅ $0.63 | ✅ $0.83 | weaver-hurts |
| [configure-git-webserver](@/pages/harness-engineering/research/pi-weaver/tasks/configure-git-webserver.md) | ✅ $0.06 | ✅ $0.16 | weaver-hurts |
| [sqlite-with-gcov](@/pages/harness-engineering/research/pi-weaver/tasks/sqlite-with-gcov.md) | ❌ $0.15 | ❌ $0.11 | neutral |
| [log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md) | ✅ $0.06 | ✅ $0.08 | weaver-hurts |
| [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md) | ✅ $0.56 | ✅ $0.17 | weaver-helps |
| [chess-best-move](@/pages/harness-engineering/research/pi-weaver/tasks/chess-best-move.md) | ❌ $0.51 | ❌ $0.80 | weaver-hurts |
| [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) | ✅ $0.28 | ❌ $0.62 | **plain-wins** |
| [custom-memory-heap-crash](@/pages/harness-engineering/research/pi-weaver/tasks/custom-memory-heap-crash.md) | ✅ $0.26 | ✅ $0.89 | weaver-hurts |
| [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) | ❌ $1.32 | ✅ $0.14 | **weaver-wins** |
| [fix-git](@/pages/harness-engineering/research/pi-weaver/tasks/fix-git.md) | ✅ $0.07 | ✅ $0.10 | weaver-hurts |
| [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md) | ✅ $1.19 | ✅ $0.45 | weaver-helps |
| [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md) | ✅ $0.09 | ✅ $0.13 | neutral |
| **Total** | **11/15 $5.84** | **11/15 $5.55** | |

Weaver is 5% cheaper overall. One task where only weaver passes (db-wal-recovery). One task where only plain passes (qemu-alpine-ssh). The rest: same outcome, different paths.
