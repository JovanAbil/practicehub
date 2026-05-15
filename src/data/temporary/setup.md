# Temporary Practice — Setup Guide

This guide explains how to add, modify, or remove topics in the **Temporary Practice** unit under the "Other" category.

---

## Overview

The Temporary Practice unit works exactly like every other built-in subject (Memory Training, Chemistry, etc.). The difference is it's meant for short-lived, rotating content — things you want to practice temporarily before removing.

---

## File Structure

```
src/data/temporary/
├── setup.md              ← This file
├── info.md               ← Unit metadata (optional notes)
├── topic1-questions.ts   ← Your first topic file
├── topic2-questions.ts   ← Your second topic file (add as many as needed)
└── ...
```

---

## How to Add a New Topic

### Step 1: Create the Question File

Create a new file in `src/data/temporary/` named `{topicname}-questions.ts`.

Use this template:

```typescript
import { Question } from '@/types/quiz';

// Questions array - IDs will be generated dynamically
const rawQuestions = [
  {
    type: 'multiple-choice' as const,
    question: 'Your question text here?',
    options: [
      { label: 'A', value: 'A', text: 'Option A text' },
      { label: 'B', value: 'B', text: 'Option B text' },
      { label: 'C', value: 'C', text: 'Option C text' },
      { label: 'D', value: 'D', text: 'Option D text' },
    ],
    correctAnswer: 'A',
    explanation: 'Why A is correct'
  },
  // For Free Response Questions (FRQ):
  {
    type: 'free-response' as const,
    question: 'What is the answer to this?',
    correctAnswer: 'The answer',
    explanation: 'Explanation of the answer'
  },
  // For questions with images:
  {
    type: 'multiple-choice' as const,
    question: 'What does this image show?',
    image: '/images/temporary/myimage.png',  // Place image in public/images/temporary/
    options: [
      { label: 'A', value: 'A', text: 'Option A' },
      { label: 'B', value: 'B', text: 'Option B' },
      { label: 'C', value: 'C', text: 'Option C' },
      { label: 'D', value: 'D', text: 'Option D' },
    ],
    correctAnswer: 'B',
    explanation: 'Explanation here'
  },
];

// Generate IDs dynamically
export const topic1Questions: Question[] = rawQuestions.map((q, index) => ({
  ...q,
  id: `temp-topic1-${index + 1}`,
}));
```

**Important**: Change `topic1Questions` to match your topic name (e.g., `vocabQuestions`, `mathReviewQuestions`).

### Step 2: Register in questionLoader.ts

Open `src/utils/questionLoader.ts` and:

1. **Add the import** at the top with the other temporary imports:
   ```typescript
   import { topic1Questions } from '@/data/temporary/topic1-questions';
   ```

2. **Add to `realDataMap`**:
   ```typescript
   'temporary-topic1': topic1Questions,
   ```

### Step 3: Register in OtherCategory.tsx

Open `src/pages/categories/OtherCategory.tsx` and find the `builtInSubjects` array. Add your topic to the `temporary` subject's `units` array:

```typescript
{
  id: 'temporary',
  name: 'Temporary Practice',
  units: [
    { id: 'topic1', name: 'Your Topic Name' },
    // Add more topics here
  ],
},
```

---

## How to Remove a Topic

1. Delete the question file from `src/data/temporary/`
2. Remove the import from `src/utils/questionLoader.ts`
3. Remove the entry from `realDataMap` in `questionLoader.ts`
4. Remove from `units` array in `OtherCategory.tsx`

---

## Question Types

### Multiple Choice (MCQ)
```typescript
{
  type: 'multiple-choice' as const,
  question: 'Question text',
  options: [
    { label: 'A', value: 'A', text: 'Option text' },
    // ... up to 4 options
  ],
  correctAnswer: 'A',  // Must match one option's value
  explanation: 'Why this is correct'
}
```

### Free Response (FRQ)
```typescript
{
  type: 'free-response' as const,
  question: 'Question text',
  correctAnswer: 'Expected answer',
  explanation: 'Explanation'
}
```

### With Math (LaTeX)
Use `$...$` for inline math in questions, options, or explanations:
```typescript
{
  question: 'What is $\\frac{1}{2} + \\frac{1}{3}$?',
  correctAnswer: '$\\frac{5}{6}$',
  explanation: 'Find common denominator: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$'
}
```

### With Line Breaks
Use `\n` between text/math blocks for line breaks:
```typescript
{
  explanation: 'Step 1: Do this\nStep 2: Do that\nStep 3: Get answer'
}
```

---

## ID Convention

Use the pattern: `temp-{topicname}-{number}`

Example: `temp-vocab-1`, `temp-vocab-2`, `temp-mathreview-1`

This prevents ID collisions with other subjects.
