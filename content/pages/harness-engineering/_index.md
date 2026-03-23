+++
title = "Harness Engineering"
description = "On building the infrastructure around AI coding agents — the boring stuff that makes the interesting stuff possible."
sort_by = "weight"
template = "pages-section.html"
page_template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

Most writing about AI coding comes from two ends: people excited about generating code, or experienced engineers explaining why it doesn't replace thinking. The middle is underrepresented. People with enough experience to build real infrastructure but who haven't stopped experimenting. That's where I am, and I think the perspective is useful.

---

After eight months of iterating on AI coding setups, the thesis has sharpened:

> Harness engineering isn't important for the *thinking* part of LLMs — it's important for the "automate the boring stuff" part. The agent types. I think. That's the split.

I've been building a sandboxed development environment called [bosun](https://github.com/oddship/bosun), running on [Pi](https://github.com/badlogic/pi-mono). A daemon for background automation. A task agent. Multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh). 38 skills across about 4,000 sessions since August 2025.

The value isn't in any single session. It's in the loop. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn. That's the bet, anyway.

---

[The Boring Stuff](@/pages/harness-engineering/the-boring-stuff.md) — the split between what the agent does and what I do.

[The Loop](@/pages/harness-engineering/the-loop.md) — why session history is the multiplier.

[Architecture](@/pages/harness-engineering/architecture.md) — how the pieces fit together.

[Where to Start](@/pages/harness-engineering/where-to-start.md) — you don't need all of this.
