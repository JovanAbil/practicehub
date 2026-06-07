# How-to-Use Section Videos Guide (GitHub Pages compatible)

How to add tutorial videos to the How to Use page (/how-to-use), with the
asset paths set up so they work on **both** Lovable hosting and on standalone
GitHub Pages under a repo path.

---

## Files

| File | Role |
|------|------|
| `src/data/how-to-use-videos.ts` | Maps section IDs → `{ src, poster?, label }`. |
| `src/components/SectionVideo.tsx` | Renders `<video>`. MUST wrap `src` and `poster` with `resolveImagePath`. |
| `src/utils/resolveImagePath.ts` | The hosting-agnostic path rewriter (see [19-IMAGE-ROUTING-FIX.md](./19-IMAGE-ROUTING-FIX.md)). |
| `src/pages/HowToUse.tsx` | Reads the config and renders the videos. |
| `public/videos/how-to-use/` | Where the actual `.mp4` / `.webm` / poster files live. |

---

## One-time setup — make `SectionVideo` GitHub-Pages-safe

If you have not already done so, update `src/components/SectionVideo.tsx`
to wrap `src` and `poster`:

```tsx
import { resolveImagePath } from '@/utils/resolveImagePath';
import type { SectionVideo as SectionVideoType } from '@/data/how-to-use-videos';

interface SectionVideoProps {
  video: SectionVideoType;
}

export const SectionVideo = ({ video }: SectionVideoProps) => {
  return (
    <div className="mb-4 rounded-lg overflow-hidden border border-border bg-muted/30">
      <video
        src={resolveImagePath(video.src)}
        poster={resolveImagePath(video.poster)}
        controls
        preload="metadata"
        className="w-full max-h-[400px] object-contain bg-black"
        aria-label={video.label}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
```

Why this matters: data files store absolute paths like
`/videos/how-to-use/getting-started.mp4`. On GitHub Pages the actual URL is
`/<repo-name>/videos/...`. Without `resolveImagePath`, the browser asks for
`github.io/videos/...` and gets a 404.

---

## Adding a video — step by step

### 1. Prepare the file
- `.mp4` (H.264) or `.webm` (VP9)
- Under ~10 MB; compress with HandBrake
- 720p / 1080p, 16:9

### 2. Drop it into `public/`
```
public/videos/how-to-use/getting-started.mp4
public/videos/how-to-use/getting-started-poster.jpg   (optional)
```

GitHub Pages serves the `public/` folder at the deployment root, so your
asset will be reachable at
`https://<user>.github.io/<repo>/videos/how-to-use/getting-started.mp4`
**only because** `resolveImagePath` prepends `/<repo>/` at runtime.

### 3. Register it in `how-to-use-videos.ts`

```ts
'getting-started': {
  src: '/videos/how-to-use/getting-started.mp4',
  label: 'Video walkthrough of getting started with Practice Hub',
  poster: '/videos/how-to-use/getting-started-poster.jpg', // optional
},
```

**Always use the leading `/`** — `resolveImagePath` requires it.
Never write paths like `videos/...` (no leading slash) or
`https://cswstudying.lovable.app/videos/...` (hard-coded domain).

### 4. Verify
- Local: `npm run dev` → video request goes to
  `localhost:8080/videos/how-to-use/getting-started.mp4`. ✅
- GitHub Pages: open the deployed URL → request goes to
  `github.io/<repo>/videos/how-to-use/getting-started.mp4`. ✅

---

## Section IDs

| Section ID | Title |
|---|---|
| `getting-started` | Getting Started |
| `quiz-modes` | Quiz Modes |
| `question-types` | Question Types |
| `keyboard-controls` | Keyboard Controls |
| `custom-units` | Creating Custom Units & Topics |
| `quiz-features` | Quiz Features |
| `troubleshooting` | Troubleshooting |
| `tips` | Tips |

---

## Removing / replacing a video

- **Remove**: set the section to `null` in `how-to-use-videos.ts`. Optionally
  delete the file from `public/videos/how-to-use/`.
- **Replace**: drop the new file in `public/videos/how-to-use/` and update
  the `src` (and `poster` if used).

---

## Adding a new section

1. Pick a unique `sectionId`.
2. In `HowToUse.tsx`, add `{renderVideo('your-section-id')}` at the top of
   the `<Card>`.
3. Add the key to `how-to-use-videos.ts`, initially `null`.

---

## GitHub Pages file-size limits

GitHub blocks individual files > 100 MB on push, and warns at 50 MB.
Keep videos small (target 1–5 MB). For anything larger, host externally
(YouTube/Vimeo) and modify `SectionVideo.tsx` to render an `<iframe>`
instead — note the iframe `src` will be a full `https://...` URL and
therefore passes through `resolveImagePath` untouched.

---

## Future-proofing (custom domain / backend)

The `resolveImagePath` wrap also handles a future migration:

- Custom domain at root → `base: '/'` → wrap is a no-op.
- Asset CDN / backend → change `resolveImagePath` only; this file stays
  untouched.

See [19-IMAGE-ROUTING-FIX.md](./19-IMAGE-ROUTING-FIX.md) and
[23-HOSTING-PORTABILITY.md](./23-HOSTING-PORTABILITY.md).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Video 404 on GitHub Pages | Confirm `vite.config.ts` has `base: '/<repo>/'` for production builds AND `SectionVideo.tsx` wraps `src`/`poster` in `resolveImagePath`. |
| Video plays but poster missing | `poster={...}` was not wrapped. |
| Video works locally, breaks on GitHub | Same as the first row — almost always missing `resolveImagePath`. |
| File too large to push | Compress with HandBrake or host externally. |
