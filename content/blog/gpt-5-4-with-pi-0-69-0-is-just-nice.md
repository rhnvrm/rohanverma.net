+++
title = "GPT-5.4 with Pi 0.69.0 is just nice"
date = "2026-07-10T19:00:00+05:30"
draft = false
path = "blog/2026/07/10/gpt-5-4-with-pi-0-69-0-is-just-nice/"

[taxonomies]
  categories = ["AI", "Software Engineering"]
  tags = ["gpt-5.4", "pi", "bosun", "zero-agent", "agents", "tooling"]

[extra]
  author = "rhnvrm"
  og_image = "/images/blog/gpt-5-4-with-pi-0-69-0-is-just-nice/header-party-corner.png"
+++

![Restyled party-corner meme in warm sepia tones: a lone figure thinks "i use pi 0.69.0 with gpt 5.4, btw" while the party crowd talks about GPT-5.6, Fable, and new runtimes](/images/blog/gpt-5-4-with-pi-0-69-0-is-just-nice/header-party-corner.png)

You might be wondering why, in July, with GPT-5.6 and Fable out, I am sitting here writing a post about GPT-5.4 with Pi 0.69.0.[^54gone]

That is kind of the point.

I used to be on this stupid little update treadmill.

Weekly, sometimes daily: update [Bosun](https://github.com/oddship/bosun), pull upstream [Pi](https://github.com/badlogic/pi-mono) changes, fix whatever broke, then update [Zero Agent](/pages/harness-engineering/thesis/the-loop/) on top because that is the day-job agent stack I actually use. Bosun is the base harness. Zero is the day-job layer on top.

In the beginning it was fun. Fast feedback, fast progress, fast breakage. Every week there was some new thing to absorb. New agent behavior, new packaging, new prompt format, new model weirdness, some fresh upstream landmine. The whole stack was alive, but in a high-maintenance way. Like a project car, except the car is a shitty agent runtime and you are also driving it to work every day.

Then, somehow, I stopped.

I stayed on Pi 0.69.0.

Partly laziness. Partly self-preservation.[^thirty]

A few months back, after Pi maintainership shifted from [Mario](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) to Erandil,[^soldout] upstream started moving in ways that would have meant real cleanup for me. Mostly for the better, honestly. But still in ways that broke my inertia.

The GitHub repo move from `badlogic/pi-mono` to `earendil-works/pi` was probably the cleanest symbol of that phase. I kept thinking I would update once things settled a bit, but I was slow and lazy, and then a few months just passed. Maybe I had accidentally taken Mario's [Thoughts on slowing the fuck down](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/) a bit too literally.

I have a bunch of extensions. I have local workflows. I have weird glue. I have opinions encoded into skills and prompts and wrapper scripts. Every upstream change is not just "upgrade package". It is a small tax audit.

So I kept punting it. I would think, yeah, I'll do the migration this weekend when I have energy. Then I would not do it. Then next weekend. Then next week. Then never.

And the funny thing is: I expected that decision to punish me.

Usually when you stop updating an AI tool stack, you are choosing future suffering. Not just because old things rot, though they do. Also because the models keep getting stronger every week, and the tooling around them keeps evolving to become less annoying, more capable, and occasionally less deranged. Something starts rotting quietly. A plugin goes weird. Some extension API drifts. The model starts doing something cursed with tool calls. A command that used to work now gives you a surreal comment error and bad vibes. You know the genre.

But that did not happen.

Everything still works. And I am still about as productive as I was, maybe even more honestly, with output that is just as good.

Not in the perfect-enterprise-software sense. More like: solid, boring, dependable, and when it fails it is usually upstream nonsense instead of local structural collapse. Yesterday ChatGPT started streaming HTML comment tags instead of thoughts again.[^comments] But that was not Pi. Not Bosun. Not Zero. My stack was fine. The jank was elsewhere.

And I think that is the thing that surprised me.

I did not update. I did not keep pace. I did not lovingly maintain the whole tower every week. And still, the setup I actually depend on, Pi 0.69.0, Bosun, Zero Agent, my extensions, my skills, just kept doing the job.

That feeling is new.

## The older rhythm

I looked at my commit history for Bosun and Zero Agent from the first few months of this year, and it is pretty obvious what kind of phase I was in.

January and February were a blur while I was trying to move from the Claude model family to GPT models, and trying to modify my skills and harness around the new models' quirks. Then March and April were still active, but more targeted. After that, the update cadence basically fell off a cliff. The last dense burst of Bosun syncs and Pi-adjacent churn was in early April. After that: mostly calm.

A lot of the earlier work is migration work. Version bumps. Packaging changes. Mesh changes. Daemon fixes. Prompt cleanup. Small structural repairs. Downstream syncs. General keep-the-machine-current work. Useful work, but still maintenance work.

That was not wasted time. Bosun exists largely because raw upstream usage was too unstable for the way I wanted to work. I wanted a proper harness instead of just raw chat with some tools bolted on. I wrote more about that setup in [Harness Engineering](/pages/harness-engineering/).

So the harness was never a side quest. The harness was the cost of taking this stuff seriously.

But back then, I still felt like I had to keep running just to stand still.

## Why I am writing this today

Part of the reason this is on my mind right now is that today I started trying GPT-5.6 in Codex. Not in Bosun, obviously, because I never updated beyond 0.69.0.

I am still evaluating it. If it starts landing a couple of tough problems consistently, then yeah, I will probably slowly drag Bosun and Zero forward too.

So this is not me declaring the plateau eternal. I am poking at the edges of it in real time.

Maybe the cleaner way to say it is this: I am talking about a very specific kind of person here. The sort of person who hand-maintains a weird little agent harness because the defaults feel too omakase. Pi, Bosun, custom skills, prompts, extensions, glue code, all of that.

So when I say maybe we have reached a plateau, I do not mean the whole AI world has plateaued. I just mean this layer of it feels more boring now, in a good way. The lower part of the stack finally feels stable enough that I am less interested in rebuilding it every week, and more interested in whatever comes next on top of it.[^nixmeme]

## What changed after 5.4

My current thesis, stated with the full maturity this topic deserves, is: GPT-5.4 with Pi 0.69.0 is just nice.[^nice69]

What I mean is that 5.4 feels like the point where the model got good enough that my bottleneck moved somewhere else.

Earlier, model upgrades and framework churn were tightly linked. If a new release landed, you wanted it, because there was a decent chance the capability jump was big enough to justify the migration pain. Better reasoning. Better tool use. Better follow-through. Better coding stamina. Those jumps changed what workflows were realistic.

Now it feels different.

Not bad. Just different.

The gains still exist, but for my day-to-day use they just feel less urgent. GPT-5.4 has enough surplus capability that I can absorb a surprising amount of product jank and still get good output. Minor annoyances can usually be patched over with better skills, clearer prompts, tighter orchestration, or just not being dumb about delegation.

That is a very different world from the one where every upstream bump felt mandatory.

## Pi 0.69.0, aka nice

There is also something genuinely funny about the version itself.

Pi 0.69.0. Nice.

But also, actually, nice.

It is not that 0.69.0 is some holy release of perfect software. Pi is still Pi. I say this with affection, but also with experience: it is a somewhat shitty agent thing in the way all interesting agent things are shitty. There is always an edge case. Some bizarre behavior. Some tool contract that works until it really, really does not. But nothing breaks if you never upgrade, right ;) Some extension you wrote at 2 a.m. that is now unfortunately part of your personality.

