import { useState, useEffect, useCallback } from 'react';

interface UseQuizTimerReturn {
  seconds: number;
  formatted: string;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  set: (seconds: number) => void;
  stop: () => number;
}

export const useQuizTimer = (): UseQuizTimerReturn => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  const set = useCallback((value: number) => {
    setSeconds(Math.max(0, Math.floor(value)));
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    return seconds;
  }, [seconds]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    formatted: formatTime(seconds),
    isRunning,
    start,
    pause,
    reset,
    set,
    stop,
  };
};

export default useQuizTimer;