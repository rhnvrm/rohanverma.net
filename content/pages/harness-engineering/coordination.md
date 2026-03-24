+++
title = "Coordination"
weight = 7
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

The setup uses tmux. Multiple agents in separate windows. Without a coordination layer, they'd talk through `tmux_capture` and `tmux_send` — polling the terminal, parsing output, sleeping, trying again. For Pi-to-Pi communication, polling the terminal is the wrong abstraction. You want async messaging.

---

I had my agent search Pi's extension directory for prior art and found [pi-messenger](https://github.com/nicobailon/pi-messenger) by Nico Bailon. He had already solved the hard problems: file-based messaging, presence detection, the overlay UI. Much of [pi-mesh](https://github.com/rhnvrm/pi-mesh)'s UX comes directly from his work.

So I built pi-mesh. Just the coordination layer. No daemon, no server, no central orchestrator. Files on disk. Two Pi sessions in the same project directory find each other automatically. Everything lives in `.pi/mesh/`: a registry directory (one JSON file per agent), inbox directories (messages as JSON files), and an append-only feed.

---

Five tools: `mesh_peers` (who's active, what model), `mesh_reserve` and `mesh_release` (claim files before editing), `mesh_send` (message another agent), and `mesh_manage` (rename, set status, view feed).

Reservations hook Pi's `edit` and `write` tools. Another agent trying to edit a reserved file gets blocked with a message telling them who has it and why. Can an agent `sed -i` a reserved file through the shell and bypass the hook? Yes. Blocking bash would mean parsing shell commands, which is a rabbit hole. The reservation system prevents the common case, not every possible case. In practice, Pi's tool control mitigates this: some agents only get `read` and `write`, no `bash` at all.

---

When a feature spans backend and frontend, I run two agents in separate worktrees. They coordinate through messages when interface changes affect what the other expects. "API response shape changed, here's the new type" as a message beats holding both contexts in one session.

No server. No database. Just files. You can debug the entire coordination system with `cat` and `ls`. That's the [sandbox](@/pages/harness-engineering/the-sandbox.md) philosophy applied to multi-agent work.

I estimated about 1,400 lines. It ended up at 2,750 lines of source and 240 lines of tests. The overlay UI and tab-completion were most of the overrun. A previous session actually crashed at message 898 when a lite agent's mesh message overflowed the TUI by two characters. [The daemon](@/pages/harness-engineering/the-daemon.md) auto-summarized the crashed session afterwards — a nice end-to-end validation of the whole setup.
