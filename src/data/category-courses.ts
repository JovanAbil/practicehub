/**
 * Category Course Configuration
 * 
 * Defines which courses appear in each category, separated into:
 * - AP / Universal courses (shown at the top for everyone)
 * - School-specific courses (shown under the school's heading)
 * 
 * To add/remove courses per school, edit the schoolCourses entries.
 * See src/management/16-SCHOOLS-GUIDE.md for documentation.
 */

export interface CourseEntry {
  id: string;
  name: string;
  /** The subject key used in questionLoader (e.g., 'biology', 'precalc') */
  subject: string;
  units: { id: string; name: string }[];
  /** If true, show "Coming Soon" instead of units */
  comingSoon?: boolean;
  /** If true, show Course Challenge button */
  hasChallenge?: boolean;
}


// ============================================
// MATH CATEGORY
// ============================================

/** AP/Universal math courses — shown at top */
export const mathApCourses: CourseEntry[] = [
  {
    id: 'calcab',
    name: 'AP Calculus AB',
    subject: 'calcab',
    units: [
      { id: 'limits', name: 'Limits' },
      { id: 'derivative', name: 'Derivatives' },
      { id: 'differentiation', name: 'Differentiation' },
      { id: 'contextualdifferentiation', name: 'Contextual Differentiation' },
      { id: 'analyticaldifferentiation', name: 'Analytical Differentiation' },
      { id: 'integrals', name: 'Integrals' },
      { id: 'differential', name: 'Differential' },
      { id: 'integration', name: 'Integration' },
    ],
  },
  {
    id: 'calcbc',
    name: 'AP Calculus BC',
    subject: 'calcbc',
    units: [
      { id: 'limits', name: 'Limits' },
      { id: 'derivative', name: 'Derivatives' },
      { id: 'differentiation', name: 'Differentiation' },
      { id: 'contextualdifferentiation', name: 'Contextual Differentiation' },
      { id: 'analyticaldifferentiation', name: 'Analytical Differentiation' },
      { id: 'integrals', name: 'Integrals' },
      { id: 'differential', name: 'Differential' },
      { id: 'integration', name: 'Integration' },
      { id: 'parametricpolar', name: 'Parametric and Polar' },
      { id: 'sequencesseries', name: 'Sequences and Series' },
    ],
  },
  {
    id: 'precalc',
    name: 'AP Precalculus',
    subject: 'precalc',
    units: [
      { id: 'polynomial', name: 'Polynomial' },
      { id: 'rational', name: 'Rational' },
      { id: 'exponential', name: 'Exponential' },
      { id: 'logarithmic', name: 'Logarithmic' },
      { id: 'trigonometric', name: 'Trigonometric' },
      { id: 'polar', name: 'Polar' },
      { id: 'parametric', name: 'Parametric' },
      { id: 'vectorsMatrices', name: 'VectorsMatrices' },
      { id: 'rules', name: 'Precalc Rules' },
    ],
  },
];

/** School-specific math courses: schoolId → courses */
export const mathSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'math1',
      name: 'Math 1',
      subject: 'math1',
      units: [],
      comingSoon: true,
    },
  ],
};


// ============================================
// SCIENCE CATEGORY
// ============================================

/** AP/Universal science courses — shown at top */
export const scienceApCourses: CourseEntry[] = [
  {
      id: 'apchem',
      name: 'AP Chem',
      subject: 'apchem',
      units: [
        { id: 'basics', name: 'Intro to AP Chem' },
        { id: 'atomic', name: 'Atomic Structure and Properties' },
        { id: 'thermochem', name: 'Thermochemistry' },
        { id: 'compounds', name: 'Compounds, Bonding, and Mixtures' },
        { id: 'kinetics', name: 'Kinetics' },
        { id: 'equilibrium', name: 'Equilibrium' },
        { id: 'acidsbases', name: 'Acids and Bases' },
        { id: 'thermodynamics', name: 'Thermodynamics and Electrochemistry' }
      ],
    },
];

/** School-specific science courses */
export const scienceSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'biology',
      name: 'Biology (Valenti)',
      subject: 'biology',
      units: [
        { id: 'biochemistry', name: 'BioChem' },
        { id: 'cellstructure', name: 'Cell Structure & Functions' },
        { id: 'cellenergetics', name: 'Cell Energetics-Photosynthesis & Cell Respirations' },
        { id: 'cellgrowth', name: 'Cell Growth & Division' },
        { id: 'genetics', name: 'Genetics' },
        { id: 'molecular', name: 'Protein Synthesis' },
        { id: 'evolution', name: 'Darwins Theory of Evolution' },
        { id: 'ecology', name: 'Ecology' },
      ],
    },
    {
      id: 'chemistry',
      name: 'Chemistry (Massarotti)',
      subject: 'chemistry',
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
      id: 'physics',
      name: 'Physics (Prisco)',
      subject: 'physics',
      units: [
        { id: 'kinematics', name: 'Kinematics' },
        { id: 'dynamics', name: 'Dynamics' },
        { id: 'energy', name: 'Energy' },
        { id: 'momentum', name: 'Momentum' },
        { id: 'electrostatics', name: 'Electrostatics' },
        { id: 'circuits', name: 'Electric Circuits' },
        { id: 'waves', name: 'Waves' },
      ],
    },
  ],
};


// ============================================
// SOCIAL STUDIES CATEGORY
// ============================================

