# Fixing Image Routing for GitHub Pages Hosting

This guide explains how to make images load correctly when the site is hosted on GitHub Pages with a repository name in the URL, **without changing the data file format**.

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [Why You Should NOT Change Data Files](#2-why-you-should-not-change-data-files)
3. [The Solution](#3-the-solution)
4. [Step-by-Step Implementation](#4-step-by-step-implementation)
5. [How It Works](#5-how-it-works)
6. [Verification Checklist](#6-verification-checklist)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. The Problem

Question data files store image paths as absolute URLs like this:

```typescript
image: '/images/chemistry/acid-base-diagram.png'
```

This works perfectly on **Lovable hosting** because the site is served from the domain root (`https://cswstudying.lovable.app`), so `/images/...` resolves to the correct folder.

However, on **GitHub Pages**, your site URL includes the repository name:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

When the browser sees `/images/chemistry/acid-base-diagram.png`, it resolves it relative to the **domain root**, not the repository:

```
❌ https://YOUR_USERNAME.github.io/images/chemistry/acid-base-diagram.png
```

Instead of:

```
✅ https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/images/chemistry/acid-base-diagram.png
```

This causes **all images to appear broken** on GitHub Pages.

---

## 2. Why You Should NOT Change Data Files

You might think: "Just change all the image paths in the data files to include the repo name."

**Do not do this.** Here is why:

| Problem | Explanation |
|---------|-------------|
| **Repo name changes** | If you rename the repository or fork it under a different name, every path becomes wrong again. |
| **Multiple environments** | The same data files need to work on Lovable preview, local dev (`localhost`), and GitHub Pages simultaneously. |
| **Hundreds of files** | There are 50+ question files with images. Updating them all is unmaintainable. |
| **ZIP exports break** | Custom unit ZIP exports store the same `/images/...` format. Changing the format would break imports. |
| **Standard convention** | `/images/subject/filename.png` is the project's documented standard (see `03-QUESTION-FORMATTING.md`). |

**The correct approach** is to fix the path **at display time in the code**, leaving the data files untouched.

---

## 3. The Solution

Create a small utility function that prepends Vite's `BASE_URL` to absolute image paths at runtime.

Vite provides `import.meta.env.BASE_URL` which is automatically set from the `base` field in `vite.config.ts`:

- On Lovable / local dev: `BASE_URL` is `/`
- On GitHub Pages with `base: "/cswstudying/"`: `BASE_URL` is `/cswstudying/`

The utility strips the leading slash from the image path, appends it to `BASE_URL`, and produces the correct URL for any environment.

---

## 4. Step-by-Step Implementation

### Step 1: Create the Utility

Create `src/utils/resolveImagePath.ts`:

```typescript
/**
 * Resolve an image path for the current deployment environment.
 *
 * Data files always use absolute paths like `/images/subject/file.png`.
 * When hosted on GitHub Pages with a repo name, we need to prepend
 * import.meta.env.BASE_URL so the browser requests the correct URL.
 *
 * @param path The raw image path from question data
 * @returns The environment-corrected path
 */
export const resolveImagePath = (path: string | undefined): string | undefined => {
  if (!path) return path;

  // External URLs (http:// or https://) pass through untouched
  if (path.startsWith('http')) {
    return path;
  }

  // Absolute paths like /images/... need BASE_URL prepended
  if (path.startsWith('/')) {
    // import.meta.env.BASE_URL already ends with / when configured
    // e.g. "/cswstudying/" + "images/chemistry/file.png"
    const base = import.meta.env.BASE_URL;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return base + cleanPath;
  }

  // Relative paths pass through unchanged
  return path;
};
```

### Step 2: Update Image Rendering in Quiz.tsx

Import the utility at the top of `src/pages/Quiz.tsx`:

```typescript
import { resolveImagePath } from '@/utils/resolveImagePath';
```

Find every place where a question image is rendered. There are three locations:

**Location A — Question image (around line 924):**

```typescript
// BEFORE
<img 
  src={currentQuestion.image} 
  alt="Question diagram" 
  className="..."
/>

// AFTER
<img 
  src={resolveImagePath(currentQuestion.image)} 
  alt="Question diagram" 
  className="..."
/>
```

**Location B — Multiple choice option image (around line 959):**

```typescript
// BEFORE
<img 
  src={option.image} 
  alt={`Option ${idx + 1}`} 
  className="..."
/>

// AFTER
<img 
  src={resolveImagePath(option.image)} 
  alt={`Option ${idx + 1}`} 
  className="..."
/>
```

**Location C — Select-all option image (around line 1020):**

Apply the same `resolveImagePath(option.image)` change.

### Step 3: Update Image Rendering in PartsQuestionView.tsx

Import the utility at the top of `src/components/PartsQuestionView.tsx`:

```typescript
import { resolveImagePath } from '@/utils/resolveImagePath';
```

Apply `resolveImagePath()` to all four image locations:

1. **Main question image** (around line 129): `src={resolveImagePath(question.image)}`
2. **Part image** (around line 167): `src={resolveImagePath(part.image)}`
3. **MCQ option image** (around line 203): `src={resolveImagePath(option.image)}`
4. **Select-all option image** (around line 250): `src={resolveImagePath(option.image)}`

### Step 4: Update Any Other Image Locations

Search the codebase for any other `<img>` tags that render question data:

```bash
# Find all img tags that use question-derived paths
grep -rn "src={.*\.image}" src/
```

Also check these files (they may display question images):
- `src/pages/ViewAllQuestions.tsx`
- `src/pages/CustomTopicEditor.tsx`
- `src/pages/QuestionGenerator.tsx`
- Any other component that renders `<img>` from question data

Apply the same pattern everywhere.

### Step 5: Ensure vite.config.ts Has the Correct `base`

Open `vite.config.ts`. For GitHub Pages hosting, it must have a `base` field matching your repository name:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/YOUR_REPO_NAME/",  // ← REQUIRED for GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**CRITICAL:** Replace `YOUR_REPO_NAME` with your actual repository name. Examples:

| Repository URL | `base` value |
|----------------|--------------|
| `github.com/john/cswstudying` | `base: "/cswstudying/"` |
| `github.com/john/practicehub` | `base: "/practicehub/"` |
| `github.com/john/study-app` | `base: "/study-app/"` |

The trailing slash is required.

---

## 5. How It Works

Here is what happens at runtime in each environment:

### Local Development (`npm run dev`)

```
vite.config.ts base: not set (defaults to "/")
import.meta.env.BASE_URL = "/"

Data path:     /images/chemistry/diagram.png
Resolved:      "/" + "images/chemistry/diagram.png"
Final URL:     /images/chemistry/diagram.png  ✅
```

### Lovable Hosting

```
vite.config.ts base: not set (defaults to "/")
import.meta.env.BASE_URL = "/"

Data path:     /images/chemistry/diagram.png
Resolved:      "/" + "images/chemistry/diagram.png"
Final URL:     /images/chemistry/diagram.png  ✅
```

### GitHub Pages

```
vite.config.ts base: "/cswstudying/"
import.meta.env.BASE_URL = "/cswstudying/"

Data path:     /images/chemistry/diagram.png
Resolved:      "/cswstudying/" + "images/chemistry/diagram.png"
Final URL:     /cswstudying/images/chemistry/diagram.png  ✅
```

The data file stays exactly the same. Only the runtime rendering code adapts.

---

## 6. Verification Checklist

After making these changes, verify images load in every context:

### Local Development
- [ ] Run `npm run dev`
- [ ] Start a quiz that contains images (e.g., Chemistry > Atomic Structure)
- [ ] Images load correctly
- [ ] Open browser DevTools → Network tab → confirm image requests go to `localhost:8080/images/...`

### GitHub Pages
- [ ] Push changes to GitHub
- [ ] Wait for the Actions workflow to deploy (green checkmark)
- [ ] Visit `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- [ ] Start a quiz with images
- [ ] Images load correctly
- [ ] Open browser DevTools → Network tab → confirm image requests go to `github.io/YOUR_REPO_NAME/images/...`

### Image Types to Test
Test at least one of each:
- [ ] Question-level image (`question.image`)
- [ ] Part-level image (`part.image` inside a parts question)
- [ ] Multiple-choice option image (`option.image`)
- [ ] Select-all option image (`option.image`)

---

## 7. Troubleshooting

### Images still broken on GitHub Pages

1. **Check `vite.config.ts`** — Did you add `base: "/YOUR_REPO_NAME/"` with the correct repo name and trailing slash?

2. **Check the deployed `vite.config.ts`** — Make sure the change was committed and pushed. The GitHub Actions workflow must rebuild after the change.

3. **Check DevTools Network tab** — What URL is the browser actually requesting? If it still starts with `/images/` without the repo name, the `resolveImagePath` function is not being called.

4. **Hard refresh** — Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) to bypass the browser cache.

### Images broken locally after adding `base`

If you set `base` to a repo name like `/cswstudying/` but you are testing locally at `localhost:8080`, the browser will request `localhost:8080/cswstudying/images/...` which does not exist.

**Solution:** Use a conditional base:

```typescript
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/YOUR_REPO_NAME/' : '/',
  // ... rest of config
}));
```

This uses `/` during `npm run dev` and `/YOUR_REPO_NAME/` only for production builds.

### "Cannot find module '@/utils/resolveImagePath'"

Make sure:
1. The file exists at `src/utils/resolveImagePath.ts`
2. You are using the exact import path: `import { resolveImagePath } from '@/utils/resolveImagePath';`
3. Restart the dev server after creating the file

---

## Summary

| What | Keep Unchanged | Change |
|------|---------------|--------|
| Data files (`*-questions.ts`) | `/images/subject/file.png` format | Nothing |
| `vite.config.ts` | Alias and plugin config | Add `base: "/repo-name/"` |
| Quiz display code | Everything else | Wrap `src={...}` with `resolveImagePath()` |
| New utility file | — | Create `src/utils/resolveImagePath.ts` |

This approach is future-proof: if you rename the repository, you only change one line in `vite.config.ts`. All data files and display logic remain exactly the same.
