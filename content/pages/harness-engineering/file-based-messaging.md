+++
title = "File-Based Messaging"
weight = 20
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

No daemon. No server. No central orchestrator. Everything in `.pi/mesh/`: a registry directory (one JSON file per agent), inbox directories (messages as JSON files), and an append-only feed. Two [Pi](@/pages/harness-engineering/pi.md) sessions in the same project directory find each other automatically.

---

You can debug the entire [coordination](@/pages/harness-engineering/coordination.md) system with `cat` and `ls`. That's [the sandbox](@/pages/harness-engineering/the-sandbox.md) philosophy applied to multi-agent work. No hidden state. No process you need to keep running. If something goes wrong, the evidence is right there in the filesystem.

Five tools: `mesh_peers` (who's active, what model), `mesh_reserve` and `mesh_release` (claim files before editing), `mesh_send` (message another agent), and `mesh_manage` (rename, set status, view feed). Messages are delivered between turns — agent A finishes work and sends results, agent B receives the message on its next turn. No polling, no webhooks.

Reservations hook Pi's `edit` and `write` tools. Another agent trying to edit a reserved file gets blocked with a message telling them who has it and why. Can an agent bypass this via `sed -i` through the shell? Yes. Blocking bash would mean parsing shell commands, which is a rabbit hole. The reservation system prevents the common case, not every possible case. In practice, Pi's tool control mitigates this further — some agents only get `read` and `write`, no `bash` at all.

---

Early bug: duplicate reservations were allowed. Two agents could reserve the same file. Peer discovery and messaging worked fine — the bug was specifically in reservation locking. The kind of thing that only shows up when you actually run multiple agents against the same codebase, not in unit tests.

---

[Pi-mesh](https://github.com/rhnvrm/pi-mesh) started as a Pi extension, built on Nico Bailon's [pi-messenger](https://github.com/nicobailon/pi-messenger) work. He'd already solved the hard problems: file-based messaging, presence detection, the overlay UI. I estimated about 1,400 lines. It ended up at 2,750 lines of source and 240 lines of tests. The overlay UI and tab-completion were most of the overrun.

The choice to use files wasn't ideological. It was practical. Agents already live in the filesystem. [The daemon](@/pages/harness-engineering/the-daemon.md) already watches files. Adding a message broker or database would mean one more thing to start, monitor, and debug. Files are boring. Boring is [the point](@/pages/harness-engineering/the-boring-stuff.md).
