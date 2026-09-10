# HiAstra accessibility and eye-comfort review

Reviewed 2026-09-09. Scope: the theme JSON and its declared colors/rules. This is a static review with calculated contrast, not a live VS Code rendering test or certification.

## Findings and decisions

- Keep the deep indigo editor background and the existing vivid accent palette. The eight accents measure 7.29–11.60:1 against the editor. None needs a blanket saturation reduction; perceived glare still depends on brightness, font, monitor, and the person viewing it.
- Correct the earlier contrast report: the previous values above 21:1 were invalid. WCAG contrast cannot exceed 21:1. Primary text is 16.47:1 and ordinary comments are 5.77:1.
- Remove transparency from line numbers and ghost text; their previous effective contrast was 2.38:1 and 2.87:1. Keep ordinary comments at their readable muted color, but use upright text and quieter secondary foreground for documentation to reduce visual competition.
- Use dark text inside cyan block cursors in both editor and terminal. The cursor background setting names the character color, not the surrounding editor surface.
- Preserve active text selection's light foreground on violet (10.34:1). Darken selected list rows enough that muted descriptions also remain readable; cyan focus outlines indicate the selected state. Unfocused rows and icons fade toward neutral.
- Reduce search/range/occurrence fill opacity. Earlier gold search fills reduced comment contrast to around 2:1. Faint fills now pair with borders; comments pass 4.5:1 over each checked overlay on both editor and current-line backgrounds. Simultaneous stacked overlays require visual testing.
- Keep subtle decorative panel/group dividers. Raise input/dropdown/command-center borders and scrollbar visibility using a related muted violet (#7D7699), so useful controls are easier to locate without outlining the entire workbench brightly.
- Give active tabs an elevated background and a single cyan top edge. Unfocused active tabs retain a neutral top marker; their labels and inactive labels remain readable.
- Remove the current-line box and extra diagnostic boxes. Preserve the error/warning squiggles, icons, and overview markers. Set explicit dark text on coral/gold status badges; add warning input styling. Use a dark debug status bar with an orange edge.
- Raise terminal ANSI black text from 1.48:1 to 4.56:1 using #817B9D. ANSI colors can also be used by applications as backgrounds; test real terminal output with inverted colors.
- Reduce competing syntax accents: use one orange JSON key color across nesting levels; remove the coral block-variable override; make operators secondary text so cyan control flow remains prominent; quiet Markdown emphasis through font weight/style.
- Preserve mint strings as implemented in the current theme. Earlier prose incorrectly described ordinary strings as magenta. Mint keeps strings distinct from lavender identifiers, purple types, and blue functions. Inline Markdown code remains magenta. Regex becomes orange, separating it from cyan escapes.
- Correct specific Markdown rules that overrode the intended inline-code and heading colors, and remove transparent fence text. Classes remain purple/bold and functions blue/bold where declared; color alone is not the only cue.
- Keep static symbols' own semantic color by removing the wildcard foreground. Restrict readonly recoloring to variables/properties and align those plus enum members with orange TextMate constants. Generic type parameters now share the purple type family.
- Remove broad function-call, parameter-list, and tag-container selectors that can paint nested expressions with a single accent. Retain the name-specific selectors. Add TextMate deprecated syntax strikethrough alongside the existing semantic rule.

## Method and limits

sRGB channels are linearized using the 0.04045 threshold. Relative luminance is 0.2126 R + 0.7152 G + 0.0722 B. Contrast is (lighter + 0.05) / (darker + 0.05). Eight-digit colors are first composited over the stated background. Overlay backgrounds are rounded to the nearest 8-bit channel for the tables.

Use [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) as a 4.5:1 benchmark and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) as a 3:1 benchmark for meaningful control indicators. Decorative separators do not all need 3:1. These checks do not establish full WCAG conformance.

VS Code's [color reference](https://code.visualstudio.com/api/references/theme-color) explains the cursor, overlay, list, and diagnostic properties.

## Measured pairs

