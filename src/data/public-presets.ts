export interface PublicPreset {
  id: string;            // stable unique id, e.g. "apcsp-algorithms-vocab"
  name: string;          // shown as the card title
  description?: string;  // optional one-liner
  subject: string;       // MUST match the URL subject slug
  unitId: string;        // MUST match the URL unit slug
  questionIds: string[]; // ids from that unit's -questions.ts file
  author?: string;       // optional credit shown next to the count
}

export const publicPresets: PublicPreset[] = [ /* ... */ ];

export const getPublicPresetsForUnit = (
  subject: string,
  unitId: string
): PublicPreset[];
