import { Question } from '@/types/quiz';

// Topic: machinelearning
// Math Enabled: true
// Questions: 20

export const machinelearningQuestions: Question[] = [
  {
    id: "machinelearning-1",
    type: "free-response",
    question: "What are the two main prediction types in machine learning?",
    correctAnswer: "Classification and Regression.",
  },
  {
    id: "machinelearning-2",
    type: "free-response",
    question: "What is the Classification prediction type?",
    correctAnswer: "It predicts types and sorts numbers.",
  },
  {
    id: "machinelearning-3",
    type: "free-response",
    question: "What is the Regression prediction type?",
    correctAnswer: "It predicts numbers.",
  },
  {
    id: "machinelearning-4",
    type: "free-response",
    question: "What is unsupervised learning?",
    correctAnswer: "Analyzes and fines hidden structures in unlabeled data without human intervention",
  },
  {
    id: "machinelearning-5",
    type: "free-response",
    question: "What is supervised learning?",
    correctAnswer: "Trained on known labeled data",
  },
  {
    id: "machinelearning-6",
    type: "free-response",
    question: "What is considered supervised learning?",
    correctAnswer: "",
    listAnswers: ["Boolean: Between 2 options ","Categorial: Between multiple options ","Real: Regressing numbers"],
  },
  {
    id: "machinelearning-7",
    type: "free-response",
    question: "What variable is used for slope and why?",
    correctAnswer: "$w$ because it represents weight.",
  },
  {
    id: "machinelearning-8",
    type: "free-response",
    question: "What is a ‘mean squared error’?",
    correctAnswer: "A cost function.",
  },
  {
    id: "machinelearning-9",
    type: "free-response",
    question: "What is the goal of regression?",
    correctAnswer: "To minimize the cost function iteratively",
  },
  {
    id: "machinelearning-10",
    type: "free-response",
    question: "What does $J(\\theta)$ represent?",
    correctAnswer: "$\\theta$ is the guess, J is the function, and it represents the Cost Function",
  },
  {
    id: "machinelearning-11",
    type: "parts",
    question: "Answer the following about:\n$\\frac{1}{2m}\\sum_{i=1}^{m}(h_{\\theta}(x^{i})-y^{i})^{2}$\n",
    parts: [{"label":"a","type":"free-response","question":"What does $m$ represent?","correctAnswer":"$m$ represents number of points given"},{"label":"b","type":"free-response","question":"What does $h_{\\theta}$ represent?","correctAnswer":"$h_{\\theta}$ is the guess value"},{"label":"c","type":"free-response","question":"What does $y$ represent?","correctAnswer":"$y$ = actual value for that input"},{"label":"d","type":"free-response","question":"What does $i$ represent?","correctAnswer":"$i$ represents the increment (the next point’s values such as $x^{i}$ is the point)"},{"label":"e","type":"free-response","question":"What does the equation of $J(\\theta) = 0$ mean?","correctAnswer":"At the point $\\theta$, it will be a perfect regression"}],
  },
  {
    id: "machinelearning-12",
    type: "free-response",
    question: "For something to be machine learning, what must it do?",
    correctAnswer: "",
    listAnswers: ["Learn from data","Improve over time ","Find hidden patterns ","Handle new information"],
  },
  {
    id: "machinelearning-13",
    type: "free-response",
    question: "What is ordinal classification?",
    correctAnswer: "Output represents categories.",
  },
  {
    id: "machinelearning-14",
    type: "free-response",
    question: "What is multiclass classification?",
    correctAnswer: "Output represents discrete multi-class labels.",
  },
  {
    id: "machinelearning-15",
    type: "free-response",
    question: "Given the data set below with $m = 3$, calculate the exact cost $J(1)$ for the hypothesis $h_{1}(x) = 1 \\times x$.",
    correctAnswer: "$J(1) = \\frac{5}{6}$",
    explanation: "$\\frac{1}{2m}\\sum_{i=1}^{m}(h_{\\theta}(x^{i})-y^{i})^{2}$",
    image: "/images/machinelearning/machinelearning1.png",
  },
  {
    id: "machinelearning-16",
    type: "free-response",
    question: "Given the data set below with $m = 3$, calculate the exact cost $J(2)$ for the hypothesis $h_{2}(x) = 2x$. What does the answer mean?",
    correctAnswer: "$J(2) = 0$, It is a perfect regression.",
    explanation: "$\\frac{1}{2m}\\sum_{i=1}^{m}(h_{\\theta}(x^{i})-y^{i})^{2}$",
    image: "/images/machinelearning/machinelearning1.png",
  },
  {
    id: "machinelearning-17",
    type: "free-response",
    question: "Calculate $J(2, 0)$ for the hypothesis $h(x) = 2x+ 0$. Why is the cost non-zero even though the slope $\\theta = 2$ is correct?",
    correctAnswer: "$J(2, 0) = 2$, the cost is non-zero because it didn't take into account the y-intercept (0, 2) so this measure would always be underestimating.",
    image: "/images/machinelearning/machinelearning2.png",
  },
  {
    id: "machinelearning-18",
    type: "free-response",
    question: "Calculate $J(2, 2)$ for the hypothesis $h(x) = 2x+ 0$. ",
    correctAnswer: "$J(2, 2) = 0$",
    explanation: "Use $\\frac{1}{2m}\\sum_{i=1}^{m}(h_{\\theta}(x^{i})-y^{i}+b)^{2}$",
    image: "/images/machinelearning/machinelearning2.png",
  },
  {
    id: "machinelearning-19",
    type: "free-response",
    question: "$J(a, b)$ What does $a$ represent?",
    correctAnswer: "$a$ represents $\\theta$ which is the slope.",
  },
  {
    id: "machinelearning-20",
    type: "free-response",
    question: "$J(a, b)$ What does $b$ represent?",
    correctAnswer: "$b$ represents the y-intercept when $x = 0$",
  },
];
