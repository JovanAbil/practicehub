import { Question } from '@/types/quiz';

export interface DailyPlanState {
  questionsPerDay: number;
  unusedIds: string[];
  usedIds: string[];
  todayDate: string;          // YYYY-MM-DD
  todayQuestionIds: string[]; // ids drawn for today
  cycleCount: number;         // how many full cycles completed
}

const DEFAULT_PER_DAY = 15;
const key = (subject: string) => `daily-plan-${subject}`;
const todayStr = () => new Date().toISOString().slice(0, 10);

export const loadDailyPlan = (subject: string): DailyPlanState | null => {
  try {
    const raw = localStorage.getItem(key(subject));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export const saveDailyPlan = (subject: string, s: DailyPlanState) => {
  localStorage.setItem(key(subject), JSON.stringify(s));
};

export const clearDailyPlan = (subject: string) => {
  localStorage.removeItem(key(subject));
};

/** Group question ids by their topic prefix (id looks like "ecology-3"). */
const groupByTopic = (ids: string[]): Record<string, string[]> => {
  const g: Record<string, string[]> = {};
  ids.forEach(id => {
    const topic = id.split('-').slice(0, -1).join('-') || id;
    (g[topic] ||= []).push(id);
  });
  return g;
};

/** Round-robin pick across topics, shuffled within each topic. */
const pickRoundRobin = (unused: string[], n: number): string[] => {
  const groups = groupByTopic(unused);
  Object.values(groups).forEach(arr => arr.sort(() => Math.random() - 0.5));
  const topics = Object.keys(groups).sort(() => Math.random() - 0.5);
  const picked: string[] = [];
  let i = 0;
  while (picked.length < n && topics.some(t => groups[t].length)) {
    const t = topics[i % topics.length];
    if (groups[t].length) picked.push(groups[t].shift()!);
    i++;
  }
  return picked;
};

/** Initialize or refresh today's plan. Call every time CourseChallenge mounts. */
export const ensureTodayPlan = (
  subject: string,
  allQuestions: Question[],
  questionsPerDay?: number,
): DailyPlanState => {
  const allIds = allQuestions.map(q => q.id);
  let state = loadDailyPlan(subject);

  if (!state) {
    state = {
      questionsPerDay: questionsPerDay ?? DEFAULT_PER_DAY,
      unusedIds: [...allIds],
      usedIds: [],
      todayDate: '',
      todayQuestionIds: [],
      cycleCount: 0,
    };
  }

  // Reconcile with current pool (new imports add ids; removed ids drop out)
  const known = new Set([...state.unusedIds, ...state.usedIds]);
  const newIds = allIds.filter(id => !known.has(id));
  if (newIds.length) state.unusedIds.push(...newIds);
  const alive = new Set(allIds);
  state.unusedIds = state.unusedIds.filter(id => alive.has(id));
  state.usedIds = state.usedIds.filter(id => alive.has(id));
  state.todayQuestionIds = state.todayQuestionIds.filter(id => alive.has(id));

  // New day? Redraw.
  const today = todayStr();
  if (state.todayDate !== today) {
    if (state.unusedIds.length === 0 && state.usedIds.length > 0) {
      state.unusedIds = [...state.usedIds];
      state.usedIds = [];
      state.cycleCount += 1;
    }
    state.todayDate = today;
    state.todayQuestionIds = pickRoundRobin(state.unusedIds, state.questionsPerDay);
  }

  saveDailyPlan(subject, state);
  return state;
};

/** Called by Quiz when a question is answered correctly. */
export const markDailyPlanCorrect = (subject: string, questionId: string) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  if (!s.unusedIds.includes(questionId)) return;
  s.unusedIds = s.unusedIds.filter(id => id !== questionId);
  if (!s.usedIds.includes(questionId)) s.usedIds.push(questionId);
  saveDailyPlan(subject, s);
};

export const setQuestionsPerDay = (subject: string, n: number) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  s.questionsPerDay = Math.max(1, Math.min(200, Math.floor(n)));
  const already = new Set(s.todayQuestionIds);
  const pool = s.unusedIds.filter(id => !already.has(id));
  if (s.todayQuestionIds.length < s.questionsPerDay) {
    const extra = pickRoundRobin(pool, s.questionsPerDay - s.todayQuestionIds.length);
    s.todayQuestionIds.push(...extra);
  } else {
    s.todayQuestionIds = s.todayQuestionIds.slice(0, s.questionsPerDay);
  }
  saveDailyPlan(subject, s);
};

export const exportDailyPlan = (subject: string): string => {
  const s = loadDailyPlan(subject);
  return JSON.stringify(s ?? {}, null, 2);
};

export const importDailyPlan = (subject: string, json: string): boolean => {
  try {
    const parsed = JSON.parse(json) as DailyPlanState;
    if (!parsed || !Array.isArray(parsed.unusedIds)) return false;
    saveDailyPlan(subject, parsed);
    return true;
  } catch { return false; }
};
