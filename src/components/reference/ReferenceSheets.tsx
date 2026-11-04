// src/components/reference/ReferenceSheets.tsx
import { useState } from 'react';
import { BookOpen, Atom, ChevronDown } from 'lucide-react';
import { getReferenceSheets } from '@/data/reference-sheets';
import PeriodicTable from './PeriodicTable';
import FormulaTabs from './FormulaTabs';

interface Props {
  subject?: string;
  className?: string;
}

const ReferenceSheets = ({ subject, className = '' }: Props) => {
  const sheets = getReferenceSheets(subject);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  if (sheets.length === 0) return null;

  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

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
