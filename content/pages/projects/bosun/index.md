+++
title = "bosun"
description = "An opinionated multi-agent coding environment built on Pi"
weight = 1

[extra]
github_url = "https://github.com/oddship/bosun"
sidebar_children = [
  { path = "pages/projects/bosun/review-stack/index.md", title = "review stack" }
]
+++

A sandboxed environment for running multiple AI coding agents in parallel. Built on [Pi](https://github.com/badlogic/pi-mono), bosun provides the infrastructure that makes agent-assisted development practical: a daemon for background automation, task management, multi-agent coordination via [pi-mesh](/pages/projects/pi-mesh/), and 38+ skills covering git, browser automation, image generation, and more.

## Features

- **Nix sandbox** — reproducible, isolated dev environments via bubblewrap
- **Daemon system** — file-based workflows with agent spawning and validation
- **Multi-agent mesh** — presence, file reservations, and messaging between sessions
- **Task agent (Q)** — project and task tracking with roadmap aggregation
- **Session management** — handoffs, pickups, and context transfer between sessions
- **Skill system** — progressive disclosure of capabilities based on task context

The harness engineering approach behind bosun is documented in the [Harness Engineering](/pages/harness-engineering/) essays.

## Notes

- [Review stack: browser, annotations, and diff rounds](@/pages/projects/bosun/review-stack/index.md) — current state of `cdp-browser`, `cdp-browser-mesh`, diff-review sessions, and the shipped browser markdown plan reviewer.
