import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Play, Pencil, Trash2, Check, Download, Upload, Globe } from 'lucide-react';
import { getPublicPresetsForCourseChallenge, PublicPreset } from '@/data/public-presets';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Question } from '@/types/quiz';
import { usePresets, Preset } from '@/hooks/usePresets';
import MathText from '@/components/MathText';
import { getImportedQuestions, ImportedQuestionSet } from '@/utils/customUnitsExport';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';

// Use centralized question loader
import { getQuestionMap, getSubjectUnits, getSubjectTitle } from '@/utils/questionLoader';

// Truncate question text for display - LaTeX aware
const truncateQuestion = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  
  // Find a safe truncation point that doesn't break LaTeX
  let truncateAt = maxLength;
  const textToCheck = text.substring(0, maxLength + 50);
  
  // Count $ signs to ensure we don't cut in the middle of LaTeX
  let dollarCount = 0;
  for (let i = 0; i < Math.min(maxLength, text.length); i++) {
    if (text[i] === '$') dollarCount++;
  }
  
  // If odd number of $, we're inside LaTeX - find the closing $
  if (dollarCount % 2 === 1) {
    const nextDollar = text.indexOf('$', maxLength);
    if (nextDollar !== -1 && nextDollar < maxLength + 80) {
      truncateAt = nextDollar + 1;
    } else {
      // Find the last $ before maxLength and truncate before it
      const lastDollar = text.lastIndexOf('$', maxLength);
      if (lastDollar > 20) {
        truncateAt = lastDollar;
      }
    }
  }
  
  return text.substring(0, truncateAt) + '...';
};

