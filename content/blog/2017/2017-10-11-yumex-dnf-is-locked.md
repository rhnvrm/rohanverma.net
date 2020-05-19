---
title: yumex-dnf is locked
author: rhnvrm
type: post
date: 2017-10-11T18:43:36+00:00
url: blog/2017/10/11/yumex-dnf-is-locked/
categories:
  - foss
  - notes
  - xfce

---
I downloaded a .rpm and double clicked it to install it and it started yumex-dnf. But for some reason it crashed and dnf was locked. I fixed it using

`yumex-dnf --exit`

and installed the rpm using

`sudo dnf install cacher-1.1.10.x86_64.rpm`