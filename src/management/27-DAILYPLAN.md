# 27 — Daily Plan on Course Challenge

## What This Adds

A "Daily Plan" panel on the Course Challenge page. Given the full pool of questions for a subject (built-in units + imported `.ts` sets), it:

- Picks **N questions per day** (default `15`, user-editable per subject).
- Draws **round-robin across topics** so every topic appears each day.
- Keeps an **unused** and **used** bucket. A question moves to **used** only when the user **answers it correctly**.
- When **unused is empty**, it cycles: all questions move back into **unused** and drawing resumes.
- Persists everything in `localStorage` per subject — no account, no backend.
- Exports / imports the whole plan as a `.json` file (portable, same "imports and exports" model the app already uses).

The Daily Plan reuses the existing Quiz page. Correct answers are recorded via a `dailyPlanKey` that Quiz reads from `location.state`.

---

## Files to Create

1. `src/utils/dailyPlan.ts` — pure storage + selection helpers.
2. `src/components/DailyPlanCard.tsx` — UI card on CourseChallenge.

## Files to Edit

3. `src/pages/CourseChallenge.tsx` — render `<DailyPlanCard />` and pass the question pool.
4. `src/pages/Quiz.tsx` — on correct answer, call `markDailyPlanCorrect(key, questionId)`.

---

## 1) New file: `src/utils/dailyPlan.ts`

**Create** this file with the exact contents below.

```ts
import { Question } from '@/types/quiz';

export interface DailyPlanState {
  questionsPerDay: number;
  unusedIds: string[];
  usedIds: string[];
  todayDate: string;          // YYYY-MM-DD
  todayQuestionIds: string[]; // ids drawn for today
  cycleCount: number;         // how many full cycles completed
}

const DEFAULT_PER_DAY = 15;
const key = (subject: string) => `daily-plan-${subject}`;
const todayStr = () => new Date().toISOString().slice(0, 10);

export const loadDailyPlan = (subject: string): DailyPlanState | null => {
  try {
    const raw = localStorage.getItem(key(subject));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export const saveDailyPlan = (subject: string, s: DailyPlanState) => {
  localStorage.setItem(key(subject), JSON.stringify(s));
};

export const clearDailyPlan = (subject: string) => {
  localStorage.removeItem(key(subject));
};

/** Group question ids by their topic prefix (id looks like "ecology-3"). */
const groupByTopic = (ids: string[]): Record<string, string[]> => {
  const g: Record<string, string[]> = {};
  ids.forEach(id => {
    const topic = id.split('-').slice(0, -1).join('-') || id;
    (g[topic] ||= []).push(id);
  });
  return g;
};

/** Round-robin pick across topics, shuffled within each topic. */
const pickRoundRobin = (unused: string[], n: number): string[] => {
  const groups = groupByTopic(unused);
  Object.values(groups).forEach(arr => arr.sort(() => Math.random() - 0.5));
  const topics = Object.keys(groups).sort(() => Math.random() - 0.5);
  const picked: string[] = [];
  let i = 0;
  while (picked.length < n && topics.some(t => groups[t].length)) {
    const t = topics[i % topics.length];
    if (groups[t].length) picked.push(groups[t].shift()!);
    i++;
  }
  return picked;
};

/** Initialize or refresh today's plan. Call every time CourseChallenge mounts. */
export const ensureTodayPlan = (
  subject: string,
  allQuestions: Question[],
  questionsPerDay?: number,
): DailyPlanState => {
  const allIds = allQuestions.map(q => q.id);
  let state = loadDailyPlan(subject);

  if (!state) {
    state = {
      questionsPerDay: questionsPerDay ?? DEFAULT_PER_DAY,
      unusedIds: [...allIds],
      usedIds: [],
      todayDate: '',
      todayQuestionIds: [],
      cycleCount: 0,
    };
  }

  // Reconcile with current pool (new imports add ids; removed ids drop out)
  const known = new Set([...state.unusedIds, ...state.usedIds]);
  const newIds = allIds.filter(id => !known.has(id));
  if (newIds.length) state.unusedIds.push(...newIds);
  const alive = new Set(allIds);
  state.unusedIds = state.unusedIds.filter(id => alive.has(id));
  state.usedIds = state.usedIds.filter(id => alive.has(id));

  // New day? Redraw.
  const today = todayStr();
  if (state.todayDate !== today) {
    // Cycle if unused is empty
    if (state.unusedIds.length === 0 && state.usedIds.length > 0) {
      state.unusedIds = [...state.usedIds];
      state.usedIds = [];
      state.cycleCount += 1;
    }
    state.todayDate = today;
    state.todayQuestionIds = pickRoundRobin(state.unusedIds, state.questionsPerDay);
  }

  saveDailyPlan(subject, state);
  return state;
};

/** Called by Quiz when a question is answered correctly. */
export const markDailyPlanCorrect = (subject: string, questionId: string) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  if (!s.unusedIds.includes(questionId)) return;
  s.unusedIds = s.unusedIds.filter(id => id !== questionId);
  if (!s.usedIds.includes(questionId)) s.usedIds.push(questionId);
  saveDailyPlan(subject, s);
};

export const setQuestionsPerDay = (subject: string, n: number) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  s.questionsPerDay = Math.max(1, Math.min(200, Math.floor(n)));
  // Re-draw today with the new count from the current unused pool
  const already = new Set(s.todayQuestionIds);
  const pool = s.unusedIds.filter(id => !already.has(id));
  if (s.todayQuestionIds.length < s.questionsPerDay) {
    const extra = pickRoundRobin(pool, s.questionsPerDay - s.todayQuestionIds.length);
    s.todayQuestionIds.push(...extra);
  } else {
    s.todayQuestionIds = s.todayQuestionIds.slice(0, s.questionsPerDay);
  }
  saveDailyPlan(subject, s);
};

export const exportDailyPlan = (subject: string): string => {
  const s = loadDailyPlan(subject);
  return JSON.stringify(s ?? {}, null, 2);
};

export const importDailyPlan = (subject: string, json: string): boolean => {
  try {
    const parsed = JSON.parse(json) as DailyPlanState;
    if (!parsed || !Array.isArray(parsed.unusedIds)) return false;
    saveDailyPlan(subject, parsed);
    return true;
  } catch { return false; }
};
```

