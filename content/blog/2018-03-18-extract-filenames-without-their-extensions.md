+++
title = "Extract filenames without their extensions…"
date = "2018-03-18T15:03:10+00:00"
path = "blog/2018/03/18/extract-filenames-without-their-extensions/"

[extra]
  author = "rhnvrm"
+++

Extract filenames without their extensions and put it in the clipboard

```ls -C | awk -F"." '{print $1}' | xclip -selection c```