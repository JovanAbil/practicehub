export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: { label: string; value: string; text: string; image?: string }[];
  correctAnswer: string;
  explanation?: string;
  table?: TableData;
  image?: string;
  calculator?: boolean; // Whether this question requires a calculator
}

export interface SelectAllQuestion {
  id: string;
  type: 'select-all';
  question: string;
  options: { label: string; value: string; text: string; image?: string }[];
  correctAnswers: string[]; // Array of correct option values
  explanation?: string;
  table?: TableData;
  image?: string;
  calculator?: boolean;
}

export interface FreeResponseQuestion {
  id: string;
  type: 'free-response';
  question: string;
  correctAnswer: string;
  explanation?: string;
  table?: TableData;
  image?: string;
  displayAs?: 'paragraph';
  calculator?: boolean; // Whether this question requires a calculator
  listAnswers?: string[]; // List-type FRQ: multiple correct items the user must identify
}

export interface QuestionPart {
  label: string; // "a", "b", "c", etc.
  type: 'multiple-choice' | 'free-response' | 'select-all';
  question: string;
  options?: { label: string; value: string; text: string; image?: string }[];
  correctAnswer: string;
  correctAnswers?: string[]; // For select-all parts
  explanation?: string;
  image?: string;
  listAnswers?: string[]; // List-type FRQ: multiple correct items the user must identify
}

export interface PartsQuestion {
  id: string;
  type: 'parts';
  question: string; // Main question stem
  parts: QuestionPart[];
  image?: string;
  table?: TableData;
  calculator?: boolean;
}

export type Question = MultipleChoiceQuestion | SelectAllQuestion | FreeResponseQuestion | PartsQuestion;

export interface PartAttemptState {
  userAnswer: string | null;
  isCorrect: boolean | null;
  selfGraded?: boolean;
  skipped?: boolean;
}

export interface QuizAttempt {
  questionId: string;
  userAnswer: string | null;
  isCorrect: boolean | null;
  selfGraded?: boolean;
  skipped?: boolean;
  markedIncorrect?: boolean;
  markedIncorrectReason?: string;
  partsState?: { [partLabel: string]: PartAttemptState }; // For parts questions
}

export interface QuizState {
  currentQuestionIndex: number;
  attempts: QuizAttempt[];
  isSubmitted: boolean;
  isComplete: boolean;
}

// Homework Assignment Types
export interface HomeworkAssignment {
  id: string;
  name: string;
  notes?: string; // Markdown or plain text notes for the assignment
}

export interface UnitContent {
  assignments: HomeworkAssignment[];
  testId?: string; // Reference to the test question set
}

// Wrong answers storage for targeted practice
export interface WrongAnswer {
  questionId: string;
  question: Question;
  timestamp: number;
}

export interface SubjectWrongAnswers {
  [unitId: string]: WrongAnswer[];
}