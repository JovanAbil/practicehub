# Math Question Formatting Guide

This guide shows how to properly format math expressions in question data files using LaTeX syntax.

## Basic Rules

1. **Wrap ALL math in `$...$`** — LaTeX is explicit-only. There is NO auto-conversion. Plain text like `x^2` or `sqrt(x)` will NOT render as math.
2. **Use double backslashes** — In JSON/TypeScript strings, use `\\` instead of `\`
3. **Chemistry uses `\\ce{}`** — Wrap chemistry formulas in `$\\ce{...}$` (e.g., `$\\ce{H2O}$`)
4. **Test your LaTeX** — Use an online LaTeX editor like [Overleaf](https://www.overleaf.com) to verify syntax

---

## Fractions

### ❌ WRONG (plain text)
```typescript
"question": "Find f(x) = (3x^2+1)/(x^2+4)"
```

### ✅ CORRECT (LaTeX)
```typescript
"question": "Find $f(x) = \\frac{3x^2+1}{x^2+4}$"
```

**Syntax:** `$\\frac{numerator}{denominator}$`

---

## Limits

### ❌ WRONG
```typescript
"question": "Find lim_x-->∞ f(x)"
"question": "Find lim_x-->-∞ f(x)"  
"question": "Find lim_x-->3+ f(x)"
```

### ✅ CORRECT
```typescript
"question": "Find $\\lim_{x \\to \\infty} f(x)$"
"question": "Find $\\lim_{x \\to -\\infty} f(x)$"
"question": "Find $\\lim_{x \\to 3^+} f(x)$"
```

**Syntax:** `$\\lim_{x \\to VALUE} f(x)$`

- Use `\\infty` for infinity
- Use `3^+` for right-hand limit, `3^-` for left-hand limit

---

## Exponents

### ❌ WRONG
```typescript
"question": "Expand (x-3)^5"
"question": "Find x^2 + 3x^3"
```

### ✅ CORRECT
```typescript
"question": "Expand $(x-3)^5$"
"question": "Find $x^2 + 3x^3$"
```

**Syntax:** `$base^{exponent}$` or `$(expression)^{exponent}$`

---

## Square Roots

### ❌ WRONG
```typescript
"question": "Find sqrt(x+1)"
```

### ✅ CORRECT
```typescript
"question": "Find $\\sqrt{x+1}$"
```

**Syntax:** `$\\sqrt{expression}$`

---

## Inequalities

### ❌ WRONG
```typescript
"question": "For -2 <= x <= 5"
"question": "When x >= 3"
```

### ✅ CORRECT
```typescript
"question": "For $-2 \\leq x \\leq 5$"
"question": "When $x \\geq 3$"
```

**Syntax:** 
- `\\leq` for ≤
- `\\geq` for ≥

---

## Logarithms

### ❌ WRONG
```typescript
"question": "Simplify log(3)-log(x)"
"question": "Evaluate log_5(25)"
"question": "Simplify 2log(x)+(1/2)log(y)"
"question": "What is ln(e^6)?"
```

### ✅ CORRECT
```typescript
"question": "Simplify $\\log(3)-\\log(x)$"
"question": "Evaluate $\\log_5(25)$"
"question": "Simplify $2\\log(x)+\\frac{1}{2}\\log(y)$"
"question": "What is $\\ln(e^6)$?"
```

**Syntax:**
- `\\log(x)` for common log (base 10)
- `\\log_b(x)` for log base b (e.g., `\\log_2(x)`, `\\log_5(25)`)
- `\\ln(x)` for natural log (base e)
- Use `\\frac{}{}` for coefficients like `\\frac{1}{2}\\log(x)`

---

## Function Definitions

### ❌ WRONG
```typescript
"question": "Let f(x) = x^3 + x^2 - 6x"
"question": "Given g(x) = ((x+1)(2x-3)^2)/((5x-7)^2)"
```

### ✅ CORRECT
```typescript
"question": "Let $f(x) = x^3 + x^2 - 6x$"
"question": "Given $g(x) = \\frac{(x+1)(2x-3)^2}{(5x-7)^2}$"
```

---

## Interval Notation

### ❌ WRONG
```typescript
"correctAnswer": "(-3, 0) U (2, ∞)"
```

### ✅ CORRECT
```typescript
"correctAnswer": "$(-3, 0) \\cup (2, \\infty)$"
```

**Syntax:** `\\cup` for union (∪), `\\infty` for infinity

---

## Greek Letters

```typescript
"question": "Find $\\pi r^2$"        // π
"question": "When $\\theta = 45°$"   // θ
"question": "Let $\\alpha = 2$"      // α
```

---

## Complete Examples

### Multiple Choice with Fractions
```typescript
{
  "id": "example-1",
  "type": "multiple-choice",
  "question": "Which function has a horizontal asymptote? $f(x) = \\frac{3x^2+x-1}{x^2+4}$, $g(x) = \\frac{(x+1)(2x-3)^2}{(5x-7)^2}$",
  "options": [
    { "label": "A", "value": "A", "text": "f(x) only" },
    { "label": "B", "value": "B", "text": "g(x) only" },
    { "label": "C", "value": "C", "text": "Both f(x) and g(x)" },
    { "label": "D", "value": "D", "text": "Neither" }
  ],
  "correctAnswer": "C",
  "explanation": "Both have equal degrees in numerator and denominator."
}
```

### Free Response with Limits
```typescript
{
  "id": "example-2",
  "type": "free-response",
  "question": "Evaluate the following limits for $g(x) = -3(x+1)^5(x-3)^2$: a) $\\lim_{x \\to -\\infty} g(x)$ b) $\\lim_{x \\to \\infty} g(x)$",
  "correctAnswer": "a) $\\infty$ b) $-\\infty$",
  "explanation": "Use end behavior based on leading term."
}
```

### Multiple Choice with Math in Options
```typescript
{
  "id": "example-3",
  "type": "multiple-choice",
  "question": "Which polynomial has the end behavior: $\\lim_{x \\to -\\infty} g(x) = -\\infty$ and $\\lim_{x \\to \\infty} g(x) = -\\infty$?",
  "options": [
    { "label": "A", "value": "A", "text": "$-4x^7 - 3x^3 + x - 6$" },
    { "label": "B", "value": "B", "text": "$-3x^6 + 5x^2 + 6x - 1$" },
    { "label": "C", "value": "C", "text": "$3x^3 + x^2 - 5x + 1$" },
    { "label": "D", "value": "D", "text": "$2x^4 - 7x^3 + 3x^2 + 1$" }
  ],
  "correctAnswer": "B",
  "explanation": "Even degree with negative leading coefficient."
}
```

### Rational Function with Complex Fraction
```typescript
{
  "id": "example-4",
  "type": "multiple-choice",
  "question": "Let $k(x) = \\frac{(x-3)^3(x+2)^3}{(x-3)^2(x+2)^4}$. Which statement about the graph of k is correct?",
  "options": [
    { "label": "A", "value": "A", "text": "Vertical asymptote at x = -2, hole at x = 3" },
    { "label": "B", "value": "B", "text": "Vertical asymptote at x = 3, hole at x = -2" },
    { "label": "C", "value": "C", "text": "Vertical asymptotes at both x = -2 and x = 3" },
    { "label": "D", "value": "D", "text": "Holes at both x = -2 and x = 3" }
  ],
  "correctAnswer": "A",
  "explanation": "Factor and simplify to find holes vs asymptotes."
}
```

---

## Dollar Signs (Currency)

To display a literal dollar sign without triggering LaTeX, escape it with a backslash.

### ❌ WRONG (triggers LaTeX)
```typescript
"question": "The stock costs $50"
```

### ✅ CORRECT (escaped dollar sign)
```typescript
"question": "The stock costs \\$50"
```

**Syntax:** Use `\\$` for a literal dollar sign in currency values

---

## Line Breaks in Explanations

To create line breaks in explanations and other text fields, use `\n`:

### ❌ WRONG (won't create a line break)
```typescript
"explanation": "Step 1: Do this. Step 2: Do that."
```

### ✅ CORRECT (creates proper line breaks)
```typescript
"explanation": "Step 1: Do this.\nStep 2: Do that."
```

**How it works:**
- Use `\n` in your string to indicate a line break
- The MathText component automatically converts these to `<br>` elements

**Multi-line example:**
```typescript
{
  "explanation": "Step 1: Identify the domain.\nStep 2: Find critical points.\nStep 3: Test intervals.\nStep 4: State your answer."
}
```

Renders as:
> Step 1: Identify the domain.
> Step 2: Find critical points.
> Step 3: Test intervals.
> Step 4: State your answer.

---

## Quick Reference Table

| Math Element | LaTeX Syntax | Example |
|-------------|--------------|---------|
| Fraction | `\\frac{a}{b}` | `$\\frac{x+1}{x-1}$` |
| Limit | `\\lim_{x \\to a}` | `$\\lim_{x \\to \\infty}$` |
| Infinity | `\\infty` | `$x \\to \\infty$` |
| Square root | `\\sqrt{x}` | `$\\sqrt{x+1}$` |
| Exponent | `x^{n}` | `$x^{2}$` |
| Less/equal | `\\leq` | `$x \\leq 5$` |
| Greater/equal | `\\geq` | `$x \\geq 3$` |
| Union | `\\cup` | `$(0,1) \\cup (2,3)$` |
| Pi | `\\pi` | `$\\pi r^2$` |
| Common log | `\\log(x)` | `$\\log(100)$` |
| Log base b | `\\log_b(x)` | `$\\log_2(8)$` |
| Natural log | `\\ln(x)` | `$\\ln(e^2)$` |

---

## Parts Questions in Export/Import

Parts questions are fully supported in the export/import system. When exported, the `parts` array is serialized as JSON. When imported, the parser detects `type: 'parts'` and reconstructs the full parts array including per-part options, answers, explanations, and images.

### Example Parts Question
```typescript
{
  id: "example-parts-1",
  type: "parts",
  question: "Given $f(x) = x^2 + 3x - 4$, answer the following:",
  parts: [
    {
      label: "a",
      type: "multiple-choice",
      question: "What is $f(0)$?",
      options: [
        { label: "A", value: "A", text: "$-4$" },
        { label: "B", value: "B", text: "$0$" },
        { label: "C", value: "C", text: "$4$" },
        { label: "D", value: "D", text: "$3$" }
      ],
      correctAnswer: "A"
    },
    {
      label: "b",
      type: "free-response",
      question: "Find the zeros of $f(x)$.",
      correctAnswer: "$x = 1$ and $x = -4$",
      explanation: "Factor as $(x-1)(x+4) = 0$"
    }
  ]
}
```

---

## Import/Export Handling

When questions are imported/exported via the custom units system, LaTeX strings go through JSON serialization. The system handles this automatically, but here's what happens:

### How Backslashes Work in JSON

In TypeScript/JSON strings, backslashes must be escaped:
- `\theta` in LaTeX → `\\theta` in TypeScript/JSON
- `\frac{1}{2}` in LaTeX → `\\frac{1}{2}` in TypeScript/JSON
- `\\` (literal backslash) → `\\\\` in TypeScript/JSON

### The System Handles This Automatically

The `customUnitsExport.ts` utility:
1. **Export**: Uses `JSON.stringify()` which automatically escapes backslashes
2. **Import**: Uses a smart `unescapeString()` function that correctly restores:
   - `\\n` → newline character (not `\n` text)
   - `\\theta` → `\theta` (LaTeX command preserved)
   - `\\\\` → `\` (literal backslash)

### Troubleshooting Import/Export Issues

If LaTeX breaks after import (e.g., `\theta` becomes `\ heta`):

**Problem**: The unescaping logic processed `\\t` as a tab character before handling `\\\\`.

**Solution**: The fix ensures double-backslashes are handled FIRST using a placeholder:
```typescript
// Step 1: Replace \\\\ with placeholder (protects LaTeX)
// Step 2: Process escape sequences (\\n → newline)
// Step 3: Restore placeholder as single backslash
```

### Manual Verification

When viewing exported `.ts` files:
- `\\theta` is CORRECT (will render as θ)
- `\theta` is WRONG (will cause parsing issues)
- `\\ heta` is WRONG (backslash-t was incorrectly interpreted as tab)

---

## Troubleshooting

**Problem:** Math not rendering, showing raw text like `x^2`
- **Fix:** Wrap in `$...$`: `$x^2$`. There is NO auto-conversion.

**Problem:** Chemistry formulas not rendering (e.g., H2O showing as plain text)
- **Fix:** Use `$\\ce{H2O}$`. Chemistry auto-formatting was removed in March 2026.

**Problem:** Backslashes disappearing
- **Fix:** Use `\\` instead of `\` in TypeScript/JSON strings

**Problem:** Fractions appearing as (a)/(b)
- **Fix:** Use `$\\frac{a}{b}$` syntax. Auto-fraction conversion was removed.

**Problem:** Limits showing as plain text
- **Fix:** Use `$\\lim_{x \\to a}$` syntax. Auto-limit conversion was removed.

**Problem:** LaTeX breaks after import/export (e.g., `\theta` → `\ heta`)
- **Fix:** This was a bug in the unescaping order - update to latest `customUnitsExport.ts`
