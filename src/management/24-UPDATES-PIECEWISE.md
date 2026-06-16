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

---

## 8. Add a "Piecewise" button to the Math Builder sidebar

This makes piecewise easy to insert from the custom question editor — no
need to remember the `[[piecewise|...]]` grammar. The button writes the
token directly into the field (NOT wrapped in `$...$`, because the token
is not LaTeX — it's parsed by `parsePiecewiseToken` before render).

File to edit: **`src/components/MathBuilderSidebar.tsx`**

### 8a. Add a "Templates" type (top of file, near other interfaces)

Find the `MathFunction` interface (around line 22–27). Right below it,
**paste this new interface**:

```typescript
interface MathTemplate {
  name: string;
  description: string;
  // Full text to insert verbatim (NOT wrapped in $...$ by the builder).
  raw: string;
}
```

### 8b. Add the piecewise template list

Find the end of the `mathFunctions` array (the closing `];` around line
127, right after the Tangent entry). **Directly after** that `];`, paste:

```typescript
const mathTemplates: MathTemplate[] = [
  {
    name: 'Piecewise (2 pieces)',
    description: '[[piecewise|f(x)|expr1 : cond1|expr2 : cond2]]',
    raw: '[[piecewise|f(x)|x^2 : x < 0|2x : x \\geq 0]]',
  },
  {
    name: 'Piecewise (3 pieces)',
    description: 'Three-branch piecewise function',
    raw: '[[piecewise|f(x)|x^2 : x < 0|2x+1 : 0 \\leq x \\leq 3|9 : x > 3]]',
  },
  {
    name: 'Piecewise (no name)',
    description: 'Just the cases, no "f(x) =" label',
    raw: '[[piecewise|x : x \\geq 0|-x : x < 0]]',
  },
];
```

### 8c. Add a handler that inserts the token RAW (no `$...$` wrap)

Find `handleInsert` (around line 188). **Directly above** it, paste:

```typescript
  const handleTemplateClick = (tpl: MathTemplate) => {
    // Templates like [[piecewise|...]] must NOT be wrapped in $...$ —
    // they are parsed by parsePiecewiseToken in the question renderer.
    onInsert(tpl.raw);
  };
```

### 8d. Render the Templates section in the sidebar

Find the closing `</div>` of the "Math Functions" section — it's the
`</div>` right before the final `</ScrollArea>` (around line 280–285).
**Directly before** that `</ScrollArea>` closing tag, paste:

```tsx
        <Separator />

        {/* Special Templates Section */}
        <div className="p-4">
          <Label className="text-sm font-semibold mb-3 block">Special Templates</Label>
          <p className="text-xs text-muted-foreground mb-3">
            These insert a token directly (no <code className="font-mono">$...$</code> wrapping).
            Piecewise tokens are converted to a real <code>cases</code> brace at render time.
          </p>
          <div className="space-y-2">
            {mathTemplates.map((tpl) => (
              <Button
                key={tpl.name}
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-primary/10 hover:border-primary"
                onClick={() => handleTemplateClick(tpl)}
              >
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <span className="font-medium text-sm">{tpl.name}</span>
                  <code className="text-xs text-muted-foreground font-mono truncate w-full">
                    {tpl.description}
                  </code>
                </div>
              </Button>
            ))}
          </div>
        </div>
```

### 8e. (Optional) Add a usage hint to the Instructions panel

In the "Instructions Section" (around lines 217–235), inside the inner
`<div className="text-sm space-y-2">`, **paste this `<p>` as the last
child** (just before the closing `</div>` of that text block):

```tsx
              <p className="text-muted-foreground">
                For <strong>piecewise functions</strong>, scroll down to{' '}
                <strong>Special Templates</strong> — those insert a{' '}
                <code className="bg-muted px-1 py-0.5 rounded font-mono">[[piecewise|...]]</code>{' '}
                token that renders as a real <code>{`{`}</code> brace.
              </p>
```

### 8f. Verify

1. Open any custom topic editor, click the calculator/math icon to open
   the Math Builder sidebar.
2. Scroll to the bottom — you should see a **Special Templates** group
   with three Piecewise buttons.
3. Click **Piecewise (3 pieces)**. The field receives the raw
   `[[piecewise|f(x)|...]]` token (NOT surrounded by `$`).
4. Save the question and open it in the quiz — it should render as a
   proper `{` brace with aligned rows, exactly like §1 of this doc.
5. If you see the literal `[[piecewise|...]]` text instead, you skipped
   §1b (wiring `parsePiecewiseToken` into the renderer).

### 8g. Why two insert paths?

- `handleInsert` (existing) wraps content in `$...$` → for LaTeX math.
- `handleTemplateClick` (new) inserts raw text → for custom tokens like
  `[[piecewise|...]]` that are parsed BEFORE KaTeX ever sees them.

If you ever add more custom tokens (tables, graphs, etc.), append them
to `mathTemplates` — same pattern, no extra wiring needed.

---

## 9. Piecewise on the Results / Review page

**Symptom:** piecewise renders correctly in `Quiz.tsx`, `PartsQuestionView.tsx`,
and `ViewAllQuestions.tsx`, but on the **Results** page (post-quiz review)
the same question shows the raw `[[piecewise|...]]` text. That is because
`src/pages/Results.tsx` was not wired in §1b — it has its OWN copies of
`<MathText>` for the question stem and each part stem, and they need the
same wrapper.

There are exactly **two** stem-render sites to fix in `src/pages/Results.tsx`.
Options / answers / explanations almost never contain piecewise, so leave
those `<MathText>` calls alone.

### 9a. Add the import

Open `src/pages/Results.tsx`. Find line **10**:

```tsx
import MathText from '@/components/MathText';
```

Replace it with:

```tsx
import MathText from '@/components/MathText';
import PiecewiseFunction, { parsePiecewiseToken } from '@/components/PiecewiseFunction';
```

### 9b. Wrap the main question stem (line 434)

Find line **434**:

```tsx
                      <MathText tag="p" className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>
```

Replace that single line with:

```tsx
                      {(() => {
                        const text = question.question;
                        if (!text.includes('[[piecewise')) {
                          return (
                            <MathText tag="p" className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>
                              {text}
                            </MathText>
                          );
                        }
                        const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
                        return (
                          <p className="text-sm mb-3">
                            {segments.map((seg, i) => {
                              const parsed = parsePiecewiseToken(seg);
                              if (parsed) {
                                return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
                              }
                              return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
                            })}
                          </p>
                        );
                      })()}
```

### 9c. Wrap each part stem (line 517)

Find line **517** (inside the `question.type === 'parts'` branch):

```tsx
                                <MathText tag="p" className="mb-2" enableChemistry={subject === 'chemistry'}>{part.question}</MathText>
```

Replace that single line with:

```tsx
                                {(() => {
                                  const text = part.question;
                                  if (!text.includes('[[piecewise')) {
                                    return (
                                      <MathText tag="p" className="mb-2" enableChemistry={subject === 'chemistry'}>
                                        {text}
                                      </MathText>
                                    );
                                  }
                                  const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
                                  return (
                                    <p className="mb-2">
                                      {segments.map((seg, i) => {
                                        const parsed = parsePiecewiseToken(seg);
                                        if (parsed) {
                                          return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
                                        }
                                        return <MathText key={i} enableChemistry={subject === 'chemistry'}>{seg}</MathText>;
                                      })}
                                    </p>
                                  );
                                })()}
```

### 9d. Verify

1. Take a quiz that contains a `[[piecewise|...]]` question (e.g. the
   `piecewise-demo-1` example from §1).
2. Submit the quiz to reach the Results page.
3. The "Review Each Question" card should now show the proper `{` brace
   with aligned rows — identical to how it looked during the quiz.
4. If it still shows literal `[[piecewise|...]]`, you either edited the
   wrong line (double-check the `text-sm mb-3` / `mb-2` className) or
   forgot the import in §9a.

### 9e. Optional — DRY it up

If you don't want to duplicate the wrapper logic across files, see **§10**
below. It is the exact same refactor, but written as a complete copy-paste
recipe for every file so you don't have to figure out the one-liners yourself.

---

## 10. DRY Shortcut — `PiecewiseAwareText` one-liners (RECOMMENDED)

Instead of pasting the bulky IIFE blocks from §1b and §9 into four different
files, do this:

1. Add **one** shared component export to `PiecewiseFunction.tsx`.
2. In the same four files, replace each stem `<MathText>` with a single-line
   `<PiecewiseAwareText>`.

Same behavior, zero duplication, much less code to maintain.

### 10a. Add the export to `src/components/PiecewiseFunction.tsx`

Open the file. The last existing line is the closing brace of
`parsePiecewiseToken` (around line 86). Paste this **after** that function and
**before** the end of the file:

```tsx
export const PiecewiseAwareText = ({
  text,
  tag = 'span',
  className = '',
  enableChemistry = false,
}: {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  enableChemistry?: boolean;
}) => {
  if (!text.includes('[[piecewise')) {
    return <MathText tag={tag} className={className} enableChemistry={enableChemistry}>{text}</MathText>;
  }
  const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
  const Tag = tag as any;
  return (
    <Tag className={className}>
      {segments.map((seg, i) => {
        const parsed = parsePiecewiseToken(seg);
        if (parsed) return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
        return <MathText key={i} enableChemistry={enableChemistry}>{seg}</MathText>;
      })}
    </Tag>
  );
};
```

`MathText` is already imported at the top of this file, so no import change is
needed here.

### 10b. The four files to edit

These are the exact same files from §1b and §9, but each edit is now a
single-line replacement.

#### File 1 — `src/pages/Quiz.tsx`

**Add the import.** Find line 28:

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import { PiecewiseAwareText } from '@/components/PiecewiseFunction';
```

**Replace the main question stem.** Find lines 934–936:

```tsx
              <MathText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed" enableChemistry={subject === 'chemistry'}>
                {currentQuestion.question}
              </MathText>
```

Replace those three lines with:

```tsx
              <PiecewiseAwareText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed" text={currentQuestion.question} enableChemistry={subject === 'chemistry'} />
```

#### File 2 — `src/components/PartsQuestionView.tsx`

**Add the import.** Find line 10:

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import { PiecewiseAwareText } from '@/components/PiecewiseFunction';
```

**Replace the parent question stem.** Find lines 139–141:

```tsx
      <MathText tag="h3" className="text-xl font-semibold mb-4 leading-relaxed" enableChemistry={subject === 'chemistry'}>
        {question.question}
      </MathText>
```

Replace with:

```tsx
      <PiecewiseAwareText tag="h3" className="text-xl font-semibold mb-4 leading-relaxed" text={question.question} enableChemistry={subject === 'chemistry'} />
```

**Replace each part stem.** Find lines 177–179:

```tsx
            <MathText tag="p" className="text-sm mb-3 leading-relaxed" enableChemistry={subject === 'chemistry'}>
              {part.question}
            </MathText>
```

Replace with:

```tsx
            <PiecewiseAwareText tag="p" className="text-sm mb-3 leading-relaxed" text={part.question} enableChemistry={subject === 'chemistry'} />
```

#### File 3 — `src/pages/ViewAllQuestions.tsx`

**Add the import.** Find line 7:

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import { PiecewiseAwareText } from '@/components/PiecewiseFunction';
```

**Replace the main question stem.** Find line 114:

```tsx
              <MathText tag="p" className="text-base mb-4" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>
```

Replace with:

```tsx
              <PiecewiseAwareText tag="p" className="text-base mb-4" text={question.question} enableChemistry={subject === 'chemistry'} />
```

**Replace the parts stem.** Find line 158:

```tsx
                      <MathText className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{part.question}</MathText>
```

Replace with:

```tsx
                      <PiecewiseAwareText className="text-sm mb-3" text={part.question} enableChemistry={subject === 'chemistry'} />
```

#### File 4 — `src/pages/Results.tsx`

**Add the import.** Find line 10:

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import { PiecewiseAwareText } from '@/components/PiecewiseFunction';
```

**Replace the main question stem.** Find line 434:

```tsx
                      <MathText tag="p" className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>
```

Replace with:

```tsx
                      <PiecewiseAwareText tag="p" className="text-sm mb-3" text={question.question} enableChemistry={subject === 'chemistry'} />
```

**Replace the part stem.** Find line 517:

```tsx
                                <MathText tag="p" className="mb-2" enableChemistry={subject === 'chemistry'}>{part.question}</MathText>
```

Replace with:

```tsx
                                <PiecewiseAwareText tag="p" className="mb-2" text={part.question} enableChemistry={subject === 'chemistry'} />
```

### 10c. Why this is simpler

You edited **five** locations total (one export + four one-line replacements)
instead of pasting four separate 15-to-20-line IIFE blocks. If you ever need
to tweak how `[[piecewise]]` is rendered, you change it in **one** place
(`PiecewiseAwareText`) instead of four.

### 10d. Verify

1. Add the export from §10a.
2. Apply the four one-liner replacements from §10b.
3. Open a quiz question that contains `[[piecewise|f(x)|x^2 : x < 0|2x : x >= 0]]`.
4. Check it in Quiz, View All Questions, and Results — it should render as a
   left brace with aligned rows in every location.
5. If you see literal `[[piecewise|...]]` text, the `PiecewiseAwareText`
   import is missing in that file, or the stem `<MathText>` was not replaced.
