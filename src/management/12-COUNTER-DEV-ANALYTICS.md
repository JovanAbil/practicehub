# Counter.dev Analytics Integration

## Overview

This guide explains the Counter.dev analytics integration, which provides real-time visitor tracking with minimal setup. Counter.dev is the **primary analytics provider** for CSW Studying.

---

## Table of Contents

1. [What is Counter.dev](#what-is-counterdev)
2. [How It Works](#how-it-works)
3. [SPA Tracking](#spa-tracking)
4. [Adblocker Detection](#adblocker-detection)
5. [Dashboard Access](#dashboard-access)
6. [Manual Stats Update](#manual-stats-update)

---

## What is Counter.dev

Counter.dev is a free, privacy-friendly, real-time analytics service. It requires no cookie consent banners and provides:

- Real-time visitor counts
- Page view tracking
- Referrer tracking
- Country/region data
- Device/browser information

**Dashboard URL:** [counter.dev](https://counter.dev)

---

## How It Works

The tracking script is added to `index.html`:

```html
<script src="https://cdn.counter.dev/script.js" data-id="YOUR_ID" data-utcoffset="-5"></script>
```

| Attribute | Purpose |
|-----------|---------|
| `src` | Counter.dev tracking script CDN URL |
| `data-id` | Your unique Counter.dev account identifier |
| `data-utcoffset` | Timezone offset for accurate daily stats |

---

## SPA Tracking

Counter.dev's inline script does **not** automatically track SPA route changes. It only fires `trackpage` once on initial HTML load. To capture every route change, a custom `PageViewTracker` component (`src/components/PageViewTracker.tsx`) listens to `useLocation()` and sends a `navigator.sendBeacon` to `https://t.counter.dev/trackpage` on each pathname change (skipping the first render to avoid double-counting the initial load).

The component is mounted inside `<BrowserRouter>` in `App.tsx`.

---

## Adblocker Detection

### Why Detection is Needed

Many adblockers block analytics scripts, including Counter.dev. When blocked:
- No visitor data is recorded
- Site usage metrics become inaccurate
- We can't understand how students use the platform

### Implementation

The `AdBlockDetector` component (`src/components/AdBlockDetector.tsx`) checks if Counter.dev is accessible:

1. **Detection Methods:**
   - Attempts to fetch the Counter.dev script
   - Tests image loading from Counter.dev CDN
   - Checks if script elements exist in DOM

2. **User Experience:**
   - If blocked: Shows an **undismissable popup**
   - User must disable adblocker and refresh
   - Popup cannot be closed any other way

3. **Design Rationale:**
   - Analytics help improve the platform for students
   - Accurate usage data guides feature development
   - The popup is intentionally persistent to ensure compliance

### Component Location

```
src/components/AdBlockDetector.tsx
```

### Modifying Detection Behavior

To change detection sensitivity or popup behavior, edit:

```typescript
// src/components/AdBlockDetector.tsx

// Detection timeout (ms)
const timeoutId = setTimeout(() => controller.abort(), 3000);

// Wait time before final check (ms)
await new Promise(resolve => setTimeout(resolve, 2000));
```

---

## Dashboard Access

1. Go to [counter.dev](https://counter.dev)
2. Log in with your account
3. View real-time stats for your site

**Features available:**
- Live visitor count
- Page views by URL
- Referrer sources
- Geographic distribution
- Device/browser breakdown

---

## Manual Stats Update

Counter.dev does not provide a public API for fetching visitor counts programmatically. Stats are displayed on the website via a shared config file.

### Current Implementation

Stats are centralized in `src/data/site-stats.ts`:

```typescript
export const SITE_STATS = {
  totalVisitors: 338,
  totalPageviews: 2252,
  lastUpdated: "Feb 11, 2026",
};
```

This file is imported by:
- `src/pages/Index.tsx` — Stats card on the main page
- `src/pages/DataStatistics.tsx` — Full stats page
- `src/components/CreditsSection.tsx` — Stats in the credits section

### How to Update

1. Log into [counter.dev](https://counter.dev)
2. Note the current visitor/page view counts
3. Open `src/data/site-stats.ts`
4. Update the values
5. Commit and deploy — all pages update automatically

### Update Frequency

Recommended: Update monthly or after significant milestones.

---

## Troubleshooting

### Data Not Appearing in Dashboard

1. **Wait 1-5 minutes** - Initial data may take time to appear
2. **Check browser DevTools** - Look for network requests to `counter.dev`
3. **Test in incognito** - Ensures no cached states
4. **Verify script in HTML** - Check `index.html` has the script

### Adblocker Popup Showing Incorrectly

If the popup shows when Counter.dev is actually accessible:

1. Check network conditions (slow connections may cause false positives)
2. Increase timeout values in `AdBlockDetector.tsx`
3. Verify CDN is not experiencing outages

---

## Migration Notes

When migrating from Lovable to GitHub Pages (or any other host):

1. **Counter.dev keeps working** — it's loaded from their CDN, not from Lovable
2. **SPA tracking keeps working** — `PageViewTracker.tsx` is part of your codebase
3. **Domain change is transparent** — Counter.dev tracks by `data-id`, not domain
4. **Verify after migration** — visit your new URL and check the Counter.dev dashboard

See `07-LOVABLE-REMOVAL-IMPACT.md` for the full analytics migration checklist.

---

## Last Updated

April 2026
