+++
title = "pi-weaver"
description = "Teaching agents to undo — checkpoint, rewind, retry."
sort_by = "weight"
template = "pages-section.html"
page_template = "pages-page.html"
draft = true

[extra]
section_title = "pi-weaver"
+++

I built pi-weaver because I wanted a model to have one escape hatch it normally doesn't get in a terminal harness: the ability to admit that a line of attack is getting stale, rewind to a clean checkpoint, and try again without dragging the entire dead branch along for the ride.

This section is the write-up from a small but revealing test: **15 Terminal-Bench 2.0 tasks**, run with **Claude Sonnet 4.6**, once in plain Pi and once with weaver enabled.

The headline result is boring on purpose: **11/15 vs 11/15**.

But the interesting part is that the two 11s are not the same 11.

Weaver won **[db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md)** in 84 seconds after plain spent 15 minutes failing. Plain won **[qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md)** after weaver burned through six rewinds and still timed out. Across the full slice, weaver was also a little cheaper: **$5.50 vs $5.84**.

That is the whole thesis of this section:

> The value of weaver is not that it magically makes models better at everything. It changes how they spend effort. Sometimes that is exactly what you want. Sometimes it just gives failure a better narrative.

---

## Results

| Task | Plain | Cost | Weaver | Cost | TL |
|------|-------|------|--------|------|----|
| [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md) | ✅ 94s | $0.22 | ✅ 71s | $0.14 | 1 |
| [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md) | ❌ 69s | $0.09 | ❌ 439s | $0.58 | 1 |
| [regex-log](@/pages/harness-engineering/research/pi-weaver/tasks/regex-log.md) | ✅ 217s | $0.35 | ✅ 191s | $0.30 | 0 |
| [build-cython-ext](@/pages/harness-engineering/research/pi-weaver/tasks/build-cython-ext.md) | ✅ 247s | $0.63 | ✅ 355s | $0.83 | 4 |
| [configure-git-webserver](@/pages/harness-engineering/research/pi-weaver/tasks/configure-git-webserver.md) | ✅ 75s | $0.06 | ✅ 106s | $0.16 | 1 |
| [sqlite-with-gcov](@/pages/harness-engineering/research/pi-weaver/tasks/sqlite-with-gcov.md) | ❌ 178s | $0.15 | ❌ 110s | $0.11 | 1 |
| [log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md) | ✅ 34s | $0.06 | ✅ 45s | $0.08 | 1 |
| [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md) | ✅ 730s | $0.56 | ✅ 373s | $0.17 | 0 |
| [chess-best-move](@/pages/harness-engineering/research/pi-weaver/tasks/chess-best-move.md) | ❌ 901s | $0.51 | ❌ 901s | $0.80 | 0 |
| [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) | ✅ 543s | $0.28 | ❌ 900s | $0.62 | 6 |
| [custom-memory-heap-crash](@/pages/harness-engineering/research/pi-weaver/tasks/custom-memory-heap-crash.md) | ✅ 169s | $0.26 | ✅ 453s | $0.89 | 0 |
| [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) | ❌ 901s | $1.32 | ✅ 84s | $0.14 | 0 |
| [fix-git](@/pages/harness-engineering/research/pi-weaver/tasks/fix-git.md) | ✅ 43s | $0.07 | ✅ 67s | $0.10 | 1 |
| [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md) | ✅ 482s | $1.19 | ✅ 294s | $0.45 | 0 |
| [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md) | ✅ 92s | $0.09 | ✅ 110s | $0.13 | 1 |
| **Total** | **11/15** | **$5.84** | **11/15** | **$5.50** | **17** |

---

## The pages

- [The Idea](@/pages/harness-engineering/research/pi-weaver/analysis/the-idea.md) — antirez's question, Dota 2 naming, the experiment.
- [The Architecture](@/pages/harness-engineering/research/pi-weaver/analysis/architecture.md) — three iterations to get context-event pruning right.
- [The Cache Economics](@/pages/harness-engineering/research/pi-weaver/analysis/economics.md) — where the money actually went, and why I stopped thinking of rewind cost as overhead.
- [When to Rewind](@/pages/harness-engineering/research/pi-weaver/analysis/time-lapse-patterns.md) — all 17 `time_lapse` calls, and the difference between a clean reset and a grind spiral.
- [The Task Spectrum](@/pages/harness-engineering/research/pi-weaver/analysis/task-taxonomy.md) — the kinds of tasks that reward self-correction, and the ones that really don't.
- [The Decision Framework](@/pages/harness-engineering/research/pi-weaver/analysis/when-weaver-helps.md) — the simple rule I would use if I had to decide, task by task, whether to turn weaver on.

## The task pages

### Divergent outcomes
- [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) — the cleanest weaver win
- [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) — the clearest weaver failure mode

### Shared outcomes
- [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md)
- [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md)
- [regex-log](@/pages/harness-engineering/research/pi-weaver/tasks/regex-log.md)
- [build-cython-ext](@/pages/harness-engineering/research/pi-weaver/tasks/build-cython-ext.md)
- [configure-git-webserver](@/pages/harness-engineering/research/pi-weaver/tasks/configure-git-webserver.md)
- [sqlite-with-gcov](@/pages/harness-engineering/research/pi-weaver/tasks/sqlite-with-gcov.md)
- [log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md)
- [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md)
- [chess-best-move](@/pages/harness-engineering/research/pi-weaver/tasks/chess-best-move.md)
- [custom-memory-heap-crash](@/pages/harness-engineering/research/pi-weaver/tasks/custom-memory-heap-crash.md)
- [fix-git](@/pages/harness-engineering/research/pi-weaver/tasks/fix-git.md)
- [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md)
- [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md)

---

## What I think happened

There are two bad ways to read this evaluation.

The first is: *11/15 vs 11/15, so weaver does nothing.*

The second is: *weaver won a dramatic task, so obviously it should always be on.*

I don't think either is right.

What I see instead is a harness feature that helps when the model is capable of learning something decisive from failure. That is why it crushed [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) and helped on things like [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md), [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md), and [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md).

And I see the same feature becoming dangerous when the task admits endless plausible local repairs. That is what happened in [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md), and to a lesser extent in [build-cython-ext](@/pages/harness-engineering/research/pi-weaver/tasks/build-cython-ext.md) and [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md).

That split matters more than the top-line score. The score says "draw." The sessions say something more useful:

> Self-correction is real. So is self-licensed grinding.

The rest of this section is me trying to separate those two things.
