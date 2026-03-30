+++
title = "Fix Garbled Text and Shadows in Chrome and VSCode"
weight = 1
template = "pages-page.html"
date = 2024-08-09
draft = false

[extra]
section_title = "TIL"
+++

I recently updated my laptop and started to see garbled text in many chromium based apps. This was happening in places where the text would be updated.

- In web apps with real-time data updates.
- Twitter, while opening tweets or scrolling
- VSCode, settings page

... and many more places.

Making this very irritating. I hadn't touched any config etc and was struggling with these glitches for a few weeks.

After going down the rabbit hole, ended up reading multiple reddit threads and chromium bug reports, finally figured out that it was due to GPU rasterization.

This can be fixed by in browsers like Chrome, Chromium, Vivaldi etc by:
- going to: `chrome://flags` (chrome://#enable-gpu-rasterization)
- setting `enable-gpu-rasterization` to disabled

Another solution for this is to use Vulkan.

You can modify the Exec command for your .desktop entry to something like this:

```
vivaldi-stable --enable-features=Vulkan %U
```

I started to notice that with this ^ flag, apps like Google Maps and Figma started to flicker. Adding this flag seems to have fixed [this](https://forum.figma.com/t/figma-glitches-on-intel-uhd-730-webgl-context-lost-error/5195/3).

```
Exec=/usr/bin/vivaldi-stable --disable-gpu-compositing --enable-features=Vulkan %U
```
