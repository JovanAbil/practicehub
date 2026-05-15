import { Question } from '@/types/quiz';

export const metricQuestions: Question[] = [
  {
    id: 'metric-1',
    type: 'multiple-choice',
    question: 'Identify how many significant figures are in the following three measured numbers (none of these are counted or defined numbers). I. 9.00010 II. 0.001604 III. 5050',
    options: [
      { "label": "A", "value": "A", "text": "I. 6 II. 7 III. 4", },
      { "label": "B", "value": "B", "text": "I. 5 II. 7 III. 3", },
      { "label": "C", "value": "C", "text": "I. 5 II. 4 III. 4", },
      { "label": "D", "value": "D", "text": "I. 6 II. 4 III. 3", }
    ],
    correctAnswer: 'D',
    explanation: ''
  },
  {
    id: 'metric-2',
    type: 'multiple-choice',
    question: 'Which of the following shows the number 3.200 * 10^-3 written in decimal notation?',
    options: [
      { "label": "A", "value": "A", "text": "0.0032", },
      { "label": "B", "value": "B", "text": "0.003200", },
      { "label": "C", "value": "C", "text": "3200", },
      { "label": "D", "value": "D", "text": "3200.0", }
    ],
    correctAnswer: 'B',
    explanation: ''
  },
  {
    id: 'metric-3',
    type: 'multiple-choice',
    question: 'Which family or group is not represented in this list of elements? Tungsten, Rubidium, Bromine, Phosphorous, Promethium ',
    options: [
      { "label": "A", "value": "A", "text": "Alkaline earth metal", },
      { "label": "B", "value": "B", "text": "Pnictogen", },
      { "label": "C", "value": "C", "text": "Transition metal", },
      { "label": "D", "value": "D", "text": "Halogen", }
    ],
    correctAnswer: 'A',
    explanation: ''
  },
  {
    id: 'metric-4',
    type: 'multiple-choice',
    question: 'How many of these elements are solid at room temperature? Neon, Lithium, Tantalum, Cobalt, Cerium, Radon, Boron, Carbon, Tin, Iodine',
    options: [
      { "label": "A", "value": "A", "text": "9", },
      { "label": "B", "value": "B", "text": "8", },
      { "label": "C", "value": "C", "text": "7", },
      { "label": "D", "value": "D", "text": "6", }
    ],
    correctAnswer: 'B',
    explanation: ''
  },
  {
    id: 'metric-5',
    type: 'free-response',
    question: 'What temperature does water boil?',
    correctAnswer: '100 Celsius',
    explanation: ''
  },
  {
    id: 'metric-6',
    type: 'free-response',
    question: 'What temperature does water melt?',
    correctAnswer: '0 Celsius',
    explanation: ''
  },
  {
    id: 'metric-7',
    type: 'multiple-choice',
    question: 'A 2024 Toyota Tacoma has a weight of approximately 4395 lbs. Convert this weight into scientific notation.',
    options: [
      { "label": "A", "value": "A", "text": "4.395 * 10^-3 lbs", },
      { "label": "B", "value": "B", "text": "43.95 * 10^-2 lbs", },
      { "label": "C", "value": "C", "text": "4.395 * 10^3 lbs", },
      { "label": "D", "value": "D", "text": "43.95 * 10^2 lbs", }
    ],
    correctAnswer: 'C',
    explanation: ''
  },
  {
    id: 'metric-8',
    type: 'multiple-choice',
    question: 'What is the volume of 836.6 g of pure gold, which has a density of 19.32 g/mL?',
    options: [
      { "label": "A", "value": "A", "text": "43.3 mL", },
      { "label": "B", "value": "B", "text": "23.1 mL", },
      { "label": "C", "value": "C", "text": "45.8 mL", },
      { "label": "D", "value": "D", "text": "16.2 mL", }
    ],
    correctAnswer: 'A',
    explanation: ''
  },
  {
    id: 'metric-9',
    type: 'multiple-choice',
    question: 'Which of the following elements is diatomic?',
    options: [
      { "label": "A", "value": "A", "text": "Nitrogen", },
      { "label": "B", "value": "B", "text": "Sulfur", },
      { "label": "C", "value": "C", "text": "Neon", },
      { "label": "D", "value": "D", "text": "Carbon", }
    ],
    correctAnswer: 'A',
    explanation: ''
  },
  {
    id: 'metric-10',
    type: 'multiple-choice',
    question: 'Cadmium has a melting point of 321C and a boiling point of 767C. For which of the following temperatures would cadmium be a liquid?',
    options: [
      { "label": "A", "value": "A", "text": "1000K", },
      { "label": "B", "value": "B", "text": "550K", },
      { "label": "C", "value": "C", "text": "388K", },
      { "label": "D", "value": "D", "text": "1050K", }
    ],
    correctAnswer: 'A',
    explanation: ''
  },
  {
    id: 'metric-11',
    type: 'multiple-choice',
    question: 'Which of the following correctly expresses 199.555 μg in kg?',
    options: [
      { "label": "A", "value": "A", "text": "1.99555 * 10^14 kg", },
      { "label": "B", "value": "B", "text": "1.99555 * 10^-7 kg", },
      { "label": "C", "value": "C", "text": "1,995,550,000,000 kg", },
      { "label": "D", "value": "D", "text": "0.0000000199555 kg", }
    ],
    correctAnswer: 'B',
    explanation: ''
  },
  {
    id: 'metric-12',
    type: 'multiple-choice',
    question: 'Which list contains elements that are all metals?',
    options: [
      { "label": "A", "value": "A", "text": "Radium, Hydrogen, Iron, Europium", },
      { "label": "B", "value": "B", "text": "Phosphorous, Lithium, Gold, Carbon", },
      { "label": "C", "value": "C", "text": "Zirconium, Cerium, Aluminum, Potassium", },
      { "label": "D", "value": "D", "text": "Yttrium, Neon, Osmium, Arsenic", }
    ],
    correctAnswer: 'C',
    explanation: ''
  },
  {
    id: 'metric-13',
    type: 'multiple-choice',
    question: 'Which of the following could NOT be a physical factor of silver?',
    options: [
      { "label": "A", "value": "A", "text": "Whitish color", },
      { "label": "B", "value": "B", "text": "Very shiny", },
      { "label": "C", "value": "C", "text": "Solid at room temperature", },
      { "label": "D", "value": "D", "text": "Reacts with chlorine easily", }
    ],
    correctAnswer: 'D',
    explanation: ''
  },
  {
    id: 'metric-14',
    type: 'multiple-choice',
    question: 'Given the following equivalence statements, convert 5.7 * 10^15 feet to light-years. 1 light-year = 9.40673 * 10^12 km; 1 km = 0.62137 miles; 5280 feet = 1 mile',
    options: [
      { "label": "A", "value": "A", "text": "0.18 light-years", },
      { "label": "B", "value": "B", "text": "2.0 * 10^6 light-years", },
      { "label": "C", "value": "C", "text": "0.52 light-years", },
      { "label": "D", "value": "D", "text": "1.9 * 10^3 light-years", }
    ],
    correctAnswer: 'A',
    explanation: ''
  },
  {
    id: 'metric-15',
    type: 'multiple-choice',
    question: 'Which of the following shows the sum of these measurements using the sig figs rules? 83.22 + 0.9 + 0.9932 = ',
    options: [
      { "label": "A", "value": "A", "text": "90", },
      { "label": "B", "value": "B", "text": "85", },
      { "label": "C", "value": "C", "text": "85.1", },
      { "label": "D", "value": "D", "text": "85.11", }
    ],
    correctAnswer: 'C',
    explanation: ''
  },
  {
    id: 'metric-16',
    type: 'multiple-choice',
    question: 'Which list of elements contains 3 metalliods and 1 non-metal',
    options: [
      { "label": "A", "value": "A", "text": "Germanium, Phosphorous, Boron, Antimony", },
      { "label": "B", "value": "B", "text": "Cobalt, Silicon, Tellurium, Xenon", },
      { "label": "C", "value": "C", "text": "Sulfur, Silicon, Boron, Oxygen", },
      { "label": "D", "value": "D", "text": "Antimony, Arsenic, Palladium, Xenon", }
    ],
    correctAnswer: 'A',
    explanation: ''
  },
  {
    id: 'metric-17',
    type: 'multiple-choice',
    question: 'Which of the following metric prefixes means one millionth?',
    options: [
      { "label": "A", "value": "A", "text": "Mega", },
      { "label": "B", "value": "B", "text": "Nano", },
      { "label": "C", "value": "C", "text": "Milli", },
      { "label": "D", "value": "D", "text": "Micro", }
    ],
    correctAnswer: 'D',
    explanation: ''
  },
  {
    id: 'metric-18',
    type: 'free-response',
    question: 'Write a good calculated value for the volume of a box with the dimensions (54.33 cm * 0.0091 cm * 99.001 cm) using appropriate sig figs and units.',
    correctAnswer: '49 cm^3',
    explanation: ''
  },
  {
    id: 'metric-19',
    type: 'free-response',
    question: 'The boiling point of hydrogen gas is approximately 20.1 K. Calculate this temperature in F using appropriate sig figs and units.',
    correctAnswer: '-423 F',
    explanation: ''
  },
  {
    id: 'metric-20',
    type: 'free-response',
    question: 'Using the equivalence statements (1 cable = 100 fathom; 1 fathom = 2.0266 yd; 1 yd = 3 ft; 1 ft = 12 in; 1 in = 2.54 cm), convert 28.45 cable to centimeters.',
    correctAnswer: '527213.5049 cm',
    explanation: ''
  },
  {
    id: 'metric-21',
    type: 'free-response',
    question: 'Americans love to measure in football fields (120 yards). Delware is 96 miles long. How many football fields long is Delaware? (5280 ft = 1 mi; 1 yd = 3 ft)',
    correctAnswer: '1408 football fields',
    explanation: ''
  },
  {
    id: 'metric-22',
    type: 'free-response',
    question: 'In horse racing, a horse-length is defined as 8 feet. In 1973, Secretariat famously won a race by 31 lengths. How many kilometers did Secretariat win by? (5280 ft = 1 mi; 1 km = 0.62137 mi)',
    correctAnswer: '0.075590545 km',
    explanation: ''
  },
  {
    id: 'metric-23',
    type: 'free-response',
    question: 'Mixture separation (pebbles, seaweed, crude oil, sea shells, sand, water, salt, ethanol, iron filings): design a procedure ending with pure water',
    correctAnswer: '1) Use a magnet to remove iron filings. 2) Hand pick the seaweed and the sea shells 3) Decant the crude oil 4) Sieve out pebbles 5) Filter the mixture to remove sand 6) Distill the filtrate to collect ethanol (boils at ~78 °C) 7) Evaporate the remaining water to isolate pure water',
    explanation: ''
  },
  {
    id: 'metric-24',
    type: 'multiple-choice',
    question: 'In the paragraph above, there is 9 underlined properties. How many of the properties are chemical properties?',
    image: "/images/chemistry/metric1.png",
    options: [
      { "label": "A", "value": "A", "text": "2", },
      { "label": "B", "value": "B", "text": "3", },
      { "label": "C", "value": "C", "text": "4", },
      { "label": "D", "value": "D", "text": "5", }
    ],
    correctAnswer: 'B',
    explanation: 'Well-defined intermetallic compounds, pryophoric, react explosively with water'
  },
  {
    id: 'metric-25',
    type: 'multiple-choice',
    question: 'How many of the particle diagrams show a pure substance?',
    image: "/images/chemistry/metric2.png",
    options: [
      { "label": "A", "value": "A", "text": "1", },
      { "label": "B", "value": "B", "text": "2", },
      { "label": "C", "value": "C", "text": "3", },
      { "label": "D", "value": "D", "text": "4", }
    ],
    correctAnswer: 'D',
    explanation: '1, 2, 3, 4 are all having 1 compound/element'
  },
  {
    id: 'metric-26',
    type: 'multiple-choice',
    question: 'How many of the particle diagrams show a mixture of compounds?',
    image: "/images/chemistry/metric2.png",
    options: [
      { "label": "A", "value": "A", "text": "1", },
      { "label": "B", "value": "B", "text": "2", },
      { "label": "C", "value": "C", "text": "3", },
      { "label": "D", "value": "D", "text": "4", }
    ],
    correctAnswer: 'A',
    explanation: 'Only the last one has compounds and not all of them are the same'
  },
  {
    id: 'metric-27',
    type: 'multiple-choice',
    question: 'Match the state of matter to the missing information on the table.',
    image: "/images/chemistry/metric3.png",
    options: [
      { "label": "A", "value": "A", "text": "I. solid II. liquid III. gas", },
      { "label": "B", "value": "B", "text": "I. liquid II. gas III. solid", },
      { "label": "C", "value": "C", "text": "I. gas II. liquid III. solid", },
      { "label": "D", "value": "D", "text": "I. gas II. solid III. liquid", }
    ],
    correctAnswer: 'D',
    explanation: 'N/A'
  },
  {
    id: 'metric-28',
    type: 'free-response',
    question: 'An unknown ink is determined to have to pigments with Rf of approximately 0.23 and 0.74. Three inks, A, B, C, are candiddates for a match. A chromatogram of inks A, B, and C is shown above. Which of the inks has pigments with the lowest affinity for the mobile phase?',
    image: "/images/chemistry/metric4.png",
    correctAnswer: 'Ink A has pigments with the lowest affinity for the mobile phase because it has both Rf values as the lowest compared to the other inks.',
    explanation: 'N/A'
  },
  {
    id: 'metric-29',
    type: 'free-response',
    question: 'An unknown ink is determined to have to pigments with Rf of approximately 0.23 and 0.74. Three inks, A, B, C, are candiddates for a match. A chromatogram of inks A, B, and C is shown above. Determine the identity of the unknown ink. Answer using the CER method.',
    image: "/images/chemistry/metric4.png",
    correctAnswer: 'The identity of the unknown ink is C. According to the passage, the Rf values for the unknown are 0.23 and 0.74 and the limit of the water is around 5.3. That means something divided by 5.3 is 0.23 for one of the inks traveled and the other is 0.74. This means that the one most likely that has the closest match is Ink C.',
    explanation: 'N/A'
  },
  {
    id: 'metric-30',
    type: 'free-response',
    question: 'A small figurine found in a tomb in Iraq is made of some unknown metal. An archeologist measures the mass of the figurine to be 105.40g. Using Archimedes method, the archeologist measures the volume of the figurine. Look at the 2 diagrams above and measure the volume of the water in the graduated cylinder before and after adding the figurine.',
    image: "/images/chemistry/metric5.png",
    correctAnswer: '12.40 mL increase',
    explanation: 'Significant figures matter and 47.30-34.90 = 12.40 mL'
  },
  {
    id: 'metric-31',
    type: 'free-response',
    question: 'A small figurine found in a tomb in Iraq is made of some unknown metal. An archeologist measures the mass of the figurine to be 105.40g. Using Archimedes method, the archeologist measures the volume of the figurine. The increase in the mL was 12.40 mL. During the historical period when the tomb is believed to have been made, the people were known to make figurines from gold (19.30 g/mL), silver (10.49 g/mL), brass (8.50 g/mL), and tin (5.765 g/mL). Identify the material the figurine is made of using the CER method.',
    image: "/images/chemistry/metric5.png",
    correctAnswer: 'The material the figurine is made of is brass. The diagram shows a ~12.40 mL increase in volume after the figurine which was 105.4g. 105.4 divided by 12.40 is 8.5 g/mL. 8.5 g/mL matches up with brass g/mL which means  the figurine is made out of brass.',
    explanation: 'N/A'
  },
];
