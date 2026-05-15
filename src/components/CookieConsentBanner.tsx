import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'cookie-consent-status';

export type ConsentStatus = 'accepted' | 'declined' | null;

export const getCookieConsent = (): ConsentStatus => {
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored === 'accepted' || stored === 'declined') {
    return stored;
  }
  return null;
};

export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Don't show on blocked page
  const isBlockedPage = location.pathname === '/blocked';

  useEffect(() => {
    // Only show if user hasn't made a choice yet and not on blocked page
    if (isBlockedPage) {
      setVisible(false);
      return;
    }
    const consent = getCookieConsent();
    if (consent === null) {
      // Small delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isBlockedPage]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in md:left-auto md:right-4 md:max-w-md">
      <Card className="p-4 shadow-lg border-2 border-primary/20 bg-background">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">Cookie Notice</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We use cookies and third-party services (like Google Ads) to improve your experience. 
              You can accept or decline non-essential cookies.{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Learn more
              </Link>
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleAccept} size="sm">
                Accept All
              </Button>
              <Button onClick={handleDecline} variant="outline" size="sm">
                Decline
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={handleDecline}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
