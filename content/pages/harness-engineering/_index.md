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

After eight months of building with AI coding agents, the thesis has sharpened:

> Harness engineering isn't important for the *thinking* part of LLMs — it's important for the "automate the boring stuff" part. The agent types. I think. That's the split.

This is a living document about that split — what it means in practice, how to build the infrastructure around it, and where to start if you're doing it yourself.

The idea draws from [Mitchell Hashimoto's "AI Harness Engineering"](https://mitchellh.com/writing/ai-harness-engineering) and months of building [bosun](https://github.com/oddship/bosun), a multi-agent coding harness. The core insight: the value isn't in making the AI think better. It's in making it *do more boring stuff* so you can focus on the hard problems.
