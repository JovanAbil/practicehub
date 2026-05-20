# 20-OPTION-ELIMINATION-CROSSOUT.md

## Option Elimination / Cross-Out Feature

This document describes how to add an **AP-exam-style option elimination** feature. Users can click a small marker button next to any MCQ or SATA option to "cross it out." Crossed-out options:

- Visually appear dimmed / struck through
- Cannot be selected as an answer (the radio/checkbox is disabled)
- Can be toggled on/off freely before submitting
- Reset when moving to the next question

---

## Scope

Applies to:
- `multiple-choice` questions (main quiz)
- `select-all` questions (main quiz)
- `parts` questions where a part is `multiple-choice` or `select-all`

Does NOT apply to:
- `free-response` questions
- List-type FRQs

---

## 1. Add State for Crossed-Out Options

### In `src/pages/Quiz.tsx`

Add a new state array to track which option values are crossed out for the **current question**.

```typescript
const [crossedOutOptions, setCrossedOutOptions] = useState<string[]>([]);
```

Whenever the question changes (or the user navigates), reset crossed-out state. In the effect that runs when `currentIndex` changes (or in the `handleNext` function), add:

```typescript
setCrossedOutOptions([]);
```

### In `src/components/PartsQuestionView.tsx`

Each part needs its own crossed-out set. Add state:

```typescript
const [crossedOutPartOptions, setCrossedOutPartOptions] = useState<{ [label: string]: string[] }>({});
```

---

## 2. Toggle Function

### Quiz.tsx

Add a helper:

```typescript
const toggleCrossOut = (optionValue: string) => {
  if (isSubmitted) return; // Can't cross out after submitting
  setCrossedOutOptions(prev =>
    prev.includes(optionValue)
      ? prev.filter(v => v !== optionValue)
      : [...prev, optionValue]
  );
  // If the currently selected answer is the one being crossed out, deselect it
  if (currentAnswer === optionValue) {
    setCurrentAnswer('');
  }
  // If it's a select-all and currently checked, remove it
  if (selectedCheckboxes.includes(optionValue)) {
    setSelectedCheckboxes(prev => prev.filter(v => v !== optionValue));
  }
};
```

### PartsQuestionView.tsx

Add a helper inside the component:

```typescript
const toggleCrossOutPart = (partLabel: string, optionValue: string) => {
  if (partSubmitted[partLabel]) return; // Can't cross out after submitting part
  setCrossedOutPartOptions(prev => {
    const current = prev[partLabel] || [];
    const next = current.includes(optionValue)
      ? current.filter(v => v !== optionValue)
      : [...current, optionValue];
    return { ...prev, [partLabel]: next };
  });
  // If this option is currently selected, deselect it
  if (partAnswers[partLabel] === optionValue) {
    setPartAnswers(prev => ({ ...prev, [partLabel]: '' }));
  }
  if ((partCheckboxes[partLabel] || []).includes(optionValue)) {
    setPartCheckboxes(prev => ({
      ...prev,
      [partLabel]: (prev[partLabel] || []).filter(v => v !== optionValue),
    }));
  }
};
```

---

## 3. Modify Option Rendering

### Quiz.tsx — MCQ Options

For each `shuffledOptions.map((option, index) => ...)` block, wrap the option row with crossed-out styling and add a toggle button.

```tsx
{shuffledOptions.map((option, index) => {
  const isCrossedOut = crossedOutOptions.includes(option.value);
  return (
    <div
      key={option.value}
      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
        isCrossedOut
          ? 'border-muted/50 bg-muted/20 opacity-60'
          : isSubmitted && option.value === currentQuestion.correctAnswer
          ? 'border-success bg-success/10'
          : isSubmitted && option.value === currentAnswer && currentAnswer !== currentQuestion.correctAnswer
          ? 'border-destructive bg-destructive/10'
          : 'border-border hover:border-primary'
      }`}
    >
      {/* Elimination toggle button */}
      {!isSubmitted && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCrossOut(option.value);
          }}
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${
            isCrossedOut
              ? 'bg-destructive text-destructive-foreground border-destructive'
              : 'bg-background text-muted-foreground border-border hover:border-destructive hover:text-destructive'
          }`}
          title={isCrossedOut ? 'Uncross option' : 'Cross out option'}
        >
          ✕
        </button>
      )}

      <RadioGroupItem
        value={option.value}
        id={option.value}
        disabled={isCrossedOut || isSubmitted}
      />
      <Label
        htmlFor={option.value}
        className={`flex-1 cursor-pointer ${isCrossedOut ? 'line-through text-muted-foreground' : ''}`}
      >
        <span className="font-semibold mr-2 text-muted-foreground">{index + 1}.</span>
        {option.image ? (
          <img
            src={option.image}
            alt={`Option ${index + 1}`}
            className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2"
          />
        ) : (
          <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
        )}
      </Label>
    </div>
  );
})}
```

### Quiz.tsx — SATA Options

Same idea for SATA. Add the toggle button, apply crossed-out styling, and disable the checkbox when crossed out.

