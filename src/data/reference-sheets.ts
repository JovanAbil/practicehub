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

/* ------------------------------------------------------------------ */
/* Shared chemistry entries (reused by Chemistry and AP Chemistry)     */
/* ------------------------------------------------------------------ */

const CHEM_UNIT_SYMBOLS: FormulaEntry[] = [
  { name: 'gram', formula: '$\\text{g}$' },
  { name: 'mole', formula: '$\\text{mol}$' },
  { name: 'liter', formula: '$\\text{L}$' },
  { name: 'meter', formula: '$\\text{m}$' },
  { name: 'second', formula: '$\\text{s}$' },
  { name: 'hertz', formula: '$\\text{Hz}$' },
  { name: 'atmosphere', formula: '$\\text{atm}$' },
  { name: 'millimeter of mercury', formula: '$\\text{mm Hg}$' },
  { name: 'degree Celsius', formula: '$^\\circ\\text{C}$' },
  { name: 'kelvin', formula: '$\\text{K}$' },
  { name: 'joule', formula: '$\\text{J}$' },
  { name: 'volt', formula: '$\\text{V}$' },
  { name: 'coulomb', formula: '$\\text{C}$' },
  { name: 'ampere', formula: '$\\text{A}$' },
];

const CHEM_UNIT_CONVERSIONS: FormulaEntry[] = [
  { name: 'Hertz', formula: '$1\\text{ hertz} = 1\\text{ s}^{-1}$' },
  { name: 'Atmosphere', formula: '$1\\text{ atm} = 760\\text{ mm Hg} = 760\\text{ torr}$' },
  { name: 'Kelvin', formula: '$\\text{K} = ^\\circ\\text{C} + 273.15$' },
  { name: 'Volt', formula: '$1\\text{ volt} = \\frac{1\\text{ joule}}{1\\text{ coulomb}}$' },
  { name: 'Ampere', formula: '$1\\text{ ampere} = \\frac{1\\text{ coulomb}}{1\\text{ second}}$' },
];

const CHEM_METRIC_PREFIXES: FormulaEntry[] = [
  { name: 'giga ($\\text{G}$)', formula: '$10^{9}$' },
  { name: 'mega ($\\text{M}$)', formula: '$10^{6}$' },
  { name: 'kilo ($\\text{k}$)', formula: '$10^{3}$' },
  { name: 'centi ($\\text{c}$)', formula: '$10^{-2}$' },
  { name: 'milli ($\\text{m}$)', formula: '$10^{-3}$' },
  { name: 'micro ($\\mu$)', formula: '$10^{-6}$' },
  { name: 'nano ($\\text{n}$)', formula: '$10^{-9}$' },
  { name: 'pico ($\\text{p}$)', formula: '$10^{-12}$' },
];

const CHEM_ATOMIC: FormulaEntry[] = [
  { name: 'Energy of a photon', formula: '$E = h\\nu$' },
  { name: 'Speed of light', formula: '$c = \\lambda\\nu$' },
  { name: 'Coulombic force', formula: '$F_{\\text{coulombic}} \\propto \\frac{q_1 q_2}{r^2}$' },
  { name: 'energy', formula: '$E$' },
  { name: 'frequency', formula: '$\\nu$' },
  { name: 'wavelength', formula: '$\\lambda$' },
  { name: 'force', formula: '$F$' },
  { name: 'charge', formula: '$q$' },
  { name: 'separation', formula: '$r$' },
  { name: "Planck's constant: $h$", formula: '$6.626 \\times 10^{-34}$ J s' },
  { name: 'Speed of light: $c$', formula: '$2.998 \\times 10^{8}$ m s$^{-1}$' },
  { name: "Avogadro's number", formula: '$6.022 \\times 10^{23}$ mol$^{-1}$' },
];

