# Data Schema Documentation

## Overview

This document describes the complete data structures used for courses, questions, and related entities in the Practice Hub application.

---

## Question Types

The application supports four question types, defined in `src/types/quiz.ts`.

### 1. Multiple Choice Question

```typescript
interface MultipleChoiceQuestion {
  id: string;                    // REQUIRED - Unique identifier (e.g., "polynomial-1")
  type: 'multiple-choice';       // REQUIRED - Must be exactly 'multiple-choice'
  question: string;              // REQUIRED - The question text (supports LaTeX with $...$)
  options: {                     // REQUIRED - Array of answer options
    label: string;               // Display label (e.g., "A", "B", "C", "D")
    value: string;               // Value used for comparison (e.g., "A", "B", "C", "D")
    text: string;                // Option text (can be empty if using image)
    image?: string;              // Optional: Image path for visual options
  }[];
  correctAnswer: string;         // REQUIRED - Must match one option's 'value' field
  explanation?: string;          // Optional - Explanation shown after answering
  table?: TableData;             // Optional - Table data to display
  image?: string;                // Optional - Image path (e.g., "/images/apprecalc/polynomial1.png")
  calculator?: boolean;          // Optional - Marks as calculator question (for sectioned quizzes)
}
```

### 2. Free Response Question

```typescript
interface FreeResponseQuestion {
  id: string;                    // REQUIRED - Unique identifier
  type: 'free-response';         // REQUIRED - Must be exactly 'free-response'
  question: string;              // REQUIRED - The question text (supports LaTeX)
  correctAnswer: string;         // REQUIRED - Expected answer (shown to user for self-grading)
  explanation?: string;          // Optional - Additional explanation
  table?: TableData;             // Optional - Table data to display
  image?: string;                // Optional - Image path
  displayAs?: 'paragraph';       // Optional - Renders answer as paragraph (preserves whitespace)
  calculator?: boolean;          // Optional - Marks as calculator question
  listAnswers?: string[];        // Optional - List-type FRQ: shows input blanks, then side-by-side comparison table after submit
}
```

### 3. Select All That Apply Question

```typescript
interface SelectAllQuestion {
  id: string;                    // REQUIRED - Unique identifier
  type: 'select-all';            // REQUIRED - Must be exactly 'select-all'
  question: string;              // REQUIRED - The question text (supports LaTeX)
  options: {                     // REQUIRED - Array of answer options (checkboxes)
    label: string;               // Display label (e.g., "A", "B", "C", "D")
    value: string;               // Value used for comparison
    text: string;                // Option text
    image?: string;              // Optional: Image path for visual options
  }[];
  correctAnswers: string[];      // REQUIRED - Array of correct option values (must select ALL to be correct)
  explanation?: string;          // Optional - Explanation shown after answering
  table?: TableData;             // Optional - Table data to display
  image?: string;                // Optional - Image path
  calculator?: boolean;          // Optional - Marks as calculator question
}
```

**Select All Behavior:**
- Displayed with checkboxes instead of radio buttons
- Users can toggle multiple options on/off
- Answer is ONLY correct if exactly the right set of options are selected (no extra, no missing)
- After submission: correct selections → green, incorrect selections → red, missed correct options → labeled "Missed"
- Keyboard shortcuts (number keys) toggle checkboxes
- Fully supported in custom editor, export/import, and parts questions

### 4. Parts Question (Multi-Part)

```typescript
interface QuestionPart {
  label: string;               // Part label (e.g., "a", "b", "c")
  type: 'multiple-choice' | 'free-response' | 'select-all';  // Each part can be any type
  question: string;            // Part question text (supports LaTeX)
  options?: {                  // For multiple-choice and select-all parts
    label: string; value: string; text: string; image?: string;
  }[];
  correctAnswer: string;       // Expected answer for MC/FRQ parts
  correctAnswers?: string[];   // For select-all parts
  explanation?: string;        // Optional explanation for this part
  image?: string;              // Optional image for this part
  listAnswers?: string[];      // Optional - List-type FRQ for this part
}

interface PartsQuestion {
  id: string;                    // REQUIRED - Unique identifier
  type: 'parts';                 // REQUIRED - Must be exactly 'parts'
  question: string;              // REQUIRED - Main question stem (supports LaTeX)
  parts: QuestionPart[];         // REQUIRED - Array of sub-parts (a, b, c, etc.)
  image?: string;                // Optional - Image for the main question
  table?: TableData;             // Optional - Table data for the main question
  calculator?: boolean;          // Optional - Marks as calculator question
}
```

**Parts Question Behavior:**
- The main question stem, image, and table are always displayed above all parts
- All parts display simultaneously on one screen
- Each part has its own Submit and Skip buttons underneath the question content
- Each part = 1 point in scoring
- MCQ parts have shuffled options; FRQ parts use self-grading
- Skipped parts are marked as wrong
- Must complete all parts before moving to the next question
- Parts order is constant; only MCQ options are shuffled

