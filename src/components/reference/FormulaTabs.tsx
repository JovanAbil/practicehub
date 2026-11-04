// src/components/reference/FormulaTabs.tsx
import { useState } from 'react';
import MathText from '@/components/MathText';
import type { FormulaEntry, FormulaTab } from '@/data/reference-sheets';

interface Props {
  tabs: FormulaTab[];
  subject?: string;
}

/**
 * Decides which column an entry goes in.
 * Equations/constants contain "=", a number, ×, or ∝ (ignoring digits inside
 * subscripts/superscripts like t_{1/2}). Everything else is a variable/symbol.
 * Set `kind` on an entry in reference-sheets.ts to override this.
 */
const isVariable = (f: FormulaEntry): boolean => {
  if (f.kind) return f.kind === 'variable';
  const stripped = f.formula.replace(/[_^]\{[^}]*\}/g, '');
  return !/[=\d]|\\propto|\\times/.test(stripped);
};

const FormulaTabs = ({ tabs, subject }: Props) => {
  const [active, setActive] = useState(0);
  if (tabs.length === 0) return null;
  const current = tabs[Math.min(active, tabs.length - 1)];
  const chem = subject === 'chemistry';

  const variables = current.formulas.filter(isVariable);
  const equations = current.formulas.filter((f) => !isVariable(f));

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

      {/* Panel: two columns on wide screens, stacked on mobile */}
      <div
        role="tabpanel"
        className={`grid gap-3 rounded-b-lg border border-t-0 border-border bg-card p-3
          ${equations.length > 0 && variables.length > 0 ? 'md:grid-cols-[3fr_2fr]' : 'grid-cols-1'}`}
      >
        {/* Left: equations & constants */}
        {equations.length > 0 && (
          <section className="min-w-0 rounded-lg border border-border bg-background/50">
            <h4 className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Equations &amp; Constants
            </h4>
            <div className="max-h-[60vh] divide-y divide-border overflow-y-auto">
              {equations.map((f, idx) => (
                <div key={idx} className="px-3 py-2.5">
                  <div className="break-words text-xs font-medium text-muted-foreground">
                    <MathText enableChemistry={chem}>{f.name}</MathText>
                  </div>
                  <div className="mt-1 overflow-x-auto text-base">
                    <MathText enableChemistry={chem}>{f.formula}</MathText>
                  </div>
                  {f.note && (
                    <div className="mt-0.5 break-words text-[11px] text-muted-foreground">
                      <MathText enableChemistry={chem}>{f.note}</MathText>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Right: variables & symbols */}
        {variables.length > 0 && (
          <section className="min-w-0 rounded-lg border border-border bg-background/50">
            <h4 className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Variables
            </h4>
            <div className="max-h-[60vh] divide-y divide-border overflow-y-auto">
              {variables.map((f, idx) => (
                <div key={idx} className="grid grid-cols-[4.5rem_1fr] items-center gap-3 px-3 py-2">
                  <div className="overflow-x-auto text-base">
                    <MathText enableChemistry={chem}>{f.formula}</MathText>
                  </div>
                  <div className="min-w-0 break-words text-sm text-muted-foreground">
                    <MathText enableChemistry={chem}>{f.name}</MathText>
                    {f.note && (
                      <div className="text-[11px]">
                        <MathText enableChemistry={chem}>{f.note}</MathText>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FormulaTabs;
