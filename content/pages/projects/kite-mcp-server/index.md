+++
title = "kite-mcp-server"
description = "MCP server enabling AI agents to interact with Zerodha's Kite trading platform"
date = 2026-01-03
weight = 2

aliases = ["/projects/kite-mcp-server/", "/projects/starred/kite-mcp-server/"]
[extra]
github_url = "https://github.com/zerodha/kite-mcp-server"
+++

An MCP server that gives AI assistants secure access to [Zerodha's](https://zerodha.com) Kite Connect trading API. It lets AI agents retrieve market data, manage portfolios, and execute trades through a standardized protocol. Built at Zerodha and hosted at `mcp.kite.trade` for anyone with a Kite account to use.

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io/) is a standard for connecting AI assistants to external tools and data sources. Instead of each AI app building custom integrations, MCP provides a common interface. Think of it like USB for AI tools: one protocol, many capabilities.

For trading, this means you can connect Claude, Cursor, or any MCP-compatible client to your Kite account and interact with markets through natural language.

## Features

- **Portfolio management**: View holdings, positions, margins, and mutual fund investments
- **Order management**: Place, modify, and cancel orders with full order history
- **GTT orders**: Good Till Triggered order creation and management
- **Market data**: Real-time quotes, LTP, OHLC, and historical price data
- **Instrument search**: Look up trading instruments across exchanges
- **Pagination**: Automatic pagination for large datasets
- **Multiple deployment modes**: stdio, HTTP, SSE, and hybrid (production)
- **Tool exclusion**: Disable specific tools (e.g., create a read-only instance by excluding order placement)

## Available Tools

The server exposes 20+ tools organized by domain:

| Category | Tools |
|----------|-------|
| **Auth** | `login` |
| **Market Data** | `get_quotes`, `get_ltp`, `get_ohlc`, `get_historical_data`, `search_instruments` |
| **Portfolio** | `get_profile`, `get_margins`, `get_holdings`, `get_positions`, `get_mf_holdings` |
| **Orders** | `place_order`, `modify_order`, `cancel_order`, `get_orders`, `get_trades`, `get_order_history`, `get_order_trades` |
| **GTT** | `get_gtts`, `place_gtt_order`, `modify_gtt_order`, `delete_gtt_order` |

## Quick Start

The fastest way to get started is with the hosted version. No installation needed:

```json
{
  "mcpServers": {
    "kite": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.kite.trade/mcp"]
    }
  }
}
```

Add that to your Claude Desktop config and you're set. Authentication happens through Kite's OAuth flow when you first connect.

For self-hosting, clone the repo and configure your Kite Connect API credentials:

```bash
git clone https://github.com/zerodha/kite-mcp-server
cd kite-mcp-server
cp .env.example .env  # add your KITE_API_KEY and KITE_API_SECRET
go build -o kite-mcp-server && ./kite-mcp-server
```

## Tech Stack

- **Go** with the Kite Connect Go client
- MCP protocol implementation supporting stdio, HTTP, and SSE transports
- Nix flake + direnv for reproducible dev environments
- [Just](https://github.com/casey/just) for build commands
- `synctest` for deterministic timing tests (no flaky CI)

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `KITE_API_KEY` | required | Kite Connect API key |
| `KITE_API_SECRET` | required | Kite Connect API secret |
| `APP_MODE` | `http` | `stdio`, `http`, `sse`, or `hybrid` |
| `APP_PORT` | `8080` | Server port |
| `EXCLUDED_TOOLS` | _(empty)_ | Comma-separated tools to disable |

Production runs in hybrid mode, serving both `/mcp` and `/sse` endpoints so clients can pick whichever transport they prefer.
