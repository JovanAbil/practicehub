import { Question } from '@/types/quiz';

export const cellgrowthQuestions: Question[] = [
  {
    id: 'cellgrowth-1',
    type: 'multiple-choice',
    question: 'DNA replication occurs',
    options: [
      { label: 'A', value: 'A', text: 'during the S phase of the cell cycle' },
      { label: 'B', value: 'B', text: 'as the nuclear envelope breaks down in early mitosis' },
      { label: 'C', value: 'C', text: 'during mitosis but not during meiosis' },
      { label: 'D', value: 'D', text: 'in animal cells but not in plant cells' },
      { label: 'E', value: 'E', text: 'only in cells destined to become gametes' },
    ],
    correctAnswer: 'A',
    explanation: 'DNA replication happens during the S (synthesis) phase, before mitosis begins.'
  },
  {
    id: 'cellgrowth-2',
    type: 'multiple-choice',
    question: 'In a dividing somatic cell, chromosomes line up individually along the center of the cell before being pulled apart. Which statement best explains this stage of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'Homologous chromosomes pair' },
      { label: 'B', value: 'B', text: 'Tetrads are forming at the metaphase plate' },
      { label: 'C', value: 'C', text: 'Sister chromatids are aligned at the equator for seperation' },
      { label: 'D', value: 'D', text: 'Chromosomes are unreplicated and move randomly' }
    ],
    correctAnswer: 'C',
    explanation: 'During metaphase of mitosis, sister chromatids line up along the metaphase plate before being separated in anaphase.'
  },
  {
    id: 'cellgrowth-3',
    type: 'multiple-choice',
    question: 'After a round of mitosis in a liver cell, a student observes that both daughter cells have the same chromosome number as the original parent. What does this observation suggest about the process of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'Mitosis always produces genetically unique cells' },
      { label: 'B', value: 'B', text: 'Mitosis ensures chromosome number is maintained' },
      { label: 'C', value: 'C', text: 'Mitosis halves the chromosome number' },
      { label: 'D', value: 'D', text: 'Mitosis is responsible for the crossing over of genetic material' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitosis produces two genetically identical daughter cells, each with the same chromosome number as the parent cell.'
  },
  {
    id: 'cellgrowth-4',
    type: 'multiple-choice',
    question: 'A biopsy reveals cells dividing at an unusually fast rate, ignoring normal signals to stop. Which characteristic most likely describes these cancerous cells?',
    options: [
      { label: 'A', value: 'A', text: 'They have longer interphase periods' },
      { label: 'B', value: 'B', text: 'They divide with tightly controlled checkpoints' },
      { label: 'C', value: 'C', text: 'They replicate more slowly than normal cells' },
      { label: 'D', value: 'D', text: 'They progress through the cell cycle more rapidly' }
    ],
    correctAnswer: 'D',
    explanation: 'Cancer cells often bypass cell cycle checkpoints, causing them to divide more rapidly than normal cells.'
  },
  {
    id: 'cellgrowth-5',
    type: 'multiple-choice',
    question: 'At what point in the cell cycle do chromosomes first consist of two identical sister chromatids joined together at a centromere, forming the classic X-shape?',
    options: [
      { label: 'A', value: 'A', text: 'During the G1 phase' },
      { label: 'B', value: 'B', text: 'At the end of the G2 phase' },
      { label: 'C', value: 'C', text: 'Immediately after the S phase' },
      { label: 'D', value: 'D', text: 'During cytokinesis' }
    ],
    correctAnswer: 'C',
    explanation: 'After the S phase, each chromosome consists of two sister chromatids connected at the centromere.'
  },
  {
    id: 'cellgrowth-6',
    type: 'multiple-choice',
    question: 'How many total chromosomes are in a normal human somatic (body) cell?',
    options: [
      { label: 'A', value: 'A', text: '23' },
      { label: 'B', value: 'B', text: '32' },
      { label: 'C', value: 'C', text: '46' },
      { label: 'D', value: 'D', text: '64' }
    ],
    correctAnswer: 'C',
    explanation: 'Human somatic cells are diploid (2n) and contain 46 chromosomes—23 pairs.'
  },
  {
    id: 'cellgrowth-7',
    type: 'multiple-choice',
    question: 'A student was told to use a light microscope to count the number of chromosomes of a newly discovered species. What phase of the cell cycle should the student investigate to be able to see the chromosomes to count them?',
    options: [
      { label: 'A', value: 'A', text: 'G1' },
      { label: 'B', value: 'B', text: 'G2' },
      { label: 'C', value: 'C', text: 'S' },
      { label: 'D', value: 'D', text: 'M' }
    ],
    correctAnswer: 'D',
    explanation: 'Chromosomes are most condensed and visible during mitosis (M phase), especially during metaphase.'
  },
  {
    id: 'cellgrowth-8',
    type: 'multiple-choice',
    question: 'If a cell has 12 chromosomes, how many chromosomes will each of its daughter cells have after mitosis?',
    options: [
      { label: 'A', value: 'A', text: '4' },
      { label: 'B', value: 'B', text: '6' },
      { label: 'C', value: 'C', text: '12' },
      { label: 'D', value: 'D', text: '24' }
    ],
    correctAnswer: 'C',
    explanation: 'Mitosis produces two genetically identical daughter cells, each with the same number of chromosomes as the parent.'
  },
  {
    id: 'cellgrowth-9',
    type: 'multiple-choice',
    question: 'If the S phase were eliminated from the cell cycle, the daughter cells would',
    options: [
      { label: 'A', value: 'A', text: 'have half the genetic material found in the parent cell' },
      { label: 'B', value: 'B', text: 'be genetically identical to each other' },
      { label: 'C', value: 'C', text: 'be genetically indentical to the parent cell' },
      { label: 'D', value: 'D', text: 'continue to function without the normal amount of DNA' }
    ],
    correctAnswer: 'A',
    explanation: 'Without S phase, DNA does not replicate, so mitosis would split the existing DNA in half between the two daughter cells.'
  },
  {
    id: 'cellgrowth-10',
    type: 'multiple-choice',
    question: 'What phase of mitosis takes the longest period of time?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase' },
      { label: 'B', value: 'B', text: 'Cytokinesis' },
      { label: 'C', value: 'C', text: 'Anaphase' },
      { label: 'D', value: 'D', text: 'Interphase' }
    ],
    correctAnswer: 'A',
    explanation: 'Prophase is typically the longest stage of mitosis because chromatin condenses and the spindle forms.'
  },
  {
    id: 'cellgrowth-11',
    type: 'free-response',
    question: 'A patient suffers a spinal cord injury and is told that full recovery is unlikely. Using your understanding of the cell cycle, explain why certain cells in the nervous system do not regenerate effectively after injury.',
    correctAnswer: 'Nervous system cells often enter the G0 phase, a non-dividing state. Because they remain in G0 indefinitely, they do not undergo mitosis and therefore cannot regenerate effectively.',
    explanation: 'Most neurons permanently exit the cell cycle into G0, losing the ability to proliferate and replace damaged cells.'
  },
  {
    id: 'cellgrowth-12a',
    type: 'free-response',
    question: 'While examining cells in prophase under a microscope, a student notices that chromosomes appear X-shaped. What does this shape reveal about the stage of the cell cycle the cell has already completed? Explain what causes this X-like structure to form.',
    correctAnswer: 'The X-shape indicates that the cell has completed the S phase, during which DNA replication occurs. Each chromosome now consists of two identical sister chromatids joined at the centromere, forming the X-shaped structure.',
    explanation: 'The X-shape forms because DNA was replicated during S phase, producing two chromatids held together at the centromere.'
  },

  //CHATGPT GENERATED

  {
  id: 'cellgrowth-10',
  type: 'multiple-choice',
  question: 'Why does a cell become less efficient as it increases in size?',
  options: [
    { label: 'A', value: 'A', text: 'DNA stops replicating properly' },
    { label: 'B', value: 'B', text: 'Surface area increases faster than volume' },
    { label: 'C', value: 'C', text: 'Volume increases faster than surface area, limiting exchange' },
    { label: 'D', value: 'D', text: 'Organelles stop functioning' }
  ],
  correctAnswer: 'C',
  explanation: 'As cell size increases, volume grows faster than surface area, reducing efficiency of nutrient and waste exchange.'
  },
  {
    id: 'cellgrowth-11',
    type: 'multiple-choice',
    question: 'Mitosis is classified as which type of reproduction?',
    options: [
      { label: 'A', value: 'A', text: 'Sexual reproduction' },
      { label: 'B', value: 'B', text: 'Asexual reproduction' },
      { label: 'C', value: 'C', text: 'Gametic reproduction' },
      { label: 'D', value: 'D', text: 'Meiotic reproduction' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitosis produces genetically identical cells from one parent cell, which defines asexual reproduction.'
  },
  {
    id: 'cellgrowth-12',
    type: 'multiple-choice',
    question: 'Biologically, asexual reproduction results in offspring that are:',
    options: [
      { label: 'A', value: 'A', text: 'Genetically unique' },
      { label: 'B', value: 'B', text: 'Produced by two parents' },
      { label: 'C', value: 'C', text: 'Genetically identical to the parent' },
      { label: 'D', value: 'D', text: 'Formed by gametes' }
    ],
    correctAnswer: 'C',
    explanation: 'Asexual reproduction involves one parent and produces offspring with identical DNA.'
  },
  {
    id: 'cellgrowth-13',
    type: 'multiple-choice',
    question: 'Sexual reproduction is best defined biologically as:',
    options: [
      { label: 'A', value: 'A', text: 'Division of one parent cell' },
      { label: 'B', value: 'B', text: 'Fusion of two reproductive cells' },
      { label: 'C', value: 'C', text: 'Replication of DNA without division' },
      { label: 'D', value: 'D', text: 'Growth through mitosis' }
    ],
    correctAnswer: 'B',
    explanation: 'Sexual reproduction involves the fusion of two gametes from two parents, increasing genetic diversity.'
  },
  {
    id: 'cellgrowth-14',
    type: 'multiple-choice',
    question: 'What do chromosomes primarily package?',
    options: [
      { label: 'A', value: 'A', text: 'Proteins' },
      { label: 'B', value: 'B', text: 'RNA' },
      { label: 'C', value: 'C', text: 'DNA' },
      { label: 'D', value: 'D', text: 'Lipids' }
    ],
    correctAnswer: 'C',
    explanation: 'Chromosomes are packages of DNA that organize and protect genetic information.'
  },
  {
    id: 'cellgrowth-15',
    type: 'multiple-choice',
    question: 'How does DNA exist in a prokaryotic cell?',
    options: [
      { label: 'A', value: 'A', text: 'Multiple linear chromosomes' },
      { label: 'B', value: 'B', text: 'Single circular chromosome' },
      { label: 'C', value: 'C', text: 'Chromatin with histones' },
      { label: 'D', value: 'D', text: 'Paired sister chromatids' }
    ],
    correctAnswer: 'B',
    explanation: 'Prokaryotes contain a single circular DNA chromosome that holds most of the genetic information.'
  },
  {
    id: 'cellgrowth-16',
    type: 'multiple-choice',
    question: 'DNA is packed with histone proteins to form:',
    options: [
      { label: 'A', value: 'A', text: 'Centromeres' },
      { label: 'B', value: 'B', text: 'Chromatids' },
      { label: 'C', value: 'C', text: 'Chromatin' },
      { label: 'D', value: 'D', text: 'Spindle fibers' }
    ],
    correctAnswer: 'C',
    explanation: 'DNA wrapped around histones forms chromatin, allowing it to condense efficiently.'
  },
  {
    id: 'cellgrowth-17',
    type: 'multiple-choice',
    question: 'Why do duplicated chromosomes appear X-shaped?',
    options: [
      { label: 'A', value: 'A', text: 'They are two separate chromosomes' },
      { label: 'B', value: 'B', text: 'They are attached by spindle fibers' },
      { label: 'C', value: 'C', text: 'They consist of two sister chromatids joined at a centromere' },
      { label: 'D', value: 'D', text: 'They contain extra DNA' }
    ],
    correctAnswer: 'C',
    explanation: 'The X shape represents a duplicated chromosome made of two sister chromatids joined at a centromere.'
  },
  {
    id: 'cellgrowth-18',
    type: 'multiple-choice',
    question: 'Binary fission is best described as:',
    options: [
      { label: 'A', value: 'A', text: 'Division of eukaryotic cells using spindle fibers' },
      { label: 'B', value: 'B', text: 'A type of sexual reproduction' },
      { label: 'C', value: 'C', text: 'Prokaryotic cell division producing identical cells' },
      { label: 'D', value: 'D', text: 'Division involving mitosis phases' }
    ],
    correctAnswer: 'C',
    explanation: 'Binary fission is a simple division method used by prokaryotic cells.'
  },
  {
    id: 'cellgrowth-19',
    type: 'multiple-choice',
    question: 'Which phases make up interphase?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase, Metaphase, Anaphase' },
      { label: 'B', value: 'B', text: 'G1, S, G2' },
      { label: 'C', value: 'C', text: 'Mitosis and cytokinesis' },
      { label: 'D', value: 'D', text: 'S, M, G1' }
    ],
    correctAnswer: 'B',
    explanation: 'Interphase consists of G1, S, and G2 phases.'
  },
  {
    id: 'cellgrowth-20',
    type: 'multiple-choice',
    question: 'The M phase consists of:',
    options: [
      { label: 'A', value: 'A', text: 'DNA replication and growth' },
      { label: 'B', value: 'B', text: 'Mitosis and cytokinesis' },
      { label: 'C', value: 'C', text: 'G1 and S phases' },
      { label: 'D', value: 'D', text: 'Checkpoint regulation only' }
    ],
    correctAnswer: 'B',
    explanation: 'M phase includes mitosis (nuclear division) and cytokinesis (cytoplasmic division).'
  },
  {
    id: 'cellgrowth-21',
    type: 'multiple-choice',
    question: 'What is the primary goal of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'To create gametes' },
      { label: 'B', value: 'B', text: 'To increase genetic diversity' },
      { label: 'C', value: 'C', text: 'To produce two identical daughter cells' },
      { label: 'D', value: 'D', text: 'To reduce chromosome number' }
    ],
    correctAnswer: 'C',
    explanation: 'Mitosis ensures two genetically identical daughter cells.'
  },
  {
    id: 'cellgrowth-22',
    type: 'multiple-choice',
    question: 'During which phase do chromosomes line up at the metaphase plate?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase' },
      { label: 'B', value: 'B', text: 'Metaphase' },
      { label: 'C', value: 'C', text: 'Anaphase' },
      { label: 'D', value: 'D', text: 'Telophase' }
    ],
    correctAnswer: 'B',
    explanation: 'In metaphase, chromosomes align at the cell’s center.'
  },
  {
    id: 'cellgrowth-23',
    type: 'multiple-choice',
    question: 'Which phase involves separation of sister chromatids?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase' },
      { label: 'B', value: 'B', text: 'Metaphase' },
      { label: 'C', value: 'C', text: 'Anaphase' },
      { label: 'D', value: 'D', text: 'Telophase' }
    ],
    correctAnswer: 'C',
    explanation: 'Anaphase separates sister chromatids to opposite poles.'
  },
  {
    id: 'cellgrowth-24',
    type: 'multiple-choice',
    question: 'How does cytokinesis differ between plant and animal cells?',
    options: [
      { label: 'A', value: 'A', text: 'Plants pinch inward, animals form a cell plate' },
      { label: 'B', value: 'B', text: 'Animals form a cell plate, plants pinch inward' },
      { label: 'C', value: 'C', text: 'Plants form a cell plate, animals pinch inward' },
      { label: 'D', value: 'D', text: 'Only animal cells undergo cytokinesis' }
    ],
    correctAnswer: 'C',
    explanation: 'Animal cells pinch inward; plant cells form a cell plate that becomes a new wall.'
  },
  {
    id: 'cellgrowth-25',
    type: 'multiple-choice',
    question: 'What is the role of regulatory proteins?',
    options: [
      { label: 'A', value: 'A', text: 'They replicate DNA' },
      { label: 'B', value: 'B', text: 'They control timing and progression of the cell cycle' },
      { label: 'C', value: 'C', text: 'They form spindle fibers' },
      { label: 'D', value: 'D', text: 'They digest damaged cells' }
    ],
    correctAnswer: 'B',
    explanation: 'Regulatory proteins control checkpoints and pace of cell division.'
  },
  {
    id: 'cellgrowth-26',
    type: 'multiple-choice',
    question: 'Cyclins are best described as proteins that:',
    options: [
      { label: 'A', value: 'A', text: 'Destroy DNA' },
      { label: 'B', value: 'B', text: 'Remain constant throughout the cycle' },
      { label: 'C', value: 'C', text: 'Rise and fall to regulate cell cycle timing' },
      { label: 'D', value: 'D', text: 'Prevent cytokinesis' }
    ],
    correctAnswer: 'C',
    explanation: 'Cyclins fluctuate in concentration to regulate progression through the cycle.'
  },
  {
    id: 'cellgrowth-27',
    type: 'multiple-choice',
    question: 'Apoptosis is important because it:',
    options: [
      { label: 'A', value: 'A', text: 'Speeds up cell division' },
      { label: 'B', value: 'B', text: 'Allows damaged cells to survive' },
      { label: 'C', value: 'C', text: 'Removes unnecessary or harmful cells' },
      { label: 'D', value: 'D', text: 'Creates tumors' }
    ],
    correctAnswer: 'C',
    explanation: 'Apoptosis is programmed cell death that maintains healthy development.'
  },
  {
    id: 'cellgrowth-28',
    type: 'multiple-choice',
    question: 'Cancer cells are difficult for the body to control because they:',
    options: [
      { label: 'A', value: 'A', text: 'Divide slowly' },
      { label: 'B', value: 'B', text: 'Respond normally to checkpoints' },
      { label: 'C', value: 'C', text: 'Ignore regulatory signals and checkpoints' },
      { label: 'D', value: 'D', text: 'Lack DNA' }
    ],
    correctAnswer: 'C',
    explanation: 'Cancer cells do not respond to internal or external controls.'
  },
  {
    id: 'cellgrowth-29',
    type: 'multiple-choice',
    question: 'Which characteristic distinguishes malignant tumors?',
    options: [
      { label: 'A', value: 'A', text: 'They remain localized' },
      { label: 'B', value: 'B', text: 'They spread and destroy surrounding tissues' },
      { label: 'C', value: 'C', text: 'They stop dividing' },
      { label: 'D', value: 'D', text: 'They trigger apoptosis' }
    ],
    correctAnswer: 'B',
    explanation: 'Malignant tumors spread, invade tissues, and disrupt organ function.'
  },
  {
    id: 'cellgrowth-30',
    type: 'free-response',
    question: 'Explain how surface area-to-volume ratio and DNA demand together limit cell size.',
    correctAnswer: 'As cells grow, volume increases faster than surface area, making exchange inefficient. At the same time, one DNA set cannot meet increased demands.',
    explanation: 'Both transport inefficiency and information overload force the cell to divide.'
  },
  {
    id: 'cellgrowth-31',
    type: 'free-response',
    question: 'Describe why chemotherapy causes side effects such as hair loss.',
    correctAnswer: 'Chemotherapy targets rapidly dividing cells, including non-cancerous cells like hair follicles.',
    explanation: 'Treatments cannot distinguish between fast-dividing cancer cells and normal fast-dividing cells.'
  },
  {
    id: 'cellgrowth-32',
    type: 'multiple-choice',
    question: 'Why must DNA be replicated before a cell divides?',
    options: [
      { label: 'A', value: 'A', text: 'To increase genetic diversity' },
      { label: 'B', value: 'B', text: 'So each daughter cell receives a complete set of genetic information' },
      { label: 'C', value: 'C', text: 'To allow cytokinesis to occur' },
      { label: 'D', value: 'D', text: 'To activate spindle fibers' }
    ],
    correctAnswer: 'B',
    explanation: 'DNA replication ensures that both daughter cells receive identical genetic information.'
  },
  {
    id: 'cellgrowth-33',
    type: 'multiple-choice',
    question: 'Which phase of the cell cycle includes final checks before mitosis begins?',
    options: [
      { label: 'A', value: 'A', text: 'G1' },
      { label: 'B', value: 'B', text: 'S' },
      { label: 'C', value: 'C', text: 'G2' },
      { label: 'D', value: 'D', text: 'Prophase' }
    ],
    correctAnswer: 'C',
    explanation: 'G2 involves final preparation, additional growth, and checkpoint verification before mitosis.'
  },
  {
    id: 'cellgrowth-34',
    type: 'multiple-choice',
    question: 'Why is prophase considered the longest stage of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'DNA is replicated during this phase' },
      { label: 'B', value: 'B', text: 'Chromosomes condense and the spindle apparatus forms' },
      { label: 'C', value: 'C', text: 'Chromosomes separate in this phase' },
      { label: 'D', value: 'D', text: 'The nuclear envelope reforms' }
    ],
    correctAnswer: 'B',
    explanation: 'Prophase involves multiple complex events including chromosome condensation and spindle formation.'
  },
  {
    id: 'cellgrowth-35',
    type: 'multiple-choice',
    question: 'Why are spindle fibers critical for genetic accuracy during cell division?',
    options: [
      { label: 'A', value: 'A', text: 'They replicate chromosomes' },
      { label: 'B', value: 'B', text: 'They attach to centromeres to separate chromatids evenly' },
      { label: 'C', value: 'C', text: 'They form the nuclear membrane' },
      { label: 'D', value: 'D', text: 'They trigger apoptosis' }
    ],
    correctAnswer: 'B',
    explanation: 'Spindle fibers ensure sister chromatids are pulled to opposite poles, preventing unequal DNA distribution.'
  },
  {
    id: 'cellgrowth-36',
    type: 'multiple-choice',
    question: 'Which checkpoint prevents a cell from entering anaphase if chromosomes are not properly aligned?',
    options: [
      { label: 'A', value: 'A', text: 'G1 checkpoint' },
      { label: 'B', value: 'B', text: 'S checkpoint' },
      { label: 'C', value: 'C', text: 'Metaphase checkpoint' },
      { label: 'D', value: 'D', text: 'Cytokinesis checkpoint' }
    ],
    correctAnswer: 'C',
    explanation: 'The metaphase checkpoint ensures all chromosomes are correctly attached before separation.'
  },
  {
    id: 'cellgrowth-37',
    type: 'multiple-choice',
    question: 'Why do cancer cells form tumors?',
    options: [
      { label: 'A', value: 'A', text: 'They undergo apoptosis too frequently' },
      { label: 'B', value: 'B', text: 'They divide uncontrollably and group together' },
      { label: 'C', value: 'C', text: 'They divide too slowly' },
      { label: 'D', value: 'D', text: 'They respond too strongly to checkpoints' }
    ],
    correctAnswer: 'B',
    explanation: 'Uncontrolled division leads to cell accumulation, forming tumors.'
  },
  {
    id: 'cellgrowth-38',
    type: 'multiple-choice',
    question: 'Which best explains why mutations in the p53 gene are dangerous?',
    options: [
      { label: 'A', value: 'A', text: 'They increase spindle fiber production' },
      { label: 'B', value: 'B', text: 'They prevent DNA replication entirely' },
      { label: 'C', value: 'C', text: 'They disable a key checkpoint that normally stops damaged cells' },
      { label: 'D', value: 'D', text: 'They cause cytokinesis to fail' }
    ],
    correctAnswer: 'C',
    explanation: 'p53 normally halts the cell cycle when DNA is damaged; mutations allow damaged cells to keep dividing.'
  },
  {
    id: 'cellgrowth-39',
    type: 'free-response',
    question: 'Explain why binary fission is considered more efficient than mitosis for prokaryotic cells.',
    correctAnswer: 'Binary fission is simpler and does not require a nucleus or spindle apparatus, allowing faster division.',
    explanation: 'Prokaryotes have less DNA and fewer structures, making binary fission quicker and more efficient.'
  },
  {
    id: 'cellgrowth-40',
    type: 'free-response',
    question: 'Describe how internal and external regulators work together to control the cell cycle.',
    correctAnswer: 'Internal regulators monitor events inside the cell, while external regulators respond to signals like growth factors.',
    explanation: 'Together, they ensure cells divide only when conditions inside and outside the cell are appropriate.'
  },
  {
    id: 'cellgrowth-41',
    type: 'free-response',
    question: 'Explain why malignant tumors disrupt normal tissue function more than benign tumors.',
    correctAnswer: 'Malignant tumors spread, invade tissues, and absorb nutrients from surrounding cells.',
    explanation: 'This invasion destroys normal cells and disrupts the balance of tissues and organs.'
  }
];
