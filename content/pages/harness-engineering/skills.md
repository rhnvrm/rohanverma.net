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

<!--Umm which pi skills are we talking about here? from which repo-->
There are 38 skills in `.pi/skills/`. Pi loads them based on trigger keywords when a task matches. They're markdown files, not tied to any specific harness. At 38 skills and 6,800 lines, you can't load everything into one context. Progressive disclosure isn't a nicety — it's a [context window](@/pages/harness-engineering/context-windows.md) constraint. A skill that dumps everything upfront wastes tokens. One that reveals details based on what the agent is actually doing stays useful longer.
<!--This needs to be rewritten smells of AI, emdash and nicety then saying stuff-->
Three kinds:
<!--The most interesting one being the meta skills that help bootstrap-->
- *General-purpose* (21 skills): git, GitHub, context management, session analysis, mesh [coordination](@/pages/harness-engineering/coordination.md), browser automation, background processes, tmux orchestration.
- *Project-specific* (12 skills): conventions for specific codebases. Worktree paths, build commands, deployment pipelines, debugging playbooks. Tribal knowledge — the kind of thing that lives in Slack threads and gets lost.
- *[Meta-skills](@/pages/harness-engineering/meta-skills.md)* (5 skills): skills for creating skills, agents, extensions, commands, tools. The multiplier.

12 of the 38 show multiple commits of active refinement. These aren't write-once-forget. They evolve as I learn what the agent gets wrong.

<!--Ideally you just ask the agent to manage the skills-->
---

<!--Thats what you would think, they are a standard but people are not following that standard, this is similar to when MCP was introduced and skills are still in a flux-->
Skills are portable and maintainable. When Pi updates, I ask the agent to read the changelog, diff it against existing skills, and suggest updates. That's cheaper than monitoring unversioned docs from a closed-source tool.

Skills compose. Git + deployment conventions + infrastructure knowledge = the agent knows how to branch, push, trigger CI, and deploy correctly. No trial and error on the mechanical parts. I still make the decisions about *what* to deploy and *when* — [the boring stuff](@/pages/harness-engineering/the-boring-stuff.md) pattern.
<!--Weaker models might still not follow instructions or do them well, so you can include some scripts with skills that can be used to validate or ship tools via clis for the agent like the Q skills do-->
---

A new engineer loading a project skill immediately knows the worktree path, build command, and why the dev server needs to run in tmux. No Slack archaeology required. A skill compresses weeks of learning into minutes.

<!--Give a gist on why someone should click and read that-->
But skills don't solve everything. That's [the Day-50 problem](@/pages/harness-engineering/the-day-50-problem.md).

---

<!-- I did not understand this-->
The context management skill was a case study in how skills evolve through friction. The original plan was to document a `/pickup` command. The post-mortem analysis revealed that five commands were broken (stored in the wrong directory), the specification wasn't being followed, and there was a 17x performance inefficiency. The skill that emerged was fundamentally different from the one that was planned.
<!--I rarely use pickup/handoff-->
> I analyzed what it would actually take to implement the documented `/pickup` command. The numbers were shocking. To list documents, a subagent would need 17-27 tool calls for what should be a single operation. The architecture was creating a 17-27x inefficiency.
>
> — *Chronicle: Context Management Skill Implementation, Jan 2026*

<!--Maybe we should look at our session histories and see how many times and where skills have been invoked and dig in for more nuggets here-->
