+++
title = "Nix for Dev Envs"
weight = 29
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Every session gets the same tools. No "works on my machine."

Nix gives every agent the same Go, Node, Python, Rust, ripgrep, git. Reproducible, declarative, version-pinned. The `flake.nix` defines what's available. Nothing leaks in from the host system.

---

This matters for agents more than it matters for humans. I can troubleshoot a missing binary or a version mismatch. An agent that gets Python 3.11 one day and 3.12 the next will produce inconsistent results and waste time debugging version differences. Worse, it might not even notice — it'll just generate code that works on one version and fails silently on another.

The entry point is a justfile. `just start` sets up everything inside the Nix-provided environment. No global installs, no system dependencies leaking in. The agent starts in a world that looks the same every time.

---

Nix + [bubblewrap](@/pages/harness-engineering/bubblewrap.md) is the full [sandbox](@/pages/harness-engineering/the-sandbox.md) story. Nix says *what tools* are available. Bubblewrap says *where the agent can go*. Together: a reproducible, isolated environment. Same tools, controlled access, every time.

There's a bit of the Nix philosophy here — do it once, the hard way, and the deterministic nature compounds over time. Setting up the flake took effort. Debugging the sandbox quirks (like `whoami` not working) took effort. But that effort happened once. Every session since then inherits it.

---

Infrastructure I control and version-pin compounds differently than hosted tools that can change under me. This is the same argument as [the omakase tradeoff](@/pages/harness-engineering/the-omakase-tradeoff.md) applied to development environments. Claude Code gives you whatever tools are on the host. That's fine until it isn't — until an agent installs something globally, or a system update changes a tool version mid-project. [Config as code](@/pages/harness-engineering/config-as-code.md) plus Nix means the environment is version-controlled alongside the agent definitions. `git diff` tells you exactly what changed and when.
