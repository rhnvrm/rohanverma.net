# rohanverma.net development tasks - Zola site
# Run with `just <command>`

# Check if we're inside a nix shell
_in-nix-shell := `command -v zola >/dev/null 2>&1 && echo "true" || echo "false"`

# Run a command in nix shell if needed
_run-in-nix *ARGS:
    #!/usr/bin/env bash
    if [ "{{_in-nix-shell}}" = "true" ]; then
        {{ ARGS }}
    else
        echo -e "\033[1;33m⚠️  Required tools not available, entering Nix shell...\033[0m"
        nix develop --command just {{ ARGS }}
    fi

# Default recipe to display help
default:
    @just --list

# Start Zola development server
serve:
    @just _run-in-nix _serve

# Internal: Zola serve (when in nix shell)
_serve:
    #!/usr/bin/env bash
    echo -e "\033[0;32mStarting Zola development server...\033[0m"
    if [ ! -f "config.toml" ]; then
        echo -e "\033[0;31mNo config.toml found. Cannot start server.\033[0m"
        exit 1
    fi
    zola serve --interface 0.0.0.0 --port 1112

# Build Zola site
build:
    @just _run-in-nix _build

# Internal: Zola build (when in nix shell)
_build:
    #!/usr/bin/env bash
    echo -e "\033[0;32mBuilding Zola site...\033[0m"
    if [ ! -f "config.toml" ]; then
        echo -e "\033[0;31mNo config.toml found. Cannot build.\033[0m"
        exit 1
    fi
    zola build
    echo -e "\033[0;32mZola build complete!\033[0m"

# Check available tools and versions
check:
    @just _run-in-nix _check

# Internal: Check tool versions (when in nix shell)
_check:
    #!/usr/bin/env bash
    echo -e "\033[0;32mChecking available tools...\033[0m"
    echo ""
    echo -e "\033[0;34mZola version:\033[0m"
    zola --version
    echo ""
    echo -e "\033[0;34mJust version:\033[0m"
    just --version
    echo ""
    echo -e "\033[0;34mGit status:\033[0m"
    git status --porcelain | head -10

# Clean build artifacts
clean:
    #!/usr/bin/env bash
    echo -e "\033[0;32mCleaning build artifacts...\033[0m"
    rm -rf public
    echo -e "\033[0;32mClean complete!\033[0m"