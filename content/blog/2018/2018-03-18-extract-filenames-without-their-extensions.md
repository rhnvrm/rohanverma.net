---
title: Extract filenames without their extensions…
author: rhnvrm
type: post
date: 2018-03-18T15:03:10+00:00
url: blog/2018/03/18/extract-filenames-without-their-extensions/
client-modified:
  - "1521385389"
categories:
  - tutorials
tags:
  - linux
format: aside

---
Extract filenames without their extensions and put it in the clipboard

```ls -C | awk -F"." '{print $1}' | xclip -selection c```