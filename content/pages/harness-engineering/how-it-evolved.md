+++
title = "How It Evolved"
weight = 13
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

This isn't a product that was designed upfront. It grew from friction. Every feature exists because something was annoying or broken.

---

*Copy-Paste Era (Aug–Dec 2025).* Claude Pro web UI. I'd copy code into the chat window, describe what I wanted, copy the suggestion back. Good for quick questions. Terrible for multi-file work. I was the clipboard. I started tracking what I was doing in claude-manager — a markdown scratchpad with daily logs. Six months of notes. The model was smart enough. It just didn't know how we work.

*File Access Era (Jan 2026).* OpenCode changed everything. Suddenly the agent had a terminal — it could read files, write code, run tests, commit to git. The jump in productivity was immediate. But problems emerged fast: no isolation (the agent could access anything), no shared knowledge (every session started from scratch), context lost between sessions (close the terminal, lose everything), single agent (one process, one model, one context window).

*The Harness Era (Feb 2026+).* I built bosun: a sandboxed, skill-aware, daemon-backed, multi-agent system. Each piece solved a specific friction. [The sandbox](@/pages/harness-engineering/the-sandbox.md) for isolation. [Skills](@/pages/harness-engineering/skills.md) for shared knowledge. [The daemon](@/pages/harness-engineering/the-daemon.md) for background automation. [Coordination](@/pages/harness-engineering/coordination.md) for multi-agent work. Migrated from OpenCode to [Pi](@/pages/harness-engineering/pi.md) as the runtime — 130 commits in one day, 47 fix commits over the next two to stabilize. Trial and error at its most intense.

---

What got removed along the way matters as much as what survived. A TUI dashboard built for the daemon, replaced 7 commits later by a tmux layout. Simpler wins. A persistent server mode from OpenCode, replaced by single-process Pi with filesystem shared state. A CDP browser implementation, rewritten for faster startup.

Each removal made the system simpler. Unix philosophy: if two things can be one thing, make it one thing.

---

Same lesson each time: **the model isn't the bottleneck. The harness is.** Claude was smart enough in August 2025. What it lacked was knowledge of conventions, access to tools, and continuity between sessions. That's what [the loop](@/pages/harness-engineering/the-loop.md) provides.

---

The OpenCode-to-Pi migration was the most intense transition. The persistent server architecture in OpenCode had seemed elegant — run the server inside the sandbox, connect lightweight clients from outside. But the separation introduced its own problems: servers crashed, clients didn't reconnect, and multi-process load ate memory. Pi replaced all of that with a single process.

> OpenCode's client-server model achieves complete sandbox isolation through server-side execution, not client-side sandboxing. The architecture is fundamentally sound.
>
> — *Chronicle: Persistent Server Architecture Design, Jan 2026*

That was the assessment at the time. It was sound, but "sound" wasn't enough when agents were crashing the server under load. Pi's single-process model traded architectural elegance for reliability, and reliability won.
