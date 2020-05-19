---
title: A tip on using fsck
author: rhnvrm
type: post
date: 2016-11-07T22:24:09+00:00
url: blog/2016/11/07/a-tip-on-using-fsck-when-you-are/
categories:
  - uncategorized
tags:
  - linux
format: status

---
A tip on using fsck when you are stuck in emergency mode. Whenever you are using \`fsck -y\` and it does not allow you to run because a certain device (say /dev/sdaX) is mounted, it does not mean you can&#8217;t run \`fsck -y /dev/sdaY\`. That is you don&#8217;t unmount that device.