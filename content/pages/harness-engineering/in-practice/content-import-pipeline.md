+++
title = "Content Import Pipeline"
weight = 20
template = "pages-page.html"
date = 2026-03-30
draft = false

[extra]
section_title = "In Practice"
+++

I had two years of notes sitting in a private Obsidian vault and an old project management repo. Patterns I had noticed, systems I had built, failure cases I had documented. All private, all messy, and all rotting because nobody could read them.

The problem was not "how do I copy files." The problem was that the private notes had colleague names, internal service references, task IDs, financial specifics, and employer-proprietary details mixed into otherwise publishable thinking. I could not just dump them into the public garden. I needed a pipeline.

---

**Scouting.** Two agents explored the vault and the old repo independently. The vault had an `inbox/` of raw captures and a `public/` folder of more polished notes. The old repo had daily logs, session records, and project files. The agents flagged what was importable (patterns, mental models, system design notes) and what had to stay private. Anything mentioning a colleague by name, referencing an internal dashboard, or describing proprietary systems got marked.

**Import.** 25 files from the notes vault, 4 from the project repo. Frontmatter converted from YAML (Obsidian) to TOML (Zola). Filenames normalized. Mechanical work. This is the kind of thing agents are good at: tedious, exact, and easy to verify.

**Scrubbing.** Colleague names replaced with roles or removed. Internal service names stripped. Task IDs deleted. Financial figures generalized. The employer became "a fintech company." The goal was not anonymity (the site is under my name), but keeping the focus on patterns rather than implementation details that belong to someone else.

**Restructuring.** The imported pages were flat. 38 harness-engineering pages in one directory with no hierarchy. I reorganized them into eight subdirectories: thesis, sandbox, skills, agents, feedback, failure-modes, economics, in-practice. That part was easy. The hard part was the 248 cross-links that all needed to be updated to match the new paths. An agent ran the refactor. It took minutes. By hand it would have taken hours and I would have missed some.

**Editorial.** Some files were stubs: a title and two sentences. Some were raw notes in bullet-point form. An agent enriched them: turned bullets into prose, added diagrams where they helped, inserted Wikipedia links for context. The voice stayed mine. The agent handled the mechanical lifting, not the thinking.

**QA.** Six [parallel review agents](@/pages/harness-engineering/agents/parallel-batch-review.md) checked all 81 pages for broken links, PII leaks, employer-sensitive content, and AI writing patterns. One low-severity issue caught and fixed.

---

The key constraint: everything went out as `draft = true`. The garden grows in private. When a section feels true enough to stand behind publicly, I flip the flag. Until then it is safe to experiment, restructure, and rewrite.

Even the stubs are worth importing. A page with a good title and one paragraph of context is better than a note that sits in a private vault forever. Digital garden pages grow over time. The initial import does not have to be perfect. It has to exist.

---

What I would do differently next time: batch the editorial pass by quality level. Some files needed heavy rewriting, some just needed frontmatter conversion. Treating them all the same wasted agent time on files that were already clean, and did not give enough attention to the files that needed real work.

See also: [a worked example](@/pages/harness-engineering/in-practice/a-worked-example.md), [the review loop](@/pages/harness-engineering/feedback/the-review-loop.md)
