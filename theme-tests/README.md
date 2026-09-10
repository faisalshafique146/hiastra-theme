# HiAstra manual theme fixtures

Open these files in the Extension Development Host with HiAstra selected. They are intentionally small visual fixtures, not production programs.

For the language-specific polish pass, compare semantic highlighting OFF and ON
using the Development Host's Settings UI (search for `semantic highlighting`).
Restore your original setting afterward. Do not change the theme's semantic rules.

| Check | Expected TextMate appearance |
| --- | --- |
| JavaScript/TypeScript keys and fields | Orange, including quoted object keys; ordinary variable references stay neutral. |
| Functions and types | Blue calls, bold blue declarations; recognized types remain purple. |
| JSX/TSX | Purple component tags versus coral native tags, gold props, muted angle brackets. |
| HTML | Coral tags, upright gold attributes, muted tag punctuation, mint string values. |
| CSS | Mint selectors including pseudo-selectors; cyan properties/custom properties; orange values, hex colors, and units; blue functions. |
| JSON | Orange keys at every depth, mint strings, gold language literals. |
| Python | Magenta decorators, blue call names, neutral arguments, orange attributes/constants, secondary docstrings. |
| Markdown source | Purple headings, distinct bold/italic, cyan underlined links, upright magenta code spans, muted quote markers/backticks. |
| Shell | Blue commands versus neutral variables; cyan expansion punctuation; orange positional parameters such as `$1`. |

Use **Developer: Inspect Editor Tokens and Scopes** on a token that differs.
TextMate cannot reliably distinguish every user-defined Python type, constructor,
or function reference. Semantic providers can refine these; no name-based guesses
have been added. Markdown checks concern the editor, not the rendered preview.

The read-only `.vscode/inspect-theme.cjs` regression checker tokenizes all ten
fixtures with a supplied VS Code installation and checks 55 color/style cases.
Run it using that installation's `Code.exe` with `ELECTRON_RUN_AS_NODE=1`, passing
the script path and its `resources/app` directory as arguments. It requires no
npm installation and is excluded from extension packaging by `.vscodeignore`.
It checks TextMate output only, not semantic providers or live visual rendering.

- `javascript.js` — JavaScript syntax, async code, classes, objects, regex, and errors.
- `typescript.ts` — interfaces, enums, generics, readonly values, and types.
- `react.jsx` — JSX tags, attributes, expressions, callbacks, and arrays.
- `react.tsx` — typed props, generics, enums, hooks, and JSX.
- `index.html` — HTML tags, attributes, entities, and nesting.
- `preview.css` — selectors, properties, values, functions, colors, and media queries.
- `sample.json` — nested objects, arrays, strings, numbers, and booleans.
- `sample.py` — Python imports, decorators, classes, annotations, loops, and exceptions.
- `sample.md` — Markdown structure, links, inline code, lists, and fenced code.
- `sample.sh` — shell variables, functions, conditions, loops, and commands.
