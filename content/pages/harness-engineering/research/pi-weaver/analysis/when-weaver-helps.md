+++
title = "The Decision Framework"
weight = 6
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "Harness Engineering"
+++

# The Decision Framework

After reading all 30 sessions, I don't think "use weaver" is the right default question.

The right question is:

> **What kind of mistake am I expecting this task to produce?**

If the likely mistake is crisp and recoverable, weaver is great.
If the likely mistake is one of many plausible local detours, weaver can make the whole thing worse.

That is the decision framework I ended up with.

## The short version

I would enable weaver when:
- the task has **hidden structure**
- failure is likely to teach something **decisive**
- verification is strong enough to tell the model when it actually got somewhere

I would avoid or constrain weaver when:
- the task is mostly **straight-line work**
- the model is missing a **base capability**
- the task admits endless plausible local repairs

That is the big takeaway from the two divergent tasks.

- [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) is exactly the kind of task weaver should attack.
- [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) is exactly the kind of task where weaver needs a leash.

## When weaver helps

### 1. The task has a hidden compact explanation
This is the strongest predictor I saw.

[db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) looked hard until it didn't. Once the model recognized the WAL file was XOR-obfuscated, everything after that became cheap and obvious.

Other examples: [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md), [fix-git](@/pages/harness-engineering/research/pi-weaver/tasks/fix-git.md), [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md). In all of those, failure or orientation led to a **narrower task**, not just a better explanation of the same task.

### 2. The task has a strong verifier
Weaver is much more useful when the environment can say something stronger than "maybe."

Good verifier shapes: exact record counts, a specific failing test, a known artifact format, a known repo state.

This matters because rewind is only as good as the information it gets to compress. If the verifier can strongly reject a branch, rewind helps the model avoid carrying that branch forward.

### 3. The task benefits from a reconnaissance phase
Some tasks really do get easier if the model gets one orientation pass before acting.

[qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md) is the best example. Not trivial, but once the model had environmental understanding, it didn't need to keep rediscovering setup facts.

## When weaver hurts

### 1. The task is already direct
[log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md) and [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md): read the prompt, inspect once, edit once, verify, leave. Weaver bought extra process for no real gain.

### 2. The task is capability-bound
[chess-best-move](@/pages/harness-engineering/research/pi-weaver/tasks/chess-best-move.md): if the model lacks the perceptual grounding to do the core task, a checkpointing loop won't save it.

> Don't ask a control-flow feature to compensate for a capability gap.

### 3. The task is branchy in the wrong way
This is the real hazard class.

[qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md): the model learned true things — no TTY for interact, OpenSSH absent from live image, banner exchange hanging, DNS delay, tmux escape sequences. Read as bullet points, they sound like progress. In the run, they were progress-shaped expenditure.

Each rewind made the next attempt sound more justified. The search space never actually collapsed.

## The grind risk

I think of grind as the failure mode where rewind becomes a permission slip.

Not a permission slip to flail randomly. Something worse: a permission slip to fail in a disciplined, expensive, increasingly articulate way.

> **Grind is when each retry improves the local story without improving the global odds.**

## The practical rule

### Enable weaver by default when:
- there is likely a **hidden compact explanation**
- the verifier will strongly reward the right branch
- one or two course corrections could change the whole run

*Bug fixing with a narrow patch surface. Recovery/forensics. Repo state repair. Constrained search with strong validation.*

### Prefer plain mode when:
- the task is effectively direct execution
- the answer is close to obvious after one inspection pass

*Small scripts. Build flag fixes. Direct config edits.*

### Use weaver but constrain it when:
- the task is systems-heavy
- failures are informative but not decisive
- each retry could spawn another plausible subplan

*VM bring-up. Build/debug with layered environment problems. Integration with many moving parts.*

## The guardrails I now want

### 1. Cap repeated rewinds to the same checkpoint
If the model rewinds to the same point three or four times, it's probably learning details, not collapsing the branch structure.

### 2. Force a strategy break after repeated rewinds
Not "try again, but cleaner." A real strategy break: change the tool path, change the verification approach, or stop.

### 3. Detect harness-focused work
When the model starts fixing its own automation scaffolding rather than the task, that's a strong grind indicator. That's basically what happened late in [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md).

### 4. Treat tiny direct tasks differently
On tasks like [build-pmars](@/pages/harness-engineering/research/pi-weaver/tasks/build-pmars.md) or [log-summary-date-ranges](@/pages/harness-engineering/research/pi-weaver/tasks/log-summary-date-ranges.md), a lighter-weight mode beats full weaver ceremony.

---

## The sentence I'd put on the tin

> Use weaver when failure can teach the model something **decisive**. Don't use it when failure merely generates a better next theory.

That reconciles the superficially weird result of **11/15 vs 11/15**.

The score says tie. The sessions say something more useful: weaver is real leverage on the right tasks, real drag on the wrong ones, and the difference is mostly about whether the task rewards insight or rewards persistence.

[The Cache Economics](@/pages/harness-engineering/research/pi-weaver/analysis/economics.md) shows the token spend follows the same pattern. [The Task Spectrum](@/pages/harness-engineering/research/pi-weaver/analysis/task-taxonomy.md) is the coarse taxonomy. This page is the rule I'd actually use.

**Insight tasks: yes.**
**Direct tasks: mostly no.**
**Branchy systems tasks: only with guardrails.**
