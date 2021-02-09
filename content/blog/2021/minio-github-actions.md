---
title: "Using Minio in Github actions to mock s3"
author: ["rhnvrm"]
date: 2021-02-09T19:48:00+05:30
draft: false
url: "blog/2021/02/09/minio-github-actions"
---

I recently added Github Actions for [simples3.](https://github.com/rhnvrm/simples3) In a recent PR, a [contributor](https://github.com/jacksgt)
added support for custom endpoints. I was currently running `go test` on the
library using a local `.env` files which contains real AWS keys and an actual `s3`
bucket. I realized that we can mock this using a [minio](https://min.io/) server as well.

Coming from having used Gitlab pipelines, it seemed to be straightforward
to do. I would simply have to run a service and just set the appropriate
environment vars. Unfortunately, Github pipelines does not seem to support
container args for services. The conventional hack on most repos, is to build a
custom Dockerfile with the custom command, but it seemed unnecessary for just mocking minio for tests.

So after reading a bit, I found out that you can actually just run `docker run`
inside the job command as a step. Essentially, it boils down to just adding it
to your pipeline and setting up a few env vars. Minio accepts `MINIO_ACCESS_KEY`
and `MINIO_SECRET_KEY` in the docker env, which it uses to bootstrap the admin
credentials for the first time. These can be further used to create a mock
bucket using `aws s3 mb` and provide the custom endpoint as a flag. Finally,
`simples3` will use its own environment vars to interact with the mock minio, and
run the tests on it.

Here is the full workflow for reference:

```yaml
name: Go Test

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Set up Go
        uses: actions/setup-go@v2
        with:
          go-version: 1.15
      - name: Setup minio
        run: |
          docker run -d -p 9000:9000 --name minio \
                     -e "MINIO_ACCESS_KEY=minioadmin" \
                     -e "MINIO_SECRET_KEY=minioadmin" \
                     -v /tmp/data:/data \
                     -v /tmp/config:/root/.minio \
                     minio/minio server /data

          export AWS_ACCESS_KEY_ID=minioadmin
          export AWS_SECRET_ACCESS_KEY=minioadmin
          export AWS_EC2_METADATA_DISABLED=true

          aws --endpoint-url http://127.0.0.1:9000/ s3 mb s3://testbucket

      - name: Run Go Test
        run: go test -v ./...
        env:
          AWS_S3_BUCKET: testbucket
          AWS_S3_ACCESS_KEY: minioadmin
          AWS_S3_SECRET_KEY: minioadmin
          AWS_S3_ENDPOINT: http://127.0.0.1:9000
```
