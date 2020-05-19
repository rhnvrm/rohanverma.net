---
title: Fixing my zsh history
author: rhnvrm
type: post
date: 2016-11-25T18:35:39+00:00
url: blog/2016/11/25/i-recently-corrupted-my-zsh-history-and-was/
categories:
  - uncategorized
tags:
  - zsh
format: status

---
I recently corrupted my zsh history and was facing this error. 

After a reboot, I started seeing a message when loading the shell:

zsh: corrupt history file /home/myusername/.zsh_history

I fixed it using:

mv .zsh\_history .zsh\_history_bad
  
strings .zsh\_history\_bad > .zsh_history
  
fc -R .zsh_history