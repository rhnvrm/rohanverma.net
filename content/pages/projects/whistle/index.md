+++
title = "Whistle"
description = "Dead man's switch for whistleblowers using NuCypher proxy re-encryption and Ethereum smart contracts. ETHIndia 2018 hackathon project, Top 7."
date = 2026-03-30
weight = 13
aliases = ["/projects/whistle/"]

[extra]
status = "archived"
github_url = "https://github.com/CapsLockHacks/nucypher-mocknet-api"
+++

*Hackathon prototype (ETHIndia 2018, Top 7 finish). Not actively developed.*

Whistle was a dead man's switch for whistleblowers. The idea: store encrypted data on the blockchain, and only decrypt it after the person stops sending heartbeat transactions. If you stop checking in, the system assumes the worst and releases your files to a list of recipients (journalists, news outlets, etc.).

Built by a team of three: [Ayush Shukla](https://devfolio.co/@siftbox), Rohan Verma, and [Ronak Doshi](https://devfolio.co/@Ronak-59).

## Why This Exists

People who hold sensitive information often live under threat. Whistleblowers, witnesses to corruption, members of powerful families who want out. The [Vyapam scam](https://www.firstpost.com/india/mystery-of-vyapam-scam-the-death-toll-keeps-increasing-in-indias-killer-scandal-2316888.html) in India saw over 40 people associated with the case die after the story broke in 2013, many of them critical witnesses whose testimony was lost.

The pitch was simple: if you can't trust any centralized service not to censor your message, put it on a decentralized network with a time-locked release mechanism. The data stays encrypted as long as you keep sending heartbeats. Stop checking in, and your files get decrypted and emailed to your chosen recipients.

## How It Worked

Three layers:

**Smart Contract (Solidity on a private Geth chain)**
- Stored encrypted data references and NuCypher policy IDs
- Tracked heartbeat timestamps per user (each check-in pushes the deadline forward)
- Exposed a read-only function for the NuCypher mocknet to check the "is alive" condition

**NuCypher Mocknet (proxy re-encryption)**
- Performed the actual encryption/decryption
- Would only decrypt when the smart contract's condition was met (last heartbeat older than current time)
- Handled key management and re-encryption grants to recipients

**Platform layer**
- Users uploaded files, which were encrypted and stored on IPFS
- The file hash and encryption metadata went on-chain
- When the dead man's switch triggered, the platform sent emails with IPFS links to all registered recipients

## What Got Built

Over 36 hours at ETHIndia 2018:

- Solidity smart contract for heartbeat tracking and policy storage
- NuCypher mocknet integration for conditional decryption
- IPFS file storage with on-chain hash references
- Email notification system for recipients
- Frontend for user registration and heartbeat check-ins

The team originally tried building a Status.im chatbot that would handle heartbeat transactions through chat messages, but the `/debug` console command had been deprecated, so that path was dropped.

## Tech Stack

- Solidity (smart contracts)
- NuCypher Mocknet (proxy re-encryption)
- Geth (private Ethereum chain)
- IPFS (file storage)
- Python (mocknet API)

The code is split across several repos:
- [nucypher-mocknet-api](https://github.com/CapsLockHacks/nucypher-mocknet-api) (NuCypher integration)
- [File-Encrypt-IPFS-Solidity](https://github.com/siftbox/File-Encrypt-IPFS-Solidity) (smart contracts)
- [File-Encrypt-IPFS-Platform](https://github.com/siftbox/File-Encrypt-IPFS-Platform) (platform layer)
- [Alive.Network-Frontend](https://github.com/Ronak-59/Alive.Network-Frontend/) (frontend)

[Devfolio project page](https://devfolio.co/projects/whistle)
