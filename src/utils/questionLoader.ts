/**
 * CENTRALIZED QUESTION LOADER
 * 
 * This utility provides all questions for the main site.
 * ALL places that load questions should use this instead of importing directly.
 * 
 * This ensures consistent behavior across:
 * - Quiz.tsx (taking quizzes)
 * - ViewAllQuestions.tsx (viewing all questions)
 * - CourseChallengePresetBuilder.tsx (building custom practice)
 * - CourseChallenge.tsx (cram mode)
 */

import { Question } from '@/types/quiz';

// ============================================
// REAL DATA IMPORTS
// ============================================
// AP Precalc
import { polynomialQuestions } from '@/data/apprecalc/polynomial-questions';
import { rationalQuestions } from '@/data/apprecalc/rational-questions';
import { exponentialQuestions } from '@/data/apprecalc/exponential-questions';
import { logarithmicQuestions } from '@/data/apprecalc/logarithmic-questions';
import { trigonometricQuestions } from '@/data/apprecalc/trigonometric-questions';
import { polarQuestions } from '@/data/apprecalc/polar-questions';
// Biology
import { biochemistryQuestions } from '@/data/biology/biochemistry-questions';
import { cellstructureQuestions } from '@/data/biology/cellstructure-questions';
import { cellenergeticsQuestions } from '@/data/biology/cellenergetics-questions';
import { cellgrowthQuestions } from '@/data/biology/cellgrowth-questions';
import { geneticsQuestions } from '@/data/biology/genetics-questions';
import { molecularQuestions } from '@/data/biology/molecular-questions';
import { evolutionQuestions } from '@/data/biology/evolution-questions';
import { ecologyQuestions } from '@/data/biology/ecology-questions';
// Chemistry
import { metricQuestions } from '@/data/chemistry/metric-questions';
import { atomicQuestions } from '@/data/chemistry/atomic-questions';
import { compoundsQuestions } from '@/data/chemistry/compounds-questions';
import { gasesQuestions } from '@/data/chemistry/gases-questions';
import { solutionsQuestions } from '@/data/chemistry/solutions-questions';
import { reactionsQuestions } from '@/data/chemistry/reactions-questions';
import { stoichiometryQuestions } from '@/data/chemistry/stoichiometry-questions';
import { acidbasesQuestions } from '@/data/chemistry/acidbases-questions';
// World History
import { religionsQuestions } from '@/data/worldhistory/religions-questions';
import { islamQuestions } from '@/data/worldhistory/islam-questions';
import { renaissanceQuestions } from '@/data/worldhistory/renaissance-questions';
import { protestantQuestions } from '@/data/worldhistory/protestant-questions';
import { eastasiaQuestions } from '@/data/worldhistory/eastasia-questions';
import { japanQuestions } from '@/data/worldhistory/japan-questions';
import { indiaQuestions } from '@/data/worldhistory/india-questions';
import { africaQuestions } from '@/data/worldhistory/africa-questions';
// Practice
import { unit1Questions } from '@/data/practice/unit1-questions';
//AP CSP
import { creativeQuestions } from '@/data/apcsp/creative-questions';
import { dataQuestions } from '@/data/apcsp/data-questions';
import { algorithmsQuestions } from '@/data/apcsp/algorithms-questions';
import { systemsQuestions } from '@/data/apcsp/systems-questions';
import { computingQuestions } from '@/data/apcsp/computing-questions';

//World History Kohl
import { chineseQuestions } from '@/data/worldhistorykohl/chinese-history-shang-song-questions';
import { chinese2Questions } from '@/data/worldhistorykohl/chinese-history-yuan-modern-china-questions';
// Temporary
//Drivers Ed
import { drivers1Questions } from '@/data/drivers/unit1-questions';
import { drivers2Questions } from '@/data/drivers/unit2-questions';
import { drivers3Questions } from '@/data/drivers/unit3-questions';
import { drivers4Questions } from '@/data/drivers/unit4-questions';
import { drivers5Questions } from '@/data/drivers/unit5-questions';
import { drivers6Questions } from '@/data/drivers/unit6-questions';


/**
 * Map of question keys to question arrays
 */
const questionMap: Record<string, Question[]> = {
  'precalc-polynomial': polynomialQuestions,
  'precalc-rational': rationalQuestions,
  'precalc-exponential': exponentialQuestions,
  'precalc-logarithmic': logarithmicQuestions,
  'precalc-trigonometric': trigonometricQuestions,
  'precalc-polar': polarQuestions,
  'biology-biochemistry': biochemistryQuestions,
  'biology-cellstructure': cellstructureQuestions,
  'biology-cellenergetics': cellenergeticsQuestions,
  'biology-cellgrowth': cellgrowthQuestions,
  'biology-genetics': geneticsQuestions,
  'biology-molecular': molecularQuestions,
  'biology-evolution': evolutionQuestions,
  'biology-ecology': ecologyQuestions,
  'chemistry-metric': metricQuestions,
  'chemistry-atomic': atomicQuestions,
  'chemistry-compounds': compoundsQuestions,
  'chemistry-gases': gasesQuestions,
  'chemistry-solutions': solutionsQuestions,
  'chemistry-reactions': reactionsQuestions,
  'chemistry-stoichiometry': stoichiometryQuestions,
  'chemistry-acidbases': acidbasesQuestions,
  'world-history-religions': religionsQuestions,
  'world-history-islam': islamQuestions,
  'world-history-renaissance': renaissanceQuestions,
  'world-history-protestant': protestantQuestions,
  'world-history-eastasia': eastasiaQuestions,
  'world-history-japan': japanQuestions,
  'world-history-india': indiaQuestions,
  'world-history-africa': africaQuestions,
  'practice-unit1': unit1Questions,
  'apcsp-creative': creativeQuestions,
  'apcsp-data': dataQuestions,
  'apcsp-algorithms': algorithmsQuestions,
  'apcsp-systems': systemsQuestions,
  'apcsp-computing': computingQuestions,
  'worldhistorykohl-chinese': chineseQuestions,
  'worldhistorykohl-chinese2': chinese2Questions,
  'drivers-drivers1': drivers1Questions,
  'drivers-drivers2': drivers2Questions,
  'drivers-drivers3': drivers3Questions,
  'drivers-drivers4': drivers4Questions,
  'drivers-drivers5': drivers5Questions,
  'drivers-drivers6': drivers6Questions,
};

