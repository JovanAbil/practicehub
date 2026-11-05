# 29 — Reference Sheets (Formula Sheet + Periodic Table) on the Quiz Page

This file explains, step by step, how to add **toggleable reference
sheets** to the quiz page.

- One **square toggle button per reference**, each on its **own line**
  (so two dropdowns can be open at once without fighting each other).
- **Parts questions:** one shared row below **all** parts and the Move On
  button; buttons wrap onto another line if necessary. Open sheets stack
  at full width below that row, above the bottom ad.
- Before submitting: the buttons sit **below Submit/Skip**.
- After submitting: they sit **below Next Question / Mark Question** and
  **above the bottom ad placeholder**. (Both states share one button row
  in `Quiz.tsx`, so one insertion covers both.)
- Pressing a button opens its dropdown; pressing again closes it.
- The sheets shown depend on the **course** (`subject` from the URL). A
  single data file decides what each course gets. Courses with no entry
  show nothing (no empty buttons).
- Formula sheets are split into **unit tabs** that look like Chrome tabs.
- Example data: Chemistry gets a **Periodic Table** (symbol + molar mass,
  grouped 1–18, no names, hover enlarges) and an **Equations** sheet with
  tabs **Acids & Bases** and **Wavelength / Light**.

Everything is static, client-only, and GitHub-Pages-safe (no images, no
fetches), so nothing needs `resolveImagePath`.

---

## Files touched

| # | File | Change |
|---|------|--------|
| 1 | `src/data/reference-sheets.ts` | **New** — which course gets which sheets + formula data |
| 2 | `src/components/reference/PeriodicTable.tsx` | **New** — the periodic table |
| 3 | `src/components/reference/FormulaTabs.tsx` | **New** — Chrome-style unit tabs |
| 4 | `src/components/reference/ReferenceSheets.tsx` | **New** — the toggle buttons + dropdowns |
| 5 | `src/pages/Quiz.tsx` | 1 import + 1 line of JSX |
| 6 | `src/components/PartsQuestionView.tsx` | 1 import + 1 shared wrapping row below all parts |

---

## Step 1 — Create `src/data/reference-sheets.ts`

This is the **only** file you edit to add/remove reference content later.
The key is the `subject` value in the quiz URL (`/quiz/:subject/...`),
e.g. `chemistry`, `ap-calculus`, etc. Check `category-courses.ts` for the
exact strings your courses use.

Formulas use the site's normal LaTeX rules (`$...$`, `$\ce{...}$`) and
are rendered by `MathText`.

