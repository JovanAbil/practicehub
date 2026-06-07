export interface PublicPreset {
  id: string;            // stable unique id, e.g. "apcsp-algorithms-vocab"
  name: string;
  description?: string;
  subject: string;       // MUST match the URL subject slug
  unitId: string;        // MUST match the URL unitId slug
  questionIds: string[];
  author?: string;
}

export const publicPresets: PublicPreset[] = [
  // add entries here
];

export const getPublicPresetsForUnit = (
  subject: string,
  unitId: string
): PublicPreset[] =>
  publicPresets.filter(p => p.subject === subject && p.unitId === unitId);
