+++
title = "The Loop"
weight = 2
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

Coding sessions produce artifacts. The daemon turns them into searchable knowledge. Q uses that knowledge to track what's in flight. The key difference from traditional note-taking or knowledge management: the LLM writes the notes, not me. I don't decide what's worth capturing after each session. The daemon summarizes automatically, and the summaries are good enough that future agents can act on them.

This didn't start with the daemon. Back in August with claude-manager, I was manually running a slash command at the end of each session to write learnings to a file. Then I automated it with Claude hooks and `claude -p` using Haiku. Then an OpenCode plugin to trigger on session idle. Now with Pi, file watchers on the raw session JSONL trigger summarization automatically. Each step was just automating what I was already doing by hand. Start manual, observe what's valuable, automate the valuable parts.

## The daemon

The daemon runs in its own tmux session, watching for file changes:

- **Session summarization.** When a session goes idle, the daemon spawns a Haiku agent to generate a structured summary. YAML frontmatter with tags, files touched, duration. Narrative with "what worked", "what didn't", "key insights." These accumulate in `workspace/users/{you}/sessions/`.
- **Handoff filling.** `/handoff` checkpoints your work. The daemon detects the new file and fills in context: what you were working on, where you left off, what's next. `/pickup` loads it when you're back.
- **Chronicles.** Session summaries feed into longer [builder's log](https://oddship.net/chronicles/) narratives, grouped by journey.[^heartbeat]

[^heartbeat]: The daemon doesn't use cron. Cron schedules break when the laptop sleeps. Instead, a heartbeat-based rules engine polls on an interval, evaluating TypeScript predicates against current state. File watchers set trigger flags, rules check flags on each heartbeat. Watches are declarative in config.toml. The daemon talks to the active agent through filesystem IPC: JSON command files watched with chokidar.[^daemonipc] Getting it reliable took some debugging.[^daemontimeout]

[^daemonipc]: Spawning Pi from daemon scripts requires `stdio: ["ignore", "pipe", "pipe"]` with the `--print` flag. If stdin isn't set to "ignore", Pi hangs forever waiting for input. `--print` runs non-interactively: no TUI, no extension lifecycle, just prompt in, response out.

[^daemontimeout]: Early on, the daemon kept timing out summarizing sessions. I assumed the summarizer was slow. The actual problem: I was loading the full agent system prompt plus the entire session JSONL into the LLM context. Switching to a lite agent (smaller prompt, less overhead) fixed it immediately. I still added dynamic timeouts (60s base + 15s per 100 messages) because an 1,800-message session genuinely takes a while, but the initial timeouts were self-inflicted.

## Q: the task agent

Agents are good at executive function. Tracking what's in flight, updating status, flagging blockers, keeping priorities straight. Humans have a limited decision quota each day. Q is a persistent agent that handles this: tasks, projects, roadmaps, running in its own tmux session with CLI tools (`qt`, `qp`, `qr`). Everything is markdown with YAML frontmatter.[^qtask]

[^qtask]: During one session, Q autonomously synced 15 session summaries into task updates while I was focused on writing. That's the daemon-Q pipeline: sessions generate JSONL, daemon summarizes, Q reads summaries and updates tasks.

Q sits between the daemon and the coding agents. The daemon produces session summaries. Q reads them and updates task status, notes progress, flags blockers. When I start a new session, Q has an up-to-date picture because it's been processing summaries in the background. The `qmd` tool searches across everything: tasks, sessions, handoffs, chronicles.[^qmd]

[^qmd]: `qmd` is a CLI that searches all markdown in the workspace. Keyword search (fast, grep-based), semantic search (embedding-based), and hybrid with LLM reranking. When an agent needs "have we worked on X before?", `qmd search "exchange broadcast parsing"` finds it regardless of which session it happened in.

## The loop, end to end

Sessions produce JSONL. The daemon summarizes them. Q updates tasks. `qmd` makes it all searchable. Future sessions draw on that knowledge. No magic flywheel. Each piece makes the next session a bit better than the last.

The core insight after eight months: the value isn't in any single agent session. It's in the loop. Sessions produce artifacts, artifacts become searchable knowledge, knowledge feeds future sessions. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn.[^xkcd]

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.
