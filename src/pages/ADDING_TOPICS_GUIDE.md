# Guide: Adding Topics and Units to CSW Studying

This guide explains how to add new topics, units, and subjects to the study app.

---

## Table of Contents
1. [File Structure Overview](#file-structure-overview)
2. [Adding a Topic to an Existing Unit](#adding-a-topic-to-an-existing-unit)
3. [Adding a New Unit to an Existing Subject](#adding-a-new-unit-to-an-existing-subject)
4. [Adding a Completely New Subject](#adding-a-completely-new-subject)
5. [Question Format Reference](#question-format-reference)

---

## File Structure Overview

```
src/
├── data/
│   ├── [subject]/
│   │   ├── [topic]-questions.ts    # Question files
│   │   └── info.md                 # Subject info
│   ├── schools-config.ts           # School definitions
│   ├── category-courses.ts         # Course/unit lists per category
│   └── file-management/
│       └── 03-QUESTION-FORMATTING.md  # Question formatting reference
├── utils/
│   └── questionLoader.ts           # Centralized question loading + unit lists (IMPORTANT!)
├── pages/
│   ├── Quiz.tsx                    # Main quiz component
│   ├── UnitDetail.tsx              # Unit detail page
│   ├── ViewAllQuestions.tsx        # View all questions
│   ├── PresetBuilder.tsx           # Build custom practice
│   ├── CourseChallenge.tsx         # Course challenge (reads from questionLoader)
│   ├── CourseChallengePresetBuilder.tsx # Preset builder (reads from questionLoader)
│   ├── QuestionGenerator.tsx       # AI question generator
│   └── categories/
│       ├── MathCategory.tsx
│       ├── ScienceCategory.tsx
│       ├── SocialCategory.tsx
│       ├── EnglishCategory.tsx
│       ├── OtherCategory.tsx
│       └── CustomUnitsCategory.tsx
└── types/
    └── quiz.ts                     # Question type definitions
```

---

## Adding a Topic to an Existing Unit

### Step 1: Create the Questions File

Create a new file in `src/data/[subject]/[topic]-questions.ts`:

```typescript
import { Question } from '@/types/quiz';

export const [topicName]Questions: Question[] = [
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
  // Add more questions...
];
```

### Step 2: Add to questionLoader.ts

Open `src/utils/questionLoader.ts` and:

1. **Add the import** in the imports section:
```typescript
import { [topicName]Questions } from '@/data/[subject]/[topic]-questions';
```

2. **Add to the `questionMap`**:
```typescript
'[subject]-[topic]': [topicName]Questions,
```

3. **Add to the `subjectUnits` map** (for CourseChallenge pages):
```typescript
[subject]: [
  // ... existing units
  { id: '[topic]', name: 'Unit X - Topic Name' },
],
```

### Step 3: Add to category-courses.ts

Open `src/data/category-courses.ts` and add the unit to the correct course's `units` array.

For school-specific courses, find the school under `{category}SchoolCourses`:
```typescript
export const scienceSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'chemistry',
      subject: 'chemistry',
      units: [
        // ... existing units
        { id: '[topic]', name: 'Topic Name' },  // ADD HERE
      ],
    },
  ],
};
```

### Step 4: Add Images (if any)

Place images in `public/images/[subject]/` and reference as `/images/[subject]/filename.png`.

---

## Adding a New Unit to an Existing Subject

Follow all the same steps as "Adding a Topic" above.

---

## Adding a Completely New Subject

### Step 1: Create Subject Folder and Files

1. Create folder: `src/data/[newsubject]/`
2. Create an `info.md` file with subject description
3. Create topic question files

### Step 2: Add to questionLoader.ts

1. Import all question files and add to `questionMap`
2. Add a new entry to `subjectUnits` with all units
3. Add a new entry to `subjectTitles` with the display name

### Step 3: Add to category-courses.ts

Add the course to the appropriate category:
- AP courses: add to `{category}ApCourses` array
- School courses: add to `{category}SchoolCourses` under the school ID

### Step 4: Create/Update Category Page (if new category)

If creating a new category page:
1. Create `src/pages/categories/[New]Category.tsx`
2. Add route in `src/App.tsx`
3. Add category card in `src/pages/Index.tsx`

---

## Question Format Reference

### Multiple Choice Question

```typescript
{
  id: 'unique-id',
  type: 'multiple-choice',
  question: 'What is the question?',
  options: [
    { label: 'A', value: 'A', text: 'Answer option A' },
    { label: 'B', value: 'B', text: 'Answer option B' },
    { label: 'C', value: 'C', text: 'Answer option C' },
    { label: 'D', value: 'D', text: 'Answer option D' },
  ],
  correctAnswer: 'A',
  explanation: 'Why this is correct...',
  image: '/images/subject/image.png', // Optional
}
```

### Free Response Question

```typescript
{
  id: 'unique-id',
  type: 'free-response',
  question: 'What is the answer?',
  correctAnswer: 'The expected answer',
  explanation: 'Explanation of the answer.',
}
```

### Select All That Apply Question

```typescript
{
  id: 'unique-id',
  type: 'select-all',
  question: 'Which of the following are correct?',
  options: [
    { label: 'A', value: 'A', text: 'Option A' },
    { label: 'B', value: 'B', text: 'Option B' },
    { label: 'C', value: 'C', text: 'Option C' },
    { label: 'D', value: 'D', text: 'Option D' },
  ],
  correctAnswers: ['A', 'C'],
  explanation: 'A and C are correct because...',
}
```

### Parts (Multi-Part) Question

```typescript
{
  id: 'unique-id',
  type: 'parts',
  question: 'Main question stem shown above all parts',
  parts: [
    {
      label: 'a',
      type: 'free-response',
      question: 'Part A question?',
      correctAnswer: 'Answer for part A',
    },
    {
      label: 'b',
      type: 'multiple-choice',
      question: 'Part B question?',
      options: [
        { label: 'A', value: 'A', text: 'Option A' },
        { label: 'B', value: 'B', text: 'Option B' },
      ],
      correctAnswer: 'A',
    },
  ],
}
```

### With Table

```typescript
{
  id: 'unique-id',
  type: 'multiple-choice',
  question: 'Based on the table...',
  table: {
    headers: ['Column 1', 'Column 2'],
    rows: [['Data', 'Value']],
  },
  options: [/* ... */],
  correctAnswer: 'A',
}
```

### With Math (LaTeX)

Use `$$...$$` for display math or `$...$` for inline math:

```typescript
{
  id: 'math-1',
  type: 'free-response',
  question: 'Solve: $$\\frac{x^2 + 1}{2}$$',
  correctAnswer: '$x = 5$',
  explanation: 'The solution is $$x = 5$$ because...',
}
```

See [03-QUESTION-FORMATTING.md](/src/data/file-management/03-QUESTION-FORMATTING.md) for complete formatting reference.

---

## Files to Edit Summary

| Action | Files to Edit |
|--------|---------------|
| Add topic to existing unit | 1. Create `[topic]-questions.ts`<br>2. `questionLoader.ts` (import + questionMap + subjectUnits)<br>3. `category-courses.ts` (add unit to course) |
| Add new unit | Same as above |
| Add new subject | 1. Create `src/data/[subject]/` folder<br>2. `questionLoader.ts` (import + questionMap + subjectUnits + subjectTitles)<br>3. `category-courses.ts` (add course entry)<br>4. `App.tsx` route (if new category) |

---

## Tips

1. **Question IDs**: Use format `[topic]-[number]` (e.g., `biochem-1`)
2. **Images**: Store in `public/images/[subject]/` folder
3. **LaTeX**: Use KaTeX syntax (see 03-QUESTION-FORMATTING.md)
4. **Always use questionLoader**: Never import questions directly — use `getQuestions()` or `getQuestionMap()`
5. **CourseChallenge is automatic**: Adding to `subjectUnits` in questionLoader.ts is enough — no more editing CourseChallenge.tsx manually
6. **True/False**: Use MCQ with 2 options (True/False). The custom editor has a T/F preset button for this.
7. **category-courses.ts**: Always add the unit to the correct course's `units` array so it appears on the category page
