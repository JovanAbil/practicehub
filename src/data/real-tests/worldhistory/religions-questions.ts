//Stella
import { Question } from '@/types/quiz';

export const religionsQuestions: Question[] = [  
  {
    id: 'religions-1',
    type: 'free-response',
    question: 'What does Hajj mean',
    correctAnswer: 'Religious pilgrimage to Mecca',
    explanation: 'The Hajj is one of the Five Pillars of Islam — an obligation for Muslims who are physically and financially able to make the pilgrimage to Mecca at least once.'
  },
  {
    id: 'religions-2',
    type: 'free-response',
    question: 'What does Mosque mean',
    correctAnswer: 'Muslim house of worship',
    explanation: 'A mosque (masjid in Arabic) is the place where Muslims gather for communal prayer, learning, and community events.'
  },
  {
    id: 'religions-3',
    type: 'free-response',
    question: 'What does Apostles mean',
    correctAnswer: 'Name given to followers of Jesus',
    explanation: 'Apostles were early Christian leaders chosen by Jesus (the Twelve Apostles) who spread his teachings and helped found the church.'
  },
  {
    id: 'religions-4',
    type: 'free-response',
    question: 'What does Bedouin mean',
    correctAnswer: 'Arab, desert nomad',
    explanation: 'Bedouins are nomadic Arab peoples traditionally living in deserts across the Middle East, known for herding, tribal social structures, and oral traditions.'
  },
  {
    id: 'religions-5',
    type: 'free-response',
    question: 'What does Sharia mean',
    correctAnswer: 'Islamic law',
    explanation: 'Sharia refers to Islamic legal and ethical guidelines derived from the Quran and the Prophet Muhammad’s teachings (Sunna); it covers worship, personal conduct, and community rules.'
  },
  {
    id: 'religions-6',
    type: 'free-response',
    question: 'What does Nirvana mean',
    correctAnswer: 'Buddhism\'s form of enlightenment',
    explanation: 'Nirvana is the state in Buddhism where desire and suffering end; it is liberation from the cycle of rebirth (samsara) and the extinction of craving.'
  },
  {
    id: 'religions-7',
    type: 'free-response',
    question: 'What does Moksha mean',
    correctAnswer: 'Hinduism\'s perfect state of understanding',
    explanation: 'Moksha is the Hindu concept of liberation from the cycle of reincarnation (samsara), achieved through realization of the self\'s unity with Brahman.'
  },
  {
    id: 'religions-8',
    type: 'free-response',
    question: 'What does Karma mean',
    correctAnswer: 'What you do now affects what you do later',
    explanation: 'Karma denotes moral law of cause and effect: actions (good or bad) influence future outcomes, including rebirths, in Hinduism, Buddhism, and related traditions.'
  },
  {
    id: 'religions-9',
    type: 'free-response',
    question: 'What does Covenant mean',
    correctAnswer: 'The promise made between Abraham and God',
    explanation: 'In Judaism and Christianity a covenant is a sacred agreement — for example, God\'s promises to Abraham and his descendants that form a foundation for Israelite identity.'
  },
  {
    id: 'religions-10',
    type: 'free-response',
    question: 'What does Hijrah mean',
    correctAnswer: 'Escape/migration from Mecca to Medina',
    explanation: 'The Hijrah (622 CE) marks Muhammad\'s migration from Mecca to Medina and is the starting point of the Islamic calendar; it also signifies the formation of the early Muslim community.'
  },
  {
    id: 'religions-11',
    type: 'free-response',
    question: 'What does Sunna mean',
    correctAnswer: 'Customs and examples of the Prophet Muhammad',
    explanation: 'Sunna (Sunnah) are the recorded practices and sayings of Muhammad that, along with the Quran, guide Muslim belief and law.'
  },
  {
    id: 'religions-12',
    type: 'free-response',
    question: 'Who is Constantine',
    correctAnswer: 'Emperor who issued the Edict of Milan',
    explanation: 'Constantine I was a Roman emperor (early 4th century) who legalized Christianity with the Edict of Milan (313 CE) and whose reign greatly aided Christianity\'s growth.'
  },
  {
    id: 'religions-13',
    type: 'free-response',
    question: 'Who is Siddartha Gautama',
    correctAnswer: 'He gave up worldly possessions to seek answers (the Buddha)',
    explanation: 'Siddhartha Gautama was a prince who became the Buddha after renouncing his life, meditating, and teaching the path to end suffering.'
  },
  {
    id: 'religions-14',
    type: 'free-response',
    question: 'What does Caste mean',
    correctAnswer: 'Social class system within Hinduism',
    explanation: 'The caste system is a traditional, hereditary social hierarchy in South Asia (varnas and jati) that historically structured occupation and social status.'
  },
  {
    id: 'religions-15',
    type: 'free-response',
    question: 'Who is Brahman',
    correctAnswer: 'The universal spirit in Hinduism',
    explanation: 'Brahman is the ultimate, unchanging reality or world spirit in Hindu thought, distinct from individual souls (atman) but also related to them.'
  },
  {
    id: 'religions-16',
    type: 'multiple-choice',
    question: 'The Indo-European Aryans were a group of nomadic people who were eventually enslaved in South Asia and their descendants became part of the lower castes.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'While the Aryans migrated into South Asia, the historical relationship between them and the caste system is complex; it is incorrect to state they were enslaved and became lower castes.'
  },
  {
    id: 'religions-17',
    type: 'multiple-choice',
    question: 'The Kaaba was a shrine in Mecca that initially housed the spirits of many gods before Muhammad was born',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'Before Islam, the Kaaba was a central shrine in Mecca with many idols; Muhammad later cleansed it of idols and re-dedicated it to monotheistic worship.'
  },
  {
    id: 'religions-18',
    type: 'multiple-choice',
    question: 'Written in Arabic, the Christian Bible contains an Old and New Testament',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'The Christian Bible was originally written mainly in Hebrew, Aramaic, and Greek; it is not originally an Arabic text, though Arabic translations exist.'
  },
  {
    id: 'religions-19',
    type: 'multiple-choice',
    question: 'The Vedic Age was the thousand-year period of time when Hinduism developed into a religion as well as a way of life',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'The Vedic Age (roughly 1500–500 BCE) saw the composition of the Vedas and the consolidation of ritual, social structures, and beliefs that shaped early Hindu tradition.'
  },
  {
    id: 'religions-20',
    type: 'multiple-choice',
    question: 'The term "Muslim" means submission to the will of Allah',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: '"Muslim" literally means "one who submits" (to God). The statement written as-is is awkward; the correct idea is that a Muslim submits to Allah.'
  },
  {
    id: 'religions-21',
    type: 'multiple-choice',
    question: 'Mecca was an oasis town that was both an economic center and religious center on the Arabian Peninsula',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'Mecca was a major trade hub and a pilgrimage center (home of the Kaaba), making it both economically and religiously significant.'
  },
  {
    id: 'religions-22',
    type: 'multiple-choice',
    question: 'Siddhartha was a Hindu prince who once persecuted Christians but later devoted his life to spreading Christianity after he had a vision of Jesus',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'Siddhartha Gautama (the Buddha) lived centuries before Christianity; he did not interact with Christians and instead founded Buddhism.'
  },
  {
    id: 'religions-23',
    type: 'multiple-choice',
    question: 'Muhammad was said to have heard the voice of the angel Gabriel while meditating in a cave outside the town of Medina',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'Muhammad received revelations from the angel Gabriel while meditating in the Cave of Hira near Mecca, not Medina.'
  },
  {
    id: 'religions-24',
    type: 'multiple-choice',
    question: 'Muslims, Jews, Christians can all trace their ancestry back to Abraham',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
      { label: 'C', value: 'C', text: 'Both A & B' },
      { label: 'D', value: 'D', text: 'None of the above' }
    ],
    correctAnswer: 'A',
    explanation: 'All three Abrahamic faiths consider Abraham (Ibrahim) an important patriarch: Judaism through Isaac, Christianity through Jewish roots, and Islam through Ishmael.'
  },
  {
    id: 'religions-25',
    type: 'multiple-choice',
    question: 'Over time, Buddhism gradually spread from India. It became popular in places like China and other parts of Asia',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'Buddhism spread along trade routes and through missionary activity to China, Southeast Asia, Tibet, and East Asia, adapting to local cultures.'
  },
  {
    id: 'religions-26',
    type: 'multiple-choice',
    question: 'Both moksha and nirvana depend on the eightfold path',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'The Eightfold Path is a Buddhist practice leading to nirvana; moksha in Hinduism is achieved through various paths (knowledge, devotion, duty), not strictly the Eightfold Path.'
  },
  {
    id: 'religions-27',
    type: 'multiple-choice',
    question: 'Jesus was Jewish and all Jews believed he was the messiah sent to act as a political, military and religious leader',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'Jesus was Jewish, but most Jews of his time (and today) did not accept him as the Messiah, and his role as described in Christian texts is spiritual rather than a political/military leader.'
  },
  {
    id: 'religions-28',
    type: 'multiple-choice',
    question: 'The Vedas are a collection of prayers, beliefs and rituals that the Aryans brought with them to South Asia',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'The Vedas are ancient hymns and ritual texts associated with the early Indo-Aryans and are foundational to Vedic religion and later Hinduism.'
  },
  {
    id: 'religions-29',
    type: 'multiple-choice',
    question: 'One of the great epics of India, the Upanishads, contains the famous Bhagavad Gita and discusses the main ideas of Christianity',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'The Upanishads are philosophical texts; the Bhagavad Gita is part of the epic Mahabharata, not the Upanishads, and none of these are about Christianity.'
  },
  {
    id: 'religions-30',
    type: 'multiple-choice',
    question: 'Over centuries, the Brahmins and Kshatriyas became the two top groups within the caste system.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'Traditional varna hierarchy places Brahmins (priests) and Kshatriyas (warriors/rulers) near the top of the social order in classical Hindu society.'
  },
  {
    id: 'religions-31',
    type: 'multiple-choice',
    question: 'Karma and Dharma play big roles in the Hindu idea of reincarnation',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'Karma (actions) affects future births and Dharma (duty/ethical conduct) guides proper behavior—both central to beliefs about rebirth in Hinduism.'
  },
  {
    id: 'religions-32',
    type: 'multiple-choice',
    question: 'The Quran refers to the first five books of the Hebrew Bible',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'B',
    explanation: 'The Quran mentions many figures also in the Hebrew Bible and sometimes references earlier scriptures, but it is not itself a reference to the Torah as "the first five books" in the same way.'
  },
  {
    id: 'religions-33',
    type: 'multiple-choice',
    question: 'The Kingdom of Israel eventually split into the northern kingdom of Israel and the southern kingdom of Judah',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'After Solomon\'s reign, the united monarchy divided into Israel (north) and Judah (south), each with its own rulers and history.'
  },
  {
    id: 'religions-34',
    type: 'multiple-choice',
    question: 'Even though Jews and Christians differ on their beliefs of who the Messiah was, they both believe in the same God',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'Both traditions are monotheistic and trace worship to the God of Abraham, though they interpret God\'s nature and the role of the Messiah differently.'
  },
  {
    id: 'religions-35',
    type: 'multiple-choice',
    question: 'Christians believe that Jesus was crucified, died, and was resurrected',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'The death and resurrection of Jesus are central Christian beliefs, seen as the basis for salvation.'
  },
  {
    id: 'religions-36',
    type: 'multiple-choice',
    question: 'Which events in Judaism are in the correct chronological order',
    options: [
      { label: 'A', value: 'A', text: 'Abraham\'s move to Canaan; Moses received the 10 Commandments; enslavement in Egypt' },
      { label: 'B', value: 'B', text: 'Moses received the 10 Commandments; enslavement in Egypt; Abraham\'s move to Canaan' },
      { label: 'C', value: 'C', text: 'Abraham\'s move to Canaan; move to Egypt; enslavement in Egypt; Moses received the 10 Commandments' },
      { label: 'D', value: 'D', text: 'Enslavement in Egypt; Moses received 10 commandments; Abraham\'s move to Canaan' }
    ],
    correctAnswer: 'C',
    explanation: 'Traditional chronology places Abraham\'s settlement in Canaan, later descendants moving to Egypt and becoming enslaved, and then Moses leading the Exodus and receiving the Ten Commandments.'
  },
  {
    id: 'religions-37',
    type: 'multiple-choice',
    question: 'From the South Asian timeline we constructed, which are in the correct order',
    options: [
      { label: 'A', value: 'A', text: 'Siddhartha born, Aryans arrive in S. Asia, Upanishads written, Vedic Age' },
      { label: 'B', value: 'B', text: 'Vedic Age, Siddhartha born, Upanishads written, Aryans arrive in S. Asia' },
      { label: 'C', value: 'C', text: 'Aryans arrive in S. Asia, Upanishads written, Siddhartha born, Vedic Age' },
      { label: 'D', value: 'D', text: 'Aryans arrive in S. Asia, Vedic Age, Upanishads written, Siddhartha born' }
    ],
    correctAnswer: 'D',
    explanation: 'Historians typically place Aryan migrations first, leading into the Vedic Age during which Vedic texts were composed, followed by later Upanishadic development and Siddhartha\'s life.'
  },
  {
    id: 'religions-38',
    type: 'multiple-choice',
    question: 'All of the following are the Buddhist Noble Truths EXCEPT',
    options: [
      { label: 'A', value: 'A', text: 'Life is full of suffering' },
      { label: 'B', value: 'B', text: 'Suffering is caused by desire' },
      { label: 'C', value: 'C', text: 'follow the Eight Fold Path' },
      { label: 'D', value: 'D', text: 'A major test from a simple minded teacher is suffering' }
    ],
    correctAnswer: 'D',
    explanation: 'The Four Noble Truths state that life has suffering, suffering is caused by desire, suffering can end, and the Eightfold Path is the way to end it; option D is unrelated.'
  },
  {
    id: 'religions-39',
    type: 'multiple-choice',
    question: 'Abraham was said to have come from this area',
    options: [
      { label: 'A', value: 'A', text: 'Arabia' },
      { label: 'B', value: 'B', text: 'Rome' },
      { label: 'C', value: 'C', text: 'Mesopotamia' },
      { label: 'D', value: 'D', text: 'Canaan' }
    ],
    correctAnswer: 'C',
    explanation: 'Biblical tradition locates Abraham\'s origins in Mesopotamia (Ur) before he traveled to Canaan.'
  },
  {
    id: 'religions-40',
    type: 'multiple-choice',
    question: 'After the kingdom of Israel split apart, which best describes what happened to the Hebrew people during the next several centuries',
    options: [
      { label: 'A', value: 'A', text: 'they were swept up in a wave of invasions' },
      { label: 'B', value: 'B', text: 'they continued to live in peace' },
      { label: 'C', value: 'C', text: 'they created a new kingdom of Israel' },
      { label: 'D', value: 'D', text: 'they stopped worshipping the God of Abraham' }
    ],
    correctAnswer: 'A',
    explanation: 'After the split, both kingdoms faced invasions, conquests, and exile over centuries, affecting population, culture, and political structures.'
  },
  {
    id: 'religions-41',
    type: 'multiple-choice',
    question: 'Arguably, who do some historians say had the most influence on the spread of Christianity in the Eastern Mediterranean',
    options: [
      { label: 'A', value: 'A', text: 'Jesus' },
      { label: 'B', value: 'B', text: 'Paul' },
      { label: 'C', value: 'C', text: 'Constantine' },
      { label: 'D', value: 'D', text: 'The Pope' }
    ],
    correctAnswer: 'B',
    explanation: 'Paul\'s missionary journeys, letters, and theological framing were key to establishing Christian communities across the Eastern Mediterranean.'
  },
  {
    id: 'religions-42',
    type: 'multiple-choice',
    question: 'Which of the following is NOT an example of what Jesus did or taught',
    options: [
      { label: 'A', value: 'A', text: 'The Four Noble Truths' },
      { label: 'B', value: 'B', text: 'a personal relationship with God' },
      { label: 'C', value: 'C', text: 'good works & miracles' },
      { label: 'D', value: 'D', text: 'an eternal kingdom' }
    ],
    correctAnswer: 'A',
    explanation: 'The Four Noble Truths are central to Buddhism, not Christian teachings of Jesus.'
  },
  {
    id: 'religions-43',
    type: 'multiple-choice',
    question: 'Romans persecuted Jews & Christians because they',
    options: [
      { label: 'A', value: 'A', text: 'threatened rebellion' },
      { label: 'B', value: 'B', text: 'failed to honor the emperor as a god' },
      { label: 'C', value: 'C', text: 'failed to worship Roman gods' },
      { label: 'D', value: 'D', text: 'All of the options' }
    ],
    correctAnswer: 'C',
    explanation: 'Romans often viewed refusal to participate in imperial cults and traditional religious practices as subversive; Jews and early Christians\' exclusive monotheism clashed with Roman religious expectations.'
  },
  {
    id: 'religions-44',
    type: 'multiple-choice',
    question: 'Choose the correct order of the Kingdom of Israel\'s 3 kings',
    options: [
      { label: 'A', value: 'A', text: 'David, Solomon, Saul' },
      { label: 'B', value: 'B', text: 'Solomon, David, Saul' },
      { label: 'C', value: 'C', text: 'Saul, David, Solomon' },
      { label: 'D', value: 'D', text: 'Solomon, Saul, David' }
    ],
    correctAnswer: 'C',
    explanation: 'The biblical order of the first three kings is Saul (first), then David, and then Solomon.'
  },
  {
    id: 'religions-45',
    type: 'multiple-choice',
    question: 'Which is NOT one of the 5 pillars of Islam',
    options: [
      { label: 'A', value: 'A', text: 'Fasting' },
      { label: 'B', value: 'B', text: 'Prayer' },
      { label: 'C', value: 'C', text: 'the Hajj' },
      { label: 'D', value: 'D', text: 'the Quran' }
    ],
    correctAnswer: 'D',
    explanation: 'The Five Pillars are Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage); the Quran is the holy book, not a pillar.'
  },
  {
    id: 'religions-46',
    type: 'multiple-choice',
    question: 'The Quran is sacred in Islam. Which of the following is true about the languages in which it was written and worshipped',
    options: [
      { label: 'A', value: 'A', text: 'Arabic became the languages of Muslim worshippers and scholars' },
      { label: 'B', value: 'B', text: 'Hebrew became the languages of Muslim worshippers and scholars' },
      { label: 'C', value: 'C', text: 'Latin became the languages of Muslim worshippers and scholars' },
      { label: 'D', value: 'D', text: 'Greek became the languages of Muslim worshippers and scholars' }
    ],
    correctAnswer: 'A',
    explanation: 'The Quran was revealed in Arabic, which became the liturgical and scholarly language of Islam across diverse regions.'
  },
  {
    id: 'religions-47',
    type: 'multiple-choice',
    question: 'Which of the following is NOT one of the four main castes within Hinduism',
    options: [
      { label: 'A', value: 'A', text: 'Brahmins' },
      { label: 'B', value: 'B', text: 'Kshatriyas' },
      { label: 'C', value: 'C', text: 'Vaishyas' },
      { label: 'D', value: 'D', text: 'Untouchables' }
    ],
    correctAnswer: 'D',
    explanation: 'Classical varna lists Brahmins, Kshatriyas, Vaishyas, and Shudras; "Untouchables" (Dalits) are outside that four-fold varna system in practice.'
  },
  {
    id: 'religions-48',
    type: 'multiple-choice',
    question: 'Which is a similarity between Hinduism and Buddhism',
    options: [
      { label: 'A', value: 'A', text: 'Belief in the caste system' },
      { label: 'B', value: 'B', text: 'belief in karma and reincarnation' },
      { label: 'C', value: 'C', text: 'the Four Noble Truths' },
      { label: 'D', value: 'D', text: 'the idea of a Messiah' }
    ],
    correctAnswer: 'B',
    explanation: 'Both religions include concepts of karma (moral cause and effect) and rebirth (reincarnation), though they interpret these ideas differently.'
  },
  {
    id: 'religions-49',
    type: 'multiple-choice',
    question: 'Which is NOT a main idea of the Upanishads and Hinduism in general',
    options: [
      { label: 'A', value: 'A', text: 'Brahman as the universal spirit' },
      { label: 'B', value: 'B', text: 'Atman as the individual self or soul' },
      { label: 'C', value: 'C', text: 'Allah is the one true God and Muhammad is his prophet' },
      { label: 'D', value: 'D', text: 'Moksha which is the state of perfect understanding' }
    ],
    correctAnswer: 'C',
    explanation: 'The Upanishads emphasize Brahman, Atman, and moksha; option C is about Islam and not an Upanishadic idea. (Note: the provided correctAnswer field originally listed B; double-check if you want C instead.)'
  },
  {
    id: 'religions-50',
    type: 'multiple-choice',
    question: 'Paul helped to spread Christianity throughout the E. Mediterranean area by',
    options: [
      { label: 'A', value: 'A', text: 'writing letters' },
      { label: 'B', value: 'B', text: 'persecution of Judaism' },
      { label: 'C', value: 'C', text: 'visions of Jesus' },
      { label: 'D', value: 'D', text: 'devotion and prayer' }
    ],
    correctAnswer: 'A',
    explanation: 'Paul\'s epistles to early churches and his missionary travels were central to establishing Christian doctrine and communities across the region.'
  },
  {
    id: 'religions-51',
    type: 'free-response',
    question: 'Compare and contrast Buddhism and Hinduism by discussing how they are similar to and different from one another. Be sure to include at least 2 specific examples of similarities AND two specific examples of differences.',
    correctAnswer: 'Similarities: (1) Both accept the ideas of karma and reincarnation; (2) Both originated in South Asia and discuss liberation from the cycle of rebirth. Differences: (1) Hinduism teaches the eternal soul (atman) and the aim of union with Brahman (moksha), while Buddhism denies a permanent atman and aims for nirvana; (2) Hinduism has a caste-based social structure historically and a variety of deities and devotional paths, while early Buddhism rejected the caste-based authority of Brahmins and emphasized an ethical path (the Eightfold Path) to end suffering.',
    explanation: 'Provide a short, clear comparison: both religions address suffering, karma, and rebirth (similarities). They diverge on the existence of a permanent soul (Hindu atman vs Buddhist anatta/no-self) and on social ritual structures (caste and priestly authority in Hinduism vs Buddhism\'s monastic and ethical focus).'
  },
  {
    id: 'religions-52',
    type: 'free-response',
    question: 'Compare and contrast Christianity and Judiasm by discussing how they are similar to and different from one another. Be sure to include at least 2 specific examples of similarities AND two specific examples of differences.',
    correctAnswer: 'Similarities: (1) Both are monotheistic and worship the God of Abraham; (2) Both share scripture, traditions, and historical figures (e.g., the Hebrew Bible/Old Testament). Differences: (1) Christianity believes Jesus is the Messiah and divine, central to salvation; Judaism does not accept Jesus as the Messiah; (2) Christianity emphasizes faith in Jesus and the New Testament teachings, while Judaism focuses on following the Torah\'s laws and covenantal practices.',
    explanation: 'Keep it direct: both faiths share roots, moral laws, and many texts (similarities). They differ on the identity and role of Jesus, the interpretation of covenant and law, and the role of scripture beyond the Hebrew Bible (Christian New Testament vs Jewish rabbinic tradition).'
  },
];
