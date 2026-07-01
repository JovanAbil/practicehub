# 27 — Daily Plan on Course Challenge

Applied and live. This doc is the exact copy-paste recipe if you ever need to redo it, plus a plain description of what the feature does.

---

## What it does

A "Daily Plan" card on every Course Challenge page (`/course-challenge/{subject}`).

- Draws **N questions per day** (default `15`, editable) across every topic round-robin.
- Two buckets in `localStorage`: `unusedIds` and `usedIds`. A question moves to `usedIds` **only when answered correctly**.
- Wrong / skipped → stays in `unusedIds`, can come back tomorrow.
- Empty `unusedIds` → cycle everything back, `cycleCount++`.
- New `.ts` import? Its ids append to `unusedIds` automatically (reconciliation).
- Removed unit? Its ids are pruned automatically.
- Export / Import the whole plan as a `.json` file — no accounts needed.

The Daily Plan reuses the existing Quiz page. Correct answers are recorded by passing `dailyPlanKey` through `location.state`.

---

## Exactly what was changed (files & lines)

### 1. NEW — `src/utils/dailyPlan.ts`

Pure `localStorage` helpers: `ensureTodayPlan`, `markDailyPlanCorrect`, `setQuestionsPerDay`, `exportDailyPlan`, `importDailyPlan`, `clearDailyPlan`. Round-robin picker groups ids by their topic prefix (`ecology-3` → `ecology`).

### 2. NEW — `src/components/DailyPlanCard.tsx`

The card UI. Renders stats, "per day" input, and buttons: Start Today's Plan, Export, Import, Reset.

Start navigates to `/quiz/{subject}/daily/plan` with:
```ts
state: {
  presetQuestions: todays,        // Quiz already handles this branch
  dailyPlanKey: subject,          // Quiz reads this to record correct answers
  startNewAttempt: true,
  orderedMode: true,
}
```
> Uses `presetQuestions` (not a new `importedQuestions` field) because Quiz already has a working code path for `presetQuestions` at Quiz.tsx L131.

### 3. EDITED — `src/pages/CourseChallenge.tsx`

- **L1** — added `useMemo` to the React import.
- **L9** — added `questionMap` to the questionLoader import.
- **L14** — added `import DailyPlanCard from '@/components/DailyPlanCard';`.
- **After L36** (`const units = getUnits();`) — added:
  ```tsx
  // Pool for Daily Plan
  const dailyPlanPool = useMemo(() => {
    const builtIn = units.flatMap(u => questionMap[`${subject}-${u.id}`] ?? []);
    const imported = importedSets.flatMap(s => s.questions);
    return [...builtIn, ...imported];
  }, [units, importedSets, subject]);
  ```
- **Above the `{/* Import Custom Questions Box */}` comment** (L182) — added:
  ```tsx
  <DailyPlanCard subject={subject || ''} allQuestions={dailyPlanPool} />
  ```

### 4. EDITED — `src/pages/Quiz.tsx`

- **L29** — added:
  ```ts
  import { resolveImagePath } from '@/utils/resolveImagePath';
  import { markDailyPlanCorrect } from '@/utils/dailyPlan';
  ```
- **L57** — added `dailyPlanKey`:
  ```ts
  const dailyPlanKey = useMemo(
    () => (location.state as any)?.dailyPlanKey as string | undefined,
    [location.state]
  );
  ```
- **`handleSubmit` (~L419-436)** — after `setIsSubmitted(true)` in the MCQ and select-all branches:
  ```ts
  if (isCorrect && dailyPlanKey) markDailyPlanCorrect(dailyPlanKey, currentQuestion.id);
  ```
- **`handleSelfGrade` (~L441)** — same line inside, so FRQs count when the user self-grades correct.
- **Parts completion (~L874)** — inside the `if (allComplete)` block, after `newAttempts[currentIndex].isCorrect = allCorrect;`:
  ```ts
  if (allCorrect && dailyPlanKey) markDailyPlanCorrect(dailyPlanKey, currentQuestion.id);
  ```

That's the full patch. Nothing else in Quiz needs to know Daily Plan exists — the `presetQuestions` branch already handles the question pool and shuffling.

---

## How to redo from scratch (if a merge blows it away)

1. Create the two new files verbatim (`dailyPlan.ts`, `DailyPlanCard.tsx`) — contents in the previous revisions of this doc / current `src/`.
2. Apply the 5 edits to `CourseChallenge.tsx` and the 5 edits to `Quiz.tsx` above.
3. Ship. No route changes needed — `/quiz/:subject/:unitId/:quizType` already covers `/quiz/{subject}/daily/plan`.

---

## Data shape (for import/export)

`localStorage['daily-plan-{subject}']`:
```json
{
  "questionsPerDay": 15,
  "unusedIds": ["ecology-1","ecology-2","genetics-1", "..."],
  "usedIds": ["ecology-3"],
  "todayDate": "2026-07-01",
  "todayQuestionIds": ["ecology-1","genetics-1", "..."],
  "cycleCount": 0
}
```
Export downloads that JSON. Import loads it back. Portable across devices — same "files not accounts" model the rest of the app uses.

---

## Behaviour cheat-sheet

| Action | Effect |
|---|---|
| First visit today | Draws `questionsPerDay` ids round-robin from `unusedIds`. |
| Answer correctly | Id moves `unused → used`. |
| Wrong / skip | Stays in `unused`, eligible for future days. |
| Change "Per day" | Redraws today up/down without wiping progress. |
| Empty `unused` on a new day | Cycle: `used → unused`, `cycleCount++`. |
| Import a new `.ts` topic | New ids auto-append to `unused`. |
| Remove an imported topic | Its ids are pruned from both buckets. |
| Reset | Clears the whole plan for this subject. |
