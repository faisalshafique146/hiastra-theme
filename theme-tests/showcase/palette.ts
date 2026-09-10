// HiAstra / TypeScript — types, properties, and functions
type TokenKind = "function" | "type" | "string";

interface Accent {
  readonly name: string;
  readonly hex: `#${string}`;
  kind: TokenKind;
}

const ACCENTS: readonly Accent[] = [
  { name: "Orbit", hex: "#6FA8FF", kind: "function" },
  { name: "Nebula", hex: "#B89CFF", kind: "type" },
  { name: "Aurora", hex: "#72E0B2", kind: "string" },
];

/** Build a small, strongly typed palette preview. */
export class PalettePreview<T extends Accent> {
  static readonly title = "HiAstra Theme";

  constructor(private readonly accents: readonly T[]) {}

  find(kind: TokenKind): T | undefined {
    return this.accents.find((accent) => accent.kind === kind);
  }

  labels(): string[] {
    return this.accents.map(({ name, hex }, index) =>
      `${index + 1}. ${name} — ${hex.toUpperCase()}`
    );
  }
}

const preview = new PalettePreview(ACCENTS);
console.log(preview.find("function"), preview.labels());
