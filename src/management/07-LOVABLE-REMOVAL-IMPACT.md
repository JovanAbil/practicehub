# Lovable Removal Impact

## Overview

This document describes exactly what will stop working when you remove the project from Lovable, what requires manual replacement, and what is completely independent.

---

## What Will Stop Working

### 1. Automatic Deployment

- No automatic deployment to `cswstudying.lovable.app`
- Must manually build and deploy via GitHub Pages (see `08-GITHUB-HOSTING-GUIDE.md`)

### 2. Preview URLs

- No cloud previews — use `npm run dev` locally instead

### 3. Version History in Lovable UI

- Use Git for version control instead

### 4. Lovable Badge

- Badge no longer appears (no action needed)

### 5. AI-Assisted Code Editing

- No more Lovable chat-based development
- Use VS Code or another editor directly
- All code is standard React/TypeScript — any developer can work on it

---

## What Continues Working Automatically

### 1. Counter.dev Analytics

- Script is in `index.html`, loaded from Counter.dev CDN
- `PageViewTracker` component handles SPA route tracking via `navigator.sendBeacon`
- AdBlockDetector component works independently
- **Action needed**: Re-verify analytics tracking after migration (see below)

### 2. All Application Code

| Component | Status |
|-----------|--------|
| React components | ✅ Independent |
| Routing (React Router) | ✅ Independent |
| Styling (Tailwind CSS) | ✅ Independent |
| Math rendering (KaTeX) | ✅ Independent |
| Quiz logic | ✅ Independent |
| Quiz persistence/resume | ✅ Independent |
| Custom units / presets | ✅ Independent |
| Wrong answer tracking | ✅ Independent |
| Theme switching | ✅ Independent |
| ZIP export/import | ✅ Independent |
| Keyboard shortcuts | ✅ Independent |
| Site stats (shared config) | ✅ Independent |
| How to Use videos | ✅ Independent |
| Cookie consent | ✅ Independent |
| Terms of service modal | ✅ Independent |
| SPA page view tracking | ✅ Independent |

### 3. All User Data (localStorage)

All user data is stored in the browser and is completely independent:
- `quiz-wrong-answers` — wrong answer tracking
- `quiz-presets` — saved presets
- `custom-units-data` — custom units
- `in-progress-quiz-v1` — quiz resume state
- `theme` — theme preference
- `terms-accepted`, `cookie-consent` — consent flags

---

## What Requires Manual Replacement

### 1. Hosting Setup

See `08-GITHUB-HOSTING-GUIDE.md` for a comprehensive step-by-step guide covering:
- GitHub Pages setup with GitHub Actions
- SPA routing via 404.html redirect
- Custom domain configuration
- Edge cases and troubleshooting

### 2. Custom Domain (if applicable)

Update DNS records to point to your new hosting platform:
- A records for apex domain → GitHub Pages IPs
- CNAME record for www → `username.github.io`

### 3. Build Process

Already configured in package.json:
```bash
npm run build   # Build for production (output: dist/)
npm run dev     # Local development server
npm run preview # Preview production build locally
```

### 4. Analytics Re-Verification

After migrating to GitHub Pages:

1. **Verify the Counter.dev script** is still in `index.html`:
   ```html
   <script src="https://cdn.counter.dev/script.js" data-id="YOUR_ID" data-utcoffset="-5"></script>
   ```

2. **Verify SPA tracking** — The `PageViewTracker` component in `src/components/PageViewTracker.tsx` tracks route changes via `navigator.sendBeacon`. This works independently of hosting platform.

