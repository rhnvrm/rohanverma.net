+++
title = "Experimenting with Goloader for Plugins"
weight = 4
template = "pages-page.html"
date = 2024-10-25
draft = false

[extra]
section_title = "Go"
+++

Notes from experimenting with dynamic plugin loading in Go. The standard `plugin` package has limitations (can't unload, Linux/macOS only, build constraints). Goloader is an alternative that loads Go object files at runtime without cgo.

## References

- [pkujhd/goloader](https://github.com/pkujhd/goloader), the main project
- [goloader on pkg.go.dev](https://pkg.go.dev/github.com/pkujhd/goloader?tab=importedby)
- [ZenLiuCN/dynamic](https://pkg.go.dev/github.com/ZenLiuCN/dynamic), a wrapper around goloader
  - [compiler/bin.go](https://github.com/ZenLiuCN/dynamic/blob/main/compiler/bin.go)
- [VOvchinnikov/dynamic-runner](https://pkg.go.dev/github.com/vovchinnikov/dynamic-runner)
  - [main.go](https://github.com/VOvchinnikov/dynamic-runner/blob/8a0b77383a8514932370228af667afe5abd31146/main.go)
- [goloaderbuilder examples](https://pkg.go.dev/github.com/pkujhd/goloaderbuilder/examples/builder)
  - [builder/main.go](https://github.com/pkujhd/goloaderbuilder/blob/db8bbf07b425f0a66f62f8a925d34c91b727c174/examples/builder/main.go)

### Related: Go notebook/REPL approaches

- [gopherdata/gophernotes](https://github.com/gopherdata/gophernotes)
- [cosmos72/gomacro](https://github.com/cosmos72/gomacro)
- [janpfeifer/gonb](https://github.com/janpfeifer/gonb/tree/main/internal)

### Related: IPC vs plugins discussion

- [Reddit: How to implement dynamic plugins in Go](https://www.reddit.com/r/golang/comments/1fewgoc/how_to_implement_dynamic_plugins_in_go/)
- [Go issue #56776](https://github.com/golang/go/issues/56776)

### Also interesting

- [Drasi](https://drasi.io/) ([GitHub](https://github.com/drasi-project)), Microsoft's open-source project for change detection and reaction in complex systems
