# Data & Statistics Page — Setup Guide

This guide explains how to add data points, proof images, and evidence to the **Data/Statistics** page (`src/pages/DataStatistics.tsx`).

---

## Overview

The Data/Statistics page showcases how Practice Hub is useful to students. You can add:
- **Data points**: Cards with stats and descriptions
- **Proof images**: Screenshots, charts, or evidence supporting claims
- **Statistics**: Visitor counts, question counts, etc.

---

## File Structure

```
src/data/site-stats.ts                 ← SINGLE SOURCE OF TRUTH for stats
src/pages/DataStatistics.tsx           ← The page component (edit data points here)
public/images/data/                    ← Place proof/evidence images here
```

---

## Updating Site Statistics

**All stats are centralized in `src/data/site-stats.ts`.** Update ONLY this file — all pages (Index, DataStatistics, CreditsSection) import from it automatically.

```typescript
export const SITE_STATS = {
  totalVisitors: 338,
  totalPageviews: 2252,
  lastUpdated: "Feb 11, 2026",
};
```

Update these numbers manually from Counter.dev analytics. No need to update any other file.

---

## Adding a New Data Point

Find the `dataPoints` array in `DataStatistics.tsx` and add a new entry:

```typescript
{
  title: 'Your Title',
  description: 'A description of why this matters and what it shows.',
  stat: '42',           // Optional: a big number to display
  statLabel: 'things',  // Optional: label under the stat
  icon: BookOpen,       // Choose from imported Lucide icons
  proof: '/images/data/my-proof.png',  // Optional: path to evidence image
  link: {               // Optional: external link button
    title: 'Open Form',
    url: 'https://example.com/form',
  },
},
```

### Available Icons

Import any icon from `lucide-react` at the top of the file:
```typescript
import { BarChart3, Users, Eye, TrendingUp, BookOpen, Brain, Clock, Target } from 'lucide-react';
```

Browse all icons at: https://lucide.dev/icons

---

## Adding Proof/Evidence Images

### Step 1: Save the Image

Place your image in the `public/images/data/` folder:
```
public/images/data/analytics-screenshot.png
public/images/data/test-score-improvement.png
public/images/data/student-feedback.png
```

### Step 2: Reference in Data Point

Add the `proof` field to your data point:
```typescript
{
  title: 'Proven Results',
  description: 'Students who used Practice Hub improved test scores.',
  proof: '/images/data/test-score-improvement.png',
  icon: TrendingUp,
},
```

### Image Guidelines

- **Format**: PNG or JPG (PNG preferred for screenshots)
- **Size**: Keep under 500KB per image to avoid slow loading
- **Resolution**: At least 600px wide for clarity
- **Content**: Blur or redact any personal information
- **Naming**: Use descriptive names: `analytics-jan2026.png`, not `img1.png`

---

## Removing a Data Point

Simply delete the object from the `dataPoints` array. If it had a proof image, you can optionally delete the image from `public/images/data/`.
