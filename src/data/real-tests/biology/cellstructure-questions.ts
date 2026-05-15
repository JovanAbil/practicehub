import { Question } from '@/types/quiz';

export const cellstructureQuestions: Question[] = [
  {
    id: 'cellstructure-1',
    type: 'multiple-choice',
    question: 'The following question refers to the diagram below. Which of the following is the site of modification and packaging of proteins and lipids prior to export from the cell?',
    image: '/images/biology/cellstructure1.png',
    options: [
      { label: 'A', value: 'A', text: 'A' },
      { label: 'B', value: 'B', text: 'B' },
      { label: 'C', value: 'C', text: 'C' },
      { label: 'D', value: 'D', text: 'D' }
    ],
    correctAnswer: 'C',
    explanation: 'The Golgi body modifies, sorts, and packages proteins and lipids for export.'
  },
  {
    id: 'cellstructure-2',
    type: 'multiple-choice',
    question: 'The organelle that is a major producer of ATP and is found in both heterotrophs and autotrophs is the',
    options: [
      { label: 'A', value: 'A', text: 'Chloroplast' },
      { label: 'B', value: 'B', text: 'Nucleus' },
      { label: 'C', value: 'C', text: 'Ribosome' },
      { label: 'D', value: 'D', text: 'Mitochondrion' }
    ],
    correctAnswer: 'D',
    explanation: 'Mitochondria perform cellular respiration to generate ATP in most eukaryotic cells.'
  },
  {
    id: 'cellstructure-3',
    type: 'multiple-choice',
    question: 'Simple diffusion and facilitated diffusion are related in that both',
    options: [
      { label: 'A', value: 'A', text: 'require protein carriers' },
      { label: 'B', value: 'B', text: 'depend on the concentration gradient' },
      { label: 'C', value: 'C', text: 'occur via contractions of cytoskeletal elements attached to membrane proteins' },
      { label: 'D', value: 'D', text: 'are endergonic processes and thus require the hydrolysis of ATP' }
    ],
    correctAnswer: 'B',
    explanation: 'Both processes move molecules from high to low concentration without using energy.'
  },
  {
    id: 'cellstructure-4',
    type: 'multiple-choice',
    question: 'Which of the following components of the cell membrane is responsible for active transport?',
    options: [
      { label: 'A', value: 'A', text: 'Phospholipid' },
      { label: 'B', value: 'B', text: 'Protein' },
      { label: 'C', value: 'C', text: 'Lipid' },
      { label: 'D', value: 'D', text: 'Phosphate' }
    ],
    correctAnswer: 'B',
    explanation: 'Membrane proteins pump substances across the membrane using ATP.'
  },
  {
    id: 'cellstructure-5',
    type: 'multiple-choice',
    question: 'The following question refers to the graph below, which illustrates the percent change in the mass of pieces of plant tissue placed in solutions of different sucrose molarities.',
    image: '/images/biology/cellstructure2.png',
    options: [
      { label: 'A', value: 'A', text: 'Endocytosis' },
      { label: 'B', value: 'B', text: 'Phagocytosis' },
      { label: 'C', value: 'C', text: 'Osmosis' },
      { label: 'D', value: 'D', text: 'Active transport' }
    ],
    correctAnswer: 'C',
    explanation: 'The mass change results from water movement across the membrane through osmosis.'
  },
  {
    id: 'cellstructure-6',
    type: 'multiple-choice',
    question: 'The interior region of a phospholipid bilayer is',
    options: [
      { label: 'A', value: 'A', text: 'Hydrophilic' },
      { label: 'B', value: 'B', text: 'Hydrophobic' },
      { label: 'C', value: 'C', text: 'Polar' },
      { label: 'D', value: 'D', text: 'Hydrophilic and polar' }
    ],
    correctAnswer: 'B',
    explanation: 'Phospholipid tails are nonpolar and hydrophobic, forming the interior of the membrane.'
  },
  {
    id: 'cellstructure-7',
    type: 'multiple-choice',
    question: 'You are adrift in the Atlantic Ocean, and being thirsty, you drink the surrounding seawater. As a result,',
    options: [
      { label: 'A', value: 'A', text: 'your cells lyse, due to the excessive intake of salt' },
      { label: 'B', value: 'B', text: 'your cells become turgid' },
      { label: 'C', value: 'C', text: 'you dehydrate yourself' },
      { label: 'D', value: 'D', text: 'you quench your thirst' }
    ],
    correctAnswer: 'C',
    explanation: 'Seawater is hypertonic, causing water to leave your cells and leading to dehydration.'
  },
  {
    id: 'cellstructure-8',
    type: 'multiple-choice',
    question: 'Most of the cell’s enzymes are',
    options: [
      { label: 'A', value: 'A', text: 'lipids' },
      { label: 'B', value: 'B', text: 'proteins' },
      { label: 'C', value: 'C', text: 'carbohydrates' },
      { label: 'D', value: 'D', text: 'nucleic acids' }
    ],
    correctAnswer: 'B',
    explanation: 'Enzymes are proteins that catalyze biochemical reactions.'
  },
  {
    id: 'cellstructure-9',
    type: 'multiple-choice',
    question: 'Which of the following statements is a part of cell theory?',
    options: [
      { label: 'A', value: 'A', text: 'Cells are composed mostly of empty space' },
      { label: 'B', value: 'B', text: 'Cells are generally large enough for the unaided eye to see' },
      { label: 'C', value: 'C', text: 'All cells are produced from existing cells' },
      { label: 'D', value: 'D', text: 'Only animals are made up of cells' }
    ],
    correctAnswer: 'C',
    explanation: 'One main principle of cell theory is that all cells come from pre-existing cells.'
  },
  {
    id: 'cellstructure-10',
    type: 'multiple-choice',
    question: 'All cells contain cell membranes. Which of the following describes the composition of cell membranes?',
    options: [
      { label: 'A', value: 'A', text: 'Cell membranes are composed of carbohydrate chains, which allow all materials to enter and leave the cell.' },
      { label: 'B', value: 'B', text: 'Cell membranes are composed of cytoplasm, which allows proteins to be excreted by the cell.' },
      { label: 'C', value: 'C', text: 'Cell membranes are composed of cellulose, which provides rigidity for the cell' },
      { label: 'D', value: 'D', text: 'Cell membranes are composed of lipid molecules, which provide a flexible structure' }
    ],
    correctAnswer: 'D',
    explanation: 'Cell membranes consist of a phospholipid bilayer that provides flexibility and selective permeability.'
  },
  {
    id: 'cellstructure-11',
    type: 'multiple-choice',
    question: 'The model shows a substance crossing a cell membrane.',
    image: '/images/biology/cellstructure3.png',
    options: [
      { label: 'A', value: 'A', text: 'The model shows the process of active transport because the solute particles are moving from an area of low concentration to high concentration.' },
      { label: 'B', value: 'B', text: 'The model shows the process of bulk transport because the solute particles are moving from an area of low concentration to high concentration.' },
      { label: 'C', value: 'C', text: 'The model shows the process of diffusion because solute particles are moving from an area of high concentration to low concentration.' },
      { label: 'D', value: 'D', text: 'The model shows the process of osmosis because the solute particles are moving from an area of high concentration to low concentration.' }
    ],
    correctAnswer: 'C',
    explanation: 'Diffusion moves particles from high to low concentration across the membrane.'
  },
  {
    id: 'cellstructure-12',
    type: 'multiple-choice',
    question: 'A cell is placed in an isotonic solution. How does the cell maintain homeostasis in this environment?',
    options: [
      { label: 'A', value: 'A', text: 'There is no movement of water molecules into or out of the cell because the concentrations of solute particles inside and outside the cell are the same' },
      { label: 'B', value: 'B', text: 'Water will move across the cell membrane to the inside of the cell because the concentration of solute particles is higher than the solution' },
      { label: 'C', value: 'C', text: 'Water will move across the cell membrane to the outside of the cell because the solution has a higher concentration of solute particles than the cell' },
      { label: 'D', value: 'D', text: 'Water will move across the cell membrane in both directions because the concentrations of solute particles inside and outside the cell are the same' }
    ],
    correctAnswer: 'D',
    explanation: 'Water moves equally in both directions, maintaining equilibrium in an isotonic solution.'
  },
  {
    id: 'cellstructure-13',
    type: 'multiple-choice',
    question: 'Insulin is a protein that is produced by pancreatic cells and secreted into the bloodstream. Which of the following options correctly lists the order of structures through which insulin passes from its production to its exit from the cell?',
    options: [
      { label: 'A', value: 'A', text: 'Rough ER, transport vesicles, Golgi apparatus, transport vesicles, cell membrane' },
      { label: 'B', value: 'B', text: 'Rough ER, lysosomes, transport vesicles, cell membrane' },
      { label: 'C', value: 'C', text: 'Rough ER, Golgi apparatus, smooth ER, cell membrane' },
      { label: 'D', value: 'D', text: 'Rough ER, transport vesicles, cell membrane' }
    ],
    correctAnswer: 'A',
    explanation: 'Proteins travel from the rough ER to the Golgi and then to the membrane through vesicles.'
  },
  {
    id: 'cellstructure-14',
    type: 'multiple-choice',
    question: 'Which of the following would best explain why plant cells are less likely than animal cells to burst in a hypotonic environment?',
    options: [
      { label: 'A', value: 'A', text: 'Plant cells have rigid cell walls that resist osmotic pressure' },
      { label: 'B', value: 'B', text: 'Plant cells have fewer aquaporins in their membranes' },
      { label: 'C', value: 'C', text: 'Plant cells maintain a constant internal solute concentration' },
      { label: 'D', value: 'D', text: 'Plant cells use active transport to remove excess water' }
    ],
    correctAnswer: 'A',
    explanation: 'The rigid cell wall prevents plant cells from bursting when water enters.'
  },
  {
    id: 'cellstructure-15',
    type: 'multiple-choice',
    question: 'A student adds a drop of dye to a beaker of water. Over time, the dye spreads evenly throughout the water. Which of the following best explains this observation?',
    options: [
      { label: 'A', value: 'A', text: 'Water molecules actively transport dye molecules across concentration gradients' },
      { label: 'B', value: 'B', text: 'The dye molecules move randomly due to kinetic energy until equilibrium is reached' },
      { label: 'C', value: 'C', text: 'The dye molecules attract water molecules through hydrogen bonding' },
      { label: 'D', value: 'D', text: 'Osmosis causes dye molecules to move to areas of low solute concentration' }
    ],
    correctAnswer: 'B',
    explanation: 'Diffusion results from random molecular movement until equilibrium is reached.'
  },
  {
    id: 'cellstructure-16',
    type: 'multiple-choice',
    question: 'The smooth endoplasmic reticulum (SER) would be most abundant in cells that:',
    options: [
      { label: 'A', value: 'A', text: 'Produce digestive enzymes' },
      { label: 'B', value: 'B', text: 'Secrete antibodies' },
      { label: 'C', value: 'C', text: 'Detoxify chemicals' },
      { label: 'D', value: 'D', text: 'Carry out photosynthesis' }
    ],
    correctAnswer: 'C',
    explanation: 'The SER is responsible for detoxification and lipid synthesis.'
  },
  {
    id: 'cellstructure-17',
    type: 'multiple-choice',
    question: 'Which of the following would most likely occur if a cell’s lysosomes ruptured?',
    options: [
      { label: 'A', value: 'A', text: 'The cell would be unaffected, as enzymes are inactive in the cytoplasm' },
      { label: 'B', value: 'B', text: 'The cell would die due to digestive enzyme release' },
      { label: 'C', value: 'C', text: 'Protein synthesis would increase' },
      { label: 'D', value: 'D', text: 'The nucleus would immediately break down' }
    ],
    correctAnswer: 'B',
    explanation: 'Lysosomal enzymes can digest the cell when released into the cytoplasm.'
  },
  {
    id: 'cellstructure-18',
    type: 'multiple-choice',
    question: 'Which of the following best explains why mitochondria and chloroplasts are believed to have evolved from prokaryotic organisms?',
    options: [
      { label: 'A', value: 'A', text: 'Both contain circular DNA and reproduce independently of the cell' },
      { label: 'B', value: 'B', text: 'Both are surrounded by a single membrane and lack ribosomes' },
      { label: 'C', value: 'C', text: 'Both synthesize proteins in the nucleus' },
      { label: 'D', value: 'D', text: 'Both contain centrioles and cytoskeletons' }
    ],
    correctAnswer: 'A',
    explanation: 'Mitochondria and chloroplasts share traits with prokaryotes, supporting endosymbiotic theory.'
  },
  {
    id: 'cellstructure-19',
    type: 'multiple-choice',
    question: 'A red blood cell placed in a 10% NaCl solution would likely',
    options: [
      { label: 'A', value: 'A', text: 'Swell and burst as water enters by osmosis' },
      { label: 'B', value: 'B', text: 'Shrink because water moves out by osmosis' },
      { label: 'C', value: 'C', text: 'Stay the same because it is isotonic' },
      { label: 'D', value: 'D', text: 'Remain unchanged because solutes freely diffuse' }
    ],
    correctAnswer: 'B',
    explanation: 'The solution is hypertonic, causing water to leave the cell and the cell to shrink.'
  },
  {
    id: 'cellstructure-20',
    type: 'multiple-choice',
    question: 'Which of the following best represents an example of active transport?',
    options: [
      { label: 'A', value: 'A', text: 'Movement of CO₂ across a cell membrane' },
      { label: 'B', value: 'B', text: 'Uptake of glucose through a carrier protein using ATP' },
      { label: 'C', value: 'C', text: 'Osmotic flow of water into a plant cell' },
      { label: 'D', value: 'D', text: 'Diffusion of oxygen into muscle cells' }
    ],
    correctAnswer: 'B',
    explanation: 'Active transport requires energy (ATP) to move molecules against their gradient.'
  },
  {
    id: 'cellstructure-21',
    type: 'multiple-choice',
    question: 'A vesicle containing neurotransmitters fuses with the plasma membrane to release its contents. Which process does this represent?',
    options: [
      { label: 'A', value: 'A', text: 'Endocytosis' },
      { label: 'B', value: 'B', text: 'Phagocytosis' },
      { label: 'C', value: 'C', text: 'Exocytosis' },
      { label: 'D', value: 'D', text: 'Facilitated Diffusion' }
    ],
    correctAnswer: 'C',
    explanation: 'Exocytosis releases substances from vesicles by fusing with the membrane.'
  },
  {
    id: 'cellstructure-22',
    type: 'multiple-choice',
    question: 'Which of the following structures are present in both plant and animal cells?',
    options: [
      { label: 'A', value: 'A', text: 'Cell walls' },
      { label: 'B', value: 'B', text: 'Centrioles' },
      { label: 'C', value: 'C', text: 'Chloroplasts' },
      { label: 'D', value: 'D', text: 'Mitochondria' }
    ],
    correctAnswer: 'D',
    explanation: 'Both plant and animal cells contain mitochondria for cellular respiration.'
  },
  {
    id: 'cellstructure-23',
    type: 'multiple-choice',
    question: 'Which organelle allows plants to support heavy structures such as leaves and flowers?',
    options: [
      { label: 'A', value: 'A', text: 'The cell membrane because it regulates what enters and leaves the cell' },
      { label: 'B', value: 'B', text: 'The chloroplasts because they convert sunlight into chemical energy' },
      { label: 'C', value: 'C', text: 'The Golgi apparatus because it packages proteins for storage in the cells' },
      { label: 'D', value: 'D', text: 'The vacuole because it is filled with fluid, which provides rigidity' }
    ],
    correctAnswer: 'D',
    explanation: 'A large central vacuole provides turgor pressure to support plant structures.'
  },
  {
    id: 'cellstructure-24',
    type: 'multiple-choice',
    question: 'Despite differences in size and shape, at some point, all cells have DNA and a',
    options: [
      { label: 'A', value: 'A', text: 'cell wall' },
      { label: 'B', value: 'B', text: 'cell membrane' },
      { label: 'C', value: 'C', text: 'mitochondrion' },
      { label: 'D', value: 'D', text: 'nucleus' }
    ],
    correctAnswer: 'B',
    explanation: 'All cells have a cell membrane to control movement of materials.'
  },
  {
    id: 'cellstructure-25',
    type: 'multiple-choice',
    question: 'German scientists Schleiden and Schwann determined that the basic unit of structure and function in living things is the',
    options: [
      { label: 'A', value: 'A', text: 'atom' },
      { label: 'B', value: 'B', text: 'molecule' },
      { label: 'C', value: 'C', text: 'cell' },
      { label: 'D', value: 'D', text: 'nucleus' }
    ],
    correctAnswer: 'C',
    explanation: 'They concluded that all living things are composed of cells, the basic unit of life.'
  },
  {
    id: 'cellstructure-26',
    type: 'free-response',
    question: 'During an investigation of a freshwater lake, a CSW Biology student discovers a previously unknown microscopic organism. Further study shows that the unicellular organism is eukaryotic. Identify FOUR organelles that should be present in the eukaryotic organism and describe the function of each organelle.',
    correctAnswer: 'Mitochondria: give energy. Nucleus: stores DNA. Ribosomes: make proteins. Golgi apparatus: sorts and modifies proteins.',
    explanation: 'Eukaryotic cells contain membrane-bound organelles needed for energy, protein production, and processing.',
    displayAs: 'paragraph'
  },
  {
    id: 'cellstructure-27',
    type: 'free-response',
    question: 'The following experiment was conducted using dialysis tubing filled with a 10% sucrose solution and immersed in a beaker containing a 20% sucrose solution. Predict the direction of water movement and justify your answer in terms of water potential.',
    correctAnswer: 'Water will have a net loss and leave the dialysis tubing because it is in a hypertonic solution, and to maintain stability it removes water from inside to match the concentration.',
    explanation: 'Water moves from higher to lower water potential, leaving the bag because the outside is hypertonic.',
    displayAs: 'paragraph'
  },
  {
    id: 'cellstructure-28',
    type: 'free-response',
    question: 'The following experiment was conducted using dialysis tubing filled with a 10% sucrose solution and immersed in a beaker containing a 20% sucrose solution. Explain how this setup models osmosis in living cells.',
    correctAnswer: 'It models osmosis in living cells by showing how cells will shrink if placed in a hypertonic solution, as happens with animal cells.',
    explanation: 'It demonstrates how water moves out of a cell when the surrounding environment has lower water potential.',
    displayAs: 'paragraph'
  },
  {
    id: 'cellstructure-29',
    type: 'free-response',
    question: 'The following experiment was conducted using dialysis tubing filled with a 10% sucrose solution and immersed in a beaker containing a 20% sucrose solution. If a student boiled the dialysis bag before the experiment, how might that alter the results and why?',
    correctAnswer: 'If a student boiled the dialysis bag, some of the water would boil out, leaving a higher concentration of sucrose. This may make the solution hypotonic or isotonic, so water may not move as intended and alter the results.',
    explanation: 'Boiling changes internal concentration and membrane permeability, affecting osmosis.',
    displayAs: 'paragraph'
  },
  {
    id: 'cellstructure-30',
    type: 'free-response',
    question: 'The cell membrane is often described as a fluid mosaic model. Identify two major components of the cell membrane and describe their functions.',
    correctAnswer: 'Two major components of the cell membrane are the phospholipid bilayer, which allows diffusion without energy, and the membrane proteins, which allow facilitated diffusion and active transport.',
    explanation: 'Phospholipids provide structure; proteins carry out transport and communication.',
    displayAs: 'paragraph'
  },
  {
    id: 'cellstructure-31',
    type: 'free-response',
    question: 'The cell membrane is often described as a fluid mosaic model. Explain why the membrane is considered fluid.',
    correctAnswer: 'It is considered fluid because the fatty acids are flexible, meaning they can move freely.',
    explanation: 'The phospholipids move laterally, giving the membrane fluidity.',
    displayAs: 'paragraph'
  },
  {
    id: 'cellstructure-32',
    type: 'free-response',
    question: 'The cell membrane is often described as a fluid mosaic model. Predict what would happen to membrane fluidity if the proportion of saturated fatty acids increased.',
    correctAnswer: 'The membrane fluidity would decrease because saturated fatty acids are less flexible and more rigid, therefore decreasing the fluidity.',
    explanation: 'More saturated fats make the membrane tighter and less flexible.',
    displayAs: 'paragraph'
  },
];
