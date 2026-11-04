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
