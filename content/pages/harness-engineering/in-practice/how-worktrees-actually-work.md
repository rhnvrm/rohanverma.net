+++
title = "How worktrees actually work in my setup"
weight = 30
template = "pages-page.html"
date = "2026-06-26T16:20:00+05:30"
draft = false
path = "pages/harness-engineering/in-practice/how-worktrees-actually-work/"

[extra]
  author = "rhnvrm"
  section_title = "In Practice"
+++

This page is the technical companion to [How I got Git worktrees to actually work](/blog/2026/06/26/how-i-got-git-worktrees-to-actually-work/). The blog post is the story. This page is about the wiring: path layout, Nix and direnv entry, bosun config, agent config frontmatter, a redacted repo-skill excerpt, and the failure mode that made the rules feel non-optional.

Bosun, in this context, is my local agent harness: tmux-backed agent spawning, a [sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md), Nix dev shells, [pi-mesh coordination](@/pages/harness-engineering/agents/coordination.md), and repo-specific [skills](@/pages/harness-engineering/skills/skills.md).

## Operating rules and evidence

Before getting into the details, here is the short version.

The operating rules are simple:

- clones live at `workspace/code/{host}/{group}/{repo}`
- worktrees live at `workspace/code/worktrees/{host}/{group}/{repo}/{branch}`
- the parent repo and the worktree have to live inside the same workspace boundary

The evidence comes from a subset of my internal bosun harness usage, not from every session I've ever run:

- the current workspace contains **114 live worktree directories** across **28 repositories**
- in the raw Pi session archive for this harness, **467 unique session files** contain explicit `git worktree` commands
- those raw sessions contain **714** `git worktree add` hits, **208** `list` hits, **85** `remove` hits, and **33** `prune` hits

Method: I counted live worktree directories under `workspace/code/worktrees`, then searched the raw Pi session archive under `.bosun-home/.pi/agent/sessions` for explicit `git worktree add`, `list`, `remove`, and `prune` commands. This is still a subset, not a telemetry system, so wrapper commands and indirect workflows can slip past it.

## From blank worktree to runnable task

The part most worktree advice skips is everything between `git worktree add` and "I can actually continue the task here." In bosun, that path is pretty concrete.

At a high level, it looks like this:

```bash
# Main clone in the canonical location
cd workspace/code/github.com/myorg/myrepo

# Create the task branch as a worktree
git worktree add \
  workspace/code/worktrees/github.com/myorg/myrepo/feature-branch \
  -b feature-branch

# Enter the worktree - direnv loads the flake-backed shell
cd workspace/code/worktrees/github.com/myorg/myrepo/feature-branch

# Typical repo-specific bootstrap sequence
bun install
bun run build-assets
bun run dev

# Later, resume the same directory and pair it with a handoff
```

The exact commands differ by repo, but the shape stays the same.

### 1. The path convention is encoded, not remembered

The canonical layout is written into the upstream Git skill itself:

```
workspace/code/{host}/{group}/{repo}
workspace/code/worktrees/{host}/{group}/{repo}/{branch}
```

That matters because it stops both humans and agents from improvising path layouts. A repo URL maps to one main clone path. A branch maps to one worktree path.

The repo-level guidance in `AGENTS.md` is blunt about it too: use `workspace/code/worktrees/` for worktrees, not sibling paths like `../../`.

A typical worktree creation flow then looks like this:

```bash
cd workspace/code/github.com/myorg/myrepo
mkdir -p workspace/code/worktrees/github.com/myorg/myrepo
git worktree add \
  workspace/code/worktrees/github.com/myorg/myrepo/feature-branch \
  -b feature-branch
```

That example is generic, but the shape matches the actual bosun docs.

### 2. Entering the directory also enters the shell

The root `.envrc` in bosun is tiny:

```bash
use flake
```

That single line is doing a lot of work. Direnv notices the directory change and hands off to Nix. The repo README says it plainly: `nix develop` provides the toolchain reproducibly, and direnv auto-loads it via `.envrc`.

The flake then supplies the actual toolchain. A trimmed excerpt from `flake.nix` looks like this:

```nix
devTools = with pkgs; [
  bubblewrap
  tmux
  git
  just
  nodejs_22
  bun
  python312
];
```

