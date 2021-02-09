---
title: "Setting up Bluetooth HSP/HFP Profiles on Pulseaudio"
author: ["rhnvrm"]
date: 2021-01-26
draft: true
url: "blog/2021/01/26/bluetooth-hfp-pulseaudio"
---

It is 2020, and we are going to go into 2021 in just a few days. Yet Linux
machines can't connect to a bluetooth device mic. I was rather surprised by this
when I finally gave in and bought a device early this year and it turned out
that I could only use it as a sink and not a source. You may scoff, this must be
a distro issue. Unfortunately, using the HSP/HFP profiles to use such a device
as a source does not work for any distro at the moment. Also, even if you have
the device A2DP profile working as a sink, you may not have realized that the
quality is not optimal.

I am not going to lie, it was a long journey which spanned months. I tried my
best documenting it.

## What Works {#what-works}

Nothing else works as flawlessly as the patches written by Pali which have been
forked by some users and put onto the AUR.

### @pali's work {#pali-s-work}

If you are looking for just a simple way I will try to share the steps I used to get this working. This is based on [rjshrjndrn's comment](https://aur.archlinux.org/packages/pulseaudio-hsphfpd/#comment-780630) under the AUR package forked by [SpineEyE](https://aur.archlinux.org/packages/pulseaudio-hsphfpd/#comment-780630).

1.  Uninstall pulseaudio

    ```nil
       sudo pacman -Rd --nodeps pulseaudio
    ```

### Add to exclude packages {#add-to-exclude-packages}

```nil
# /etc/pacman.conf
IgnorePkg = libpulse
```

## The Drama {#the-drama}

## What does not work well {#what-does-not-work-well}

### ofono and phonesim {#ofono-and-phonesim}

### pipewire {#pipewire}
