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

README images use relative paths for local and repository previews. Before
Marketplace publication, replace the repository placeholders in package.json
and README.md, upload the PNG files to the real repository, and confirm the
packager's resolved image URLs point to accessible files on the correct branch.
If the repository contains the outer workspace, account for the hiastra-theme
subdirectory in those URLs. Packaging a placeholder repository does not make
the images publicly available.
