#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

#define LIMIT 3

// C11: macros, typedefs, struct fields, pointers, and format placeholders.
typedef struct Swatch {
    const char *label;
    const char *color;
} Swatch;

enum Mode { MODE_CALM, MODE_VIBRANT };

/** Print a bounded list of palette labels. */
static size_t render(const Swatch *swatches, size_t count, bool enabled)
{
    if (!enabled) return 0;
    size_t shown = 0;
    for (size_t index = 0; index < count && index < LIMIT; ++index) {
        printf("%zu / %s / %s\n", index, swatches[index].label, swatches[index].color);
        ++shown;
    }
    return shown;
}

int main(void)
{
    const Swatch swatches[] = {{"Mint", "#72E0B2"}, {"Blue", "#6FA8FF"}};
    const enum Mode mode = MODE_VIBRANT;
    const size_t count = sizeof swatches / sizeof swatches[0];
    return render(swatches, count, mode == MODE_VIBRANT) > 0 ? 0 : 1;
}
