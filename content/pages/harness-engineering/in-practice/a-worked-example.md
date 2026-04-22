+++
title = "A Worked Example"
weight = 52
template = "pages-page.html"
date = 2026-01-08
draft = false

[extra]
section_title = "In Practice"
+++

Everything described so far ([the sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md), [the daemon](@/pages/harness-engineering/feedback/the-daemon.md), [skills](@/pages/harness-engineering/skills/skills.md), [the review loop](@/pages/harness-engineering/feedback/the-review-loop.md)) is abstract until you see it work on a real problem. This is one such problem, start to finish.

For a smaller public-facing example of the same pattern, see [Building stargazers-action](/blog/2026/04/22/building-stargazers-action/).

---

## The Situation

A real-time data pipeline service was experiencing intermittent data stalls in production. The pipeline had three stages: packet receive, protocol parsing, and message publish. The team needed temporary debug logging to trace five specific data tokens through the pipeline and deploy it for overnight analysis.

## What the User Typed

```
Add debug logging to the data pipeline service to investigate
the intermittent stalls. Track these tokens through
recv/proc/pub stages: TOKEN_A, TOKEN_B, TOKEN_C, TOKEN_D, TOKEN_E.
```

That's it. Five lines. Everything else was the system's job.

## Phase 1: Context Gathering

The agent loaded the service's [skill](@/pages/harness-engineering/skills/skills.md), a markdown file describing the packet pipeline, protocol parsing, and message publishing patterns. Then it delegated exploration to a scout agent:

```
scout: In the data pipeline service workspace:
  1. How packets flow from receive through parsing to publish
  2. Where timestamps are available at each stage
  3. The existing logging patterns and logger types
  4. Both index and broadcast code paths
```

Scout mapped the pipeline across four source files, identifying the receive handler, protocol parser, and two publish paths (direct and buffered). The main agent never read those files itself. It got a structured summary and moved on to planning.

This is [model tiers](@/pages/harness-engineering/agents/model-tiers.md) in practice. Scout runs on a cheaper, faster model. It explores. The main agent stays focused on design decisions.

## Phase 2: Plan

The plan was about 100 lines. Not a 500-line specification. The task didn't need one. Key decisions:

**Log format:** Structured stdout with a `[FEED_DEBUG]` prefix, nanosecond timestamps, grep-friendly.

```
[FEED_DEBUG] stage=recv token=TOKEN_A ts=1736344245123456789
[FEED_DEBUG] stage=proc token=TOKEN_A ts=1736344245123556789 ltp=850.50
[FEED_DEBUG] stage=pub  token=TOKEN_A ts=1736344245123656789 topic=ticks.data
```

**Diagnosis strategy from the logs:** This is what made the plan useful, not just the code changes.

- Gaps in `recv` logs → upstream problem (network/source)
- `recv` fine but `proc` gaps → processing bottleneck
- `proc` fine but `pub` gaps → message publish hang

**Success criteria:**
1. Debug logs at three pipeline stages (recv, proc, pub)
2. Filtered to only the 5 target tokens
3. Structured format for easy grep/awk analysis
4. Minimal performance impact: O(1) token lookup, no allocations in the hot path

## Phase 3: Execution

The agent created a small debug helper package with an O(1) token lookup map, then added conditional logging at each pipeline stage across four files. Focused changes, nothing clever.

## Phase 4: The Review Loop Catches Real Bugs

This is where it gets interesting. [The review loop](@/pages/harness-engineering/feedback/the-review-loop.md) caught four issues that would have corrupted the overnight analysis data:

**1. Token inconsistency in broadcast path.** The debug check happened before a data modification step, but logging happened after, so the logged token could differ from the actual token being processed. Fix: cache the original token value before modifications.

**2. Redundant lookups.** Multiple O(1) token lookups per packet, across millions of packets per second. Individually cheap, collectively wasteful. Fix: cache the lookup result in a local variable.

**3. Missing publish latency.** No way to measure how long the message publish operation itself took. If the publish hung, there'd be no evidence in the logs, the exact scenario we were investigating. Fix: added a `pub_latency_ns` field measured with a timer around the publish call.

**4. Inconsistent timestamps.** `time.Now()` called at different points without caching, leading to incorrect latency calculations between stages. Fix: proper timestamp caching at each stage.

Issue #1 is the subtle one. Without the token caching fix, the debug logs would have shown inconsistent tokens in the broadcast path, the exact kind of bug that wastes hours of log analysis because the data looks almost right but doesn't quite add up.

Issue #3 is the ironic one. We were adding logging to diagnose a publish stall, and the first draft of the logging couldn't detect a publish stall.

All four issues were found during code review, fixed in place, and re-verified before committing.

---

## The Numbers

The session ran **81 messages over 52 minutes**, touching **12 files** including a skill documentation update. Not a marathon. Not a demo. A normal Tuesday debugging session that happened to produce better code because the review loop was there.

## What Made This Work

**Skills loaded first.** The service skill gave the agent context about the packet pipeline before it wrote any code. Without this, half the context window would have been spent rediscovering what the team already knew. See [skills](@/pages/harness-engineering/skills/skills.md).

**Scout explored, the main agent planned.** The agent didn't read every source file. Scout mapped the pipeline, the main agent designed the logging format and analysis strategy. Context stays focused on high-level decisions. See [model tiers](@/pages/harness-engineering/agents/model-tiers.md).

**Review gates caught real bugs.** Not style nits. Not formatting complaints. Four bugs that would have undermined the entire debugging exercise. See [the review loop](@/pages/harness-engineering/feedback/the-review-loop.md).

**Plan proportional to task.** 100 lines, clear success criteria, a log format design, analysis instructions. The plan told you how to *use* the output, not just how to generate it.

---

The pattern is repeatable: prompt → scout explores → plan with success criteria → execute → review catches the subtle stuff. The individual components aren't magic. The value is in the composition, and the fact that each step runs inside [the sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md), with [session history](@/pages/harness-engineering/feedback/session-history.md) recorded automatically, and the review loop there whether you remember to invoke it or not.
