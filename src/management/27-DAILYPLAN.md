# 27 — Daily Plan (Course Challenge)

The Daily Plan gives the user a randomized slice of every topic each day, cycles
through the whole pool without repeats, and only removes a question after the user
has answered it correctly (even on the 2nd or 3rd attempt).

Everything is persisted in `localStorage` — no backend required.

---

## 1. Files

| File | Purpose |
|------|---------|
| `src/utils/dailyPlan.ts` | Pure logic + `localStorage` helpers (round-robin picker, per-subject state) |
| `src/components/DailyPlanCard.tsx` | Compact **"Daily" button + per-day input** rendered directly under the Cram button |
| `src/pages/CourseChallenge.tsx` | Builds the total question pool and renders `<DailyPlanCard />` under Cram Mode |
| `src/pages/Quiz.tsx` | Reads `location.state.dailyPlanKey`; calls `markDailyPlanCorrect(...)` on correct answers and forwards `dailyPlanKey` to Results |
| `src/pages/Results.tsx` | If `dailyPlanKey` is present, shows a **"Download Daily Plan"** card |

---

## 2. UI placement (matches the current design)

```
[  Cram Mode (All Units)  ]
[ Daily (15 questions today) ] [ Per day: 15 ] [⬇] [⬆] [↺]
   Mastered X / Y (Z%) · Cycles: N
[ Resume last Cram Mode ]           ← if applicable
```

- **Daily button** — starts today's plan. Navigates to `/quiz/{subject}/daily/plan`
  with `presetQuestions`, `dailyPlanKey: subject`, `orderedMode: true`.
- **Per-day input** — number, default **15**, saved via `setQuestionsPerDay(subject, n)`.
  Bounded 1–200.
- **Icon buttons** — Export JSON, Import JSON, Reset.
- **Progress line** — mastered / total, cycle count.

---

## 3. State schema (`localStorage["daily-plan-{subject}"]`)

```json
{
  "questionsPerDay": 15,
  "unusedIds": ["ecology-1", "genetics-4", "..."],
  "usedIds": ["ecology-3"],
  "todayDate": "2026-07-02",
  "todayQuestionIds": ["ecology-1", "genetics-4", "..."],
  "cycleCount": 0
}
```

Behavior:

| Event | Effect |
|-------|--------|
| First visit for subject | Seeds `unusedIds` with **every** question id in the pool |
| New pool imports | New ids are appended to `unusedIds`; deleted ids drop out of everything |
| A new day begins | Redraws `todayQuestionIds` via round-robin across topic prefixes |
| Correct answer | id moves from `unusedIds` → `usedIds` (mastered) |
| Wrong answer | id **stays** in `unusedIds` — eligible again on future days |
| `unusedIds` empty on new day | Refills from `usedIds`, `cycleCount += 1` |

**Correct-on-2nd-or-3rd-attempt** is handled automatically: `markDailyPlanCorrect`
runs on every correct submission, and only removes the id if it's still in
`unusedIds`. Wrong attempts never touch `usedIds`.

---

## 4. Wiring in `Quiz.tsx`

At the top:

```ts
import { markDailyPlanCorrect } from '@/utils/dailyPlan';
const dailyPlanKey = useMemo(
  () => (location.state as any)?.dailyPlanKey as string | undefined,
  [location.state],
);
```

On every path that marks a correct answer (MCQ, SATA, self-graded FRQ, parts):

```ts
if (isCorrect && dailyPlanKey) markDailyPlanCorrect(dailyPlanKey, currentQuestion.id);
```

In `goToResults()`, forward the key so Results can offer the download:

```ts
navigate('/results', {
  state: { score, total, subject, unitId, quizType, timeElapsed, attempts, dailyPlanKey },
});
```

---

## 5. Wiring in `Results.tsx`

```ts
const { ..., dailyPlanKey } = location.state || {};

const handleDownloadDailyPlan = () => {
  if (!dailyPlanKey) return;
  import('@/utils/dailyPlan').then(({ exportDailyPlan }) => {
    const blob = new Blob([exportDailyPlan(dailyPlanKey)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `daily-plan-${dailyPlanKey}.json`; a.click();
    URL.revokeObjectURL(url);
  });
};
```

Rendered card (placed after "Try Again", before "Targeted Practice"):

```tsx
{dailyPlanKey && (
  <Card className="p-6 mb-8 border-primary/40">
    <h3>Daily Plan Progress</h3>
    <p>Correct answers were removed from your daily pool. Wrong ones stay until mastered.</p>
    <Button onClick={handleDownloadDailyPlan}>
      <Download className="mr-2 h-4 w-4" /> Download Daily Plan
    </Button>
  </Card>
)}
```

---

## 6. Pool composition in `CourseChallenge.tsx`

