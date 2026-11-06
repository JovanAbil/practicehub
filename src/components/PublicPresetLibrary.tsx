import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, ListPlus, Play, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { PublicPreset } from '@/data/public-presets';
import type { Question } from '@/types/quiz';

interface Props {
  presets: PublicPreset[];
  questions: Question[];
  unitLabels?: Record<string, string>;
  onUse: (preset: PublicPreset, questions: Question[]) => void;
  onSelect: (preset: PublicPreset, ids: string[]) => void;
  onSave: (preset: PublicPreset, ids: string[]) => void;
}

const PublicPresetLibrary = ({
  presets, questions, unitLabels = {}, onUse, onSelect, onSave,
}: Props) => {
  if (presets.length === 0) return null;
  const questionMap = new Map(questions.map(q => [q.id, q]));
  const groups = [...new Set(presets.map(p => p.unitId))];

  const resolve = (preset: PublicPreset) => {
    const matching: Question[] = [];
    for (const id of new Set(preset.questionIds)) {
      const question = questionMap.get(id);
      if (question) matching.push(question);
    }
    return matching;
  };

  const run = (preset: PublicPreset, action: 'use' | 'select' | 'save') => {
    const matching = resolve(preset);
    if (matching.length === 0) {
      toast.error('No matching questions are available.');
      return;
    }
    const missing = preset.questionIds.length - matching.length;
    if (missing > 0) toast.warning(`${missing} unavailable questions were left out.`);
    if (action === 'use') onUse(preset, matching);
    else if (action === 'select') onSelect(preset, matching.map(q => q.id));
    else onSave(preset, matching.map(q => q.id));
  };

  const download = (preset: PublicPreset) => {
    // Download the definition, not a device-specific filtered subset.
    const data = { version: 1, preset: {
      name: preset.name, subject: preset.subject,
      unitId: preset.unitId, questionIds: preset.questionIds,
    } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mb-6 min-w-0 space-y-4" aria-label="Public Presets">
      <h2 className="text-lg font-semibold">Public Presets</h2>
      {groups.map(unitId => (
        <div key={unitId} className="min-w-0 space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {unitId === 'course-challenge' ? 'Course Challenge' : unitLabels[unitId] || unitId}
          </h3>
          {presets.filter(p => p.unitId === unitId).map(preset => {
            const available = resolve(preset).length;
            return (
              <Card key={preset.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 p-3">
                <div className="min-w-0 flex-1 basis-48 break-words">
                  <p className="font-medium">{preset.name}</p>
                  {preset.description && <p className="text-sm text-muted-foreground">{preset.description}</p>}
                  <p className="text-xs text-muted-foreground">
                    {available}/{preset.questionIds.length} questions
                    {preset.author ? ` · ${preset.author}` : ''}
                  </p>
                </div>
                <div className="flex max-w-full flex-wrap gap-2">
                  <Button size="sm" disabled={available === 0} onClick={() => run(preset, 'use')}>
                    <Play className="mr-1 h-3 w-3" /> Use
                  </Button>
                  <Button size="sm" variant="outline" disabled={available === 0} onClick={() => run(preset, 'select')}>
                    <ListPlus className="mr-1 h-3 w-3" /> Select
                  </Button>
                  <Button size="sm" variant="outline" disabled={available === 0} onClick={() => run(preset, 'save')}>
                    <Save className="mr-1 h-3 w-3" /> Save
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => download(preset)}
                    aria-label={`Download ${preset.name}`} title={`Download ${preset.name}`}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default PublicPresetLibrary;
