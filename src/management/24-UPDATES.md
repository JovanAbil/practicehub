# 24 — Piecewise Functions, Duplicate Parts, Math Builder Cleanup & Importer Fixes

This document covers four shipped changes plus one new feature you can opt
into. Everything below is paired with the **exact file + line numbers** that
were touched so a future copy/paste into a fork is trivial.

> Skim the "What changed in this commit" boxes if you only want to mirror the
> patch into another branch. The "How to extend it" sections explain the
> design so you can build on top of it later.

---

## 1. Piecewise Function Rendering

### Problem

Authors were writing piecewise functions as plain text inside the question
string, e.g. `f(x) = { x^2 if x<0 ; 2x+1 if 0<=x<=3 ; 9 if x>3 }`. KaTeX has
no way to know that's a piecewise function, so it rendered as one ugly line
without a left brace or aligned conditions.

### What we shipped

A reusable component plus a parser for an inline `[[piecewise|…]]` token so
you can keep writing questions as plain strings.

#### New file: `src/components/PiecewiseFunction.tsx`

That file is fully self-contained (≈90 lines). It exports:

| Export | Use |
| --- | --- |
| `<PiecewiseFunction name="f(x)" pieces={[…]} />` | Render directly from JSX |
| `parsePiecewiseToken(token)` | Turn `[[piecewise|…]]` into `{ name, pieces }` |

Under the hood it builds a single KaTeX `\begin{cases}…\end{cases}` block
and hands it to `MathText`, so the brace, alignment, and "if" text all match
the rest of the math on the site.

### How to use it in a question file

```ts
import { PiecewiseFunction } from '@/components/PiecewiseFunction';

// In your renderer (e.g. UnitDetail / Quiz), if you detect a piecewise piece,
// drop in the component:
<PiecewiseFunction
  name="f(x)"
  pieces={[
    { expr: 'x^2',     when: 'x < 0' },
    { expr: '2x + 1',  when: '0 \\leq x \\leq 3' },
    { expr: '9',       when: 'x > 3' },
  ]}
/>
```

### How to make it work inline inside a question string

If you want authors to keep writing `question: "..."` and never touch JSX,
add this **one block** to wherever you render question text (currently
`src/components/PartsQuestionView.tsx`, `src/pages/Quiz.tsx`, and
`src/pages/ViewAllQuestions.tsx`). The pattern is the same in all three
files — wrap the existing `<MathText>` call.

Replace this:

```tsx
<MathText>{question.question}</MathText>
```

with this:

```tsx
{(() => {
  const text = question.question;
  // Quick out: no token, render normally
  if (!text.includes('[[piecewise')) return <MathText>{text}</MathText>;

  // Split on the token, preserving order, and render in-place
  const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
  return (
    <span>
      {segments.map((seg, i) => {
        const parsed = parsePiecewiseToken(seg);
        if (parsed) {
          return (
            <PiecewiseFunction
              key={i}
              name={parsed.name}
              pieces={parsed.pieces}
            />
          );
        }
        return <MathText key={i}>{seg}</MathText>;
      })}
    </span>
  );
})()}
```

Add the imports at the top of the same file:

```ts
import PiecewiseFunction, { parsePiecewiseToken } from '@/components/PiecewiseFunction';
```

### Token grammar

```
[[piecewise|<name?>|<expr1> : <cond1>|<expr2> : <cond2>|...]]
```

- The first segment is treated as the **name** (e.g. `f(x)`) **only** if it
  contains no `:`. Otherwise every segment is a piece.
- Use normal LaTeX inside both `expr` and `cond` (no surrounding `$`).
- Remember double-escaping in `.ts` strings: `\\leq` not `\leq`.

Example question:

```ts
{
  id: 'piecewise-demo-1',
  type: 'multiple-choice',
  question: "Let [[piecewise|f(x)|x^2 : x < 0|2x+1 : 0 \\leq x \\leq 3|9 : x > 3]]. Find $f(2)$.",
  options: [
    { label: 'A', value: 'A', text: '$4$' },
    { label: 'B', value: 'B', text: '$5$' },
    { label: 'C', value: 'C', text: '$9$' },
    { label: 'D', value: 'D', text: '$2$' },
  ],
  correctAnswer: 'B',
}
```

