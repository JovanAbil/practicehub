# Question Formatting Guide

Complete reference for formatting questions, math expressions, tables, images, and special content.
All examples below are taken from **working production question files** in this project.

---

## File Structure

Every question file must follow this structure:

```typescript
import { Question } from '@/types/quiz';

export const topicQuestions: Question[] = [
  // questions go here
];
```

- The import statement **must** be the very first line.
- Export a single array of `Question` objects.
- Variable name should be camelCase based on the topic (e.g., `atomicQuestions`, `biochemistryQuestions`).

---

## Question Types

### Multiple Choice

```typescript
{
  id: 'atomic-1',
  type: 'multiple-choice',
  question: 'Which scientist first proposed that all matter is composed of tiny, indivisible particles called atoms?',
  options: [
    { label: 'A', value: 'A', text: 'Dalton' },
    { label: 'B', value: 'B', text: 'Democritus' },
    { label: 'C', value: 'C', text: 'Thomson' },
    { label: 'D', value: 'D', text: 'Rutherford' },
  ],
  correctAnswer: 'B',
  explanation: 'Democritus first proposed the idea of atoms as tiny, indivisible particles of matter.',
}
```

**Rules:**
- `correctAnswer` must be an uppercase letter matching one of the option `value` fields (e.g., `'A'`, `'B'`, `'C'`, `'D'`).
- Every option **must** have all three fields: `label`, `value`, and `text`.
- `value` must **always** equal `label`.

### Free Response

```typescript
{
  id: 'biochemistry-1',
  type: 'free-response',
  question: 'Which two types of particles are present in equal numbers in an atom, but not in an ion?',
  correctAnswer: 'Protons and electrons',
  explanation: '',
}
```

### Select All That Apply

```typescript
{
  id: 'topic-3',
  type: 'select-all',
  question: 'Which are prime numbers?',
  options: [
    { label: 'A', value: 'A', text: '2' },
    { label: 'B', value: 'B', text: '4' },
    { label: 'C', value: 'C', text: '7' },
    { label: 'D', value: 'D', text: '9' },
  ],
  correctAnswers: ['A', 'C'],
  explanation: '2 and 7 are prime.',
}
```

**Rules:**
- Uses `type: 'select-all'` and `correctAnswers` (array) instead of `correctAnswer` (string).
- Displayed with checkboxes; users toggle multiple options.
- Only correct if exactly the right options are selected (no extra, no missing).
- After submission: correct → green, wrong → red, missed → "Missed" label.

### Parts (Multi-Part Questions)

Parts questions have a main question stem and an array of sub-parts. Each part can be `free-response`, `multiple-choice`, or `select-all`.

**Parts with free-response sub-parts:**

```typescript
{
  id: 'stoichiometry-54',
  type: 'parts',
  question: 'If 10.0 g of ethanol reacts with 30.0 g of O$_{2}$,\n\n$\\text{C}_{2}\\text{H}_{5}\\text{OH} + 3 \\text{O}_{2} \\rightarrow 2 \\text{CO}_{2} + 3 \\text{H}_{2}\\text{O}$',
  parts: [
    {
      label: 'a',
      type: 'free-response',
      question: 'How many grams of CO$_{2}$ will be produced?',
      correctAnswer: '19.106 grams',
      explanation: 'Determine limiting reactant, convert to moles, apply mole ratio, then convert to grams.',
    },
    {
      label: 'b',
      type: 'free-response',
      question: 'Label the limiting and excess reactants.',
      correctAnswer: 'Limiting: ethanol; Excess: oxygen',
      explanation: 'Compare mole ratios to determine limiting reagent.',
    },
    {
      label: 'c',
      type: 'free-response',
      question: 'How many grams of excess reactant will be leftover?',
      correctAnswer: '6.04 grams',
      explanation: 'Subtract amount used from initial quantity of excess reactant.',
    },
  ],
}
```

**Parts with multiple-choice sub-parts:**

```typescript
{
  id: 'reniassance-73',
  type: 'parts',
  question: 'Match Northern Renaissance artists to their achievements:',
  parts: [
    {
      label: 'a',
      type: 'multiple-choice',
      question: 'Who painted photographic portraits of King Henry VIII?',
      options: [
        { label: 'A', value: 'A', text: 'Albrecht Dürer' },
        { label: 'B', value: 'B', text: 'Hans Holbein the Younger' },
        { label: 'C', value: 'C', text: 'Jan van Eyck' },
        { label: 'D', value: 'D', text: 'Pieter Bruegel' },
      ],
      correctAnswer: 'B',
    },
    {
      label: 'b',
      type: 'multiple-choice',
      question: 'Who produced detailed woodcuts and engravings of religious subjects and classical myths?',
      options: [
        { label: 'A', value: 'A', text: 'Albrecht Dürer' },
        { label: 'B', value: 'B', text: 'Hans Holbein the Younger' },
        { label: 'C', value: 'C', text: 'Jan van Eyck' },
        { label: 'D', value: 'D', text: 'Pieter Bruegel' },
      ],
      correctAnswer: 'A',
    },
  ],
}
```

