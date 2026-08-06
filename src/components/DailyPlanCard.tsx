import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Download, Upload, RotateCcw } from 'lucide-react';
import { Question } from '@/types/quiz';
import {
  ensureTodayPlan, loadDailyPlan, setQuestionsPerDay,
  exportDailyPlan, importDailyPlan, clearDailyPlan, DailyPlanState,
} from '@/utils/dailyPlan';
import { toast } from 'sonner';

interface Props {
  subject: string;
  allQuestions: Question[];
}

/**
 * Compact "Daily" control row shown directly under the Cram Mode button.
 * - Left: Daily button (starts today's plan)
 * - Right: number input for questions-per-day (default 15, saved locally)
 * - Small icon buttons for Export / Import / Reset
 */
const DailyPlanCard = ({ subject, allQuestions }: Props) => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<DailyPlanState | null>(null);

  useEffect(() => {
    if (allQuestions.length === 0) return;
    setState(ensureTodayPlan(subject, allQuestions));
  }, [subject, allQuestions]);

  useEffect(() => {
    const refresh = () => {
      if (allQuestions.length) setState(ensureTodayPlan(subject, allQuestions));
    };
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, [subject, allQuestions]);
  
  if (!state) return null;

  const startToday = () => {
    const byId = new Map(allQuestions.map(q => [q.id, q]));
    const todays = state.todayQuestionIds.map(id => byId.get(id)).filter(Boolean) as Question[];
    if (todays.length === 0) { toast.error("No questions in today's plan"); return; }
    navigate(`/quiz/${subject}/daily/plan`, {
      state: {
        presetQuestions: todays,
        dailyPlanKey: subject,
        startNewAttempt: true,
        orderedMode: true,
      },
    });
  };

  const changePerDay = (n: number) => {
    setQuestionsPerDay(subject, n);
    setState(loadDailyPlan(subject));
  };

  const doExport = () => {
    const blob = new Blob([exportDailyPlan(subject)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `daily-plan-${subject}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const doImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const ok = importDailyPlan(subject, await f.text());
    if (ok) { setState(ensureTodayPlan(subject, allQuestions)); toast.success('Plan imported'); }
    else toast.error('Invalid plan file');
    if (fileRef.current) fileRef.current.value = '';
  };

  const doReset = () => {
    clearDailyPlan(subject);
    setState(ensureTodayPlan(subject, allQuestions));
    toast.success('Daily plan reset');
  };

  const totalPool = state.unusedIds.length + state.usedIds.length;
  const progressPct = totalPool ? Math.round((state.usedIds.length / totalPool) * 100) : 0;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Button onClick={startToday} variant="secondary" size="lg" className="flex-1 min-w-[200px]">
        <CalendarDays className="mr-2 h-4 w-4" />
        Daily ({state.todayQuestionIds.length} questions today)
      </Button>

      <div className="flex items-center gap-1">
        <label className="text-xs text-muted-foreground whitespace-nowrap">Per day:</label>
        <Input
          type="number" min={1} max={200}
          value={state.questionsPerDay}
          onChange={e => changePerDay(Number(e.target.value) || 1)}
          className="w-20 h-9"
        />
      </div>

      <Button variant="ghost" size="icon" onClick={doExport} title="Export daily plan">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => fileRef.current?.click()} title="Import daily plan">
        <Upload className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={doReset} title="Reset daily plan">
        <RotateCcw className="h-4 w-4" />
      </Button>
      <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={doImport} />

      <div className="w-full text-xs text-muted-foreground">
        Mastered {state.usedIds.length}/{totalPool} ({progressPct}%) · Cycles: {state.cycleCount} ·
        Correct answers cycle out; wrong ones stay until mastered.
      </div>
    </div>
  );
};

export default DailyPlanCard;
