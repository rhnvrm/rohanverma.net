+++
title = "yt2embed"
description = "Browser extension to redirect YouTube videos to embed pages"
weight = 9

[extra]
github_url = "https://github.com/rhnvrm/yt2embed"
+++

A browser extension that automatically redirects YouTube video and shorts pages to their embed equivalent, providing a cleaner viewing experience without distractions.

## Features

- **Auto-redirect** YouTube videos and shorts to embed pages
- **Enable/Disable toggle** via extension popup
- **Privacy Mode** - Choose between youtube-nocookie.com or youtube.com
- **Cross-browser** - Chrome, Firefox, and Chromium-based browsers
- **Manifest V3** - Modern extension architecture

## How it Works

Redirects:
- `youtube.com/watch?v=ID` → `youtube-nocookie.com/embed/ID`
- `youtube.com/shorts/ID` → `youtube-nocookie.com/embed/ID`

Privacy Mode ON uses `youtube-nocookie.com` for no cookies. OFF maintains login state.

## Install

[![Firefox](https://extensionworkshop.com/assets/img/documentation/publish/get-the-addon-129x45px.8041c789.png)](https://addons.mozilla.org/en-US/firefox/addon/yt2embed/)

[![Chrome](https://developer.chrome.com/static/docs/webstore/branding/image/tbyBjqi7Zu733AAKA5n4.png)](https://chrome.google.com/webstore/detail/hgfpekconaphbedblngiilgojgjhodpp)