---

## 2) New file: `src/components/DailyPlanCard.tsx`

**Create** this file with the exact contents below.

```tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Download, Upload, RotateCcw, Play } from 'lucide-react';
import { Question } from '@/types/quiz';
import {
  ensureTodayPlan, loadDailyPlan, setQuestionsPerDay,
  exportDailyPlan, importDailyPlan, clearDailyPlan, DailyPlanState,
} from '@/utils/dailyPlan';
import { toast } from 'sonner';

interface Props {
  subject: string;
  allQuestions: Question[];
}

const DailyPlanCard = ({ subject, allQuestions }: Props) => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<DailyPlanState | null>(null);

  useEffect(() => {
    if (allQuestions.length === 0) return;
    setState(ensureTodayPlan(subject, allQuestions));
  }, [subject, allQuestions]);

  if (!state) return null;

  const totalPool = state.unusedIds.length + state.usedIds.length;
  const progressPct = totalPool ? Math.round((state.usedIds.length / totalPool) * 100) : 0;

  const startToday = () => {
    const byId = new Map(allQuestions.map(q => [q.id, q]));
    const todays = state.todayQuestionIds.map(id => byId.get(id)).filter(Boolean) as Question[];
    if (todays.length === 0) { toast.error('No questions in today\u2019s plan'); return; }
    navigate(`/quiz/${subject}/daily/plan`, {
      state: {
        importedQuestions: todays,
        dailyPlanKey: subject,
        startNewAttempt: true,
      },
    });
  };

  const changePerDay = (n: number) => {
    setQuestionsPerDay(subject, n);
    setState(loadDailyPlan(subject));
  };

  const doExport = () => {
    const blob = new Blob([exportDailyPlan(subject)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `daily-plan-${subject}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const doImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const ok = importDailyPlan(subject, await f.text());
    if (ok) { setState(ensureTodayPlan(subject, allQuestions)); toast.success('Plan imported'); }
    else toast.error('Invalid plan file');
    if (fileRef.current) fileRef.current.value = '';
  };

  const doReset = () => {
    clearDailyPlan(subject);
    setState(ensureTodayPlan(subject, allQuestions));
    toast.success('Daily plan reset');
  };

  return (
    <Card className="mb-6 p-6 border-2 border-primary/40">
      <div className="flex items-center gap-3 mb-3">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h3 className="font-semibold text-lg">Daily Plan</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        A fresh mix of questions across every topic each day. Correct answers cycle out
        until you\u2019ve mastered the pool, then the cycle repeats.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
        <div><div className="text-muted-foreground">Today</div><div className="font-semibold">{state.todayQuestionIds.length} questions</div></div>
        <div><div className="text-muted-foreground">Unused</div><div className="font-semibold">{state.unusedIds.length}</div></div>
        <div><div className="text-muted-foreground">Mastered</div><div className="font-semibold">{state.usedIds.length} ({progressPct}%)</div></div>
        <div><div className="text-muted-foreground">Cycles done</div><div className="font-semibold">{state.cycleCount}</div></div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm text-muted-foreground">Per day:</label>
        <Input
          type="number" min={1} max={200}
          value={state.questionsPerDay}
          onChange={e => changePerDay(Number(e.target.value) || 1)}
          className="w-24 h-8"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={startToday}><Play className="mr-2 h-4 w-4" />Start Today\u2019s Plan</Button>
        <Button variant="outline" onClick={doExport}><Download className="mr-2 h-4 w-4" />Export</Button>
        <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="mr-2 h-4 w-4" />Import</Button>
        <Button variant="ghost" onClick={doReset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={doImport} />
      </div>
    </Card>
  );
};

