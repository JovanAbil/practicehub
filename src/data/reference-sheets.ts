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
            { name: 'pH', formula: '$\\text{pH} = -\\log[\\ce{H3O+}]$' },
            { name: 'pOH', formula: '$\\text{pOH} = -\\log[\\ce{OH-}]$' },
            { name: 'pH + pOH', formula: '$\\text{pH} + \\text{pOH} = 14$', note: 'at 25 °C' },
            { name: 'Water', formula: '$K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}$', note: 'at 25 °C' },
            { name: 'Acid constant', formula: '$K_a = \\dfrac{[\\ce{H3O+}][\\ce{A-}]}{[\\ce{HA}]}$' },
            { name: 'Base constant', formula: '$K_b = \\dfrac{[\\ce{HB+}][\\ce{OH-}]}{[\\ce{B}]}$' },
            { name: 'Conjugates', formula: '$K_a \\times K_b = K_w$' },
            { name: 'pKa', formula: '$\\text{p}K_a = -\\log K_a$' },
            { name: 'Henderson–Hasselbalch', formula: '$\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\ce{A-}]}{[\\ce{HA}]}$' },
            { name: 'Titration', formula: '$M_a V_a = M_b V_b$', note: '1:1 mole ratio' },
          ],
        },
        {
          label: 'Wavelength / Light',
          formulas: [
            { name: 'Speed of light', formula: '$c = \\lambda \\nu$' },
            { name: 'Photon energy', formula: '$E = h\\nu$' },
            { name: 'Energy & wavelength', formula: '$E = \\dfrac{hc}{\\lambda}$' },
            { name: 'Planck constant', formula: '$h = 6.626 \\times 10^{-34}\\ \\text{J·s}$' },
            { name: 'Speed of light', formula: '$c = 3.00 \\times 10^{8}\\ \\text{m/s}$' },
            { name: 'Hydrogen levels', formula: '$E_n = -\\dfrac{2.178 \\times 10^{-18}}{n^2}\\ \\text{J}$' },
            { name: 'de Broglie', formula: '$\\lambda = \\dfrac{h}{mv}$' },
            { name: 'Beer–Lambert', formula: '$A = \\varepsilon b c$' },
          ],
        },
      ],
    },
  ],
};

export const getReferenceSheets = (subject?: string): ReferenceSheet[] =>
  (subject && referenceSheets[subject]) || [];
