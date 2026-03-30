+++
title = "Browser in the Loop"
weight = 30
template = "pages-page.html"
date = 2026-03-30
draft = false

[extra]
section_title = "The Feedback Loop"
+++

Code review happens in diffs. Design review happens in Figma. But the thing I actually ship, a static site, gets consumed in the browser. So I put the review there too.

A CDP bridge agent injects an annotation button into Chrome. I browse my site normally. When something looks wrong (a sidebar wrapping ugly, an image breaking in dark mode, a paragraph that sounds too formal) I highlight the element, type a comment, and hit annotate. The bridge captures the screenshot, the CSS selector, the surrounding text, my comment, and the page URL. That gets sent via mesh to bosun.

Bosun resolves the URL to a file path. `rohanverma.net/pages/mental-models/nocebo/` becomes `content/pages/mental-models/nocebo.md`. It reads the file, interprets the comment in context of the selected element, makes the edit, commits, and sends confirmation back through mesh.

Browse → annotate → agent edits → commit → refresh → see the change.

---

The reason this works better than switching to my editor is context.

When I see "The nocebo effect, the opposite of placebo, where negative expectations lead to negative outcomes" rendered in my actual site font, at my actual column width, I notice it needs an example. In a diff view I might not. The browser shows me what the reader sees. The diff shows me what the code says. Those are different things.

Today I used this to fix six different issues without opening a single markdown file:

- Annotated the Barnum Effect page: "this GitHub link should explain what the demo does." Bosun fetched the repo, read `index.html`, and added a description of the Forer effect demo.
- Annotated the small-bets page: "this could be objectionable to my employer." Bosun scanned the page, identified five lines with career-transition language, and I chose to soften them.
- Annotated sidebar inconsistencies across three different section pages. Bosun rewrote the templates to unify the icon logic.
- Annotated dark mode images that were being `filter: invert()`-ed and looking mangled. Bosun switched to white background with padding.

Each of these would have been: notice the problem → find the file → open it → find the line → make the edit → check the result. The annotation loop compresses that into: see the problem → describe it → done.

---

The pattern generalizes. Any visual surface where humans review output can feed annotations to agents. Component galleries. Documentation sites. Dashboard UIs. The agent does not care about the substrate. It needs a way to select an element, a way to describe what is wrong, and a connection to something that can make the edit.

The interesting part is not the technology. CDP is old. Annotation UIs are old. The interesting part is closing the loop: the agent edits the source, and the next page refresh shows the fix. No intermediary. No ticket. No "I'll get to it later."

That changes the review cadence. Instead of batching editorial fixes into a session, I fix things the moment I see them. The site improves in real time as I read it.

---

See also: [the review loop](@/pages/harness-engineering/feedback/the-review-loop.md), [the daemon](@/pages/harness-engineering/feedback/the-daemon.md)
