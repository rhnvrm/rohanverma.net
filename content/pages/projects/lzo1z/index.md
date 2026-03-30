+++
title = "lzo1z"
description = "Pure Go LZO1Z compression and decompression library"
weight = 8

[extra]
github_url = "https://github.com/rhnvrm/lzo1z"
+++

Pure Go implementation of LZO1Z compression and decompression, fully compatible with [liblzo2](http://www.oberhumer.com/opensource/lzo/). Used in real-time data feeds and other applications requiring fast compression.

## Features

- **Pure Go** — no CGO, no external dependencies
- **Zero allocations** per call
- **~420 MB/s compression, ~1 GB/s decompression**
- **Compatible** with liblzo2
- **Cross-compilation friendly**

Built at [Zerodha Tech](https://zerodha.tech).
