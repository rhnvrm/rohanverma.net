+++
title = "Help Wanted"
weight = 7
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "pi-weaver"
+++

I ran 15 of Terminal-Bench 2.0's 89 tasks. The results are suggestive but not conclusive. More data would help.

## What I need

Someone to run the remaining 74 tasks (or any subset) with the same A/B methodology:

- **Plain Pi** (no weaver) vs **Pi + weaver**
- Same model (Sonnet 4.6 recommended for comparison)
- Same Docker images (pre-baked, ~60s faster per task)

The cost for 74 tasks at ~$0.40/task would be roughly **$60** total ($30 per variant).

## What I provide

Everything needed to reproduce is in the [bosun repo](https://github.com/oddship/bosun/tree/main/packages/pi-weaver):

- **Pre-bake script** (`harbor/prebake.sh`): builds Docker images with bun + Pi pre-installed
- **Fast eval runner** (`harbor/run-fast.sh`): runs tasks in pre-baked containers, bypasses Harbor framework overhead
- **Harbor adapters** (`harbor/pi_harbor/`): for use with the official Harbor framework
- **Progress monitor**: shows tool breakdown every 30s during runs

### Quick start

```bash
# Clone and set up
git clone https://github.com/oddship/bosun
cd bosun/packages/pi-weaver

# Pre-bake Docker images (one-time, ~5 min)
./harbor/prebake.sh

# Set your model
export MODEL=claude-sonnet-4-6

# Run a single task (both variants)
./harbor/run-fast.sh both db-wal-recovery

# Run all remaining tasks
./harbor/run-fast.sh both  # runs all TB 2.0 tasks
```

### What to send back

Session JSONL files from `workspace/harbor-jobs/`. Each run produces a `.jsonl` file with full session traces. I can extract economics, tool usage, and pass/fail from these.

## Open questions more data would answer

1. **Does weaver help more on other models?** Haiku 4.5 was too weak (1/10 both). GPT-5.4-mini, Gemini 2.5 Flash, open-source models are all untested.

2. **Does the grind pattern scale?** On 15 tasks, qemu-alpine-ssh was the only severe grind case. With 89 tasks, we'd learn whether that's an outlier or a pattern.

3. **Are there more db-wal-recovery-style wins?** The hidden-structure insight tasks were the strongest weaver fit. TB 2.0's full set likely has more of these.

4. **Does the 5% cost saving hold?** $5.50 vs $5.84 on 15 tasks. With 89 tasks, the variance shrinks and the signal gets clearer.

## Contact

Open an issue on [the bosun repo](https://github.com/oddship/bosun/issues) or reach out on [X (@rabortonikka)](https://x.com/rabortonikka).
