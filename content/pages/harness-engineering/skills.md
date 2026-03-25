+++
title = "Skills"
weight = 4
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Skills are documentation. We've had READMEs and runbooks forever. The difference is that an LLM doesn't just load a skill — it interprets it with judgment. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's not config. That's an agent reading documentation the way a new team member would.

---

There are 38 skills in `.pi/skills/`. Pi loads them based on trigger keywords when a task matches. They're markdown files, not tied to any specific harness. At 38 skills and 6,800 lines, you can't load everything into one context. Progressive disclosure isn't a nicety — it's a context window constraint. A skill that dumps everything upfront wastes tokens. One that reveals details based on what the agent is actually doing stays useful longer.

Three kinds:

- *General-purpose* (21 skills): git, GitHub, context management, session analysis, mesh [coordination](@/pages/harness-engineering/coordination.md), browser automation, background processes, tmux orchestration.
- *Project-specific* (12 skills): conventions for specific codebases. Worktree paths, build commands, deployment pipelines, debugging playbooks. Tribal knowledge — the kind of thing that lives in Slack threads and gets lost.
- *[Meta-skills](@/pages/harness-engineering/meta-skills.md)* (5 skills): skills for creating skills, agents, extensions, commands, tools. The multiplier.

12 of the 38 show multiple commits of active refinement. These aren't write-once-forget. They evolve as I learn what the agent gets wrong.

---

Skills are portable and maintainable. When Pi updates, I ask the agent to read the changelog, diff it against existing skills, and suggest updates. That's cheaper than monitoring unversioned docs from a closed-source tool.

Skills compose. Git + deployment conventions + infrastructure knowledge = the agent knows how to branch, push, trigger CI, and deploy correctly. No trial and error on the mechanical parts. I still make the decisions about *what* to deploy and *when* — [the boring stuff](@/pages/harness-engineering/the-boring-stuff.md) pattern.

---

A new engineer loading a project skill immediately knows the worktree path, build command, and why the dev server needs to run in tmux. No Slack archaeology required. A skill compresses weeks of learning into minutes.

But skills don't solve everything. That's [the Day-50 problem](@/pages/harness-engineering/the-day-50-problem.md).

---

The context management skill was a case study in how skills evolve through friction. The original plan was to document a `/pickup` command. The post-mortem analysis revealed that five commands were broken (stored in the wrong directory), the specification wasn't being followed, and there was a 17x performance inefficiency. The skill that emerged was fundamentally different from the one that was planned.

> I analyzed what it would actually take to implement the documented `/pickup` command. The numbers were shocking. To list documents, a subagent would need 17-27 tool calls for what should be a single operation. The architecture was creating a 17-27x inefficiency.
>
> — *Chronicle: Context Management Skill Implementation, Jan 2026*
