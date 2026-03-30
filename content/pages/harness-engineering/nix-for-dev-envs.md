+++
title = "Nix for Dev Envs"
weight = 31
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Why not Docker? Docker works. I use it for eval tasks and CI. But for the development environment that agents live in every day, I find Nix + [bubblewrap](@/pages/harness-engineering/bubblewrap.md) faster and more composable. Docker means a VM or daemon, image layers, container startup time. Nix gives you a shell with exactly the tools you declared, and bwrap wraps it in filesystem isolation. No daemon, native speed.

Yes, Nix is notorious for being hard to debug by hand. The error messages are cryptic. The language is odd. I'm not going to pretend otherwise. But once the `flake.nix` works, it disappears. And that's the whole point.

---

I don't want agents improvising their development environment. I don't want one session to see Bun 1.x, another to see some random global Node install, a third to discover that Vulkan headers exist on this machine but not that one. Humans can muddle through that. Agents just burn tokens on it.

The cleanest example was a GPU build failure. I was trying to get `node-llama-cpp` compiling with Vulkan support. The build failed in CMake's `FindVulkan` step — no headers, no loader libraries. On a normal machine there are ten bad fixes: install a distro package and hope, export `VULKAN_SDK` in your shell profile, paste a Stack Overflow incantation, get it working locally and forget what you changed.

The fix happened where it should: in `flake.nix`. Added `pkgs.vulkan-headers` and `pkgs.vulkan-loader`, reloaded the shell, verified the Vulkan paths appeared in `NIX_CFLAGS_COMPILE`. Done. Every future session inherited it.

Fix the world, not the session.

---

I have session summaries with lines like "python3 command not found in environment." Eval tasks where the logic was correct and the run failed because the container only had `python3.12` and not `python3`. Those are not interesting failures. They don't teach the model anything. They waste effort on ambient machine state.

Nix doesn't eliminate every environment bug, but it turns them into explicit, code-reviewable bugs. If a tool is missing, that shows up as a diff in `flake.nix`, not as tribal knowledge in your shell history. Agents don't have common sense about local machine weirdness. They treat whatever environment they get as reality. If reality drifts, their behavior drifts with it.

---

Nix pairs naturally with the rest of the harness. Bubblewrap constrains where the agent can go. Nix constrains what it finds there. Together they make `just start` feel less like "launch an AI into my laptop" and more like "start a repeatable process with known tools and known boundaries."

My [nix-system repo](https://github.com/rhnvrm/nix-system) manages the whole machine config the same way — NixOS for the base, home-manager for dotfiles, flakes for per-project dev shells. The agent development environment is just one more flake in a fully declarative stack. Boring is a feature.
