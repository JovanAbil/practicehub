// src/data/reference-sheets.ts

export interface FormulaEntry {
  /** Short name shown on the left, e.g. "pH" */
  name: string;
  /** Rendered with MathText — wrap math in $...$ */
  formula: string;
  /** Optional small grey note under the formula */
  note?: string;
}

export interface FormulaTab {
  /** Tab label — usually the unit name */
  label: string;
  formulas: FormulaEntry[];
}

export type ReferenceSheet =
  | { id: string; title: string; kind: 'periodic-table' }
  | { id: string; title: string; kind: 'formulas'; tabs: FormulaTab[] };

/**
 * subject key (from the URL) -> list of sheets.
 * Each sheet becomes its own toggle button, in this order.
 */
export const referenceSheets: Record<string, ReferenceSheet[]> = {
  chemistry: [
    { id: 'chem-periodic', title: 'Periodic Table', kind: 'periodic-table' },
    {
      id: 'chem-equations',
      title: 'Equations',
      kind: 'formulas',
      tabs: [
        {
          label: 'Acids & Bases',
          formulas: [
            //{ name: 'pH', formula: '$\\text{pH} = -\\log[\\ce{H3O+}]$' },
          ],
        },
        {
          label: 'Wavelength / Light',
          formulas: [
            //{ name: 'Speed of light', formula: '$c = \\lambda \\nu$' },
          ],
        },
      ],
    },
  ],
  apchem: [
    { id: 'apchem-periodic', title: 'Periodic Table', kind: 'periodic-table' },
    {
      id: 'apchem-equations',
      title: 'Equations',
      kind: 'formulas',
      tabs: [
        {
          label: 'Acids & Bases',
          formulas: [
            //{ name: 'pH', formula: '$\\text{pH} = -\\log[\\ce{H3O+}]$' },
          ],
        },
        {
          label: 'Wavelength / Light',
          formulas: [
            //{ name: 'Speed of light', formula: '$c = \\lambda \\nu$' },
          ],
        },
      ],
    },
  ],
  physics: [
    {
      id: 'physics-equations',
      title: 'Equations',
      kind: 'formulas',
      tabs: [
        {
          label: 'Kinematics',
          formulas: [
            //{ name: 'pH', formula: '$\\text{pH} = -\\log[\\ce{H3O+}]$' },
          ],
        },
        {
          label: 'Dynamics',
          formulas: [
            //{ name: 'Speed of light', formula: '$c = \\lambda \\nu$' },
          ],
        },
      ],
    },
  ],
};

export const getReferenceSheets = (subject?: string): ReferenceSheet[] =>
  (subject && referenceSheets[subject]) || [];
