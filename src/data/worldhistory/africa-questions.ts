import { Question } from '@/types/quiz';

export const africaQuestions: Question[] = [
  // ── BASE QUESTIONS (100%) ──────────────────────────────────────────────────

  {
    id: 'africa-1',
    type: 'multiple-choice',
    question: 'Who were the Berber nomads and what were they known for?',
    options: [
      { label: 'A', value: 'A', text: 'Coastal traders who used boats to cross the Mediterranean' },
      { label: 'B', value: 'B', text: 'Saharan nomads who used camels to travel and trade across the desert' },
      { label: 'C', value: 'C', text: 'Forest dwellers who traded ivory and wood' },
      { label: 'D', value: 'D', text: 'Muslim warriors who spread Islam by conquest' },
    ],
    correctAnswer: 'B',
    explanation: 'The Berber nomads were known for their use of camels to traverse the Sahara, which made long-distance desert trade possible.',
  },

  {
    id: 'africa-2',
    type: 'multiple-choice',
    question: 'What single development most allowed trade to increase across Africa?',
    options: [
      { label: 'A', value: 'A', text: 'The invention of the wheel' },
      { label: 'B', value: 'B', text: 'The use of camels' },
      { label: 'C', value: 'C', text: 'The building of roads' },
      { label: 'D', value: 'D', text: 'The spread of Islam' },
    ],
    correctAnswer: 'B',
    explanation: 'Camels could carry heavy loads over long distances with minimal water, making Saharan trade routes practical for the first time and dramatically increasing the scale of African commerce.',
  },

  {
    id: 'africa-3',
    type: 'multiple-choice',
    question: 'Who were the people of the Kingdom of Ghana?',
    options: [
      { label: 'A', value: 'A', text: 'The Mande-speaking people' },
      { label: 'B', value: 'B', text: 'The Soninke people' },
      { label: 'C', value: 'C', text: 'The Hausa people' },
      { label: 'D', value: 'D', text: 'The Yoruba people' },
    ],
    correctAnswer: 'B',
    explanation: 'The Kingdom of Ghana was built by the Soninke people, who leveraged their position between the goldfields of the south and the salt sources of the north.',
  },

  {
    id: 'africa-4',
    type: 'free-response',
    question: 'What was the Gold-Salt Trade and where did it take place?',
    correctAnswer: 'It was a trade exchange of gold and salt between the Niger and Senegal rivers in West Africa.',
    explanation: 'Gold was abundant in the south but scarce in the north; salt was plentiful in the Sahara but rare in the south. This mutual need created one of the ancient world\'s most profitable trade systems.',
  },

  {
    id: 'africa-5',
    type: 'multiple-choice',
    question: 'What unusual building material did the Saharan village of Taghaza use to construct its houses?',
    options: [
      { label: 'A', value: 'A', text: 'Mud bricks' },
      { label: 'B', value: 'B', text: 'Salt blocks' },
      { label: 'C', value: 'C', text: 'Carved stone' },
      { label: 'D', value: 'D', text: 'Dried animal hide' },
    ],
    correctAnswer: 'B',
    explanation: 'Taghaza was one of the most important salt-mining centers in the Sahara. Salt was so abundant there that it was literally used as a structural building material.',
  },

  {
    id: 'africa-6',
    type: 'select-all',
    question: 'How did royal officials help support trade in West African kingdoms? Select all that apply.',
    options: [
      { label: 'A', value: 'A', text: 'Protected merchants from bandits' },
      { label: 'B', value: 'B', text: 'Taxed trade to generate royal revenue' },
      { label: 'C', value: 'C', text: 'Built ships to transport goods overseas' },
      { label: 'D', value: 'D', text: 'Provided security along trade routes' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Royal officials made trade safer and more reliable by protecting merchants from bandit attacks and maintaining trade route security, while also taxing goods to enrich the kingdom.',
  },

  {
    id: 'africa-7',
    type: 'free-response',
    question: 'How did the king of Ghana maintain control over nearby lands and rulers?',
    correctAnswer: 'He demanded gifts and taxed them, and would invade if they refused to comply.',
    explanation: 'Ghana\'s king used a combination of economic pressure (taxation and tribute demands) and military threat (invasion) to keep neighboring rulers subordinate — a classic strategy of early imperial control.',
  },

  {
    id: 'africa-8',
    type: 'multiple-choice',
    question: 'Who was al-Bakri and why is he historically significant?',
    options: [
      { label: 'A', value: 'A', text: 'A Malian general who conquered Ghana' },
      { label: 'B', value: 'B', text: 'A Muslim geographer who wrote a description of Ghana\'s royal court' },
      { label: 'C', value: 'C', text: 'A Berber trader who established the gold-salt route' },
      { label: 'D', value: 'D', text: 'A Moroccan soldier who defeated the Songhai' },
    ],
    correctAnswer: 'B',
    explanation: 'Al-Bakri was an Arab Muslim geographer whose written accounts give historians one of the most detailed primary source descriptions of Ghana\'s wealth and royal customs.',
  },

  {
    id: 'africa-9',
    type: 'multiple-choice',
    question: 'How did Islam spread to West Africa?',
    options: [
      { label: 'A', value: 'A', text: 'Through military conquest by Arab armies' },
      { label: 'B', value: 'B', text: 'Through trade and contact with Muslim merchants' },
      { label: 'C', value: 'C', text: 'Through Portuguese missionaries' },
      { label: 'D', value: 'D', text: 'Through Berber invasion from North Africa' },
    ],
    correctAnswer: 'B',
    explanation: 'Just as in East Africa, Islam spread to West Africa peacefully through sustained contact with Muslim traders, whose regular presence along trade routes introduced the religion to local populations.',
  },

  {
    id: 'africa-10',
    type: 'multiple-choice',
    question: 'What is Animism?',
    options: [
      { label: 'A', value: 'A', text: 'The belief in one all-powerful god' },
      { label: 'B', value: 'B', text: 'The belief that spirits live in animals and natural objects' },
      { label: 'C', value: 'C', text: 'The practice of ancestor worship only' },
      { label: 'D', value: 'D', text: 'The belief that the sun and moon are gods' },
    ],
    correctAnswer: 'B',
    explanation: 'Animism is the traditional belief that spiritual forces inhabit animals, plants, rivers, and other natural elements — a worldview common among many African peoples before and alongside Islam.',
  },

  {
    id: 'africa-11',
    type: 'multiple-choice',
    question: 'How did the spread of Islam contribute to education in West Africa?',
    options: [
      { label: 'A', value: 'A', text: 'It introduced mathematics and geometry' },
      { label: 'B', value: 'B', text: 'It promoted literacy so people could read the Qur\'an' },
      { label: 'C', value: 'C', text: 'It established universities funded by trade taxes' },
      { label: 'D', value: 'D', text: 'It brought printing presses from Arabia' },
    ],
    correctAnswer: 'B',
    explanation: 'Because Muslims are expected to read the Qur\'an directly, the spread of Islam created a strong incentive for literacy, which in turn expanded educational infrastructure across West Africa.',
  },

  {
    id: 'africa-12',
    type: 'multiple-choice',
    question: 'What was the Kingdom of Mali?',
    options: [
      { label: 'A', value: 'A', text: 'A coastal kingdom founded by Berber nomads' },
      { label: 'B', value: 'B', text: 'A kingdom founded by Mande-speaking people' },
      { label: 'C', value: 'C', text: 'A kingdom established by the Soninke after Ghana\'s fall' },
      { label: 'D', value: 'D', text: 'An empire created by Moroccan invaders' },
    ],
    correctAnswer: 'B',
    explanation: 'Mali was founded by Mande-speaking peoples and grew into one of the largest and wealthiest empires in West African history.',
  },

  {
    id: 'africa-13',
    type: 'multiple-choice',
    question: 'Where geographically did the Mali Empire begin?',
    options: [
      { label: 'A', value: 'A', text: 'North of Ghana along the Saharan trade routes' },
      { label: 'B', value: 'B', text: 'South of Ghana' },
      { label: 'C', value: 'C', text: 'Along the East African coast' },
      { label: 'D', value: 'D', text: 'In the Niger River delta' },
    ],
    correctAnswer: 'B',
    explanation: 'Mali originated south of Ghana and eventually expanded northward, absorbing Ghana\'s former territory along with its wealthy trade routes.',
  },

  {
    id: 'africa-14',
    type: 'multiple-choice',
    question: 'What resource formed the economic foundation of both Ghana and Mali?',
    options: [
      { label: 'A', value: 'A', text: 'Salt' },
      { label: 'B', value: 'B', text: 'Gold' },
      { label: 'C', value: 'C', text: 'Ivory' },
      { label: 'D', value: 'D', text: 'Iron' },
    ],
    correctAnswer: 'B',
    explanation: 'Gold was the primary source of wealth for both Ghana and Mali. Control of goldfields and gold trade routes was the key to each empire\'s prosperity and power.',
  },

  {
    id: 'africa-15',
    type: 'multiple-choice',
    question: 'Who was Sundiata and how did he come to power?',
    options: [
      { label: 'A', value: 'A', text: 'A peaceful king who inherited the throne from his father' },
      { label: 'B', value: 'B', text: 'Mali\'s first great leader who came to power by crushing an unpopular ruler' },
      { label: 'C', value: 'C', text: 'A Songhai general who conquered the Mali Empire' },
      { label: 'D', value: 'D', text: 'A Muslim scholar who united the Mande people peacefully' },
    ],
    correctAnswer: 'B',
    explanation: 'Sundiata was Mali\'s first great leader, rising to power by overthrowing a ruler whom the people despised, making him both a liberator and a founding conqueror.',
  },

  {
    id: 'africa-16',
    type: 'multiple-choice',
    question: 'What does the title "Mansa" mean?',
    options: [
      { label: 'A', value: 'A', text: 'General' },
      { label: 'B', value: 'B', text: 'Emperor' },
      { label: 'C', value: 'C', text: 'Conqueror' },
      { label: 'D', value: 'D', text: 'High Priest' },
    ],
    correctAnswer: 'B',
    explanation: 'Mansa means "Emperor" in the Mande language, a title used by the supreme rulers of the Mali Empire, most famously Mansa Musa.',
  },

  {
    id: 'africa-17',
    type: 'select-all',
    question: 'Which areas did Sundiata conquer during his rule? Select all that apply.',
    options: [
      { label: 'A', value: 'A', text: 'Ghana' },
      { label: 'B', value: 'B', text: 'Kumbi' },
      { label: 'C', value: 'C', text: 'Walata' },
      { label: 'D', value: 'D', text: 'Timbuktu' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    explanation: 'Sundiata expanded Mali by conquering Ghana, Kumbi (Ghana\'s former capital), and Walata, dramatically increasing Mali\'s territory and control over trade routes.',
  },

  {
    id: 'africa-18',
    type: 'multiple-choice',
    question: 'What was the capital of Mali during Sundiata\'s rule?',
    options: [
      { label: 'A', value: 'A', text: 'Timbuktu' },
      { label: 'B', value: 'B', text: 'Niani' },
      { label: 'C', value: 'C', text: 'Kumbi' },
      { label: 'D', value: 'D', text: 'Gao' },
    ],
    correctAnswer: 'B',
    explanation: 'Niani served as Mali\'s capital under Sundiata and was a central hub for the empire\'s trade and administration.',
  },

  {
    id: 'africa-19',
    type: 'multiple-choice',
    question: 'Why was Niani important to the Mali Empire?',
    options: [
      { label: 'A', value: 'A', text: 'It was the site of Mali\'s most important gold mines' },
      { label: 'B', value: 'B', text: 'It was an important center of trade and commerce' },
      { label: 'C', value: 'C', text: 'It was a major port city on the Niger River' },
      { label: 'D', value: 'D', text: 'It was the location of Mali\'s greatest mosque' },
    ],
    correctAnswer: 'B',
    explanation: 'Niani\'s importance came from its role as a commercial capital — a hub where merchants, goods, and wealth converged, sustaining the empire\'s economic power.',
  },

  {
    id: 'africa-20',
    type: 'multiple-choice',
    question: 'Who was Mansa Musa?',
    options: [
      { label: 'A', value: 'A', text: 'The founder of the Mali Empire' },
      { label: 'B', value: 'B', text: 'A later ruler of Mali, possibly Sundiata\'s grandnephew, who expanded the empire' },
      { label: 'C', value: 'C', text: 'A Songhai ruler who conquered Mali' },
      { label: 'D', value: 'D', text: 'A Muslim scholar and governor of Timbuktu' },
    ],
    correctAnswer: 'B',
    explanation: 'Mansa Musa is believed to have been Sundiata\'s grandnephew. He became one of the most celebrated rulers in West African history, known for his enormous wealth and his famous pilgrimage to Mecca.',
  },

  {
    id: 'africa-21',
    type: 'free-response',
    question: 'What did Mansa Musa do to strengthen and organize the Mali Empire?',
    correctAnswer: 'He expanded the empire and divided it into provinces, appointing governors to manage each province.',
    explanation: 'Mansa Musa\'s administrative reforms — dividing Mali into provinces with appointed governors — created a more organized and stable government capable of managing a vast empire.',
  },

  {
    id: 'africa-22',
    type: 'multiple-choice',
    question: 'What role did the cities of Timbuktu and Gao play in the Mali and Songhai empires?',
    options: [
      { label: 'A', value: 'A', text: 'Military fortresses on the empire\'s northern border' },
      { label: 'B', value: 'B', text: 'Trading cities that served as centers of commerce' },
      { label: 'C', value: 'C', text: 'Religious capitals and centers of Islamic study only' },
      { label: 'D', value: 'D', text: 'Farming settlements that supplied food to the empire' },
    ],
    correctAnswer: 'B',
    explanation: 'Timbuktu and Gao were major trading cities. Timbuktu in particular also became one of the world\'s great centers of Islamic scholarship and learning.',
  },

  {
    id: 'africa-23',
    type: 'multiple-choice',
    question: 'Who was Ibn Battuta and what is his historical significance?',
    options: [
      { label: 'A', value: 'A', text: 'A Malian king who commissioned detailed maps of the empire' },
      { label: 'B', value: 'B', text: 'A traveler and historian who visited Timbuktu and recorded his observations' },
      { label: 'C', value: 'C', text: 'A Portuguese explorer who first described West Africa to Europeans' },
      { label: 'D', value: 'D', text: 'A Muslim general who conquered the Songhai Empire' },
    ],
    correctAnswer: 'B',
    explanation: 'Ibn Battuta was a renowned Moroccan traveler whose extensive writings provide invaluable primary source accounts of Mali, Timbuktu, and many other regions of the medieval world.',
  },

  {
    id: 'africa-24',
    type: 'multiple-choice',
    question: 'Who were the Songhai people?',
    options: [
      { label: 'A', value: 'A', text: 'A Berber tribe from North Africa that invaded Mali' },
      { label: 'B', value: 'B', text: 'People from the east who broke away from the declining Mali Empire and built their own empire' },
      { label: 'C', value: 'C', text: 'A group of Mande-speaking traders who founded a merchant republic' },
      { label: 'D', value: 'D', text: 'Portuguese-allied soldiers who helped overthrow Mali' },
    ],
    correctAnswer: 'B',
    explanation: 'As Mali weakened, the Songhai people — situated to the east — broke free and built their own empire that eventually surpassed Mali in size and power.',
  },

  {
    id: 'africa-25',
    type: 'multiple-choice',
    question: 'Who was Sunni Ali and what did he accomplish?',
    options: [
      { label: 'A', value: 'A', text: 'A devout Muslim ruler who spread Islam throughout the Songhai Empire' },
      { label: 'B', value: 'B', text: 'A military leader who expanded the Songhai Empire by capturing Timbuktu and Djenne' },
      { label: 'C', value: 'C', text: 'A Malian governor who rebelled against Mansa Musa' },
      { label: 'D', value: 'D', text: 'A Moroccan commander who used cannons to defeat the Songhai' },
    ],
    correctAnswer: 'B',
    explanation: 'Sunni Ali was a powerful military ruler who dramatically expanded Songhai by conquering key cities including Timbuktu and Djenne, giving Songhai control of major trade routes.',
  },

  {
    id: 'africa-26',
    type: 'multiple-choice',
    question: 'Who was Askia Muhammad and how did he come to power?',
    options: [
      { label: 'A', value: 'A', text: 'Sunni Ali\'s chosen heir who inherited the throne peacefully' },
      { label: 'B', value: 'B', text: 'A devout Muslim who overthrew Sunni Ali\'s son and took control of Songhai' },
      { label: 'C', value: 'C', text: 'A Moroccan general who was placed on the Songhai throne' },
      { label: 'D', value: 'D', text: 'A scholar from Timbuktu who was elected by the council of governors' },
    ],
    correctAnswer: 'B',
    explanation: 'Askia Muhammad was deeply devout and disapproved of Sunni Ali\'s loose relationship with Islam. He removed Sunni Ali\'s son from power and ruled as a committed Muslim leader.',
  },

  {
    id: 'africa-27',
    type: 'free-response',
    question: 'What reforms did Askia Muhammad make to strengthen the Songhai Empire?',
    correctAnswer: 'He improved the tax system and centralized the government by appointing ministers.',
    explanation: 'Askia Muhammad\'s administrative improvements gave Songhai a more stable and efficient government, allowing it to manage its vast territories more effectively than its predecessors.',
  },

  {
    id: 'africa-28',
    type: 'multiple-choice',
    question: 'How did the Songhai Empire ultimately fall?',
    options: [
      { label: 'A', value: 'A', text: 'An internal revolt by enslaved people destroyed the capital' },
      { label: 'B', value: 'B', text: 'Moroccan fighting forces armed with cannons defeated the Songhai military' },
      { label: 'C', value: 'C', text: 'A prolonged drought wiped out Songhai\'s agricultural base' },
      { label: 'D', value: 'D', text: 'Portuguese naval forces blockaded Songhai\'s trade routes' },
    ],
    correctAnswer: 'B',
    explanation: 'The Songhai Empire, despite its size and strength, was no match for Moroccan forces equipped with gunpowder weapons, particularly cannons — a technology advantage that proved decisive.',
  },

  {
    id: 'africa-29',
    type: 'multiple-choice',
    question: 'Who were the Hausa and where did they establish their civilization?',
    options: [
      { label: 'A', value: 'A', text: 'Forest dwellers who built a unified empire in Benin' },
      { label: 'B', value: 'B', text: 'A group of people who developed independent city-states in Nigeria' },
      { label: 'C', value: 'C', text: 'Nomadic traders who traveled between Timbuktu and the coast' },
      { label: 'D', value: 'D', text: 'A Mande-speaking group that founded the Songhai Empire' },
    ],
    correctAnswer: 'B',
    explanation: 'The Hausa developed a series of independent city-states across what is now northern Nigeria, each functioning as its own political and economic unit.',
  },

  {
    id: 'africa-30',
    type: 'multiple-choice',
    question: 'What did the Hausa cities of Kano and Katsina become?',
    options: [
      { label: 'A', value: 'A', text: 'Military fortresses defending Nigeria\'s border' },
      { label: 'B', value: 'B', text: 'Major trading states and commercial centers' },
      { label: 'C', value: 'C', text: 'Centers of Islamic scholarship and education' },
      { label: 'D', value: 'D', text: 'Agricultural communes that supplied food to the region' },
    ],
    correctAnswer: 'B',
    explanation: 'Kano and Katsina developed into thriving commercial hubs that connected trans-Saharan trade routes with the products of West and Central Africa.',
  },

  {
    id: 'africa-31',
    type: 'multiple-choice',
    question: 'What was the primary trade commodity of the Hausa city-state of Zazzau?',
    options: [
      { label: 'A', value: 'A', text: 'Gold' },
      { label: 'B', value: 'B', text: 'Salt' },
      { label: 'C', value: 'C', text: 'Enslaved people' },
      { label: 'D', value: 'D', text: 'Ivory' },
    ],
    correctAnswer: 'C',
    explanation: 'Zazzau (also called Zaria) was particularly known for its slave trade, supplying enslaved people to other Hausa city-states and to trans-Saharan traders.',
  },

  {
    id: 'africa-32',
    type: 'free-response',
    question: 'How did the Hausa city-states retain power, and what prevented them from becoming a larger unified empire?',
    correctAnswer: 'Each city-state maintained its own army, which kept it powerful, but the city-states frequently fought against each other, which prevented them from uniting into a single large empire.',
    explanation: 'The Hausa city-states exemplify how decentralized power can be both a strength and a weakness: individual armies protected each city, but inter-city rivalries consumed resources that might have built a larger empire.',
  },

  {
    id: 'africa-33',
    type: 'multiple-choice',
    question: 'Who were the Yoruba people?',
    options: [
      { label: 'A', value: 'A', text: 'Saharan nomads who traded gold along the Niger River' },
      { label: 'B', value: 'B', text: 'People who lived in small city-states in the forests of Benin and southwestern Nigeria' },
      { label: 'C', value: 'C', text: 'The ruling class of the Hausa city-states' },
      { label: 'D', value: 'D', text: 'Coastal traders who dominated the Niger River delta' },
    ],
    correctAnswer: 'B',
    explanation: 'The Yoruba inhabited the forest zones of what are now Benin and southwestern Nigeria, organizing themselves into small but culturally rich city-states.',
  },

  {
    id: 'africa-34',
    type: 'multiple-choice',
    question: 'How were Yoruba kings regarded by their people?',
    options: [
      { label: 'A', value: 'A', text: 'As elected representatives of the people' },
      { label: 'B', value: 'B', text: 'As divine figures who held both religious and political authority' },
      { label: 'C', value: 'C', text: 'As military commanders with no religious role' },
      { label: 'D', value: 'D', text: 'As ceremonial figures with no real political power' },
    ],
    correctAnswer: 'B',
    explanation: 'Yoruba kings were seen as divinely sanctioned leaders whose authority combined spiritual and political power, making their rule both religiously significant and politically absolute.',
  },

  {
    id: 'africa-35',
    type: 'multiple-choice',
    question: 'What were the two largest Yoruba kingdoms?',
    options: [
      { label: 'A', value: 'A', text: 'Kano and Katsina' },
      { label: 'B', value: 'B', text: 'Ife and Oyo' },
      { label: 'C', value: 'C', text: 'Niani and Timbuktu' },
      { label: 'D', value: 'D', text: 'Benin and Zazzau' },
    ],
    correctAnswer: 'B',
    explanation: 'Ife and Oyo were the most powerful Yoruba kingdoms. Ife was considered the spiritual homeland of the Yoruba, while Oyo became a major political and military power.',
  },

  {
    id: 'africa-36',
    type: 'multiple-choice',
    question: 'How did the Yoruba kingdoms of Ife and Oyo grow and expand?',
    options: [
      { label: 'A', value: 'A', text: 'Through military conquest of neighboring territories' },
      { label: 'B', value: 'B', text: 'Through surplus food production that supported larger populations' },
      { label: 'C', value: 'C', text: 'Through control of trans-Saharan trade routes' },
      { label: 'D', value: 'D', text: 'Through alliances with Arab and Persian merchants' },
    ],
    correctAnswer: 'B',
    explanation: 'Agricultural surplus is a foundational driver of civilization growth — more food means larger populations, which in turn means more labor, more soldiers, and more capacity for economic and cultural development.',
  },

  {
    id: 'africa-37',
    type: 'select-all',
    question: 'What artistic skills were the people of Ife especially known for? Select all that apply.',
    options: [
      { label: 'A', value: 'A', text: 'Making terracotta sculptures' },
      { label: 'B', value: 'B', text: 'Casting works in metal' },
      { label: 'C', value: 'C', text: 'Carving wood and ivory' },
      { label: 'D', value: 'D', text: 'Weaving silk textiles' },
    ],
    correctAnswers: ['A', 'B', 'C'],
    explanation: 'The Ife were renowned artists across multiple media — their terracotta and metal castings in particular are considered masterpieces of African art and are still celebrated by art historians today.',
  },

  {
    id: 'africa-38',
    type: 'free-response',
    question: 'How did the Kingdom of Benin come into power?',
    correctAnswer: 'Benin built a powerful army that allowed it to control territory from the Niger River delta to Lagos.',
    explanation: 'Military strength was the foundation of Benin\'s rise. Its organized army enabled territorial expansion across a strategically important region of West Africa.',
  },

  // ── KEY TERMS IDENTIFICATION ───────────────────────────────────────────────

  {
    id: 'africa-39',
    type: 'parts',
    question: 'Match each term to its correct description.',
    parts: [
      {
        label: 'a',
        type: 'multiple-choice',
        question: 'What was Ghana?',
        options: [
          { label: 'A', value: 'A', text: 'A kingdom founded by Mande-speaking people' },
          { label: 'B', value: 'B', text: 'An early West African kingdom built by the Soninke people' },
          { label: 'C', value: 'C', text: 'An empire created by the Songhai people' },
          { label: 'D', value: 'D', text: 'A collection of city-states in Nigeria' },
        ],
        correctAnswer: 'B',
        explanation: 'Ghana was one of the earliest and most powerful West African kingdoms, founded by the Soninke people and built on the gold-salt trade.',
      },
      {
        label: 'b',
        type: 'multiple-choice',
        question: 'What was Sundiata\'s role in West African history?',
        options: [
          { label: 'A', value: 'A', text: 'He was the first ruler of the Songhai Empire' },
          { label: 'B', value: 'B', text: 'He was the first great ruler of Mali' },
          { label: 'C', value: 'C', text: 'He was a Muslim geographer who documented Ghana\'s royal court' },
          { label: 'D', value: 'D', text: 'He was a Moroccan general who conquered the Songhai' },
        ],
        correctAnswer: 'B',
        explanation: 'Sundiata was Mali\'s founding ruler, remembered for crushing a tyrant and unifying the Mande-speaking people into a great empire.',
      },
      {
        label: 'c',
        type: 'multiple-choice',
        question: 'Which description best fits the Yoruba?',
        options: [
          { label: 'A', value: 'A', text: 'Saharan nomads who used camels' },
          { label: 'B', value: 'B', text: 'A coastal trading civilization on East Africa\'s shore' },
          { label: 'C', value: 'C', text: 'A forest people organized into small city-states in Benin and Nigeria' },
          { label: 'D', value: 'D', text: 'A group that broke off from the declining Mali Empire' },
        ],
        correctAnswer: 'C',
        explanation: 'The Yoruba lived in forest city-states in what are now Benin and southwestern Nigeria, and were known for their art and divine kingship.',
      },
      {
        label: 'd',
        type: 'multiple-choice',
        question: 'What best describes the Kingdom of Benin?',
        options: [
          { label: 'A', value: 'A', text: 'A desert trade empire founded by Berber nomads' },
          { label: 'B', value: 'B', text: 'A kingdom that ruled from the Niger River delta to Lagos using a powerful army' },
          { label: 'C', value: 'C', text: 'A kingdom founded by the Soninke people near Senegal' },
          { label: 'D', value: 'D', text: 'A collection of city-states united by a common language' },
        ],
        correctAnswer: 'B',
        explanation: 'Benin rose through military power, carving out a kingdom stretching from the Niger River delta to Lagos.',
      },
    ],
  },

  // ── REVIEW QUESTIONS (from notes) ─────────────────────────────────────────

  {
    id: 'africa-40',
    type: 'free-response',
    question: 'What are some similarities between the Mali and Songhai Empires?',
    correctAnswer: 'Both Mali and Songhai rose to power through trade and strong rulers who expanded their territories.',
    explanation: 'Despite being separate empires, Mali and Songhai followed a similar blueprint: control of trade routes (especially gold) combined with capable military and political leadership drove both empires to greatness.',
  },

  {
    id: 'africa-41',
    type: 'free-response',
    question: 'How did Ghana\'s gold-salt trade work?',
    correctAnswer: 'Ghana acted as a broker between the goldfields of the south and the salt mines of the Sahara. People in the south had gold but needed salt; people in the north had salt but needed gold. Ghana taxed the trade flowing through its territory.',
    explanation: 'The gold-salt trade worked because of geographic complementarity — each region had what the other lacked. Ghana\'s power came from sitting at the crossroads and taxing every transaction.',
  },

  {
    id: 'africa-42',
    type: 'free-response',
    question: 'How did Sunni Ali build the Songhai Empire?',
    correctAnswer: 'He conquered nearby cities such as Timbuktu and Djenne to control key trade routes, systematically expanding Songhai\'s territory and wealth.',
    explanation: 'Sunni Ali\'s strategy was military and economic: capture the most valuable trading cities first, then use that wealth and position to project power further.',
  },

  {
    id: 'africa-43',
    type: 'multiple-choice',
    question: 'What form of government was typical for Hausa city-states?',
    options: [
      { label: 'A', value: 'A', text: 'A democracy where citizens voted for leaders' },
      { label: 'B', value: 'B', text: 'A feudal system where each city-state maintained its own army and ruler' },
      { label: 'C', value: 'C', text: 'A theocracy where Muslim scholars held all power' },
      { label: 'D', value: 'D', text: 'A republic governed by a council of merchants' },
    ],
    correctAnswer: 'B',
    explanation: 'Hausa city-states operated like a feudal system — each was independently ruled with its own army, preventing unification but maintaining local authority.',
  },

  {
    id: 'africa-44',
    type: 'free-response',
    question: 'Which group — the Yoruba or the people of Benin — had more cultural influence on the other, and why?',
    correctAnswer: 'The Yoruba had more influence on Benin because the Yoruba originally established the city-state tradition in the region, and Benin\'s culture grew out of that Yoruba foundation.',
    explanation: 'The Kingdom of Benin traces its cultural and political roots back to Yoruba civilization, making the Yoruba the originating influence on what Benin became.',
  },

  {
    id: 'africa-45',
    type: 'free-response',
    question: 'What are some similarities between the Hausa city-states and other city-state systems you have studied?',
    correctAnswer: 'Like other city-state systems, the Hausa city-states were independent, grew quickly through trade, and were shaped by strong local rulers. They also shared the tendency of city-states to compete with each other rather than unify.',
    explanation: 'City-state systems across history — from ancient Greece to the Hausa — share common patterns: independence, trade-driven growth, and inter-city competition that limits broader unification.',
  },

  {
    id: 'africa-46',
    type: 'parts',
    question: 'Compare Sundiata and Mansa Musa as rulers of the Mali Empire.',
    parts: [
      {
        label: 'a',
        type: 'free-response',
        question: 'What did Sundiata and Mansa Musa have in common as rulers?',
        correctAnswer: 'Both ruled through conquest, expanded Mali\'s territory, and strengthened the empire\'s control over trade routes and culture.',
        explanation: 'Despite living generations apart, both rulers followed a pattern of military expansion combined with cultural and economic development.',
      },
      {
        label: 'b',
        type: 'free-response',
        question: 'What was one key difference in how Sundiata and Mansa Musa each contributed to Mali?',
        correctAnswer: 'Sundiata founded and unified the empire through conquest, while Mansa Musa focused on administration — dividing the empire into provinces and appointing governors — as well as projecting Mali\'s wealth and Islam globally through his pilgrimage to Mecca.',
        explanation: 'Founders and administrators play different roles: Sundiata was a builder of empire by force, while Mansa Musa refined and expanded that empire through governance and diplomatic prestige.',
      },
    ],
  },

  // ── CONCEPTUAL QUESTIONS (30% additional) ─────────────────────────────────

  {
    id: 'africa-47',
    type: 'multiple-choice',
    question: 'Why did the introduction of camels — rather than just any pack animal — specifically unlock trans-Saharan trade?',
    options: [
      { label: 'A', value: 'A', text: 'Camels were faster than horses across open desert' },
      { label: 'B', value: 'B', text: 'Camels could carry heavy loads over great distances while surviving on minimal water' },
      { label: 'C', value: 'C', text: 'Camels were sacred animals that safe-guarded merchants from attack' },
      { label: 'D', value: 'D', text: 'Camels were the only animal that could survive Saharan nights' },
    ],
    correctAnswer: 'B',
    explanation: 'The Sahara\'s challenge is not just heat but the scarcity of water and food over enormous distances. Camels\' physiology — fat-storing humps, efficient water retention — made them uniquely suited to this environment.',
  },

  {
    id: 'africa-48',
    type: 'free-response',
    question: 'The gold-salt trade made Ghana wealthy, but how did Ghana\'s kings ensure they captured revenue from that wealth rather than simply allowing merchants to trade freely?',
    correctAnswer: 'Ghana\'s kings taxed trade passing through their territory and demanded tribute from merchants and nearby rulers, turning geographic position into consistent tax revenue.',
    explanation: 'Controlling a chokepoint is only profitable if you can tax it. Ghana\'s kings institutionalized taxation and tribute, creating a government-funded empire rather than relying on direct production of gold or salt.',
  },

  {
    id: 'africa-49',
    type: 'multiple-choice',
    question: 'Al-Bakri never visited Ghana himself, yet his account is a major historical source. What does this suggest about how knowledge spread in the medieval world?',
    options: [
      { label: 'A', value: 'A', text: 'Medieval scholars often invented places they wrote about' },
      { label: 'B', value: 'B', text: 'Trade networks also carried information; merchants and travelers described places to scholars who recorded them' },
      { label: 'C', value: 'C', text: 'Al-Bakri must have secretly visited Ghana under a false name' },
      { label: 'D', value: 'D', text: 'Arabic geographers only wrote about places within the Islamic world' },
    ],
    correctAnswer: 'B',
    explanation: 'The same trade networks that moved gold and salt also moved information. Al-Bakri gathered his account from merchants, travelers, and diplomats — showing that knowledge, like goods, followed the trade routes.',
  },

  {
    id: 'africa-50',
    type: 'free-response',
    question: 'Why might a ruler like Sundiata — who came to power by overthrowing a tyrant — have been especially effective at building loyalty and a stable empire?',
    correctAnswer: 'A ruler who liberates people from an oppressor earns genuine loyalty rather than just obedience through fear. Sundiata could claim both military strength and popular support, a powerful combination for empire-building.',
    explanation: 'Political legitimacy matters in empire-building. Conquerors who are also seen as liberators enjoy a strong base of popular support that makes their rule more stable than that of rulers seen purely as aggressors.',
  },

  {
    id: 'africa-51',
    type: 'multiple-choice',
    question: 'Mansa Musa divided his empire into provinces with appointed governors. Why is this form of administration important for maintaining a large empire?',
    options: [
      { label: 'A', value: 'A', text: 'It allowed the emperor to personally visit every region more easily' },
      { label: 'B', value: 'B', text: 'It created local authority figures who could manage distant regions, keeping order without requiring the emperor to be everywhere at once' },
      { label: 'C', value: 'C', text: 'It prevented provinces from developing their own military forces' },
      { label: 'D', value: 'D', text: 'It ensured all tax revenue went directly to the emperor without local interference' },
    ],
    correctAnswer: 'B',
    explanation: 'A single ruler cannot personally govern a vast empire. Provincial governors act as delegated authority — the emperor\'s agents — allowing central control to extend over territories that would otherwise be ungovernable.',
  },

  {
    id: 'africa-52',
    type: 'free-response',
    question: 'Animism was the traditional religion of many West Africans before Islam arrived. How might the coexistence of Animism and Islam reflect the gradual nature of religious change through trade?',
    correctAnswer: 'When religion spreads through trade rather than conquest, conversion is voluntary and gradual. Many people blended Islamic practices with existing Animist traditions rather than completely replacing one with the other, resulting in a mixed religious culture.',
    explanation: 'This religious blending (syncretism) is common when cultures mix through peaceful contact. The lack of forced conversion meant West African Islam often incorporated local spiritual beliefs.',
  },

  {
    id: 'africa-53',
    type: 'multiple-choice',
    question: 'The Songhai Empire fell to Moroccan forces using cannons. What broader historical lesson does this illustrate?',
    options: [
      { label: 'A', value: 'A', text: 'Large empires always collapse due to internal rebellions' },
      { label: 'B', value: 'B', text: 'Technological advantages in warfare can overcome even large, well-organized empires' },
      { label: 'C', value: 'C', text: 'Islam weakened Songhai\'s military effectiveness' },
      { label: 'D', value: 'D', text: 'Empires near deserts are always vulnerable to northern invasion' },
    ],
    correctAnswer: 'B',
    explanation: 'The Moroccan cannons represent the decisive role of military technology in history. Songhai\'s traditional warriors had no effective counter to gunpowder weapons, regardless of their numbers or organization.',
  },

  {
    id: 'africa-54',
    type: 'free-response',
    question: 'The Hausa city-states each had their own armies and frequently fought each other. How does this pattern compare to what you know about other city-state systems, and what does it suggest about the tradeoff between independence and unity?',
    correctAnswer: 'Like ancient Greek city-states or Italian Renaissance city-states, Hausa cities gained local strength and autonomy through individual armies but sacrificed the collective strength that unity would have provided. Independence protected each city but made all of them collectively weaker against outside threats.',
    explanation: 'City-state systems across history face the same structural dilemma: autonomy creates competition and conflict internally, while unity would create greater power but requires surrendering independence.',
  },

  {
    id: 'africa-55',
    type: 'multiple-choice',
    question: 'The Ife were known as gifted artists who worked in terracotta, metal casting, and carved ivory and wood. What might the existence of such sophisticated art suggest about Ife\'s society?',
    options: [
      { label: 'A', value: 'A', text: 'Ife was primarily a military society with no time for trade' },
      { label: 'B', value: 'B', text: 'Ife had enough wealth and food surplus to support specialized artisans who did not farm' },
      { label: 'C', value: 'C', text: 'Art was a requirement for all citizens regardless of occupation' },
      { label: 'D', value: 'D', text: 'Ife imported its art from Arab merchants' },
    ],
    correctAnswer: 'B',
    explanation: 'Complex art traditions require specialization — people dedicated to art rather than subsistence farming. That specialization is only possible when a society produces enough food surplus to free some people from agricultural labor.',
  },

  {
    id: 'africa-56',
    type: 'parts',
    question: 'Consider how geography shaped the rise of different West African kingdoms.',
    parts: [
      {
        label: 'a',
        type: 'free-response',
        question: 'How did Ghana\'s geographic position between the goldfields and the Sahara allow it to become powerful?',
        correctAnswer: 'Ghana sat between the gold-producing south and the salt-producing Sahara, making it the natural broker and tax collector for trade between the two regions.',
        explanation: 'Geographic intermediary positions are economically powerful. Whoever sits between supply and demand can extract tolls from both sides.',
      },
      {
        label: 'b',
        type: 'free-response',
        question: 'How did Timbuktu\'s location on major trade routes help it become both a commercial and intellectual center?',
        correctAnswer: 'Trade routes brought not only goods but also scholars, books, and ideas. Timbuktu\'s commercial wealth funded mosques and schools, while the constant flow of travelers from across the Islamic world made it a hub of learning.',
        explanation: 'Wealth from trade creates the conditions for cultural and intellectual development — surplus resources can fund education, architecture, and scholarship that transcends mere commerce.',
      },
    ],
  },

  {
    id: 'africa-57',
    type: 'free-response',
    question: 'Askia Muhammad replaced Sunni Ali\'s son partly because he felt the previous rulers were not devout enough Muslims. What does this tell us about the role Islam played in legitimizing political power in the Songhai Empire?',
    correctAnswer: 'It shows that Islamic piety had become an expected quality of legitimate rulers. Being seen as a good Muslim was not just personal faith — it was a political qualification that could justify overthrowing a ruler and claiming authority.',
    explanation: 'In societies where religion and government are intertwined, religious legitimacy becomes a tool of political power. Askia Muhammad used Sunni Ali\'s alleged irreligiosity as justification for seizing the throne.',
  },

  {
    id: 'africa-58',
    type: 'multiple-choice',
    question: 'Looking across Ghana, Mali, and Songhai, which factor was most consistently responsible for the rise AND fall of each empire?',
    options: [
      { label: 'A', value: 'A', text: 'Military conquest alone' },
      { label: 'B', value: 'B', text: 'Control of trade routes — gaining it brought power, losing it brought decline' },
      { label: 'C', value: 'C', text: 'The personal religious devotion of each ruler' },
      { label: 'D', value: 'D', text: 'Alliances with North African Berber tribes' },
    ],
    correctAnswer: 'B',
    explanation: 'Across all three empires, power was fundamentally tied to trade route control. Ghana fell when its trade dominance was broken; Mali rose by inheriting those routes and fell when it lost them; Songhai\'s growth came from capturing Timbuktu and Djenne. Trade control was the common thread.',
  },

  {
    id: 'africa-59',
    type: 'free-response',
    question: 'The Yoruba kings were considered divine. How might divine kingship serve as a political tool for maintaining order and authority in a pre-modern society?',
    correctAnswer: 'If a king is believed to be sacred or chosen by the gods, challenging or overthrowing him becomes not just a political act but a religious transgression. This creates powerful social pressure to obey the ruler and accept their decisions without question.',
    explanation: 'Divine kingship is a political technology: it adds a layer of supernatural authority to political power, making rebellion psychologically and socially much more costly for potential challengers.',
  },
  {
    id: 'africa-60',
    type: 'multiple-choice',
    question: 'How did the Swahili language develop?',
    options: [
      { label: 'A', value: 'A', text: 'As a combination of Arabic and Bantu' },
      { label: 'B', value: 'B', text: 'As a combination of Portuguese and Bantu' },
      { label: 'C', value: 'C', text: 'As a combination of Persian and Arabic' },
      { label: 'D', value: 'D', text: 'As a purely indigenous African dialect' },
    ],
    correctAnswer: 'A',
    explanation: 'Swahili developed as a blend of Arabic and Bantu, reflecting centuries of trade contact between Arab merchants and East African coastal communities.',
  },
 
  {
    id: 'africa-61',
    type: 'multiple-choice',
    question: 'How was Islam introduced to East Africa?',
    options: [
      { label: 'A', value: 'A', text: 'Through Portuguese missionaries' },
      { label: 'B', value: 'B', text: 'Through Muslim traders' },
      { label: 'C', value: 'C', text: 'Through conquering Arab armies' },
      { label: 'D', value: 'D', text: 'Through Indian pilgrims' },
    ],
    correctAnswer: 'B',
    explanation: 'Muslim traders who frequented East African ports gradually introduced Islam to the region through commerce and cultural exchange rather than conquest.',
  },
 
  {
    id: 'africa-62',
    type: 'free-response',
    question: 'How did the people of Great Zimbabwe positively interact with their environment?',
    correctAnswer: 'They used the fertile land to farm and raise cattle, and leveraged nearby trade routes to grow in power.',
    explanation: 'The Shona people of Great Zimbabwe took advantage of fertile agricultural land and strategic trade routes, particularly linking goldfields to coastal cities, to build a prosperous civilization.',
  },
 
  {
    id: 'africa-63',
    type: 'multiple-choice',
    question: 'What key similarity existed between the Portuguese who arrived in East Africa and the rulers of the Mutapa Empire?',
    options: [
      { label: 'A', value: 'A', text: 'Both were primarily interested in spreading Christianity' },
      { label: 'B', value: 'B', text: 'Both were conquerors seeking to expand their power' },
      { label: 'C', value: 'C', text: 'Both relied on monsoon winds for travel' },
      { label: 'D', value: 'D', text: 'Both spoke the Swahili language' },
    ],
    correctAnswer: 'B',
    explanation: 'Although the Portuguese came from Europe, they shared a fundamental trait with the Mutapa rulers: both were conquerors trying to extend control over territories and resources.',
  },
 
  {
    id: 'africa-64',
    type: 'select-all',
    question: 'What were effects of East African trade on different cultural groups? Select all that apply.',
    options: [
      { label: 'A', value: 'A', text: 'Culture spread between groups' },
      { label: 'B', value: 'B', text: 'More religious mosques were built' },
      { label: 'C', value: 'C', text: 'The Swahili language disappeared' },
      { label: 'D', value: 'D', text: 'New languages developed to aid communication' },
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'East African trade enabled cultural diffusion, the growth of Islam (reflected in new mosques), and the emergence of languages like Swahili to bridge communication gaps.',
  },
 
  {
    id: 'africa-65',
    type: 'free-response',
    question: 'How does the Swahili language serve as an example of cultural interaction?',
    correctAnswer: 'Because Arabian traders were common visitors to East Africa, a new language blending Arabic and Bantu developed so traders could communicate more easily with local populations.',
    explanation: 'Language evolution is a direct marker of sustained cultural contact. Swahili\'s Arabic-Bantu roots reflect the long-term presence of Arab traders on the East African coast.',
  },
 
  {
    id: 'africa-66',
    type: 'multiple-choice',
    question: 'What two languages is the Swahili language composed of?',
    options: [
      { label: 'A', value: 'A', text: 'Persian and Bantu' },
      { label: 'B', value: 'B', text: 'Arabic and Bantu' },
      { label: 'C', value: 'C', text: 'Arabic and Portuguese' },
      { label: 'D', value: 'D', text: 'Hindi and Bantu' },
    ],
    correctAnswer: 'B',
    explanation: 'Swahili is a Bantu language with significant Arabic vocabulary and influence, born from centuries of Arab-African trading interactions along the coast.',
  },
 
  {
    id: 'africa-67',
    type: 'select-all',
    question: 'Which groups of traders moved in and out of East African ports? Select all that apply.',
    options: [
      { label: 'A', value: 'A', text: 'Indian traders' },
      { label: 'B', value: 'B', text: 'Persian traders' },
      { label: 'C', value: 'C', text: 'Arabic traders' },
      { label: 'D', value: 'D', text: 'African traders' },
    ],
    correctAnswers: ['A', 'B', 'C', 'D'],
    explanation: 'East African port cities were truly cosmopolitan hubs. Indian, Persian, Arabic, and African traders all participated in the vibrant coastal trade network.',
  },
 
  {
    id: 'africa-68',
    type: 'multiple-choice',
    question: 'How many trading cities existed along the East African coast from Mogadishu to Kilwa and Sofala?',
    options: [
      { label: 'A', value: 'A', text: '10' },
      { label: 'B', value: 'B', text: '20' },
      { label: 'C', value: 'C', text: '35' },
      { label: 'D', value: 'D', text: '50' },
    ],
    correctAnswer: 'C',
    explanation: 'Around 35 trading cities dotted the East African coast from Mogadishu in the north down to Kilwa and Sofala in the south, demonstrating the coast\'s economic vitality.',
  },
 
  {
    id: 'africa-69',
    type: 'multiple-choice',
    question: 'Which best describes Kilwa as a trading city?',
    options: [
      { label: 'A', value: 'A', text: 'It was a small, isolated fishing village' },
      { label: 'B', value: 'B', text: 'It was a wealthy and powerful commercial city' },
      { label: 'C', value: 'C', text: 'It was a city primarily known for agriculture' },
      { label: 'D', value: 'D', text: 'It was a city that never engaged in foreign trade' },
    ],
    correctAnswer: 'B',
    explanation: 'Kilwa was indeed a rich and influential coastal city, deriving its wealth from controlling key trade routes, especially gold from the interior.',
  },
 
  {
    id: 'africa-70',
    type: 'multiple-choice',
    question: 'How did Indian traders travel to East Africa and back?',
    options: [
      { label: 'A', value: 'A', text: 'Using ocean currents and rowing' },
      { label: 'B', value: 'B', text: 'Using monsoon winds and sails' },
      { label: 'C', value: 'C', text: 'Using overland camel caravans' },
      { label: 'D', value: 'D', text: 'Using steam-powered ships' },
    ],
    correctAnswer: 'B',
    explanation: 'Indian traders harnessed the predictable seasonal monsoon winds — blowing toward Africa in winter and back toward India in summer — to sail reliably across the Indian Ocean.',
  },
 
  {
    id: 'africa-72',
    type: 'multiple-choice',
    question: 'Why did Kilwa grow so wealthy?',
    options: [
      { label: 'A', value: 'A', text: 'It was the largest city in Africa' },
      { label: 'B', value: 'B', text: 'It was the furthest south a ship from India could sail in a single monsoon season' },
      { label: 'C', value: 'C', text: 'It had the largest army on the coast' },
      { label: 'D', value: 'D', text: 'It was located at the mouth of a major river' },
    ],
    correctAnswer: 'B',
    explanation: 'Kilwa\'s geographic position made it the natural terminus for Indian trade ships; they could reach it and return home within one monsoon cycle, making it a critical exchange hub.',
  },
 
  {
    id: 'africa-72',
    type: 'parts',
    question: 'Consider Kilwa\'s relationship with Sofala and its trade ambitions.',
    parts: [
      {
        label: 'a',
        type: 'free-response',
        question: 'What action did Kilwa take regarding the port of Sofala?',
        correctAnswer: 'Kilwa seized the port of Sofala.',
        explanation: 'Kilwa used military and economic power to take control of Sofala.',
      },
      {
        label: 'b',
        type: 'free-response',
        question: 'Why did Kilwa seize Sofala?',
        correctAnswer: 'To control the gold trade flowing through the region.',
        explanation: 'Sofala was the coastal outlet closest to the goldfields of the interior, so controlling it meant controlling the gold trade.',
      },
    ],
  },
 
  {
    id: 'africa-73',
    type: 'parts',
    question: 'Consider the Portuguese arrival on the East African coast.',
    parts: [
      {
        label: 'a',
        type: 'select-all',
        question: 'Which cities did the Portuguese take over? Select all that apply.',
        options: [
          { label: 'A', value: 'A', text: 'Sofala' },
          { label: 'B', value: 'B', text: 'Kilwa' },
          { label: 'C', value: 'C', text: 'Mombasa' },
          { label: 'D', value: 'D', text: 'Mogadishu' },
        ],
        correctAnswers: ['A', 'B', 'C'],
        explanation: 'The Portuguese targeted Sofala, Kilwa, and Mombasa — all wealthy coastal cities that could yield significant trade revenue.',
      },
      {
        label: 'b',
        type: 'free-response',
        question: 'Why did the Portuguese specifically target those cities?',
        correctAnswer: 'Because they were rich trading cities.',
        explanation: 'The Portuguese were motivated by wealth; they seized prosperous cities to extract resources and dominate Indian Ocean trade routes.',
      },
    ],
  },
 
  {
    id: 'africa-74',
    type: 'parts',
    question: 'Consider the East African slave trade before the 1700s.',
    parts: [
      {
        label: 'a',
        type: 'multiple-choice',
        question: 'Approximately how many Africans were enslaved and sent abroad before the 1700s?',
        options: [
          { label: 'A', value: 'A', text: 'Around 100' },
          { label: 'B', value: 'B', text: 'Around 1,000' },
          { label: 'C', value: 'C', text: 'Around 10,000' },
          { label: 'D', value: 'D', text: 'Around 100,000' },
        ],
        correctAnswer: 'B',
        explanation: 'Historical records indicate around 1,000 enslaved Africans were sent abroad before the 1700s from East Africa.',
      },
      {
        label: 'b',
        type: 'select-all',
        question: 'To which regions were enslaved Africans sent? Select all that apply.',
        options: [
          { label: 'A', value: 'A', text: 'China' },
          { label: 'B', value: 'B', text: 'Arabia' },
          { label: 'C', value: 'C', text: 'Persia' },
          { label: 'D', value: 'D', text: 'India' },
        ],
        correctAnswers: ['A', 'B', 'C', 'D'],
        explanation: 'Enslaved Africans were sent to China, Arabia, Persia, Iraq, and India, reflecting the wide reach of East African trade networks.',
      },
    ],
  },
 
  {
    id: 'africa-75',
    type: 'multiple-choice',
    question: 'What was Great Zimbabwe?',
    options: [
      { label: 'A', value: 'A', text: 'A Portuguese fortress on the East African coast' },
      { label: 'B', value: 'B', text: 'A city established by the Shona people' },
      { label: 'C', value: 'C', text: 'An Arab trading post near the goldfields' },
      { label: 'D', value: 'D', text: 'A religious temple built by the Mutapa Empire' },
    ],
    correctAnswer: 'B',
    explanation: 'Great Zimbabwe was a major city founded and built by the Shona people of southern Africa, now located in modern-day Zimbabwe.',
  },
 
  {
    id: 'africa-76',
    type: 'select-all',
    question: 'What economic advantages did Great Zimbabwe hold? Select all that apply.',
    options: [
      { label: 'A', value: 'A', text: 'Located near an important trade route linking goldfields to Sofala' },
      { label: 'B', value: 'B', text: 'Controlled a major sea port directly' },
      { label: 'C', value: 'C', text: 'Took over smaller cities and demanded tribute payments' },
      { label: 'D', value: 'D', text: 'Had access to fertile farmland for agriculture' },
    ],
    correctAnswers: ['A', 'C', 'D'],
    explanation: 'Great Zimbabwe\'s wealth came from its proximity to key trade routes connecting goldfields to the coast, its political dominance over smaller cities, and productive agricultural land. It did not control a seaport directly.',
  },
 
  {
    id: 'africa-77',
    type: 'multiple-choice',
    question: 'How did historians and archaeologists prove that Great Zimbabwe was a real, significant civilization?',
    options: [
      { label: 'A', value: 'A', text: 'Through written Portuguese records' },
      { label: 'B', value: 'B', text: 'Through ancient ruins discovered at the site' },
      { label: 'C', value: 'C', text: 'Through Arab merchant diaries' },
      { label: 'D', value: 'D', text: 'Through oral traditions passed down by the Swahili' },
    ],
    correctAnswer: 'B',
    explanation: 'The discovery of ancient stone ruins at Great Zimbabwe provided physical archaeological evidence confirming the existence of a sophisticated Shona civilization.',
  },
 
  {
    id: 'africa-78',
    type: 'free-response',
    question: 'Who was Mutota and what motivated his expansion?',
    correctAnswer: 'Mutota was a leader who wanted to find a new source of salt and settled in a fertile valley, eventually building the Mutapa Empire.',
    explanation: 'The search for salt, a vital resource, drove Mutota\'s movement into new territory, and his settlement in a fertile valley provided the foundation for the Mutapa Empire.',
  },
 
  {
    id: 'africa-79',
    type: 'multiple-choice',
    question: 'What does the title "mwene mutapa" mean?',
    options: [
      { label: 'A', value: 'A', text: 'Peaceful farmer' },
      { label: 'B', value: 'B', text: 'Master pillager/conqueror' },
      { label: 'C', value: 'C', text: 'Lord of the coast' },
      { label: 'D', value: 'D', text: 'Keeper of gold' },
    ],
    correctAnswer: 'B',
    explanation: 'Mwene mutapa translates to "master pillager" or "conqueror," reflecting the militaristic and expansionist nature of Mutota\'s leadership.',
  },
 
  {
    id: 'africa-80',
    type: 'multiple-choice',
    question: 'Who was Mutota\'s son and successor?',
    options: [
      { label: 'A', value: 'A', text: 'Shona' },
      { label: 'B', value: 'B', text: 'Matope' },
      { label: 'C', value: 'C', text: 'Kilwa' },
      { label: 'D', value: 'D', text: 'Sofala' },
    ],
    correctAnswer: 'B',
    explanation: 'Matope was Mutota\'s son and continued his father\'s legacy of building and expanding the Mutapa Empire.',
  },
 
  {
    id: 'africa-81',
    type: 'free-response',
    question: 'How did Europeans ultimately gain control over the Mutapa Empire?',
    correctAnswer: 'They overthrew an existing ruler and replaced him with a ruler they could control.',
    explanation: 'Rather than direct military conquest alone, the Europeans used political manipulation — installing a puppet ruler — to exercise indirect but effective control over the Mutapa Empire.',
  },
 
  {
    id: 'africa-82',
    type: 'multiple-choice',
    question: 'Which port did Kilwa seize in order to dominate the gold trade?',
    options: [
      { label: 'A', value: 'A', text: 'Mombasa' },
      { label: 'B', value: 'B', text: 'Mogadishu' },
      { label: 'C', value: 'C', text: 'Sofala' },
      { label: 'D', value: 'D', text: 'Zanzibar' },
    ],
    correctAnswer: 'C',
    explanation: 'Sofala was the key port closest to the interior goldfields. By seizing it, Kilwa positioned itself as the dominant broker of gold moving from the interior to Indian Ocean traders.',
  },
 
  // ── CONCEPTUAL QUESTIONS (30% additional) ─────────────────────────────────
 
  {
    id: 'africa-83',
    type: 'free-response',
    question: 'Why were monsoon winds so critical to trade between India and East Africa, and what would have happened to that trade without them?',
    correctAnswer: 'Monsoon winds provided predictable, seasonal sailing routes across the Indian Ocean. Without them, ships would have had no reliable means of crossing the ocean and returning home in a single season, making regular trade impractical.',
    explanation: 'Pre-modern ocean trade depended entirely on natural wind patterns. The monsoons made the Indian Ocean a navigable highway rather than a barrier, enabling the entire East African trade network to flourish.',
  },
 
  {
    id: 'africa-84',
    type: 'multiple-choice',
    question: 'How did Kilwa\'s geographic position on the East African coast directly translate into economic power?',
    options: [
      { label: 'A', value: 'A', text: 'It was near the largest freshwater lake in Africa, supporting farming' },
      { label: 'B', value: 'B', text: 'It was the southernmost point reachable by Indian ships in one monsoon season, making it a natural trade terminus' },
      { label: 'C', value: 'C', text: 'It was the closest African city to the Arabian Peninsula' },
      { label: 'D', value: 'D', text: 'It had the deepest harbor on the coast, capable of holding more ships' },
    ],
    correctAnswer: 'B',
    explanation: 'Kilwa\'s wealth was rooted in its geography: Indian traders could reach it and return home within one monsoon cycle, so all trade goods passed through Kilwa, generating enormous tolls and revenue.',
  },
 
  {
    id: 'africa-85',
    type: 'free-response',
    question: 'What does the spread of Islam to East Africa through trade — rather than conquest — suggest about the relationship between commerce and religion in the medieval world?',
    correctAnswer: 'It suggests that trade networks served as powerful vehicles for cultural and religious diffusion, even without military force. Sustained contact between Muslim merchants and local populations gradually made Islam attractive or familiar to coastal East Africans.',
    explanation: 'Islam\'s peaceful spread along trade routes is a recurring historical pattern seen across the Indian Ocean world, contrasting sharply with forced religious conversion through warfare.',
  },
 
  {
    id: 'africa-86',
    type: 'multiple-choice',
    question: 'Great Zimbabwe grew powerful by controlling trade routes and extracting tribute from smaller cities. Which concept does this best illustrate?',
    options: [
      { label: 'A', value: 'A', text: 'Democratic governance' },
      { label: 'B', value: 'B', text: 'Economic isolationism' },
      { label: 'C', value: 'C', text: 'Empire-building through economic dominance' },
      { label: 'D', value: 'D', text: 'Egalitarian resource sharing' },
    ],
    correctAnswer: 'C',
    explanation: 'By positioning itself on key trade routes and forcing smaller states to pay tribute, Great Zimbabwe exemplifies how empires grow not just through military conquest but through controlling economic chokepoints.',
  },
 
  {
    id: 'africa-87',
    type: 'free-response',
    question: 'Why is language considered some of the strongest evidence of cultural exchange between two groups of people?',
    correctAnswer: 'Language absorbs vocabulary, grammar, and concepts from cultures in sustained contact. The formation of a hybrid language like Swahili shows that interaction between Arab traders and Bantu-speaking Africans was deep, long-lasting, and mutually influential — not just superficial.',
    explanation: 'Historians and linguists use language evolution as a direct record of cultural contact. A blended language cannot form without extended, meaningful interaction between populations.',
  },
 
  {
    id: 'africa-88',
    type: 'multiple-choice',
    question: 'The European strategy of overthrowing a Mutapa ruler and replacing him with a controllable one is an example of which broader colonial tactic?',
    options: [
      { label: 'A', value: 'A', text: 'Direct rule through military occupation' },
      { label: 'B', value: 'B', text: 'Indirect rule through a puppet government' },
      { label: 'C', value: 'C', text: 'Cultural assimilation through missionary work' },
      { label: 'D', value: 'D', text: 'Economic integration through free trade agreements' },
    ],
    correctAnswer: 'B',
    explanation: 'Installing a compliant leader while maintaining the appearance of local governance is a classic form of indirect colonial rule, allowing Europeans to control resources and policy without stationing large armies.',
  },
 
  {
    id: 'africa-89',
    type: 'parts',
    question: 'Evaluate the overall significance of East African coastal cities as centers of exchange.',
    parts: [
      {
        label: 'a',
        type: 'free-response',
        question: 'What types of exchange — beyond just goods — took place in cities like Kilwa and Mombasa?',
        correctAnswer: 'Cultural exchange (including spread of Islam and new languages like Swahili), religious exchange (construction of mosques), linguistic exchange, and the movement of people (including enslaved Africans).',
        explanation: 'Trade cities were intersections of civilizations where ideas, religions, languages, and peoples mixed alongside physical commodities.',
      },
      {
        label: 'b',
        type: 'free-response',
        question: 'Why did the wealth of these coastal cities ultimately make them targets for the Portuguese?',
        correctAnswer: 'The accumulated wealth from centuries of Indian Ocean trade made these cities highly valuable prizes. Controlling them gave the Portuguese access to gold, ivory, and other trade revenues, as well as strategic positions along the sea route to Asia.',
        explanation: 'The Portuguese arrived in the Indian Ocean seeking to break into — and then dominate — the existing trade network. The richest cities were the most strategically and economically valuable targets.',
      },
    ],
  },
];
