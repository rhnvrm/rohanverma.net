+++
title = "catprinter"
description = "Go library for mini thermal printers (58mm, 384 dots)"
weight = 8

[extra]
github_url = "https://github.com/rhnvrm/catprinter"
+++

Go library for "cat printer" style mini thermal printers (58mm width, 384 dots). These printers use a proprietary protocol, not ESC/POS.

## Features

- BLE connection via `tinygo.org/x/bluetooth`
- PD01 proprietary protocol (`0x5178` header, CRC8 checksum)
- Text printing (rendered as bitmap)
- Device scanning with printer filtering

## Usage

```bash
# Scan for printers
./catprinter scan --printers

# Print text
./catprinter print --addr D1:08:04:1E:E3:B8 --text "Hello!"

# Custom font size
./catprinter print --addr D1:08:04:1E:E3:B8 --text "Hi" --size 80
```

## Install

```bash
go get github.com/rhnvrm/catprinter
```

## Background

These cheap thermal printers from China don't use standard protocols. I reverse-engineered the `0x5178` protocol to make them usable from Go.
