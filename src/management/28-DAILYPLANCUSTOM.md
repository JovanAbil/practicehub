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
