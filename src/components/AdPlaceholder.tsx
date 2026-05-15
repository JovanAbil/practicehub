import { useDebugMode } from '@/hooks/useDebugMode';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdPlaceholderProps {
  position: 'sidebar-left' | 'sidebar-right' | 'bottom' | 'inline';
  className?: string;
}

export const AdPlaceholder = ({ position, className = '' }: AdPlaceholderProps) => {
  const { isDebugMode } = useDebugMode();
  const isMobile = useIsMobile();

  if (!isDebugMode) return null;

  // On mobile, hide sidebar ads completely (they would be unusable)
  if (isMobile && (position === 'sidebar-left' || position === 'sidebar-right')) {
    return null;
  }

  const positionStyles = {
    'sidebar-left': 'fixed left-2 top-1/2 -translate-y-1/2 w-[120px] h-[600px] pointer-events-none' + ' max-h-[calc(100vh-160px)]',
    'sidebar-right': 'fixed right-2 top-1/2 -translate-y-1/2 w-[120px] h-[600px] pointer-events-none' + ' max-h-[calc(100vh-160px)]',
    'bottom': 'w-full h-[90px]',
    'inline': 'w-full h-[250px]',
  };

  return (
    <div
      className={`bg-muted/50 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center ${positionStyles[position]} ${className}`}
    >
      <div className="text-center p-4">
        <p className="text-sm font-medium text-primary">Ad Placeholder</p>
        <p className="text-xs text-muted-foreground">{position}</p>
      </div>
    </div>
  );
};