---

## 2. Duplicate Parts in Parts-Based Questions

### Problem

A parts question with parts a/b/c/d that share a stem (e.g. four
near-identical "compute the derivative" sub-questions) had to be hand-built
from scratch for every part.

### What changed (already in this commit)

`src/pages/CustomTopicEditor.tsx` got a **Copy button** next to the existing
Trash button on every part card.

- File: `src/pages/CustomTopicEditor.tsx`
- Lines: **995 – 1016** (replaces the old Trash-only block)
- Behavior: deep-clones the source part via `JSON.parse(JSON.stringify(...))`,
  splices it in right after the source, then re-labels every part `a, b, c, …`
  so labels always stay sequential.
- Icon: `Copy` from `lucide-react` (already imported on line 28 — no new
  import needed).

### Exact code to copy/paste into another branch

If you're porting this into a fork, replace the block that currently looks
like the old single-button `{editingQuestion.parts!.length > 1 && (...)}`
with this:

```tsx
<Button variant="ghost" size="icon" className="h-8 w-8" title="Duplicate this part" onClick={() => {
  const labels = 'abcdefghij';
  const source = editingQuestion.parts![pIdx];
  // Deep clone so the duplicate doesn't share option/array references
  const cloned: EditingPart = JSON.parse(JSON.stringify(source));
  const newParts = [...editingQuestion.parts!];
  newParts.splice(pIdx + 1, 0, cloned);
  const relabeled = newParts.map((p, i) => ({ ...p, label: labels[i] || `${i + 1}` }));
  setEditingQuestion({ ...editingQuestion, parts: relabeled });
}}>
  <Copy className="h-4 w-4" />
</Button>
{editingQuestion.parts!.length > 1 && (
  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
    const newParts = editingQuestion.parts!.filter((_, i) => i !== pIdx);
    const labels = 'abcdefghij';
    const relabeled = newParts.map((p, i) => ({ ...p, label: labels[i] || `${i + 1}` }));
    setEditingQuestion({ ...editingQuestion, parts: relabeled });
  }}>
    <Trash2 className="h-4 w-4 text-destructive" />
  </Button>
)}
```

### Why JSON-clone instead of `{ ...source }`?

Because parts contain nested arrays (`options`, `correctAnswers`,
`listAnswers`). A shallow spread would make the duplicate share those arrays
with the original, so editing one option would silently mutate the other
part. `JSON.parse(JSON.stringify(...))` is the cheapest correct clone here
since parts hold no functions / Dates / Maps.

---

## 3. Removing the Word-Based Auto-Type Shortcuts

### Problem

Typing `sum `, `int `, `neq `, `leq `, etc. inside any FRQ or question box
silently replaced your word with LaTeX. That was helpful in the math-only
test page it was originally written for, but in normal prose it constantly
mangled words like "**int**eresting" and "**sum**mary".

### What changed (already in this commit)

`src/components/MathQuickInput.tsx` — the entire `keyboardShortcuts` array
was emptied. Only the two single-key shortcuts (`^` → `^{}`, `_` → `_{}`)
remain, since those genuinely have no other meaning inside math.

- File: `src/components/MathQuickInput.tsx`
- Lines: **73 – 76** (was 73 – 95)
- Help text updated at lines **293 – 294** so the panel no longer advertises
  shortcuts that no longer exist.

If you want a word-based shortcut **back** (for one specific term you
actually want), add a single entry to the now-empty array:

```ts
const keyboardShortcuts: { … }[] = [
  { pattern: /(?:^|[^a-zA-Z])sqrt$/i, latexReplacement: '\\sqrt{}', unicodeReplacement: '√()', cursorOffset: 0, originalText: 'sqrt' },
];
```

The matching, undo, and space-handling code below still works — it just has
nothing to match against right now.

---

## 4. Fixing the `≠` (not-equal) Insert in the Math Builder

### Problem

Clicking the `≠` button inserted the bare LaTeX command `\neq`. If the very
next character you typed was a letter (e.g. `x`), KaTeX read it as the
unknown command `\neqx` and the symbol vanished entirely.

