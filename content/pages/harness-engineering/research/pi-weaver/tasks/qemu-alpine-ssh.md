+++
title = "qemu-alpine-ssh"
weight = 12
template = "pages-page.html"
date = 2026-03-29
draft = true

[extra]
section_title = "Harness Engineering"
+++

# qemu-alpine-ssh

This is the task I keep coming back to when someone assumes more scaffolding always means better outcomes.

It doesn't.

Sometimes the shortest path is to keep one fragile, half-working control loop alive long enough to notice the one boring thing that's actually broken. That's what plain pi did here. Weaver, by contrast, got increasingly sophisticated about managing the session and never quite landed the decisive systems insight.

| Variant | Result | Time | Cost |
|---|---:|---:|---:|
| Plain | pass | 543s | $0.2827 |
| Weaver | fail | 900s | $0.6164 |

**Category**: system-administration  
**Difficulty**: medium  
**Verdict**: weaver-hurts

## What the task actually asked
Boot `/app/alpine.iso` in QEMU, start an SSH server inside the Alpine guest, and leave the machine in a state where this works:

```bash
ssh -p 2222 root@localhost
```

with password `password123`.

That sounds like a QEMU task, but it's really a layered-debugging task. Boot path, serial control, in-guest setup, guest network state, host port forwarding, host-side SSH validation — any one of those can be the thing that fails.

## What plain pi did
Plain pi made an early architectural choice that turned out to be exactly right: boot QEMU in the background with `2222 -> 22` forwarding, then automate the guest over a serial console exposed via a Unix socket.

That choice bought it a stable control loop.

The first expect script wasn't perfect. It booted Alpine, logged in, started moving toward `sshd`, and then ran into a smaller snag around `ssh-keygen`/environment assumptions. But the key thing is that the run didn't panic and redesign the whole setup. It kept the same basic architecture and iterated.

That's the part I trust in traces: not perfection, but continuity.

The turning point came late and it was completely unglamorous: plain pi realized that `sshd` was running inside the guest, but the guest network interface `eth0` was down. No interface, no DHCP, no usable forwarded connection.

So it brought `eth0` up, got an address (`10.0.2.15`), re-tested host-side SSH, and the task snapped into place.

That's a very sysadmin kind of win. No grand theory. Just: the machine is up, the daemon is up, but the interface is down.

## What weaver did
Weaver started the way I would have hoped: checkpoint, orient, inspect environment. Then it used `time_lapse` to reflect on the plan.

And then it started building session machinery.

The first big move was a large expect script that tried to do too much in one shot: boot QEMU, control Alpine, configure SSH, and keep the process alive in the background. That failed for process-model reasons — `interact`, detached execution, PTY assumptions, all the messy stuff you only notice after your "clever" wrapper breaks.

To its credit, the run *noticed* that. A `time_lapse` explicitly recognized the backgrounding issue and pivoted to detached `tmux` sessions. But that just moved the complexity around.

From there the session did a lot of real work:

- rewrote `/app/setup_ssh.exp` multiple times
- launched and killed detached tmux sessions
- waited on sentinel files
- tailed setup logs
- got Alpine booted successfully
- got `sshd` running inside the guest
- repeatedly tested host-side SSH

That sounds close to success, because it was. But the session got trapped in orchestration debugging. It kept getting better at running the experiment without resolving the actual networking issue.

Six `time_lapse` calls later, it still hadn't found the plain run's decisive observation: the guest interface itself needed to be brought up.

That's what makes this result so instructive. Weaver didn't fail because it was clueless. It failed because it was *too organized around the wrong bottleneck*.

## The real divergence
The plain run debugged the machine. The weaver run debugged the wrapper around the machine.

That distinction matters.

When I say weaver hurts here, I don't mean checkpoints are bad. I mean they can create a subtle temptation: if the session feels messy, improve the orchestration. But sometimes messy is just what it looks like right before you find the concrete systems bug.

This task needed less session design and more stubborn attention to the guest's network state.

The value isn't in any single agent session. It's in [the loop](@/pages/harness-engineering/the-loop.md). Here, the weaver loop kept folding back into meta-control instead of forcing a simpler question: *is the guest actually online?*

## Token economics
And yes, the economics punish that drift.

| Variant | Turns | Tool calls | Notable tools | Output tokens | Cache read | Cache write | Cost |
|---|---:|---:|---|---:|---:|---:|---:|
| Plain | 35 | 34 | `bash:27`, `write:7` | 9,131 | 286,856 | 15,897 | $0.2827 |
| Weaver | 44 | 44 | `checkpoint:3`, `bash:29`, `time_lapse:6`, `write:6` | 20,349 | 584,296 | 36,175 | $0.6164 |

Weaver cost more than 2x as much and still timed out.

That's not overhead. That's misallocated attention.

## What this taught me
This page is the counterweight to [db-wal-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/db-wal-recovery.md) and [qemu-startup](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-startup.md).

On those tasks, weaver helped compress the search space. On this one, it expanded the amount of session infrastructure between the model and the machine.

My takeaway is pretty specific: weaver is worst when the system is already stateful and fragile, and the right move is to preserve one working foothold rather than re-architect the interaction loop. If you're one observation away from the fix, more meta-control can be a tax.

[Tuition, not overhead.](@/pages/harness-engineering/the-economics.md) That framing matters.

Plain pi paid less tuition here because it stayed close to the guest and kept asking host/guest questions until the answer was boring enough to be true.
