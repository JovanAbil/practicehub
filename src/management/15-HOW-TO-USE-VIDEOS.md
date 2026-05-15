# How-to-Use Section Videos Guide

How to add tutorial videos to the How to Use page (/how-to-use).

---

## Overview

Each section on the How to Use page can display an optional tutorial video at the top. Videos are configured in a single data file — no code changes required to add, remove, or swap videos.

---

## Files Involved

| File | Role |
|------|------|
| `src/data/how-to-use-videos.ts` | Video configuration — maps section IDs to video files |
| `src/components/SectionVideo.tsx` | Video player component (renders `<video>` with controls) |
| `src/pages/HowToUse.tsx` | How to Use page (reads from config, renders videos) |
| `public/videos/how-to-use/` | Where video files live (create this folder) |

---

## Step-by-Step: Adding a Video

### Step 1: Prepare the Video File

- **Format**: `.mp4` (best browser compatibility) or `.webm` (smaller file size)
- **Size**: Keep under 10 MB for fast loading; compress if needed
- **Resolution**: 720p or 1080p is fine; wider aspect ratios (16:9) look best
- **Tools**: Use HandBrake (free) to compress large videos

### Step 2: Place the Video File

Create the folder if it doesn't exist:
```
public/videos/how-to-use/
```

Place your video file there:
```
public/videos/how-to-use/getting-started.mp4
public/videos/how-to-use/quiz-modes.mp4
etc.
```

### Step 3: Update the Configuration

Open `src/data/how-to-use-videos.ts` and change the `null` for your section to a video config:

```typescript
// Before:
'getting-started': null,

// After:
'getting-started': {
  src: '/videos/how-to-use/getting-started.mp4',
  label: 'Video walkthrough of getting started with Practice Hub',
},
```

### Step 4: (Optional) Add a Poster Image

A poster is the thumbnail shown before the video plays:

```typescript
'getting-started': {
  src: '/videos/how-to-use/getting-started.mp4',
  label: 'Getting started walkthrough',
  poster: '/videos/how-to-use/getting-started-poster.jpg',
},
```

Place the poster image in the same `public/videos/how-to-use/` folder.

### That's It!

The video will automatically appear at the top of that section on the How to Use page.

---

## Section IDs

These are the valid section keys in `how-to-use-videos.ts`:

| Section ID | Section Title |
|------------|--------------|
| `getting-started` | Getting Started |
| `quiz-modes` | Quiz Modes |
| `question-types` | Question Types |
| `keyboard-controls` | Keyboard Controls |
| `custom-units` | Creating Custom Units & Topics |
| `quiz-features` | Quiz Features |
| `troubleshooting` | Troubleshooting |
| `tips` | Tips |

---

## Removing a Video

Set the section back to `null`:

```typescript
'getting-started': null,
```

You can optionally delete the video file from `public/videos/how-to-use/` as well.

---

## Replacing a Video

1. Place the new video file in `public/videos/how-to-use/`
2. Update the `src` path in `how-to-use-videos.ts`
3. Delete the old file if no longer needed

---

## Adding a New Section

If you add a new section to the How to Use page:

1. Give it a unique section ID string
2. Add a `{renderVideo('your-section-id')}` call at the top of the `<Card>` in `HowToUse.tsx`
3. Add the key to the `howToUseVideos` object in `how-to-use-videos.ts` (set to `null` initially)

---

## Video Player Behavior

- Videos show native browser controls (play, pause, seek, volume, fullscreen)
- Videos do NOT autoplay
- Videos load metadata only (not the full file) until the user hits play
- Videos are responsive (full width, max height 400px)
- Poster image (if set) shows before playback

---

## Best Practices

1. **Keep videos short** — 30 seconds to 2 minutes per section
2. **Show, don't tell** — demonstrate the actual UI interaction
3. **No audio required** — many users watch without sound
4. **Compress before uploading** — use HandBrake or similar
5. **Use descriptive file names** — `getting-started.mp4`, not `video1.mp4`

---

## GitHub Pages Note

When hosting on GitHub Pages, video files in `public/` are served as static assets. Large videos (>50MB) may hit GitHub's file size limits. If you need large videos, consider hosting them externally (YouTube, Vimeo) and linking instead. For external videos, you'd need to modify `SectionVideo.tsx` to support iframe embeds.

---

## Troubleshooting

### Video doesn't appear
- Check that the section ID in `how-to-use-videos.ts` matches exactly
- Verify the video file exists at the specified path in `public/`
- Check browser console for 404 errors

### Video won't play
- Ensure the format is `.mp4` (H.264 codec) or `.webm` (VP9 codec)
- Test in multiple browsers (Chrome, Firefox, Safari)
- Check file isn't corrupted — try playing it locally first

### Video is too large / slow to load
- Compress with HandBrake (target: 1-5 MB for 1-minute video)
- Reduce resolution to 720p
- Consider using `.webm` format (usually 30-50% smaller)

---

## Last Updated

April 2026
