import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AdBlockDetector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't check on the blocked page itself
    if (location.pathname === '/blocked') return;

    const checkAnalyticsBlocked = async () => {
      // Wait for page to fully load
      await new Promise(resolve => setTimeout(resolve, 2500));

      let scriptBlocked = false;
      let trackingBlocked = false;

      // Test 1: Check if the Counter.dev script can be fetched
      try {
        const response = await fetch('https://cdn.counter.dev/script.js', {
          cache: 'no-store',
        });
        if (!response.ok) {
          scriptBlocked = true;
        }
      } catch {
        scriptBlocked = true;
      }

      if (scriptBlocked) {
        navigate('/blocked', { replace: true, state: { returnPath: location.pathname } });
        return;
      }

      // Test 2: Check if the tracking domain is reachable
      const probeTracking = async (): Promise<boolean> => {
        const url = `https://t.counter.dev/track?_=${Date.now()}`;
        try {
          await fetch(url, {
            mode: 'no-cors',
            cache: 'no-store',
          });
          return false;
        } catch {
          return true;
        }
      };

      trackingBlocked = await probeTracking();
      if (trackingBlocked) {
        await new Promise(resolve => setTimeout(resolve, 500));
        trackingBlocked = await probeTracking();
      }

      if (trackingBlocked) {
        navigate('/blocked', { replace: true, state: { returnPath: location.pathname } });
      }
    };

    checkAnalyticsBlocked();
  }, [navigate, location.pathname]);

  return null;
};
