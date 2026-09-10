// HiAstra React JSX token fixture
import React, { useState } from "react";

const themeName = "HiAstra";
const accents = ["#55D6E6", "#B89CFF", "#F08ACB"];

export function ThemeCard({ title = themeName, accent = accents[0] }) {
	const [selected, setSelected] = useState(false);
	const cardStyle = { borderColor: accent, backgroundColor: "#151326" };

	return (
		<section className="theme-card" style={cardStyle} aria-label={title}>
			<h2>{title}</h2>
			<p>{selected ? "Selected" : "Choose a vibrant accent"}</p>
			<button type="button" onClick={() => setSelected(!selected)}>
				{selected ? "Clear" : "Preview"}
			</button>
			<ul>
				{accents.map((color, index) => (
					<li key={color} data-index={index}>
						<code>{color}</code>
					</li>
				))}
			</ul>
		</section>
	);
}

export const cardPreview = <ThemeCard title="HiAstra" accent={accents[0]} />;

// TODO: compare the component above with native tags, props, expressions, and callbacks.
