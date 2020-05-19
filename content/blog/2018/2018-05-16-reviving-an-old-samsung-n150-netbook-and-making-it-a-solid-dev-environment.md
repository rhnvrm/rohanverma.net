---
title: Reviving an old Samsung N150 Netbook and making it a solid Dev Environment
author: Rohan Verma
type: post
date: 2018-05-16T14:51:23+00:00
url: blog/2018/05/16/reviving-an-old-samsung-n150-netbook-and-making-it-a-solid-dev-environment/
categories:
  - foss
  - notes
  - xfce
tags:
  - archlinux
  - foss
  - gnu
  - linux
  - productivity
  - xfce

---
I had an old Samsung N150 netbook lying around in my parent&#8217;s house. It was an amazing netbook and I remember fondly using it when my parents were not using it to browse the internet and sometimes even use it for school work. It came with Windows Vista if I recall correctly but I had installed Windows XP service pack 3 on it because as we know, Vista sucked! Well, the netbook was very solid, it even ran small games such as Fifa Manager etc and came with a solid keyboard, ethernet and VGA as well for connecting to a big screen. Although, its current state is pretty dismal with Avast Antivirus beeping every other second with a &#8220;Threat has been detected&#8221; alert as it is riddled with loads of russian malware.

After thinking a lot, I decided to install Arch linux using Anarchy Linux as I always wanted to have an Arch machine. I have only ever used it before on my previous laptop but had again reverted to Fedora on it a few days later as I could not upgrade that often on University internet.

The first step was to download Anarchy from https://anarchy-linux.org/download/

> ## Anarchy Linux is a distribution aimed at bringing the Linux revolution to the world. We believe that Linux is the way of the future for desktop computing and provide you with a platform to install a custom Arch based operating system just the way you like. Anarchy Linux is intended for both novice and advanced users alike.

To write to the USB drive, I used:

`sudo dd if=anarchy-1.0.0-x86_64.iso of=/dev/sdb1 bs=4M && sync`

The boot sequence worked properly and opened the Anarchy boot screen. I selected the option to start the live environment to start the installer. The installer however failed to start the GUI installer and instead started the text based installer. However, the experience in my opinion was much better than most GUI installers I have used like Anaconda for Fedora. The only thing that comes to mind is that one should connect to the wifi first before starting the installer using wifi-menu. Otherwise package installation will probably be something that would have to be done after booting for the first time.

My first attempt failed, I had selected the option to download a few custom packages like text editors but their download failed for some reason and the whole process had to be restarted. The download of around 700 MB was wasted along with 1 hour. In my second attempt I went with just the default packages and the download size came to be around 396 MB.

The problem, I figured, was due to a &#8220;improperly signed by the maintainer&#8221; (https://plus.google.com/108897040723051595529/posts/M3REzAKNWCf) on the numix circle package. I could not find the solution, but I tried to disable the sign checking by setting SigLevel to Never from Required in the pacman.conf options. This did not work and then I decided that it might be more suitable to boot into the OS first then try to solve the issue later. So I decided to skip installation of the DE as the failiure was happening with that. But even this did not work out.

What I figured was happening was nothing but the Anarchy installer failing to pacstrap as it did not retry the downloads which timedout.

None of this worked so I decided to do a manual install using Arch Linux ISO, as I had used that before successfully. I also knew that pacstrap retried the downloads instead of giving an error.

The steps I followed are given in Arch Wiki (https://wiki.archlinux.org/index.php/installation_guide)

We have to install the sudo package. It allows using 

`pacman -S sudo`

Then run visudo command and add your user to the sudoers.
  
`rhnvrm ALL=(ALL) ALL`

The next step was to install XFCE4 and XFCE4 Goodies.
  
`pacman -S xfce4 xfce4-goodies`

After this, I started to set up the machine according to my liking.