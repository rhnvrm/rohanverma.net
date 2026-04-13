+++
title = "Go"
description = "Patterns, debugging notes, and internals from working with Go — testing idioms, assembly quirks, caching strategies, and plugin systems."
sort_by = "weight"
weight = 3
template = "pages-section.html"
page_template = "pages-page.html"
draft = false

[extra]
section_title = "Go"
+++

Notes on Go patterns and internals that came up during real work. Testing idioms, assembly-level debugging, caching with singleflight, and experiments with dynamic plugin loading.

---

[Go Testing Patterns](@/pages/go/testing-patterns.md). The `if got, want :=` idiom and table-driven tests.

[AWS S3 Files and simples3](@/pages/go/aws-s3-files-and-simples3.md). Why I decided not to add S3 Files support to the core library.

[Singleflight for a Go Cache Library](@/pages/go/singleflight.md). Deduplicating concurrent cache fills with `sync/singleflight`.

[Go ASM R15 Clobbered in Plugin Buildmode](@/pages/go/asm-r15-plugin-clobber.md). Debugging an assembly register clobber caused by `-buildmode=plugin`.

[Experimenting with Goloader for Plugins](@/pages/go/goloader-plugins.md). A JIT-style alternative to Go's plugin system.
