# State & Storage Documentation

## Overview

The CSW Studying application uses browser localStorage for all persistent data. No backend database is used. This document describes how state is managed and when data is read/written.

---

## LocalStorage Keys

| Key | Purpose | Hook/File |
|-----|---------|-----------|
| `quiz-wrong-answers` | Stores questions answered incorrectly | `useWrongAnswers.ts` |
| `quiz-presets` | Stores saved question presets | `usePresets.ts` |
| `custom-units-data` | Stores user-created units and topics | `useCustomUnits.ts` |
| `in-progress-quiz-v1` | Stores quiz progress for resume functionality | `inProgressQuizStorage.ts` |
| `imported-course-questions-{subject}` | Stores imported question sets per subject | `customUnitsExport.ts` |
| `terms-accepted` | Whether user accepted terms of service | `TermsOfServiceModal.tsx` |
| `cookie-consent` | Cookie consent status | `CookieConsentBanner.tsx` |
| `theme` | Light/dark theme preference | `useTheme.ts` |
| `debug-mode` | Debug mode toggle | `useDebugMode.ts` |
| `selected-school-id` | Currently selected school for category filtering | `schools-config.ts` |
| `popup-settings` | User preferences for popup visibility | `usePopupSettings.ts` |

## SessionStorage Keys

| Key | Purpose | File |
|-----|---------|------|
| `tests-authenticated` | Whether user has entered the /tests password this session | `PasswordPage.tsx` |

---

## Centralized Site Statistics

**File:** `src/data/site-stats.ts`

Site statistics (visitors, pageviews, last updated) are stored in a single shared config file. All pages that display stats import from this file:

- `src/pages/Index.tsx` — Stats card on the main page
- `src/pages/DataStatistics.tsx` — Full stats page
- `src/components/CreditsSection.tsx` — Stats in the credits section

**To update stats:** Edit only `src/data/site-stats.ts`. All pages update automatically.

---

## State Initialization

### 1. Wrong Answers (`useWrongAnswers.ts`)

**Storage Key:** `quiz-wrong-answers`

**Structure:**
```typescript
{
  "precalc": {
    "polynomial": [
      {
        questionId: "polynomial-1",
        question: { /* full Question object */ },
        timestamp: 1699000000000
      }
    ],
    "course-challenge": [...]
  },
  "chemistry": {...}
}
```

