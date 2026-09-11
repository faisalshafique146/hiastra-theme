#include <iostream>
#include <string>
#include <vector>

namespace hiastra {
// C++17: namespaces, templates, classes, references, and method calls.
constexpr int LIMIT = 3;
enum class Mode { Calm, Vibrant };

struct Swatch {
    std::string label;
    std::string color;
};

template <typename T>
class Palette {
public:
    explicit Palette(std::vector<T> items) : items_(items) {}

    /// Print swatches while retaining the existing color families.
    void render(const std::string& title) const {
        int index = 0;
        for (const auto& item : items_) {
            if (index++ >= LIMIT) break;
            std::cout << title << ": " << item.label << '\n';
        }
    }
private:
    std::vector<T> items_;
};
} // namespace hiastra

int main() {
    hiastra::Palette<hiastra::Swatch> palette({{"Mint", "#72E0B2"}});
    const auto mode = hiastra::Mode::Vibrant;
    if (mode != hiastra::Mode::Calm) palette.render("HiAstra");
}
