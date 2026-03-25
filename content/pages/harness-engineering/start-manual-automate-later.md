+++
title = "Start Manual, Automate Later"
weight = 19
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

You can't automate what you don't understand. This pattern shows up everywhere in the system: do it by hand first, observe what's actually valuable, automate the valuable parts.

---

[Session summarization](@/pages/harness-engineering/session-summarization.md). Back in August with claude-manager, I manually ran a slash command at the end of each session to write learnings to a file. Then I automated it with Claude hooks. Then an OpenCode plugin to trigger on session idle. Now with [Pi](@/pages/harness-engineering/pi.md), file watchers on the raw session JSONL trigger summarization automatically. Four iterations, each one just automating what I was already doing by hand.

Repo conventions. Early on, repos kept getting cloned to wrong paths. After the third time, I updated the git [skill](@/pages/harness-engineering/skills.md) with a reference doc for the convention: `workspace/code/{git-server}/{org}/{repo}`. That class of mistake stopped happening. The automation was a markdown file. The insight was three failures of doing it manually.

Task tracking. Started as manual notes in claude-manager — daily logs mixing observations and TODOs. Months later, [Q](@/pages/harness-engineering/q-the-task-agent.md) reads [daemon](@/pages/harness-engineering/the-daemon.md) summaries and updates task status automatically. The automated version works because the manual version taught me what's worth tracking.

---

The opposite of "automate everything from day one." Premature automation is premature abstraction. You encode the wrong thing, or worse, you encode something that doesn't matter. The manual phase reveals what's actually valuable versus what only *seemed* valuable.

---

The catchup-sessions daemon workflow replaced manual summarization only after months of doing it by hand. By then I knew: which sessions are worth summarizing (not the 1-3 message throwaway ones), what the summary should contain (frontmatter schema, narrative structure), and what [model tier](@/pages/harness-engineering/model-tiers.md) is cost-effective for the task (Haiku, not Opus).

Every piece of [the loop](@/pages/harness-engineering/the-loop.md) went through this. It looks automatic now. It wasn't always.

---

Anthropic went through the same cycle with their long-running coding harness. They started complex: sprints, per-sprint QA contracts, negotiation phases between generator and evaluator agents. Then they methodically stripped it back. Their first attempt — cutting radically and trying creative new ideas — failed. They couldn't tell which pieces were load-bearing. So they switched to removing one component at a time and reviewing the impact. Sprints turned out to be unnecessary once Opus 4.6 shipped, because the model could sustain coherence without decomposition. The evaluator remained valuable, but only for tasks at the edge of what the model handled well solo. They describe the principle directly: "find the simplest solution possible, and only increase complexity when needed." Same pattern. You can't know what's load-bearing until you try removing it, and you can't try removing it until you've built it and watched it work.
