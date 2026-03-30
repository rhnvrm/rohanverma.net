+++
title = "The Boring Stuff"
weight = 1
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++
<!--What do u mean by split? Its not always that tho, but I want to say thats where harness engineering shines-->
The split is simple: the agent does the boring stuff, I do the hard stuff.

"Boring" doesn't mean unimportant. It means mechanical. Stuff that takes time and attention but not judgment.
<!--Things that you know and can teach but are also not fully deterministic but attaching a harness where the agent can recover from the mistake or maybe even correct itself or figure things out given enough tools and things like that-->
---

<!--The flow is absurd on this page, handoffs are the least interesting part about this-->
Planning a framework migration, I ran `/handoff` before stopping. [The daemon](@/pages/harness-engineering/the-daemon.md) analyzed the session and filled in context: the key discovery (bosun's init script already had dependency mode built in), the decision to use npm over git submodules, the files that had been modified, what was left to do. Next session, `/pickup` loaded all of it. The agent had the full picture without re-reading conversation history.
<!--I understand what you mean here, that splitting off the current context writing a nice big prompt all of that can be automated, yeah, but first of all i dont even know if this is a real example or even worth mentioning as the first thing in this page-->
The boring stuff: extracting decisions from a long session, tracking what changed, structuring the next steps. The hard stuff: making the architectural call in the first place. Deciding npm over submodules. Recognizing that the dependency mode discovery changed the whole migration strategy.

---
<!--Umm sure this one is useful and should be higher up-->
Early on, repos kept getting cloned to wrong paths. After the third time, I updated the git [skill](@/pages/harness-engineering/skills.md) with a `references/REPO-LAYOUT.md` documenting the convention: `workspace/code/{git-server}/{org}/{repo}`. The skill now loads automatically for any git operation. That class of mistake stopped happening.
<!--The major thing here, that there is a convention and that can be followed, but how is that enforced by the harness really? Maybe through skill loading you mean to say, the pi harness actually injects skill descriptions which make the model proactive to load the git skill when calling the git stuff via bash, just saying it should be done is sometimes enough, people even could modify their harness to make sure that git skill is always called before making this, maybe this is a good TODO, enforce that git skill be loaded in the context window atleast once before the bash tool call is made as an opt in.-->
The boring stuff: following the convention, every time, without thinking about it. The hard stuff: recognizing the pattern after three failures. Deciding to encode it. Writing a convention clear enough that an LLM interprets it correctly.

---
<!--Is there are a real session to back this up-->
I spawned two agents against git history and the codebase to verify claims in a document. They found wrong dates, inflated numbers, and a timeline that didn't match the commit log. Reported back through [inter-agent messaging](@/pages/harness-engineering/coordination.md) while I kept working on something else.
<!--Thats great but what prompted us to do this, i recall there was some nats bug in zero agent which we spotted through this, maybe we can -->
The boring stuff: digging through git history, cross-referencing commit dates, counting things, checking claims against code. The hard stuff: writing the document in the first place. Deciding which claims needed verification. Knowing what to do with the discrepancies.

---
<!--These are the worst examples to illustrate, we have so many other possible examples, the most of the examples for this are the skills and their invokation, especially in zero-agent repo-->
Each of these follows the same pattern. The agent handles what's mechanical. I handle what requires judgment. The investment pays off when the time saved applies to every future session.[^xkcd]

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.

The pattern: **attention is the scarce resource, not code.** That's what [the loop](@/pages/harness-engineering/the-loop.md) is built around.
