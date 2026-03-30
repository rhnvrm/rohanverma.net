+++
title = "simplelock"
description = "Fast i3lock wrapper with xkcd and unsplash wallpapers"
date = 2026-01-02
weight = 7

aliases = ["/projects/simplelock/"]
[extra]
github_url = "https://github.com/rhnvrm/simplelock"
status = "archived"
+++

A fast and simple wrapper over i3lock with multiple wallpaper modes. Updates happen in the background while your machine is locked.

## Modes

### Unsplash
Fetch random wallpapers from Unsplash:
```bash
simplelock unsplash 1920x1080 nature,buildings
```

### XKCD
Use XKCD comics as your lockscreen:
```bash
simplelock xkcd_latest   # Latest comic
simplelock xkcd_random   # Random comic
```

### Custom
Use any image URL or local file:
```bash
simplelock custom_fetch https://example.com/image.png
simplelock custom_file ~/Pictures/wallpaper.png
```

## Installation

Drop-in replacement for i3lock. For i3wm users, edit your config to replace `i3lock` with `simplelock`.
