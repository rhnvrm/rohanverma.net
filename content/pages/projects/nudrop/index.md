+++
title = "Nudrop"
description = "Hackathon project: SecureDrop alternative using NuCypher. Prototype only."
date = 2026-01-02
weight = 12

aliases = ["/projects/nudrop/"]
[extra]
status = "archived"
github_url = "https://github.com/rhnvrm/nudrop"
+++

*Hackathon prototype (2021), not actively developed. GitHub repo is archived.*

A SecureDrop alternative built on NuCypher and Ethereum during the [Ethereum India Fellowship 2.0](https://devfolio.co/projects/nudrop-e647). The idea was to help whistleblowers submit data anonymously to media organizations using decentralized cryptographic infrastructure, without requiring a self-hosted server like traditional SecureDrop.

## How It Worked

The system used proxy re-encryption via the NuCypher network. Three actors:

- **Alice** (e.g. a press foundation) funds the encryption policy and controls access
- **Enrico** (e.g. a whistleblower) encrypts and uploads data using Alice's policy key
- **Bob** (e.g. a journalist) receives access to decrypt the data through NuCypher's Ursula network

Data was stored on IPFS. Alice could grant and revoke access to specific Bobs without ever interacting with them directly. Enrico only needed the policy public key, no wallet or browser extension required.

## Advantages Over SecureDrop

- Alice can disappear and Bob can still access data (as long as the policy hasn't expired)
- No direct server needed. Encrypted data lives on IPFS
- Alice and Bob never need to interact directly
- Multiple Enricos can write to the same policy
- Only ETH needed, no NuCypher tokens for end users

## What Got Built

Built over ~6 weeks as part of the Ethereum India Fellowship 2.0:

- Python API (Starlette, later migrating to FastAPI) wrapping NuCypher's library
- Vue.js frontend with a custom wallet UI for transaction signing
- Redis backend for Alice/Bob session management
- Socket.IO integration for the signer class
- Deployed prototype at nudrop.net (now offline)

The codebase is roughly 42% Python, 37% Vue, and the rest HTML/SCSS/JS. Licensed under AGPL-3.0.

Reached out to Newslaundry (Indian news outlet) who expressed interest, but the project never moved past prototype stage.

## The Signing Problem

One of the harder challenges was keeping private keys out of the backend. NuCypher's Python library expects an Ethereum node that can sign transactions, which normally means handing over private keys. Infura and similar providers don't sign for you.

MetaMask's `sign` method prefixes the data, so signed transactions from MetaMask couldn't be forwarded to the backend as-is. The workaround was building a custom (basic) wallet UI that managed signing in the browser and sent signed transactions back to the API directly.

## Original Proposal

Full writeup with user flows, architecture diagrams, and weekly progress: [HackMD](https://hackmd.io/@rhnvrm/ry1DZ0-W_)

[Devfolio project page](https://devfolio.co/projects/nudrop-e647)
