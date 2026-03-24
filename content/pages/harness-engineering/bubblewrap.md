+++
title = "Bubblewrap"
weight = 21
template = "pages-page.html"
date = 2026-03-23
draft = true

[extra]
section_title = "Harness Engineering"
+++

Without isolation, every agent session is a trust exercise. The model has access to your SSH keys, your dotfiles, your other projects. One bad `rm -rf` and you're done. I wanted to tell an agent "deploy to staging" and go think about something else. That requires knowing it *can't* break things outside its workspace.

Bubblewrap (`bwrap`) is the tool that provides this. It controls filesystem access at the process level: the agent reads `/nix` (tools) and the codebase, writes to `workspace/` and `.pi/`, and that's it. Child processes inherit the restrictions.

---

There are two layers of isolation. Process-level: bubblewrap bind mounts and environment variables control what the filesystem looks like from inside the sandbox. Tool-level: deny lists block access to `.ssh`, `.aws`, `.gnupg`, `.env`, `.pem`, `.key` files even if the agent tries to read them through [Pi](@/pages/harness-engineering/pi.md)'s tools. Belt and suspenders.

The deny and allow lists live in [config.toml](@/pages/harness-engineering/config-as-code.md): `deny_read`, `allow_write`, `deny_write`. Declarative, version-controlled, auditable.

---

Network isn't restricted. Your code reaches model APIs in every prompt — that's an inherent tradeoff of using hosted models. I've looked at network monitoring (Suricata IDS) to at least *observe* what's going out, but restricting network access would break the basic workflow.

I'm working on nested bubblewrap for a read-only bash tool. The idea: an agent with `bash` gets a more restricted filesystem view than one with only `read` and `write`. Layers on layers.

---

Real quirk: `whoami` doesn't work inside the sandbox. No `/etc/passwd`. Agents use `$USER` instead. This is the kind of thing a [skill](@/pages/harness-engineering/skills.md) documents so the agent doesn't waste time debugging it. Small friction, easy to encode, never hits again. [The boring stuff](@/pages/harness-engineering/the-boring-stuff.md) pattern at its most literal.

Bubblewrap is one half of [the sandbox](@/pages/harness-engineering/the-sandbox.md). Nix is the other. Bubblewrap says *where* the agent can go. Nix says *what tools* it finds when it gets there.
