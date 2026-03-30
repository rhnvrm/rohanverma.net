+++
title = "Combining Multiple Git Repos While Preserving History"
weight = 2
template = "pages-page.html"
date = 2024-08-13
draft = false

[extra]
section_title = "TIL"
+++

Suppose you have a case where you have multiple repos and you must combine them into a single monorepo. It is straightforward to just simply import a repo by copy pasting the contents into a sub folder.

But what if you want to save the contents and the git history of the repo which is to be imported.

For this, we can use:

```bash
git remote add -f <remote-name> <remote-url>
git subtree add --prefix=<directory> <remote-name> <branch>
```

Replace `<remote-name>`, `<remote-url>`, `<directory>`, and `<branch>` with your desired values. For example:

- `<remote-name>`: A name for the remote repository (e.g., `my-remote`).
- `<remote-url>`: The URL of the remote repository (e.g., `git@yourdomain.com:yourgroup/yourproject.git`).
- `<directory>`: The directory where you want to add the subtree (e.g., `subtree-dir`).
- `<branch>`: The branch you want to add from the remote repository (e.g., `main` or `master`).

Ref: [Git Subtree basics · GitHub](https://gist.github.com/SKempin/b7857a6ff6bddb05717cc17a44091202)
