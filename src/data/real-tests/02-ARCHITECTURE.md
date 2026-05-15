# Real Tests Architecture

## System Overview

The real tests system is a **password-protected, fully isolated data layer** with its own question loader, pages, and quiz flow.

## Data Flow

```
User visits /tests
  → Redirected to /password if not authenticated
  → Enters password (checked against password-config.ts)
  → sessionStorage stores 'tests-authenticated' = 'true'
  → /tests page renders using testsQuestionLoader.ts
  → Clicking a unit → /tests/unit/:subject/:unitId (TestsUnitDetail.tsx)
  → Cram Study → /tests/quiz/:subject/:unitId/cram?source=tests
  → View All → /tests/view-all/:subject/:unitId?source=tests
  → Quiz.tsx / ViewAllQuestions.tsx detect source=tests → use testsQuestionMap
```

## Key Files

| File | Purpose |
|------|---------|
| `src/data/real-tests/password-config.ts` | Single source of truth for the password |
| `src/data/real-tests/testsQuestionLoader.ts` | Loads all test questions, defines categories and question map |
| `src/pages/PasswordPage.tsx` | Password entry UI, stores auth in sessionStorage |
| `src/pages/TestsPage.tsx` | Category listing (main page for tests) |
| `src/pages/TestsUnitDetail.tsx` | Unit detail page with quiz/view-all links |

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/password` | `PasswordPage` | Password entry gate |
| `/tests` | `TestsPage` | Category listing |
| `/tests/unit/:subject/:unitId` | `TestsUnitDetail` | Unit detail with practice options |
| `/tests/view-all/:subject/:unitId` | `ViewAllQuestions` | View all questions (with `?source=tests`) |
| `/tests/quiz/:subject/:unitId/:quizType` | `Quiz` | Take quiz (with `?source=tests`) |

## How `?source=tests` Works

`Quiz.tsx` and `ViewAllQuestions.tsx` check for the `source=tests` search parameter:
- If present: use `testsQuestionMap` from `testsQuestionLoader.ts`
- If absent: use `getQuestionMap()` from the main `questionLoader.ts`

This means the exact same Quiz and ViewAllQuestions components serve both the main site and the tests section, but with completely different data sources.

## Security Model

- **Client-side only**: The password check is purely client-side using sessionStorage
- **Session-scoped**: Authentication resets when the tab/browser closes
- **No server protection**: The data is bundled in JavaScript — this is a convenience gate, not a security boundary

## Relationship to Main Site

| Aspect | Main Site | Tests Section |
|--------|-----------|---------------|
| Question loader | `questionLoader.ts` | `testsQuestionLoader.ts` |
| Category pages | 6 category pages | Single `TestsPage.tsx` |
| Unit detail | `UnitDetail.tsx` | `TestsUnitDetail.tsx` |
| Quiz component | `Quiz.tsx` (shared) | `Quiz.tsx` with `?source=tests` |
| Data location | `src/data/{subject}/` | `src/data/real-tests/{subject}/` |
| Access | Public | Password-protected |

## Adding Content

See `01-ADDING-TESTS.md` for step-by-step instructions on adding units, subjects, and changing the password.
