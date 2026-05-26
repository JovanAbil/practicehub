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
export const scienceApCourses: CourseEntry[] = [];

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
  csw: [],
};

/** Temporary practice (shown separately) */
export const otherTemporary: CourseEntry = {
  id: 'temporary',
  name: 'Temporary Practice',
  subject: 'temporary',
  units: [],
};
