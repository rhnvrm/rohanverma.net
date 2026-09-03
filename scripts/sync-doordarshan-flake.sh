#!/usr/bin/env bash
set -euo pipefail

# Nix flakes do not include Git submodule contents in the root source archive.
# Keep the fetched theme input aligned with the exact submodule commit used by
# this checkout before building, so the two references cannot silently drift.
theme_rev="$(git -C themes/doordarshan rev-parse HEAD)"
nix flake lock --override-input doordarshan "github:oddship/doordarshan-zola/${theme_rev}"
