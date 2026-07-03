/**
 * SITE UPDATES DATA
 * 
 * Shared between UpdateTracker page and the Index page latest updates preview.
 * 
 * HOW TO ADD A NEW UPDATE:
 * 1. Add a new object to the TOP of the `updates` array below
 * 2. Fill in: date (string), title (string), and items (string array)
 * 3. Newest should be first — they display top-to-bottom in array order
 */

export interface Update {
  date: string;
  title: string;
  items: string[];
}

export const updates: Update[] = [
  {
    date: 'July 1st, 2026',
    title: 'Daily Practice + Small Features',
    items: [
      'Added daily practice with imports/exports and editable questions per day in Course Challenge',
      'Calc AB + BC getting updated',
      'Math Builder in Custom Builder recieved Parametric, Piecewise, and Vectors LateX',
    ],
  },
  {
    date: 'June 8th, 2026',
    title: 'Minor Updates and Bug Fixes',
    items: [
      'Most Math Errors and Spelling Errors have been fixed, email me if you find any!',
      'Piecewise functions were added, find in custom editor to make questions',
      'Public Presets are set up, email me to add them!',
      'Lists and SATA questions weren\'t properly being imported, fixed bug',
      'Can now duplicate parts based questions in custom editor'
    ],
  },
  {
    date: 'May 19th, 2026',
    title: 'Bug Fixes',
    items: [
      'Bugs with images loading has been fixed',
      'Africa has been updated for World History Stella CSW',
      'Can cross out options for Select All that Apply and MCQ type questions',
      'Parametric and Vectors removed from AP Precalculus as they aren\'t on the AP test'
    ],
  },
  {
    date: 'May 18th, 2026',
    title: 'Minor Updates',
    items: [
      'Website has officially been moved to Github',
      'Chemistry & Biology Units are finalized',
      'AI Prompt updated so it can extract notes properly, use Claude!',
    ],
  },
  {
    date: 'April 29th, 2026',
    title: 'Minor Updates',
    items: [
      'India Unit for World History Stella CSW is updated',
      'URL will change soon to be on github; expect an update!',
    ],
  },
  {
    date: 'April 16th, 2026',
    title: 'Minor Updates',
    items: [
      'AP CSP Updated',
      'Drivers Ed Unit 2 and 3 updated to include more relevant questions',
      'Memory training removed completely',
      'Ready to spread for other schools by updating terms for general use',
    ],
  },
  {
    date: 'March 31, 2026',
    title: 'Major Revamp',
    items: [
      'Finished Stoichiometry',
      'Added way to order questions when using in the custom editor, in order based questions',
      'Generator guide for questions integrating AI is getting updated for faster use',
      'Memory training removed and went to respective categories',
      'Drivers Ed added',
      'Working on adding per schools for major spread',
      'Expect Advertisements soon!',
    ],
  },
  {
    date: 'March 25, 2026',
    title: 'Tests Update',
    items: [
      'Adding Kohl\'s Yuan - Modern test',
      'Updating Stoichiometry currently',
      'Updates with stats',
    ],
  },
  {
    date: 'March 18, 2026',
    title: 'Bug Fixes, New Units',
    items: [
      'Updating Stoichiometry currently',
      'Bugs with question in renaissance and protestant for Stella',
      'Polar questions updated for recent test in AP Precalc',
    ],
  },
  {
    date: 'March 10, 2026',
    title: 'Timeline Data Proof, Mentions Page, Privacy Update',
    items: [
      'Redesigned Data Proof page as a clickable vertical timeline showing progress reports chronologically',
      'Merged Contributors and Reviews into a single "Mentions" page at /mentions',
      'Targeted Practice preset download now includes skipped questions alongside wrong answers',
      'Updated Privacy Policy with usage data tracking section tied to Terms of Service agreement',
    ],
  },
  {
    date: 'March 9, 2026',
    title: 'Skip All Button, Progress Fix, Privacy Update',
    items: [
      'Added "Skip All" button next to the quiz timer to skip remaining questions without marking them wrong',
      'Skipped questions are now tracked as "not done" and included in Targeted Practice alongside wrong answers',
      'Fixed progress percentage bug that could display over 100% on the last question',
      'Updated Privacy Policy with usage data tracking section tied to Terms of Service agreement',
    ],
  },
  {
    date: 'March 8, 2026',
    title: 'Data Proof Page, Bug Fixes, and Docs Cleanup',
    items: [
      'Added new Data Proof page (/data/proof) for evidence media and review cards',
      'Updated Chemistry: Reactions and Biology: Protein Synthesis for upcoming tests',
      'Fixed bugs with chemistry and redirects from other section',
      'Cleaned up management documentation to remove references to deprecated features',
      'LaTeX now only renders when explicitly wrapped in dollar signs',
      'Updated Stats to match with 3/7/26',
    ],
  },
  {
    date: 'February 28, 2026',
    title: 'Custom Creation Update',
    items: [
      'Moved Custom Quiz Creation into its own category',
      'Added Spanish Accents, Chemistry Symbols, and Arrows to FRQ',
      'Review Website got added to NeededCourses Popup',
      'Targetted Practice after finishing a quiz for more accessibility',
    ],
  },
  {
    date: 'February 27, 2026',
    title: 'Data update and extra #2',
    items: [
      'Data update for 27th Feb',
      'Updated Trigonometry Unit for AP Precalc, minor updates to AP CSP and Biology DNA Synth',
    ],
  },
  {
    date: 'February 25, 2026',
    title: 'Data update and extra',
    items: [
      'Data update for 25th Feb',
      'Fixes in World History Kohl, Fixes in AP CSP',
      'More Updates to Biology DNA Synth and Chemistry Reactions',
    ],
  },
  {
    date: 'February 22, 2026',
    title: 'Contributors Page, Tests Overhaul, UI Improvements',
    items: [
      'Created dedicated Contributors page with animated floating cards',
      'Added latest updates preview on the home page',
      'Added Contributors link to footer',
    ],
  },
  {
    date: 'February 21, 2026',
    title: 'Course Updates and UX Fixes',
    items: [
      'Updated East Asia Unit for Stella',
      'Reactions have been updated for Chemistry, not finished fully',
      'Protein Synthesis has been updated for Biology, not finished fully',
      'Fixed some questions in Biology and Chemistry to work with lists from the new update',
      'Added True/False MCQ preset button in custom topic editor for quick T/F question creation',
      'Footer redesigned with better visual hierarchy',
      'Update Tracker widened and cards redesigned for a cleaner look',
    ],
  },
  {
    date: 'February 20, 2026',
    title: 'Select All That Apply Questions, Content Update, How to Use, Update Tracker',
    items: [
      'Added new "Select All That Apply" (SATA) question type with checkbox-based selection',
      'SATA questions supported in quizzes, custom editor, parts questions, export/import',
      'Correct answers highlighted green, incorrect red, missed answers labeled',
      'Removed raw test questions to prevent pattern recognition and ensure fairness',
      'All content now sourced from teacher-provided notes, homework, and study guides',
      'Updated Privacy Policy with new Academic Honesty section',
      'Created this Update Tracker page to track all site changes',
      'Created a comprehensive How to Use guide page',
      'Redesigned footer with organized link columns',
    ],
  },
];
