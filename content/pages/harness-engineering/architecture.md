+++
title = "Architecture"
weight = 3
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

A coding agent harness has a few key pieces. None of them are complicated individually — the value is in how they compose. Bosun runs on [Pi](https://github.com/badlogic/pi-mono), an open-source coding agent harness. Along the way I built a daemon for background automation, a task management agent, multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh), and accumulated 38 skills across about 800 sessions.

## The sandbox

Bosun wraps Pi[^pi] with Nix for reproducible tooling and bubblewrap for filesystem isolation.

[^pi]: [Pi](https://github.com/badlogic/pi-mono) is an open-source coding agent harness by Mario Zechner. He wrote about [why he built it](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/). Clean codebase, extension API, agents defined as markdown files with system prompts and model assignments. Extensions get lifecycle hooks and can register custom tools the LLM sees alongside built-in ones. Pi also has a subagent system: sequential chains, parallel fan-out, single-shot calls. One thing that stands out: the core agent runs in the browser too. Pi's system prompt includes paths to its own documentation,[^piselfaware] so agents can read the harness source to understand how things work.

[^piselfaware]: The system prompt template in `system-prompt.js` injects the README path, docs directory, and examples directory. The agent can `read` these files to understand how Pi works. A well-structured harness that an agent can inspect is qualitatively different from a black box that happens to work.

```
bosun/
├── config.toml              # Models, env vars, daemon config
├── flake.nix                # Nix packages + bubblewrap sandbox
├── .pi/
│   ├── agents-templates/    # Agent definitions (tracked in git)
│   ├── skills/              # 38 shared knowledge modules
│   └── extensions/          # Custom Pi extensions
├── workspace/
│   ├── users/{you}/         # Plans, sessions, handoffs, tasks
│   └── code/                # Project worktrees
└── scripts/daemon/          # Background automation
```

The AI writes to `workspace/`, `.pi/`, and `.bosun-home/`. Everything else is read-only. Child processes inherit the restrictions. Nix gives everyone the same Go, Node, Python, Rust, ripgrep, git, docker. Bubblewrap controls filesystem access but not network. Your code reaches model APIs in every prompt. That's an inherent tradeoff of using hosted models.

`config.toml` is the single source of truth. A preprocessor (`bosun-init.ts`) takes agent templates with `${models.high}` variables, interpolates them against config.toml, and writes the final agent definitions, prompt files, settings, and mesh config. Change models for every agent by editing one line. Swap providers, adjust context windows, toggle skills. Same config, same output, every time.[^justfile]

[^justfile]: The entry point is a [justfile](https://github.com/casey/just). `just start` creates a tmux session, starts the daemon, generates configs, and launches Pi inside the sandbox. `just run` spins up additional sessions (auto-numbered). `just worker name` adds a window. `just task "prompt"` fires off a headless one-shot. `just bash` drops into the sandbox shell for debugging.

## Skills

Skills are documentation. We've had READMEs and runbooks forever. The difference is that an LLM doesn't just load a skill, it interprets it with judgment. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's not config. That's an agent reading documentation the way a new team member would.

There are 38 skills in `.pi/skills/`.[^skillbreakdown] Pi loads them based on trigger keywords when a task matches. They're markdown files, not tied to any specific harness. At 38 skills and 6,800 lines, you can't load everything into one context. Progressive disclosure isn't a nicety, it's a context window constraint. A skill that dumps everything upfront wastes tokens. One that reveals details based on what the agent is actually doing stays useful longer.[^skillloading]

[^skillbreakdown]: 5 meta-skills (creating skills, creating agents, creating extensions, creating commands, creating tools), 21 general-purpose (git, github, glab, context management, session analysis, mesh coordination, browser automation, background processes, tmux orchestration, and others), 12 project-specific (kept high-level here since they encode proprietary conventions). Roughly 6,800 lines of documentation total, with 12 skills showing multiple commits of active refinement.

[^skillloading]: Progressive disclosure combined with agent-based skill loading, matched with an orchestrator spawning specialist agents, works better than trying to front-load everything. And based on how RL in these LLMs keeps improving, skill loading will only get better over time.

Skills are portable and maintainable. When Pi updates, I ask the agent to read the changelog, diff it against existing skills, and suggest updates. That's cheaper than monitoring unversioned docs from a closed-source tool.

The "Day-50 problem" is real: agents work fine on greenfield code but break down on mature projects. Skills help, but they don't solve understanding undocumented legacy code or making breaking changes safely. Those still need human judgment. But "the agent loads the right conventions and doesn't rediscover them every session" is a real improvement.

Meta-skills are the multiplier. A skill for creating skills, an agent template for creating agents. "Create a skill for debugging feed latency" and the meta-skill handles format, conventions, file placement, registration. Maybe 15 minutes saved per skill, across 38 skills, plus every future one.

## Multi-agent coordination

The setup uses tmux. Bosun (the main agent) handles planning and coding. Q manages tasks. Lite does quick stuff: summaries, small edits, context gathering. Verify checks implementations. Scout explores codebases. I wrote about a simpler version of this pattern in a [previous post](/blog/2025/11/19/orchestrating-local-llm-swarm-tmux-claude/).

Without a coordination layer, agents in separate tmux sessions talk through `tmux_capture` and `tmux_send`. That means polling: capture the other window, parse the output, figure out if they're done, sleep, try again. For Pi-to-Pi communication, polling the terminal is the wrong abstraction. You want async messaging: send a message, keep working, get notified when there's a reply.

I had my agent search Pi's extension directory for prior art and found [pi-messenger](https://github.com/nicobailon/pi-messenger) by Nico Bailon. He had already solved the hard problems: file-based messaging, presence detection, the overlay UI with tabs for agents, feed, and chat. Much of pi-mesh's UX comes directly from his work.[^pimessenger]

[^pimessenger]: Pi-messenger bundled coordination with a "crew" system for spawning agent teams. Every tool description included crew actions with no way to turn them off. The LLM saw crew management context on every turn, even when you just wanted to send a message. I didn't need crew management since tmux already handles agent lifecycle. Pi-mesh is pi-messenger's core ideas reduced to the bare minimum: knowing who's working where, claiming files before editing, messaging between sessions.

So I put together [pi-mesh](https://github.com/rhnvrm/pi-mesh). Just the coordination layer. No daemon, no server, no central orchestrator. Files on disk.[^meshbuild]

[^meshbuild]: I estimated about 1,400 lines. It ended up at 2,750 lines of source and 240 lines of tests (36 passing), roughly 840 messages. The overlay UI and tab-completion were most of the overrun. The previous session actually crashed at message 898 when a lite agent sent a long mesh message that overflowed the TUI by two characters: `line.length` (character count) instead of actual display width. The daemon auto-summarized the crashed session afterwards, which was a nice end-to-end validation of the whole setup.

It's transport-agnostic. Two Pi sessions in the same project directory find each other automatically. Everything lives in `.pi/mesh/`: a registry directory (one JSON file per agent), inbox directories (messages as JSON files), and an append-only feed.jsonl.

Five tools: `mesh_peers` (who's active, what model), `mesh_reserve` and `mesh_release` (claim files before editing), `mesh_send` (message another agent), and `mesh_manage` (rename, set status, view feed).

Reservations hook Pi's `edit` and `write` tools. Another agent trying to edit a reserved file gets blocked with a message telling them who has it and why. `bash` commands bypass this.[^bashbypass] The overlay (`/mesh`) has tabs for agents, feed, and chat. The chat is useful for me as the human operator too. I can broadcast instructions without switching tmux windows.

[^bashbypass]: An agent can `sed -i` a reserved file through the shell and the hook won't catch it. Blocking bash would mean parsing shell commands, which is a rabbit hole. The reservation system prevents the common case (agent uses `edit` or `write`), not every possible case. In practice, Pi's tool control mitigates this: I can specify which tools each agent gets. Some agents only get `read` and `write`, no `bash` at all.

## Why not Claude Code?

You'd get most of this value with Claude Code and a good AGENTS.md. Claude Code is good. It recently added [agent teams](https://code.claude.com/docs/en/agent-teams) with tmux-based coordination and inter-agent messaging. For most people, that's enough.

What you give up is control, extensibility, and inspectability. Claude Code is omakase[^omakase], and omakase is great when you trust the chef. But the rough edges add up: hook return codes with undocumented behavior, permission controls that require digging through docs, planning behavior that changes between updates without notice, tools like TodoWrite that you can't disable or replace. You end up playing catchup monitoring their docs instead of inspecting the code or changelog directly.[^claudecode]

[^omakase]: "Omakase" as a software philosophy comes from DHH and the [Rails Doctrine](https://rubyonrails.org/doctrine): "how do you know what to order when you don't know what's good? Let the chef choose." He applied the same idea to desktop setup with [Omakub](https://omakub.org/). DHH has been [writing about AI agents](https://world.hey.com/dhh/promoting-ai-agents-3ee04945) recently. Claude Code is omakase in the same sense: great defaults, you accept the chef's choices.

[^claudecode]: Claude Code agent teams also use tmux as the backend, so the visibility argument applies to both. The real difference is extensibility. Claude Code's team coordination is part of the product: take it or leave it. In bosun, orchestration (tmux), coordination (pi-mesh), and the agent runtime (Pi) are separate layers. Pi-mesh started as an extension I wrote in one session. If I needed different coordination semantics tomorrow, I'd modify it. With Claude Code, I'd file a feature request.

I also moved here from [OpenCode](https://opencode.ai), which had a proper plugin system but ate memory and crashed under multi-process load.[^opencode] Pi is one process, well-written, performant. When you're running agents in parallel, every megabyte the harness takes is a megabyte less for actual work. You want to build on strong foundations.

[^opencode]: OpenCode runs a server, a TUI client, and plugins in separate Bun processes. The server-client split seemed useful for spinning up cheap agents, but the server crashed and clients didn't always reconnect. The automation I wanted (sessions get summarized, summaries feed context) was easier to build outside the agent runtime than inside it. Pi is one process with deterministic config generation, and the feedback loop is a separate daemon that watches files.

The tradeoff is real: I'm maintaining more infrastructure. There's a bit of the Nix philosophy here. You do it once, the hard way, and the deterministic nature compounds over time. Infrastructure I control compounds differently than infrastructure I rent.
