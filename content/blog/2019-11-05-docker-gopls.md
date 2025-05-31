+++
title = "Containerized development workflow using remote gopls server"
date = 2019-11-05T15:30:03+05:30
draft = false
tags = ["golang", "docker"]
categories = ["golang", "notes"]
type = "post"
url = "blog/2019/11/05/containerized-dev-using-remote-gopls"
author = "Rohan Verma"
+++

If your CGO development toolchain depends on external dependencies such 
as system libraries, or you want to develop on an older version of
go while having a different version on your host, you can use a docker container and mount the source from your host machine and build the project inside the 
container. This can enable us to have a consistent development environment across
various developers and their host systems without having to modify system 
libraries. 

This article is a follow up to my previous article on [using containers
to develop on archaic projects](/blog/2019/08/04/docker-containers-to-build-archaic-projects/) 
that require specific system libraries. Last time I discussed how to create a
container having all the dependencies and dev tools installed and use them to
operate on the host file system. Taking this a step forward, 
the biggest roadblock that arises with this approach is that our host machine  
now loses the ability to run gotools on our source code. That means your editor
cannot run any of the tools you depend on to write, lint, or format your go 
source code. 

To overcome this, we can use the experimental [remote lsp server](https://godoc.org/golang.org/x/tools/internal/lsp/cmd#Application) 
feature available in gopls. [gopls](https://github.com/golang/tools/tree/master/gopls) (pronounced: "go please") is the official language server for the Go language. 
With this mode, the gopls running on the host 
forwards all the commands to the gopls in our container. This way the host system
does not need to have any of the dependencies installed and can then use the 
container gopls server to modify the source in the editor of the host.

Let us look at the Dockerfile for this system.

```Dockerfile
FROM ubuntu:xenial AS builder
RUN apt-get update && \
    apt-get install -y gcc g++ libssl-dev cmake wget libpcre3 libpcre3-dev git

WORKDIR /tmp

# Install Go.
RUN wget https://dl.google.com/go/go1.12.9.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.12.9.linux-amd64.tar.gz

# Install Swig.
RUN wget http://prdownloads.sourceforge.net/swig/swig-4.0.1.tar.gz && \
    tar -zxvf swig-4.0.1.tar.gz && \
    cd /tmp/swig-4.0.1 && ./configure && make && make install 

ARG MY_USER_ID
ENV MY_USER_ID ${MY_USER_ID}

ARG MY_PWD
ENV MY_PWD ${MY_PWD}

RUN mkdir -p $MY_PWD

RUN useradd -r -m -u $MY_USER_ID myuser
RUN groupmod -g $MY_USER_ID myuser
USER myuser

ENV PATH="/usr/local/go/bin:${MY_PWD}/go/bin:${PATH}"
RUN GOPROXY=https://proxy.golang.org GO111MODULE=on go get golang.org/x/tools/gopls@v0.2.0
WORKDIR $MY_PWD

CMD /home/myuser/go/bin/gopls -listen=":7050"
```

Firstly, we install all the dependencies and then create
a user which will have access to the source code. We pass
the same user ID as our host user by using the MY_USER_ID
as the build argument.

Then we have to replicate the
host path in the container and set that as our work directory. This is a quirk
of gopls, if there is a mismatch in the path, the host will communicate the
wrong path to the server running in the container and will be unable to find it
inside the container. 

Finally, we install gopls in the container and then start it in the container
with the `-listen=":7050"` flag.

We will now build the image.

```bash
mkdir -p go

docker build \
--build-arg MY_PWD=$PWD \
--build-arg=MY_USER_ID=`id -u $USER` \
-t myapp:latest .
```

Note, we also create a directory called `go` which will be the mock GOPATH 
inside the container.

Now we can expose this port to our host machine.

```bash
docker run -d --name "myapp" \
-u `id -u $USER` \
-e "GOPATH=$PWD/go" \
-p 7050:7050 \
-v $PWD:$PWD myapp:latest
```

Notice, that we also mount the host source in the container with the same path,
the reason is explained above.

We must now add the following flag to your editor config along with any other
flags we use for the language server to connect to the remote gopls server.

```bash
gopls -remote "localhost:7050"
```

For VSCode, you can add the following to your `settings.json`

```json
{
    "go.languageServerFlags": [
        "-remote=localhost:7050",
        "-v"
    ],
    "go.useLanguageServer": true,
    "go.gopath": "go"
}
```

After adding this flag, you will now be able to edit your source with all the
added benefits that come with a language server like auto completion and 
auto formatting.

Since this is an experimental feature, it might break (a lot). Do let me know 
in the comments if this was helpful for you.