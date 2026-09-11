use std::fmt;

// Rust 2021: attributes, traits, lifetimes, fields, macros, and pattern matching.
const LIMIT: usize = 3;

#[derive(Debug, Clone)]
struct Swatch<'a> {
    label: &'a str,
    color: &'a str,
}

impl fmt::Display for Swatch<'_> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(formatter, "{} / {}", self.label, self.color)
    }
}

/// Build a bounded list without changing any palette values.
fn render(swatches: &[Swatch<'_>], enabled: bool) -> Vec<String> {
    let mut labels = Vec::new();
    if !enabled {
        return labels;
    }
    for (index, swatch) in swatches.iter().take(LIMIT).enumerate() {
        labels.push(format!("{index} / {swatch}"));
    }
    labels
}

fn main() {
    let swatches = [Swatch { label: "Mint", color: "#72E0B2" }];
    let labels = render(&swatches, true);
    match labels.first() {
        Some(label) => println!("HiAstra: {label}"),
        None => println!("No swatches"),
    }
}
