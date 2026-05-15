/**
 * STUDY RESOURCES CONFIGURATION
 * 
 * HOW TO ADD LINKS TO A SPECIFIC UNIT:
 * 1. Find the subject and unit combination (e.g., 'precalc-polynomial')
 * 2. Add an array of resource objects with 'title' and 'url'
 * 3. You can add as many links as you want
 * 
 * HOW TO ADD LINKS TO COURSE CHALLENGES:
 * 1. Find the subject (e.g., 'precalc')
 * 2. Add to the 'courseChallenge' object with the same structure
 * 3. You can add as many links as you want
 * 
 * EXAMPLE FORMAT:
 * 'subject-unitId': [
 *   { title: 'Link Name', url: 'https://example.com' },
 *   { title: 'Another Link', url: 'https://another-example.com' },
 * ]
 */

export interface StudyResource {
  title: string;
  url: string;
}

// UNIT-SPECIFIC STUDY RESOURCES
// Format: 'subject-unitId'
export const unitStudyResources: Record<string, StudyResource[]> = {
  // AP Precalculus Units - Example with filler links
  'precalc-polynomial': [],
  'precalc-rational': [
    { title: 'Rational', url: 'https://www.khanacademy.org/math/math3/x5549cc1686316ba5:rationals/x5549cc1686316ba5:rational-models/quiz/x5549cc1686316ba5:rationals-quiz-2' },
  ],
  'precalc-exponential': [],
  'precalc-logarithmic': [],
  'precalc-trigonometric': [],
  'precalc-polar': [],
  'precalc-parametric': [],
  'precalc-vectorsMatrices': [],

  // Biology Units - Add your own links here
  'biology-biochemistry': [],
  'biology-cellstructure': [],
  'biology-cellenergetics': [],
  'biology-cellgrowth': [],
  'biology-genetics': [],
  'biology-molecular': [],
  'biology-evolution': [],
  'biology-ecology': [],

  // AP Biology Units - Add your own links here
  'apbio-biochemistry': [],
  'apbio-cellstructure': [],
  'apbio-cellenergetics': [],
  'apbio-cellgrowth': [],
  'apbio-genetics': [],
  'apbio-molecular': [],
  'apbio-evolution': [],
  'apbio-ecology': [],

  // Chemistry Units - Add your own links here
  'chemistry-metric': [
    { title: 'Scientific Notation', url: 'https://chemquiz.net/sci/' },
    { title: 'Significant Figures', url: 'https://chemquiz.net/sig/' },
  ],
  'chemistry-atomic': [
    { title: 'Isotopes', url: 'https://chemquiz.net/iso/' },
    { title: 'Average Atomic Mass', url: 'https://chemquiz.net/aam/' },
    { title: 'Electron Configuration', url: 'https://chemquiz.net/ele/' },
  ],
  'chemistry-compounds': [],
  'chemistry-gases': [],
  'chemistry-solutions': [],
  'chemistry-reactions': [],
  'chemistry-stoichiometry': [],
  'chemistry-acidbases': [],

  // AP Chemistry Units - Add your own links here
  'apchem-metric': [],
  'apchem-atomic': [],
  'apchem-compounds': [],
  'apchem-gases': [],
  'apchem-solutions': [],
  'apchem-reactions': [],
  'apchem-stoichiometry': [],
  'apchem-acidbases': [],

  // World History Units - Add your own links here
  'world-history-religions': [],
  'world-history-unit2': [],
  'world-history-unit3': [],
  'world-history-unit4': [],
  'world-history-unit5': [],
  'world-history-unit6': [],
  'world-history-unit7': [],
  'world-history-unit8': [],
  'world-history-unit9': [],
  'world-history-unit10': [],
  'world-history-unit11': [],

  // World History Kohl Units - Add your own links here
  'world-history-kohl-prehistory': [],
  'world-history-kohl-unit2': [],
  'world-history-kohl-unit3': [],
  'world-history-kohl-unit4': [],
  'world-history-kohl-unit5': [],
  'world-history-kohl-unit6': [],
  'world-history-kohl-unit7': [],
  'world-history-kohl-unit8': [],
  'world-history-kohl-unit9': [],
  'world-history-kohl-unit10': [],
  'world-history-kohl-unit11': [],
  'world-history-kohl-unit12': [],
  'world-history-kohl-unit13': [],
  'world-history-kohl-unit14': [],
  // Add more units as needed...
};

// COURSE CHALLENGE STUDY RESOURCES
// Format: 'subject'
export const courseChallengeResources: Record<string, StudyResource[]> = {
  // Example with filler links
  'precalc': [],
  'biology': [],
  'apbio': [
    { title: 'Khan Academy', url: 'https://www.khanacademy.org/science/ap-biology' },
  ],
  'chemistry': [
    { title: 'ChemQuiz', url: 'https://chemquiz.net/quizzes/' },
  ],
  'apchem': [
    { title: 'Khan Academy', url: 'https://www.khanacademy.org/science/ap-chemistry-beta' },
  ],
  'world-history': [],
  'world-history-kohl': [],
  'apush': [
    { title: 'Khan Academy - APUSH', url: 'https://www.khanacademy.org/humanities/ap-us-history/' },
    { title: 'High School Test Prep - APUSH', url: 'https://highschooltestprep.com/ap/us-history/' },
  ],
  
  // Add more subjects as needed...
};
