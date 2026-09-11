# HiAstra release-readiness audit

Historical snapshot of the 0.1.0 preparation audit below, not a current release
verdict. Since this review, the user supplied the GitHub repository, chose MIT,
and added screenshots. The upcoming 0.2.0 language update expands the checker to
117 assertions across 17 fixtures; see `README.md`, `theme-tests/README.md`, and
the Unreleased changelog. Revalidate the final VSIX before publishing.

Reviewed 2026-09-10. Verdict: **not ready for public release yet**. Publisher:
`hi-soft-tech`; extension ID: `hi-soft-tech.hiastra-theme`; manifest version:
`0.1.0`. No account information or license was invented, and nothing was published.

## 1. MUST FIX BEFORE RELEASE

### Complete the public links

`package.json` still contains `REPLACE_WITH_GITHUB_OWNER` and
`REPLACE_WITH_REPOSITORY_NAME` in repository, homepage, and bugs metadata. The
README uses those placeholders for feedback, contributing, and fixture links.
Supply real URLs or remove optional links until real destinations exist. There
is no configured Git remote from which to establish the repository URL. If the
repository root is the outer workspace, include `hiastra-theme` in source links
and consider `repository.directory` in the manifest.

### Decide and document the license

The manifest still says `UNLICENSED`, there is no license file, and the README
contains `REPLACE_WITH_CHOSEN_LICENSE`. This is an unresolved release decision,
not invalid JSON. Choose MIT or appropriate proprietary terms, add the matching
license document, and make the README and manifest agree. The package inclusion
list already permits LICENSE, LICENSE.md, LICENSE.txt, and standard NOTICE files.
Do not treat skipping the packaging warning as a license decision. Confirm that
you have the rights to distribute the icon and any other artwork.

### Finalize and test the actual release artifact

The existing `hiastra-theme-0.1.0.vsix` predates this audit's source corrections.
Rebuild after completing metadata and licensing; do not upload the stale VSIX.
Keep the changelog under Unreleased until the release is actually made, then
record its version and real release date. Version 0.1.0 is syntactically valid;
verify that it has not already been published, or increment it for an update.
The audit did not authenticate publisher ownership or check publication history.

Install the rebuilt VSIX in a normal VS Code window or a clean testing profile.
Verify the new selection shade, pink active/unfocused borders, errors/warnings,
and all ten language fixtures with semantic highlighting on and off. Static
checks cannot establish live rendering, all provider behavior, color-vision
accessibility, or comfort over a long session.

### Safe corrections completed in this audit

- Changed editor selection background from `#3A3268` to existing palette color
  `#2A2450`: comments retaining their syntax foreground improve from 3.62:1 to
  4.53:1. All explicit TextMate foreground colors reach at least 4.5:1 on this
  selection background. This does not assume a selected-text foreground override.
- Changed inactive selections to `#2A245080`, preserving underlying decorations
  as the [VS Code color reference](https://code.visualstudio.com/api/references/theme-color#editor-colors) specifies.
- Changed semantic deprecated styling from `fontStyle: "strikethrough"` to
  `strikethrough: true`. The former also resets other font styles; the latter
  preserves inherited bold/italic styling. The [semantic style implementation](https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/tokenClassificationRegistry.ts)
  documents this distinction. Foreground colors and other semantic rules were preserved.
- Hid the whole draft screenshot section in a Markdown HTML comment. The
  maintainer placeholders remain editable without appearing in the rendered listing.
- Updated the Unreleased changelog with pink borders and these corrections;
  marked the earlier accessibility report as a historical snapshot; corrected
  two internal rule-name typos with no scope/color changes.

## 2. OPTIONAL FUTURE IMPROVEMENTS

- Add genuine screenshots of TSX/workbench, HTML/CSS, and Python/Markdown.
  Screenshots are not required for packaging, but are particularly useful for a
  theme. Use HTTPS image URLs or explicitly include local screenshot assets in
  `.vscodeignore`; it currently allows only `images/icon.png` from that folder.
- Optimize the icon for Marketplace thumbnails. It is a real, visually inspected
  **1254 x 1254 PNG**, approximately **1.21 MB**, correctly included in the VSIX.
  It already exceeds the 128 x 128 minimum; a 256 x 256 PNG could be much smaller.
- Test earlier VS Code releases before lowering `engines.vscode` from
  `^1.136.0`. This audit ran on installed VS Code **1.137.0**; it did not establish
  the oldest compatible version. Naming and the README requirement match the manifest.
- Extend semantic-provider and color-vision testing, including Python class
  references, JSX components, readonly/deprecated combinations, terminal inverse
  colors, and overlapping editor decorations. Registered custom semantic tokens
  and third-party grammars may differ from the built-in fixtures.
- Consider a higher-contrast variant if users need stronger decorative dividers.
  Current pink input/dropdown boundaries measure 3.63:1 / 3.48:1; active tab edges
  7.30:1; decorative panel dividers 1.63:1. These are intentional hierarchy choices,
  not a claim of full accessibility compliance.
- Add portable automated checks to CI and prune redundant legacy TextMate rules
  incrementally with regression tests. Development helpers remain outside the VSIX.

Validation evidence: package/theme/sample JSON and launch JSONC parse without
duplicate keys; theme contribution path, label, and dark base are consistent;
color values and semantic selectors/style types are valid. All **55 syntax checks
pass across 10 fixtures** (2,109 non-whitespace tokens). The palette families
agree for functions/methods, classes/types, properties, parameters, constants,
and decorators; static modifiers retain token foregrounds. Normal editor text
measures 16.47:1, comments and line numbers 5.77:1, and the cursor 10.54:1 against
the editor background. These use [WCAG's text contrast method](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
as a benchmark, not certification.

`vsce ls --no-dependencies` lists only README.md, package.json, CHANGELOG.md,
the theme JSON, and images/icon.png. The existing ZIP was inspected read-only
and contains those five project files plus generated VSIX metadata. Tests,
debug tools, audit notes (including this file), logs, dependencies, and old VSIX
files are excluded by the explicit `.vscodeignore` inclusion list. No npm
dependencies, activation events, or executable entry point are needed for this
declarative color theme. Category Themes, nine keywords, Free pricing, the dark
gallery banner, and publisher ID format are appropriate.
