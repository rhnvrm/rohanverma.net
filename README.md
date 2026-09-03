# rohanverma.net

Personal website and blog built with [Zola](https://www.getzola.org/), a fast static site generator written in Rust.

## Developer Setup

This project uses Nix flakes for reproducible development environment and Just as a command runner.

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled
- [Just](https://github.com/casey/just) command runner (installed via Nix in this project)

### Getting Started

1. Clone the repository with submodules:
   ```bash
   git clone --recurse-submodules https://github.com/rhnvrm/rohanverma.net.git
   cd rohanverma.net
   ```
   If you already cloned it without submodules:
   ```bash
   git submodule update --init --recursive
   ```
2. Enter the development shell:
   ```bash
   nix develop
   ```

### Development Commands

**Using Just command runner:**
```bash
just                # Show available commands
just serve          # Start Zola development server
just admin          # Start local-only Markdown editor on port 1112
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

### Local admin editor

Run `just admin` in a second terminal while `just serve-drafts` (or `just bg`) is running. Open `http://127.0.0.1:1112/admin/` to create drafts, edit blog posts or pages, preview them through Zola, and change content between draft and public. The same local origin proxies the actual Zola site at `/`, injects local-only in-page editing controls, and shows a live preview beside the Markdown editor. If port 1112 is occupied, use `ADMIN_PORT=33447 just admin` and open that port instead. The editor is provided by Doordarshan's `dev/` tooling, binds only to loopback, and writes only Markdown under `content/blog/` and `content/pages/`; it does not commit, push, or deploy anything.

### Project Structure

- `content/` - Content (markdown files)
  - Blog posts (2010-2021)
  - Projects with images
  - Static pages (contact, now, etc.)
- `templates/` - Site-level Zola overrides/hooks
- `sass/` - Sass stylesheets
- `static/` - Static assets (images, files, etc.)
- `themes/doordarshan/` - External theme submodule from `oddship/doordarshan-zola`
- `config.toml` - Zola configuration
- `flake.nix` - Nix development environment
- `justfile` - Development task definitions
- `ai/` - Project documentation

## Deployment

Production now deploys through `s3site` hosted on `oddship-web`.

The deploy workflow is:

- `.github/workflows/deploy-s3site.yml`

That workflow expects these GitHub secrets:

- `TS_OAUTH_CLIENT_ID`
- `TS_OAUTH_SECRET` (OAuth client must be allowed to use `tag:gh-ci`)
- `S3SITE_ACCESS_KEY_ID`
- `S3SITE_SECRET_ACCESS_KEY`

It builds the site, joins the tailnet with the Tailscale GitHub Action, uploads `sites/rohanverma.net.tar.gz` to Garage at `http://rhnvrm-private:3900`, verifies the object exists, and then lets `oddship-web` pick it up on the next `s3site` poll.

The workflow runs on every push to `master` and can also be triggered manually with `workflow_dispatch`.

Before using it, `oddship-web` must have:

- the `s3site` service enabled
- `services.s3site.poll = "5m";` (or another interval you are comfortable with)
- agenix-managed `oddship-web-s3site-env.age` with the Garage runtime credentials
- agenix-managed `oddship-web-tailscale-auth.age` with the raw OAuth client secret so the host can join the tailnet and reach Garage privately

## License

Content © Rohan Verma. Code is available under MIT license.

See the live site at [rohanverma.net](https://rohanverma.net)
