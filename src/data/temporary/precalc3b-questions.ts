import { Question } from '@/types/quiz';

// Topic: precalc3b
// Math Enabled: true
// Questions: 25

export const precalc3bQuestions: Question[] = [
  {
    id: "precalc3b-1",
    type: "free-response",
    question: "Does the parent tangent function always increase or decrease or neither?",
    correctAnswer: "Always increases.",
  },
  {
    id: "precalc3b-2",
    type: "free-response",
    question: "When does a parent tangent function change concavity?",
    correctAnswer: "One half of the distance between asymptotes.",
  },
  {
    id: "precalc3b-3",
    type: "free-response",
    question: "What is the point where it changes concavity called?",
    correctAnswer: "An inflection point.",
  },
  {
    id: "precalc3b-4",
    type: "free-response",
    question: "What is the constant a in a tangent function?",
    correctAnswer: "The vertical dilation",
  },
  {
    id: "precalc3b-5",
    type: "free-response",
    question: "What happens if a < 0 in a tangent function?",
    correctAnswer: "It is a reflection over the x-axis",
  },
  {
    id: "precalc3b-6",
    type: "free-response",
    question: "What is b in a tangent function?",
    correctAnswer: "b is the horizontal dilation.",
  },
  {
    id: "precalc3b-7",
    type: "free-response",
    question: "What is the period of any tangent function?",
    correctAnswer: "$\\frac{\\pi}{b}$",
  },
  {
    id: "precalc3b-8",
    type: "free-response",
    question: "What equation allows you to find all the vertical asymptotes in a tangent function?",
    correctAnswer: "$\\frac{\\pi}{2b} + \\frac{\\pi k}{b}$",
  },
  {
    id: "precalc3b-9",
    type: "free-response",
    question: "What is k in the vertical asymptote formula?",
    correctAnswer: "An integer",
  },
  {
    id: "precalc3b-10",
    type: "free-response",
    question: "What is $a$ in the way that how would you find $a$ in a tangent function?",
    correctAnswer: "$a$ would be value of $y$ when $x$ is $\\frac{1}{4}$th of the period after translations. ",
  },
  {
    id: "precalc3b-11",
    type: "free-response",
    question: "What is the domain and range of the parent function $\\sin^{-1}(x)$",
    correctAnswer: "",
    listAnswers: ["Domain: (-1, 1)","Range: $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$"],
  },
  {
    id: "precalc3b-12",
    type: "free-response",
    question: "What is the domain and range of the parent function $\\cos^{-1}(x)$",
    correctAnswer: "",
    listAnswers: ["Domain: (-1, 1)","Range: $(0, \\pi)$"],
  },
  {
    id: "precalc3b-13",
    type: "free-response",
    question: "What is the domain and range of the parent function $\\tan^{-1}(x)$",
    correctAnswer: "",
    listAnswers: ["Domain: (-\\infty, \\infty)","Range: $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$"],
  },
  {
    id: "precalc3b-14",
    type: "free-response",
    question: "When evaluating inverse trig functions, what is the rule?",
    correctAnswer: "Stay within the range for each one.",
  },
  {
    id: "precalc3b-15",
    type: "free-response",
    question: "How to find the domain of dilated and/or translated inverse trig functions?",
    correctAnswer: "- Put the range in the non-inverse version of the trig functions\n- OR find 'y (which is x in the normal function)' in the inverse trig function",
  },
  {
    id: "precalc3b-16",
    type: "free-response",
    question: "What is the period of $7-3\\tan(4x)$?",
    correctAnswer: "$\\frac{\\pi}{4}$",
  },
  {
    id: "precalc3b-17",
    type: "free-response",
    question: "What is all the vertical asymptotes for $j(\\theta)$ = $\\tan(2\\theta)$?",
    correctAnswer: "$\\frac{\\pi}{4} + \\frac{\\pi}{2}k$, where $k$ is an integer",
  },
  {
    id: "precalc3b-18",
    type: "free-response",
    question: "What is all the vertical asymptotes for $f(\\theta)$ = $\\tan(\\frac{1}{4}\\theta)$?",
    correctAnswer: "$2\\pi + 4\\pi k$, where $k$ is an integer",
  },
  {
    id: "precalc3b-19",
    type: "free-response",
    question: "What is all the vertical asymptotes for $g(\\theta)$ = $\\tan(\\pi\\theta)$?",
    correctAnswer: "$\\frac{1}{2} + k$, where $k$ is an integer",
  },
  {
    id: "precalc3b-20",
    type: "free-response",
    question: "$2\\sin^{-1}(x)=\\cos^{-1}(0)$",
    correctAnswer: "$x = 1$",
  },
  {
    id: "precalc3b-21",
    type: "free-response",
    question: "$\\sin^{-1}(-\\frac{1}{2})$ = ",
    correctAnswer: "$-\\frac{\\pi}{6}$",
  },
  {
    id: "precalc3b-22",
    type: "free-response",
    question: "$\\tan^{-1}(-\\frac{\\sqrt{3}}{3})$ = ",
    correctAnswer: "$-\\frac{\\pi}{6}$",
  },
  {
    id: "precalc3b-23",
    type: "free-response",
    question: "$\\tan^{-1}(\\pi x) = \\sin^{-1}(\\frac{\\sqrt{2}}{2})$",
    correctAnswer: "$x = -\\frac{1}{\\pi}$",
  },
  {
    id: "precalc3b-24",
    type: "free-response",
    question: "State the inverse of $f(x) =  4 - \\cos (2x); 0 \\leq x \\leq \\frac{\\pi}{2}$ and the domain and range.",
    correctAnswer: "",
    listAnswers: ["$f(x) = \\frac{\\cos^{-1}(-x+4)}{2}$","D: $(3, 4)$","R: $(0, \\frac{\\pi}{2})$"],
  },
  {
    id: "precalc3b-25",
    type: "free-response",
    question: "State the inverse of $f(x) =  \\frac{1}{2} \\tan (\\frac{\\pi}{2}x); -\\frac{\\pi}{2} \\leq x \\leq \\frac{\\pi}{2}$ and the domain and range.",
    correctAnswer: "",
    listAnswers: ["$f^{-1}(x)=\\frac{2}{\\pi}\\tan^{-1}(2x)$","D: $(-\\infty, \\infty)$","R: $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$"],
  },
];
