+++
title = "The Loop"
weight = 2
template = "pages-page.html"
draft = true

[extra]
section_title = "Harness Engineering"
+++

The real value of a harness isn't in any single session — it's in the feedback loop. Sessions generate knowledge. Knowledge improves future sessions. Better sessions generate richer knowledge.

## Sessions → Knowledge → Better Sessions

Every coding session with an agent produces artifacts: code changes, commit messages, session logs, handoff documents. A good harness captures these and makes them searchable.

The loop looks like this:

1. **Session**: Agent works on a task, guided by skills and context
2. **Capture**: Session logs, diffs, and handoffs are saved as structured markdown
3. **Index**: A daemon processes these into searchable memory
4. **Recall**: Future sessions pull relevant context from memory
5. **Improve**: Each cycle refines the skills and patterns available

*Detailed examples from bosun's daemon and memory systems coming soon.*
