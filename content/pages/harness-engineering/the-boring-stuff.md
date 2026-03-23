+++
title = "The Boring Stuff"
weight = 1
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

The split is simple: the agent does the boring stuff, I do the hard stuff.

"Boring" doesn't mean unimportant. It means mechanical. Stuff that takes time and attention but not judgment.

---

Working on a feature, I ran `/handoff` before stopping for the night. The daemon auto-filled the handoff: what I was working on, which files were uncommitted, which bugs were identified — three specific ones with file paths — what was left to do. Next morning, `/pickup` loaded all of it. No re-reading conversation history. The agent started on the first remaining bug immediately.

The boring stuff: summarizing session state, tracking uncommitted files, cataloging known bugs. The daemon does this automatically. The hard stuff: deciding when to stop. Knowing which bugs matter most the next morning. Picking up where judgment left off, not where the cursor was.

---

Early on, repos kept getting cloned to wrong paths. After the third time, I updated the git skill with a `references/REPO-LAYOUT.md` documenting the convention: `workspace/code/{git-server}/{org}/{repo}`. The skill now loads automatically for any git operation. That class of mistake stopped happening.

The boring stuff: following the convention, every time, without thinking about it. The hard stuff: recognizing the pattern after three failures. Deciding to encode it. Writing a convention clear enough that an LLM interprets it correctly.

---

I spawned two agents against git history and the codebase to verify claims in a document. They found wrong dates, inflated numbers, and a timeline that didn't match the commit log. Reported back through inter-agent messaging while I kept working on something else.

The boring stuff: digging through git history, cross-referencing commit dates, counting things, checking claims against code. The hard stuff: writing the document in the first place. Deciding which claims needed verification. Knowing what to do with the discrepancies.

---

Each of these follows the same pattern. The agent handles what's mechanical. I handle what requires judgment. The investment pays off when the time saved applies to every future session.[^xkcd]

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.

The pattern: **attention is the scarce resource, not code.**
