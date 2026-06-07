# Hosting Portability — GitHub Pages, Lovable, Future Backend

This is the cross-cutting rules doc. Every other management file is written
assuming these rules already hold. When in doubt, **this file wins.**

The project must run identically on:

1. **Lovable preview / published** — domain root, `base: '/'`.
2. **Standalone GitHub Pages** — under a repo path, `base: '/<repo>/'`.
3. **Future custom domain** — root again, `base: '/'`.
4. **Future backend / CDN** — same frontend, with a separate origin for
   data and assets.

If your change breaks any of those, it is wrong.

---

## The four rules

### Rule 1 — Never hard-code the Lovable domain

Never write `https://cswstudying.lovable.app/...` in code, data, or links.
Use relative URLs (`/foo`) or build URLs from
`window.location.origin + import.meta.env.BASE_URL + ...`.

### Rule 2 — All static asset paths go through `resolveImagePath`

Anything rendered as a `src=` / `poster=` / `href=` to a path beginning with
`/` (i.e. `public/`-served assets — images, videos, posters, audio, PDFs)
MUST be wrapped with `resolveImagePath()` from
`src/utils/resolveImagePath.ts`. See
[19-IMAGE-ROUTING-FIX.md](./19-IMAGE-ROUTING-FIX.md) for the full inventory.

This includes new components added in the future — treat a raw `src={x.image}`
as a bug.

### Rule 3 — Routing uses React Router only, with SPA fallback

All internal navigation uses `<Link>` / `navigate()`. Never use
`<a href="/...">` for internal routes — that triggers a hard page load and
breaks deep-linking on GitHub Pages without `404.html`.

GitHub Pages SPA fallback is implemented via `public/404.html` (see core
memory). Do not remove it.

### Rule 4 — Backend assumptions must be optional

There is currently **no backend**. Any feature that wants a backend must:

- Work in a degraded local-only mode (localStorage) when no backend is
  configured.
- Read its API base URL from `import.meta.env.VITE_API_URL` (or similar) —
  never hard-coded.
- Tolerate `VITE_API_URL` being unset (= no backend) without crashing the
  app.

This lets the same build run on GitHub Pages (no backend) and on a future
host (with backend) from the same source tree.

---

## Where each rule shows up

| Concern | Rule | Doc |
|---|---|---|
| Question images | Rule 2 | [19-IMAGE-ROUTING-FIX.md](./19-IMAGE-ROUTING-FIX.md) |
| How-to-use videos | Rule 2 | [15-HOW-TO-USE-VIDEOS.md](./15-HOW-TO-USE-VIDEOS.md) |
| Ads | Rule 1, 4 | [14-ADVERTISEMENTS-GUIDE.md](./14-ADVERTISEMENTS-GUIDE.md) |
| AI proxy / payments | Rule 4 | [18-BACKEND-AND-AI-SETUP.md](./18-BACKEND-AND-AI-SETUP.md) |
| Counter.dev analytics | Rule 1 | [12-COUNTER-DEV-ANALYTICS.md](./12-COUNTER-DEV-ANALYTICS.md) |
| Public presets / downloads | Rule 1 (Blob URLs are fine) | [22-PUBLIC-PRESETS-GUIDE.md](./22-PUBLIC-PRESETS-GUIDE.md) |
| Site Moved popup | Rule 1 | `src/components/SiteMovedDialog.tsx` |
| Custom-unit ZIP imports | Rule 2 | [04-EDGE-CASES-AND-FAILURE-MODES.md](./04-EDGE-CASES-AND-FAILURE-MODES.md) |

---

## `vite.config.ts` — the canonical setup

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode, command }) => ({
  // Dev + Lovable: '/'. Production build for GitHub Pages: '/<repo>/'.
  base: command === 'build' ? '/YOUR_REPO_NAME/' : '/',
  server: { host: "::", port: 8080 },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
```

When you fork or rename the repo, this is the **one** line to change.

---

## Building share-safe URLs

When generating any URL that needs to be shareable (download links, deep
links, "open this preset" URLs), construct it as:

```ts
const shareUrl =
  window.location.origin +
  import.meta.env.BASE_URL +              // already trailing-slashed
  `quiz/${subject}/${unitId}`;             // no leading slash
```

This produces:

- Lovable: `https://cswstudying.lovable.app/quiz/...`
- GitHub Pages: `https://user.github.io/repo/quiz/...`
- Custom domain: `https://practicehub.example.com/quiz/...`

…all from the same source.

---

## Backend forward-compatibility checklist

When (not if) a backend is added:

- [ ] Read the base URL from `import.meta.env.VITE_API_URL`.
- [ ] Fall back to local-only behaviour if it's unset.
- [ ] Never put secrets in source — use environment variables documented in
      [18-BACKEND-AND-AI-SETUP.md](./18-BACKEND-AND-AI-SETUP.md).
- [ ] CORS must allow `https://<user>.github.io` (GitHub Pages) **and** the
      Lovable preview origin **and** any custom domain.
- [ ] Auth tokens stored in `localStorage` are per-origin — moving hosts =
      logout. Document it; don't try to share across origins.
- [ ] Asset CDN logic lives **only** inside `resolveImagePath`.

Following these rules means a backend can be added later without touching
99% of the codebase.
