+++
title = "simples3"
description = "Simple no frills AWS S3 Golang Library using REST with V4 Signing (without AWS Go SDK)"
date = 2026-01-02
weight = 1

aliases = ["/projects/simples3/"]
[extra]
github_url = "https://github.com/rhnvrm/simples3"
+++

A Go library for manipulating objects in S3 buckets using REST API calls signed with AWS Signature Version 4. Used in production at [Zerodha](https://zerodha.tech).

## Scope

I looked into whether `simples3` should add support for AWS S3 Files. I decided not to put that into the core library. S3 Files is a separate AWS service with its own control plane and operational model, and it would pull `simples3` away from its main job: being a small S3 object client. I wrote up the reasoning here: [AWS S3 Files and simples3](@/pages/go/aws-s3-files-and-simples3.md).

## Why simples3?

The official AWS Go SDK is massive. If all you need is basic S3 operations, pulling in a much larger dependency tree feels excessive. simples3 provides a minimal alternative with **zero dependencies** beyond the Go standard library.

## Features

- Simple, intuitive API following Go idioms
- Complete S3 operations: Upload, Download, Delete, List, Details
- Multipart upload with parallel uploads and progress tracking
- Bucket management: Create, Delete, List
- AWS Signature Version 4 signing
- Custom endpoint support (MinIO, DigitalOcean Spaces, etc.)
- Presigned URL generation for secure browser uploads/downloads
- Object versioning and server-side encryption (SSE-S3, SSE-KMS)
- IAM credential support for EC2 instances
- Iterator-based ListAll for memory-efficient large bucket iteration

## Quick Start

```go
s3 := simples3.New("us-east-1", "access-key", "secret-key")

// Upload
resp, err := s3.FileUpload(simples3.UploadInput{
    Bucket:      "my-bucket",
    ObjectKey:   "path/to/file.txt",
    ContentType: "text/plain",
    Body:        file,
})

// Download
data, err := s3.FileDownload(simples3.DownloadInput{
    Bucket:    "my-bucket",
    ObjectKey: "path/to/file.txt",
})

// Presigned URL
url := s3.GeneratePresignedURL(simples3.PresignedInput{
    Bucket:        "my-bucket",
    ObjectKey:     "path/to/file.txt",
    Method:        "GET",
    ExpirySeconds: 3600,
})
```

## Install

```sh
go get github.com/rhnvrm/simples3
```
