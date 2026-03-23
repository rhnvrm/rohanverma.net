+++
title = "Harness engineering in practice"
date = "2026-02-06T15:00:00+05:30"
draft = true
path = "blog/2026/02/06/harness-engineering-in-practice/"

[taxonomies]
  tags = ["ai", "developer-tools", "agents", "pi", "open-source"]
  categories = ["engineering"]

[extra]
  author = "rhnvrm"
+++

Code is cheap. K [wrote about this](https://nadh.in/blog/code-is-cheap/) recently. Mitchell Hashimoto, in his [AI adoption journey](https://mitchellh.com/writing/my-ai-adoption-journey), describes what he calls "harness engineering": setting up your AI coding environment so the agent never makes the same mistake twice. AGENTS.md files, custom tools, verification scripts. He's at the stage of running a single agent and trying to always have one going.

I've been further down this road for a while. I've been iterating on AI coding setups since August 2025, burning tokens enthusiastically.[^costs] Most writing about AI coding comes from two ends: people excited about generating code, or experienced engineers explaining why it doesn't replace thinking. The middle is underrepresented. People with enough experience to build real infrastructure but who haven't stopped experimenting. That's where I am, and I think the perspective is useful.

[^costs]: The economics of AI coding are in flux. Open-source models are getting cheaper fast, and even the frontier providers keep dropping prices. The best way to manage costs right now is subscriptions (OpenAI has embraced third-party agent use; Anthropic is more restrictive). I don't track per-session costs closely. The daemon uses Haiku (cheap), main sessions use Opus or Sonnet (not cheap), and the total is a real number I've chosen to treat as tuition rather than overhead. The economics will catch up. The harder questions will be about what to do with these tools, not whether you can afford them.

The core insight after six months: the value isn't in any single agent session. It's in the loop. Sessions produce artifacts, artifacts become searchable knowledge, knowledge feeds future sessions. Every skill you encode, every workflow you automate compounds across every future session and every agent you spawn.[^xkcd] That's the bet, anyway.

[^xkcd]: [![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/) Quinn Slack [recently pointed out](https://x.com/sqs/status/2018640734732382558/photo/1) the same idea applied to AI coding: the time you invest in your harness pays off across every future session.

I've been building a sandboxed AI development environment called Zero. It runs on [Pi](https://github.com/badlogic/pi-mono), an open-source coding agent harness. Along the way I built a daemon for background automation, a task management agent, multi-agent coordination through [pi-mesh](https://github.com/rhnvrm/pi-mesh), and accumulated 38 skills across about 800 sessions. I also run agents 24/7 for casual stuff via [OpenClaw](https://openclaw.ai/) in a private Discord, but for serious engineering work on production systems, I wanted something sandboxed, reproducible, and context-preserving.

This post walks through the current state of my harness: what I built, why, and the tradeoffs. If you want to skip to what you can try today, jump to [where to start](#complexity-and-where-to-start).

## How I actually use this

A few examples from the past couple of weeks.

**Incident investigation.** During a service outage, I had the main agent doing HTTP client auditing and timeout analysis. I spawned a separate agent to verify framework-specific context behavior in isolation, and another to cross-check the incident brief against code and deployment files. The verification agent caught a version discrepancy: the brief claimed one version was deployed, but the actual deployment config had a different one. Sequential single-agent work would have missed that because the main agent was deep in a different line of investigation.

**Next-day pickup.** Working on a feature, I ran `/handoff` before stopping for the night. The daemon auto-filled the handoff: what I was working on, which files were uncommitted, which bugs were identified (three specific ones with file paths), what was left to do. Next morning, `/pickup` loaded all of it. No re-reading conversation history. The agent started on the first remaining bug immediately.

**Fact-checking a draft.** I spawned two agents against git history and the codebase to verify claims in a document. They found wrong dates, inflated numbers, and a timeline that didn't match the commit log. Reported back through inter-agent messaging while I kept working on something else.

**Frontend + backend in parallel.** When a feature spans backend (Go) and frontend (JS), I run two agents in separate worktrees. They coordinate through messages when interface changes in the backend affect what the frontend expects. "API response shape changed, here's the new type" as a message beats holding both contexts in one session.

**Skill preventing repeated mistakes.** Early on, repos kept getting cloned to wrong paths. After the third time, I updated the git skill with a `references/REPO-LAYOUT.md` documenting the convention: `workspace/code/{git-server}/{org}/{repo}`. The skill now loads automatically for any git operation. That class of mistake stopped happening.

Each of these runs on four pieces: a sandbox, skills, a background daemon, and agent coordination. Here's how they work.

## The sandbox

Zero wraps Pi[^pi] with Nix for reproducible tooling and bubblewrap for filesystem isolation.

[^pi]: [Pi](https://github.com/badlogic/pi-mono) is an open-source coding agent harness by Mario Zechner. He wrote about [why he built it](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/). Clean codebase, extension API, agents defined as markdown files with system prompts and model assignments. Extensions get lifecycle hooks and can register custom tools the LLM sees alongside built-in ones. Pi also has a subagent system: sequential chains, parallel fan-out, single-shot calls. One thing that stands out: the core agent runs in the browser too. Pi's system prompt includes paths to its own documentation,[^piselfaware] so agents can read the harness source to understand how things work.

[^piselfaware]: The system prompt template in `system-prompt.js` injects the README path, docs directory, and examples directory. The agent can `read` these files to understand how Pi works. A well-structured harness that an agent can inspect is qualitatively different from a black box that happens to work.

```
zero/
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

The AI writes to `workspace/`, `.pi/`, and `.zero-home/`. Everything else is read-only. Child processes inherit the restrictions. Nix gives everyone the same Go, Node, Python, Rust, ripgrep, git, docker. Bubblewrap controls filesystem access but not network. Your code reaches model APIs in every prompt. That's an inherent tradeoff of using hosted models.

`config.toml` is the single source of truth. A preprocessor (`zero-init.ts`) takes agent templates with `${models.high}` variables, interpolates them against config.toml, and writes the final agent definitions, prompt files, settings, and mesh config. Change models for every agent by editing one line. Swap providers, adjust context windows, toggle skills. Same config, same output, every time.[^justfile]

[^justfile]: The entry point is a [justfile](https://github.com/casey/just). `just start` creates a tmux session, starts the daemon, generates configs, and launches Pi inside the sandbox. `just run` spins up additional sessions (auto-numbered: zero, zero-2, zero-3). `just worker name` adds a window. `just task "prompt"` fires off a headless one-shot. `just bash` drops into the sandbox shell for debugging.

## Skills

Skills are documentation. We've had READMEs and runbooks forever. The difference is that an LLM doesn't just load a skill, it interprets it with judgment. When the git skill says "repos go in `workspace/code/{server}/{org}/{repo}`", the agent understands the convention and applies it to repos it's never seen. That's not config. That's an agent reading documentation the way a new team member would.

There are 38 skills in `.pi/skills/`.[^skillbreakdown] Pi loads them based on trigger keywords when a task matches. They're markdown files, not tied to any specific harness. At 38 skills and 6,800 lines, you can't load everything into one context. Progressive disclosure isn't a nicety, it's a context window constraint. A skill that dumps everything upfront wastes tokens. One that reveals details based on what the agent is actually doing stays useful longer.[^skillloading]

[^skillbreakdown]: 5 meta-skills (creating skills, creating agents, creating extensions, creating commands, creating tools), 21 general-purpose (git, github, glab, context management, session analysis, mesh coordination, browser automation, background processes, tmux orchestration, and others), 12 project-specific (kept high-level here since they encode proprietary conventions). Roughly 6,800 lines of documentation total, with 12 skills showing multiple commits of active refinement.

[^skillloading]: Progressive disclosure combined with agent-based skill loading, matched with an orchestrator spawning specialist agents, works better than trying to front-load everything. And based on how RL in these LLMs keeps improving, skill loading will only get better over time.

Skills are portable and maintainable. When Pi updates, I ask the agent to read the changelog, diff it against existing skills, and suggest updates. That's cheaper than monitoring unversioned docs from a closed-source tool.

The "Day-50 problem" is real: agents work fine on greenfield code but break down on mature projects. Skills help, but they don't solve understanding undocumented legacy code or making breaking changes safely. Those still need human judgment. But "the agent loads the right conventions and doesn't rediscover them every session" is a real improvement.

Meta-skills are the multiplier. A skill for creating skills, an agent template for creating agents. "Create a skill for debugging feed latency" and the meta-skill handles format, conventions, file placement, registration. Maybe 15 minutes saved per skill, across 38 skills, plus every future one.

## The feedback loop

Coding sessions produce artifacts. The daemon turns them into searchable knowledge. Q uses that knowledge to track what's in flight. The key difference from traditional note-taking or knowledge management: the LLM writes the notes, not me. I don't decide what's worth capturing after each session. The daemon summarizes automatically, and the summaries are good enough that future agents can act on them.

This didn't start with the daemon. Back in August with claude-manager, I was manually running a slash command at the end of each session to write learnings to a file. Then I automated it with Claude hooks and `claude -p` using Haiku. Then an OpenCode plugin to trigger on session idle. Now with Pi, file watchers on the raw session JSONL trigger summarization automatically. Each step was just automating what I was already doing by hand. Start manual, observe what's valuable, automate the valuable parts.

The daemon runs in its own tmux session, watching for file changes:

- **Session summarization.** When a session goes idle, the daemon spawns a Haiku agent to generate a structured summary. YAML frontmatter with tags, files touched, duration. Narrative with "what worked", "what didn't", "key insights." These accumulate in `workspace/users/{you}/sessions/`.
- **Handoff filling.** `/handoff` checkpoints your work. The daemon detects the new file and fills in context: what you were working on, where you left off, what's next. `/pickup` loads it when you're back.
- **Chronicles.** Session summaries feed into longer [builder's log](https://oddship.net/chronicles/) narratives, grouped by journey.[^heartbeat]

[^heartbeat]: The daemon doesn't use cron. Cron schedules break when the laptop sleeps. Instead, a heartbeat-based rules engine polls on an interval, evaluating TypeScript predicates against current state. File watchers set trigger flags, rules check flags on each heartbeat. Watches are declarative in config.toml. The daemon talks to the active agent through filesystem IPC: JSON command files watched with chokidar.[^daemonipc] Getting it reliable took some debugging.[^daemontimeout]

[^daemonipc]: Spawning Pi from daemon scripts requires `stdio: ["ignore", "pipe", "pipe"]` with the `--print` flag. If stdin isn't set to "ignore", Pi hangs forever waiting for input. `--print` runs non-interactively: no TUI, no extension lifecycle, just prompt in, response out.

[^daemontimeout]: Early on, the daemon kept timing out summarizing sessions. I assumed the summarizer was slow. The actual problem: I was loading the full agent system prompt plus the entire session JSONL into the LLM context. Switching to a lite agent (smaller prompt, less overhead) fixed it immediately. I still added dynamic timeouts (60s base + 15s per 100 messages) because an 1,800-message session genuinely takes a while, but the initial timeouts were self-inflicted.

Agents are good at executive function. Tracking what's in flight, updating status, flagging blockers, keeping priorities straight. Humans have a limited decision quota each day. Q is a persistent agent that handles this: tasks, projects, roadmaps, running in its own tmux session with CLI tools (`qt`, `qp`, `qr`). Everything is markdown with YAML frontmatter.[^qtask]

[^qtask]: During one session, Q autonomously synced 15 session summaries into task updates while I was focused on writing. That's the daemon-Q pipeline: sessions generate JSONL, daemon summarizes, Q reads summaries and updates tasks.

Q sits between the daemon and the coding agents. The daemon produces session summaries. Q reads them and updates task status, notes progress, flags blockers. When I start a new session, Q has an up-to-date picture because it's been processing summaries in the background. The `qmd` tool searches across everything: tasks, sessions, handoffs, chronicles.[^qmd]

[^qmd]: `qmd` is a CLI that searches all markdown in the workspace. Keyword search (fast, grep-based), semantic search (embedding-based), and hybrid with LLM reranking. When an agent needs "have we worked on X before?", `qmd search "exchange broadcast parsing"` finds it regardless of which session it happened in.

The loop: sessions produce JSONL, daemon summarizes them, Q updates tasks, `qmd` makes it all searchable, future sessions draw on that knowledge. No magic flywheel. Each piece makes the next session a bit better than the last.

## Why not Claude Code?

You'd get most of this value with Claude Code and a good AGENTS.md. Claude Code is good. It recently added [agent teams](https://code.claude.com/docs/en/agent-teams) with tmux-based coordination and inter-agent messaging. For most people, that's enough.

What you give up is control, extensibility, and inspectability. Claude Code is omakase[^omakase], and omakase is great when you trust the chef. But the rough edges add up: hook return codes with undocumented behavior, permission controls that require digging through docs, planning behavior that changes between updates without notice, tools like TodoWrite that you can't disable or replace. You end up playing catchup monitoring their docs instead of inspecting the code or changelog directly.[^claudecode]

[^omakase]: "Omakase" as a software philosophy comes from DHH and the [Rails Doctrine](https://rubyonrails.org/doctrine): "how do you know what to order when you don't know what's good? Let the chef choose." He applied the same idea to desktop setup with [Omakub](https://omakub.org/). DHH has been [writing about AI agents](https://world.hey.com/dhh/promoting-ai-agents-3ee04945) recently. Claude Code is omakase in the same sense: great defaults, you accept the chef's choices.

[^claudecode]: Claude Code agent teams also use tmux as the backend, so the visibility argument applies to both. The real difference is extensibility. Claude Code's team coordination is part of the product: take it or leave it. In my setup, orchestration (tmux), coordination (pi-mesh), and the agent runtime (Pi) are separate layers. Pi-mesh started as an extension I wrote in one session. If I needed different coordination semantics tomorrow, I'd modify it. With Claude Code, I'd file a feature request.

I also moved here from [OpenCode](https://opencode.ai), which had a proper plugin system but ate memory and crashed under multi-process load.[^opencode] Pi is one process, well-written, performant. When you're running agents in parallel, every megabyte the harness takes is a megabyte less for actual work. You want to build on strong foundations.

[^opencode]: OpenCode runs a server, a TUI client, and plugins in separate Bun processes. The server-client split seemed useful for spinning up cheap agents, but the server crashed and clients didn't always reconnect. The automation I wanted (sessions get summarized, summaries feed context) was easier to build outside the agent runtime than inside it. Pi is one process with deterministic config generation, and the feedback loop is a separate daemon that watches files.

The tradeoff is real: I'm maintaining more infrastructure. There's a bit of the Nix philosophy here. You do it once, the hard way, and the deterministic nature compounds over time. Infrastructure I control compounds differently than infrastructure I rent.

## Multi-agent coordination

The setup uses tmux. Zero (the main agent) handles planning and coding. Q manages tasks. Lite does quick stuff: summaries, small edits, context gathering. Verify checks implementations. Scout explores codebases. I wrote about a simpler version of this pattern in a [previous post](/blog/2025/11/19/orchestrating-local-llm-swarm-tmux-claude/).

Without a coordination layer, agents in separate tmux sessions talk through `tmux_capture` and `tmux_send`. That means polling: capture the other window, parse the output, figure out if they're done, sleep, try again. For Pi-to-Pi communication, polling the terminal is the wrong abstraction. You want async messaging: send a message, keep working, get notified when there's a reply.

I had my agent search Pi's extension directory for prior art and found [pi-messenger](https://github.com/nicobailon/pi-messenger) by Nico Bailon. He had already solved the hard problems: file-based messaging, presence detection, the overlay UI with tabs for agents, feed, and chat. Much of pi-mesh's UX comes directly from his work.[^pimessenger]

[^pimessenger]: Pi-messenger bundled coordination with a "crew" system for spawning agent teams. Every tool description included crew actions with no way to turn them off. The LLM saw crew management context on every turn, even when you just wanted to send a message. I didn't need crew management since tmux already handles agent lifecycle. Pi-mesh is pi-messenger's core ideas reduced to the bare minimum: knowing who's working where, claiming files before editing, messaging between sessions.

So I put together [pi-mesh](https://github.com/rhnvrm/pi-mesh). Just the coordination layer. No daemon, no server, no central orchestrator. Files on disk.[^meshbuild]

[^meshbuild]: I estimated about 1,400 lines. It ended up at 2,750 lines of source and 240 lines of tests (36 passing), roughly 840 messages. The overlay UI and tab-completion were most of the overrun. The previous session actually crashed at message 898 when a lite agent sent a long mesh message that overflowed the TUI by two characters: `line.length` (character count) instead of actual display width. The daemon auto-summarized the crashed session afterwards, which was a nice end-to-end validation of the whole setup.

It's transport-agnostic. Two Pi sessions in the same project directory find each other automatically. Everything lives in `.pi/mesh/`: a registry directory (one JSON file per agent), inbox directories (messages as JSON files), and an append-only feed.jsonl.

Five tools: `mesh_peers` (who's active, what model), `mesh_reserve` and `mesh_release` (claim files before editing), `mesh_send` (message another agent), and `mesh_manage` (rename, set status, view feed).

Reservations hook Pi's `edit` and `write` tools. Another agent trying to edit a reserved file gets blocked with a message telling them who has it and why. `bash` commands bypass this.[^bashbypass] The overlay (`/mesh`) has tabs for agents, feed, and chat. The chat is useful for me as the human operator too. I can broadcast instructions without switching tmux windows.

[^bashbypass]: An agent can `sed -i` a reserved file through the shell and the hook won't catch it. Blocking bash would mean parsing shell commands, which is a rabbit hole. The reservation system prevents the common case (agent uses `edit` or `write`), not every possible case. In practice, Pi's tool control mitigates this: I can specify which tools each agent gets. Some agents only get `read` and `write`, no `bash` at all.

## The receipts

Session history was the first thing that paid off. Everything else built on that.

The history goes back to August 2025. ~1,500 searchable records across six months, 38 skills, 115 tracked tasks, 27 handoff files, 120 chronicle entries.[^timeline]

[^timeline]: Month by month: 19 sessions in August 2025 (just getting started), 57 in September, 18 in October, 62 in November, 146 in December. Brief OpenCode bridge in late January. Under Zero, the daemon summarized 745 sessions in January 2026 and 135 Pi sessions in the first week of February. Add 288 project notes from the claude-manager era.

The skills accumulated over about a month: 6,800 lines of documentation, 12 showing multiple commits (active refinement, not write-once-forget).

Is every one of those sessions productive? No. Many are short interactions, experiments, throwaway explorations. But they're all searchable. When an agent runs `qmd search "exchange broadcast parsing"`, it finds relevant past work whether it happened yesterday or six weeks ago. The volume matters because it builds a corpus that makes future sessions more informed.[^amp]

[^amp]: [Amp](https://ampcode.com/) gets a lot of things right here: session history, conversation threads, good UX for managing context. But their features are in the backend with lock-in. Having all the session data as local files means I can analyze, search, and feed them back into agents using whatever tools I want.

Am I 3x faster? 10x? I genuinely don't know. I'm not optimizing for measurable speedup right now. I'm investing in learning the paradigm. The infrastructure teaches me how agents work, where they break, and what makes them better. That's worth more than a productivity number. What I can say: context recovery is faster (handoffs mean I don't re-read conversation history), agents make fewer project-specific mistakes (skills encode the conventions), and I can tell an agent "deploy to UAT" without personally babysitting pipeline status, tag bumping, and the small stuff that fragments attention. Whether that's 20% faster or 50% faster depends on the task. The bet is that it compounds, and that learning this now pays off as the tools mature.

## Complexity and where to start

This is more infrastructure than most people need. Each piece is simple on its own: skills are markdown, the daemon watches files and runs scripts, mesh is JSON files in a directory, Q reads and writes markdown. The composition is complex. I've been iterating on this for months.

Start with session history. That's the minimum viable version of everything above. Every AI coding session produces a conversation log. Most people throw these away. Keep them. Summarize them, search them, extract patterns, feed them back into future sessions. You can do this tomorrow with any agent.

Encode what you learn. Next time you solve something tricky, write it down where your agent can find it. A skill, a runbook, an AGENTS.md section. The xkcd math[^xkcd] works in your favor when the time saved applies to every future session. Build a meta-skill and the bootstrapping compounds from there.

Try one extra agent. Spawn a second agent in a tmux window for a focused task: run tests, explore a codebase, review a PR. See if the workflow clicks before investing in coordination infrastructure.

The multi-agent setup is still early. Reservations work but `bash` can bypass them. Daemon agents are excluded from the mesh (non-interactive Pi skips the extension lifecycle). Tmux window kills don't always trigger clean shutdowns. Some of these are gaps, some are tradeoffs. I'll come back in six months with better numbers on what actually worked.

[pi-mesh](https://github.com/rhnvrm/pi-mesh) is MIT licensed and on GitHub. Zero-agent is internal for now. It's designed for team use (shared Nix flake, git-tracked config, common skills directory), but right now it's just me. The "commons" in the repo path is aspirational. The ideas are transferable to any Pi setup.
