---
title: Vim as your daily log notebook
author: rhnvrm
type: post
date: 2016-06-20T00:00:00+00:00
url: blog/2016/06/20/vim-as-your-daily-log-notebook/
categories:
  - uncategorized

---
There are probably hundreds of methods and software that have been written that can help you maintain a notebook that contains your daily logs and notes.

I have tried tens of methods and software and after a few days they just feel like bloat or take up too much time to maintain regularly.

So, I decided to break down my own problem and found a simplisitic method/solution that suits me. My need was to write two logs, one life log and one dev log which was distraction free and would not take more than a second to get started with.

I finally ended up with editing my <code class="highlighter-rouge">zshrc</code> and <code class="highlighter-rouge">vimrc</code>. Now, I just end up doing the following every morning:

  1. Open the terminal <code class="highlighter-rouge">(ctrl + t)</code>
  2. type <code class="highlighter-rouge">today</code> [This opens a split window having my life log and dev log side by side]
  3. type <code class="highlighter-rouge">nlog&lt;space&gt;</code> to start a new log entry.

You can look at my commits [here][1] and [here][2] to see how I have done it and modify it for yourself.

 [1]: https://github.com/rhnvrm/dotfiles/commit/04a61fdb0a671e6de64f37730845b85fa7bf6109
 [2]: https://github.com/rhnvrm/dotfiles/commit/81ebfa3f804032c8386d741232daa9744c54429c