**Note:** Wrong answers include both questions answered incorrectly AND questions that were skipped (not done). Both are saved for targeted practice.
```

**Initialization:**
- Loaded from localStorage on component mount via `useEffect`
- If no data exists or parsing fails, defaults to empty object `{}`

**When Data is Written:**
- **On quiz completion** (`Results.tsx`): Wrong answers are saved when quiz results are displayed
- Replaces previous wrong answers for that unit (doesn't append)

**Read Triggers:**
- Category pages read wrong count for "Targeted Practice" button
- Targeted practice quiz reads wrong questions to create quiz

---

### 2. Presets (`usePresets.ts`)

**Storage Key:** `quiz-presets`

**Structure:**
```typescript
{
  "preset-1699000000000-abc123": {
    id: "preset-1699000000000-abc123",
    name: "My Preset",
    subject: "precalc",
    unitId: "polynomial",
    questionIds: ["polynomial-1", "polynomial-5", "polynomial-10"],
    createdAt: 1699000000000,
    updatedAt: 1699000000000
  }
}
```

**Initialization:**
- Loaded from localStorage on mount
- Defaults to empty object `{}`

**When Data is Written:**
- **Create:** When user saves a new preset in PresetBuilder
- **Update:** When user modifies and saves an existing preset
- **Delete:** When user deletes a preset

---

### 3. Custom Units (`useCustomUnits.ts`)

**Storage Key:** `custom-units-data`

**Structure:**
```typescript
{
  units: [
    {
      id: "custom-1699000000000-abc123",
      name: "My Custom Unit",
      teacherName: "Mr. Smith",
      subject: "Chemistry",
      topics: [
        {
          id: "custom-1699000001000-def456",
          name: "Topic 1",
          mathEnabled: true,
          questions: [/* Question objects */]
        }
      ]
    }
  ]
}
```

**Initialization:**
- Loaded from localStorage on mount
- Defaults to `{ units: [] }`

**When Data is Written:**
- **addUnit:** Creates new unit
- **updateUnit:** Renames unit or updates metadata
- **deleteUnit:** Removes unit and all its topics
- **addTopic:** Adds topic to unit
- **updateTopic:** Updates topic properties or questions
- **deleteTopic:** Removes topic from unit
- **combineTopics:** Merges selected source topics' questions into a target topic, then removes the source topics

---

### 4. In-Progress Quiz (`inProgressQuizStorage.ts`)

**Storage Key:** `in-progress-quiz-v1`

**Structure:**
```typescript
{
  "precalc|polynomial|cram": {
    version: 1,
    routeKey: "precalc|polynomial|cram",
    updatedAt: 1699000000000,
    questions: [/* Question objects */],
    attempts: [/* QuizAttempt objects */],
    currentIndex: 5,
    currentAnswer: "B",
    isSubmitted: false,
    showGrading: false,
    timerSeconds: 342,
    meta: { subject: "precalc", unitId: "polynomial", quizType: "cram" }
  },
  "precalc|polynomial|preset|preset-1699000000000-abc123": {
    version: 1,
    routeKey: "precalc|polynomial|preset|preset-1699000000000-abc123",
    updatedAt: 1699000001000,
    questions: [/* Question objects */],
    attempts: [/* QuizAttempt objects */],
    currentIndex: 2,
    currentAnswer: "",
    isSubmitted: false,
    showGrading: false,
    timerSeconds: 120,
    meta: { subject: "precalc", unitId: "polynomial", quizType: "preset" }
  }
}
```

**Route Key Patterns:**
- Standard quizzes: `{subject}|{unitId}|{quizType}` (e.g., `precalc|polynomial|cram`)
- Preset quizzes: `{subject}|{unitId}|preset|{presetId}` (e.g., `precalc|polynomial|preset|preset-123`)

**Key Functions:**
```typescript
buildRouteKey(subject, unitId, quizType): string
loadInProgressQuiz(routeKey): InProgressQuizState | null
hasInProgressQuiz(routeKey): boolean
saveInProgressQuiz(state): void
clearInProgressQuiz(routeKey): void
```

**Initialization:**
- Loaded when Quiz.tsx mounts
- If valid saved state exists and user hasn't explicitly started new attempt, progress is restored
- PresetBuilder.tsx checks for in-progress preset quizzes to show "Resume" button

**When Data is Written:**
- **On every quiz state change:** Questions, attempts, index, timer, etc. are auto-saved
- **On quiz completion:** Entry is deleted (completed quizzes shouldn't be resumable)
- **On explicit new attempt:** Entry is deleted before starting fresh

**Features:**
- Allows users to leave and resume quizzes (including preset quizzes)
- Preserves timer state
- Route-specific (different quizzes have separate saved states)
- Preset quizzes: Each preset has its own saved state (identified by preset ID)
- PresetBuilder shows "Resume" button for presets with in-progress quizzes

---

### 5. Imported Course Questions (`customUnitsExport.ts`)

**Storage Key:** `imported-course-questions-{subject}`

**Structure:**
```typescript
[
  {
    id: "imported-1699000000000-abc123",
    name: "exponential",
    questions: [/* Question objects */],
    importedAt: 1699000000000
  }
]
```

**Initialization:**
- Loaded lazily when CourseChallenge page loads

**When Data is Written:**
- **saveImportedQuestions:** When user uploads a .ts question file
- **removeImportedQuestions:** When user removes an imported set

---

### 6. School Selection (`schools-config.ts`)

**Storage Key:** `selected-school-id`

**Structure:** Simple string value (e.g., `"csw"`)

**Initialization:**
- Read from localStorage when category pages load
- If no school selected and multiple schools exist, a selection dialog appears

**When Data is Written:**
- When user selects a school from the SchoolSelector dialog
- When user clears their school selection

---

## Centralized Question Loading

### Main Site — `src/utils/questionLoader.ts`

All main-site questions are loaded through this utility.

**Key Functions:**
```typescript
getQuestions(questionKey: string): Question[]
getQuestionMap(): Record<string, Question[]>
getSubjectUnits(subject: string): { id: string; name: string }[]
getSubjectTitle(subject: string): string
```

**Components Using This:**
- `Quiz.tsx` (when `source` param is NOT `tests`)
- `ViewAllQuestions.tsx` (when `source` param is NOT `tests`)
- `UnitDetail.tsx`
- `PresetBuilder.tsx`
- `CourseChallengePresetBuilder.tsx`

### Tests Section — `src/data/real-tests/testsQuestionLoader.ts`

Completely separate question loader for the password-protected `/tests` section.

**Key Exports:**
```typescript
testsCategories: Array<{ id, name, color, units }>  // Category/unit definitions
testsQuestionMap: Record<string, Question[]>          // Question map
getTestQuestions(questionKey: string): Question[]      // Get questions for one topic
```

**Components Using This:**
- `Quiz.tsx` (when `?source=tests` is in URL)
- `ViewAllQuestions.tsx` (when `?source=tests` is in URL)
- `TestsPage.tsx`
- `TestsUnitDetail.tsx`

---

## Save Triggers Summary

| Action | What is Saved | When |
|--------|---------------|------|
| Complete a quiz | Wrong answers | On Results page load |
| Any quiz interaction | In-progress quiz state | On every state change |
| Save preset | Preset data | Button click |
| Update preset | Preset data | Button click |
| Delete preset | Remove from storage | Button click |
| Create custom unit | Unit data | Button click |
| Add/edit custom topic | Topic data | Button click |
| Combine topics | Merged topic data | Button click (Combine dialog) |
| Import question file | Imported questions | File upload complete |
| Accept terms | Terms accepted flag | Button click |
| Set cookie consent | Consent status | Button click |
| Toggle theme | Theme preference | Toggle change |
| Select school | School ID | School selector dialog |

---

## Storage Limits & User Guidance

### Browser Storage Limit

Custom units use browser localStorage, which has a **5 MB limit** across all data for the site.

**Visual Indicator:** The `StorageUsageBar` component displays current usage:
- Green bar (< 70%): Normal usage
- Yellow bar (70-90%): Approaching limit
- Red bar + warning (> 90%): At limit, may fail to save

### When Storage is Full

Users will see a prominent alert with these instructions:

1. **Download custom courses** - Export units as .zip files before clearing data
2. **Delete unused content** - Remove old topics or units no longer needed
3. **Clear browser site data** - If completely full, clear site data and re-import

---

## Reset/Export Behavior

### Export Custom Unit

**Function:** `downloadUnit(unit: CustomUnit)` in `customUnitsExport.ts`

Creates a .zip file containing:
- `src/data/{unit-name}/index.ts` - Unit metadata
- `src/data/{unit-name}/{topic}-questions.ts` - Topic question files
- `public/images/{unit-name}/` - Extracted images (including MCQ option images)
- `README.md` - Import instructions

### Export Single Topic

**Function:** `downloadTopic(topic: CustomTopic, unitName: string)`

Downloads a single `.ts` file with all questions.

---

## Debugging Storage Issues

### View Current Storage
```javascript
// In browser console:
Object.keys(localStorage).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});
```

### Clear Specific Key
```javascript
localStorage.removeItem('quiz-wrong-answers');
```

### Clear All Site Data
```javascript
localStorage.clear();
```

---

## Last Updated

April 2026
