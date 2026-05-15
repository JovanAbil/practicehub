import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const COUNTER_DEV_ID = '1db18856-e247-4aca-8f13-bdfe4c2f6ff9';
const COUNTER_DEV_UTC_OFFSET = '-5';

export const PageViewTracker = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial render — the inline script in index.html handles that
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      const params = new URLSearchParams({
        id: COUNTER_DEV_ID,
        page: location.pathname,
        screen: `${window.screen.width}x${window.screen.height}`,
        utcoffset: COUNTER_DEV_UTC_OFFSET,
      });

      navigator.sendBeacon(`https://t.counter.dev/trackpage?${params.toString()}`);
    } catch {
      // Silently fail if blocked
    }
  }, [location.pathname]);

  return null;
};
