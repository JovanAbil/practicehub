import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays, Download, Upload, RotateCcw, History, Layers } from 'lucide-react';
import { Question } from '@/types/quiz';
import {
  ensureTodayPlan, loadDailyPlan, setQuestionsPerDay,
  exportDailyPlan, importDailyPlan, clearDailyPlan, DailyPlanState,
  drawReviewSet, setReviewPerDay, topicOf, applyTopicFilter,
} from '@/utils/dailyPlan';
import { loadDailyUnits, saveDailyUnits } from '@/utils/dailyUnitsCookie';
import { toast } from 'sonner';

interface Props {
  subject: string;
  allQuestions: Question[];
  /** Optional: map topic prefix -> display name, e.g. { ecology: 'Ecology' } */
  topicLabels?: Record<string, string>;
}

/**
 * Compact "Daily" control row shown directly under the Cram Mode button.
 * - Left: Daily button (starts today's plan)
 * - Right: number input for questions-per-day (default 15, saved locally)
 * - Small icon buttons for Export / Import / Reset
 */
const DailyPlanCard = ({ subject, allQuestions, topicLabels }: Props) => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<DailyPlanState | null>(null);

  // Every unit present in this course, in first-seen order.
  const allTopics = useMemo(() => {
    const seen: string[] = [];
    allQuestions.forEach(q => {
      const t = topicOf(q.id);
      if (!seen.includes(t)) seen.push(t);
    });
    return seen;
  }, [allQuestions]);

  // null = all units. Loaded from the cookie once per subject.
  const [selected, setSelected] = useState<string[] | null>(() => loadDailyUnits(subject));
  useEffect(() => { setSelected(loadDailyUnits(subject)); }, [subject]);

  // Drop cookie entries for units that no longer exist.
  const allowed = useMemo(() => {
    if (!selected) return null;
    const live = selected.filter(t => allTopics.includes(t));
    return live.length === allTopics.length ? null : new Set(live);
  }, [selected, allTopics]);
  
  useEffect(() => {
    if (allQuestions.length === 0) return;
    setState(ensureTodayPlan(subject, allQuestions, undefined, allowed));
  }, [subject, allQuestions, allowed]);

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

  const updateUnits = (next: string[]) => {
    if (next.length === 0) { toast.error('Pick at least one unit'); return; }
    const value = next.length === allTopics.length ? null : next;
    saveDailyUnits(subject, value);
    setSelected(value);
    applyTopicFilter(subject, value ? new Set(value) : null);
    setState(loadDailyPlan(subject));
  };

  const current = selected ?? allTopics;
  const toggleUnit = (t: string) =>
    updateUnits(current.includes(t) ? current.filter(x => x !== t) : [...current, t]);

  const changeReviewPerDay = (n: number) => {
    setReviewPerDay(subject, n);
    setState(loadDailyPlan(subject));
  };

  const startReview = () => {
    const ids = drawReviewSet(subject);
    if (ids.length === 0) { toast.error('No completed questions to review yet'); return; }
    const byId = new Map(allQuestions.map(q => [q.id, q]));
    const qs = ids.map(id => byId.get(id)).filter(Boolean) as Question[];
    if (qs.length === 0) { toast.error('No completed questions to review yet'); return; }
    navigate(`/quiz/${subject}/daily/review`, {
      state: {
        presetQuestions: qs,
        dailyPlanKey: subject,
        dailyReviewMode: true,
        startNewAttempt: true,
        orderedMode: true,
      },
    });
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

  const inSel = (id: string) => !allowed || allowed.has(topicOf(id));
  const usedSel = state.usedIds.filter(inSel).length;
  const totalPool = state.unusedIds.filter(inSel).length + usedSel;
  const progressPct = totalPool ? Math.round((usedSel / totalPool) * 100) : 0;

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

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 shrink-0" title="Choose units for the daily plan">
            <Layers className="mr-1 h-4 w-4" />
            Units ({current.length}/{allTopics.length})
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Daily units</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs"
                onClick={() => updateUnits(allTopics)}>All</Button>
            </div>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {allTopics.map(t => (
              <label key={t} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox checked={current.includes(t)} onCheckedChange={() => toggleUnit(t)} />
                <span className="truncate">{topicLabels?.[t] ?? t}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Unchecked units are skipped but keep their progress.
          </p>
        </PopoverContent>
      </Popover>
      
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

      <div className="w-full flex flex-wrap items-center gap-2">
        <Button
          onClick={startReview}
          variant="outline"
          className="flex-1 min-w-[200px]"
          disabled={state.usedIds.length === 0}
        >
          <History className="mr-2 h-4 w-4" />
          Review ({state.usedIds.length} completed)
        </Button>
        <div className="flex items-center gap-1">
          <label className="text-xs text-muted-foreground whitespace-nowrap">Per review:</label>
          <Input
            type="number" min={1} max={200}
            value={state.reviewPerDay ?? state.questionsPerDay}
            onChange={e => changeReviewPerDay(Number(e.target.value) || 1)}
            className="w-20 h-9"
            disabled={state.usedIds.length === 0}
          />
        </div>
      </div>

      <div className="w-full text-xs text-muted-foreground">
        Mastered {state.usedIds.length}/{totalPool} ({progressPct}%) · Cycles: {state.cycleCount} ·
        Correct answers cycle out; wrong ones stay until mastered. Missed review
        questions return to the daily plan.
      </div>
    </div>
  );
};

export default DailyPlanCard;
