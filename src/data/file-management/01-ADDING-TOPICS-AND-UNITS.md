# Adding Topics, Units, and Subjects — Complete Step-by-Step

This is the single reference for adding any content to the CSW Studying app.

---

## Table of Contents

1. [Quick Reference: Which Files to Edit](#quick-reference)
2. [Add a Topic to an Existing Unit](#add-a-topic-to-an-existing-unit)
3. [Add a New Unit to an Existing Subject](#add-a-new-unit-to-an-existing-subject)
4. [Add a Completely New Subject](#add-a-completely-new-subject)
5. [Add Temporary Practice Topics](#add-temporary-practice-topics)
6. [Remove a Topic or Unit](#remove-a-topic-or-unit)
7. [Edge Cases and Common Errors](#edge-cases-and-common-errors)

---

## Quick Reference

| Action | Files to Edit |
|--------|---------------|
| Add topic to existing unit | 1. Create `src/data/[subject]/[topic]-questions.ts`<br>2. `src/utils/questionLoader.ts` (import + questionMap + subjectUnits)<br>3. `src/data/category-courses.ts` (add unit to course's `units` array) |
| Add new unit | Same as above |
| Add new subject | All above + `subjectTitles` in questionLoader + new course entry in `category-courses.ts` + `App.tsx` route (if new category) |
| Add temporary topic | 1. Create `src/data/temporary/[topic]-questions.ts`<br>2. `questionLoader.ts` (import + questionMap + subjectUnits.temporary)<br>3. `category-courses.ts` → `otherTemporary.units` |
| Remove topic | Reverse all the steps: delete file, remove import, remove from maps and category-courses.ts |

---

## Add a Topic to an Existing Unit

### Step 1: Create the Question File

Create `src/data/[subject]/[topic]-questions.ts`:

```typescript
import { Question } from '@/types/quiz';

export const myTopicQuestions: Question[] = [
  {
    id: '[topic]-1',
    type: 'multiple-choice',
    question: 'Your question here?',
    options: [
      { label: 'A', value: 'A', text: 'Option A' },
      { label: 'B', value: 'B', text: 'Option B' },
      { label: 'C', value: 'C', text: 'Option C' },
      { label: 'D', value: 'D', text: 'Option D' },
    ],
    correctAnswer: 'A',
    explanation: 'Explanation of the answer.',
  },
];
```

**Rules:**
- Variable name must be camelCase ending in `Questions` (e.g., `polynomialQuestions`)
- File must be named `[topic]-questions.ts` (lowercase, hyphens)
- Question IDs must be globally unique (use `[topic]-[number]` format)
- `correctAnswer` must match an option's `value` field, NOT the `label`

### Step 2: Register in questionLoader.ts

Open `src/utils/questionLoader.ts`:

1. **Add import** in the imports section:
```typescript
import { myTopicQuestions } from '@/data/[subject]/[topic]-questions';
```

2. **Add to `questionMap`**:
```typescript
'[subject]-[topic]': myTopicQuestions,
```

3. **Add to `subjectUnits`** (this is what CourseChallenge pages read):
```typescript
[subject]: [
  // ... existing units
  { id: '[topic]', name: 'Unit X - Topic Name' },
],
```

**The key format is `{subject}-{topicId}`** — this must match exactly what the routes use.

### Step 3: Add to category-courses.ts

Open `src/data/category-courses.ts` and add the unit to the correct course's `units` array:

**For AP/Universal courses:**
```typescript
export const mathApCourses: CourseEntry[] = [
  {
    id: 'precalc',
    name: 'AP Precalculus',
    subject: 'precalc',
    units: [
      // ... existing units
      { id: '[topic]', name: 'Topic Display Name' },  // ADD HERE
    ],
  },
];
```

**For school-specific courses:**
```typescript
export const scienceSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'chemistry',
      name: 'Chemistry (Massarotti)',
      subject: 'chemistry',
      units: [
        // ... existing units
        { id: '[topic]', name: 'Topic Display Name' },  // ADD HERE
      ],
    },
  ],
};
```

### Step 4: Add Images (if any)

Place images in `public/images/[subject]/` and reference as `/images/[subject]/filename.png`.

**NOTE:** You do NOT need to update CourseChallenge.tsx or CourseChallengePresetBuilder.tsx — they read from `subjectUnits` in questionLoader.ts automatically.

---

## Add a New Unit to an Existing Subject

Follow all the same steps as "Add a Topic" above. The only difference is you're adding a new entry rather than appending to an existing unit.

---

## Add a Completely New Subject

### Step 1: Create Subject Folder

Create `src/data/[newsubject]/` and add question files.

### Step 2: Register in questionLoader.ts

1. Import all question files and add to `questionMap`
2. Add new entry to `subjectUnits`:
```typescript
[newsubject]: [
  { id: 'topic1', name: 'Unit 1 - Topic Name' },
],
```
3. Add new entry to `subjectTitles`:
```typescript
[newsubject]: 'Display Name',
```

### Step 3: Add to category-courses.ts

Add a course entry to the appropriate category:
- For AP courses: add to `{category}ApCourses` array
- For school courses: add to `{category}SchoolCourses` under the school ID

### Step 4: Create or Edit Category Page (if new category)

If creating a new category page:
1. Create `src/pages/categories/[New]Category.tsx`
2. Add route in `src/App.tsx`
3. Add category card in `src/pages/Index.tsx`

---

## Add Temporary Practice Topics

Temporary topics live under Other > Temporary Practice and are meant for rotating content.

### Step 1: Create Question File

Create `src/data/temporary/[topic]-questions.ts`:

```typescript
import { Question } from '@/types/quiz';

const rawQuestions = [
  {
    type: 'multiple-choice' as const,
    question: 'Your question?',
    options: [
      { label: 'A', value: 'A', text: 'Option A' },
      { label: 'B', value: 'B', text: 'Option B' },
      { label: 'C', value: 'C', text: 'Option C' },
      { label: 'D', value: 'D', text: 'Option D' },
    ],
    correctAnswer: 'A',
    explanation: 'Why A is correct'
  },
];

export const myTopicQuestions: Question[] = rawQuestions.map((q, index) => ({
  ...q,
  id: `temp-mytopic-${index + 1}`,
}));
```

### Step 2: Register in questionLoader.ts

```typescript
import { myTopicQuestions } from '@/data/temporary/mytopic-questions';
// Add to questionMap:
'temporary-mytopic': myTopicQuestions,
// Add to subjectUnits.temporary:
{ id: 'mytopic', name: 'My Topic Name' },
```

### Step 3: Add to category-courses.ts

Find the `otherTemporary` object and add the unit:
```typescript
export const otherTemporary: CourseEntry = {
  id: 'temporary',
  name: 'Temporary Practice',
  subject: 'temporary',
  units: [
    { id: 'mytopic', name: 'My Topic Name' },  // ADD HERE
  ],
};
```

---

## Remove a Topic or Unit

### Remove a Single Topic

1. **Delete** the question file from `src/data/[subject]/`
2. **Remove** the import from `questionLoader.ts`
3. **Remove** the entry from `questionMap`
4. **Remove** from `subjectUnits` in questionLoader.ts
5. **Remove** from the course's `units` array in `category-courses.ts`
6. **Delete** any images from `public/images/[subject]/`

### Remove an Entire Subject

1. Delete the entire `src/data/[subject]/` folder
2. Remove all imports and entries from `questionLoader.ts`
3. Remove from `subjectUnits` and `subjectTitles`
4. Remove the course entry from `category-courses.ts`
5. If it had its own category page and route, remove those from `App.tsx` and `Index.tsx`
6. Delete `public/images/[subject]/` folder

---

## Edge Cases and Common Errors

### ❌ Questions don't load / empty quiz
**Cause:** Missing import in `questionLoader.ts` or mismatched key in `questionMap`
**Fix:** Verify the key format `{subject}-{topicId}` matches exactly what the route passes

### ❌ Unit doesn't appear on category page
**Cause:** Missing unit in `category-courses.ts`
**Fix:** Add the unit to the correct course's `units` array in `category-courses.ts`

### ❌ Build error: "Cannot find module"
**Cause:** Typo in import path or missing file
**Fix:** Check file exists and path matches exactly (case-sensitive)

### ❌ Duplicate question IDs
**Cause:** Two questions have the same `id` across different files
**Fix:** Use unique IDs — format `[topic]-[number]` (e.g., `polynomial-1`)

### ❌ "No questions found" error on quiz page
**Cause:** Key in `questionMap` doesn't match the route parameter
**Fix:** The `id` in `category-courses.ts` unit must match the key suffix in `questionMap`

### ❌ All answers marked wrong
**Cause:** `correctAnswer` doesn't match any option's `value`
**Fix:** `correctAnswer: "A"` must match `{ value: "A", ... }`

### ❌ Course Challenge missing topics
**Cause:** Topic not added to `subjectUnits` in `questionLoader.ts`
**Fix:** Add to the appropriate subject array in `subjectUnits`

### ❌ TypeScript error on question type
**Cause:** Using `'mc'` instead of `'multiple-choice'`
**Fix:** Must be exactly `'multiple-choice'`, `'free-response'`, `'select-all'`, or `'parts'`

### ❌ Build error: Re-export points to non-existent source file
**Cause:** A file in `src/data/real-tests/` re-exports from a source file in `src/data/` that was never created.
**Fix:** Create the missing source file as an empty stub: `export const xQuestions: Question[] = [];`. Every re-export in `real-tests/` must have a corresponding source file in `src/data/`.

---

## Key Principle

**All questions flow through `src/utils/questionLoader.ts`.** This is the single gateway. If questions aren't registered there, they don't exist to the app.

**All category page course listings come from `src/data/category-courses.ts`.** If a unit isn't listed there, it won't appear on the category page.

```
Question File → questionLoader.ts → All Pages
                                  ↗
category-courses.ts → Category Pages
```

**CourseChallenge pages read their unit lists from `questionLoader.ts`** via `getSubjectUnits()`. No more manual syncing with hardcoded `getUnits()` functions.
