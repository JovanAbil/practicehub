/**
 * REAL TESTS QUESTION LOADER
 * 
 * Separate question loader for the /tests page.
 * This loads from src/data/real-tests/ which duplicates (re-exports) 
 * the main chemistry, biology, and world history data.
 * 
 * To add test-specific questions that differ from the main site,
 * replace the re-export in the relevant file with your own array.
 */

import { Question } from '@/types/quiz';

// Chemistry
import { metricQuestions } from '@/data/real-tests/chemistry/metric-questions';
import { atomicQuestions } from '@/data/real-tests/chemistry/atomic-questions';
import { compoundsQuestions } from '@/data/real-tests/chemistry/compounds-questions';
import { gasesQuestions } from '@/data/real-tests/chemistry/gases-questions';
import { solutionsQuestions } from '@/data/real-tests/chemistry/solutions-questions';
import { reactionsQuestions } from '@/data/real-tests/chemistry/reactions-questions';
import { stoichiometryQuestions } from '@/data/real-tests/chemistry/stoichiometry-questions';
import { acidbasesQuestions } from '@/data/real-tests/chemistry/acidbases-questions';

// Biology
import { biochemistryQuestions } from '@/data/real-tests/biology/biochemistry-questions';
import { cellstructureQuestions } from '@/data/real-tests/biology/cellstructure-questions';
import { cellenergeticsQuestions } from '@/data/real-tests/biology/cellenergetics-questions';
import { cellgrowthQuestions } from '@/data/real-tests/biology/cellgrowth-questions';
import { geneticsQuestions } from '@/data/real-tests/biology/genetics-questions';
import { molecularQuestions } from '@/data/real-tests/biology/molecular-questions';
import { evolutionQuestions } from '@/data/real-tests/biology/evolution-questions';
import { ecologyQuestions } from '@/data/real-tests/biology/ecology-questions';

// World History
import { religionsQuestions } from '@/data/real-tests/worldhistory/religions-questions';
import { islamQuestions } from '@/data/real-tests/worldhistory/islam-questions';
import { renaissanceQuestions } from '@/data/real-tests/worldhistory/renaissance-questions';
import { protestantQuestions } from '@/data/real-tests/worldhistory/protestant-questions';
import { eastasiaQuestions } from '@/data/real-tests/worldhistory/eastasia-questions';


/**
 * Categories and their units for the tests page
 */
export const testsCategories = [
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: 'science',
    units: [
      { id: 'metric', name: 'Matter and Measurement' },
      { id: 'atomic', name: 'Atomic Theory' },
      { id: 'compounds', name: 'Compounds' },
      { id: 'gases', name: 'Gases' },
      { id: 'solutions', name: 'Solutions' },
      { id: 'reactions', name: 'Chemical Reactions' },
      { id: 'stoichiometry', name: 'Stoichiometry' },
      { id: 'acidbases', name: 'Acids and Bases' },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    color: 'science',
    units: [
      { id: 'biochemistry', name: 'BioChem' },
      { id: 'cellstructure', name: 'Cell Structure & Functions' },
      { id: 'cellenergetics', name: 'Cell Energetics' },
      { id: 'cellgrowth', name: 'Cell Growth & Division' },
      { id: 'genetics', name: 'Genetics' },
      { id: 'molecular', name: 'Molecular Biology' },
      { id: 'evolution', name: 'Evolution' },
      { id: 'ecology', name: 'Ecology' },
    ],
  },
  {
    id: 'world-history',
    name: 'World History',
    color: 'social',
    units: [
      { id: 'religions', name: 'Religions' },
      { id: 'islam', name: 'Islam' },
      { id: 'renaissance', name: 'Renaissance' },
      { id: 'protestant', name: 'Protestant' },
      { id: 'eastasia', name: 'East Asia Unit' },
    ],
  },
];

/**
 * Question map for tests - maps 'subject-unitId' to questions
 */
export const testsQuestionMap: Record<string, Question[]> = {
  // Chemistry
  'chemistry-metric': metricQuestions,
  'chemistry-atomic': atomicQuestions,
  'chemistry-compounds': compoundsQuestions,
  'chemistry-gases': gasesQuestions,
  'chemistry-solutions': solutionsQuestions,
  'chemistry-reactions': reactionsQuestions,
  'chemistry-stoichiometry': stoichiometryQuestions,
  'chemistry-acidbases': acidbasesQuestions,
  // Biology
  'biology-biochemistry': biochemistryQuestions,
  'biology-cellstructure': cellstructureQuestions,
  'biology-cellenergetics': cellenergeticsQuestions,
  'biology-cellgrowth': cellgrowthQuestions,
  'biology-genetics': geneticsQuestions,
  'biology-molecular': molecularQuestions,
  'biology-evolution': evolutionQuestions,
  'biology-ecology': ecologyQuestions,
  // World History
  'world-history-religions': religionsQuestions,
  'world-history-islam': islamQuestions,
  'world-history-renaissance': renaissanceQuestions,
  'world-history-protestant': protestantQuestions,
  'world-history-eastasia': eastasiaQuestions,
};

/**
 * Get questions for a specific test topic
 */
export const getTestQuestions = (questionKey: string): Question[] => {
  return testsQuestionMap[questionKey] || [];
};
