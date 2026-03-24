+++
title = "Where to Start"
weight = 15
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

This is more infrastructure than most people need. Each piece is simple on its own: [skills](@/pages/harness-engineering/skills.md) are markdown, [the daemon](@/pages/harness-engineering/the-daemon.md) watches files and runs scripts, [mesh](@/pages/harness-engineering/coordination.md) is JSON files in a directory, [Q](@/pages/harness-engineering/q-the-task-agent.md) reads and writes markdown. The composition is complex. I've been iterating on this for months.

You don't need all of it to start getting value.

---

**Start with [session history](@/pages/harness-engineering/session-history.md).** That's the minimum viable version of everything above. Every AI coding session produces a conversation log. Most people throw these away. Keep them. Summarize them, search them, extract patterns, feed them back into future sessions. You can do this tomorrow with any agent.

---

**Encode what you learn.** Next time you solve something tricky, write it down where your agent can find it. A [skill](@/pages/harness-engineering/skills.md), a runbook, an AGENTS.md section. The time saved applies to every future session. Build a [meta-skill](@/pages/harness-engineering/meta-skills.md) and the bootstrapping compounds from there.

---

**Try one extra agent.** Spawn a second agent in a tmux window for a focused task: run tests, explore a codebase, review a PR. See if the workflow clicks before investing in [coordination](@/pages/harness-engineering/coordination.md) infrastructure.

---

That's it. Session history, encoded knowledge, one extra agent. Everything else in these pages grew from those three seeds.

[pi-mesh](https://github.com/rhnvrm/pi-mesh) is MIT licensed. [Bosun](https://github.com/oddship/bosun) is the harness. The ideas are transferable to any setup.
