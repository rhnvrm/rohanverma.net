+++
title = "File-Based Messaging"
weight = 20
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Agents & Coordination"
+++

Files weren't an ideological choice. They were the path of least resistance that never needed replacing.

There's a deeper reason files work well here: LLMs are being heavily RL'd on bash and filesystem operations. File I/O is in their training distribution. When an agent reads a JSON message from an inbox directory or writes a reservation file, it's doing something models are already good at. A custom message broker would be a new abstraction the model has to learn. Files are native.

---

Agents already live in the filesystem. [The daemon](@/pages/harness-engineering/feedback/the-daemon.md) already watches files. [The sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md) already controls file access. Adding a message broker or database would mean one more process to start, monitor, and debug. Files are boring. Boring is [the point](@/pages/harness-engineering/thesis/the-boring-stuff.md).

The message format is one JSON file per message, one directory per inbox, one registry file per agent. You can debug the entire [coordination](@/pages/harness-engineering/agents/coordination.md) system with `cat` and `ls`. No hidden state. No process you need to keep running. If you ever needed distributed coordination, you could swap the filesystem backend for SQLite or Postgres without changing the API.

---

The interesting design question wasn't "files or sockets." It was how to handle conflicts. Inside a single [bwrap](@/pages/harness-engineering/sandbox/bubblewrap.md) sandbox, agents share a filesystem. Even if you tell them to work on different folders, they can inadvertently disrupt each other. That's why reservations exist.

Reservations hook Pi's `edit` and `write` tools. If agent A reserves `src/auth/`, agent B trying to edit a file in that path gets blocked with a message saying who has it and why. Can agent B bypass this with `sed -i` through bash? Yes. Blocking shell commands would mean parsing them, which is a rabbit hole. The reservation system prevents the common case, not every possible case. In practice, Pi's tool control adds another layer: some agents only get `read` and `write`, no `bash` at all.

---

When coordination fails, the evidence is sitting right there in `.pi/mesh/`. No log aggregation, no process introspection. Just `ls .pi/mesh/reservations/` and you see the problem. That debuggability is the strongest argument for files over any fancier alternative.
