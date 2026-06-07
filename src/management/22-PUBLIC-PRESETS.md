# Public Presets — Download & Use Area

A **Public Presets** section appears at the top of the "Build Custom Practice"
page (`/unit/<subject>/<unitId>/preset-builder`), above the user's saved
presets and the question grid. Each entry has three buttons:

- **Use** — start a quiz with that preset's questions immediately.
- **Save** — copy the preset into the user's local saved presets.
- **Download** ⬇ — download the preset as `.json` (round-trips through the
  existing **Import Preset** button).

This is the source-of-truth doc for the feature. It is written so a maintainer
can copy/paste edits in by file + line number without re-deriving anything.

---

## Files involved (already in repo — do not re-create)

| File | Role |
|---|---|
| `src/data/public-presets.ts` | Single source of truth. Edit this file to add/remove/change presets. |
| `src/pages/PresetBuilder.tsx` | Renders the "Public Presets" card and wires up Use / Save / Download. |
| `src/management/README.md` | Index entry for this doc. |

No new routes, no new components, no migrations. Adding a preset is a
**one-line array entry**.

---

## Exact line map (current `PresetBuilder.tsx`)

These line numbers match the file as shipped. If you reformat the file the
numbers shift — re-grep for the marker text in the second column.

| Lines | What's there | Grep marker |
|---|---|---|
| 33 | `import { FileUp, X, Globe } from 'lucide-react';` | `Globe } from 'lucide-react'` |
| 34 | `import { getPublicPresetsForUnit, PublicPreset } from '@/data/public-presets';` | `from '@/data/public-presets'` |
| 402–406 | `publicUnitPresets` memo | `// ---- Public Presets` |
| 408–422 | `handleUsePublicPreset` | `handleUsePublicPreset =` |
| 424–438 | `handleSavePublicToMyPresets` | `handleSavePublicToMyPresets =` |
| 440–460 | `handleDownloadPublicPreset` | `handleDownloadPublicPreset =` |
| 555–597 | "Public Presets" `<Card>` JSX (rendered above the actions card) | `{/* Public Presets (bundled, read-only) */}` |

If any of those blocks are missing in a fork, the patch below is everything
you need to re-add.

---

## Copy / paste patch (only if the wiring was lost)

### 1. `src/pages/PresetBuilder.tsx` — imports (lines 33–34)

```tsx
import { FileUp, X, Globe } from 'lucide-react';
import { getPublicPresetsForUnit, PublicPreset } from '@/data/public-presets';
```

### 2. `src/pages/PresetBuilder.tsx` — handlers (paste anywhere inside the component, e.g. just before `getTopicName`, around line 402)

```tsx
// ---- Public Presets (bundled, read-only) -----------------------------------
const publicUnitPresets = useMemo(
  () => getPublicPresetsForUnit(subject || '', unitId || ''),
  [subject, unitId]
);

const handleUsePublicPreset = (preset: PublicPreset) => {
  const presetQuestions = questions.filter(q => preset.questionIds.includes(q.id));
  if (presetQuestions.length === 0) {
    toast.error("None of this preset's questions are available in this unit.");
    return;
  }
  navigate(`/quiz/${subject}/${unitId}/preset?t=${Date.now()}&publicPresetId=${preset.id}`, {
    state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
    replace: true,
  });
};

const handleSavePublicToMyPresets = (preset: PublicPreset) => {
  const availableIds = new Set(questions.map(q => q.id));
  const validIds = preset.questionIds.filter(id => availableIds.has(id));
  if (validIds.length === 0) {
    toast.error('No matching questions to save.');
    return;
  }
  const created = createPreset(preset.name, subject || '', unitId || '', validIds);
  const skipped = preset.questionIds.length - validIds.length;
  toast.success(
    skipped > 0
      ? `Saved "${created.name}" (${validIds.length} of ${preset.questionIds.length} questions)`
      : `Saved "${created.name}" to your presets`
  );
};

const handleDownloadPublicPreset = (preset: PublicPreset) => {
  const exportData = {
    version: 1,
    preset: {
      name: preset.name,
      subject: preset.subject,
      unitId: preset.unitId,
      questionIds: preset.questionIds,
    },
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success('Preset downloaded!');
};
```

