---
title: Rewriting Lyric API in Golang
author: Rohan Verma
type: post
date: 2018-08-01T19:10:39+00:00
url: blog/2018/08/01/rewriting-lyric-api-in-golang/
categories:
  - notes
tags:
  - golang
  - js
  - lyrics
  - music
  - node
  - spotify

---
I had originally written a [Lyric API][1] as a hobby project way back using Node. I published it on github as a combination of API server hosted on [heroku][2] along with a library hosted on [NPM][3]. It still gets 50 downloads a week and the hosted [heroku API server][2] is actually used by many people even though it offers little to no functionality. I was recently looking at [wtf dashboard][4] and even contributed a [small patch][5] to it. [wtf][4] is written in Go and I am using it daily. I want to build a widget for Spotify on the dashboard. So I thought having lyrics was going to be very useful for this widget as I could display the current playing song on the widget and below it, the lyrics.

A Go API for connecting with the Spotify Web API is already available but for getting the lyrics, I decided that since [Lyric API][1] I had written in Node was so small that I could essentially rewrite it in golang in less than a day.

Voila! [Lyrics API Go][6] is now available with two providers at the moment (more than the what was initially in the Node project). I plan to add Genius as another provider soon.

After that, the major work left would be to write a Current Song Fetcher using the Spotify Web API and based on the artist and song name, calling [Lyrics API Go][6] to fetch the lyrics and write the data to bytes and display it on the widget.

 [1]: https://github.com/rhnvrm/lyric-api
 [2]: https://lyric-api.herokuapp.com/api/
 [3]: https://www.npmjs.com/package/lyric-get
 [4]: https://github.com/senorprogrammer/wtf
 [5]: https://github.com/senorprogrammer/wtf/pull/250
 [6]: https://github.com/rhnvrm/lyric-api-go