```tsx
{shuffledOptions.map((option, index) => {
  const isSelected = selectedCheckboxes.includes(option.value);
  const isCorrectOption = currentQuestion.correctAnswers.includes(option.value);
  const wasSelectedWrong = isSubmitted && isSelected && !isCorrectOption;
  const wasCorrectNotSelected = isSubmitted && !isSelected && isCorrectOption;
  const isCrossedOut = crossedOutOptions.includes(option.value);

  return (
    <div
      key={option.value}
      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
        isCrossedOut
          ? 'border-muted/50 bg-muted/20 opacity-60'
          : isSubmitted && isCorrectOption
          ? 'border-success bg-success/10'
          : wasSelectedWrong
          ? 'border-destructive bg-destructive/10'
          : 'border-border hover:border-primary'
      }`}
      onClick={() => {
        if (isSubmitted || isCrossedOut) return;
        setSelectedCheckboxes(prev =>
          prev.includes(option.value)
            ? prev.filter(v => v !== option.value)
            : [...prev, option.value]
        );
      }}
    >
      {/* Elimination toggle button */}
      {!isSubmitted && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCrossOut(option.value);
          }}
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${
            isCrossedOut
              ? 'bg-destructive text-destructive-foreground border-destructive'
              : 'bg-background text-muted-foreground border-border hover:border-destructive hover:text-destructive'
          }`}
          title={isCrossedOut ? 'Uncross option' : 'Cross out option'}
        >
          ✕
        </button>
      )}

      <Checkbox
        checked={isSelected}
        disabled={isCrossedOut || isSubmitted}
        onCheckedChange={() => {
          if (isSubmitted || isCrossedOut) return;
          setSelectedCheckboxes(prev =>
            prev.includes(option.value)
              ? prev.filter(v => v !== option.value)
              : [...prev, option.value]
          );
        }}
      />
      <span className={`flex-1 ${isCrossedOut ? 'line-through text-muted-foreground' : ''}`}>
        <span className="font-semibold mr-2 text-muted-foreground">{index + 1}.</span>
        <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
      </span>
    </div>
  );
})}
```

---

## 4. PartsQuestionView.tsx — Part-Level Options

For **MCQ parts** and **SATA parts**, apply the same pattern:

1. Derive `const isCrossedOut = (crossedOutPartOptions[part.label] || []).includes(option.value)`
2. Add the `✕` toggle button (same styling as above, calling `toggleCrossOutPart(part.label, option.value)`)
3. Apply `line-through`, `opacity-60`, and muted border/bg classes when crossed out
4. Disable `RadioGroupItem` / `Checkbox` when `isCrossedOut`
5. Prevent selection click when crossed out

---

## 5. Keyboard Shortcuts (Optional Enhancement)

In the `handleKeyPress` effect of `Quiz.tsx`, add:

```typescript
// Shift + number to cross/uncross an option
if (e.shiftKey && !isSubmitted && (currentQuestion?.type === 'multiple-choice' || currentQuestion?.type === 'select-all')) {
  const keyNum = parseInt(e.key);
  if (keyNum >= 1 && keyNum <= shuffledOptions.length) {
    e.preventDefault();
    toggleCrossOut(shuffledOptions[keyNum - 1].value);
    return;
  }
}
```

---

## 6. Persistence Notes

Crossed-out state is **intentionally not persisted** to `localStorage`.

- It's a lightweight per-question scratchpad tool (like scratch paper).
- If a user refreshes mid-quiz, the resume system restores `currentAnswer`, `selectedCheckboxes`, etc. — but crossed-out options are cheap to redo.
- Avoids bloating the saved quiz state.

---

## 7. Styling Summary

| State | Classes |
|-------|---------|
| Normal option | `border-border hover:border-primary` |
| Crossed out | `border-muted/50 bg-muted/20 opacity-60 line-through text-muted-foreground` |
| Cross-out button (idle) | `bg-background text-muted-foreground border-border hover:border-destructive hover:text-destructive` |
| Cross-out button (active) | `bg-destructive text-destructive-foreground border-destructive` |
| Correct (submitted) | `border-success bg-success/10` |
| Wrong (submitted) | `border-destructive bg-destructive/10` |

---

## 8. Implementation Checklist

- [ ] Add `crossedOutOptions` state in `Quiz.tsx`
- [ ] Add `crossedOutPartOptions` state in `PartsQuestionView.tsx`
- [ ] Add `toggleCrossOut` helper in `Quiz.tsx`
- [ ] Add `toggleCrossOutPart` helper in `PartsQuestionView.tsx`
- [ ] Reset crossed-out state on question change / resume / skip / next
- [ ] Add `✕` button to MCQ option rows in `Quiz.tsx`
- [ ] Add `✕` button to SATA option rows in `Quiz.tsx`
- [ ] Add `✕` button to MCQ part rows in `PartsQuestionView.tsx`
- [ ] Add `✕` button to SATA part rows in `PartsQuestionView.tsx`
- [ ] Disable radio/checkbox when crossed out
- [ ] Deselect answer if user crosses out their currently chosen option
- [ ] Verify `stopPropagation` on the toggle button so the row click doesn't select the option
- [ ] Verify no effect on keyboard shortcuts (numbers still select non-crossed-out options)
- [ ] Test: cross out → submit → review shows crossed-out options dimmed but not counted
- [ ] Test: parts question with multiple MCQ/SATA parts each have independent crossed-out sets
