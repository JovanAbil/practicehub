/**
 * DATA PROOF PAGE — Vertical Timeline
 *
 * Displays a clickable vertical timeline of progress reports.
 * Content lives in src/data/data-proof.ts — you don't need to edit this file.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronDown, ChevronUp, Play, ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { timelineEntries } from '@/data/data-proof';
import { cn } from '@/lib/utils';

const DataProof = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setExpandedIndex(prev => (prev === i ? null : i));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/data"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Data &amp; Statistics
          </Link>

          <h1 className="text-4xl font-display font-bold mb-2">Data Proof</h1>
          <p className="text-muted-foreground mb-10">
            A chronological timeline of progress reports, analytics snapshots, and evidence backing our statistics.
          </p>

          {/* ── TIMELINE ── */}
          {timelineEntries.length === 0 ? (
            <Card className="p-8 rounded-2xl border border-dashed bg-card/50 text-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                No timeline entries yet. Add data in{' '}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">src/data/data-proof.ts</code>
              </p>
            </Card>
          ) : (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-0">
                {timelineEntries.map((entry, i) => {
                  const isExpanded = expandedIndex === i;
                  const isLast = i === timelineEntries.length - 1;

                  return (
                    <div key={i} className="relative pl-14">
                      {/* Timeline node */}
                      <button
                        onClick={() => toggle(i)}
                        className={cn(
                          'absolute left-3 top-1 z-10 h-5 w-5 rounded-full border-2 transition-all duration-200',
                          isExpanded
                            ? 'bg-primary border-primary scale-110'
                            : 'bg-background border-muted-foreground/40 hover:border-primary hover:scale-105'
                        )}
                      />

                      {/* Date header — clickable */}
                      <button
                        onClick={() => toggle(i)}
                        className={cn(
                          'w-full text-left group flex items-center justify-between gap-3 py-2 transition-colors',
                          isExpanded ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Calendar className="h-4 w-4 shrink-0 text-primary" />
                          <span className="font-semibold text-sm">{entry.date}</span>
                          <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                            — {entry.summary}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>

                      {/* Summary on mobile */}
                      {!isExpanded && (
                        <p className="text-xs text-muted-foreground sm:hidden -mt-1 mb-2">{entry.summary}</p>
                      )}

                      {/* Expanded content */}
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300 ease-in-out',
                          isExpanded ? 'max-h-[2000px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                        )}
                      >
                        {isExpanded && (
                          <div className="space-y-4 pt-2">
                            <p className="text-sm text-muted-foreground sm:hidden">{entry.summary}</p>
                            <p className="text-sm text-muted-foreground hidden sm:block">{entry.summary}</p>

                            {entry.media.map((item, mi) => (
                              <Card
                                key={mi}
                                className="overflow-hidden rounded-xl border bg-card shadow-sm"
                              >
                                {/* Media title */}
                                <div className="px-4 pt-3 pb-1">
                                  <h3 className="font-semibold text-sm flex items-center gap-2">
                                    {item.type === 'video' ? (
                                      <Play className="h-3.5 w-3.5 text-primary" />
                                    ) : (
                                      <ImageIcon className="h-3.5 w-3.5 text-primary" />
                                    )}
                                    {item.title}
                                  </h3>
                                </div>

                                {/* Media content */}
                                <div className="px-4 pb-2">
                                  {item.type === 'image' ? (
                                    <img
                                      src={item.src}
                                      alt={item.title}
                                      className="w-full rounded-lg object-cover"
                                      loading="lazy"
                                    />
                                  ) : item.src.includes('youtube.com') || item.src.includes('youtu.be') ? (
                                    <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
                                      <iframe
                                        src={item.src}
                                        title={item.title}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  ) : (
                                    <video
                                      src={item.src}
                                      controls
                                      className="w-full rounded-lg"
                                      preload="metadata"
                                    />
                                  )}
                                </div>

                                {/* Description */}
                                {item.description && (
                                  <div className="px-4 pb-3">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                )}
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Spacer between entries */}
                      {!isLast && <div className="h-2" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataProof;
