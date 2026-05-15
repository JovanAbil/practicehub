import { Question } from '@/types/quiz';

export const cellenergeticsQuestions: Question[] = [
  {
    id: 'cellenergetics-1',
    type: 'multiple-choice',
    question: 'Which molecule serves as the main energy carrier for cells?',
    options: [
      { label: 'A', value: 'A', text: 'Carbon Dioxide' },
      { label: 'B', value: 'B', text: 'ATP' },
      { label: 'C', value: 'C', text: 'water' },
      { label: 'D', value: 'D', text: 'DNA' }
    ],
    correctAnswer: 'B',
    explanation: 'ATP stores and releases energy for nearly all cellular processes, making it the primary energy carrier in cells.'
  },
  {
    id: 'cellenergetics-2',
    type: 'multiple-choice',
    question: 'A scientist grows two groups of plants, one in an environment with 0.03% CO2 and the other in 0.08% CO2, while keeping all other conditions constant. Which of the following best predicts the outcome?',
    options: [
      { label: 'A', value: 'A', text: 'The plants in 0.03% CO2 will gow faster because they use less energy for photosynthesis' },
      { label: 'B', value: 'B', text: 'The plants in 0.08% CO2 will grow faster because more carbon is available for the Calvin cycle.' },
      { label: 'C', value: 'C', text: 'Both groups will grow at the same rate because the rate of photosynthesis is independent of CO2 levels' },
      { label: 'D', value: 'D', text: 'Neither group will grow because light is the only factor that drives photosynthesis.' }
    ],
    correctAnswer: 'B',
    explanation: 'Higher CO₂ levels increase the rate of carbon fixation in the Calvin cycle, supporting faster growth until another factor becomes limiting.'
  },
  {
    id: 'cellenergetics-3',
    type: 'multiple-choice',
    question: 'In addition to light and chlorophyll, photosynthesis requires',
    options: [
      { label: 'A', value: 'A', text: 'water and oxygen' },
      { label: 'B', value: 'B', text: 'oxygen and carbon dioxide' },
      { label: 'C', value: 'C', text: 'water and sugars' },
      { label: 'D', value: 'D', text: 'water and carbon dioxide' }
    ],
    correctAnswer: 'D',
    explanation: 'Photosynthesis uses water and carbon dioxide to form glucose and oxygen.'
  },
  {
    id: 'cellenergetics-4',
    type: 'multiple-choice',
    question: 'Which product generated during the light-dependent reactions provides the energy needed to drive the Calvin cycle.',
    options: [
      { label: 'A', value: 'A', text: 'ADP' },
      { label: 'B', value: 'B', text: 'Water' },
      { label: 'C', value: 'C', text: 'NADPH' },
      { label: 'D', value: 'D', text: 'Pyruvic Acid' }
    ],
    correctAnswer: 'C',
    explanation: 'NADPH carries high-energy electrons produced in the light-dependent reactions and provides the reducing power needed to build sugars in the Calvin cycle.'
  },
  {
    id: 'cellenergetics-5',
    type: 'multiple-choice',
    question: 'Which equation best summarizes the process of photosynthesis?',
    options: [
      { label: 'A', value: 'A', text: 'Water + carbon dioxide → sugar + oxygen' },
      { label: 'B', value: 'B', text: 'Sugars + oxygen → water + carbon' },
      { label: 'C', value: 'C', text: 'Water + oxygen → sugars + carbon dioxide' },
      { label: 'D', value: 'D', text: 'Oxygen + carbon dioxide → sugars + oxygen' }
    ],
    correctAnswer: 'A',
    explanation: 'Photosynthesis converts water and carbon dioxide into glucose and oxygen using sunlight.'
  },
  {
    id: 'cellenergetics-6',
    type: 'multiple-choice',
    question: 'Why is light essential for the light-dependent reactions of photosynthesis?',
    options: [
      { label: 'A', value: 'A', text: 'It donates elections directly to the reaction' },
      { label: 'B', value: 'B', text: 'It causes the water molecule to break apart' },
      { label: 'C', value: 'C', text: 'It boosts electrons to higher energy levels within the photosystems' },
      { label: 'D', value: 'D', text: 'It breaks apart ATP to release energy for the Calvin cycle' }
    ],
    correctAnswer: 'C',
    explanation: 'Light energizes electrons in chlorophyll, allowing them to move through the electron transport chain and power ATP and NADPH production.'
  },
  {
    id: 'cellenergetics-7',
    type: 'multiple-choice',
    question: 'The light-dependent reactions of photosynthesis take place in the',
    options: [
      { label: 'A', value: 'A', text: 'thylakoid membrane' },
      { label: 'B', value: 'B', text: 'stroma' },
      { label: 'C', value: 'C', text: 'cytoplasm' },
      { label: 'D', value: 'D', text: 'nucleus' }
    ],
    correctAnswer: 'A',
    explanation: 'Light-dependent reactions occur in the thylakoid membranes where chlorophyll is located.'
  },
  {
    id: 'cellenergetics-8',
    type: 'multiple-choice',
    question: 'The light-independent reactions of photosynthesis take place in the',
    options: [
      { label: 'A', value: 'A', text: 'thylakoid membranes' },
      { label: 'B', value: 'B', text: 'stroma' },
      { label: 'C', value: 'C', text: 'cytoplasm' },
      { label: 'D', value: 'D', text: 'nucleus' }
    ],
    correctAnswer: 'B',
    explanation: 'The Calvin cycle occurs in the stroma, the fluid space around the thylakoids.'
  },
  {
    id: 'cellenergetics-9',
    type: 'multiple-choice',
    question: 'The first step in releasing the energy of glucose in the cell is known as',
    options: [
      { label: 'A', value: 'A', text: 'alcoholic fermentation' },
      { label: 'B', value: 'B', text: 'glycolysis' },
      { label: 'C', value: 'C', text: 'the Krebs cycle' },
      { label: 'D', value: 'D', text: 'electron transport' }
    ],
    correctAnswer: 'B',
    explanation: 'Glycolysis splits glucose into pyruvate, producing small amounts of ATP and NADH.'
  },
  {
    id: 'cellenergetics-10',
    type: 'multiple-choice',
    question: 'A drought reduces the amount of water available to a plant. How will this most likely affect the light-dependent reactions?',
    options: [
      { label: 'A', value: 'A', text: 'The light-dependent reactions will stop entirely due to lack of ATP' },
      { label: 'B', value: 'B', text: 'The production of NADPH and ATP will decrease because water is required for splitting' },
      { label: 'C', value: 'C', text: 'The Calvin cycle will accelerate to compensate for the drought' },
      { label: 'D', value: 'D', text: 'Photosystem II will increase its activity to produce more oxygen' }
    ],
    correctAnswer: 'B',
    explanation: 'Water supplies electrons to Photosystem II; without it, electron flow slows and ATP/NADPH production decreases.'
  },
  {
    id: 'cellenergetics-11',
    type: 'multiple-choice',
    question: 'The process that releases energy from food in the presence of oxygen is',
    options: [
      { label: 'A', value: 'A', text: 'synthesis' },
      { label: 'B', value: 'B', text: 'cellular respiration' },
      { label: 'C', value: 'C', text: 'ATP synthase' },
      { label: 'D', value: 'D', text: 'photosynthesis' }
    ],
    correctAnswer: 'B',
    explanation: 'Cellular respiration uses oxygen to break down food molecules and make ATP.'
  },
  {
    id: 'cellenergetics-12',
    type: 'multiple-choice',
    question: 'Which organism(s) perform(s) cellular respiration?',
    options: [
      { label: 'A', value: 'A', text: 'Bears' },
      { label: 'B', value: 'B', text: 'Mushrooms, algae, tulips, and bears' },
      { label: 'C', value: 'C', text: 'Mushrooms and bears' },
      { label: 'D', value: 'D', text: 'Mushrooms and algae' }
    ],
    correctAnswer: 'B',
    explanation: 'All eukaryotic organisms, including plants and animals, perform cellular respiration.'
  },
  {
    id: 'cellenergetics-13',
    type: 'multiple-choice',
    question: 'During intense exercise, muscles switch from aerobic respiration to lactic acid fermentation. Why does this occur.',
    options: [
      { label: 'A', value: 'A', text: 'To produce more ATP than aerobic respiration' },
      { label: 'B', value: 'B', text: 'To regenerate NAD+ so glycolysis can continue in the absense of oxygen' },
      { label: 'C', value: 'C', text: 'To convert lactic acid into pyruvate for oxidative phosphorylation' },
      { label: 'D', value: 'D', text: 'To slow ATP production and conserve energy' }
    ],
    correctAnswer: 'B',
    explanation: 'When oxygen is low, cells regenerate NAD⁺ through fermentation so glycolysis can continue producing ATP.'
  },
  {
    id: 'cellenergetics-14',
    type: 'multiple-choice',
    question: "A research scientist designs an experiment to measure the inputs and outputs of photosynthesis, by mass, for a representative plant over a certain time. The scientist's predictions for the results are shown in the table. If the scientist's predictions are accurate, which conclusion about photosynthesis do they support?",
    image: '/images/biology/energetics3.png',
    options: [
      { label: 'A', value: 'A', text: 'All of the matter in water is converted into oxygen gas' },
      { label: 'B', value: 'B', text: 'All of the matter in CO2 is converted into oxygen gas' },
      { label: 'C', value: 'C', text: 'All of matter in CO2 is converted into sugars' },
      { label: 'D', value: 'D', text: 'Some but not all of the matter in CO2 is converted into sugars' }
    ],
    correctAnswer: 'D',
    explanation: 'Only the carbon from CO₂ becomes part of sugars; the oxygen from CO₂ is not fully incorporated into glucose.'
  },
  {
    id: 'cellenergetics-15',
    type: 'multiple-choice',
    question: "A research scientist... What is the main role of CO₂ during photosynthesis?",
    image: '/images/biology/energetics3.png',
    options: [
      { label: 'A', value: 'A', text: 'CO2 is a waste product that is released into the atmosphere' },
      { label: 'B', value: 'B', text: 'CO2 is used to assemble sugars, the main product of photosynthesis' },
      { label: 'C', value: 'C', text: 'CO2 is used to accept electrons and transfer them between photosystems' },
      { label: 'D', value: 'D', text: 'CO2 is used to transfer energy from the light-dependent reactions to the light-independent reactions.' }
    ],
    correctAnswer: 'B',
    explanation: 'CO₂ provides the carbon atoms needed to build glucose during the Calvin cycle.'
  },
  {
    id: 'cellenergetics-16',
    type: 'multiple-choice',
    question: "A research scientist... Describe the role of light and why it wasn't included in the table.",
    image: '/images/biology/energetics3.png',
    options: [
      { label: 'A', value: 'A', text: 'Light provides the energy for photosynthesis, and the table includes only matter, not energy' },
      { label: 'B', value: 'B', text: 'Light provides the matter for the reactions, and the table includes only energy' },
      { label: 'C', value: 'C', text: 'Light is a product of photosynthesis' },
      { label: 'D', value: 'D', text: 'Light plays no role' }
    ],
    correctAnswer: 'A',
    explanation: 'Light supplies energy, not matter; the table tracks mass, so energy inputs are excluded.'
  },
  {
    id: 'cellenergetics-17',
    type: 'multiple-choice',
    question: 'Because fermentation takes place in the absence of oxygen, it is said to be',
    options: [
      { label: 'A', value: 'A', text: 'aerobic' },
      { label: 'B', value: 'B', text: 'anaerobic' },
      { label: 'C', value: 'C', text: 'cyclic' },
      { label: 'D', value: 'D', text: 'essential to oxygen production' }
    ],
    correctAnswer: 'B',
    explanation: 'Fermentation occurs without oxygen and regenerates NAD+ for glycolysis.'
  },
  {
    id: 'cellenergetics-18',
    type: 'multiple-choice',
    question: 'The Krebs cycle takes place within the',
    options: [
      { label: 'A', value: 'A', text: 'chloroplast' },
      { label: 'B', value: 'B', text: 'mitochondria' },
      { label: 'C', value: 'C', text: 'nucleus' },
      { label: 'D', value: 'D', text: 'cytoplasm' }
    ],
    correctAnswer: 'B',
    explanation: 'The Krebs cycle occurs in the mitochondrial matrix.'
  },
  {
    id: 'cellenergetics-19',
    type: 'multiple-choice',
    question: 'The electron transport chain uses the high-energy electrons from the Krebs cycle to',
    options: [
      { label: 'A', value: 'A', text: 'produce glucose' },
      { label: 'B', value: 'B', text: 'convert ADP to ATP' },
      { label: 'C', value: 'C', text: 'produce acetyl-CoA' },
      { label: 'D', value: 'D', text: 'produce GTP' }
    ],
    correctAnswer: 'B',
    explanation: 'The electron transport chain drives ATP synthesis using energy from electrons.'
  },
  {
    id: 'cellenergetics-20',
    type: 'multiple-choice',
    question: 'During heavy exercise, the buildup of lactic acid in muscle cells results in',
    options: [
      { label: 'A', value: 'A', text: 'alcoholic fermentation' },
      { label: 'B', value: 'B', text: 'oxygen debt' },
      { label: 'C', value: 'C', text: 'the Calvin cycle' },
      { label: 'D', value: 'D', text: 'the Krebs cycle' }
    ],
    correctAnswer: 'B',
    explanation: 'Lactic acid accumulates when oxygen is insufficient, creating an oxygen debt that must be repaid after exercise.'
  },
  {
    id: 'cellenergetics-21',
    type: 'multiple-choice',
    question: 'The second stage of cellular respiration is',
    options: [
      { label: 'A', value: 'A', text: 'the Krebs cycle' },
      { label: 'B', value: 'B', text: 'glycolysis' },
      { label: 'C', value: 'C', text: 'electron transport' },
      { label: 'D', value: 'D', text: 'fermentation' }
    ],
    correctAnswer: 'A',
    explanation: 'After glycolysis, pyruvate enters the Krebs cycle to produce NADH, FADH₂, and CO₂.'
  },
  {
    id: 'cellenergetics-22',
    type: 'multiple-choice',
    question: 'Which of the following correctly compares ATP yield in yeast during aerobic respiration and fermentation?',
    options: [
      { label: 'A', value: 'A', text: 'Fermentation produces more ATP because it involves fewer steps' },
      { label: 'B', value: 'B', text: 'Aerobic respiration produces more ATP because it includes the electron transport chain' },
      { label: 'C', value: 'C', text: 'Both processes produce the same amount of ATP because glycolysis is the primary pathway.' },
      { label: 'D', value: 'D', text: 'Yeast does not use aerobic respiration and relies only on fermentation' }
    ],
    correctAnswer: 'B',
    explanation: 'Aerobic respiration yields far more ATP because the electron transport chain generates large amounts of ATP.'
  },
  {
    id: 'cellenergetics-23',
    type: 'multiple-choice',
    question: 'Carbon skeletons to be broken down during cellular respiration can be obtained from',
    options: [
      { label: 'A', value: 'A', text: 'polysaccharides' },
      { label: 'B', value: 'B', text: 'proteins' },
      { label: 'C', value: 'C', text: 'lipids' },
      { label: 'D', value: 'D', text: 'All of them' }
    ],
    correctAnswer: 'D',
    explanation: 'Carbohydrates, fats, and proteins can all be used as fuel after being broken into molecules that feed into respiration.'
  },
  {
    id: 'cellenergetics-24',
    type: 'multiple-choice',
    question: 'A series of carrier proteins in the inner membrane of mitochondria is',
    options: [
      { label: 'A', value: 'A', text: 'the Krebs cycle' },
      { label: 'B', value: 'B', text: 'fermentation' },
      { label: 'C', value: 'C', text: 'the electron transport chain' },
      { label: 'D', value: 'D', text: 'glycolysis' }
    ],
    correctAnswer: 'C',
    explanation: 'The electron transport chain consists of proteins that transfer electrons and pump protons to power ATP synthesis.'
  },
  {
    id: 'cellenergetics-25',
    type: 'multiple-choice',
    question: 'Which substance is needed to begin glycolysis?',
    options: [
      { label: 'A', value: 'A', text: 'ATP' },
      { label: 'B', value: 'B', text: 'Pyruvic acid' },
      { label: 'C', value: 'C', text: 'NADP' },
      { label: 'D', value: 'D', text: 'NADH' }
    ],
    correctAnswer: 'A',
    explanation: 'Cells must invest ATP to start breaking down glucose during glycolysis.'
  },
  {
    id: 'cellenergetics-26',
    type: 'multiple-choice',
    question: 'In eukaryotic cells, most cellular respiration takes place in the:',
    options: [
      { label: 'A', value: 'A', text: 'Nucleus' },
      { label: 'B', value: 'B', text: 'Cell walls' },
      { label: 'C', value: 'C', text: 'Mitochondria' },
      { label: 'D', value: 'D', text: 'Centrioles' }
    ],
    correctAnswer: 'C',
    explanation: 'Mitochondria are the site of aerobic respiration, producing ATP efficiently.'
  },
  {
    id: 'cellenergetics-27',
    type: 'multiple-choice',
    question: 'In a closed system with plants, a mouse, and a sealed air supply, which describes the interaction of photosynthesis and cellular respiration?',
    options: [
      { label: 'A', value: 'A', text: 'Photosynthesis produces oxygen used by the mouse for respiration, and respiration produces CO2 for photosynthesis' },
      { label: 'B', value: 'B', text: 'Photosynthesis and respiration occur independently and do not interact' },
      { label: 'C', value: 'C', text: 'Photosynthesis requires oxygen from respiration to function' },
      { label: 'D', value: 'D', text: 'Respiration only occurs when photosynthesis stops' }
    ],
    correctAnswer: 'A',
    explanation: 'The oxygen–carbon dioxide cycle connects plant and animal metabolic processes.'
  },
  {
    id: 'cellenergetics-28',
    type: 'multiple-choice',
    question: 'Cyanide inhibits cytochrome c oxidase in the electron transport chain. What effect does this have on cellular respiration?',
    options: [
      { label: 'A', value: 'A', text: 'ATP production increases because glycolysis compensates' },
      { label: 'B', value: 'B', text: 'ATP production decreases because the electron transport chain is blocked' },
      { label: 'C', value: 'C', text: 'ATP production remains unchanged because oxygen is still present' },
      { label: 'D', value: 'D', text: 'Fermentation increases ATP production to compensate for the block' }
    ],
    correctAnswer: 'B',
    explanation: 'Without electron flow through cytochrome c oxidase, the ETC collapses and ATP production drops sharply.'
  },
  {
    id: 'cellenergetics-29',
    type: 'multiple-choice',
    question: 'A forest experiences a sudden decrease in sunlight due to prolonged cloud cover. How will this impact photosynthesis and respiration in plants?',
    options: [
      { label: 'A', value: 'A', text: 'Photosythesis will decrease due to reduced light, while respiration continues at the same rate' },
      { label: 'B', value: 'B', text: 'Photosynthesis and respiration will both increase to maintain energy levels' },
      { label: 'C', value: 'C', text: 'Photosynthesis will stop completely, and respiration will increase' },
      { label: 'D', value: 'D', text: 'Both photosynthesis and respiration will stop, leading to plant death' }
    ],
    correctAnswer: 'A',
    explanation: 'Photosynthesis depends on light, so it decreases, but respiration continues because plants still need ATP.'
  },
  {
    id: 'cellenergetics-30',
    type: 'multiple-choice',
    question: 'What best describes the role of molecular oxygen (O2) in cellular respiration?',
    options: [
      { label: 'A', value: 'A', text: 'It accepts electrons when reacting to form water.' },
      { label: 'B', value: 'B', text: 'It combines with carbon and hydrogen to form glucose.' },
      { label: 'C', value: 'C', text: 'It is released when water breaks apart.' },
      { label: 'D', value: 'D', text: 'It is released when glucose breaks apart.' }
    ],
    correctAnswer: 'A',
    explanation: 'Oxygen acts as the final electron acceptor in the electron transport chain, allowing electrons and hydrogen to form water.'
  },
  {
    id: 'cellenergetics-31',
    type: 'multiple-choice',
    question: 'Imagine that you start with a seed. You plant it in the ground and watch it grow into a mature tree with much more mass. Which statement accurately describes the energy component of this scenario?',
    options: [
      { label: 'A', value: 'A', text: 'The majority of the energy was created in the form of glucose, which the plant used to make ATP.' },
      { label: 'B', value: 'B', text: 'The majority of the energy comes from the breakdown of matter within the soil.' },
      { label: 'C', value: 'C', text: 'The majority of the energy originates from the carbon dioxide used in the Calvin cycle.' },
      { label: 'D', value: 'D', text: 'The majority of the energy came from the exergonic nuclear reactions within the sun.' }
    ],
    correctAnswer: 'A',
    explanation: 'Plants convert sunlight into chemical energy by making glucose, which is later broken down to form ATP.'
  },
  {
    id: 'cellenergetics-32',
    type: 'multiple-choice',
    question: 'In glycolysis, _____ is oxidation.',
    image: '/images/biology/energetics2.png',
    options: [
      { label: 'A', value: 'A', text: 'NAD+ → NADH' },
      { label: 'B', value: 'B', text: 'O2 → H2O' },
      { label: 'C', value: 'C', text: 'Glucose → CO2' },
      { label: 'D', value: 'D', text: 'None of the options' }
    ],
    correctAnswer: 'D',
    explanation: 'Oxidation in glycolysis occurs when glucose loses electrons as it is split, not in any of the option pairs provided.'
  },
  {
    id: 'cellenergetics-33',
    type: 'multiple-choice',
    question: 'In glycolysis, _____ is reduction.',
    image: '/images/biology/energetics2.png',
    options: [
      { label: 'A', value: 'A', text: 'NAD+ → NADH' },
      { label: 'B', value: 'B', text: 'NADH → NAD+' },
      { label: 'C', value: 'C', text: 'O2 → H2O' },
      { label: 'D', value: 'D', text: 'None of the options' }
    ],
    correctAnswer: 'A',
    explanation: 'Reduction occurs when NAD+ gains electrons and hydrogen to form NADH.'
  },
  {
    id: 'cellenergetics-34',
    type: 'multiple-choice',
    question: 'In the electron transport chain, ____ is oxidation.',
    options: [
      { label: 'A', value: 'A', text: 'NAD+ → NADH' },
      { label: 'B', value: 'B', text: 'NADH → NAD+' },
      { label: 'C', value: 'C', text: 'O2 → H2O' },
      { label: 'D', value: 'D', text: 'Glucose → CO2' }
    ],
    correctAnswer: 'B',
    explanation: 'NADH loses electrons and hydrogen to become NAD+, which is oxidation.'
  },
  {
    id: 'cellenergetics-35',
    type: 'multiple-choice',
    question: 'In the electron transport chain, _____ is reduction.',
    options: [
      { label: 'A', value: 'A', text: 'NAD+ → NADH' },
      { label: 'B', value: 'B', text: 'NADH → NAD+' },
      { label: 'C', value: 'C', text: 'O2 → H2O' },
      { label: 'D', value: 'D', text: 'Glucose → CO2' }
    ],
    correctAnswer: 'C',
    explanation: 'Oxygen gains electrons and hydrogen to form water at the end of the electron transport chain, showing reduction.'
  },
  {
    id: 'cellenergetics-36',
    type: 'multiple-choice',
    question: 'A scientist radioactively labeled the oxygen in the reactants of cellular respiration. Which product contains oxygen originally found in glucose?',
    options: [
      { label: 'A', value: 'A', text: 'Water' },
      { label: 'B', value: 'B', text: 'Carbon dioxide' },
      { label: 'C', value: 'C', text: 'Glucose' },
      { label: 'D', value: 'D', text: 'Oxygen' }
    ],
    correctAnswer: 'B',
    explanation: 'The oxygen atoms from glucose leave the cell as part of carbon dioxide during respiration.'
  },
  {
    id: 'cellenergetics-37',
    type: 'multiple-choice',
    question: 'A scientist radioactively labeled the oxygen in the reactants of cellular respiration. Which product contains oxygen originally found in O2?',
    options: [
      { label: 'A', value: 'A', text: 'Water' },
      { label: 'B', value: 'B', text: 'Carbon dioxide' },
      { label: 'C', value: 'C', text: 'Glucose' },
      { label: 'D', value: 'D', text: 'Oxygen' }
    ],
    correctAnswer: 'A',
    explanation: 'Oxygen gas becomes incorporated into water during the final step of the electron transport chain.'
  },
  {
    id: 'cellenergetics-38',
    type: 'free-response',
    question: 'Predict the relationship between light intensity and the rate of photosynthesis. Justify your answer using the light-dependent reactions.',
    correctAnswer: 'Light intensity determines the rate of photosynthesis because light energizes electrons in the light-dependent reactions. Higher light intensity increases ATP and NADPH production, resulting in more oxygen released.',
    explanation: 'The light-dependent reactions rely on photons to excite electrons. More light increases electron flow and ATP/NADPH production—up to a saturation point.'
  },
  {
    id: 'cellenergetics-39',
    type: 'free-response',
    question: 'At high light intensity, the farmer observes that the rate of photosynthesis levels off. Propose a biological explanation for this phenomenon.',
    correctAnswer: 'Photosynthesis has a limit because the enzymes and electron carriers involved reach their maximum capacity. Once the light-dependent reactions are saturated, the plant cannot increase ATP or NADPH production further.',
    explanation: 'Even with more light, photosynthesis is limited by factors such as enzyme speed, available electron carriers, and Calvin cycle capacity.'
  },
  {
    id: 'cellenergetics-40',
    type: 'free-response',
    question: 'If the farmer wanted to improve crop growth, what additional environmental factor might she manipulate? Explain how this factor would affect photosynthesis.',
    correctAnswer: 'She could increase the amount of CO2 available. Higher CO2 levels speed up the Calvin cycle, allowing more glucose production as long as light and water are sufficient.',
    explanation: 'CO2 is the carbon source for the Calvin cycle. More CO2 reduces the chance that RuBisCO binds oxygen instead, increasing photosynthetic efficiency.'
  },
  {
    id: 'cellenergetics-41',
    type: 'free-response',
    question: 'Explain why oxygen consumption plateaus during prolonged high-intensity exercise, even though muscles are still active.',
    correctAnswer: 'Oxygen becomes limiting because the cardiovascular and respiratory systems cannot deliver O2 fast enough. Once maximum oxygen uptake is reached, muscles supplement with anaerobic respiration (lactic acid fermentation).',
    explanation: 'VO₂ max represents the highest oxygen delivery rate. Beyond this point, ATP demand exceeds aerobic capacity, forcing cells to rely more on anaerobic pathways.'
  },
  {
    id: 'cellenergetics-42',
    type: 'free-response',
    question: 'Describe how the rise in CO2 production reflects the changes in cellular respiration during exercise.',
    correctAnswer: 'Increased CO2 indicates increased cellular respiration because the Krebs cycle and pyruvate oxidation release CO2 as byproducts when ATP demand rises.',
    explanation: 'As muscles use more ATP, glucose is broken down at a faster rate, producing more CO2 from the mitochondrial reactions involved in aerobic respiration.'
  },
  {
    id: 'cellenergetics-43',
    type: 'free-response',
    question: 'Predict what would happen if the athletes ran out of glucose during the exercise. Identify which pathway would be affected first and explain how the body might compensate.',
    correctAnswer: 'If athletes ran out of glucose, glycolysis would be affected first since it requires glucose. The body would compensate by breaking down fats (beta-oxidation) and, if needed, proteins to supply energy.',
    explanation: 'Glycolysis depends directly on glucose levels. When glucose is low, the body switches to lipid catabolism for ATP production, which is slower but longer-lasting.'
  }
];
