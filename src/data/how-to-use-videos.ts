/**
 * How-to-Use Section Videos Configuration
 *
 * Each key maps to a section ID on the /how-to-use page.
 * Videos are displayed at the top of each section card.
 *
 * HOW TO ADD A VIDEO:
 * 1. Record/obtain the video file (.mp4, .webm recommended)
 * 2. Place it in public/videos/how-to-use/
 * 3. Add an entry below with the section key and video path
 * 4. The video will automatically appear in that section
 *
 * SUPPORTED FORMATS: .mp4 (best compatibility), .webm (smaller size)
 * RECOMMENDED: Keep videos under 10MB for fast loading
 *
 * Section keys match the section IDs in HowToUse.tsx:
 * - getting-started
 * - quiz-modes
 * - question-types
 * - keyboard-controls
 * - custom-units
 * - quiz-features
 * - troubleshooting
 * - tips
 */

export interface SectionVideo {
  /** Path relative to public folder, e.g. "/videos/how-to-use/getting-started.mp4" */
  src: string;
  /** Alt text / accessible label for the video */
  label: string;
  /** Optional poster image shown before play (path from public/) */
  poster?: string;
}

/**
 * Map of section IDs to their tutorial videos.
 * Leave a section out (or set to null) to show no video for that section.
 */
export const howToUseVideos: Record<string, SectionVideo | null> = {
  'getting-started': null,
  'quiz-modes': null,
  'question-types': null,
  'keyboard-controls': null,
  'custom-units': null,
  'quiz-features': null,
  'troubleshooting': null,
  'tips': null,
};
