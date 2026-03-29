+++
title = "Handoffs"
weight = 16
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

`/handoff` checkpoints your work. `/pickup` resumes it in a new session. That's the whole idea.

---

When I run `/handoff`, the command creates a file. [The daemon](@/pages/harness-engineering/the-daemon.md) detects the new file and spawns an agent to fill in context: what I was working on, which files are uncommitted, which bugs were identified, what's left to do. The fill-handoff workflow watches the handoff directory and does this automatically — I don't write the summary, the system does.

Next morning, `/pickup` loads the handoff. The agent has full context without re-reading conversation history. It starts on the first remaining bug immediately.

There are 27 handoff files accumulated over the project's life. Some are overnight pauses. Some are mid-day context switches — "I need to go deal with something else, checkpoint this." Some are deliberate stopping points when I've identified more work than I want to do in one sitting.

---

The handoff captures the mechanical parts: session state, file diffs, known issues, next steps. That's [the boring stuff](@/pages/harness-engineering/the-boring-stuff.md). What it doesn't capture — and shouldn't try to — is the judgment about *what matters most*. Which of those three bugs is the priority? Is the approach still right, or should I rethink it after sleeping on it? That's the human part of pickup.

---

Handoffs are one piece of [the loop](@/pages/harness-engineering/the-loop.md). [Session summaries](@/pages/harness-engineering/session-summarization.md) capture what happened across *all* sessions. Handoffs capture what's *in flight* for a specific thread of work. Summaries feed [session history](@/pages/harness-engineering/session-history.md) — the long-term corpus. Handoffs feed continuity — the short-term context.

Like everything else here, handoffs [started manual](@/pages/harness-engineering/start-manual-automate-later.md). I used to write the notes by hand. The daemon writes better ones — it doesn't forget to mention the uncommitted files.

---

The context management skill itself went through a revealing design process. Early on, the `/pickup` command required 17-27 tool calls to list available handoffs — one bash call for the username, multiple globs, 11 separate reads to extract metadata. The architecture was creating a 17x inefficiency for what should have been a single operation. The fix came from discovering inline shell execution: inject the file listing into the prompt before the LLM even sees it. Zero tool calls. The handoff system didn't just need to work — it needed to be cheap enough that agents would actually use it.

> We set out to build context management infrastructure: the ability to pause work with handoffs, explore alternatives with forks, and resume with pickups. But the plan revealed something deeper: five critical commands were completely broken, the specification wasn't being followed, and there was a 17-27x performance inefficiency hiding in the architecture.
>
> — *Chronicle: Context Management Skill Implementation, Jan 2026*
