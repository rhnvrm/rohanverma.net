+++
title = "Skills"
weight = 4
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
section_title = "Skills & Knowledge"
og_image = "/images/pages/harness-engineering/skills.png"
+++

![I know git conventions!](/images/pages/harness-engineering/skills.png)

*In The Matrix, Neo gets kung fu uploaded directly to his brain. Skills work the same way: markdown files loaded into the agent's context on demand. "I know git conventions." "Show me."*

Skills are documentation that agents read with judgment. We've had READMEs and runbooks forever. The difference is that an LLM doesn't just parse a skill. It interprets it. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's an [agent reading documentation](@/pages/harness-engineering/skills/agent-as-reader.md) the way a new team member would.

---

There are 28 skills across the [bosun skills directory](https://github.com/oddship/bosun/tree/main/skills) and the packages that ship with it. Pi loads them based on trigger keywords when a task matches. They're markdown files. At that count, you can't load everything into one [context window](@/pages/harness-engineering/agents/context-windows.md). Skills load on demand and reveal details progressively. A skill that dumps everything upfront wastes tokens. See [progressive disclosure](@/pages/harness-engineering/skills/progressive-disclosure.md).

Three kinds. The most interesting are the meta-skills:

- *General-purpose* (21 skills): git, GitHub, context management, session analysis, mesh [coordination](@/pages/harness-engineering/agents/coordination.md), browser automation, background processes, tmux orchestration.
- *Project-specific* (12 skills): conventions for specific codebases. Worktree paths, build commands, deployment pipelines, debugging playbooks. Tribal knowledge that lives in Slack threads and gets lost.
- *[Meta-skills](@/pages/harness-engineering/skills/meta-skills.md)* (5 skills): skills for creating skills, agents, extensions, commands, tools. The multiplier. These bootstrap the harness itself.

Many of these show multiple commits of active refinement. These aren't write-once-forget. They evolve as I learn what the agent gets wrong. Ideally you just ask the agent to manage them, and with meta-skills, it can.

---

### Packaging and agent templates

Skills ship inside packages. Bosun's monorepo has 17 packages (`pi-mesh`, `pi-tmux`, `pi-agents`, `pi-daemon`, etc.), each with its own skills, extensions, and slot files. When a downstream project installs a package, the skills come with it.

The harder problem is agent definitions. An agent `.md` file might reference pi-mesh for coordination, pi-tmux for window management, and pi-q for task tracking. But what if the user doesn't have pi-q installed? The agent file would contain dead instructions that confuse the model and waste tokens.

The solution is [Handlebars templating](https://github.com/oddship/bosun/blob/main/packages/pi-agents/designs/agent-templating.md) in agent definitions. Agent `.md` files use conditionals and named content slots:

```handlebars
{{"{{"}}#if pi_mesh}}
## Mesh Coordination
{{"{{"}}> pi_mesh/worker_reporting}}
{{"{{"}}/if}}
```

Package detection is automatic: if `packages/pi-mesh/package.json` or `node_modules/pi-mesh/package.json` exists, the `pi_mesh` flag is true. Slots resolve in order: project override (`.pi/slots/`) wins over package-provided (`packages/pi-mesh/slots/`) wins over npm (`node_modules/`). This lets downstream projects customize messaging for packages they don't control.

The result: agent definitions stay self-contained and readable, but sections appear or disappear based on what's actually installed. No dead references, no wasted context.

---

Skills are still in flux as a concept. They're not an industry standard yet, similar to when MCP was first introduced. Different tools handle them differently. Pi's skill format is portable markdown, but there's no guarantee another harness reads them the same way.

Weaker models might not follow skill instructions reliably. For those cases, you can ship CLI tools alongside skills that enforce behavior programmatically. The [Q task agent](@/pages/harness-engineering/feedback/q-the-task-agent.md) does this: `qt`, `qp`, `qr` are real CLIs that the skill references, so even a lite model can execute task operations correctly.

Skills compose. Git + deployment conventions + infrastructure knowledge = the agent knows how to branch, push, trigger CI, and deploy correctly. No trial and error on the mechanical parts. I still make the decisions about *what* to deploy and *when*. [The boring stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md) pattern.

---

A new engineer loading a project skill immediately knows the worktree path, build command, and why the dev server needs to run in tmux. A skill compresses weeks of learning into minutes. But skills don't solve everything; they encode what I *know* to write down. What I don't know is [the Day-50 problem](@/pages/harness-engineering/failure-modes/the-day-50-problem.md).

The context management skill was a case study in how skills evolve through friction. The original plan was to document a `/pickup` command. The post-mortem revealed that five commands were broken, the specification wasn't being followed, and there was a 17x performance inefficiency. The skill that emerged was fundamentally different from what was planned.

> I analyzed what it would actually take to implement the documented `/pickup` command. The numbers were shocking. To list documents, a subagent would need 17-27 tool calls for what should be a single operation. The architecture was creating a 17-27x inefficiency.
>
> — *Chronicle: Context Management Skill Implementation, Jan 2026*
