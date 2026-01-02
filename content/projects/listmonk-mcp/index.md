+++
title = "listmonk-mcp"
description = "MCP server for Listmonk newsletter management"
weight = 3

[extra]
github_url = "https://github.com/rhnvrm/listmonk-mcp"
+++

An MCP (Model Context Protocol) server that enables LLMs and AI assistants to interact with [Listmonk](https://listmonk.app) newsletter instances.

## Features

- **Complete Listmonk API Coverage** - All major operations supported
- **18 MCP Tools** - Subscriber, list, campaign, and template management
- **MCP Resources** - Easy access to subscriber, list, campaign, and template data
- **Async Operations** - Built with modern async/await patterns
- **Type Safety** - Full Pydantic model validation

## Use Cases

- Subscriber management (add, remove, update)
- Mailing list operations (create, manage lists)
- Campaign management (create, send newsletters)
- Analytics and reporting access
- Template and content management

## Installation

```bash
# Using uvx (recommended)
uvx listmonk-mcp --help

# Or pip
pip install listmonk-mcp
```

## Usage with Claude

Add to your Claude config:

```json
{
  "mcpServers": {
    "listmonk": {
      "command": "uvx",
      "args": ["listmonk-mcp"],
      "env": {
        "LISTMONK_URL": "https://your-listmonk-instance.com",
        "LISTMONK_USERNAME": "admin",
        "LISTMONK_PASSWORD": "your-password"
      }
    }
  }
}
```
