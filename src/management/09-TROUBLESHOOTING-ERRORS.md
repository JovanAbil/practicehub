# Troubleshooting Guide - Fixing Common Errors

This guide explains common errors you might see in the CSW Studying app and how to fix them. Written so anyone can follow along!

---

## Table of Contents

1. [Understanding Error Messages](#understanding-error-messages)
2. [Terminal/Command Line Errors](#terminalcommand-line-errors)
3. [Browser Console Errors](#browser-console-errors)
4. [Build Errors](#build-errors)
5. [React Errors](#react-errors)
6. [TypeScript Errors](#typescript-errors)
7. [Styling Errors](#styling-errors)
8. [Data/Question Errors](#dataquestion-errors)
9. [Question Loader Errors](#question-loader-errors)
10. [Git Errors](#git-errors)
11. [Common Fixes for Everything](#common-fixes-for-everything)

---

## Understanding Error Messages

### How to Read an Error

Every error message has these parts:

```
Error: Cannot find module './MyComponent'
    at Object.<anonymous> (src/App.tsx:5:1)
```

1. **Error Type**: `Cannot find module` - What went wrong
2. **Details**: `'./MyComponent'` - Specific information
3. **Location**: `src/App.tsx:5:1` - File name, line 5, character 1

### Where to Find Errors

1. **Terminal**: Where you ran `npm run dev`
2. **Browser Console**: Press `F12` → Click "Console" tab
3. **Browser Page**: Sometimes errors show on the page itself

---

## Terminal/Command Line Errors

### Error: "npm: command not found"

**What it means**: Node.js is not installed on your computer.

**How to fix**:
1. Go to https://nodejs.org
2. Download the "LTS" version (the one that says "Recommended")
3. Run the installer
4. Close your terminal and open a new one
5. Try your command again

---

### Error: "ENOENT: no such file or directory"

**What it means**: You're trying to open a folder or file that doesn't exist.

**How to fix**:
1. Check if you spelled the folder name correctly
2. Make sure you're in the right folder
3. Use `ls` (Mac/Linux) or `dir` (Windows) to see what's in your current folder

**Example**:
```bash
# Wrong - folder doesn't exist
cd my-project

# Check what folders exist
ls

# Then go to the correct folder
cd practice-hub
```

---

### Error: "EACCES: permission denied"

**What it means**: You don't have permission to do something.

**How to fix (Mac/Linux)**:
```bash
sudo npm install
```
Then type your computer password.

**How to fix (Windows)**:
1. Close your terminal
2. Right-click on "Command Prompt" or "PowerShell"
3. Click "Run as administrator"
4. Try your command again

---

### Error: "npm ERR! code ERESOLVE"

**What it means**: Some packages don't work well together.

**How to fix**:
```bash
# Delete node_modules folder and package-lock.json
rm -rf node_modules package-lock.json

# On Windows, use:
rmdir /s node_modules
del package-lock.json

# Install again
npm install
```

---

### Error: "Port 8080 is already in use"

**What it means**: Another program is using port 8080.

**How to fix**:

**Option 1**: Find and close the other program

**Option 2**: Use a different port
```bash
npm run dev -- --port 3000
```
Then open http://localhost:3000 instead

**Option 3 (Mac/Linux)**: Kill the process using port 8080
```bash
lsof -ti:8080 | xargs kill -9
```

---

## Browser Console Errors

### Error: "Uncaught SyntaxError: Unexpected token '<'"

**What it means**: The browser expected JavaScript but got HTML instead.

**Common causes**:
1. Wrong file path for a script
2. Server returned a 404 error page

**How to fix**:
1. Check that all your import paths are correct
2. Make sure the file you're importing exists
3. Restart the development server: Stop it (Ctrl+C) and run `npm run dev` again

---

### Error: "Cannot read properties of undefined (reading 'xxx')"

**What it means**: You're trying to use something that doesn't exist.

**Example of the problem**:
```javascript
const user = undefined;
console.log(user.name);  // ERROR! user is undefined
```

**How to fix**: Add a check before using the value:
```javascript
const user = undefined;
console.log(user?.name);  // Safe! Returns undefined instead of crashing
```

**In your quiz code**, this might happen if:
- A question is missing a required field
- The questions array is empty

---

### Error: "404 Not Found" in Network tab

**What it means**: A file or page doesn't exist.

**How to fix**:
1. Check the URL that's failing (in the Network tab)
2. Make sure the file exists in your project
3. Check spelling and capitalization (matters on Linux servers!)

---

## Build Errors

### Error: "Module not found: Can't resolve 'xxx'"

**What it means**: You're trying to import something that doesn't exist.

**How to fix**:

1. **Check the file path**:
   ```typescript
   // Wrong - file doesn't exist
   import { Button } from './components/Buttons';
   
   // Correct
   import { Button } from './components/ui/button';
   ```

2. **Check if package is installed**:
   ```bash
   npm install package-name
   ```

3. **Check spelling**:
   - File names are case-sensitive!
   - `Button.tsx` is different from `button.tsx`

---

### Error: "Export 'xxx' was not found in 'yyy'"

**What it means**: You're importing something that the file doesn't export.

**How to fix**:

1. **Check what's actually exported**:
   ```typescript
   // In the file you're importing from:
   export const MyButton = () => {...}  // Named export
   export default MyButton;              // Default export
   ```

2. **Import correctly**:
   ```typescript
   // For named export:
   import { MyButton } from './MyButton';
   
   // For default export:
   import MyButton from './MyButton';
   ```

---

### Error: "Type 'xxx' is not assignable to type 'yyy'"

**What it means**: TypeScript expected one type but got another.

**Example**:
```typescript
// Error: Type 'string' is not assignable to type 'number'
const age: number = "twenty-five";

// Fixed:
const age: number = 25;
```

**How to fix**:
1. Change the value to match the expected type
2. Change the type definition to match the value
3. If the value can be multiple types, use union types: `string | number`

---

## React Errors

### Error: "Each child in a list should have a unique 'key' prop"

**What it means**: When you show a list of items, each needs a unique identifier.

**Wrong**:
```tsx
{questions.map(q => (
  <div>{q.text}</div>  // No key!
))}
```

**Correct**:
```tsx
{questions.map(q => (
  <div key={q.id}>{q.text}</div>  // Has unique key
))}
```

---

### Error: "Too many re-renders"

**What it means**: Your component is updating infinitely.

**Common cause**:
```tsx
// Wrong - this causes infinite loop!
const [count, setCount] = useState(0);
setCount(count + 1);  // Runs every render, causes another render

// Correct - only run once on mount
useEffect(() => {
  setCount(count + 1);
}, []);  // Empty array = run once
```

**How to fix**:
- Put state updates inside `useEffect`
- Make sure `useEffect` dependencies don't change every render

---

### Error: "Invalid hook call"

**What it means**: You're using hooks incorrectly.

**Rules for hooks**:
1. Only call hooks at the top level of your component
2. Never call hooks inside loops, conditions, or nested functions

**Wrong**:
```tsx
function MyComponent({ show }) {
  if (show) {
    const [value, setValue] = useState(0);  // Wrong! Inside condition
  }
}
```

**Correct**:
```tsx
function MyComponent({ show }) {
  const [value, setValue] = useState(0);  // Correct! At top level
  
  if (!show) return null;
  return <div>{value}</div>;
}
```

---

### Error: "Objects are not valid as a React child"

**What it means**: You're trying to display an object directly.

**Wrong**:
```tsx
const user = { name: "John", age: 25 };
return <div>{user}</div>;  // Error! Can't display object
```

**Correct**:
```tsx
const user = { name: "John", age: 25 };
return <div>{user.name}</div>;  // Display specific property
```

---

## TypeScript Errors

### Error: "Property 'xxx' does not exist on type 'yyy'"

**What it means**: You're trying to use a property that TypeScript doesn't know about.

**How to fix**:

1. **Add the property to the type**:
   ```typescript
   interface Question {
     id: string;
     text: string;
     newProperty: string;  // Add it here
   }
   ```

2. **Check spelling** - `questionText` vs `questiontext`

3. **Make it optional if it might not exist**:
   ```typescript
   interface Question {
     id: string;
     image?: string;  // ? means optional
   }
   ```

---

### Error: "Argument of type 'xxx' is not assignable to parameter of type 'yyy'"

**What it means**: You're passing the wrong type to a function.

**Example**:
```typescript
function greet(name: string) {
  console.log("Hello " + name);
}

greet(123);  // Error! Expected string, got number
greet("John");  // Correct
```

---

## Styling Errors

### Problem: Styles not applying

**Check these things**:

1. **Class name spelling**:
   ```tsx
   // Wrong
   <div className="bg-blu-500">
   
   // Correct
   <div className="bg-blue-500">
   ```

2. **Using className not class**:
   ```tsx
   // Wrong (HTML syntax)
   <div class="my-class">
   
   // Correct (React syntax)
   <div className="my-class">
   ```

3. **Tailwind classes exist**:
   - Check https://tailwindcss.com/docs for valid classes

---

### Problem: Dark mode not working

**Check these things**:

1. Make sure you're using theme variables:
   ```tsx
   // Wrong - hardcoded color
   <div className="bg-white text-black">
   
   // Correct - uses theme
   <div className="bg-background text-foreground">
   ```

2. Theme toggle is working in localStorage

---

## Data/Question Errors

### Problem: Questions not showing

**Check these things**:

1. **Questions file is exported correctly**:
   ```typescript
   // At bottom of questions file:
   export const myQuestions: Question[] = [...];
   ```

2. **Questions are imported in the right place**:
   - Check the category page imports the questions
   - Check the unit configuration includes the topic

3. **Question format is correct**:
   ```typescript
    {
      id: "unique-id",  // Required!
      type: "multiple-choice",  // Required!
      question: "What is 2+2?",  // Required!
      options: [  // Required for MC! Each option needs label, value, text
        { label: "A", value: "A", text: "2" },
        { label: "B", value: "B", text: "3" },
        { label: "C", value: "C", text: "4" },
        { label: "D", value: "D", text: "5" },
      ],
      correctAnswer: "C",  // Required! Must match an option's value
    }
   ```

---

### Problem: Images not loading

**Check these things**:

1. **Image path is correct**:
   ```typescript
   // For public folder images:
   image: "/images/chemistry/atomic1.png"
   
   // Note: starts with / and path from public folder
   ```

2. **File actually exists** in the exact location

3. **File name matches exactly** (including capitalization)

---

### Problem: Wrong answer not being saved

**Check these things**:

1. Open browser console (F12)
2. Go to Application tab → Local Storage
3. Look for `quiz-wrong-answers`
4. If it's corrupted, delete it and refresh

---

## Question Loader Errors

### Problem: Questions not found after adding new topic

**Check these things**:

1. **Import added to questionLoader.ts**
2. **Entry added to questionMap** with correct key format: `'subject-topic'`
3. **Variable name matches** the export from the questions file
4. **Unit added to category-courses.ts** — the unit must be in the correct course's `units` array

**Fix**: Ensure ALL pages use `getQuestionMap()` or `getQuestions()` from `src/utils/questionLoader.ts`:
```typescript
import { getQuestionMap } from '@/utils/questionLoader';

const questionMap = useMemo(() => getQuestionMap(), []);
```

### Problem: Unit doesn't appear on category page

**Cause**: Unit is registered in questionLoader.ts but not in category-courses.ts

**Fix**: Open `src/data/category-courses.ts` and add the unit to the correct course's `units` array.

---

## Git Errors

### Error: "fatal: not a git repository"

**What it means**: You're not in a Git folder.

**How to fix**:
```bash
# Check if you're in the right folder
pwd

# Navigate to your project folder
cd your-project-name

# Or initialize git if needed
git init
```

---

### Error: "Your branch is behind 'origin/main'"

**What it means**: Someone else pushed changes you don't have.

**How to fix**:
```bash
git pull
```

---

### Error: "Merge conflict in xxx"

**What it means**: Git can't automatically combine changes.

**How to fix**:
1. Open the file with the conflict
2. Look for these markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```
3. Decide which version to keep (or combine them)
4. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` lines
5. Save the file
6. Run:
   ```bash
   git add .
   git commit -m "Resolved merge conflict"
   ```

---

### Error: "Permission denied (publickey)"

**What it means**: GitHub doesn't recognize your computer.

**How to fix**:

1. **Generate SSH key**:
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```
   Press Enter for all prompts.

2. **Copy the key**:
   ```bash
   # Mac:
   pbcopy < ~/.ssh/id_ed25519.pub
   
   # Windows:
   clip < ~/.ssh/id_ed25519.pub
   
   # Linux:
   cat ~/.ssh/id_ed25519.pub
   # Then copy the output manually
   ```

3. **Add to GitHub**:
   - Go to GitHub.com → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your key
   - Click "Add SSH key"

---

## Common Fixes for Everything

### The Universal Fix: Restart Everything

When in doubt, try this sequence:

1. **Stop the development server**: Press `Ctrl + C` in terminal

2. **Clear the browser cache**:
   - Press `Ctrl + Shift + R` (hard refresh)
   - Or open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

3. **Delete node_modules and reinstall**:
   ```bash
   rm -rf node_modules
   npm install
   ```

4. **Restart the server**:
   ```bash
   npm run dev
   ```

---

### The Nuclear Option: Start Fresh

If nothing else works:

1. **Save your question files** - copy them somewhere safe

2. **Clone the repository again**:
   ```bash
   cd ..
   rm -rf your-project-folder
   git clone https://github.com/username/repo.git
   cd repo
   npm install
   ```

3. **Copy your question files back**

4. **Test**:
   ```bash
   npm run dev
   ```

---

### How to Search for Help

When you get an error you don't understand:

1. **Copy the exact error message**

2. **Google it** with "react" or "vite" or "typescript":
   - "react Cannot read properties of undefined"
   - "vite module not found"

3. **Check Stack Overflow** - usually the first result

4. **Look at the "Related" questions** on Stack Overflow

---

### How to Ask for Help

When posting on forums or asking someone:

1. **Include the exact error message**
2. **Include the relevant code** (not the whole file)
3. **Explain what you were trying to do**
4. **Explain what you expected to happen**
5. **Explain what actually happened**

**Good example**:
> I'm trying to add a new question to my quiz app. When I run `npm run dev`, I get this error:
> ```
> Error: Property 'options' is missing in type...
> ```
> Here's my question object:
> ```typescript
> { id: "q1", question: "What is 2+2?", correctAnswer: "4" }
> ```
> I expected it to work but I get a type error.

---

## Quick Reference: What Each Tool Does

| Tool | What it does | When to use it |
|------|-------------|----------------|
| `npm install` | Downloads all packages | After cloning, after package.json changes |
| `npm run dev` | Starts development server | When you want to see your site |
| `npm run build` | Creates production build | Before deploying |
| `git add .` | Stages all changes | Before committing |
| `git commit -m "x"` | Saves changes locally | After making changes |
| `git push` | Sends to GitHub | After committing |
| `git pull` | Gets changes from GitHub | Before starting work |
| `Ctrl + C` | Stops current process | To stop the dev server |
| `F12` | Opens browser DevTools | To see console errors |

---

## Quiz-Specific Troubleshooting

### Problem: Quiz progress lost on refresh

**Current behavior**: Quizzes auto-save progress to localStorage.

**If not working**, check:
1. Browser isn't in private/incognito mode
2. localStorage isn't full
3. The `in-progress-quiz-v1` key exists in Application > Storage > Local Storage

### Problem: Skip button not working properly

**Expected behavior**:
1. First skip: Question marked as skipped, moves to next
2. All questions answered: Transition screen appears asking about reviewing skipped
3. In skipped section: Shows "Skipped Question X of Y"
4. Skip again in review: Marks as SKIPPED_FINAL (won't revisit)
5. All finalized: Goes to results

**If broken**, check:
1. `handleSkip` function in Quiz.tsx
2. Attempt states: `skipped`, `userAnswer: 'SKIPPED'` vs `'SKIPPED_FINAL'`

### Problem: Wrong answers preset download not working

**Expected behavior**: Dialog appears to customize preset name before download.

**If broken**, check:
1. Dialog imports from `@/components/ui/dialog`
2. `handleOpenDownloadDialog` and `handleDownloadWrongAnswers` in Results.tsx

---

## Still Stuck?

1. Take a break! Fresh eyes help.
2. Read the error message carefully again.
3. Search the exact error on Google.
4. Check GitHub Issues for your packages.
5. Ask on Stack Overflow or Reddit r/reactjs.

---

## Last Updated

March 2026
