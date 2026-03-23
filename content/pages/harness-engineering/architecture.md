+++
title = "Architecture"
weight = 3
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

A coding agent harness has a few key pieces. None of them are complicated individually — the value is in how they compose.

## The Pieces

**Sandbox**: The agent runs in a constrained environment. It can read and write files, run commands, but within boundaries. This isn't about safety theater — it's about making the agent's work *reviewable*.

**Skills**: Reusable instruction sets that teach the agent how to do specific things — write commits, use git, follow project conventions. Skills are markdown files loaded on demand.

**Daemon**: A background process that watches for events and triggers workflows. New file appears? Run a validator. Session ends? Generate a summary. This is where "automate the boring stuff" gets automated.

**Mesh**: When multiple agents work on the same project, they need coordination. File reservations prevent conflicts. Messages enable delegation. Peer awareness prevents duplicate work.

*Detailed architecture walkthrough with links to public source code coming soon.*
