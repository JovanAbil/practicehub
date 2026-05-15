import { useState, useEffect } from 'react';
import { Question, WrongAnswer, SubjectWrongAnswers } from '@/types/quiz';

const STORAGE_KEY = 'quiz-wrong-answers';

interface AllWrongAnswers {
  [subject: string]: SubjectWrongAnswers;
}

export const useWrongAnswers = () => {
  const [wrongAnswers, setWrongAnswers] = useState<AllWrongAnswers>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWrongAnswers(JSON.parse(stored));
      } catch {
        console.error('Failed to parse wrong answers from storage');
      }
    }
  }, []);

  // Save to localStorage whenever wrongAnswers changes
  const saveToStorage = (data: AllWrongAnswers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setWrongAnswers(data);
  };

  // Add wrong answers after a quiz
  const addWrongAnswers = (subject: string, unitId: string, questions: Question[]) => {
    const newWrongAnswers = { ...wrongAnswers };
    
    if (!newWrongAnswers[subject]) {
      newWrongAnswers[subject] = {};
    }

    // Replace the wrong answers for this unit (don't append, replace with latest)
    newWrongAnswers[subject][unitId] = questions.map(q => ({
      questionId: q.id,
      question: q,
      timestamp: Date.now(),
    }));

    saveToStorage(newWrongAnswers);
  };

  // Get wrong answers for a subject
  const getSubjectWrongAnswers = (subject: string): SubjectWrongAnswers => {
    return wrongAnswers[subject] || {};
  };

  // Get all wrong answers for a subject as a flat array
  const getAllWrongQuestionsForSubject = (subject: string): Question[] => {
    const subjectData = wrongAnswers[subject] || {};
    const allQuestions: Question[] = [];
    
    Object.values(subjectData).forEach(unitWrong => {
      unitWrong.forEach(wa => {
        // Avoid duplicates by question ID
        if (!allQuestions.find(q => q.id === wa.question.id)) {
          allQuestions.push(wa.question);
        }
      });
    });

    return allQuestions;
  };

  // Clear wrong answers for a subject
  const clearSubjectWrongAnswers = (subject: string) => {
    const newWrongAnswers = { ...wrongAnswers };
    delete newWrongAnswers[subject];
    saveToStorage(newWrongAnswers);
  };

  // Get count of wrong answers for a subject
  const getWrongAnswerCount = (subject: string): number => {
    return getAllWrongQuestionsForSubject(subject).length;
  };

  return {
    addWrongAnswers,
    getSubjectWrongAnswers,
    getAllWrongQuestionsForSubject,
    clearSubjectWrongAnswers,
    getWrongAnswerCount,
  };
};

export default useWrongAnswers;