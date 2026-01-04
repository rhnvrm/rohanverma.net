+++
title = "easyjson noexponent"
description = "Open source contribution: configurable float formatting for Go JSON library"
weight = 3

[extra]
github_url = "https://github.com/mailru/easyjson/pull/432"
tech_stack = "Go"
status = "pending-review"
+++

Upstream contribution to [mailru/easyjson](https://github.com/mailru/easyjson) adding a `noexponent` struct tag for controlling float serialization format.

## Problem

Financial applications need decimal notation (`0.000001`) instead of scientific notation (`1e-6`). The default Go JSON encoder uses scientific notation for small floats, which breaks downstream consumers expecting decimal format.

## Solution

Added `noexponent` struct tag following the existing `asString` pattern:

```go
type Price struct {
    Value   float64 `json:"value,noexponent"`        // → 100000000
    Regular float64 `json:"regular"`                  // → 1e8
}
```

## Implementation

- 4 new Writer methods: `Float32NoExp`, `Float64NoExp`, `Float32StrNoExp`, `Float64StrNoExp`
- Tag parsing in gen/encoder.go
- Comprehensive test coverage
- ~80 lines of code

## Status

- [Issue #425](https://github.com/mailru/easyjson/issues/425): Feature request with analysis
- [PR #432](https://github.com/mailru/easyjson/pull/432): Implementation submitted
- Fork: [rhnvrm/easyjson](https://github.com/rhnvrm/easyjson)

Inspired by `noexponent` tag pattern in [google/go-querystring](https://github.com/google/go-querystring/pull/24).
