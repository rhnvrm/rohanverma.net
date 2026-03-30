+++
title = "s3site"
description = "Serve static websites from S3 tar.gz archives with hot-reload"
weight = 7

[extra]
github_url = "https://github.com/rhnvrm/s3site"
+++

Serve static websites from tar.gz archives in S3. Zero restarts. Your CI builds a static site, packs it into a tar.gz named after the hostname, and pushes it to S3. s3site picks it up and serves it. When the archive changes, the site hot-reloads. Delete the archive and the site goes away.

```
s3://static-assets/sites/
  foo.example.com.tar.gz     -> serves foo.example.com
  bar.example.com.tar.gz     -> serves bar.example.com
```

## Features

- **Convention-based** — hostname maps to archive name, no config per site
- **Hot-reload** — watches S3 for changes, swaps sites without restart
- **Multi-tenant** — serve many sites from one process
- **TLS** — automatic HTTPS via Let's Encrypt or custom certs
