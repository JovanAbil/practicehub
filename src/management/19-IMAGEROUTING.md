# Image & Asset Routing on GitHub Pages

This is the **GitHub-Pages-specific** guide. The site is built to be hosted
on `https://<username>.github.io/<repo-name>/`, which means **every absolute
path in the source** (`/images/...`, `/videos/...`, `/audio/...`) must be
rewritten at runtime to include the repo's base path.

The data files do **not** change. Only the components that render
`<img>` / `<video>` / `<source>` tags are updated to wrap their `src` with
`resolveImagePath()`.

> If you ever move the project to a custom domain, a backend host (Vercel,
> Netlify, your own server), or a sub-path, this same utility keeps
> working — it just becomes a no-op when `BASE_URL` is `/`.

---

## 1. The utility — `src/utils/resolveImagePath.ts`

Create this file once (if missing). It is the only piece of code you ever
need to think about for asset routing.

```ts
/**
 * Rewrite an absolute asset path so it works under any deployment base.
 *
 * - Lovable / local dev / custom domain at root:  BASE_URL = "/"  → unchanged
 * - GitHub Pages at /repo-name/:                  BASE_URL = "/repo-name/"
 *                                                 "/images/x.png" → "/repo-name/images/x.png"
 * - External URLs (http/https/data/blob):         returned untouched
 */
export const resolveImagePath = (path: string | undefined): string | undefined => {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/')) {
    const base = import.meta.env.BASE_URL; // already trailing-slashed
    return base + path.slice(1);
  }
  return path;
};
```

Same function works for `.png`, `.jpg`, `.svg`, `.webp`, `.mp4`, `.webm`,
posters, audio, downloads — anything served from `public/`.

---

## 2. `vite.config.ts` — set `base` for GitHub Pages

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode, command }) => ({
  // "/" during dev so localhost works; repo path only for production build.
  base: command === 'build' ? '/YOUR_REPO_NAME/' : '/',
  server: { host: "::", port: 8080 },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
```

Replace `YOUR_REPO_NAME` with the actual GitHub repository name (e.g.
`/practicehub/`). Trailing slash required.

---

## 3. Every file that renders a question/asset `src` — apply the wrap

Search before you edit — line numbers shift over time:

```bash
rg -n "src=\{[^}]*\.image\}" src/
rg -n "src=\{[^}]*\.poster\}" src/
rg -n "<video[^>]*src=" src/
```

Below is the current inventory. For each `src={X}` listed, change it to
`src={resolveImagePath(X)}` and add the import at the top of the file:

```tsx
import { resolveImagePath } from '@/utils/resolveImagePath';
```

### `src/pages/Quiz.tsx`
- ~L924 — `currentQuestion.image` (main question image)
- ~L959 — `option.image` (MCQ option)
- ~L1020 — `option.image` (Select-All option)

### `src/components/PartsQuestionView.tsx`
- ~L129 — `question.image`
- ~L167 — `part.image`
- ~L203 — `option.image` (MCQ inside a part)
- ~L250 — `option.image` (Select-All inside a part)

### `src/pages/ViewAllQuestions.tsx` (current line numbers verified)
- **L113** — `<img src={question.image} ...>` → `src={resolveImagePath(question.image)}`
- **L119** — `<img src={option.image} ...>` (MCQ option)
- **L129** — `<img src={option.image} ...>` (Select-All option)
- **L157** — `<img src={part.image} ...>`
- **L163** — `<img src={opt.image} ...>` (option inside a part)

### `src/pages/CustomTopicEditor.tsx`
- **L838** — `editingQuestion.image` (preview thumbnail)
- **L925** — `option.image` (option preview)
- **L1030** — `part.image` (part preview)

(These are user-uploaded blob URLs most of the time, so `resolveImagePath`
becomes a no-op — but wrap them anyway for safety in case a user pastes a
`/images/...` path from a previous export.)

### `src/components/SharedImageDialog.tsx`
- **L74** — `<img src={imageUrl} ...>` → `src={resolveImagePath(imageUrl)}`

### `src/components/SectionVideo.tsx` (How-to-use videos)
- `<video src={video.src} poster={video.poster} ...>` →
  `src={resolveImagePath(video.src)} poster={resolveImagePath(video.poster)}`

  See [15-HOW-TO-USE-VIDEOS.md](./15-HOW-TO-USE-VIDEOS.md) for the full
  context.

### `src/pages/QuestionGenerator.tsx`
- Any `<img src={...}>` that points at `/images/...` — wrap it.

### Anywhere else
If you add a new component that renders an asset, **the wrap is mandatory**.
Treat the absence of `resolveImagePath` on a `src={...}` as a bug.

---

## 4. Verification checklist after editing

1. `npm run dev` → load a quiz with images → DevTools Network tab → image
   URL should be `http://localhost:8080/images/...`. ✅
2. Push to GitHub → GitHub Actions builds → open
   `https://<user>.github.io/<repo>/` → image URL should be
   `https://<user>.github.io/<repo>/images/...`. ✅
3. Repeat for one How-to-use video, one Parts question image, one
   View-All-Questions image, one SharedImageDialog open.

---

## 5. Why we keep data files untouched

| Reason | Detail |
|---|---|
| Repo renames | Rename the GitHub repo → only `vite.config.ts` changes. |
| Multiple environments | Same data file works in dev, Lovable preview, and GitHub Pages. |
| ZIP imports | Custom-unit ZIP exports embed `/images/...` paths; changing the format breaks every existing export. |
| Hundreds of files | 50+ question files reference images. |
| Future backend | If a backend is added later (e.g. an asset CDN), only `resolveImagePath` changes — data stays put. |

---

## 6. Future-proofing notes (custom domain / backend)

If/when the project leaves GitHub Pages:

- **Custom domain at root** (`practicehub.example.com`) — set
  `base: '/'` in `vite.config.ts`. `resolveImagePath` becomes a no-op
  automatically. No data or component changes.
- **Backend / CDN for assets** (e.g. Supabase Storage, Cloudflare R2) —
  modify `resolveImagePath` only:

  ```ts
  const ASSET_CDN = import.meta.env.VITE_ASSET_CDN ?? '';
  if (path.startsWith('/images/')) return ASSET_CDN + path;
  ```

  Nothing in the components or data files needs to change.

Treat `resolveImagePath` as the **one and only** seam between source paths
and the deployed URL space. Keep all hosting decisions inside it.

---

## 7. Troubleshooting

| Symptom | Likely cause |
|---|---|
| Image works locally, 404 on GitHub Pages | Missing `base` in `vite.config.ts`, or a component still uses raw `src={...image}`. |
| Image 404 locally after adding `base` | You set a non-conditional `base` — use the `command === 'build'` pattern shown above. |
| Some images work, others don't | Grep for `src={` again — you missed a component. SectionVideo, SharedImageDialog, and ViewAllQuestions are commonly forgotten. |
| Video poster is broken but video plays | You wrapped `src` but not `poster`. Both need `resolveImagePath`. |
