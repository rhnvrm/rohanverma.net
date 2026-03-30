+++
title = "Tmux as Process Model"
weight = 28
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Each agent gets a tmux window. Visible, named, inspectable. Not a hidden background process. The hierarchy is session → window → pane, and you can see everything at a glance with `alt+s` (the tmux sidebar).

---

Agents live in tmux windows, not background processes. You can see what every agent is doing at any time. Switch to its window, read its output, watch it work. When an agent is stuck, you see it stuck. When it's making a mistake, you catch it mid-stream. Background processes hide their work until they're done — or broken. (Daemon workflows can also run without tmux for headless/CI scenarios, but interactive work lives in tmux.)

`just start` creates a tmux session, starts [the daemon](@/pages/harness-engineering/the-daemon.md), generates [configs](@/pages/harness-engineering/config-as-code.md), and launches Pi inside [the sandbox](@/pages/harness-engineering/the-sandbox.md). The tmux config itself ships into the bwrap sandbox, so agents get the same keybindings and layout. `just worker name` adds a window for another agent. Each window is a named target for `send_keys` and `capture_pane`.

---

Why not containers? Why not a daemon that manages agent lifecycles? Because tmux gives you observability for free. Every window is a terminal you can attach to. No log files to tail, no APIs to query. The state of the system is visible by looking at the tmux session.

The [coordination](@/pages/harness-engineering/coordination.md) layer runs on top of this but is independent of tmux. Pi-mesh is a Pi extension that hooks into the agent lifecycle directly — it doesn't use tmux for messaging. Tmux handles process lifecycle (starting, stopping, visibility). Mesh handles communication (messages, reservations, presence). You could run the same mesh over Ghostty or Zellij. Separate concerns, composed together.

---

Lessons learned the hard way: daemon processes dying when parent tmux sessions closed. Multiple daemon instances spawning without proper cleanup. Tmux session management is its own skill — literally, there's a tmux orchestration skill that encodes these patterns so agents don't rediscover them.

The TUI dashboard I built for the daemon was replaced 7 commits later by a tmux layout. Simpler wins. A tmux session with named windows *is* a dashboard. Each window shows one agent's work. The session list is the agent roster. No custom UI needed.

[The omakase tradeoff](@/pages/harness-engineering/the-omakase-tradeoff.md) in miniature: use existing Unix tools instead of building custom ones. Tmux has been solving process management and terminal multiplexing for decades. I just needed to use it.
