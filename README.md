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

## Deployment

Production currently deploys through `oddship/nix-system`.

A canary workflow for the future `s3site` path lives at:

- `.github/workflows/deploy-s3site.yml`

That workflow expects these GitHub secrets:

- `TS_OAUTH_CLIENT_ID`
- `TS_OAUTH_SECRET` (OAuth client must be allowed to use `tag:gh-ci`)
- `S3SITE_ACCESS_KEY_ID`
- `S3SITE_SECRET_ACCESS_KEY`
- `DEPLOY_HOST`
- `DEPLOY_SSH_KEY`

It builds the site, joins the tailnet with the Tailscale GitHub Action, uploads `sites/rohanverma.net.tar.gz` to Garage at `http://rhnvrm-private:3900`, and then runs `sudo /run/current-system/sw/bin/s3site refresh` over SSH.

Before using it, `oddship-web` must have:

- the `s3site` service enabled
- agenix-managed `oddship-web-s3site-env.age` with the Garage runtime credentials
- agenix-managed `oddship-web-tailscale-auth.age` with `TAILSCALE_AUTH_KEY=...` so the host can join the tailnet and reach Garage privately

## License

Content © Rohan Verma. Code is available under MIT license.

See the live site at [rohanverma.net](https://rohanverma.net)