| Combination | Before | After |
| --- | ---: | ---: |
| Primary text | 16.47:1 | 16.47:1 |
| Line numbers | 2.38:1 | 5.77:1 |
| Ghost text | 2.87:1 | 5.77:1 |
| Inactive tab text | 5.53:1 | 5.53:1 |
| Selected text | 10.34:1 | 10.34:1 |
| Cursor character | 1.56:1 | 10.54:1 |
| Terminal ANSI black | 1.48:1 | 4.56:1 |
| Input border | 1.48:1 | 4.27:1 |
| Dropdown border | 1.35:1 | 3.91:1 |
| Scrollbar on editor | 1.24:1 | 4.27:1 |
| Scrollbar on panel | 1.17:1 | 3.82:1 |
| Warning badge text | Inherited; not measured | 11.6:1 |
| Error badge text | Inherited; not measured | 7.29:1 |
| Comments on editor.findMatchBackground over editor.background | 2.03:1 | 5.28:1 |
| Comments on editor.findMatchBackground over editor.lineHighlightBackground | 1.9:1 | 4.77:1 |
| Comments on editor.findMatchHighlightBackground over editor.background | 3.66:1 | 5.46:1 |
| Comments on editor.findMatchHighlightBackground over editor.lineHighlightBackground | 3.28:1 | 4.98:1 |
| Comments on editor.wordHighlightBackground over editor.background | 4.53:1 | 5.52:1 |
| Comments on editor.wordHighlightBackground over editor.lineHighlightBackground | 4.53:1 | 5.01:1 |
| Comments on editor.wordHighlightStrongBackground over editor.background | 3.62:1 | 5.49:1 |
| Comments on editor.wordHighlightStrongBackground over editor.lineHighlightBackground | 3.62:1 | 4.98:1 |
| Comments on editor.rangeHighlightBackground over editor.background | 3.74:1 | 5.49:1 |
| Comments on editor.rangeHighlightBackground over editor.lineHighlightBackground | 3.36:1 | 4.98:1 |
| Comments on editor.symbolHighlightBackground over editor.background | 3.99:1 | 5.52:1 |
| Comments on editor.symbolHighlightBackground over editor.lineHighlightBackground | 3.58:1 | 5.01:1 |
| Comments on editor.selectionHighlightBackground over editor.background | 5.15:1 | 5.52:1 |
| Comments on editor.selectionHighlightBackground over editor.lineHighlightBackground | 4.91:1 | 5.01:1 |
| Selected list description | 3.62:1 | 4.53:1 |

## Exact UI changes

