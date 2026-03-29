+++
title = "Session Summarization"
weight = 17
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

When a session goes idle, [the daemon](@/pages/harness-engineering/the-daemon.md) spawns a Haiku agent to generate a structured summary. Cheap model, fast turnaround. The summary has YAML frontmatter: tags, files touched, duration — and a narrative section: what worked, what didn't, key insights. These accumulate in `workspace/users/{you}/sessions/`.

The uniform frontmatter matters. Consistent schema plus predictable filenames means tools can discover, filter, and aggregate sessions without manual intervention. [Q](@/pages/harness-engineering/q-the-task-agent.md) reads these summaries. The memory tool searches them. Future agents draw on them. The structure is what makes [the loop](@/pages/harness-engineering/the-loop.md) mechanical instead of aspirational.

---

Not every session is worth summarizing. Batch processing with age-based filtering skips trivial sessions — one to three messages, quick questions, throwaway explorations. This reduces summarization work by about 70%. The daemon doesn't waste tokens on "how do I format a date in Go."

A catchup-sessions workflow runs hourly and at startup, preparing briefings from whatever accumulated while the system was off. Laptop sleeps, flights, weekends. When I come back, the summaries are waiting.

---

Early on, the daemon kept timing out on summarization. I assumed the summarizer was slow. The actual problem: I was loading the full agent system prompt plus the entire session JSONL into the LLM context. The [model tier](@/pages/harness-engineering/model-tiers.md) was right (Haiku is cheap), but the prompt was bloated. Switching to a lite agent — smaller system prompt, less overhead. Fixed it immediately. I still added dynamic timeouts (60s base + 15s per 100 messages) because an 1,800-message session genuinely takes a while, but the initial timeouts were self-inflicted.

---

Session summarization is the engine behind [session history](@/pages/harness-engineering/session-history.md). The raw JSONL logs are the data. The summaries are the knowledge. Without summarization, you have 4,000 conversation logs nobody reads. With it, you have a searchable corpus that makes every future session a bit more informed.

And like everything else in this system, it [started manual](@/pages/harness-engineering/start-manual-automate-later.md). A slash command I ran by hand at the end of each session. Then hooks. Then a plugin. Then file watchers. Each step just automated what I was already doing.

---

When I finally measured the backlog, the numbers were humbling. 401 JSONL files over 5KB, 263 unsummarized — a 65% backlog. The bulk analysis confirmed what I suspected: most sessions are noise (greetings, navigation), and only about 30% warrant documentation. That's what made the filtering worthwhile.

> The numbers were striking: 401 JSONL files > 5KB across the entire sessions directory, with 263 remaining unsummarized (~65% backlog). Most sessions are trivial single-message interactions. Only a subset have substantive work worth documenting.
>
> — *Chronicle: Session Summarization & Analysis Automation, Feb 2026*
