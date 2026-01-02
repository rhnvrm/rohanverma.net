+++
title = "LinkPage"
description = "A FOSS self-hosted alternative to LinkTree and Campsite.bio"
weight = 2

[extra]
github_url = "https://github.com/rhnvrm/linkpage"
+++

A beautiful, self-hosted link-in-bio page built with Go. Own your data instead of paying monthly fees for what's essentially a static page with links.

## Features

- **Editorial Design** - Professional, magazine-inspired aesthetic with clean typography
- **Self-Hosted** - Own your data, customize everything
- **Lightning Fast** - Minimal JavaScript, cached Go templates
- **Admin Panel** - Intuitive card-based interface with drag-to-reorder
- **Auto-Fetch Metadata** - Grab titles, descriptions, and images from URLs via OpenGraph
- **Click Analytics** - Track link performance with anonymized statistics
- **Simple SQLite** - No complex database configuration required

## Quick Start

```bash
# Download from releases, then:
./linkpage --init
./linkpage
```

Access at `http://localhost:8000`, admin at `/admin`.

## Docker

```bash
docker run -v linkpage:/linkpage -p 8000:8000 rhnvrm/linkpage:latest
```
