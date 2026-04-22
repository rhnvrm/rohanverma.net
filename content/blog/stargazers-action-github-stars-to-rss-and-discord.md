+++
title = "Building stargazers-action"
description = "What began as a feed question turned into a GitHub Action, two live site integrations, Discord notifications, docs, and a lot of useful follow-through."
date = "2026-04-22T02:30:00+05:30"
draft = false
path = "blog/2026/04/22/building-stargazers-action/"

[taxonomies]
  tags = ["github", "github-actions", "typescript", "rss", "discord", "automation"]
  categories = ["engineering"]

[extra]
  author = "rhnvrm"
  og_image = "/images/blog/stargazers-action/header-automation-pipeline.jpg"
+++

![Retro-tech illustration of GitHub stars flowing through an automation engine into RSS and Discord alerts](/images/blog/stargazers-action/header-automation-pipeline.jpg)

I started this with a much smaller question:

*does GitHub expose a feed for people starring any of my repos?*

It does not.

That should probably have been the end of it. Instead, over the rest of one long working session, that one question turned into a proper little build story: a new repo, a reusable GitHub Action, two live site integrations, Discord notifications, docs on GitHub Pages, a project page, and the cleanup work that made it feel finished instead of merely working.

The finished project is [`stargazers-action`](https://github.com/oddship/stargazers-action), and I use it here:

- [oddship.net/signals](https://oddship.net/signals/)
- [rohanverma.net/stars](https://rohanverma.net/stars/)

## It started as “does this exist?”

The first stretch of that session was mostly me ruling out easier answers.

A few constraints showed up quickly:

- GitHub has no first-party account-wide incoming-stars feed.
- `https://github.com/<username>.atom` is your own public activity feed, not a feed of other people starring your repos.
- For public repos, polling without auth is possible in theory, but it gets ugly fast once you have more than a few repos or want reliable scheduled generation.
- If I wanted one account-wide stream, I was going to have to aggregate it myself.

At that point I still thought this might stay small. Maybe it was just a static-site trick: fetch stars during a build, emit a feed, render a page.

A lot of the early questions were very Zola-shaped too. What would this look like in Zola? What would GitHub Actions need? Could I load generated JSON cleanly at build time?

Those questions turned out to matter because this thing never stayed “just a script.” It had to fit real site builds almost immediately.

## Two sites forced the right boundary

As soon as both consumer sites were in scope, the boundary got much clearer:

- `oddship.net` is Astro
- `rohanverma.net` is Zola

Once both were on the table, the most important design choice was obvious. The shared part should not know anything about page rendering.

It should only:

1. discover repos
2. fetch recent stargazer events
3. normalize them into one schema
4. write machine-friendly artifacts

Then each site could keep its own markup, styling, and voice.

That generation and presentation split held up for the rest of the session. In hindsight, it was probably the best call in the whole project.

That is why the action writes JSON + RSS instead of trying to become a site framework. Astro reads generated JSON from its own workspace path. Zola reads generated JSON with `load_data()`. Both sites stay in charge of how the page actually looks.

## The repo shape changed while planning

Even the packaging moved around for a while.

At one point this looked more like a reusable workflow, or maybe a thin composite action wrapper in the style of some of my other GitHub automation. Then I sat with the tradeoffs a bit longer.

This thing needed to:

- call GitHub APIs
- parse config cleanly
- normalize and merge results
- render feed output
- write files into `GITHUB_WORKSPACE` for later build steps

That pushed me away from “workflow snippet” and toward a JavaScript action with actual shared logic behind it.

I also did the predictable “should this just be Go?” detour. TypeScript won because the main surface area was a GitHub Action and the code wanted to live comfortably inside that runtime.

That was the point where it stopped being “a script I’ll tuck into one repo” and became `oddship/stargazers-action`.

The first shipped version stayed narrow on purpose:

- config loading + validation
- repo discovery
- stargazer fetches
- normalization
- JSON output
- RSS output

The current implementation uses token-backed GraphQL to discover public repos for an owner and fetch recent stargazers per repo. In practice, the flow is:

1. discover public repos through `repositoryOwner { repositories(...) }`
2. filter by owner config (`include_forks`, `include_archived`, and repo lists when used)
3. fetch recent stars per repo with `stargazers(last: per_repo_limit)`
4. merge everything into one stream
5. sort by `starredAt`
6. truncate to the requested recent window

One detail pulled more weight than I expected: the stable event id.

```
{repo.nameWithOwner}:{user.login}:{starredAt}
```

That id ended up doing three jobs at once: RSS GUIDs, state dedupe, and Discord diffing.

## First deploys, first live fixes

The nice part was that the repo did not sit around waiting for a use case. I put it to work immediately.

In that same stretch of work:

- `oddship.net` got a `/signals/` page and feed
- `rohanverma.net` got a `/stars/` page and feed

That turned the middle of the session into the only feedback loop that really matters:

- push changes
- watch pipelines
- open the live site
- fix what broke
- repeat

One of those failures was especially useful.

The first oddship rollout produced an empty page. The generator was fine. The actual problem was that the Astro page was resolving the generated JSON from the wrong place during the build. The fix was to resolve it from the real workspace root the build was using, not from a path that only looked right from the source file’s point of view.

I like bugs like that. In this case it was also a nice reminder of what a good agent setup buys you: the intent was clear, the project skills were loaded, the feedback loop was tight, and the agent was able to recover, fix the path bug, and keep going.

Another practical detail from those integrations: the generated JSON and RSS files are ignored by Git, but the site builds still need them in the checked-out workspace. So the consumer workflows stage the generated outputs explicitly before the site build.

## Then the project widened

If I had stopped there, `stargazers-action` would have been a neat little JSON+RSS generator.

But the next question was better: could this also send Discord notifications, and if so, how do reruns avoid turning into spam?

Once I asked that, the scope changed.

Now the project had to answer not just “what are the latest stars?” but also:

- what counts as a new event?
- what if a baseline already exists?
- what if a run fails halfway through delivery?
- what if somebody wants Discord without caring about site generation at all?

That is what pushed the repo beyond the original action-only shape.

By the end of the session it had three usable surfaces:

1. GitHub Action
2. CLI
3. repo-local library surface

That was not some grand product roadmap. It was just where the work naturally went. Once Discord entered the picture, it was obvious the core logic needed to be reusable outside one exact site-build workflow.

## Discord turned it into a state problem

Sending a webhook is easy.

Not spamming people is the hard part.

The real question was simple: **how do I know whether a star is actually new without resending old ones on every run?**

The answer ended up being diff-based notification.

A run fetches the current snapshot, compares it against previously seen event ids, and only emits unseen events.

The baseline can come from three backends:

- `file`
- `feed-url`
- `github-branch`

Each one exists for a reason:

- `file` is good for local scripts and cron jobs.
- `feed-url` is useful when a site already publishes the feed and you want a read-only post-deploy baseline.
- `github-branch` is the durable option for GitHub Action users who want Discord notifications even without a site feed.

I mostly think of `feed-url` as a post-deploy baseline, not a durable source of truth. If you rerun before the live feed advances, duplicates are still possible. That is fine as long as you treat it as that kind of baseline.

For writable backends (`file`, `github-branch`), the project does something more careful:

1. load seen state
2. compute new events by stable id
3. write a `pending` batch
4. send Discord messages
5. finalize state only after successful delivery

If a run dies in between, the next run refuses to guess.

That one choice cuts off the ugliest failure mode: duplicate sends after partial delivery.

There is also bounded retention. The state file is not meant to become a forever archive. It only needs enough memory to answer one practical question: *have I already seen this event id?*

So the seen-id list is capped by `state_max_entries`:

- default: `500`
- maximum: `5000`

That ended up being important enough to clean up in the docs later in the session.

## Smoke tests made it real

I did not want this to be one of those features that looks complete in a README and then falls apart on first contact.

So I ran the Discord path against a real webhook, verified that it worked, and then wired the same pattern into the live site deploy workflows.

At that point the deployment shape got pleasantly boring:

- generate JSON + RSS for the site
- publish the site
- wait for the live feed to actually roll out
- then run Discord notification mode against state

That separation helped a lot. Generation and notification stayed related, but they did not have to be the same step or even the same failure domain.

## The boring operational work mattered

A lot of the value in this session came from follow-through work that is easy to skip.

One example: after the first round of shipping, a Node 20 deprecation warning showed up in GitHub Actions. So the action runtime moved to Node 24, CI moved with it, and both consumer workflows were repinned to the new immutable action SHA.

Not glamorous, but that is part of the job. A GitHub Action is not done when the happy path works. You also have to keep the runtime current and keep the consumers in sync.

Another useful cleanup came later, after testing `repo_include` and `repo_exclude` in practice. For both sites, I eventually broadened the configs back out to owner-wide public repo discovery while still excluding forks and archived repos. After watching the feature run live, that felt like the right default.

## Docs, GitHub Pages, project page, cleanup

Once the core logic and integrations were solid, the work shifted from implementation to packaging.

That produced four pieces of follow-through I’m glad I did in the same session:

- a docs site for [`stargazers-action`](https://oddship.github.io/stargazers-action/)
- GitHub Pages deployment for those docs via the [`moat` docs workflow](https://github.com/oddship/moat)
- concrete Astro and Zola integration guides
- a `stargazers-action` project page on `rohanverma.net`

I like when a project gets all the way to “someone else could use this tomorrow” in the same sitting. This one got there.

The project started as a question asked during one long working session. By the end, it had:

- a reusable repo
- two live consumers
- docs that explain the integration patterns
- a project page on my own site
- cleanup that clarified the operational edges

Even the late docs cleanup around `state_max_entries` came from a very real question: *will `state.json` just keep growing forever?* That is exactly the kind of documentation improvement worth making after real use.

## What shipped by the end

By the time I stopped, the result was more than the original question suggested.

It was not just “an RSS feed for when people star my repos.” It was:

- a GitHub Action for generating stargazer JSON + RSS
- a CLI and library surface for the same core logic
- live integrations on `oddship.net` and `rohanverma.net`
- optional Discord notifications with diff-based state
- Node 24-compatible action/runtime wiring
- a docs site with Astro and Zola examples
- a project page and cleanup follow-through

What I thought I needed was a feed.

What I ended up building was a small reusable pipeline for discovery, publication, and notification.

That is also why this felt worth writing up. To me, it is a concrete [harness engineering](@/pages/harness-engineering/_index.md) example: start with a small intent, give the agent the right [skills](@/pages/harness-engineering/skills/skills.md), keep the work inside a [review loop](@/pages/harness-engineering/feedback/the-review-loop.md), and one long working session can produce not just a patch, but reusable software, docs, live integrations, and a write-up you can share. If you want the more abstract version of that pattern, I wrote that up separately in [A Worked Example](@/pages/harness-engineering/in-practice/a-worked-example.md).

## Links

- Docs: <https://oddship.github.io/stargazers-action/>
- Source: <https://github.com/oddship/stargazers-action>
- `oddship.net` live page: <https://oddship.net/signals/>
- `rohanverma.net` live page: <https://rohanverma.net/stars/>
- Project page on this site: [/pages/projects/stargazers-action/](/pages/projects/stargazers-action/)
