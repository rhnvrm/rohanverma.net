+++
title = "mmchat"
description = "Mattermost CLI for humans and agents"
date = 2026-03-30
weight = 4

[extra]
github_url = "https://github.com/rhnvrm/mmchat"
+++

A Mattermost CLI built for both human use and agent integration. Read messages, search threads, check mentions, all from the terminal.

## Features

- **Quick overview** — mentions, unread, and active channels in one call
- **Thread navigation** — view root + replies, full or truncated
- **Search and mentions** — full-text search and @-mention tracking
- **Channel ops** — members, pinned posts, unread counts
- **JSON output** — `--json` flag for agent consumption
- **Agent skill** — ships with a Pi agent skill for Mattermost integration

```bash
uvx --from mattermost-cli mm --help
```

Published on PyPI as `mattermost-cli`.
