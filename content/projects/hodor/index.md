+++
title = "Hodor"
description = "Multi-agent AI code reviewer using orchestrator pattern"
weight = 11

[extra]
github_url = "https://github.com/rhnvrm/hodor"
tech_stack = "Python, OpenHands SDK"
status = "experimental"
+++

**Status: Experimental / In Development**

Fork of [mr-karan/hodor](https://github.com/mr-karan/hodor). Multi-agent AI code reviewer using OpenHands SDK with cost optimization.

## Architecture

```
Orchestrator (Opus 4.5)
  → DelegateTool
  → Worker Agents (Haiku 3.5)
  → ~67% cost savings
```

4-phase workflow: **Understand → Analyze → Synthesize → Output**

## Features Implemented

- Multi-model orchestrator (Opus orchestrates, Haiku workers)
- CLI proxy integration for cost-free evaluation
- Cost aggregation across subagents
- Worker context condensers
- Zero-tools verifiers for quality checks

## Usage

```bash
OPENHANDS_FORCE_SUBPROCESS_TERMINAL=1 \
LLM_API_KEY=dummy \
LLM_BASE_URL=http://localhost:8317/v1 \
uv run hodor "$MR_URL" \
  --model openai/claude-haiku-4-5-20251001 \
  --workspace /path/to/local/clone
```

## Docker

```bash
docker pull ghcr.io/rhnvrm/hodor:latest
```

## Cost Optimization

By using Haiku workers orchestrated by Opus, achieved ~67% cost reduction compared to using Opus for all operations. Workers handle file reading and pattern matching while Opus focuses on high-level analysis.
