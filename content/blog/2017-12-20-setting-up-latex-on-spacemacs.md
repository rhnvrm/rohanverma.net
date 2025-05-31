+++
title = "Setting up LaTeX on Spacemacs"
date = "2017-12-20T14:47:24+00:00"
path = "blog/2017/12/20/setting-up-latex-on-spacemacs/"

[extra]
  author = "rhnvrm"
+++

I have been using Vim for text editing and even Vim mode even in Sublime Text. Although, I wanted to use Org mode so I switched to Spacemacs with Evil mode that gives the best of both worlds. I had been using `TeXworks` and `TeXstudio` for editing and building LaTeX documents but now that I have Emacs, I wanted to try out the `pdf-tools` layer and `latex` layers so that all my work can be done from inside Spacemacs itself. Tomorrow, I even want to set up another tool that allows publishing to WordPress blogs through Emacs itself. Now that I have time to invest, I thought the best investment would be to invest it into saving more time in the future.

One of the great features about Emacs in my opinion is how much of the information is self documented inside the editor and how little I had to search on my browser as I could just press / and find out what I wanted to do. For example, I wanted to change the font size by one point, and I could easily do it by pressing `/` in my `.spacemacs` file and type font and edit a single line followed by simple restart. All of this without even having to search on the internet. Combine Vim&#8217;s excellent editing and maneuverability with the `Org mode` and `auto-completion`, Spacemacs turns out to a be a champion for any person who types for a living or even as a hobby.

The first step is to add the `latex` layer to the `.spacemacs` file which will automatically install everything required after pressing `SPC-f-e-R`. This, being a layer, will be automatically loaded on opening, say a tex file.

Then, all that needs to be done is press, `SPC-m-b` to build and `SPC-m-v` to view.

Although, by default, Emacs will open it in your default PDF viewer. Emacs also provides another layer, `pdf-tools`, briefly mentioned above, which allows rendering PDF files inside Emacs itself. Adding this layer to your config, you can add the following to your config file to set PDF tools to be your default PDF viewer inside Emacs.

```lisp
(setq TeX-view-program-selection '((output-pdf "PDF Tools"))
  TeX-view-program-list '(("PDF Tools" TeX-pdf-tools-sync-view))
  TeX-source-correlate-start-server t
)
```

Similarly, we can also setup syncing between TeX and the PDF which I will cover sometime later when the need arises.