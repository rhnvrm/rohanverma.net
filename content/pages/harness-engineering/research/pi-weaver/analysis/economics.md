+++
title = "The Cache Economics"
weight = 3
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "Harness Engineering"
+++


When I first added rewind to pi-weaver, I thought about the extra tokens the way most people would: overhead.

Extra prompt text. Extra tool calls. Extra turns. Extra cost.

That's true in the narrow sense, but it turned out to be the wrong frame.

After looking at the 15-task Sonnet 4.6 slice, I think the better framing is this:

> Rewind is usually **tuition**, not overhead.

That distinction matters.

Overhead is money you spend without changing the shape of the work. Tuition is money you spend in order to learn something that changes the rest of the run.

Sometimes pi-weaver absolutely wastes money. [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) is the poster child for that, and I'll get to it. But in aggregate, the economics were better than I expected.

Both plain Pi and Pi-with-weaver finished **11/15**. Weaver still ended up slightly cheaper: **$5.50 vs $5.84**.

Not a revolution. But not nothing either.

## Where the money actually went

Across all 15 tasks, the spend broke down like this:

| Category | Plain | Weaver | Delta |
|---|---:|---:|---:|
| Input | $0.0195 | $0.0014 | **-$0.0181** |
| Output | $2.7016 | $2.6907 | **-$0.0109** |
| Cache read | $1.8385 | $1.6155 | **-$0.2230** |
| Cache write | $1.2814 | $1.1969 | **-$0.0845** |
| **Total** | **$5.8409** | **$5.5044** | **-$0.3365** |

The first thing I expected to see was that weaver spent more on output because it was doing more narration around checkpoints and rewinds.

It didn't.

Output spend was basically the same.

The real difference came from cache behavior:

- **Plain cache spend:** $3.1199 read+write
- **Weaver cache spend:** $2.8124 read+write

Which is interesting, because it means the economic story is not "weaver makes the model brief." It doesn't. The story is closer to this:

> When rewind works, it lets the model stop carrying dead context forward. The saving shows up as lower cache reread and lower cache rewrite spend.

## The savings were not evenly distributed

This is not a story about broad, gentle optimization. It's a story about a few outsized wins paying for a bunch of smaller losses.

Weaver was cheaper on **6 of 15** tasks:

| Task | Plain | Weaver | Savings |
|---|---:|---:|---:|
| [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) | $1.3216 | $0.1440 | **-$1.1776** |
| [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md) | $1.1902 | $0.4541 | **-$0.7361** |
| [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md) | $0.5641 | $0.1736 | **-$0.3904** |
| [fix-code-vulnerability](@/pages/harness-engineering/research/pi-weaver/tasks/fix-code-vulnerability.md) | $0.2229 | $0.1428 | -$0.0801 |
| [regex-log](@/pages/harness-engineering/research/pi-weaver/tasks/regex-log.md) | $0.3494 | $0.2953 | -$0.0541 |
| [sqlite-with-gcov](@/pages/harness-engineering/research/pi-weaver/tasks/sqlite-with-gcov.md) | $0.1507 | $0.1137 | -$0.0370 |

Those first three tasks alone saved **$2.30**.

That's the whole economic shape of the run, really. Weaver loses a little here, a little there, and then occasionally saves an enormous amount by finding the right abstraction early.

[db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) is the clearest example. Plain burned fifteen minutes and $1.32 failing. Weaver recognized that the WAL file had effectively been XOR-obfuscated, decoded it, and finished in **84 seconds** for **$0.14**.

That single task paid for a lot of experimentation elsewhere.

## And yes, it also wasted money

Weaver was more expensive on **9 of 15** tasks. The worst:

| Task | Plain | Weaver | Extra spend |
|---|---:|---:|---:|
| [custom-memory-heap-crash](@/pages/harness-engineering/research/pi-weaver/tasks/custom-memory-heap-crash.md) | $0.2556 | $0.8945 | **+$0.6388** |
| [polyglot-c-py](@/pages/harness-engineering/research/pi-weaver/tasks/polyglot-c-py.md) | $0.0913 | $0.5791 | **+$0.4878** |
| [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) | $0.2827 | $0.6164 | **+$0.3336** |

`custom-memory-heap-crash` is the kind of task where plain already had a decent line of attack. Weaver just bought more searching, more checking, more machinery. Same pass, much worse economics.

`polyglot-c-py` is where rewind became a license to keep polishing a brittle idea. The session kept getting closer to something that felt elegant, while the benchmark remained very unimpressed.

`qemu-alpine-ssh` is the expensive failure I can't hand-wave away. Plain passed. Weaver spent more than twice as much, called `time_lapse` six times, and still failed. That wasn't overhead. That was tuition that never paid back.

## What a rewind costs

The interesting bit, economically, is what the *next* assistant turn looks like after a rewind. Across the 17 `time_lapse` calls, the average next turn:

- **input:** 3 tokens
- **cacheRead:** ~11,500 tokens
- **cacheWrite:** ~400 tokens
- **cost:** about **$0.01**

A rewind doesn't restart the task from scratch. It does almost the opposite: tiny fresh input, heavy reuse of cached prefix, small new suffix.

So the direct cost of a rewind is not the scary part. The scary part is the loop it enables.

A single rewind is cheap. The question is whether it buys you a better next attempt.

## The part I changed my mind about

Before running this, I would have told you the cost risk of weaver was the obvious stuff: bigger system prompt, more tool calls, more bookkeeping turns.

After reading the sessions, I think that is mostly the wrong mental model.

The bigger risk is not the fixed tax. It's the **behavioral tax**.

If rewind helps the model throw away dead branches, it's a bargain. If rewind convinces the model that one more tidy replan is justified, it becomes expensive very quickly.

> Does this task admit a small number of high-value course corrections, or does it reward endless local repair?

If it's the first kind, rewind is cheap and often worth it. If it's the second kind, rewind is how you end up paying for a nicer failure.

## Bottom line

Weaver was not free.

But on this slice, it was also not a tax collector. It was a **selective allocator**. It moved spend away from some long dead-end sessions and into a few high-leverage recoveries.

I came out of this believing two things at once.

First: cache-aware rewind is economically viable. The raw token numbers are better than I expected.

Second: [the economics](@/pages/harness-engineering/the-economics.md) are downstream of task selection. If you turn weaver on indiscriminately, it will absolutely spend money teaching the model lessons the task never cashes out.

If the economics tell me rewind is affordable, [When to Rewind](@/pages/harness-engineering/research/pi-weaver/analysis/time-lapse-patterns.md) tells me when it actually deserves to happen.
