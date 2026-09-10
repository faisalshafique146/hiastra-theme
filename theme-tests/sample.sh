#!/usr/bin/env bash
# HiAstra shell token fixture
set -euo pipefail

THEME_NAME="HiAstra"
MAX_PREVIEW=3
ACCENTS=("#55D6E6" "#B89CFF" "#F08ACB")

log_preview() {
	local message="$1"
	echo "[${THEME_NAME}] ${message}"
}

if [[ -n "${THEME_NAME}" ]]; then
	for accent in "${ACCENTS[@]}"; do
		log_preview "accent=${accent}"
	done
else
	echo "warning: missing theme name" >&2
	exit 1
fi

case "${1:-preview}" in
	preview) printf 'preview lines: %s\n' "${MAX_PREVIEW}" ;;
	check) command -v code >/dev/null || echo "VS Code was not found" ;;
	*) echo "unknown command: ${1}" >&2 ;;
esac

# TODO: inspect shebangs, variables, substitutions, commands, operators, and warnings.

