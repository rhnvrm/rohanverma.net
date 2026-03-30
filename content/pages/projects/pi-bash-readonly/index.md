+++
title = "pi-bash-readonly"
description = "Sandboxed read-only bash for Pi agents via bubblewrap"
date = 2026-03-30
weight = 3

[extra]
github_url = "https://github.com/rhnvrm/pi-bash-readonly"
+++

Every `bash` tool call is wrapped in a [bubblewrap](https://github.com/containers/bubblewrap) sub-sandbox where the entire filesystem is mounted read-only. Unlike regex-based command filtering, writes are blocked at the filesystem level, from any language runtime.

## Features

- **Filesystem-level enforcement** — uses Linux mount namespaces, not pattern matching
- **Per-agent configuration** — set `bash-readonly: true` in agent frontmatter
- **Lockable** — `bash-readonly-locked: true` disables the toggle command
- **User commands sandboxed too** — `!` and `!!` TUI commands are also read-only when active

```bash
pi install npm:pi-bash-readonly
```
