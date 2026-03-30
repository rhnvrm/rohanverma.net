+++
title = "hq"
description = "A jq/yq-like query processor for HUML files"
date = 2026-01-23
weight = 1

aliases = ["/projects/hq/"]
[extra]
github_url = "https://github.com/rhnvrm/hq"
+++

A command-line tool for querying and transforming [HUML](https://huml.io) files using jq-style expressions. Built as an experiment in LLM-assisted development with test harness engineering.

## Features

- jq-compatible expression syntax
- 50+ operators: field access, iteration, filtering, mapping, arithmetic
- Multiple output formats: HUML, JSON, YAML
- Semantic comparison for testing (via koanf)

## Quick Start

```sh
# Install
go install github.com/rhnvrm/hq@latest

# Query a HUML file
hq '.users[] | select(.active)' config.huml

# Transform data
hq '.items | map({name, price})' data.huml

# Output as JSON
hq -o json '.' config.huml
```

## About

hq was built in about 6 hours using an LLM agent with 511 pre-planned test scenarios. The approach: front-load specification into tests, let the agent implement against a fixed target. More details in the [blog post](/blog/2026/01/22/making-a-query-processor-for-huml/).
