+++
title = "simples3"
description = "Simple no frills AWS S3 Golang Library using REST with V4 Signing (without AWS Go SDK)"
weight = 1

[extra]
github_url = "https://github.com/rhnvrm/simples3"
+++

A lightweight Go library for AWS S3 that uses REST APIs with V4 signing, without pulling in the entire AWS SDK.

## Why simples3?

The official AWS Go SDK is massive. If all you need is basic S3 operations (upload, download, presigned URLs), pulling in 50+ MB of dependencies feels excessive. simples3 provides a minimal alternative with zero dependencies beyond the standard library.

## Features

- **Lightweight**: No AWS SDK dependency
- **V4 Signing**: Full AWS Signature V4 support
- **Simple API**: Intuitive methods for common operations
- **Presigned URLs**: Generate time-limited access URLs

## Usage

```go
s3 := simples3.New(region, accessKey, secretKey)

// Upload
err := s3.FileUpload(simples3.UploadInput{
    Bucket:      "mybucket",
    ObjectKey:   "path/to/file.txt",
    ContentType: "text/plain",
    Body:        file,
})

// Download
data, err := s3.FileDownload(simples3.DownloadInput{
    Bucket:    "mybucket",
    ObjectKey: "path/to/file.txt",
})

// Presigned URL
url := s3.GeneratePresignedURL(simples3.PresignedInput{
    Bucket:        "mybucket",
    ObjectKey:     "path/to/file.txt",
    Method:        "GET",
    Timestamp:     time.Now(),
    ExpirySeconds: 3600,
})
```
