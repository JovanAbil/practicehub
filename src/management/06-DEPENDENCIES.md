# Dependencies Documentation

## Overview

This document lists all external dependencies, what functionality relies on them, and what must be replaced or removed after separating from Lovable.

---

## Production Dependencies

### Core Framework

| Package | Version | Purpose | Critical? |
|---------|---------|---------|-----------|
| `react` | ^18.3.1 | UI framework | ✅ Yes |
| `react-dom` | ^18.3.1 | React DOM rendering | ✅ Yes |
| `react-router-dom` | ^6.30.1 | Client-side routing | ✅ Yes |

### UI Components (shadcn/ui)

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-*` | Various | Headless UI primitives |
| `class-variance-authority` | ^0.7.1 | Component variant styling |
| `clsx` | ^2.1.1 | Conditional classnames |
| `tailwind-merge` | ^2.6.0 | Merge Tailwind classes |
| `lucide-react` | ^0.462.0 | Icons |

### Math Rendering

| Package | Version | Purpose | Critical? |
|---------|---------|---------|-----------|
| `katex` | ^0.16.23 | LaTeX math rendering | ✅ Yes (for math content) |

### File Handling

| Package | Version | Purpose |
|---------|---------|---------|
| `jszip` | ^3.10.1 | Create/extract ZIP files for custom unit export/import |

### Notifications

| Package | Version | Purpose |
|---------|---------|---------|
| `sonner` | ^1.7.4 | Toast notifications |

### Theme

| Package | Version | Purpose |
|---------|---------|---------|
| `next-themes` | ^0.3.0 | Theme switching (light/dark) |

---

## Unused Dependencies (Safe to Remove)

These packages are installed but not actively used in the application:

```bash
npm uninstall @tanstack/react-query recharts embla-carousel-react react-day-picker date-fns input-otp cmdk react-resizable-panels @hookform/resolvers react-hook-form zod vaul
```

---

## Development Dependencies

| Package | Purpose |
|---------|---------|
| `vite` | Build tool & dev server |
| `typescript` | Type checking |
| `eslint` | Code linting |
| `tailwindcss` | CSS framework |
| `postcss` | CSS processing |
| `autoprefixer` | CSS vendor prefixes |
| `lovable-tagger` | Lovable-specific (remove when leaving) |
| `@playwright/test` | E2E testing |

---

## External Services

| Service | Purpose | Required? |
|---------|---------|-----------|
| Counter.dev | Analytics tracking | Optional |

The Counter.dev script is in `index.html`. The app is otherwise completely self-contained with no external API dependencies.

---

## Lovable-Specific Dependencies

### What Lovable Provides

1. **Hosting:** Preview and production URLs
2. **Deployment:** Automatic builds
3. **SSL:** HTTPS certificates

### What Works Independently

All quiz functionality, question content, localStorage persistence, themes, math rendering, and file import/export work without Lovable.

---

## Last Updated

April 2026
