+++
title = "nvim-claudecode-mcp"
description = "Neovim plugin providing MCP server for AI editor integration"
weight = 4

[extra]
github_url = "https://github.com/rhnvrm/nvim-claudecode-mcp"
+++

A Neovim plugin that provides MCP (Model Context Protocol) server functionality, allowing AI assistants like Claude to interact with your editor through a WebSocket-based server.

A focused fork of [claudecode.nvim](https://github.com/coder/claudecode.nvim) with persistent state management.

## Features

- **Auto-start per repository** - Remembers if you started the server in each repo
- **11 Editor tools** - File operations, selection tracking, diagnostics, diff views
- **Real-time selection tracking** - Broadcasts cursor and selection changes
- **WebSocket server** - RFC 6455 compliant with JSON-RPC 2.0 protocol
- **Persistent state** - Remembers server preferences across sessions

## Installation

```lua
-- lazy.nvim
{
  "rhnvrm/nvim-claudecode-mcp",
  dependencies = { "echasnovski/mini.diff" },
  event = "VeryLazy",
  config = function()
    require("nvim-claudecode-mcp").setup({
      port_range = { min = 3000, max = 3999 },
      auto_start = true,
      selection_tracking = true,
    })
  end,
}
```

## Commands

- `:MCPStart` - Start the MCP server
- `:MCPStop` - Stop the MCP server
- `:MCPToggle` - Toggle the server on/off
- `:MCPStatus` - Show server status

## Workflow

1. Run `:MCPStart` in a repository
2. Connect your AI assistant to the WebSocket server
3. AI can now interact with files, selections, diagnostics
4. Server auto-starts next time you open the same repo
