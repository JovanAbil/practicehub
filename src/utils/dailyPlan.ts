import { Question } from '@/types/quiz';

export interface DailyPlanState {
  questionsPerDay: number;
  unusedIds: string[];
  usedIds: string[];
  todayDate: string;          // YYYY-MM-DD
  todayQuestionIds: string[]; // ids drawn for today
  cycleCount: number;         // how many full cycles completed
  reviewPerDay?: number;      // how many mastered questions per review run
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
    const topic = topicOf(id);
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
  allowed?: AllowedTopics,
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
      reviewPerDay: 15,   // how many mastered questions per review run
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

  // --- Carry-over redraw -------------------------------------------------
  // Rule: mastered ids (in usedIds) always leave today's list. Ids still in
  // unusedIds (i.e. you got them wrong or never reached them) STAY. The list
  // is then topped back up to questionsPerDay with fresh ids from the bank.
  const today = todayStr();
  const mastered = new Set(state.usedIds);

  // 1. Drop anything that has been mastered — runs on EVERY mount, not just
  //    on a new day. This is the actual bug fix.
  state.todayQuestionIds = state.todayQuestionIds.filter(
    id => !mastered.has(id) && isAllowed(id, allowed)
  );

  const isNewDay = state.todayDate !== today;

  if (isNewDay) {
    // 2. Whole bank mastered? Start a new cycle.
    const unusedAllowed = state.unusedIds.filter(id => isAllowed(id, allowed));
    const usedAllowed = state.usedIds.filter(id => isAllowed(id, allowed));
    if (unusedAllowed.length === 0 && usedAllowed.length > 0) {
      // Recycle only the selected units; unselected progress is untouched.
      state.unusedIds.push(...usedAllowed);
      state.usedIds = state.usedIds.filter(id => !isAllowed(id, allowed));
      state.cycleCount += 1;
      state.todayQuestionIds = [];
    }
    state.todayDate = today;
  }

  // 3. Top up with new questions (never re-adding what's already listed).
  if (isNewDay || state.todayQuestionIds.length < state.questionsPerDay) {
    const already = new Set(state.todayQuestionIds);
    const pool = state.unusedIds.filter(id => !already.has(id) && isAllowed(id, allowed));
    const need = state.questionsPerDay - state.todayQuestionIds.length;
    if (need > 0) state.todayQuestionIds.push(...pickRoundRobin(pool, need));
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

export const setQuestionsPerDay = (subject: string, n: number, allowed?: AllowedTopics) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  s.questionsPerDay = Math.max(1, Math.min(200, Math.floor(n)));
  const already = new Set(s.todayQuestionIds);
  const pool = s.unusedIds.filter(id => !already.has(id) && isAllowed(id, allowed));
  if (s.todayQuestionIds.length < s.questionsPerDay) {
    const extra = pickRoundRobin(pool, s.questionsPerDay - s.todayQuestionIds.length);
    s.todayQuestionIds.push(...extra);
  } else {
    s.todayQuestionIds = s.todayQuestionIds.slice(0, s.questionsPerDay);
  }
  saveDailyPlan(subject, s);
};

export const exportDailyPlan = (subject: string, allowed?: AllowedTopics): string => {
  const s = loadDailyPlan(subject);
  if (!s) return '{}';
  const keep = (ids: string[]) => ids.filter(id => isAllowed(id, allowed));
  return JSON.stringify({
    ...s,
    unusedIds: keep(s.unusedIds),
    usedIds: keep(s.usedIds),
    todayQuestionIds: keep(s.todayQuestionIds),
  }, null, 2);
};

export const importDailyPlan = (
  subject: string, json: string, allowed?: AllowedTopics,
): boolean => {
  try {
    const parsed = JSON.parse(json) as DailyPlanState;
    if (!parsed || !Array.isArray(parsed.unusedIds)) return false;
    const current = loadDailyPlan(subject);
    if (!current || !allowed) { saveDailyPlan(subject, parsed); return true; }

    // Only touch selected units; leave everything else as it was.
    const inSel = (id: string) => isAllowed(id, allowed);
    const outSel = (id: string) => !isAllowed(id, allowed);
    current.unusedIds = [
      ...current.unusedIds.filter(outSel),
      ...parsed.unusedIds.filter(inSel),
    ];
    current.usedIds = [
      ...current.usedIds.filter(outSel),
      ...(parsed.usedIds ?? []).filter(inSel),
    ];
    current.todayQuestionIds = (parsed.todayQuestionIds ?? []).filter(inSel);
    current.questionsPerDay = parsed.questionsPerDay ?? current.questionsPerDay;
    saveDailyPlan(subject, current);
    return true;
  } catch { return false; }
};

/** How many mastered questions are available to review. */
export const getReviewCount = (subject: string): number =>
  loadDailyPlan(subject)?.usedIds.length ?? 0;

/** Draw a review set from the mastered bucket (round-robin across topics). */
export const drawReviewSet = (subject: string, allowed?: AllowedTopics): string[] => {
  const s = loadDailyPlan(subject);
  if (!s) return [];
  const pool = s.usedIds.filter(id => isAllowed(id, allowed));
  if (pool.length === 0) return [];
  const n = Math.max(1, Math.min(200, s.reviewPerDay ?? s.questionsPerDay));
  return pickRoundRobin(pool, n);
};

export const setReviewPerDay = (subject: string, n: number) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  s.reviewPerDay = Math.max(1, Math.min(200, Math.floor(n)));
  saveDailyPlan(subject, s);
};

/**
 * Called when a review question is answered WRONG.
 * Demotes it: mastered -> unused, so tomorrow's daily plan can serve it.
 */
export const markDailyPlanWrong = (subject: string, questionId: string) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  if (!s.usedIds.includes(questionId)) return;
  s.usedIds = s.usedIds.filter(id => id !== questionId);
  if (!s.unusedIds.includes(questionId)) s.unusedIds.push(questionId);
  saveDailyPlan(subject, s);
};

/**
 * Called when the user checks/unchecks units mid-day.
 * - Drops today's ids from units that are now unchecked.
 * - Trims each remaining unit to a fair share so newly checked units
 *   get room immediately (misses are kept first because they are
 *   already at the front of the list).
 * - Tops up round-robin from the selected units.
 */
export const applyTopicFilter = (subject: string, allowed: AllowedTopics) => {
  const s = loadDailyPlan(subject);
  if (!s) return;
  const topics = new Set(
    s.unusedIds.filter(id => isAllowed(id, allowed)).map(topicOf)
  );
  const share = Math.max(1, Math.ceil(s.questionsPerDay / Math.max(1, topics.size)));
  const perTopic: Record<string, number> = {};
  s.todayQuestionIds = s.todayQuestionIds.filter(id => {
    if (!isAllowed(id, allowed)) return false;
    const t = topicOf(id);
    perTopic[t] = (perTopic[t] ?? 0) + 1;
    return perTopic[t] <= share;
  });
  const already = new Set(s.todayQuestionIds);
  const pool = s.unusedIds.filter(id => !already.has(id) && isAllowed(id, allowed));
  const need = s.questionsPerDay - s.todayQuestionIds.length;
  if (need > 0) s.todayQuestionIds.push(...pickRoundRobin(pool, need));
  saveDailyPlan(subject, s);
};
