import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HardDrive, AlertTriangle, Download, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'custom-units-data';
const MAX_STORAGE_BYTES = 5 * 1024 * 1024; // 5MB typical localStorage limit

const getStorageUsage = (): { usedBytes: number; percentage: number } => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const usedBytes = data ? new Blob([data]).size : 0;
    const percentage = Math.min((usedBytes / MAX_STORAGE_BYTES) * 100, 100);
    return { usedBytes, percentage };
  } catch {
    return { usedBytes: 0, percentage: 0 };
  }
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

interface StorageUsageBarProps {
  showFullWarning?: boolean;
}

export const StorageUsageBar = ({ showFullWarning = false }: StorageUsageBarProps) => {
  const { usedBytes, percentage } = getStorageUsage();
  
  const getColorClass = () => {
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-other';
  };

  const isNearLimit = percentage >= 70;
  const isAtLimit = percentage >= 90;

  return (
    <div className="flex flex-col gap-2">
      {/* Compact bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
        <HardDrive className={`h-3.5 w-3.5 shrink-0 ${isAtLimit ? 'text-destructive' : 'text-muted-foreground'}`} />
        <div className="flex items-center gap-2">
          <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
            <div 
              className={`h-full transition-all ${getColorClass()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className={`text-xs whitespace-nowrap ${isAtLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
            {formatBytes(usedBytes)} / 5 MB
          </span>
        </div>
      </div>

      {/* Full warning when storage is near/at limit */}
      {showFullWarning && isNearLimit && (
        <Alert variant={isAtLimit ? 'destructive' : 'default'} className="mt-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            {isAtLimit ? 'Storage Full!' : 'Storage Almost Full'}
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-3">
            <p className="text-sm">
              {isAtLimit 
                ? "You've reached the 5 MB browser storage limit. Saving new content may fail."
                : `You're using ${percentage.toFixed(0)}% of the 5 MB browser storage limit.`
              }
            </p>
            
            <div className="text-sm space-y-2">
              <p className="font-medium">To fix this:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li className="flex items-start gap-1">
                  <span className="flex-1">
                    <Download className="inline h-3 w-3 mr-1" />
                    <strong>Download your custom courses</strong> using the download button next to each unit
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="flex-1">
                    <Trash2 className="inline h-3 w-3 mr-1" />
                    <strong>Delete old/unused topics</strong> or entire units you no longer need
                  </span>
                </li>
                <li>
                  If storage is completely full, <strong>clear your browser's site data</strong> for this site and re-import your downloaded courses
                </li>
              </ol>
            </div>

            <div className="p-3 bg-muted rounded-md text-sm">
              <p className="font-medium mb-1">💡 Tip for large courses:</p>
              <p className="text-muted-foreground">
                Large courses with many images may need to be used one at a time. Download them, clear storage, 
                and import only what you're actively studying.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

// Separate component for inline storage warning
export const StorageWarningBanner = () => {
  const { percentage } = getStorageUsage();
  
  if (percentage < 90) return null;
  
  return (
    <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-destructive">Storage limit reached!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Download your courses before clearing browser data. Large courses may need to be imported one at a time.
          </p>
        </div>
      </div>
    </div>
  );
};
