import { useState, useEffect } from 'react';

const DEBUG_MODE_KEY = 'practice-hub-debug-mode';

export const useDebugMode = () => {
  const [isDebugMode, setIsDebugMode] = useState(() => {
    const stored = localStorage.getItem(DEBUG_MODE_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem(DEBUG_MODE_KEY, String(isDebugMode));
  }, [isDebugMode]);

  const toggleDebugMode = () => setIsDebugMode(prev => !prev);

  return { isDebugMode, toggleDebugMode };
};
