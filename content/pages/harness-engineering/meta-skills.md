+++
title = "Meta-Skills"
weight = 6
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

The idea is embarrassingly simple: if I keep creating the same kind of harness components over and over, I should make the agent good at creating them.

So yes, I have a skill for creating skills. Like Factorio — the game where you build machines that build machines that build machines. The meta-skill is the assembler that produces other assemblers. ([Relevant HN thread](https://news.ycombinator.com/item?id=24181783) on the Factorio mindset in software.)

That sounds like recursion cosplay until you watch what it removes. A new skill isn't just "write some markdown." It has a format, a location, frontmatter rules, naming conventions, [progressive-disclosure](@/pages/harness-engineering/progressive-disclosure.md) constraints, examples, anti-patterns, sometimes helper scripts, sometimes reference docs. None of that is hard. It's just repetitive enough to be annoying and important enough to get wrong.

The `meta-skill-creator` skill exists so I don't spend attention on the scaffolding.

Its own instructions are very explicit. Pick a descriptive kebab-case name. Create `.pi/skills/<name>/SKILL.md`. Make the frontmatter `name` match the directory. Keep the main file tight. Move bulky details into `references/`. Include anti-patterns. Include concrete examples. In other words: it encodes the boring editorial standards that make the rest of the [skill system](@/pages/harness-engineering/skills.md) composable.

---

A concrete example helps.

Say I want browser automation inside the harness. The input is not some giant spec doc. It's closer to this:

> Create a skill for browser automation via Chrome DevTools Protocol. It should help agents navigate pages, click, fill forms, take screenshots, inspect the DOM, capture console errors, and do visual review across multiple viewport sizes.

That's the human request. The meta-skill turns that into a proper skill package.

The generated shape matters more than any one sentence inside it. It starts with frontmatter the selector can actually use — a description packed with trigger phrases like "browser", "click", "fill form", "screenshot", "console errors", "responsive", "overflow." Then it gets concrete fast. Not philosophy. Commands.

```bash
bun scripts/visual-review.ts --base http://localhost:8080 --crawl --out workspace/scratch/review
bun scripts/cdp.ts navigate "https://example.com"
bun scripts/cdp.ts screenshot workspace/scratch/page.png
```

Then prerequisites, then workflows. Not just capabilities — an order of operations. A good skill doesn't merely describe a tool. It teaches an agent how to use it.

---

The same pattern shows up in smaller skills too. I have a `background-processes` skill that exists because agents kept making one specific mistake: assuming a `workdir` parameter existed on the background process tool. The skill encodes the fix once: always `cd /full/path && command`. It even includes the wrong version first, because that's the failure mode I wanted to kill.

That's what I mean when I say the meta-skill is a multiplier. It doesn't magically invent the content. I still have to know what the skill should teach. But once I know that, I can ask for the skill in the shape the system expects, instead of hand-assembling the shape every time.

The time savings are real but modest. Maybe 15 minutes here, 20 there. The bigger effect is behavioral. When creating a skill is easy, I do it sooner. When I do it sooner, mistakes get encoded out of the system faster. That matters more than the saved minutes.

Make the thing that makes the things. That pattern keeps showing up in this harness because it keeps paying for itself. And meta-skills aren't just for skills — there are meta-skills for creating agents, extensions, commands, tools, and workflows. Each one bootstraps a different part of the harness.
