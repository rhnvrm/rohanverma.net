+++
title = "Chronicles"
weight = 22
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "The Feedback Loop"
+++

Chronicles are not [session summaries](@/pages/harness-engineering/feedback/session-summarization.md). Summaries capture individual sessions: what happened in this one conversation. Chronicles synthesize *across* sessions into longer narratives: "what happened this week on the mesh coordination work." Builder's logs, generated from session data.

---

A two-agent pipeline produces them. The chronicle-analyzer runs hourly, reads session summaries, and produces a JSON analysis: which sessions belong to which journey, what the arc is, what's significant. The chronicle-scribe watches the analysis directory and generates prose. Markdown output, organized by month, landing in `workspace/users/{you}/public/chronicles/`.

About 120 chronicle entries from the bosun era, plus 234 older ones from before this setup existed. Eight months of work in there. What I did, why decisions got made, what went wrong, what worked.

---

I keep finding uses. Standup briefings. "What did I actually ship this week?" without reconstructing it from git logs and memory. Decision audit trails. "Why did we switch from channels to sync.Cond and then back?" Progress tracking across long-running projects. [Handoff](@/pages/harness-engineering/feedback/handoffs.md) documentation for threads of work that span weeks.

The public chronicles feed the [builder's log](https://oddship.net/chronicles/). Writing about what you're building while you're building it, except the agents do the writing.

---

Chronicles are part of [the loop](@/pages/harness-engineering/thesis/the-loop.md): sessions produce JSONL, [the daemon](@/pages/harness-engineering/feedback/the-daemon.md) summarizes them, summaries feed chronicles, chronicles become searchable knowledge in [session history](@/pages/harness-engineering/feedback/session-history.md). Each layer adds more structure. Raw logs → structured summaries → narrative chronicles. The further up the chain, the more useful for humans. The further down, the more useful for agents.

---

Building the chronicle system was itself a chronicle-worthy story. The first implementation dumped everything into one expensive Sonnet call: read all session files, analyze, synthesize. $0.15 per chronicle. The fix: delegate the reading to Haiku, parallelize the writing across multiple Haiku scribes, use Sonnet only for orchestration. A single documentation fix unlocked the proper architecture, and costs dropped 12x.

> The realization hit when I calculated token usage. The first chronicle consumed ~50K tokens, mostly reading session files into the expensive Sonnet model. The fix was obvious in hindsight: delegate file reading to a cheaper model. Not all work should be done by the most capable model.
>
> *Chronicle: Building the Chronicle System, Jan 2026*
