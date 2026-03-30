+++
title = "The Sandbox"
weight = 3
template = "pages-page.html"
date = 2026-03-23
draft = false

[extra]
og_image = "/images/pages/harness-engineering/the-sandbox.png"
section_title = "The Sandbox"
+++

![What happens in the sandbox stays in the sandbox](/images/pages/harness-engineering/the-sandbox.png)

[Bosun](https://github.com/oddship/bosun) is the sandboxed development environment I've built on top of [Pi](@/pages/harness-engineering/economics/pi.md). It wraps Pi with Nix for reproducible tooling and bubblewrap for filesystem isolation. The AI writes to `workspace/` and `.pi/`. Everything else is read-only. Child processes inherit the restrictions.

This sounds like paranoia. It's not. It's the thing that lets me stop watching. Once the sandbox is set up, I can give the agent autonomous permission, no approval prompts, no hovering, and go think about something else. I step in when the agent asks for input or when I want to review, not because I'm afraid of what it might do.

---

Without isolation, every agent session is a trust exercise. The model has access to your SSH keys, your dotfiles, your other projects. One bad `rm -rf` and you're done. Designing the harness yourself, or understanding how someone else's harness handles sandboxing, is not paranoia. It's risk management. I trust the sandbox because I built it and can inspect it. You should either do the same or use a harness from someone you trust.

Could you do this with Docker instead of Nix and bubblewrap? Yes. Docker might even feel more secure to you. I find Nix + bwrap faster and more composable. Nix handles the toolchain, bwrap handles the filesystem mounts, and it all runs natively without a VM or daemon. It's all Linux filesystem primitives under the hood.

---

Nix gives every session the same Go, Node, Python, Rust, ripgrep, git. No "works on my machine." [Bubblewrap](@/pages/harness-engineering/sandbox/bubblewrap.md) controls filesystem access. The agent can read `/nix` (tools) and the codebase, write to `workspace/` and `.pi/`, and that's it.

The sandboxing is layered. The main tmux session runs inside bwrap with read-write access to the workspace. Some agents get an additional restriction: a read-only bash mode via a separate bwrap profile that gives them `read` and `write` tools but no shell. This means they can only modify files through Pi's tool hooks, which enforce [reservations](@/pages/harness-engineering/agents/coordination.md) and path restrictions.

Network isn't restricted (yet). Your code reaches model APIs in every prompt. That's an inherent tradeoff of using hosted models. I've experimented with proxies and Suricata for network-level control but haven't found a workable UX. The agent needs real-time permission prompts when it makes a request, and that's a UX problem I haven't solved.

---

`config.toml` unifies everything. It generates multiple Pi configs, extension configs, tmux configs, and bash sandbox configs. The entry point is a [justfile](https://github.com/casey/just). `just start` creates a tmux session, starts [the daemon](@/pages/harness-engineering/feedback/the-daemon.md), generates configs, and launches Pi inside the sandbox. `just worker name` adds a window. `just task "prompt"` fires off a headless one-shot. More on the config pipeline in [config as code](@/pages/harness-engineering/sandbox/config-as-code.md).

The declarative setup means you can onboard others quickly, fork someone else's setup, or refer to it as documentation. Same logic as Nix itself: do it once, the hard way, and every session after that inherits the work. Owning the infrastructure means the compounding is mine, not someone else's.
