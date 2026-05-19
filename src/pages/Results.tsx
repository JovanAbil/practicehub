import { resolveImagePath } from '@/utils/resolveImagePath';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Trophy, Home, CheckCircle2, XCircle, Clock, Download, Flag, RotateCcw, Target, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Question, QuizAttempt } from '@/types/quiz';
import QuestionTable from '@/components/QuestionTable';
import MathText from '@/components/MathText';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExtendedAttempt extends QuizAttempt {
  question: Question;
}

const ListFrqResultsTable = ({ listAnswers, userAnswer, subject }: { listAnswers: string[]; userAnswer: string | null; subject: string }) => {
  let userListAnswers: string[] = [];
  try {
    userListAnswers = JSON.parse(userAnswer || '[]');
  } catch { userListAnswers = []; }
  return (
    <div className="border rounded-lg overflow-hidden text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-muted">
            <th className="px-3 py-2 text-left font-semibold">#</th>
            <th className="px-3 py-2 text-left font-semibold">Your Answer</th>
            <th className="px-3 py-2 text-left font-semibold">Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {listAnswers.map((ans, i) => (
            <tr key={i} className="border-t">
              <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
              <td className="px-3 py-2 break-words">
                {userListAnswers[i] ? (
                  <MathText enableChemistry={subject === 'chemistry'}>{userListAnswers[i]}</MathText>
                ) : (
                  <span className="text-muted-foreground italic">—</span>
                )}
              </td>
              <td className="px-3 py-2 break-words">
                <MathText enableChemistry={subject === 'chemistry'}>{ans}</MathText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addWrongAnswers } = useWrongAnswers();
  const { score, total, subject, unitId, quizType, attempts, timeElapsed } = location.state || {};

  // Preset download dialog state - must be before any early returns
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const defaultPresetName = `Wrong Answers - ${subject || ''} ${unitId || 'Course Challenge'}`;
  const [presetName, setPresetName] = useState(defaultPresetName);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    // Save wrong answers to localStorage
    if (attempts && subject) {
      const extAttempts = attempts as ExtendedAttempt[];
      const wrongQuestions: Question[] = [];

      extAttempts.forEach(a => {
        const q = a.question;
        const isSkipped = a.skipped || a.userAnswer === 'SKIPPED' || a.userAnswer === 'SKIPPED_FINAL';
        
        if (q.type === 'parts' && a.partsState && !isSkipped) {
          // For parts questions, only include the wrong parts
          const wrongParts = q.parts.filter(p => {
            const ps = a.partsState![p.label];
            return ps && !ps.isCorrect;
          });
          if (wrongParts.length > 0) {
            wrongQuestions.push({
              ...q,
              parts: wrongParts,
            });
          }
        } else if (isSkipped) {
          // Skipped questions go into targeted practice
          wrongQuestions.push(q);
        } else if (!a.isCorrect) {
          wrongQuestions.push(q);
        }
      });
      
      if (wrongQuestions.length > 0) {
        addWrongAnswers(subject, unitId || 'course-challenge', wrongQuestions);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate, attempts, subject, unitId]);

  if (!location.state) {
    return null;
  }

  const percentage = Math.round((score / total) * 100);
  
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', message: 'Outstanding!', color: 'text-success' };
    if (percentage >= 80) return { grade: 'B', message: 'Great job!', color: 'text-primary' };
    if (percentage >= 70) return { grade: 'C', message: 'Good effort!', color: 'text-accent' };
    if (percentage >= 60) return { grade: 'D', message: 'Keep practicing!', color: 'text-muted-foreground' };
    return { grade: 'F', message: 'More study needed', color: 'text-destructive' };
  };

  const gradeInfo = getGrade();

  const extendedAttempts = attempts as ExtendedAttempt[];
  
  // Sort: marked incorrect first, then wrong answers, then correct, then skipped
  const sortedAttempts = [...extendedAttempts].sort((a, b) => {
    const aSkipped = a.skipped || a.userAnswer === 'SKIPPED' || a.userAnswer === 'SKIPPED_FINAL';
    const bSkipped = b.skipped || b.userAnswer === 'SKIPPED' || b.userAnswer === 'SKIPPED_FINAL';
    const getPriority = (att: ExtendedAttempt, skipped: boolean) => {
      if (att.markedIncorrect) return 0;
      if (!att.isCorrect && !skipped) return 1; // wrong
      if (att.isCorrect && !skipped) return 2;   // correct
      return 3;                                   // skipped last
    };
    return getPriority(a, aSkipped) - getPriority(b, bSkipped);
  });
  
  const markedAttempts = extendedAttempts.filter(a => a.markedIncorrect);
  const skippedAttempts = extendedAttempts.filter(a => a.skipped || a.userAnswer === 'SKIPPED' || a.userAnswer === 'SKIPPED_FINAL');
  const wrongAttempts = extendedAttempts.filter(a => !a.isCorrect && !(a.skipped || a.userAnswer === 'SKIPPED' || a.userAnswer === 'SKIPPED_FINAL'));
  const practiceAttempts = extendedAttempts.filter(a => {
    const isSkipped = a.skipped || a.userAnswer === 'SKIPPED' || a.userAnswer === 'SKIPPED_FINAL';
    return !a.isCorrect || isSkipped;
  });

  const handleOpenDownloadDialog = () => {
    if (practiceAttempts.length === 0) {
      toast.error('No wrong or skipped answers to download');
      return;
    }
    setPresetName(defaultPresetName);
    setShowDownloadDialog(true);
  };

  const handleDownloadWrongAnswers = () => {
    const presetData = {
      version: 1,
      preset: {
        id: `wrong-answers-${Date.now()}`,
        name: presetName.trim() || defaultPresetName,
        questionIds: practiceAttempts.map(a => a.questionId),
      }
    };

    const safeFileName = (presetName.trim() || defaultPresetName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    const blob = new Blob([JSON.stringify(presetData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeFileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadDialog(false);
    toast.success('Wrong answers downloaded as preset!');
  };

  const getSubjectDisplayName = (s: string) => {
    const names: Record<string, string> = {
      'apprecalc': 'AP Precalculus',
      'chemistry': 'Chemistry',
      'biology': 'Biology',
      'worldhistory': 'World History',
      'memory': 'Memory Training',
      'stock': 'Stock Market',
    };
    return names[s] || s;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        {/* Top Home Button */}
        <div className="flex justify-start mb-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="p-8 md:p-12 mb-8 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl font-display font-bold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Unit {unitId?.toUpperCase()} - {quizType === 'daily' ? 'Daily Practice' : 'Full Test'}
            </p>

            <div className="bg-muted rounded-lg p-8 mb-8">
              <div className={`text-6xl font-display font-bold mb-2 ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div>
              <p className="text-xl font-semibold mb-4">{gradeInfo.message}</p>
              
              <div className="text-3xl font-bold mb-2">
                {score} / {total}
              </div>
              <p className="text-muted-foreground mb-4">Correct Answers</p>
              
               <Progress value={percentage} className="h-3 mb-4" />
              <p className="text-sm text-muted-foreground mb-4">{percentage}% Score</p>
              
              {skippedAttempts.length > 0 && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <SkipForward className="h-4 w-4" />
                  <span>{skippedAttempts.length} question{skippedAttempts.length !== 1 ? 's' : ''} skipped (not counted)</span>
                </div>
              )}

              {timeElapsed !== undefined && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="timer-display">Time: {formatTime(timeElapsed)}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Retake Quiz */}
        <Card className="p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.025s' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Try Again</h3>
              <p className="text-sm text-muted-foreground">
                Retake the same quiz with the same questions in a new attempt.
              </p>
            </div>
            <Button
              onClick={() => {
                const questions = extendedAttempts.map(a => a.question);
                navigate(`/quiz/${subject}/${unitId}/${quizType}?t=${Date.now()}`, {
                  state: { presetQuestions: questions, startNewAttempt: true },
                  replace: true,
                });
              }}
              variant="outline"
              className="shrink-0"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </Card>

        {/* Targeted Practice */}
        {practiceAttempts.length > 0 && (
          <Card className="p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.04s' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Targeted Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Redo the quiz with the {practiceAttempts.length} question{practiceAttempts.length !== 1 ? 's' : ''} you got wrong or skipped.
                </p>
              </div>
              <Button
                onClick={() => {
                  const practiceQuestions = practiceAttempts.map(a => a.question);
                  navigate(`/quiz/${subject}/${unitId}/cram?t=${Date.now()}`, {
                    state: { presetQuestions: practiceQuestions, startNewAttempt: true },
                    replace: true,
                  });
                }}
                variant="outline"
                className="shrink-0 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Target className="mr-2 h-4 w-4" />
                Targeted Practice
              </Button>
            </div>
          </Card>
        )}

        {/* Marked Questions Warning */}
        {markedAttempts.length > 0 && (
          <Card className="p-6 mb-8 border-warning/50 bg-warning/5 animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-start gap-3">
              <Flag className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Flagged Questions</h3>
                <p className="text-sm text-muted-foreground">
                  You marked {markedAttempts.length} question{markedAttempts.length !== 1 ? 's' : ''} as incorrect/buggy. 
                  These are shown first below for easy reference.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {markedAttempts.map((a) => (
                    <span key={a.questionId} className="text-xs px-2 py-1 bg-warning/20 text-warning rounded-md font-mono">
                      {a.questionId}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Download Wrong Answers Section */}
        {practiceAttempts.length > 0 && (
          <Card className="p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Download Targeted Practice as Preset</h3>
                <p className="text-sm text-muted-foreground">
                  {practiceAttempts.length} question{practiceAttempts.length !== 1 ? 's' : ''} (wrong{skippedAttempts.length > 0 ? ' + skipped' : ''}). 
                  Download as a preset for <span className="font-medium">{getSubjectDisplayName(subject)}</span>'s 
                  {unitId === 'course-challenge' ? ' Course Challenge' : ` Unit ${unitId?.toUpperCase()}`} Preset Builder.
                </p>
              </div>
              <Button onClick={handleOpenDownloadDialog} className="shrink-0">
                <Download className="mr-2 h-4 w-4" />
                Download Preset
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-display font-bold mb-6">Review Your Answers</h2>
          <p className="text-muted-foreground mb-6">
            Review each question to understand what to study next
          </p>

          <div className="space-y-6">
            {sortedAttempts.map((attempt, index) => {
              const question = attempt.question;
              const isCorrect = attempt.isCorrect;
              const isMarked = attempt.markedIncorrect;
              const isSkippedQ = attempt.skipped || attempt.userAnswer === 'SKIPPED' || attempt.userAnswer === 'SKIPPED_FINAL';
              
              return (
                <div key={attempt.questionId}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex-shrink-0 mt-1 ${isMarked ? 'text-warning' : isSkippedQ ? 'text-muted-foreground' : isCorrect ? 'text-success' : 'text-destructive'}`}>
                      {isMarked ? (
                        <Flag className="h-6 w-6" />
                      ) : isSkippedQ ? (
                        <SkipForward className="h-6 w-6" />
                      ) : isCorrect ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <XCircle className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">
                          Question {index + 1}
                        </h3>
                        {isSkippedQ && !isMarked && (
                          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full font-medium">
                            Skipped
                          </span>
                        )}
                        {isMarked && (
                          <span className="text-xs px-2 py-0.5 bg-warning/20 text-warning rounded-full font-medium">
                            Marked as incorrect ({attempt.questionId})
                          </span>
                        )}
                      </div>
                      
                       {question.table && (
                        <div className="mb-3">
                          <QuestionTable data={question.table} enableChemistry={subject === 'chemistry'} />
                        </div>
                      )}
                      
                      {question.image && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={resolveImagePath(question.image)} 
                            alt="Question diagram" 
                            className="max-w-2xl max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-border"
                          />
                        </div>
                      )}
                      
                      <MathText tag="p" className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>

                      {question.type === 'multiple-choice' ? (
                        <div className="space-y-2 mb-3">
                          {question.options.map((option) => {
                            const isUserAnswer = attempt.userAnswer === option.value;
                            const isCorrectAnswer = option.value === question.correctAnswer;
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 rounded-lg border-2 text-sm ${
                                  isCorrectAnswer
                                    ? 'border-success bg-success/10'
                                    : isUserAnswer && !isCorrect
                                    ? 'border-destructive bg-destructive/10'
                                    : 'border-border'
                                }`}
                              >
                                <span className="font-semibold mr-2">{option.label})</span>
                                {option.image ? (
                                  <img 
                                    src={resolveImagePath(option.image)} 
                                    alt={`Option ${option.label}`}
                                    className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2"
                                  />
                                ) : (
                                  <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                                )}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-success font-semibold">✓ Correct</span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="ml-2 text-destructive font-semibold">Your answer</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : question.type === 'select-all' ? (
                        <div className="space-y-2 mb-3">
                          {question.options.map((option) => {
                            const userSelections = (attempt.userAnswer || '').split(',');
                            const isUserSelected = userSelections.includes(option.value);
                            const isCorrectOption = question.correctAnswers.includes(option.value);
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 rounded-lg border-2 text-sm ${
                                  isCorrectOption
                                    ? 'border-success bg-success/10'
                                    : isUserSelected && !isCorrectOption
                                    ? 'border-destructive bg-destructive/10'
                                    : 'border-border'
                                }`}
                              >
                                <span className="font-semibold mr-2">{option.label})</span>
                                {option.image ? (
                                  <img src={resolveImagePath(option.image)} alt={`Option ${option.label}`} className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2" />
                                ) : (
                                  <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                                )}
                                {isCorrectOption && (
                                  <span className="ml-2 text-success font-semibold">✓ Correct</span>
                                )}
                                {isUserSelected && !isCorrectOption && (
                                  <span className="ml-2 text-destructive font-semibold">Wrong selection</span>
                                )}
                                {!isUserSelected && isCorrectOption && (
                                  <span className="ml-2 text-warning font-semibold">Missed</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : question.type === 'parts' ? (
                        <div className="space-y-4 mb-3">
                          {question.parts.map((part) => {
                            const partState = attempt.partsState?.[part.label];
                            return (
                              <div key={part.label} className={`p-3 rounded-lg border-2 text-sm ${partState?.isCorrect ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}>
                                <p className="font-semibold mb-1">Part {part.label.toUpperCase()}: </p>
                                <MathText tag="p" className="mb-2" enableChemistry={subject === 'chemistry'}>{part.question}</MathText>
                                {part.type === 'multiple-choice' && part.options && (
                                  <div className="space-y-1 mb-2">
                                    {part.options.map(opt => (
                                      <div key={opt.value} className={`p-2 rounded border ${opt.value === part.correctAnswer ? 'border-success bg-success/10' : partState?.userAnswer === opt.value && !partState?.isCorrect ? 'border-destructive bg-destructive/10' : 'border-border'}`}>
                                        <span className="font-semibold mr-2">{opt.label})</span>
                                        {opt.image ? <img src={resolveImagePath(opt.image)} alt={`Option`} className="max-w-sm max-h-32 object-contain rounded" /> : <MathText enableChemistry={subject === 'chemistry'}>{opt.text}</MathText>}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {part.type === 'free-response' && (
                                  <div className="space-y-1 mb-2">
                                    <div className="p-2 bg-muted rounded"><span className="font-semibold">Your Answer: </span><MathText enableChemistry={subject === 'chemistry'}>{partState?.userAnswer || '(skipped)'}</MathText></div>
                                    <div className="p-2 border border-success bg-success/10 rounded"><span className="font-semibold">Correct: </span><MathText enableChemistry={subject === 'chemistry'}>{part.correctAnswer}</MathText></div>
                                  </div>
                                )}
                                {part.explanation && (
                                  <div className="p-2 bg-primary/5 rounded text-xs"><span className="font-semibold">Explanation: </span><MathText enableChemistry={subject === 'chemistry'}>{part.explanation}</MathText></div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : question.type === 'free-response' ? (
                        <div className="space-y-2 mb-3">
                          {question.listAnswers && question.listAnswers.length > 0 ? (
                            <ListFrqResultsTable 
                              listAnswers={question.listAnswers} 
                              userAnswer={attempt.userAnswer} 
                              subject={subject} 
                            />
                          ) : (
                            <>
                              <div className="p-3 bg-muted rounded-lg text-sm">
                                <p className="font-semibold mb-1">Your Answer:</p>
                                {question.displayAs === 'paragraph' ? (
                                  <MathText tag="div" className="whitespace-pre-wrap" enableChemistry={subject === 'chemistry'}>{attempt.userAnswer || '(No answer)'}</MathText>
                                ) : (
                                  <MathText tag="p" enableChemistry={subject === 'chemistry'}>{attempt.userAnswer || '(No answer)'}</MathText>
                                )}
                              </div>
                              <div className="p-3 rounded-lg border-2 border-success bg-success/10 text-sm">
                                <p className="font-semibold mb-1">Correct Answer:</p>
                                {question.displayAs === 'paragraph' ? (
                                  <MathText tag="div" className="whitespace-pre-wrap" enableChemistry={subject === 'chemistry'}>{question.correctAnswer}</MathText>
                                ) : (
                                  <MathText tag="p" enableChemistry={subject === 'chemistry'}>{question.correctAnswer}</MathText>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ) : null}

                      {'explanation' in question && question.explanation && (
                        <div className="p-3 bg-primary/5 rounded-lg text-sm">
                          <p className="font-semibold mb-1">Explanation:</p>
                          <MathText tag="p" className="whitespace-pre-line" enableChemistry={subject === 'chemistry'}>{question.explanation}</MathText>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index < extendedAttempts.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/">
            <Button
              size="lg"
              className="min-w-[200px]"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Download Preset Name Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Preset</DialogTitle>
            <DialogDescription>
              Enter a name for your preset file containing {wrongAttempts.length} wrong question{wrongAttempts.length !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="preset-name">Preset Name</Label>
            <Input
              id="preset-name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name..."
              className="mt-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDownloadWrongAnswers();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownloadWrongAnswers}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="h-48" aria-hidden="true" />
      <Footer />
    </div>
  );
};

export default Results;
