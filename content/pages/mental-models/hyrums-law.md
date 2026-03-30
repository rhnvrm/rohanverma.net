+++
title = "Hyrum's Law"
weight = 4
template = "pages-page.html"
date = 2024-10-25
draft = false

[extra]
section_title = "Mental Models"
+++

> With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody.
>
> — [Hyrum Wright, 2012](https://www.hyrumslaw.com/)

Given enough use, there is no such thing as a private implementation. That is, if an interface has enough consumers, they will collectively depend on every aspect of the implementation, intentionally or not. This effect serves to constrain changes to the implementation, which must now conform to both the explicitly documented interface, as well as the implicit interface captured by usage. We often refer to this phenomenon as "bug-for-bug compatibility."

---

I stumbled upon an interesting Go package.

[GitHub - ssoready/hyrumtoken: A Golang package to encrypt your pagination tokens](https://github.com/ssoready/hyrumtoken)

Although it is a small package that wraps JSON marshalling/unmarshalling over secretbox, it highlights an interesting story within its README.

The story illustrates how assumptions about API pagination tokens can lead to unintended user interface designs and the importance of encrypting tokens to prevent misuse and ensure opacity.

> - **Hyrum's Law**: Highlights how users will depend on all observable behaviors of an API, regardless of the documented contract.
> - **Initial Implementation**: Used limit/offset pagination with page tokens as offset values for simplicity and quick frontend progress.
> - **Unintended UI Design**: Frontend developers assumed page tokens allowed seeking to random pages, leading to a UI with a "jump to page" feature.
> - **Base64-Encoding**: Tokens were base64-encoded, but developers still decoded them, revealing the offset values.
> - **Potential Public API Issue**: If the API were public, changing the pagination method could break user implementations.
> - **Binary Search Exploit**: At another company, pagination tokens were used to increase data extraction speed by dividing token space for parallel requests.
> - **Token Parsing Temptation**: Engineers often parse tokens for internal logging or other purposes, even if not intended.
> - **Encryption Solution**: Encrypting pagination tokens with Salsa20 ensures they remain opaque and prevents misuse or dependency on token structure.

→ [Wikipedia: Hyrum's law](https://en.wikipedia.org/wiki/Hyrum%27s_law)