| Color ID | Before | After |
| --- | --- | --- |
| `editorLineNumber.foreground` | `#928DAF80` | `#928DAF` |
| `editorLineNumber.activeForeground` | `#F3C969` | `#F4F2FF` |
| `editorLineNumber.dimmedForeground` | `#928DAF55` | `#928DAF` |
| `editorCursor.background` | `#F4F2FF` | `#151326` |
| `editor.lineHighlightBorder` | `#373052` | `#15132600` |
| `editor.inactiveSelectionBackground` | `#2A245080` | `#2A2450` |
| `editor.selectionHighlightBackground` | `#2A245080` | `#B89CFF08` |
| `editor.wordHighlightBackground` | `#2A2450` | `#B89CFF08` |
| `editor.wordHighlightStrongBackground` | `#3A3268` | `#55D6E608` |
| `editor.wordHighlightBorder` | `#B89CFF` | `#7D7699` |
| `editor.findMatchBackground` | `#F3C96966` | `#F3C9690D` |
| `editor.findMatchHighlightBackground` | `#F3C96933` | `#F3C96908` |
| `editor.rangeHighlightBackground` | `#55D6E633` | `#55D6E608` |
| `editor.symbolHighlightBackground` | `#B89CFF33` | `#B89CFF08` |
| `editorGhostText.foreground` | `#928DAF99` | `#928DAF` |
| `editorError.border` | `#FF7A8A` | — |
| `editorWarning.border` | `#F3C969` | — |
| `editorInfo.border` | `#55D6E6` | — |
| `editorOverviewRuler.wordHighlightTextForeground` | `#B89CFF` | `#B89CFF99` |
| `tab.activeBackground` | `#151326` | `#1E1A38` |
| `tab.activeBorder` | `#55D6E6` | `#1E1A38` |
| `tab.unfocusedActiveBackground` | `#19172E` | `#1E1A38` |
| `tab.unfocusedActiveBorder` | `#373052` | `#1E1A38` |
| `statusBar.debuggingBackground` | `#FF7A8A33` | `#2A2450` |
| `commandCenter.border` | `#373052` | `#7D7699` |
| `terminalCursor.background` | `#F4F2FF` | `#151326` |
| `terminal.ansiBlack` | `#373052` | `#817B9D` |
| `input.border` | `#373052` | `#7D7699` |
| `dropdown.border` | `#373052` | `#7D7699` |
| `button.hoverBackground` | `#6FA8FF` | `#72E0B2` |
| `button.border` | `#55D6E6` | `#7D7699` |
| `list.activeSelectionBackground` | `#3A3268` | `#2A2450` |
| `list.inactiveSelectionBackground` | `#2A2450` | `#1E1A38` |
| `list.inactiveSelectionIconForeground` | `#B89CFF` | `#C7C3DF` |
| `scrollbarSlider.background` | `#37305299` | `#7D7699` |
| `scrollbarSlider.hoverBackground` | `#6FA8FF99` | `#928DAF` |
| `scrollbarSlider.activeBackground` | `#55D6E6AA` | `#B89CFF` |
| `list.focusAndSelectionOutline` | — | `#55D6E6` |
| `editor.wordHighlightStrongBorder` | — | `#55D6E6` |
| `editor.findMatchHighlightBorder` | — | `#7D7699` |
| `tab.unfocusedActiveBorderTop` | — | `#7D7699` |
| `statusBarItem.errorForeground` | — | `#151326` |
| `statusBarItem.warningForeground` | — | `#151326` |
| `statusBar.debuggingBorder` | — | `#FFAA68` |
| `inputValidation.warningBackground` | — | `#201C3A` |
| `inputValidation.warningForeground` | — | `#F3C969` |
| `inputValidation.warningBorder` | — | `#F3C969` |

## Syntax changes