```ts
// src/data/reference-sheets.ts

export interface FormulaEntry {
  /** Short name shown on the left, e.g. "pH" */
  name: string;
  /** Rendered with MathText — wrap math in $...$ */
  formula: string;
  /** Optional small grey note under the formula */
  note?: string;
}

export interface FormulaTab {
  /** Tab label — usually the unit name */
  label: string;
  formulas: FormulaEntry[];
}

export type ReferenceSheet =
  | { id: string; title: string; kind: 'periodic-table' }
  | { id: string; title: string; kind: 'formulas'; tabs: FormulaTab[] };

/**
 * subject key (from the URL) -> list of sheets.
 * Each sheet becomes its own toggle button, in this order.
 */
export const referenceSheets: Record<string, ReferenceSheet[]> = {
  chemistry: [
    { id: 'chem-periodic', title: 'Periodic Table', kind: 'periodic-table' },
    {
      id: 'chem-equations',
      title: 'Equations',
      kind: 'formulas',
      tabs: [
        {
          label: 'Acids & Bases',
          formulas: [
            { name: 'pH', formula: '$\\text{pH} = -\\log[\\ce{H3O+}]$' },
            { name: 'pOH', formula: '$\\text{pOH} = -\\log[\\ce{OH-}]$' },
            { name: 'pH + pOH', formula: '$\\text{pH} + \\text{pOH} = 14$', note: 'at 25 °C' },
            { name: 'Water', formula: '$K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}$', note: 'at 25 °C' },
            { name: 'Acid constant', formula: '$K_a = \\dfrac{[\\ce{H3O+}][\\ce{A-}]}{[\\ce{HA}]}$' },
            { name: 'Base constant', formula: '$K_b = \\dfrac{[\\ce{HB+}][\\ce{OH-}]}{[\\ce{B}]}$' },
            { name: 'Conjugates', formula: '$K_a \\times K_b = K_w$' },
            { name: 'pKa', formula: '$\\text{p}K_a = -\\log K_a$' },
            { name: 'Henderson–Hasselbalch', formula: '$\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\ce{A-}]}{[\\ce{HA}]}$' },
            { name: 'Titration', formula: '$M_a V_a = M_b V_b$', note: '1:1 mole ratio' },
          ],
        },
        {
          label: 'Wavelength / Light',
          formulas: [
            { name: 'Speed of light', formula: '$c = \\lambda \\nu$' },
            { name: 'Photon energy', formula: '$E = h\\nu$' },
            { name: 'Energy & wavelength', formula: '$E = \\dfrac{hc}{\\lambda}$' },
            { name: 'Planck constant', formula: '$h = 6.626 \\times 10^{-34}\\ \\text{J·s}$' },
            { name: 'Speed of light', formula: '$c = 3.00 \\times 10^{8}\\ \\text{m/s}$' },
            { name: 'Hydrogen levels', formula: '$E_n = -\\dfrac{2.178 \\times 10^{-18}}{n^2}\\ \\text{J}$' },
            { name: 'de Broglie', formula: '$\\lambda = \\dfrac{h}{mv}$' },
            { name: 'Beer–Lambert', formula: '$A = \\varepsilon b c$' },
          ],
        },
      ],
    },
  ],
};

export const getReferenceSheets = (subject?: string): ReferenceSheet[] =>
  (subject && referenceSheets[subject]) || [];
```

> Adding a new unit tab = add another `{ label, formulas }` object to
> `tabs`. Adding a sheet to another course = add a new key.

---

## Step 2 — Create `src/components/reference/PeriodicTable.tsx`

- Labeled groups **1–18** across the top, periods **1–7** down the side.
- Each cell shows **symbol + molar mass only** (no names, per spec).
- Hover / keyboard focus enlarges the cell slightly (`scale-125`) and
  brings it to the front.
- Lanthanides/actinides sit in two rows underneath, with a `57–71` /
  `89–103` marker in group 3.
- Scrolls sideways on small phones instead of squishing.
- Colors use theme tokens only (works in dark mode).

