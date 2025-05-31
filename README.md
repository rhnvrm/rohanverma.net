# rohanverma.net

Personal website and blog built with [Zola](https://www.getzola.org/), a fast static site generator written in Rust.

## Developer Setup

This project uses Nix flakes for reproducible development environment and Just as a command runner.

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled
- [Just](https://github.com/casey/just) command runner (installed via Nix in this project)

### Getting Started

1. Clone the repository
2. Enter the development shell:
   ```bash
   nix develop
   ```

### Development Commands

**Using Just command runner:**
```bash
just                # Show available commands
just serve          # Start Zola development server
just build          # Build Zola site
just check          # Check available tools and versions
just clean          # Clean build artifacts
```

The justfile will automatically detect if you're running in a Nix shell and enter it if necessary.

**Direct commands (within nix develop):**
```bash
zola serve    # Development server
zola build    # Build for production
```

### Project Structure

- `content/` - Content (markdown files)
  - Blog posts (2010-2021)
  - Projects with images
  - Static pages (contact, now, etc.)
- `templates/` - Zola templates
- `sass/` - Sass stylesheets
- `static/` - Static assets (images, files, etc.)
- `config.toml` - Zola configuration
- `flake.nix` - Nix development environment
- `justfile` - Development task definitions
- `ai/` - Project documentation

## License

Content © Rohan Verma. Code is available under MIT license.

See the live site at [rohanverma.net](https://rohanverma.net)