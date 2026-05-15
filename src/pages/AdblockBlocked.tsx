import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const checkAdblockActive = async (): Promise<boolean> => {
  // Test 1: Check if the Counter.dev script can be fetched
  try {
    const response = await fetch('https://cdn.counter.dev/script.js', {
      cache: 'no-store',
    });
    if (!response.ok) return true;
  } catch {
    return true;
  }

  // Test 2: Check if tracking domain is reachable
  try {
    await fetch(`https://t.counter.dev/track?_=${Date.now()}`, {
      mode: 'no-cors',
      cache: 'no-store',
    });
    return false;
  } catch {
    return true;
  }
};

const AdblockBlocked = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(false);
  const returnPath = (location.state as { returnPath?: string })?.returnPath || '/';

  // Continuously check and prevent navigation
  useEffect(() => {
    const checkAndRedirect = async () => {
      const isBlocked = await checkAdblockActive();
      if (!isBlocked) {
        // Adblocker disabled, allow them to go back
        navigate(returnPath, { replace: true });
      }
    };

    // Check immediately
    checkAndRedirect();

    // Check periodically in case they disable adblocker
    const interval = setInterval(checkAndRedirect, 3000);

    // Prevent back navigation by pushing state
    const handlePopState = () => {
      window.history.pushState(null, '', '/blocked');
    };
    
    window.history.pushState(null, '', '/blocked');
    window.addEventListener('popstate', handlePopState);

    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, returnPath]);

  const handleRefresh = async () => {
    setChecking(true);
    const isBlocked = await checkAdblockActive();
    if (!isBlocked) {
      navigate(returnPath, { replace: true });
    } else {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-destructive/20 rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-destructive">
          Adblocker Detected
        </h1>
        
        <p className="text-muted-foreground mb-6">
          Your adblocker is preventing analytics from loading. This helps us understand how students use the site to make it better.
        </p>

        
        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-semibold mb-2">To continue:</p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Disable your adblocker for this site</li>
            <li>Add this site to your adblocker's whitelist</li>
            <li>Click the button below to verify</li>
          </ol>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={checking}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 ${checking ? 'animate-spin' : ''}`} />
          {checking ? 'Checking...' : 'I Disabled My Adblocker'}
        </button>
        
        <p className="text-xs text-muted-foreground mt-6">
          This page cannot be bypassed. Disable your adblocker to access the site.
        </p>
      </div>
    </div>
  );
};

export default AdblockBlocked;