```tsx
// src/components/reference/PeriodicTable.tsx
import { useMemo } from 'react';

// Atomic number = position in this list (1-based). Mass in () = most stable isotope.
const RAW =
  'H 1.008,He 4.003,Li 6.94,Be 9.012,B 10.81,C 12.01,N 14.01,O 16.00,F 19.00,Ne 20.18,' +
  'Na 22.99,Mg 24.31,Al 26.98,Si 28.09,P 30.97,S 32.06,Cl 35.45,Ar 39.95,' +
  'K 39.10,Ca 40.08,Sc 44.96,Ti 47.87,V 50.94,Cr 52.00,Mn 54.94,Fe 55.85,Co 58.93,Ni 58.69,Cu 63.55,Zn 65.38,' +
  'Ga 69.72,Ge 72.63,As 74.92,Se 78.97,Br 79.90,Kr 83.80,' +
  'Rb 85.47,Sr 87.62,Y 88.91,Zr 91.22,Nb 92.91,Mo 95.95,Tc (98),Ru 101.07,Rh 102.91,Pd 106.42,Ag 107.87,Cd 112.41,' +
  'In 114.82,Sn 118.71,Sb 121.76,Te 127.60,I 126.90,Xe 131.29,' +
  'Cs 132.91,Ba 137.33,La 138.91,Ce 140.12,Pr 140.91,Nd 144.24,Pm (145),Sm 150.36,Eu 151.96,Gd 157.25,' +
  'Tb 158.93,Dy 162.50,Ho 164.93,Er 167.26,Tm 168.93,Yb 173.05,Lu 174.97,' +
  'Hf 178.49,Ta 180.95,W 183.84,Re 186.21,Os 190.23,Ir 192.22,Pt 195.08,Au 196.97,Hg 200.59,' +
  'Tl 204.38,Pb 207.2,Bi 208.98,Po (209),At (210),Rn (222),' +
  'Fr (223),Ra (226),Ac (227),Th 232.04,Pa 231.04,U 238.03,Np (237),Pu (244),Am (243),Cm (247),' +
  'Bk (247),Cf (251),Es (252),Fm (257),Md (258),No (259),Lr (262),' +
  'Rf (267),Db (268),Sg (269),Bh (270),Hs (277),Mt (278),Ds (281),Rg (282),Cn (285),' +
  'Nh (286),Fl (289),Mc (290),Lv (293),Ts (294),Og (294)';

type Category = 'alkali' | 'alkaline' | 'transition' | 'post' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble' | 'lanthanide' | 'actinide';

interface Cell { z: number; symbol: string; mass: string; row: number; col: number; category: Category }

const METALLOIDS = new Set([5, 14, 32, 33, 51, 52]);
const NONMETALS = new Set([1, 6, 7, 8, 15, 16, 34]);
const HALOGENS = new Set([9, 17, 35, 53, 85, 117]);
const NOBLE = new Set([2, 10, 18, 36, 54, 86, 118]);
const PERIOD_STARTS = [1, 3, 11, 19, 37, 55, 87]; // first Z of periods 1..7

/** row 1-7 = periods, row 9 = lanthanides, row 10 = actinides. col 1-18 = group. */
const place = (z: number): { row: number; col: number } => {
  if (z === 1) return { row: 1, col: 1 };
  if (z === 2) return { row: 1, col: 18 };
  let p = 7;
  for (let i = PERIOD_STARTS.length - 1; i >= 0; i--) if (z >= PERIOD_STARTS[i]) { p = i + 1; break; }
  const i = z - PERIOD_STARTS[p - 1];
  if (p <= 3) return { row: p, col: i < 2 ? i + 1 : i + 11 };
  if (p <= 5) return { row: p, col: i + 1 };
  if (i < 2) return { row: p, col: i + 1 };
  if (i <= 16) return { row: p === 6 ? 9 : 10, col: i + 1 }; // f-block row, cols 3..17
  return { row: p, col: i - 13 };
};

const categorize = (z: number, row: number, col: number): Category => {
  if (row === 9) return 'lanthanide';
  if (row === 10) return 'actinide';
  if (NOBLE.has(z)) return 'noble';
  if (HALOGENS.has(z)) return 'halogen';
  if (METALLOIDS.has(z)) return 'metalloid';
  if (NONMETALS.has(z)) return 'nonmetal';
  if (col === 1) return 'alkali';
  if (col === 2) return 'alkaline';
  if (col >= 3 && col <= 12) return 'transition';
  return 'post';
};

// Theme-token colors only (no hardcoded hex) so dark mode keeps working.
const CATEGORY_STYLE: Record<Category, string> = {
  alkali: 'bg-destructive/15 border-destructive/40',
  alkaline: 'bg-warning/15 border-warning/40',
  transition: 'bg-primary/10 border-primary/30',
  post: 'bg-muted border-border',
  metalloid: 'bg-accent border-accent-foreground/20',
  nonmetal: 'bg-success/15 border-success/40',
  halogen: 'bg-success/25 border-success/50',
  noble: 'bg-secondary border-secondary-foreground/20',
  lanthanide: 'bg-primary/5 border-primary/20',
  actinide: 'bg-destructive/5 border-destructive/20',
};

const LEGEND: { key: Category; label: string }[] = [
  { key: 'alkali', label: 'Alkali metals' },
  { key: 'alkaline', label: 'Alkaline earth' },
  { key: 'transition', label: 'Transition metals' },
  { key: 'post', label: 'Post-transition' },
  { key: 'metalloid', label: 'Metalloids' },
  { key: 'nonmetal', label: 'Nonmetals' },
  { key: 'halogen', label: 'Halogens' },
  { key: 'noble', label: 'Noble gases' },
  { key: 'lanthanide', label: 'Lanthanides' },
  { key: 'actinide', label: 'Actinides' },
];

const PeriodicTable = () => {
  const cells = useMemo<Cell[]>(
    () =>
      RAW.split(',').map((entry, idx) => {
        const [symbol, mass] = entry.trim().split(' ');
        const z = idx + 1;
        const { row, col } = place(z);
        return { z, symbol, mass, row, col, category: categorize(z, row, col) };
      }),
    []
  );

  // grid: col 1 = period labels, cols 2..19 = groups 1..18; row 1 = group labels
  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="grid gap-[3px] min-w-[720px]"
        style={{ gridTemplateColumns: '1.25rem repeat(18, minmax(0, 1fr))' }}
      >
        {/* group labels */}
        {Array.from({ length: 18 }, (_, g) => (
          <div
            key={`g${g}`}
            className="text-center text-[10px] font-semibold text-muted-foreground"
            style={{ gridColumn: g + 2, gridRow: 1 }}
          >
            {g + 1}
          </div>
        ))}
        {/* period labels */}
        {Array.from({ length: 7 }, (_, p) => (
          <div
            key={`p${p}`}
            className="flex items-center justify-center text-[10px] font-semibold text-muted-foreground"
            style={{ gridColumn: 1, gridRow: p + 2 }}
          >
            {p + 1}
          </div>
        ))}
        {/* f-block markers in group 3 */}
        {[
          { row: 7, text: '57–71' },
          { row: 8, text: '89–103' },
        ].map((m) => (
          <div
            key={m.text}
            className="flex items-center justify-center rounded border border-dashed border-border text-[9px] text-muted-foreground"
            style={{ gridColumn: 4, gridRow: m.row }}
          >
            {m.text}
          </div>
        ))}
        {/* spacer row between main table and f-block */}
        <div className="h-2" style={{ gridColumn: '1 / -1', gridRow: 9 }} />

        {cells.map((c) => (
          <div
            key={c.z}
            tabIndex={0}
            title={`${c.symbol} — ${c.mass} g/mol`}
            className={`relative aspect-square flex flex-col items-center justify-center rounded border
              text-foreground cursor-default select-none transition-transform duration-150
              hover:scale-125 hover:z-10 hover:shadow-lg focus:scale-125 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring
              ${CATEGORY_STYLE[c.category]}`}
            style={{ gridColumn: c.col + 1, gridRow: c.row + 1 }}
          >
            <span className="absolute top-0.5 left-1 text-[8px] text-muted-foreground">{c.z}</span>
            <span className="text-sm font-bold leading-none">{c.symbol}</span>
            <span className="text-[9px] leading-tight mt-0.5">{c.mass}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {LEGEND.map((l) => (
          <span key={l.key} className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span className={`inline-block h-3 w-3 rounded-sm border ${CATEGORY_STYLE[l.key]}`} />
            {l.label}
          </span>
        ))}
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Molar mass in g/mol. Values in ( ) are the most stable isotope.
      </p>
    </div>
  );
};

export default PeriodicTable;
```

