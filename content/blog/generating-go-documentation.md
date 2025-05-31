+++
title = "Generating Go docs using gomarkdoc and pandoc"
date = "2020-11-24T02:19:00+05:30"
draft = false
path = "blog/2020/11/24/generating-go-documentation/"

[taxonomies]
  tags = ["linux", "foss", "golang"]
  categories = ["notes", "golang"]

[extra]
  author = "rhnvrm"
+++

I recently had to distribute the documentation of an internal library to users.
Go developers are used to their editor to providing them with auto completion,
usually with the help of gopls. A lot of times it is necessary for users to be
able to browse a comprehensive list of methods and data types available for
reference. For open source projects, we rely on [godoc.org](https://godoc.org/) and [pkg.go.dev](https://pkg.go.dev). But
unfortunately, it is not easy to host one for internal projects.

After a bit of searching, I found [princejef/gomarkdoc](https://github.com/princjef/gomarkdoc). This project is able to process packages and use the docs, to generate a markdown file. Using this I was able to produce a markdown of the packages I wished to share with the users.

```sh
# install as a cli-tool
go get -u github.com/princjef/gomarkdoc/cmd/gomarkdoc

# generate the docs using specific packages
gomarkdoc ./pkg/foo \
	./pkg/bar \
	./pkg/lorem/ipsum > docs/user-docs.md
```

This was good enough, but a better way would be to distribute it as a single
`html` file. [Pandoc](https://pandoc.org/) is a swiss army knife, which can convert one markup format to
another. Combining this into the pipeline, I was able to generate an `html` file
which has the documentation, which is viewable in the browser and contains links
to the git repository as well.

To make the web document look good, I found two interesting things.

The first being, [sakura.css](https://github.com/oxalorg/sakura), which is a `classless` css stylesheet, which can be
applied to any `html` file and make it look like a modern website.

The second useful thing, are a few flags available in `pandoc` which help with making the documentation `html` file truly standalone.

1.  [--css](https://pandoc.org/MANUAL.html#option--css): This flag accepts a link to a `CSS` stylesheet
2.  [--self-contained](https://pandoc.org/MANUAL.html#option--self-contained): This flag produces the `html` file in a way, such that no external dependency is needed.

Using these flags, we can come up with the following script to generate the `html` file from the markdown file.

```sh
pandoc docs/user-docs.md \
	--toc \
	--metadata title="My Package - User Docs" \
	-c https://unpkg.com/sakura.css/css/sakura.css \
	--self-contained \
	-o docs/user-docs.html
```

This results in well rendered documentation which is standalone and looks modern as well.

![Image](/ox-hugo/docs-sample.png)