---
title: Automate fast download of a large files through FTP
author: Rohan Verma
type: post
date: 2018-08-20T06:27:08+00:00
url: blog/2018/08/20/automate-fast-download-of-a-large-files-through-ftp/
categories:
  - notes
tags:
  - linux
  - productivity

---
`lftp -e 'set net:timeout 10; pget -n 10 BigFile.zip; bye' -u UserName,PassWord ftp://BigFiles.com`