### 3. `src/pages/PresetBuilder.tsx` — JSX (paste immediately **above** the `{/* Selected count and actions */}` card, around line 555)

```tsx
{/* Public Presets (bundled, read-only) */}
{publicUnitPresets.length > 0 && (
  <Card className="p-4 mb-6 border-primary/40">
    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">Public Presets</h2>
      </div>
      <span className="text-xs text-muted-foreground">Curated presets for this unit</span>
    </div>
    <div className="space-y-2">
      {publicUnitPresets.map(preset => (
        <div
          key={preset.id}
          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors flex-wrap gap-3"
        >
          <div className="flex flex-col min-w-0">
            <span className="font-medium">{preset.name}</span>
            {preset.description && (
              <span className="text-muted-foreground text-sm">{preset.description}</span>
            )}
            <span className="text-muted-foreground text-xs">
              {preset.questionIds.length} questions{preset.author ? ` • by ${preset.author}` : ''}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button size="sm" onClick={() => handleUsePublicPreset(preset)}>
              <Play className="mr-1 h-3 w-3" /> Use
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleSavePublicToMyPresets(preset)}>
              <Save className="mr-1 h-3 w-3" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDownloadPublicPreset(preset)}>
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </Card>
)}
```

### 4. `src/data/public-presets.ts` — full file (only if missing)

```ts
export interface PublicPreset {
  id: string;            // stable unique id, e.g. "apcsp-algorithms-vocab"
  name: string;
  description?: string;
  subject: string;       // MUST match the URL subject slug
  unitId: string;        // MUST match the URL unitId slug
  questionIds: string[];
  author?: string;
}

export const publicPresets: PublicPreset[] = [
  // add entries here
];

export const getPublicPresetsForUnit = (
  subject: string,
  unitId: string
): PublicPreset[] =>
  publicPresets.filter(p => p.subject === subject && p.unitId === unitId);
```

---

## Adding a new preset (the only workflow you should ever need)

1. Find the unit URL slug: `/unit/<subject>/<unitId>/preset-builder`.
2. Open `src/data/<subject>/<unitId>-questions.ts` and copy the `id: "..."`
   values you want.
3. Append an entry to `publicPresets` in `src/data/public-presets.ts`:

   ```ts
   {
     id: 'apcsp-algorithms-loops-only',          // unique, kebab-case
     name: 'Algorithms — Loops Only',
     description: 'Just the iteration / loop vocab.',
     subject: 'apcsp',
     unitId: 'algorithms',
     questionIds: ['algorithms-13', 'algorithms-14', 'algorithms-15'],
     author: 'CSW Studying',
   },
   ```

4. Done — the card appears next build.

---

## GitHub Pages compatibility (verified)

This feature uses only mechanisms that work identically on Lovable hosting
and on standalone GitHub Pages:

| Mechanism | Why it works on GitHub Pages |
|---|---|
| `navigate('/quiz/...')` (React Router) | SPA fallback is handled by `public/404.html` (see core memory). No absolute domain assumed. |
| `URL.createObjectURL(new Blob(...))` for Download | Generates a `blob:` URL in the browser — completely independent of hosting domain or `base` path. |
| `<a download="...">` filename | Pure DOM, no server. |
| `localStorage` for Save | Per-origin, hosting-agnostic. |

**There are no hard-coded `https://cswstudying.lovable.app/...` URLs in this
feature.** If you add one later (for example, a "share this preset" link),
build it with `window.location.origin + import.meta.env.BASE_URL + ...` so it
keeps working under any repo name on GitHub Pages. Never hard-code the
Lovable domain.

