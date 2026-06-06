# Public Presets — Download & Use Area

A **Public Presets** section appears at the top of the "Build Custom Practice"
page (`/unit/<subject>/<unitId>/preset-builder`), above the user's saved
presets and the question grid. It surfaces curated, pre-built question sets
for the subject + unit the user is currently viewing. Each entry has three
buttons:

- **Use** — start a quiz with that preset's questions immediately.
- **Save** — copy the preset into the user's local saved presets (so it shows
  up in their personal "Saved Presets" list and can be edited).
- **Download** ⬇ — download the preset as a `.json` file using the same
  format `Import Preset` accepts, so it can be shared.

This document explains how it works and how to add or modify presets.

---

## File Structure

Everything lives in a single file:

```
src/data/public-presets.ts
```

That file exports:

```ts
export interface PublicPreset {
  id: string;            // stable unique id, e.g. "apcsp-algorithms-vocab"
  name: string;          // shown as the card title
  description?: string;  // optional one-liner
  subject: string;       // MUST match the URL subject slug
  unitId: string;        // MUST match the URL unit slug
  questionIds: string[]; // ids from that unit's -questions.ts file
  author?: string;       // optional credit shown next to the count
}

export const publicPresets: PublicPreset[] = [ /* ... */ ];

export const getPublicPresetsForUnit = (
  subject: string,
  unitId: string
): PublicPreset[];
```

`PresetBuilder.tsx` imports `getPublicPresetsForUnit` and renders a card only
when at least one preset matches the current `subject` + `unitId`. There is
**no separate JSON file per preset** — every preset is just one entry in this
array.

---

## How Display Works

Inside `src/pages/PresetBuilder.tsx`:

1. `publicUnitPresets` is computed with `useMemo` from
   `getPublicPresetsForUnit(subject, unitId)`.
2. If the list is non-empty, a `<Card>` titled **"Public Presets"** (with a
   `Globe` icon) is rendered **above** the "Selected count and actions" card
   (which is the entry point of the custom builder UI).
3. Each entry renders a row with name, optional description, count, and the
   three buttons described above.
4. `Use` calls `handleUsePublicPreset` → `navigate('/quiz/.../preset?...')`
   with `presetQuestions` in router state (same shape as a regular preset).
5. `Save` calls `handleSavePublicToMyPresets` → `usePresets().createPreset(...)`
   with only the IDs that exist in the current question set (missing IDs are
   silently dropped and surfaced in a toast).
6. `Download` calls `handleDownloadPublicPreset` → produces JSON identical to
   `handleDownloadPreset` so the existing "Import Preset" button accepts it.

---

## Step-by-Step: Add a New Public Preset

1. **Pick the unit.** Open the page where you want the preset to appear and
   note the URL slugs. Example: `/unit/apcsp/algorithms/preset-builder`
   → `subject = "apcsp"`, `unitId = "algorithms"`.

2. **Collect question IDs.** Open `src/data/<subject>/<unitId>-questions.ts`
   and copy the `id: "..."` values for the questions you want in the preset.

3. **Append an entry to `publicPresets`** in `src/data/public-presets.ts`:

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

4. **Save the file.** The preset shows up the next time the build runs — no
   other file changes are required.

5. **Verify.** Navigate to the matching `…/preset-builder` URL. You should see
   the new card under **Public Presets** with the correct count.

---

## Step-by-Step: Remove or Edit a Preset

- **Edit name/description/questions:** change the relevant fields in the
  matching object. Keep `id` stable so nobody who downloaded the JSON loses
  context.
- **Remove a preset:** delete the object from `publicPresets`. Anyone who
  already clicked **Save** keeps their personal copy untouched (it lives in
  localStorage under `quiz-presets`).
- **Rename `id`:** treat this as a remove + add; don't rename in place.

---

## JSON Download Format

`Download` produces this shape (identical to user-exported presets, so it
round-trips through the existing **Import Preset** button):

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

The filename is `<sanitised_name>_preset.json`.

---

## Rules of Thumb

- **Subject + unitId must match the URL exactly** or the preset will never
  show up. Double-check against the slug in the address bar.
- **Question IDs are validated at render time**: any ID that doesn't exist in
  the current unit's question array is silently dropped when the user clicks
  **Use** or **Save**. A toast tells the user how many were skipped. This is
  by design so a renamed/removed question doesn't break the whole preset.
- **Order is preserved**: the preset card list is rendered in the order the
  presets appear in the array. Put the most useful ones first.
- **Don't bundle huge presets**: keep them under ~50 questions; large ones
  are better as `.ts` files users upload via "Add Extra Questions".
- **Custom topics** (`subject` starts with `custom-…`) are user-local and
  therefore not a valid target for public presets — those slugs change per
  user. Skip them.

---

## File Touch List (for reference)

When implementing or extending the public presets feature, only these files
are involved:

| File | Why it's touched |
|---|---|
| `src/data/public-presets.ts` | The single source of truth — add/edit/remove entries here. |
| `src/pages/PresetBuilder.tsx` | Renders the "Public Presets" card and wires up the three buttons. Already done; no changes needed for new presets. |

No new routes, no new components, no migrations. Adding a preset is a
**one-line array entry**.
