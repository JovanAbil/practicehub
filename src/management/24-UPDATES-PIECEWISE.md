# 24 — Piecewise, Duplicate Parts, Math Builder, Importer

This file is a **copy/paste recipe book**. Every section tells you:

1. The exact file to open.
2. The exact lines to look at.
3. The exact code to paste in.

No "this is already done" hand-waving — even for changes that shipped, the
full code is reproduced so you can re-apply or audit it in any branch.

---

## 1. Piecewise Function Rendering

### 1a. What's already in the project

A reusable component lives at `src/components/PiecewiseFunction.tsx`. It
exports a default `<PiecewiseFunction>` plus a named parser
`parsePiecewiseToken`. Both build a KaTeX `\begin{cases}…\end{cases}` block
and pass it to `<MathText>`.

> **Q: Is the `[[piecewise|...]]` token automatically converted to LaTeX?**
>
> **No.** The token is *not* auto-detected anywhere. By itself the renderer
> still calls `<MathText>{question.question}</MathText>`, which treats
> `[[piecewise|...]]` as literal text. You must wire the token in by
> replacing each `<MathText>` call below with the wrapper from Step 1b.
> After that wiring, the wrapper detects the token and `<PiecewiseFunction>`
> handles the LaTeX conversion for you — inside `expr` and `cond` you write
> plain LaTeX (no `$`), e.g. `x^2 : x < 0`. Numbers, letters, `<`, `>`, `=`
> render as-is; LaTeX commands (`\leq`, `\geq`, `\infty`, `\frac{}{}`) get
> rendered by KaTeX. `name` (the first segment, if it contains no `:`)
> renders as math too.

### 1b. EXACT edits to make piecewise actually render

You need to edit **three files**. In each one, find every `<MathText>` call
that renders a *question stem* (NOT options/explanations — those rarely
contain piecewise). For each one, replace it with the wrapper.

#### File 1: `src/pages/Quiz.tsx`

**Add the import.** Open the file. Find line 28:

```tsx
import MathText from '@/components/MathText';
```

Replace it with:

```tsx
import MathText from '@/components/MathText';
import PiecewiseFunction, { parsePiecewiseToken } from '@/components/PiecewiseFunction';
```

**Wrap the stem.** Find line 934 (the question-stem render):

```tsx
              <MathText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed" enableChemistry={subject === 'chemistry'}>
                {currentQuestion.question}
              </MathText>
```

Replace those three lines with:

```tsx
              {(() => {
                const text = currentQuestion.question;
                if (!text.includes('[[piecewise')) {
                  return (
                    <MathText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed" enableChemistry={subject === 'chemistry'}>
                      {text}
                    </MathText>
                  );
                }
                const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
                return (
                  <h3 className="text-xl font-semibold mb-6 leading-relaxed">
                    {segments.map((seg, i) => {
                      const parsed = parsePiecewiseToken(seg);
                      if (parsed) {
                        return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
                      }
                      return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
                    })}
                  </h3>
                );
              })()}
```

#### File 2: `src/components/PartsQuestionView.tsx`

**Add the import.** Find line 10:

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import PiecewiseFunction, { parsePiecewiseToken } from '@/components/PiecewiseFunction';
```

**Wrap the parent-question stem.** Find lines 139–141:

```tsx
      <MathText tag="h3" className="text-xl font-semibold mb-4 leading-relaxed" enableChemistry={subject === 'chemistry'}>
        {question.question}
      </MathText>
```

Replace with:

```tsx
      {(() => {
        const text = question.question;
        if (!text.includes('[[piecewise')) {
          return (
            <MathText tag="h3" className="text-xl font-semibold mb-4 leading-relaxed" enableChemistry={subject === 'chemistry'}>
              {text}
            </MathText>
          );
        }
        const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
        return (
          <h3 className="text-xl font-semibold mb-4 leading-relaxed">
            {segments.map((seg, i) => {
              const parsed = parsePiecewiseToken(seg);
              if (parsed) return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
              return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
            })}
          </h3>
        );
      })()}
```

**Wrap each part's stem.** Find lines 177–179:

```tsx
            <MathText tag="p" className="text-sm mb-3 leading-relaxed" enableChemistry={subject === 'chemistry'}>
              {part.question}
            </MathText>
