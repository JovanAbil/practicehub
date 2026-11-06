# 30 — Public Presets from JSON Files (Units + Course Challenges)

This is a **copy-and-paste guide**, not an installed feature. It extends
management file 22: instead of typing presets into a TypeScript array,
keep one JSON file per public preset, organized by subject and unit.

- Public presets appear in **Build Custom Practice** for their unit.
- Course Challenge's builder shows the subject's presets **grouped by
  unit**, plus a **Course Challenge** group for cross-unit presets.
- **Use** starts practice immediately. **Select** puts the questions into
  the builder so the visitor can adjust them. **Save** makes a private copy.
- Download uses the same JSON envelope as the existing preset importer.
- Public files are part of the website: visitors on any device see them
  without uploading anything or signing in. Personal copies remain local.
- A preset stores **question IDs**, not questions or images. The matching
  question bank must already be on the website.

Everything below works on GitHub Pages. JSON is bundled by Vite; there is
no URL fetch, new service, or image-path change.

## Files touched

| File | Change |
|---|---|
| `src/data/public-presets/<subject>/<unitId>/*.json` | New public preset files |
| `src/data/public-presets.ts` | Replace array with JSON loader; retain existing selectors |
| `src/components/PublicPresetLibrary.tsx` | New shared grouped list + downloads |
| `src/pages/PresetBuilder.tsx` | Replace old public handlers/list with shared library |
| `src/pages/CourseChallengePresetBuilder.tsx` | Same library, all units of the subject |
| `src/pages/CustomUnitChallengePresetBuilder.tsx` | Optional shared library for compatible custom-unit IDs |

Line numbers refer to the current files; use the named anchors if earlier
updates have shifted them. Do not add a second public list alongside file 22's list.

---

## Step 1 — Create the JSON folders and examples

```text
src/data/public-presets/
  apcsp/
    algorithms/
      starter.json
    data/
      binary-starter.json
    course-challenge/
      algorithms-and-data.json
  chemistry/
    <actual-unit-slug>/
      <preset-name>.json
```

Folders and JSON `subject` / `unitId` must match. Copy course/unit slugs
from `getSubjectUnits` / the maps in `src/utils/questionLoader.ts` or the
builder's URL. Do not use the visible course title as the slug.

### 1a. Unit example — create `src/data/public-presets/apcsp/algorithms/starter.json`

These IDs exist in `src/data/apcsp/algorithms-questions.ts`.

```json
{
  "id": "apcsp-algorithms-starter",
  "name": "Algorithms — Starter",
  "description": "Two foundational algorithms questions.",
  "subject": "apcsp",
  "unitId": "algorithms",
  "questionIds": ["algorithms-1", "algorithms-2"],
  "author": "CSW Studying"
}
```

### 1b. Another unit — create `src/data/public-presets/apcsp/data/binary-starter.json`

```json
{
  "id": "apcsp-data-starter",
  "name": "Data — Starter",
  "subject": "apcsp",
  "unitId": "data",
  "questionIds": ["data-2", "data-3"]
}
```

### 1c. Cross-unit example — create `src/data/public-presets/apcsp/course-challenge/algorithms-and-data.json`

```json
{
  "id": "apcsp-course-algorithms-and-data",
  "name": "AP CSP — Algorithms and Data",
  "description": "A short challenge across two units.",
  "subject": "apcsp",
  "unitId": "course-challenge",
  "questionIds": ["algorithms-1", "algorithms-2", "data-2", "data-3"]
}
```

`id` must be unique across **all** public presets. Question IDs stay
unchanged, including for parts questions: select the parent question ID,
not a part label. JSON requires double quotes and no comments or trailing commas.

**Preserve the old presets:** before replacing the registry in Step 2,
copy each existing object from `publicPresets` into its own JSON file at
the matching path. Otherwise those old presets disappear from the public
list. Do not duplicate the same public `id` in multiple files.

---

## Step 2 — Replace `src/data/public-presets.ts` (~lines 1–63)

Replace the **whole file** with this. It keeps both old selector exports,
so existing imports from file 22 remain valid during the changeover.
Invalid metadata is logged and skipped rather than crashing every builder;
check the browser console before publishing. Invalid JSON syntax itself
must still be corrected before the site can compile.

