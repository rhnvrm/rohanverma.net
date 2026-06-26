+++
title = "How I got Git worktrees to actually work"
date = "2026-06-26T16:10:00+05:30"
draft = false
path = "blog/2026/06/26/how-i-got-git-worktrees-to-actually-work/"

[taxonomies]
  tags = ["git", "worktrees", "ai", "automation", "developer-tools"]
  categories = ["engineering"]

[extra]
  author = "rhnvrm"
+++

[Fatih recently asked on X](https://x.com/fatih/status/2070393923504091649) how people are getting real mileage out of Git worktrees. I've been using them a lot in bosun, and I figured it was worth writing down what made them click for me instead of replying with vibes.

Short version: worktrees started working for me once I stopped treating them like a clever Git feature and started treating them like infrastructure.

I don't mean that in some grand enterprise sense. I mean fixed paths, a predictable shell, setup notes that agents can follow, and a way for parallel work not to turn into chaos. Once those pieces were in place, worktrees stopped feeling like extra ceremony and started feeling like the natural unit of work.

If you want the technical breakdown behind this, I wrote that up separately: [How worktrees actually work in my setup](/pages/harness-engineering/in-practice/how-worktrees-actually-work/).

## The problem with worktrees in the abstract

Whenever people recommend worktrees, the pitch is usually something like this: no more stashing, no more branch switching, just open another directory. That's true, but it leaves out the annoying part.

The annoying part is everything around the directory.

Where does it live? Which copy is the "main" repo? Where do build artifacts go? What happens when the repo moves? What if the feature spans three repos? What if an agent is already halfway through a task in one branch and I want another one working somewhere else?

If you don't answer those questions up front, worktrees slowly turn into a pile of weird folders and stale references.

That was my experience too. The feature itself was never the hard part. The harness around it was.

## What changed for me

The big shift was deciding that every repo and every worktree had a canonical place on disk.

Main clones live at:

```
workspace/code/{host}/{group}/{repo}
```

Worktrees live at:

```
workspace/code/worktrees/{host}/{group}/{repo}/{branch}
```

It sounds boring. That is part of why it works.

A remote URL maps straight to a path on disk. I don't have to remember where I put a branch three weeks ago. An agent doesn't have to infer whether some frontend repo lives in a sibling directory or under a random `~/code/tmp` folder. The answer is always the same.

This mattered even more once agents entered the picture. Humans can work around messy conventions. Models usually just make them up.

The other piece was the environment. A fresh worktree is much more useful if opening it also gives you the right tools. In bosun, [Nix](@/pages/harness-engineering/sandbox/nix-for-dev-envs.md) defines the dev shell and direnv makes entering it cheap, so a new worktree is not just another checkout. It is usually a runnable project context with the toolchain already there.

## The sandbox forced me to get serious

One of the more useful constraints in my setup is that the coding environment is [sandboxed](@/pages/harness-engineering/sandbox/the-sandbox.md). That sounds unrelated, but it is a big part of why worktrees became reliable.

A Git worktree is not a full clone. Its `.git` file points back to metadata in the parent repo. So if the parent repo lives outside the sandbox and the worktree lives inside it, you have created a broken setup. The worktree points at something it cannot properly access.

That constraint forced a rule I probably should have adopted anyway: the parent repo and the worktree both live inside the same workspace.

This shows up in more ordinary ways too. Move the parent repo, recreate your machine with a different path layout, or keep the main clone outside the environment where the worktree runs, and the setup starts breaking in ways that feel mysterious until you inspect the pointer. Worktrees are not magic. They are structured pointers.

## A worktree became the unit of task context

A worktree is not just "that branch over there." In practice it becomes the place where the whole task lives.

That means:

- the branch checkout
- local dependencies
- build artifacts
- environment files
- local data files
- whatever dev server or support process that task expects

Once I started thinking about worktrees this way, they got much more useful.

When I come back to a frontend task, I am not reconstructing context from scratch. I `cd` into the worktree and a surprising amount of the setup is already there. After a while that becomes the difference between "resume" and "rebuild everything before you can even think."

This is also where repo-specific [skills](@/pages/harness-engineering/skills/skills.md) pull their weight. They do not just say "use a worktree." They usually tell the agent where the worktree should live, whether to fetch or create the branch, and what needs to happen before the app will actually run.

## Multi-repo work is where this really pays off

A lot of the work I do is not one feature, one repo, one branch.

Take any feature that spans a backend repo, a realtime service, and a frontend repo. Worktrees fit that shape nicely because each repo gets its own branch and its own directory, but the naming convention still makes the whole thing feel like one coherent workspace.

Instead of keeping all of that state in my head, I can have:

- one worktree for the backend branch
- one for the realtime branch
- one for the frontend branch

Now each branch can evolve independently, and I can still hop between them without the usual branch-switching churn. More importantly, agents can do the same.

That was the point where worktrees stopped feeling like a convenience feature and started feeling like the actual way the work gets organized.

## Agents made the value obvious

With a single human in a single terminal, worktrees are already nice. With multiple agent sessions, they become close to mandatory. An agent needs a stable filesystem view. If it is halfway through a task and I repoint the directory out from under it by switching branches, I should not be surprised when things get weird.

Worktrees fix that by giving each task a stable home.

But worktrees alone are not enough. I also need coordination. In my setup, that is handled by [pi-mesh](@/pages/harness-engineering/agents/coordination.md), a coordination layer that lets agents see each other, reserve files, and send short messages when interfaces change. Worktrees isolate branch state. Mesh reservations isolate edit ownership. [Session handoffs](@/pages/harness-engineering/feedback/handoffs.md) preserve the context between runs.

Those three together are what make parallel work usable most of the time.

Without that, "one agent per worktree" just becomes a more elaborate way to create confusion.

## The parts that still break

I don't want to oversell this. Worktrees only got good for me after I ran into the same failure modes enough times to write them down.

The common ones are:

- broken absolute paths after moving a repo
- duplicate or nested worktrees because I created one before checking `git worktree list`
- stale branches that should have been cleaned up weeks ago
- agents guessing sibling paths like `../../some-service` because I left room for them to be clever

That last one is the interesting one. I had a session where an agent loaded the right project skill, which documented the exact path to the worktree, and then still tried to infer a more "standard" filesystem layout from generic GitHub and GitLab intuition. It was wrong. The fix was not a better motivational speech. The fix was tighter documentation and a path convention explicit enough that guessing became unnecessary.

I keep running into the same pattern with agentic tooling: the cleaner the constraint, the less time gets wasted rediscovering it.

## The real lesson

I don't think the main takeaway is "use Git worktrees." Plenty of people already know the command exists.

The more useful lesson is this:

**worktrees start paying off when they become part of a broader harness.**

For me that harness has a few unglamorous pieces:

- one canonical layout for clones and branches
- parent repos and worktrees inside the same sandbox boundary
- [Nix](@/pages/harness-engineering/sandbox/nix-for-dev-envs.md) and direnv so entering a worktree gives me the expected toolchain
- repo-specific [skills](@/pages/harness-engineering/skills/skills.md) so a new worktree comes with a setup recipe instead of tribal knowledge
- persistent per-worktree state so resuming is cheap
- session notes and handoffs so the history sticks
- a coordination layer so parallel agents do not collide

As I wrote this, I counted 114 live worktree directories across 28 repos in my workspace. That is not a flex. It just tells me the system crossed a line: worktrees are no longer occasional helpers. They are the default shape of active work.

That is why I think the conversation around them is still a bit underspecified. Worktrees do help, but the command is the easy part. The harder part is deciding where they live and making the surrounding setup repeatable.

If that part is in place, worktrees stop feeling fussy. They just feel normal.
