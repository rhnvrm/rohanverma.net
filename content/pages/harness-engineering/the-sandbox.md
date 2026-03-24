+++
title = "The Sandbox"
weight = 3
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

[Bosun](https://github.com/oddship/bosun) wraps [Pi](@/pages/harness-engineering/pi.md) with Nix for reproducible tooling and bubblewrap for filesystem isolation. The AI writes to `workspace/` and `.pi/`. Everything else is read-only. Child processes inherit the restrictions.

This sounds like paranoia. It's not. It's the thing that lets me stop watching.

---

Without isolation, every agent session is a trust exercise. The model has access to your SSH keys, your dotfiles, your other projects. One bad `rm -rf` and you're done. One `curl | bash` from a hallucinated Stack Overflow answer and you've got a problem. I wanted to tell an agent "deploy to staging" and go think about something else. That requires knowing it *can't* break things outside its workspace.

Nix gives every session the same Go, Node, Python, Rust, ripgrep, git. No "works on my machine." Bubblewrap controls filesystem access — the agent can read `/nix` (tools) and the codebase, write to `workspace/` and `.pi/`, and that's it. Network isn't restricted. Your code reaches model APIs in every prompt. That's an inherent tradeoff of using hosted models.

---

`config.toml` is the single source of truth. Agent templates use `${models.high}` variables, a preprocessor interpolates them, and out come the final agent definitions. Change models for every agent by editing one line. Swap providers, adjust context windows, toggle [skills](@/pages/harness-engineering/skills.md). Same config, same output, every time.

The entry point is a [justfile](https://github.com/casey/just). `just start` creates a tmux session, starts [the daemon](@/pages/harness-engineering/the-daemon.md), generates configs, and launches Pi inside the sandbox. `just worker name` adds a window. `just task "prompt"` fires off a headless one-shot.

---

Real quirk: `whoami` doesn't work inside the sandbox (no `/etc/passwd`). Agents use `$USER` instead. This is the kind of thing a [skill](@/pages/harness-engineering/skills.md) documents so the agent doesn't waste time debugging it.

There's a bit of the Nix philosophy here. You do it once, the hard way, and the deterministic nature compounds over time. Infrastructure I control compounds differently than infrastructure I rent.
