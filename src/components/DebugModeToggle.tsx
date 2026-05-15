import { Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDebugMode } from '@/hooks/useDebugMode';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SHOW_DEBUG_TOGGLE } from '@/components/DebugToggleConfig';

export const DebugModeToggle = () => {
  const { isDebugMode, toggleDebugMode } = useDebugMode();

  if (!SHOW_DEBUG_TOGGLE) return null;

  return (
    <div className="fixed top-4 right-28 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isDebugMode ? 'default' : 'outline'}
            size="icon"
            onClick={toggleDebugMode}
            className={isDebugMode ? 'bg-primary' : 'bg-background/80 backdrop-blur-sm'}
          >
            <Bug className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Debug Mode: {isDebugMode ? 'ON' : 'OFF'}</p>
          <p className="text-xs text-muted-foreground">Shows ad placements</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
