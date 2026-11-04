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
