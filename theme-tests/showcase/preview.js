// HiAstra / JavaScript — expressive code, calm surroundings
const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const settings = { name: "HiAstra", limit: 3, vibrant: true };

/** Local sample data: no network request or API key required. */
async function loadAccents() {
  return [
    { name: "Orbit", color: "#6FA8FF", enabled: true },
    { name: "Aurora", color: "#72E0B2", enabled: true },
    { name: "Flare", color: "#F08ACB", enabled: false },
  ];
}

class ThemePreview {
  constructor(options = settings) {
    this.options = options;
  }

  async render() {
    const accents = await loadAccents();
    const visible = accents.filter(({ color, enabled }) =>
      enabled && HEX_COLOR.test(color)
    );

    for (const [index, accent] of visible.entries()) {
      if (index >= this.options.limit) break;
      console.log(`${this.options.name}: ${accent.name}`);
    }

    return visible.map((accent) => ({ ...accent, selected: false }));
  }
}

new ThemePreview().render().catch(console.error);