**Targeted Practice (Wrong Answers):**
- When saving wrong answers for parts questions, only the **wrong parts** are saved (not the entire question)
- The filtered PartsQuestion retains the main question stem, image, and table so context is preserved
- If a user got part A wrong but part B correct, targeted practice will only show part A with the original question stem

**List FRQ Behavior:**
- When `listAnswers` is set on a free-response question (standalone or part), the quiz shows N text input blanks
- The user types their answers, then submits to see a side-by-side comparison table with "Your Answer" and "Correct Answer" columns
- The separate "Correct Answer" bar is completely hidden for list FRQs — both standalone and parts-based (since the table already displays all correct answers)
- `correctAnswer` can be left as an empty string when `listAnswers` is used (the list items serve as the answer)
- Answers are always shown in the original list order (no shuffling)
- Long answers wrap within their table cell for readability
- Self-grading buttons still appear for list FRQs so the user can mark right/wrong
- Works in both standalone FRQ and FRQ parts within parts questions
- Fully supported in ZIP export/import — `listAnswers` is serialized as a JSON array

### Table Data Structure

```typescript
interface TableData {
  headers: string[];             // Column headers
  rows: (string | number)[][];   // 2D array of cell values
}
```

---

## Question ID Conventions

### Format
`{topic}-{number}`

### Examples
- `polynomial-1`, `polynomial-2`, ... `polynomial-29`
- `atomic-1`, `atomic-2`, ... `atomic-15`
- `biochemistry-1`, `biochemistry-2`, ...

### Rules
1. IDs must be unique within the entire application (not just within a topic)
2. Use lowercase with hyphens
3. Sequential numbering recommended for easy management
4. Never reuse deleted IDs (may cause localStorage conflicts)

---

## Valid vs Invalid Examples

### ✅ Valid Multiple Choice Question
```typescript
{
  id: "polynomial-1",
  type: "multiple-choice",
  question: "What is the degree of $x^3 + 2x - 5$?",
  options: [
    { label: "A", value: "A", text: "1" },
    { label: "B", value: "B", text: "2" },
    { label: "C", value: "C", text: "3" },
    { label: "D", value: "D", text: "5" }
  ],
  correctAnswer: "C",
  explanation: "The degree is the highest exponent, which is 3."
}
```

### ✅ Valid Free Response Question
```typescript
{
  id: "polynomial-16",
  type: "free-response",
  question: "Find all zeros of $f(x) = x^2 - 4$.",
  correctAnswer: "x = 2 and x = -2",
  explanation: "Factor as (x-2)(x+2) = 0"
}
```

### ✅ Valid List FRQ Question
```typescript
{
  id: "biochem-list-1",
  type: "free-response",
  question: "Name the 4 macromolecules:",
  correctAnswer: "",
  listAnswers: ["Carbohydrates", "Lipids", "Proteins", "Nucleic Acids"]
}
```

### ✅ Valid Select All That Apply Question
```typescript
{
  id: "ecology-sata-1",
  type: "select-all",
  question: "Which of the following are abiotic factors?",
  options: [
    { label: "A", value: "A", text: "Sunlight" },
    { label: "B", value: "B", text: "Trees" },
    { label: "C", value: "C", text: "Temperature" },
    { label: "D", value: "D", text: "Water" }
  ],
  correctAnswers: ["A", "C", "D"],
  explanation: "Abiotic factors are non-living components of an ecosystem."
}
```

### ✅ Valid Question with Image
```typescript
{
  id: "polynomial-5",
  type: "multiple-choice",
  question: "Based on the graph shown, what is f(2)?",
  image: "/images/apprecalc/polynomial14.png",
  options: [
    { label: "A", value: "A", text: "1" },
    { label: "B", value: "B", text: "2" },
    { label: "C", value: "C", text: "3" },
    { label: "D", value: "D", text: "4" }
  ],
  correctAnswer: "B"
}
```

### ✅ Valid Question with Image Options
```typescript
{
  id: "polynomial-2",
  type: "multiple-choice",
  question: "Which graph shows a decreasing function?",
  options: [
    { label: "A", value: "A", text: "", image: "/images/apprecalc/polynomial6.png" },
    { label: "B", value: "B", text: "", image: "/images/apprecalc/polynomial7.png" },
    { label: "C", value: "C", text: "", image: "/images/apprecalc/polynomial8.png" },
    { label: "D", value: "D", text: "", image: "/images/apprecalc/polynomial9.png" }
  ],
  correctAnswer: "D"
}
```

### ❌ Invalid: Missing required field
```typescript
{
  id: "bad-1",
  type: "multiple-choice",
  // MISSING: question field
  options: [...],
  correctAnswer: "A"
}
```

### ❌ Invalid: Wrong type value
```typescript
{
  id: "bad-2",
  type: "mc",  // WRONG: Must be "multiple-choice"
  question: "...",
  options: [...],
  correctAnswer: "A"
}
```

### ❌ Invalid: correctAnswer doesn't match any option value
```typescript
{
  id: "bad-3",
  type: "multiple-choice",
  question: "...",
  options: [
    { label: "A", value: "A", text: "Option 1" },
    { label: "B", value: "B", text: "Option 2" }
  ],
  correctAnswer: "C"  // WRONG: No option has value "C"
}
```

