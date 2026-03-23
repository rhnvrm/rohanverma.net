+++
title = "Harness Engineering"
description = "On building the infrastructure around AI coding agents — the boring stuff that makes the interesting stuff possible."
sort_by = "weight"
template = "pages-section.html"
page_template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
last_updated = "March 2026"
+++

Code is cheap. K [wrote about this](https://nadh.in/blog/code-is-cheap/) recently. Mitchell Hashimoto, in his [AI adoption journey](https://mitchellh.com/writing/my-ai-adoption-journey), describes what he calls "harness engineering": setting up your AI coding environment so the agent never makes the same mistake twice. AGENTS.md files, custom tools, verification scripts. He's at the stage of running a single agent and trying to always have one going.

I've been further down this road for a while. I've been iterating on AI coding setups since August 2025. Most writing about AI coding comes from two ends: people excited about generating code, or experienced engineers explaining why it doesn't replace thinking. The middle is underrepresented. People with enough experience to build real infrastructure but who haven't stopped experimenting. That's where I am, and I think the perspective is useful.

After eight months, the thesis has sharpened:

> Harness engineering isn't important for the *thinking* part of LLMs — it's important for the "automate the boring stuff" part. The agent types. I think. That's the split.

The value isn't in any single agent session. It's in the loop. Sessions produce artifacts, artifacts become searchable knowledge, knowledge feeds future sessions. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn.[^xkcd] That's the bet, anyway.

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.

I've been building a sandboxed AI development environment called [bosun](https://github.com/oddship/bosun). It runs on [Pi](https://github.com/badlogic/pi-mono), an open-source coding agent harness. Along the way I built a daemon for background automation, a task management agent, multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh), and accumulated 38 skills across about 4,000 sessions. I also run agents 24/7 for casual stuff via [OpenClaw](https://openclaw.ai/) in a private Discord, but for serious engineering work on production systems, I wanted something sandboxed, reproducible, and context-preserving.

## The receipts

Session history was the first thing that paid off. Everything else built on that.

The history goes back to August 2025. ~4,000 searchable records across eight months, 38 skills, 115 tracked tasks, 27 handoff files, 120 chronicle entries.[^timeline]

[^timeline]: Month by month: 19 sessions in August 2025 (just getting started), 57 in September, 18 in October, 62 in November, 146 in December. Brief OpenCode bridge in late January. Under bosun, the daemon summarized 745 sessions in January 2026 and 135 Pi sessions in the first week of February. Add 288 project notes from the claude-manager era. The count kept climbing through February and March.

The skills accumulated over about a month: 6,800 lines of documentation, 12 showing multiple commits (active refinement, not write-once-forget).

Is every one of those sessions productive? No. Many are short interactions, experiments, throwaway explorations. But they're all searchable. When an agent runs `qmd search "exchange broadcast parsing"`, it finds relevant past work whether it happened yesterday or six weeks ago. The volume matters because it builds a corpus that makes future sessions more informed.[^amp]

[^amp]: [Amp](https://ampcode.com/) gets a lot of things right here: session history, conversation threads, good UX for managing context. But their features are in the backend with lock-in. Having all the session data as local files means I can analyze, search, and feed them back into agents using whatever tools I want.

Am I 3x faster? 10x? I genuinely don't know. I'm not optimizing for measurable speedup right now. I'm investing in learning the paradigm. The infrastructure teaches me how agents work, where they break, and what makes them better. That's worth more than a productivity number. What I can say: context recovery is faster (handoffs mean I don't re-read conversation history), agents make fewer project-specific mistakes (skills encode the conventions), and I can tell an agent "deploy to staging" without personally babysitting pipeline status, tag bumping, and the small stuff that fragments attention. Whether that's 20% faster or 50% faster depends on the task. The bet is that it compounds, and that learning this now pays off as the tools mature.

## What's in here

This is a living document. It walks through what I built, why, and the tradeoffs:

- **[The Boring Stuff](@/pages/harness-engineering/the-boring-stuff.md)** — The split between what the agent does and what I do, with traced examples from real work.
- **[The Loop](@/pages/harness-engineering/the-loop.md)** — How sessions become searchable knowledge: daemon summarization, Q task tracking, and the feedback loop that makes each session better than the last.
- **[Architecture](@/pages/harness-engineering/architecture.md)** — The sandbox (Nix + bubblewrap), skills (38 and counting), multi-agent coordination (pi-mesh), and why not Claude Code.
- **[Where to Start](@/pages/harness-engineering/where-to-start.md)** — You don't need all of this. Start with session history, encode what you learn, try one extra agent.
