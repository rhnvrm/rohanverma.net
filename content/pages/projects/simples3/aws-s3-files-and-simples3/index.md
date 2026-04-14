+++
title = "AWS S3 Files and simples3"
description = "Notes on why AWS S3 Files is out of scope for the core simples3 library."
weight = 2
template = "projects-page.html"
date = 2026-04-13
draft = false
aliases = ["/pages/go/aws-s3-files-and-simples3/"]

[extra]
section_title = "Projects"
+++

This is a note about a feature I decided not to add.

I looked into [AWS S3 Files](https://aws.amazon.com/s3/features/files/) because it sounded like something [simples3](@/pages/projects/simples3/index.md) might eventually support. It has S3 in the name, it works with S3 data, and at first glance it feels close enough to be relevant.

After reading through the docs, CLI, and SDK surface, I came away with a pretty clear conclusion: `simples3` should not add S3 Files support to the core library.

## Why I am not adding it

The short answer is that S3 Files is not just "more S3 object API."

A few signs show that immediately:

- the CLI is `aws s3files`, not `aws s3api`
- the Go SDK has a separate `service/s3files` package
- the API is built around management calls like `CreateFileSystem` and `CreateMountTarget`

That matters because `simples3` is deliberately narrow. It is a small S3 object and bucket client. People use it for things like:

- upload and download
- list and delete
- bucket operations
- presigned URLs
- talking to S3-compatible endpoints without dragging in the full AWS SDK

S3 Files pulls the conversation somewhere else entirely:

- file systems and mount targets
- IAM roles and permissions
- VPCs, subnets, and security groups
- mount helpers and NFS access
- AWS-only workflows

Once those concerns show up, we are not really talking about a minimal object-storage library anymore.

## This feels closer to Terraform/OpenTofu territory

This was probably the biggest clue for me.

If I wanted to automate S3 Files, my first instinct would not be to extend a small object client. I would expect that work to live in infrastructure tooling, or in the AWS SDK itself.

S3 Files looks much more like something you provision and manage alongside IAM, networking, and mounts. That makes it feel closer to Terraform, OpenTofu, CloudFormation, or Pulumi than to a library whose main job is object operations.

That does not make S3 Files uninteresting. It just puts it in a different category.

## What this means in practice

If a bucket is used by S3 Files, `simples3` can still talk to that bucket as a normal S3 bucket. That part is fine.

What I do not want to imply is that `simples3` understands the S3 Files service itself, because it doesn't, and I do not think it should.

S3 Files also brings its own rules and caveats around things like versioning, encryption, metadata, and ACL behavior. Those are real constraints, but they belong to the S3 Files layer, not inside the core of `simples3`.

## Could there still be a Go package for it?

Maybe. If I ever need lightweight S3 Files automation without the full AWS SDK, I would rather put that in a separate package, something like `simples3/s3files` or `simples3/x/s3files`.

Even then, I would treat it as AWS-only control-plane code, not as an expansion of the main library.

## Conclusion

So this is really a scope decision.

I would rather let `simples3` stay small and honest about what it is than stretch it into a different AWS product with a very different operational model.
