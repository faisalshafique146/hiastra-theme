package main

import "fmt"

// Go: packages, structs, receivers, constants, fields, and short declarations.
const limit = 3

type Swatch struct {
    Label string
    Color string
}

// Format returns a compact label for one palette entry.
func (swatch Swatch) Format(index int) string {
    return fmt.Sprintf("%d / %s / %s", index, swatch.Label, swatch.Color)
}

func render(swatches []Swatch, enabled bool) []string {
    labels := make([]string, 0, len(swatches))
    if !enabled {
        return labels
    }
    for index, swatch := range swatches {
        if index >= limit {
            break
        }
        labels = append(labels, swatch.Format(index))
    }
    return labels
}

func main() {
    swatches := []Swatch{{Label: "Mint", Color: "#72E0B2"}}
    for _, label := range render(swatches, true) {
        fmt.Println(label)
    }
}
