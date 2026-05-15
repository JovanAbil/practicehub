//Valenti
import { Question } from '@/types/quiz';

export const biochemistryQuestions: Question[] = [
  {
    id: 'biochemistry-1',
    type: 'multiple-choice',
    question: 'Which two types of particles are present in equal numbers in an atom, but not in an ion?',
    options: [
      { label: 'A', value: 'A', text: 'Protons and electrons' },
      { label: 'B', value: 'B', text: 'Protons and neutrons' },
      { label: 'C', value: 'C', text: 'Inner-shell electrons and outer-shell electrons' },
      { label: 'D', value: 'D', text: 'Protons and inner-shell electrons' }
    ],
    correctAnswer: 'A',
    explanation: 'In a neutral atom, the number of protons equals the number of electrons. In an ion, electrons are gained or lost, making the numbers unequal.'
  },
  {
    id: 'biochemistry-2',
    type: 'multiple-choice',
    question: 'Which of the following is responsible for the cohesive property of water?',
    options: [
      { label: 'A', value: 'A', text: 'Hydrogen bonds between the oxygen atoms of two adjacent water molecules' },
      { label: 'B', value: 'B', text: 'Covalent bonds between the hydrogen atoms of two adjacent water molecules' },
      { label: 'C', value: 'C', text: 'Hydrogen bonds between the oxygen atom of one water molecule and a hydrogen atom of another water molecule' },
      { label: 'D', value: 'D', text: 'Covalent bonds between the oxygen atom of one water molecule and a hydrogen atom of another water molecule' }
    ],
    correctAnswer: 'C',
    explanation: 'Cohesion in water results from hydrogen bonds forming between the partially negative oxygen atom of one water molecule and the partially positive hydrogen atom of another.'
  },
  {
    id: 'biochemistry-3',
    type: 'multiple-choice',
    question: 'Fluorine (F) is a strongly electronegative element with seven valence electrons. Compared to the less electronegative sodium (Na), which has one valence electron, fluorine...',
    options: [
      { label: 'A', value: 'A', text: 'Holds electrons loosely around its nucleus' },
      { label: 'B', value: 'B', text: 'Is not as greedy to gain electrons' },
      { label: 'C', value: 'C', text: 'Will have a partial positive charge when it bonds to other elements' },
      { label: 'D', value: 'D', text: 'Is likely to become an anion' }
    ],
    correctAnswer: 'D',
    explanation: 'Fluorine is highly electronegative and needs only one electron to complete its valence shell. It readily gains an electron to form a negatively charged anion (F⁻).'
  },
  {
    id: 'biochemistry-4',
    type: 'multiple-choice',
    question: 'An algae population in a Midwest lake has increased dramatically. Researchers hypothesize this is due to phosphorus from fertilizers. What is the best way to test this hypothesis?',
    options: [
      { label: 'A', value: 'A', text: 'Set up multiple tanks of water and add different concentrations of phosphorus-rich fertilizer. Observe and measure algal growth.' },
      { label: 'B', value: 'B', text: 'Continue observing algae growth in the lake. Compare growth to areas without lawns.' },
      { label: 'C', value: 'C', text: 'Take water samples from the lake and observe the growth.' },
      { label: 'D', value: 'D', text: 'Remove algae from the lake and start a lab culture. Place different amounts in clean water and see if they survive.' }
    ],
    correctAnswer: 'A',
    explanation: 'A controlled experiment with multiple tanks and varying phosphorus concentrations allows researchers to isolate the variable and establish causation.'
  },
  {
    id: 'biochemistry-5',
    type: 'multiple-choice',
    question: 'The synthesis of protein or carbohydrate polymers always produces which of the following as a byproduct?',
    options: [
      { label: 'A', value: 'A', text: 'ATP' },
      { label: 'B', value: 'B', text: 'Oxygen' },
      { label: 'C', value: 'C', text: 'Carbon dioxide' },
      { label: 'D', value: 'D', text: 'Water' }
    ],
    correctAnswer: 'D',
    explanation: 'Dehydration synthesis (condensation reaction) joins monomers to form polymers by removing a water molecule (H₂O) as a byproduct.'
  },
  {
    id: 'biochemistry-6',
    type: 'multiple-choice',
    question: 'Several different amino acids join together to form a protein. How do any two types of amino acids differ from one another?',
    options: [
      { label: 'A', value: 'A', text: 'The number of amino groups in the molecule' },
      { label: 'B', value: 'B', text: 'The number of carboxyl groups in the molecule' },
      { label: 'C', value: 'C', text: 'The chemical structure of the R group in the molecule' },
      { label: 'D', value: 'D', text: 'The number of chemical bonds formed by the central carbon atom' }
    ],
    correctAnswer: 'C',
    explanation: 'All amino acids have the same basic structure (amino group, carboxyl group, hydrogen, and central carbon). They differ only in their R group (side chain).'
  },
  {
    id: 'biochemistry-7',
    type: 'multiple-choice',
    question: 'In a chemical reaction, which event ALWAYS occurs as the reaction proceeds?',
    options: [
      { label: 'A', value: 'A', text: 'The rearrangement of electrons to break or form chemical bonds' },
      { label: 'B', value: 'B', text: 'The release of energy to the environment' },
      { label: 'C', value: 'C', text: 'The absorption of energy from the environment' },
      { label: 'D', value: 'D', text: 'A change in total mass' }
    ],
    correctAnswer: 'A',
    explanation: 'All chemical reactions involve breaking and/or forming chemical bonds through electron rearrangement. Energy may be released or absorbed, but electron rearrangement always occurs.'
  },
  {
    id: 'biochemistry-8',
    type: 'multiple-choice',
    question: 'What is the effect of an enzyme on the energy of a chemical reaction?',
    options: [
      { label: 'A', value: 'A', text: 'Enzymes increase the free energy of the products' },
      { label: 'B', value: 'B', text: 'Enzymes decrease the free energy of the reactants' },
      { label: 'C', value: 'C', text: 'Enzymes decrease the difference in energy between products and reactants' },
      { label: 'D', value: 'D', text: 'Enzymes decrease the activation energy of the reaction' }
    ],
    correctAnswer: 'D',
    explanation: 'Enzymes act as biological catalysts that lower the activation energy required for a reaction to proceed, without changing the overall energy change of the reaction.'
  },
  {
    id: 'biochemistry-9',
    type: 'multiple-choice',
    question: 'Which of these molecular structures could be found in a lipid, but not a carbohydrate, protein, or nucleic acid?',
    options: [
      { label: 'A', value: 'A', text: 'A long chain of carbon, oxygen, and nitrogen atoms' },
      { label: 'B', value: 'B', text: 'A long chain made up only of carbon and hydrogen atoms' },
      { label: 'C', value: 'C', text: 'A phosphate group joined to a chain of carbon atoms' },
      { label: 'D', value: 'D', text: 'An amino group and a carboxylic group bonded together' }
    ],
    correctAnswer: 'B',
    explanation: 'Lipids contain long hydrocarbon chains (only C and H atoms) called fatty acid tails. This structure is unique to lipids and not found in the other macromolecules.'
  },
  {
    id: 'biochemistry-10',
    type: 'multiple-choice',
    question: 'Which type of macromolecule has the function of storing and transmitting hereditary or genetic information?',
    options: [
      { label: 'A', value: 'A', text: 'Lipid' },
      { label: 'B', value: 'B', text: 'Carbohydrate' },
      { label: 'C', value: 'C', text: 'Nucleic acid' },
      { label: 'D', value: 'D', text: 'Protein' }
    ],
    correctAnswer: 'C',
    explanation: 'Nucleic acids (DNA and RNA) store and transmit genetic information through sequences of nucleotides.'
  },
  {
    id: 'biochemistry-11',
    type: 'multiple-choice',
    question: 'Which part of a phospholipid is hydrophobic?',
    options: [
      { label: 'A', value: 'A', text: 'Fatty acid chains (tails)' },
      { label: 'B', value: 'B', text: 'Phosphate group (head)' },
      { label: 'C', value: 'C', text: 'The entire molecule is hydrophobic' },
      { label: 'D', value: 'D', text: 'None of it is hydrophobic' }
    ],
    correctAnswer: 'A',
    explanation: 'The fatty acid chains (tails) are nonpolar and hydrophobic (water-repelling). The phosphate head is polar and hydrophilic (water-attracting).'
  },
  {
    id: 'biochemistry-12',
    type: 'multiple-choice',
    question: 'What event changes an atom into an ion?',
    options: [
      { label: 'A', value: 'A', text: 'The sharing of electrons with another atom' },
      { label: 'B', value: 'B', text: 'The gain or loss of one or more electrons' },
      { label: 'C', value: 'C', text: 'The gain or loss of one or more neutrons' },
      { label: 'D', value: 'D', text: 'A chemical reaction that forms a molecule' }
    ],
    correctAnswer: 'B',
    explanation: 'An ion forms when an atom gains or loses electrons, resulting in a net positive (cation) or negative (anion) charge.'
  },
  {
    id: 'biochemistry-13',
    type: 'multiple-choice',
    question: 'Which of the following is NOT an example of a macromolecule?',
    options: [
      { label: 'A', value: 'A', text: 'Glucose' },
      { label: 'B', value: 'B', text: 'Cholesterol' },
      { label: 'C', value: 'C', text: 'ATP' },
      { label: 'D', value: 'D', text: 'Sodium chloride' }
    ],
    correctAnswer: 'D',
    explanation: 'Sodium chloride (NaCl) is a simple ionic compound, not a macromolecule. Macromolecules are large organic molecules like proteins, carbohydrates, lipids, and nucleic acids.'
  },
  {
    id: 'biochemistry-14',
    type: 'multiple-choice',
    question: 'What functional groups will be joined together if two amino acid molecules combine to form a single molecule?',
    options: [
      { label: 'A', value: 'A', text: 'An amino group and a carboxyl group' },
      { label: 'B', value: 'B', text: 'Two amino groups' },
      { label: 'C', value: 'C', text: 'An amino group and a methyl group' },
      { label: 'D', value: 'D', text: 'A hydrogen atom and a methyl group' }
    ],
    correctAnswer: 'A',
    explanation: 'Amino acids join through a dehydration synthesis reaction between the amino group (-NH₂) of one amino acid and the carboxyl group (-COOH) of another, forming a peptide bond.'
  },
  {
    id: 'biochemistry-15',
    type: 'multiple-choice',
    question: 'Two amino acids unite by forming a(n)?',
    options: [
      { label: 'A', value: 'A', text: 'Oxygen bond' },
      { label: 'B', value: 'B', text: 'Hydrogen bond' },
      { label: 'C', value: 'C', text: 'Peptide bond' },
      { label: 'D', value: 'D', text: 'Ionic bond' }
    ],
    correctAnswer: 'C',
    explanation: 'A peptide bond is a covalent bond that forms between the amino group of one amino acid and the carboxyl group of another during protein synthesis.'
  },
  {
    id: 'biochemistry-16',
    type: 'multiple-choice',
    question: 'The union of many amino acids forms a macromolecule called a?',
    options: [
      { label: 'A', value: 'A', text: 'Lipid' },
      { label: 'B', value: 'B', text: 'Nucleic acid' },
      { label: 'C', value: 'C', text: 'Carbohydrate' },
      { label: 'D', value: 'D', text: 'Protein' }
    ],
    correctAnswer: 'D',
    explanation: 'Proteins are macromolecules made up of chains of amino acids linked by peptide bonds. They perform a wide variety of functions in cells.'
  },
  {
    id: 'biochemistry-17',
    type: 'multiple-choice',
    question: 'Water and oil don\'t mix, so water alone doesn\'t wash away oily dirt effectively. Soap can mix with both water and oil, allowing dirt to be washed away. Which statement provides the most logical chemical explanation?',
    options: [
      { label: 'A', value: 'A', text: 'Soap molecules have both positively and negatively charged regions. Positive regions attract water; negative regions attract oil.' },
      { label: 'B', value: 'B', text: 'Soap molecules have both positively and negatively charged regions. Negative regions attract water; positive regions attract oil.' },
      { label: 'C', value: 'C', text: 'Soap molecules carry no charge. Soap forms a bridge between charged water molecules and neutral oil molecules.' },
      { label: 'D', value: 'D', text: 'Soap molecules have charged regions and neutral regions. Charged regions attract water; neutral regions attract oils.' }
    ],
    correctAnswer: 'D',
    explanation: 'Soap molecules are amphipathic, with polar (charged/hydrophilic) heads that interact with water and nonpolar (neutral/hydrophobic) tails that interact with oils and grease.'
  },
  {
    id: 'biochemistry-18',
    type: 'multiple-choice',
    question: 'A feather experiment shows that wax coating prevents water from soaking through paper. The results are MOST USEFUL for explaining which function of lipids in organisms?',
    options: [
      { label: 'A', value: 'A', text: 'Forming a waterproof covering on feathers, leaves, and fruits' },
      { label: 'B', value: 'B', text: 'Providing energy for the cell' },
      { label: 'C', value: 'C', text: 'Allowing water to pass through the cell membrane' },
      { label: 'D', value: 'D', text: 'Replacing water in dry environments' }
    ],
    correctAnswer: 'A',
    explanation: 'The waxy coating (a type of lipid) repels water, demonstrating how lipids form waterproof barriers in nature, such as on feathers, leaves, and fruits.'
  },
  {
    id: 'biochemistry-19',
    type: 'multiple-choice',
    question: 'The wax-coated feather experiment results MOST STRONGLY support which conclusion about the polarity of lipid molecules?',
    options: [
      { label: 'A', value: 'A', text: 'Lipid molecules are polar because they mix poorly with liquids such as water' },
      { label: 'B', value: 'B', text: 'Lipid molecules are polar because they adhere tightly to smooth surfaces' },
      { label: 'C', value: 'C', text: 'Lipid molecules are nonpolar because they repel water molecules, which are also nonpolar' },
      { label: 'D', value: 'D', text: 'Lipid molecules are nonpolar because they repel water molecules, which are polar' }
    ],
    correctAnswer: 'D',
    explanation: 'Lipids are nonpolar molecules. Water molecules are polar. "Like dissolves like" - polar and nonpolar substances don\'t mix, which is why lipids repel water.'
  },
  {
    id: 'biochemistry-20',
    type: 'multiple-choice',
    question: 'A phospholipid is composed of?',
    options: [
      { label: 'A', value: 'A', text: 'One glycerol molecule linked to 3 fatty acids' },
      { label: 'B', value: 'B', text: 'One fatty acid molecule linked to 3 glycerol molecules' },
      { label: 'C', value: 'C', text: 'One fatty acid molecule linked to one glycerol molecule and two phosphate groups' },
      { label: 'D', value: 'D', text: 'One glycerol molecule linked to one phosphate group and two fatty acids' }
    ],
    correctAnswer: 'D',
    explanation: 'A phospholipid has a glycerol backbone attached to two fatty acid tails and one phosphate group head, making it amphipathic (both hydrophobic and hydrophilic).'
  },
  {
    id: 'biochemistry-21',
    type: 'multiple-choice',
    question: 'Several scientific hypotheses attempt to explain how life originated on Earth. Which best describes the common theme across these hypotheses?',
    options: [
      { label: 'A', value: 'A', text: 'Life required a source of energy and a way to concentrate molecules to allow complex reactions to occur.' },
      { label: 'B', value: 'B', text: 'Life could have begun once DNA and proteins appeared together at the same time.' },
      { label: 'C', value: 'C', text: 'Life must have been created fully formed, since chemical reactions alone cannot produce complexity' },
      { label: 'D', value: 'D', text: 'Life began only after the appearance of multicellular organisms capable of photosynthesis.' }
    ],
    correctAnswer: 'A',
    explanation: 'Most origin-of-life theories propose that early life needed energy sources and mechanisms to concentrate organic molecules, allowing increasingly complex chemical reactions to occur.'
  },
  {
    id: 'biochemistry-22',
    type: 'free-response',
    question: 'Enzymes play a crucial role in facilitating chemical reactions within living organisms. One such enzyme, lactase, is responsible for breaking down lactose, a sugar found in dairy products. What type of macromolecule is lactase?',
    correctAnswer: 'Protein',
    explanation: 'All enzymes are proteins. They are biological catalysts that speed up chemical reactions in living organisms.'
  },
  {
    id: 'biochemistry-23',
    type: 'free-response',
    question: 'A CSW student is given three test tubes containing insulin (a protein hormone), lactose (a disaccharide), and RNA. Test 1 shows tubes 1 and 2 are positive for nitrogen, but only tube 2 is positive for sulfur. Test 2 shows tube 1 contains a high percentage of phosphate. What is in tube 1?',
    correctAnswer: 'RNA',
    explanation: 'Tube 1 contains RNA. It has nitrogen (present in nucleic acids) and phosphate (in the sugar-phosphate backbone), but no sulfur. Tube 2 (with nitrogen and sulfur) is insulin (protein). Tube 3 is lactose (carbohydrate, no N or P).'
  },
  {
    id: 'biochemistry-24',
    type: 'free-response',
    question: 'Based on the test results (tubes 1 and 2 positive for nitrogen, only tube 2 positive for sulfur, tube 1 has high phosphate), what is in tube 2?',
    correctAnswer: 'Insulin',
    explanation: 'Tube 2 contains insulin (protein). Proteins contain nitrogen in amino groups, and some amino acids (like cysteine and methionine) contain sulfur. Insulin does not contain phosphate.'
  },
  {
    id: 'biochemistry-25',
    type: 'free-response',
    question: 'Based on the test results (tubes 1 and 2 positive for nitrogen, only tube 2 positive for sulfur, tube 1 has high phosphate), what is in tube 3?',
    correctAnswer: 'Lactose',
    explanation: 'Tube 3 contains lactose (a disaccharide/carbohydrate). Carbohydrates are made of C, H, and O only - they lack nitrogen, sulfur, and phosphate.'
  },
  {
    id: 'biochemistry-26',
    type: 'multiple-choice',
    question: 'The diagram shows the structure of a water molecule. What allows the three atoms in a water molecule to stay together?',
    image: "/images/biology/biochem1.png",
    options: [
      { label: 'A', value: 'A', text: 'Covalent bonds are formed by shared electrons between atoms' },
      { label: 'B', value: 'B', text: 'Covalent bonds are formed by electrons that transfer between atoms' },
      { label: 'C', value: 'C', text: 'Ionic bonds are formed by electrons that transfer between atoms' },
      { label: 'D', value: 'D', text: 'Hydrogen bonds are formed only by the electrons of the hydrogen atoms' }
    ],
    correctAnswer: 'A',
    explanation: 'Being covalently bonded is when nonmetals combine by sharing electrons.'
  },
  {
    id: 'biochemistry-27a',
    type: 'free-response',
    question: 'Which of the above molecules is a sugar?',
    image: "/images/biology/biochem2.png",
    correctAnswer: 'C',
    explanation: 'N/A'
  },
  {
    id: 'biochemistry-27b',
    type: 'free-response',
    question: 'Which of the above molecules is a fatty acid?',
    image: "/images/biology/biochem2.png",
    correctAnswer: 'A',
    explanation: 'N/A'
  },
  {
    id: 'biochemistry-27c',
    type: 'free-response',
    question: 'Which of the above molecules is a nucleic acid?',
    image: "/images/biology/biochem2.png",
    correctAnswer: 'B',
    explanation: 'N/A'
  },
  {
    id: 'biochemistry-27d',
    type: 'free-response',
    question: 'Which of the above molecules is a amino acid?',
    image: "/images/biology/biochem2.png",
    correctAnswer: 'D',
    explanation: 'N/A'
  },
  {
    id: 'biochemistry-27e',
    type: 'multiple-choice',
    question: 'What is the polymer of option B?',
    image: "/images/biology/biochem2.png",
    options: [
      { label: 'A', value: 'A', text: 'DNA' },
      { label: 'B', value: 'B', text: 'Polysaccharide' },
      { label: 'C', value: 'C', text: 'Protien' },
      { label: 'D', value: 'D', text: 'Lipid' }
    ],
    correctAnswer: 'A',
    explanation: 'B contains phosphorus and nitrogen which are both present in nucleic acid which makes up DNA.'
  },
  {
    id: 'biochemistry-27f',
    type: 'multiple-choice',
    question: 'What is the polymer of option C?',
    image: "/images/biology/biochem2.png",
    options: [
      { label: 'A', value: 'A', text: 'DNA' },
      { label: 'B', value: 'B', text: 'Polysaccharide' },
      { label: 'C', value: 'C', text: 'Protien' },
      { label: 'D', value: 'D', text: 'Lipid' }
    ],
    correctAnswer: 'B',
    explanation: 'C contains only carbon, oxygen, and hydrogen without any long chains which means it is a carbohydrate and that is a polysaccharide.'
  },
  {
    id: 'biochemistry-28',
    type: 'free-response',
    question: 'Look at the two types of fatty acids below. Label each fatty acid as saturated or unsaturated. What is the main difference between these two molecules? Provide one example of each difference.',
    image: "/images/biology/biochem3.png",
    correctAnswer: 'The main difference is unsaturated fatty acids are connected through a double bond between carbon atoms while saturated fats dont have a double bond between carbon bonds.',
    explanation: 'N/A'
  },
  {
    id: 'biochemistry-29',
    type: 'multiple-choice',
    question: 'Which change to the model would improve its accuracy',
    image: "/images/biology/biochem4.png",
    options: [
      { label: 'A', value: 'A', text: 'Move each neutron so it is next to a proton.' },
      { label: 'B', value: 'B', text: 'Move the protons and neutrons to a small space in the center' },
      { label: 'C', value: 'C', text: 'Move the protons and electrons to a small space in the center' },
      { label: 'D', value: 'D', text: 'Move all the particles so that they are evenly space' }
    ],
    correctAnswer: 'B',
    explanation: 'It is specific with moving protons and neutrons only to the center, A isnt specific and C & D are just wrong.'
  },
  {
    id: 'biochemistry-30',
    type: 'multiple-choice',
    question: 'What property of a water molecule allows hydrogen bonds to form among adjacent molecules?',
    image: "/images/biology/biochem5.png",
    options: [
      { label: 'A', value: 'A', text: 'The strong covalent bonds that hold the oxygen atom to each hydrogen atom.' },
      { label: 'B', value: 'B', text: 'The ionic bonds that form after the molecule separates into a hydroxide ion (OH-) and hydrogen ion (H+)' },
      { label: 'C', value: 'C', text: 'The small size of the 2 hydrogen atoms compared to the oxygen atom' },
      { label: 'D', value: 'D', text: 'The polarity of the molecule, which involves a slightly negative oxygen atom and a slightly positive hydrogen atoms' }
    ],
    correctAnswer: 'D',
    explanation: 'Polarity makes sense here, covalent only works between 1 molecule not outer, ionic bonds arent used for 2 nonmetals, size doesnt matter; electronegativity does.'
  },
];
