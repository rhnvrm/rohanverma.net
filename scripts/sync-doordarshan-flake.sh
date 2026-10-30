#!/usr/bin/env bash
set -euo pipefail

# Nix flakes do not include Git submodule contents in the root source archive.
# Align both the declared input and lock file with the submodule commit.
theme_rev="$(git -C themes/doordarshan rev-parse HEAD)"
python3 - "$theme_rev" <<'PY'
from pathlib import Path
import re
import sys

path = Path('flake.nix')
source = path.read_text()
updated, count = re.subn(
    r'github:oddship/doordarshan-zola/[0-9a-f]{40}',
    f'github:oddship/doordarshan-zola/{sys.argv[1]}', source,
)
if count != 1:
    raise SystemExit('Expected exactly one pinned Doordarshan input in flake.nix')
if updated != source:
    path.write_text(updated)
PY
nix flake lock --override-input doordarshan "github:oddship/doordarshan-zola/${theme_rev}"
