import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import MathText from '@/components/MathText';
import QuestionTable from '@/components/QuestionTable';
import useCustomUnits from '@/hooks/useCustomUnits';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Question } from '@/types/quiz';

// Use centralized question loader
import { getQuestionMap } from '@/utils/questionLoader';
// Tests question loader for /tests routes
import { testsQuestionMap } from '@/data/real-tests/testsQuestionLoader';

const ViewAllQuestions = () => {
  const { subject, unitId } = useParams();
  const [searchParams] = useSearchParams();
  const isTestsMode = searchParams.get('source') === 'tests';
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const { data: customUnitsData, isLoaded: customUnitsLoaded } = useCustomUnits();

  // Check if this is a custom topic
  const isCustomTopic = subject?.startsWith('custom-');
  const customUnitId = isCustomTopic ? subject.replace('custom-', '') : null;

  // Load custom questions
  useEffect(() => {
    if (isCustomTopic && customUnitsLoaded && customUnitId && unitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      const topic = unit?.topics.find(t => t.id === unitId);
      setCustomQuestions(topic?.questions || []);
    }
  }, [isCustomTopic, customUnitsLoaded, customUnitId, unitId, customUnitsData]);

  // Get questions using the centralized loader (applies date-based switching)
  // In tests mode, use the separate tests question map
  const questionMap = useMemo(() => isTestsMode ? testsQuestionMap : getQuestionMap(), [isTestsMode]);
  
  const questionKey = `${subject}-${unitId}`;

  const questions = isCustomTopic ? customQuestions : (questionMap[questionKey] || []);

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success('Question ID copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get topic name for custom topics
  const getTopicName = () => {
    if (isCustomTopic && customUnitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      const topic = unit?.topics.find(t => t.id === unitId);
      return topic?.name || unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isCustomTopic && !customUnitsLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Link to={`/unit/${subject}/${unitId}`} className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit
          </Button>
        </Link>
        
        <h1 className="text-3xl font-display font-bold mb-2">All Questions - {getTopicName()}</h1>
        
        
        <p className="text-muted-foreground mb-8">
          {questions.length} questions total
        </p>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">#{index + 1}</span>
                  <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{question.id}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyId(question.id)} className="h-8 w-8 p-0">
                    {copiedId === question.id ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  question.type === 'multiple-choice' ? 'bg-primary/10 text-primary' : 
                  question.type === 'select-all' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' :
                  question.type === 'parts' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 
                  'bg-accent/10 text-accent'
                }`}>
                  {question.type === 'multiple-choice' ? 'MC' : question.type === 'select-all' ? 'SATA' : question.type === 'parts' ? 'PARTS' : 'FRQ'}
                </span>
              </div>
              {question.table && <QuestionTable data={question.table} enableChemistry={subject === 'chemistry'} />}
              {question.image && <div className="mb-4 flex justify-center"><img src={question.image} alt="Question" className="max-w-xl max-h-64 object-contain rounded-lg border-2 border-border" /></div>}
              <MathText tag="p" className="text-base mb-4" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>
              {question.type === 'multiple-choice' && (
                <div className="space-y-2 mb-4">
                  {question.options.map((option) => (
                    <div key={option.value} className={`p-3 rounded-lg border ${option.value === question.correctAnswer ? 'border-success bg-success/10' : 'border-border'}`}>
                      {option.image ? <img src={option.image} alt={`Option`} className="max-w-md max-h-48 object-contain rounded" /> : <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>}
                      {option.value === question.correctAnswer && <span className="ml-2 text-success font-semibold text-sm">✓</span>}
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'select-all' && (
                <div className="space-y-2 mb-4">
                  {question.options.map((option) => (
                    <div key={option.value} className={`p-3 rounded-lg border ${question.correctAnswers.includes(option.value) ? 'border-success bg-success/10' : 'border-border'}`}>
                      {option.image ? <img src={option.image} alt={`Option`} className="max-w-md max-h-48 object-contain rounded" /> : <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>}
                      {question.correctAnswers.includes(option.value) && <span className="ml-2 text-success font-semibold text-sm">✓</span>}
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'free-response' && (
                <div className="p-3 rounded-lg border border-success bg-success/10">
                  <p className="text-sm font-semibold mb-1">Answer:</p>
                  {question.listAnswers && question.listAnswers.length > 0 ? (
                    <div className="space-y-1">
                      {question.listAnswers.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-5 text-center text-xs font-medium text-muted-foreground">{idx + 1}.</span>
                          <MathText className="text-sm" enableChemistry={subject === 'chemistry'}>{item}</MathText>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <MathText enableChemistry={subject === 'chemistry'}>{question.correctAnswer}</MathText>
                  )}
                </div>
              )}
              {question.type === 'parts' && (
                <div className="space-y-4 mb-4">
                  {question.parts.map((part, partIdx) => (
                    <div key={part.label} className="p-4 rounded-lg border border-border bg-muted/20">
                      <p className="text-sm font-bold text-primary mb-2">Part {part.label})</p>
                      {part.image && <div className="mb-2 flex justify-center"><img src={part.image} alt={`Part ${part.label}`} className="max-w-md max-h-48 object-contain rounded-lg border border-border" /></div>}
                      <MathText className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{part.question}</MathText>
                      {part.type === 'multiple-choice' && part.options && (
                        <div className="space-y-1 mt-2">
                          {part.options.map((opt) => (
                            <div key={opt.value} className={`p-2 rounded border text-sm ${opt.value === part.correctAnswer ? 'border-success bg-success/10' : 'border-border'}`}>
                              {opt.image ? <img src={opt.image} alt="Option" className="max-w-xs max-h-32 object-contain rounded" /> : <MathText enableChemistry={subject === 'chemistry'}>{opt.text}</MathText>}
                              {opt.value === part.correctAnswer && <span className="ml-2 text-success font-semibold text-xs">✓</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      {part.type === 'free-response' && (
                        <div className="p-2 rounded border border-success bg-success/10 mt-2">
                          <p className="text-xs font-semibold mb-1">Answer:</p>
                          {part.listAnswers && part.listAnswers.length > 0 ? (
                            <div className="space-y-1">
                              {part.listAnswers.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="w-4 text-center text-xs font-medium text-muted-foreground">{idx + 1}.</span>
                                  <MathText className="text-xs" enableChemistry={subject === 'chemistry'}>{item}</MathText>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <MathText className="text-sm" enableChemistry={subject === 'chemistry'}>{part.correctAnswer}</MathText>
                          )}
                        </div>
                      )}
                      {part.explanation && (
                        <div className="mt-2 p-2 rounded border border-muted bg-muted/30">
                          <p className="text-xs font-semibold mb-1 text-muted-foreground">Explanation:</p>
                          <MathText className="text-xs" enableChemistry={subject === 'chemistry'}>{part.explanation}</MathText>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {'explanation' in question && question.explanation && (
                <div className="mt-4 p-3 rounded-lg border border-muted bg-muted/30">
                  <p className="text-sm font-semibold mb-1 text-muted-foreground">Explanation:</p>
                  <MathText className="text-sm" enableChemistry={subject === 'chemistry'}>
                    {question.explanation}
                  </MathText>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAllQuestions;
