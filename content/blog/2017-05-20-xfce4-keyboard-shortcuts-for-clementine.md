+++
title = "Adding xfce4 Keyboard Shortcuts for Clementine or Spotify"
date = "2017-05-20T15:08:44+00:00"
path = "blog/2017/05/20/xfce4-keyboard-shortcuts-for-clementine/"

[extra]
  author = "rhnvrm"
+++

xfce4 has default media key settings for Pragha music player. Although, if you use clementine music player you can use keyboard shortcuts to control it with DBus and MPRIS.

Clementine is known as org.mpris.clementine and you can add the following entries to your Keyboard Settings > Application Shortcuts

If you use spotify, it is registered as org.mpris.MediaPlayer2.spotify on qdbus.

<pre>qdbus org.mpris.clementine /Player org.freedesktop.MediaPlayer.Next
qdbus org.mpris.clementine /Player org.freedesktop.MediaPlayer.Pause
qdbus org.mpris.clementine /Player org.freedesktop.MediaPlayer.Prev
</pre>

<img class="alignleft size-medium" src="https://i.imgur.com/CyGBzYy.png" width="538" height="574" />