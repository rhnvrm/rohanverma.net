+++
title = "Streaming audio from Linux to Android using PulseAudio over LAN"
date = "2018-11-19T19:50:35+00:00"
path = "blog/2018/11/19/streaming-audio-from-linux-to-android-using-pulseaudio-over-lan/"

[extra]
  author = "Rohan Verma"
+++

Suppose you are in a situation where you want to watch a movie on your TV or monitor but don&#8217;t want to use speakers. Maybe you are looking to listen to an audio book stored on your laptop but don&#8217;t want to transfer it to your phone. Or you just want to buy an audio jack splitter. Look no further, PulseAudio to the rescue.  


PulseAudio provides streaming via SimpleProtocol on TCP via a simple command. All you need to do is find the source and start streaming it.

You can find the source by running this command:

```pactl list | grep "Monitor Source"```

After this, you can run:  


```pactl load-module module-simple-protocol-tcp rate=48000 format=s16le channels=2 source=&lt;SOURCE> record=true port=&lt;PORT (eg 8000)>```

Next, you will need to download PulseDroid, the apk can be found in the Github repository or you can use the following command to download it using wget:

```wget https://github.com/dront78/PulseDroid/raw/master/bin/PulseDroid.apk```

Just enter the IP address of your machine (you can find it by running ifconfig) and the port you chose and press the Start button.