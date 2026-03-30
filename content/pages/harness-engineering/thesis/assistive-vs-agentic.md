+++
title = "Assistive vs Agentic"
weight = 4
template = "pages-page.html"
date = 2026-03-30
draft = false

[extra]
og_image = "/images/pages/harness-engineering/assistive-vs-agentic.png"
section_title = "The Thesis"
+++

![It is inevitable](/images/pages/harness-engineering/assistive-vs-agentic.png)

The word "agent" comes from the Latin *agere*: to do, to drive, to act. An agent is a doer. In Hindi grammar, the closest equivalent is *karta*: the one who performs the action in a sentence. That is the root meaning, and it is worth keeping in mind because the tech industry has made the word vague.

Everyone calls everything an agent now. A chatbot with a system prompt is an agent. A workflow with three API calls is an agent. A model that can google things is an agent. The word has been diluted to the point where it mostly means "LLM plus something." Even Guido van Rossum [recently asked](https://x.com/gvanrossum/status/2039045160156426463): "I think I finally understand what an agent is. It's a prompt (or several), skills, and tools. Did I get this right?" When someone asked what a skill is, he clarified: "A Markdown file that explains how to do a specific thing... call it a dynamically loaded extension to the prompt." The [replies](https://x.com/gvanrossum/status/2039045160156426463) are revealing: everyone agrees on the components but disagrees on what makes it an *agent*. Some say it's the loop ("observe, act, decide next step"). Some say it's the boundaries ("what it's NOT allowed to do matters as much as what it can"). One reply nails it: "close enough tbh, the rest is just vibes and retry logic."

A more useful definition: an agent is a system that decides what to do next. Not just generates one response, but looks at context, chooses an action, observes the result, and repeats. The key variable is who answers the question "what next?" If you are steering every step, it is an assistant. If the system is choosing and sequencing actions toward a goal you set, it starts to become an agent.

The categories are not binary. They are a spectrum:

| | Who decides "what next?" |
|---|---|
| **Tool** | You do everything. It executes one command. |
| **Assistant** | You steer. It helps at each step. |
| **Agentic assistant** | You give direction. It plans and acts within a turn. |
| **Agent** | You set the objective. It drives. |

Most LLM coding tools today sit somewhere between assistant and agentic assistant. You type a prompt, the model plans internally, maybe calls some tools, and gives you a result. That is useful. But the value is local to that interaction. When the chat ends, the context is gone.

---

What I am describing in these pages is something further along the spectrum. The agent runs inside a persistent environment. It follows conventions encoded in [skills](@/pages/harness-engineering/skills/skills.md). It leaves structured artifacts behind: session transcripts, summaries, handoffs, task updates. It can hand work to future agents or future me. The value is not just the output of the session. The value is that the session becomes usable input for the next one.

That is the difference between assistive and agentic use, and it matters because the two modes have completely different economics.

In assistive mode, you pay per question. The cost scales linearly. If you stop asking, you stop paying. There is no infrastructure. There is no compounding. There is no [loop](@/pages/harness-engineering/thesis/the-loop.md).

In agentic mode, there is overhead up front. You need a [sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md). You need session management. You need conventions that agents can follow without you babysitting every call. That overhead is real, and for a single task it will almost always be slower than just asking the model directly.

But the overhead amortizes. Once the harness exists, the marginal cost of the next session drops. Once sessions leave artifacts, those artifacts feed future sessions. Once the loop is running, each session is cheaper and better than the last.

---

The skeptics are not wrong about the costs. Running agents burns more tokens than autocomplete. A single agentic session can cost what a week of Copilot costs. I track the [economics](@/pages/harness-engineering/economics/the-economics.md) carefully and the numbers are not small.

Where the skeptics are wrong is in the comparison. They compare "agentic session" vs "the same task done with autocomplete." The real comparison is "agentic session that benefits from 700 prior sessions vs doing the same task from scratch." The harness has memory. The autocomplete does not.

Some sessions are genuinely not worth the cost. Some tasks are faster done by hand. The [xkcd math](@/pages/harness-engineering/economics/the-xkcd-math.md) applies. I am not arguing that agentic use is always better. I am saying the compounding effects are real and they only show up in agentic mode.

You cannot get session-over-session improvement from a stateless autocomplete. You cannot build a [review loop](@/pages/harness-engineering/feedback/the-review-loop.md) around a chat window. You cannot have one agent verify another agent's work if neither has access to a shared environment.

The people on the right side of the [bell curve](@/pages/harness-engineering/_index.md) tend to evaluate AI coding tools on single-task benchmarks: can it solve this LeetCode problem, can it write this function. By that measure, agentic use looks wasteful. But the value is not in any single task. It is in the system that accumulates across hundreds of tasks. The [session history](@/pages/harness-engineering/feedback/session-history.md) that makes the next session faster. The [skills](@/pages/harness-engineering/skills/skills.md) that prevent the same mistake twice. The [handoffs](@/pages/harness-engineering/feedback/handoffs.md) that let you resume after a week away without re-explaining everything.

---

Some concrete examples from my own session history:

In January 2026, a deployment handoff in `claude-manager` was a numbered checklist. Deploy this service, then that one, check these logs, here is the rollback plan. Every step was written for an agent to execute in order. That is assistive: the document tells you what to do, you do it.

By March 2026, a typical session looked different. I gave bosun a goal like "analyze today's sessions and generate a journey analysis." One user message. The agent autonomously scanned session files, clustered them into journeys by domain, extracted themes, and generated structured output. No step-by-step steering from me.

Or the pi-weaver wiki session: 22 agents coordinated over 50 hours. The main agent decided on its own to split content across multiple pages for discoverability. It spawned 3 deckhand agents to humanize 57 pages in parallel. Each agent worked independently, communicated via mesh, and the orchestrator synthesized the results. The total cost was $220 and the output was 199 wiki pages. Nobody told agent #14 what to do. The harness did.

The flip side shows up too. In February 2026, I renamed the project from "beson" to "bosun." Session history broke because session files are stored under encoded directory paths. The agent had to re-explore the filesystem from scratch to figure out where the old sessions went. That is what assistive mode feels like: context does not carry forward, so you pay the re-explanation tax every time something changes.

The pattern is clear in the [session history](@/pages/harness-engineering/feedback/session-history.md): early sessions have lots of user messages. Later sessions have fewer. Not because I got lazy, but because the harness got better at knowing what to do next. Skills loaded proactively. Conventions were followed without reminders. Prior context was retrieved automatically.

---

The [pi-weaver research](@/pages/harness-engineering/research/pi-weaver/_index.md) is another example. That was a 50-hour, $220 session that built and evaluated a self-correction tool across 15 tasks from Terminal-Bench 2.0. An assistive tool could not have done that. It required agents running inside a persistent sandbox, checkpointing their own state, rewinding when stuck, and leaving structured results that other agents could analyze.

The research produced [architecture insights](@/pages/harness-engineering/research/pi-weaver/analysis/architecture.md), a [decision framework](@/pages/harness-engineering/research/pi-weaver/analysis/when-weaver-helps.md) for when self-correction helps vs hurts, and [economics data](@/pages/harness-engineering/research/pi-weaver/analysis/economics.md) I now use for all my harness work. That is not a one-time output. It is infrastructure that keeps paying.

---

There is a more philosophical angle here too. When I author a website with an agent, I am not just "using a tool." I am encoding my intent into a system that keeps acting after the moment of authorship is over. The agent becomes a kind of persistent *karta*, a doer that carries forward decisions I made earlier. My past self set the goals and constraints. The agent figures out the means.

That is also what makes the principal-agent relationship important. I decide the ends. The agent decides the means. If those stay aligned, the agent is an extension of my will. If they drift, it becomes something else. The whole [harness engineering](@/pages/harness-engineering/_index.md) project is about keeping that alignment tight: through skills, conventions, review loops, and human judgment at the decision points.

---

If autocomplete gets you where you need to go, use it. It is cheaper, simpler, and has fewer moving parts.

But if you find yourself re-explaining the same project context every week, or losing track of what you decided three sessions ago, or wishing the model remembered your conventions, you are bumping into the limits of assistive use. The loop exists because I hit those limits and kept going.

See also:
- [The Loop](@/pages/harness-engineering/thesis/the-loop.md) for how sessions compound
- [The Economics](@/pages/harness-engineering/economics/the-economics.md) for what this actually costs
- [The Boring Stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) for what makes the infrastructure work
- [pi-weaver](@/pages/harness-engineering/research/pi-weaver/_index.md) for a worked example of agentic research
