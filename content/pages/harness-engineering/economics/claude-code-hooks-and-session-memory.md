+++
title = "Claude Code Hooks and Session Memory"
weight = 25
template = "pages-page.html"
date = 2025-12-19
draft = false

[extra]
section_title = "Economics & Origins"
+++

*This predates [bosun](@/pages/harness-engineering/economics/pi.md). The ideas here evolved into [the daemon](@/pages/harness-engineering/feedback/the-daemon.md) and [session summarization](@/pages/harness-engineering/feedback/session-summarization.md). Documented as history.*

---

Claude Code has a hook system that lets you run shell commands or LLM evaluations at session boundaries. I used it to build automated session memory: summarize what happened, inject relevant context on startup, and preserve institutional knowledge across conversations. This page documents the system's design, the technical details, and the decisions I made along the way.

## The problem

Every Claude Code session starts with a blank context window. If you worked on something yesterday, the model does not know about it today. You can write a CLAUDE.md file with project context, but that is static. It does not know what you did in your last three sessions or what decisions you made last week.

For a personal knowledge management system with hundreds of files, daily notes, and task databases, this means the AI forgets everything between sessions. The boot script helps (it shows today's reminders and ready tasks), but it does not bring forward session-specific context like "yesterday you were debugging the pagination issue and identified the root cause in the cursor logic."

## Claude Code hooks

Hooks let you attach behavior to session lifecycle events. The available hooks:

| Hook | When it fires |
|------|---------------|
| `SessionStart` | On session start (startup, resume, clear, compact) |
| `SessionEnd` | When session ends |
| `PreCompact` | Before context compaction (manual or auto) |
| `Stop` | When agent finishes a task |
| `PreToolUse` / `PostToolUse` | Before/after tool execution |
| `UserPromptSubmit` | When user submits a prompt |

There are two hook types:
- **Command hooks**: run a shell command; stdout is injected as context for the model
- **Prompt hooks**: run an LLM evaluation (haiku-tier model); only available for Stop/SubagentStop

Hooks can be configured at three levels:
- **Global**: `~/.claude/settings.json` (applies everywhere)
- **Project (committable)**: `.claude/settings.json` (shared with team)
- **Project (local)**: `.claude/settings.local.json` (personal overrides)

Project hooks run in addition to global hooks, not instead of them.

## Where Claude stores transcripts

Claude keeps full conversation transcripts locally. This is the raw material for session memory:

| Location | Content |
|----------|---------|
| `~/.claude/transcripts/ses_<ID>.jsonl` | Full session conversations |
| `~/.claude/projects/<project>/` | Project-specific sessions |
| `~/.claude/history.jsonl` | Global command history |

The JSONL format stores each interaction as a typed record:
```json
{"type":"user","timestamp":"2025-12-18T10:34:00Z","content":"message"}
{"type":"tool_use","timestamp":"...","tool_name":"bash","tool_input":{...}}
{"type":"tool_result","timestamp":"...","tool_name":"bash","tool_output":{...}}
```

## Design decisions

### LLM-based summarization over embeddings

I evaluated several approaches for session memory retrieval:

| Tool | Approach |
|------|----------|
| semtools | Rust, LlamaIndex-based embeddings |
| refer | Ollama-based embedding search |
| llm (Simon Willison's) | SQLite with embedding storage |
| sentence-transformers | Python embedding models |

I chose `claude -p haiku` as a subprocess instead. The reasons:

1. **No external dependencies.** No Ollama server, no Python environment, no Rust compilation. Just the Claude CLI that is already installed.
2. **Better semantic understanding.** An LLM can summarize intelligently, not just retrieve by similarity. It can extract decisions, blockers, and next steps from a messy session transcript.
3. **Acceptable cost.** About $0.01-0.05 per session for haiku-tier summarization. Over hundreds of sessions, this is noise.

The tradeoff is latency: 5-10 seconds on SessionStart. Acceptable for something that runs once.

### The critical performance fix

When calling `claude -p` as a subprocess from inside a project that has hooks configured, the subprocess inherits the project hooks. This means the subprocess itself triggers hooks, which trigger more subprocesses. The fix:

```bash
claude --model haiku -p "prompt" --setting-sources user
```

The `--setting-sources user` flag tells Claude to skip project and local settings (including hooks). This brought subprocess execution from 68 seconds down to 4 seconds. A 17x improvement from a single flag.

### Two-stage pipeline: select then compress

There are too many session transcripts to pass all of them to the summarizer. And even selected sessions are too verbose for context injection. So the pipeline has two stages:

1. **Select**: identify which past sessions are relevant to the current context
2. **Compress**: take the selected sessions and produce a concise summary (200-300 words)

This keeps the injected context short enough to be useful without eating into the working context window.

### Project-level hooks

I configured hooks at the project level (`.claude/settings.json`) rather than globally. The session memory system is specific to this one repository's workflow. It should not affect other projects. And project-level hooks are committable, so the setup is reproducible.

### Existing session storage

Session summaries go into the same `daily/YYYY-MM/sessions/` directory structure that already existed for manual session archives. No new storage infrastructure. The naming convention stays the same. The only difference is that some summaries are now generated automatically instead of manually.

## Prompt design for structured extraction

The haiku subprocess needs to produce structured, agent-consumable output. The prompt format that works best:

```
TASK: Extract key info. Output ONLY structured data.

DECISIONS:
FILES:
BLOCKERS:
NEXT:

INPUT:
{content}

OUTPUT:
```

Short, directive, with clear output structure. Haiku follows this format reliably.

## What works

1. **SessionEnd hook for auto-archival.** When a session ends, a command hook summarizes the transcript and saves it to the daily sessions directory. No manual step required.
2. **PreCompact hook for safety.** Before context compaction (which discards conversation history), the hook saves a summary. This means compaction does not lose institutional memory.
3. **CLI context search.** A `boot.py -c "topic"` command searches past sessions for relevant context and injects it. Works well for "where did we leave off on X?" questions.
4. **The `--setting-sources user` flag.** Without this, subprocess hooks create recursive invocations. With it, subprocesses are fast and clean.

## What needs more work

1. **Automatic context triggering.** The UserPromptSubmit hook could detect questions like "where are we on X?" and auto-inject relevant session summaries. The hook fires before the model sees the prompt, so it can augment the context. This is partially implemented but not reliable enough yet.
2. **Stop hook schema.** Stop/SubagentStop prompt hooks expect a specific JSON response format: `{"decision": "approve", "reason": "..."}` to allow, `{"decision": "block", "reason": "..."}` to prevent. Getting this wrong (e.g., using `{"ok": boolean}`) causes silent failures.
3. **Haiku subprocess timeouts.** Occasionally the subprocess takes longer than expected. Needs a timeout and fallback.

## SessionStart limitations

A natural idea is to inject session memory on SessionStart. The problem: SessionStart hooks run before the user provides any input. There is no topic to search for. And making `claude -p` calls at startup blocks the session from becoming interactive.

The workaround is to use the boot script (which is referenced in CLAUDE.md and runs as part of the AI's own startup behavior) or to trigger context injection on the first user prompt via UserPromptSubmit.

## Status

The system is partially implemented and in daily use. Core functionality (auto-archival on SessionEnd, PreCompact safety saves, manual context search) works reliably. Automatic context injection on user prompts needs refinement. The architecture is sound; the remaining work is mostly edge cases and reliability improvements.

## References

- [Claude Code Hooks Guide](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Claude Code Memory System](https://docs.anthropic.com/en/docs/claude-code/memory)
