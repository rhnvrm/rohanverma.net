+++
title = "Bureaucat"
description = "Task and approval workflow app with tamper-proof audit trails"
date = 2026-03-30
weight = 6
aliases = ["/projects/bureaucat/"]

[extra]
github_url = "https://github.com/bureaucatorg/bureaucat"
context = "By [Ameya](https://github.com/codingCoffee). Clean Go + Nuxt stack with a neat SHA-256 hash chain for tamper-proof audit logs."
+++

A task and approval workflow app built for teams that value clarity, auditability, and speed. Every action is recorded in a SHA-256 hash chain, tamper-proof by design.

## Features

- **Project-based tasks** — sequential IDs (e.g. `DEVOP-123`), priorities, labels, workflow states
- **Hash chain audit log** — SHA-256 verification on every action
- **Mattermost integration** — DM notifications for assignments and mentions
- **SSO** — Google and Zitadel (OIDC)
- **Role-based access** — system-level and project-level permissions
- **Single binary** — embedded frontend and migrations

Built with Go, Nuxt 4, PostgreSQL, and Tailwind.
