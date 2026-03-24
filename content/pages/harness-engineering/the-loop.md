+++
title = "The Loop"
weight = 2
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

The value isn't in any single agent session. It's in the loop.

Sessions produce artifacts. Artifacts become searchable knowledge. Knowledge feeds future sessions. Every [skill](@/pages/harness-engineering/skills.md) you encode, every workflow you automate compounds across every future session and every agent you spawn. That's the bet, anyway.

---

The loop: sessions → [summaries](@/pages/harness-engineering/the-daemon.md) → searchable knowledge → better sessions. No magic flywheel. Each piece makes the next session a bit better than the last.

[The daemon](@/pages/harness-engineering/the-daemon.md) summarizes sessions automatically. [Q](@/pages/harness-engineering/q-the-task-agent.md) reads those summaries and updates task status, notes progress, flags blockers. The memory tool makes it all searchable: keyword, semantic, hybrid with LLM reranking. When an agent needs "have we worked on this before?", it finds relevant past work regardless of which session it happened in.

The key difference from traditional note-taking: the LLM writes the notes, not me. I don't decide what's worth capturing after each session. The daemon summarizes automatically, and the summaries are good enough that future agents can act on them.

---

This didn't start with infrastructure. Back in August with claude-manager, I was manually running a slash command at the end of each session to write learnings to a file. Then I automated it with Claude hooks. Then an OpenCode plugin to trigger on session idle. Now with [Pi](@/pages/harness-engineering/pi.md), file watchers on the raw session JSONL trigger summarization automatically.

Each step was just automating what I was already doing by hand. Start manual, observe what's valuable, automate the valuable parts.

---

The details of each piece have their own pages: [session history](@/pages/harness-engineering/session-history.md) for the raw numbers, [the daemon](@/pages/harness-engineering/the-daemon.md) for background automation, [Q](@/pages/harness-engineering/q-the-task-agent.md) for task management. [The economics](@/pages/harness-engineering/the-economics.md) covers what this costs. But the core idea fits in one sentence: **make every session slightly better than the last, and let it compound.**
