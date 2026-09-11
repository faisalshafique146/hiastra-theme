# HiAstra screenshot showcase

Small self-contained examples for TypeScript, JavaScript, Python, HTML, and CSS.
They use fictional palette data and contain no network calls, credentials, or
third-party imports. These files are screenshot subjects, not a production app.

- `palette.ts`: interfaces, generics, readonly fields, and methods.
- `preview.js`: async calls, objects, classes, regex, loops, and interpolation.
- `preview.py`: standard-library imports, decorators, type annotations, and f-strings.
- `index.html`: semantic tags, attributes, entities, and linked CSS.
- `styles.css`: custom properties, selectors, functions, units, and media queries.

The PNG captures in `../../images/screenshots/` are real screenshots from an
isolated VS Code 1.137.0 Extension Development Host running the local theme.
Resolution: 1600 x 1000. Font: Consolas 17 px, line height 24 px. The profile hides
the minimap, file icons, color swatches, bracket-pair rainbow coloring, and the
empty secondary sidebar. No screenshot colors or source text were altered
after capture. Python uses TextMate; JS/TS can use their built-in semantic provider.

The capture helper is `../../.vscode/capture-showcase.cjs`. It connects only to
the dedicated instance's localhost debugging port 9333, checks the editor/tab
colors and active filename, then captures each editor. It must not be aimed at
an everyday profile. Generated profile/extension folders are ignored by Git.
The screenshot helper, profiles, and showcase sources are excluded from VSIX;
only the five PNGs are included for documentation.

README images use relative paths for local and repository previews. The manifest
points to `https://github.com/faisalshafique146/hiastra-theme`. Before publication,
confirm all five PNG files are uploaded under `images/screenshots/` and that the
packager's resolved HTTPS image URLs open without signing in. If the repository
layout or branch changes, update the link/image base paths before packaging.

Version 0.2.0 adds PHP, Java, C#, C, C++, Go, and Rust fixtures in the parent
`theme-tests` folder. It adds no screenshots and leaves these five screenshot
source files and PNGs unchanged. See `../README.md` for the expanded test matrix.
