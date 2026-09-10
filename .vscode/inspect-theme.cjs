// Read-only TextMate check using the grammars and libraries from a VS Code install.
// Run with Electron's Node mode; pass the VS Code resources/app directory.
// This checks TextMate output only, not semantic providers or visual rendering.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

async function main() {
  const app = process.argv[2];
  if (!app) throw new Error('Pass your VS Code resources/app directory.');
  const modules = fs.existsSync(path.join(app, 'node_modules.asar'))
    ? path.join(app, 'node_modules.asar') : path.join(app, 'node_modules');
  const tm = require(path.join(modules, 'vscode-textmate'));
  const onig = require(path.join(modules, 'vscode-oniguruma'));
  const wasm = fs.readFileSync(path.join(modules, 'vscode-oniguruma/release/onig.wasm'));
  await onig.loadWASM(wasm.buffer.slice(wasm.byteOffset, wasm.byteOffset + wasm.byteLength));
  const grammars = new Map();
  const injections = new Map();
  const extensions = path.join(app, 'extensions');
  for (const entry of fs.readdirSync(extensions)) {
    const manifest = path.join(extensions, entry, 'package.json');
    if (!fs.existsSync(manifest)) continue;
    const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    for (const grammar of pkg.contributes?.grammars || []) {
      grammars.set(grammar.scopeName, path.join(extensions, entry, grammar.path));
      for (const target of grammar.injectTo || []) {
        injections.set(target, [...(injections.get(target) || []), grammar.scopeName]);
      }
    }
  }
  const root = path.resolve(__dirname, '..');
  const theme = JSON.parse(fs.readFileSync(path.join(root, 'themes/HiAstra Theme-color-theme.json'), 'utf8'));
  const registry = new tm.Registry({
    onigLib: Promise.resolve(onig),
    theme: { settings: [{ settings: {
      foreground: theme.colors['editor.foreground'],
      background: theme.colors['editor.background']
    } }, ...theme.tokenColors] },
    loadGrammar: async scope => {
      const file = grammars.get(scope);
      return file ? tm.parseRawGrammar(fs.readFileSync(file, 'utf8'), file) : null;
    },
    getInjections: scope => injections.get(scope) || []
  });
  const files = {
    'javascript.js': 'source.js', 'typescript.ts': 'source.ts',
    'react.jsx': 'source.js.jsx', 'react.tsx': 'source.tsx',
    'index.html': 'text.html.basic', 'preview.css': 'source.css',
    'sample.json': 'source.json', 'sample.py': 'source.python',
    'sample.md': 'text.html.markdown', 'sample.sh': 'source.shell'
  };
  const records = [];
  const only = process.argv.find(arg => arg.startsWith('--only='))?.slice(7);
  for (const [file, scope] of Object.entries(files)) {
    if (only && file !== only) continue;
    const grammar = await registry.loadGrammar(scope);
    assert.ok(grammar, `Missing grammar: ${scope}`);
    let state = tm.INITIAL;
    const lines = fs.readFileSync(path.join(root, 'theme-tests', file), 'utf8').split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      const scoped = grammar.tokenizeLine(line, state);
      const styled = grammar.tokenizeLine2(line, state);
      const colors = registry.getColorMap();
      state = scoped.ruleStack;
      for (const token of scoped.tokens) {
        const text = line.slice(token.startIndex, token.endIndex);
        if (!text.trim()) continue;
        let metadata;
        for (let i = 0; i < styled.tokens.length; i += 2) {
          if (styled.tokens[i] > token.startIndex) break;
          metadata = styled.tokens[i + 1];
        }
        records.push({ file, line: index + 1, text, scopes: token.scopes,
          color: colors[(metadata >>> 15) & 511], fontStyle: (metadata >>> 11) & 15 });
      }
    }
  }
  if (process.argv.includes('--dump')) {
    const unique = new Map();
    for (const record of records) {
      unique.set(`${record.file}:${record.scopes.join(' ')}`, record);
    }
    console.log(JSON.stringify([...unique.values()]));
  }
  else {
    // [file, text, required scope prefix, foreground, optional font-style bits]
    // TextMate font-style bits: italic=1, bold=2, underline=4, strikethrough=8.
    const checks = [
      ['javascript.js', 'display-name', 'meta.object-literal.key', '#FFAA68'],
      ['javascript.js', 'config', 'variable.other.readwrite', '#C7C3DF'],
      ['javascript.js', 'render', 'meta.definition.method', '#6FA8FF', 2],
      ['javascript.js', 'render', 'meta.function-call', '#6FA8FF', 0],
      ['javascript.js', 'ThemePreview', 'entity.name.type.class', '#B89CFF', 2],
      ['typescript.ts', 'line', 'variable.object.property', '#FFAA68'],
      ['typescript.ts', 'Token', 'entity.name.type.interface', '#B89CFF'],
      ['typescript.ts', 'T', 'entity.name.type', '#B89CFF'],
      ['typescript.ts', 'filter', 'meta.function-call', '#6FA8FF', 0],
      ['react.jsx', 'ThemeCard', 'support.class.component', '#B89CFF', 2],
      ['react.jsx', 'section', 'entity.name.tag', '#FF7A8A'],
      ['react.jsx', 'className', 'entity.other.attribute-name', '#F3C969', 0],
      ['react.jsx', 'cardStyle', 'variable.other.readwrite', '#C7C3DF'],
      ['react.tsx', 'Palette', 'support.class.component', '#B89CFF', 2],
      ['react.tsx', 'div', 'entity.name.tag', '#FF7A8A'],
      ['react.tsx', 'items', 'entity.other.attribute-name', '#F3C969', 0],
      ['index.html', '<', 'punctuation.definition.tag', '#928DAF', 0],
      ['index.html', 'article', 'entity.name.tag', '#FF7A8A'],
      ['index.html', 'class', 'entity.other.attribute-name', '#F3C969', 0],
      ['preview.css', '*', 'entity.name.tag.wildcard', '#72E0B2'],
      ['preview.css', 'hero', 'entity.other.attribute-name.class', '#72E0B2'],
      ['preview.css', 'hover', 'entity.other.attribute-name.pseudo-class', '#72E0B2'],
      ['preview.css', 'before', 'entity.other.attribute-name.pseudo-element', '#72E0B2'],
      ['preview.css', 'max-width', 'support.type.property-name.media', '#55D6E6'],
      ['preview.css', '--radius', 'variable.css', '#55D6E6'],
      ['preview.css', '--radius', 'variable.argument.css', '#55D6E6'],
      ['preview.css', 'F4F2FF', 'constant.other.color', '#FFAA68'],
      ['preview.css', 'rem', 'keyword.other.unit', '#FFAA68'],
      ['preview.css', 'translateY', 'support.function', '#6FA8FF'],
      ['preview.css', 'Segoe UI', 'string.quoted', '#72E0B2'],
      ['sample.json', 'name', 'support.type.property-name.json', '#FFAA68'],
      ['sample.json', 'HiAstra Theme', 'string.quoted', '#72E0B2'],
      ['sample.json', 'true', 'constant.language.json', '#F3C969'],
      ['sample.py', 'dataclass', 'entity.name.function.decorator.python', '#F08ACB', 1],
      ['sample.py', 'append', 'meta.function-call.generic.python', '#6FA8FF', 0],
      ['sample.py', 'index', 'meta.function-call.arguments.python', '#C7C3DF'],
      ['sample.py', 'kind', 'meta.attribute.python', '#FFAA68'],
      ['sample.py', 'MAX_TOKENS', 'constant.other.caps.python', '#FFAA68'],
      ['sample.py', 'True', 'constant.language.python', '#F3C969'],
      ['sample.py', 'Return readable labels while exercising conditions and loops.', 'string.quoted.docstring', '#C7C3DF', 0],
      ['sample.md', 'HiAstra Markdown Preview', 'markup.heading', '#B89CFF', 2],
      ['sample.md', 'italic', 'markup.italic', '#C7C3DF', 1],
      ['sample.md', 'bold', 'markup.bold', '#F4F2FF', 2],
      ['sample.md', 'bold italic', 'markup.bold', '#F4F2FF', 3],
      ['sample.md', 'HiAstra documentation', 'string.other.link.title', '#55D6E6', 4],
      ['sample.md', 'inline code', 'markup.inline.raw', '#F08ACB', 0],
      ['sample.md', '>', 'punctuation.definition.quote.begin', '#928DAF', 0],
      ['sample.md', 'HiAstra', 'string.quoted.double.js', '#72E0B2'],
      ['sample.md', 'preview', 'entity.name.function.js', '#6FA8FF', 2],
      ['sample.sh', 'log_preview', 'entity.name.function.shell', '#6FA8FF', 2],
      ['sample.sh', 'log_preview', 'entity.name.command.shell', '#6FA8FF', 0],
      ['sample.sh', 'echo', 'support.function.builtin.shell', '#6FA8FF', 0],
      ['sample.sh', 'message', 'variable.other.normal.shell', '#C7C3DF'],
      ['sample.sh', '$', 'punctuation.definition.variable.shell', '#55D6E6'],
      ['sample.sh', '$', 'variable.parameter.positional.shell', '#FFAA68']
    ].filter(([file]) => !only || file === only);
    for (const [file, text, scope, color, style] of checks) {
      const matches = records.filter(r => r.file === file && r.text === text &&
        (scope.startsWith('punctuation.') ? [r.scopes.at(-1)] : r.scopes)
          .some(s => s === scope || s.startsWith(`${scope}.`)));
      assert.ok(matches.length, `No token found: ${file}: ${text} (${scope})`);
      for (const token of matches) {
        const label = `${file}:${token.line}: ${text}`;
        assert.equal(token.color, color, `${label}: foreground`);
        if (style !== undefined) assert.equal(token.fontStyle, style, `${label}: style`);
      }
    }
    console.log(`PASS: ${checks.length} syntax checks; ${new Set(records.map(r => r.file)).size} fixtures; ${records.length} non-whitespace tokens.`);
  }
  registry.dispose();
}

main().catch(error => { console.error(error); process.exit(1); });
