# 25 — Calculator Active Badge

How to add a small rounded "Calculator active" pill that shows above any question whose data has `calculator: true`. Drop-in component, no logic changes.

The badge already exists at `src/components/CalculatorBadge.tsx`. This doc tells you exactly **what to paste** and **where**, so you can wire it into more pages (Results, ViewAllQuestions, etc.) or rebuild it from scratch.

---

## 1. Create the badge component

**File:** `src/components/CalculatorBadge.tsx` (create new)

Paste the entire file:

```tsx
import { Calculator } from 'lucide-react';

interface CalculatorBadgeProps {
  active?: boolean;
  className?: string;
}

/**
 * Small rounded pill shown above a question when `calculator: true`.
 * Renders nothing when `active` is false/undefined so it's safe to drop in
 * unconditionally with `<CalculatorBadge active={question.calculator} />`.
 */
const CalculatorBadge = ({ active, className = '' }: CalculatorBadgeProps) => {
  if (!active) return null;
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3 ${className}`}
      aria-label="Calculator allowed for this question"
    >
      <Calculator className="h-3.5 w-3.5" />
      Calculator active
    </div>
  );
};

export default CalculatorBadge;
```

**Why it works:**
- Returns `null` when `active` is falsy → safe to use without wrapping `{question.calculator && ...}`.
- Uses semantic `primary` tokens, so it auto-themes light/dark.
- `rounded-full` + `px-3 py-1` = the small pill look.

---

## 2. Wire it into the standalone quiz (MCQ / FRQ / SATA)

**File:** `src/pages/Quiz.tsx`

### 2a. Add the import

Find this line (around line 28):

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import CalculatorBadge from '@/components/CalculatorBadge';
```

### 2b. Render it above the question stem

Find this block (around line 919, inside the non-parts branch):

```tsx
            <>
              {currentQuestion.table && (
                <QuestionTable data={currentQuestion.table} enableChemistry={subject === 'chemistry'} />
              )}
```

Replace with:

```tsx
            <>
              <CalculatorBadge active={currentQuestion.calculator} />

              {currentQuestion.table && (
                <QuestionTable data={currentQuestion.table} enableChemistry={subject === 'chemistry'} />
              )}
```

Result: the pill appears above table / image / question text whenever the question has `calculator: true`. If the field is missing or false, nothing renders.

---

## 3. Wire it into parts questions

**File:** `src/components/PartsQuestionView.tsx`

### 3a. Add the import

Find (around line 10):

```tsx
import MathText from '@/components/MathText';
```

Replace with:

```tsx
import MathText from '@/components/MathText';
import CalculatorBadge from '@/components/CalculatorBadge';
```

### 3b. Render it above the main stem

Find (around line 123):

```tsx
    <div className="space-y-4">
      {/* Main question stem */}
      {question.table && (
```

Replace with:

```tsx
    <div className="space-y-4">
      {/* Main question stem */}
      <CalculatorBadge active={question.calculator} />

      {question.table && (
```

The badge only shows once for the whole parts question (parts inherit calculator status from the parent).

---

## 4. Optional — add it to Results and ViewAllQuestions

Same recipe in both files.

### `src/pages/Results.tsx`

1. Near the top imports add:
   ```tsx
   import CalculatorBadge from '@/components/CalculatorBadge';
   ```
2. Find the main question stem render (the `<MathText>` for `question.question`, around line 434) and paste **immediately before it**:
   ```tsx
   <CalculatorBadge active={question.calculator} />
   ```

### `src/pages/ViewAllQuestions.tsx`

1. Add the same import.
2. Find the stem render (around line 114) and paste **immediately before it**:
   ```tsx
   <CalculatorBadge active={q.calculator} />
   ```
   (Use whatever the local variable is — `q`, `question`, etc.)

---

## 5. How to mark a question as calculator-active

In any question object in `src/data/.../*.ts`:

```ts
{
  id: "polynomial-7",
  type: "multiple-choice",
  question: "Compute $\\sqrt{17.3}$ to two decimal places.",
  options: [/* ... */],
  correctAnswer: "B",
  calculator: true,        // <-- THIS is the only thing needed
}
```

The `calculator` field already exists on every question type (see `src/types/quiz.ts`). No schema change needed.

For **parts questions**, set `calculator: true` on the parent `PartsQuestion`, not on individual parts — the whole question is calculator-active or it isn't.

---

## 6. Verify

1. Open any unit, find or edit a question to set `calculator: true`.
2. Start the quiz → you should see a small blue rounded pill labeled **🖩 Calculator active** above the question text.
3. Move to a normal question → the pill disappears.
4. Repeat for a parts question.
5. Check Results page (after submitting) and ViewAllQuestions if you wired those too.

If the pill never shows:
- Confirm the question file actually has `calculator: true` (not the string `"true"`).
- Confirm the import path is `@/components/CalculatorBadge` (case-sensitive on GitHub Pages).
- Hard-refresh — Vite sometimes caches missing imports.

---

## 7. Customizing the look

All visual choices live in **one className** inside `CalculatorBadge.tsx`. Swap any of these:

| Want                   | Change                                                                 |
| ---------------------- | ---------------------------------------------------------------------- |
| Different color        | Replace `primary` with `destructive`, `accent`, `secondary`, etc.      |
| Square instead of pill | Replace `rounded-full` with `rounded-md`                               |
| Bigger                 | `px-4 py-1.5 text-sm` and `h-4 w-4` on the icon                        |
| Different icon         | Swap `Calculator` for any other `lucide-react` icon                    |
| Different label        | Change the text node `Calculator active`                               |

Because the component is centralized, every page that uses it updates at once.

---

## Last Updated

June 2026