/** AP/Universal social courses — shown at top */
export const socialApCourses: CourseEntry[] = [
  //{
    //id: 'apush',
    //name: 'AP US History',
    //subject: 'apush',
    //units: [],
    //hasChallenge: true,
  //},
];

/** School-specific social courses */
export const socialSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'world-history',
      name: 'World History (Stella)',
      subject: 'world-history',
      units: [
        { id: 'religions', name: 'Religions' },
        { id: 'islam', name: 'Islam' },
        { id: 'renaissance', name: 'Renaissance' },
        { id: 'protestant', name: 'Protestant' },
        { id: 'eastasia', name: 'East Asia' },
        { id: 'japan', name: 'Japan' },
        { id: 'india', name: 'India' },
        { id: 'africa', name: 'Africa' },
      ],
    },
    {
      id: 'worldhistorykohl',
      name: 'World History (Kohl)',
      subject: 'worldhistorykohl',
      units: [
        { id: 'chinese', name: 'Chinese Shang - Song' },
        { id: 'chinese2', name: 'Chinese Yuan - Modern' },
      ],
      hasChallenge: true,
    },
    {
      id: 'ushistory',
      name: 'US History',
      subject: 'ushistory',
      units: [
        { id: 'antebellum', name: 'Antebellum' },
        { id: 'civilwar', name: 'Civil War' },
      ],
      hasChallenge: true,
    },
  ],
};



// ============================================
// ENGLISH CATEGORY
// ============================================

/** AP/Universal english courses */
export const englishApCourses: CourseEntry[] = [
  {
    id: 'english',
    name: 'English Language Arts',
    subject: 'english',
    units: [],
    comingSoon: true,
  },
];

/** School-specific english courses */
export const englishSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'practice',
      name: 'Practice Assignments',
      subject: 'practice',
      units: [
        { id: 'unit1', name: 'English Midterm Practice; Phase 4' },
      ],
    },
  ],
};



// ============================================
// OTHER CATEGORY
// ============================================

/** AP/Universal other courses */
export const otherApCourses: CourseEntry[] = [
  {
    id: 'apcsp',
    name: 'AP Computer Science Principles',
    subject: 'apcsp',
    units: [
      { id: 'creative', name: 'Creative Development' },
      { id: 'data', name: 'Data' },
      { id: 'algorithms', name: 'Algorithms and Programming' },
      { id: 'systems', name: 'Computer Systems and Networks' },
      { id: 'computing', name: 'Impact of Computing' },
    ],
  },
  {
    id: 'apcsa',
    name: 'AP Computer Science A',
    subject: 'apcsa',
    units: [
      { id: 'objects', name: 'Using Objects and Methods' },
      { id: 'selection', name: 'Selection and Iteration' },
      { id: 'class', name: 'Class Creation' },
      { id: 'data', name: 'Data Collection' },
    ],
  },
];

/** Drivers Ed — shown right after APs in Other */
export const otherDriversEd: CourseEntry = {
  id: 'drivers',
  name: 'Drivers Education',
  subject: 'drivers',
  units: [
    { id: 'drivers1', name: 'Unit 1' },
    { id: 'drivers2', name: 'Unit 2' },
    { id: 'drivers3', name: 'Unit 3' },
    { id: 'drivers4', name: 'Unit 4' },
    { id: 'drivers5', name: 'Unit 5' },
    { id: 'drivers6', name: 'Unit 6' },
  ],
};

/** School-specific other courses */
export const otherSchoolCourses: Record<string, CourseEntry[]> = {
  csw: [
    {
      id: 'machinelearning',
      name: 'Intro to Machine Learning',
      subject: 'machinelearning',
      units: [
        { id: 'machinelearning', name: 'Machine Learning' },
      ],
    },
  ],
};

/** Temporary practice (shown separately) */
export const otherTemporary: CourseEntry = {
  id: 'temporary',
  name: 'Temporary Practice',
  subject: 'temporary',
  units: [],
};


// ============================================
// SUBJECT → CATEGORY LOOKUP
// ============================================

export type CategoryId = 'math' | 'science' | 'social' | 'english' | 'other';

const withSchools = (ap: CourseEntry[], school: Record<string, CourseEntry[]>): CourseEntry[] => [
  ...ap,
  ...Object.values(school).flat(),
];

/** Every course in each category, across all schools. */
const categoryCourses: Record<CategoryId, CourseEntry[]> = {
  math: withSchools(mathApCourses, mathSchoolCourses),
  science: withSchools(scienceApCourses, scienceSchoolCourses),
  social: withSchools(socialApCourses, socialSchoolCourses),
  english: withSchools(englishApCourses, englishSchoolCourses),
  other: [...withSchools(otherApCourses, otherSchoolCourses), otherDriversEd, otherTemporary],
};

/** Subjects that aren't in the lists above but still belong somewhere. */
const extraSubjects: Record<string, CategoryId> = {
  memory: 'other',
};

export const getCategoryForSubject = (subject?: string): CategoryId | 'custom' | null => {
  if (!subject) return null;
  if (subject.startsWith('custom-')) return 'custom';
  for (const [category, courses] of Object.entries(categoryCourses)) {
    if (courses.some((c) => c.subject === subject)) return category as CategoryId;
  }
  return extraSubjects[subject] ?? null;
};

export const getCategoryPath = (subject?: string): string => {
  const category = getCategoryForSubject(subject);
  return category ? `/category/${category}` : '/';
};