| Existing rule | Change |
| --- | --- |
| Comment | `{"fontStyle":"italic","foreground":"#928DAF"}` → `{"fontStyle":"","foreground":"#928DAF"}` |
| Operator, Misc | `{"foreground":"#55D6E6"}` → `{"foreground":"#55D6E6"}` Removed broad container selectors so nested expressions retain their own styling. |
| Tag | `{"foreground":"#FF7A8A"}` → `{"foreground":"#FF7A8A"}` Removed broad container selectors so nested expressions retain their own styling. |
| Function, Special Method | `{"foreground":"#6FA8FF"}` → `{"foreground":"#6FA8FF"}` Removed broad container selectors so nested expressions retain their own styling. |
| Block Level Variables | `{"foreground":"#FF7A8A"}` → `{"foreground":"#C7C3DF"}` |
| Other Variable, String Link | `{"foreground":"#FF7A8A"}` → `{"foreground":"#C7C3DF"}` |
| Class, Support | `{"foreground":"#F3C969"}` → `{"foreground":"#B89CFF"}` |
| Entity Types | `{"foreground":"#C7C3DF"}` → `{"foreground":"#B89CFF"}` |
| Sub-methods | `{"foreground":"#FF7A8A"}` → `{"foreground":"#B89CFF"}` |
| Language methods | `{"fontStyle":"italic","foreground":"#FF7A8A"}` → `{"foreground":"#B89CFF","fontStyle":""}` |
| Regular Expressions | `{"foreground":"#55D6E6"}` → `{"foreground":"#FFAA68"}` |
| Decorators | `{"fontStyle":"italic","foreground":"#6FA8FF"}` → `{"fontStyle":"italic","foreground":"#F08ACB"}` |
| ES7 Bind Operator | `{"fontStyle":"italic","foreground":"#FF7A8A"}` → `{"foreground":"#FFAA68","fontStyle":""}` |
| JSON Key - Level 0 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 1 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 2 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 3 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 4 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 5 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 6 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 7 | Consolidated into JSON property names: orange at every nesting depth. |
| JSON Key - Level 8 | Consolidated into JSON property names: orange at every nesting depth. |
| Markdown - Markup Raw Inline | `{"foreground":"#B89CFF"}` → `{"foreground":"#F08ACB"}` |
| Markdown - Heading | `{"foreground":"#72E0B2"}` → `{"foreground":"#B89CFF","fontStyle":"bold"}` |
| Markup - Italic | `{"fontStyle":"italic","foreground":"#FF7A8A"}` → `{"fontStyle":"italic","foreground":"#C7C3DF"}` |
| Markup - Bold | `{"fontStyle":"bold","foreground":"#FF7A8A"}` → `{"fontStyle":"bold","foreground":"#F4F2FF"}` |
| Markup - Bold-Italic | `{"fontStyle":"bold","foreground":"#FF7A8A"}` → `{"foreground":"#F4F2FF","fontStyle":"bold italic"}` |
| Markdown - Link Description | `{"foreground":"#B89CFF"}` → `{"foreground":"#55D6E6"}` |
| Markdown - Raw Block Fenced | `{"foreground":"#928DAF80"}` → `{"foreground":"#C7C3DF"}` |
| Markdown - Fenced Bode Block | `{"foreground":"#928DAF80"}` → `{"foreground":"#928DAF"}` |
| HiAstra Documentation Comments | `{"foreground":"#B89CFF","fontStyle":"italic"}` → `{"foreground":"#C7C3DF","fontStyle":""}` |
| HiAstra Parameters | `{"foreground":"#FFAA68"}` → `{"foreground":"#FFAA68"}` Removed broad container selectors so nested expressions retain their own styling. |
| HiAstra Operators | `{"foreground":"#55D6E6"}` → `{"foreground":"#C7C3DF"}` |
| HiAstra Function Calls | `{"foreground":"#6FA8FF"}` → `{"foreground":"#6FA8FF"}` Removed broad container selectors so nested expressions retain their own styling. |
| HiAstra Methods | `{"foreground":"#6FA8FF"}` → `{"foreground":"#6FA8FF"}` Removed broad container selectors so nested expressions retain their own styling. |
| HiAstra HTML and XML Tags | `{"foreground":"#FF7A8A"}` → `{"foreground":"#FF7A8A"}` Removed broad container selectors so nested expressions retain their own styling. |

Added: JSON property names (orange) and Deprecated syntax (coral strikethrough).

## Semantic changes

| Selector | Before | After |
| --- | --- | --- |
| `typeParameter` | `#FFAA68` | `#B89CFF` |
| `enumMember` | `#F3C969` | `#FFAA68` |
| `variable.readonly` | `#F3C969` | `#FFAA68` |
| `property.readonly` | `#F3C969` | `#FFAA68` |
| `*.readonly` | `#F3C969` | — |
| `*.static` | `{"foreground":"#C7C3DF","italic":true}` | `{"italic":true}` |

## Validation and remaining visual checks

The edited JSON parses successfully. All explicit TextMate foreground colors are opaque and meet 4.5:1 against the editor background. The checked text/control pairs and individual highlight overlays meet their stated thresholds. Editor background and the eight accent HEX values are preserved.

In the Extension Development Host, inspect:
1. Line numbers, ghost text, Markdown fence markers, and comments at your usual font size.
2. Select comments; then search for a word inside a comment. Compare active/inactive selection and overlapping occurrence highlights.
3. Temporarily choose block cursors in editor and terminal to check the character beneath the cursor.
4. Switch tabs and move focus to the sidebar; inspect input borders, scrollbars, and active/unfocused tab markers.
5. View errors, warnings, status badges, and terminal ANSI output.
6. Compare TypeScript with semantic highlighting on/off, especially static methods, readonly properties, generic types, and enum members.
7. Inspect JSON depth and Markdown emphasis for visual balance.

No live screenshots or color-vision simulation were performed. Blue/purple and gold/orange are intentionally related colors; the theme does not guarantee that every syntax category is distinguishable for every color-vision difference. Syntax structure, bold declarations, diagnostic shapes, links with underlines, and deprecated strikethrough provide additional cues.
