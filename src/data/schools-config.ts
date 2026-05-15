/**
 * Schools Configuration
 * 
 * This file defines schools and their associated courses.
 * When a user clicks on a category, they'll be asked which school they're studying for.
 * 
 * To add/remove schools, modify the SCHOOLS array below.
 * See src/management/16-SCHOOLS-GUIDE.md for full documentation.
 */

export interface SchoolConfig {
  id: string;
  name: string;
  /** Courses shown in the NeededCoursesPopup per category for this school */
  neededCourses: Record<string, string[]>;
}

/**
 * Add or remove schools here.
 * Each school has:
 * - id: unique identifier (lowercase, no spaces)
 * - name: display name
 * - neededCourses: Record of category -> list of courses still needed
 */
export const SCHOOLS: SchoolConfig[] = [
  {
    id: 'csw',
    name: 'Charter School of Wilmington',
    neededCourses: {
      math: [
        'Calculus 3',
        'Calculus',
        'Statistics',
        'Math 3',
        'Math 2',
        'Math 1',
      ],
      science: [
        'Chemistry (Darone)',
        'Physics',
      ],
      social: [
        'US History',
      ],
      english: [],
      other: [],
    },
  },
];

/** The key used in localStorage to persist the selected school */
export const SELECTED_SCHOOL_KEY = 'selected-school-id';

/** Get the currently selected school from localStorage */
export const getSelectedSchool = (): SchoolConfig | null => {
  const id = localStorage.getItem(SELECTED_SCHOOL_KEY);
  if (!id) return null;
  return SCHOOLS.find(s => s.id === id) || null;
};

/** Set the selected school in localStorage */
export const setSelectedSchool = (schoolId: string) => {
  localStorage.setItem(SELECTED_SCHOOL_KEY, schoolId);
};

/** Clear the selected school */
export const clearSelectedSchool = () => {
  localStorage.removeItem(SELECTED_SCHOOL_KEY);
};
