# CSW Studying (Practice Hub)

A quiz-based study tool for students, covering multiple subjects with MCQ/FRQ support, LaTeX math rendering, quiz persistence, and more — entirely client-side with no backend needed.

**Live Site:** [cswstudying.lovable.app](https://cswstudying.lovable.app)

---

## Features

- **Multiple Subjects** — Chemistry, Biology, World History, AP Pre-Calc, and more
- **Question Types** — Multiple choice (MCQ), free response (FRQ), select all that apply (SATA), multi-part, and list FRQ
- **Quiz System** — Skip/review, auto-save progress, and resume after refresh
- **Custom Units** — Create your own topics with ZIP export/import
- **Preset Builder** — Build targeted practice sets from any topic
- **Course Challenges** — Cram mode across all topics in a subject, with per-topic bulk selection
- **Wrong Answer Tracking** — Re-practice questions you got wrong
- **Memory Training** — Flashcard-style memorization sets
- **Temporary Practice** — Rotating content for short-lived study topics
- **Data/Statistics** — Evidence page showcasing site usefulness
- **Dark/Light Theme** — Full theme support
- **Fully Client-Side** — No database, no API, all data in localStorage

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix UI) |
| Routing | React Router v6 |
| Math Rendering | KaTeX |
| Analytics | Counter.dev |

---

## Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/        # Reusable UI components
├── data/              # Question banks and configuration
│   ├── real-tests/    # Password-protected test questions (separate loader)
│   ├── temporary/     # Temporary practice topics (rotating content)
│   └── assignments/   # Homework assignments
├── hooks/             # React hooks for state management
├── pages/             # Page components (routes)
│   ├── categories/    # Category pages (Math, Science, Social, English, Other, Custom Units)
│   ├── DataStatistics.tsx
│   └── setupdata.md   # Guide for Data/Statistics page
├── types/             # TypeScript type definitions
├── utils/             # Question loading, quiz persistence, export
└── management/        # Technical handoff documentation
```

---

## Documentation

Full technical documentation for maintainers is in [`src/management/README.md`](src/management/README.md), covering:

- Data schemas and content authoring
- State management and storage
- Edge cases and troubleshooting
- Analytics integration (Counter.dev)
- Migration and hosting guides

---

## Deployment

Currently hosted on Lovable at [cswstudying.lovable.app](https://cswstudying.lovable.app).

For self-hosting or migration, see [`src/management/07-LOVABLE-REMOVAL-IMPACT.md`](src/management/07-LOVABLE-REMOVAL-IMPACT.md) and [`src/management/08-GITHUB-HOSTING-GUIDE.md`](src/management/08-GITHUB-HOSTING-GUIDE.md).