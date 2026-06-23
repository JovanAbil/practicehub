# 26 — Preserve `calculator` Boolean on Imported Custom Files

## The Bug

When a user imports a custom topic `.ts` file (via the custom units importer in `src/utils/customUnitsExport.ts → parseTopicFile`), the `calculator: true` field was **silently dropped** for every question type except `parts`. The MCQ, FRQ, and SATA branches built the `Question` object without ever reading `calculator`, so every imported question defaulted to "no calculator" — even when the source file explicitly said `calculator: true`.

Why it happened: the exporter writes `calculator: true` only when truthy (so `false` / missing never appears in the file). The parser had a calculator check only inside the `parts` branch; the other three branches never copied it over.

## The Fix

Add the **same** calculator check that already existed in the `parts` branch to the MCQ, FRQ, and SATA branches. Only set `q.calculator = true` when the source string actually contained `calculator: true` — that way `false` / omitted stays omitted, matching the "if false it won't even have the boolean" requirement.

---

## What to Replace

**File:** `src/utils/customUnitsExport.ts`

### Free-response branch (~line 767)

**Find:**

```ts
              if (image) q.image = image;
              if (listAnswers && listAnswers.length > 0) q.listAnswers = listAnswers;
              questions.push(q);
            } else if (correctAnswer && type === 'multiple-choice') {
```

**Replace with:**

```ts
              if (image) q.image = image;
              if (listAnswers && listAnswers.length > 0) q.listAnswers = listAnswers;
              if (extractStringField(questionStr, 'calculator') === 'true' || questionStr.includes('calculator: true')) {
                q.calculator = true;
              }
              questions.push(q);
            } else if (correctAnswer && type === 'multiple-choice') {
```

### Multiple-choice branch (~line 780)

**Find:**

```ts
              if (image) q.image = image;
              questions.push(q);
            } else if (type === 'select-all') {
```

**Replace with:**

```ts
              if (image) q.image = image;
              if (extractStringField(questionStr, 'calculator') === 'true' || questionStr.includes('calculator: true')) {
                q.calculator = true;
              }
              questions.push(q);
            } else if (type === 'select-all') {
```

### Select-all branch (end of `parseTopicFile`, ~line 807)

**Find:**

```ts
              if (image) q.image = image;
              questions.push(q);
            }
          }
          
          start = -1;
```

**Replace with:**

```ts
              if (image) q.image = image;
              if (extractStringField(questionStr, 'calculator') === 'true' || questionStr.includes('calculator: true')) {
                q.calculator = true;
              }
              questions.push(q);
            }
          }
          
          start = -1;
```

> The `parts` branch already had this check (~line 738) — leave it alone.

---

## Why This Is the Right Shape

- **Truthy-only write.** We set `q.calculator = true` only when the literal `calculator: true` appears in the source. We never write `q.calculator = false`, so an unmarked question stays without the boolean entirely (matches the exporter, matches `CalculatorBadge` falsy-check).
- **Matches the exporter.** `customUnitsExport.ts` lines 78-80 and 226-228 only write `calculator: true` when truthy. Round-trip is now lossless.
- **No schema change.** `calculator?: boolean` was already optional on every `Question` type in `src/types/quiz.ts`.
- **Doesn't affect the in-app builder.** `CustomTopicEditor.tsx` uses an in-memory model that already preserves calculator via `calculator: q.calculator || false`. The bug was only in the **file import** path.

---

## Verify

1. In any custom topic, mark a question as calculator-active (toggle in the editor).
2. Export the topic → confirm the resulting `.ts` file contains `calculator: true,` on that question.
3. Delete the topic, then re-import the same `.ts` file.
4. Open the imported question in Quiz / Results / ViewAllQuestions — the **Calculator active** pill (from doc 25) should appear.
5. Repeat for an MCQ, FRQ, SATA, and parts question to confirm all four branches preserve the flag.

If the pill still doesn't appear after import:
- Open DevTools → Application → Local Storage → `custom-units-data` → find the question and confirm it has `"calculator": true`.
- If missing, the import path didn't pick it up — re-check that all three replacements above were saved (Vite HMR sometimes skips util files; hard-refresh).

---

## Last Updated

June 2026