If a preset ever references an **image** (it doesn't today, but if you
extend the schema), that image path MUST be passed through
`resolveImagePath()` from `src/utils/resolveImagePath.ts` — see
[19-IMAGE-ROUTING-FIX.md](./19-IMAGE-ROUTING-FIX.md).

---

## Download JSON format (unchanged)

```json
{
  "version": 1,
  "preset": {
    "name": "Algorithms — Core Vocabulary",
    "subject": "apcsp",
    "unitId": "algorithms",
    "questionIds": ["algorithms-1", "algorithms-2", "algorithms-3"]
  }
}
```

Filename: `<sanitised_name>_preset.json`.

---

## Rules of thumb

- `subject` + `unitId` must match the URL slugs exactly.
- Missing IDs at use time are silently dropped (toast shows the skip count).
- Order is preserved — put best presets first.
- Don't bundle >~50 questions per preset; large sets belong in uploaded `.ts`.
- `subject` starting with `custom-…` is user-local and not a valid target.

---

## Public Presets for Course Challenges

Course Challenge has its own preset builder at
`/course-challenge/<subject>/preset-builder` and renders
`src/pages/CourseChallengePresetBuilder.tsx`. It spans **every unit in a
subject** instead of a single unit, so it uses a separate helper and a
reserved sentinel `unitId`.

### Convention

| Field | Value |
|---|---|
| `subject` | Subject URL slug (e.g. `apcsp`, `chemistry`) |
| `unitId` | **Must be the literal string `'course-challenge'`** |
| `questionIds` | IDs from **any** `-questions.ts` file under that subject |

That sentinel is what `getPublicPresetsForCourseChallenge(subject)` filters
on, and it matches the `unitId` already used by the saved-presets system for
this page (see `handleSavePreset` in the file).

### Adding a course-challenge preset (data only)

Append to `publicPresets` in `src/data/public-presets.ts`:

```ts
{
  id: 'apcsp-course-challenge-mixed-50',
  name: 'AP CSP — Mixed 50',
  description: 'Cross-unit cram set covering all five big ideas.',
  subject: 'apcsp',
  unitId: 'course-challenge',
  questionIds: [
    'algorithms-1', 'algorithms-7',
    'data-3', 'data-14',
    'computing-2', 'systems-5', 'creative-9',
    // …
  ],
  author: 'CSW Studying',
},
```

No other changes required if the wiring below is already in place.

---

## Exact line map — `src/pages/CourseChallengePresetBuilder.tsx`

Numbers match the file as shipped. Re-grep markers if the file is reformatted.

| Lines | What's there | Grep marker |
|---|---|---|
| 6 | `..., Download, Upload, Globe } from 'lucide-react';` | `Globe } from 'lucide-react'` |
| 7 | `import { getPublicPresetsForCourseChallenge, PublicPreset } from '@/data/public-presets';` | `getPublicPresetsForCourseChallenge` |
| 283–347 | `publicCoursePresets` memo + 3 handlers | `// ---- Public Presets` |
| 436–476 | "Public Presets" `<Card>` JSX, above the `{/* Saved Presets */}` card | `{/* Public Presets (bundled, read-only) */}` |

---

## Copy / paste patch — Course Challenge builder (only if wiring is lost)

### 1. `src/data/public-presets.ts` — add the helper (paste below `getPublicPresetsForUnit`)

```ts
// Course Challenge presets are stored with unitId === 'course-challenge'
// and reference question IDs from ANY unit in that subject.
export const getPublicPresetsForCourseChallenge = (
  subject: string
): PublicPreset[] =>
  publicPresets.filter(p => p.subject === subject && p.unitId === 'course-challenge');
```

### 2. `src/pages/CourseChallengePresetBuilder.tsx` — imports (line 6)

Replace:

```tsx
import { ArrowLeft, Save, Play, Pencil, Trash2, Check, Download, Upload } from 'lucide-react';
```

With:

```tsx
import { ArrowLeft, Save, Play, Pencil, Trash2, Check, Download, Upload, Globe } from 'lucide-react';
import { getPublicPresetsForCourseChallenge, PublicPreset } from '@/data/public-presets';
```

