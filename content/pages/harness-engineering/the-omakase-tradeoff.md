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

[^omakase]: "Omakase" as a software philosophy comes from DHH and the [Rails Doctrine](https://rubyonrails.org/doctrine): "how do you know what to order when you don't know what's good? Let the chef choose." Claude Code is omakase in the same sense: great defaults, you accept the chef's choices.

The real difference is extensibility. [Pi-mesh](@/pages/harness-engineering/coordination.md) started as an extension I wrote in one session. If I needed different coordination semantics tomorrow, I'd modify it. With Claude Code, I'd file a feature request.

---

I also moved here from [OpenCode](https://opencode.ai), which had a proper plugin system but ate memory and crashed under multi-process load. OpenCode runs a server, a TUI client, and plugins in separate Bun processes. The server-client split seemed useful for spinning up cheap agents, but the server crashed and clients didn't always reconnect. [Pi](@/pages/harness-engineering/pi.md) is one process, well-written, performant. When you're running agents in parallel, every megabyte the harness takes is a megabyte less for actual work. You want to build on strong foundations.

---

The tradeoff is real: I'm maintaining more infrastructure. There's a bit of the Nix philosophy here — do it once, the hard way, and the deterministic nature compounds over time. Infrastructure I control compounds differently than infrastructure I rent.

Whether this is worth it depends on how much you care about the [loop](@/pages/harness-engineering/the-loop.md). If you're running a single agent for a single project, Claude Code is probably better. If you're running multiple agents across multiple projects with shared knowledge and background automation, the control matters.