```

Replace with:

```tsx
            {(() => {
              const text = part.question;
              if (!text.includes('[[piecewise')) {
                return (
                  <MathText tag="p" className="text-sm mb-3 leading-relaxed" enableChemistry={subject === 'chemistry'}>
                    {text}
                  </MathText>
                );
              }
              const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
              return (
                <p className="text-sm mb-3 leading-relaxed">
                  {segments.map((seg, i) => {
                    const parsed = parsePiecewiseToken(seg);
                    if (parsed) return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
                    return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
                  })}
                </p>
              );
            })()}
```

#### File 3: `src/pages/ViewAllQuestions.tsx`

**Add the import.** Find line 7:

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import PiecewiseFunction, { parsePiecewiseToken } from '@/components/PiecewiseFunction';
```

**Wrap the stem.** Find line 114:

```tsx
              <MathText tag="p" className="text-base mb-4" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>
```

Replace with:

```tsx
              {(() => {
                const text = question.question;
                if (!text.includes('[[piecewise')) {
                  return <MathText tag="p" className="text-base mb-4" enableChemistry={subject === 'chemistry'}>{text}</MathText>;
                }
                const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
                return (
                  <p className="text-base mb-4">
                    {segments.map((seg, i) => {
                      const parsed = parsePiecewiseToken(seg);
                      if (parsed) return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
                      return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
                    })}
                  </p>
                );
              })()}
```

**Also wrap the parts stem on line 158:**

```tsx
                      <MathText className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{part.question}</MathText>
```

Replace with:

```tsx
                      {(() => {
                        const text = part.question;
                        if (!text.includes('[[piecewise')) {
                          return <MathText className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{text}</MathText>;
                        }
                        const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
                        return (
                          <span className="text-sm mb-3 block">
                            {segments.map((seg, i) => {
                              const parsed = parsePiecewiseToken(seg);
                              if (parsed) return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
                              return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
                            })}
                          </span>
                        );
                      })()}
```

### 1c. Token grammar (quick reference)

```
[[piecewise|<name?>|<expr1> : <cond1>|<expr2> : <cond2>|...]]
```

- First segment = name (e.g. `f(x)`) **only if it has no `:`**.
- Inside expr/cond: write LaTeX without `$`. Double-escape backslashes in
  `.ts` strings → `\\leq`, `\\geq`, `\\infty`.

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

## 2. Duplicate Parts in Parts-Based Questions — EXACT diff

### 2a. What this feature does

