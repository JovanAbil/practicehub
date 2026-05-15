// Unit Assignments - Empty placeholder
// This file is used by UnitDetail.tsx to show homework assignments

export interface UnitAssignment {
  id: string;
  name: string;
  notes?: string;
}

export interface UnitContent {
  assignments: UnitAssignment[];
}

// Empty assignments map - add assignments as needed
export const unitAssignments: Record<string, UnitContent> = {};
