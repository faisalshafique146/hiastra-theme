// HiAstra TypeScript token fixture
/** A documented, typed token model for semantic highlighting. */
const DEFAULT_ACCENT: string = "#55D6E6";
const MAX_TOKENS = 12;

interface ColorTheme {
	readonly name: string;
}

export enum TokenKind {
	Keyword = "keyword",
	String = "string",
	Function = "function"
}

export interface Token {
	readonly text: string;
	kind: TokenKind;
	line: number;
}

type Formatter<T extends Token> = (token: T, index: number) => string;

export class TokenInspector<T extends Token> {
	static readonly title = "HiAstra Inspector";
	private inspected = 0;

	constructor(public readonly theme: ColorTheme, private accent = DEFAULT_ACCENT) {}

	format: Formatter<T> = (token, index) => {
		this.inspected += 1;
		return `${index}: ${token.kind} ${token.text} (${this.accent})`;
	};

	inspect(tokens: readonly T[]): string[] {
		const visible = tokens.filter((token) => token.line < MAX_TOKENS);
		for (const token of visible) {
			if (token.kind === TokenKind.Function) continue;
			console.info(this.format(token, token.line));
		}
		return visible.map(this.format);
	}
}

const sampleTokens: Token[] = [
	{ text: "render", kind: TokenKind.Function, line: 1 },
	{ text: "HiAstra", kind: TokenKind.String, line: 2 }
];

// FIXME: compare readonly, static, interface, and type-parameter colors.
console.log(sampleTokens);