/**
 * Centralized unit lists for each subject.
 * Used by CourseChallenge.tsx, CourseChallengePresetBuilder.tsx, and anywhere else that needs unit lists.
 * 
 * HOW TO ADD A NEW UNIT/TOPIC:
 * 1. Add the import and questionMap entry above
 * 2. Add the unit to the appropriate subject array below
 * 3. That's it — CourseChallenge pages will automatically pick it up
 */
const subjectUnits: Record<string, { id: string; name: string }[]> = {
  precalc: [
    { id: 'polynomial', name: 'Unit 1A - Polynomial Functions' },
    { id: 'rational', name: 'Unit 1B - Rational Functions' },
    { id: 'exponential', name: 'Unit 2A - Exponential Functions' },
    { id: 'logarithmic', name: 'Unit 2B - Logarithmic Functions' },
    { id: 'trigonometric', name: 'Unit 3A - Trigonometric Functions' },
    { id: 'polar', name: 'Unit 3B - Polar Functions' },
  ],
  biology: [
    { id: 'biochemistry', name: 'Unit 1 - Biochemistry' },
    { id: 'cellstructure', name: 'Unit 2 - Cell Structure & Function' },
    { id: 'cellenergetics', name: 'Unit 3 - Cell Energetics' },
    { id: 'cellgrowth', name: 'Unit 4 - Cell Growth & Division' },
    { id: 'genetics', name: 'Unit 5 - Genetics' },
    { id: 'molecular', name: 'Unit 6 - Molecular Biology' },
    { id: 'evolution', name: 'Unit 7 - Evolution' },
    { id: 'ecology', name: 'Unit 8 - Ecology' },
  ],
  chemistry: [
    { id: 'metric', name: 'Unit 1 - Metric Conversions' },
    { id: 'atomic', name: 'Unit 2 - Atomic Structure' },
    { id: 'compounds', name: 'Unit 3 - Compounds' },
    { id: 'gases', name: 'Unit 4 - Gases' },
    { id: 'solutions', name: 'Unit 5 - Solutions' },
    { id: 'reactions', name: 'Unit 6 - Reactions' },
    { id: 'stoichiometry', name: 'Unit 7 - Stoichiometry' },
    { id: 'acidbases', name: 'Unit 8 - Acids & Bases' },
  ],
  'world-history': [
    { id: 'religions', name: 'Unit 1 - Religions' },
    { id: 'islam', name: 'Unit 2 - Islam' },
    { id: 'renaissance', name: 'Unit 3 - Renaissance' },
    { id: 'protestant', name: 'Unit 4 - Protestant' },
    { id: 'eastasia', name: 'Unit 5 - East Asia' },
    { id: 'japan', name: 'Unit 6 - Japan' },
    { id: 'india', name: 'Unit 7 - India' },
    { id: 'africa', name: 'Unit 8 - Africa' },
  ],
  apcsp: [
    { id: 'creative', name: 'Creative Development' },
    { id: 'data', name: 'Data' },
    { id: 'algorithms', name: 'Algorithms and Programming' },
    { id: 'systems', name: 'Computer Systems and Networks' },
    { id: 'computing', name: 'Impact of Computing' },
  ],
  temporary: [
    //{ id: 'precalc3b', name: 'AP Precalc 3B' },
  ],
  worldhistorykohl: [
    { id: 'chinese', name: 'Chinese Shang - Song' },
    { id: 'chinese2', name: 'Chinese Yuan - Modern' },
  ],
  drivers: [
    { id: 'drivers1', name: 'Unit 1' }, 
    { id: 'drivers2', name: 'Unit 2' },
    { id: 'drivers3', name: 'Unit 3' },
    { id: 'drivers4', name: 'Unit 4' },
    { id: 'drivers5', name: 'Unit 5' },
    { id: 'drivers6', name: 'Unit 6' },
  ],
};

/**
 * Subject display names for titles
 */
const subjectTitles: Record<string, string> = {
  precalc: 'AP Precalculus',
  biology: 'Biology',
  chemistry: 'Chemistry',
  'world-history': 'World History',
  
  apcsp: 'AP CSP',
  temporary: 'Temporary Practice',
  worldhistorykohl: 'World History (Kohl)',
  drivers: 'Drivers Ed',
};

/**
 * Get units for a subject (used by CourseChallenge pages)
 */
export const getSubjectUnits = (subject: string): { id: string; name: string }[] => {
  return subjectUnits[subject] || [];
};

/**
 * Get display title for a subject
 */
export const getSubjectTitle = (subject: string): string => {
  return subjectTitles[subject] || 'Course';
};

/**
 * Get questions for a specific topic
 */
export const getQuestions = (questionKey: string): Question[] => {
  return questionMap[questionKey] || [];
};

/**
 * Get a complete question map with all topics
 */
export const getQuestionMap = (): Record<string, Question[]> => {
  return { ...questionMap };
};

// Export the map for direct access if needed
export { questionMap };
