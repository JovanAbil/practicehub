import type { SectionVideo as SectionVideoType } from '@/data/how-to-use-videos';

interface SectionVideoProps {
  video: SectionVideoType;
}

export const SectionVideo = ({ video }: SectionVideoProps) => {
  return (
    <div className="mb-4 rounded-lg overflow-hidden border border-border bg-muted/30">
      <video
        src={video.src}
        poster={video.poster}
        controls
        preload="metadata"
        className="w-full max-h-[400px] object-contain bg-black"
        aria-label={video.label}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
