// HiAstra JavaScript token fixture
/** Documentation: inspect comments, links, and interpolation. */
import { readFile as loadFile } from "node:fs/promises";

const MAX_RETRIES = 3;
const config = {
	endpoint: "https://example.test/theme",
	"display-name": "HiAstra",
	retries: MAX_RETRIES,
	featureFlags: { semantic: true, preview: false }
};

class ThemePreview {
	constructor(name, options = {}) {
		this.name = name;
		this.options = options;
	}

	render(tokens = []) {
		for (const token of tokens) {
			if (token.kind === "keyword") {
				console.log(`${this.name}: ${token.text}`);
			} else {
				console.warn("Unknown token", token);
			}
		}
	}
}

const formatToken = (value, index = 0) => `${index}: ${value ?? "unknown"}`;
const matcher = /#[0-9a-f]+/gi;

async function loadSample(path) {
	try {
		const source = await loadFile(path, "utf8");
		return source.match(matcher) ?? [];
	} catch (error) {
		throw new Error(`Could not load ${path}: ${error.message}`);
	}
}

const preview = new ThemePreview("HiAstra", config);
preview.render([{ kind: "keyword", text: formatToken("const", 1) }]);
// TODO: inspect the warning color and the unused-variable decoration here.
