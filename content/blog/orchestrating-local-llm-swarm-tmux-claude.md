+++
title = "Orchestrating a local LLM swarm using tmux and Claude"
date = "2025-11-19T10:00:00+05:30"
draft = false
path = "blog/2025/11/19/orchestrating-local-llm-swarm-tmux-claude/"

[taxonomies]
  tags = ["tmux", "llm", "cli", "automation"]
  categories = ["experiments", "automation"]

[extra]
  author = "rhnvrm"
+++

I recently had to generate about 40 documentation files for a legacy codebase. It was a tedious task—perfect for an LLM, but doing it manually, file by file, would have been numbing.

I considered writing a Python script to loop through the files and hit the Anthropic API, but that felt brittle. API scripts are great until they hit an edge case or a rate limit, and then you're stuck debugging JSON responses. I wanted something more interactive, where I could see what was happening and intervene if things went off the rails.

It turns out, you can build a surprisingly robust agent orchestration system using just `tmux` and the `claude` CLI.

### The Idea

The concept is simple: treat `tmux` panes as "workers" and use a central "orchestrator" to drive them.

I set up a single tmux session with two windows:
1.  **Orchestrator (Window 0):** An interactive Claude session that manages the plan.
2.  **Workers (Window 1):** A 2x2 grid of panes, each running a Claude CLI instance.

The Orchestrator reads a markdown file containing the tasks, finds an idle worker pane, and uses `tmux send-keys` to paste the prompt. The file system acts as the message bus—workers signal completion by creating a `.done` file.

### The Protocol

Instead of writing complex code to manage state, I just wrote a Markdown guide (`ORCHESTRATOR.md`) for the agent to follow. It essentially "programs" the LLM to act as a manager.

Here is the gist of the protocol I gave it:

1.  **Read State:** Check `PLAN.md` for unchecked tasks.
2.  **Assign:** Pick a free pane in Window 1 (e.g., `swarm:workers.0`).
3.  **Spawn:** Run `claude --dangerously-skip-permissions` in that pane.
4.  **Prompt:** Send the task context and instructions.
5.  **Monitor:** Wait for the worker to write a file like `docs/auth.md.done`.

### The "Gotcha" with tmux send-keys

The trickiest part was getting the Orchestrator to reliably send commands to the workers. If you just pipe a massive string to `tmux send-keys`, the LLM CLI often tries to interpret newlines as commands before the text is fully pasted.

The workaround I found was to explicitly separate the text paste from the execution:

```bash
# 1. Send the prompt text (no newline)
tmux send-keys -t swarm:workers.0 "Here is the task context..."

# 2. Sleep to let the buffer flush
sleep 1

# 3. Send Enter explicitly
tmux send-keys -t swarm:workers.0 C-m
```

### Why this works

This setup—what I'm calling a "tmux swarm"—has a few distinct advantages over a blind script:

1.  **Visibility:** You can switch to Window 1 and see four agents "thinking" in parallel. It feels very sci-fi.
2.  **Resilience:** If a worker starts hallucinating or gets stuck in a loop, I can just `Ctrl+C` into that specific pane, fix the context, and let the Orchestrator resume.
3.  **Persistence:** Since the state is just a markdown file (`PLAN.md`) and a tmux session, it survives disconnects or crashes.

It is definitely a bit of a hack, and it eats through API credits (you are running 5 concurrent agent loops), but for "interactive batch processing," it is a powerful workflow.

### Try it out

If you want to try this yourself, you just need the `claude` CLI and `tmux`.

Create a `PLAN.md` with your tasks:

```markdown
- [ ] Refactor login.ts
- [ ] Refactor logout.ts
```

And an `ORCHESTRATOR.md` to tell Claude how to use tmux. Then just spin up the session and tell the Orchestrator to "follow the guide."

It’s a fun experiment in "low-code" agent engineering.
