import { useState, useEffect } from 'react';
import { Moon, Sun, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useLockInMode } from '@/hooks/usePopupSettings';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const LOCK_IN_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

const formatTimeRemaining = (ms: number): string => {
  if (ms <= 0) return 'Expired';
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s remaining`;
  } else {
    return `${seconds}s remaining`;
  }
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLockIn, toggleLockIn } = useLockInMode();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!isLockIn) {
      setTimeRemaining('');
      return;
    }

    const updateTime = () => {
      const timestamp = localStorage.getItem('popup_lock_in_timestamp');
      if (!timestamp) {
        setTimeRemaining('');
        return;
      }
      const elapsed = Date.now() - parseInt(timestamp, 10);
      const remaining = LOCK_IN_DURATION_MS - elapsed;
      setTimeRemaining(formatTimeRemaining(remaining));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isLockIn]);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="bg-card/80 backdrop-blur-sm border border-border shadow-md hover:bg-muted"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLockIn}
            className={`bg-card/80 backdrop-blur-sm border shadow-md hover:bg-muted ${
              isLockIn 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border text-foreground'
            }`}
          >
            {isLockIn ? (
              <Lock className="h-5 w-5" />
            ) : (
              <Unlock className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Lock In Mode</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Lock In: {isLockIn ? 'ON' : 'OFF'}</p>
          <p className="text-xs text-muted-foreground">
            {isLockIn ? 'No distractions - popups disabled' : 'Disable all popups'}
          </p>
          {isLockIn && timeRemaining && (
            <p className="text-xs text-primary font-medium mt-1">{timeRemaining}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
