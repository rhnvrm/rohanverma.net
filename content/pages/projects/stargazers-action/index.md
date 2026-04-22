+++
title = "stargazers-action"
description = "Generate recent GitHub stargazer feeds and optional Discord notifications."
weight = 6

[extra]
github_url = "https://github.com/oddship/stargazers-action"
website_url = "https://oddship.github.io/stargazers-action/"
+++

A small TypeScript tool that turns recent GitHub stars across a user or organization into JSON, RSS, and optional Discord notifications. I built it because GitHub does not offer an account-wide feed for “someone just starred one of my repos.”

## Features

- **Framework-agnostic output** — generate JSON + RSS once, render it however you want
- **Discord notifications** — diff against prior state so only new events are sent
- **Three surfaces** — works as a GitHub Action, a CLI, and a small library
- **Real site integrations** — currently powers the `/signals/` page on `oddship.net` and the `/stars/` page here on `rohanverma.net`

## Why I like it

It keeps the right boundary. The generator stays generic and caller-owned: pick the repos, choose the output paths, and keep page rendering inside your own stack. Astro and Zola both get to consume the same data without the action pretending to be a site framework.

I wrote a longer build write-up here: [Building stargazers-action](/blog/2026/04/22/building-stargazers-action/).
