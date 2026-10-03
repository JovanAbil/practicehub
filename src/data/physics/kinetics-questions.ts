import { Question } from '@/types/quiz';

// Topic: kinetics
// Math Enabled: true
// Questions: 33

export const kineticsQuestions: Question[] = [
  {
    id: "kinetics-1",
    type: "free-response",
    question: "What is the reference point on a graph?",
    correctAnswer: "The origin",
  },
  {
    id: "kinetics-2",
    type: "free-response",
    question: "What does 'Different frames of reference move relative to one another' mean?",
    correctAnswer: "Different perspectives measure aspects of movement differently.",
    explanation: "!Many different answers!",
  },
  {
    id: "kinetics-3",
    type: "free-response",
    question: "What is the assumed reference frame for questions?",
    correctAnswer: "Earth",
  },
  {
    id: "kinetics-4",
    type: "free-response",
    question: "What does $\\Delta$ mean?",
    correctAnswer: "Final-initial",
  },
  {
    id: "kinetics-5",
    type: "free-response",
    question: "Does displacement care about time?",
    correctAnswer: "No",
  },
  {
    id: "kinetics-6",
    type: "free-response",
    question: "What does positive and negative mean mostly in physics?",
    correctAnswer: "Direction",
  },
  {
    id: "kinetics-7",
    type: "free-response",
    question: "What is distance?",
    correctAnswer: "Total amount traveled",
  },
  {
    id: "kinetics-8",
    type: "free-response",
    question: "Does distance traveled care about direction?",
    correctAnswer: "No",
  },
  {
    id: "kinetics-9",
    type: "free-response",
    question: "What does a odometer measure in a car?",
    correctAnswer: "The distance.",
  },
  {
    id: "kinetics-10",
    type: "free-response",
    question: "What is the derivative of speed?",
    correctAnswer: "Velocity",
  },
  {
    id: "kinetics-11",
    type: "free-response",
    question: "What do vectors have and are represented by?",
    correctAnswer: "Direction and represented by an arrow.",
  },
  {
    id: "kinetics-12",
    type: "free-response",
    question: "What's the equation for velocity explained?",
    correctAnswer: "The change in displacement (where direction matters)/time",
  },
  {
    id: "kinetics-13",
    type: "free-response",
    question: "What do scalars represent?",
    correctAnswer: "Speed without direction.",
  },
  {
    id: "kinetics-14",
    type: "free-response",
    question: "What is the variable for speed?",
    correctAnswer: "$\\bar{v}$",
  },
  {
    id: "kinetics-15",
    type: "free-response",
    question: "What is the variable for velocity?",
    correctAnswer: "$\\vec{v}$",
  },
  {
    id: "kinetics-16",
    type: "free-response",
    question: "What is the equation for speed represented with words?",
    correctAnswer: "Change in displacement (final - intiial no direction)/time",
  },
  {
    id: "kinetics-17",
    type: "free-response",
    question: "Two cars are moving in the same direction in parallel lanes along a highway. At some instant, the instantaneous velocity of car A exceeds the instantaneous velocity of car B. Does this mean that car A's acceleration is greater than car B's? Explain, and use examples.\n",
    correctAnswer: "No, because A being faster than B doesn’t mean A is accelerating more. A could be decelerating but have a faster speed while B is accelerating way faster but has a lower velocity. We don’t have enough information to determine car A’s acceleration is greater than car B’s.\n",
  },
  {
    id: "kinetics-18",
    type: "free-response",
    question: "What is instantaneous velocity?\n",
    correctAnswer: "The velocity at a specific point, the change in position",
  },
  {
    id: "kinetics-19",
    type: "parts",
    question: "Bob accelerated from rest to a top speed of 282 m/s (1015 km/h) in 5.00 s, and was brought back to rest in only 1.40 s. \n",
    parts: [{"label":"a","type":"free-response","question":"Calculate his acceleration.\n","correctAnswer":"$56.4 \\frac{\\text{m}}{\\text{s}^{2}}$\n"},{"label":"b","type":"free-response","question":"Calculate his deceleration.\n","correctAnswer":"$201 \\frac{\\text{m}}{\\text{s}^{2}}$\n"}],
  },
  {
    id: "kinetics-20",
    type: "free-response",
    question: "A bullet in a gun is accelerated from the firing chamber to the end of the barrel at an average rate of $6.20 × 10^{5} \\frac{\\text{m}}{\\text{s}^{2}}$ for $8.10 × 10^{4} s$. What is its muzzle velocity (that is, its final velocity)?\n",
    correctAnswer: "502 m/s",
  },
  {
    id: "kinetics-21",
    type: "parts",
    question: "An object is dropped from a height of 75.0 m above ground level.",
    parts: [{"label":"a","type":"free-response","question":"Determine the distance traveled during the first second.\n","correctAnswer":"4.90 m\n"},{"label":"b","type":"free-response","question":"Determine the final velocity at which the object hits the ground.\n","correctAnswer":"38.3 m/s\n"}],
  },
  {
    id: "kinetics-22",
    type: "free-response",
    question: "12 km east + 8 km north = ?",
    correctAnswer: "14 km at 34$^{\\circ}$ north of east",
  },
  {
    id: "kinetics-23",
    type: "free-response",
    question: "12 km east + 9 km south = ?\n",
    correctAnswer: "15 km at 37$^{\\circ}$ south of east",
  },
  {
    id: "kinetics-24",
    type: "free-response",
    question: "What are component vectors?",
    correctAnswer: "Vectors that combine to create 1 total vector by adding up the totals per direction",
  },
  {
    id: "kinetics-25",
    type: "free-response",
    question: "A hiker walks 27.0 km from her base camp at 35$^{\\circ}$ south of east. Then they walk 41.0 km in a direction 65$^{\\circ}$ north of east and discover an ancient ruin. Find the magnitude and direction of their resultant displacement.\n",
    correctAnswer: "3.4 km at 22$^{\\circ}$ south of east",
  },
  {
    id: "kinetics-26",
    type: "free-response",
    question: "What is the equation of velocity of reference frame $a$ with respect to reference frame $c$ using $a$, $b$, and $c$\n",
    correctAnswer: "$v_{ac} = v_{ab} + v_{bc}$\n",
  },
  {
    id: "kinetics-27",
    type: "free-response",
    question: "How does $v_{ac}$ relate to $v_{ca}$? (Why does ordering matter)\n",
    correctAnswer: "$v_{ac} = -v_{ca}$ because reference point $a$ to $c$ is positive and $c$ to $a$ is negative making both positive\n",
  },
  {
    id: "kinetics-28",
    type: "parts",
    question: "He flew for 169 min at an average velocity of 3.53 m/s in a direction 45º south of east. Bob encountered a headwind averaging 2.00 m/s almost precisely in the opposite direction of his motion relative to Earth. \n",
    parts: [{"label":"a","type":"free-response","question":"What was his total displacement?\n","correctAnswer":"35794.2 meters\n"},{"label":"b","type":"free-response","question":"What was his average velocity relative to the air?\n","correctAnswer":"$v_{ae} = 1.53$ m/s $45^{\\circ}$ south of east\n","explanation":"$v_{aw} = v_{ae} + v_{ew}$\n$3.53$ m/s $= v_{ae} + 2$ m/s\n"},{"label":"c","type":"free-response","question":"What was his total displacement relative to the air mass?\n","correctAnswer":"$15514.2$ meters $45^{\\circ}$ degrees south of east\n"}],
  },
  {
    id: "kinetics-29",
    type: "parts",
    question: "Near the end of a marathon race, the first two runners are separated by a distance of 45.0 m. The front runner has a velocity of 3.50 m/s, and the second a velocity of 4.20 m/s.\n",
    parts: [{"label":"a","type":"free-response","question":"What is the velocity of the second runner relative to the first?\n","correctAnswer":"$v_{sf} = 0.7$ m/s\n","explanation":"$-v_{sf} = v_{fe} + v_{es}$\n$-v_{sf} = 3.5 - 4.2 $\n$v_{sf} = 0.7$ m/s\n"},{"label":"b","type":"free-response","question":"If the front runner is 250 m from the finish line, who will win the race, assuming they run at a constant velocity?\n","correctAnswer":"The second runner will win because it will take them 70.23 seconds to travel 250+45 meters while the first runner will take 71.42 seconds to travel 250 meters.\n"},{"label":"c","type":"free-response","question":"What distance ahead will the winner be when they cross the finish line?\n","correctAnswer":"The winner will be ahead by 4.195 meters.\n"}],
  },
  {
    id: "kinetics-30",
    type: "free-response",
    question: "An archaeologist climbs a really steep pyramid. The pyramid's height is 136m, and its width 2.3 $\\times$ 10$^{2}$m. What is the magnitude and the direction of the displacement of the archaeologist after they have climbed from the bottom of the pyramid to the top?\n",
    correctAnswer: "$178$ meters, at a $49.8^{\\circ}$ incline.\n",
  },
  {
    id: "kinetics-31",
    type: "free-response",
    question: "A hiker walks 27.0 km from her base camp at 35$^{\\circ}$ south of east. The next day, they walk 41.0 km in a direction 65$^{\\circ}$ north of east and discovers a forest ranger's tower. Find the magnitude and direction of their resultant displacement.\n",
    correctAnswer: "$45$ km $29^{\\circ}$ north of east.\n",
  },
  {
    id: "kinetics-32",
    type: "parts",
    question: "A plane flies northeast at an airspeed of 563 km/h. (Airspeed is the speed of the aircraft relative to the air.) A 48.0 km/h wind is blowing to the southeast. \n",
    parts: [{"label":"a","type":"free-response","question":"What is the place's velocity relative to the ground? \n","correctAnswer":"$565$ km/h at $40.1^{\\circ}$ north of east\n"},{"label":"b","type":"free-response","question":"How would this pilot need to adjust the direction in order to maintain a heading of northeast?\n","correctAnswer":"4.9$^{\\circ}$\n"}],
  },
  {
    id: "kinetics-33",
    type: "parts",
    question: "A ship sets sail from some port, heading due north at 7.00 m/s relative to the water. The local ocean current is 1.50 m/s in a direction 40$^{\\circ}$ north of east. \n",
    parts: [{"label":"a","type":"free-response","question":"What is the velocity of the ship relative to the Earth? \n","correctAnswer":"$8.05$ m/s at $81.8^{\\circ}$ north of east\n"},{"label":"b","type":"free-response","question":"In what direction would the ship have to travel in order to have a velocity straight north relative to the Earth, assuming its speed relative to the water remains 7.00 m/s? \n","correctAnswer":"$9.45^{\\circ}$ west of north\n"},{"label":"c","type":"free-response","question":"What would its speed be relative to the Earth?\n","correctAnswer":"$7.87$ m/s\n"}],
  },
];
