+++
title = "The Omakase Tradeoff"
weight = 8
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

You'd get most of this value with Claude Code and a good AGENTS.md. Claude Code is good. It recently added agent teams with tmux-based coordination and inter-agent messaging. For most people, that's enough.

---

What you give up is control, extensibility, and inspectability. Claude Code is omakase[^omakase], and omakase is great when you trust the chef. But the rough edges add up: hook return codes with undocumented behavior, permission controls that require digging through docs, planning behavior that changes between updates without notice, tools like TodoWrite that you can't disable or replace. You end up playing catchup monitoring their docs instead of inspecting the code or changelog directly.

[^omakase]: "Omakase" is Japanese for "I'll leave it up to you." As a software philosophy, DHH popularized it through the [Rails Doctrine](https://rubyonrails.org/doctrine): "how do you know what to order when you don't know what's good? Let the chef choose." Claude Code is omakase in the same sense: great defaults, you accept the chef's choices.

The real difference is extensibility. [Pi-mesh](@/pages/harness-engineering/coordination.md) started as an extension I wrote in one session. If I needed different coordination semantics tomorrow, I'd modify it. With Claude Code, I'd file a feature request.

---

I also moved here from [OpenCode](https://opencode.ai), which had a proper plugin system but ate memory and crashed under multi-process load. OpenCode runs a server, a TUI client, and plugins in separate Bun processes. The server-client split seemed useful for spinning up cheap agents, but the server crashed and clients didn't always reconnect. [Pi](@/pages/harness-engineering/pi.md) is one process, well-written, performant. When you're running agents in parallel, every megabyte the harness takes is a megabyte less for actual work. You want to build on strong foundations.

---

Anthropic's own harness work validates the problem space. Their ["Harness Design for Long-Running Apps"](https://www.anthropic.com/engineering/harness-design-long-running-apps) describes a planner/generator/evaluator architecture built on the Claude Agent SDK — structured, proprietary, and tightly integrated with their models. It's good work. But it's their kitchen, their menu. Bosun is open-source on Pi with file-based coordination: I can see the code, modify the orchestration, swap the models. Different tradeoffs for the same underlying problem: how do you keep agents coherent across long tasks? They solve it with SDK abstractions. I solve it with files on disk and markdown skills. Neither approach is wrong. The question is whether you want to build on a foundation you can inspect and change, or one that's maintained for you.
I've gone deep on the custom side: [pi-exec](/pages/harness-engineering/research/pi-weaver/analysis/the-idea.md) (a structured executor, later deprecated), [pi-weaver](/pages/harness-engineering/research/pi-weaver/_index.md) (self-correction tools), a custom [context management](/pages/harness-engineering/handoffs.md) skill tuned to my workflow. Each of those was built because the off-the-shelf version didn't exist or didn't fit.

The tradeoff is real: I'm maintaining more infrastructure. But infrastructure I own and version-control compounds in ways rented infrastructure can't. The upfront cost is higher. The long-term cost is lower.

Whether this is worth it depends on where you are. If you're still using LLMs as an assistant — asking questions, getting answers, copy-pasting code — Claude Code or Cursor is probably better. If you've moved into agentic usage — agents running autonomously, multiple agents across projects, shared knowledge, background automation — the control matters. The [loop](@/pages/harness-engineering/the-loop.md) only compounds when you own the pieces.
