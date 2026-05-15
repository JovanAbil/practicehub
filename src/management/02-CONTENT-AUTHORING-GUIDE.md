# Content Authoring Guide

## Adding External Study Resources

External study resource links appear on the **main Index page**. Edit `src/data/external-study-resources.ts`:

```typescript
export const externalStudyResources: ExternalResource[] = [
  {
    title: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    description: 'Free courses on math, science, and more'
  },
];
```

---

## Overview

This guide provides step-by-step instructions for adding new courses, units, and questions to the CSW Studying application.

---

## File Structure

```
src/
├── data/
│   ├── apprecalc/           # AP Precalculus questions
│   ├── biology/             # Biology questions
│   ├── chemistry/           # Chemistry questions
│   ├── worldhistory/        # World History questions
│   ├── worldhistorykohl/    # World History (Kohl) questions
│   ├── memory/              # Memory training questions
│   ├── practice/            # Practice/English questions
│   ├── apcsp/               # AP CSP questions
│   ├── drivers/             # Drivers Education questions
│   ├── temporary/           # Temporary practice topics
│   ├── assignments/         # Homework assignments
│   ├── schools-config.ts    # School definitions + needed courses
│   ├── category-courses.ts  # Course/unit lists per category and school
│   └── study-resources.ts   # External study links
├── utils/
│   └── questionLoader.ts    # Centralized question loading + unit lists + subject titles
├── pages/
│   ├── Quiz.tsx             # Main quiz component
│   ├── Results.tsx          # Results page (targeted practice, retake, list FRQ review)
│   ├── UnitDetail.tsx       # Unit detail page
│   ├── ViewAllQuestions.tsx  # View all questions
│   ├── PresetBuilder.tsx    # Build custom practice
│   ├── CourseChallenge.tsx   # Course challenge (reads from questionLoader)
│   ├── CourseChallengePresetBuilder.tsx  # Preset builder (reads from questionLoader)
│   ├── QuestionGenerator.tsx # AI question generator
│   └── categories/          # Category pages (Math, Science, Social, English, Other, Custom Units)
└── public/
    └── images/              # Question images
```

---

## Step-by-Step: Adding a New Question Set (Topic)

### Step 1: Create the Question File

Create a new file in the appropriate subject folder:

**File:** `src/data/{subject}/{topic}-questions.ts`

```typescript
import { Question } from '@/types/quiz';

export const myTopicQuestions: Question[] = [
  {
    id: "mytopic-1",
    type: "multiple-choice",
    question: "Your question text here",
    options: [
      { label: "A", value: "A", text: "Option A" },
      { label: "B", value: "B", text: "Option B" },
      { label: "C", value: "C", text: "Option C" },
      { label: "D", value: "D", text: "Option D" }
    ],
    correctAnswer: "A",
    explanation: "Optional explanation.\\nUse \\n for line breaks in explanations."
  },
];
```

### Step 2: Add to questionLoader.ts

**File:** `src/utils/questionLoader.ts`

1. **Add the import** in the imports section:
```typescript
import { myTopicQuestions } from '@/data/{subject}/{topic}-questions';
```

2. **Add to the `questionMap`**:
```typescript
'{subject}-{topicId}': myTopicQuestions,
```

3. **Add to the `subjectUnits`** (for CourseChallenge pages):
```typescript
[subject]: [
  // ... existing units
  { id: '{topicId}', name: 'Unit X - Topic Name' },
],
```

### Step 3: Add Unit to category-courses.ts

**File:** `src/data/category-courses.ts`

Find the correct course entry (AP or school-specific) and add the unit to its `units` array:

```typescript
// For an AP/Universal course:
export const scienceApCourses: CourseEntry[] = [
  {
    id: 'ap-bio',
    name: 'AP Biology',
    subject: 'ap-bio',
    units: [
      // ... existing units
      { id: 'mytopic', name: 'My Topic' },  // ADD HERE
    ],
  },
];

// For a school-specific course:
export const scienceSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'chemistry',
      name: 'Chemistry (Massarotti)',
      subject: 'chemistry',
      units: [
        // ... existing units
        { id: 'mytopic', name: 'My Topic' },  // ADD HERE
      ],
    },
  ],
};
```

### Step 4: Add Images (if any)

Place images in `public/images/{subject}/` and reference as `/images/{subject}/filename.png`.

**That's it!** CourseChallenge and CourseChallengePresetBuilder read from `subjectUnits` in questionLoader.ts automatically — no manual updates needed.

---

## Step-by-Step: Adding a New Subject/Course

### Step 1: Create the Subject Folder

```bash
mkdir src/data/newsubject
```

### Step 2: Create Question Files

Create `.ts` files for each unit in the new subject folder.

### Step 3: Add to questionLoader.ts

1. Import all question files and add them to `questionMap`
2. Add new entry to `subjectUnits` with all units
3. Add new entry to `subjectTitles` with the display name

### Step 4: Add to category-courses.ts

Add the course to the appropriate category arrays:
- For AP courses: add to `{category}ApCourses` array
- For school courses: add to `{category}SchoolCourses` under the school ID

### Step 5: Add Route (App.tsx)

If creating a new category:
```typescript
<Route path="/category/newcategory" element={<NewCategory />} />
```

### Step 6: Add to Index Page (if new category)

Add to the categories array in `src/pages/Index.tsx`.

---

## Adding Images

Place images in `public/images/{subject}/` and reference as `/images/{subject}/filename.png`.

### Image Naming Convention
- Use lowercase
- Use hyphens, not spaces
- Include topic prefix: `polynomial1.png`, `polynomial2.png`

---

## Adding Study Resources

**File:** `src/data/study-resources.ts`

Maps `{subject}-{unitId}` keys to arrays of `{ title, url }` links.

---

## Naming Conventions

| Item | Format | Example |
|------|--------|---------|
| File name | `{topic}-questions.ts` | `polynomial-questions.ts` |
| Variable name | `{topic}Questions` | `polynomialQuestions` |
| Question ID | `{topic}-{number}` | `polynomial-1` |
| Image file | `{topic}{number}.png` | `polynomial1.png` |

---

## Common Mistakes

| Mistake | Result | Fix |
|---------|--------|-----|
| Missing import in questionLoader.ts | Empty quiz | Add import + questionMap entry |
| Missing unit in category-courses.ts | Unit doesn't appear in category page | Add to the correct course's `units` array |
| Mismatched keys | "No questions found" | Key must be `{subject}-{topicId}` |
| Duplicate question IDs | Data corruption | Use unique IDs globally |
| Wrong correctAnswer value | Always marked wrong | Must match option `value`, not `label` |
| Image path starts with `src/` | Image doesn't load | Use `/images/...` (public folder) |

---

## Checklist for Adding New Content

- [ ] Create question file with proper format
- [ ] Add import to `questionLoader.ts`
- [ ] Add to `questionMap` in `questionLoader.ts`
- [ ] Add to `subjectUnits` in `questionLoader.ts`
- [ ] Add unit to `category-courses.ts` (correct course's `units` array)
- [ ] Add images to `public/images/{subject}/` (if any)
- [ ] Test the quiz works

---

## Last Updated

April 2026
