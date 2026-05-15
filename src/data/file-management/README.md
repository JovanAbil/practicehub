# MANAGEMENT OF DATA

This folder contains all documentation for managing data in the CSW Studying app: adding/removing topics, formatting questions, and understanding how data flows through the system.

---

## Documents

| File | Purpose |
|------|---------|
| [01-ADDING-TOPICS-AND-UNITS.md](./01-ADDING-TOPICS-AND-UNITS.md) | Complete step-by-step for adding/removing topics, units, and subjects |
| [03-QUESTION-FORMATTING.md](./03-QUESTION-FORMATTING.md) | Question types, LaTeX math, images, tables, naming conventions |
| [04-DATA-MAPPING-REFERENCE.md](./04-DATA-MAPPING-REFERENCE.md) | Where every piece of data is connected and how it flows |

### Real Tests Section (Password-Protected)

Docs for the `/tests` section live in `src/data/real-tests/`:

| File | Purpose |
|------|---------|
| [01-ADDING-TESTS.md](../real-tests/01-ADDING-TESTS.md) | How to add/remove tests, units, subjects, and change the password |
| [02-ARCHITECTURE.md](../real-tests/02-ARCHITECTURE.md) | Architecture overview of the tests system |

---

## Quick Start

**Want to add questions to the main site?** → Start with [01-ADDING-TOPICS-AND-UNITS.md](./01-ADDING-TOPICS-AND-UNITS.md)

**Want to add questions to the tests section?** → See [real-tests/01-ADDING-TESTS.md](../real-tests/01-ADDING-TESTS.md)

**Need to format math?** → See [03-QUESTION-FORMATTING.md](./03-QUESTION-FORMATTING.md)

**Confused about where data connects?** → See [04-DATA-MAPPING-REFERENCE.md](./04-DATA-MAPPING-REFERENCE.md)

---

## The Golden Rules

1. **Main site questions** flow through `src/utils/questionLoader.ts`. If it's not imported and mapped there, it doesn't exist to the main app.

2. **Category page course listings** come from `src/data/category-courses.ts`. If a unit isn't listed there, it won't appear on the category page.

3. **Tests section questions** flow through `src/data/real-tests/testsQuestionLoader.ts`. This is completely separate from the main loader.

---

## Last Updated

April 2026
