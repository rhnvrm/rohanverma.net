---
title: What thefuck is wrong with…
author: rhnvrm
type: post
date: 2017-12-19T14:35:43+00:00
url: blog/2017/12/19/what-thefuck-is-wrong-with/
client-modified:
  - "1513694143"
categories:
  - uncategorized
format: aside
draft: true

---
**What thefuck is wrong with my zsh?**

Well, turns out, the reason it took so much time for my zsh to startup, was because of this program called **thefuck**. Used `zsh -xv` to figure out what took so long and did a `dnf remove thefuck` and fixed it.