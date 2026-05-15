import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Minus, Save, Trash2, Calculator, Image, GripVertical, Pencil, Copy, Link2, Layers, List, CheckSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useCustomUnits, CustomTopic, TestType } from '@/hooks/useCustomUnits';
import { Question, MultipleChoiceQuestion, FreeResponseQuestion, SelectAllQuestion, PartsQuestion, QuestionPart } from '@/types/quiz';
import MathBuilderSidebar from '@/components/MathBuilderSidebar';
import MathQuickInput from '@/components/MathQuickInput';
import SharedImageDialog from '@/components/SharedImageDialog';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';

interface EditingPart {
  label: string;
  type: 'mcq' | 'frq' | 'sata';
  question: string;
  answer: string;
  explanation: string;
  image: string;
  options: { label: string; text: string; image?: string }[];
  listAnswers?: string[];
  correctAnswers?: string[]; // For SATA parts
}

interface EditingQuestion {
  type: 'mcq' | 'frq' | 'parts' | 'sata';
  question: string;
  answer: string;
  explanation: string;
  image: string;
  options: { label: string; text: string; image?: string }[];
  calculator: boolean;
  parts?: EditingPart[];
  listAnswers?: string[];
  correctAnswers?: string[]; // For SATA
}

const defaultMcqOptions = [
  { label: 'A', text: '' },
  { label: 'B', text: '' },
  { label: 'C', text: '' },
  { label: 'D', text: '' },
];

