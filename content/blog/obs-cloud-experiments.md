+++
title = "Experiments with OBS in the Cloud"
date = 2020-11-26
path = "blog/2020/11/25/obs-cloud-experiments"
draft = true
taxonomies.tags = ["streaming", "obs", "cloud", "aws"]
+++

# Experiments with OBS in the Cloud

## Live streaming

### Nginx rtmp setup
- Very slow

### Setup kernel
- https://meetrix.io/blog/aws/changing-default-ubuntu-kernel.html
- `sudo apt-get -y install linux-image-extra-virtual`
- `grep -A100 submenu  /boot/grub/grub.cfg |grep menuentry`
- edit grub default in /etc/default/grub
- `sudo update-grub`
- `sudo reboot`

### Setup docker
- `sudo apt update && sudo apt install docker.io`
- `sudo groupadd docker && sudo usermod -aG docker $USER`

### Setup OBS
- `apt update`
- `add-apt-repository ppa:obsproject/obs-studio`
- `apt install ffmpeg obs-studio`

### Tunnel locally
- `ssh -L 6901:127.0.0.1:6901 live-stream-instance`

### Did not work
Setup container
- `docker run -p 5901:5901 -p 6901:6901 -p 2722:22 -ti lifestorm/obs-server`

### Final message
After a lot of testing for the streaming setup on multiple instance types on EC2, I think the best and simple way would be to just stream from our local machines directly to YouTube. The transcoding on those instances is not good enough and Chrome is stuttering. Jitsi was fine but no clue what could go wrong. Also, audio does not work yet (I changed the kernel from -aws to -generic, still no progress).

On the other hand, we tested yesterday with Vishnu and I am able to produce a 1080p OBS stream with zero lag locally. On the actual stream day, we can switch to a 720p stream to be safe.

Also, the lag to operate via VNC after starting OBS is bad enough to not allow operating the remote OBS, which could cause issues.

In case of an internet issue during the live stream, I tested the nginx-rtmp module for seamless switching by proxying, but the stream from local to that nginx drops a lot of packets whereas directly to YouTube it drops nearly zero packets. Avoiding this, we can just have a backup OBS on some other machine with a different ISP with everything set up and share the stream-key and start broadcasting from the other machine and stream (again directly to YouTube) instead of via this nginx-proxy. A bit riskier and might have a few seconds of disruption, but overall quality would be maintained.

*This post is still a work in progress.*