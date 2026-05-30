#!/bin/bash
# sync-renders.sh
# Entry point: catalog sync (default) or layout sync (--layouts / layout <slug>).

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$1" = "--layouts" ]; then
  python3 "$PROJECT_DIR/sync_layout_renders.py"
elif [ "$1" = "layout" ] && [ -n "$2" ]; then
  python3 "$PROJECT_DIR/sync_layout_renders.py" "$2"
else
  python3 "$PROJECT_DIR/sync_renders.py" "$@"
fi