And yet 0.69.0 is where the whole thing, for me, became boring enough to trust.

That matters more than any flashy benchmark.

## Maybe we are entering the boring phase

I might be wrong, but I think some part of this ecosystem is settling down. Or, as Kailash put it in [This time it feels different](https://nadh.in/blog/this-time-it-feels-different/), does it really?

Not because innovation stopped. Not because frontier models are done. Not because there will be no more dramatic launches with anime names and launch videos and vague claims about agents changing knowledge work forever.

But because a lot of what matters now feels incremental.

Fable is an upgrade, sure, but it feels like an upgrade in the mature-software sense. Better here, cheaper there[^costnote], smoother somewhere else. Not "throw away your workflow immediately" energy. More "yeah okay this is better, I will get to it" energy.

And outside the pure model curve, there are other constraints now. Cost. Product lock-down. Safety layers. Government pressure. Access restrictions. The frontier labs are still racing, but the race keeps running into economics and policy and product reality.

So maybe this plateau is about the models. Or maybe it is tooling fatigue. Or maybe it is just the times.[^claudeaugust]

For people building personal stacks on top of all this, that slowdown is weirdly useful. It gives your local system time to harden.

Once your own harness hardens, your questions change.

You stop asking: how do I keep up with upstream?

You start asking: what can I build on top of the thing that already works?

## The important layer is now above the framework

This is probably the biggest change in my day-to-day work.

I do not feel a huge urge to keep inventing new extension machinery anymore. The core scaffolding is mostly there: sandboxing, orchestration, multi-agent splits, review flows, verification flows, memory, reusable prompts, workflow glue.

What I keep adding now is skills.[^metaskills]

And skills are where the compounding value really is.

Tiny bits of hard-won operational knowledge. How to debug a repo. How to navigate a deployment setup. How to review a certain kind of change. How to avoid a trap I have already fallen into three times. How to compress judgment into something reusable.

That layer is increasingly my own.

Which means the framework below it only needs to be stable enough. Not perfect. Not cutting-edge every week. Just stable enough that I can keep compounding above it.

That is why I have not felt much urgency to upgrade. The expensive part of my system is no longer the package version. It is the accumulated workflow knowledge sitting on top.

## Boring is when the tool becomes real

I think this is the real point.

In infra and dev tooling, boring is underrated. A lot of the time, boring is the moment the thing becomes real.

Not when it first demos well. Not when everyone is quote-tweeting the launch thread. Not when the benchmark chart drops. When you can ignore it for a while and it still does the job.

That is the threshold I think I crossed.

I can sit on an older Pi. Keep my weird extension pile. Accept that some upstream UX will randomly cough blood now and then. Patch annoyances with skills. And still get serious work done every day.

A year ago that would have felt temporary, or lazy, or slightly irresponsible.

Now it feels like a plateau.

Not the final plateau, obviously. But a real one.

And honestly, I will take that over another quarter of exciting breakage.

Pi 0.69.0. Nice. GPT-5.4. Also nice. Together: weirdly peaceful.

[^thirty]: Or maybe I just recently turned 30.
[^soldout]: Mario's [I've sold out](https://mariozechner.at/posts/2026-04-08-ive-sold-out/) post is probably the cleanest marker for that transition. One practical detail from that post mattered a lot for me: the repo moved from `badlogic/pi-mono` to `earendil-works/pi`, with redirects still a bit TBD at the time, which made the whole "I'll upgrade later" instinct even easier to justify.
[^comments]: The kind of weirdness Mitsuhiko joked about [here](https://x.com/mitsuhiko/status/2075563568875950557?s=20).
[^nixmeme]: Maybe Pi is just the new "I use Nix/Arch btw" meme.
[^metaskills]: And do not get me started on meta-skills. The latest rabbit hole has been self-improving skills, which I more or less lifted from Hermes and now run through Bosun's daemon, and sometimes manually. See [Meta-Skills](http://127.0.0.1:1112/pages/harness-engineering/skills/meta-skills/) and Hermes' [self-improvement loop, memory, and skill nudges](https://hermes-agent.nousresearch.com/docs/user-guide/features/codex-app-server-runtime#self-improvement-loop-memory--skill-nudges).
[^nice69]: The meme version is still "nice 69," obviously.
[^claudeaugust]: Or maybe the ancient truth holds and Claude, going by the European-name meme, simply gets lazier in August because of summer holidays. I still cannot believe it has been two years since [this post](https://x.com/nearcyan/status/1829674215492161569?lang=en), and lol, back in August 2024 we were all just using Claude Web.
[^54gone]: Apparently 5.4 is going away on July 24, at least if [this Reddit post](https://www.reddit.com/r/ChatGPTcomplaints/comments/1urwaie/they_are_removing_gpt54/) is to be believed. So yes, maybe this whole thing is also a small love letter to Pi 0.69.0 and GPT-5.4. I will miss you.
[^costnote]: I am being sarcastic about the "cheaper there" bit. Fable is super expensive. And honestly there is a price cliff beyond which I do not really want to pay. Right now I would rather use something like GPT-5.4, or the Claude 4.6 equivalent, and let the harness do more of the work over multiple iterations than jump to some giant model just because it might do the same thing in one shot.