import { Question } from '@/types/quiz';

// Questions array - IDs will be generated dynamically
const rawQuestions = [
  {
    type: 'multiple-choice' as const,
    question: 'What does Assuage mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To cause to be less harsh, violent, or severe' },
      { label: 'B', value: 'B', text: '(v.) To detest or hate intensely' },
      { label: 'C', value: 'C', text: '(adj.) Abrupt and curt in manner or speech; discourteously blunt' },
      { label: 'D', value: 'D', text: '(v.) To prepare by combining ingredients; To invent or devise' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'I tried to _____ the pain of getting hit in the shins with a baseball bat by biting my tongue, a method I learned from a tribe of South Africa to alleviate pain.',
    options: [
      { label: 'A', value: 'A', text: 'Assuage' },
      { label: 'B', value: 'B', text: 'Mitigate' },
      { label: 'C', value: 'C', text: 'Debase' },
      { label: 'D', value: 'D', text: 'Blazon' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Expostulate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To reason with someone in an effort to dissuade or correct; To protest against a decision or action' },
      { label: 'B', value: 'B', text: '(adj.) Difficult to understand or fathom' },
      { label: 'C', value: 'C', text: '(v.) To win confidence or good graces for oneself' },
      { label: 'D', value: 'D', text: '(adj.) Having little substance; flimsy' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'His parents sat him down to _____ about his plan to join the circus in an attempt to persuade him to go to college instead.',
    options: [
      { label: 'A', value: 'A', text: 'Expostulate' },
      { label: 'B', value: 'B', text: 'Cajole' },
      { label: 'C', value: 'C', text: 'Grandiose' },
      { label: 'D', value: 'D', text: 'Extricate' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Intercede mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To plead on someone else\'s behalf, to mediate an argument' },
      { label: 'B', value: 'B', text: '(v.) To make something appear greater than it actually is; Exaggerate' },
      { label: 'C', value: 'C', text: '(adj.) Acting with or marked by stealth; Secret' },
      { label: 'D', value: 'D', text: '(n.) An unfavorable or damaging remark; Slander' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Bobby and Greg argued so much I had to _____ by saying they should draw a line down the middle of the room and not be allowed to cross to the other person\'s side.',
    options: [
      { label: 'A', value: 'A', text: 'Intercede' },
      { label: 'B', value: 'B', text: 'Inveigh' },
      { label: 'C', value: 'C', text: 'Concoct' },
      { label: 'D', value: 'D', text: 'Aspersion' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Meritorious mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Deserving reward or praise' },
      { label: 'B', value: 'B', text: '(v.) To lower in character, quality or value' },
      { label: 'C', value: 'C', text: '(adj.) Excessively strict in behavior, morality, or opinions' },
      { label: 'D', value: 'D', text: '(v.) To free or release from a difficulty or entanglement' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'After he saved the lives of so many people, the fireman\'s _____ career was rewarded with a trophy and a honey-glazed ham.',
    options: [
      { label: 'A', value: 'A', text: 'Meritorious' },
      { label: 'B', value: 'B', text: 'Erudite' },
      { label: 'C', value: 'C', text: 'Stringent' },
      { label: 'D', value: 'D', text: 'Vitriolic' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Unctuous mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Excessively suave to the point of being fake, obviously exaggerated earnestness' },
      { label: 'B', value: 'B', text: '(v.) To make or grow better' },
      { label: 'C', value: 'C', text: '(adj.) Accidental, resulting from chance' },
      { label: 'D', value: 'D', text: '(v.) To detest or hate intensely' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'No matter what I said, he agreed, which made me wonder if he was just a(n) _____ blowhard that was only interested in selling me the car.',
    options: [
      { label: 'A', value: 'A', text: 'Unctuous' },
      { label: 'B', value: 'B', text: 'Surrepititious' },
      { label: 'C', value: 'C', text: 'Axiomatic' },
      { label: 'D', value: 'D', text: 'Tenuous' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Ameliorate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To make or grow better' },
      { label: 'B', value: 'B', text: '(adj.) Bitterly scathing; Cruel and sarcastic' },
      { label: 'C', value: 'C', text: '(v.) To voice or convey disapproval of; to scold' },
      { label: 'D', value: 'D', text: '(adj.) Imposing rigid standards of performance; Severe; Strict' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'After the School Board realized the the soccer field was in terrible shape they decided to _____ it with new grass.',
    options: [
      { label: 'A', value: 'A', text: 'Ameliorate' },
      { label: 'B', value: 'B', text: 'Aggrandize' },
      { label: 'C', value: 'C', text: 'Debase' },
      { label: 'D', value: 'D', text: 'Reprove' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Exhort mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To urge by strong, argument, admonition, or advice' },
      { label: 'B', value: 'B', text: '(v.) To influence or urge by gentle urging, caressing, or flattering' },
      { label: 'C', value: 'C', text: '(adj.) Evident without proof or argument' },
      { label: 'D', value: 'D', text: '(n.) An ideal example; Model or quintessence' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The popular kids tried to_____ me into having a party but I declined because I don\'t give in to peer pressure.',
    options: [
      { label: 'A', value: 'A', text: 'Exhort' },
      { label: 'B', value: 'B', text: 'Cajole' },
      { label: 'C', value: 'C', text: 'Mitigate' },
      { label: 'D', value: 'D', text: 'Extricate' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Ingratiate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To win confidence or good graces for oneself' },
      { label: 'B', value: 'B', text: '(adj.) Abrupt and curt in manner or speech; discourteously blunt' },
      { label: 'C', value: 'C', text: '(v.) To attack with harsh criticism' },
      { label: 'D', value: 'D', text: '(adj.) Characterized by extensive knowledge and book smarts' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Mary only told the teacher she does charity work to _____ herself further than her normal brown-nosing.',
    options: [
      { label: 'A', value: 'A', text: 'Ingratiate' },
      { label: 'B', value: 'B', text: 'Intercede' },
      { label: 'C', value: 'C', text: 'Grandiose' },
      { label: 'D', value: 'D', text: 'Disabuse' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Inveigh mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To attack with harsh criticism' },
      { label: 'B', value: 'B', text: '(v.) To make milder, softer or more endurable' },
      { label: 'C', value: 'C', text: '(adj.) Acting with or marked by stealth; Secret' },
      { label: 'D', value: 'D', text: '(v.) To free from a falsehood or misconception, to set right in ideas or thinking' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Many people who were against going to war made it a point to _____ against the president when he sent our troops into space to fight the martians.',
    options: [
      { label: 'A', value: 'A', text: 'Inveigh' },
      { label: 'B', value: 'B', text: 'Assuage' },
      { label: 'C', value: 'C', text: 'Blazon' },
      { label: 'D', value: 'D', text: 'Extricate' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Stringent mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Imposing rigid standards of performance; Severe; Strict' },
      { label: 'B', value: 'B', text: '(v.) To exaggerate; make something appear greater than it actually is' },
      { label: 'C', value: 'C', text: '(adj.) Impressive because of unnecessary largeness or grandeur' },
      { label: 'D', value: 'D', text: '(n.) An unfavorable or damaging remark; Slander' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'I didn\'t think high schools would take such _____ security measures like banning backpacks, but that\'s what happens when fearful people get put in charge.',
    options: [
      { label: 'A', value: 'A', text: 'Stringent' },
      { label: 'B', value: 'B', text: 'Straitlaced' },
      { label: 'C', value: 'C', text: 'Vitriolic' },
      { label: 'D', value: 'D', text: 'Erudite' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Abominate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To detest or hate intensely' },
      { label: 'B', value: 'B', text: '(v.) To prepare by combining ingredients; To invent or devise' },
      { label: 'C', value: 'C', text: '(adj.) Excessively strict in behavior, morality, or opinions' },
      { label: 'D', value: 'D', text: '(v.) To make amends for' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'She did _____ dogs because one attacked her when she was a child and she never could forgive any dog for that.',
    options: [
      { label: 'A', value: 'A', text: 'Abominate' },
      { label: 'B', value: 'B', text: 'Debase' },
      { label: 'C', value: 'C', text: 'Aggrandize' },
      { label: 'D', value: 'D', text: 'Cajole' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Adventitious mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Accidental, resulting from chance' },
      { label: 'B', value: 'B', text: '(v.) To voice or convey disapproval of; to scold' },
      { label: 'C', value: 'C', text: '(adj.) Difficult to understand or fathom' },
      { label: 'D', value: 'D', text: '(v.) To free or release from a difficulty or entanglement' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'I had a(n) _____ stroke of luck when I rolled a seven on the craps table, winning three thousand dollars.',
    options: [
      { label: 'A', value: 'A', text: 'Adventitious' },
      { label: 'B', value: 'B', text: 'Surrepititious' },
      { label: 'C', value: 'C', text: 'Axiomatic' },
      { label: 'D', value: 'D', text: 'Tenuous' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Expiate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To make amends for' },
      { label: 'B', value: 'B', text: '(adj.) Bitterly scathing; Cruel and sarcastic' },
      { label: 'C', value: 'C', text: '(v.) To make widely or generally known; To display conspicuously' },
      { label: 'D', value: 'D', text: '(adj.) Having little substance; flimsy' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'He believed that he could _____ his sins by confessing them on his death-bed, but I was happy confessing mine after they were committed',
    options: [
      { label: 'A', value: 'A', text: 'Expiate' },
      { label: 'B', value: 'B', text: 'Reprove' },
      { label: 'C', value: 'C', text: 'Blazon' },
      { label: 'D', value: 'D', text: 'Mitigate' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Tenuous mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Having little substance; flimsy' },
      { label: 'B', value: 'B', text: '(v.) To influence or urge by gentle urging, caressing, or flattering' },
      { label: 'C', value: 'C', text: '(adj.) Evident without proof or argument' },
      { label: 'D', value: 'D', text: '(v.) To lower in character, quality or value' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'His argument was _____ at best and I am pretty sure that he made up some of his points which would make his argument totally invalid.',
    options: [
      { label: 'A', value: 'A', text: 'Tenuous' },
      { label: 'B', value: 'B', text: 'Grandiose' },
      { label: 'C', value: 'C', text: 'Stringent' },
      { label: 'D', value: 'D', text: 'Erudite' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Vitriolic mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Bitterly scathing; Cruel and sarcastic' },
      { label: 'B', value: 'B', text: '(v.) To free from a falsehood or misconception, to set right in ideas or thinking' },
      { label: 'C', value: 'C', text: '(n.) An ideal example; Model or quintessence' },
      { label: 'D', value: 'D', text: '(adj.) Characterized by extensive knowledge and book smarts' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Some men were very _____ when the first women started voting, but their mean-hearted comments didn\'t discourage these brave pioneers.',
    options: [
      { label: 'A', value: 'A', text: 'Vitriolic' },
      { label: 'B', value: 'B', text: 'Brusque' },
      { label: 'C', value: 'C', text: 'Meritorious' },
      { label: 'D', value: 'D', text: 'Unctuous' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Aggrandize mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To make something appear greater than it actually is; Exaggerate' },
      { label: 'B', value: 'B', text: '(v.) To make or grow better' },
      { label: 'C', value: 'C', text: '(adj.) Excessively suave to the point of being fake, obviously exaggerated earnestness' },
      { label: 'D', value: 'D', text: '(v.) To attack with harsh criticism' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'He had to _____ his work at the soup kitchen to make it sound like he spent every free minute working there, although he only worked there one hour a month.',
    options: [
      { label: 'A', value: 'A', text: 'Aggrandize' },
      { label: 'B', value: 'B', text: 'Debase' },
      { label: 'C', value: 'C', text: 'Mitigate' },
      { label: 'D', value: 'D', text: 'Concoct' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Archetype mean?',
    options: [
      { label: 'A', value: 'A', text: '(n.) An ideal example; Model or quintessence' },
      { label: 'B', value: 'B', text: '(adj.) Accidental, resulting from chance' },
      { label: 'C', value: 'C', text: '(v.) To reason with someone in an effort to dissuade or correct; To protest' },
      { label: 'D', value: 'D', text: '(adj.) Abrupt and curt in manner or speech; discourteously blunt' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The hamburglar is the _____ of a villain, with the prison stripes and the criminal mask.',
    options: [
      { label: 'A', value: 'A', text: 'Archetype' },
      { label: 'B', value: 'B', text: 'Aspersion' },
      { label: 'C', value: 'C', text: 'Erudite' },
      { label: 'D', value: 'D', text: 'Axiomatic' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Erudite mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Characterized by extensive knowledge and book smarts' },
      { label: 'B', value: 'B', text: '(v.) To prepare by combining ingredients; To invent or devise' },
      { label: 'C', value: 'C', text: '(v.) To detest or hate intensely' },
      { label: 'D', value: 'D', text: '(adj.) Acting with or marked by stealth; Secret' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Albert Einstein is known for being a(n) _____ person because he was no dummy.',
    options: [
      { label: 'A', value: 'A', text: 'Erudite' },
      { label: 'B', value: 'B', text: 'Inscrutable' },
      { label: 'C', value: 'C', text: 'Stringent' },
      { label: 'D', value: 'D', text: 'Vitriolic' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Inscrutable mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Difficult to understand or fathom' },
      { label: 'B', value: 'B', text: '(v.) To make milder, softer or more endurable' },
      { label: 'C', value: 'C', text: '(adj.) Excessively strict in behavior, morality, or opinions' },
      { label: 'D', value: 'D', text: '(v.) To win confidence or good graces for oneself' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Those _____ neighbors just put a diving board on their roof, but they don\'t have a pool!',
    options: [
      { label: 'A', value: 'A', text: 'Inscrutable' },
      { label: 'B', value: 'B', text: 'Tenuous' },
      { label: 'C', value: 'C', text: 'Grandiose' },
      { label: 'D', value: 'D', text: 'Blazon' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Remonstrate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To present and urge reasons in opposition; To protest' },
      { label: 'B', value: 'B', text: '(adj.) Impressive because of unnecessary largeness or grandeur' },
      { label: 'C', value: 'C', text: '(v.) To free or release from a difficulty or entanglement' },
      { label: 'D', value: 'D', text: '(n.) An unfavorable or damaging remark; Slander' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The mother had to _____ the child for accepting candy from the stranger because the child had to learn not to do that anymore.',
    options: [
      { label: 'A', value: 'A', text: 'Remonstrate' },
      { label: 'B', value: 'B', text: 'Exhort' },
      { label: 'C', value: 'C', text: 'Cajole' },
      { label: 'D', value: 'D', text: 'Disabuse' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Axiomatic mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Evident without proof or argument' },
      { label: 'B', value: 'B', text: '(v.) To lower in character, quality or value' },
      { label: 'C', value: 'C', text: '(adj.) Bitterly scathing; Cruel and sarcastic' },
      { label: 'D', value: 'D', text: '(v.) To influence or urge by gentle urging, caressing, or flattering' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The idea that 1+1=2 is so basic, some consider it a(n) _____ truth that doesn\'t need any proof.',
    options: [
      { label: 'A', value: 'A', text: 'Axiomatic' },
      { label: 'B', value: 'B', text: 'Erudite' },
      { label: 'C', value: 'C', text: 'Surrepititious' },
      { label: 'D', value: 'D', text: 'Vitriolic' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Blazon mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To make widely or generally known; To display conspicuously' },
      { label: 'B', value: 'B', text: '(adj.) Accidental, resulting from chance' },
      { label: 'C', value: 'C', text: '(v.) To make amends for' },
      { label: 'D', value: 'D', text: '(adj.) Abrupt and curt in manner or speech; discourteously blunt' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'When I donated blood, I made sure to _____ my sticker all day so people would know that I donated and would treat me nicer.',
    options: [
      { label: 'A', value: 'A', text: 'Blazon' },
      { label: 'B', value: 'B', text: 'Concoct' },
      { label: 'C', value: 'C', text: 'Extricate' },
      { label: 'D', value: 'D', text: 'Aggrandize' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Extricate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To free or release from a difficulty or entanglement' },
      { label: 'B', value: 'B', text: '(adj.) Excessively suave to the point of being fake, obviously exaggerated earnestness' },
      { label: 'C', value: 'C', text: '(v.) To exaggerate; make something appear greater than it actually is' },
      { label: 'D', value: 'D', text: '(adj.) Characterized by extensive knowledge and book smarts' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'After I fell off the boat and became entangled in the seaweed, the Coast Guard was able to _____ me from my predicament.',
    options: [
      { label: 'A', value: 'A', text: 'Extricate' },
      { label: 'B', value: 'B', text: 'Intercede' },
      { label: 'C', value: 'C', text: 'Mitigate' },
      { label: 'D', value: 'D', text: 'Debase' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Scathing mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Regarding bitterly abusive criticism; harshly critical' },
      { label: 'B', value: 'B', text: '(v.) To prepare by combining ingredients; To invent or devise' },
      { label: 'C', value: 'C', text: '(v.) To make or grow better' },
      { label: 'D', value: 'D', text: '(adj.) Acting with or marked by stealth; Secret' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Some people had _____ reviews on Star Wars: Episode I, because it was a terrible movie.',
    options: [
      { label: 'A', value: 'A', text: 'Scathing' },
      { label: 'B', value: 'B', text: 'Vitriolic' },
      { label: 'C', value: 'C', text: 'Brusque' },
      { label: 'D', value: 'D', text: 'Tenuous' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Straitlaced mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Excessively strict in behavior, morality, or opinions' },
      { label: 'B', value: 'B', text: '(v.) To voice or convey disapproval of; to scold' },
      { label: 'C', value: 'C', text: '(n.) An ideal example; Model or quintessence' },
      { label: 'D', value: 'D', text: '(adj.) Having little substance; flimsy' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Father Morgan was so _____ that he would never drink alcohol, never cursed, and never watched TV shows that were rated MA.',
    options: [
      { label: 'A', value: 'A', text: 'Straitlaced' },
      { label: 'B', value: 'B', text: 'Stringent' },
      { label: 'C', value: 'C', text: 'Unctuous' },
      { label: 'D', value: 'D', text: 'Grandiose' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Aspersion mean?',
    options: [
      { label: 'A', value: 'A', text: '(n.) An unfavorable or damaging remark; Slander' },
      { label: 'B', value: 'B', text: '(v.) To free from a falsehood or misconception, to set right in ideas or thinking' },
      { label: 'C', value: 'C', text: '(adj.) Difficult to understand or fathom' },
      { label: 'D', value: 'D', text: '(v.) To detest or hate intensely' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'I couldn\'t believe I heard such _____ coming from the bully\'s mouth in front of a teacher, if I used slander I would get detention.',
    options: [
      { label: 'A', value: 'A', text: 'Aspersion' },
      { label: 'B', value: 'B', text: 'Reprove' },
      { label: 'C', value: 'C', text: 'Blazon' },
      { label: 'D', value: 'D', text: 'Inveigh' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Brusque mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Abrupt and curt in manner or speech; discourteously blunt' },
      { label: 'B', value: 'B', text: '(v.) To make milder, softer or more endurable' },
      { label: 'C', value: 'C', text: '(adj.) Evident without proof or argument' },
      { label: 'D', value: 'D', text: '(v.) To make widely or generally known; To display conspicuously' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'After she bugged me to go to the dance for the tenth time, I gave her a(n) _____ no.',
    options: [
      { label: 'A', value: 'A', text: 'Brusque' },
      { label: 'B', value: 'B', text: 'Vitriolic' },
      { label: 'C', value: 'C', text: 'Stringent' },
      { label: 'D', value: 'D', text: 'Erudite' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Cajole mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To influence or urge by gentle urging, caressing, or flattering' },
      { label: 'B', value: 'B', text: '(adj.) Imposing rigid standards of performance; Severe; Strict' },
      { label: 'C', value: 'C', text: '(v.) To attack with harsh criticism' },
      { label: 'D', value: 'D', text: '(adj.) Accidental, resulting from chance' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'She worked hard to _____ her father into buying her the expensive dress for prom, and he finally caved in the instant she gave him Bambi-eyes.',
    options: [
      { label: 'A', value: 'A', text: 'Cajole' },
      { label: 'B', value: 'B', text: 'Exhort' },
      { label: 'C', value: 'C', text: 'Remonstrate' },
      { label: 'D', value: 'D', text: 'Inveigh' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Disabuse mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To free from a falsehood or misconception, to set right in ideas or thinking' },
      { label: 'B', value: 'B', text: '(adj.) Bitterly scathing; Cruel and sarcastic' },
      { label: 'C', value: 'C', text: '(v.) To win confidence or good graces for oneself' },
      { label: 'D', value: 'D', text: '(adj.) Excessively strict in behavior, morality, or opinions' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'We had to _____ her of the idea that the Easter Bunny was real, so we sat her down and calmly discussed the truth.',
    options: [
      { label: 'A', value: 'A', text: 'Disabuse' },
      { label: 'B', value: 'B', text: 'Extricate' },
      { label: 'C', value: 'C', text: 'Blazon' },
      { label: 'D', value: 'D', text: 'Concoct' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Surrepititious mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Acting with or marked by stealth; Secret' },
      { label: 'B', value: 'B', text: '(v.) To reason with someone in an effort to dissuade or correct; To protest' },
      { label: 'C', value: 'C', text: '(n.) An unfavorable or damaging remark; Slander' },
      { label: 'D', value: 'D', text: '(adj.) Characterized by extensive knowledge and book smarts' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'She dropped her napkin as a ruse to steal a(n) _____ glance at the stranger, but she accidentally fell out of her chair drawing everyone\'s attention.',
    options: [
      { label: 'A', value: 'A', text: 'Surrepititious' },
      { label: 'B', value: 'B', text: 'Inscrutable' },
      { label: 'C', value: 'C', text: 'Adventitious' },
      { label: 'D', value: 'D', text: 'Axiomatic' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Concoct mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To prepare by combining ingredients; To invent or devise' },
      { label: 'B', value: 'B', text: '(adj.) Difficult to understand or fathom' },
      { label: 'C', value: 'C', text: '(v.) To make amends for' },
      { label: 'D', value: 'D', text: '(adj.) Abrupt and curt in manner or speech; discourteously blunt' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Once you graduate Campbell\'s cooking school, you\'ll be able to _____ your own recipes from any can of Campbell\'s soup imaginable.',
    options: [
      { label: 'A', value: 'A', text: 'Concoct' },
      { label: 'B', value: 'B', text: 'Aggrandize' },
      { label: 'C', value: 'C', text: 'Mitigate' },
      { label: 'D', value: 'D', text: 'Debase' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Debase mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To lower in character, quality or value' },
      { label: 'B', value: 'B', text: '(v.) To exaggerate; make something appear greater than it actually is' },
      { label: 'C', value: 'C', text: '(adj.) Impressive because of unnecessary largeness or grandeur' },
      { label: 'D', value: 'D', text: '(v.) To free or release from a difficulty or entanglement' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'She always wants to _____ others because she has low self esteem and degrading others makes her feel better.',
    options: [
      { label: 'A', value: 'A', text: 'Debase' },
      { label: 'B', value: 'B', text: 'Expiate' },
      { label: 'C', value: 'C', text: 'Assuage' },
      { label: 'D', value: 'D', text: 'Extricate' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Grandiose mean?',
    options: [
      { label: 'A', value: 'A', text: '(adj.) Impressive because of unnecessary largeness or grandeur' },
      { label: 'B', value: 'B', text: '(v.) To influence or urge by gentle urging, caressing, or flattering' },
      { label: 'C', value: 'C', text: '(adj.) Evident without proof or argument' },
      { label: 'D', value: 'D', text: '(v.) To make or grow better' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'I used to have _____ plans for my future that included buying a couple mansions and summer homes, but those plans were laid to rest once I got a job teaching.',
    options: [
      { label: 'A', value: 'A', text: 'Grandiose' },
      { label: 'B', value: 'B', text: 'Meritorious' },
      { label: 'C', value: 'C', text: 'Erudite' },
      { label: 'D', value: 'D', text: 'Tenuous' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Mitigate mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To make milder, softer or more endurable' },
      { label: 'B', value: 'B', text: '(adj.) Excessively suave to the point of being fake, obviously exaggerated earnestness' },
      { label: 'C', value: 'C', text: '(n.) An ideal example; Model or quintessence' },
      { label: 'D', value: 'D', text: '(v.) To detest or hate intensely' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'We tried to _____ her pain by having her imagine that she was laying on a comfortable beach getting a backrub.',
    options: [
      { label: 'A', value: 'A', text: 'Mitigate' },
      { label: 'B', value: 'B', text: 'Assuage' },
      { label: 'C', value: 'C', text: 'Debase' },
      { label: 'D', value: 'D', text: 'Reprove' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'What does Reprove mean?',
    options: [
      { label: 'A', value: 'A', text: '(v.) To voice or convey disapproval of; to scold' },
      { label: 'B', value: 'B', text: '(adj.) Acting with or marked by stealth; Secret' },
      { label: 'C', value: 'C', text: '(v.) To prepare by combining ingredients; To invent or devise' },
      { label: 'D', value: 'D', text: '(adj.) Having little substance; flimsy' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'She had to _____ the child for his bad behavior so that he would learn to act better next time.',
    options: [
      { label: 'A', value: 'A', text: 'Reprove' },
      { label: 'B', value: 'B', text: 'Inveigh' },
      { label: 'C', value: 'C', text: 'Remonstrate' },
      { label: 'D', value: 'D', text: 'Cajole' },
    ],
    correctAnswer: 'A',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'free-response',
    question: 'What does Tone mean?',
    correctAnswer: 'Tone is how the author perceives what they are writing about using different word choices and structure, DIFFERENT FROM MOOD',
    explanation: 'Remember'
  },
  {
    id: '',
    type: 'free-response',
    question: 'What does Theme mean?',
    correctAnswer: 'Subject with deeper meaning',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Topic mean?',
    correctAnswer: 'Broad Subject',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Metaphor mean?',
    correctAnswer: 'Makes indirect comparisons without like or as.',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Simile mean?',
    correctAnswer: 'Comparisons using like or as',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Allusion mean?',
    correctAnswer: 'Indirect Reference to something else',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Hyperbole mean?',
    correctAnswer: 'Exaggeration of a claim, not meant to be taken literally',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Personification mean?',
    correctAnswer: 'Giving human traits to nonhuman objects.',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Indirect Characterization mean?',
    correctAnswer: 'Traits are assumed based on given statements/actions that can be used to describe them that isn\'t explicitly stated.',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Direct Characterization mean?',
    correctAnswer: 'Direct traits are stated.',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Imagery mean?',
    correctAnswer: 'Descriptions, can make it feel visual',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Alliteration mean?',
    correctAnswer: 'Same letter/sound appearing in front of a word in quick succession, emphasizes text.',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Dramatic Irony mean?',
    correctAnswer: 'The audience knows crucial information that the characters in a story don\'t',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Oxymoron mean?',
    correctAnswer: '2 words that are paired together that contradict eachother, "defeaning silence" is an example',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Loaded Language mean?',
    correctAnswer: 'Has strong emotional meaning, animal compared to beast, beast has more emotional value than animal(depends on context).',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Ethos mean?',
    correctAnswer: 'Credibility',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Pathos mean?',
    correctAnswer: 'Emotion',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Logos mean?',
    correctAnswer: 'Logic',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Foil mean?',
    correctAnswer: 'A character or element that directly/sharply contrasts from the protagonist',
    explanation: 'Remember'
  },  
  {
    id: '',
    type: 'free-response',
    question: 'What does Symbols mean?',
    correctAnswer: 'Object that represents something else, light/dark = good/evil',
    explanation: 'Remember'
  },  
];

// Export with auto-generated IDs
export const unit1Questions: Question[] = rawQuestions.map((q, i) => ({
  ...q,
  id: `eng-unit1-${i + 1}`,
})) as Question[];
