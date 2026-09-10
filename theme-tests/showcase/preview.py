"""HiAstra / Python — decorators, annotations, and readable logic."""
from dataclasses import dataclass
from re import fullmatch

MAX_SWATCHES = 3


@dataclass(frozen=True)
class Accent:
    name: str
    color: str
    enabled: bool = True

    def label(self, index: int) -> str:
        return f"{index:02d} / {self.name} / {self.color.upper()}"


def preview(accents: list[Accent]) -> list[str]:
    """Select valid colors without changing the original palette."""
    labels = []
    for index, accent in enumerate(accents, start=1):
        if not accent.enabled:
            continue
        if fullmatch(r"#[0-9a-fA-F]{6}", accent.color):
            labels.append(accent.label(index))
    return labels[:MAX_SWATCHES]


palette = [
    Accent("Orbit", "#6FA8FF"),
    Accent("Aurora", "#72E0B2"),
    Accent("Flare", "#F08ACB", enabled=False),
]
print("\n".join(preview(palette)))
