+++
title = "Go ASM R15 Clobbered in Plugin Buildmode"
weight = 2
template = "pages-page.html"
date = 2025-01-08
draft = false

[extra]
section_title = "Go"
+++

[R15 is clobbered by a global variable access with buildmode=plugin · Issue #199 · parquet-go/parquet-go](https://github.com/parquet-go/parquet-go/issues/199)

I created an issue here on the repo as a potential fix. I had to use the help of LLMs for this as I am not an expert in this but I was able to grok through the changes.

The suggested change of using DI did not work as it is used elsewhere in the code.

Also created a PR here: [fix: change r15 usage so its not clobbered with go plugin buildmode by rhnvrm · Pull Request #211 · parquet-go/parquet-go](https://github.com/parquet-go/parquet-go/pull/211)

---

*2025-01-12*: the register clobbering issue that occurs in buildmode=plugin that was occurring in parquet-go is now patched in upstream (not released though).

---

## R15 Clobbering Issue in Go Plugins

A quick summary of what I learnt: in plugin build mode, the R15 register is used for internal runtime operations so there is a compiler check in Go that does not allow this. Changing R15 to something else is a simple solution. In the klauspost/compress repo, they changed it to DI. But here, DI is used elsewhere so we have to use a different register.

> The R15 clobbering issue arises from a conflict between Go's dynamic linking model and the use of the R15 register in AMD64 assembly code. When building with `-buildmode=plugin`, Go uses dynamic linking, which requires certain registers, like R15, to be preserved for internal runtime operations, such as managing global variables or stack offsets.
>
> **Key Points:**
>
> - **Error Context**: The error occurs when assembly code uses R15 for computations, but dynamic linking expects it to remain unchanged, leading to clobbering.
> - **Dynamic Linking**: In this mode, Go's runtime needs R15 to be preserved across function calls and global variable accesses.
> - **Assembly Code**: Using R15 directly in assembly for arithmetic or addressing can interfere with the Go runtime's management, causing state corruption.
> - **Global Variable Access**: The error often involves global variable access, where R15 might be temporarily used by the runtime, leading to conflicts.
>
> **Solutions:**
>
> 1. **Avoid Using R15**: Use other registers instead of R15 in assembly code for calculations.
> 2. **Save/Restore R15**: If R15 must be used, save and restore its value around global variable accesses.
> 3. **Adhere to Go Assembly Conventions**: Use Go's assembler conventions to manage register preservation automatically.
> 4. **Conditional Compilation**: Use build directives to apply safe code paths for plugin builds.
>
> This issue is similar to problems in performance-optimized packages like `klauspost/compress`, where hand-written assembly is common. The solution involves careful management of register usage to align with Go's dynamic linking requirements.
