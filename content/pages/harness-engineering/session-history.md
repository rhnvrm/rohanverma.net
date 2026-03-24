+++
title = "Session History"
weight = 9
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Session history was the first thing that paid off. Everything else built on that.

Every AI coding session produces a conversation log. Most people throw these away. I keep them. The history goes back to August 2025 — about 4,000 searchable records across eight months, 38 [skills](@/pages/harness-engineering/skills.md), 115 tracked tasks, 27 handoff files, 120 chronicle entries.

---

The volume matters. Not because every session is productive — many are short interactions, experiments, throwaway explorations. But they're all searchable. When an agent needs "have we worked on this before?", it finds relevant past work regardless of which session it happened in. The corpus makes future sessions more informed.

Month by month: 19 sessions in August 2025 (just getting started), 57 in September, 18 in October, 62 in November, 146 in December. A brief OpenCode bridge in late January. Under bosun, the daemon summarized 745 sessions in January and hundreds more since. The count kept climbing.

---

Am I 3x faster? 10x? I genuinely don't know. I'm not optimizing for measurable speedup right now. I'm investing in learning the paradigm. The infrastructure teaches me how agents work, where they break, and what makes them better. That's worth more than a productivity number.

What I can say: context recovery is faster (handoffs mean I don't re-read conversation history), agents make fewer project-specific mistakes (skills encode the conventions), and I can tell an agent "deploy to staging" without personally babysitting pipeline status, tag bumping, and the small stuff that fragments attention. Whether that's 20% faster or 50% faster depends on the task. The bet is that it compounds, and that learning this now pays off as the tools mature.

---

[Amp](https://ampcode.com/) gets a lot of things right here: session history, conversation threads, good UX for managing context. But their features are in the backend with lock-in. Having all the session data as local files means I can analyze, search, and feed them back into agents using whatever tools I want. That's the difference between [renting and owning](@/pages/harness-engineering/the-omakase-tradeoff.md).

Session history feeds into [the loop](@/pages/harness-engineering/the-loop.md). [The daemon](@/pages/harness-engineering/the-daemon.md) summarizes sessions automatically. [Q](@/pages/harness-engineering/q-the-task-agent.md) reads those summaries and updates task status. The whole chain starts with keeping the logs.