export default DailyPlanCard;
```

> Note: replace the two `\u2019` escapes with a real `'` after paste if your editor doesn\u2019t handle them (they are just curly apostrophes).

---

## 3) Edit `src/pages/CourseChallenge.tsx`

### 3a) Add the import

**Find** (top of file, with the other component imports):

```tsx
import RemoveConfirmDialog from '@/components/RemoveConfirmDialog';
```

**Replace with:**

```tsx
import RemoveConfirmDialog from '@/components/RemoveConfirmDialog';
import DailyPlanCard from '@/components/DailyPlanCard';
```

### 3b) Build the question pool

Just above the `return (` in `CourseChallenge`, **add**:

```tsx
// Pool for the Daily Plan: every built-in unit question + every imported set
const dailyPlanPool = useMemo(() => {
  const builtIn = units.flatMap(u => u.questions ?? []);
  const imported = importedSets.flatMap(s => s.questions);
  return [...builtIn, ...imported];
}, [units, importedSets]);
```

Then also **add `useMemo`** to the existing React import at the top of the file:

**Find:**
```tsx
import { useState, useRef, useEffect } from 'react';
```
**Replace with:**
```tsx
import { useState, useRef, useEffect, useMemo } from 'react';
```

> If `units` from `getSubjectUnits` doesn't already expose `.questions`, use whatever field it does (check `src/utils/questionLoader.ts`). If it only gives unit metadata, load questions via the same helper Cram Mode uses. The rest of the daily-plan logic is unaffected.

### 3c) Render the card

**Find** (right above the "Import Custom Questions Box" comment):

```tsx
        {/* Import Custom Questions Box */}
```

**Replace with:**

```tsx
        <DailyPlanCard subject={subject || ''} allQuestions={dailyPlanPool} />

        {/* Import Custom Questions Box */}
```

---

## 4) Edit `src/pages/Quiz.tsx`

Record correct answers back into the plan.

### 4a) Add the import

**Find:**
```tsx
import CalculatorBadge from '@/components/CalculatorBadge';
```
**Replace with:**
```tsx
import CalculatorBadge from '@/components/CalculatorBadge';
import { markDailyPlanCorrect } from '@/utils/dailyPlan';
```

### 4b) Mark correct at submit time

Find the place where an answer is graded and `isCorrect` becomes `true` (search for `isCorrect: true` inside the submit / grading handler). **Immediately after** the attempt object is set to correct, add:

```tsx
const dailyPlanKey = (location.state as any)?.dailyPlanKey as string | undefined;
if (dailyPlanKey && isCorrect) {
  markDailyPlanCorrect(dailyPlanKey, currentQuestion.id);
}
```

Use whatever the local variable names are in your submit handler (`isCorrect`, `currentQuestion`). For **parts** questions, call it only when the whole question is fully correct — do it in the same block that flips the top-level attempt's `isCorrect` to `true`.

Self-graded FRQs also count: as soon as the user marks themselves correct, this fires.

---

## How It Behaves

- **First visit today**: `ensureTodayPlan` picks `questionsPerDay` questions round-robin across topics from `unusedIds`.
- **Click "Start Today's Plan"** → goes to `/quiz/{subject}/daily/plan` with today's questions injected via `location.state.importedQuestions` (Quiz already supports this via the existing `importedQuestions` path used by Cram Mode).
- **Answer correctly** → id moves from `unusedIds` → `usedIds`. Get it wrong → stays in `unusedIds` and can come up again on a future day.
- **Next day** → new draw. If `unusedIds` is empty, everything moves back and `cycleCount` increments.
- **Import a new `.ts` topic** on the Course Challenge page → its new ids are appended to `unusedIds` automatically (reconciliation in `ensureTodayPlan`).
- **Export / Import** → `.json` snapshot of the whole plan (perfect for moving between devices; same "no accounts, files only" model the rest of the app uses).
- **Reset** → clears the plan for this subject and starts over.

## Why It's Safe

- Purely additive: no schema change, no changes to question `.ts` files, no changes to the exporter.
- All state is scoped per subject in `localStorage` under `daily-plan-{subject}`.
- Reconciliation means removing an imported set won\u2019t leave dangling ids in the plan.
- Round-robin picking guarantees topic variety even when one topic has far more questions than another.