### ❌ Invalid: Duplicate ID
```typescript
// In file 1:
{ id: "polynomial-1", type: "multiple-choice", ... }

// In file 2:
{ id: "polynomial-1", type: "free-response", ... }  // WRONG: Duplicate ID
```

---

## What Breaks if Fields are Missing or Malformed

| Missing/Malformed Field | What Breaks | Error Type |
|------------------------|-------------|------------|
| `id` | Question tracking fails, wrong answers not saved correctly | Silent failure |
| `type` | Question doesn't render, TypeScript error | Runtime error |
| `question` | Empty question text, UI breaks | Silent failure |
| `options` (MC) | No options shown, cannot answer | Runtime error |
| `correctAnswer` | All answers marked wrong | Silent failure |
| `correctAnswer` mismatch | Correct answer never recognized | Silent failure |
| Duplicate `id` | Wrong answers overwrite each other, presets break | Data corruption |
| Invalid `image` path | Broken image icon displayed | Visual error |
| Malformed `table` | Table doesn't render or crashes | Runtime error |

---

## Related Data Structures

### Study Resources (`src/data/study-resources.ts`)

```typescript
interface StudyResource {
  title: string;   // Display name
  url: string;     // External link
}

// Indexed by 'subject-unitId' (e.g., 'precalc-polynomial')
const unitStudyResources: Record<string, StudyResource[]> = {...};

// Indexed by subject (e.g., 'precalc')
const courseChallengeResources: Record<string, StudyResource[]> = {...};
```

### Unit Assignments (`src/data/assignments/unit-assignments.ts`)

```typescript
interface HomeworkAssignment {
  id: string;      // Unique within unit
  name: string;    // Display name
  notes?: string;  // Optional notes/description
}

interface UnitContent {
  assignments: HomeworkAssignment[];
  testId?: string;  // Reference to test question set
}

// Indexed by 'subject-unitId'
const unitAssignments: Record<string, UnitContent> = {...};
```

### Custom Units (localStorage)

```typescript
interface CustomTopic {
  id: string;           // Auto-generated
  name: string;         // User-defined name
  mathEnabled: boolean; // Whether to render LaTeX
  questions: Question[];
}

interface CustomUnit {
  id: string;           // Auto-generated
  name: string;         // User-defined name
  topics: CustomTopic[];
}

interface CustomUnitsData {
  units: CustomUnit[];
}
```

---

## LaTeX/Math Rendering

The application uses KaTeX for math rendering. Wrap math expressions in `$...$` for inline or `$$...$$` for display mode.

### Supported in:
- `question` field
- `correctAnswer` field
- `explanation` field
- `options[].text` field

### Examples
```typescript
question: "Find $\\lim_{x \\to \\infty} \\frac{1}{x}$"
correctAnswer: "$\\frac{1}{2}$"
explanation: "Using L'Hôpital's rule: $\\frac{d}{dx}$..."
```

---

## Chemistry Mode

When `subject === 'chemistry'`, the MathText component enables chemical formula formatting:
- Subscripts for numbers after elements (e.g., H2O renders with subscript 2)
- Superscripts for charges (e.g., Na+ renders with superscript +)

---

## Quiz Attempt Structure

```typescript
interface QuizAttempt {
  questionId: string;
  userAnswer: string | null;  // 'SKIPPED' | 'SKIPPED_FINAL' | 'PARTS_COMPLETE' | actual answer
  isCorrect: boolean | null;
  selfGraded?: boolean;       // For free-response questions
  skipped?: boolean;          // Marks if question was ever skipped
  markedIncorrect?: boolean;  // User flagged question as buggy/wrong
  markedIncorrectReason?: string; // Reason for marking
  partsState?: {              // For parts questions - tracks each part separately
    [partLabel: string]: {
      userAnswer: string | null;
      isCorrect: boolean | null;
      selfGraded?: boolean;
      skipped?: boolean;
    }
  }
}
```

**Skip States:**
- `userAnswer: 'SKIPPED'` - Question was skipped, can be revisited
- `userAnswer: 'SKIPPED_FINAL'` - Question was skipped twice, won't be revisited
- `skipped: true` - Indicates question was skipped at some point (for UI display)

**Marked as Incorrect:**
- `markedIncorrect: true` - User flagged this question as having an issue
- On Results page, marked questions appear first with a warning badge showing the question ID
- Useful for reporting bugs, incorrect answers, or problematic questions

---

## In-Progress Quiz State

```typescript
interface InProgressQuizState {
  version: 1;
  routeKey: string;           // `${subject}|${unitId}|${quizType}`
  updatedAt: number;
  questions: Question[];
  attempts: QuizAttempt[];
  currentIndex: number;
  currentAnswer: string;
  isSubmitted: boolean;
  showGrading: boolean;
  timerSeconds: number;
  meta?: Record<string, unknown>;
}
```

This structure is stored in localStorage at `in-progress-quiz-v1` to allow quiz resume after page refresh.

---

## Last Updated

April 2026