This is why Nix and direnv matter specifically for worktrees. Without them, a new worktree is just another checkout. With them, entering the worktree usually gets me a shell with the expected compilers, interpreters, CLIs, and helper tools already there.

See [Nix for Dev Envs](@/pages/harness-engineering/sandbox/nix-for-dev-envs.md) for the broader sandbox rationale.

### 3. Bosun wiring makes the worktree usable by agents

The architecture docs describe the config flow like this:

```
config.toml (source of truth)
    ↓ bun node_modules/bosun/scripts/init.ts
.pi/settings.json
.pi/agents.json
.pi/daemon.json
.pi/bwrap.json
.pi/pi-mesh.json
```

A small `config.toml` excerpt covers most of the system wiring:

```toml
[workspace]
path = "workspace"

[backend]
type = "tmux"
command_prefix = "node_modules/bosun/scripts/sandbox.sh"

[mesh]
auto_register = true

[sandbox]
enabled = true
```

In practice, those lines mean:

- all project work lives under one `workspace/` root
- spawned agents run in tmux, not in a one-off hidden subprocess
- agents auto-join the mesh for coordination
- the sandbox boundary is consistent across sessions

Agent config frontmatter then loads the matching runtime pieces:

```md
---
name: zero
model: high
skill: git, context-management
extensions:
  - pi-agents
  - pi-tmux
  - pi-daemon
  - pi-mesh
  - pi-sandbox
---
```

So the agent landing in a worktree is not starting from scratch either. It already knows about Git conventions, can spawn into tmux, can coordinate over the mesh, and is running inside the same sandbox model that the path rules were designed for.

One small but important detail: `config.toml` is the source of truth here. Bosun regenerates its `.pi/*.json` config from that file, so this behavior is configured, not improvised per session.

### 4. Repo skills carry the last mile of setup

The upstream Git skill gets me to the right path. Repo-specific skills explain what has to happen *inside* that worktree for a particular codebase.

A redacted but structurally faithful example looks like this:

```md
## Worktree path
workspace/code/worktrees/github.com/myorg/frontend-app/feature-branch

## Setup sequence
- fetch the remote branch if it already exists
- otherwise create the branch from the documented base
- install dependencies
- build generated assets before starting the app
- start the local dev server on the documented port

## Gotchas
- do not guess sibling repo paths
- prefer the canonical worktree path from the skill
- check `git worktree list` before creating another worktree
- if the app expects local data files, keep them inside the worktree
```

The exact commands vary by repo, but the pattern stays the same. The skill is there so the agent does not have to rediscover branch policy, bootstrap order, or path conventions from scratch.

### 5. Handoffs make resuming cheaper than restarting

A worktree keeps the code state. [Handoffs](@/pages/harness-engineering/feedback/handoffs.md) keep the reasoning state.

That is what makes resuming cheap. I'm not just reopening a branch. I'm reopening a branch *plus* the setup artifacts in that directory *plus* a short written record of what the task was doing.

## Why the sandbox boundary rule is real

The upstream Git skill is unusually explicit about this point:

> Both the parent repo and the worktree must be inside `$BOSUN_ROOT/workspace/`.

That rule exists because a worktree is not self-contained. Its `.git` file points back into the parent repo metadata.

A redacted example of what that pointer looks like:

```
gitdir: /absolute/path/to/parent/.git/worktrees/feature-branch
```

That is why moving or renaming the parent repo is not a cosmetic change. If the parent path changes, or if the parent repo is outside the sandbox while the worktree is inside it, the pointer stops making sense.

This shows up in more ordinary ways than a repo rename. Move the parent repo, recreate your machine with a different path layout, or keep the main clone outside the environment where the worktree runs, and the setup starts breaking in ways that feel mysterious until you inspect the pointer.

Worktrees are not magic. They are real wiring.

## What actually persists inside a useful worktree

Once the path, shell, and setup rules are in place, the worktree stops being just a branch checkout and turns into a task directory.

In practice that often means:

- dependency directories like `node_modules`
- build outputs
- generated assets
- downloaded local data
- `.env` files
- the current working directory assumptions of dev servers and scripts

This is one reason worktrees have felt so much better than branch switching for me. When I return to a task, I am often reopening a half-prepared environment rather than reconstructing one from memory.

## The evidence is operational, not aspirational

The current usage counts are useful mostly because they show repetition, not because they are perfectly scientific.

If you wanted to reproduce the rough shape of the numbers, the method is not complicated:

