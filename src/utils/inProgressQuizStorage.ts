import { Question, QuizAttempt } from '@/types/quiz';

const STORAGE_KEY = 'in-progress-quiz-v1';

export interface InProgressQuizState {
  version: 1;
  routeKey: string; // `${subject}|${unitId}|${quizType}`
  updatedAt: number;
  // Enough data to resume without relying on navigation state
  questions: Question[];
  attempts: QuizAttempt[];
  currentIndex: number;
  currentAnswer: string;
  isSubmitted: boolean;
  showGrading: boolean;
  timerSeconds: number;
  // Optional context (useful for UIs / future extensions)
  meta?: Record<string, unknown>;
}

type StoredMap = Record<string, InProgressQuizState>;

const safeParse = (raw: string | null): StoredMap => {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as StoredMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

export const buildRouteKey = (subject?: string, unitId?: string, quizType?: string) =>
  `${subject || ''}|${unitId || ''}|${quizType || ''}`;

export const loadInProgressQuiz = (routeKey: string): InProgressQuizState | null => {
  const map = safeParse(localStorage.getItem(STORAGE_KEY));
  return map[routeKey] || null;
};

export const hasInProgressQuiz = (routeKey: string): boolean => {
  return !!loadInProgressQuiz(routeKey);
};

export const saveInProgressQuiz = (state: InProgressQuizState) => {
  const map = safeParse(localStorage.getItem(STORAGE_KEY));
  map[state.routeKey] = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
};

export const clearInProgressQuiz = (routeKey: string) => {
  const map = safeParse(localStorage.getItem(STORAGE_KEY));
  if (map[routeKey]) {
    delete map[routeKey];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }
};
