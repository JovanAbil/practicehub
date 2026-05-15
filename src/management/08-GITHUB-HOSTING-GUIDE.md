# Complete Guide: Remove Lovable and Host on GitHub Pages

This is a comprehensive, step-by-step guide to completely remove your project from Lovable and host it for free on GitHub Pages. Written for beginners — no prior experience needed.

---

## Table of Contents

1. [What You Need (Prerequisites)](#1-what-you-need-prerequisites)
2. [Export Your Code to GitHub](#2-export-your-code-to-github)
3. [Install Software on Your Computer](#3-install-software-on-your-computer)
4. [Download the Code to Your Computer](#4-download-the-code-to-your-computer)
5. [Open and Explore the Project](#5-open-and-explore-the-project)
6. [Install Project Dependencies](#6-install-project-dependencies)
7. [Test Locally Before Changing Anything](#7-test-locally-before-changing-anything)
8. [Remove Lovable-Specific Code](#8-remove-lovable-specific-code)
9. [Configure for GitHub Pages](#9-configure-for-github-pages)
10. [Create the Deployment Workflow](#10-create-the-deployment-workflow)
11. [Push Changes to GitHub](#11-push-changes-to-github)
12. [Enable GitHub Pages](#12-enable-github-pages)
13. [Verify Everything Works](#13-verify-everything-works)
14. [Making Future Changes](#14-making-future-changes)
15. [Custom Domain Setup (Optional)](#15-custom-domain-setup-optional)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. What You Need (Prerequisites)

All of these are **free**:

| Software | Where to Get It | What It Does |
|----------|-----------------|--------------|
| **GitHub Account** | [github.com](https://github.com) | Hosts your code and website |
| **GitHub Desktop** | [desktop.github.com](https://desktop.github.com) | Visual tool to manage code changes |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com) | Code editor to make changes |
| **Node.js** | [nodejs.org](https://nodejs.org) (get the LTS version) | Runs JavaScript tools |

### Installing Node.js (Detailed)

1. Go to [nodejs.org](https://nodejs.org)
2. Click the big green **"LTS"** button (stands for Long Term Support)
3. Run the downloaded installer
4. Click **Next** through all steps — keep all defaults checked
5. When it says "Tools for Native Modules", check the box if asked
6. Click **Install**, then **Finish**
7. **Restart your computer** (important!)

### Verify Node.js is Installed

After restarting, open a terminal/command prompt and type:
```bash
node --version
```
You should see something like `v20.11.0`. If you see "command not found", reinstall Node.js.

---

## 2. Export Your Code to GitHub

### If GitHub is NOT connected to Lovable yet:

1. Open your Lovable project at [lovable.dev](https://lovable.dev)
2. Click the **gear icon** (Settings) in the top-right area
3. Click **GitHub** in the sidebar
4. Click **Connect to GitHub**
5. A popup asks you to authorize Lovable — click **Authorize**
6. Select your GitHub account
7. Click **Create Repository**
8. Enter a name for your repository (e.g., `cswstudying`)
9. Click **Create**
10. Wait until it says **"Connected"** — your code is now on GitHub!

### If GitHub IS already connected:

1. Open your Lovable project
2. Go to Settings → GitHub
3. Note the repository name — you'll need it later
4. Make sure it says **"Synced"** (your latest code is on GitHub)

**Write down your repository name: `________________`**

---

## 3. Install Software on Your Computer

### Install GitHub Desktop

1. Go to [desktop.github.com](https://desktop.github.com)
2. Click **Download for Windows** (or Mac)
3. Run the installer
4. When it opens, click **Sign in to GitHub.com**
5. Enter your GitHub username and password in the browser
6. Click **Authorize desktop**
7. Back in GitHub Desktop, choose your email from the list
8. Click **Finish**

### Install VS Code

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click **Download for Windows** (or Mac)
3. Run the installer
4. **Important:** Check these boxes during installation:
   - ✅ "Add to PATH"
   - ✅ "Register Code as an editor for supported file types"
   - ✅ "Add 'Open with Code' action to Windows Explorer file context menu"
5. Click **Install**, then **Finish**

---

## 4. Download the Code to Your Computer

**"Cloning" = downloading your code from GitHub to your computer**

1. Open **GitHub Desktop**
2. Click **File** → **Clone Repository**
3. You'll see a list of your repositories — find yours (e.g., `cswstudying`)
   - If you don't see it, click the **URL** tab and paste: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
4. Click **Choose...** next to "Local Path"
5. Select a location (e.g., your **Desktop** — easy to find)
6. Click **Clone**
7. Wait for it to finish downloading
8. You'll see **"No local changes"** — that means it worked!

**Your project is now in a folder on your computer!**

---

## 5. Open and Explore the Project

1. In **GitHub Desktop**, click **Repository** → **Open in Visual Studio Code**
   - Alternatively: Open VS Code → File → Open Folder → select your project folder
2. You'll see all your files in the left sidebar (Explorer panel)
3. If VS Code asks **"Do you trust the authors?"**, click **Yes, I trust the authors**

Take a moment to explore the structure:
```
your-project/
├── public/           ← Images, favicon, static files
├── src/              ← All the application code
│   ├── components/   ← Reusable UI pieces
│   ├── data/         ← Question banks and configs
│   ├── pages/        ← Page components
│   └── ...
├── index.html        ← Main HTML file
├── package.json      ← Project configuration
├── vite.config.ts    ← Build configuration
└── ...
```

---

## 6. Install Project Dependencies

Your project uses many code libraries that need to be downloaded.

1. In VS Code, open the terminal: **Terminal** → **New Terminal** (or press `` Ctrl+` ``)
2. A panel opens at the bottom of VS Code
3. Type this command and press **Enter**:
   ```bash
   npm install
   ```
4. Wait for it to finish (1-3 minutes)
5. You'll see **"added X packages"** when done
6. A new `node_modules` folder will appear in the file explorer

**If you get errors**, try:
```bash
# Delete existing files and reinstall
rm -rf node_modules package-lock.json
npm install
```

On Windows, if `rm` doesn't work:
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 7. Test Locally Before Changing Anything

Before making any changes, verify the app works on your computer:

1. In the VS Code terminal, type:
   ```bash
   npm run dev
   ```
2. You'll see output like:
   ```
   VITE v5.x.x  ready in XXX ms
   ➜  Local:   http://localhost:8080/
   ```
3. Open your browser and go to **http://localhost:8080**
4. Verify the site loads and works correctly:
   - ✅ Homepage loads with categories
   - ✅ Can navigate to a subject
   - ✅ Can start a quiz
   - ✅ Theme toggle works
5. When done testing, press **Ctrl+C** in the terminal to stop the server

---

## 8. Remove Lovable-Specific Code

### 8.1. Clean Up `vite.config.ts`

This is the build configuration file. We need to remove the Lovable tagger and add a `base` path for GitHub Pages.

1. Open `vite.config.ts` in VS Code
2. **Replace the entire contents** with this:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// IMPORTANT: Replace YOUR_REPO_NAME with your actual GitHub repository name!
// Example: if your repo is "cswstudying", use "/cswstudying/"
export default defineConfig({
  base: "/YOUR_REPO_NAME/",
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

3. **CRITICAL: Change `/YOUR_REPO_NAME/` to your actual repository name!**
   - If your repo is `cswstudying`, change it to `base: "/cswstudying/"`
   - If your repo is `quiz-app`, change it to `base: "/quiz-app/"`
   - This must match EXACTLY (case-sensitive!)

4. Save the file (**Ctrl+S** or **Cmd+S**)

### 8.2. Remove `lovable-tagger` from `package.json`

1. Open `package.json`
2. Find the line that says `"lovable-tagger"` in the `devDependencies` section
3. Delete that entire line
4. Make sure there are no trailing commas causing errors
5. Save the file

### 8.3. Clean Up `index.html`

1. Open `index.html` (in the root folder)
2. Remove these Lovable-specific lines:

```html
<!-- DELETE these lines -->
<meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
<meta name="twitter:site" content="@lovable_dev" />
<meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
```

3. **Keep** the Counter.dev analytics script at the bottom — it works independently:
```html
<!-- KEEP this -->
<script src="https://cdn.counter.dev/script.js" data-id="..." data-utcoffset="-5"></script>
```

4. Save the file

### 8.4. Remove Lovable Badge (Optional)

1. Open `src/components/Footer.tsx`
2. Look for any text mentioning "Lovable" or "made with Lovable"
3. Remove or replace it with your own text
4. Save the file

### 8.5. Delete `.github` Folder (if it exists)

If there's an existing `.github` folder from Lovable:
1. In VS Code, right-click the `.github` folder
2. Click **Delete**
3. Confirm deletion

We'll create a new one in the next step.

### 8.6. Reinstall Dependencies

Run this in the terminal to update everything without lovable-tagger:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 8.7. Test Again

```bash
npm run dev
```
Verify the app still works at http://localhost:8080. Stop with **Ctrl+C** when done.

---

## 9. Configure for GitHub Pages

GitHub Pages needs special handling for single-page applications (SPAs) because it doesn't understand client-side routing.

### 9.1. Create `404.html` for Routing

When someone visits a route like `/category/math`, GitHub Pages would normally show a 404 error. This file redirects those requests back to your app.

1. Right-click the **`public`** folder in VS Code
2. Click **New File**
3. Name it: `404.html`
4. Paste this content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Single Page App redirect for GitHub Pages
      // This catches URLs like /category/math and redirects them
      // to the main page, which then handles routing client-side
      var pathSegmentsToKeep = 1; // Keep 1 segment for repo name in path
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    Redirecting...
  </body>
</html>
```

5. Save the file

### 9.2. Add Redirect Script to `index.html`

The `404.html` redirects to the main page with the original URL encoded in the query string. This script in `index.html` decodes it and restores the correct URL.

1. Open `index.html`
2. Add this script **immediately after** the opening `<head>` tag:

```html
<script>
  // Handle GitHub Pages SPA redirect
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

Your `index.html` `<head>` should now start like:
```html
<head>
  <script>
    // Handle GitHub Pages SPA redirect
    (function(l) { ... }(window.location))
  </script>
  <meta charset="UTF-8" />
  ...
```

3. Save the file

---

## 10. Create the Deployment Workflow

GitHub Actions will automatically build and deploy your site whenever you push code changes.

### 10.1. Create the Folder Structure

1. In VS Code, right-click in the file explorer (left sidebar, on empty space)
2. Click **New Folder**
3. Name it: `.github`
4. Right-click the new `.github` folder
5. Click **New Folder**
6. Name it: `workflows`

### 10.2. Create the Workflow File

1. Right-click the `workflows` folder
2. Click **New File**
3. Name it: `deploy.yml`
4. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:  # Allows you to manually trigger from GitHub

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build the project
        run: npm run build
      
      - name: Setup GitHub Pages
        uses: actions/configure-pages@v4
      
      - name: Upload build output
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Save the file

---

## 11. Push Changes to GitHub

Now send all your changes from your computer to GitHub.

### Using GitHub Desktop:

1. Open **GitHub Desktop**
2. It should show your project with a list of changed files on the left
3. Review the changes:
   - Modified: `vite.config.ts`, `package.json`, `index.html`
   - Added: `public/404.html`, `.github/workflows/deploy.yml`
   - Deleted: any old `.github` files
4. At the bottom left, fill in:
   - **Summary (required):** `Set up GitHub Pages deployment, remove Lovable`
   - **Description:** (optional, leave blank)
5. Click the blue **Commit to main** button
6. Click **Push origin** (button at top, or in the center area)
7. Wait for the push to complete (usually a few seconds)

---

## 12. Enable GitHub Pages

Tell GitHub to serve your website from the deployment workflow.

1. Open your browser
2. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
3. Click the **Settings** tab (the gear icon tab, not the dropdown)
4. In the left sidebar, click **Pages**
5. Under **"Build and deployment"**:
   - **Source:** Select **GitHub Actions** (not "Deploy from a branch")
6. Go to the **Actions** tab (in the top navigation)
7. You should see a workflow running (orange spinning circle)
8. Wait for it to complete (green checkmark) — takes 2-3 minutes
9. If it fails (red X), click on it to see the error message and check [Troubleshooting](#16-troubleshooting)
10. Go back to **Settings** → **Pages**
11. You'll see: **"Your site is live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`"**
12. Click the link to visit your live site! 🎉

---

## 13. Verify Everything Works

Go through this checklist on your new GitHub Pages site:

### Basic Functionality
- [ ] Homepage loads with all category cards
- [ ] Site stats appear below "Scroll down" text
- [ ] Categories link to correct pages

### Navigation
- [ ] All internal links work (click each category)
- [ ] Back button works correctly
- [ ] Direct URL access works (e.g., paste `/category/math` in address bar)
- [ ] Footer links work

### Quiz System
- [ ] Can start a quiz (Cram Study)
- [ ] Questions display correctly
- [ ] Images load in questions
- [ ] Math/LaTeX renders correctly
- [ ] Skip button works
- [ ] Skip transition screen appears
- [ ] Results page shows after completing
- [ ] Wrong answers are saved
- [ ] Quiz progress persists on page refresh (resume feature)

### Other Features
- [ ] Theme toggle (light/dark) works
- [ ] "View All Questions" page works
- [ ] "Build Custom Practice" (Preset Builder) works
- [ ] Custom units can be created
- [ ] Keyboard shortcuts work (1-5, Enter, arrows)
- [ ] Data/Statistics page loads

### Analytics
- [ ] Counter.dev is tracking (check your Counter.dev dashboard after visiting)

### Mobile
- [ ] Site works on mobile devices/responsive

---

## 14. Making Future Changes

After your site is live, here's the workflow for making updates:

### Step 1: Open and Edit

1. Open **VS Code** with your project
2. Make your changes (add questions, fix text, update stats, etc.)
3. Save all changed files (**Ctrl+S**)

### Step 2: Test Locally (Recommended)

1. Open terminal in VS Code
2. Run: `npm run dev`
3. Open browser to `http://localhost:8080`
4. Verify your changes work correctly
5. Press **Ctrl+C** to stop

### Step 3: Push to GitHub

1. Open **GitHub Desktop**
2. You'll see a list of your changed files
3. Write a summary describing what you changed (e.g., "Added 10 new chemistry questions")
4. Click **Commit to main**
5. Click **Push origin**

### Step 4: Wait for Deployment

1. Go to your GitHub repository in the browser
2. Click the **Actions** tab
3. Watch the workflow run (orange circle → green checkmark)
4. Once green (2-3 minutes), your site is updated!

### Common Changes You'll Make

| Task | What to Edit |
|------|-------------|
| Update site stats | `src/data/site-stats.ts` |
| Add questions | `src/data/{subject}/{topic}-questions.ts` + `questionLoader.ts` |
| Add a new topic | See `src/management/02-CONTENT-AUTHORING-GUIDE.md` |
| Update data points | `src/pages/DataStatistics.tsx` (the `dataPoints` array) |
| Change contributors | `src/components/CreditsSection.tsx` |
| Add study resources | `src/data/external-study-resources.ts` |

---

## 15. Custom Domain Setup (Optional)

If you want to use your own domain (e.g., `www.mysite.com`):

### Step 1: Update `vite.config.ts`

Change the base to just `/`:
```typescript
base: "/",
```

### Step 2: Create CNAME File

1. Create a file called `CNAME` (no file extension) in the `public` folder
2. Put your domain on the first line:
```
www.yourdomain.com
```

### Step 3: Update `404.html`

Change `pathSegmentsToKeep` from `1` to `0`:
```javascript
var pathSegmentsToKeep = 0;
```

### Step 4: Configure DNS at Your Domain Registrar

**For apex domain (yourdomain.com):**

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For www subdomain:**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR_USERNAME.github.io |

### Step 5: Configure in GitHub

1. Go to repository **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain
3. Click **Save**
4. Wait for DNS to propagate (can take up to 48 hours, usually 10-30 minutes)
5. Check **"Enforce HTTPS"** once available

### Step 6: Commit and Push

Commit the changes to `vite.config.ts`, `public/CNAME`, and `public/404.html`, then push.

---

## 16. Troubleshooting

### Build Fails in GitHub Actions

1. Go to the **Actions** tab on GitHub
2. Click the failed workflow (red X)
3. Click on the **"build"** job
4. Read the error message — it will tell you what went wrong

**Common errors:**

| Error | Fix |
|-------|-----|
| `Cannot find module 'lovable-tagger'` | Make sure you removed it from `vite.config.ts` AND `package.json`, then ran `npm install` |
| TypeScript error | Fix the code error mentioned in the message |
| `npm ci` fails | Delete `package-lock.json`, run `npm install` locally, commit and push the new lock file |
| `Permission denied` on Pages | Go to repo Settings → Actions → General → Workflow permissions → set to "Read and write" |
| `Error: No uploaded artifact was found` | Check the `path` in `upload-pages-artifact` matches your build output (`./dist` for Vite) |

### Site Shows 404 or Blank Page

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| 404 on all pages | `base` in `vite.config.ts` doesn't match repo name | Fix the base path (case-sensitive!) |
| Blank white page | `404.html` redirect not working | Check `404.html` is in `public/` folder |
| Routing 404s | Missing redirect script in `index.html` | Add the SPA redirect script to `<head>` |
| Works locally, 404 on GH Pages | Forgot to set `base` | Add `base: "/your-repo-name/"` to vite.config.ts |
| 404 only on refresh/direct URL | `404.html` missing or misconfigured | Verify `pathSegmentsToKeep` matches your setup (1 for repo, 0 for custom domain) |

### Images Not Loading

1. Check the browser console (F12 → Console) for 404 errors
2. Verify images are in the `public/` folder
3. Check paths are correct and case-sensitive
4. GitHub Pages URLs include the repo name: `/YOUR_REPO/images/...`
5. Vite's `base` config should handle the prefix automatically for `public/` assets

### Videos Not Loading

1. Same rules as images — check paths and `public/` folder
2. GitHub has a **100 MB file size limit** per file
3. For files > 100 MB, use [Git LFS](https://git-lfs.github.com/) or host externally
4. Ensure video format is `.mp4` (H.264) for best browser compatibility

### CSS/Styles Missing

1. Make sure `npm run build` succeeds locally
2. Check the browser console for errors
3. Try clearing your browser cache (Ctrl+Shift+R)

### "It works locally but not on GitHub Pages"

The most common cause is the `base` path in `vite.config.ts`. When developing locally, paths like `/images/photo.png` work fine. On GitHub Pages, the correct path becomes `/YOUR_REPO/images/photo.png`. The `base` config handles this automatically — make sure it's set correctly.

---

## 17. Re-Setting Up Analytics After Migration

### Counter.dev (Already Integrated)

Counter.dev continues working automatically because the tracking script loads from their CDN, not from Lovable.

**Verify after migration:**

1. Deploy your site to GitHub Pages
2. Open the site in an incognito/private window
3. Navigate to a few pages
4. Wait 5 minutes
5. Log in to [counter.dev](https://counter.dev)
6. Check that visits appear

**If visits don't appear:**

| Check | What to Look For |
|-------|-----------------|
| `index.html` | Counter.dev `<script>` tag still present at bottom of `<body>` |
| `data-id` attribute | Matches your Counter.dev account ID |
| Browser DevTools → Network | Requests to `cdn.counter.dev` not blocked |
| `PageViewTracker.tsx` | Component is mounted inside `<BrowserRouter>` in `App.tsx` |
| `COUNTER_DEV_ID` | In `PageViewTracker.tsx` matches the `data-id` in `index.html` |

### SPA Route Tracking

The `PageViewTracker` component (`src/components/PageViewTracker.tsx`) sends a beacon to Counter.dev on every React Router route change. This is critical for SPAs because the Counter.dev inline script only fires once on initial HTML load.

**How it works:**
1. `useLocation()` hook detects route changes
2. On each change (except the first render), sends `navigator.sendBeacon` to `https://t.counter.dev/trackpage`
3. Parameters include: page path, screen size, UTC offset, and your Counter.dev ID

**If route tracking stops working:**
- Check that `<PageViewTracker />` is rendered inside `<BrowserRouter>` in `App.tsx`
- Check that `navigator.sendBeacon` isn't blocked by the browser
- Verify the Counter.dev ID in `PageViewTracker.tsx` matches your account

### Updating Site Stats

Stats displayed on the website come from `src/data/site-stats.ts`:

```typescript
export const SITE_STATS = {
  totalVisitors: 338,
  totalPageviews: 2252,
  lastUpdated: "Feb 11, 2026",
};
```

After migration, continue updating this file manually from your Counter.dev dashboard.

---

## 18. Edge Cases & Advanced Scenarios

### localStorage Doesn't Transfer Across Domains

When you move from `cswstudying.lovable.app` to `username.github.io/repo`, all user data stored in localStorage is lost. This includes:
- Custom units and topics
- Wrong answer tracking
- Saved presets
- Quiz progress
- Theme preference

**Mitigation:**
1. Warn users in advance (e.g., announcement on the site)
2. Encourage users to export custom units as ZIP backups before migration
3. After migration, users can re-import their ZIP files

### GitHub Repository Size Limits

| Limit | Value | Notes |
|-------|-------|-------|
| Recommended repo size | < 1 GB | GitHub warns above this |
| Max file size (regular) | 100 MB | Push will fail |
| Max file size (LFS) | 2 GB | Requires Git LFS setup |
| GitHub Pages site size | 1 GB | Soft limit |
| Bandwidth | 100 GB/month | Soft limit |

**If you hit size limits:**
- Compress images (use WebP instead of PNG)
- Host large videos externally (YouTube, Vimeo)
- Use Git LFS for binary files over 50 MB

### Custom Domain with HTTPS

After setting up a custom domain:

1. GitHub Pages provides free SSL via Let's Encrypt
2. It can take up to 24 hours for HTTPS to activate
3. Check "Enforce HTTPS" in Settings → Pages once the certificate is issued
4. If HTTPS isn't working after 24 hours:
   - Remove the custom domain, save, re-add it, save
   - This forces a new certificate request

### Branch Protection

For production sites, consider enabling branch protection:

1. Go to Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable: "Require a pull request before merging"
4. This prevents accidental direct pushes to the live site

### Multiple Environments

If you want a staging environment:

1. Create a `staging` branch
2. Create a second GitHub repository (e.g., `cswstudying-staging`)
3. Push the `staging` branch to the staging repo
4. Enable GitHub Pages on the staging repo
5. Test changes there before merging to `main` in the production repo

### Rollback a Bad Deploy

If you push a broken change:

**Option 1: Revert via GitHub Desktop**
1. Open GitHub Desktop
2. Click History
3. Right-click the bad commit
4. Click "Revert Changes in Commit"
5. Push the revert commit

**Option 2: Revert via command line**
```bash
git revert HEAD
git push
```

**Option 3: Force deploy an older version**
1. Go to the Actions tab on GitHub
2. Find the last successful deploy
3. Click "Re-run all jobs"

---

## Quick Reference Card

| Task | Command / Action |
|------|-----------------|
| Open project | GitHub Desktop → Repository → Open in VS Code |
| Install dependencies | Terminal: `npm install` |
| Test locally | Terminal: `npm run dev` → Browser: localhost:8080 |
| Build for production | Terminal: `npm run build` |
| Save file | VS Code: Ctrl+S (Cmd+S on Mac) |
| Commit changes | GitHub Desktop: Write summary → Commit to main |
| Push to GitHub | GitHub Desktop: Push origin |
| View live site | `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` |
| Check deployment | GitHub.com → your repo → Actions tab |
| View build errors | Actions tab → click failed run → click "build" job |
| Verify analytics | counter.dev dashboard → check recent visits |

---

## Final Verification Checklist

Before considering the migration complete:

- [ ] Site loads at GitHub Pages URL
- [ ] All pages and routes work
- [ ] Direct URL access works (e.g., paste `/category/math`)
- [ ] Quizzes work end-to-end
- [ ] Quiz resume on refresh works
- [ ] Images load correctly
- [ ] Videos load on How to Use page
- [ ] Math/LaTeX renders
- [ ] Theme toggle works
- [ ] Mobile view is responsive
- [ ] Counter.dev analytics tracks visits
- [ ] SPA page view tracking works (check multiple route visits in dashboard)
- [ ] Adblock detection works
- [ ] Cookie consent banner appears
- [ ] Can push changes and see them deploy automatically

**🎉 Congratulations! Your site is now completely independent and hosted for free on GitHub Pages!**

---

## Last Updated

March 2026
