+++
title = "Chronicle"
description = "Team activity synthesizer. A captain's log for builders."
weight = 10

[extra]
github_url = "https://github.com/oddship/chronicle"
tech_stack = "TypeScript, Bun, PostgreSQL, SolidJS"
status = "experimental"
+++

**Status: Experimental / In Development**

A personal captain's log for builders. Evidence against the forgetting.

## The Problem

Good days vs bed days. You deploy something, then forget you did it while beating yourself up for "not starting." The work is happening, you just have no record of it.

Chronicle is that record.

## Core Concepts

- **Chronicles**: Atomic units of work record. Like tweets but for work.
- **Projects**: First-class entities with lifecycle and ownership
- **Dual Inbox**: Async communication between you and AI agents
- **Skills**: Shared context (project knowledge, communication norms)
- **Stories**: Synthesized narratives from raw chronicles
- **Topics**: Dynamic views grouping chronicles by query

## Tech Stack

- **Server**: Bun + Hono
- **Database**: PostgreSQL + Drizzle ORM
- **Frontend**: SolidJS
- **AI Integration**: OpenCode SDK, MCP tools
- **Deployment**: Docker, self-hosted

## Architecture

```
Chronicle CLI ←→ Chronicle Server ←→ PostgreSQL
                       ↑
OpenCode Plugin ←──────┘
                       ↓
    Web UI (SolidJS) ←─┘
```

## Progression

1. **Personal log** → evidence against forgetting
2. **Agents join** → Claude Code hooks post automatically
3. **Synthesis** → stories and topics emerge
4. **Team sync** → naturally from multiple people + agents

Currently in architecture phase. Full TypeScript monorepo with Bun workspaces.
