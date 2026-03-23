+++
title = "Where to Start"
weight = 4
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

This is more infrastructure than most people need. Each piece is simple on its own: skills are markdown, the daemon watches files and runs scripts, mesh is JSON files in a directory, Q reads and writes markdown. The composition is complex. I've been iterating on this for months.

## Start with session history

That's the minimum viable version of everything above. Every AI coding session produces a conversation log. Most people throw these away. Keep them. Summarize them, search them, extract patterns, feed them back into future sessions. You can do this tomorrow with any agent.

## Encode what you learn

Next time you solve something tricky, write it down where your agent can find it. A skill, a runbook, an AGENTS.md section. The xkcd math[^xkcd] works in your favor when the time saved applies to every future session. Build a meta-skill and the bootstrapping compounds from there.

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.

## Try one extra agent

Spawn a second agent in a tmux window for a focused task: run tests, explore a codebase, review a PR. See if the workflow clicks before investing in coordination infrastructure.

## What to skip (for now)

The multi-agent setup is still early. Reservations work but `bash` can bypass them. Daemon agents are excluded from the mesh (non-interactive Pi skips the extension lifecycle). Tmux window kills don't always trigger clean shutdowns. Some of these are gaps, some are tradeoffs.

[pi-mesh](https://github.com/rhnvrm/pi-mesh) is MIT licensed and on GitHub. [Bosun](https://github.com/oddship/bosun) is the harness. It's designed for team use (shared Nix flake, git-tracked config, common skills directory), but right now it's just me. The ideas are transferable to any Pi setup.
