+++
title = "Automate fast download of a large files through FTP"
date = "2018-08-20T06:27:08+00:00"
path = "blog/2018/08/20/automate-fast-download-of-a-large-files-through-ftp/"

[extra]
  author = "Rohan Verma"
+++

`lftp -e 'set net:timeout 10; pget -n 10 BigFile.zip; bye' -u UserName,PassWord ftp://BigFiles.com`