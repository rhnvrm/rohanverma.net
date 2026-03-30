+++
title = "Skills"
weight = 4
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Skills are documentation that agents read with judgment. We've had READMEs and runbooks forever. The difference is that an LLM doesn't just parse a skill — it interprets it. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's an [agent reading documentation](@/pages/harness-engineering/agent-as-reader.md) the way a new team member would.

---

There are 38 skills in the [bosun skills directory](https://github.com/oddship/bosun/tree/main/skills) and the packages that ship with it. Pi loads them based on trigger keywords when a task matches. They're markdown files. At 38 skills, you can't load everything into one [context window](@/pages/harness-engineering/context-windows.md). Skills load on demand and reveal details progressively — a skill that dumps everything upfront wastes tokens. See [progressive disclosure](@/pages/harness-engineering/progressive-disclosure.md).

Three kinds. The most interesting are the meta-skills:

- *General-purpose* (21 skills): git, GitHub, context management, session analysis, mesh [coordination](@/pages/harness-engineering/coordination.md), browser automation, background processes, tmux orchestration.
- *Project-specific* (12 skills): conventions for specific codebases. Worktree paths, build commands, deployment pipelines, debugging playbooks. Tribal knowledge that lives in Slack threads and gets lost.
- *[Meta-skills](@/pages/harness-engineering/meta-skills.md)* (5 skills): skills for creating skills, agents, extensions, commands, tools. The multiplier. These bootstrap the harness itself.

12 of the 38 show multiple commits of active refinement. These aren't write-once-forget. They evolve as I learn what the agent gets wrong. Ideally you just ask the agent to manage them — and with meta-skills, it can.

---

Skills are still in flux as a concept. They're not an industry standard yet — similar to when MCP was first introduced. Different tools handle them differently. Pi's skill format is portable markdown, but there's no guarantee another harness reads them the same way.

Weaker models might not follow skill instructions reliably. For those cases, you can ship CLI tools alongside skills that enforce behavior programmatically. The [Q task agent](@/pages/harness-engineering/q-the-task-agent.md) does this — `qt`, `qp`, `qr` are real CLIs that the skill references, so even a lite model can execute task operations correctly.

Skills compose. Git + deployment conventions + infrastructure knowledge = the agent knows how to branch, push, trigger CI, and deploy correctly. No trial and error on the mechanical parts. I still make the decisions about *what* to deploy and *when*. [The boring stuff](@/pages/harness-engineering/the-boring-stuff.md) pattern.

---

A new engineer loading a project skill immediately knows the worktree path, build command, and why the dev server needs to run in tmux. A skill compresses weeks of learning into minutes. But skills don't solve everything — they encode what I *know* to write down. What I don't know is [the Day-50 problem](@/pages/harness-engineering/the-day-50-problem.md).

The context management skill was a case study in how skills evolve through friction. The original plan was to document a `/pickup` command. The post-mortem revealed that five commands were broken, the specification wasn't being followed, and there was a 17x performance inefficiency. The skill that emerged was fundamentally different from what was planned.

> I analyzed what it would actually take to implement the documented `/pickup` command. The numbers were shocking. To list documents, a subagent would need 17-27 tool calls for what should be a single operation. The architecture was creating a 17-27x inefficiency.
>
> — *Chronicle: Context Management Skill Implementation, Jan 2026*
