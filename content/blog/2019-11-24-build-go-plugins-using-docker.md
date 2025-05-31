+++
title = "Building Go Plugins inside Docker"
date = 2019-11-24T15:30:03+05:30
draft = false
tags = ["golang", "docker"]
categories = ["tutorials"]
type = "post"
url = "blog/2019/11/15/building-go-plugins-using-docker"
author = "Rohan Verma"
+++

Using Go plugins in your projects comes with a lot of caveats. As of writing, 
there hasn't been much development on the feature recently. The 
[commit history](https://github.com/golang/go/commits/master/src/plugin/plugin.go)
shows us that the last commit happened nearly 2 years ago. On the gopher slack,
the sentiment, more or less, is that this is not a priority anymore. Along with 
this, there are multiple issues that come up with maintaining projects that use
it:

- The go version for both host and plugin should match exactly
- External dependencies should match
- Host and plugin `GOPATH` needs to exactly match while building
- Plugins cannot depend on interfaces or structs of the host

To learn more you can refer [this issue](https://github.com/golang/go/issues/20481#issuecomment-326832200) detailing some of the problems with
go plugins

It works well if the projects bundles all the plugins in its own source tree and
both the host and plugins are built together at the same time. But, that limits
the scope of the project. Externally maintained plugins are impossible to
build independent of the host program.

To solve this, we can use Docker to build both the host program, the bundled plugins,
and the custom plugin together. Then this image can be distributed instead
of distributing the host and loading the plugins separately in production.

```Dockerfile
FROM golang:1.12-alpine AS builder
RUN apk update && apk add gcc libc-dev make git
WORKDIR /myproject-plugin/
# Clone and build myproject and myproject-plugin together
# prevent version conflict for go plugins
RUN git clone https://github.com/rhnvrm/myproject.git && \
    mkdir -p myproject/bundled_plugins/myplugin
# Load our custom plugin from disk
COPY ./myplugin.go ./myproject/bundled_plugins/myplugin/myplugin.go
# CGO_ENABLED=1 is required
ENV CGO_ENABLED=1 GOOS=linux
# `make build` builds the host program and bundled plugins
# `go build` our custom plugin 
RUN cd myproject && \
    make deps && make build && \
    go build -ldflags="-s -w" -buildmode=plugin -o myplugin.prov \
    bundled_plugins/myplugin/myplugin.go

FROM alpine:latest AS deploy
RUN apk --no-cache add ca-certificates
WORKDIR /myproject/
# Copy the assets from the builder image
COPY --from=builder /myproject-plugin/myproject/myproject /myproject-plugin/myproject-plugin/myproject/bundled0.prov /myproject-plugin/myproject/bundled1.prov /myproject-plugin/myproject/bundled2.prov /myproject-plugin/myproject/myplugin.prov ./

CMD ["./myproject", "--config", "/etc/myproject/config.toml", "--prov", "bundled0.prov", "--prov", "bundled1.prov", "--prov", "bundled2.prov", "--prov", "myplugin.prov"]
```

This image can then be pushed and used where it needs to be deployed.