> If your theme has no `--warning` / `--success` tokens, swap those classes
> for ones it does have (e.g. `bg-primary/20`). `Quiz.tsx` already uses
> `text-warning` and `text-success`, so they should exist.

---

## Step 3 — Create `src/components/reference/FormulaTabs.tsx`

Chrome-style tabs: rounded tops, the active tab merges into the panel
below, inactive tabs are dimmer, and the row scrolls sideways if there
are many units.

```tsx
// src/components/reference/FormulaTabs.tsx
import { useState } from 'react';
import MathText from '@/components/MathText';
import type { FormulaTab } from '@/data/reference-sheets';

interface Props {
  tabs: FormulaTab[];
  subject?: string;
}

const FormulaTabs = ({ tabs, subject }: Props) => {
  const [active, setActive] = useState(0);
  if (tabs.length === 0) return null;
  const current = tabs[Math.min(active, tabs.length - 1)];

  return (
    <div>
      {/* Tab strip */}
      <div role="tablist" className="flex items-end gap-1 overflow-x-auto border-b border-border px-1">
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.label}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`relative -mb-px shrink-0 whitespace-nowrap rounded-t-lg border px-4 py-1.5 text-sm transition-colors
                ${isActive
                  ? 'border-border border-b-card bg-card font-semibold text-foreground'
                  : 'border-transparent bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div role="tabpanel" className="rounded-b-lg border border-t-0 border-border bg-card p-3">
        <div className="divide-y divide-border">
          {current.formulas.map((f, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-[10rem_1fr] sm:items-center">
              <span className="text-xs font-medium text-muted-foreground">{f.name}</span>
              <div>
                <MathText enableChemistry={subject === 'chemistry'}>{f.formula}</MathText>
                {f.note && <p className="text-[11px] text-muted-foreground">{f.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormulaTabs;
```

> `enableChemistry` is passed so `\ce{}` renders. If a non-chemistry
> course uses `\ce{}` in its sheet, change the condition to `true`.

---

## Step 4 — Create `src/components/reference/ReferenceSheets.tsx`

One full-width row per sheet: a **square** toggle button on the left, the
sheet name next to it, and the dropdown directly underneath. Each sheet
tracks its own open state, so any combination can be open.

Open/closed state is remembered **per course for the whole quiz session**
(it stays open when you click Next Question) but is not saved to
localStorage, so it never interferes with progress saving.

```tsx
// src/components/reference/ReferenceSheets.tsx
import { useState } from 'react';
import { BookOpen, Atom, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getReferenceSheets } from '@/data/reference-sheets';
import PeriodicTable from './PeriodicTable';
import FormulaTabs from './FormulaTabs';

interface Props {
  subject?: string;
  className?: string;
  layout?: 'stacked' | 'wrap';
}

const ReferenceSheets = ({ subject, className = '', layout = 'stacked' }: Props) => {
  const sheets = getReferenceSheets(subject);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  if (sheets.length === 0) return null;

  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  // Parts layout: all controls in one wrapping row, panels underneath.
  if (layout === 'wrap') {
    return (
      <div className={`min-w-0 space-y-3 ${className}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {sheets.map((sheet) => {
            const isOpen = Boolean(open[sheet.id]);
            const Icon = sheet.kind === 'periodic-table' ? Atom : BookOpen;
            return (
              <div key={sheet.id} className="flex min-w-0 max-w-full items-center gap-2">
                <Button
                  type="button"
                  variant={isOpen ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => toggle(sheet.id)}
                  aria-expanded={isOpen}
                  aria-controls={`ref-${sheet.id}`}
                  aria-label={`${isOpen ? 'Hide' : 'Show'} ${sheet.title}`}
                  title={`${isOpen ? 'Hide' : 'Show'} ${sheet.title}`}
                  className="h-10 w-10 shrink-0"
                >
                  <Icon className="h-5 w-5" />
                </Button>
                <span className="min-w-0 break-words text-sm font-medium text-foreground">
                  {sheet.title}
                </span>
              </div>
            );
          })}
        </div>
        {sheets.filter((sheet) => open[sheet.id]).map((sheet) => (
          <div
            key={sheet.id}
            id={`ref-${sheet.id}`}
            role="region"
            aria-label={sheet.title}
            className="w-full min-w-0 rounded-lg border border-border bg-card p-3"
          >
            {sheet.kind === 'periodic-table' ? (
              <PeriodicTable />
            ) : (
              <FormulaTabs tabs={sheet.tabs} subject={subject} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {sheets.map((sheet) => {
        const isOpen = !!open[sheet.id];
        const Icon = sheet.kind === 'periodic-table' ? Atom : BookOpen;
        return (
          <div key={sheet.id} className="w-full">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggle(sheet.id)}
                aria-pressed={isOpen}
                aria-expanded={isOpen}
                aria-controls={`ref-${sheet.id}`}
                aria-label={`${isOpen ? 'Hide' : 'Show'} ${sheet.title}`}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 transition-colors
                  ${isOpen
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary hover:text-primary'}`}
              >
                <Icon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => toggle(sheet.id)}
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
              >
                {sheet.title}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {isOpen && (
              <div
                id={`ref-${sheet.id}`}
                className="mt-2 rounded-lg border border-border bg-card p-3 animate-in fade-in slide-in-from-top-1"
              >
                {sheet.kind === 'periodic-table' ? (
                  <PeriodicTable />
                ) : (
                  <FormulaTabs tabs={sheet.tabs} subject={subject} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReferenceSheets;
```

> `animate-in fade-in slide-in-from-top-1` come from `tailwindcss-animate`,
> which shadcn projects already include. If yours doesn't, just delete
> those three classes.

---

## Step 5 — Wire it into `src/pages/Quiz.tsx`

### 5a. Import (top of file, next to `CalculatorBadge` ~line 29)

```tsx
import ReferenceSheets from '@/components/reference/ReferenceSheets';
```

### 5b. Render it (between the button row and the ad, ~lines 1176–1212)

Find the end of the Submit / Next button row and the bottom ad. It looks
like this:

```tsx
                      <Flag className="mr-2 h-4 w-4" />
                      {currentAttempt?.markedIncorrect ? 'Marked' : 'Mark Question as Wrong or Buggy'}
                    </Button>
                  </>
                )}
              </div>
            </>
          )}

          {/* Bottom Ad Placeholder */}
          <div className="mt-8">
            <AdPlaceholder position="bottom" />
          </div>
```

Replace it with (only the `<ReferenceSheets ... />` line is new):

```tsx
                      <Flag className="mr-2 h-4 w-4" />
                      {currentAttempt?.markedIncorrect ? 'Marked' : 'Mark Question as Wrong or Buggy'}
                    </Button>
                  </>
                )}
              </div>
              <ReferenceSheets subject={subject} className="mt-6" />
            </>
          )}

          {/* Bottom Ad Placeholder */}
          <div className="mt-8">
            <AdPlaceholder position="bottom" />
          </div>
```

Because the Submit/Skip buttons and the Next/Mark buttons live in the
**same** `<div className="mt-8 flex gap-4">`, this single line puts the
reference buttons under Submit before answering and under Next/Mark after
answering — always above the ad.

> `subject` is already defined at the top of `Quiz.tsx`
> (`const { subject, unitId, quizType } = useParams();`).

---

## Step 6 — Parts questions: one wrapping row below all parts

Parts questions render inside `PartsQuestionView.tsx`, which has its own
Submit/Next buttons and does **not** pass through the block from Step 5.
Do **not** add a reference row inside `question.parts.map(...)` or after
each part's Submit button: that would repeat the sheets for every part.
There is one shared row for the entire question, visible before and after
grading, below the final part and below Move On when that button appears.

### 6a. Update the shared reference component first

If you already pasted the old Step 4, **replace the entire contents** of
`src/components/reference/ReferenceSheets.tsx` with the updated Step 4 above.
It adds the optional `layout` prop and the wrapping controls/panels layout.
Simply putting `flex-wrap` on the old outer container will not work: its
children are full-width rows. Ordinary questions keep the default stacked
layout, so Step 5 does not change.

### 6b. Add the import (~line 13)

In `src/components/PartsQuestionView.tsx`, next to `MathQuickInput`, add:

```tsx
import ReferenceSheets from '@/components/reference/ReferenceSheets';
```

### 6c. Replace the end of the component (~lines 389–402)

Find this exact block near the bottom. The `})}` is the end of the **whole
parts loop**, not the end of an individual part's controls:

```tsx
          </Card>
        );
      })}

      {/* Move on button */}
      {allPartsComplete && (
        <div className="flex justify-center pt-2">
          <Button onClick={onAllComplete} size="lg" className="w-full max-w-md">
            Move On →
          </Button>
        </div>
      )}
    </div>
