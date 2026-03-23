+++
title = "The Boring Stuff"
weight = 1
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

The split is simple: the agent does the boring stuff, I do the hard stuff. But "boring" doesn't mean unimportant — it means *mechanical*. Stuff that takes time and attention but not judgment.

A few examples from real work.

## Incident investigation

During a service outage, I had the main agent doing HTTP client auditing and timeout analysis. I spawned a separate agent to verify framework-specific context behavior in isolation, and another to cross-check the incident brief against code and deployment files. The verification agent caught a version discrepancy: the brief claimed one version was deployed, but the actual deployment config had a different one. Sequential single-agent work would have missed that because the main agent was deep in a different line of investigation.

**The boring stuff:** HTTP client auditing, cross-referencing deployment configs against incident briefs, verifying version numbers across files. Mechanical but time-consuming.

**The hard stuff:** Deciding which lines of investigation to pursue. Recognizing that the version discrepancy mattered. Directing three agents at different aspects of the same problem.

## Next-day pickup

Working on a feature, I ran `/handoff` before stopping for the night. The daemon auto-filled the handoff: what I was working on, which files were uncommitted, which bugs were identified (three specific ones with file paths), what was left to do. Next morning, `/pickup` loaded all of it. No re-reading conversation history. The agent started on the first remaining bug immediately.

**The boring stuff:** Summarizing session state, tracking uncommitted files, cataloging known bugs with file paths. The daemon does this automatically on every handoff.

**The hard stuff:** Deciding when to stop. Knowing which bugs matter most the next morning. Picking up where judgment left off, not where the cursor was.

## Fact-checking a draft

I spawned two agents against git history and the codebase to verify claims in a document. They found wrong dates, inflated numbers, and a timeline that didn't match the commit log. Reported back through inter-agent messaging while I kept working on something else.

**The boring stuff:** Digging through git history, cross-referencing commit dates, counting things, checking claims against code.

**The hard stuff:** Writing the document in the first place. Deciding which claims needed verification. Knowing what to do with the discrepancies.

## Frontend + backend in parallel

When a feature spans backend and frontend, I run two agents in separate worktrees. They coordinate through messages when interface changes in the backend affect what the frontend expects. "API response shape changed, here's the new type" as a message beats holding both contexts in one session.

**The boring stuff:** Keeping two codebases in sync, propagating type changes, running tests in both worktrees.

**The hard stuff:** Designing the API contract. Deciding where the boundary between frontend and backend belongs. Reviewing the final integration.

## Skill preventing repeated mistakes

Early on, repos kept getting cloned to wrong paths. After the third time, I updated the git skill with a `references/REPO-LAYOUT.md` documenting the convention: `workspace/code/{git-server}/{org}/{repo}`. The skill now loads automatically for any git operation. That class of mistake stopped happening.

**The boring stuff:** Following the convention. Loading the right skill. Cloning to the right path every time.

**The hard stuff:** Recognizing the pattern after three failures. Deciding to encode it. Writing a convention clear enough that an LLM interprets it correctly.

## The split

Each of these follows the same pattern:

| The agent does (boring) | I do (hard) |
|-------------------------|-------------|
| Audit HTTP clients, cross-reference configs | Direct the investigation, interpret findings |
| Summarize session state, catalog bugs | Decide when to stop, prioritize next morning |
| Dig through git history, verify claims | Write the document, decide what needs checking |
| Propagate type changes, run tests in parallel | Design the API contract, review integration |
| Follow conventions, clone to right paths | Recognize patterns, encode them as skills |

The pattern: **attention is the scarce resource, not code.**
