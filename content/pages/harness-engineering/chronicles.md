+++
title = "Chronicles"
weight = 22
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Chronicles are not [session summaries](@/pages/harness-engineering/session-summarization.md). Summaries capture individual sessions — what happened in this one conversation. Chronicles synthesize *across* sessions into longer narratives: "what happened this week on the mesh coordination work." Builder's logs, generated from session data.

---

A two-agent pipeline produces them. The chronicle-analyzer runs hourly, reads session summaries, and produces a JSON analysis — which sessions belong to which journey, what the arc is, what's significant. The chronicle-scribe watches the analysis directory and generates prose. Markdown output, organized by month, landing in `workspace/users/{you}/public/chronicles/`.

32 bosun chronicles and 234 older ones from before this setup existed. Eight months of work in there — what I did, why decisions got made, what went wrong, what worked.

---

I keep finding uses. Standup briefings — "what did I actually ship this week?" without reconstructing it from git logs and memory. Decision audit trails — "why did we switch from channels to sync.Cond and then back?" Progress tracking across long-running projects. [Handoff](@/pages/harness-engineering/handoffs.md) documentation for threads of work that span weeks.

The public chronicles feed the [builder's log](https://oddship.net/chronicles/). Writing about what you're building while you're building it — except the agents do the writing.

---

Chronicles are part of [the loop](@/pages/harness-engineering/the-loop.md): sessions produce JSONL, [the daemon](@/pages/harness-engineering/the-daemon.md) summarizes them, summaries feed chronicles, chronicles become searchable knowledge in [session history](@/pages/harness-engineering/session-history.md). Each layer adds more structure. Raw logs → structured summaries → narrative chronicles. The further up the chain, the more useful for humans. The further down, the more useful for agents.
