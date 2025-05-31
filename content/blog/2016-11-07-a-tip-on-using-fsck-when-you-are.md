+++
title = "A tip on using fsck"
date = "2016-11-07T22:24:09+00:00"
path = "blog/2016/11/07/a-tip-on-using-fsck-when-you-are/"

[extra]
  author = "rhnvrm"
+++

A tip on using fsck when you are stuck in emergency mode. Whenever you are using \`fsck -y\` and it does not allow you to run because a certain device (say /dev/sdaX) is mounted, it does not mean you can&#8217;t run \`fsck -y /dev/sdaY\`. That is you don&#8217;t unmount that device.