package hiastra.preview;

import java.util.List;

// Java 17+: generics, annotations, fields, methods, and records.
public final class ThemePreview {
    private static final int LIMIT = 3;
    private final String name;

    /** Store the theme name for a short preview. */
    public ThemePreview(String name) {
        this.name = name;
    }

    @Deprecated
    public String legacyLabel() {
        return name;
    }

    public record Swatch(String label, String color) {}

    public String render(List<Swatch> swatches) {
        StringBuilder result = new StringBuilder(name);
        for (int index = 0; index < swatches.size() && index < LIMIT; index++) {
            Swatch swatch = swatches.get(index);
            if (!swatch.label().isEmpty()) {
                result.append(" / ").append(swatch.label());
            }
        }
        return result.toString();
    }

    public static void main(String[] args) {
        var preview = new ThemePreview("HiAstra");
        System.out.println(preview.render(List.of(new Swatch("Mint", "#72E0B2"))));
    }
}
