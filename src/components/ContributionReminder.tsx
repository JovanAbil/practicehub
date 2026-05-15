import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Lock } from 'lucide-react';
import { useLockInMode } from '@/hooks/usePopupSettings';

interface ContributionReminderProps {
  isOpen: boolean;
  onClose: () => void;
  cooldownSeconds?: number;
}

export const ContributionReminder = ({ 
  isOpen,
  onClose,
  cooldownSeconds = 5 
}: ContributionReminderProps) => {
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(cooldownSeconds);
  const [showLockInPrompt, setShowLockInPrompt] = useState(false);
  const { isLockIn, toggleLockIn } = useLockInMode();

  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setCountdown(cooldownSeconds);
      setShowLockInPrompt(false);
    }
  }, [isOpen, cooldownSeconds]);

  useEffect(() => {
    if (isOpen && !canClose && !showLockInPrompt) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, canClose, showLockInPrompt]);

  const handleGotIt = () => {
    if (canClose) {
      if (!isLockIn) {
        setShowLockInPrompt(true);
      } else {
        onClose();
      }
    }
  };

  const handleEnableLockIn = () => {
    toggleLockIn();
    setShowLockInPrompt(false);
    onClose();
  };

  const handleSkipLockIn = () => {
    setShowLockInPrompt(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && canClose) {
        setShowLockInPrompt(false);
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md [&>button]:hidden" onPointerDownOutside={(e) => {
        if (!canClose) e.preventDefault();
      }} onEscapeKeyDown={(e) => {
        if (!canClose) e.preventDefault();
      }}>
        {!showLockInPrompt ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-5 w-5 text-red-500" />
                Help Your Fellow Students!
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                If you added a course, it would unlock better studying tools forever. 
                A bit of your time can save others a lot!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Head to the <span className="font-semibold text-other">Custom</span> category to create custom units and topics that everyone can benefit from.
              </p>
              <Button 
                onClick={handleGotIt} 
                disabled={!canClose}
                variant={canClose ? "default" : "secondary"}
                className="w-full"
              >
                {canClose ? "Got it!" : `Please wait ${countdown}s...`}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Lock className="h-5 w-5 text-primary" />
                Enable Lock In Mode?
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                Lock In mode disables all popups so you can focus on studying without distractions.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={handleEnableLockIn} className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Yes, enable Lock In
              </Button>
              <Button onClick={handleSkipLockIn} variant="outline" className="w-full">
                No, keep popups enabled
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
