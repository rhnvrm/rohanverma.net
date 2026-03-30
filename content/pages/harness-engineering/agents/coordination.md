+++
title = "Coordination"
weight = 7
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Agents & Coordination"
+++

The coordination primitive is [pi-mesh](https://github.com/rhnvrm/pi-mesh), not tmux. Tmux gives you windows and panes. You could use Ghostty, Zellij, or any terminal multiplexer for the same effect. Pi-mesh gives you async messaging, reservations, and presence detection between agents. That's the layer that matters.

Without pi-mesh, agents talk through `tmux_capture` and `tmux_send`, polling the terminal, parsing output, sleeping, trying again. For Pi-to-Pi communication, polling the terminal is the wrong abstraction. You want async messaging.

---

I had my agent search Pi's extension directory for prior art and found [pi-messenger](https://github.com/nicobailon/pi-messenger) by Nico Bailon. He had already solved the hard problems: file-based messaging, presence detection, the overlay UI. Much of pi-mesh's UX comes directly from his work.

So I built pi-mesh. Just the coordination layer. No daemon, no server, no central orchestrator. Files on disk. Two Pi sessions in the same project directory find each other automatically. Everything lives in `.pi/mesh/`: a registry directory (one JSON file per agent), inbox directories (messages as JSON files), and an append-only feed.

The file-based backend is a deliberate choice. You can debug the entire system with `cat` and `ls`. The backend could be swapped to SQLite or Postgres for distributed coordination in the future, but for now the filesystem is simple, inspectable, and works because all agents share the same [bwrap](@/pages/harness-engineering/sandbox/bubblewrap.md) filesystem.

---

Five tools: `mesh_peers` (who's active, what model), `mesh_reserve` and `mesh_release` (claim files before editing), `mesh_send` (message another agent), and `mesh_manage` (rename, set status, view feed).

Reservations are a locking primitive. They hook Pi's `edit` and `write` tools. Another agent trying to edit a reserved file gets blocked with a message telling them who has it and why. Can an agent `sed -i` a reserved file through bash and bypass the hook? Yes. But in practice, Pi's tool control mitigates this: some agents only get `read` and `write`, no `bash` at all. The reservation system prevents the common case, not every possible case.

---

When a feature spans backend and frontend, I run two agents in separate worktrees. They coordinate through messages when interface changes affect what the other expects. An orchestrator (bosun) can spawn them, and agents join and leave the mesh at will. There's no static topology.

The pi-mesh implementation ended up at 2,750 lines of source and 240 lines of tests. A previous session actually crashed at message 898 when a lite agent's mesh message overflowed the TUI by two characters. [The daemon](@/pages/harness-engineering/feedback/the-daemon.md) auto-summarized the crashed session afterwards.

> Then, at message 898, everything went sideways. The TUI crashed. The crash wasn't a pi-mesh bug. It was a TUI rendering bug: Pi's text truncation used `line.length` (JavaScript character count) instead of Unicode display width. A message that was "short" in characters but wide in display overflowed the terminal by exactly 2 characters, and the renderer panicked.
>
> *Chronicle: Pi-Mesh Development, Feb 2026*

The recovery session fixed the truncation bug, finished every loose thread, and ran two rounds of parallel multi-agent code reviews on the mesh code itself. Using the coordination system to review the coordination system.

The cost of coordinating agents is not trivial. See [the foreman problem](@/pages/harness-engineering/agents/the-foreman-problem.md) for what happened when this scaled to 22 agents (peak 7 simultaneous) across 50 hours.
