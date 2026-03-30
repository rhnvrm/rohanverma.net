+++
title = "Singleflight for a Go Cache Library"
weight = 3
template = "pages-page.html"
date = 2024-10-03
draft = false

[extra]
section_title = "Go"
+++

Was reading: [Go Singleflight Melts in Your Code, Not in Your DB](https://victoriametrics.com/blog/go-singleflight/)

And I thought that this might be useful for a Go cache library I was working with.

---

*2024-10-07*

I was revisiting this. The last implementation I did was not the correct way to implement this.

In case of a cache miss, the handler has to be called and the cache library does not have access to the actual DB fetch that the app will do. So the problem here is that we are not able to use singleflight as it expects to block and return data.

I think that we need to figure out some way to do singleflight but with the response caching aspect inbuilt into that, so:

Suppose we get N requests in a single period of time, the first request will make sure that the cache is set and that is responded with for the other requests. This involves the first request to actually call the handler.

How does this help?

I am not entirely convinced but I think this helps in the case where there is a cache miss and the handler is called multiple times, such as multiple refreshes by a client. But in actual sense, how much impact does this even have. Maybe during a 3 second period this will hammer the DB, but for one single user.

---

*Outcome: the idea was dropped. The [PR](https://github.com/zerodha/fastcache/pull/15) was closed the same day. The implementation didn't fit the library's architecture since the cache has no access to the actual DB fetch. Singleflight needs to own the call, not just the cache layer. Filed under "interesting idea, wrong abstraction level."*
