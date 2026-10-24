/**
 * EXTERNAL STUDY RESOURCES
 * 
 * Add links to helpful external study resources here.
 * These will appear on the "Other" category page above the Contributors section.
 * 
 * FORMAT:
 * {
 *   title: 'Display Name',        // What users will see
 *   url: 'https://example.com',   // The link URL
 *   description: 'Short description' // Brief description (optional but recommended)
 * }
 * 
 * EXAMPLE:
 * {
 *   title: 'Khan Academy',
 *   url: 'https://www.khanacademy.org',
 *   description: 'Free courses on math, science, and more'
 * }
 */

export interface ExternalResource {
  title: string;
  url: string;
  description?: string;
}

// ============================================
// ADD YOUR STUDY RESOURCE LINKS BELOW
// ============================================

export const externalStudyResources: ExternalResource[] = [
  // Example entries - replace or add your own:
  {
    title: 'Flipped Math',
    url: 'https://www.flippedmath.com/',
    description: 'One of the best math websites for AP Calculus, AP and regular Precalc, Algebra 1+2, Geometry, and AP Stats'
  },
  {
    title: 'AP FRQs',
    url: 'https://apfrqs.com/',
    description: 'FRQs for every AP'
  },
  {
    title: 'Vocab Test',
    url: 'https://www.vocabtest.com/',
    description: 'Vocab Practice'
  },
  {
    title: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    description: 'Free courses on math, science, and more'
  },
];
