# Performance Assumptions

## Overview

This document describes the expected data sizes, caching strategies, performance-sensitive logic, and limits you should not exceed.

---

## Expected Data Sizes

### Question Banks (Built-in)

| Subject | Approximate Questions | File Size |
|---------|----------------------|-----------|
| AP Precalculus | 150-200 | ~50-80 KB per topic file |
| Biology | 100-150 | ~40-60 KB per topic file |
| Chemistry | 100-150 | ~40-60 KB per topic file |
| World History | 100-150 | ~40-60 KB per topic file |
| Memory Training | 50-100 | ~20-40 KB per topic file |

**Total Application:** ~1-2 MB of question data (bundled in JS)

### LocalStorage Usage

| Data Type | Typical Size | Maximum Safe |
|-----------|--------------|--------------|
| Wrong Answers | 10-100 KB | 500 KB |
| Presets | 1-10 KB | 100 KB |
| Custom Units | 10-500 KB | 2 MB |
| Imported Questions | 10-200 KB per set | 1 MB total |
| **Total LocalStorage** | 50 KB - 1 MB typical | **5 MB limit** |

### Browser LocalStorage Limits

- **Chrome/Firefox/Safari:** ~5-10 MB per origin
- **Mobile Safari:** ~5 MB, aggressive eviction under storage pressure
- **Private/Incognito:** Works but clears on session end

---

## What is Cached vs Recomputed

### Cached (Memoized)

| Data | Where | Cache Key |
|------|-------|-----------|
| Question map | `Quiz.tsx`, `UnitDetail.tsx`, `ViewAllQuestions.tsx` | `useMemo(() => {...}, [])` |
| Selected units from route | `Quiz.tsx` | `useMemo(() => location.state?.selectedUnits, [location.state])` |
| Wrong questions from route | `Quiz.tsx` | `useMemo(() => location.state?.wrongQuestions, [location.state])` |

**Note:** Question data is loaded from static imports, effectively cached by the JavaScript runtime.

### Recomputed on Each Render

| Computation | When | Cost |
|-------------|------|------|
| Question shuffling | Quiz mount, question change | O(n) - acceptable |
| Option shuffling | Each question display | O(4) - trivial |
| Wrong answer count | Category page render | O(questions per subject) |
| Progress calculation | Each quiz state change | O(1) - trivial |

### Recomputed on Navigation

| Action | What Happens |
|--------|--------------|
| Navigate to quiz | Questions shuffled, timer reset |
| Navigate to results | Score calculated once |
| Navigate to category | Wrong counts re-read from localStorage |

---

## Performance-Sensitive Logic

### 1. Question Shuffling

**Location:** `Quiz.tsx` useEffect (line ~135-220)

**Algorithm:** Fisher-Yates via `.sort(() => Math.random() - 0.5)`

**Performance:** O(n log n) - acceptable for n < 1000

**Note:** The `.sort(() => Math.random() - 0.5)` approach is not perfectly uniform but is fast and adequate for this use case.

### 2. LocalStorage Read/Write

**Sensitive Operations:**
- Reading on component mount (happens once)
- Writing after quiz completion
- Writing on preset save

**Mitigation:**
- Reads are async via useEffect (doesn't block render)
- Writes are triggered by user action (not continuous)

### 3. LaTeX Rendering (MathText.tsx)

**Library:** KaTeX

**Performance Concern:** Complex LaTeX expressions can be slow to render.

**Mitigation:**
- Questions are rendered one at a time
- KaTeX is generally fast for simple expressions
- No observed issues with current content

### 4. Image Loading

**Concern:** Large images can delay quiz start.

**Current State:** No preloading implemented.

**Recommendation:** For image-heavy quizzes, consider:
```typescript
// Preload images before starting quiz
const preloadImages = async (questions: Question[]) => {
  const imageUrls = questions.map(q => q.image).filter(Boolean);
  await Promise.all(imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  }));
};
```

### 5. View All Questions Rendering

**Concern:** Rendering hundreds of questions at once.

**Current State:** All questions rendered in a single scroll view.

**Limit:** Works well for < 100 questions. May lag with 500+.

**Recommendation:** Add virtualization for large sets:
```typescript
// Use react-window or similar for virtual scrolling
import { FixedSizeList } from 'react-window';
```

---

## Limits You Should Not Exceed

### Hard Limits

| Limit | Value | Consequence if Exceeded |
|-------|-------|------------------------|
| LocalStorage total | 5 MB | QuotaExceededError, saves fail |
| Single question ID length | 100 chars | No technical limit, but unwieldy |
| Questions per topic | 1000 | Performance degradation |
| Options per MC question | 26 (A-Z) | UI breaks with more |
| Concurrent browser tabs | No limit | Data sync issues possible |

### Recommended Limits

| Metric | Recommended Max | Reason |
|--------|----------------|--------|
| Questions per topic file | 200 | Maintainability, file size |
| Topics per unit | 20 | Navigation usability |
| Custom units | 10 | LocalStorage usage |
| Questions per custom topic | 100 | LocalStorage + performance |
| Image size | 500 KB | LocalStorage for base64, loading time |
| LaTeX complexity | Moderate | KaTeX rendering time |
| Study resources per unit | 10 | UI clutter |
| Presets per user | 50 | LocalStorage usage |

---

## Performance Monitoring

### What to Watch

1. **Initial page load time:** Should be < 3s on 3G
2. **Quiz start time:** Should be instant (< 100ms)
3. **Question transition:** Should be instant (< 50ms)
4. **LocalStorage operations:** Should be < 10ms

### How to Monitor

```javascript
// Add to Quiz.tsx for debugging
useEffect(() => {
  const start = performance.now();
  // ... existing effect code ...
  console.log(`Quiz setup took ${performance.now() - start}ms`);
}, [dependencies]);
```

### Chrome DevTools

1. **Performance tab:** Record quiz flow, look for long tasks
2. **Application tab > Storage:** Monitor localStorage usage
3. **Network tab:** Check image loading times
4. **Console:** Look for errors and warnings

---

## Optimization Opportunities

### Low Priority (Current performance is acceptable)

1. **Lazy load question data:** Import only needed topics
2. **Virtualize long lists:** View All Questions, Results review
3. **Preload images:** Before quiz starts
4. **Web Workers:** Move shuffling off main thread (overkill)

### If Performance Becomes an Issue

1. **Split large topics:** Keep files < 50 questions
2. **Compress images:** Use WebP, optimize size
3. **Pagination:** Add to View All Questions
4. **Code splitting:** Lazy load category pages
5. **Service Worker:** Cache static assets

---

## Mobile Considerations

### iOS Safari Specific

- LocalStorage has 5MB limit, enforced strictly
- PWA mode has more generous storage
- Background tabs may be killed, losing quiz state

### Low-End Devices

- Avoid animations during quiz (distraction anyway)
- Keep DOM node count low (< 1000 on screen)
- Test on actual low-end hardware

### Touch Interactions

- All buttons are touch-friendly (48px minimum)
- Keyboard shortcuts won't work on mobile
- Consider larger tap targets for mobile

---

## Last Updated

April 2026
