#!/usr/bin/env bash
set -euo pipefail
zola build "$@"
python3 scripts/social_cards.py
