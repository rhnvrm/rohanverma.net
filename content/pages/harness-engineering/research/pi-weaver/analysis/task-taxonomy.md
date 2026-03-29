+++
title = "The Task Spectrum"
weight = 5
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "Harness Engineering"
+++


After the first few runs, I kept wanting to sort tasks into a clean binary:

- good for self-correction
- bad for self-correction

But the sessions don't really cooperate with that. The more honest picture is a spectrum.

Some tasks almost beg for a checkpoint-and-rewind loop. Some are basically one-shot work where rewind is theater. And some are dangerous in a more interesting way: they look like perfect self-correction candidates right up until the moment they turn into grind.

That's the spectrum I care about now.

## The simple split

> Weaver helps when failure teaches something **decisive**. It hurts when failure teaches something merely **plausible**.

That sentence explains most of the slice.

## The full taxonomy

| Task | Kind | Complexity | Self-correction fit | Weaver effect |
|---|---|---|---|---|
| [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md) | security fix | Medium | **High** | **Helped** |
| [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md) | write-from-scratch | Medium | Low | **Hurt** |
| [regex-log](@/pages/harness-engineering/research/pi-weaver/tasks/regex-log.md) | text processing | Low-Medium | Medium | **Neutral** |
| [build-cython-ext](@/pages/harness-engineering/research/pi-weaver/tasks/build-cython-ext.md) | build repair | High | Medium, risky | **Hurt** |
| [configure-git-webserver](@/pages/harness-engineering/research/pi-weaver/tasks/configure-git-webserver.md) | configuration | Medium | Low-Medium | **Hurt** |
| [sqlite-with-gcov](@/pages/harness-engineering/research/pi-weaver/tasks/sqlite-with-gcov.md) | build/configure | Medium | Medium | **Neutral** |
| [log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md) | one-shot scripting | Low | Low | **Hurt** |
| [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md) | systems bring-up | High | Medium-High | **Helped** |
| [chess-best-move](@/pages/harness-engineering/research/pi-weaver/tasks/chess-best-move.md) | vision / analysis | High | Low | **Hurt** |
| [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) | systems configure | Very high | Medium, dangerous | **Hurt badly** |
| [custom-memory-heap-crash](@/pages/harness-engineering/research/pi-weaver/tasks/custom-memory-heap-crash.md) | low-level debug | High | Medium | **Hurt** |
| [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) | forensic recovery | Medium | **Very high** | **Helped a lot** |
| [fix-git](@/pages/harness-engineering/research/pi-weaver/tasks/fix-git.md) | repository recovery | Low-Medium | **High** | **Slightly helped** |
| [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md) | recovery / search | High | **High** | **Helped** |
| [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md) | build fix | Low-Medium | Low | **Hurt** |

## Where weaver clearly helps: insight tasks

These have a compact explanation hiding underneath initial confusion. Once the model finds it, the rest gets much easier.

[db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) is the cleanest example. The problem looks like gnarly SQLite corruption until the model realizes the WAL is XOR-obfuscated. After that: decode, read, dump, verify.

[password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md) is noisier but has the same structure: a convergent search. The agent is gradually eliminating the wrong space.

When I say a task rewards self-correction, this is what I mean.

## Where weaver mostly gets in the way: straight-line tasks

Tasks where the best move is to read the prompt, inspect once, make the obvious change, and verify. The model doesn't need a loop. It needs to avoid psyching itself into having one.

[log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md), [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md), [configure-git-webserver](@/pages/harness-engineering/research/pi-weaver/tasks/configure-git-webserver.md). Not every task needs a story arc.

## The dangerous middle: grind-prone tasks

This is the part of the spectrum I care about most, because it's where the real design work is.

Some tasks have all the signs of a good rewind candidate: many moving parts, real feedback from failures, a sense that each failed attempt teaches you something. And yet those are exactly the tasks most likely to turn into expensive, disciplined non-convergence.

[qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md): each failure taught the model something true but not decisive. No TTY for `interact`. OpenSSH missing from the live image. Possible banner exchange issue. Possible DNS delay. The search space never collapsed. Weaver didn't just fail here; it legitimized continuing to fail.

The lesson is not "systems tasks are bad for rewind." [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md) is the counterexample — a messy bring-up task where weaver helped a lot. The difference is the branching structure:

> Systems tasks are good for rewind **if one successful line of attack collapses the rest of the work**.

## My working classification

### Bucket 1: Insight tasks — **best fit**
Hidden structure, one or two important corrections, cheap verification once understood.
*db-wal-recovery, fix-code-vulnerability, fix-git, password-recovery*

### Bucket 2: Direct execution tasks — **weak fit**
Answer is close to a straight-line edit. Structure mostly acts as overhead.
*log-summary-date-ranges, build-pmars, configure-git-webserver*

### Bucket 3: Branchy systems/debug tasks — **mixed fit, highest risk**
Failures are informative but not informative *enough*. Each retry creates another believable plan.
*qemu-alpine-ssh, build-cython-ext, custom-memory-heap-crash*

### Bucket 4: Capability-bound tasks — **bad fit**
Success depends on a missing modality. Harness control flow cannot substitute.
*chess-best-move*

---

> Weaver should be enabled by default on **insight tasks**, tolerated on **direct execution tasks**, and heavily constrained on **branchy systems tasks**.

That's the bridge to [The Decision Framework](@/pages/harness-engineering/research/pi-weaver/analysis/when-weaver-helps.md).
