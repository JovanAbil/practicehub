# 28 — Daily Plan for Custom Units (Editor Practice Area)

This file explains, step by step, how to wire the existing Daily Plan
feature (built for the built-in Course Challenge in file `27`) into the
**Custom Unit Challenge** page — the practice area reached from the
custom editor at `/custom-unit/:unitId`.

The Daily Plan utility (`src/utils/dailyPlan.ts`) and the compact UI
component (`src/components/DailyPlanCard.tsx`) are already generic —
they take a `subject` string (used as the localStorage key) and a
`Question[]` pool. So for custom units we just:

1. Compute a stable per-unit key (`custom-<unitId>`).
2. Build the question pool from the unit's topics.
3. Drop `<DailyPlanCard />` under the Cram Mode button.
4. Make sure `Quiz.tsx` still calls `markDailyPlanCorrect` (it already
   does — this piece is subject-agnostic and needs no change).

Every custom unit gets its own independent plan, its own
"Per day" number, its own unused/used buckets, and its own
export/import file. Nothing else on the site is affected.

---

## Files touched

| # | File | Change |
|---|------|--------|
| 1 | `src/pages/CustomUnitChallenge.tsx` | Add imports, build pool, render `<DailyPlanCard />` |
| 2 | *(nothing else)* | `dailyPlan.ts`, `DailyPlanCard.tsx`, `Quiz.tsx`, `Results.tsx` are already generic |

---

## Step 1 — Imports (around line 1–9)

**REPLACE** the current import block at the very top of
`src/pages/CustomUnitChallenge.tsx`:

```tsx
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, Wrench, Target } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import useCustomUnits from '@/hooks/useCustomUnits';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { buildRouteKey, hasInProgressQuiz } from '@/utils/inProgressQuizStorage';
```

**WITH:**

```tsx
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, Wrench, Target } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import DailyPlanCard from '@/components/DailyPlanCard';
import useCustomUnits from '@/hooks/useCustomUnits';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { buildRouteKey, hasInProgressQuiz } from '@/utils/inProgressQuizStorage';
import type { Question } from '@/types/quiz';
```

Two additions: `useMemo`, the `DailyPlanCard` component, and the
`Question` type.

---

## Step 2 — Build the Daily Plan pool (around line 52)

Right after this existing line:

```tsx
const topicIds = unit.topics.map(t => t.id);
```

**ADD** the following:

```tsx
// Pool for the Daily Plan = every question inside every topic of this
// custom unit. Flattened so DailyPlanCard can round-robin across topics.
const dailyPlanPool = useMemo<Question[]>(
  () => unit.topics.flatMap(t => (t.questions ?? []) as Question[]),
  [unit.topics]
);
```

> If your `CustomTopic` shape stores questions under a different key
> (e.g. `t.items`), swap `t.questions` for that key. Check
> `src/hooks/useCustomUnits.ts` if unsure — the field name is the only
> thing that varies.

---

## Step 3 — Render `<DailyPlanCard />` under Cram Mode (around line 88–98)

Currently the JSX looks like:

```tsx
        <Button
          onClick={() =>
            navigate(`/quiz/${subjectKey}/challenge/cram`, { ... })
          }
          className="w-full"
          size="lg"
          disabled={topicIds.length === 0}
        >
          <Trophy className="mr-2 h-4 w-4" />
          Cram Mode (All Topics)
        </Button>

        {canResumeCram && (
          <Button ...>Resume last Cram Mode</Button>
        )}
```

**INSERT** the Daily card *between* the Cram button and the Resume
button (i.e. new line right after the closing `</Button>` of Cram, and
before the `{canResumeCram && ...}` block):

```tsx
        <DailyPlanCard
          subject={subjectKey}
          allQuestions={dailyPlanPool}
        />
```

That's the entire visible change. Layout matches Course Challenge:
Cram button on top, compact Daily row underneath, Resume below that.

---

## Step 4 — Verify (no code changes needed)

Sanity-check that these existing pieces still hold, so the Daily Plan
loop closes end-to-end:

- **`src/pages/Quiz.tsx`** already reads `dailyPlanKey` from
  `location.state` and calls `markDailyPlanCorrect(dailyPlanKey, id)`
  on any correct submission. `DailyPlanCard` navigates with
  `dailyPlanKey: subject`, and here `subject === "custom-<unitId>"`, so
  the key is unique per custom unit.
- **`src/pages/Results.tsx`** shows the "Daily Plan Progress" download
  card whenever `dailyPlanKey` is present in the navigation state.
  Works for custom units automatically.
