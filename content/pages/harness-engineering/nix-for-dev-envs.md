+++
title = "Nix for Dev Envs"
weight = 31
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Nix is one of those tools that's easiest to appreciate when something breaks in a stupid way.

When it works, it's boring. That's the whole point.

I don't want agents improvising their development environment. I don't want one session to see Bun 1.x, another to see some random global Node install, a third to discover that Vulkan headers exist on this machine but not that one. Humans can muddle through that. Agents mostly just burn tokens on it.

A good harness should make the environment the least interesting part of the story.

---

The cleanest recent example was a GPU build failure in bosun's dev shell. I was trying to get `node-llama-cpp` compiling with Vulkan support. The build was failing in CMake's `FindVulkan` step because the shell didn't actually have the Vulkan headers and loader libraries available. This is exactly the kind of problem that turns into yak-shaving on a normal machine.

On a typical laptop setup, there are ten bad fixes available immediately: install some distro package and hope it's the right one, export `VULKAN_SDK` in your shell profile, paste a Stack Overflow incantation into `.bashrc`, get it working locally and forget what you changed, discover next week that another machine doesn't have the same setup.

I didn't want any of that.

So the fix happened where it should happen: in `flake.nix`. I added `pkgs.vulkan-headers` and `pkgs.vulkan-loader` to the dev shell, reloaded it, and verified the result by checking that the Vulkan paths now appeared in `NIX_CFLAGS_COMPILE` and `NIX_LDFLAGS`.

What I like about that incident is how unglamorous it is. The agent didn't become more intelligent. I didn't discover a profound architecture insight. I just changed the environment declaration once, and every future session inherited it.

That's the Nix payoff in one sentence: fix the world, not the session.

---

It also gave me a nice contrast with the kinds of failures I saw before the environment was pinned down properly. I have session summaries with lines like "python3 command not found in environment." I've also got eval tasks where the logic was correct and the run still failed because the container only had `python3.12` and not `python3`. Those are not interesting failures. They don't teach the model anything useful. They just waste effort on ambient machine state.

Nix doesn't eliminate every environment bug, but it turns them into explicit, code-reviewable bugs.

If a tool is missing, I want that to show up as a diff in `flake.nix`, not as tribal knowledge in my shell history. If an agent needs `rg`, `git`, `tmux`, Bun, or some library headers, I want the answer to be "it's in the dev shell" or "it isn't," not "depends which terminal you launched from."

That's especially important for agents because they don't have common sense about local machine weirdness. They treat whatever environment they get as reality. If reality drifts, their behavior drifts with it.

---

The other half of this is that Nix pairs naturally with the rest of the harness. [Bubblewrap](@/pages/harness-engineering/bubblewrap.md) constrains where the agent can go. Nix constrains what it finds there. Together they make `just start` feel less like "launch an AI into my laptop" and more like "start a repeatable process with known tools and known boundaries."

Invisible infrastructure is underrated. The best version of this page would almost be unnecessary, because a reproducible environment should disappear into the background.

But when I added two Vulkan packages to `flake.nix` and every later session got the same fixed world for free, that was the reminder. Boring is a feature. Especially when you're building for agents.