const CHEM_GASES: FormulaEntry[] = [
  { name: 'Combined gas law', formula: '$\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}$' },
  { name: 'Ideal gas law', formula: '$PV = nRT$' },
  { name: 'Partial pressure', formula: '$P_A = P_{\\text{total}} \\times X_A$' },
  { name: 'Mole fraction', formula: '$X_A = \\frac{\\text{moles A}}{\\text{total moles}}$' },
  { name: "Dalton's law", formula: '$P_{\\text{total}} = P_A + P_B + P_C + \\cdots$' },
  { name: 'Moles', formula: '$n = \\frac{m}{M}$', note: '$M$ = molar mass' },
  { name: 'Density', formula: '$D = \\frac{m}{V}$' },
  { name: 'Kinetic energy', formula: '$KE = \\frac{1}{2}mv^2$' },
  { name: 'pressure', formula: '$P$' },
  { name: 'volume', formula: '$V$' },
  { name: 'temperature', formula: '$T$' },
  { name: 'number of moles', formula: '$n$' },
  { name: 'mole fraction', formula: '$X$' },
  { name: 'mass', formula: '$m$' },
  { name: 'molar mass', formula: '$M$' },
  { name: 'density', formula: '$D$' },
  { name: 'kinetic energy', formula: '$KE$' },
  { name: 'velocity', formula: '$v$' },
  { name: 'Gas constant: $R$', formula: '$8.314$ J mol$^{-1}$ K$^{-1}$' },
  { name: 'Gas constant: $R$', formula: '$0.08206$ L atm K$^{-1}$ mol$^{-1}$' },
  { name: 'STP', formula: '$273.15$ K and $1.0$ atm' },
  { name: 'Ideal gas at STP', formula: '$22.4$ L mol$^{-1}$' },
];

const CHEM_SOLUTIONS: FormulaEntry[] = [
  { name: 'Molarity', formula: '$M = \\frac{n_{\\text{solute}}}{L_{\\text{solution}}}$' },
  { name: "Beer's law", formula: '$A = \\epsilon bc$' },
  { name: 'molarity', formula: '$M$' },
  { name: 'absorbance', formula: '$A$' },
  { name: 'molar absorptivity', formula: '$\\epsilon$' },
  { name: 'path length', formula: '$b$' },
  { name: 'concentration', formula: '$c$' },
];

