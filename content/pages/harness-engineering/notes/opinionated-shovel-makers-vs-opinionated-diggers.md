+++
title = "Opinionated Shovel Makers vs. Opinionated Diggers"
weight = 2
template = "pages-page.html"
date = 2026-04-14
draft = false

[extra]
section_title = "Notes"
+++

Lukas Kawerau’s post, ["Opinionated shovel makers vs. opinionated diggers"](https://www.lukaskawerau.com/posts/opinionated-shovel-makers-vs-opinionated-diggers), gave language to something I’ve been feeling for a while.

AI tooling creates a strong pull toward shovel-making: orchestrators, frameworks, meta-tools, abstractions over abstractions. Some of that is genuinely useful. I use those tools every day.

But most days I care more about the dig site than the shovel. I care about the product, the domain, and whether the software is actually useful to someone.

---

### My read

I’m mostly an opinionated digger.

I did not build bosun and the surrounding harness because I wanted to spend my life tuning orchestrators. I built it because my actual work kept breaking in predictable ways: context would evaporate between sessions, quality would drift, and I would keep re-explaining the same constraints.

So I treat shovel-making as infrastructure work in service of product work. Not the destination.

---

### The two failure modes

There are two easy ways to get this wrong:

- never build tools, then pay the same friction tax forever;
- only build tools, and quietly stop shipping domain outcomes.

The middle path is usually better: build the minimum shovel that removes recurring pain, then go back to digging.

That is basically [Start Manual, Automate Later](@/pages/harness-engineering/thesis/start-manual-automate-later.md) stated in different words.

---

### The filter I use

Before I build new harness infrastructure, I ask three questions:

1. Is this pain recurring?
2. If fixed, will it compound across sessions/agents?
3. Can I timebox the implementation?

If the answer is yes to all three, I build the shovel.
If not, I keep digging.

This one filter prevents a lot of tool-builder rabbit holes.

---

### Where this lands

I agree with Lukas on the core point: AI increases leverage for builders who already know what they want to build.

For me the practical stance is:

- stay anchored to product/domain outcomes,
- invest in harness pieces only when they clearly compound,
- avoid identity lock-in around either camp.

So the short version is: **build shovels in service of digging, not instead of it.**

See also:
- [The Boring Stuff](@/pages/harness-engineering/thesis/the-boring-stuff.md)
- [Start Manual, Automate Later](@/pages/harness-engineering/thesis/start-manual-automate-later.md)
- [Where to Start](@/pages/harness-engineering/economics/where-to-start.md)
- [The XKCD Math](@/pages/harness-engineering/economics/the-xkcd-math.md)
