#!/bin/bash
# sync-renders.sh
# Entry point: catalog preview sync.

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "${1:-}" = "--layouts" ] || [ "${1:-}" = "layout" ]; then
  echo "Layout HTML renders have been retired. Use references/layouts/*.md as the source of truth."
  exit 2
elif [ "${1:-}" = "--blocks" ] || [ "${1:-}" = "blocks" ]; then
  echo "Block HTML renders have been retired. Use references/blocks/**/*.md as contract assets."
  exit 2
elif [ "${1:-}" = "--all" ]; then
  python3 "$PROJECT_DIR/sync_renders.py"
else
  python3 "$PROJECT_DIR/sync_renders.py" "$@"
fi
