+++
title = "Pi"
weight = 12
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Economics & Origins"
+++

[Pi](https://github.com/badlogic/pi-mono) is an open-source coding agent harness by Mario Zechner. He [wrote about why he built it](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/). It's what [bosun](https://github.com/oddship/bosun) runs on.

---

Clean codebase. Extension API. Agents defined as markdown files with system prompts and model assignments. Extensions get lifecycle hooks and can register custom tools the LLM sees alongside built-in ones. Pi also has a subagent system: sequential chains, parallel fan-out, single-shot calls.

One thing that stands out: the core agent runs in the browser too. Pi's system prompt includes paths to its own documentation, so agents can read the harness source to understand how things work. When something breaks, an agent that can read the harness source has a real advantage over one running inside a black box.

---

I came to Pi from [OpenCode](https://opencode.ai), which had a proper plugin system but ate memory and crashed under multi-process load. Pi is one process, well-written, performant. When you're running agents in parallel, every megabyte the harness takes is a megabyte less for actual work. You want to build on strong foundations.

The extension API is what made [pi-mesh](@/pages/harness-engineering/agents/coordination.md) possible. And [the daemon](@/pages/harness-engineering/feedback/the-daemon.md). And the [skill](@/pages/harness-engineering/skills/skills.md) loading system. Each of these is a Pi extension or a process that talks to Pi through its documented interfaces. The harness doesn't need to do everything. It needs to be extensible enough that you can build what you need.

---

Spawning Pi from daemon scripts requires `stdio: ["ignore", "pipe", "pipe"]` with the `--print` flag. If stdin isn't set to "ignore", Pi hangs forever waiting for input. `--print` runs non-interactively: no TUI, no extension lifecycle, just prompt in, response out. These are the kind of details that matter when you're building automation on top of an agent runtime. Having the source code to read when things break is why [the omakase tradeoff](@/pages/harness-engineering/failure-modes/the-omakase-tradeoff.md) matters.
