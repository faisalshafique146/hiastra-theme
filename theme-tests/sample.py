"""HiAstra Python token fixture."""
from dataclasses import dataclass
from re import compile as compile_pattern

DEFAULT_ACCENT = "#55D6E6"
MAX_TOKENS = 12
TOKEN_PATTERN = compile_pattern(r"#[0-9a-f]+")


@dataclass(frozen=True)
class Token:
	text: str
	kind: str = "value"

	def label(self, index: int) -> str:
		return f"{index}: {self.text} ({self.kind})"


def inspect(tokens: list[Token], accent: str = DEFAULT_ACCENT) -> list[str]:
	"""Return readable labels while exercising conditions and loops."""
	results = []
	for index, token in enumerate(tokens):
		if index >= MAX_TOKENS:
			break
		if token.kind in {"function", "class"}:
			results.append(token.label(index))
		else:
			continue
	return [f"{accent}: {value}" for value in results]


try:
	sample = [Token("render", "function"), Token("HiAstra", "string")]
	print(inspect(sample))
except ValueError as error:
	print(f"warning: {error}")

# TODO: inspect decorators, docstrings, annotations, constants, and exceptions.