### What changed (already in this commit)

Both insertion points now emit `\neq ` (note the trailing space) so the
command always terminates cleanly.

| File | Line | Change |
| --- | --- | --- |
| `src/components/MathBuilderSidebar.tsx` | **36** | `latex: '\\neq '` |
| `src/components/MathQuickInput.tsx`     | **21** | `latex: '\\neq '` |

If you want this same fix for any other multi-letter command that's prone
to gluing onto the next letter (`\to`, `\pm`, `\cup`, `\cap`, `\in`,
`\infty`, `\theta`, `\alpha`, `\beta`, `\Delta`), add the same trailing
space to that entry's `latex` field. The KaTeX renderer ignores the extra
space, so there's no downside.

---

## 5. Import/Export Fix for `select-all` and `listAnswers`

### Problem

When an AI-generated `.ts` question file used single-quoted arrays — which
they almost always do —

```ts
correctAnswers: ['A', 'C'],
listAnswers: ['cytoplasm', 'nucleus'],
```

…the importer ran them through `JSON.parse(...)`. JSON only accepts double
quotes, so the parse threw, the catch block set the array to `[]`, and the
imported question was effectively broken: SATA questions had no correct
answers and list-FRQs had no items to match against.

### What changed (already in this commit)

A new helper, `parseStringArrayLiteral`, is now used everywhere a
quoted-string array is read out of a question file. It tries three
strategies in order:

1. `JSON.parse` (handles the double-quoted, machine-generated case).
2. `new Function('return ' + raw)` (handles single quotes, trailing commas,
   and any other JS-but-not-JSON quirks — exactly the same trick the main
   `.ts` uploader already uses for question objects).
3. A regex sweep that pulls every quoted token out of the brackets, as a
   last-resort safety net.

- File: `src/utils/customUnitsExport.ts`
- New helper: **lines 615 – 640**
- `listAnswers` parse: **lines 728 – 731** (was a raw `JSON.parse`)
- `correctAnswers` parse: **lines 768 – 770** (was a raw `JSON.parse`)

### What this means for AI-generated files

You can now feed in either of these and both will import correctly:

```ts
// Double quotes (old, still works)
correctAnswers: ["A", "C"],

// Single quotes (new, no longer drops the answers)
correctAnswers: ['A', 'C'],

// Even mixed / trailing comma (parsed via new Function fallback)
correctAnswers: ['A', "C",],
```

Same applies to `listAnswers` on free-response questions.

### How to extend the fix to any other array field you add later

If you add a new question field that's an array of strings (e.g.
`tags: ['a', 'b']`), do **not** call `JSON.parse` on it directly. Use the
helper:

```ts
import { /* internal */ } from '@/utils/customUnitsExport';
// or copy the helper into a shared util file if you need it elsewhere.

const arr = parseStringArrayLiteral(rawSubstring);
```

The helper is currently file-local. If you start needing it from outside
`customUnitsExport.ts`, promote it to `src/utils/parseArrayLiteral.ts` and
re-export — the implementation has no other dependencies.

---

## Quick Verification Checklist

After pulling this patch into a branch, sanity-check by:

1. **Piecewise**: create a question whose stem includes
   `[[piecewise|f(x)|x^2 : x<0|2x : 0\\leq x\\leq 3|9 : x>3]]` and confirm
   it renders with a left brace and aligned rows. (Only after you've added
   the wrapper from Section 1 to your renderer file.)
2. **Duplicate part**: open any parts question in the custom editor → click
   the Copy icon on part `b` → a part `c` appears with identical content,
   labels are renumbered.
3. **Auto-type**: in any FRQ box, type `summary` — the word should stay
   intact instead of becoming `\sum mary`.
4. **`≠`**: open Math Builder → click `≠` → type `x` → the rendered preview
   should show `≠ x`, not nothing.
5. **SATA import**: upload a `.ts` file with `correctAnswers: ['A', 'C']` —
   confirm both correct answers survive the import (check the quiz panel
   reads "Select all that apply" with the two correct boxes).
