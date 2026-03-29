+++
title = "File-Based Messaging"
weight = 20
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Files weren't an ideological choice. They were the path of least resistance that never needed replacing.

---

Agents already live in the filesystem. [The daemon](@/pages/harness-engineering/the-daemon.md) already watches files. [The sandbox](@/pages/harness-engineering/the-sandbox.md) already controls file access. Adding a message broker or database would mean one more process to start, monitor, and debug. Files are boring. Boring is [the point](@/pages/harness-engineering/the-boring-stuff.md).

The format is one JSON file per message, one directory per inbox, one registry file per agent. You can debug the entire [coordination](@/pages/harness-engineering/coordination.md) system with `cat` and `ls`. No hidden state. No process you need to keep running.

---

The interesting design question wasn't "files or sockets" — it was how to handle conflicts.

Reservations hook Pi's `edit` and `write` tools. If agent A reserves `src/auth/`, agent B trying to edit a file in that path gets blocked with a message saying who has it and why. But can agent B bypass this with `sed -i` through bash? Yes. Blocking shell commands would mean parsing them, which is a rabbit hole I'm not going down.

The reservation system prevents the common case, not every possible case. That's enough. In practice, Pi's tool control adds another layer — some agents only get `read` and `write`, no `bash` at all. The agents most likely to cause file conflicts are also the ones least likely to have shell access.

---

Early bug: duplicate reservations were allowed. Two agents could reserve the same file simultaneously. Peer discovery and messaging worked fine — the bug was specifically in the locking logic. The kind of thing that only shows up when you actually run multiple agents against the same codebase, not in unit tests. I found it because two deckhands both claimed `src/index.ts` and neither noticed.

That's the other argument for files: when coordination fails, the evidence is sitting right there in `.pi/mesh/`. No log aggregation, no process introspection. Just `ls .pi/mesh/reservations/` and you see the problem.
