import { Timer } from 'lucide-react';

interface QuizTimerProps {
  formatted: string;
  isRunning: boolean;
}

const QuizTimer = ({ formatted, isRunning }: QuizTimerProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
      <Timer className={`h-5 w-5 ${isRunning ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
      <span className="timer-display text-lg font-semibold tabular-nums">
        {formatted}
      </span>
    </div>
  );
};

export default QuizTimer;