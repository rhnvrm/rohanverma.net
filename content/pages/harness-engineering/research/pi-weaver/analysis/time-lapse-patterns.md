+++
title = "When to Rewind"
weight = 21
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "Harness Engineering"
+++

# When to Rewind

Pi-weaver called `time_lapse` **17 times** across these 15 Sonnet 4.6 runs.

That number is small enough to read every one, which is exactly what I did.

I expected to come away with a clean rule like "rewind helps when the model is stuck" or "rewind hurts when the task is hard." Instead I got something more specific:

> A rewind is good when it **collapses the search space**. It's bad when it just **improves the narration of the search**.

That sounds subtle, but in the sessions it was obvious.

Some rewinds took a messy orientation phase and turned it into a sharp plan. Those were great.

Some rewinds took a real mistake, named it clearly, and let the model continue without dragging the mistake's context forward. Also great.

And some rewinds turned into a kind of beautifully explained grinding, where each iteration sounded smarter than the last while the task itself did not get meaningfully closer to done.

That last category is the real risk.

## The four patterns I saw

### 1. Orientation shedding
The model does reconnaissance, figures out what matters, checkpoints that state, and rewinds to a clean context with a compact steering summary. Not backtracking — pruning.

### 2. Failure recovery
The model actually made a mistake, or learned something concrete from a failed attempt, then rewound with a revised plan. This is what I originally wanted the feature for.

### 3. Context sanitation
Sometimes the rewind was not about a new idea at all. It was about cleaning up a conversation that had become noisy or slightly misleading. Less glamorous than failure recovery, but still valuable.

### 4. Grind
The model keeps discovering locally true things, keeps writing increasingly plausible steering text, and keeps paying for more attempts — but the task's actual search space is not getting smaller.

> Rewind is excellent at compressing insight. It is terrible at telling you when you no longer have one.

---

## The complete catalog

### 1. [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md)
**Steering:** CWE-93 / CRLF injection; `_hkey`/`_hval` need to reject control chars.
**Pattern:** orientation shedding — **helped**

Cleanest positive case. Rewind converted reconnaissance into an exact patch plan.

### 2. [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md)
**Steering:** the triple-quote approach worked; the continuation approach broke Python; go back.
**Pattern:** failure recovery — **hurt**

Sensible diagnosis but the task still ate time without converting into a pass.

### 3–6. [build-cython-ext](@/pages/harness-engineering/research/pi-weaver/tasks/build-cython-ext.md) (4 rewinds)
- **#3** orientation shedding: apply NumPy fixes, then build — **neutral**
- **#4** context sanitation: grep exit 1 was a false alarm — **neutral**
- **#5** failure recovery: missing setuptools — **neutral**
- **#6** failure recovery / grind: missing pytest, serial blocker hunt — **hurt**

By rewind #6, the model is still making progress, but the task has turned into a dependency tail. The rewind isn't wrong. It's just no longer buying leverage.

### 7. [configure-git-webserver](@/pages/harness-engineering/research/pi-weaver/tasks/configure-git-webserver.md)
**Steering:** Ubuntu 24.04, no systemd; create git user, bare repo, nginx on 8080.
**Pattern:** orientation shedding — **hurt**

Plain was already perfectly capable. The rewind added process, not capability.

### 8. [sqlite-with-gcov](@/pages/harness-engineering/research/pi-weaver/tasks/sqlite-with-gcov.md)
**Steering:** compiler and gcov installed; unpack SQLite, configure with coverage flags.
**Pattern:** orientation shedding — **neutral**

Both failed, but weaver failed faster and cheaper.

### 9. [log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md)
**Steering:** logs follow date-stamped naming; count severities by period.
**Pattern:** orientation shedding — **hurt**

Too small a task to benefit from a reset. Reads like hygiene, acts like overhead.

### 10–15. [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) (6 rewinds)
- **#10** orientation shedding: boot Alpine, configure SSH — **neutral**
- **#11** failure recovery: `interact` needs a TTY, switch to serial socket — **hurt**
- **#12** failure recovery: Alpine live ISO lacks OpenSSH, install with apk — **neutral**
- **#13** failure recovery / grind: sshd runs but banner exchange times out — **hurt**
- **#14** failure recovery / grind: likely DNS hang, rewrite sshd_config — **hurt**
- **#15** context sanitation / grind: tmux escape sequences breaking prompt matching — **hurt**

By rewind #15, the model is improving the automation framework around the task more than the task itself.

### 16. [fix-git](@/pages/harness-engineering/research/pi-weaver/tasks/fix-git.md)
**Steering:** orphaned commit found; merge conflict resolved; finalize with `git commit`.
**Pattern:** failure recovery — **helped**

Smallest, nicest self-correction in the set. Concrete mistake, precise recovery, done.

### 17. [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md)
**Steering:** source extracted; remove `-DXWINGRAPHX` and `-lX11`, then build.
**Pattern:** orientation shedding — **hurt**

The model didn't need a dramatic reset. It needed to edit the Makefile.

---

## What the count hides

The distribution matters more than the total:

- **1 rewind** each: 7 tasks
- **4 rewinds:** build-cython-ext
- **6 rewinds:** qemu-alpine-ssh
- **0 rewinds:** db-wal-recovery, password-recovery, qemu-startup, chess-best-move, custom-memory-heap-crash

That last group is important. Some of the biggest weaver wins happened with **no rewind at all**.

Rewind is not the product. The product is the *option* to rewind when the task benefits from it. The value isn't in invoking the tool a lot. It's in using it when the session has learned something worth compressing.

## The sentence I keep coming back to

When I read the six qemu-alpine-ssh steering summaries back to back, they're all intelligent. They all sound like progress. In isolation, I probably would have nodded along with every one.

And that's the trap.

The harness needs a way to distinguish:
- **we learned something that reduces the search space**
from
- **we learned something true inside the same-sized search space**

Weaver is good at the first. It currently blesses the second too easily.

That's why I think of rewind as a sharp tool instead of a general feature. It can absolutely improve a session. It can also make a doomed session look increasingly well-run.

The next question is which tasks tend to fall into which bucket. That's what [The Task Spectrum](@/pages/harness-engineering/research/pi-weaver/analysis/task-taxonomy.md) is about.
