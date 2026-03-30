+++
title = "AI Task Management"
weight = 1
template = "pages-page.html"
date = 2025-09-01
draft = false

[extra]
section_title = "Systems"
+++

I use Claude as a proactive life manager. Not a chatbot I ask questions. A system that tracks my tasks, runs daily orientations, maintains institutional memory across sessions, and coordinates work across multiple domains (day job, side projects, personal life). This page documents the methodology and the lessons from building it.

*Note: this system was the predecessor to [Q, the task agent](@/pages/harness-engineering/feedback/q-the-task-agent.md), which now handles task tracking inside [bosun](https://github.com/oddship/bosun). The methodology documented here is still relevant. Q inherited most of these ideas.*

## The concept

Most people interact with LLMs reactively: you have a question, you type it, you get an answer. The setup I built is closer to having a chief of staff. The AI knows what I am working on, what is blocked, what deadlines are approaching, and what I said I would do yesterday. When I start a session, it tells me where I left off. When I finish, it archives what happened.

The key insight is that an LLM with access to a structured file system becomes a genuine personal knowledge manager. It reads project files, daily notes, task databases, and calendar entries. It can cross-reference across all of them. It remembers things I forgot I wrote down.

## Task tracking with a CLI tool

I use a lightweight CLI task tracker that lives inside the same repository the AI manages. Tasks are stored as structured data with fields for priority, status, dependencies, and tags. The AI creates, updates, and closes tasks as part of our conversations.

Core workflow:
- `ready` shows tasks with no blockers, sorted by priority
- `blocked` shows what is stuck and why
- `list --status in_progress` shows active work
- Dependencies are explicit: task A depends on task B, and the tool enforces it

This matters because the AI can reason about the dependency graph. When I ask "what should I work on next?" it does not just pick the highest priority item. It checks what is actually unblocked and what chains of work would clear the most blockers.

Multi-domain organization is handled through tags. Work tasks, side project tasks, and personal tasks all live in the same system but can be filtered independently. The daily standup pulls from all domains.

## The "back to basics" lesson

The single most important lesson from this project: more sophisticated systems do not automatically provide more value.

My first iteration was called a "Strategic Intelligence Coordinator." It had seven specialized agents, mandatory five-agent deployment on startup, and produced comprehensive intelligence briefings. On paper it sounded impressive. In practice, daily notes shrank from 400+ lines of substance to 36 lines of fluff. Meeting startup took 20-30 minutes with minimal value. The process became more important than the outcomes.

I scrapped all of it and rebuilt around a simpler concept: a proactive life manager that helps me get things done.

The before and after:

| Metric | Over-engineered version | Simplified version |
|--------|------------------------|--------------------|
| Meeting startup | 20-30 minutes | Under 3 minutes |
| Daily note quality | Buzzword summaries | Substantive work logs |
| Agent integration | Failed captures | Systematic preservation |
| Intelligence value | Generic analysis | Evidence-based insights |

The anti-pattern has a name: building a "strategic intelligence coordinator" when what you need is a practical task manager. If the system's description requires more than one sentence, it is probably too complicated.

## Subagent pattern

The LLM has a limited context window. My knowledge base has hundreds of files. The solution is a question-and-answer pattern using lightweight subagents.

When I ask a question, the system:
1. Breaks it down into atomic sub-questions
2. Spawns lightweight subagents (using a cheaper, faster model) to gather context from specific files
3. Collects the responses
4. Synthesizes a final answer

This works because each subagent only needs to read a few files and extract specific information. The orchestrating agent stays focused on synthesis, not retrieval. It scales to large knowledge bases without blowing up the context window.

## Session memory and daily notes

Every conversation is a session. At the end of each session, the system archives a summary to a date-organized directory. These summaries include decisions made, files modified, blockers identified, and next steps.

The daily note is the running log. It gets timestamps, session references, and inline notes. It is the AI's working memory for the current day. When session summaries are provided, they are stored verbatim (not expanded or duplicated), because raw intelligence is more valuable than processed summaries.

A boot script runs on startup. It shows today's reminders, ready tasks, blocked items, and active projects. This takes the "where was I?" problem and turns it into a three-second glance.

## Meeting startup optimization

The original system required a complex multi-agent deployment at every meeting start. Five agents would run in parallel, producing intelligence briefings, pattern analyses, and git correlation reports. It was impressive engineering and almost entirely useless.

The fix was making it optional and focused:
- Morning orientation only runs if it is the first session of the day
- Three agents instead of five, only when needed
- Specific, actionable insights instead of comprehensive analysis
- Under three minutes instead of twenty

The principle: optimize for getting to actual work as fast as possible. The standup exists to orient, not to perform.

## What emerged

After eight months of daily use, the system settled into something genuinely useful:
- A structured knowledge base that the AI navigates better than I do
- Task dependencies that surface what is actually unblockable right now
- Session archives that make it possible to pick up complex projects after weeks away
- A daily rhythm (boot, orient, work, archive) that compounds over time

The compounding is the part that matters. Each session's archive makes future sessions better. Each task closed updates the dependency graph. The system does not just track work; it gets better at tracking work.

## Principles

1. **Optimize for outcomes, not elegance.** If the system's name is fancier than its output, simplify.
2. **Preserve raw intelligence.** Store verbatim session summaries. Let the AI synthesize fresh each time instead of relying on pre-processed summaries.
3. **Make orientation fast.** The boot sequence should take seconds, not minutes.
4. **Use the platform natively.** Do not build workarounds for features the tool already provides.
5. **Systems over willpower.** Automate the boring parts. Save judgment for the decisions that matter.