```

Replace it with:

```tsx
          </Card>
        );
      })}

      {/* Move on button */}
      {allPartsComplete && (
        <div className="flex justify-center pt-2">
          <Button onClick={onAllComplete} size="lg" className="w-full max-w-md">
            Move On →
          </Button>
        </div>
      )}

      {/* One reference row for the entire parts question */}
      <ReferenceSheets subject={subject} layout="wrap" className="mt-6" />
    </div>
```

(`PartsQuestionView` already receives a `subject` prop — it uses it for
`enableChemistry`. `Quiz.tsx` already passes `subject={subject}` around
line 925, so no new prop plumbing is needed.)

If you previously added the old Step 6 line, **move/replace** that line;
do not leave two instances. Keep this instance outside `allPartsComplete`
so it is available while answering, not just after all parts are graded.
The bottom ad remains in `Quiz.tsx`, after the parts/normal question branch;
do not add another ad inside this component.

```text
Part A + its Submit/Skip/grading
Part B + its Submit/Skip/grading
…last part
Move On (only when all parts are complete)
[Periodic Table]  [Equations]   ← one row, wraps when needed
Periodic Table panel (if open)
Equations panel (if open)
Bottom ad (owned by Quiz.tsx)
```

---

## Behavior recap

| Situation | Result |
|-----------|--------|
| Chemistry quiz, not submitted | Square buttons for **Periodic Table** and **Equations** under Submit |
| After submitting | Same buttons move under Next Question / Mark Question, above the ad |
| Click a button | Its dropdown opens right below that button's line |
| Click again | Dropdown closes |
| Both open | Both stay open, stacked (one per line) |
| Parts question | One wrapping button row below all parts (and Move On), panels stacked beneath it |
| Equations sheet | Chrome-style tabs: **Acids & Bases**, **Wavelength / Light** |
| Hover an element | Cell grows slightly, shows symbol + molar mass (no name) |
| Course with no entry in `reference-sheets.ts` | Nothing shown |
| Next Question | Open/closed state and selected tab stay as they were |

## Storage keys

None. Nothing is saved, so quiz progress saving is unaffected.

## Test checklist

- [ ] Open a chemistry quiz → two square buttons appear under Submit.
- [ ] Submit an answer → buttons are now under Next / Mark, above the ad.
- [ ] Open Periodic Table → groups 1–18 on top, periods 1–7 on the side,
      La/Ac rows below with `57–71` / `89–103` markers.
- [ ] Hover Fe → cell grows, shows `Fe` and `55.85`, no element name.
- [ ] Open Equations at the same time → both visible, one under the other.
- [ ] Click **Wavelength / Light** tab → formulas switch; `$c = \lambda\nu$` renders.
- [ ] Press a button again → its dropdown closes.
- [ ] Open a non-chemistry course → no reference buttons.
- [ ] Narrow phone width → periodic table scrolls sideways, tabs scroll sideways.
- [ ] Parts question → exactly one reference row below the final part, never inside a part card.
- [ ] Before all parts are graded → reference buttons are already available.
- [ ] Complete every part → Move On appears above the same reference row; bottom ad remains below.
- [ ] Parts question on a narrow phone → buttons wrap without page overflow; opening both sheets keeps both full-width panels below the controls.
- [ ] Dark mode → colors still readable.

## Rollback

1. Delete the `<ReferenceSheets ... />` line(s) and import(s) from
   `Quiz.tsx` (and `PartsQuestionView.tsx` if you did Step 6).
2. Delete `src/components/reference/` and `src/data/reference-sheets.ts`.
