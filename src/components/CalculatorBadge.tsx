import { Calculator } from 'lucide-react';

interface CalculatorBadgeProps {
  active?: boolean;
  className?: string;
}

/**
 * Small rounded pill shown above a question when `calculator: true`.
 * Renders nothing when `active` is false/undefined so it's safe to drop in
 * unconditionally with `<CalculatorBadge active={question.calculator} />`.
 */
const CalculatorBadge = ({ active, className = '' }: CalculatorBadgeProps) => {
  if (!active) return null;
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3 ${className}`}
      aria-label="Calculator allowed for this question"
    >
      <Calculator className="h-3.5 w-3.5" />
      Calculator active
    </div>
  );
};

export default CalculatorBadge;