const CHEM_ACIDS_BASES: FormulaEntry[] = [
  {
    name: 'Water ionization constant',
    formula: '$K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}$',
    note: 'at 25°C',
  },
  { name: 'p$K_w$', formula: '$pK_w = 14 = \\text{pH} + \\text{pOH}$', note: 'at 25°C' },
  { name: 'pH', formula: '$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]$' },
  { name: 'pOH', formula: '$\\text{pOH} = -\\log[\\text{OH}^-]$' },
  { name: 'Acid dissociation constant', formula: '$K_a = \\frac{[\\text{H}_3\\text{O}^+][A^-]}{[HA]}$' },
  { name: 'Base dissociation constant', formula: '$K_b = \\frac{[\\text{OH}^-][HB^+]}{[B]}$' },
  { name: 'p$K_a$', formula: '$pK_a = -\\log K_a$' },
  { name: 'p$K_b$', formula: '$pK_b = -\\log K_b$' },
  { name: '$K_w$ relationship', formula: '$K_w = K_a \\times K_b$' },
  { name: 'p$K_w$ relationship', formula: '$pK_w = pK_a + pK_b$' },
  { name: 'Henderson–Hasselbalch', formula: '$\\text{pH} = pK_a + \\log\\frac{[A^-]}{[HA]}$' },
];

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
          label: 'Matter and Measurement',
          formulas: [
            ...CHEM_UNIT_SYMBOLS,
            ...CHEM_UNIT_CONVERSIONS,
            ...CHEM_METRIC_PREFIXES,
            { name: 'Density', formula: '$D = \\frac{m}{V}$' },
            { name: 'density', formula: '$D$' },
            { name: 'mass', formula: '$m$' },
            { name: 'volume', formula: '$V$' },
          ],
        },
        { label: 'Atomic Theory', formulas: CHEM_ATOMIC },
        {
          label: 'Compounds',
          formulas: [
            { name: 'Moles', formula: '$n = \\frac{m}{M}$' },
            { name: 'number of moles', formula: '$n$' },
            { name: 'mass', formula: '$m$' },
            { name: 'molar mass', formula: '$M$' },
            { name: "Avogadro's number", formula: '$6.022 \\times 10^{23}$ mol$^{-1}$' },
          ],
        },
        { label: 'Gases', formulas: CHEM_GASES },
        { label: 'Solutions', formulas: CHEM_SOLUTIONS },
        {
          label: 'Stoichiometry',
          formulas: [
            { name: 'Moles', formula: '$n = \\frac{m}{M}$' },
            { name: 'Molarity', formula: '$M = \\frac{n_{\\text{solute}}}{L_{\\text{solution}}}$' },
            { name: "Avogadro's number", formula: '$6.022 \\times 10^{23}$ mol$^{-1}$' },
            { name: 'Ideal gas at STP', formula: '$22.4$ L mol$^{-1}$' },
          ],
        },
        { label: 'Acids and Bases', formulas: CHEM_ACIDS_BASES },
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
          label: 'Intro to AP Chem',
          formulas: [...CHEM_UNIT_SYMBOLS, ...CHEM_UNIT_CONVERSIONS, ...CHEM_METRIC_PREFIXES],
        },
        { label: 'Atomic Structure and Properties', formulas: CHEM_ATOMIC },
        {
          label: 'Thermochemistry',
          formulas: [
            { name: 'Heat', formula: '$q = mc\\Delta T$' },
            {
              name: 'Enthalpy of reaction',
              formula:
                '$\\Delta H^\\circ_{\\text{reaction}} = \\sum \\Delta H^\\circ_{f,\\text{products}} - \\sum \\Delta H^\\circ_{f,\\text{reactants}}$',
            },
            { name: 'heat', formula: '$q$' },
            { name: 'mass', formula: '$m$' },
            { name: 'specific heat capacity', formula: '$c$' },
            { name: 'temperature', formula: '$T$' },
            { name: 'standard enthalpy', formula: '$H^\\circ$' },
          ],
        },
        {
          label: 'Compounds, Bonding, and Mixtures',
          formulas: [...CHEM_GASES, ...CHEM_SOLUTIONS],
        },
        {
          label: 'Kinetics',
          formulas: [
            { name: 'Zero order', formula: '$[A]_t - [A]_0 = -kt$' },
            { name: 'First order', formula: '$\\ln[A]_t - \\ln[A]_0 = -kt$' },
            { name: 'Second order', formula: '$\\frac{1}{[A]_t} - \\frac{1}{[A]_0} = kt$' },
            { name: 'Half-life', formula: '$t_{1/2} = \\frac{0.693}{k}$' },
            { name: 'rate constant', formula: '$k$' },
            { name: 'time', formula: '$t$' },
            { name: 'half-life', formula: '$t_{1/2}$' },
          ],
        },
        {
          label: 'Equilibrium',
          formulas: [
            {
              name: 'Equilibrium constant (concentrations)',
              formula: '$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$',
              note: 'where $aA + bB \\rightleftharpoons cC + dD$',
            },
            {
              name: 'Equilibrium constant (pressures)',
              formula: '$K_p = \\frac{(P_C)^c(P_D)^d}{(P_A)^a(P_B)^b}$',
            },
            { name: 'Equilibrium constant (molar concentrations)', formula: '$K_c$' },
            { name: 'Equilibrium constant (gas pressures)', formula: '$K_p$' },
            { name: 'Equilibrium constant (water)', formula: '$K_w$' },
            { name: 'Equilibrium constant (acid)', formula: '$K_a$' },
            { name: 'Equilibrium constant (base)', formula: '$K_b$' },
          ],
        },
        { label: 'Acids and Bases', formulas: CHEM_ACIDS_BASES },
        {
          label: 'Thermodynamics and Electrochemistry',
          formulas: [
            {
              name: 'Entropy of reaction',
              formula:
                '$\\Delta S^\\circ_{\\text{reaction}} = \\sum S^\\circ_{\\text{products}} - \\sum S^\\circ_{\\text{reactants}}$',
            },
            {
              name: 'Gibbs free energy of reaction',
              formula:
                '$\\Delta G^\\circ_{\\text{reaction}} = \\sum \\Delta G^\\circ_{f,\\text{products}} - \\sum \\Delta G^\\circ_{f,\\text{reactants}}$',
            },
            {
              name: 'Gibbs free energy',
              formula: '$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ = -RT\\ln K = -nFE^\\circ$',
            },
            { name: 'Current', formula: '$I = \\frac{q}{t}$' },
            { name: 'Cell potential', formula: '$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{RT}{nF}\\ln Q$' },
            { name: 'heat', formula: '$q$' },
            { name: 'mass', formula: '$m$' },
            { name: 'specific heat capacity', formula: '$c$' },
            { name: 'temperature', formula: '$T$' },
            { name: 'standard entropy', formula: '$S^\\circ$' },
            { name: 'standard enthalpy', formula: '$H^\\circ$' },
            { name: 'standard Gibbs free energy', formula: '$G^\\circ$' },
            { name: 'gas constant', formula: '$R$' },
            { name: 'equilibrium constant', formula: '$K$' },
            { name: 'number of moles of electrons', formula: '$n$' },
            { name: 'standard potential', formula: '$E^\\circ$' },
            { name: 'current (amperes)', formula: '$I$' },
            { name: 'charge (coulombs)', formula: '$q$' },
            { name: 'time (seconds)', formula: '$t$' },
            { name: 'reaction quotient', formula: '$Q$' },
            { name: 'Gas constant: $R$', formula: '$8.314$ J mol$^{-1}$ K$^{-1}$' },
            { name: "Faraday's constant: $F$", formula: '$96{,}485$ coulombs / $1$ mol e$^-$' },
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
            { name: 'Magnitude of acceleration due to gravity on Earth: $g$', formula: '$9.8$ m/s$^{2}$' },
            { name: 'acceleration', formula: '$a$' },
            { name: 'any vector quantity', formula: '$\\overrightarrow{A}$' },
            { name: 'displacement', formula: '$\\Delta\\overrightarrow{x}$' },
            { name: 'angle', formula: '$\\theta$' },
            { name: 'elapsed time interval', formula: '$t$' },
            { name: 'velocity or speed', formula: '$v$' },
            { name: 'average velocity or speed', formula: '$\\overline{v}$' },
            { name: 'velocity', formula: '$\\overline{v} = \\frac{\\Delta \\overrightarrow{x}}{t}$' },
            { name: 'acceleration', formula: '$a = \\frac{\\Delta v}{t}$' },
            { name: 'final velocity', formula: '$v_f = v_i + at$' },
            { name: 'displacement', formula: '$\\Delta\\overrightarrow{x} = v_i t + \\frac{1}{2}at^2$' },
            { name: 'final velocity squared', formula: '$v_f^2 = v_i^2 + 2a\\Delta\\overrightarrow{x}$' },
            { name: 'vertical component', formula: '$\\overrightarrow{A}_y = \\overrightarrow{A}\\sin\\theta$' },
            { name: 'horizontal component', formula: '$\\overrightarrow{A}_x = \\overrightarrow{A}\\cos\\theta$' },
          ],
        },
        {
          label: 'Dynamics',
          formulas: [
            { name: 'Universal gravitational constant: $G$', formula: '$6.67 \\times 10^{-11}$ N$\\cdot$m$^{2}$/kg$^{2}$' },
            { name: 'force', formula: '$\\overrightarrow{F}$' },
            { name: 'centripetal force', formula: '$\\overrightarrow{F_c}$' },
            { name: 'force of friction', formula: '$\\overrightarrow{F_f}$' },
            { name: 'weight or force due to gravity', formula: '$\\overrightarrow{F_g}$' },
            { name: 'normal force', formula: '$\\overrightarrow{F_N}$' },
            { name: 'net force', formula: '$\\overrightarrow{F}_{net}$' },
            { name: 'force on a spring', formula: '$\\overrightarrow{F_s}$' },
            { name: 'spring constant', formula: '$k$' },
            { name: 'mass', formula: '$m$' },
            { name: 'distance', formula: '$r$' },
            { name: 'coefficient of friction', formula: '$\\mu$' },
            { name: 'Net force', formula: '$\\overrightarrow{F}_{net} = m\\overrightarrow{a}$' },
            { name: 'Friction', formula: '$\\overrightarrow{F_f} = \\mu\\overrightarrow{F_N}$' },
            { name: 'Gravitational force', formula: '$|\\overrightarrow{F_g}| = G\\frac{m_1 m_2}{r^2}$' },
            { name: 'Gravitational field strength', formula: '$g = \\frac{|\\overrightarrow{F_g}|}{m}$' },
            { name: 'Spring force', formula: '$|\\overrightarrow{F_s}| = k|\\Delta\\overrightarrow{x}|$' },
            { name: 'Centripetal force', formula: '$F_c = ma_c$' },
            { name: 'Centripetal acceleration', formula: '$a_c = \\frac{v^2}{r}$' },
          ],
        },
        {
          label: 'Energy',
          formulas: [
            { name: 'total energy', formula: '$E$' },
            { name: 'height', formula: '$h$' },
            { name: 'kinetic energy', formula: '$KE$' },
            { name: 'potential energy', formula: '$PE$' },
            { name: 'heat energy', formula: '$Q$' },
            { name: 'power', formula: '$P$' },
            { name: 'work', formula: '$W$' },
            { name: 'Elastic potential energy', formula: '$PE_e = \\frac{1}{2}k(\\Delta\\overrightarrow{x})^2$' },
            { name: 'Gravitational potential energy', formula: '$\\Delta PE_g = mg\\Delta h$' },
            { name: 'Kinetic energy', formula: '$KE = \\frac{1}{2}mv^2$' },
            { name: 'Work', formula: '$W = F_{net}r\\cos\\theta = \\Delta KE$' },
            { name: 'Conservation of energy', formula: '$\\Delta KE = -\\Delta PE$' },
            { name: 'Total energy', formula: '$E = KE + PE + Q$' },
            { name: 'Power', formula: '$P = \\frac{W}{t} = \\frac{F_{net}r\\cos\\theta}{t} = F\\overline{v}$' },
          ],
        },
        {
          label: 'Momentum',
          formulas: [
            { name: 'impulse', formula: '$\\overrightarrow{J}$' },
            { name: 'momentum', formula: '$\\overrightarrow{p}$' },
            { name: 'Momentum', formula: '$\\overrightarrow{p} = m\\overrightarrow{v}$' },
            {
              name: 'Conservation of momentum',
              formula: '$\\sum\\overrightarrow{p}_{before} = \\sum\\overrightarrow{p}_{after}$',
            },
            { name: 'Impulse', formula: '$\\overrightarrow{J} = \\overrightarrow{F}_{net}t = \\Delta\\overrightarrow{p}$' },
          ],
        },
        {
          label: 'Electrostatics',
          formulas: [
            { name: 'Electrostatic constant: $k$', formula: '$9.0 \\times 10^{9}$ N$\\cdot$m$^{2}$/C$^{2}$' },
            { name: '1 elementary charge: $e$', formula: '$1.6 \\times 10^{-19}$ C' },
            { name: 'Mass of electron: $m_e$', formula: '$9.1 \\times 10^{-31}$ kg' },
            { name: 'Mass of proton: $m_p$', formula: '$1.7 \\times 10^{-27}$ kg' },
            { name: 'Mass of neutron: $m_n$', formula: '$1.7 \\times 10^{-27}$ kg' },
            { name: 'electric field strength', formula: '$\\overrightarrow{E}$' },
            { name: 'electrostatic force', formula: '$\\overrightarrow{F_e}$' },
            { name: 'charge', formula: '$q$' },
            { name: 'potential energy', formula: '$PE$' },
            { name: 'potential difference', formula: '$V$' },
            { name: 'distance', formula: '$r$' },
            { name: 'Electrostatic force', formula: '$|\\overrightarrow{F_e}| = k\\left|\\frac{q_1 q_2}{r_{12}^2}\\right|$' },
            {
              name: 'Electric field',
              formula: '$\\overrightarrow{E} = \\left|\\frac{\\overrightarrow{F_e}}{q_0}\\right| = k\\left|\\frac{q}{r^2}\\right|$',
            },
            { name: 'Electric potential energy', formula: '$PE = k\\sum\\frac{q_1 q_2}{r_{12}}$' },
            { name: 'Change in potential energy', formula: '$\\Delta PE = -q\\overrightarrow{E}r$' },
            { name: 'Electric potential', formula: '$V = k\\sum\\frac{q}{r} = \\frac{PE}{q_0}$' },
            { name: 'Change in potential', formula: '$\\Delta V = -\\overrightarrow{E}r$' },
          ],
        },
        {
          label: 'Electric Circuits',
          formulas: [
            { name: 'cross-sectional area', formula: '$A$' },
            { name: 'current', formula: '$I$' },
            { name: 'length of conductor', formula: '$L$' },
            { name: 'electrical power', formula: '$P$' },
            { name: 'charge', formula: '$q$' },
            { name: 'resistance', formula: '$R$' },
            { name: 'distance', formula: '$r$' },
            { name: 'elapsed time interval', formula: '$t$' },
            { name: 'potential difference', formula: '$V$' },
            { name: 'resistivity', formula: '$\\rho$' },
            { name: 'Current', formula: '$I = \\frac{\\Delta q}{t}$' },
            { name: 'Resistance', formula: '$R = \\frac{V}{I} = \\frac{\\rho L}{A}$' },
            { name: 'Electrical power', formula: '$P = VI = I^2R = \\frac{V^2}{R}$' },
            { name: 'Series: current', formula: '$I = I_1 = I_2 = I_3 = \\cdots$' },
            { name: 'Series: voltage', formula: '$V = V_1 + V_2 + V_3 + \\cdots$' },
            { name: 'Series: resistance', formula: '$R_{eq} = R_1 + R_2 + R_3 + \\cdots$' },
            { name: 'Parallel: current', formula: '$I = I_1 + I_2 + I_3 + \\cdots$' },
            { name: 'Parallel: voltage', formula: '$V = V_1 = V_2 = V_3 = \\cdots$' },
            {
              name: 'Parallel: resistance',
              formula: '$\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + \\cdots$',
            },
            { name: 'Symbol: cell', formula: 'Two parallel lines (one long, one short)' },
            { name: 'Symbol: battery', formula: 'Two or more cells in a row' },
            { name: 'Symbol: switch', formula: 'Line with a gap and an angled bar' },
            { name: 'Symbol: voltmeter', formula: 'Circle containing a $V$' },
            { name: 'Symbol: ammeter', formula: 'Circle containing an $A$' },
            { name: 'Symbol: resistor', formula: 'Zigzag line' },
            { name: 'Symbol: variable resistor', formula: 'Zigzag line with an arrow through it' },
            { name: 'Symbol: lamp', formula: 'Circle containing a loop' },
          ],
        },
        {
          label: 'Waves',
          formulas: [
            { name: 'Speed of light in a vacuum: $c$', formula: '$3.0 \\times 10^{8}$ m/s' },
            { name: 'Frequency', formula: '$\\text{Hz}$' },
            { name: 'elapsed time interval', formula: '$t$' },
            { name: 'velocity or speed', formula: '$v$' },
          ],
        },
        {
          label: 'Units & Prefixes',
          formulas: [
            { name: 'Current: ampere', formula: '$\\text{A} = \\text{C}/\\text{s}$' },
            { name: 'Energy: joule', formula: '$\\text{J} = \\text{N}\\cdot\\text{m} = \\text{kg}\\cdot\\text{m}^2/\\text{s}^2$' },
            { name: 'Force: newton', formula: '$\\text{N} = \\text{kg}\\cdot\\text{m}/\\text{s}^2$' },
            { name: 'Frequency: hertz', formula: '$\\text{Hz}$' },
            { name: 'Length: meter', formula: '$\\text{m}$' },
            { name: 'Mass: kilogram', formula: '$\\text{kg}$' },
            { name: 'Potential: volt', formula: '$\\text{V} = \\text{J}/\\text{C}$' },
            { name: 'Power: watt', formula: '$\\text{W} = \\text{J}/\\text{s} = \\text{kg}\\cdot\\text{m}^2/\\text{s}^3$' },
            { name: 'Resistance: ohm', formula: '$\\Omega = \\text{V}/\\text{A}$' },
            { name: 'Time: second', formula: '$\\text{s}$' },
            { name: 'tera ($\\text{T}$)', formula: '$10^{12}$' },
            { name: 'giga ($\\text{G}$)', formula: '$10^{9}$' },
            { name: 'mega ($\\text{M}$)', formula: '$10^{6}$' },
            { name: 'kilo ($\\text{k}$)', formula: '$10^{3}$' },
            { name: 'deci ($\\text{d}$)', formula: '$10^{-1}$' },
            { name: 'centi ($\\text{c}$)', formula: '$10^{-2}$' },
            { name: 'milli ($\\text{m}$)', formula: '$10^{-3}$' },
            { name: 'micro ($\\mu$)', formula: '$10^{-6}$' },
            { name: 'nano ($\\text{n}$)', formula: '$10^{-9}$' },
            { name: 'pico ($\\text{p}$)', formula: '$10^{-12}$' },
          ],
        },
        {
          label: 'Trig & Math',
          formulas: [
            { name: 'Pythagorean theorem', formula: '$c^2 = a^2 + b^2$' },
            { name: 'Sine', formula: '$\\sin\\theta = \\frac{a}{c}$' },
            { name: 'Cosine', formula: '$\\cos\\theta = \\frac{b}{c}$' },
            { name: 'Tangent', formula: '$\\tan\\theta = \\frac{a}{b}$' },
            {
              name: 'Quadratic formula',
              formula: '$x = \\frac{-B \\pm \\sqrt{B^2 - 4AC}}{2A}$',
              note: 'If $Ax^2 + Bx + C = 0$',
            },
          ],
        },
      ],
    },
  ],
};

export const getReferenceSheets = (subject?: string): ReferenceSheet[] =>
  (subject && referenceSheets[subject]) || [];
