+++
title = "Creating archive pages grouped by year in Hugo"
date = 2019-11-15T15:30:03+05:30
draft = false
tags = ["hugo", "blog", "golang"]
categories = ["tutorials"]
type = "post"
url = "blog/2019/11/15/archive-pages-group-by-year-hugo"
author = "Rohan Verma"
+++

I was on the hunt to find out how to organize my [blog](/archive) and 
[project](/project) archive pages by year in Hugo. After being unable to find 
any easy solutions I decided I would sit down and write the go template to 
render these pages myself. The idea was simple, iterate over the list divided
by year into sub lists and render tables, but it turned out to be a bit tricky.

![image_blog_archive](/blog/2019/images/blog_archive.png)

Here is the template, hope it is useful for someone who wants to have a similar
page.

```html
{{ define "title" -}}
  Blog List | {{ .Site.Title }}
{{- end }}
{{ define "header" }}
  {{ partial "masthead.html" . }}
{{ end }}
{{ define "main" }}
  <header>
    <h1>{{ .Title }}</h1>
  </header>
  
  <section>
    {{ $prev := 3000}}
    {{range .Site.RegularPages}}
      {{if .Date}}
      {{if gt $prev (.Date.Format "2006")}}
      {{ if ne $prev 3000}}
        </table>
      {{ end }}
      <h2>{{ .Date.Format "2006" }}</h2>
      <table class="all-posts">
      {{end}}
      <tr>
        <td>{{.Date.Format "02 Jan"}}</td>
        <td><a class="no-underline" href="{{.Permalink}}">{{.Title}}</a></td>
      </tr>
      {{ $prev = .Date.Format "2006"}}
      {{end}}
    {{end}}
  </table>    
  </section>

{{ end }}
{{ define "footer" }}
  {{ partial "powered-by.html" . }}
{{ end }}
```

The above template loops through all the blogs (having a date) and renders 
multiple tables
which are grouped by the year. We render `h2` tags with the year if the previous
year is greater than the current year. Followed 
by a `<table>` tag having each next blog rendered as a row in the table. The 
previous seen date is updated for the next iteration. In each iteration, before 
rendering the table tag we check if the previous date was greater than the date 
or`3000` (an arbitrarily high year) which we set as the previous seen year 
before starting the loop, to decide if we want to close the table tag. In the
next iteration, the previous year will be the same as the current year, and so
we can continue to render rows.
