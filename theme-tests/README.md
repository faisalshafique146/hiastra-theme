# HiAstra manual theme fixtures

Open these files in the Extension Development Host with HiAstra selected. They are intentionally small visual fixtures, not production programs.

Core ten: JavaScript, TypeScript, Python, Java, C#, C, C++, Go, Rust, and PHP.
JSX/TSX, HTML, CSS, JSON, Markdown, and shell fixtures remain additional coverage.
The seven new fixtures are inspection samples, not new screenshots. The existing
five images in `images/screenshots/` and their showcase sources are unchanged.

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
| PHP | Purple type hints/classes, orange parameters/promoted properties/constants, cyan dollar signs, gold literals, magenta attribute names; embedded HTML keeps its own styles. |
| Java | Purple types/records, blue methods, orange parameters, magenta annotations, secondary Javadoc. |
| C# | Neutral local declarations, orange parameters/fields/properties, purple types, mint strings, blue functions. |
| C | Purple preprocessor macro names and built-in types, blue functions, orange parameters/member access, mint strings and readable format placeholders. |
| C++ | Purple types/namespaces/templates, orange members/enum declarations, bold blue function declarations and upright blue recognized calls. |
| Go | Purple types, orange struct fields/parameters/constant declarations, blue calls (including built-ins), gold booleans. |
| Rust | Purple traits/types/lifetimes/macros, orange constants/parameters, magenta attribute directives, gold booleans, blue calls. |
| Markdown source | Purple headings, distinct bold/italic, cyan underlined links, upright magenta code spans, muted quote markers/backticks. |
| Shell | Blue commands versus neutral variables; cyan expansion punctuation; orange positional parameters such as `$1`. |

Use **Developer: Inspect Editor Tokens and Scopes** on a token that differs.
TextMate cannot reliably distinguish every user-defined Python type, constructor,
or function reference. Semantic providers can refine these; no name-based guesses
have been added. Markdown checks concern the editor, not the rendered preview.

The read-only `.vscode/inspect-theme.cjs` regression checker tokenizes all 17
fixtures with a supplied VS Code installation and checks 117 color/style cases.
Run it using that installation's `Code.exe` with `ELECTRON_RUN_AS_NODE=1`, passing
the script path and its `resources/app` directory as arguments. It requires no
npm installation and is excluded from extension packaging by `.vscodeignore`.
It checks TextMate output only, not semantic providers or live visual rendering.

The 117 checks pass with VS Code 1.137.0's built-in grammars. To focus a run, append
`--only=sample.php` (or another fixture filename). `--dump` prints one example per
scope stack; `--dump-all` prints all tokens for debugging. No compiler or language
server was installed or invoked for the new fixtures.

## Semantic checks and grammar limits

Install/enable your usual language extension separately if you need semantic
tokens. HiAstra intentionally does not bundle language servers or force installs.
In a real project, compare highlighting OFF and ON, then inspect types, calls,
parameters, properties, readonly/static values, macros, and deprecated symbols.
The shared semantic rules are unchanged: purple types/macros, blue functions,
orange parameters/properties/constants, neutral variables, italic static values,
and coral strikethrough for deprecated values when the provider reports them.

- PHP: array keys are plain string scopes, so remain mint. The grammar identifies
  promoted properties through parameter context; `$this` is a language variable.
- Java: constructors can be reported as functions and constant references can
  lack a dedicated scope. Do not guess types or constants based on capitalization.
- C#: the bundled grammar uses the same function scope for many calls and
  declarations (both can be bold). Attribute names can have ordinary type scopes.
- C: user-defined types, enum values, and ordinary identifiers can be unscoped;
  they stay neutral until a semantic provider identifies them.
- C++: constructors/initializers and enum/constant references are not always
  distinguishable from calls or ordinary identifiers by the grammar alone.
- Go: struct declarations/literal keys are scoped as properties, but member and
  constant references can be ordinary variables. A language server refines these.
- Rust: fields and some import names lack specific scopes. Macro interpolation
  keeps the string color when the grammar provides no identifier token.

These limitations are intentional fallbacks, not claims of complete semantic
provider testing. Keep arguments neutral unless the grammar identifies parameters;
avoid broad expression rules that recolor an entire function body or string.

## Fixture files

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
- `sample.php` — PHP 8.1+ type hints, readonly promoted properties, attributes, constants, arrays, loops, and HTML embedding.
- `ThemePreview.java` — Java 17+ classes, records, annotations, Javadoc, generics, loops, and method calls.
- `ThemePreview.cs` — C# 9+ records, attributes, properties, iterators, interpolation, and conditions.
- `sample.c` — C11 structs, typedefs, macros, pointers, enums, functions, and format strings.
- `sample.cpp` — C++17 namespaces, classes, templates, enums, fields, references, and calls.
- `sample.go` — Go structs, receiver methods, constants, slices, loops, and built-in functions.
- `sample.rs` — Rust 2021 traits, lifetimes, attributes, macros, parameters, loops, and pattern matching.
