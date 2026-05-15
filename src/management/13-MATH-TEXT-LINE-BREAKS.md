# MathText Component — How It Works

*Last updated: April 2026*

## Overview

The `MathText` component renders LaTeX math and handles `\n` line breaks. **LaTeX is explicit-only** — math is ONLY rendered when wrapped in `$...$` (inline) or `$$...$$` (display mode). There is NO automatic conversion of plain text patterns like `x^2`, `sqrt()`, `<=`, infinity symbols, or chemistry formulas.

## How It Works

1. **Normalization**: Escaped `\n` (two characters: backslash + n) is converted to actual newline characters
2. **Dollar sign escaping**: `\$` is preserved as a literal dollar sign
3. **Splitting**: Text is split by math patterns (`$...$` and `$$...$$`)
4. **Rendering**: Math parts are rendered via KaTeX; non-math parts have newlines converted to `<br>` elements

## What Changed (March 2026)

Previously, MathText had a `preprocessMath()` function that auto-converted:
- `x^2` → exponent LaTeX
- `(a)/(b)` → fraction LaTeX
- `<=`, `>=` → inequality symbols
- `sqrt(x)` → square root LaTeX
- `lim_x-->a` → limit LaTeX
- Chemistry formulas (H2O → subscripted) via `enableChemistry` prop

**This has been removed.** All math must now be explicitly wrapped in `$...$`. The `enableChemistry` prop is deprecated and ignored.

### Why?
The auto-preprocessing caused false positives — for example, converting "J/g°C" in chemistry specific heat questions into broken `\ce{}` or `\frac{}{}` LaTeX.

## Supported Patterns

```
$math$\n$moremath$     → math [line break] moremath
$$display$$\n$$more$$  → display math [line break] more display math
text\n$math$           → text [line break] math
$math$\ntext           → math [line break] text
line1\nline2\nline3    → multiple line breaks work
```

## Chemistry Formatting

Use the mhchem package explicitly:
```
$\ce{H2O}$          → H₂O
$\ce{Na+}$          → Na⁺
$\ce{H2 + O2 -> H2O}$ → reaction equation
$\ce{<=>}$          → equilibrium arrow
```

## Potential Conflicts

### 1. Newlines INSIDE Math Blocks (Not Supported)

```
$x^2\ny^2$   → Renders as "$x^2 y^2$" (space, not line break)
```

**Solution**: Use LaTeX line break syntax within math:
```
$$x^2 \\ y^2$$   → Proper line break in display math
```

### 2. Literal Backslash-N Display (Edge Case)

If you want to display a literal `\n` in text:
```
explanation: "Use \\\\n for newlines"   → Shows "\n" literally
```

### 3. Plain text math not rendering

If math like `x^2` is showing as plain text, wrap it: `$x^2$`

## Implementation Details

Location: `src/components/MathText.tsx`

The component is ~80 lines. It splits text on `$` delimiters, renders math via KaTeX, and handles line breaks in plain text sections.