const CustomTopicEditor = () => {
  const navigate = useNavigate();
  const { unitId, topicId } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  
  const { updateTopic, addTopic, getUnit } = useCustomUnits();
  const { toast } = useToast();

  const [topicName, setTopicName] = useState('');
  const [mathEnabled, setMathEnabled] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testType, setTestType] = useState<TestType>('homework');
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [showMathWarning, setShowMathWarning] = useState(false);
  const [showMathSidebar, setShowMathSidebar] = useState(false);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [activeTextField, setActiveTextField] = useState<string | null>(null);
  const textFieldRefs = useRef<{ [key: string]: HTMLTextAreaElement | HTMLInputElement | null }>({});
  const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Question being edited
  const [editingQuestion, setEditingQuestion] = useState<EditingQuestion | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [lastAutosave, setLastAutosave] = useState<Date | null>(null);

  // Shared image dialog state
  const [showSharedImageDialog, setShowSharedImageDialog] = useState(false);
  const [pendingSharedImage, setPendingSharedImage] = useState<string>('');

  // Load existing topic data - read directly from localStorage to avoid stale closures
  useEffect(() => {
    if (!unitId) return;
    
    if (!isNew && topicId) {
      // Read directly from localStorage to get fresh data
      const stored = localStorage.getItem('custom-units-data');
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          const unit = parsedData.units?.find((u: any) => u.id === unitId);
          const topic = unit?.topics?.find((t: any) => t.id === topicId);
          if (topic) {
            setTopicName(topic.name);
            setMathEnabled(topic.mathEnabled);
            setQuestions(topic.questions || []);
            setTestType(topic.testType || 'homework');
            setTestDate(topic.testDate || new Date().toISOString().split('T')[0]);
          }
        } catch (e) {
          console.error('Failed to load topic data:', e);
        }
      }
    }
  }, [unitId, topicId, isNew]);

  // Autosave every 3 minutes
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Only autosave if we have data worth saving
      if (!unitId || !topicName.trim()) return;
      
      const topicData: Omit<CustomTopic, 'id'> & { id?: string } = {
        name: topicName,
        mathEnabled,
        questions,
        testType,
        testDate,
      };

      if (isNew) {
        // For new topics, create a draft in localStorage
        const draftKey = `custom-topic-draft-${unitId}`;
        localStorage.setItem(draftKey, JSON.stringify(topicData));
      } else if (topicId) {
        // For existing topics, save directly
        updateTopic(unitId, topicId, topicData);
      }
      
      setLastAutosave(new Date());
      toast({ 
        title: 'Autosaved', 
        description: 'Your progress has been saved automatically',
        duration: 2000
      });
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(autosaveInterval);
  }, [unitId, topicId, topicName, mathEnabled, questions, testType, testDate, isNew, updateTopic, toast]);

  // Load draft for new topics
  useEffect(() => {
    if (isNew && unitId) {
      const draftKey = `custom-topic-draft-${unitId}`;
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);
          setTopicName(parsedDraft.name || '');
          setMathEnabled(parsedDraft.mathEnabled ?? true);
          setQuestions(parsedDraft.questions || []);
          setTestType(parsedDraft.testType || 'homework');
          setTestDate(parsedDraft.testDate || new Date().toISOString().split('T')[0]);
        } catch (e) {
          console.error('Failed to load draft:', e);
        }
      }
    }
  }, [isNew, unitId]);

  const handleMathToggle = (enabled: boolean) => {
    if (!enabled && mathEnabled) {
      // Check if any questions contain math
      const hasMath = questions.some(q => 
        q.question.includes('$') || 
        ('correctAnswer' in q && q.correctAnswer.includes('$')) || 
        ('explanation' in q && q.explanation && q.explanation.includes('$'))
      );
      
      if (hasMath) {
        setShowMathWarning(true);
        return;
      }
    }
    setMathEnabled(enabled);
  };

  const confirmDisableMath = () => {
    setMathEnabled(false);
    setShowMathWarning(false);
  };

  const startNewQuestion = (type: 'mcq' | 'frq' | 'parts' | 'sata', preset?: 'tf') => {
    const options = preset === 'tf'
      ? [{ label: 'A', text: 'True' }, { label: 'B', text: 'False' }]
      : (type === 'mcq' || type === 'sata') ? [...defaultMcqOptions] : [];

    setEditingQuestion({
      type,
      question: '',
      answer: '',
      explanation: '',
      image: '',
      options,
      calculator: false,
      correctAnswers: type === 'sata' ? [] : undefined,
      parts: type === 'parts' ? [
        { label: 'a', type: 'frq', question: '', answer: '', explanation: '', image: '', options: [] },
      ] : undefined,
    });
    setEditingIndex(null);
  };

  const editQuestion = (index: number) => {
    const q = questions[index];
    if (q.type === 'multiple-choice') {
      setEditingQuestion({
        type: 'mcq',
        question: q.question,
        answer: q.correctAnswer,
        explanation: q.explanation || '',
        image: q.image || '',
        options: q.options.map(o => ({ label: o.label, text: o.text, image: o.image })),
        calculator: q.calculator || false,
      });
    } else if (q.type === 'select-all') {
      setEditingQuestion({
        type: 'sata',
        question: q.question,
        answer: '',
        explanation: q.explanation || '',
        image: q.image || '',
        options: q.options.map(o => ({ label: o.label, text: o.text, image: o.image })),
        calculator: q.calculator || false,
        correctAnswers: [...q.correctAnswers],
      });
    } else if (q.type === 'parts') {
      setEditingQuestion({
        type: 'parts',
        question: q.question,
        answer: '',
        explanation: '',
        image: q.image || '',
        options: [],
        calculator: q.calculator || false,
        parts: q.parts.map(p => ({
          label: p.label,
          type: p.type === 'multiple-choice' ? 'mcq' : p.type === 'select-all' ? 'sata' : 'frq',
          question: p.question,
          answer: p.correctAnswer,
          explanation: p.explanation || '',
          image: p.image || '',
          options: p.options?.map(o => ({ label: o.label, text: o.text, image: o.image })) || [],
          listAnswers: p.listAnswers ? [...p.listAnswers] : undefined,
          correctAnswers: p.correctAnswers ? [...p.correctAnswers] : undefined,
        })),
      });
    } else {
      const frq = q as FreeResponseQuestion;
      setEditingQuestion({
        type: 'frq',
        question: q.question,
        answer: frq.correctAnswer,
        explanation: frq.explanation || '',
        image: q.image || '',
        options: [],
        calculator: q.calculator || false,
        listAnswers: frq.listAnswers ? [...frq.listAnswers] : undefined,
      });
    }
    setEditingIndex(index);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Image too large',
        description: 'Please upload an image smaller than 2MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      if (editingQuestion) {
        setEditingQuestion({ ...editingQuestion, image: imageData });
        // Store image and show dialog if there are other questions
        if (questions.length > 0) {
          setPendingSharedImage(imageData);
          setShowSharedImageDialog(true);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Apply shared image to selected questions
  const handleApplySharedImage = (questionIndices: number[]) => {
    if (!pendingSharedImage || questionIndices.length === 0) return;

    const newQuestions = [...questions];
    questionIndices.forEach(idx => {
      newQuestions[idx] = { ...newQuestions[idx], image: pendingSharedImage };
    });
    setQuestions(newQuestions);

    toast({
      title: 'Image linked!',
      description: `Image shared with ${questionIndices.length} other question${questionIndices.length > 1 ? 's' : ''}`,
    });

    setPendingSharedImage('');
  };

  const addOption = () => {
    if (!editingQuestion || (editingQuestion.type !== 'mcq' && editingQuestion.type !== 'sata')) return;
    const labels = 'ABCDEFGHIJ';
    const nextLabel = labels[editingQuestion.options.length] || `${editingQuestion.options.length + 1}`;
    setEditingQuestion({
      ...editingQuestion,
      options: [...editingQuestion.options, { label: nextLabel, text: '' }],
    });
  };

  const removeOption = (index: number) => {
    if (!editingQuestion || (editingQuestion.type !== 'mcq' && editingQuestion.type !== 'sata')) return;
    if (editingQuestion.options.length <= 2) {
      toast({
        title: 'Minimum options',
        description: 'Questions must have at least 2 options',
        variant: 'destructive',
      });
      return;
    }
    const removedLabel = editingQuestion.options[index].label;
    const newOptions = editingQuestion.options.filter((_, i) => i !== index);
    const labels = 'ABCDEFGHIJ';
    const relabeled = newOptions.map((o, i) => ({ ...o, label: labels[i] || `${i + 1}` }));
    
    // For MCQ, reset answer if removed option was the answer
    const newAnswer = editingQuestion.type === 'mcq' && editingQuestion.answer === removedLabel ? '' : editingQuestion.answer;
    // For SATA, remove from correctAnswers
    const newCorrectAnswers = editingQuestion.type === 'sata' && editingQuestion.correctAnswers
      ? editingQuestion.correctAnswers.filter(a => a !== removedLabel)
      : editingQuestion.correctAnswers;
    
    setEditingQuestion({ ...editingQuestion, options: relabeled, answer: newAnswer, correctAnswers: newCorrectAnswers });
  };

  const updateOption = (index: number, text: string) => {
    if (!editingQuestion || (editingQuestion.type !== 'mcq' && editingQuestion.type !== 'sata')) return;
    const newOptions = [...editingQuestion.options];
    newOptions[index] = { ...newOptions[index], text };
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const handleOptionImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingQuestion) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Image too large',
        description: 'Please upload an image smaller than 2MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newOptions = [...editingQuestion.options];
      newOptions[index] = { ...newOptions[index], image: event.target?.result as string };
      setEditingQuestion({ ...editingQuestion, options: newOptions });
    };
    reader.readAsDataURL(file);
  };

  const removeOptionImage = (index: number) => {
    if (!editingQuestion) return;
    const newOptions = [...editingQuestion.options];
    newOptions[index] = { ...newOptions[index], image: undefined };
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const saveQuestion = () => {
    if (!editingQuestion) return;

    // Validation
    if (!editingQuestion.question.trim()) {
      toast({ title: 'Question required', variant: 'destructive' });
      return;
    }
    
    // Parts-specific validation
    if (editingQuestion.type === 'parts') {
      if (!editingQuestion.parts || editingQuestion.parts.length === 0) {
        toast({ title: 'Add at least one part', variant: 'destructive' });
        return;
      }
      for (const part of editingQuestion.parts) {
        if (!part.question.trim()) {
          toast({ title: `Part ${part.label.toUpperCase()} needs a question`, variant: 'destructive' });
          return;
        }
        if (part.type === 'sata') {
          if (part.options.some(o => !o.text.trim())) {
            toast({ title: `Part ${part.label.toUpperCase()}: all options need text`, variant: 'destructive' });
            return;
          }
          if (!part.correctAnswers || part.correctAnswers.length === 0) {
            toast({ title: `Part ${part.label.toUpperCase()}: select at least one correct answer`, variant: 'destructive' });
            return;
          }
        } else if (!part.answer.trim() && !(part.type === 'frq' && part.listAnswers && part.listAnswers.length > 0)) {
          toast({ title: `Part ${part.label.toUpperCase()} needs an answer`, variant: 'destructive' });
          return;
        }
        if (part.type === 'frq' && part.listAnswers && part.listAnswers.some(a => !a.trim())) {
          toast({ title: `Part ${part.label.toUpperCase()}: all list items need text`, variant: 'destructive' });
          return;
        }
        if (part.type === 'mcq') {
          if (part.options.some(o => !o.text.trim())) {
            toast({ title: `Part ${part.label.toUpperCase()}: all options need text`, variant: 'destructive' });
            return;
          }
          if (!part.options.find(o => o.label === part.answer)) {
            toast({ title: `Part ${part.label.toUpperCase()}: answer must match option label`, variant: 'destructive' });
            return;
          }
        }
      }
    } else {
      if (editingQuestion.type === 'sata') {
        if (editingQuestion.options.some(o => !o.text.trim())) {
          toast({ title: 'All options must have text', variant: 'destructive' });
          return;
        }
        if (!editingQuestion.correctAnswers || editingQuestion.correctAnswers.length === 0) {
          toast({ title: 'Select at least one correct answer', variant: 'destructive' });
          return;
        }
      } else if (!editingQuestion.answer.trim() && !(editingQuestion.type === 'frq' && editingQuestion.listAnswers && editingQuestion.listAnswers.length > 0)) {
        toast({ title: 'Answer required', variant: 'destructive' });
        return;
      }
      if (editingQuestion.type === 'frq' && editingQuestion.listAnswers && editingQuestion.listAnswers.some(a => !a.trim())) {
        toast({ title: 'All list items need text', variant: 'destructive' });
        return;
      }
      if (editingQuestion.type === 'mcq') {
        const emptyOptions = editingQuestion.options.filter(o => !o.text.trim());
        if (emptyOptions.length > 0) {
          toast({ title: 'All options must have text', variant: 'destructive' });
          return;
        }
        if (!editingQuestion.options.find(o => o.label === editingQuestion.answer)) {
          toast({ title: 'Answer must match an option label (A, B, C, etc.)', variant: 'destructive' });
          return;
        }
      }
    }

    const questionId = editingIndex !== null 
      ? questions[editingIndex].id 
      : `custom-q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    let newQuestion: Question;

    if (editingQuestion.type === 'parts') {
      newQuestion = {
        id: questionId,
        type: 'parts',
        question: editingQuestion.question,
        parts: editingQuestion.parts!.map(p => ({
          label: p.label,
          type: p.type === 'mcq' ? 'multiple-choice' : p.type === 'sata' ? 'select-all' : 'free-response',
          question: p.question,
          options: (p.type === 'mcq' || p.type === 'sata') ? p.options.map(o => ({ label: o.label, value: o.label, text: o.text, image: o.image })) : undefined,
          correctAnswer: p.type === 'sata' ? '' : p.answer,
          correctAnswers: p.type === 'sata' ? p.correctAnswers : undefined,
          explanation: p.explanation || undefined,
          image: p.image || undefined,
          listAnswers: (p.type === 'frq' && p.listAnswers && p.listAnswers.length > 0) ? p.listAnswers : undefined,
        } as QuestionPart)),
        image: editingQuestion.image || undefined,
        calculator: editingQuestion.calculator || undefined,
      } as PartsQuestion;
    } else if (editingQuestion.type === 'mcq') {
      newQuestion = {
        id: questionId,
        type: 'multiple-choice',
        question: editingQuestion.question,
        options: editingQuestion.options.map(o => ({ label: o.label, value: o.label, text: o.text, image: o.image })),
        correctAnswer: editingQuestion.answer,
        explanation: editingQuestion.explanation || undefined,
        image: editingQuestion.image || undefined,
        calculator: editingQuestion.calculator || undefined,
      } as MultipleChoiceQuestion;
    } else if (editingQuestion.type === 'sata') {
      newQuestion = {
        id: questionId,
        type: 'select-all',
        question: editingQuestion.question,
        options: editingQuestion.options.map(o => ({ label: o.label, value: o.label, text: o.text, image: o.image })),
        correctAnswers: editingQuestion.correctAnswers || [],
        explanation: editingQuestion.explanation || undefined,
        image: editingQuestion.image || undefined,
        calculator: editingQuestion.calculator || undefined,
      } as SelectAllQuestion;
    } else {
      newQuestion = {
        id: questionId,
        type: 'free-response',
        question: editingQuestion.question,
        correctAnswer: editingQuestion.answer,
        explanation: editingQuestion.explanation || undefined,
        image: editingQuestion.image || undefined,
        calculator: editingQuestion.calculator || undefined,
        listAnswers: (editingQuestion.listAnswers && editingQuestion.listAnswers.length > 0) ? editingQuestion.listAnswers : undefined,
      } as FreeResponseQuestion;
    }

    if (editingIndex !== null) {
      const newQuestions = [...questions];
      newQuestions[editingIndex] = newQuestion;
      setQuestions(newQuestions);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    setEditingQuestion(null);
    setEditingIndex(null);
    toast({ title: 'Question saved!' });
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingQuestion(null);
      setEditingIndex(null);
    }
  };

  const duplicateQuestion = (index: number) => {
    const originalQ = questions[index];
    const newId = `custom-q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Deep clone the question with a new ID
    const duplicatedQuestion: Question = {
      ...JSON.parse(JSON.stringify(originalQ)),
      id: newId,
    };
    
    // Insert after the original question
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, duplicatedQuestion);
    setQuestions(newQuestions);
    
    toast({ title: 'Question duplicated!' });
  };

  const handleMathInsert = (latex: string) => {
    if (!activeTextField || !textFieldRefs.current[activeTextField]) return;
    
    const field = textFieldRefs.current[activeTextField];
    if (!field) return;

    const start = field.selectionStart || 0;
    const end = field.selectionEnd || 0;
    const currentValue = field.value;
    const newValue = currentValue.substring(0, start) + latex + currentValue.substring(end);

    // Update the correct field
    if (editingQuestion) {
      if (activeTextField === 'question') {
        setEditingQuestion({ ...editingQuestion, question: newValue });
      } else if (activeTextField === 'answer') {
        setEditingQuestion({ ...editingQuestion, answer: newValue });
      } else if (activeTextField === 'explanation') {
        setEditingQuestion({ ...editingQuestion, explanation: newValue });
      } else if (activeTextField.startsWith('option-')) {
        const optionIndex = parseInt(activeTextField.split('-')[1]);
        updateOption(optionIndex, newValue);
      }
    }

    // Move cursor after inserted text
    setTimeout(() => {
      if (field) {
        const newPos = start + latex.length;
        field.setSelectionRange(newPos, newPos);
        field.focus();
      }
    }, 0);
  };

  // Check if form has any data that should be saved
  const hasUnsavedData = () => {
    return topicName.trim() !== '' || questions.length > 0;
  };

  // Validate required fields
  const validateFields = (): boolean => {
    if (!topicName.trim()) {
      toast({ title: 'Topic name is required', variant: 'destructive' });
      return false;
    }
    if (!testType) {
      toast({ title: 'Please select if this is a test or homework', variant: 'destructive' });
      return false;
    }
    if (!testDate) {
      toast({ title: 'Test date is required', variant: 'destructive' });
      return false;
    }
    return true;
  };

  // Handle back button click
  const handleBackClick = () => {
    if (hasUnsavedData()) {
      setShowBackWarning(true);
    } else {
      navigate('/category/custom');
    }
  };

  // Save and go back
  const handleSaveAndBack = () => {
    if (validateFields()) {
      saveTopic();
    }
    setShowBackWarning(false);
  };

  const saveTopic = () => {
    if (!validateFields()) return;
    if (!unitId) return;

    const topicData: Omit<CustomTopic, 'id'> & { id?: string } = {
      name: topicName,
      mathEnabled,
      questions,
      testType,
      testDate,
    };

    if (isNew) {
      const newTopic = addTopic(unitId, topicData);
      // Clear draft after successful save
      const draftKey = `custom-topic-draft-${unitId}`;
      localStorage.removeItem(draftKey);
      toast({ title: 'Topic created!' });
      navigate(`/category/custom`, { replace: true });
    } else if (topicId) {
      updateTopic(unitId, topicId, topicData);
      toast({ title: 'Topic saved!' });
      navigate(`/category/custom`, { replace: true });
    }
  };

  const unit = unitId ? getUnit(unitId) : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Button variant="ghost" onClick={handleBackClick} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Other
        </Button>

        <h1 className="text-3xl font-display font-bold mb-2">
          {isNew ? 'Create New Topic' : 'Edit Topic'}
        </h1>
        {unit && <p className="text-muted-foreground mb-6">in {unit.name}</p>}

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic-name">Topic Name *</Label>
              <Input
                id="topic-name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="e.g., Quadratic Equations"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="test-type">Type *</Label>
                <Select value={testType} onValueChange={(value) => setTestType(value as TestType)}>
                  <SelectTrigger id="test-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="homework">Homework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-date">Date Received *</Label>
                <Input
                  id="test-date"
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Math Functions</Label>
                <p className="text-sm text-muted-foreground">
                  Enable LaTeX math rendering for this topic
                </p>
              </div>
              <Switch checked={mathEnabled} onCheckedChange={handleMathToggle} />
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => startNewQuestion('frq')}>
              <Plus className="mr-2 h-4 w-4" />
              FRQ
            </Button>
            <Button variant="outline" onClick={() => startNewQuestion('mcq')}>
              <Plus className="mr-2 h-4 w-4" />
              MCQ
            </Button>
            <Button variant="outline" onClick={() => startNewQuestion('mcq', 'tf')}>
              <Plus className="mr-2 h-4 w-4" />
              T/F
            </Button>
            <Button variant="outline" onClick={() => startNewQuestion('sata')}>
              <Plus className="mr-2 h-4 w-4" />
              SATA
            </Button>
            <Button variant="outline" onClick={() => startNewQuestion('parts')}>
              <Layers className="mr-2 h-4 w-4" />
              Parts
            </Button>
          </div>
        </div>

        {/* Existing questions list */}
        {questions.length > 0 && !editingQuestion && (
          <div className="space-y-2 mb-6">
            {questions.map((q, index) => (
              <Card key={q.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-sm font-bold text-muted-foreground w-6 text-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs font-medium px-2 py-1 rounded bg-muted flex-shrink-0">
                    {q.type === 'multiple-choice' ? 'MCQ' : q.type === 'select-all' ? 'SATA' : q.type === 'parts' ? `PARTS (${(q as PartsQuestion).parts.length})` : (q as FreeResponseQuestion).listAnswers ? 'LIST' : 'FRQ'}
                  </span>
                  {q.calculator && (
                    <span title="Calculator question">
                      <Calculator className="h-4 w-4 text-primary flex-shrink-0" />
                    </span>
                  )}
                  <span className="truncate text-sm">{q.question}</span>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => duplicateQuestion(index)} title="Duplicate question">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => editQuestion(index)} title="Edit question">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteQuestion(index)} title="Delete question">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Question editor */}
        {editingQuestion && (
          <Card className="p-6 mb-6 border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {editingIndex !== null ? `Edit Question #${editingIndex + 1}` : `New Question #${questions.length + 1}`} ({editingQuestion.type === 'mcq' ? 'Multiple Choice' : editingQuestion.type === 'sata' ? 'Select All That Apply' : editingQuestion.type === 'parts' ? 'Parts' : 'Free Response'})
              </h3>
              {mathEnabled && (
                <Button variant="outline" size="sm" onClick={() => setShowMathSidebar(true)}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Math Builder
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {/* Image upload */}
              <div className="space-y-2">
                <Label>Image (optional)</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <label className="cursor-pointer">
                      <Image className="mr-2 h-4 w-4" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </Button>
                  {editingQuestion.image && (
                    <div className="flex items-center gap-2">
                      <img src={editingQuestion.image} alt="Preview" className="h-16 w-16 object-cover rounded" />
                      {questions.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPendingSharedImage(editingQuestion.image);
                            setShowSharedImageDialog(true);
                          }}
                          title="Share this image with other questions"
                        >
                          <Link2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => setEditingQuestion({ ...editingQuestion, image: '' })}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Question text */}
              <div className="space-y-2">
                <Label htmlFor="q-question">Question *</Label>
                <Textarea
                  id="q-question"
                  ref={(el) => { textFieldRefs.current['question'] = el; }}
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  onFocus={() => setActiveTextField('question')}
                  placeholder="Enter your question..."
                  rows={3}
                />
              </div>

              {/* MCQ / SATA Options */}
              {(editingQuestion.type === 'mcq' || editingQuestion.type === 'sata') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>{editingQuestion.type === 'sata' ? 'Options * (toggle checkmarks for correct answers)' : 'Options *'}</Label>
                    <Button variant="outline" size="sm" onClick={addOption}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {editingQuestion.options.map((option, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {editingQuestion.type === 'sata' && (
                          <Checkbox
                            checked={(editingQuestion.correctAnswers || []).includes(option.label)}
                            onCheckedChange={(checked) => {
                              const current = editingQuestion.correctAnswers || [];
                              const newCorrect = checked 
                                ? [...current, option.label]
                                : current.filter(a => a !== option.label);
                              setEditingQuestion({ ...editingQuestion, correctAnswers: newCorrect });
                            }}
                          />
                        )}
                        <span className="w-8 text-center font-medium">{option.label}</span>
                        <Input
                          ref={(el) => { textFieldRefs.current[`option-${index}`] = el; }}
                          value={option.text}
                          onChange={(e) => updateOption(index, e.target.value)}
                          onFocus={() => setActiveTextField(`option-${index}`)}
                          placeholder={`Option ${option.label}...`}
                          className="flex-1"
                        />
                        <Button variant="ghost" size="icon" asChild className="relative">
                          <label className="cursor-pointer">
                            <Image className="h-4 w-4" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleOptionImageUpload(index, e)}
                            />
                          </label>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      {option.image && (
                        <div className="flex items-center gap-2 ml-10">
                          <img src={option.image} alt={`Option ${option.label}`} className="h-12 w-12 object-cover rounded border" />
                          <Button variant="ghost" size="sm" onClick={() => removeOptionImage(index)}>
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {editingQuestion.type === 'sata' && (
                    <p className="text-xs text-muted-foreground">
                      ✓ Selected: {(editingQuestion.correctAnswers || []).join(', ') || 'None'}
                    </p>
                  )}
                </div>
              )}

              {/* Parts Editor */}
              {editingQuestion.type === 'parts' && editingQuestion.parts && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Parts</Label>
                    <Button variant="outline" size="sm" onClick={() => {
                      const labels = 'abcdefghij';
                      const nextLabel = labels[editingQuestion.parts!.length] || `${editingQuestion.parts!.length + 1}`;
                      setEditingQuestion({
                        ...editingQuestion,
                        parts: [...editingQuestion.parts!, {
                          label: nextLabel,
                          type: 'frq',
                          question: '',
                          answer: '',
                          explanation: '',
                          image: '',
                          options: [],
                        }],
                      });
                    }}>
                      <Plus className="mr-1 h-4 w-4" /> Add Part
                    </Button>
                  </div>

                  {editingQuestion.parts.map((part, pIdx) => (
                    <Card key={pIdx} className="p-4 border-primary/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-primary">Part {part.label.toUpperCase()}</span>
                        <div className="flex items-center gap-2">
                          <Select
                            value={part.type}
                            onValueChange={(val: 'mcq' | 'frq' | 'sata') => {
                              const newParts = [...editingQuestion.parts!];
                              newParts[pIdx] = {
                                ...newParts[pIdx],
                                type: val,
                                options: (val === 'mcq' || val === 'sata') ? [...defaultMcqOptions] : [],
                                answer: '',
                                correctAnswers: val === 'sata' ? [] : undefined,
                              };
                              setEditingQuestion({ ...editingQuestion, parts: newParts });
                            }}
                          >
                            <SelectTrigger className="w-24 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mcq">MCQ</SelectItem>
                              <SelectItem value="frq">FRQ</SelectItem>
                              <SelectItem value="sata">SATA</SelectItem>
                            </SelectContent>
                          </Select>
                          {editingQuestion.parts!.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                              const newParts = editingQuestion.parts!.filter((_, i) => i !== pIdx);
                              const labels = 'abcdefghij';
                              const relabeled = newParts.map((p, i) => ({ ...p, label: labels[i] || `${i + 1}` }));
                              setEditingQuestion({ ...editingQuestion, parts: relabeled });
                            }}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Part image */}
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <label className="cursor-pointer text-xs">
                              <Image className="mr-1 h-3 w-3" /> Image
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                if (file.size > 2 * 1024 * 1024) { toast({ title: 'Image too large', variant: 'destructive' }); return; }
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const newParts = [...editingQuestion.parts!];
                                  newParts[pIdx] = { ...newParts[pIdx], image: ev.target?.result as string };
                                  setEditingQuestion({ ...editingQuestion, parts: newParts });
                                };
                                reader.readAsDataURL(file);
                              }} />
                            </label>
                          </Button>
                          {part.image && (
                            <>
                              <img src={part.image} alt="Part img" className="h-10 w-10 object-cover rounded" />
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                const newParts = [...editingQuestion.parts!];
                                newParts[pIdx] = { ...newParts[pIdx], image: '' };
                                setEditingQuestion({ ...editingQuestion, parts: newParts });
                              }}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>

                        {/* Part question */}
                        <Textarea
                          value={part.question}
                          onChange={(e) => {
                            const newParts = [...editingQuestion.parts!];
                            newParts[pIdx] = { ...newParts[pIdx], question: e.target.value };
                            setEditingQuestion({ ...editingQuestion, parts: newParts });
                          }}
                          placeholder={`Part ${part.label} question...`}
                          rows={2}
                          className="text-sm"
                        />

                        {/* Part MCQ/SATA options */}
                        {(part.type === 'mcq' || part.type === 'sata') && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs">{part.type === 'sata' ? 'Options (toggle checkmarks)' : 'Options'}</Label>
                              <Button variant="outline" size="sm" className="h-6 text-xs" onClick={() => {
                                const labels = 'ABCDEFGHIJ';
                                const newParts = [...editingQuestion.parts!];
                                const nextLabel = labels[part.options.length] || `${part.options.length + 1}`;
                                newParts[pIdx] = {
                                  ...newParts[pIdx],
                                  options: [...part.options, { label: nextLabel, text: '' }],
                                };
                                setEditingQuestion({ ...editingQuestion, parts: newParts });
                              }}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            {part.options.map((opt, oIdx) => (
                              <div key={oIdx} className="flex items-center gap-2">
                                {part.type === 'sata' && (
                                  <Checkbox
                                    checked={(part.correctAnswers || []).includes(opt.label)}
                                    onCheckedChange={(checked) => {
                                      const newParts = [...editingQuestion.parts!];
                                      const current = newParts[pIdx].correctAnswers || [];
                                      newParts[pIdx] = {
                                        ...newParts[pIdx],
                                        correctAnswers: checked
                                          ? [...current, opt.label]
                                          : current.filter(a => a !== opt.label),
                                      };
                                      setEditingQuestion({ ...editingQuestion, parts: newParts });
                                    }}
                                    className="h-3 w-3"
                                  />
                                )}
                                <span className="w-6 text-center text-xs font-medium">{opt.label}</span>
                                <Input
                                  value={opt.text}
                                  onChange={(e) => {
                                    const newParts = [...editingQuestion.parts!];
                                    const newOpts = [...newParts[pIdx].options];
                                    newOpts[oIdx] = { ...newOpts[oIdx], text: e.target.value };
                                    newParts[pIdx] = { ...newParts[pIdx], options: newOpts };
                                    setEditingQuestion({ ...editingQuestion, parts: newParts });
                                  }}
                                  placeholder={`Option ${opt.label}...`}
                                  className="flex-1 h-8 text-sm"
                                />
                                <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                                  <label className="cursor-pointer">
                                    <Image className="h-3 w-3" />
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        const newParts = [...editingQuestion.parts!];
                                        const newOpts = [...newParts[pIdx].options];
                                        newOpts[oIdx] = { ...newOpts[oIdx], image: ev.target?.result as string };
                                        newParts[pIdx] = { ...newParts[pIdx], options: newOpts };
                                        setEditingQuestion({ ...editingQuestion, parts: newParts });
                                      };
                                      reader.readAsDataURL(file);
                                    }} />
                                  </label>
                                </Button>
                                {part.options.length > 2 && (
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                    const newParts = [...editingQuestion.parts!];
                                    const newOpts = part.options.filter((_, i) => i !== oIdx);
                                    const labels = 'ABCDEFGHIJ';
                                    const relabeled = newOpts.map((o, i) => ({ ...o, label: labels[i] || `${i + 1}` }));
                                    newParts[pIdx] = { ...newParts[pIdx], options: relabeled };
                                    setEditingQuestion({ ...editingQuestion, parts: newParts });
                                  }}>
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            {part.type === 'sata' && (
                              <p className="text-xs text-muted-foreground">✓ Selected: {(part.correctAnswers || []).join(', ') || 'None'}</p>
                            )}
                          </div>
                        )}

                        {/* Part answer - hide for SATA */}
                        {part.type !== 'sata' && (
                        <div className="space-y-1">
                          <Label className="text-xs">{part.type === 'mcq' ? 'Correct Answer (A, B, etc.)' : 'Correct Answer'}</Label>
                          {part.type === 'mcq' ? (
                            <Input
                              value={part.answer}
                              onChange={(e) => {
                                const newParts = [...editingQuestion.parts!];
                                newParts[pIdx] = { ...newParts[pIdx], answer: e.target.value.toUpperCase() };
                                setEditingQuestion({ ...editingQuestion, parts: newParts });
                              }}
                              placeholder="A"
                              className="w-16 h-8 text-sm"
                            />
                          ) : (
                            <Textarea
                              value={part.answer}
                              onChange={(e) => {
                                const newParts = [...editingQuestion.parts!];
                                newParts[pIdx] = { ...newParts[pIdx], answer: e.target.value };
                                setEditingQuestion({ ...editingQuestion, parts: newParts });
                              }}
                              placeholder="Enter answer..."
                              rows={1}
                              className="text-sm"
                            />
                          )}
                        </div>
                        )}

                        {/* Part list answers - only for FRQ parts */}
                        {part.type === 'frq' && (
                          <div className="space-y-2 p-2 rounded border bg-muted/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <List className="h-3 w-3 text-primary" />
                                <Label className="text-xs font-medium">List Question</Label>
                              </div>
                              <Switch
                                className="scale-75"
                                checked={!!part.listAnswers}
                                onCheckedChange={(checked) => {
                                  const newParts = [...editingQuestion.parts!];
                                  newParts[pIdx] = { ...newParts[pIdx], listAnswers: checked ? [''] : undefined };
                                  setEditingQuestion({ ...editingQuestion, parts: newParts });
                                }}
                              />
                            </div>
                            {part.listAnswers && (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">{part.listAnswers.length} item(s)</span>
                                  <Button variant="outline" size="sm" className="h-5 text-xs px-2" onClick={() => {
                                    const newParts = [...editingQuestion.parts!];
                                    newParts[pIdx] = { ...newParts[pIdx], listAnswers: [...part.listAnswers!, ''] };
                                    setEditingQuestion({ ...editingQuestion, parts: newParts });
                                  }}>
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                {part.listAnswers.map((item, liIdx) => (
                                  <div key={liIdx} className="flex items-center gap-1">
                                    <span className="w-4 text-center text-xs text-muted-foreground">{liIdx + 1}.</span>
                                    <Input
                                      value={item}
                                      onChange={(e) => {
                                        const newParts = [...editingQuestion.parts!];
                                        const newList = [...newParts[pIdx].listAnswers!];
                                        newList[liIdx] = e.target.value;
                                        newParts[pIdx] = { ...newParts[pIdx], listAnswers: newList };
                                        setEditingQuestion({ ...editingQuestion, parts: newParts });
                                      }}
                                      placeholder={`Item ${liIdx + 1}...`}
                                      className="flex-1 h-6 text-xs"
                                    />
                                    {part.listAnswers!.length > 1 && (
                                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => {
                                        const newParts = [...editingQuestion.parts!];
                                        newParts[pIdx] = { ...newParts[pIdx], listAnswers: part.listAnswers!.filter((_, i) => i !== liIdx) };
                                        setEditingQuestion({ ...editingQuestion, parts: newParts });
                                      }}>
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Part explanation */}
                        <div className="space-y-1">
                          <Label className="text-xs">Explanation (optional)</Label>
                          <Textarea
                            value={part.explanation}
                            onChange={(e) => {
                              const newParts = [...editingQuestion.parts!];
                              newParts[pIdx] = { ...newParts[pIdx], explanation: e.target.value };
                              setEditingQuestion({ ...editingQuestion, parts: newParts });
                            }}
                            placeholder="Explain..."
                            rows={1}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Answer - hide for parts and sata type */}
              {editingQuestion.type !== 'parts' && editingQuestion.type !== 'sata' && (
              <div className="space-y-2">
                <Label htmlFor="q-answer">
                  {editingQuestion.type === 'mcq' ? 'Correct Answer (A, B, C, etc.) *' : 'Correct Answer *'}
                </Label>
                {editingQuestion.type === 'mcq' ? (
                  <Input
                    id="q-answer"
                    value={editingQuestion.answer}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value.toUpperCase() })}
                    placeholder="A"
                    className="w-20"
                  />
                ) : (
                  <div>
                    <Textarea
                      id="q-answer"
                      ref={(el) => { 
                        textFieldRefs.current['answer'] = el; 
                        (answerTextareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                      }}
                      value={editingQuestion.answer}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                      onFocus={() => setActiveTextField('answer')}
                      placeholder="Enter the correct answer..."
                      rows={2}
                    />
                    {mathEnabled && (
                      <MathQuickInput
                        textareaRef={answerTextareaRef as React.RefObject<HTMLTextAreaElement>}
                        value={editingQuestion.answer}
                        onChange={(newValue) => setEditingQuestion({ ...editingQuestion, answer: newValue })}
                      />
                    )}
                  </div>
                )}
              </div>
              )}

              {/* List Answers - only for FRQ */}
              {editingQuestion.type === 'frq' && (
                <div className="space-y-3 p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <List className="h-5 w-5 text-primary" />
                      <div>
                        <Label className="font-medium">List Question</Label>
                        <p className="text-sm text-muted-foreground">
                          Require a list of items as the answer
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!!editingQuestion.listAnswers}
                      onCheckedChange={(checked) => {
                        setEditingQuestion({
                          ...editingQuestion,
                          listAnswers: checked ? [''] : undefined,
                        });
                      }}
                    />
                  </div>
                  {editingQuestion.listAnswers && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">List Items ({editingQuestion.listAnswers.length})</Label>
                        <Button variant="outline" size="sm" className="h-6 text-xs" onClick={() => {
                          setEditingQuestion({
                            ...editingQuestion,
                            listAnswers: [...editingQuestion.listAnswers!, ''],
                          });
                        }}>
                          <Plus className="h-3 w-3 mr-1" /> Add Item
                        </Button>
                      </div>
                      {editingQuestion.listAnswers.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-6 text-center text-xs font-medium text-muted-foreground">{idx + 1}.</span>
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newList = [...editingQuestion.listAnswers!];
                              newList[idx] = e.target.value;
                              setEditingQuestion({ ...editingQuestion, listAnswers: newList });
                            }}
                            placeholder={`Item ${idx + 1}...`}
                            className="flex-1 h-8 text-sm"
                          />
                          {editingQuestion.listAnswers!.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                              const newList = editingQuestion.listAnswers!.filter((_, i) => i !== idx);
                              setEditingQuestion({ ...editingQuestion, listAnswers: newList });
                            }}>
                              <Minus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {editingQuestion.type !== 'parts' && (
              <div className="space-y-2">
                <Label htmlFor="q-explanation">Explanation (optional)</Label>
                <Textarea
                  id="q-explanation"
                  ref={(el) => { textFieldRefs.current['explanation'] = el; }}
                  value={editingQuestion.explanation}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  onFocus={() => setActiveTextField('explanation')}
                  placeholder="Explain the answer..."
                  rows={2}
                />
              </div>
              )}

              {/* Calculator Toggle - only show if math is enabled */}
              {mathEnabled && (
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5 text-primary" />
                    <div>
                      <Label htmlFor="calc-toggle" className="font-medium">Calculator Question</Label>
                      <p className="text-sm text-muted-foreground">
                        Mark this question as requiring a calculator
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="calc-toggle"
                    checked={editingQuestion.calculator}
                    onCheckedChange={(checked) => setEditingQuestion({ ...editingQuestion, calculator: checked })}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={saveQuestion}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Question
                </Button>
                <Button variant="outline" onClick={() => { setEditingQuestion(null); setEditingIndex(null); }}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Separator className="my-6" />

        <Button onClick={saveTopic} size="lg" className="w-full">
          <Save className="mr-2 h-5 w-5" />
          Save Topic
        </Button>

        <Separator className="my-6" />

        {/* Question Generator Link */}
        <Card className="p-6 border-dashed bg-primary/5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-semibold mb-1">Need help creating questions?</h3>
              <p className="text-sm text-muted-foreground">Use our AI-powered Question Generator to turn your notes into practice questions automatically.</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/question-generator">
                Open Generator
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Math Builder Sidebar */}
      <MathBuilderSidebar
        isOpen={showMathSidebar}
        onClose={() => setShowMathSidebar(false)}
        onInsert={handleMathInsert}
      />

      {/* Math Warning Dialog */}
      <AlertDialog open={showMathWarning} onOpenChange={setShowMathWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Math Functions?</AlertDialogTitle>
            <AlertDialogDescription>
              Warning: If you disable math functions, you cannot use any LaTeX math formatting (like $x^2$ or fractions) in this topic. Existing math formatting may not render correctly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisableMath}>
              Disable Math
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Back Warning Dialog */}
      <AlertDialog open={showBackWarning} onOpenChange={setShowBackWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save before leaving?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved content. Please fill in all required fields (Topic Name, Type, and Date) to save your topic, or cancel to discard changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/category/custom')}>Discard & Leave</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAndBack}>
              Save Topic
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Shared Image Dialog */}
      <SharedImageDialog
        open={showSharedImageDialog}
        onClose={() => {
          setShowSharedImageDialog(false);
          setPendingSharedImage('');
        }}
        imageUrl={pendingSharedImage}
        questions={questions}
        currentQuestionIndex={editingIndex}
        onApplySharedImage={handleApplySharedImage}
      />

      <div className="container mx-auto px-4 pb-8">
        <AdPlaceholder position="bottom" />
      </div>
      <Footer />
    </div>
  );
};

export default CustomTopicEditor;
