+++
title = "Author Biography Alongside Pictures in Latex"
date = "2016-11-09T16:59:35+00:00"
path = "blog/2016/11/09/some-journal-publications-require-you-to-put-author/"

[extra]
  author = "rhnvrm"
+++

Some journal publications require you to put author biography for each author with their pictures. For this I found the _picins _package. To install this package you can run the following commands

<pre class="brush: bash; title: ; notranslate" title="">sudo mkdir /usr/share/texmf/tex/latex/picins</pre>

<pre class="brush: bash; title: ; notranslate" title="">sudo wget -O /usr/share/texmf/tex/latex/picins/picins.sty http://ctan.imsc.res.in/macros/latex209/contrib/picins/picins.sty http://mirrors.ctan.org/macros/latex209/contrib/picins/picins.sty</pre>

<pre class="brush: bash; title: ; notranslate" title="">sudo /usr/bin/texconfig rehash</pre>

<div>
  So, then you can use the following latex code for biography of an author:
</div>

<pre class="brush: latex; title: ; notranslate" title="">\parpic{\includegraphics[width=1in,clip,keepaspectratio]{figures/photo.eps}}
\noindent {\bf Lorem Ipsum} dolor sit amet, consectetur adipiscing elit. Vivamus at nulla velit. Aliquam neque purus, porta sit amet sodales non, scelerisque eu nibh. Nulla posuere accumsan dui nec dictum. Aliquam erat volutpat. Aliquam erat volutpat. In tristique, dolor et dignissim eleifend, diam eros sollicitudin odio, at consequat sapien odio nec velit. Aenean vel mi lacinia, viverra lorem et, venenatis velit. Duis fringilla purus nec tortor efficitur vestibulum. Donec vitae viverra diam, scelerisque bibendum magna. Nunc fringilla lobortis pharetra. Sed rhoncus arcu eget porta euismod. Vestibulum scelerisque, enim id condimentum sagittis, magna enim faucibus tortor, non volutpat tortor ipsum nec augue. Duis faucibus molestie dui, gravida vehicula ante porttitor et. Integer hendrerit ligula id magna ornare vestibulum.
</pre>