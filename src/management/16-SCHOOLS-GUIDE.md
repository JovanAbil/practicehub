# Schools & Category Courses Guide

How to add/remove schools and manage which courses appear in each category.

---

## Overview

The site uses a **two-tier course organization** per category:

1. **AP / Universal courses** — shown at the top for everyone (e.g., AP Precalculus, AP US History)
2. **School-specific courses** — shown below in **collapsible dropdowns**, closed by default. Users click to expand a school's dropdown to see its courses.

---

## Configuration Files

| File | Purpose |
|------|---------|
| `src/data/schools-config.ts` | School definitions + needed courses popups |
| `src/data/category-courses.ts` | Course lists per category, split into AP vs school-specific |

---

## Adding a New School

### Step 1: Add to schools-config.ts

```ts
// In src/data/schools-config.ts, add to the SCHOOLS array:
{
  id: 'new-school',          // Unique lowercase ID, no spaces
  name: 'New School Name',   // Display name
  neededCourses: {
    math: ['Calculus'],       // Courses shown in the "needed" popup
    science: ['Physics'],
    social: [],
    english: [],
    other: [],
  },
},
```

### Step 2: Add courses to category-courses.ts

Open `src/data/category-courses.ts` and add entries under the school-specific sections:

```ts
// Example: Adding science courses for 'new-school'
export const scienceSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [ /* existing CSW courses */ ],
  'new-school': [
    {
      id: 'physics',
      name: 'Physics (Teacher Name)',
      subject: 'physics',      // Must match questionLoader key
      units: [
        { id: 'mechanics', name: 'Mechanics' },
        { id: 'waves', name: 'Waves' },
      ],
    },
  ],
};
```

Do this for each category where the school has courses: `mathSchoolCourses`, `scienceSchoolCourses`, `socialSchoolCourses`, `englishSchoolCourses`, `otherSchoolCourses`.

---

## Removing a School

1. Remove its entry from `SCHOOLS` array in `src/data/schools-config.ts`
2. Remove its entries from all `*SchoolCourses` objects in `src/data/category-courses.ts`

---

## Adding a Course to a School

1. Open `src/data/category-courses.ts`
2. Find the correct category section (e.g., `scienceSchoolCourses`)
3. Find the school by its ID
4. Add a new `CourseEntry` object to the array

### CourseEntry fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique course ID (used in routes) |
| `name` | string | Yes | Display name shown to users |
| `subject` | string | Yes | Must match the subject key in `questionLoader.ts` |
| `units` | array | Yes | List of `{ id, name }` unit objects |
| `comingSoon` | boolean | No | Shows "Coming Soon" lock instead of units |
| `hasChallenge` | boolean | No | Shows Course Challenge button |

---

## Adding an AP / Universal Course

AP courses go in the `*ApCourses` arrays (e.g., `mathApCourses`, `scienceApCourses`). These show at the top of the category for everyone, regardless of school selection.

```ts
export const scienceApCourses: CourseEntry[] = [
  {
    id: 'ap-bio',
    name: 'AP Biology',
    subject: 'ap-bio',
    units: [
      { id: 'ecology', name: 'Ecology' },
    ],
  },
];
```

---

## Removing a Course

Remove the course object from the appropriate array in `category-courses.ts`. The questionLoader does NOT need to change — it just won't be referenced anymore.

---

## How School Selection Works

1. When a user visits any category page, the app checks if a school has been selected
2. If no school is selected and there are multiple schools configured, a school selection dialog appears
3. The selected school is saved in `localStorage` under the key `selected-school-id`
4. Category pages show all schools' courses if no school is selected, or only the selected school's courses

---

## How School Dropdowns Work

School-specific courses are displayed in **collapsible dropdown sections**:

- Each school gets its own dropdown, labeled with the school name
- **All dropdowns are closed by default** — users must click to expand
- This keeps the page clean and lets users focus on the school they care about
- The collapsible component uses Radix UI's Collapsible primitive

If a school has no courses for a given category, its dropdown will not appear.

---

## Needed Courses Popup

The "Needed Courses" popup shows which courses are missing/needed for a given category. This is configured per school in `schools-config.ts`:

```ts
neededCourses: {
  math: ['Calculus', 'Statistics'],  // shown in Math category popup
  science: ['Physics'],               // shown in Science category popup
  // ...
},
```

Empty arrays `[]` mean no popup for that category.

---

## Other Category Special Rules

In the Other category, courses are ordered:
1. AP courses (e.g., AP CSP)
2. Drivers Education
3. Temporary Practice (only if it has units)
4. School-specific courses (at the bottom, in collapsible dropdowns)

---

## Files Involved

| File | Role |
|------|------|
| `src/data/schools-config.ts` | School definitions + needed courses |
| `src/data/category-courses.ts` | All course/unit lists per category and school |
| `src/components/SchoolSelector.tsx` | School selection dialog |
| `src/components/NeededCoursesPopup.tsx` | Needed courses popup |
| `src/pages/categories/*.tsx` | Category pages that read from category-courses.ts |

---

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `selected-school-id` | Stores the currently selected school's ID |

---

## Last Updated

April 2026