3. **Check Counter.dev dashboard** — Visit your site on the new domain, then check [counter.dev](https://counter.dev) to confirm visits are recorded.

4. **If using a custom domain**, Counter.dev will track the new domain automatically — no config change needed on their end. Your Counter.dev account is tied to the `data-id`, not the domain.

5. **If page views look wrong**, check:
   - The `data-id` in `index.html` matches your Counter.dev account
   - The `COUNTER_DEV_ID` in `PageViewTracker.tsx` matches the same ID
   - Adblockers aren't blocking `cdn.counter.dev` or `t.counter.dev`

---

## Code Cleanup After Leaving Lovable

### Files to Modify

1. **`vite.config.ts`** — Remove `lovable-tagger`, add `base` path
2. **`package.json`** — Remove `lovable-tagger` from devDependencies
3. **`index.html`** — Remove Lovable-specific meta tags (og:image, twitter:site, twitter:image pointing to lovable.dev)
4. **`src/components/Footer.tsx`** — Remove "made with Lovable" text if desired
5. **`src/App.tsx`** — Update `<BrowserRouter>` with a `basename` prop (see below)

### ⚠️ Critical: React Router `basename` for GitHub Pages

When hosting on GitHub Pages at `https://username.github.io/REPO_NAME/`, your app is served from a **subpath**, not the domain root. Both Vite's `base` and React Router's `basename` must be configured, **or all internal routes will 404 / redirect incorrectly**.

#### 1. `vite.config.ts` — set the asset base path

```ts
export default defineConfig(({ mode }) => ({
  base: "/REPO_NAME/",   // ← MUST match your GitHub repo name exactly, with trailing slash
  // ...rest unchanged
  plugins: [react()].filter(Boolean),  // remove componentTagger import + entry
}));
```

If you use a **custom domain** (via a `CNAME` file in `public/`), set `base: "/"` instead — the app is served from the root.

#### 2. `src/App.tsx` — add `basename` to `<BrowserRouter>`

Currently the project has:
```tsx
<BrowserRouter>
  <ScrollToTop />
  <PageViewTracker />
  ...
</BrowserRouter>
```

Change to:
```tsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
```

`import.meta.env.BASE_URL` is automatically populated from Vite's `base` config — `/REPO_NAME/` in production builds and `/` in dev. This keeps dev and prod working without manual edits.

#### 3. Hardcoded links audit

All internal navigation MUST go through React Router's `<Link to="/path">` or `useNavigate()`. These respect `basename` automatically.

❌ **Do NOT use** raw anchor tags for internal routes:
```tsx
<a href="/privacy">Privacy</a>   // breaks — goes to /privacy, not /REPO_NAME/privacy
```

✅ **Use** `<Link>`:
```tsx
<Link to="/privacy">Privacy</Link>
```

Search for `href="/` to find any internal links that need converting. External links (`https://...`, `mailto:`) are unaffected.

#### 4. Hardcoded asset paths in question data

Image paths used as runtime strings (e.g. `/images/chemistry/atomic1.png`) need to be prepended with `import.meta.env.BASE_URL`:

```tsx
<img src={`${import.meta.env.BASE_URL}images/chemistry/atomic1.png`} />
```

Note: no leading slash on the path when concatenating (since `BASE_URL` already ends with `/`).

### Dependencies to Clean Up

```bash
npm uninstall lovable-tagger
```

Also remove the `import { componentTagger } from "lovable-tagger"` line and its usage in `vite.config.ts`.

---

## Analytics Setup After Migration

### Counter.dev (Primary Analytics)

Counter.dev continues to work with no changes because:
1. The tracking script in `index.html` loads from Counter.dev's CDN
2. The `PageViewTracker` component sends beacons on route changes
3. Neither depends on Lovable infrastructure

**To verify after migration:**
1. Deploy to GitHub Pages
2. Visit your site in an incognito window
3. Wait 5 minutes
4. Check [counter.dev](https://counter.dev) dashboard
5. Confirm the visit was recorded

### If Counter.dev Stops Working

| Symptom | Cause | Fix |
|---------|-------|-----|
| No data at all | Script blocked or removed | Re-add script to `index.html` |
| Only initial page loads tracked | `PageViewTracker` not mounted | Verify it's inside `<BrowserRouter>` in `App.tsx` |
| Data shows old domain | Normal — Counter.dev tracks by `data-id` | No fix needed; old and new domains merge |
| Adblock popup showing | Counter.dev blocked | Expected behavior — users must whitelist |

### Switching to a Different Analytics Provider

If you want to switch from Counter.dev:
1. Remove the Counter.dev script from `index.html`
2. Replace `PageViewTracker.tsx` with your new provider's SPA tracking
3. Update `AdBlockDetector.tsx` to detect the new provider (or remove adblocker enforcement)
4. Update `src/data/site-stats.ts` with stats from your new provider

---

## Migration Checklist

### Before Leaving Lovable

- [ ] Export code to GitHub (Settings > GitHub)
- [ ] Download a local copy as backup
- [ ] Test build locally: `npm run build`
- [ ] Note your Counter.dev `data-id` from `index.html`

### Setting Up New Hosting

- [ ] Follow `08-GITHUB-HOSTING-GUIDE.md` step by step
- [ ] Remove `lovable-tagger` from `vite.config.ts` and `package.json`
- [ ] Add `base: "/YOUR_REPO_NAME/"` to `vite.config.ts`
- [ ] Remove Lovable meta tags from `index.html`
- [ ] Add SPA redirect script to `index.html` `<head>`
- [ ] Create `public/404.html` for SPA routing
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Push and enable GitHub Pages (source: GitHub Actions)
- [ ] Verify site works at GitHub Pages URL
- [ ] Set up custom domain (if needed)

### After Migration

- [ ] Verify all pages load correctly
- [ ] Test quiz functionality end-to-end
- [ ] Test quiz resume after refresh
- [ ] Verify images load correctly
- [ ] Verify videos load on How to Use page
- [ ] Check math rendering works
- [ ] Test on mobile devices
- [ ] Verify Counter.dev analytics tracking
- [ ] Verify PageViewTracker tracks route changes
- [ ] Test adblock detection still works
- [ ] Check cookie consent banner appears
- [ ] Verify dark/light theme toggle

---

## Edge Cases After Migration

### 1. GitHub Pages 404 on Direct URL Access

**Problem:** Navigating directly to `/category/math` shows GitHub's 404 page.

**Fix:** Ensure `public/404.html` exists with the SPA redirect script, and `index.html` has the corresponding decode script in `<head>`.

### 2. Images Return 404

**Problem:** Images at `/images/chemistry/atomic1.png` don't load.

**Fix:** On GitHub Pages, the base path is `/YOUR_REPO_NAME/`. Vite's `base` config handles this for bundled assets, but hardcoded image paths in question data need the base prepended — or use relative paths. The `base` config in `vite.config.ts` should handle `public/` assets automatically.

### 3. Videos Don't Load

**Problem:** Tutorial videos in `public/videos/` don't load on GitHub Pages.

**Fix:** Same as images — ensure they're in the `public/` folder and paths are correct. GitHub has a 100MB file size limit per file; use LFS for larger files or host videos externally.

### 4. localStorage Doesn't Transfer

**Problem:** User's custom units, wrong answers, and presets are gone after migration.

**Fix:** This is expected — localStorage is per-origin. Users on the old `cswstudying.lovable.app` domain have data stored there. On the new `username.github.io` domain, they start fresh. **There is no way to transfer localStorage across domains.** Warn users to export custom units before the migration.

### 5. Service Worker Cache

**Problem:** Old service worker from Lovable serves stale content.

**Fix:** If Lovable registered a service worker, it may cache old assets. Users may need to clear site data. This resolves itself as the old domain stops being used.

---

## Summary

| Category | Action Required |
|----------|-----------------|
| Hosting | Set up GitHub Pages |
| Code | Remove lovable-tagger, update meta tags, add base path |
| Analytics | Verify Counter.dev works on new domain |
| Data | ✅ Works as-is (but doesn't transfer across domains) |
| Features | ✅ Works as-is |
| Videos | ✅ Works as-is (check file size limits) |

**Bottom Line:** The application is 100% functional without Lovable. You only need to set up alternative hosting and verify analytics.

---

## Last Updated

April 2026
