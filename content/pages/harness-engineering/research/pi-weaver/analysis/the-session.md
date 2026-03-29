+++
title = "The Session"
weight = 8
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "pi-weaver"
+++

I keep coming back to the same irony: the session that built pi-weaver is not a great advertisement for self-correction as a primary mode of work. It is a much better advertisement for planning, phase boundaries, and ruthless orchestration.

This thing was huge by any normal standard: **50 hours**, **$220**, **22 agents spawned**, **75 commits**, **4 compactions**. If you only looked at the raw scale, you would assume it was chaos with better branding. It wasn't. It was surprisingly structured. The whole session fell into five acts with clean transitions: **research (2h) → eval (26h) → analysis (1.5h) → wiki (18h) → ship (2h)**. Different economics, different agent mixes, different failure modes. The shape matters more than the size.

The first lesson is that the top-line number people notice — $220 — hides the more interesting number underneath: what actually cost the money. The expensive part was not the benchmark runs or the wiki pages. It was the person in the tower. Roughly **$120 was orchestration**: bosun, running at opus rates, reading outputs, spawning agents, redirecting work, reviewing drafts, and keeping the whole thing coherent across fifty hours. Then roughly **$50 went to eval**, **$30 to wiki writing**, and **$15 to reviews**. That distribution surprised me at first, but it makes sense. In a multi-agent session, the foreman can cost more than the crew. If you want the system to feel intelligent at scale, that is the bill you end up paying.

---

The five acts make that visible. The **research** phase was cheap and directional: read the antirez thread, figure out what "jump back in history" should mean inside pi, decide this was not a generic undo feature but a harness-level checkpoint/time_lapse/done system. The **eval** phase was the monster. Twenty-six hours of Harbor setup, Docker decisions, prompt iteration, adapter work, reruns, and the ugly middle where the numbers looked real until they very much were not. The **analysis** phase was short because it used oracles the right way: synthesize, don't wander. The **wiki** phase exploded because prose is parallelizable, reviews are iterative, and publishing quality is expensive in a different way than code quality. The final **ship** phase was tiny because by then the important decisions were already made.

That is why my strongest takeaway is blunt: **good planning beats good recovery**. Pi-weaver is useful when you are stuck in a bad branch and need a way back without carrying dead context forever. This session mostly didn't live there. It was not a long debugging spiral. It was a long orchestration run. The hard problem was sequencing work across phases, preserving the right context through compactions, and using the right agent for the right job. Weaver helps with recovery. This session mostly succeeded because recovery was not the main event.

---

That does not mean there were no failures. There were, and they are revealing. The most important code-side failure was the **isError bug**, which effectively invalidated earlier eval confidence and forced a reset in how [the architecture](@/pages/harness-engineering/research/pi-weaver/analysis/architecture.md) handled context-event pruning. That is the cleanest place where pi-weaver probably would have paid for itself inside the very session that created it. I think it could have saved **5–7 hours total** across the isError detour and the fallback work after failed delegations. But even there, the point is limited: that saving lives in the margins. It does not explain ninety percent of the session. Ninety percent was still coordination.

The more embarrassing failures were infrastructural, not cognitive. **Two deckhands failed because of [bwrap](@/pages/harness-engineering/bubblewrap.md) sandbox write issues** when working in a nested repo. Bosun had to redo the work. I think that matters because it is easy to over-attribute failures to model weakness when the real culprit is the harness underneath. In this session, infrastructure issues caused more useless churn than agent reasoning did. That is not a glamorous conclusion, but it is probably the honest one.

---

The prose work made another lesson impossible to ignore: **oracle vs deckhand is a real [tiering](@/pages/harness-engineering/model-tiers.md) decision, not just a pricing decision**. One oracle using GPT-5.4 wrote five task pages that reviewers called excellent. No voice surgery, no rescue pass, no apology edits. The deckhand-written pages were serviceable but needed voice fixes. I would not generalize that into "always use premium models for writing," but I would absolutely say this: if the deliverable is public prose and voice matters, cheap drafting often becomes expensive editing. The right tier can be cheaper than the rework.

The actual quality mechanism, though, was not the writing model. It was the **review loop**. This session kept proving that single-pass confidence is fake. The loop was **audit → visual review via CDP → content review twice**. Each pass caught things the others missed. Audit found structure issues. Visual review caught the stuff that looks fine in markdown and ridiculous in the browser: duplicate H1s, empty section pages, navigation dead ends. Content review caught the human-facing failures: dry openings, weak pages, places where the page was technically true and still bad. Spending **$5–10 on review** to avoid publishing obvious mistakes was one of the best trades in the whole session.

---

So would pi-weaver have helped this session? **Yes, a bit. No, not fundamentally.** It probably would have shortened the recovery arcs around the isError bug and some fallback work. But this was not a session dominated by models getting lost and needing to rewind. It was dominated by a human-directed system moving through five clear phases with [mesh coordination](@/pages/harness-engineering/coordination.md), compaction summaries, agent specialization, and a steady editorial pipeline.

If I had to compress the whole case study into one sentence:

> Pi-weaver is for recovery phases. This session mostly won on the happy path because the plan was good.

That is not a knock on the tool. It is actually a useful boundary. Self-correction matters, but it is not the same thing as orchestration. The session that built pi-weaver taught me that the glamorous idea — agents rewinding themselves out of failure — is only part of the story. The less glamorous part is still what wins most long sessions: clear phases, good delegation, expensive orchestration, and review loops that catch what confidence misses.