**Parts with mixed types and listAnswers:**

```typescript
{
  id: 'logarithmic-17',
  type: 'parts',
  question: 'Given $f(x) = \\ln(x-3) + 5$, answer the following.',
  parts: [
    {
      label: 'a',
      type: 'free-response',
      question: 'Where is the asymptote?',
      correctAnswer: '$x = 3$',
    },
    {
      label: 'b',
      type: 'free-response',
      question: 'What is the domain?',
      correctAnswer: '$(3, \\infty)$',
    },
    {
      label: 'c',
      type: 'free-response',
      question: 'What is the range?',
      correctAnswer: '$(-\\infty, \\infty)$',
    },
    {
      label: 'd',
      type: 'free-response',
      question: 'What are both end behaviors for this function?',
      correctAnswer: '',
      listAnswers: [
        '\\lim_{x \\to 3^+} f(x) = -\\infty',
        '\\lim_{x \\to \\infty} f(x) = \\infty',
      ],
    },
  ],
}
```

**Parts rules:**
- Each part needs a `label` (`'a'`, `'b'`, `'c'`, etc.).
- Each part needs its own `type` (`'free-response'`, `'multiple-choice'`, or `'select-all'`).
- Each part needs its own `correctAnswer` (or `correctAnswers` for select-all parts).
- Parts can optionally have `explanation`, `image`, and `listAnswers`.
- The main `question` field is the shared stem shown above all parts.

### List FRQ (Free Response with List Answers)

```typescript
{
  id: 'polynomial-20',
  type: 'free-response',
  question: 'If it is a positive even degree polynomial, what extrema does it have and where does it open?',
  correctAnswer: '',
  listAnswers: ['Minimum', 'Opens Up'],
}
```

**List FRQ rules:**
- Only available on `free-response` questions (standalone or as parts).
- `listAnswers` is an array of strings — each is one correct item.
- The quiz shows N text input blanks for the user to type their answers.
- After submitting, a side-by-side table displays "Your Answer" and "Correct Answer" columns.
- `correctAnswer` can be empty string when `listAnswers` is present.
- Works inside parts questions too (see the mixed parts example above).

---

## Math (LaTeX) Formatting

**IMPORTANT: LaTeX is explicit-only.** Math is ONLY rendered when wrapped in `$...$` (inline) or `$$...$$` (display mode). There is NO automatic conversion of plain text like `x^2`, `sqrt(x)`, `<=`, infinity symbols, or chemistry formulas. Everything must be explicitly wrapped.

