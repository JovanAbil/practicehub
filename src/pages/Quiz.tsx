import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import MathQuickInput from '@/components/MathQuickInput';
import { resolveImagePath } from '@/utils/resolveImagePath';

import { ArrowLeft, CheckCircle2, XCircle, Flag, SkipForward } from 'lucide-react';
import PartsQuestionView from '@/components/PartsQuestionView';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import useQuizTimer from '@/hooks/useQuizTimer';
import QuizTimer from '@/components/QuizTimer';
import useCustomUnits from '@/hooks/useCustomUnits';

// Use centralized question loader
import { getQuestionMap } from '@/utils/questionLoader';
// Tests question loader for /tests routes
import { testsQuestionMap } from '@/data/real-tests/testsQuestionLoader';

import { Question, QuizAttempt, PartAttemptState, SelectAllQuestion } from '@/types/quiz';
import { toast } from 'sonner';
import QuestionTable from '@/components/QuestionTable';
import MathText from '@/components/MathText';

import {
  buildRouteKey,
  clearInProgressQuiz,
  loadInProgressQuiz,
  saveInProgressQuiz,
} from '@/utils/inProgressQuizStorage';

const Quiz = () => {
  const frqInputRef = useRef<HTMLTextAreaElement>(null);
  const { subject, unitId, quizType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const timer = useQuizTimer();
  const { data: customUnitsData, isLoaded: customUnitsLoaded } = useCustomUnits();
  
  // Calculator section parameter - when true, puts calculator questions at the end
  const calculatorSectionEnabled = searchParams.get('calculatorSection') === 'true';
  // Tests mode - uses separate question loader
  const isTestsMode = searchParams.get('source') === 'tests';
  
  const selectedUnits = useMemo(() => location.state?.selectedUnits || [], [location.state?.selectedUnits]);
  const wrongQuestions = useMemo(() => location.state?.wrongQuestions || [], [location.state?.wrongQuestions]);
  const presetQuestions = useMemo(() => location.state?.presetQuestions || [], [location.state?.presetQuestions]);
  const presetId = useMemo(() => location.state?.presetId || searchParams.get('presetId') || '', [location.state?.presetId, searchParams]);
  const startNewAttempt = useMemo(() => !!location.state?.startNewAttempt, [location.state?.startNewAttempt]);
  
  // Check if this is a custom topic quiz
  const isCustomTopic = subject?.startsWith('custom-');
  const customUnitId = isCustomTopic ? subject.replace('custom-', '') : null;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [showSkipTransition, setShowSkipTransition] = useState(false);
  const [listInputs, setListInputs] = useState<string[]>([]);

  // Once the quiz is completed (or skipped to results), stop saving progress
  // so the flush-on-unmount and debounced save can't resurrect a stale entry.
  const completedRef = useRef(false);

  // Scroll to the top of the page whenever the user advances to a new question.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentIndex]);

  // Build route key - for presets, include preset ID to track each preset separately
  const routeKey = useMemo(() => {
    if (quizType === 'preset' && presetId) {
      return `${subject}|${unitId}|preset|${presetId}`;
    }
    return buildRouteKey(subject, unitId, quizType);
  }, [subject, unitId, quizType, presetId]);

  // Get questions using the centralized loader (applies date-based switching)
  // In tests mode, use the separate tests question map
  const questionMap = useMemo(() => isTestsMode ? testsQuestionMap : getQuestionMap(), [isTestsMode]);
  
  // Topic key for reference
  const questionKey = `${subject}-${unitId}`;

  useEffect(() => {
    // If user explicitly starts a new attempt, wipe any saved progress for this route.
    if (startNewAttempt) {
      clearInProgressQuiz(routeKey);
    }

    // Wait for custom units to load if this is a custom topic
    if (isCustomTopic && !customUnitsLoaded) {
      return;
    }

    // Try to restore an in-progress attempt first (so leaving/reloading the site doesn't reset).
    if (!startNewAttempt) {
      const saved = loadInProgressQuiz(routeKey);
      if (saved && saved.questions.length > 0) {
        setQuestions(saved.questions);
        setAttempts(saved.attempts);
        setCurrentIndex(saved.currentIndex);
        setCurrentAnswer(saved.currentAnswer);
        setIsSubmitted(saved.isSubmitted);
        setShowGrading(saved.showGrading);
        timer.reset();
        timer.set(saved.timerSeconds);
        timer.start();
        return;
      }
    }
    
    const totalQuestions = 30;
    const questionCount = quizType === 'daily' ? 10 : quizType === 'cram' ? Infinity : totalQuestions;
    
    let allQuestions: Question[] = [];
    
    // Handle preset questions from preset builder
    if (presetQuestions.length > 0) {
      const orderedMode = !!location.state?.orderedMode;
      if (orderedMode) {
        allQuestions = [...presetQuestions]; // Keep original order
      } else {
        allQuestions = [...presetQuestions].sort(() => Math.random() - 0.5);
      }
    }
    // Handle wrong questions from targeted practice
    else if (wrongQuestions.length > 0) {
      allQuestions = [...wrongQuestions].sort(() => Math.random() - 0.5);
    } 
    // Handle custom topic / custom unit challenge
    else if (isCustomTopic && customUnitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      if (!unit) {
        allQuestions = [];
      }
      // If selectedUnits are provided, treat them as topicIds (course-challenge style for custom units)
      else if (selectedUnits.length > 0) {
        const topics = unit.topics.filter(t => selectedUnits.includes(t.id));

        if (quizType === 'test') {
          // Distribute 30 questions evenly across selected topics
          const numTopics = topics.length;
          const base = numTopics > 0 ? Math.floor(totalQuestions / numTopics) : 0;
          let remainder = numTopics > 0 ? totalQuestions % numTopics : 0;

          topics.forEach(topic => {
            const shuffledTopic = [...topic.questions].sort(() => Math.random() - 0.5);
            let toTake = base;
            if (remainder > 0) {
              toTake += 1;
              remainder -= 1;
            }
            allQuestions = [...allQuestions, ...shuffledTopic.slice(0, Math.min(toTake, shuffledTopic.length))];
          });
          allQuestions = allQuestions.sort(() => Math.random() - 0.5);
        } else {
          // Cram mode across selected topics
          topics.forEach(topic => {
            allQuestions = [...allQuestions, ...topic.questions];
          });
          allQuestions = allQuestions.sort(() => Math.random() - 0.5);
        }
      }
      // Otherwise, single topic
      else if (unitId) {
        const topic = unit.topics.find(t => t.id === unitId);
        const customQuestions = topic?.questions || [];
        const shuffled = [...customQuestions].sort(() => Math.random() - 0.5);
        allQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));
      }
    }
    else if (selectedUnits.length > 0 && quizType === 'test') {
      // Course challenge: distribute 30 questions evenly across selected units
      const numUnits = selectedUnits.length;
      const baseQuestionsPerUnit = Math.floor(totalQuestions / numUnits);
      let remainder = totalQuestions % numUnits;
      
      selectedUnits.forEach((unit: string) => {
        const unitQuestions = questionMap[`${subject}-${unit}`] || [];
        const shuffledUnit = [...unitQuestions].sort(() => Math.random() - 0.5);
        
        // Calculate how many questions to take from this unit
        let questionsToTake = baseQuestionsPerUnit;
        if (remainder > 0) {
          questionsToTake += 1;
          remainder -= 1;
        }
        
        // Take the calculated number of questions (or all if fewer available)
        const selected = shuffledUnit.slice(0, Math.min(questionsToTake, shuffledUnit.length));
        allQuestions = [...allQuestions, ...selected];
      });
      
      // Shuffle the final combined list
      allQuestions = allQuestions.sort(() => Math.random() - 0.5);
    } else if (selectedUnits.length > 0) {
      // Cram mode: all questions from all units
      selectedUnits.forEach((unit: string) => {
        allQuestions = [...allQuestions, ...(questionMap[`${subject}-${unit}`] || [])];
      });
      allQuestions = allQuestions.sort(() => Math.random() - 0.5);
    } else {
      // Single unit quiz
      allQuestions = questionMap[`${subject}-${unitId}`] || [];
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      allQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    }
    
    // If calculator section is enabled, reorder questions so calculator questions are at the end
    if (calculatorSectionEnabled) {
      const nonCalcQuestions = allQuestions.filter(q => !q.calculator);
      const calcQuestions = allQuestions.filter(q => q.calculator === true);
      allQuestions = [...nonCalcQuestions, ...calcQuestions];
    }
    
    if (allQuestions.length > 0) {
      setQuestions(allQuestions);
      setAttempts(allQuestions.map(q => ({
        questionId: q.id,
        userAnswer: null,
        isCorrect: null,
        selfGraded: q.type === 'free-response',
        ...(q.type === 'parts' ? {
          partsState: Object.fromEntries(q.parts.map(p => [p.label, { userAnswer: null, isCorrect: null }]))
        } : {})
      })));
      setCurrentIndex(0);
      setCurrentAnswer('');
      setSelectedCheckboxes([]);
      setListInputs([]);
      setIsSubmitted(false);
      setShowGrading(false);
      timer.reset();
      timer.start();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, unitId, quizType, selectedUnits, wrongQuestions, presetQuestions, questionMap, isCustomTopic, customUnitId, customUnitsLoaded, calculatorSectionEnabled, routeKey, startNewAttempt]);

  // Persist progress so leaving/reloading doesn't lose work.
  // Debounced (3s) so typing in FRQ inputs doesn't cause input lag from per-keystroke writes.
  useEffect(() => {
    if (!questions.length || !attempts.length) return;
    if (completedRef.current) return;
    const handle = setTimeout(() => {
      if (completedRef.current) return;
      saveInProgressQuiz({
        version: 1,
        routeKey,
        updatedAt: Date.now(),
        questions,
        attempts,
        currentIndex,
        currentAnswer,
        isSubmitted,
        showGrading,
        timerSeconds: timer.seconds,
        meta: {
          subject,
          unitId,
          quizType,
          calculatorSectionEnabled,
        },
      });
    }, 3000);
    return () => clearTimeout(handle);
  }, [questions, attempts, currentIndex, currentAnswer, isSubmitted, showGrading, timer.seconds, routeKey, subject, unitId, quizType, calculatorSectionEnabled]);

  // Also save immediately when the user leaves the page so nothing is lost.
  useEffect(() => {
    const flush = () => {
      if (completedRef.current) return;
      if (!questions.length || !attempts.length) return;
      saveInProgressQuiz({
        version: 1,
        routeKey,
        updatedAt: Date.now(),
        questions,
        attempts,
        currentIndex,
        currentAnswer,
        isSubmitted,
        showGrading,
        timerSeconds: timer.seconds,
        meta: { subject, unitId, quizType, calculatorSectionEnabled },
      });
    };
    window.addEventListener('beforeunload', flush);
    document.addEventListener('visibilitychange', flush);
    return () => {
      window.removeEventListener('beforeunload', flush);
      document.removeEventListener('visibilitychange', flush);
      flush();
    };
  }, [questions, attempts, currentIndex, currentAnswer, isSubmitted, showGrading, timer.seconds, routeKey, subject, unitId, quizType, calculatorSectionEnabled]);

  const currentQuestion = questions[currentIndex];
  const currentAttempt = attempts[currentIndex];
  
  // Calculate if we're in the "skipped section" (revisiting skipped questions)
  const isInSkippedSection = attempts.length > 0 && 
    attempts.some(a => a.skipped) &&
    attempts.every(a => a.userAnswer !== null || a.skipped);
  
  // Total skipped = all questions with skipped: true (this stays constant)
  const totalSkipped = attempts.filter(a => a.skipped).length;
  
  // How many skipped questions have been finalized (answered or skipped again)
  const finalizedSkippedCount = attempts.filter(a => a.userAnswer === 'SKIPPED_FINAL').length;
  
  // Current position in skipped section = finalized + 1 (for current question)
  const currentSkippedPosition = isInSkippedSection ? finalizedSkippedCount + 1 : 0;
  
  // Progress: for skipped section, base on finalized skips + non-skipped answered
  const answeredCount = attempts.filter(a => a.userAnswer !== null && !a.skipped).length;
  const progress = Math.min(100, isInSkippedSection
    ? ((answeredCount + finalizedSkippedCount + 1) / questions.length) * 100
    : ((currentIndex + 1) / questions.length) * 100);

  useEffect(() => {
    if (currentQuestion && (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'select-all')) {
      const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Number keys 1-9 for selecting options - don't prevent default, just select answer
      if (!isSubmitted && currentQuestion?.type === 'multiple-choice') {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= shuffledOptions.length) {
          e.preventDefault();
          setCurrentAnswer(shuffledOptions[keyNum - 1].value);
          if (document.activeElement instanceof HTMLButtonElement) {
            document.activeElement.blur();
          }
          return;
        }
      }

      // Number keys toggle checkboxes for select-all
      if (!isSubmitted && currentQuestion?.type === 'select-all') {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= shuffledOptions.length) {
          e.preventDefault();
          const val = shuffledOptions[keyNum - 1].value;
          setSelectedCheckboxes(prev => 
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
          );
          if (document.activeElement instanceof HTMLButtonElement) {
            document.activeElement.blur();
          }
          return;
        }
      }

      if (e.key === 'Enter') {
        // Don't intercept Enter when user is typing in a textarea (FRQ input)
        if (document.activeElement instanceof HTMLTextAreaElement) {
          return;
        }
        if (document.activeElement instanceof HTMLButtonElement) {
          e.preventDefault();
        }
        if (!isSubmitted) {
          handleSubmit();
        } else if ((currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'select-all') || currentAttempt.isCorrect !== null) {
          handleNext();
        }
      }
      
      if (showGrading && currentQuestion.type === 'free-response') {
        if (e.key === 'ArrowRight') {
          handleSelfGrade(true);
        } else if (e.key === 'ArrowLeft') {
          handleSelfGrade(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSubmitted, currentAnswer, currentQuestion, currentAttempt, currentIndex, showGrading, shuffledOptions, selectedCheckboxes]);

  const handleSubmit = () => {
    // For list FRQs, save the user's list inputs as JSON
    const isListFrq = currentQuestion.type === 'free-response' && currentQuestion.listAnswers && currentQuestion.listAnswers.length > 0;
    const isSelectAll = currentQuestion.type === 'select-all';
    const answerToSubmit = isListFrq ? JSON.stringify(listInputs) : isSelectAll ? selectedCheckboxes.sort().join(',') : currentAnswer;
    
    if (!isListFrq && !isSelectAll && !currentAnswer.trim()) {
      toast.error('Please provide an answer');
      return;
    }
    if (isSelectAll && selectedCheckboxes.length === 0) {
      toast.error('Please select at least one option');
      return;
    }

    const newAttempts = [...attempts];
    newAttempts[currentIndex] = {
      ...newAttempts[currentIndex],
      userAnswer: answerToSubmit
    };

    if (currentQuestion.type === 'multiple-choice') {
      const isCorrect = currentAnswer === currentQuestion.correctAnswer;
      newAttempts[currentIndex].isCorrect = isCorrect;
      setAttempts(newAttempts);
      setIsSubmitted(true);
    } else if (currentQuestion.type === 'select-all') {
      const correctSorted = [...currentQuestion.correctAnswers].sort().join(',');
      const userSorted = [...selectedCheckboxes].sort().join(',');
      const isCorrect = correctSorted === userSorted;
      newAttempts[currentIndex].isCorrect = isCorrect;
      setAttempts(newAttempts);
      setIsSubmitted(true);
    } else {
      setAttempts(newAttempts);
      setIsSubmitted(true);
      setShowGrading(true);
    }
  };

  const handleSelfGrade = (isCorrect: boolean) => {
    const newAttempts = [...attempts];
    newAttempts[currentIndex].isCorrect = isCorrect;
    setAttempts(newAttempts);
    setShowGrading(false);
  };

  const handleMarkIncorrect = () => {
    const newAttempts = [...attempts];
    // Toggle the marked state
    newAttempts[currentIndex] = {
      ...newAttempts[currentIndex],
      markedIncorrect: !newAttempts[currentIndex].markedIncorrect,
      markedIncorrectReason: !newAttempts[currentIndex].markedIncorrect ? 'question issue' : undefined,
    };
    setAttempts(newAttempts);
    toast.success(newAttempts[currentIndex].markedIncorrect ? 'Question marked as incorrect' : 'Mark removed');
  };

  const handleSkip = () => {
    const newAttempts = [...attempts];
    
    // Check if this question was already skipped before (revisiting in skipped section)
    const wasAlreadySkipped = newAttempts[currentIndex].skipped && 
      (newAttempts[currentIndex].userAnswer === null || newAttempts[currentIndex].userAnswer === 'SKIPPED');
    
    // If skipping again in skipped section, mark as FINAL (no more revisits)
    const skipMarker = wasAlreadySkipped ? 'SKIPPED_FINAL' : 'SKIPPED';
    
    newAttempts[currentIndex] = {
      ...newAttempts[currentIndex],
      userAnswer: skipMarker,
      isCorrect: false,
      skipped: true
    };
    
    // Find the next question to show
    // Priority 1: Next unanswered question after current index
    let nextIndex = -1;
    for (let i = currentIndex + 1; i < questions.length; i++) {
      if (newAttempts[i].userAnswer === null) {
        nextIndex = i;
        break;
      }
    }
    
    // Priority 2: Any unanswered question from the beginning (wrap around)
    if (nextIndex === -1) {
      for (let i = 0; i < currentIndex; i++) {
        if (newAttempts[i].userAnswer === null) {
          nextIndex = i;
          break;
        }
      }
    }
    
    setAttempts(newAttempts);
    
    // If no unanswered questions left, check for skipped questions
    if (nextIndex === -1) {
      const skippedCount = newAttempts.filter(a => a.userAnswer === 'SKIPPED').length;
      
      // If there are skipped questions and we're not already in skipped section, show transition
      if (skippedCount > 0 && !wasAlreadySkipped) {
        setShowSkipTransition(true);
        return;
      }
      
      // If already in skipped section, find next skipped question
      if (wasAlreadySkipped) {
        // Find next skipped question that can be revisited
        for (let i = currentIndex + 1; i < questions.length; i++) {
          if (newAttempts[i].skipped && newAttempts[i].userAnswer === 'SKIPPED') {
            newAttempts[i] = {
              ...newAttempts[i],
              userAnswer: null,
              isCorrect: null,
              skipped: true
            };
            setAttempts(newAttempts);
            setCurrentIndex(i);
            setCurrentAnswer('');
            setSelectedCheckboxes([]);
            setListInputs([]);
            setIsSubmitted(false);
            setShowGrading(false);
            setShuffledOptions([]);
            return;
          }
        }
        
        // Wrap around
        for (let i = 0; i < currentIndex; i++) {
          if (newAttempts[i].skipped && newAttempts[i].userAnswer === 'SKIPPED') {
            newAttempts[i] = {
              ...newAttempts[i],
              userAnswer: null,
              isCorrect: null,
              skipped: true
            };
            setAttempts(newAttempts);
            setCurrentIndex(i);
            setCurrentAnswer('');
            setSelectedCheckboxes([]);
            setListInputs([]);
            setIsSubmitted(false);
            setShowGrading(false);
            setShuffledOptions([]);
            return;
          }
        }
      }
      
      // No more questions - go to results
      goToResults(newAttempts);
      return;
    }
    
    setCurrentIndex(nextIndex);
    setCurrentAnswer('');
    setSelectedCheckboxes([]);
    setListInputs([]);
    setIsSubmitted(false);
    setShowGrading(false);
    setShuffledOptions([]);
  };

  const goToResults = (finalAttempts: QuizAttempt[]) => {
    const finalTime = timer.stop();
    
    // Calculate score: parts questions count each part as 1 point
    let score = 0;
    let total = 0;
    let skippedCount = 0;
    const expandedAttempts: any[] = [];
    
    finalAttempts.forEach((a, i) => {
      const q = questions[i];
      // Skip questions marked as skipped - don't count in score
      if (a.skipped || a.userAnswer === 'SKIPPED' || a.userAnswer === 'SKIPPED_FINAL') {
        skippedCount += 1;
        expandedAttempts.push({ ...a, question: q });
        return;
      }
      if (q.type === 'parts' && a.partsState) {
        // Each part = 1 point
        q.parts.forEach(part => {
          const ps = a.partsState![part.label];
          total += 1;
          if (ps?.isCorrect) score += 1;
        });
        // Add as single attempt with partsState for review
        expandedAttempts.push({ ...a, question: q });
      } else {
        total += 1;
        if (a.isCorrect) score += 1;
        expandedAttempts.push({ ...a, question: q });
      }
    });

    completedRef.current = true;
    clearInProgressQuiz(routeKey);

    navigate('/results', { 
      state: { 
        score, 
        total,
        subject,
        unitId, 
        quizType,
        timeElapsed: finalTime,
        attempts: expandedAttempts,
      } 
    });
  };

  const handleSkipTransitionYes = () => {
    // User wants to review skipped questions
    setShowSkipTransition(false);
    
    const newAttempts = [...attempts];
    // Find first skipped question and reset it
    for (let i = 0; i < newAttempts.length; i++) {
      if (newAttempts[i].skipped && newAttempts[i].userAnswer === 'SKIPPED') {
        newAttempts[i] = {
          ...newAttempts[i],
          userAnswer: null,
          isCorrect: null,
          skipped: true
        };
        setAttempts(newAttempts);
        setCurrentIndex(i);
        setCurrentAnswer('');
        setSelectedCheckboxes([]);
        setListInputs([]);
        setIsSubmitted(false);
        setShowGrading(false);
        setShuffledOptions([]);
        return;
      }
    }
  };

  const handleSkipTransitionNo = () => {
    // User doesn't want to review - mark all skipped as final and go to results
    const newAttempts = attempts.map(a => {
      if (a.userAnswer === 'SKIPPED') {
        return { ...a, userAnswer: 'SKIPPED_FINAL' };
      }
      return a;
    });
    setAttempts(newAttempts);
    goToResults(newAttempts);
  };

  const handleSkipAll = () => {
    // Mark all remaining unanswered questions as skipped (not wrong, not done)
    const newAttempts = attempts.map(a => {
      if (a.userAnswer === null) {
        return { ...a, userAnswer: 'SKIPPED_FINAL', isCorrect: null, skipped: true };
      }
      return a;
    });
    setAttempts(newAttempts);
    goToResults(newAttempts);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      // Check if next question is unanswered
      let nextIndex = currentIndex + 1;
      
      // Find next unanswered question
      while (nextIndex < questions.length && attempts[nextIndex].userAnswer !== null) {
        nextIndex++;
      }
      
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setCurrentAnswer('');
        setSelectedCheckboxes([]);
        setListInputs([]);
        setIsSubmitted(false);
        setShowGrading(false);
        setShuffledOptions([]);
        return;
      }
      
      // No more unanswered questions - check for skipped
      const skippedCount = attempts.filter(a => a.userAnswer === 'SKIPPED').length;
      if (skippedCount > 0) {
        setShowSkipTransition(true);
        return;
      }
      
      // No skipped either - go to results
      goToResults(attempts);
    } else {
      // At last question - check for skipped questions
      const skippedCount = attempts.filter(a => a.userAnswer === 'SKIPPED').length;
      if (skippedCount > 0) {
        setShowSkipTransition(true);
        return;
      }
      
      goToResults(attempts);
    }
  };

  // Transition screen for reviewing skipped questions
  if (showSkipTransition) {
    const skippedCount = attempts.filter(a => a.userAnswer === 'SKIPPED').length;
    const answeredCount = attempts.filter(a => a.userAnswer !== null && a.userAnswer !== 'SKIPPED').length;
    const correctCount = attempts.filter(a => a.isCorrect).length;
    
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-5xl flex-1 flex items-center justify-center">
          <Card className="p-8 max-w-md w-full animate-fade-in text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-warning/20 rounded-full mb-6 mx-auto">
              <span className="text-3xl">⏭️</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Main Quiz Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You answered {answeredCount} of {questions.length} questions ({correctCount} correct).
            </p>
            
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6">
              <p className="font-medium text-warning-foreground">
                You skipped {skippedCount} question{skippedCount !== 1 ? 's' : ''}.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Would you like to review them now?
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button onClick={handleSkipTransitionYes} size="lg" className="w-full">
                Yes, Review Skipped Questions
              </Button>
              <Button onClick={handleSkipTransitionNo} variant="outline" size="lg" className="w-full">
                No, Go to Results
              </Button>
            </div>
          </Card>
        </div>
        <div className="h-48" aria-hidden="true" />
        <Footer />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-md mx-auto px-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading questions...</p>
          <div className="mt-6 p-4 rounded-lg border bg-card text-card-foreground">
            <p className="text-sm text-muted-foreground">
              Looking for a test to study for that hasn't been taken yet? Check the{' '}
              <Link to="/category/other" className="text-primary underline hover:text-primary/80 font-medium">
                Temporary Practice unit in the Other section
              </Link>, or create your own in the{' '}
              <Link to="/category/custom" className="text-primary underline hover:text-primary/80 font-medium">
                Custom Units section
              </Link>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => {
              // For targeted practice (wrong questions), go back to category
              if (wrongQuestions.length > 0) {
                if (['precalc'].includes(subject || '')) navigate('/category/math');
                else if (['biology', 'chemistry'].includes(subject || '')) navigate('/category/science');
                else if (['world-history'].includes(subject || '')) navigate('/category/social');
                else if (['memory', 'practice'].includes(subject || '')) navigate('/category/other');
                else if (isCustomTopic) navigate('/category/custom');
                else navigate('/');
              }
              // For course challenge, go back to course challenge
              else if (selectedUnits.length > 0) {
                navigate(`/course-challenge/${subject}`);
              }
              // For custom topics, go back to the Custom Units category
              else if (isCustomTopic) {
                navigate('/category/custom');
              }
              // For single unit, go back to unit detail
              else {
                navigate(`/unit/${subject}/${unitId}`);
              }
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {wrongQuestions.length > 0 ? 'Back to Category' : selectedUnits.length > 0 ? 'Back to Challenge' : 'Back to Unit'}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkipAll}
              className="text-muted-foreground hover:text-foreground"
              title="Skip all remaining questions"
            >
              <SkipForward className="mr-1 h-4 w-4" />
              Skip All
            </Button>
            <QuizTimer formatted={timer.formatted} isRunning={timer.isRunning} />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              {isInSkippedSection && totalSkipped > 0 ? (
                <>
                  Skipped Question {currentSkippedPosition} of {totalSkipped}
                  <span className="ml-2 px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full font-medium">
                    Review
                  </span>
                </>
              ) : (
                <>
                  Question {currentIndex + 1} of {questions.length}
                  {attempts[currentIndex]?.skipped && (
                    <span className="ml-2 px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full font-medium">
                      [Skipped]
                    </span>
                  )}
                </>
              )}
            </h2>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 animate-fade-in">
          {currentQuestion.type === 'parts' ? (
            <PartsQuestionView
              question={currentQuestion}
              partsState={currentAttempt?.partsState || {}}
              onPartsStateChange={(newPartsState) => {
                const newAttempts = [...attempts];
                newAttempts[currentIndex] = {
                  ...newAttempts[currentIndex],
                  partsState: newPartsState,
                };
                // Check if all parts are complete to set the overall attempt
                const allComplete = currentQuestion.parts.every(p => {
                  const ps = newPartsState[p.label];
                  return ps && ps.isCorrect !== null;
                });
                if (allComplete) {
                  const allCorrect = currentQuestion.parts.every(p => newPartsState[p.label]?.isCorrect);
                  newAttempts[currentIndex].userAnswer = 'PARTS_COMPLETE';
                  newAttempts[currentIndex].isCorrect = allCorrect;
                }
                setAttempts(newAttempts);
              }}
              onAllComplete={() => {
                // Mark as submitted and move on
                const newAttempts = [...attempts];
                newAttempts[currentIndex] = {
                  ...newAttempts[currentIndex],
                  userAnswer: 'PARTS_COMPLETE',
                };
                setAttempts(newAttempts);
                
                // Find next question
                let nextIndex = -1;
                for (let i = currentIndex + 1; i < questions.length; i++) {
                  if (newAttempts[i].userAnswer === null) {
                    nextIndex = i;
                    break;
                  }
                }
                if (nextIndex === -1) {
                  for (let i = 0; i < currentIndex; i++) {
                    if (newAttempts[i].userAnswer === null) {
                      nextIndex = i;
                      break;
                    }
                  }
                }
                
                if (nextIndex === -1) {
                  // Check for skipped
                  const skippedCount = newAttempts.filter(a => a.userAnswer === 'SKIPPED').length;
                  if (skippedCount > 0) {
                    setShowSkipTransition(true);
                    return;
                  }
                  goToResults(newAttempts);
                  return;
                }
                
                setCurrentIndex(nextIndex);
                setCurrentAnswer('');
                setSelectedCheckboxes([]);
                setListInputs([]);
                setIsSubmitted(false);
                setShowGrading(false);
                setShuffledOptions([]);
              }}
              subject={subject}
            />
          ) : (
            <>
              {currentQuestion.table && (
                <QuestionTable data={currentQuestion.table} enableChemistry={subject === 'chemistry'} />
              )}
              
              {currentQuestion.image && (
                <div className="mb-6 flex justify-center">
                  <img 
                    src={resolveImagePath(currentQuestion.image)} 
                    alt="Question diagram" 
                    className="max-w-2xl max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-border"
                  />
                </div>
              )}
              
              <MathText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed" enableChemistry={subject === 'chemistry'}>
                {currentQuestion.question}
              </MathText>

              {currentQuestion.type === 'multiple-choice' ? (
                <RadioGroup
                  value={currentAnswer}
                  onValueChange={setCurrentAnswer}
                  disabled={isSubmitted}
                  className="space-y-3"
                >
                  {shuffledOptions.map((option, index) => (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        isSubmitted && option.value === currentQuestion.correctAnswer
                          ? 'border-success bg-success/10'
                          : isSubmitted && option.value === currentAnswer && currentAnswer !== currentQuestion.correctAnswer
                          ? 'border-destructive bg-destructive/10'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        <span className="font-semibold mr-2 text-muted-foreground">{index + 1}.</span>
                        {option.image ? (
                          <img 
                            src={resolveImagePath(option.image)}  
                            alt={`Option ${index + 1}`}
                            className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2"
                          />
                        ) : (
                          <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                        )}
                      </Label>
                      {isSubmitted && option.value === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      )}
                      {isSubmitted && option.value === currentAnswer && currentAnswer !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              ) : currentQuestion.type === 'select-all' ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium mb-2">Select all that apply:</p>
                  {shuffledOptions.map((option, index) => {
                    const isSelected = selectedCheckboxes.includes(option.value);
                    const isCorrectOption = currentQuestion.correctAnswers.includes(option.value);
                    const wasSelectedWrong = isSubmitted && isSelected && !isCorrectOption;
                    const wasCorrectNotSelected = isSubmitted && !isSelected && isCorrectOption;
                    
                    return (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          isSubmitted && isCorrectOption
                            ? 'border-success bg-success/10'
                            : wasSelectedWrong
                            ? 'border-destructive bg-destructive/10'
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => {
                          if (isSubmitted) return;
                          setSelectedCheckboxes(prev =>
                            prev.includes(option.value) 
                              ? prev.filter(v => v !== option.value) 
                              : [...prev, option.value]
                          );
                        }}
                      >
                        <Checkbox
                          checked={isSelected}
                          disabled={isSubmitted}
                          onCheckedChange={() => {
                            if (isSubmitted) return;
                            setSelectedCheckboxes(prev =>
                              prev.includes(option.value) 
                                ? prev.filter(v => v !== option.value) 
                                : [...prev, option.value]
                            );
                          }}
                        />
                        <span className="flex-1">
                          <span className="font-semibold mr-2 text-muted-foreground">{index + 1}.</span>
                          {option.image ? (
                            <img 
                              src={resolveImagePath(option.image)}  
                              alt={`Option ${index + 1}`}
                              className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2"
                            />
                          ) : (
                            <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                          )}
                        </span>
                        {isSubmitted && isCorrectOption && (
                          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                        )}
                        {wasSelectedWrong && (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        )}
                        {wasCorrectNotSelected && (
                          <span className="text-xs text-warning font-medium flex-shrink-0">Missed</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : currentQuestion.type === 'free-response' && currentQuestion.listAnswers && currentQuestion.listAnswers.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground font-medium">List {currentQuestion.listAnswers.length} item(s):</p>
                  {isSubmitted ? (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-[auto_1fr_1fr] bg-muted/50 border-b border-border">
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground w-8">#</div>
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-l border-border">Your Answer</div>
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-l border-border">Correct Answer</div>
                      </div>
                      {currentQuestion.listAnswers.map((item, idx) => (
                        <div key={idx} className={`grid grid-cols-[auto_1fr_1fr] ${idx < currentQuestion.listAnswers!.length - 1 ? 'border-b border-border' : ''}`}>
                          <div className="px-3 py-2 text-sm font-medium text-muted-foreground w-8">{idx + 1}.</div>
                          <div className="px-3 py-2 text-sm border-l border-border break-words">{listInputs[idx] || <span className="text-muted-foreground italic">—</span>}</div>
                          <div className="px-3 py-2 text-sm border-l border-border break-words"><MathText enableChemistry={subject === 'chemistry'}>{item}</MathText></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentQuestion.listAnswers.map((_, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-6 text-center font-medium text-muted-foreground">{idx + 1}.</span>
                          <input
                            type="text"
                            value={listInputs[idx] || ''}
                            onChange={(e) => {
                              const newInputs = [...listInputs];
                              newInputs[idx] = e.target.value;
                              setListInputs(newInputs);
                            }}
                            className="flex-1 h-10 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder={`Item ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
              <div className="space-y-4">
                  <Textarea
                    ref={frqInputRef}
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    disabled={isSubmitted}
                    placeholder="Enter your answer"
                    className="text-lg min-h-[60px] resize-y break-words overflow-wrap-anywhere"
                  />
                  {!isSubmitted && (
                    <>
                      <MathQuickInput
                        textareaRef={frqInputRef}
                        value={currentAnswer}
                        onChange={setCurrentAnswer}
                        useUnicode={true}
                      />
                    </>
                  )}
                </div>
              )}

              {isSubmitted && 'explanation' in currentQuestion && currentQuestion.explanation && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Explanation:</h4>
                  <MathText tag="p" className="whitespace-pre-line text-sm" enableChemistry={subject === 'chemistry'}>{currentQuestion.explanation}</MathText>
                </div>
              )}

              {isSubmitted && currentQuestion.type === 'free-response' && !(currentQuestion.listAnswers && currentQuestion.listAnswers.length > 0) && (
                <div className="mt-6 p-4 bg-primary/5 border-2 border-primary rounded-lg">
                  <h4 className="font-semibold mb-2">Correct Answer:</h4>
                  <MathText tag="p" className="text-lg mb-4" enableChemistry={subject === 'chemistry'}>{currentQuestion.correctAnswer}</MathText>
                  
                  {showGrading && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Did you get this correct?</p>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleSelfGrade(true)}
                          variant="outline"
                          className="flex-1 border-success text-success hover:bg-success hover:text-success-foreground"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          I got it right
                        </Button>
                        <Button
                          onClick={() => handleSelfGrade(false)}
                          variant="outline"
                          className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          I got it wrong
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isSubmitted && currentQuestion.type === 'free-response' && currentQuestion.listAnswers && currentQuestion.listAnswers.length > 0 && showGrading && (
                <div className="mt-6 p-4 bg-primary/5 border-2 border-primary rounded-lg">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Did you get this correct?</p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleSelfGrade(true)}
                        variant="outline"
                        className="flex-1 border-success text-success hover:bg-success hover:text-success-foreground"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        I got it right
                      </Button>
                      <Button
                        onClick={() => handleSelfGrade(false)}
                        variant="outline"
                        className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        I got it wrong
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-4">
                {!isSubmitted ? (
                  <>
                    <Button onClick={handleSkip} variant="outline" size="lg" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Skip
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1" size="lg">
                      Submit Answer
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={handleNext} 
                      className="flex-1" 
                      size="lg"
                      disabled={currentQuestion.type === 'free-response' && showGrading}
                    >
                      {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                    </Button>
                    <Button
                      onClick={handleMarkIncorrect}
                      variant="outline"
                      size="lg"
                      className={`border-warning text-warning hover:bg-warning hover:text-warning-foreground ${currentAttempt?.markedIncorrect ? 'bg-warning text-warning-foreground' : ''}`}
                      disabled={currentQuestion.type === 'free-response' && showGrading}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      {currentAttempt?.markedIncorrect ? 'Marked' : 'Mark Question as Wrong or Buggy'}
                    </Button>
                  </>
                )}
              </div>
            </>
          )}

          {/* Bottom Ad Placeholder */}
          <div className="mt-8">
            <AdPlaceholder position="bottom" />
          </div>
        </Card>
    </div>
    <div className="h-48" aria-hidden="true" />
    <Footer />
  </div>
);
};

export default Quiz;
