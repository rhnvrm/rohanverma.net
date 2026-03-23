# rohanverma.net development tasks - Zola site
# Run with `just <command>`

port := "1111"
host := "127.0.0.1"
logfile := "/tmp/zola-serve.log"

# Check if we're inside a nix shell
_in-nix-shell := `command -v zola >/dev/null 2>&1 && echo "true" || echo "false"`

# Run a command in nix shell if needed
_run-in-nix *ARGS:
    #!/usr/bin/env bash
    if [ "{{_in-nix-shell}}" = "true" ]; then
        exec {{ARGS}}
    else
        echo -e "\033[1;33m⚠️  Required tools not available, entering Nix shell...\033[0m"
        exec nix --extra-experimental-features 'nix-command flakes' develop --command just {{ARGS}}
    fi

# Default recipe to display help
default:
    #!/usr/bin/env bash
    just --list

# Start Zola development server (foreground)
serve:
    @just _run-in-nix _serve

# Start Zola development server with drafts (foreground)
serve-drafts:
    @just _run-in-nix _serve-drafts

# Start dev server in background (with drafts)
bg *FLAGS:
    #!/usr/bin/env bash
    if curl -s -o /dev/null -w "%{http_code}" http://{{host}}:{{port}}/ 2>/dev/null | grep -q 200; then
        echo -e "\033[0;33mServer already running on {{host}}:{{port}}, use 'just stop' first\033[0m"
        exit 1
    fi
    echo -e "\033[0;32mStarting background server on {{host}}:{{port}}...\033[0m"
    just _run-in-nix _bg {{FLAGS}} &
    disown
    # Wait for server to be ready
    for i in $(seq 1 30); do
        if curl -s -o /dev/null -w "%{http_code}" http://{{host}}:{{port}}/ 2>/dev/null | grep -q 200; then
            echo -e "\033[0;32m✓ Server ready at http://{{host}}:{{port}}/\033[0m"
            exit 0
        fi
        sleep 2
    done
    echo -e "\033[0;31m✗ Server failed to start. Check: just logs\033[0m"
    exit 1

# Stop background dev server
stop:
    #!/usr/bin/env bash
    if pkill -f "zola serve.*--port {{port}}" 2>/dev/null; then
        sleep 1
        echo -e "\033[0;32m✓ Server stopped\033[0m"
    elif pkill -f "zola.*serve" 2>/dev/null; then
        sleep 1
        echo -e "\033[0;32m✓ Server stopped\033[0m"
    else
        echo -e "\033[0;33mNo server running\033[0m"
    fi

# Restart background dev server
restart *FLAGS:
    just stop
    just bg {{FLAGS}}

# Show dev server logs
logs:
    #!/usr/bin/env bash
    if [ -f "{{logfile}}" ]; then
        tail -30 {{logfile}}
    else
        echo "No log file found"
    fi

# Check if dev server is running
status:
    #!/usr/bin/env bash
    HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://{{host}}:{{port}}/ 2>/dev/null)
    if [ "$HTTP" = "200" ]; then
        echo -e "\033[0;32m● Server running at http://{{host}}:{{port}}/\033[0m"
    else
        echo -e "\033[0;31m○ Server not running\033[0m"
    fi

# Internal: background serve (always with --drafts)
_bg *FLAGS:
    #!/usr/bin/env bash
    if [ ! -f "config.toml" ]; then
        echo -e "\033[0;31mNo config.toml found.\033[0m"
        exit 1
    fi
    zola serve --drafts --interface {{host}} --port {{port}} {{FLAGS}} >> {{logfile}} 2>&1

# Internal: Zola serve (when in nix shell)
_serve:
    #!/usr/bin/env bash
    echo -e "\033[0;32mStarting Zola development server...\033[0m"
    if [ ! -f "config.toml" ]; then
        echo -e "\033[0;31mNo config.toml found. Cannot start server.\033[0m"
        exit 1
    fi
    zola serve --interface {{host}} --port {{port}}

# Internal: Zola serve with drafts (when in nix shell)
_serve-drafts:
    #!/usr/bin/env bash
    echo -e "\033[0;32mStarting Zola development server (drafts enabled)...\033[0m"
    if [ ! -f "config.toml" ]; then
        echo -e "\033[0;31mNo config.toml found. Cannot start server.\033[0m"
        exit 1
    fi
    zola serve --drafts --interface {{host}} --port {{port}}

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
