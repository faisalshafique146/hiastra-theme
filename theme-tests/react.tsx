// HiAstra React TSX token fixture
import { useMemo, useState } from "react";

interface PaletteProps {
	readonly name: string;
	accent?: string;
	items: readonly string[];
}

enum ViewMode {
	Compact = "compact",
	Expanded = "expanded"
}

const DEFAULT_ACCENT = "#6FA8FF";

export function Palette<T extends string>({ name, accent = DEFAULT_ACCENT, items }: PaletteProps) {
	const [mode, setMode] = useState<ViewMode>(ViewMode.Compact);
	const ordered = useMemo(() => [...items].sort(), [items]);

	return (
		<div className={`palette ${mode}`} style={{ color: accent }}>
			<header>
				<h1>{name}</h1>
				<button onClick={() => setMode(ViewMode.Expanded)}>{mode}</button>
			</header>
			{ordered.map((item, index) => (
				<span className="swatch" data-position={index} key={item}>
					{item}
				</span>
			))}
		</div>
	);
}

export const palettePreview = <Palette name="HiAstra" items={["Cyan", "Purple"]} />;

// Warning fixture: inspect generic type parameters, component tags, props, and enum members.