### 3. Handlers — paste **immediately above** `const getSubjectTitleText = ...` (around line 283)

```tsx
// ---- Public Presets (bundled, read-only) ---------------------------------
const publicCoursePresets = useMemo(
  () => getPublicPresetsForCourseChallenge(subject || ''),
  [subject]
);

const getAllSubjectQuestions = (): Question[] => {
  const all: Question[] = [];
  allQuestionsByUnit.forEach(({ questions }) => all.push(...questions));
  return all;
};

const handleUsePublicPreset = (preset: PublicPreset) => {
  const all = getAllSubjectQuestions();
  const presetQuestions = all.filter(q => preset.questionIds.includes(q.id));
  if (presetQuestions.length === 0) {
    toast.error("None of this preset's questions are available in this subject.");
    return;
  }
  navigate(`/quiz/${subject}/course-challenge/cram?t=${Date.now()}&publicPresetId=${preset.id}`, {
    state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
    replace: true,
  });
};

const handleSavePublicToMyPresets = (preset: PublicPreset) => {
  const all = getAllSubjectQuestions();
  const availableIds = new Set(all.map(q => q.id));
  const validIds = preset.questionIds.filter(id => availableIds.has(id));
  if (validIds.length === 0) {
    toast.error('No matching questions to save.');
    return;
  }
  const created = createPreset(preset.name, subject || '', 'course-challenge', validIds);
  const skipped = preset.questionIds.length - validIds.length;
  toast.success(
    skipped > 0
      ? `Saved "${created.name}" (${validIds.length} of ${preset.questionIds.length} questions)`
      : `Saved "${created.name}" to your presets`
  );
};

const handleDownloadPublicPreset = (preset: PublicPreset) => {
  const exportData = {
    version: 1,
    preset: {
      name: preset.name,
      subject: preset.subject,
      unitId: preset.unitId,
      questionIds: preset.questionIds,
    },
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success('Preset downloaded!');
};
```

### 4. JSX — paste **immediately above** the `{/* Saved Presets */}` card (around line 436)

```tsx
{/* Public Presets (bundled, read-only) */}
{publicCoursePresets.length > 0 && (
  <Card className="p-4 mb-6 border-primary/40">
    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">Public Presets</h2>
      </div>
      <span className="text-xs text-muted-foreground">Curated presets for this course challenge</span>
    </div>
    <div className="space-y-2">
      {publicCoursePresets.map(preset => (
        <div
          key={preset.id}
          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors flex-wrap gap-3"
        >
          <div className="flex flex-col min-w-0">
            <span className="font-medium">{preset.name}</span>
            {preset.description && (
              <span className="text-muted-foreground text-sm">{preset.description}</span>
            )}
            <span className="text-muted-foreground text-xs">
              {preset.questionIds.length} questions{preset.author ? ` • by ${preset.author}` : ''}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button size="sm" onClick={() => handleUsePublicPreset(preset)}>
              <Play className="mr-1 h-3 w-3" /> Use
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleSavePublicToMyPresets(preset)}>
              <Save className="mr-1 h-3 w-3" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDownloadPublicPreset(preset)}>
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </Card>
)}
```

---

## Why the route is `/quiz/<subject>/course-challenge/cram`

Both the manual "Start Practice" button and the saved-preset "Use" button
already navigate to that route — Public Presets piggyback on the exact same
path so Quiz.tsx behaves identically (forced re-mount via `?t=<Date.now()>`,
`replace: true`, `state.startNewAttempt: true`). Do not invent a new route.

## GitHub Pages compatibility

Identical to the unit-level case above — `navigate(...)` uses React Router,
downloads use `URL.createObjectURL`, saves use `localStorage`. There are no
hard-coded domains. If you ever add a shareable course-challenge URL, build
it with `window.location.origin + import.meta.env.BASE_URL + ...`.

