+++
title = "qemu-startup"
weight = 13
template = "pages-page.html"
date = 2026-03-29
draft = false

[extra]
section_title = "Harness Engineering"
+++


I like pairing this task with [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) because they look similar from far away and teach opposite lessons.

In both cases, the model has to boot Alpine under QEMU and prove a readiness condition. But `qemu-startup` is the version where weaver actually earns its keep. The target is narrower, the success condition is cleaner, and one early checkpoint is enough to keep the session from turning into a swamp.

| Variant | Result | Time | Cost |
|---|---:|---:|---:|
| Plain | pass | 730s | $0.5641 |
| Weaver | pass | 373s | $0.1736 |

**Category**: system-administration  
**Difficulty**: medium  
**Verdict**: weaver-helps

## What the task actually asked
Boot `alpine.iso` so that:

```bash
telnet 127.0.0.1 6665
```

lands on the VM's serial console and shows the Alpine login prompt. Leave QEMU running in the background and don't declare victory until the prompt is actually live.

This is a great benchmark shape because it's not enough to "start QEMU." You have to start the *right* QEMU with the *right* boot artifacts and then wait for observable readiness.

## What plain pi did
Plain pi took the scenic route.

It started by exploring the ISO, installing tooling, inspecting directory layouts, and manually extracting kernel, initramfs, and microcode blobs. None of that was unreasonable. The session looked competent.

Then it launched QEMU and waited for the login prompt.

Nothing.

At that point the run entered the classic boot-debugging spiral:

- checking raw telnet output
- testing whether the VM was still doing CPU work
- waiting longer
- probing whether the port was alive
- reconnecting with telnet and expect
- trying to infer whether the guest was merely slow

Eventually it did something that saved the run: it turned on serial logging. That exposed the real failure, a kernel panic about not being able to mount the root filesystem.

And that, in turn, led to the actual root cause: the session had extracted the wrong blob. It used the sector for `MODLOOP` instead of `INITRAMFS_LTS`.

Once that was corrected, everything got boring again. Rebuild initrd, relaunch QEMU, wait for Alpine, see login prompt.

The run passed, but it paid for one wrong assumption with a huge amount of boot-time uncertainty.

## What weaver did
Weaver felt more grounded almost immediately.

It checkpointed the actual success condition up front: not "start something," but "make telnet to 6665 reach a live login prompt." Then it inspected the ISO properly, installed `isoinfo`, read `syslinux.cfg`, and extracted the exact files referenced by the bootloader config.

That's the move I keep circling in these traces: reading the machine's own instructions instead of reverse-engineering from vibes.

Because it pulled the right kernel, the right initramfs, and the microcode images directly by path, it skipped the plain run's biggest mistake entirely. Then it combined the initramfs blobs, launched QEMU, and waited for the serial console to come up.

There was still a moment of confusion when raw `nc` output looked like telnet negotiation garbage. But instead of escalating into a deep debug branch, the run adjusted interpretation: connect with telnet, send a newline, observe the prompt.

That was enough. QEMU stayed running, the login prompt appeared, and the task ended with `done`.

No drama. Which, in infra work, is the point.

## The real divergence
The plain and weaver runs were both capable. The difference is that plain pi made one expensive extraction error early and then had to fight its way back to certainty. Weaver didn't become more technically powerful; it just preserved a better order of operations.

That matters a lot in boot tasks.

If the machine's own config tells you what to boot, and you still choose to infer it indirectly, you're paying voluntary tuition. Sometimes that tuition teaches you something useful. Sometimes it just wastes seven minutes.

Here, the checkpoint helped because it kept the success condition concrete enough that the run naturally gravitated toward the shortest chain of verifiable facts:

1. inspect boot config
2. extract what boot config names
3. boot it
4. verify prompt

That's the kind of task shape where weaver shines.

## Token economics
The numbers make the same argument, just with less poetry.

| Variant | Turns | Tool calls | Notable tools | Output tokens | Cache read | Cache write | Cost |
|---|---:|---:|---|---:|---:|---:|---:|
| Plain | 45 | 47 | `bash:47` | 17,104 | 594,011 | 34,439 | $0.5641 |
| Weaver | 20 | 19 | `checkpoint:1`, `bash:17`, `done:1` | 5,185 | 154,500 | 13,182 | $0.1736 |

Both passed. Weaver finished in roughly half the time and at roughly one-third the cost.

That's what useful overhead looks like.

## What this taught me
I don't think weaver is "best on systems tasks" in some broad sense. [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md) is the counterexample. But it is very good when the task is serial, inspectable, and has a crisp readiness condition.

This one is a nice example of the value being in [the loop](@/pages/harness-engineering/thesis/the-loop.md). The checkpoint didn't add capability. It kept the session pointed at the machine's own source of truth long enough to avoid a really expensive wrong turn.

And that's enough. A lot of the time, enough is all you need.