- **`src/utils/dailyPlan.ts`** keys everything by
  `daily-plan-${subject}`. `custom-<unitId>` is already the convention
  used for wrong-answer storage on this page, so no collisions.

---

## Behavior recap (per custom unit)

- First visit today → picks `questionsPerDay` (default 15) round-robin
  from that unit's topics.
- Answer correctly → id moves from `unusedIds` → `usedIds`.
- Answer wrong → id stays in `unusedIds` until mastered.
- New calendar day → new draw. If `unusedIds` is empty, everything
  cycles back and `cycleCount` increments.
- Add/remove topics in the custom editor → next mount, `ensureTodayPlan`
  reconciles: new question ids are appended to `unusedIds`, deleted
  ids drop from both buckets.
- Export/Import buttons produce/consume
  `daily-plan-custom-<unitId>.json`.

---

## localStorage keys created

```
daily-plan-custom-<unitId>
```

One key per custom unit. Independent from the built-in course keys
(`daily-plan-biology`, `daily-plan-chemistry`, …).

---

## Rollback

Delete the three additions in Steps 1–3. No migrations, no data loss
elsewhere. Users can also hit the Reset button on the card to wipe just
that unit's plan.

---

## Section 9 — Bug fix: correct answers are not removed from today's plan

### 9.1 Symptom

You answer a question correctly, finish the daily set, come back (same
day or the next day) and **the same question is still in today's list**.
Happens on both the Course Challenge and the Custom Unit Challenge.

### 9.2 Root cause

`markDailyPlanCorrect` *does* work — it moves the id from `unusedIds`
to `usedIds`. But `todayQuestionIds` is a **separate frozen list**, and
`ensureTodayPlan` only touches it when the calendar date changes:

```ts
// src/utils/dailyPlan.ts — current behavior
if (state.todayDate !== today) {          // ← only on a new day
  state.todayQuestionIds = pickRoundRobin(state.unusedIds, state.questionsPerDay);
}
```

Two consequences:

1. **Same day** — mastered ids are never pruned from `todayQuestionIds`,
   so re-entering the plan replays them.
2. **New day** — the list is redrawn *entirely at random*, so yesterday's
   wrong answers are only carried over by luck.

Desired behavior: keep everything you got wrong, drop everything you got
right, and top the list back up to `questionsPerDay` with fresh ids from
the bank.

### 9.3 Fix — replace the redraw block in `src/utils/dailyPlan.ts`

Find this block (around **lines 85–95**, inside `ensureTodayPlan`, right
after the reconcile section and before `saveDailyPlan`):

```ts
  // New day? Redraw.
  const today = todayStr();
  if (state.todayDate !== today) {
    if (state.unusedIds.length === 0 && state.usedIds.length > 0) {
      state.unusedIds = [...state.usedIds];
      state.usedIds = [];
      state.cycleCount += 1;
    }
    state.todayDate = today;
    state.todayQuestionIds = pickRoundRobin(state.unusedIds, state.questionsPerDay);
  }
```

**REPLACE it with:**

```ts
  // --- Carry-over redraw -------------------------------------------------
  // Rule: mastered ids (in usedIds) always leave today's list. Ids still in
  // unusedIds (i.e. you got them wrong or never reached them) STAY. The list
  // is then topped back up to questionsPerDay with fresh ids from the bank.
  const today = todayStr();
  const mastered = new Set(state.usedIds);

  // 1. Drop anything that has been mastered — runs on EVERY mount, not just
  //    on a new day. This is the actual bug fix.
  state.todayQuestionIds = state.todayQuestionIds.filter(id => !mastered.has(id));

  const isNewDay = state.todayDate !== today;

  if (isNewDay) {
    // 2. Whole bank mastered? Start a new cycle.
    if (state.unusedIds.length === 0 && state.usedIds.length > 0) {
      state.unusedIds = [...state.usedIds];
      state.usedIds = [];
      state.cycleCount += 1;
      state.todayQuestionIds = [];
    }
    state.todayDate = today;
  }

  // 3. Top up with new questions (never re-adding what's already listed).
  if (isNewDay || state.todayQuestionIds.length < state.questionsPerDay) {
    const already = new Set(state.todayQuestionIds);
    const pool = state.unusedIds.filter(id => !already.has(id));
    const need = state.questionsPerDay - state.todayQuestionIds.length;
    if (need > 0) state.todayQuestionIds.push(...pickRoundRobin(pool, need));
  }
```

Nothing else in the file changes. `markDailyPlanCorrect`,
`setQuestionsPerDay`, export/import all keep working as-is.

### 9.4 Optional — refresh the card after a session ends

