/**
 * DATA PROOF — Timeline Entries & Reviews
 *
 * This file is the single source of truth for the Data Proof timeline page.
 * It contains two sections:
 *   1. timelineEntries — date-grouped progress reports shown on a vertical timeline
 *   2. reviews         — student/teacher review cards (displayed on the Mentions page)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW TIMELINE ENTRY
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Find the date group you want to add to, or create a new one.
 *   2. Each date group has a `date` string and a `media` array.
 *   3. For IMAGES:
 *        - Place the file in  public/images/dataproof/
 *        - Set  type: 'image'
 *        - Set  src:  '/images/dataproof/your-file.png'
 *   4. For VIDEOS:
 *        - Upload to YouTube or place MP4/MOV in public/images/dataproof/
 *        - Set  type: 'video'
 *        - Set  src:  to embed URL or local path
 *   5. Fill in  title  and optional  description.
 *   6. The array is sorted chronologically — oldest FIRST, newest LAST.
 *      This means new entries go at the BOTTOM.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW REVIEW (shown on Mentions page)
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Add a new object to the `reviews` array below.
 *   2. Set  quote, author, role (optional), size ('sm' | 'md' | 'lg').
 *   3. Newest entries go at the TOP.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ProofMedia {
  type: 'image' | 'video';
  src: string;
  title: string;
  description?: string;
}

export interface TimelineEntry {
  /** Date label shown on the timeline node */
  date: string;
  /** Summary label for the date group */
  summary: string;
  /** Array of media items for this date */
  media: ProofMedia[];
}

export interface Review {
  quote: string;
  author: string;
  role?: string;
  size: 'sm' | 'md' | 'lg';
}

/**
 * TIMELINE ENTRIES — chronological (oldest FIRST, newest LAST)
 * The page renders top = earliest, scroll down = later.
 */
export const timelineEntries: TimelineEntry[] = [
  // ── Oldest entry — start of documentation ──
  {
    date: 'Janurary 19, 2026 - March 8, 2026',
    summary: 'First Documentation & Analytics Snapshot',
    media: [
      {
        type: 'video',
        src: '/images/dataproof/DataProof1.mov',
        title: 'Site Walkthrough',
        description:
          "A recorded walkthrough demonstrating the analytics of the website, first progress check. The reason the pageviews is lower is because the pageviewer isn't properly updated; from March 8th onward, it should be updated constantly and regularly to match with the actual number.",
      },
      {
        type: 'image',
        src: '/images/dataproof/jan19th-march8thAnalytics',
        title: 'Analytics Overview',
        description:
          'Counter.dev analytics dashboard showing visitor traffic over this period. Shows uniqueness on each visitor.',
      },
      {
        type: 'image',
        src: '/images/dataproof/jan19th-march8thdata',
        title: 'Detailed Analytics Data',
        description:
          'Detailed breakdown of page views, referrers, and visitor data. For reference, website development started November of 2025; launched midterm week of 2026.',
      },
    ],
  },
  // ── Add newer entries BELOW ──
];

/**
 * REVIEWS — student / teacher testimonials
 * Displayed on the Mentions page (/mentions).
 * Add new entries at the TOP.  Use varying `size` values for a scattered look.
 */
export const reviews: Review[] = [
  // ── Placeholder — replace with real reviews ──
  // { quote: '', author: '', size: 'md' },
];
