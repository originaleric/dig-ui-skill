#!/bin/bash
# sync-renders.sh
# Entry point: catalog sync (default) or layout sync (--layouts / layout <slug>).
# Layout sync supports --no-global to skip global rules in render output.

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

NO_GLOBAL_FLAG=""
FILTERED_ARGS=()
for arg in "$@"; do
  if [ "$arg" = "--no-global" ]; then
    NO_GLOBAL_FLAG="--no-global"
  else
    FILTERED_ARGS+=("$arg")
  fi
done

if [ "${FILTERED_ARGS[0]:-}" = "--layouts" ]; then
  python3 "$PROJECT_DIR/sync_layout_renders.py" $NO_GLOBAL_FLAG
elif [ "${FILTERED_ARGS[0]:-}" = "layout" ] && [ -n "${FILTERED_ARGS[1]:-}" ]; then
  python3 "$PROJECT_DIR/sync_layout_renders.py" "${FILTERED_ARGS[1]}" $NO_GLOBAL_FLAG
else
  python3 "$PROJECT_DIR/sync_renders.py" "${FILTERED_ARGS[@]}"
fi
