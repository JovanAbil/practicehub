export interface PublicPreset {
  id: string;
  name: string;
  description?: string;
  subject: string;
  unitId: string;
  questionIds: string[];
  author?: string;
}

const files = import.meta.glob<unknown>(
  './public-presets/*/*/*.json',
  { eager: true, import: 'default' }
);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isIdList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.length > 0 && value.every(isText);

const readPreset = (path: string, value: unknown): PublicPreset | null => {
  if (!isRecord(value) ||
      !isText(value.id) || !isText(value.name) ||
      !isText(value.subject) || !isText(value.unitId) ||
      !isIdList(value.questionIds) ||
      (value.description !== undefined && typeof value.description !== 'string') ||
      (value.author !== undefined && typeof value.author !== 'string')) {
    console.error(`Invalid public preset metadata: ${path}`);
    return null;
  }
  if (!path.startsWith(`./public-presets/${value.subject}/${value.unitId}/`)) {
    console.error(`Public preset folder/metadata mismatch: ${path}`);
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    subject: value.subject,
    unitId: value.unitId,
    questionIds: [...new Set(value.questionIds)],
    description: typeof value.description === 'string' ? value.description : undefined,
    author: typeof value.author === 'string' ? value.author : undefined,
  };
};

const seen = new Set<string>();
export const publicPresets: PublicPreset[] = [];
for (const [path, value] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
  const preset = readPreset(path, value);
  if (!preset) continue;
  if (seen.has(preset.id)) {
    console.error(`Duplicate public preset id: ${preset.id} (${path})`);
    continue;
  }
  seen.add(preset.id);
  publicPresets.push(preset);
}

export const getPublicPresetsForUnit = (subject: string, unitId: string) =>
  publicPresets.filter(p => p.subject === subject && p.unitId === unitId);

export const getPublicPresetsForCourseChallenge = (subject: string) =>
  publicPresets.filter(p => p.subject === subject && p.unitId === 'course-challenge');

// The new course library includes both unit presets and cross-unit presets.
export const getPublicPresetsForSubject = (subject: string) =>
  publicPresets.filter(p => p.subject === subject);
