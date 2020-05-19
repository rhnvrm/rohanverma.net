---
title: If you are using os rename src dest…
author: rhnvrm
type: post
date: 2016-12-19T19:04:05+00:00
url: blog/2016/12/19/if-you-are-using-os-rename-src-dest/
categories:
  - uncategorized
tags:
  - python
format: status

---
If you are using os.rename(src,dest) outside the current working directory, you can&#8217;t simply use os.rename(filename, &#8220;output.mp3&#8221;) since it will move the file to the current working directory. You should rather, path.dirname to get the file&#8217;s directory and then rename the file. For example you can use \`os.rename(file\_name, os.path.dirname(file\_name) + &#8216;/{song\_title}.mp3&#8217;.format(song\_title=song_title))\`