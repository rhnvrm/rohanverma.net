+++
title = "Quarterly Reviews"
weight = 51
template = "pages-page.html"
date = 2025-12-31
draft = false

[extra]
section_title = "The Feedback Loop"
+++

At the end of each quarter (or at natural break points like year-end), I run a structured review of every system I maintain. Not a retrospective in the agile sense. More like a health check: what is working, what has decayed, and what needs to be cleaned up before it becomes a problem.

## The health assessment framework

The core tool is a weighted scoring table. Each area of the system gets a weight based on how much it matters, a "before" score, and an "after" score. The table looks like this:

| Area | Weight | Before | After | Issues |
|------|--------|--------|-------|--------|
| Task hygiene | 20% | — | — | Open items, stale tasks, circular dependencies |
| Reminders/calendar | 15% | — | — | Overdue items, missing dates |
| Metadata health | 15% | — | — | Missing fields, inconsistent formats |
| Daily notes | 10% | — | — | Coverage gaps, quality issues |
| Session archives | 10% | — | — | Missing summaries, broken links |
| Active projects | 15% | — | — | Stale projects, status mismatches |
| Scripts and tooling | 10% | — | — | Broken tools, missing automation |
| Calendar system | 5% | — | — | Missing events, wrong dates |

The weights reflect my priorities. Task hygiene gets the highest weight because stale tasks create false signals about what is actually in progress. Active projects get high weight because unreviewed projects accumulate silently.

Each area gets scored 0-100%. The weighted total gives an overall health score. The point is not precision (is 78% really different from 82%?). The point is direction: are things getting better or worse, and which areas need attention?

## What "cleanup" means in practice

A quarterly review is half assessment, half execution. The assessment identifies problems. Then I fix them in the same session:

**Task triage.** Close everything that is done but not marked done. Identify tasks that have been "in progress" for months without activity. Check for circular dependencies in task chains (task A blocks B, B blocks C, C blocks A). These are planning failures that compound if left unresolved.

**Stale project audit.** Any project untouched for 90+ days gets reviewed. Is it abandoned? Archive it. Is it blocked? Document the blocker. Is it still relevant? Update the status and set a next action.

**Metadata standardization.** Run scripts that check for missing or inconsistent frontmatter fields. Priority should be P0/P1/P2/P3, not a mix of "critical," "high," and "P1." Status should use a fixed vocabulary. This is boring maintenance that pays off when you search or filter later.

**Calendar reconciliation.** Remove completed reminders. Reschedule overdue items with realistic dates (not "tomorrow" for the fifth time). Add upcoming events that were discussed but not calendared.

**Tooling check.** Do the scripts still work? Are there new automation opportunities based on patterns from the quarter? Document any manual processes that should be scripted.

## System evolution pattern

Looking at how a personal knowledge management system evolves over time, I see three phases:

### Foundation (months 1-3)
Establishing the basic structure. Daily notes, project folder hierarchy, calendar system, session archival workflow. The emphasis is on consistency: pick a format and stick with it long enough to accumulate useful data.

**Key metrics at this phase**: coverage (are you actually logging things?) and structure (can you find what you logged?).

### Integration (months 3-6)
Adding a task tracker with dependencies. Connecting tasks to projects. Building a boot script that shows the current state on startup. Starting to cross-reference between daily notes, session archives, and tasks.

**Key metrics**: connectivity (do things link to each other?) and retrieval speed (can you answer "what am I working on?" in under 10 seconds?).

### Optimization (months 6+)
Formalizing patterns that emerged organically. Adding automation (hooks for session archival, scripts for metadata standardization). Running quarterly reviews to prevent decay. Building tools that operate on the accumulated data (pattern analysis, gap detection, blocker visualization).

**Key metrics**: health score trend (is the system getting cleaner over time?) and session productivity (does the system actually help you get more done?).

## The cleanup-as-practice idea

The quarterly review is not a one-time project. It is a recurring practice, like cleaning your apartment or reviewing your finances. Systems decay by default. Files accumulate. Tasks go stale. Metadata drifts. The review is what prevents gradual degradation from becoming an overwhelming mess.

I found that scheduling reviews at natural break points (quarter boundaries, year-end, before a vacation) works better than arbitrary cadences. These are times when you are already in a reflective mindset, and the cleanup gives structure to what would otherwise be unfocused "I should really organize my stuff" energy.

The weighted health score makes it concrete. Going from 58% to 88% in a single review session is motivating. Seeing which areas dragged the score down tells you where to focus next time. It turns a vague feeling of "things are messy" into a specific list of actions.

## Formalization candidates

Each quarterly review surfaces patterns worth formalizing:

- **Weekly review ritual.** A lighter version of the quarterly review, done Friday afternoons. Just task triage and calendar check. Takes 20 minutes.
- **Monthly archival batch.** First Monday of the month: archive completed projects, file session summaries, update indices.
- **Architecture decision records.** When you make a non-obvious decision, write it down in a structured format (context, decision, consequences). Future-you will thank present-you.

These are not rigid processes. They are patterns that proved useful enough to write down so they happen consistently instead of when I remember to do them.

## Metrics that matter

For a personal knowledge management system, the metrics I track:

| Metric | What it measures |
|--------|-----------------|
| Total sessions archived | System usage over time |
| Tasks closed vs created | Throughput vs accumulation |
| Projects archived | Willingness to let go of stale work |
| Stale items (90+ days untouched) | Decay rate |
| Health score trend | Overall system direction |

The single most important metric is the ratio of tasks closed to tasks created. If you are creating more tasks than you are closing, the system is accumulating debt. The quarterly review is where you reconcile that debt.
