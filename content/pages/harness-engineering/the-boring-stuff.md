+++
title = "The Boring Stuff"
weight = 1
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

This is where harness engineering shines: tasks that are not fully deterministic, but teachable. Things the agent can learn from a [skill](@/pages/harness-engineering/skills.md), recover from with the right tools, or figure out given enough context. Not trivial automation, but not hard judgment either. The boring middle.

---

The best example is convention enforcement. Early on, repos kept getting cloned to wrong paths. After the third time, I updated the git skill with a `references/REPO-LAYOUT.md` documenting the convention: `workspace/code/{git-server}/{org}/{repo}`. Pi injects skill descriptions into the system prompt, which makes the model proactively load the git skill before any git operation. Just saying "follow this convention" in a skill is sometimes enough. That class of mistake stopped happening.

The boring part: following the convention, every time, without thinking about it. The hard part: recognizing the pattern after three failures. Deciding to encode it. Writing a convention clear enough that an LLM interprets it correctly.

The harness enforces this through skill loading. When the agent runs a bash command with `git` in it, Pi's keyword matching triggers the git skill. The skill says "repos go here." The agent follows it. You could even enforce this more strictly: require that the git skill be loaded in context before any git bash call is allowed. That's a reasonable TODO.

---

Same pattern with code verification. I once spawned two agents against git history and the codebase to verify claims in a wiki document. They found wrong dates, inflated numbers, and a timeline that didn't match the commit log. Reported back through [inter-agent messaging](@/pages/harness-engineering/coordination.md) while I kept working on something else. This started because we'd caught a NATS client bug in the zero-agent repo through exactly this kind of cross-referencing: checking what the code actually said against what the docs claimed.

The boring part: digging through git history, cross-referencing commit dates, counting things. The hard part: deciding which claims needed verification and knowing what to do with the discrepancies.

---

[Handoffs](@/pages/harness-engineering/handoffs.md) are another instance. When I run `/handoff`, [the daemon](@/pages/harness-engineering/the-daemon.md) analyzes the session and fills in context: key discoveries, decisions made, files modified, what's left. Next session, `/pickup` loads it. The agent has the full picture without re-reading conversation history.

The boring part: extracting decisions from a long session, tracking what changed, structuring next steps. The hard part: making the architectural calls in the first place.

---

Each of these follows the same pattern. The agent handles what's mechanical. I handle what requires judgment. The investment pays off when the time saved applies to every future session.[^xkcd]

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.

The pattern: **attention is the scarce resource, not code.** That's what [the loop](@/pages/harness-engineering/the-loop.md) is built around.
