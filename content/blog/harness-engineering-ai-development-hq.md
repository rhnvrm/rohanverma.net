+++
title = "Making a query processor for HUML"
date = "2026-01-22T16:00:00+05:30"
draft = false
path = "blog/2026/01/22/making-a-query-processor-for-huml/"

[taxonomies]
  tags = ["ai", "tdd", "golang", "development", "llm"]
  categories = ["engineering"]

[extra]
  author = "rhnvrm"
+++

Yesterday night, I built [hq](https://github.com/rhnvrm/hq), a jq/yq-like processor for [HUML](https://huml.io) (a data format spec'd by [Kailash](https://nadh.in), here's [his talk about it](https://www.youtube.com/watch?v=4M_tD1N14Ao)). 511 passing tests. 6,278 lines of implementation code. About 6 hours of elapsed time, almost entirely hands-off.

I'd had this project in mind for months. Every time I evaluated the effort (expression parser, 50+ operators, type coercion, iterator semantics), it looked like a multi-week slog even with LLM help. The complexity wasn't in any single piece, but in the sheer number of pieces.

What changed was the approach. Instead of prompting an LLM to "build me a jq clone" and steering it through implementation, I spent time upfront on structure: a detailed plan, a test harness, and guardrails that let the LLM work autonomously. The result was 58 prompts from me over the entire project, with the LLM agent executing 40-60 actions between each prompt.

## The setup

I've been experimenting with sandboxed LLM development using [opencode](https://github.com/anomalyco/opencode), Nix for reproducible tooling, and bubblewrap for filesystem isolation. The sandbox matters because LLM agents execute arbitrary code - filesystem isolation prevents accidents from escaping the project directory.

The setup uses multiple agents at different capability tiers:

- **Orchestrator** (Claude Opus): planning, complex decisions, coordination
- **Review/Verify** (Claude Sonnet): validates code quality, checks implementation against specs
- **Lite** (Claude Haiku): gathers context, reads files, searches codebases

The reasoning behind this split: context windows are expensive, and most LLM work is reading. Having the orchestrator delegate file searches and codebase exploration to a cheaper model keeps costs down while preserving context for decisions that matter. The review/verify agents run in separate sessions entirely, which means they can't be influenced by the orchestrator's reasoning - they see only the code and the spec.

## The main insight

Let me share the core idea: planning the tests, not just writing code.

I don't mean "write some tests first" in the typical TDD sense. I mean using the LLM to generate test scenarios for everything you can think of before any implementation exists. By hour three of implementation, the LLM has forgotten decisions made in hour one. But test cases don't drift. Front-loading the specification into concrete tests means the target stays fixed even when the agent's memory doesn't.

For hq, this meant having the LLM study [yq](https://github.com/mikefarah/yq) (a jq-like processor for YAML, written in Go), extract test patterns from its test suite, port them to hq's format, and add HUML-specific edge cases. The LLM did the tedious work. I steered with questions like "what operators are we missing?" and "what are the edge cases for null handling?"

The result was 511 test scenarios covering the full jq expression language. The LLM now has a concrete target: failing tests specifying exact behavior instead of my vague descriptions. "Done" becomes unambiguous. 100% pass rate means finished. And watching 47% become 56% become 68% keeps you motivated.

## The harness

The test harness does semantic comparison - parsing expected and actual values, then comparing the resulting structures rather than raw strings. `42` equals `42.0`, object key order doesn't matter, whitespace is irrelevant. This meant I could write expected values in whatever format was convenient (usually JSON, since it's familiar) while the actual output could be HUML.

Early on, when the agent was struggling with format comparison, I suggested using [koanf](https://github.com/knadh/koanf) since it handles multiple config formats. The agent implemented it in the initial harness. But as it debugged test failures and added HUML/YAML support, it ended up replacing koanf with explicit parsers (`encoding/json`, `yaml.v3`, `go-huml`). The tests didn't care *how* comparison worked, only that it worked. Fewer dependencies, same functionality.

This is what I mean by the test harness being self-correcting. My initial suggestion wasn't wrong, but it wasn't optimal either. The agent didn't need me to tell it "remove koanf" - the pressure of making 500+ tests pass drove it toward explicit, deterministic parsing. The plan defined what should happen; the tests validated it; implementation details followed.

Each test is a struct:

```go
type Scenario struct {
    Description   string
    Document      string   // Input - HUML, JSON, or YAML
    Expression    string   // The hq expression
    Expected      []string // Expected outputs
    ExpectedError string   // Or expected error
}
```

Adding a test is appending to a slice. No new test functions to write.

## Session 1: Planning (1.7 hours)

I asked the agent to clone go-huml, yq, and koanf repos for reference. Having the actual source code available meant the agent could study yq's architecture rather than guess at it. Then it interviewed me: "Should we support streaming input?" "What's the error behavior for type mismatches?" "Which operators are must-have vs nice-to-have?"

The interview forced me to make decisions I would have otherwise deferred. Streaming input? No, keep it simple. Error behavior? Match jq - return null for missing keys, error for type mismatches. These decisions went into the plan document, which meant the agent wouldn't need to ask again during implementation.

Based on my answers, it generated a spec document with tiered features and an implementation plan with 23 checkpoints. Each checkpoint specifies exact files to create, expected test count after completion, verification commands, and prerequisites. The checkpoint structure matters because it gives the agent clear stopping points and the verify agent clear criteria.

The critical section was "Anti-Patterns to Avoid":

```
1. Don't hardcode test results (e.g., if expr == "." return input)
2. Don't skip parsing (use string matching on raw expression)
3. Don't implement operators in test harness
4. Each operator must be a separate function
5. Parse ALL expressions through the parser
```

Without these, an LLM might notice that `.` always returns the input and hardcode that case. Or it might implement operators directly in the test harness rather than building a proper evaluator. These shortcuts would pass tests while producing unmaintainable code. Explicitly listing forbidden shortcuts prevents clever-but-wrong solutions. I discovered these anti-patterns from previous failed attempts - each one represents a way an LLM found to "cheat" the test suite.

The plan also included review criteria. This enables subagents to validate autonomously:

```
task({ subagent_type: "verify", prompt: "Check checkpoint 5. Criteria: ..." })
task({ subagent_type: "review", prompt: "Review evaluator.go changes..." })
```

These spawn Sonnet-based agents that run tests, check implementation against the plan, and report pass/fail. The orchestrator only proceeds if both gates pass. Verification runs in a separate agent, saving context window.

The gates caught a real bug before implementation even started. After creating all test scenarios, the review agent flagged: "~200 test scenarios use JSON format in Expected field instead of HUML format. Tests will fail validation even with correct implementation." I hadn't noticed. The agent created a spike program to understand go-huml's actual output format, documented the rules, and systematically corrected 370 test scenarios. No human review required - the gate found it, the agent fixed it.

By the end of Session 1: working test harness, 511 tests, detailed plan. No implementation code yet.

## Session 2: Implementation (4-5 hours active)

Before starting implementation, I had the agent create "skills" - reusable documentation files in the repo describing the hq architecture, development patterns from yq, and verification commands. Context windows are finite. After enough back-and-forth, the agent compacts earlier conversation to make room, and project-specific knowledge (architecture decisions, coding patterns, verification commands) gets lost. Skills persist in the repo, so they survive compaction. The agent instructions emphasize reloading relevant skills after compaction, so project knowledge persists even when conversation history doesn't. This turned out to be critical for multi-hour implementation runs.

This session started by loading the plan. The LLM read the checkpoint structure, understood where to begin, and started executing. No re-explanation needed - the plan document contained everything.

My prompts were sparse:
- "Continue implementation" → agent works through 40-60 actions
- "Continue until zero test failures" → high-level goal, agent figures out the path
- Check in, see progress at 68%, say "continue"

The "continue" prompts were mostly needed because current models tend to pause near the end of their context window, waiting for confirmation before auto-compacting (summarizing earlier conversation to free up space). I used these pauses productively. At one checkpoint I noticed the agent had prioritized JSON output over HUML. I steered: "Output should be HUML format, not JSON." The agent course-corrected and continued.

The LLM made architectural decisions autonomously. It chose a 3-stage parser (lexer → postfix → AST) based on studying yq's approach - this is the Shunting Yard algorithm for handling operator precedence, which I wouldn't have thought to specify. It decided how to handle null propagation (jq-style, where missing keys return null rather than error). When tests failed, it debugged and fixed without asking. The test harness gave it everything needed to work independently: clear expected behavior, immediate feedback, and no ambiguity about what "correct" means.

## The numbers

- Test scenarios: 511
- Implementation code: 6,278 lines
- Test code: 5,244 lines  
- User prompts: 58 total
- Autonomous stretches: 40-60 agent actions between prompts

Most of my time was watching progress bars, not typing instructions.

## Takeaways

**Plan the tests using the LLM and reference implementations.** yq's test suite was the source of truth for jq semantics. The LLM extracted and ported those patterns. This front-loads the hard work of specification into a phase where the LLM excels (reading and extracting) rather than the phase where it struggles (maintaining consistency over long implementation sessions).

**Write anti-patterns in your plan.** Explicitly list shortcuts the LLM shouldn't take. You'll discover new ones as you refine your workflow. Each anti-pattern represents a past failure mode - document them so the same mistakes don't repeat.

**Use quality gates between phases:**

```
Complete phase → verify (must pass) → review (must pass) → commit → next phase
```

**Gates catch things you miss.** The format bug wasn't something I would have spotted in a code review - 200 test files with JSON syntax where HUML was needed. The review agent found the pattern, the orchestrator fixed it systematically. Running verification in a separate agent session means fresh eyes on every check.

**Stay out of the loop, but watch for steering opportunities.** I wasn't reviewing code. I was watching progress, noticing when the agent struggled, and dropping hints. When format comparison was failing, I suggested koanf - the agent implemented it, then replaced it with something simpler as it worked through test failures. My suggestion unblocked progress; the tests refined the solution. You don't need to micromanage if you can see what's happening.

**Put detailed decisions in the plan file.** High-level goals go in prompts ("continue until tests pass"). The LLM can reference the plan; it can't reference what's in your head. Everything the agent needs to work independently should be written down.

**Create skills for context persistence.** Document architecture decisions, development patterns, and verification commands in skill files that reload after context compaction. Without this, long sessions lose project knowledge.

## Limitations

This worked well for hq because of specific properties of the problem: jq's behavior is well-documented, yq provided a reference implementation to study, behavior is deterministic (same input always produces same output), and the test format is simple (input, expression, expected output). These properties made it possible to front-load specification into test cases.

Where this approach might not work: UI-heavy applications where expected behavior is hard to specify as input/output pairs. Stateful systems where tests need complex setup/teardown. Exploratory work where you don't know what "done" looks like until you see it. Novel algorithms with no reference implementation to extract patterns from.

The core assumption is that you can front-load the specification work. For well-defined problems with existing references, that's often possible. For genuinely novel work, you might need a different pattern - perhaps one with more human involvement during implementation rather than just planning.

## The files

- Test harness: [pkg/eval/harness_test.go](https://github.com/rhnvrm/hq/blob/main/pkg/eval/harness_test.go) (253 lines)
- Test scenarios: [pkg/eval/tier1_*.go](https://github.com/rhnvrm/hq/tree/main/pkg/eval) (~5,000 lines of struct literals)
- Implementation: [pkg/eval/evaluator.go](https://github.com/rhnvrm/hq/blob/main/pkg/eval/evaluator.go) (2,565 lines)

---

hq is at [github.com/rhnvrm/hq](https://github.com/rhnvrm/hq).
