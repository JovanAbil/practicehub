import { Question } from '@/types/quiz';

export const compoundsQuestions: Question[] = [
  {
    id: "compounds-1",
    type: "multiple-choice",
    question: "What type of bond is expected between atoms of strontium and chlorine",
    options: [
      { label: "A", value: "A", text: "Metallic" },
      { label: "B", value: "B", text: "Polar Covalent" },
      { label: "C", value: "C", text: "Nonpolar Covalent" },
      { label: "D", value: "D", text: "Ionic" }
    ],
    correctAnswer: "D",
    explanation: "Strontium is a metal and chlorine is a nonmetal, so they form ionic bonds."
  },
  {
    id: "compounds-2",
    type: "multiple-choice",
    question: "What type of bond is expected between atoms of Cadmium and Indium",
    options: [
      { label: "A", value: "A", text: "Metallic" },
      { label: "B", value: "B", text: "Polar Covalent" },
      { label: "C", value: "C", text: "Nonpolar Covalent" },
      { label: "D", value: "D", text: "Ionic" }
    ],
    correctAnswer: "A",
    explanation: "Both Cd and In are metals, so they form metallic bonds."
  },
  {
    id: "compounds-3",
    type: "multiple-choice",
    question: "What type of bond is expected between atoms of phosphorous and selenium",
    options: [
      { label: "A", value: "A", text: "Metallic" },
      { label: "B", value: "B", text: "Polar Covalent" },
      { label: "C", value: "C", text: "Nonpolar Covalent" },
      { label: "D", value: "D", text: "Ionic" }
    ],
    correctAnswer: "C",
    explanation: "Both elements are nonmetals and have a small electronegativity difference, giving a nonpolar covalent bond."
  },
  {
    id: "compounds-4",
    type: "multiple-choice",
    question: "What type of bond is expected between atoms of iodine and flourine",
    options: [
      { label: "A", value: "A", text: "Metallic" },
      { label: "B", value: "B", text: "Polar Covalent" },
      { label: "C", value: "C", text: "Nonpolar Covalent" },
      { label: "D", value: "D", text: "Ionic" }
    ],
    correctAnswer: "B",
    explanation: "Although both are nonmetals, fluorine is much more electronegative, forming a polar covalent bond."
  },
  {
    id: "compounds-5",
    type: "multiple-choice",
    question: "A yellow powder that does not conduct electricity as a solid. It can be easily dissolved in water, and conducts electricity well in solution. Which bond type does this data suggest for the white powder?",
    options: [
      { label: "A", value: "A", text: "Metallic" },
      { label: "B", value: "B", text: "Polar Covalent" },
      { label: "C", value: "C", text: "Nonpolar Covalent" },
      { label: "D", value: "D", text: "Ionic" }
    ],
    correctAnswer: "D",
    explanation: "Substances that dissolve in water and conduct electricity in solution are ionic compounds."
  },
  {
    id: "compounds-5a",
    type: "multiple-choice",
    question: "Which of these best describes what happens when Mg and O combine to form MgO",
    options: [
      { label: "A", value: "A", text: "Magnesium gains two protons and oxygen loses two protons" },
      { label: "B", value: "B", text: "Oxygen transfers two protons to magnesium" },
      { label: "C", value: "C", text: "Magnesium transfers two electrons to oxygen" },
      { label: "D", value: "D", text: "Magnesium gains two electrons, and oxygen loses two electrons" }
    ],
    correctAnswer: "C",
    explanation: "Ionic bonds transfer from cations to anions to fill valence shells."
  },
  {
    id: "compounds-5b",
    type: "multiple-choice",
    question: "Which of these is a valid Lewis Structure for SeCl3+",
    options: [
      { label: "A", value: "A", text: "", image: "/images/chemistry/compounds4.png" },
      { label: "B", value: "B", text: "", image: "/images/chemistry/compounds5.png" },
      { label: "C", value: "C", text: "", image: "/images/chemistry/compounds6.png" },
      { label: "D", value: "D", text: "", image: "/images/chemistry/compounds7.png" }
    ],
    correctAnswer: "C",
    explanation: "Count the electrons for each one, the one with 8 filled shells as well as 26 electrons"
  },
  {
    id: "compounds-5c",
    type: "multiple-choice",
    question: "Which of these is mostly likely a property of SF4",
    options: [
      { label: "A", value: "A", text: "It is a gas at room temperature" },
      { label: "B", value: "B", text: "It conducts electricity when dissolved in water" },
      { label: "C", value: "C", text: "It forms a crystalline lattice structure instead of individual molecules" },
    ],
    correctAnswer: "A",
    explanation: "Electricity is from salts because it dissolves, this can\'t dissolve, it is also covalently bonded so it is a gas."
  },
  {
    id: "compounds-5d",
    type: "multiple-choice",
    question: "Which intermolecular forces (IMFs) are experienced by SF4",
    image: "/images/chemistry/compounds1.png",
    options: [
      { label: "A", value: "A", text: "London Dispersion only" },
      { label: "B", value: "B", text: "London dispersion and dipole-dipole" },
      { label: "C", value: "C", text: "Dipole-diople and hydrogen bonding" },
      { label: "D", value: "D", text: "Dipole-dipole only" }
    ],
    correctAnswer: "B",
    explanation: "It is polar"
  },
  {
    id: "compounds-5e",
    type: "multiple-choice",
    question: "What is the molecular geometry of SF4",
    image: "/images/chemistry/compounds1.png",
    options: [
      { label: "A", value: "A", text: "Tetrahedral" },
      { label: "B", value: "B", text: "Linear" },
      { label: "C", value: "C", text: "Trigonal bypyramidal" },
      { label: "D", value: "D", text: "Seesaw" }
    ],
    correctAnswer: "D",
    explanation: "Molecular geometry chart"
  },
  {
    id: "compounds-5f",
    type: "multiple-choice",
    question: "Why is the N-H-N angle in NH3 smaller than the H-C-H angle in CH4?",
    options: [
      { label: "A", value: "A", text: "The lone pair electrons on N in NH3 exert more repulsive force than bonded electrons" },
      { label: "B", value: "B", text: "The hydrogen nuclei in NH3 are attracted to each other, bringing them closer" },
      { label: "C", value: "C", text: "NH3 is polar, while CH4 is nonpolar" },
      { label: "D", value: "D", text: "C has a higher electronegativity than N" }
    ],
    correctAnswer: "A",
    explanation: "Lone pairs exert more repulsive force"
  },
  {
    id: "compounds-5g",
    type: "multiple-choice",
    question: "What type of bond is represented by the diagram?",
    image: "/images/chemistry/compounds2.png",
    options: [
      { label: "A", value: "A", text: "Ionic because electrons are transferred from the C to the Cl atoms" },
      { label: "B", value: "B", text: "Covalent because electrons are transferred from the C to the Cl atoms" },
      { label: "C", value: "C", text: "Ionic because electrons are shared between the C and Cl atoms" },
      { label: "D", value: "D", text: "Covalent because electrons are shared between the C and Cl atoms" }
    ],
    correctAnswer: "D",
    explanation: "Cl and C are covalently bonded and covalent means shared."
  },
  {
    id: "compounds-6",
    type: "free-response",
    question: "What is the Geometry and Polarity of CF3H and does it have resonance? Draw the structure",
    correctAnswer: "Tetrahedral, Polar, No Resonance",
    explanation: "CF3H has 4 electron domains around C → tetrahedral. The C–F bonds dominate, making the molecule polar. No resonance is possible."
  },
  {
    id: "compounds-7",
    type: "free-response",
    question: "What is the Geometry and Polarity of CO3 2- and does it have resonance? Draw the structure",
    correctAnswer: "Trigonal Planar, Nonpolar, Has Resonance",
    explanation: "CO3²⁻ has 3 electron groups around C → trigonal planar. Symmetry makes it nonpolar. It has 3 equivalent resonance structures."
  },
  {
    id: "compounds-8",
    type: "free-response",
    question: "What is the Geometry and Polarity of PCl3 and does it have resonance? Draw the structure",
    correctAnswer: "Trigonal Pyramidal, Polar, No Resonance",
    explanation: "PCl3 has 3 bonds and 1 lone pair → trigonal pyramidal. Lone pair causes polarity. No resonance exists."
  },
  {
    id: "compounds-9",
    type: "free-response",
    question: "What is the Geometry and Polarity of SeBr6 and does it have resonance? Draw the structure",
    correctAnswer: "Octahedral, Nonpolar, No Resonance",
    explanation: "SeCl6 has 6 bonding pairs and no lone pairs → octahedral and symmetrical, making it nonpolar."
  },
  {
    id: "compounds-10",
    type: "free-response",
    question: "What is the Geometry and Polarity of CS2 and does it have resonance? Draw the structure",
    correctAnswer: "Linear, Nonpolar, Has Resonance",
    explanation: "CS2 is linear due to two double bonds. Symmetry makes it nonpolar. Resonance exists between possible S=C=S forms."
  },
  {
    id: "compounds-11",
    type: "free-response",
    question: "What is the Geometry and Polarity of BrF5 and does it have resonance? Draw the structure",
    correctAnswer: "Square Pyramidal, Polar, No Resonance",
    explanation: "5 bonds and 1 lone pair → square pyramidal. Asymmetry makes it polar. No resonance structures exist."
  },
  {
    id: "compounds-16",
    type: "free-response",
    question: "Identify all of the IMFs: C6H14",
    correctAnswer: "It is nonpolar so it only has London Dispersion",
    explanation: "Hexane is a nonpolar hydrocarbon, so its only IMF is London dispersion."
  },
  {
    id: "compounds-17",
    type: "free-response",
    question: "Identify all of the IMFs: GeH2F2",
    correctAnswer: "It is polar so it has both London Dispersion and Dipole Dipole",
    explanation: "The F atoms create molecular polarity → dipole-dipole + dispersion."
  },
  {
    id: "compounds-18",
    type: "free-response",
    question: "Identify all of the IMFs: NH3",
    correctAnswer: "It is polar and H bonds with N so it has London Dispersion, Dipole Dipole, and Hydrogen Bonding",
    explanation: "NH3 contains N–H bonds, enabling hydrogen bonding, plus dipole-dipole and dispersion."
  },
  {
    id: "compounds-19",
    type: "free-response",
    question: "Identify all of the IMFs: CH3OH",
    correctAnswer: "It is polar and H bonds with O so it has London Dispersion, Dipole Dipole, and Hydrogen Bonding",
    explanation: "OH group allows H-bonding; molecule is polar → all 3 IMFs."
  },
  {
    id: "compounds-20",
    type: "free-response",
    question: "Name Au3(PO4)2",
    correctAnswer: "Gold (II) Phosphate",
    explanation: "PO4 is -3 → total -6. 3 Au atoms must total +6 → each is +2 → Gold(II)."
  },
  {
    id: "compounds-21",
    type: "free-response",
    question: "Name N3F4",
    correctAnswer: "Trinitrogen tetrafluoride",
    explanation: "Use Greek prefixes: 3 nitrogen = tri-nitrogen, 4 fluorine = tetrafluoride."
  },
  {
    id: "compounds-22",
    type: "free-response",
    question: "Name ZnO",
    correctAnswer: "Zinc Oxide",
    explanation: "Zn has a fixed +2 charge; oxide is O²⁻ → zinc oxide is correct."
  },
  {
    id: "compounds-23",
    type: "free-response",
    question: "Name Sc(NO3)3",
    correctAnswer: "Scandium (III) nitrate",
    explanation: "Nitrate is -1 each, total -3 → Sc must be +3."
  },
  {
    id: "compounds-24",
    type: "free-response",
    question: "Name Cs3As",
    correctAnswer: "Cesium Arsenide",
    explanation: "Rb is +1; As is -3; name as metal + nonmetal with -ide ending."
  },
  {
    id: "compounds-25",
    type: "free-response",
    question: "Name SiS2",
    correctAnswer: "Silicon Disulfide",
    explanation: "Molecular naming with Greek prefixes, but SiO2 traditionally uses 'silicon dioxide.'"
  },
  {
    id: "compounds-26",
    type: "free-response",
    question: "Name AgBr",
    correctAnswer: "Silver Bromide",
    explanation: "Silver forms +1 here; bromide is -1 → silver bromide."
  },
  {
    id: "compounds-27",
    type: "free-response",
    question: "Name Mn(ClO4)4",
    correctAnswer: "Manganese (IV) perchlorate",
    explanation: "Each ClO4⁻ is -1 → total -4 → Mn must be +4."
  },
  {
    id: "compounds-28",
    type: "free-response",
    question: "What is the formula of Hexachlorine pentafluoride",
    correctAnswer: "Cl6F5",
    explanation: "Hexa = 6 Cl; penta = 5 F → Cl6F5."
  },
  {
    id: "compounds-29",
    type: "free-response",
    question: "What is the formula of Potassium Sulfide",
    correctAnswer: "K2S",
    explanation: "Sulfide needs 2 valence electrons to fill its shell, 2 potassium"
  },
  {
    id: "compounds-30",
    type: "free-response",
    question: "What is the formula of Copper (II) cyanide",
    correctAnswer: "Cu(CN)2",
    explanation: "Copper is a transition metal and since the charge of 2 cyanide is -2"
  },
  {
    id: "compounds-31",
    type: "free-response",
    question: "What is the formula of Cadmium Antimonide",
    correctAnswer: "Cd3Sb2",
    explanation: "Cd²⁺ and Sb³⁻ combine in a 3:2 ratio."
  },
  {
    id: "compounds-32",
    type: "free-response",
    question: "What is the formula of Octanitrogen monoiodide",
    correctAnswer: "N8I",
    explanation: "Octa = 8 N; mono = 1 I → N8I."
  },
  {
    id: "compounds-35",
    type: "free-response",
    question: "What is the formula of Krypton disulfide",
    correctAnswer: "KrS2",
    explanation: "Following naming rules for binary covalent compounds, the formula is KrS2."
  },
  {
    id: "compounds-36",
    type: "free-response",
    question: "What is the formula of Cobalt (IV) oxide",
    correctAnswer: "CoO2",
    explanation: "Cobalt is a transition metal, oxygen has 6 valence per oxygen"
  },
  {
    id: "compounds-37",
    type: "free-response",
    question: "What is the formula of Barium hydroxide",
    correctAnswer: "Ba(OH)2",
    explanation: "OH- is for 1, Ba needs 2 so 2 hydroxide."
  },
  {
    id: "compounds-38",
    type: "free-response",
    question: "Propane and propyl bromide have similar structures, but very different boiling points. Their structures are shown below. Propse and explanation for the difference in boiling point using intermolecular forces.",
    image: "/images/chemistry/compounds3.png",
    correctAnswer: "Bromine is heavier, so london dispersion has more force because it depends on the size so it has more of a boiling point",
    explanation: "."
  },
  {
    id: "compounds-39",
    type: "free-response",
    question: "Costanzium (Cz) forms a polyatomic ion called costanzate. If calcium costanzate has the formula Ca2(CzO5), what is the formula of Nickel (V) Coztanzate?",
    correctAnswer: "Ni4(CzO5)5",
    explanation: "Math"
  },
  {
    id: "compounds-40a",
    type: "free-response",
    question: "Identify all of the IMFs acting on C6H14",
    correctAnswer: "London dispersion",
    explanation: "."
  },
  {
    id: "compounds-40b",
    type: "free-response",
    question: "Identify all of the IMFs acting on GeH2F2, Ge is the central atom",
    correctAnswer: "London dispersion, Dipole Dipole",
    explanation: "."
  },
  {
    id: "compounds-40c",
    type: "free-response",
    question: "Identify all of the IMFs acting on CH3OH, C is the central atom",
    correctAnswer: "London dispersion, Dipole Dipole, Hydrogen bonding",
    explanation: "."
  },
];
