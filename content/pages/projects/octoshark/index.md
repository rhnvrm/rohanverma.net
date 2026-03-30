+++
title = "OctoShark"
description = "Chrome extension that adds a one-click deploy button to GitHub repos with Dockerfiles, spinning up a DigitalOcean droplet and running the project automatically. Won first prize at DigitalOcean Cloud Hack 2016."
date = 2026-03-30
weight = 17
aliases = ["/projects/octoshark/"]

[extra]
status = "archived"
github_url = "https://github.com/CapsLockHacks/OctoShark-Server"
+++

*Hackathon project (DigitalOcean Cloud Hack 2016, 91springboard Delhi). Won first prize in the cloud track. Not actively developed.*

OctoShark is a Chrome extension that scans GitHub repositories for a `Dockerfile` and adds a one-click deploy button. Click it, and OctoShark spins up a fresh DigitalOcean droplet, clones the repo, and runs the Docker container on it. The idea was to make it trivially easy to test any Dockerized open source project without setting up a local dev environment.

## The Problem

As developers and open source contributors, we knew that one of the hardest parts of getting started with a new project is replicating the development environment. Docker had already made this easier (a quick GitHub search at the time showed over 300,000 public repos with Dockerfiles), but you still had to provision a server, clone the repo, build the image, and run the container yourself. We wanted to collapse that into a single click.

## How It Works

The Chrome extension, built on the [Kango](http://kangoextensions.com/) cross-browser framework, injects itself into GitHub pages. When it detects a `Dockerfile` in a repository, it shows a deploy button. Clicking it sends a request to the OctoShark backend API with the repo URL and the user's preferences for region and droplet size.

The backend (a Flask API) then:

1. Registers the user's SSH key with DigitalOcean
2. Creates a new droplet with the `docker-16-04` image via the DigitalOcean API
3. SSHs into the new droplet using Paramiko
4. Clones the repository and runs the Docker container

The droplet creation and SSH setup happen in a background thread so the extension gets a response quickly. Beyond deploying new projects, the extension also showed real-time info about existing droplets and let you manage them directly from the browser.

## Hackathon Context

Team CapsLockHacks built this at DigitalOcean Cloud Hack in November 2016, hosted at 91springboard in Okhla, New Delhi. As Karan [wrote about the experience](https://medium.com/@mrkaran/my-experience-at-cloud-hack-e8874e0e97f9), the problem statement was available beforehand but we didn't settle on the idea until the hackathon started. We split into sub-groups: one working on the Python API, the other on the Chrome extension, with some pair programming to keep things moving.

The classic hackathon mishap hit us around 3 AM when we added threading to speed up the API response time but pushed untested code. After a planned-for-5AM-but-actually-8AM wake-up, we spent the morning ironing out bugs before demos. It came together in time, and the demo went well enough to win first prize in the cloud track.

## Tech Stack

- **Chrome extension**: JavaScript, built with the Kango cross-browser extension framework
- **Backend API**: Python 3.5, Flask, hosted on Heroku (with Gunicorn)
- **DigitalOcean integration**: `python-digitalocean` library for droplet and SSH key management
- **Remote execution**: Paramiko for SSHing into newly created droplets
- **Deployment**: Docker image (`docker-16-04`) on DigitalOcean droplets

## Links

- [GitHub (Server)](https://github.com/CapsLockHacks/OctoShark-Server)
- [GitHub (Extension)](https://github.com/CapsLockHacks/OctoShark-Extension)
- [Demo video](https://www.youtube.com/watch?v=YVKhtYZ9Cyo)
- [Karan's hackathon writeup](https://medium.com/@mrkaran/my-experience-at-cloud-hack-e8874e0e97f9)
