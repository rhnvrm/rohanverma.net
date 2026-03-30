+++
title = "The Daemon"
weight = 10
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "The Feedback Loop"
+++

The daemon runs in its own tmux session, watching for file changes. It's the background automation that turns raw [session history](@/pages/harness-engineering/feedback/session-history.md) into structured knowledge.

```
┌─────────────────────────────────────────────────────────┐
│                   daemon process                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  File Watchers (chokidar)                         │  │
│  │  - sessions/**/*.jsonl → summarize-session        │  │
│  │  - handoffs/**/*.md    → fill-handoff             │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Rules Engine (heartbeat-based)                   │  │
│  │  - Evaluates TypeScript predicates each tick      │  │
│  │  - Replaces cron (survives laptop sleep)          │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Control Socket                                   │  │
│  │  - trigger, status, reload                        │  │
│  │  - Receives commands from daemon() tool           │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Inbox (workspace/users/{you}/inbox.json)         │  │
│  │  - Tracks background tasks                        │  │
│  │  - pending → running → done/failed                │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

*Session summarization.* When a session goes idle, the daemon spawns a Haiku agent to generate a structured summary. YAML frontmatter with tags, files touched, duration. Narrative with "what worked", "what didn't", "key insights." These accumulate in `workspace/users/{you}/sessions/`.

*Handoff filling.* `/handoff` checkpoints your work. The daemon detects the new file and fills in context: what you were working on, where you left off, what's next. `/pickup` loads it when you're back. No re-reading conversation history.

*Chronicles.* Session summaries feed into longer [builder's log](https://oddship.net/chronicles/) narratives, grouped by journey.

The session flow looks like this:

```
  Pi Session Activity
        │
        ▼
  sessions/*.jsonl            ← Pi writes messages as JSONL
        │
        ▼ (file watcher detects change)
  Daemon Watcher
    1. Debounce rapid changes (5s)
    2. Read agent identity from JSONL
    3. Check message count vs last summary
    4. Spawn lightweight agent to summarize
        │
        ▼
  workspace/users/{you}/sessions/YYYY-MM/
    {timestamp}_{session-id}.md
    YAML frontmatter + narrative summary
```

---

The daemon doesn't use cron. Cron schedules break when the laptop sleeps. Instead, a heartbeat-based rules engine polls on an interval, evaluating TypeScript predicates against current state. File watchers set trigger flags, rules check flags on each heartbeat. Watches are declarative in `config.toml`. The daemon talks to the active agent through filesystem IPC: JSON command files watched with chokidar.

Getting it reliable took some debugging. Early on, the daemon kept timing out summarizing sessions. I assumed the summarizer was slow. The actual problem: I was loading the full agent system prompt plus the entire session JSONL into the LLM context. Switching to a lite agent (smaller prompt, less overhead) fixed it immediately. I still added dynamic timeouts (60s base + 15s per 100 messages) because an 1,800-message session genuinely takes a while, but the initial timeouts were self-inflicted.

The daemon went through a clean architectural transition too. About 1,000 lines of legacy event-handler code got replaced by the workflow system, and the `catchup-sessions` workflow replaced manual summarization.

> I reviewed the Pi update changelog and identified the implications for bosun. The new version is stable enough to remove the old event-handler style daemon system. Deleted approximately 1000 lines of old TypeScript daemon handlers. These had been redundant with the workflow system for some time. Added a `catchup-sessions` workflow for automated session summarization.
>
> *Chronicle: Daemon Infrastructure Modernization, Feb 2026*

---

This didn't start with the daemon. Back in August with claude-manager, I was manually running a slash command at the end of each session to write learnings to a file. Then I automated it with Claude hooks. Then an OpenCode plugin to trigger on session idle. Now with [Pi](@/pages/harness-engineering/economics/pi.md), file watchers on the raw session JSONL trigger summarization automatically.

Each step was just automating what I was already doing by hand. Start manual, observe what's valuable, automate the valuable parts. [The loop](@/pages/harness-engineering/thesis/the-loop.md), applied to itself.
