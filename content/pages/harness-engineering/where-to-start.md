+++
title = "Where to Start"
weight = 4
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

You don't need a full harness to start getting value from AI coding agents. Start small, add structure as the pain points emerge.

## The Minimal Setup

1. **A system prompt with project conventions.** Even a short AGENTS.md that says "use conventional commits, TypeScript, ESM" makes a measurable difference.

2. **A scratch directory.** Give the agent a place to write notes, plans, and intermediate work that isn't in your source tree.

3. **Skills for repetitive patterns.** If you find yourself explaining the same thing to the agent repeatedly, write it down once as a skill file.

## What to Add Next

- **Git skill**: Commit conventions, branch naming, when to commit
- **Memory/search**: Index past sessions so the agent can recall prior context
- **Background processes**: Let the agent run dev servers without blocking
- **Daemon workflows**: Automate post-session cleanup, summaries, validation

## What to Skip (For Now)

- Multi-agent orchestration (adds complexity before you need it)
- Custom tools (the built-in tools cover most cases)
- Fancy UI (the terminal is fine)

*Practical getting-started guide with bosun coming soon.*
