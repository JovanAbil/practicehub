# Question Generator Guide

How to configure and maintain the AI-powered question generator.

---

## Overview

The Question Generator page (`/question-generator`) helps users turn their notes into practice questions using AI tools. It provides a step-by-step workflow:

1. User pastes their notes
2. Copies a pre-built AI prompt + notes to clipboard
3. Pastes the AI output back
4. Names the file and downloads as a `.ts` file
5. Uploads into any unit's Build Custom Practice page

---

## How Users Access It

See "Access Points" section below for all entry points.

---

## Changing the AI Prompt

**Location:** `src/pages/QuestionGenerator.tsx`

Find the `AI_PROMPT` constant near the top of the file:

```ts
const AI_PROMPT = `You are a study question generator...
```

Modify this string to change what instructions are sent to the AI. The user's notes are appended after this prompt automatically.

### What the prompt includes

The prompt contains:
- **Full TypeScript type definitions** for all question types (MCQ, FRQ, Select All, Parts)
- **Option format rules** (label, value, text fields)
- **LaTeX formatting reference table** with all common math expressions
- **Complete examples** of each question type
- **Rules** for question generation

### Tips for customizing

- The prompt explicitly requires `import { Question } from '@/types/quiz';` at the top
- It includes the `value` field requirement for options (must equal `label`)
- LaTeX rules use double backslashes for TypeScript strings
- Chemistry uses `$\\ce{...}$` syntax

---

## Filename Formatting

When downloading, users can type a custom filename. The system automatically:
- Converts to lowercase
- Replaces spaces and underscores with hyphens
- Removes invalid characters (only keeps letters, numbers, hyphens)
- Appends `-questions.ts` if not already present

Examples:
- `Biology Unit 3` → `biology-unit-3-questions.ts`
- `Chapter5_Review` → `chapter5-review-questions.ts`
- `` (empty) → `generated-questions.ts`

The formatting function is `formatFilename()` in `QuestionGenerator.tsx`.

---

## Changing Recommended AI Tools

Find the `AI_TOOLS` array in the same file:

```ts
const AI_TOOLS = [
  {
    name: 'Claude (Recommended)',
    url: 'https://claude.ai',
    description: 'Best at following the exact TypeScript format consistently',
  },
  // Add more tools here
];
```

---

## Access Points

Users can reach the Question Generator from:

1. **Footer** → "AI Question Maker" link
2. **Custom Topic Editor** → "Open Generator" button at the bottom
3. **Custom Units Category** → Description text with link ("Feeling too lazy to make questions?")
4. **Direct URL**: `/question-generator`

---

## Files Involved

| File | Role |
|------|------|
| `src/pages/QuestionGenerator.tsx` | The generator page with prompt, AI tools, filename input, download |
| `src/App.tsx` | Route: `/question-generator` |
| `src/pages/CustomTopicEditor.tsx` | Links to the generator at the bottom |
| `src/pages/categories/CustomUnitsCategory.tsx` | Description links to the generator |
| `src/components/Footer.tsx` | "AI Question Maker" link |

---

## Last Updated

April 2026
