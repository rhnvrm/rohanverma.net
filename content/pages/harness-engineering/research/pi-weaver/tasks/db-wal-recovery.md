+++
title = "db-wal-recovery"
weight = 1
template = "pages-page.html"
date = 2026-03-29
draft = false

[extra]
section_title = "Harness Engineering"
+++


I like this task because it makes the difference between *searching harder* and *thinking better* painfully obvious.

On paper, plain pi and pi+weaver are both looking at the same broken SQLite setup: a base database with 5 rows, a WAL that should contain the rest, and a hard requirement to recover all 11 records into JSON. In practice, they tell two completely different stories.

Plain pi spent fifteen minutes acting like the data had fallen out of the world. Weaver treated the WAL like a local puzzle. That's the whole page.

| Variant | Result | Time | Cost |
|---|---:|---:|---:|
| Plain | fail | 901s | $1.3216 |
| Weaver | pass | 84s | $0.1440 |

**Category**: file-operations  
**Difficulty**: medium  
**Verdict**: weaver-helps

## What the task actually asked
The prompt is simple: there's a SQLite database in `/app/`, the WAL is corrupted or encoded, and SQLite only shows the base 5 records instead of the full 11. Fix the WAL, recover everything, and write `/app/recovered.json` as a sorted JSON array.

That simplicity matters, because the winning move is to stay local. No archaeology. No host spelunking. No "maybe there's a backup somewhere." Just: what happened to this WAL?

## What plain pi did
The first few moves were good. Plain pi listed `/app`, dumped the database and WAL, ran `sqlite3`, verified that the main DB only had 5 visible rows, and looked at the bytes with `xxd`.

Then it lost the plot.

Instead of asking "what transformation made this WAL unreadable?", it asked "where else might the missing data exist?" That question sent it into a maze:

- searching for other `main.db*` files
- scanning `/proc/*/fd`
- probing mounts and filesystem types
- checking for snapshots
- trying `btrfs` tooling
- inspecting capabilities
- attempting raw-device and `/proc/kcore` access
- poking at Docker-ish host paths through bind mounts

That's not stubbornness. It's a worldview error. The session starts treating the problem like disaster recovery on a host, when the task is really byte-level repair on one file.

The most expensive sessions are usually the ones with the wrong mental model plus enough competence to execute it for a long time. That's what happened here.

## What weaver did
Weaver opened with a checkpoint, which sounds trivial until you look at what happened next. The run immediately stayed anchored to the object that mattered: `/app/main.db-wal`.

It inspected the DB and WAL bytes, then ran a tiny Python check against the WAL header. That was the hinge. The bytes didn't look randomly damaged. They looked systematically transformed.

So it tested a cheap hypothesis: XOR with `0x42`.

That worked.

From there the session was gloriously boring:

1. decode the WAL
2. copy the DB and repaired WAL into `/tmp`
3. let SQLite replay the WAL
4. extract all 11 rows
5. write `/app/recovered.json`
6. call `done`

That's it. Seven bash commands. No heroics.

The split is simple: plain pi went looking for hidden worlds; weaver asked whether the file in front of it was lying in a reversible way.

## The real divergence
I don't think checkpointing "solved" this task. That's too magical.

What it did was cheaper and, honestly, more believable: it nudged the model into writing down a compact plan before wandering. Once the run frames the task as *fix WAL → replay WAL → export rows*, a lot of seductive nonsense falls away.

That's the value here. Not intelligence out of nowhere. Constraint.

Or, put another way: the checkpoint didn't make the model smarter. It made drift more expensive.

## Token economics
The economics tell the same story the trace does.

| Variant | Turns | Tool calls | Notable tools | Output tokens | Cache read | Cache write | Cost |
|---|---:|---:|---|---:|---:|---:|---:|
| Plain | 44 | 70 | `bash:70` | 48,425 | 1,187,768 | 63,656 | $1.3216 |
| Weaver | 10 | 9 | `checkpoint:1`, `bash:7`, `done:1` | 4,841 | 76,983 | 12,858 | $0.1440 |

This is one of the cleanest "tuition, not overhead" examples in the whole set.

Plain pi paid tuition for a wrong idea. A lot of it. Weaver paid a tiny bit of overhead up front and then avoided the expensive branch entirely.

## What this taught me
This task made me more bullish on weaver for one specific class of problems: tasks where the truth is local, but the environment offers infinite fake depth.

If the solution is sitting inside a single malformed artifact, the worst possible outcome is a model that keeps escalating scope because escalation *feels* like progress. Weaver helped because it kept the loop short enough to ask: are we still solving the file, or are we writing fan fiction about the filesystem?

That same pattern shows up again in [password-recovery](@/pages/harness-engineering/research/pi-weaver/tasks/password-recovery.md), where the danger is forensic overreach, and in reverse in [qemu-alpine-ssh](@/pages/harness-engineering/research/pi-weaver/tasks/qemu-alpine-ssh.md), where extra meta-control just makes the session more complicated than it needs to be.

The value isn't in any single checkpoint. It's in the loop. Here, that loop kept the session honest.