`DailyPlanCard` runs `ensureTodayPlan` in a `useEffect` keyed on
`[subject, allQuestions]`, so returning to the challenge page from
Results already re-runs it and the count updates. If you ever render the
card without a remount, add a focus listener in
`src/components/DailyPlanCard.tsx`, right after the existing `useEffect`
(around **line 32**):

```tsx
  useEffect(() => {
    const refresh = () => {
      if (allQuestions.length) setState(ensureTodayPlan(subject, allQuestions));
    };
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, [subject, allQuestions]);
```

### 9.5 Why this also fixes the custom-unit area

The custom page passes `subject={subjectKey}` where
`subjectKey === "custom-<unitId>"`, and everything above lives in the
shared `dailyPlan.ts`. One edit fixes both surfaces — no change needed in
`CustomUnitChallenge.tsx` or `CourseChallenge.tsx`.

### 9.6 Test checklist

1. Set **Per day = 5**. Start the daily plan.
2. Answer 3 correctly, 2 wrong. Finish.
3. Return to the challenge page → button should read **Daily (2 questions
   today)** and those 2 are the ones you missed.
4. Reopen the plan → the 3 correct ones are gone.
5. Change the system date to tomorrow (or clear `todayDate` in
   `localStorage["daily-plan-<subject>"]`) → the list should be the 2
   missed ones **plus 3 brand-new ids**, total 5.
6. Master everything → on the next new day, `cycleCount` increments and
   the bank refills.

### 9.7 Rollback

Restore the original `// New day? Redraw.` block from 9.3. Existing
`localStorage` state stays compatible either way — no schema change.

---

## 10. Add a **Review** button under the Daily Plan

Goal: a second button, directly beneath the Daily row, that quizzes you on
questions you **already mastered** (`usedIds`). If you miss one during
review, it goes **back into `unusedIds`** so the daily plan picks it up
again. It has its own per-review question count, no export/import/reset
(it derives everything from the daily state), and is **disabled when
`usedIds` is empty**.

### 10.1 `src/utils/dailyPlan.ts` — extend the state + add helpers

**a)** In the `DailyPlanState` interface (around **line 3–10**), add one
optional field after `cycleCount`:

```ts
  cycleCount: number;         // how many full cycles completed
  reviewPerDay?: number;      // how many mastered questions per review run
```

**b)** At the **end of the file** (after `importDailyPlan`, around
**line 138**), append:

```ts
/** How many mastered questions are available to review. */
export const getReviewCount = (subject: string): number =>
  loadDailyPlan(subject)?.usedIds.length ?? 0;

/** Draw a review set from the mastered bucket (round-robin across topics). */
export const drawReviewSet = (subject: string): string[] => {
  const s = loadDailyPlan(subject);
  if (!s || s.usedIds.length === 0) return [];
  const n = Math.max(1, Math.min(200, s.reviewPerDay ?? s.questionsPerDay));
  return pickRoundRobin(s.usedIds, n);
};

export const setReviewPerDay = (subject: string, n: number) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  s.reviewPerDay = Math.max(1, Math.min(200, Math.floor(n)));
  saveDailyPlan(subject, s);
};

/**
 * Called when a review question is answered WRONG.
 * Demotes it: mastered -> unused, so tomorrow's daily plan can serve it.
 */
export const markDailyPlanWrong = (subject: string, questionId: string) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  if (!s.usedIds.includes(questionId)) return;
  s.usedIds = s.usedIds.filter(id => id !== questionId);
  if (!s.unusedIds.includes(questionId)) s.unusedIds.push(questionId);
  saveDailyPlan(subject, s);
};
```

`pickRoundRobin` is already defined above in the same module (around
**line 42**) — no import needed.

### 10.2 `src/components/DailyPlanCard.tsx` — render the Review row

**a)** Line **5**, extend the icon import:

```tsx
import { CalendarDays, Download, Upload, RotateCcw, History } from 'lucide-react';
```

**b)** Lines **7–10**, extend the util import:

```tsx
import {
  ensureTodayPlan, loadDailyPlan, setQuestionsPerDay,
  exportDailyPlan, importDailyPlan, clearDailyPlan, DailyPlanState,
  drawReviewSet, setReviewPerDay,
} from '@/utils/dailyPlan';
```

**c)** After `changePerDay` (around **line 53**), add:

