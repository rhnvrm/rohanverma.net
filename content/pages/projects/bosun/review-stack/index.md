+++
title = "bosun review stack: browser, annotations, and diff rounds"
description = "How bosun's browser-facing review tooling is evolving: cdp-browser, annotation bridge, diff-review sessions, and markdown plan review."
template = "projects-page.html"
date = 2026-04-14
weight = 2

[extra]
github_url = "https://github.com/oddship/bosun"
+++

This is a working note on the review stack I’m building around bosun.

The short version: I don’t want review to be “look at diff in one place, paste comments in another, then manually reconstruct what changed.” I want review to stay in one loop: browser context + structured feedback + agent responses + rerounds.

## What already exists

### 1) CDP browser skill

[`cdp-browser`](https://github.com/oddship/bosun/tree/main/packages/pi-cdp/skills/cdp-browser) is the base layer: browser automation and visual review over Chrome DevTools Protocol.

It handles page automation, screenshots, console/network checks, viewport emulation, and scripted visual review runs. This is the operational substrate for everything else in this stack.

### 2) Browser annotation bridge

[`cdp-browser-mesh`](https://github.com/oddship/bosun/tree/main/packages/pi-cdp/skills/cdp-browser-mesh) is the current annotation system in production use.

Flow today:
- select text in the browser,
- attach a comment,
- send it to a target mesh agent,
- receive agent responses back as browser toasts.

Each annotation is persisted with screenshot + structured context under:

`workspace/scratch/annotations/{domain}/{YYYY-MM-DD}/{HH-mm}.json(.png)`

That persistence layer is why browser feedback is usable as an iterative development loop, not just ephemeral chat.

## What’s being added now: diff review sessions

A new skill, [`cdp-browser-diff-review`](https://github.com/oddship/bosun/tree/main/packages/pi-cdp/skills/cdp-browser-diff-review), is the next layer.

The product direction (from April 2026 planning/implementation sessions):
- snapshot-backed, immutable review rounds,
- delta-first rerounds (show what changed since last review by default),
- persistent threads across rounds,
- local-first event/state persistence under `workspace/scratch/diff-reviews/<session-id>/`,
- session-scoped bridge/window model so parallel reviews don’t collide.

This keeps v1 tightly scoped to **diff review**. Not generic code review yet.

## Now shipped: browser markdown plan reviewer

Plan review is now a first-class browser workflow in bosun (landed in commit `9874161`).

Current capabilities:
- render markdown plans into a readable review surface,
- attach inline anchored comments to specific plan ranges,
- run rerounds with delta-first change visibility,
- persist local session state for review continuity,
- deliver structured review results back over mesh.

So review is no longer only “is the code diff okay?” It also supports “is the plan coherent before we execute it?” using the same review loop primitives.

## Why this direction

bosun already had the building blocks (CDP + mesh + session artifacts). The goal is composing them into a review product where context doesn’t reset every turn.

At this point, reviewing code and reviewing plans are two views over the same core loop:
- structured reviewer intent,
- durable state,
- agent action,
- explicit reround.

Related reading: [Browser in the Loop](/pages/harness-engineering/feedback/browser-in-the-loop/).