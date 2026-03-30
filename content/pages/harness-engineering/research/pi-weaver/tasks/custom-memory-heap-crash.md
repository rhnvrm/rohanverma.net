+++
title = "custom-memory-heap-crash"
weight = 15
template = "pages-page.html"
date = 2026-03-29
draft = false

[extra]
section_title = "Harness Engineering"
+++


This task is the cleanest example I found of weaver turning into overthinking.

Not confusion. Not incompetence. Overthinking.

Both variants found the real root cause. Both fixed the program. Both passed. But plain pi moved from diagnosis to patch like it had somewhere to be, while weaver kept trying to *deserve* the fix by proving more things than the task required.

That's a useful failure mode to name, because it's easy to confuse with rigor.

| Variant | Result | Time | Cost |
|---|---:|---:|---:|
| Plain | pass | 169s | $0.2556 |
| Weaver | pass | 453s | $0.8945 |

**Category**: debugging  
**Difficulty**: medium  
**Verdict**: weaver-hurts

## What the task actually asked
Fix a C++ program in `/app` that crashes in RELEASE mode but not DEBUG mode. Only `/app/user.cpp` may be modified. The result must compile in both modes and show no leaks under Valgrind.

This is a great trap because "release-only crash" invites grand theories: UB, optimizer bugs, allocator mismatch, library patching, teardown order, all of it. The trick is knowing when you've understood enough to patch.

## What plain pi did
Plain pi was brisk in a way I respect.

It compiled both modes, confirmed the release-only failure, ran Valgrind, and then went straight to the custom libstdc++ material in `/build/patches`. From there it formed the right model quickly: the modified standard library was doing locale-facet registration in a way that interacted badly with cleanup order under the custom heap.

Once it had that, the session didn't write a dissertation. It made the fix in `/app/user.cpp`, rebuilt DEBUG and RELEASE, reran the binaries, checked Valgrind, and stopped.

That's the entire story.

The boring version of debugging is underrated. You don't get extra credit for emotionally bonding with the root cause.

## What weaver did
Weaver actually understood the bug early. That's what makes this result interesting.

The run compiled both variants, found the custom libstdc++ sources, read `locale_init.cc`, located the modified `_Facet_Register_impl` path, and checkpointed a diagnosis that was basically right: release-mode teardown and locale facet registration were interacting badly, and the fix belonged in `user.cpp`.

At that point, I expected a quick patch.

Instead the session got ambitious.

It tried one edit. Rebuilt. Still crashed.

Then it started doing the sort of work that looks impressive in a transcript:

- inspecting more of `locale_init.cc`
- reading `locale_classes.tcc`
- checking whether `std::flush` actually triggered facet registration
- generating assembly for `user.cpp`
- inspecting symbols with `nm`
- disassembling the custom libstdc++ with `objdump`
- reasoning about inlining of `has_facet`
- testing whether direct or indirect paths would preserve the needed side effect under `-O2`

That's all real debugging. It's not wasted in some absolute sense. But relative to the task, it's [tuition](@/pages/harness-engineering/economics/the-economics.md).

Eventually weaver settled on the working answer: forward-declare the hidden registration function and call it directly from `user_init()`. Then everything passed.

So yes, the run was correct. It was also expensive in the specific way smart people get expensive: by continuing to optimize certainty after correctness is already within reach.

## The real divergence
The divergence here is not insight. It's stopping criteria.

Plain pi understood enough, patched, verified, and quit. Weaver understood enough, then kept asking whether it could derive an even cleaner or more principled explanation of why the patch worked.

That instinct is valuable in research. It's not always valuable in repair.

I keep thinking about the line: [the split is simple](@/pages/harness-engineering/thesis/the-boring-stuff.md). The agent does the boring stuff, I do the hard stuff. On this task, the "hard stuff" was not deeper analysis. It was deciding to trust the analysis already earned.

That's what plain pi did better.

## Token economics
The numbers are lopsided in exactly the way the trace feels.

| Variant | Turns | Tool calls | Notable tools | Output tokens | Cache read | Cache write | Cost |
|---|---:|---:|---|---:|---:|---:|---:|
| Plain | 14 | 21 | `bash:15`, `read:5`, `write:1` | 9,550 | 134,100 | 19,230 | $0.2556 |
| Weaver | 42 | 49 | `checkpoint:2`, `bash:35`, `read:4`, `edit:7`, `done:1` | 24,867 | 1,123,283 | 49,160 | $0.8945 |

Plain was about 2.7x faster and about 3.5x cheaper.

Those aren't marginal losses. That's what over-analysis looks like when you meter it.

## What this taught me
This page is the counterexample I want next to [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) and [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md).

Weaver is not automatically better on "hard debugging." In fact, when the path from diagnosis to patch is short and verifiable, extra reflective structure can encourage the model to keep proving things after the practical question has already been answered.

The value isn't in any single checkpoint. It's in [the loop](@/pages/harness-engineering/thesis/the-loop.md). And if the loop doesn't know when to stop, rigor turns into drag.

This task taught me to ask a sharper question: is the model still reducing uncertainty that matters, or is it just polishing the explanation because polishing feels productive?

That distinction matters more than most benchmark summaries let on.
