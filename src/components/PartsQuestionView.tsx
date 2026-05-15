import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, SkipForward } from 'lucide-react';
import { PartsQuestion, PartAttemptState } from '@/types/quiz';
import MathText from '@/components/MathText';
import MathQuickInput from '@/components/MathQuickInput';

import QuestionTable from '@/components/QuestionTable';
import { useRef } from 'react';

interface PartsQuestionViewProps {
  question: PartsQuestion;
  partsState: { [label: string]: PartAttemptState };
  onPartsStateChange: (newState: { [label: string]: PartAttemptState }) => void;
  onAllComplete: () => void;
  subject?: string;
}

const PartsQuestionView = ({
  question,
  partsState,
  onPartsStateChange,
  onAllComplete,
  subject,
}: PartsQuestionViewProps) => {
  const [partAnswers, setPartAnswers] = useState<{ [label: string]: string }>({});
  const [partCheckboxes, setPartCheckboxes] = useState<{ [label: string]: string[] }>({});
  const [partSubmitted, setPartSubmitted] = useState<{ [label: string]: boolean }>({});
  const [partShowGrading, setPartShowGrading] = useState<{ [label: string]: boolean }>({});
  const frqRefs = useRef<{ [label: string]: HTMLTextAreaElement | null }>({});
  const [partListInputs, setPartListInputs] = useState<{ [label: string]: string[] }>({});

  // Shuffle MCQ options per part (stable per render cycle)
  const shuffledPartOptions = useMemo(() => {
    const result: { [label: string]: { label: string; value: string; text: string; image?: string }[] } = {};
    question.parts.forEach(part => {
      if ((part.type === 'multiple-choice' || part.type === 'select-all') && part.options) {
        result[part.label] = [...part.options].sort(() => Math.random() - 0.5);
      }
    });
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  // Initialize from existing partsState (for resume)
  useEffect(() => {
    const answers: { [l: string]: string } = {};
    const submitted: { [l: string]: boolean } = {};
    question.parts.forEach(p => {
      const s = partsState[p.label];
      if (s && s.userAnswer !== null) {
        answers[p.label] = s.userAnswer;
        submitted[p.label] = true;
      }
    });
    setPartAnswers(answers);
    setPartSubmitted(submitted);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const allPartsComplete = question.parts.every(p => {
    const s = partsState[p.label];
    return s && (s.isCorrect !== null);
  });

  const handlePartSubmit = (partLabel: string) => {
    const part = question.parts.find(p => p.label === partLabel);
    if (!part) return;
    
    const isListFrq = part.type === 'free-response' && part.listAnswers && part.listAnswers.length > 0;
    const isSelectAll = part.type === 'select-all';
    const answer = isListFrq ? 'LIST_REVIEW' : isSelectAll ? (partCheckboxes[partLabel] || []).sort().join(',') : (partAnswers[partLabel] || '');
    if (!isListFrq && !isSelectAll && !answer.trim()) return;
    if (isSelectAll && (!partCheckboxes[partLabel] || partCheckboxes[partLabel].length === 0)) return;

    const newPartsState = { ...partsState };

    if (part.type === 'multiple-choice') {
      const isCorrect = answer === part.correctAnswer;
      newPartsState[partLabel] = { userAnswer: answer, isCorrect };
      setPartSubmitted({ ...partSubmitted, [partLabel]: true });
    } else if (part.type === 'select-all') {
      const correctSorted = [...(part.correctAnswers || [])].sort().join(',');
      const isCorrect = answer === correctSorted;
      newPartsState[partLabel] = { userAnswer: answer, isCorrect };
      setPartSubmitted({ ...partSubmitted, [partLabel]: true });
    } else {
      newPartsState[partLabel] = { userAnswer: answer, isCorrect: null, selfGraded: true };
      setPartSubmitted({ ...partSubmitted, [partLabel]: true });
      setPartShowGrading({ ...partShowGrading, [partLabel]: true });
    }

    onPartsStateChange(newPartsState);
  };

  const handlePartSelfGrade = (partLabel: string, isCorrect: boolean) => {
    const newPartsState = { ...partsState };
    newPartsState[partLabel] = {
      ...newPartsState[partLabel],
      isCorrect,
    };
    setPartShowGrading({ ...partShowGrading, [partLabel]: false });
    onPartsStateChange(newPartsState);
  };

  const handlePartSkip = (partLabel: string) => {
    const newPartsState = { ...partsState };
    newPartsState[partLabel] = {
      userAnswer: 'SKIPPED',
      isCorrect: false,
      skipped: true,
    };
    setPartSubmitted({ ...partSubmitted, [partLabel]: true });
    onPartsStateChange(newPartsState);
  };

  return (
    <div className="space-y-4">
      {/* Main question stem */}
      {question.table && (
        <QuestionTable data={question.table} enableChemistry={subject === 'chemistry'} />
      )}
      
      {question.image && (
        <div className="mb-4 flex justify-center">
          <img 
            src={question.image} 
            alt="Question diagram" 
            className="max-w-2xl max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-border"
          />
        </div>
      )}
      
      <MathText tag="h3" className="text-xl font-semibold mb-4 leading-relaxed" enableChemistry={subject === 'chemistry'}>
        {question.question}
      </MathText>

      {/* Parts */}
      {question.parts.map((part, partIdx) => {
        const state = partsState[part.label];
        const isPartSubmitted = partSubmitted[part.label] || false;
        const isPartComplete = state && state.isCorrect !== null;
        const showGrading = partShowGrading[part.label] || false;
        const options = shuffledPartOptions[part.label] || [];

        return (
          <Card key={part.label} className={`p-4 border-2 ${isPartComplete ? (state.isCorrect ? 'border-success/50' : 'border-destructive/50') : 'border-border'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-primary text-sm">Part {part.label.toUpperCase()}</span>
              {isPartComplete && (
                state.isCorrect 
                  ? <CheckCircle2 className="h-4 w-4 text-success" />
                  : <XCircle className="h-4 w-4 text-destructive" />
              )}
              {isPartComplete && (
                <span className={`text-xs font-medium ${state.isCorrect ? 'text-success' : 'text-destructive'}`}>
                  {state.skipped ? 'Skipped' : state.isCorrect ? 'Correct' : 'Wrong'}
                </span>
              )}
            </div>

            {part.image && (
              <div className="mb-3 flex justify-start">
                <img 
                  src={part.image} 
                  alt={`Part ${part.label} diagram`} 
                  className="max-w-md max-h-48 w-auto h-auto object-contain rounded border border-border"
                />
              </div>
            )}

            <MathText tag="p" className="text-sm mb-3 leading-relaxed" enableChemistry={subject === 'chemistry'}>
              {part.question}
            </MathText>

            {/* MCQ options */}
            {part.type === 'multiple-choice' && options.length > 0 && (
              <RadioGroup
                value={partAnswers[part.label] || ''}
                onValueChange={(val) => setPartAnswers({ ...partAnswers, [part.label]: val })}
                disabled={isPartSubmitted}
                className="space-y-2"
              >
                {options.map((option, idx) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all text-sm ${
                      isPartSubmitted && option.value === part.correctAnswer
                        ? 'border-success bg-success/10'
                        : isPartSubmitted && option.value === partAnswers[part.label] && partAnswers[part.label] !== part.correctAnswer
                        ? 'border-destructive bg-destructive/10'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={`${part.label}-${option.value}`} />
                    <Label htmlFor={`${part.label}-${option.value}`} className="flex-1 cursor-pointer text-sm">
                      <span className="font-semibold mr-1 text-muted-foreground">{idx + 1}.</span>
                      {option.image ? (
                        <img src={option.image} alt={`Option ${idx + 1}`} className="max-w-xs max-h-32 object-contain rounded border border-border mt-1" />
                      ) : (
                        <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                      )}
                    </Label>
                    {isPartSubmitted && option.value === part.correctAnswer && (
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    )}
                    {isPartSubmitted && option.value === partAnswers[part.label] && partAnswers[part.label] !== part.correctAnswer && (
                      <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Select-All options */}
            {part.type === 'select-all' && options.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium mb-1">Select all that apply:</p>
                {options.map((option, idx) => {
                  const selected = (partCheckboxes[part.label] || []).includes(option.value);
                  const isCorrectOption = (part.correctAnswers || []).includes(option.value);
                  const wasSelectedWrong = isPartSubmitted && selected && !isCorrectOption;
                  return (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-all text-sm cursor-pointer ${
                        isPartSubmitted && isCorrectOption
                          ? 'border-success bg-success/10'
                          : wasSelectedWrong
                          ? 'border-destructive bg-destructive/10'
                          : 'border-border hover:border-primary'
                      }`}
                      onClick={() => {
                        if (isPartSubmitted) return;
                        const cur = partCheckboxes[part.label] || [];
                        setPartCheckboxes({
                          ...partCheckboxes,
                          [part.label]: cur.includes(option.value) ? cur.filter(v => v !== option.value) : [...cur, option.value],
                        });
                      }}
                    >
                      <Checkbox checked={selected} disabled={isPartSubmitted} />
                      <span className="flex-1 text-sm">
                        <span className="font-semibold mr-1 text-muted-foreground">{idx + 1}.</span>
                        {option.image ? (
                          <img src={option.image} alt={`Option ${idx + 1}`} className="max-w-xs max-h-32 object-contain rounded border border-border mt-1" />
                        ) : (
                          <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                        )}
                      </span>
                      {isPartSubmitted && isCorrectOption && <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />}
                      {wasSelectedWrong && <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                      {isPartSubmitted && !selected && isCorrectOption && <span className="text-xs text-warning font-medium flex-shrink-0">Missed</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* FRQ text input or List display */}
            {part.type === 'free-response' && part.listAnswers && part.listAnswers.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">List {part.listAnswers.length} item(s):</p>
                {isPartSubmitted ? (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr_1fr] bg-muted/50 border-b border-border">
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground w-7">#</div>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-l border-border">Your Answer</div>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-l border-border">Correct Answer</div>
                    </div>
                    {part.listAnswers.map((item, idx) => (
                      <div key={idx} className={`grid grid-cols-[auto_1fr_1fr] ${idx < part.listAnswers!.length - 1 ? 'border-b border-border' : ''}`}>
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground w-7">{idx + 1}.</div>
                        <div className="px-2 py-1.5 text-xs border-l border-border break-words">{(partListInputs[part.label] || [])[idx] || <span className="text-muted-foreground italic">—</span>}</div>
                        <div className="px-2 py-1.5 text-xs border-l border-border break-words"><MathText enableChemistry={subject === 'chemistry'}>{item}</MathText></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {part.listAnswers.map((_, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-5 text-center text-xs font-medium text-muted-foreground">{idx + 1}.</span>
                        <input
                          type="text"
                          value={(partListInputs[part.label] || [])[idx] || ''}
                          onChange={(e) => {
                            const current = partListInputs[part.label] || [];
                            const newInputs = [...current];
                            newInputs[idx] = e.target.value;
                            setPartListInputs({ ...partListInputs, [part.label]: newInputs });
                          }}
                          className="flex-1 h-8 rounded-md border border-border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={`Item ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : part.type === 'free-response' ? (
              <div className="space-y-2">
                <Textarea
                  ref={(el) => { frqRefs.current[part.label] = el; }}
                  value={partAnswers[part.label] || ''}
                  onChange={(e) => setPartAnswers({ ...partAnswers, [part.label]: e.target.value })}
                  disabled={isPartSubmitted}
                  placeholder="Enter your answer..."
                  className="text-sm min-h-[50px] resize-y"
                />
                {!isPartSubmitted && frqRefs.current[part.label] && (
                  <MathQuickInput
                    textareaRef={{ current: frqRefs.current[part.label] } as React.RefObject<HTMLTextAreaElement>}
                    value={partAnswers[part.label] || ''}
                    onChange={(val) => setPartAnswers({ ...partAnswers, [part.label]: val })}
                    useUnicode={true}
                  />
                )}
              </div>
            ) : null}

            {/* Submit/Skip buttons underneath */}
            {!isPartSubmitted && (
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => handlePartSubmit(part.label)}
                  disabled={
                    part.type === 'multiple-choice' ? !(partAnswers[part.label] || '').trim() :
                    part.type === 'select-all' ? !(partCheckboxes[part.label] && partCheckboxes[part.label].length > 0) :
                    (part.type === 'free-response' && part.listAnswers && part.listAnswers.length > 0) ? false :
                    !(partAnswers[part.label] || '').trim()
                  }
                  className="text-xs h-8"
                >
                  Submit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handlePartSkip(part.label)}
                  className="text-xs h-8 text-muted-foreground hover:text-destructive"
                >
                  <SkipForward className="h-3 w-3 mr-1" />
                  Skip
                </Button>
              </div>
            )}

            {/* FRQ correct answer & self-grading (skip for list FRQs since table already shows answers) */}
            {isPartSubmitted && part.type === 'free-response' && !(part.listAnswers && part.listAnswers.length > 0) && (
              <div className="mt-3 p-3 bg-primary/5 border border-primary rounded-lg">
                <p className="font-semibold text-sm mb-1">Correct Answer:</p>
                <MathText tag="p" className="text-sm mb-2" enableChemistry={subject === 'chemistry'}>{part.correctAnswer}</MathText>
              </div>
            )}

            {/* Self-grading buttons for all FRQs (including list) */}
            {isPartSubmitted && part.type === 'free-response' && showGrading && (
              <div className="mt-3 p-3 bg-primary/5 border border-primary rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Did you get this correct?</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handlePartSelfGrade(part.label, true)} className="border-success text-success hover:bg-success hover:text-success-foreground text-xs">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Right
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handlePartSelfGrade(part.label, false)} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground text-xs">
                    <XCircle className="mr-1 h-3 w-3" /> Wrong
                  </Button>
                </div>
              </div>
            )}

            {/* Explanation after grading */}
            {isPartComplete && part.explanation && (
              <div className="mt-2 p-2 bg-muted rounded text-xs">
                <span className="font-semibold">Explanation: </span>
                <MathText enableChemistry={subject === 'chemistry'}>{part.explanation}</MathText>
              </div>
            )}
          </Card>
        );
      })}

      {/* Move on button */}
      {allPartsComplete && (
        <div className="flex justify-center pt-2">
          <Button onClick={onAllComplete} size="lg" className="w-full max-w-md">
            Move On →
          </Button>
        </div>
      )}
    </div>
  );
};

export default PartsQuestionView;
