import { Question } from '@/types/quiz';

// Topic: contextualdifferentiation
// Math Enabled: true
// Questions: 12

export const contextualdifferentiationQuestions: Question[] = [
  {
    id: "contextualdifferentiation-1",
    type: "free-response",
    question: "When time = a function, what does the derivative mean?\n",
    correctAnswer: "The rate of change as a function of time, time will depend on the function instead of being independent\n",
  },
  {
    id: "contextualdifferentiation-2",
    type: "free-response",
    question: "How do you find the total distance traveled when you are given the graph of the velocity, $v(t)$? Use values $a, b, c, d$ where $x(a)$ and $x(b)$ have a positive rate of change, $x(c)$ and $x(d)$ have a negative rate of change, and a<b<c<d.\n",
    correctAnswer: "$(x(b)-(a))-(x(d)-x(c))$ to find the total distance\n",
  },
  {
    id: "contextualdifferentiation-3",
    type: "free-response",
    question: "When an MCQ is asking about either furthest to the right/left and gives you the equation for position, what do you do?\n",
    correctAnswer: "-Take the derivative\n-Find when the derivative equals 0 to figure out when the rate of change is decreasing to find the furthest point away\n-Then test the values in the position equation and answer\n",
  },
  {
    id: "contextualdifferentiation-4",
    type: "free-response",
    question: "A rocket is rising vertically. An observer on the ground is standing a certain distance from the rocket's launch point. As the observer watches the rocket, the angle of elevation is increasing. Relate the rates of change of the angle of elevation with the speed of the rocket. \n",
    correctAnswer: "$\\sec^{2}\\theta \\frac{d\\theta}{dt} = \\frac{1}{x} \\frac{dh}{dt}$\n",
  },
  {
    id: "contextualdifferentiation-5",
    type: "free-response",
    question: "The water level is dropping in a cylindrical tank because of a small leak in the tank. Relate the rates of change between the water level and the volume of the water. The volume is modeled by $V = \\pi r^{2}h$. \n",
    correctAnswer: "$\\frac{d V}{dt} = \\pi r^{2} \\frac{dh}{dt}$\n",
  },
  {
    id: "contextualdifferentiation-6",
    type: "free-response",
    question: "A balloon rises into the air from a point on the ground 10 meters from an observer. Relate the rate of change of the angle of elevation of the balloon from the observer and the distance between the observer and the balloon. \n",
    correctAnswer: "$-\\sin(\\theta) \\frac{d\\theta}{dt} = \\frac{10}{x^{2}} \\frac{dx}{dt}$\n",
  },
  {
    id: "contextualdifferentiation-7",
    type: "free-response",
    question: "An airplane (pt. A) is flying $600$ mph on a horizontal path that will take it directly over an observer (pt. O). The airplane maintains a constant altitude of $7$ miles (see figure). What is the rate of change of the distance between the observer and the airplane when $x = 5$ miles?\n",
    correctAnswer: "$-\\frac{3000}{\\sqrt{74}}$ mph\n",
    // Note: Base64 image embedded - consider moving to public folder
    image: "data:image/png;base64,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",
  },
  {
    id: "contextualdifferentiation-8",
    type: "free-response",
    question: "Find the rate of change of the distance between the origin and a moving point on a graph of $y = \\sin x$ if $dx/dt = 2$ centimeters per second.\n",
    correctAnswer: "$dD/dt = \\frac{2(x+\\sin x \\cos x)}{\\sqrt{x^{2}+sin^{2}x}}$ cm/s\n",
  },
  {
    id: "contextualdifferentiation-9",
    type: "free-response",
    question: "The radius $r$ of the sphere is increasing at a rate of $2$ inches per minute. Find the rate of change of the volume when $r = 24$\n",
    correctAnswer: "$4608\\pi$ in$^{3}$/s\n",
  },
  {
    id: "contextualdifferentiation-10",
    type: "free-response",
    question: "A baseball diamond has a shape of a square with sides 90 feet long. A player running from second base to third base at a speed 28 feet per second is 30 feet from third base. At what rate is the player’s distance $s$ from home plate changing?\n",
    correctAnswer: "$\\frac{30(-28)}{\\sqrt{9000}}$ ft/s\n",
    explanation: "1. Use of pythagorean theorem \n2. Derive pythagorean theorem\n3. $-28$ is used because $x$ (which is the distance between plate 2 to 3) is decreasing\n4. Solve\n",
  },
  {
    id: "contextualdifferentiation-11",
    type: "free-response",
    question: "A conical tank (with vertex down) is 10 feet across the top and 12 feet deep. If water is flowing into the tank at a rate of 10 cubic feet per minute, find the rate of change of the depth of the water when the water is 8 feet deep.\n",
    correctAnswer: "$dh/dt = \\frac{9}{10\\pi}$ ft/s\n",
    explanation: "1. Find the ratio of $r$ to $h$ which is $\\frac{5}{12}h = r$\n2. Plug it into volume equation and derive\n3. Plug in values and solve\n",
  },
  {
    id: "contextualdifferentiation-12",
    type: "parts",
    question: "A man 6 feet tall walks at a rate of 5 feet per second away from a light that is 15 feet above the ground. When he is 10 feet from the base of the light,\n",
    parts: [{"label":"a","type":"free-response","question":"At what rate is the tip of his shadow moving?\n","correctAnswer":"$\\frac{25}{3}$ ft/s\n","explanation":"1. We want the rate his shadow is moving away\n2. To find that we need to match the ratio of the distance from the lamp to the distance between him and his shadow which is $\\frac{15}{y} = \\frac{6}{y-x}$ where $y$ is the total distance and $x$ is the distance between him and the light\n3. Solving that by isolating $y$ (the total distance) gives $y = \\frac{5}{3}x$, derive that to get the rate that $x$ is increasing as the total distance is increasing\n4. Since that is the rate that $x$ is increasing and $dx/dt$ represents the 5 ft/s, this is the distance the tip of the shadow changes.\n"},{"label":"b","type":"free-response","question":"At what rate is the length of his shadow changing?\n","correctAnswer":"$\\frac{10}{3}$ ft/s\n","explanation":"1. We are trying to find the rate at which $y-x$ is changing, so just derive it\n2. Plug in the known values of $dy/dt = 25/3$ and $dx/dt = 5$ and solve\n"}],
  },
];
