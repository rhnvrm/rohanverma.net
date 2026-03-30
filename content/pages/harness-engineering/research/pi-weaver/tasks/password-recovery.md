+++
title = "password-recovery"
weight = 14
template = "pages-page.html"
date = 2026-03-29
draft = false

[extra]
section_title = "Harness Engineering"
+++


This one is my favorite example of weaver helping without doing anything flashy.

Nobody found a magical hidden tool. Nobody invented a novel forensic method. Both variants eventually recovered the same password from the same evidence. The difference is that one session kept reopening the search space, while the other decided, correctly, that it already knew enough.

That distinction matters more than it sounds.

| Variant | Result | Time | Cost |
|---|---:|---:|---:|
| Plain | pass | 482s | $1.1902 |
| Weaver | pass | 294s | $0.4541 |

**Category**: security  
**Difficulty**: hard  
**Verdict**: weaver-helps

## What the task actually asked
Recover the password from a deleted `launchcode.txt` somewhere under `/app`, then write candidates to `/app/recovered_passwords.txt` one per line. The true password is tightly constrained:

- exactly 23 characters
- starts with `8XD`
- ends with `W54`
- only uppercase letters and digits

That's a gift. Constraints like that should collapse the search space quickly if the model trusts the evidence.

## What plain pi did
Plain pi started strong.

It enumerated `/app/varsea`, searched obvious files, looked through logs, and quickly found that the interesting object was `ae3f4c.dat`. That file contained tantalizing fragments around `PASSWORD=`, `launchcode.txt`, and the eventual `W54` suffix.

At that point the run had the makings of the solution. But instead of tightening its grip, it broadened the investigation.

It treated `ae3f4c.dat` as potentially:

- a ZIP archive
- a disk image
- an encrypted blob
- a recoverable filesystem
- a partitioned container
- a sleuthkit target

So it did what competent forensic tooling invites you to do: `unzip`, `fsstat`, `fls`, `mmls`, `tsk_recover`, magic-byte scans, offset arithmetic, and more offset arithmetic.

I don't mean that as an insult. This is exactly what a capable model does when it senses structure and refuses to stop too early.

But eventually the answer came from something much smaller than the search space it had constructed. The session found one fragment after `PASSWORD=` (`8XDP5Q2RT9Z`) and another fragment near the ZIP central directory (`K7VB3BV4WW54`). Put together, they formed a 23-character candidate that matched the prompt constraints.

Then it did one thing I really liked: it validated the reconstruction against the ZIP CRC-32. That's the moment the session stopped guessing and started *knowing*.

## What weaver did
Weaver started with a checkpoint that pinned down the output format and constraints. That may sound like admin, but here it mattered.

The run looked at the same environment, found the same `ae3f4c.dat`, and pulled on the same evidence threads. But the checkpoint seemed to keep the session honest about what counted as "enough."

It still explored a little. It checked whether the blob was ZIP-like, examined offsets, looked at raw bytes around `PASSWORD=` and around the `W54` tail, and verified that the reconstructed string satisfied the length/format conditions.

The difference is that it didn't keep demanding a total theory of the artifact before acting.

That's what I mean when I say [the split is simple](@/pages/harness-engineering/thesis/the-boring-stuff.md): the agent does the boring stuff, I do the hard stuff. Here the hard part wasn't more tooling. It was deciding when the evidence had crossed the threshold from suggestive to sufficient.

Weaver crossed that threshold earlier.

## The real divergence
Both runs touched the same truth. The divergence was epistemic style.

Plain pi kept reopening the case even after the case was basically solved. Weaver was more willing to say: I don't need to fully explain the container; I need to recover the password correctly and defend that reconstruction.

That's a subtle but important kind of value.

In forensic-feeling tasks, there's always a temptation to keep digging because the artifact hints at one more layer of hidden structure. Sometimes that's necessary. Sometimes it's just [tuition](@/pages/harness-engineering/economics/the-economics.md).

Weaver paid less tuition because it had a tighter loop between evidence and completion.

## Token economics
The economics here are almost a morality tale about search-space discipline.

| Variant | Turns | Tool calls | Notable tools | Output tokens | Cache read | Cache write | Cost |
|---|---:|---:|---|---:|---:|---:|---:|
| Plain | 66 | 76 | `bash:75`, `write:1` | 25,724 | 2,026,132 | 52,358 | $1.1902 |
| Weaver | 29 | 34 | `checkpoint:1`, `bash:31`, `write:1`, `done:1` | 14,746 | 408,879 | 29,375 | $0.4541 |

Weaver was about 1.6x faster and about 2.6x cheaper.

That's not because it discovered something plain pi couldn't. It's because it stopped paying for increasingly ornate explanations once the answer was already in hand.

## What this taught me
This task sits in the same family as [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md): the environment offers lots of plausible depth, but the actual win comes from staying close to the artifact and resisting the urge to make the whole world legible before finishing.

That's the weaver pattern I trust most. Not synthetic brilliance. Just a better loop around "what do I already know, and is it enough to ship?"

The value isn't in any single agent session. It's in [the loop](@/pages/harness-engineering/thesis/the-loop.md). On this task, the loop shortened the distance between evidence and conviction.