```tsx
  const changeReviewPerDay = (n: number) => {
    setReviewPerDay(subject, n);
    setState(loadDailyPlan(subject));
  };

  const startReview = () => {
    const ids = drawReviewSet(subject);
    if (ids.length === 0) { toast.error('No completed questions to review yet'); return; }
    const byId = new Map(allQuestions.map(q => [q.id, q]));
    const qs = ids.map(id => byId.get(id)).filter(Boolean) as Question[];
    if (qs.length === 0) { toast.error('No completed questions to review yet'); return; }
    navigate(`/quiz/${subject}/daily/review`, {
      state: {
        presetQuestions: qs,
        dailyPlanKey: subject,
        dailyReviewMode: true,
        startNewAttempt: true,
        orderedMode: true,
      },
    });
  };
```

**d)** Replace the closing progress line block (**lines 108–111**) with
the Review row **plus** the progress line:

```tsx
      <div className="w-full flex flex-wrap items-center gap-2">
        <Button
          onClick={startReview}
          variant="outline"
          className="flex-1 min-w-[200px]"
          disabled={state.usedIds.length === 0}
        >
          <History className="mr-2 h-4 w-4" />
          Review ({state.usedIds.length} completed)
        </Button>
        <div className="flex items-center gap-1">
          <label className="text-xs text-muted-foreground whitespace-nowrap">Per review:</label>
          <Input
            type="number" min={1} max={200}
            value={state.reviewPerDay ?? state.questionsPerDay}
            onChange={e => changeReviewPerDay(Number(e.target.value) || 1)}
            className="w-20 h-9"
            disabled={state.usedIds.length === 0}
          />
        </div>
      </div>

      <div className="w-full text-xs text-muted-foreground">
        Mastered {state.usedIds.length}/{totalPool} ({progressPct}%) · Cycles: {state.cycleCount} ·
        Correct answers cycle out; wrong ones stay until mastered. Missed review
        questions return to the daily plan.
      </div>
```

No export / import / reset buttons for review — it reads the same
`localStorage` record the daily plan writes.

### 10.3 `src/pages/Quiz.tsx` — demote missed review questions

**a)** Around **line 59**, next to the existing `dailyPlanKey` memo, add:

```ts
  const dailyReviewMode = useMemo(() => Boolean((location.state as any)?.dailyReviewMode), [location.state]);
```

**b)** Extend the `markDailyPlanCorrect` import (top of file) to:

```ts
import { markDailyPlanCorrect, markDailyPlanWrong } from '@/utils/dailyPlan';
```

**c)** Every place that currently reads (lines **427**, **435**, **448**,
and **876** — the MCQ, SATA, self-graded FRQ and parts paths):

```ts
      if (isCorrect && dailyPlanKey) markDailyPlanCorrect(dailyPlanKey, currentQuestion.id);
```

becomes:

```ts
      if (dailyPlanKey) {
        if (isCorrect) markDailyPlanCorrect(dailyPlanKey, currentQuestion.id);
        else if (dailyReviewMode) markDailyPlanWrong(dailyPlanKey, currentQuestion.id);
      }
```

For the parts path at line **876** the local flag is named `allCorrect`,
so use `allCorrect` in place of `isCorrect` there.

Skips are intentionally left alone — a skipped review question stays
mastered.

### 10.4 Results page

Nothing to change. `dailyPlanKey` is already forwarded (Quiz line
**616**), so the "Download Daily Plan" card still appears and the JSON it
downloads already reflects any demotions from the review run.

### 10.5 Custom units

Nothing to change. `CustomUnitChallenge.tsx` renders the same
`<DailyPlanCard />` with `subject={`custom-${unitId}`}`, so the Review
button appears there automatically.

### 10.6 Test checklist

1. Fresh subject → Review button is **disabled**, label reads
   `Review (0 completed)`.
2. Run a daily plan, get 3 right → back on the page, Review shows
   `Review (3 completed)` and is enabled.
3. Set **Per review = 2** → starting review serves 2 questions.
4. Miss one in review → return to the page: mastered count drops by 1 and
   that id appears in tomorrow's daily draw.
5. Get all review questions right → mastered count is unchanged.
6. Reset the daily plan → Review returns to disabled.

### 10.7 Rollback

Delete the Review row from `DailyPlanCard.tsx`, revert the four Quiz
call-sites to the one-line form, and drop the four new exports from
`dailyPlan.ts`. `reviewPerDay` is optional, so old and new
`localStorage` records remain compatible.

---

## 11. Add a **Units** picker next to the Daily button (only draw from chosen units)

Goal: a small **Units** button that sits in the same row as Daily /
Per day / Download / Upload / Reset. The row already uses
`flex flex-wrap`, so the new button wraps onto the next line on small
screens instead of overflowing. Clicking it opens a checklist of every
unit (topic) in the course. The daily plan **and** the review set then
only draw from checked units.

Rules:

