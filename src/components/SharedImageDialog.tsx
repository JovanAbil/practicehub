import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link2, Image as ImageIcon } from 'lucide-react';
import { Question } from '@/types/quiz';

interface SharedImageDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  questions: Question[];
  currentQuestionIndex: number | null; // null if new question
  onApplySharedImage: (questionIndices: number[]) => void;
}

const SharedImageDialog = ({
  open,
  onClose,
  imageUrl,
  questions,
  currentQuestionIndex,
  onApplySharedImage,
}: SharedImageDialogProps) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setSelectedIndices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleApply = () => {
    onApplySharedImage(selectedIndices);
    setSelectedIndices([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedIndices([]);
    onClose();
  };

  // Filter out the current question being edited
  const otherQuestions = questions.filter((_, idx) => idx !== currentQuestionIndex);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Share Image with Other Questions
          </DialogTitle>
          <DialogDescription>
            This image can be linked to other questions to save storage. Select which questions should use this same image.
          </DialogDescription>
        </DialogHeader>

        {/* Image preview */}
        <div className="flex justify-center p-4 bg-muted rounded-lg">
          <img
            src={imageUrl}
            alt="Shared image preview"
            className="max-h-32 max-w-full object-contain rounded"
          />
        </div>

        {otherQuestions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No other questions available to share this image with. Add more questions first.
          </p>
        ) : (
          <ScrollArea className="max-h-60">
            <div className="space-y-3 pr-4">
              {questions.map((q, idx) => {
                // Skip current question
                if (idx === currentQuestionIndex) return null;

                const questionPreview = q.question.length > 50
                  ? q.question.substring(0, 50) + '...'
                  : q.question;

                const hasImage = !!q.image;

                return (
                  <div
                    key={q.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={`share-q-${idx}`}
                      checked={selectedIndices.includes(idx)}
                      onCheckedChange={() => handleToggle(idx)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={`share-q-${idx}`}
                        className="text-sm font-medium cursor-pointer flex items-center gap-2"
                      >
                        <span className="text-muted-foreground">#{idx + 1}</span>
                        <span className="px-1.5 py-0.5 text-xs rounded bg-muted">
                          {q.type === 'multiple-choice' ? 'MCQ' : 'FRQ'}
                        </span>
                        {hasImage && (
                          <span title="Has existing image (will be replaced)">
                            <ImageIcon className="h-3 w-3 text-primary" />
                          </span>
                        )}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {questionPreview || '(No question text)'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Skip
          </Button>
          <Button
            onClick={handleApply}
            disabled={selectedIndices.length === 0}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Link to {selectedIndices.length} Question{selectedIndices.length !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SharedImageDialog;
