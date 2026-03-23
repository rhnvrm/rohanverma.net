+++
title = "Architecture"
weight = 3
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

[Bosun](https://github.com/oddship/bosun) runs on [Pi](https://github.com/badlogic/pi-mono), an open-source coding agent harness.[^pi] Nix for reproducible tooling. Bubblewrap for filesystem isolation. The AI writes to `workspace/` and `.pi/`. Everything else is read-only. Child processes inherit the restrictions.

[^pi]: [Pi](https://github.com/badlogic/pi-mono) is by Mario Zechner. He [wrote about why he built it](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/). Clean codebase, extension API, agents defined as markdown. Pi's system prompt includes paths to its own documentation, so agents can read the harness source to understand how things work. A harness the agent can inspect is qualitatively different from a black box that happens to work.

`config.toml` is the single source of truth. Agent templates use `${models.high}` variables, a preprocessor interpolates them, and out come the final agent definitions. Change models for every agent by editing one line.[^justfile]

[^justfile]: The entry point is a [justfile](https://github.com/casey/just). `just start` creates a tmux session, starts the daemon, generates configs, and launches Pi inside the sandbox. `just worker name` adds a window. `just task "prompt"` fires off a headless one-shot.

---

## Skills

Skills are markdown documentation that an LLM interprets with judgment. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's not config. That's an agent reading documentation the way a new team member would.

38 skills, 6,800 lines.[^skillbreakdown] At that volume, you can't load everything into one context. Progressive disclosure isn't a nicety — it's a context window constraint.

[^skillbreakdown]: 5 meta-skills (creating skills, agents, extensions, commands, tools), 21 general-purpose, 12 project-specific. 12 skills showing multiple commits of active refinement.

The "Day-50 problem" is real: agents work fine on greenfield code but break down on mature projects. Skills help, but they don't solve understanding undocumented legacy code or making breaking changes safely. Those still need human judgment. But "the agent loads the right conventions and doesn't rediscover them every session" is a real improvement.

Meta-skills are the multiplier. A skill for creating skills, an agent template for creating agents. Maybe 15 minutes saved per skill, across 38 skills, plus every future one.

---

## Coordination

The setup uses tmux. Multiple agents in separate windows. Without a coordination layer, they'd talk through `tmux_capture` and `tmux_send` — polling the terminal, parsing output, sleeping, trying again. For Pi-to-Pi communication, polling the terminal is the wrong abstraction. You want async messaging.

So I built [pi-mesh](https://github.com/rhnvrm/pi-mesh). Just the coordination layer. No daemon, no server, no central orchestrator. Files on disk.[^meshbuild] Two Pi sessions in the same project directory find each other automatically.

[^meshbuild]: I estimated 1,400 lines. It ended up at 2,750 lines of source and 240 lines of tests. The overlay UI and tab-completion were most of the overrun. A previous session crashed at message 898 when a lite agent's mesh message overflowed the TUI by two characters. The daemon auto-summarized the crashed session afterwards — a nice end-to-end validation of the whole setup.

Five tools: `mesh_peers`, `mesh_reserve`, `mesh_release`, `mesh_send`, `mesh_manage`. Reservations hook Pi's `edit` and `write` tools. Another agent trying to edit a reserved file gets blocked with a message telling them who has it and why.[^bashbypass]

[^bashbypass]: An agent can `sed -i` a reserved file through the shell and the hook won't catch it. The reservation system prevents the common case, not every possible case. In practice, Pi's tool control mitigates this: some agents only get `read` and `write`, no `bash` at all.

---

## Why not Claude Code?

You'd get most of this value with Claude Code and a good AGENTS.md. For most people, that's enough.

What you give up is control, extensibility, and inspectability. Claude Code is omakase[^omakase], and omakase is great when you trust the chef. But the rough edges add up: hook return codes with undocumented behavior, planning behavior that changes between updates without notice, tools you can't disable or replace.

[^omakase]: "Omakase" as software philosophy comes from DHH and the [Rails Doctrine](https://rubyonrails.org/doctrine). Claude Code is omakase in the same sense: great defaults, you accept the chef's choices. The real difference is extensibility. Pi-mesh started as an extension I wrote in one session. If I needed different coordination semantics tomorrow, I'd modify it. With Claude Code, I'd file a feature request.

The tradeoff is real: I'm maintaining more infrastructure. There's a bit of the Nix philosophy here. You do it once, the hard way, and the deterministic nature compounds over time. Infrastructure I control compounds differently than infrastructure I rent.