Adds a "Copy" icon button next to each part's Trash button in
`CustomTopicEditor`. Clicking it deep-clones that part (so the duplicate's
options/arrays don't share references), inserts it right after the source,
then re-labels every part `a, b, c, …` so labels stay sequential.

### 2b. Exact file + lines

**File:** `src/pages/CustomTopicEditor.tsx`

**The `Copy` icon import is already present on line 28** — verify it reads:

```tsx
import { ArrowLeft, Plus, Minus, Save, Trash2, Calculator, Image, GripVertical, Pencil, Copy, Link2, Layers, List, CheckSquare } from 'lucide-react';
```

If `Copy` is missing, add it to the import list.

**The button itself lives at lines 995–1016.** This is the *current*
contents — if you're porting to another branch, replace whatever sits in
those lines with this block exactly:

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

**Where to find the right spot in a fresh fork:** search for
`title="Duplicate this part"`. If it doesn't exist, search for
`<Trash2 className="h-4 w-4 text-destructive" />` — the duplicate button
goes immediately *before* the `{editingQuestion.parts!.length > 1 && (`
block that wraps that Trash button.

### 2c. Why `JSON.parse(JSON.stringify(...))`?

Parts hold nested arrays (`options`, `correctAnswers`, `listAnswers`). A
shallow spread `{ ...source }` would make the duplicate share those arrays
with the original — editing one option would silently mutate the other
part. `JSON.parse(JSON.stringify(...))` is the cheapest correct clone since
parts hold no functions, Dates, or Maps.

---

## 3. Removing the word-based auto-type shortcuts

Word triggers like typing `int ` → `\int`, `sum ` → `\sum`, `neq ` → `\neq`
mangled normal prose ("**int**eresting", "**sum**mary").

**File:** `src/components/MathQuickInput.tsx`, **lines 73–76**.

Current state — leave as is:

```ts
// Word-based "type-and-space" shortcuts were removed by request — they triggered
// far more accidental replacements (e.g. typing "int" inside a word) than they
// were worth. The immediate single-key shortcuts below (^, _) are kept.
const keyboardShortcuts: { pattern: RegExp; latexReplacement: string; unicodeReplacement: string; cursorOffset: number; originalText: string }[] = [];
```

To bring back a single specific shortcut, add ONE entry to the array, e.g.:

```ts
const keyboardShortcuts = [
  { pattern: /(?:^|[^a-zA-Z])sqrt$/i, latexReplacement: '\\sqrt{}', unicodeReplacement: '√()', cursorOffset: 0, originalText: 'sqrt' },
];
```

---

## 4. The `≠` (not-equal) Problem — REAL root cause

### 4a. What was actually broken

The earlier "add a trailing space to `\neq`" fix was a band-aid. The real
bug lives in **`src/components/MathText.tsx` line 19**, which used to read:

```ts
let processed = String(children).replace(/\\n/g, '\n');
```

That regex matches **any** backslash-n in the source — including the `\n`
that *starts* the LaTeX commands `\neq`, `\nabla`, `\ne`, `\not`, `\neg`,
`\ni`, `\nu`. So `$x \neq y$` got rewritten to `$x [newline]eq y$` before
KaTeX ever saw it, and KaTeX then rendered `eq` as italic text.

### 4b. The fix (already applied)

**File:** `src/components/MathText.tsx`, **lines 19–23**. Verify it reads:

```ts
      // Convert escaped newlines (\\n in source) to actual newlines before processing.
      // CRITICAL: use a negative lookahead so we don't eat the "\n" at the start of
      // LaTeX commands like \neq, \nabla, \ne, \not, \neg, \ni, \nu — those must
      // stay intact for KaTeX. Only treat \n as a newline if the next char is NOT a letter.
      let processed = String(children).replace(/\\n(?![a-zA-Z])/g, '\n');
```

The negative lookahead `(?![a-zA-Z])` says: "only treat `\n` as a newline
if the next character is NOT a letter." Real newlines authors write
(`\n\n`, `\n$x$`, `text\n`) still convert; LaTeX commands stay intact.

### 4c. If you also want to paste `≠` directly

The Math Builder button at `src/components/MathBuilderSidebar.tsx` line 36
emits `\\neq ` (with trailing space). If you'd rather have it paste the
literal Unicode character instead — which sidesteps any KaTeX issue
entirely — change that one line to:

```ts
  { display: '≠', latex: '≠', name: 'Not Equal' },
```

And the same in `src/components/MathQuickInput.tsx` line 21:

```ts
  { label: '≠', latex: '≠', unicode: '≠', tooltip: 'Not equal' },
```

KaTeX inside `$...$` accepts the Unicode `≠` directly. Outside math it
just renders as the character. Either approach works; pick one.

---

## 5. Importing `correctAnswers` and `listAnswers` — EXACT code

### 5a. What was broken

AI generators almost always emit:

```ts
correctAnswers: ['A', 'C'],
listAnswers: ['cytoplasm', 'nucleus'],
```

The old importer ran each of those through `JSON.parse`. JSON only accepts
double quotes, so the parse threw, the catch block set the array to `[]`,
and the imported question silently lost all answers.

### 5b. The helper — exact code, exact location

**File:** `src/utils/customUnitsExport.ts`. The helper is at **lines
615–639**. Verify it reads:

```ts
// Parse a string-array literal that may use either single or double quotes.
// JSON.parse only accepts double quotes, so when an AI (or hand-written file)
// uses ['A','C'] the parse silently fails and answers disappear. This helper
// tries JSON first, then falls back to evaluating the literal with `new Function`
// (which natively understands both quote styles), and finally falls back to a
// regex sweep of every quoted token inside the brackets.
const parseStringArrayLiteral = (raw: string): string[] => {
  if (!raw) return [];
  const trimmed = raw.trim();
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* fall through */ }
  try {
    // eslint-disable-next-line no-new-func
    const parsed = new Function(`return ${trimmed}`)();
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* fall through */ }
  // Last-resort: pull every quoted token out of the brackets
  const out: string[] = [];
  const re = /(["'])((?:\\.|(?!\1).)*)\1/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(trimmed)) !== null) out.push(m[2]);
  return out;
};
```

If this block is missing from your fork, paste it immediately **before**
the line `// Parse uploaded .ts file content to extract questions` (around
line 641).

### 5c. Wire the helper into `listAnswers`

**File:** `src/utils/customUnitsExport.ts`, around **line 755** (inside the
`type === 'free-response'` branch). Verify this exact line exists:

```ts
                  const arr = parseStringArrayLiteral(questionStr.substring(lStart, lEnd + 1));
                  listAnswers = arr.length > 0 ? arr : undefined;
```

If you instead see `JSON.parse(questionStr.substring(lStart, lEnd + 1))`,
replace those two lines with the version above.

### 5d. Wire the helper into `correctAnswers` (for SATA)

In the same file, find the `type === 'select-all'` branch (search for
`'select-all'`). Wherever it currently does `JSON.parse(...)` on the
`correctAnswers` slice, replace that one call with:

```ts
                const correctAnswers = parseStringArrayLiteral(questionStr.substring(caStart, caEnd + 1));
```

(Variable names will already exist in context — `caStart` / `caEnd` are
just whatever brace-counted positions that branch is already using.)

### 5e. Also fix `tsQuestionParser.ts` for the upload-via-button path

`src/utils/tsQuestionParser.ts` is the parser used by the "Upload .ts" UI
in the unit page. It already evaluates the whole array with `new Function`
(see line ~52), so it natively accepts single quotes — **no change needed
there**. Single-quoted `correctAnswers: ['A', 'C']` already imports
correctly via that path. The only file that needed patching is
`customUnitsExport.ts`, because that one was using `JSON.parse` on slices
of text rather than evaluating the whole array.

### 5f. Verification

1. Save a file containing:
   ```ts
   {
     id: 'sata-1',
     type: 'select-all',
     question: "Pick the prime numbers.",
     options: [
       { label: 'A', value: 'A', text: '2' },
       { label: 'B', value: 'B', text: '4' },
       { label: 'C', value: 'C', text: '5' },
       { label: 'D', value: 'D', text: '6' },
     ],
     correctAnswers: ['A', 'C'],
     explanation: '2 and 5 are prime.',
   }
   ```
2. Import it through Build Custom Practice.
3. Open the question in the editor: both A and C should be pre-checked as
   correct. Before the fix they'd both be unchecked.

---

## 6. Teaching the AI generator about `[[piecewise|…]]`

**File:** `src/pages/QuestionGenerator.tsx`, **lines 288–311**. Verify a
`== Piecewise Functions ==` block exists between the `== Tables ==` and
`== Images ==` sections of `AI_PROMPT`. The exact text to paste in (note
quadruple backslashes — both this prompt and the AI's output are TS
strings):

```text
== Piecewise Functions ==
For piecewise functions, use the inline [[piecewise|...]] token directly inside the question string. This renders a proper left brace with aligned (expression | condition) rows.

Grammar: [[piecewise|<name?>|<expr1> : <cond1>|<expr2> : <cond2>|...]]
- The first segment is the function name (e.g. f(x)) ONLY if it contains no colon.
- Otherwise every segment is a piece.
- Inside expr and cond, use normal LaTeX without surrounding $ (and remember double-escaping: \\\\leq, \\\\geq, \\\\infty).

Example:
{
  id: 'piecewise-1',
  type: 'multiple-choice',
  question: "Let [[piecewise|f(x)|x^2 : x < 0|2x+1 : 0 \\\\leq x \\\\leq 3|9 : x > 3]]. Find $f(2)$.",
  options: [
    { label: 'A', value: 'A', text: '$4$' },
    { label: 'B', value: 'B', text: '$5$' },
    { label: 'C', value: 'C', text: '$9$' },
    { label: 'D', value: 'D', text: '$2$' },
  ],
  correctAnswer: 'B',
  explanation: 'Since $0 \\\\leq 2 \\\\leq 3$, use $2x+1$, giving $5$.',
}

NEVER write piecewise functions as plain text like "{ x^2 if x<0 ; 2x if x>=0 }" — always use the [[piecewise|...]] token so it renders correctly.
```

---

## 7. End-to-end verification checklist

After all edits:

1. **Piecewise renders.** Paste the example from §1c into a topic, open it
   in the quiz. You should see a real left brace `{` with two aligned
   columns. If you see literal `[[piecewise|...]]`, you skipped §1b.
2. **`≠` renders.** In any question containing `$x \neq y$`, the rendered
   output should show `x ≠ y`. If you see `x` then a line break then italic
   `eq y`, the §4b regex fix wasn't applied.
3. **Duplicate part works.** In the custom editor, add a parts question
   with two parts, click the Copy icon on part `b`. Part `c` should appear
   with identical content and labels stay sequential.
4. **SATA import.** Upload a `.ts` with `correctAnswers: ['A', 'C']` —
   both A and C should be pre-marked correct in the editor.
5. **Word typing stays intact.** Type `summary` and `interesting` in any
   FRQ box — neither should turn into LaTeX.
