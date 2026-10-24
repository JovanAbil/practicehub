import { Question } from '@/types/quiz';

// Topic: dynamics
// Math Enabled: true
// Questions: 23

export const dynamicsQuestions: Question[] = [
  {
    id: "dynamics-1",
    type: "free-response",
    question: "What does force mean?",
    correctAnswer: "Push or a pull.",
  },
  {
    id: "dynamics-2",
    type: "free-response",
    question: "What is considered a macro force?",
    correctAnswer: "Any force larger than hydrogen.",
    explanation: "Gravity, electromagnetism.",
  },
  {
    id: "dynamics-3",
    type: "free-response",
    question: "What is considered a micro force?",
    correctAnswer: "Any force smaller than hydrogen.",
    explanation: "Strong/weak nuclear forces.",
  },
  {
    id: "dynamics-4",
    type: "free-response",
    question: "What is considered a strong force?",
    correctAnswer: "Strong Nuclear force, electromagnetism. ",
    explanation: "The answers are in order from strongest to weakest.",
  },
  {
    id: "dynamics-5",
    type: "free-response",
    question: "What is considered a weak force?",
    correctAnswer: "Weak Nuclear force, gravity. ",
    explanation: "The answers are in order from strongest to weakest.",
  },
  {
    id: "dynamics-6",
    type: "free-response",
    question: "What are the two different classes of forces and what is the difference between them?",
    correctAnswer: "Contact and field, contact means it needs to touch to be applied and field is like an area of effect and act over long distances.",
  },
  {
    id: "dynamics-7",
    type: "free-response",
    question: "What does Newton's first law of motion describe?",
    correctAnswer: "A body remains at rest or in motion unless acted upon by a net external force.",
  },
  {
    id: "dynamics-8",
    type: "free-response",
    question: "Is a body that is moving at a constant speed considered to have a net external force that's acting upon it?",
    correctAnswer: "No.",
  },
  {
    id: "dynamics-9",
    type: "free-response",
    question: "What is inertia?",
    correctAnswer: "A tendency of a body to resist a change to its motion. ",
  },
  {
    id: "dynamics-10",
    type: "free-response",
    question: "What does inertia depend on?",
    correctAnswer: "The mass of the object",
  },
  {
    id: "dynamics-11",
    type: "free-response",
    question: "What is mass usually measured in regular high school physics?",
    correctAnswer: "kg; kilograms.",
  },
  {
    id: "dynamics-12",
    type: "free-response",
    question: "If it has a constant velocity, what does that tell you about the net forces? ",
    correctAnswer: "That means there are no net forces acting upon it",
  },
  {
    id: "dynamics-13",
    type: "free-response",
    question: "What is considered a state of equilibrium?",
    correctAnswer: "When $F_{\\text{net}} = 0$",
  },
  {
    id: "dynamics-14",
    type: "free-response",
    question: "What is equilibrium?",
    correctAnswer: "The condition that exists when there is no net force acting on a body ",
  },
  {
    id: "dynamics-15",
    type: "free-response",
    question: "What is static equilibrium?",
    correctAnswer: "It is at a state of rest (not moving) so it is at static equilibrium.",
  },
  {
    id: "dynamics-16",
    type: "free-response",
    question: "What is dynamic equilibrium?",
    correctAnswer: "It is in motion at a constant velocity (moving) so it is at dynamic equilibrium",
  },
  {
    id: "dynamics-17",
    type: "free-response",
    question: "What is acceleration caused by?",
    correctAnswer: "A change in the force.",
  },
  {
    id: "dynamics-18",
    type: "free-response",
    question: "What is the second law of motion?",
    correctAnswer: "When the body has a nonzero net external force acting upon it, it will undergo a change in its motion; acceleration",
  },
  {
    id: "dynamics-19",
    type: "free-response",
    question: "Net force is proportional to what? ",
    correctAnswer: "To acceleration",
  },
  {
    id: "dynamics-20",
    type: "free-response",
    question: "What is weight?",
    correctAnswer: "Weight = mass*gravity",
  },
  {
    id: "dynamics-21",
    type: "parts",
    question: "Suppose the mass of a fully-loaded module in which astronauts take off from the Moon is 10 000 kg. The thrust of its engines is 30 000 N. The acceleration due to gravity on the Moon is approximately 1.6 m/s$^{2}$.",
    parts: [{"label":"a","type":"free-response","question":"Calculate its magnitude of acceleration in a vertical takeoff from the Moon. ","correctAnswer":"1.4 m/s$^{2}$"},{"label":"b","type":"free-response","question":"Could it lift off from Earth? If not, why not? If it could, calculate the magnitude of its acceleration.","correctAnswer":"It can not lift off from Earth because it needs more than 98000 N of force to get off the ground since the Earth is applying 98000N of force."}],
  },
  {
    id: "dynamics-22",
    type: "free-response",
    question: "A powerful motorcycle can produce an acceleration of 3.50 m/s$^{2}$ while traveling at 90.0 km/h. At that speed the forces resisting motion, including friction and air resistance, total 400 N. What is the magnitude of the force the motorcycle exerts backward on the ground to produce its acceleration if the mass of the motorcycle plus rider is 245 kg?",
    correctAnswer: "1257.5 N of force",
    explanation: "(N-400)N = (245)kg (3.50)",
  },
  {
    id: "dynamics-23",
    type: "free-response",
    question: "If the rocket sled shown above begins traveling with only one rocket turned on, what is the magnitude of the acceleration it feels? Assume the thrust T is $2.4 x 10^{4}$ N, and the force of friction opposing the rocket is known to be 650 N.",
    correctAnswer: "11.12 m/s$^2$",
    explanation: "(24000-650)N=(2100 kg)(a)",
  },
];