- The selection is saved in a **cookie** per subject:
  `daily-units-<subject>` (e.g. `daily-units-biology`,
  `daily-units-custom-<unitId>`). No cookie = all units selected.
- Unchecked units are **ignored, not deleted**. Their mastered/unused
  progress stays in `localStorage`, so re-checking a unit later picks up
  exactly where you left off.
- You can add a unit **in the middle of a day**. Today's list is
  rebalanced so the new unit gets its fair share right away; misses you
  still owe from selected units are kept first.
- **Download** exports only the selected units' ids. **Upload** only
  merges the selected units' ids from the file and leaves everything
  else in your saved plan alone.
- Works on Course Challenge and Custom Unit Challenge with no page
  changes, because both render the same `<DailyPlanCard />`.

A "unit" here is the id prefix (`ecology-3` -> `ecology`), the same
grouping `pickRoundRobin` already uses.

### Files touched

| # | File | Change |
|---|------|--------|
| 1 | `src/utils/dailyUnitsCookie.ts` | **New** — read/write the cookie |
| 2 | `src/utils/dailyPlan.ts` | Export `topicOf`, add `allowed` filter to draw/export/import/review, add `applyTopicFilter` |
| 3 | `src/components/DailyPlanCard.tsx` | Units popover button, pass the filter everywhere |
| 4 | *(nothing else)* | `Quiz.tsx`, `Results.tsx`, the challenge pages need no change |

---

### 11.1 New file `src/utils/dailyUnitsCookie.ts`

**CREATE** the file with:

```ts
// Stores which units (topic prefixes) the Daily Plan may draw from.
// Saved as a cookie per subject. null = "all units" (no filter).
const name = (subject: string) => `daily-units-${subject}`;
const ONE_YEAR = 60 * 60 * 24 * 365;

export const loadDailyUnits = (subject: string): string[] | null => {
  const match = document.cookie
    .split('; ')
    .find(c => c.startsWith(`${encodeURIComponent(name(subject))}=`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')));
    return Array.isArray(parsed) ? parsed : null;
  } catch { return null; }
};

export const saveDailyUnits = (subject: string, units: string[] | null) => {
  const n = encodeURIComponent(name(subject));
  if (units === null) {
    document.cookie = `${n}=; max-age=0; path=/; SameSite=Lax`;
    return;
  }
  const v = encodeURIComponent(JSON.stringify(units));
  document.cookie = `${n}=${v}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
};
```

> `path=/` works on GitHub Pages under `/practicehub/` too. Cookies cap
> at ~4 KB; a list of topic names is far below that.

---

### 11.2 `src/utils/dailyPlan.ts`

**a) Export the topic helper.** Find `groupByTopic` (around **line 31**)
and put this **directly above** it:

```ts
/** "ecology-3" -> "ecology". Shared by the Units picker. */
export const topicOf = (id: string) => id.split('-').slice(0, -1).join('-') || id;

/** Filter type: null / undefined = every unit allowed. */
export type AllowedTopics = Set<string> | null | undefined;
const isAllowed = (id: string, allowed: AllowedTopics) =>
  !allowed || allowed.has(topicOf(id));
```

Then inside `groupByTopic`, **REPLACE**:

```ts
    const topic = id.split('-').slice(0, -1).join('-') || id;
```

**WITH:**

```ts
    const topic = topicOf(id);
