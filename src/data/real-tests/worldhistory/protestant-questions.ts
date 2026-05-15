import { Question } from '@/types/quiz';

// Questions array - IDs will be generated dynamically
const rawQuestions = [
  {
    type: 'free-response' as const,
    question: 'Find the word based on information: To set aside or declare legally invalid',
    correctAnswer: 'Annul',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: Pope that admitted that he fathered several children',
    correctAnswer: 'Pope Alexander VI',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the word based on information: these released sinners from performing the penalty imposed for sins',
    correctAnswer: 'indulgences',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: Pope who investigated sale of indulgences and other abuses',
    correctAnswer: 'Pope Paul III',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: Pope who compiled an Index of Forbidden Books',
    correctAnswer: 'Pope Paul IV',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: Pope & member of the Medici family; promoted sale of indulgences',
    correctAnswer: 'Pope Leo X',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: Catherine of Aragon\'s nephew and the Holy Roman Emporer',
    correctAnswer: 'Charles V',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: She gave birth to Elizabeth I',
    correctAnswer: 'Ann Boleyn',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the word based on information: She gave birth to Edward VI',
    correctAnswer: 'Jane Seymour',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: wrote Institutes of the Christan Religion & believed in predestination',
    correctAnswer: 'John Calvin',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: he brought Calvinism to Scotland',
    correctAnswer: 'John Knox',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: wrote book called Spiritual Exercises and founded Jesuit Order',
    correctAnswer: 'Ignatius of Loyola',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: Martin Luther\'s wife who advocated women\'s equal role',
    correctAnswer: 'Katherina von Bora',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: She protected Calvin from being executed in France',
    correctAnswer: 'Marguerite of Navarre',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Find the name based on information: She scolded a minister for speaking harshly about a reformer',
    correctAnswer: 'Katherina Zell',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'By 1500, Renaissance emphasis on new ideas and the individual challenged Church authority',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Germany was divided into many competing state with different princes. Some princes supported Luther while others remained Catholic and supported the Pope and Holy Roman Emporer.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The Church had many problems such as priests\' illiteracy, marriage and corruption',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Martin Luther taught scripture at the University of Wittenberg',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Luther nailed a copy of his 95 Theses on the church door during his visit to Rome',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Pope Paul III excommunicated Luther for his heretical views outlined in the 95 Theses.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'German prince Frederick the Wise of Saxony sheltered Luther after the trial when convicted of being a heretic',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The peasants revolted as a result of the religious reform movement and the hope that there would be an end to their economic suffering.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Henry VIII used his parliament to end the pope\'s power in England and seperate from the Catholic church',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Mary, daughter of Henry VIII, returned the English Church to the rule of Protestantism',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Thomas More\'s Catholic faith did not allow him to accept the Act of Supremacy',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'In 1559, Parliament followed Elizabeth\'s wishes and set up the formal Church of England, known as the Anglican Church. Her father, Henry VIII, had already separated from the Roman Catholic Church using his Parliament with the Act of Supremacy',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The Anabaptists believed in the baptism of people who were old enough to decide to be Christian. They also held radical views on anti-war and the separation of Church & State',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Pope Alexander VI created the Council of Trent and enforced its decisions',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'In Switzerland, John Knox\'s followers were called Huguenots',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Predestination believed that God predetermined those who would be saved.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Elizabeth decided to bring English Catholics & Protestants back together by establishing a church of England that both moderate Catholics & moderate Protestants might both accept.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Some German princes supported Luther for selfish reasons rather than religious reasons.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'One of the reasons that the pope wouldn\'t annul Henry VIII\'s marriage to Catherine of Aragon was because Charles V was her nephew',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The printing press did little to fuel reform in Western Europe during the 1500s',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Is the following cause Social, Political, or Economic? Resentment of paying taxes to the Church.',
    correctAnswer: 'Economic',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Is the following cause Social, Political, or Economic? Monarchs saw popes as foreigners meddling in their affairs',
    correctAnswer: 'Political',
    explanation: '.'
  },
  {
    id: '',
    type: 'free-response',
    question: 'Is the following cause Social, Political, or Economic? Humanism & secularism led many in society to question the Church',
    correctAnswer: 'Social',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Which of the following were examples of Chuch corruption that needed reform',
    options: [
      { label: 'A', value: 'A', text: 'Illiterate priests' },
      { label: 'B', value: 'B', text: 'Selling indulgences' },
      { label: 'C', value: 'C', text: 'Popes fathering children' },
      { label: 'D', value: 'D', text: 'Church officials more interested in money than religion' },
      { label: 'E', value: 'E', text: 'all of the options' },
    ],
    correctAnswer: 'E',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Which situation led Martin Luther to devote his life to God and enter the monastery?',
    options: [
      { label: 'A', value: 'A', text: 'the physical abuse he endured from his parents' },
      { label: 'B', value: 'B', text: 'his training to become a lawyer' },
      { label: 'C', value: 'C', text: 'the violent thunderstorms' },
      { label: 'D', value: 'D', text: 'his visit to Rome' },
      { label: 'E', value: 'E', text: 'none of the above' },
    ],
    correctAnswer: 'C',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Luther\'s early experience in the monastery can best be described as: ',
    options: [
      { label: 'A', value: 'A', text: 'being tormented with inner doubt and struggles' },
      { label: 'B', value: 'B', text: 'being an enlightening and religiously rewarding experience' },
      { label: 'C', value: 'C', text: 'making him want to pursue a career in law' },
      { label: 'D', value: 'D', text: 'intellectually satisfying' },
      { label: 'E', value: 'E', text: 'a waste of time' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Which experience directly led Luther to the realization that the Bible was the final authority?',
    options: [
      { label: 'A', value: 'A', text: 'the violent thunderstorm' },
      { label: 'B', value: 'B', text: 'the trip to Rome' },
      { label: 'C', value: 'C', text: 'his assignment to teach Bible Studies' },
      { label: 'D', value: 'D', text: 'the corruption in his own monastery' },
      { label: 'E', value: 'E', text: 'the peasant revolt' },
    ],
    correctAnswer: 'C',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Which of the following was NOT a main idea of Luther\'s teaching?',
    options: [
      { label: 'A', value: 'A', text: 'salvation by faith alone' },
      { label: 'B', value: 'B', text: 'proper indulgneces okay' },
      { label: 'C', value: 'C', text: 'Bible as final authority' },
      { label: 'D', value: 'D', text: 'priests not needed to interpret Bible' },
      { label: 'E', value: 'E', text: 'Church teaching should be based on Bible' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'According to the Edict of Worms:',
    options: [
      { label: 'A', value: 'A', text: 'Luther was declared a heretic and hero' },
      { label: 'B', value: 'B', text: 'all reformers\' books were to be burned' },
      { label: 'C', value: 'C', text: 'banishment and no one was to give Luther food or shelter' },
      { label: 'D', value: 'D', text: 'Fredrick the Wise could shelter Luther' },
      { label: 'E', value: 'E', text: 'German princes who objected were called Protestants' },
    ],
    correctAnswer: 'c',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The Peace of Augsburg instituted the following: ',
    options: [
      { label: 'A', value: 'A', text: 'a meeting between the pope and the Holy Roman Emperor' },
      { label: 'B', value: 'B', text: 'German princes could decide the religion of their own territory' },
      { label: 'C', value: 'C', text: 'Luther was a heretic' },
      { label: 'D', value: 'D', text: 'Charles V would retire to private life' },
      { label: 'E', value: 'E', text: 'Charles the V would go to war against the Protestant princes of Germany' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Which of the following men did NOT die because of his religious views?',
    options: [
      { label: 'A', value: 'A', text: 'Huldrych Zwingli' },
      { label: 'B', value: 'B', text: 'Jan Hus' },
      { label: 'C', value: 'C', text: 'Martin Luther' },
      { label: 'D', value: 'D', text: 'Thomas More' },
    ],
    correctAnswer: 'C',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The Council of Trent said all of the following EXCEPT',
    options: [
      { label: 'A', value: 'A', text: 'Approved the Jesuit order' },
      { label: 'B', value: 'B', text: 'Faith & good works needed for salvation' },
      { label: 'C', value: 'C', text: 'Bible & Church tradition had equal weight' },
      { label: 'D', value: 'D', text: 'Proper indulgences were okay' },
      { label: 'E', value: 'E', text: 'Church\'s interpretation of the Bible was final' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'The Jesuits main activities included all of the following EXCEPT:',
    options: [
      { label: 'A', value: 'A', text: 'education & founding schools' },
      { label: 'B', value: 'B', text: 'killing Martin Luther' },
      { label: 'C', value: 'C', text: 'converting non-Christians' },
      { label: 'D', value: 'D', text: 'sending out Missionaries' },
      { label: 'E', value: 'E', text: 'halting the spread of Protestantism' },
    ],
    correctAnswer: 'B',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Pope Paul III took all of the following steps EXCEPT:',
    options: [
      { label: 'A', value: 'A', text: 'used the Inquisition to stop the spread of Catholicism' },
      { label: 'B', value: 'B', text: 'called the Council of Trent' },
      { label: 'C', value: 'C', text: 'directed cardinals to investigate indulgences' },
      { label: 'D', value: 'D', text: 'approved the society of Jesus' },
      { label: 'E', value: 'E', text: 'took a lead in launching the Catholic Reformation' },
    ],
    correctAnswer: 'A',
    explanation: '.'
  },
  {
    id: '',
    type: 'multiple-choice',
    question: 'Which of the following was NOT a legacy of the Reformation?',
    options: [
      { label: 'A', value: 'A', text: 'Protestant churches flourished' },
      { label: 'B', value: 'B', text: 'Roman Catholic Church became more unified' },
      { label: 'C', value: 'C', text: 'more emphasis placed on education in promoting religion' },
      { label: 'D', value: 'D', text: 'groundwork for the Enlightenment was laid' },
      { label: 'E', value: 'E', text: 'the status of women in the church & in society improved' },
    ],
    correctAnswer: 'E',
    explanation: '.'
  },
];

// Export with auto-generated IDs
export const protestantQuestions: Question[] = rawQuestions.map((q, i) => ({
  ...q,
  id: `protestant-${i + 1}`,
})) as Question[];