const CourseChallengePresetBuilder = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { createPreset, updatePreset, deletePreset, getPresetsForSubject, getPreset } = usePresets();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [presetName, setPresetName] = useState('');
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [importedSets, setImportedSets] = useState<ImportedQuestionSet[]>([]);
  const [importError, setImportError] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Load imported question sets
  useEffect(() => {
    setImportedSets(getImportedQuestions(subject || ''));
  }, [subject]);

  // Get questions using the centralized loader (applies date-based switching)
  const questionMap = useMemo(() => getQuestionMap(), []);

  const getUnits = () => getSubjectUnits(subject || '');

  const units = getUnits();
  const subjectPresets = getPresetsForSubject(subject || '');

  // Get all questions for this subject grouped by unit
  const allQuestionsByUnit = useMemo(() => {
    const result: { unit: { id: string; name: string }; questions: Question[]; isImported?: boolean }[] = [];
    units.forEach(unit => {
      const questions = questionMap[`${subject}-${unit.id}`] || [];
      if (questions.length > 0) {
        result.push({ unit, questions });
      }
    });
    
    // Add imported question sets at the bottom
    importedSets.forEach(set => {
      result.push({
        unit: { id: set.id, name: `📥 ${set.name} (Imported)` },
        questions: set.questions,
        isImported: true,
      });
    });
    
    return result;
  }, [subject, units, questionMap, importedSets]);

  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestionIds);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestionIds(newSelected);
  };

  const selectAll = () => {
    const allIds = new Set<string>();
    allQuestionsByUnit.forEach(({ questions }) => {
      questions.forEach(q => allIds.add(q.id));
    });
    setSelectedQuestionIds(allIds);
  };

  const clearAll = () => {
    setSelectedQuestionIds(new Set());
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast.error('Please enter a preset name');
      return;
    }
    if (selectedQuestionIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }

    if (editingPresetId) {
      updatePreset(editingPresetId, Array.from(selectedQuestionIds), presetName);
      toast.success('Preset updated!');
    } else {
      createPreset(presetName, subject || '', 'course-challenge', Array.from(selectedQuestionIds));
      toast.success('Preset saved!');
    }

    setPresetName('');
    setShowSaveForm(false);
    setEditingPresetId(null);
    setSelectedQuestionIds(new Set());
  };

  const handleEditPreset = (preset: Preset) => {
    setEditingPresetId(preset.id);
    setPresetName(preset.name);
    setSelectedQuestionIds(new Set(preset.questionIds));
    setShowSaveForm(true);
  };

  const handleDeletePreset = (presetId: string) => {
    deletePreset(presetId);
    toast.success('Preset deleted');
  };

  const handleDownloadPreset = (preset: Preset) => {
    const exportData = {
      version: 1,
      preset: {
        name: preset.name,
        subject: preset.subject,
        unitId: preset.unitId,
        questionIds: preset.questionIds,
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Preset downloaded!');
  };

  const handleImportPreset = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (!data.preset || !data.preset.questionIds || !Array.isArray(data.preset.questionIds)) {
          setImportError({ show: true, message: 'Invalid preset file format.' });
          return;
        }

        const importedIds = data.preset.questionIds as string[];
        const allQuestions: Question[] = [];
        allQuestionsByUnit.forEach(({ questions }) => {
          allQuestions.push(...questions);
        });
        const availableIds = new Set(allQuestions.map(q => q.id));
        const missingIds = importedIds.filter(id => !availableIds.has(id));
        const validIds = importedIds.filter(id => availableIds.has(id));

        if (validIds.length === 0) {
          setImportError({ 
            show: true, 
            message: `Import failed: None of the ${importedIds.length} questions in this preset exist in the current dataset. This preset may be from a different subject or the questions have been updated.`
          });
          return;
        }

        if (missingIds.length > 0) {
          const newPreset = createPreset(
            data.preset.name || 'Imported Preset',
            subject || '',
            'course-challenge',
            validIds
          );
          toast.warning(
            `Imported "${newPreset.name}" with ${validIds.length} question${validIds.length === 1 ? '' : 's'}; ${missingIds.length} missing question${missingIds.length === 1 ? '' : 's'} were removed.`
          );
          return;
        }

        // All questions exist - create the preset
        const newPreset = createPreset(
          data.preset.name || 'Imported Preset',
          subject || '',
          'course-challenge',
          validIds
        );
        toast.success(`Preset "${newPreset.name}" imported successfully!`);
      } catch (err) {
        setImportError({ show: true, message: 'Failed to parse preset file. Please ensure it\'s a valid JSON file.' });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleUsePreset = (preset: Preset) => {
    // Get the actual question objects from the IDs (imported sets are already in allQuestionsByUnit)
    const allQuestions: Question[] = [];
    allQuestionsByUnit.forEach(({ questions }) => {
      allQuestions.push(...questions);
    });
    
    const presetQuestions = allQuestions.filter(q => preset.questionIds.includes(q.id));
    
    // Use replace + unique timestamp to force Quiz.tsx to re-mount and pick up new state
    navigate(`/quiz/${subject}/course-challenge/cram?t=${Date.now()}`, {
      state: { presetQuestions, startNewAttempt: true },
      replace: true,
    });
  };

  const handleStartPractice = () => {
    if (selectedQuestionIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }

    // Imported sets are already in allQuestionsByUnit
    const allQuestions: Question[] = [];
    allQuestionsByUnit.forEach(({ questions }) => {
      allQuestions.push(...questions);
    });
    
    const selectedQs = allQuestions.filter(q => selectedQuestionIds.has(q.id));
    
    // Use replace + unique timestamp to force Quiz.tsx to re-mount and pick up new state
    navigate(`/quiz/${subject}/course-challenge/cram?t=${Date.now()}`, {
      state: { presetQuestions: selectedQs, startNewAttempt: true },
      replace: true,
    });
  };

  // ---- Public Presets (bundled, read-only) ---------------------------------
  const publicCoursePresets = useMemo(
    () => getPublicPresetsForCourseChallenge(subject || ''),
    [subject]
  );
  
  const getAllSubjectQuestions = (): Question[] => {
    const all: Question[] = [];
    allQuestionsByUnit.forEach(({ questions }) => all.push(...questions));
    return all;
  };
  
  const handleUsePublicPreset = (preset: PublicPreset) => {
    const all = getAllSubjectQuestions();
    const presetQuestions = all.filter(q => preset.questionIds.includes(q.id));
    if (presetQuestions.length === 0) {
      toast.error("None of this preset's questions are available in this subject.");
      return;
    }
    navigate(`/quiz/${subject}/course-challenge/cram?t=${Date.now()}&publicPresetId=${preset.id}`, {
      state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
      replace: true,
    });
  };
  
  const handleSavePublicToMyPresets = (preset: PublicPreset) => {
    const all = getAllSubjectQuestions();
    const availableIds = new Set(all.map(q => q.id));
    const validIds = preset.questionIds.filter(id => availableIds.has(id));
    if (validIds.length === 0) {
      toast.error('No matching questions to save.');
      return;
    }
    const created = createPreset(preset.name, subject || '', 'course-challenge', validIds);
    const skipped = preset.questionIds.length - validIds.length;
    toast.success(
      skipped > 0
        ? `Saved "${created.name}" (${validIds.length} of ${preset.questionIds.length} questions)`
        : `Saved "${created.name}" to your presets`
    );
  };
  
  const handleDownloadPublicPreset = (preset: PublicPreset) => {
    const exportData = {
      version: 1,
      preset: {
        name: preset.name,
        subject: preset.subject,
        unitId: preset.unitId,
        questionIds: preset.questionIds,
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Preset downloaded!');
  };
  
  const getSubjectTitleText = () => getSubjectTitle(subject || '');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Button
          variant="ghost"
          onClick={() => navigate(`/course-challenge/${subject}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course Challenge
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{getSubjectTitleText()} - Custom Practice Builder</h1>
          <p className="text-muted-foreground">
            Select questions from any unit to create a custom practice set
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={selectAll} variant="outline" size="sm">
            Select All
          </Button>
          <Button onClick={clearAll} variant="outline" size="sm">
            Clear All
          </Button>
          <Button 
            onClick={() => setShowSaveForm(true)} 
            variant="outline" 
            size="sm"
            disabled={selectedQuestionIds.size === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Preset
          </Button>
          <Button 
            onClick={handleStartPractice} 
            size="sm"
            disabled={selectedQuestionIds.size === 0}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Practice ({selectedQuestionIds.size})
          </Button>
        </div>

        {/* Save Preset Form */}
        {showSaveForm && (
          <Card className="p-4 mb-6">
            <div className="flex gap-3 items-center">
              <Input
                placeholder="Enter preset name..."
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSavePreset}>
                <Check className="mr-2 h-4 w-4" />
                {editingPresetId ? 'Update' : 'Save'}
              </Button>
              <Button variant="ghost" onClick={() => {
                setShowSaveForm(false);
                setEditingPresetId(null);
                setPresetName('');
              }}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Import Error Dialog */}
        <AlertDialog open={importError.show} onOpenChange={(open) => setImportError({ ...importError, show: open })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Import Failed</AlertDialogTitle>
              <AlertDialogDescription>{importError.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setImportError({ show: false, message: '' })}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Public Presets (bundled, read-only) */}
        {publicCoursePresets.length > 0 && (
          <Card className="p-4 mb-6 border-primary/40">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <h2 className="text-lg font-semibold">Public Presets</h2>
              </div>
              <span className="text-xs text-muted-foreground">Curated presets for this course challenge</span>
            </div>
            <div className="space-y-2">
              {publicCoursePresets.map(preset => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors flex-wrap gap-3"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium">{preset.name}</span>
                    {preset.description && (
                      <span className="text-muted-foreground text-sm">{preset.description}</span>
                    )}
                    <span className="text-muted-foreground text-xs">
                      {preset.questionIds.length} questions{preset.author ? ` • by ${preset.author}` : ''}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <Button size="sm" onClick={() => handleUsePublicPreset(preset)}>
                      <Play className="mr-1 h-3 w-3" /> Use
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSavePublicToMyPresets(preset)}>
                      <Save className="mr-1 h-3 w-3" /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadPublicPreset(preset)}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        {/* Saved Presets */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Saved Presets</h3>
            <Button variant="outline" size="sm" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Import Preset
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportPreset}
                />
              </label>
            </Button>
          </div>
          {subjectPresets.length > 0 ? (
            <div className="grid gap-3">
              {subjectPresets.map(preset => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({preset.questionIds.length} questions)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUsePreset(preset)}>
                      <Play className="mr-1 h-3 w-3" /> Use
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditPreset(preset)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadPreset(preset)}>
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeletePreset(preset.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No saved presets yet. Select questions and save them as a preset, or import one.</p>
          )}
        </Card>

        {/* Question Selection by Unit */}
        {allQuestionsByUnit.map(({ unit, questions }) => {
          const allTopicSelected = questions.every(q => selectedQuestionIds.has(q.id));
          const someTopicSelected = questions.some(q => selectedQuestionIds.has(q.id));
          const toggleTopic = () => {
            const newSelected = new Set(selectedQuestionIds);
            if (allTopicSelected) {
              questions.forEach(q => newSelected.delete(q.id));
            } else {
              questions.forEach(q => newSelected.add(q.id));
            }
            setSelectedQuestionIds(newSelected);
          };
          return (
          <Card key={unit.id} className="p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{unit.name} ({questions.length} questions)</h3>
              <Button variant="outline" size="sm" onClick={toggleTopic}>
                {allTopicSelected ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => toggleQuestion(q.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all relative ${
                    selectedQuestionIds.has(q.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {selectedQuestionIds.has(q.id) && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mb-1 font-medium">
                    Q{index + 1}
                  </div>
                  <MathText 
                    tag="div" 
                    className="text-sm leading-snug line-clamp-3"
                    enableChemistry={subject === 'chemistry'}
                  >
                    {truncateQuestion(q.question, 120)}
                  </MathText>
                </button>
              ))}
            </div>
          </Card>
          );
        })}

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseChallengePresetBuilder;