```ts
export interface PublicPreset {
  id: string;
  name: string;
  description?: string;
  subject: string;
  unitId: string;
  questionIds: string[];
  author?: string;
}

const files = import.meta.glob<unknown>(
  './public-presets/*/*/*.json',
  { eager: true, import: 'default' }
);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isIdList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.length > 0 && value.every(isText);

const readPreset = (path: string, value: unknown): PublicPreset | null => {
  if (!isRecord(value) ||
      !isText(value.id) || !isText(value.name) ||
      !isText(value.subject) || !isText(value.unitId) ||
      !isIdList(value.questionIds) ||
      (value.description !== undefined && typeof value.description !== 'string') ||
      (value.author !== undefined && typeof value.author !== 'string')) {
    console.error(`Invalid public preset metadata: ${path}`);
    return null;
  }
  if (!path.startsWith(`./public-presets/${value.subject}/${value.unitId}/`)) {
    console.error(`Public preset folder/metadata mismatch: ${path}`);
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    subject: value.subject,
    unitId: value.unitId,
    questionIds: [...new Set(value.questionIds)],
    description: typeof value.description === 'string' ? value.description : undefined,
    author: typeof value.author === 'string' ? value.author : undefined,
  };
};

const seen = new Set<string>();
export const publicPresets: PublicPreset[] = [];
for (const [path, value] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
  const preset = readPreset(path, value);
  if (!preset) continue;
  if (seen.has(preset.id)) {
    console.error(`Duplicate public preset id: ${preset.id} (${path})`);
    continue;
  }
  seen.add(preset.id);
  publicPresets.push(preset);
}

export const getPublicPresetsForUnit = (subject: string, unitId: string) =>
  publicPresets.filter(p => p.subject === subject && p.unitId === unitId);

export const getPublicPresetsForCourseChallenge = (subject: string) =>
  publicPresets.filter(p => p.subject === subject && p.unitId === 'course-challenge');

// The new course library includes both unit presets and cross-unit presets.
export const getPublicPresetsForSubject = (subject: string) =>
  publicPresets.filter(p => p.subject === subject);
```

Keep the glob a literal string. It finds files exactly three levels below
the registry: subject / unit / filename. Adding another file there requires
no new import or array entry. Rebuild and deploy the site to publish it;
adding a JSON file to GitHub without deploying does not update an old build.

---

## Step 3 — Create `src/components/PublicPresetLibrary.tsx`

One shared list handles grouping, partial-ID warnings, download formatting,
and the available count. Navigation and private saving stay with the page
that knows which quiz is being built. This avoids three duplicated lists.

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, ListPlus, Play, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { PublicPreset } from '@/data/public-presets';
import type { Question } from '@/types/quiz';

interface Props {
  presets: PublicPreset[];
  questions: Question[];
  unitLabels?: Record<string, string>;
  onUse: (preset: PublicPreset, questions: Question[]) => void;
  onSelect: (preset: PublicPreset, ids: string[]) => void;
  onSave: (preset: PublicPreset, ids: string[]) => void;
}

