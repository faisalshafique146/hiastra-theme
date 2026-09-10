# Changelog

Notable changes to HiAstra Theme are recorded here, newest first.

<!-- Release workflow:
Keep ongoing work under Unreleased. On publication, move the shipped entries
into a section such as "## [0.1.0] - YYYY-MM-DD", using the actual release date
and the version in package.json. Leave a new Unreleased section above it.
Use Added, Changed, Fixed, Deprecated, Removed, or Security as needed;
omit empty categories. Do not mark planned changes as already released.
-->

## [Unreleased]

Planned initial release: **0.1.0**. No published release is recorded yet.

### Added

- A deep-violet dark workbench with coordinated editor, sidebar, panel, terminal, and navigation colors.
- Vibrant syntax highlighting for JavaScript, TypeScript, JSX, TSX, HTML, CSS, JSON, Python, Markdown, and shell scripts.
- Semantic token styles coordinated with the TextMate palette.
- Installation documentation and language fixtures for visual theme testing.
- Five real VS Code screenshots for TypeScript, JavaScript, Python, HTML, and CSS, with compact showcase source files.

### Changed

- Refined contrast, comments, selections, focus states, and diagnostic colors while preserving the existing palette.
- Added magenta UI borders and active-tab top/bottom indicators, with softer inactive dividers.

### Fixed

- Conflicting syntax rules affecting CSS selectors and values, Python decorators and calls, shell commands, and Markdown inline code.
- Darkened active selections to improve contrast when syntax foreground colors are retained, and made inactive selections translucent to preserve underlying decorations.
- Preserved inherited bold/italic styles when applying semantic deprecated-token strikethrough.
- Hid draft screenshot placeholders from the rendered README until real images are supplied.
