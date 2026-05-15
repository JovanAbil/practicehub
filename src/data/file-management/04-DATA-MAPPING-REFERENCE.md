# Data Mapping Reference

This document shows exactly where every piece of data is connected and mapped in the app.

---

## The Data Pipeline

### Main Site
```
Question File (.ts)
  → questionLoader.ts (import + questionMap + subjectUnits + subjectTitles)
  → category-courses.ts (course units array — what shows on category pages)
    → Category Page (renders courses + units from category-courses.ts)
      → UnitDetail.tsx (reads subject/unitId from URL params)
        → Quiz.tsx, ViewAllQuestions.tsx, PresetBuilder.tsx
    → CourseChallenge.tsx (reads getSubjectUnits() from questionLoader)
    → CourseChallengePresetBuilder.tsx (reads getSubjectUnits() from questionLoader)
```

### Tests Section (Password-Protected)
```
Question File (.ts) in src/data/real-tests/
  → testsQuestionLoader.ts (import + testsQuestionMap + testsCategories)
    → TestsPage.tsx (category listing + Course Challenge links)
      → TestsUnitDetail.tsx (unit detail with cram, view all, preset builder)
        → Quiz.tsx (?source=tests), ViewAllQuestions.tsx (?source=tests)
      → CourseChallenge.tsx (via /tests/course-challenge/:subject)
```

### Custom Units (Browser localStorage)
```
User creates unit in CustomUnitsCategory.tsx
  → useCustomUnits.ts (localStorage: custom-units-data)
    → CustomUnitsCategory.tsx (list/manage units + topics)
      → CustomTopicEditor.tsx (add/edit questions)
      → Quiz.tsx (custom-{unitId} as subject)
      → CustomUnitChallenge.tsx (course challenge for custom units)
```

---

## questionLoader.ts — The Central Hub

**Location:** `src/utils/questionLoader.ts`

Contains:
- `questionMap`: Maps `{subject}-{topicId}` keys to question arrays
- `subjectUnits`: Unit lists per subject (used by CourseChallenge pages)
- `subjectTitles`: Display names per subject

### Key Functions
```typescript
getQuestions(key)        // Get questions for one topic
getQuestionMap()         // Get all questions as a map
getSubjectUnits(subject) // Get unit list for CourseChallenge pages
getSubjectTitle(subject) // Get display name for a subject
```

---

## category-courses.ts — Category Page Configuration

**Location:** `src/data/category-courses.ts`

Defines what courses and units appear on each category page:
- `{category}ApCourses`: AP/Universal courses (shown at top)
- `{category}SchoolCourses`: School-specific courses (shown in collapsible dropdowns)
- `{category}MemoryUnits`: Memory training units shown in each category
- `otherDriversEd`: Drivers Education course
- `otherTemporary`: Temporary Practice course

**IMPORTANT:** When adding a new topic, you must add the unit to BOTH `questionLoader.ts` (subjectUnits) AND `category-courses.ts` (course units array).

---

## Category Pages

| Category Page | Sources |
|---------------|---------|
| `MathCategory.tsx` | `mathApCourses`, `mathSchoolCourses`, `mathMemoryUnits` from category-courses.ts |
| `ScienceCategory.tsx` | `scienceApCourses`, `scienceSchoolCourses`, `scienceMemoryUnits` from category-courses.ts |
| `SocialCategory.tsx` | `socialApCourses`, `socialSchoolCourses` from category-courses.ts |
| `EnglishCategory.tsx` | `englishApCourses`, `englishSchoolCourses` from category-courses.ts |
| `OtherCategory.tsx` | `otherApCourses`, `otherDriversEd`, `otherTemporary`, `otherSchoolCourses` from category-courses.ts |
| `CustomUnitsCategory.tsx` | User-created custom units (localStorage) |
| `TestsPage.tsx` | `testsCategories` from testsQuestionLoader.ts (password-protected, separate loader) |

---

## UnitDetail.tsx

Reads `subject` and `unitId` from URL params, looks up questions via `getQuestionMap()`. No hardcoded unit lists — unit listing is driven by category-courses.ts via category pages.

---

## CourseChallenge.tsx & CourseChallengePresetBuilder.tsx

Both read unit lists from `getSubjectUnits()` in questionLoader.ts. Adding a unit to `subjectUnits` is all that's needed.

---

## Results.tsx — Post-Quiz Features

After completing a quiz, the results page provides:
- **Retake Quiz** — Redo the same questions
- **Targeted Practice** — Instantly redo only wrong answers (no preset download needed)
- **Download Wrong Answers** — Export wrong answers as a preset .json file
- **List FRQ Review** — Shows your answers vs correct answers in a side-by-side table

---

## App.tsx — Routes

```
# Main site
/category/:categoryId → Category pages (math, science, social, english, other, custom)
/unit/:subject/:unitId → UnitDetail page
/quiz/:subject/:unitId/:quizType → Quiz page
/view-all/:subject/:unitId → ViewAllQuestions page
/course-challenge/:subject → CourseChallenge page
/course-challenge/:subject/preset-builder → CourseChallengePresetBuilder page
/custom-unit/:unitId → CustomUnitChallenge page
/custom-unit/:unitId/preset-builder → CustomUnitChallengePresetBuilder page
/custom-topic/:unitId/:topicId → CustomTopicEditor page
/question-generator → AI Question Generator

# Informational pages
/privacy, /data, /data/proof, /updates, /how-to-use, /contributors

# Tests section (password-protected, conditional on TESTS_ENABLED)
/password → PasswordPage
/tests → TestsPage
/tests/unit/:subject/:unitId → TestsUnitDetail
/tests/view-all/:subject/:unitId → ViewAllQuestions (?source=tests)
/tests/quiz/:subject/:unitId/:quizType → Quiz (?source=tests)
/tests/course-challenge/:subject → CourseChallenge
/tests/course-challenge/:subject/preset-builder → CourseChallengePresetBuilder
```

---

## Custom Units Export Naming

- **Topic files:** `{topicname}-questions.ts`
- **Image files:** `{topicname}{number}.{ext}`
- **Metadata:** `unit-metadata.json`

---

## Last Updated

April 2026
