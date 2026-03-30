+++
title = "Forgetting Is the Norm"
weight = 5
template = "pages-page.html"
date = 2024-10-02
draft = false

[extra]
section_title = "Mental Models"
+++

Ref: [Dr. Charan Ranganath: How to Improve Memory & Focus Using Science Protocols - Huberman Lab](https://www.hubermanlab.com/episode/dr-charan-ranganath-how-to-improve-memory-focus-using-science-protocols)

> Based on the discussion in the podcast, Dr. Ranganath emphasizes that forgetting is indeed the norm for human memory, rather than the exception. Here are some key points he makes about forgetting:
>
> 1. Ebbinghaus's early research on memory: Within 20 minutes of memorizing nonsense syllables, Ebbinghaus had forgotten about half of what he memorized. After 24 hours, he had lost 2/3 of what he had memorized.
> 2. Most details are lost: Dr. Ranganath states "the details we lose most of them most of the details of your life will be gone."
> 3. This applies broadly: He suggests this is true for everyone who's been studied, even those with highly superior autobiographical memory.
> 4. Rapid forgetting: The brain loses a significant amount of information very quickly after an experience.
> 5. Gist vs details: While we may retain the general gist or big picture of experiences, the specific details are often lost.
> 6. Adaptive function: Dr. Ranganath frames this as an important question: given how much we forget, "why do we remember in the first place?" This suggests forgetting may serve an adaptive purpose.
> 7. Intention matters: Because forgetting is so common, he emphasizes the importance of intentionality in memory, actively deciding what we want to remember and taking steps to reinforce those memories.
> 8. Reframing the question: Rather than asking why we're so forgetful, he suggests we should ask why we remember anything at all, given how prone we are to forgetting.

→ [Wikipedia: Forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve)

---

## The LLM parallel

LLMs have the same problem but worse. Every session starts from zero. No memory of what happened yesterday, what decisions were made, what failed. Context windows are the equivalent of short-term memory, and they evict everything when the session ends.

This is exactly why I built [session summarization](@/pages/harness-engineering/feedback/session-summarization.md) and [chronicles](@/pages/harness-engineering/feedback/chronicles.md). The daemon watches sessions and extracts what matters before it's gone. [Handoffs](@/pages/harness-engineering/feedback/handoffs.md) are intentional memory. Point 7 above, applied to agents. You decide what the next session needs to know and write it down explicitly.

The Ebbinghaus curve applies to agent sessions too. Without summarization, a 200-message session becomes noise within hours. With it, the key decisions and outcomes survive indefinitely. The harness is, in a sense, a system for fighting the forgetting curve on behalf of agents that can't fight it themselves.
