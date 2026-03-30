+++
title = "The Loop"
weight = 2
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

The loop is the self-improving flywheel in my agent harness.

A session does some work. That session leaves artifacts behind: the raw JSONL transcript, a summary, a handoff, a chronicle entry, task updates, maybe a skill tweak or a workflow change. Those artifacts get indexed. Future agents search them. Future sessions start with more context. Better context produces better sessions, which produce better artifacts, which improve the next round again.

That's the loop.

If you only remember one thing from this page, make it that: I am not just using agents to complete tasks. I am building a system where each session leaves the ground a little better prepared for the next one.

---

The order matters here.

Before the loop became visible, there was bootstrapping. The harness did not appear fully formed. The real evolution was:

1. Obsidian + AI-assisted notes
2. `claude-manager`
3. zero-agent built on OpenCode
4. zero-agent rebuilt on Pi
5. bosun layered on top of Pi

That sequence is important because it explains what I am actually building. This is not "an AI that codes." It is a local agent harness: repeatable environment setup, deterministic session workflows, persistent memory, background automation, retrieval, and [meta-skills](@/pages/harness-engineering/meta-skills.md) that let the system improve itself.

The earliest useful thing in that stack was not autonomous coding. It was session management.

Once you give an agent a deterministic workflow — clone repos here, create worktrees here, store project files here, load the environment this way, resume work from these artifacts — the number of sessions you can run starts to increase. At first that feels great. Then it becomes a problem. You cannot keep all of it in your head. You need to know what happened, what is pending, what broke, what was learned, and which conventions should change next time.

That is why the first thing I automated was session management.

I wanted a reliable workflow. Then I wanted to track more sessions. Then I needed summaries so I could recover context. Then I needed analysis so I could see patterns. Then I needed a way to feed those patterns back into the harness itself. That is where the loop comes from. Not theory. Pressure.

---

The concrete chain looks like this:

- A coding session happens.
- Pi writes the raw session JSONL locally.
- [The daemon](@/pages/harness-engineering/the-daemon.md) summarizes the session.
- The summary, handoff, and related artifacts get stored as files.
- Retrieval tools index that corpus.
- A later agent asks "have we done this before?" or "what was the last decision here?"
- The agent finds prior work and starts from there instead of from zero.
- If the session reveals a recurring failure mode, I update a [skill](@/pages/harness-engineering/skills.md), prompt, workflow, or config.
- That improvement applies to future sessions too.

That last step is what makes it a flywheel instead of a filing cabinet.

A pile of transcripts is not the loop. The loop starts when the harness can introspect on its own output and change its future behavior.

That is also where the meta-skills matter. They are part of the bootstrap, but they are also part of the compounding effect. Once the harness has enough artifacts to inspect, it can use meta-skills to improve skills, prompts, workflows, commands, and agent definitions. The system starts modifying the machinery that produced the session in the first place.

---

The numbers only matter if I explain what they mean.

In [session history](@/pages/harness-engineering/session-history.md), the count starts small: 19 sessions in August 2025, 57 in September, 18 in October, 62 in November, 146 in December. Those are not vanity metrics. They show the point where manual context management starts to fail.

By January, after more automation landed, the daemon summarized 745 sessions. That jump is not "AI got smarter." It means the harness got better at capturing, organizing, and reusing its own work. Once session overhead drops, I run more sessions. Once I run more sessions, I generate more history. Once I generate more history, the cost of not having retrieval and automation goes through the roof.

More sessions create more value, but only if the system can metabolize them.

That is why summaries matter. That is why [handoffs](@/pages/harness-engineering/handoffs.md) matter. That is why [chronicles](@/pages/harness-engineering/chronicles.md) matter. That is why skill tweaks matter. Without them, session volume just becomes sludge.

---

This is also the difference between assistive use and agentic use.

Assistive use is task-local. I ask for help, the model helps, and the value mostly ends when the task ends.

Agentic use is workflow-level. The agent operates inside a persistent environment, follows conventions, leaves structured residue, and can hand work to future agents or future me. The value is not just the output of the session. The value is that the session becomes usable input for the next one.

That is the shift I care about.

I am much less interested in "write this function a bit faster" than in "make this entire working system more continuous, more searchable, and easier to resume." Speed is nice. Continuity is the real prize.

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

[Q](@/pages/harness-engineering/q-the-task-agent.md) fits into this, but not in the way people usually imagine when they hear "task agent."

Q is still primarily an interactive agent, not some magical proactive manager running wild in the background all day. Earlier versions of this idea were daily briefs injected into `claude-manager` at boot. Over time that evolved into Q: an agent with CLI tools for tasks, projects, and roadmaps, all backed by markdown files.

In practice, I often keep Q open in the background and have other agents send updates to Q over [mesh](@/pages/harness-engineering/coordination.md). Or I ask Q to catch me up on a task or project. That works better for me than pretending I want fully autonomous project management burning tokens nonstop.

So when I say Q makes the loop operational, I mean this in a grounded way: [session summaries](@/pages/harness-engineering/session-summarization.md) stop being passive documents and start becoming task updates, notes, and status changes that other agents can actually use.

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
6. improve [skills](@/pages/harness-engineering/skills.md), prompts, workflows, and agents based on what the history reveals
7. repeat

Each new skill helps future agents.
Each new workflow reduces future friction.
Each automation removes a recurring tax.
Each artifact makes the next session less blind.

One good session is useful.

A harness that learns from hundreds of sessions is a different category of tool.
