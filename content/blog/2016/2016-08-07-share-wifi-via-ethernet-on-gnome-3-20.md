---
title: Share WiFi via Ethernet on Gnome 3.20
author: rhnvrm
type: post
date: 2016-08-07T00:00:00+00:00
url: blog/2016/08/07/share-wifi-via-ethernet-on-gnome-3-20/
categories:
  - foss
  - notes
tags:
  - fedora
  - gnome
  - linux

---
There is a hidden method to share your WiFi over Ethernet in the latest Gnome. I stumbled upon this while trying to connect
  
my RaspberryPi 3B with my University’s Internet.

  1. Type <code class="highlighter-rouge">nm-connection-editor</code> in your terminal.
  2. Add a shared network connection by pressing the Add button.
  3. Choose Ethernet from the list and press Create.
  4. Click IPv4 Settings in the left.
  5. Choose <code class="highlighter-rouge">Shared to other computers</code> by clicking the Method drop-down menu.
  6. Enter a new name like <code class="highlighter-rouge">Shared WiFi LAN</code> as the Connection name at the top