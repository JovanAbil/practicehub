# Adding Tests to the Real Tests Section

This guide explains how to add, modify, and manage test data in the password-protected `/tests` section.

## Overview

The `/tests` page is a **completely separate, password-protected section** with its own:
- Question loader (`src/data/real-tests/testsQuestionLoader.ts`)
- Unit detail page (`src/pages/TestsUnitDetail.tsx`)
- Quiz and view-all routes (via `?source=tests` parameter)

It does NOT share any data loading with the main site. The `/tests` section can be enabled/disabled via the `TESTS_ENABLED` flag in `password-config.ts`.

## File Structure

```
src/data/real-tests/
├── password-config.ts          # Password for /tests access
├── testsQuestionLoader.ts      # Question loader (categories + question map)
├── 01-ADDING-TESTS.md          # This file
├── 02-ARCHITECTURE.md          # Architecture overview
├── chemistry/
│   ├── metric-questions.ts     # Re-exports from main data (or custom)
│   ├── atomic-questions.ts
│   ├── compounds-questions.ts
│   ├── gases-questions.ts
│   ├── solutions-questions.ts
│   ├── reactions-questions.ts
│   ├── stoichiometry-questions.ts
│   └── acidbases-questions.ts
├── biology/
│   ├── biochemistry-questions.ts
│   ├── cellstructure-questions.ts
│   ├── cellenergetics-questions.ts
│   ├── cellgrowth-questions.ts
│   ├── genetics-questions.ts
│   ├── molecular-questions.ts
│   ├── evolution-questions.ts
│   └── ecology-questions.ts
└── worldhistory/
    ├── religions-questions.ts
    ├── islam-questions.ts
    ├── renaissance-questions.ts
    ├── protestant-questions.ts
    └── world-history-unit5.ts through unit11.ts

src/pages/
├── PasswordPage.tsx            # Password entry + auth check
├── TestsPage.tsx               # Category listing (like Index)
└── TestsUnitDetail.tsx         # Unit detail with quiz links
```

## How Data Duplication Works

Each file in `real-tests/` currently **re-exports** from the main data:

```ts
export { metricQuestions } from '@/data/chemistry/metric-questions';
```

This means tests show the same questions as the main site. To make a topic have **different** test questions, replace the re-export with your own array:

```ts
import { Question } from '@/types/quiz';

export const metricQuestions: Question[] = [
  {
    id: 'test-metric-1',
    type: 'multiple-choice',
    question: 'Your custom test question...',
    options: [
      { label: 'A', value: 'A', text: 'Option A' },
      { label: 'B', value: 'B', text: 'Option B' },
      { label: 'C', value: 'C', text: 'Option C' },
      { label: 'D', value: 'D', text: 'Option D' },
    ],
    correctAnswer: 'A',
    explanation: 'Why A is correct.',
  },
];
```

---

## Adding a New Unit to an Existing Subject

1. **Create the question file** in the appropriate subject folder:
   ```
   src/data/real-tests/chemistry/newunit-questions.ts
   ```

2. **Open `src/data/real-tests/testsQuestionLoader.ts`**

3. **Add the import** at the top:
   ```ts
   import { newunitQuestions } from '@/data/real-tests/chemistry/newunit-questions';
   ```

4. **Add the unit to `testsCategories`** under the correct subject:
   ```ts
   { id: 'newunit', name: 'New Unit Name' },
   ```

5. **Add the mapping in `testsQuestionMap`**:
   ```ts
   'chemistry-newunit': newunitQuestions,
   ```

That's it — no other files need editing. The routes are parameterized.

---

## Adding a New Subject (Category)

1. Create a new folder: `src/data/real-tests/newsubject/`
2. Add question files in that folder
3. In `testsQuestionLoader.ts`:
   - Add imports for all question files
   - Add a new entry to `testsCategories`:
     ```ts
     {
       id: 'newsubject',
       name: 'New Subject',
       color: 'science', // or 'social', 'math', etc.
       units: [
         { id: 'unit1', name: 'Unit 1 Name' },
       ],
     },
     ```
   - Add mappings to `testsQuestionMap`:
     ```ts
     'newsubject-unit1': unit1Questions,
     ```
4. In `src/pages/TestsPage.tsx`, add icon mapping in `getIcon()` if needed

---

## Removing a Unit or Subject

1. Delete the question file(s) from `src/data/real-tests/`
2. Remove the import(s) from `testsQuestionLoader.ts`
3. Remove from `testsCategories` and `testsQuestionMap`

No other files need editing.

---

## Changing the Password

Edit `src/data/real-tests/password-config.ts`:

```ts
export const TESTS_PASSWORD = 'your-new-password';
```

---

## How the Quiz Flow Works

1. User enters password at `/password` → stored in `sessionStorage`
2. `/tests` page shows categories from `testsCategories`
3. Clicking a unit goes to `/tests/unit/:subject/:unitId` → `TestsUnitDetail.tsx`
4. Cram/View-All links include `?source=tests` in the URL
5. `Quiz.tsx` and `ViewAllQuestions.tsx` check for `source=tests` param
6. When `source=tests`, they use `testsQuestionMap` instead of the main `getQuestionMap()`

This means the tests section is **fully isolated** from the main site's data.

---

## Important Notes

- The password is stored client-side (`sessionStorage`) and resets when the tab closes
- Adding data here does NOT affect the main site's questions
- The main site's fake/real switching does NOT apply to tests
- Question IDs should be unique — if re-exporting from main data, they share IDs (which is fine since they're the same questions)
- **List FRQs**: Free-response questions support a `listAnswers` field (array of strings). When set, the quiz shows input blanks and after submission displays a side-by-side comparison table. See `src/data/file-management/03-QUESTION-FORMATTING.md` for syntax.