```bash
# Live worktrees
find workspace/code/worktrees -name .git

# Worktree-related session summaries and raw command hits
grep -R "git worktree add\|git worktree list\|git worktree remove\|git worktree prune" workspace/users
```

Here is the rough shape of the command history in that raw archive slice:

- `git worktree add`: 714 hits across 413 unique session files
- `git worktree list`: 208 hits across 71 unique session files
- `git worktree remove`: 85 hits across 32 unique session files
- `git worktree prune`: 33 hits across 4 unique session files

I don't present those numbers as exact telemetry. I am using them for something simpler: to show that worktrees are part of the normal operating model here, not a one-off habit.

## A minimal version you can steal

If you wanted the smallest useful version of this without adopting bosun itself, I would start here.

### 1. Pick one layout and stick to it

```
~/code/{host}/{group}/{repo}
~/code/worktrees/{host}/{group}/{repo}/{branch}
```

The exact root does not matter much. Consistency does.

### 2. Create worktrees the same way every time

```bash
# Main clone
mkdir -p ~/code/github.com/myorg
git clone git@github.com:myorg/myrepo.git ~/code/github.com/myorg/myrepo

# New worktree
cd ~/code/github.com/myorg/myrepo
git fetch origin
git worktree add \
  ~/code/worktrees/github.com/myorg/myrepo/feature-branch \
  -b feature-branch
```

If the branch already exists remotely, use that instead of creating a new local one:

```bash
git fetch origin feature-branch
git worktree add \
  ~/code/worktrees/github.com/myorg/myrepo/feature-branch \
  feature-branch
```

### 3. Make the shell activate on entry

A tiny `.envrc` is enough to make worktrees feel less disposable:

```bash
use flake
```

And the flake can stay simple at first:

```nix
devShells.default = pkgs.mkShell {
  buildInputs = with pkgs; [ git tmux just nodejs_22 bun python312 ];
};
```

You do not need perfection here. You just want the common tools to show up the moment you enter the directory.

### 4. Write down the repo bootstrap once

For each repo, keep a small setup note close to the code. It can be a skill, a README section, or a plain markdown file. The important part is that it answers the same questions every time:

- what branch should I base this on?
- where should the worktree live?
- what do I install after checkout?
- what do I build before running?
- what port or support services does the app expect?

That one document saves a surprising amount of drift.

## Useful commands once you have a few worktrees

These are the commands I keep coming back to:

```bash
# See what already exists
git worktree list

# Remove a finished worktree
git worktree remove ~/code/worktrees/github.com/myorg/myrepo/feature-branch

# Clean stale metadata if a directory was deleted manually
git worktree prune

# Inspect what a worktree points at
cat ~/code/worktrees/github.com/myorg/myrepo/feature-branch/.git
```

That last one is especially useful when something feels broken.

## The failure mode worth understanding

If worktrees ever seem flaky, inspect the `.git` file first.

```
gitdir: /absolute/path/to/parent/.git/worktrees/feature-branch
```

That one line explains most of the weirdness.

A worktree is not a self-contained checkout. It is a working directory plus a pointer back to parent-repo metadata. If that parent moves, disappears, or lives outside the environment the worktree can see, the setup breaks in ways that feel mysterious until you look at the pointer.

## What I would steal even outside bosun

If I were rebuilding this in a different harness, I would keep these pieces:

1. one canonical path scheme for clones and worktrees
2. one boundary rule for where parent repos and worktrees are allowed to live
3. a reproducible shell that activates on directory entry
4. per-repo setup docs or skills that teach the bootstrap order
5. a lightweight way to resume task context alongside the directory
6. a coordination layer if multiple humans or agents edit in parallel

That is the actual lesson I take from this setup.

Git gives you the primitive. The rest is what makes it hold up day after day.

---

See also:

- [The Sandbox](@/pages/harness-engineering/sandbox/the-sandbox.md)
- [Nix for Dev Envs](@/pages/harness-engineering/sandbox/nix-for-dev-envs.md)
- [Coordination](@/pages/harness-engineering/agents/coordination.md)
- [Handoffs](@/pages/harness-engineering/feedback/handoffs.md)
- [Skills](@/pages/harness-engineering/skills/skills.md)
- [Start Manual, Automate Later](@/pages/harness-engineering/thesis/start-manual-automate-later.md)
