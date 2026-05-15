import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, ExternalLink, Wrench, Target, Upload, X, FileText, Download } from 'lucide-react';
import { courseChallengeResources } from '@/data/study-resources';
import { useWrongAnswers } from '@/hooks/useWrongAnswers';
import { parseTopicFile, getImportedQuestions, saveImportedQuestions, removeImportedQuestions, ImportedQuestionSet, generateBuiltInTopicFile } from '@/utils/customUnitsExport';
import { getSubjectUnits, getSubjectTitle } from '@/utils/questionLoader';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import RemoveConfirmDialog from '@/components/RemoveConfirmDialog';

import { buildRouteKey, hasInProgressQuiz } from '@/utils/inProgressQuizStorage';

const CourseChallenge = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { getAllWrongQuestionsForSubject, getWrongAnswerCount } = useWrongAnswers();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importedSets, setImportedSets] = useState<ImportedQuestionSet[]>([]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [setToRemove, setSetToRemove] = useState<{ id: string; name: string } | null>(null);
  
  // Load imported question sets
  useEffect(() => {
    setImportedSets(getImportedQuestions(subject || ''));
  }, [subject]);
  
  const wrongAnswers = getAllWrongQuestionsForSubject(subject || '');
  const wrongCount = getWrongAnswerCount(subject || '');

  const getUnits = () => getSubjectUnits(subject || '');

  const units = getUnits();

  const canResumeCram = hasInProgressQuiz(buildRouteKey(subject || '', 'challenge', 'cram'));
  
  // Get study resources for this course challenge
  const studyResources = courseChallengeResources[subject || ''] || [];

  const handleStartCramMode = () => {
    const allUnitIds = units.map(u => u.id);
    // Include imported questions in cram mode
    const allImportedQuestions = importedSets.flatMap(s => s.questions);
    navigate(`/quiz/${subject}/challenge/cram`, { 
      state: { 
        selectedUnits: allUnitIds,
        importedQuestions: allImportedQuestions,
        startNewAttempt: true,
      } 
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      try {
        const content = await file.text();
        const parsed = parseTopicFile(content);
        
        if (parsed && parsed.questions.length > 0) {
          const newSet: ImportedQuestionSet = {
            id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name.replace('-questions.ts', '').replace(/-/g, ' '),
            questions: parsed.questions,
            importedAt: Date.now(),
          };
          
          saveImportedQuestions(subject || '', newSet);
          setImportedSets(prev => [...prev, newSet]);
          toast.success(`Imported ${parsed.questions.length} questions from ${file.name}`);
        } else {
          toast.error(`Could not parse questions from ${file.name}`);
        }
      } catch (error) {
        toast.error(`Failed to read ${file.name}`);
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImported = (setId: string) => {
    removeImportedQuestions(subject || '', setId);
    setImportedSets(prev => prev.filter(s => s.id !== setId));
    setRemoveDialogOpen(false);
    setSetToRemove(null);
    toast.success('Removed imported questions');
  };

  const handleDownloadImported = (set: ImportedQuestionSet) => {
    const content = generateBuiltInTopicFile(set.questions, set.name, false);
    const filename = `${set.name.replace(/\s+/g, '-').toLowerCase()}-questions.ts`;
    
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  const openRemoveDialog = (setId: string, setName: string) => {
    setSetToRemove({ id: setId, name: setName });
    setRemoveDialogOpen(true);
  };

  const totalImportedQuestions = importedSets.reduce((sum, s) => sum + s.questions.length, 0);

  // Determine which category to go back to
  const getCategoryPath = () => {
    if (['precalc'].includes(subject || '')) return '/category/math';
    if (['biology', 'chemistry'].includes(subject || '')) return '/category/science';
    if (['world-history'].includes(subject || '')) return '/category/social';
    if (['memory', 'practice'].includes(subject || '')) return '/category/other';
    return '/';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Link to={getCategoryPath()} className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Category
          </Button>
        </Link>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            {getSubjectTitle(subject || '')} Course Challenge
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge with all questions from every unit
          </p>
        </div>

        {/* Study Resources Section */}
        {studyResources.length > 0 && (
          <Card className="mb-6 p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Helpful Study Resources
            </h3>
            <div className="space-y-2">
              {studyResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  {resource.title}
                </a>
              ))}
            </div>
          </Card>
        )}

        {/* Import Custom Questions Box */}
        <Card className="mb-6 p-6 border-2 border-dashed border-primary/50 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Import Custom Questions</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Upload .ts question files to add custom practice to this course challenge
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".ts"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Question Files
              </Button>

              {/* Show imported sets */}
              {importedSets.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Imported ({totalImportedQuestions} questions total):</p>
                  {importedSets.map(set => (
                    <div key={set.id} className="flex items-center justify-between bg-background rounded-lg p-2 border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium capitalize">{set.name}</span>
                        <span className="text-xs text-muted-foreground">({set.questions.length} questions)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadImported(set)}
                          className="h-8 w-8 p-0 text-primary hover:text-primary"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openRemoveDialog(set.id, set.name)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          title="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        <Button
          onClick={handleStartCramMode}
          className="w-full"
          size="lg"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Cram Mode (All Units{totalImportedQuestions > 0 ? ` + ${totalImportedQuestions} imported` : ''})
        </Button>

        {canResumeCram && (
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => navigate(`/quiz/${subject}/challenge/cram`)}
          >
            Resume last Cram Mode
          </Button>
        )}

        {/* Custom Practice & Targeted Practice */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Link to={`/course-challenge/${subject}/preset-builder`} className="block">
            <Card className="p-6 cursor-pointer hover:border-primary transition-all h-full">
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Build Custom Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Select specific questions from any unit
                    {totalImportedQuestions > 0 && ` (includes ${totalImportedQuestions} imported)`}
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {wrongCount > 0 && (
            <Card 
              className="p-6 cursor-pointer hover:border-destructive transition-all border-destructive/50"
              onClick={() => navigate(`/quiz/${subject}/targeted/cram`, { 
                state: { wrongQuestions: wrongAnswers } 
              })}
            >
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-semibold">Targeted Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Review {wrongCount} questions you got wrong
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <Card className="mt-8 p-6 bg-muted">
          <h3 className="font-semibold mb-2">📝 Challenge Details</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Cram Mode:</strong> All questions from every unit for comprehensive review</li>
            <li>• Questions are randomized each time</li>
            <li>• Review shows wrong answers first, then correct answers</li>
            <li>• <strong>Import:</strong> Upload .ts files from downloaded topics to add custom questions</li>
          </ul>
        </Card>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
      
      {/* Remove Confirmation Dialog */}
      <RemoveConfirmDialog
        isOpen={removeDialogOpen}
        onClose={() => {
          setRemoveDialogOpen(false);
          setSetToRemove(null);
        }}
        onConfirm={() => setToRemove && handleRemoveImported(setToRemove.id)}
        fileName={setToRemove?.name || ''}
      />
    </div>
  );
};

export default CourseChallenge;