```ts
const dailyPlanPool = useMemo(() => {
  const builtIn = units.flatMap(u => questionMap[`${subject}-${u.id}`] ?? []);
  const imported = importedSets.flatMap(s => s.questions);
  return [...builtIn, ...imported];
}, [units, importedSets, subject]);
```

Rendered **under the Cram button**, not above it:

```tsx
<Button onClick={handleStartCramMode} className="w-full" size="lg">
  <Trophy className="mr-2 h-4 w-4" /> Cram Mode (All Units)
</Button>
<DailyPlanCard subject={subject || ''} allQuestions={dailyPlanPool} />
```

---

## 7. Behavior cheat-sheet

- Default per-day: **15** (saved per-subject in `localStorage`, editable inline).
- Each day, the plan draws round-robin across topic prefixes so **every topic**
  is represented before any topic repeats within the day.
- Users can Export / Import / Reset from the compact toolbar.
- Users can Download the plan JSON from the Results page after finishing today's set.
- No backend calls, no auth, works offline.

---

## 8. **[FUTURE / OPTIONAL]** Daily streak — how to add when a backend exists

> **Do not implement this yet.** It requires Lovable Cloud (Supabase) to be enabled
> so streaks survive across devices and can't be reset by clearing `localStorage`.
> This section is a design + step-by-step guide for later.

### Why a backend is required

A streak that lives only in `localStorage` is trivially cheatable (change your
system clock, clear storage, or use another browser) and doesn't survive
device changes. A meaningful streak needs:

- a server-side "day" boundary the client can't fake, and
- per-user persistence tied to an authenticated identity.

### 8.1 Schema (Supabase)

Add two tables. Keep them small so writes are cheap.

```sql
-- Tracks each user's current + best streak, per subject.
create table public.daily_streaks (
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_completed_date date,               -- server-side date, UTC
  updated_at timestamptz not null default now(),
  primary key (user_id, subject)
);

grant select, insert, update on public.daily_streaks to authenticated;
grant all on public.daily_streaks to service_role;

alter table public.daily_streaks enable row level security;

create policy "users read own streak"
  on public.daily_streaks for select
  to authenticated using (user_id = auth.uid());

-- Optional: a completion log so you can rebuild streaks or show a heatmap.
create table public.daily_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  completed_date date not null,
  questions_correct int not null,
  questions_total int not null,
  created_at timestamptz not null default now(),
  unique (user_id, subject, completed_date)
);

grant select, insert on public.daily_completions to authenticated;
grant all on public.daily_completions to service_role;

alter table public.daily_completions enable row level security;

create policy "users read own completions"
  on public.daily_completions for select
  to authenticated using (user_id = auth.uid());
```

**Never** allow the client to write `daily_streaks` directly — an edge function
computes the update using the server clock so `last_completed_date` can't be
spoofed.

### 8.2 Edge function `record-daily-completion`

Trigger this from `Results.tsx` when a daily-plan attempt finishes. The
function is the single source of truth for streak math.

Logic:

```
today  = server-side UTC date
row    = select from daily_streaks where user_id = auth.uid() and subject = X

if row is null:
    insert daily_streaks (current_streak=1, longest_streak=1, last=today)
else if row.last_completed_date == today:
    // already counted today — no-op
else if row.last_completed_date == today - 1 day:
    current = row.current_streak + 1
    longest = max(row.longest_streak, current)
    update ... set current_streak=current, longest_streak=longest, last=today
else:
    // gap → streak resets to 1
    update ... set current_streak=1, last=today,
                   longest_streak = max(row.longest_streak, 1)

insert into daily_completions (user_id, subject, completed_date=today, ...)
on conflict do nothing;
```

Return the updated `{ current_streak, longest_streak }` to the client.

### 8.3 Client wiring (only after Cloud is enabled)

- **Results.tsx** — after a daily attempt finishes, call the edge function and
  toast something like `🔥 3-day streak!`. Fall back to silent no-op if the
  user is signed out.
- **CourseChallenge.tsx** — fetch `daily_streaks` row on mount and render a
  small flame badge next to `<DailyPlanCard />`.
- **Grace period (optional)** — if `today - last == 2 days` and the user was
  active yesterday, allow one free "streak freeze" per week. Track freezes in
  a `streak_freezes_used_this_week` column.

### 8.4 UI once wired

```
🔥 5-day streak · Best: 12
[ Daily (15 questions today) ] [ Per day: 15 ] ...
```

### 8.5 Auth-not-required fallback

While the user is signed out, keep showing today's plan and its localStorage
progress, but hide the flame badge. Never mix local and server streak numbers —
they'd disagree.

### 8.6 Implementation order when you're ready

1. Enable Lovable Cloud.
2. Run the two `create table` migrations above (with `GRANT` + RLS).
3. Add the `record-daily-completion` edge function.
4. Wire the Results-page call.
5. Wire the CourseChallenge badge.
6. Optional: streak-freeze logic, heatmap page fed by `daily_completions`.
