+++
title = "The Review Loop"
weight = 35
template = "pages-page.html"
date = 2026-03-29
draft = false

[extra]
section_title = "The Feedback Loop"
+++

The review loop is where agent work stops being a clever demo and starts becoming publishable.

I don't mean automated evaluation during execution. That's a separate thing, and I wrote about it in [evaluator as QA](@/pages/harness-engineering/feedback/evaluator-as-qa.md). I mean the old-fashioned editorial process applied to agent output: write the thing, audit it, look at it with fresh eyes, review the content like an editor, then fix it. In this 50-hour multi-agent session, that loop was not polish. It was the quality system.

That matters because single-pass confidence is fake. Agents are incredibly good at producing work that feels done a few minutes before you notice the duplicate `h1`, the dead-end navigation, the page that technically exists but says nothing useful, or the opening paragraph that sounds like it was written by a committee of sleep-deprived interns. If you publish straight from first draft, you're not shipping quality. You're rolling dice.

---

The session made this painfully concrete.

We ran **four distinct review passes**, and each one found things the others missed.

**Pass 1: Haiku audit.** Cheap, fast, slightly suspicious. Exactly what I wanted.

That pass found a real issue with page weight ordering. It also flagged a bunch of supposedly broken links that turned out to be false positives. That's important too. Review isn't just about catching errors. It's about learning which reviewer is good at which category of error. Haiku was good at broad structural scanning and weak at understanding some site-specific link patterns. Fine. That's still useful. The mistake would be expecting that pass to be the whole review process.

**Pass 2: CDP visual review.** This one caught things no text-only pass was going to catch reliably.

It found a duplicate `h1`. It found an empty research page. It found navigation dead ends. None of these are abstract quality issues. They're the kind of embarrassments that make a site feel half-broken the moment a real person clicks around. An agent can generate perfectly plausible markdown while still producing a bad reading experience. That's why visual review matters. Pages are not just text blobs. They are interfaces.

**Pass 3 and 4: content review, twice, with Sonnet.** This is where the writing itself got judged as writing.

That review found **8 dry openings**, **3 weak pages**, redundancy across sections, and some accuracy problems. In other words: the site was no longer broken, but parts of it were still boring, repetitive, or not quite trustworthy. Those are editorial failures, not rendering failures. Different layer, different reviewer.

This is the whole point. Every pass was looking at the same output from a different angle, and every pass surfaced a different failure mode.

- Audit found structural weirdness
- Visual review found UX and presentation problems
- Content review found voice, redundancy, and accuracy issues

If I'd stopped after any one of them, I would have walked away with unjustified confidence.

---

The economics here are almost funny.

We spent roughly **$5–10 on review passes** in a session that cost about **$220 total**. That's noise-level spend. It's a rounding error. And in exchange, the review loop caught exactly the kind of issues that would make published work feel sloppy: duplicate headings, dead navigation, empty pages, weak openings, repetitive prose, factual shakiness.

This is why I don't buy the usual objection that review is expensive overhead. Compared to the cost of publishing garbage, it's cheap. Compared to the cost of reworking a public mess after people have already seen it, it's unbelievably cheap. Compared to the cost of training yourself to distrust agent output forever because you keep letting obvious mistakes through, it's basically free.

A lot of the current agent discourse still treats generated output as if the main question is whether the first draft is good enough. I think that's the wrong framing. Human work usually goes through editorial loops. Good teams don't ask a writer for one draft and hit publish. They don't ask a designer for one comp and call it final. They don't ask an engineer to merge their own PR without review. Agent work should be held to the same standard.

Not because agents are uniquely bad. Because deliverables need multiple lenses.

---

The pattern I trust now is simple:

**write → audit → visual check → content review**

In practice, those stages are doing different jobs.

- **Write** generates the artifact quickly
- **Audit** catches obvious structural problems cheaply
- **Visual check** verifies the artifact as experienced, not imagined
- **Content review** asks whether it's actually good, clear, and true

That sequence is the system. Not the model. Not the prompt. Not the vibe of the first draft.

This also clarifies the boundary with [evaluator as QA](@/pages/harness-engineering/feedback/evaluator-as-qa.md). Evaluators are for execution-time verification: does the app work, does the task pass, did the agent satisfy the contract. The review loop is for deliverables: does the page read well, does the navigation work, is the content worth publishing. Related idea, different scope.

The broader lesson matches [the economics](@/pages/harness-engineering/economics/the-economics.md) and [model tiers](@/pages/harness-engineering/agents/model-tiers.md): use cheaper models to scan, better models to judge, and don't confuse generation with validation.

I came out of this session more convinced of one thing than anything else: agent-generated work needs editorial process, not faith.

The review loop is not a cleanup step after the real work.

It is the real work of turning agent output into something I can stand behind.