const PublicPresetLibrary = ({
  presets, questions, unitLabels = {}, onUse, onSelect, onSave,
}: Props) => {
  if (presets.length === 0) return null;
  const questionMap = new Map(questions.map(q => [q.id, q]));
  const groups = [...new Set(presets.map(p => p.unitId))];

  const resolve = (preset: PublicPreset) => {
    const matching: Question[] = [];
    for (const id of new Set(preset.questionIds)) {
      const question = questionMap.get(id);
      if (question) matching.push(question);
    }
    return matching;
  };

  const run = (preset: PublicPreset, action: 'use' | 'select' | 'save') => {
    const matching = resolve(preset);
    if (matching.length === 0) {
      toast.error('No matching questions are available.');
      return;
    }
    const missing = preset.questionIds.length - matching.length;
    if (missing > 0) toast.warning(`${missing} unavailable questions were left out.`);
    if (action === 'use') onUse(preset, matching);
    else if (action === 'select') onSelect(preset, matching.map(q => q.id));
    else onSave(preset, matching.map(q => q.id));
  };

  const download = (preset: PublicPreset) => {
    // Download the definition, not a device-specific filtered subset.
    const data = { version: 1, preset: {
      name: preset.name, subject: preset.subject,
      unitId: preset.unitId, questionIds: preset.questionIds,
    } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mb-6 min-w-0 space-y-4" aria-label="Public Presets">
      <h2 className="text-lg font-semibold">Public Presets</h2>
      {groups.map(unitId => (
        <div key={unitId} className="min-w-0 space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {unitId === 'course-challenge' ? 'Course Challenge' : unitLabels[unitId] || unitId}
          </h3>
          {presets.filter(p => p.unitId === unitId).map(preset => {
            const available = resolve(preset).length;
            return (
              <Card key={preset.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 p-3">
                <div className="min-w-0 flex-1 basis-48 break-words">
                  <p className="font-medium">{preset.name}</p>
                  {preset.description && <p className="text-sm text-muted-foreground">{preset.description}</p>}
                  <p className="text-xs text-muted-foreground">
                    {available}/{preset.questionIds.length} questions
                    {preset.author ? ` · ${preset.author}` : ''}
                  </p>
                </div>
                <div className="flex max-w-full flex-wrap gap-2">
                  <Button size="sm" disabled={available === 0} onClick={() => run(preset, 'use')}>
                    <Play className="mr-1 h-3 w-3" /> Use
                  </Button>
                  <Button size="sm" variant="outline" disabled={available === 0} onClick={() => run(preset, 'select')}>
                    <ListPlus className="mr-1 h-3 w-3" /> Select
                  </Button>
                  <Button size="sm" variant="outline" disabled={available === 0} onClick={() => run(preset, 'save')}>
                    <Save className="mr-1 h-3 w-3" /> Save
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => download(preset)}
                    aria-label={`Download ${preset.name}`} title={`Download ${preset.name}`}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default PublicPresetLibrary;
```

**Select replaces the builder's current selection**, not adds to it.
The user can then select/deselect more questions and save normally.
Zero-match presets remain visible with Use/Select/Save disabled; Download
still works. Partial matches remain usable with a warning.

---

## Step 4 — Unit custom builder: `src/pages/PresetBuilder.tsx`

### 4a. Imports (~line 34)

Replace the existing public-preset import with:

```tsx
import { getPublicPresetsForUnit } from '@/data/public-presets';
import PublicPresetLibrary from '@/components/PublicPresetLibrary';
```

Remove `Globe` from the lucide import if it is no longer used anywhere.

### 4b. Keep the selector, remove duplicated handlers (~lines 402–460)

Keep this existing memo:

```tsx
const publicUnitPresets = useMemo(
  () => getPublicPresetsForUnit(subject || '', unitId || ''),
  [subject, unitId]
);
```

Delete the **three public-only functions** immediately below it:
`handleUsePublicPreset`, `handleSavePublicToMyPresets`, and
`handleDownloadPublicPreset`. Stop before `// Get topic name for custom topics`.
Do **not** delete the similarly named private/saved preset handlers.

### 4c. Replace the existing public list (~lines 555–597)

Replace everything from `{/* Public Presets (bundled, read-only) */}`
through the matching closing `)}` immediately before
`{/* Selected count and actions */}` with:

```tsx
<PublicPresetLibrary
  presets={publicUnitPresets}
  questions={questions}
  unitLabels={{ [unitId || '']: getTopicName() || unitId || '' }}
  onUse={(preset, presetQuestions) => {
    navigate(`/quiz/${subject}/${unitId}/preset?t=${Date.now()}&publicPresetId=${encodeURIComponent(preset.id)}`, {
      state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
      replace: true,
    });
  }}
  onSelect={(preset, ids) => {
    setSelectedIds(new Set(ids));
    setSelectionOrder(ids);
    setPresetName(preset.name);
  }}
  onSave={(preset, ids) => {
    createPreset(preset.name, subject || '', unitId || '', ids);
    toast.success('Saved to your presets');
  }}
/>
```

Built-in unit route example: `/unit/apcsp/algorithms/preset-builder`.
The existing `questions` pool includes that unit plus uploaded questions;
the library resolves against that pool, never another subject's data.

---

## Step 5 — Course challenges: `src/pages/CourseChallengePresetBuilder.tsx`

### 5a. Imports (~line 7)

Replace the old public-preset import with:

```tsx
import { getPublicPresetsForSubject } from '@/data/public-presets';
import PublicPresetLibrary from '@/components/PublicPresetLibrary';
```

Remove unused `Globe` if appropriate. Leave the centralized question-loader
imports intact.

### 5b. Replace the public selector (~lines 284–288)

```tsx
const publicCoursePresets = useMemo(
  () => getPublicPresetsForSubject(subject || ''),
  [subject]
);
```

This is deliberately **ForSubject**, not **ForCourseChallenge**: course
builders can use a preset from one unit or across units. The list separates
them under their unit headings.

Keep `getAllSubjectQuestions()` (~lines 290–294). Delete the three public
handlers below it, stopping before `const getSubjectTitleText = ...`.

### 5c. Replace the old public list (~lines 436–476)

Replace the public comment and conditional block immediately before
`{/* Saved Presets */}` with:

```tsx
<PublicPresetLibrary
  presets={publicCoursePresets}
  questions={getAllSubjectQuestions()}
  unitLabels={Object.fromEntries(units.map(unit => [unit.id, unit.name]))}
  onUse={(preset, presetQuestions) => {
    navigate(`/quiz/${subject}/course-challenge/cram?t=${Date.now()}&publicPresetId=${encodeURIComponent(preset.id)}`, {
      state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
      replace: true,
    });
  }}
  onSelect={(preset, ids) => {
    setSelectedQuestionIds(new Set(ids));
    setPresetName(preset.name);
    setEditingPresetId(null);
    setShowSaveForm(true);
  }}
  onSave={(preset, ids) => {
    createPreset(preset.name, subject || '', 'course-challenge', ids);
    toast.success('Saved to your course challenge presets');
  }}
/>
```

Route: `/course-challenge/apcsp/preset-builder`. The three example files
appear under **Algorithms**, **Data**, and **Course Challenge**. Even when
saving an Algorithms-only preset from this page, the private copy uses
`unitId: 'course-challenge'`: that is the builder's storage target.

No changes to `Quiz.tsx`, answers, grading, or results are required: these
callbacks pass real question objects through the existing `presetQuestions`
navigation state. Existing quiz modes may shuffle questions; this does
not add an ordered-practice mode or guarantee the JSON order on screen.

---

## Step 6 — Optional: custom-unit course challenge builder

“Build Custom Practice” for built-in courses is covered by Steps 4–5.
User-created **Custom Units** are different: their data and generated IDs
live on the visitor's device. Publishing a preset containing those IDs does
**not** publish the custom questions. To support those units, recipients
must have a matching custom-unit package with the same question IDs and
subject/topic IDs; arbitrary recreated units are not automatically compatible.

### 6a. Imports in `src/pages/CustomUnitChallengePresetBuilder.tsx` (~line 23)

```tsx
import { getPublicPresetsForSubject } from '@/data/public-presets';
import PublicPresetLibrary from '@/components/PublicPresetLibrary';
```

### 6b. Add memos BEFORE the first early return (~line 105)

Insert after the existing `useEffect(..., [unitId])` and before
`if (!isLoaded)`. Hooks must not be inserted after a loading/not-found return.

```tsx
const publicCustomPresets = useMemo(
  () => getPublicPresetsForSubject(subjectKey),
  [subjectKey]
);

const availableQuestions = useMemo(() => {
  const pool = [
    ...allQuestionsByTopic.flatMap(topic => topic.questions),
    ...uploadedQuestions,
  ];
  return [...new Map(pool.map(q => [q.id, q])).values()];
}, [allQuestionsByTopic, uploadedQuestions]);
```

Use the **exact existing** `subjectKey = custom-${unitId}`; do not simplify
repeated `custom-` prefixes. To author JSON, copy `subject`, `unitId`, and
question IDs from a downloaded preset on that actual custom unit. Uploaded
questions may have runtime `uploaded-` IDs; copy those, not original source IDs.

### 6c. Add the list before `{/* Saved Presets */}` (~line 488)

```tsx
<PublicPresetLibrary
  presets={publicCustomPresets}
  questions={availableQuestions}
  unitLabels={Object.fromEntries(allQuestionsByTopic.map(t => [t.topicId, t.topicName]))}
  onUse={(preset, presetQuestions) => {
    navigate(`/quiz/${subjectKey}/course-challenge/cram?t=${Date.now()}&publicPresetId=${encodeURIComponent(preset.id)}`, {
      state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
      replace: true,
    });
  }}
  onSelect={(preset, ids) => {
    setSelectedQuestionIds(new Set(ids));
    setPresetName(preset.name);
    setEditingPresetId(null);
    setShowSaveForm(true);
  }}
  onSave={(preset, ids) => {
    createPreset(preset.name, subjectKey, 'course-challenge', ids);
    toast.success('Saved to your presets');
  }}
/>
```

### 6d. Keep the same pool when a saved copy is used/imported

The current custom challenge's saved Use/import paths only collect topic
questions, while selected practice also includes uploads. Otherwise a
public preset using uploads works once but its saved copy may lose questions.

In `handleImportPreset` (~lines 234–238), replace:

```tsx
const allQuestions: Question[] = [];
allQuestionsByTopic.forEach(({ questions }) => {
  allQuestions.push(...questions);
});
```

with:

```tsx
const allQuestions = availableQuestions;
```

Make the same replacement at the start of `handleUsePreset` (~line 279).
In `handleStartPractice` (~lines 299–304), replace the construction of
`allQuestions` from topics plus uploads with that same line. Keep the
existing filtering and navigation beneath it.

Do not auto-match built-in public presets to unrelated custom units by title.
If IDs do not match, the disabled count correctly indicates incompatibility.

---

## Step 7 — How to make another public preset yourself

1. Open the target unit's custom builder, select questions, name it, save
   it, and download its preset JSON. For a multi-unit preset, do this in
   the Course Challenge builder instead.
2. The downloaded file looks like this:

   ```json
   {
     "version": 1,
     "preset": {
       "name": "Algorithms — Starter",
       "subject": "apcsp",
       "unitId": "algorithms",
       "questionIds": ["algorithms-1", "algorithms-2"]
     }
   }
   ```

3. For the **website's source JSON**, copy the object **inside** `preset`,
   add a globally unique `id`, and optionally `description` / `author`.
   Remove the outer `version` / `preset` wrapper; Step 1 shows that format.
4. Save it in `src/data/public-presets/<subject>/<unitId>/<filename>.json`.
   Use `course-challenge` for cross-unit presets, not an invented unit slug.
5. Check that every question ID is real in that bank; the preset does not
   register new content. New question banks still require the usual
   data file + `questionLoader.ts` + `category-courses.ts` registration.
6. Rebuild/deploy through your existing GitHub Pages workflow. Test on a
   fresh browser/device: public presets should appear without imports.

**Two different JSON formats:** source files are flat metadata objects;
downloaded files use `{ "version": 1, "preset": { ... } }`. The shared
download button converts automatically. Existing importers rebind imports
to the **current builder**, ignoring the original subject/unit as a storage
target, and filter unavailable question IDs. Import a cross-unit preset in
the correct course builder rather than expecting all IDs in one unit.

## Behavior recap

| Situation | Result |
|---|---|
| Algorithms unit builder | Only `apcsp/algorithms` presets |
| AP CSP course builder | All AP CSP presets, grouped by unit plus Course Challenge |
| Another subject | No AP CSP presets leak into its list |
| Use | Starts existing quiz flow with available matching questions |
| Select | Replaces selection; user can adjust before saving/starting |
| Save | Creates private local copy in current builder's scope |
| Some missing IDs | Available subset works; warning shows missing count |
| Zero available IDs | Use/Select/Save disabled; Download still available |
| Download | Standard import-compatible version-1 envelope |
| New device | Public definitions present; private copies/progress not transferred |
| Update public JSON | Public definition changes after deployment; private copies unchanged |

## Storage keys

No new keys. Public definitions are bundled files; private Save uses the
existing `quiz-presets` localStorage key. This does not add shared accounts,
server persistence, or modify quiz progress saving.

## Test checklist (after installing the code)

- [ ] Fresh browser: Algorithms builder shows Starter with `2/2` available.
- [ ] Data builder shows Data Starter, not Algorithms Starter.
- [ ] Course builder shows all three example groups with real unit titles.
- [ ] Use cross-unit example → quiz contains Algorithms and Data questions;
      answer one and confirm Results records it through the normal flow.
- [ ] Select unit example → exactly its two IDs selected; adjust selection,
      save, and use the private copy.
- [ ] Save from course library → private copy appears in course presets.
- [ ] Download and re-import into correct builder → same question IDs.
- [ ] Add a nonexistent ID to a temporary example → remaining IDs work with
      a warning; restore the example afterward.
- [ ] All IDs missing → buttons disabled; Download still works.
- [ ] Duplicate public ID / mismatched folder → console warning, bad entry skipped.
- [ ] Another subject → only that subject's public presets (or no section).
- [ ] Narrow phone → cards/buttons wrap; no page-wide overflow.
- [ ] GitHub Pages subpath → presets appear with no failing JSON fetches.
- [ ] Optional custom units: same-ID package loaded, public Use works,
      saved copy and imported download work with uploaded questions too.

The snippets are documentation only until you paste them into your main
website. Run that site's checks and the above flows before publishing.

## Rollback

1. Restore previous `public-presets.ts` array and builder public blocks
   from your backup/file 22; preserve the course selector export.
2. Remove the optional custom library/memos and revert its pool replacements.
3. Delete the unused shared `PublicPresetLibrary.tsx` and JSON folder.
4. Rebuild/deploy. Do not clear `quiz-presets` or quiz progress; private
   copies remain valid if their question IDs still exist.
