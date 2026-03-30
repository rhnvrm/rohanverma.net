+++
title = "The Loop"
weight = 2
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
og_image = "/images/pages/harness-engineering/the-loop.png"
section_title = "The Thesis"
+++

![The Loop](/images/pages/harness-engineering/the-loop.png)

Every coding session I run with an agent produces stuff. Transcripts, summaries, handoffs, task updates, sometimes a new skill or a workflow tweak. For a long time that stuff just piled up. I would finish a session, move on, and the next session would start from scratch.

At some point I started feeding the output of old sessions into new ones. Not in a clever way. Just: summarize what happened, store the summary as a file, let the next agent search for it. That was enough to change how the whole system felt. Agents stopped repeating mistakes I had already fixed. They picked up where the last session left off instead of asking me to re-explain everything.

That is what I mean by the loop. A session does work, leaves artifacts behind, those artifacts get indexed, and future sessions start with more context than the last one had. Better context produces better sessions, which produce better artifacts, which improve the next round again.

I did not set out to build this. But once sessions started feeding into each other, the system naturally evolved into one where each session leaves the ground a little better prepared for the next one.

---

The loop did not start as an idea. It emerged from pressure.

The harness went through several rewrites: Obsidian notes, then `claude-manager`, then zero-agent on OpenCode, then zero-agent rebuilt on Pi, then bosun layered on top.[^tools]

[^tools]: [claude-manager](https://github.com/rhnvrm/claude-manager) was Claude Code plus files in a folder. [OpenCode](https://github.com/sst/opencode) was an early open-source coding agent. [Pi](https://github.com/badlogic/pi-mono) is the coding agent harness bosun runs on. [bosun](https://github.com/oddship/bosun) is the full multi-agent setup described in these pages. At each stage, the first thing that mattered was not autonomous coding. It was session management: clone repos here, create worktrees here, store project files here, resume work from these artifacts.

Once you give an agent a deterministic workflow, the number of sessions you can run starts to increase. That creates a new problem. You cannot keep all of it in your head. You need to know what happened, what is pending, what broke, what was learned, and which conventions should change next time.

So I automated summaries to recover context. Then I needed analysis to see patterns. Then I needed a way to feed those patterns back into the harness itself: updating [skills](@/pages/harness-engineering/skills/skills.md), prompts, workflows, and [meta-skills](@/pages/harness-engineering/skills/meta-skills.md) that let the system modify its own machinery. That is where the loop comes from.

---

The concrete chain looks like this:

- A coding session happens.
- Pi writes the raw session JSONL locally.
- [The daemon](@/pages/harness-engineering/feedback/the-daemon.md) summarizes the session.
- The summary, handoff, and related artifacts get stored as files.
- Retrieval tools index that corpus.
- A later agent asks "have we done this before?" or "what was the last decision here?"
- The agent finds prior work and starts from there instead of from zero.
- If the session reveals a recurring failure mode, I update a [skill](@/pages/harness-engineering/skills/skills.md), prompt, workflow, or config.
- That improvement applies to future sessions too.

That last step is what makes it a flywheel instead of a filing cabinet.

![The concrete loop chain](/images/pages/harness-engineering/the-loop-chain.png)

A pile of transcripts is not the loop. The loop starts when the harness can introspect on its own output and change its future behavior.

That is also where the [meta-skills](@/pages/harness-engineering/skills/meta-skills.md) matter. They are part of the bootstrap, but they are also part of the compounding effect. Once the harness has enough artifacts to inspect, it can use meta-skills to improve skills, prompts, workflows, commands, and agent definitions. The system starts modifying the machinery that produced the session in the first place.

---

This only works if the volume of sessions stays manageable. And it did not, for a while.

I track [session history](@/pages/harness-engineering/feedback/session-history.md). The numbers tell the story of how the loop got built. In August 2025, I manually chose which sessions to record, firing a slash command by hand. That got me 19. By December I had written a Claude Code hook that automatically wrote session data to a specific folder: 146. When I moved to OpenCode I started capturing all sessions in the background. By January, the daemon in Pi was intelligently batching and catching up on its own: 745 sessions processed. At that scale, I cannot remember what happened two days ago, let alone what conventions were decided three months back.

That is the pressure that forced the rest of the loop into existence. Without [summaries](@/pages/harness-engineering/feedback/session-summarization.md), sessions are write-only. Without [handoffs](@/pages/harness-engineering/feedback/handoffs.md), context dies when the window closes. Without [chronicles](@/pages/harness-engineering/feedback/chronicles.md), patterns across sessions are invisible. Each of these pieces exists because at some point the volume got high enough that not having them hurt.

---

This is where [assistive vs agentic](@/pages/harness-engineering/thesis/assistive-vs-agentic.md) use diverge. Autocomplete gives you a faster session. The loop gives you a faster *next* session, and the one after that, and the one after that. The compounding only works if the agent operates inside a persistent environment that keeps artifacts around. That is why continuity matters more to me than speed.

---

The retrieval story is not mystical either. It is very literal.

I have a memory tool and agent-backed retrieval over local artifacts, plus grep-style search and `qmd` over tasks, sessions, handoffs, and chronicles. When an agent needs prior context, it does not have to rely on my memory or a giant pasted prompt. It can search the corpus.

That changes behavior in a practical way:

- fewer repeated explanations
- fewer project-specific mistakes
- better resumability after interruptions
- better synthesis across multiple prior sessions
- more leverage from old work that would otherwise be forgotten

Again, that is the loop in concrete form. Capture. Index. Retrieve. Apply. Improve.

---

[Q](@/pages/harness-engineering/feedback/q-the-task-agent.md) fits into this, but not in the way people usually imagine when they hear "task agent."

Q is still primarily an interactive agent, not some magical proactive manager running wild in the background all day. Earlier versions of this idea were daily briefs injected into `claude-manager` at boot. Over time that evolved into Q: an agent with CLI tools for tasks, projects, and roadmaps, all backed by markdown files.

In practice, I often keep Q open in the background and have other agents send updates to Q over [mesh](@/pages/harness-engineering/agents/coordination.md). Or I ask Q to catch me up on a task or project. That works better for me than pretending I want fully autonomous project management burning tokens nonstop.

So when I say Q makes the loop operational, I mean this in a grounded way: [session summaries](@/pages/harness-engineering/feedback/session-summarization.md) stop being passive documents and start becoming task updates, notes, and status changes that other agents can actually use.

---

The loop also explains why I care so much about local ownership of session history.

Every serious tool will eventually use generated interaction data to improve itself. Cursor is already explicit about using [real-time reinforcement learning for Composer](https://cursor.com/blog/real-time-rl-for-composer).

That makes local session history more valuable, not less. If the record of my work only lives in someone else's backend, they get the long-term learning surface and I get the convenience layer. If the history lives as local files, I can analyze it, grep it, summarize it, index it, feed it back into agents, and repurpose it however I want.

That is the difference between using AI inside a product and building an agent harness I actually own.

---

So when I refer to "the loop" across this section, I do not mean some vague belief that "AI gets better over time."

I mean a specific flywheel:

1. run sessions inside a deterministic harness
2. keep the raw transcripts and derivative artifacts
3. summarize and structure them automatically
4. index them for retrieval
5. use them in future sessions
6. improve [skills](@/pages/harness-engineering/skills/skills.md), prompts, workflows, and agents based on what the history reveals
7. repeat

Each new skill helps future agents.
Each new workflow reduces future friction.
Each automation removes a recurring tax.
Each artifact makes the next session less blind.

One good session is useful.

A harness that learns from hundreds of sessions is a different category of tool.
