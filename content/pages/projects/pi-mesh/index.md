+++
title = "pi-mesh"
description = "Multi-agent coordination for Pi coding agents"
date = 2026-03-30
weight = 2

[extra]
github_url = "https://github.com/rhnvrm/pi-mesh"
+++

Coordinate multiple [Pi](https://github.com/badlogic/pi-mono) agents working in the same project. See who's around, claim files so you don't step on each other, and send messages between sessions.

No daemon, no server. Just files on disk.

## Features

- **Peer discovery** — agents automatically find each other in a project
- **File reservations** — claim files before editing, others get blocked and told who to ask
- **Messaging** — normal messages wait politely, urgent ones interrupt immediately
- **Activity tracking** — edits, commits, and test runs tracked automatically
- **Status overlay** — `/mesh` opens a TUI with agents, activity feed, and `@mention` chat

Published as an npm package under [Zerodha Tech](https://zerodha.tech).

```bash
pi install npm:pi-mesh
```
