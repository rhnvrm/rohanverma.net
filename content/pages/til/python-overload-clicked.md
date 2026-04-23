+++
title = "TIL: Python @overload"
weight = 4
template = "pages-page.html"
date = 2026-04-24
draft = false

[extra]
section_title = "TIL"
+++

Today I started with one small typing problem.

I was trying to make a small Python interface nicer to type. The runtime behavior was already fine. The annoying part was that the returned dict changed shape depending on a mode flag, and I wanted better hints without turning the whole thing into a framework.

My constraint was pretty simple: keep the runtime code simple, keep the data as plain dicts, but make the call sites smarter.

Honestly, I thought the only way out would be some kind of breaking change. I have gotten so used to reading and writing Go that I was thinking in terms of changing the interface itself, not teaching the type checker more about it.

Instead, the agent taught me the split I was missing:

- `TypedDict` is for describing the shape of the dict.
- `@overload` is for describing that different inputs imply different return types.
- `Literal[...]` is what makes those input values precise enough for the type checker.
- At runtime, there is still just one actual function implementation.

That last part is what made it click for me.

I had seen `@overload` before, but I was half-treating it like Python had some real runtime overloading story hidden somewhere. It doesn't. The overloads are there for static type checkers and editors. The real function is still the final implementation.

A tiny example:

```python
from typing import Literal, TypedDict, overload

class BasicUser(TypedDict):
    id: int
    name: str

class DetailedUser(BasicUser):
    email: str

@overload
def fetch_user(view: Literal["basic"]) -> BasicUser: ...

@overload
def fetch_user(view: Literal["detailed"]) -> DetailedUser: ...

def fetch_user(view: str) -> BasicUser | DetailedUser:
    ...
```

The downstream usage is just the normal function call:

```python
basic_user = fetch_user("basic")
print(basic_user["name"])

detailed_user = fetch_user("detailed")
print(detailed_user["email"])
```

If the caller passes `"basic"`, the type checker can treat the result as `BasicUser`. If it passes `"detailed"`, it can treat it as `DetailedUser`.

Same runtime function. Better static help.

In real code, I would probably also add a broader fallback overload for a non-literal `str` variable. But the core idea is the part I wanted to remember.

What I liked here was not just the feature itself, but the way the learning happened. I started with a local, practical constraint. The agent did not just patch that exact spot. It pointed me at a more general pattern I can reuse anywhere I have dict-shaped responses and input-dependent return values.

I also found it hard to believe this would even work. My first instinct was: how are downstream users supposed to deal with two different classes here? That is probably the Go-brain talking. I am used to pretty explicit, no-magic flows there. In Python, because this is just `TypedDict` describing plain dict shapes, that tension mostly disappears. Nothing special is happening at runtime. That surprised me, and honestly that was part of the delight.

I was not even trying to learn `@overload` that day. I was just trying to make one annoying bit of typing less vague. The fact that I walked away with a reusable idea instead felt genuinely delightful.

Also, the thing that stuck with me enough that I later asked the agent to write down the context was not the original library-specific problem. It was this pattern.

What I keep hearing about AI coding is speed. The part I find more interesting is this: sometimes the agent widens the frame just enough to teach you the right concept instead of only handing you a patch.

## References

- [Python typing docs: `@overload`](https://docs.python.org/3/library/typing.html#typing.overload)
- [Typing spec: overload](https://typing.python.org/en/latest/spec/overload.html)
- [Typing spec: `TypedDict`](https://typing.python.org/en/latest/spec/typeddict.html)
- [PEP 586: Literal Types](https://peps.python.org/pep-0586/)
