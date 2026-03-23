+++
title = "The Loop"
weight = 2
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

The value isn't in any single agent session. It's in the loop.

Sessions produce artifacts. Artifacts become searchable knowledge. Knowledge feeds future sessions. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn. That's the bet, anyway.

---

This didn't start with infrastructure. Back in August with claude-manager, I was manually running a slash command at the end of each session to write learnings to a file. Then I automated it with Claude hooks. Then an OpenCode plugin to trigger on session idle. Now with Pi, file watchers on the raw session JSONL trigger summarization automatically.

Each step was just automating what I was already doing by hand. Start manual, observe what's valuable, automate the valuable parts.

---

The daemon summarizes sessions. Q — a persistent task agent — reads those summaries and updates task status, notes progress, flags blockers.[^qtask] `qmd` makes it all searchable: keyword, semantic, hybrid with LLM reranking. When an agent needs "have we worked on this before?", it finds relevant past work regardless of which session it happened in.

[^qtask]: During one session, Q autonomously synced 15 session summaries into task updates while I was focused on writing. That's the pipeline: sessions generate JSONL, daemon summarizes, Q reads summaries and updates tasks.

The loop: sessions → summaries → searchable knowledge → better sessions. No magic flywheel. Each piece makes the next session a bit better than the last.

---

The history goes back to August 2025. About 4,000 sessions across eight months, 38 skills, 115 tracked tasks.[^timeline] Is every one of those sessions productive? No. Many are short interactions, experiments, throwaway explorations. But they're all searchable. The volume matters because it builds a corpus that makes future sessions more informed.[^amp]

[^timeline]: Month by month: 19 sessions in August 2025, 57 in September, 18 in October, 62 in November, 146 in December. Brief OpenCode bridge in late January. Under bosun, the daemon summarized 745 sessions in January 2026 and 135 Pi sessions in the first week of February. The count kept climbing through February and March.

[^amp]: [Amp](https://ampcode.com/) gets a lot of things right here: session history, conversation threads, good UX for managing context. But their features are in the backend with lock-in. Having all the session data as local files means I can analyze, search, and feed them back into agents using whatever tools I want.

Am I 3x faster? 10x? I genuinely don't know. I'm not optimizing for measurable speedup right now. I'm investing in learning the paradigm. The infrastructure teaches me how agents work, where they break, and what makes them better. That's worth more than a productivity number.

What I can say: context recovery is faster (handoffs mean I don't re-read conversation history), agents make fewer project-specific mistakes (skills encode the conventions), and I can tell an agent "deploy to staging" without personally babysitting pipeline status, tag bumping, and the small stuff that fragments attention. Whether that's 20% faster or 50% faster depends on the task. The bet is that it compounds, and that learning this now pays off as the tools mature.
