import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const TERMS_ACCEPTED_KEY = 'terms-accepted';

interface TermsOfServiceModalProps {
  /** If true, the modal can be opened manually (from privacy policy page) */
  externalOpen?: boolean;
  /** Callback when the external modal closes */
  onExternalClose?: () => void;
}

const TermsOfServiceModal = ({ externalOpen = false, onExternalClose }: TermsOfServiceModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrivacySummary, setShowPrivacySummary] = useState(false);
  const location = useLocation();

  // Don't show on blocked page
  const isBlockedPage = location.pathname === '/blocked';

  useEffect(() => {
    // Only auto-open on first visit if not being controlled externally and not on blocked page
    if (!externalOpen && !isBlockedPage) {
      const hasAccepted = localStorage.getItem(TERMS_ACCEPTED_KEY);
      if (!hasAccepted) {
        setIsOpen(true);
      }
    }
  }, [externalOpen, isBlockedPage]);

  // Handle external open state
  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [externalOpen]);

  // Listen for global "open-terms" event (e.g. from footer)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-terms', handler);
    return () => window.removeEventListener('open-terms', handler);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
    setIsOpen(false);
    if (onExternalClose) {
      onExternalClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowPrivacySummary(false);
    if (onExternalClose) {
      onExternalClose();
    }
  };

  const handlePrivacySummaryAccept = () => {
    setShowPrivacySummary(false);
  };

  // Privacy Summary Modal
  if (showPrivacySummary) {
    return (
      <Dialog open={true} onOpenChange={() => setShowPrivacySummary(false)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Privacy Policy Summary</DialogTitle>
            <DialogDescription>
              A quick overview of how we handle your data
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-lg">🔒</span>
                <p className="text-muted-foreground"><strong>Data Storage:</strong> Your quiz progress and preferences are stored locally on your device using browser storage.</p>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-lg">🍪</span>
                <p className="text-muted-foreground"><strong>Cookies:</strong> We use cookies to remember your preferences and improve your experience.</p>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-lg">📊</span>
                <p className="text-muted-foreground"><strong>Analytics:</strong> We may collect anonymous usage data to help improve the website.</p>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-lg">📢</span>
                <p className="text-muted-foreground"><strong>Third-Party Ads:</strong> This site may display ads from third-party networks that have their own privacy practices.</p>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-lg">📄</span>
                <p className="text-muted-foreground">For the complete privacy policy, visit the Privacy Policy page from the footer after accepting the terms.</p>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button onClick={handlePrivacySummaryAccept} className="w-full sm:w-auto">
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Allow closing only if it was externally opened (viewing from privacy policy)
      if (!open && externalOpen) {
        handleClose();
      }
    }}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => {
        // Prevent closing on first visit, allow if viewing from privacy policy
        if (!externalOpen) {
          e.preventDefault();
        }
      }}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to CSW Studying!</DialogTitle>
          <DialogDescription>
            {externalOpen ? 'Viewing Terms of Service' : 'Please review our terms before continuing'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="text-lg">📚</span>
              <p className="text-muted-foreground">This website was made for studying to be more efficient</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="text-lg">🔗</span>
              <p className="text-muted-foreground">More than just using this website, please share to anyone you know!</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="text-lg">✏️</span>
              <p className="text-muted-foreground">You can also add your own guides as well in Custom Units!</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <span className="text-lg">⚠️</span>
              <p className="text-muted-foreground">We do not accept tests at all, following the rules is necessary; don't ask to post tests for public use, you can add for private use</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-lg">🎉</span>
              <p className="text-muted-foreground font-medium">Have fun using this website and good luck on your test!</p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {!externalOpen && (
            <button 
              onClick={() => setShowPrivacySummary(true)} 
              className="text-sm text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              View Privacy Policy
            </button>
          )}
          <Button onClick={externalOpen ? handleClose : handleAccept} className="w-full sm:w-auto">
            {externalOpen ? 'Close' : 'I Accept'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;
