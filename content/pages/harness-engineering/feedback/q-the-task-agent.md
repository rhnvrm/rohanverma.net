+++
title = "Q, the Task Agent"
weight = 11
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "The Feedback Loop"
+++

Agents are good at executive function. Tracking what's in flight, updating status, flagging blockers, keeping priorities straight. Humans have a limited decision quota each day. Q is a persistent agent that handles this.

---

Q runs in its own tmux session with CLI tools: `qt` for tasks, `qp` for projects, `qr` for roadmaps. Everything is markdown with YAML frontmatter. No database, no hidden state. Tasks are versioned files you can grep, diff, and commit.

Q sits between [the daemon](@/pages/harness-engineering/feedback/the-daemon.md) and the coding agents. The daemon produces [session summaries](@/pages/harness-engineering/feedback/session-history.md). Q reads them and updates task status, notes progress, flags blockers. When I start a new session, Q has an up-to-date picture because it's been processing summaries in the background.

During one session, Q autonomously synced 15 session summaries into task updates while I was focused on writing. That's the pipeline: sessions generate JSONL, daemon summarizes, Q reads summaries and updates tasks.

---

`qmd` searches across tasks, sessions, handoffs, chronicles. Keyword search (grep-based, fast), semantic search (embedding-based), or hybrid with LLM reranking. When an agent needs "have we worked on X before?", it finds relevant work regardless of which session it happened in.

---

Without Q, [the loop](@/pages/harness-engineering/thesis/the-loop.md) is aspirational. Session summaries accumulate but nobody reads them. With Q, they get processed into task updates that future agents actually use. That's when the loop started feeling like a system instead of a pipe dream.

The 115 tracked tasks, 27 handoff files, and 120 chronicle entries didn't organize themselves. Q did. While I was doing other things. [The boring stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) thesis, except for project management instead of code.
