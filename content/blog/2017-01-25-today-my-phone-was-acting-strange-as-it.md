+++
title = "Today my phone was acting strange as it…"
date = "2017-01-25T19:32:40+00:00"
path = "blog/2017/01/25/today-my-phone-was-acting-strange-as-it/"

[extra]
  author = "rhnvrm"
+++

Today my phone was acting strange, as it immediately crashed after opening the notification drawer. I was baffled with why this was happening as my phone was working perfectly fine until yesterday. Finally, I had no option but to attempt to see the logs using `adb shell logcat` and try to figure out what was going on. There was a peculiar error message relating to starting an event a `8:00 AM` and I was completely unable to figure out what was causing it. Finally, I read the logs one line at a time and found that it was saying that there was an error with SQLite trying something with the stock clock app which has alarms. This was probably because yesterday night I had not charged my phone and it had died at around 7 or 8 am I guess and there was some error that occured then causing the phone to report thousands of errors, taking all the memory and thereby crashing the phone as soon as it was unlocked and the clock widget on my home screen updated or I tried to open the notification drawer.

&nbsp;