In TypeScript strings, use `\\` for `\`.

| Element | Syntax | Example |
|---------|--------|---------|
| Fraction | `$\\frac{a}{b}$` | `$\\frac{x+1}{x-1}$` |
| Limit | `$\\lim_{x \\to a}$` | `$\\lim_{x \\to \\infty}$` |
| Square root | `$\\sqrt{x}$` | `$\\sqrt{x+1}$` |
| Exponent | `$x^{n}$` | `$x^{2}$` |
| Superscript text | `$^{text}$` | `1s$^{2}$2s$^{2}$` |
| Subscript text | `$_{text}$` | `C$_{5}$H$_{11}$OH` |
| ≤ / ≥ | `$\\leq$` / `$\\geq$` | `$x \\leq 5$` |
| Union | `$\\cup$` | `$(0,1) \\cup (2,3)$` |
| Infinity | `$\\infty$` | `$x \\to \\infty$` |
| Pi | `$\\pi$` | `$\\pi r^2$` |
| Log | `$\\log(x)$` | `$\\log_2(8)$` |
| Natural log | `$\\ln(x)$` | `$\\ln(e^2)$` |
| Multiplication | `$\\times$` | `3.61 $\\times$ 10$^{-18}$ J` |
| Text in math | `$\\text{...}$` | `$\\text{C}_{2}\\text{H}_{5}$` |
| Chemistry | `$\\ce{H2O}$` | `$\\ce{NaCl}$` |

### Real Examples from Working Questions

Electron configuration with superscripts:
```typescript
correctAnswer: '1s$^{2}$2s$^{2}$2p$^{6}$3s$^{2}$3p$^{6}$4s$^{2}$3d$^{10}$4p$^{6}$5s$^{2}$4d$^{3}$'
```

Chemistry molecule with subscripts:
```typescript
question: 'What is the total valence electrons in 1 molecule of C$_{5}$H$_{11}$OH?'
```

Scientific notation with multiplication:
```typescript
correctAnswer: '3.61 $\\times$ 10$^{-18}$ J'
```

Nuclear decay equation:
```typescript
correctAnswer: '$\\frac{100}{40}$Ru + $\\frac{4}{2}$He $\\to$ $\\frac{0}{-1}$e$^{-}$ + $\\frac{104}{47}$Ag'
```

Stoichiometry equation in a question:
```typescript
question: 'If 10.0 g of ethanol reacts with 30.0 g of O$_{2}$,\n\n$\\text{C}_{2}\\text{H}_{5}\\text{OH} + 3 \\text{O}_{2} \\rightarrow 2 \\text{CO}_{2} + 3 \\text{H}_{2}\\text{O}$'
```

### Dollar Signs (Currency)
Escape with backslash: `\\$50` → displays as $50

---

## Line Breaks

Use `\n` in strings:
```typescript
explanation: 'Step 1: Do this.\nStep 2: Do that.\nStep 3: Get answer.'
```

Multi-line answers:
```typescript
correctAnswer: 'Protons: 92\nNeutrons: 140\nElectrons: 88'
```

Double `\n\n` adds extra spacing (e.g., before an equation block in a question).

---

## Images

### Question Image
```typescript
{
  id: 'topic-1',
  question: 'Based on the diagram...',
  image: '/images/subject/filename.png',
  // ...
}
```

### Option Images (MCQ)
```typescript
options: [
  { label: 'A', value: 'A', text: '', image: '/images/subject/optionA.png' },
  { label: 'B', value: 'B', text: '', image: '/images/subject/optionB.png' },
]
```

### Part Images
```typescript
parts: [
  {
    label: 'a',
    question: 'Look at this diagram:',
    image: '/images/subject/part-a.png',
    // ...
  },
]
```

**Image rules:**
- Store in `public/images/[subject]/`
- Reference as `/images/[subject]/filename.png`
- Use lowercase filenames with hyphens
- Never start path with `src/`

---

## Tables

```typescript
{
  id: 'topic-1',
  question: 'Based on the table...',
  table: {
    headers: ['x', 'f(x)', 'g(x)'],
    rows: [
      [1, 3, 5],
      [2, 7, 11],
    ],
  },
  // ...
}
```

---

## Calculator Flag

```typescript
{
  id: 'topic-1',
  calculator: true,  // Marks as calculator-allowed question
  // ...
}
```

---

## Chemistry Formatting

Chemistry formulas are NOT auto-formatted. Two approaches are used in the codebase:

**Approach 1: Using `\ce{}` (mhchem package):**
```typescript
question: 'Balance the equation: $\\ce{H2 + O2 -> H2O}$'
```

**Approach 2: Using subscripts/superscripts directly (more common in this project):**
```typescript
question: 'How many grams of CO$_{2}$ will be produced?'
question: 'If 10.0 g of ethanol reacts with 30.0 g of O$_{2}$'
// For full equations:
question: '$\\text{C}_{2}\\text{H}_{5}\\text{OH} + 3 \\text{O}_{2} \\rightarrow 2 \\text{CO}_{2} + 3 \\text{H}_{2}\\text{O}$'
```

**Key syntax:**
- Subscripts: `H$_{2}$O` → H₂O or `$\\ce{H2O}$` → H₂O
- Superscripts/charges: `Na$^{+}$` → Na⁺
- Reaction arrows: `$\\rightarrow$` → → or `$\\ce{->}$` → →

---

## Naming Conventions

| Item | Format | Example |
|------|--------|---------|
| File name | `[topic]-questions.ts` | `polynomial-questions.ts` |
| Variable name | `[topic]Questions` | `polynomialQuestions` |
| Question ID | `[topic]-[number]` | `polynomial-1` |
| Image file | `[topic][number].png` | `polynomial1.png` |
| MC type | `'multiple-choice'` | `type: 'multiple-choice'` |
| SATA type | `'select-all'` | `type: 'select-all'` |
| FRQ type | `'free-response'` | `type: 'free-response'` |
| Parts type | `'parts'` | `type: 'parts'` |

---

## Import/Export Handling

When questions go through ZIP export/import:
- `JSON.stringify()` automatically escapes backslashes
- The import parser's `unescapeString()` restores LaTeX correctly
- Double backslashes are handled first to protect LaTeX commands
- Parts questions are fully serialized/deserialized including per-part options and images
