import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Download, Upload, RotateCcw, Play } from 'lucide-react';
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

const DailyPlanCard = ({ subject, allQuestions }: Props) => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<DailyPlanState | null>(null);

  useEffect(() => {
    if (allQuestions.length === 0) return;
    setState(ensureTodayPlan(subject, allQuestions));
  }, [subject, allQuestions]);

  if (!state) return null;

  const totalPool = state.unusedIds.length + state.usedIds.length;
  const progressPct = totalPool ? Math.round((state.usedIds.length / totalPool) * 100) : 0;

  const startToday = () => {
    const byId = new Map(allQuestions.map(q => [q.id, q]));
    const todays = state.todayQuestionIds.map(id => byId.get(id)).filter(Boolean) as Question[];
    if (todays.length === 0) { toast.error('No questions in today\u2019s plan'); return; }
    navigate(`/quiz/${subject}/daily/plan`, {
      state: {
        importedQuestions: todays,
        dailyPlanKey: subject,
        startNewAttempt: true,
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

  return (
    <Card className="mb-6 p-6 border-2 border-primary/40">
      <div className="flex items-center gap-3 mb-3">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h3 className="font-semibold text-lg">Daily Plan</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        A fresh mix of questions across every topic each day. Correct answers cycle out
        until you\u2019ve mastered the pool, then the cycle repeats.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
        <div><div className="text-muted-foreground">Today</div><div className="font-semibold">{state.todayQuestionIds.length} questions</div></div>
        <div><div className="text-muted-foreground">Unused</div><div className="font-semibold">{state.unusedIds.length}</div></div>
        <div><div className="text-muted-foreground">Mastered</div><div className="font-semibold">{state.usedIds.length} ({progressPct}%)</div></div>
        <div><div className="text-muted-foreground">Cycles done</div><div className="font-semibold">{state.cycleCount}</div></div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm text-muted-foreground">Per day:</label>
        <Input
          type="number" min={1} max={200}
          value={state.questionsPerDay}
          onChange={e => changePerDay(Number(e.target.value) || 1)}
          className="w-24 h-8"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={startToday}><Play className="mr-2 h-4 w-4" />Start Today\u2019s Plan</Button>
        <Button variant="outline" onClick={doExport}><Download className="mr-2 h-4 w-4" />Export</Button>
        <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="mr-2 h-4 w-4" />Import</Button>
        <Button variant="ghost" onClick={doReset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={doImport} />
      </div>
    </Card>
  );
};

export default DailyPlanCard;
