+++
title = "The XKCD Math"
weight = 31
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

[XKCD 1205](https://xkcd.com/1205/): "Is It Worth the Time?" A table of how often you do a task, how much time you save, and whether the automation investment pays off over five years. Simple math. Except the inputs changed.

---

Quinn Slack [pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session. The xkcd table assumes *you* do the automating. What if the agent does?

The [meta-skills](@/pages/harness-engineering/meta-skills.md) math: about 15 minutes saved per skill. Across 38 [skills](@/pages/harness-engineering/skills.md), that's roughly 9.5 hours. Plus every future skill. The xkcd math says this is worth it if you create skills frequently enough. I do.

But the real shift: the cost of automation dropped. When the agent scaffolds new skills, when [the daemon](@/pages/harness-engineering/the-daemon.md) automates [summarization](@/pages/harness-engineering/session-summarization.md), the "time to automate" column in the xkcd table shrinks dramatically. Automation that used to take an afternoon now takes a prompt.

---

Weekly cost efficiency improved about 30% over time — from $0.079 to $0.054 per tool call. The system gets cheaper to run as skills and [caching](@/pages/harness-engineering/token-caching.md) compound. The xkcd table has a time axis. This system has one too, and it slopes down.

---

The honest caveat: I'm treating the total spend as tuition, not overhead. [The economics](@/pages/harness-engineering/the-economics.md) page has the numbers. The xkcd math works for the mechanical parts — summarization, skill creation, deployment automation. For learning this way of working, the calculation is different. It's an investment in understanding, not a time-saving optimization.

The xkcd table asks "is it worth the time?" [The loop](@/pages/harness-engineering/the-loop.md) asks a different question: "does it compound?" Time saved is linear. Knowledge that compounds into better future sessions is something else entirely. The math is harder but the payoff is bigger. That's [the boring stuff](@/pages/harness-engineering/the-boring-stuff.md) thesis reframed as arithmetic.
