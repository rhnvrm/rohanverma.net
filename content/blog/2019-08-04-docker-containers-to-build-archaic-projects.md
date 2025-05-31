+++
author = "Rohan Verma"
categories = ["notes"]
date = "2019-08-04T07:30:00+00:00"
draft = false
tags = ["notes", "docker"]
title = "Using Docker containers for building Archaic Projects"
type = "post"
url = "blog/2019/08/04/docker-containers-to-build-archaic-projects"

+++

Sometimes old projects and libraries require certain specific system library versions that are hard to reproduce, or cumbersome to replicate on our development environment. Docker can be used to simplify the build process of these projects and it is often a lot faster than starting a VM in your machine and using that to build these projects.

I recently found out about such a project at my workplace. This was a C++ binary that was statically compiled, so there was no issue with distribution but the build process had become very complex over time. It seemed to only compile on dependencies that ship with Ubuntu 16.04 Xenial Xerxes. Currently, the project was using a vagrant box, and provisioning it with dependencies. Each time a new binary had to be complied, the VM had to be started, provisioned (install development tools) using a script, setup SSH, and then copy the source into the virtual machine. After that, the VM would be used to run the bash scripts which would build multiple binaries along with the required libraries. These final binaries were then again copied to the host machine using scp.

The initial idea was to replicate the same thing in a Docker container. But can it be done in a better way? 

Yes there is a way. A cool thing about Docker is that we can share the filesystem between the host and the container using mounts. Yes, mounting is also possible using VMs but the sheer speed at which you can perform in-place operations using docker run and mounts as compared to a VM is ludicrous. Plus, you don't need to have a VM always running. What we just need to do is to build a container having all the dependencies and dev tools installed and use the dev tools of the container to operate on the host file system. 

Let us dive in,

First we will make a Dockerfile having all the required tools and libraries installed. We can save this file in our projects root directory. 

```Dockerfile
FROM ubuntu:xenial
RUN apt-get update 
RUN apt-get install -y gcc g++ libssl-dev cmake
RUN mkdir -p /etc/myproject
WORKDIR /etc/myproject
```

Notice above, that we have earmarked `/etc/myproject` as the directory where we will mount our project source tree.

The following sample makefile is used to build our project. Only two steps are involved with this file.

1. `make docker-image`
2. `make build`

```Makefile
build: libs myproject ## build all

docker-image: ## build the docker image using the Dockerfile
	docker build -t myproject:latest .

libs: ## build the libs
	docker run -it -v "${PWD}":/etc/myproject myproject:latest /bin/bash -c 'cd build && chmod +x build-libs && ./build-libs'

myproject: ## build myproject.bin
	docker run -it -v "${PWD}":/etc/myproject myproject:latest /bin/bash -c 'cd build && chmod +x build-main && ./build-main'

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help

.PHONY: help build libs myproject
```

Let us look closely at each step required to finally produce the binary.

First, we will run the command `make docker-image` to create a local image from the docker file we hade written. This image has all the required dependencies.

Now, the next step is to run the `libs` and `myproject` steps in order using `make build`. In this step, we mount our hosts working directory to `/etc/myproject` which we had mentioned above. After that we run a command that will run a script that runs `g++` in our case to build the binary. And voila, it is done.