```

**b) Give `ensureTodayPlan` a filter.** Change its signature
(around **line 57**) from:

```ts
export const ensureTodayPlan = (
  subject: string,
  allQuestions: Question[],
  questionsPerDay?: number,
): DailyPlanState => {
```

**TO:**

```ts
export const ensureTodayPlan = (
  subject: string,
  allQuestions: Question[],
  questionsPerDay?: number,
  allowed?: AllowedTopics,
): DailyPlanState => {
```

Keep the reconcile block as-is — it must still use the **full**
`allQuestions`, otherwise unchecked units would lose their progress.

Now in the Section 9 carry-over block, make three edits:

1. Step 1 filter line — **REPLACE**:
   ```ts
   state.todayQuestionIds = state.todayQuestionIds.filter(id => !mastered.has(id));
   ```
   **WITH:**
   ```ts
   state.todayQuestionIds = state.todayQuestionIds.filter(
     id => !mastered.has(id) && isAllowed(id, allowed)
   );
   ```

2. Step 2 "whole bank mastered" check — the cycle should only restart
   when the **selected** units are all mastered. **REPLACE**:
   ```ts
   if (state.unusedIds.length === 0 && state.usedIds.length > 0) {
     state.unusedIds = [...state.usedIds];
     state.usedIds = [];
   ```
   **WITH:**
   ```ts
   const unusedAllowed = state.unusedIds.filter(id => isAllowed(id, allowed));
   const usedAllowed = state.usedIds.filter(id => isAllowed(id, allowed));
   if (unusedAllowed.length === 0 && usedAllowed.length > 0) {
     // Recycle only the selected units; unselected progress is untouched.
     state.unusedIds.push(...usedAllowed);
     state.usedIds = state.usedIds.filter(id => !isAllowed(id, allowed));
   ```
   (the `cycleCount += 1` and `todayQuestionIds = []` lines below stay.)

3. Step 3 top-up pool — **REPLACE**:
   ```ts
   const pool = state.unusedIds.filter(id => !already.has(id));
   ```
   **WITH:**
   ```ts
   const pool = state.unusedIds.filter(id => !already.has(id) && isAllowed(id, allowed));
   ```

**c) Same filter for Per day.** In `setQuestionsPerDay` change the
signature and pool line:

```ts
export const setQuestionsPerDay = (subject: string, n: number, allowed?: AllowedTopics) => {
```

```ts
  const pool = s.unusedIds.filter(id => !already.has(id) && isAllowed(id, allowed));
```

**d) New function — rebalance when the selection changes.** Append at
the **end of the file**:

```ts
/**
 * Called when the user checks/unchecks units mid-day.
 * - Drops today's ids from units that are now unchecked.
 * - Trims each remaining unit to a fair share so newly checked units
 *   get room immediately (misses are kept first because they are
 *   already at the front of the list).
 * - Tops up round-robin from the selected units.
 */
export const applyTopicFilter = (subject: string, allowed: AllowedTopics) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  const topics = new Set(
    s.unusedIds.filter(id => isAllowed(id, allowed)).map(topicOf)
  );
  const share = Math.max(1, Math.ceil(s.questionsPerDay / Math.max(1, topics.size)));
  const perTopic: Record<string, number> = {};
  s.todayQuestionIds = s.todayQuestionIds.filter(id => {
    if (!isAllowed(id, allowed)) return false;
    const t = topicOf(id);
    perTopic[t] = (perTopic[t] ?? 0) + 1;
    return perTopic[t] <= share;
  });
  const already = new Set(s.todayQuestionIds);
  const pool = s.unusedIds.filter(id => !already.has(id) && isAllowed(id, allowed));
  const need = s.questionsPerDay - s.todayQuestionIds.length;
  if (need > 0) s.todayQuestionIds.push(...pickRoundRobin(pool, need));
  saveDailyPlan(subject, s);
};
```

**e) Filtered export.** **REPLACE** `exportDailyPlan` with:

```ts
export const exportDailyPlan = (subject: string, allowed?: AllowedTopics): string => {
  const s = loadDailyPlan(subject);
  if (!s) return '{}';
  const keep = (ids: string[]) => ids.filter(id => isAllowed(id, allowed));
  return JSON.stringify({
    ...s,
    unusedIds: keep(s.unusedIds),
    usedIds: keep(s.usedIds),
    todayQuestionIds: keep(s.todayQuestionIds),
  }, null, 2);
};
```

**f) Filtered import (merge, don't overwrite).** **REPLACE**
`importDailyPlan` with:

```ts
export const importDailyPlan = (
  subject: string, json: string, allowed?: AllowedTopics,
): boolean => {
  try {
    const parsed = JSON.parse(json) as DailyPlanState;
    if (!parsed || !Array.isArray(parsed.unusedIds)) return false;
    const current = loadDailyPlan(subject);
    if (!current || !allowed) { saveDailyPlan(subject, parsed); return true; }

    // Only touch selected units; leave everything else as it was.
    const inSel = (id: string) => isAllowed(id, allowed);
    const outSel = (id: string) => !isAllowed(id, allowed);
    current.unusedIds = [
      ...current.unusedIds.filter(outSel),
      ...parsed.unusedIds.filter(inSel),
    ];
    current.usedIds = [
      ...current.usedIds.filter(outSel),
      ...(parsed.usedIds ?? []).filter(inSel),
    ];
    current.todayQuestionIds = (parsed.todayQuestionIds ?? []).filter(inSel);
    current.questionsPerDay = parsed.questionsPerDay ?? current.questionsPerDay;
    saveDailyPlan(subject, current);
    return true;
  } catch { return false; }
};
```

Any selected-unit id that exists in the course but is missing from the
file gets re-added to `unusedIds` automatically by the reconcile step
the next time `ensureTodayPlan` runs.

**g) Filtered review (from Section 10).** **REPLACE** `drawReviewSet`
with:

```ts
export const drawReviewSet = (subject: string, allowed?: AllowedTopics): string[] => {
  const s = loadDailyPlan(subject);
  if (!s) return [];
  const pool = s.usedIds.filter(id => isAllowed(id, allowed));
  if (pool.length === 0) return [];
  const n = Math.max(1, Math.min(200, s.reviewPerDay ?? s.questionsPerDay));
  return pickRoundRobin(pool, n);
};
```

`markDailyPlanCorrect` / `markDailyPlanWrong` stay unchanged — they work
on a single id and never care about the filter.

---

### 11.3 `src/components/DailyPlanCard.tsx`

**a) Imports (lines 1–11).** **REPLACE** the import block with:

```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays, Download, Upload, RotateCcw, History, Layers } from 'lucide-react';
import { Question } from '@/types/quiz';
import {
  ensureTodayPlan, loadDailyPlan, setQuestionsPerDay,
  exportDailyPlan, importDailyPlan, clearDailyPlan, DailyPlanState,
  drawReviewSet, setReviewPerDay, topicOf, applyTopicFilter,
} from '@/utils/dailyPlan';
import { loadDailyUnits, saveDailyUnits } from '@/utils/dailyUnitsCookie';
import { toast } from 'sonner';
```

(`checkbox.tsx` and `popover.tsx` already exist in `src/components/ui/`.)

**b) Optional nicer labels.** Extend `Props` (around **line 13**):

```tsx
interface Props {
  subject: string;
  allQuestions: Question[];
  /** Optional: map topic prefix -> display name, e.g. { ecology: 'Ecology' } */
  topicLabels?: Record<string, string>;
}
```

and the signature:

```tsx
const DailyPlanCard = ({ subject, allQuestions, topicLabels }: Props) => {
```

Without `topicLabels` the prefix is shown (`ecology`, `cellgrowth`, …).

**c) Selection state.** Right after
`const [state, setState] = useState<DailyPlanState | null>(null);`
(around **line 27**) **ADD**:

```tsx
  // Every unit present in this course, in first-seen order.
  const allTopics = useMemo(() => {
    const seen: string[] = [];
    allQuestions.forEach(q => {
      const t = topicOf(q.id);
      if (!seen.includes(t)) seen.push(t);
    });
    return seen;
  }, [allQuestions]);

  // null = all units. Loaded from the cookie once per subject.
  const [selected, setSelected] = useState<string[] | null>(() => loadDailyUnits(subject));
  useEffect(() => { setSelected(loadDailyUnits(subject)); }, [subject]);

  // Drop cookie entries for units that no longer exist.
  const allowed = useMemo(() => {
    if (!selected) return null;
    const live = selected.filter(t => allTopics.includes(t));
    return live.length === allTopics.length ? null : new Set(live);
  }, [selected, allTopics]);
```

**d) Pass the filter to the mount effect.** **REPLACE** the existing
`useEffect` (lines **29–32**) with:

```tsx
  useEffect(() => {
    if (allQuestions.length === 0) return;
    setState(ensureTodayPlan(subject, allQuestions, undefined, allowed));
  }, [subject, allQuestions, allowed]);
```

(If you added the Section 9.4 focus listener, pass `undefined, allowed`
there too and add `allowed` to its deps.)

**e) Toggle handler.** After `changePerDay` **ADD**:

```tsx
  const updateUnits = (next: string[]) => {
    if (next.length === 0) { toast.error('Pick at least one unit'); return; }
    const value = next.length === allTopics.length ? null : next;
    saveDailyUnits(subject, value);
    setSelected(value);
    applyTopicFilter(subject, value ? new Set(value) : null);
    setState(loadDailyPlan(subject));
  };

  const current = selected ?? allTopics;
  const toggleUnit = (t: string) =>
    updateUnits(current.includes(t) ? current.filter(x => x !== t) : [...current, t]);
```

**f) Thread `allowed` into the existing calls.** Make these one-word
edits:

| Where | Before | After |
|---|---|---|
| `changePerDay` | `setQuestionsPerDay(subject, n)` | `setQuestionsPerDay(subject, n, allowed)` |
| `doExport` | `exportDailyPlan(subject)` | `exportDailyPlan(subject, allowed)` |
| `doImport` | `importDailyPlan(subject, await f.text())` | `importDailyPlan(subject, await f.text(), allowed)` |
| `doImport` / `doReset` | `ensureTodayPlan(subject, allQuestions)` | `ensureTodayPlan(subject, allQuestions, undefined, allowed)` |
| `startReview` | `drawReviewSet(subject)` | `drawReviewSet(subject, allowed)` |

Reset still wipes the whole plan (all units) — that's intentional; it's
the "start over" button.

**g) Scope the counters to the selection.** **REPLACE** the
`totalPool` / `progressPct` lines (around **line 77**) with:

```tsx
  const inSel = (id: string) => !allowed || allowed.has(topicOf(id));
  const usedSel = state.usedIds.filter(inSel).length;
  const totalPool = state.unusedIds.filter(inSel).length + usedSel;
  const progressPct = totalPool ? Math.round((usedSel / totalPool) * 100) : 0;
```

and in the Review button from Section 10 swap `state.usedIds.length`
for `usedSel` (label, both `disabled` checks, and the progress line), so
the Review count only shows mastered questions from selected units.

**h) Render the Units button.** In the JSX, **directly after** the
closing `</div>` of the "Per day" block and **before** the Download
button, **INSERT**:

```tsx
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 shrink-0" title="Choose units for the daily plan">
            <Layers className="mr-1 h-4 w-4" />
            Units ({current.length}/{allTopics.length})
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Daily units</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs"
                onClick={() => updateUnits(allTopics)}>All</Button>
            </div>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {allTopics.map(t => (
              <label key={t} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox checked={current.includes(t)} onCheckedChange={() => toggleUnit(t)} />
                <span className="truncate">{topicLabels?.[t] ?? t}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Unchecked units are skipped but keep their progress.
          </p>
        </PopoverContent>
      </Popover>
```

There's no "None" button on purpose — at least one unit must stay
checked (the handler blocks empty selections).

**Why it doesn't overflow:** the outer wrapper is already
`flex flex-wrap items-center gap-2`, the Daily button has
`flex-1 min-w-[200px]`, and the new button is `shrink-0`. On narrow
screens the Units / Per day / icon group drops to its own line instead
of pushing off-screen. The popover list scrolls after ~8 units
(`max-h-64 overflow-y-auto`).

---

### 11.4 Optional — show real unit names

Course Challenge: pass the names you already have on that page, e.g.

```tsx
<DailyPlanCard
  subject={subject}
  allQuestions={allQuestions}
  topicLabels={Object.fromEntries(topics.map(t => [t.id, t.name]))}
/>
```

Custom Unit Challenge (`CustomUnitChallenge.tsx`):

```tsx
<DailyPlanCard
  subject={subjectKey}
  allQuestions={dailyPlanPool}
  topicLabels={Object.fromEntries(unit.topics.map(t => [t.id, t.name]))}
/>
```

This only works if question ids start with the topic id
(`{topic}-#`, the project rule). If a label is missing, the prefix is
shown instead — nothing breaks.

---

### 11.5 Behavior recap

| Action | Result |
|---|---|
| First visit, no cookie | All units checked; behaves exactly like before |
| Uncheck "Ecology" | Ecology ids leave today's list; list tops back up from the other units; Ecology progress kept |
| Check "Genetics" mid-day | Other units trimmed to a fair share, Genetics questions added right away |
| Answer right / wrong | Unchanged (Sections 9–10) |
| All selected units mastered | New cycle for **selected units only**; unchecked units untouched |
| Download | JSON with only selected units' ids |
| Upload | Replaces selected units' ids from the file; unselected units keep their saved state |
| Review | Only mastered questions from selected units |
| Reset | Clears the whole plan (all units); cookie selection kept |

### 11.6 Storage created

```
Cookie:        daily-units-<subject>      e.g. ["ecology","genetics"]
localStorage:  daily-plan-<subject>       (unchanged format)
```

### 11.7 Test checklist

1. Open Course Challenge → button reads **Units (8/8)** (or your count).
2. Shrink the window to phone width → Units + icons wrap under the
   Daily button, nothing scrolls sideways.
3. Uncheck all but one unit → Daily list only has that unit's ids;
   reload the page → selection is still there (cookie).
4. Start the daily, answer a few, go back, check a second unit → the new
   unit appears in today's list immediately.
5. Try to uncheck the last unit → toast "Pick at least one unit".
6. Download → JSON only has ids from checked units.
7. Check a different unit set, upload that file → the checked units
   update; re-check everything and confirm the other units' mastered
   counts didn't change.
8. Custom unit page → same button, separate cookie
   (`daily-units-custom-<unitId>`).

### 11.8 Rollback

Delete `dailyUnitsCookie.ts`, remove the Units popover and the
`allowed` arguments from `DailyPlanCard.tsx`, and drop the `allowed`
params / `applyTopicFilter` from `dailyPlan.ts`. All new params are
optional, so old saved plans keep working. Clear the
`daily-units-*` cookies if you want a clean slate.
