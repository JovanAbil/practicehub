import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Download, ExternalLink, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';

/**
 * The AI prompt template used to generate questions.
 * To customize this prompt, modify the string below.
 * See src/management/17-QUESTION-GENERATOR-GUIDE.md for details.
 */
const AI_PROMPT = `You are a study question generator. Given the notes below, create a TypeScript question file.

CRITICAL: The file MUST start with this exact import statement on the very first line:
import { Question } from '@/types/quiz';

ALSO CRITICAL:
Make each statement from the notes into a (who, what, when, where, why, how) question and then 
30% of those 100% amount of questions should be added to the main set as conceptual and understanding based questions.
So in total 130% questions; 100% simple who,what,when,where,why,how and 30% conceptual additional questions

Then export a single array. Use the variable name provided or default to "generatedQuestions".

=== COMPLETE QUESTION FORMATTING GUIDE ===

Every question file must follow this structure:

import { Question } from '@/types/quiz';

export const topicQuestions: Question[] = [
  // questions go here
];

- The import statement MUST be the very first line.
- Export a single array of Question objects.
- Variable name should be camelCase based on the topic (e.g., atomicQuestions, biochemistryQuestions).

== Question Types shown as examples, take the format don't take the id's or questions ==

MULTIPLE CHOICE:
{
  id: 'atomic-1',
  type: 'multiple-choice',
  question: 'Which scientist first proposed that all matter is composed of tiny, indivisible particles called atoms?',
  options: [
    { label: 'A', value: 'A', text: 'Dalton' },
    { label: 'B', value: 'B', text: 'Democritus' },
    { label: 'C', value: 'C', text: 'Thomson' },
    { label: 'D', value: 'D', text: 'Rutherford' },
  ],
  correctAnswer: 'B',
  explanation: 'Democritus first proposed the idea of atoms as tiny, indivisible particles of matter.',
}

Rules:
- correctAnswer must be an uppercase letter matching one of the option value fields (e.g., 'A', 'B', 'C', 'D').
- Every option MUST have all three fields: label, value, and text.
- value must ALWAYS equal label.

FREE RESPONSE:
{
  id: 'biochemistry-1',
  type: 'free-response',
  question: 'Which two types of particles are present in equal numbers in an atom, but not in an ion?',
  correctAnswer: 'Protons and electrons',
  explanation: '',
}

SELECT ALL THAT APPLY:
{
  id: 'topic-3',
  type: 'select-all',
  question: 'Which are prime numbers?',
  options: [
    { label: 'A', value: 'A', text: '2' },
    { label: 'B', value: 'B', text: '4' },
    { label: 'C', value: 'C', text: '7' },
    { label: 'D', value: 'D', text: '9' },
  ],
  correctAnswers: ['A', 'C'],
  explanation: '2 and 7 are prime.',
}

Rules:
- Uses type: 'select-all' and correctAnswers (array) instead of correctAnswer (string).
- Only correct if exactly the right options are selected (no extra, no missing).

PARTS (MULTI-PART QUESTIONS):

Parts with free-response sub-parts:
{
  id: 'stoichiometry-54',
  type: 'parts',
  question: 'If 10.0 g of ethanol reacts with 30.0 g of O$_{2}$,\\n\\n$\\\\text{C}_{2}\\\\text{H}_{5}\\\\text{OH} + 3 \\\\text{O}_{2} \\\\rightarrow 2 \\\\text{CO}_{2} + 3 \\\\text{H}_{2}\\\\text{O}$',
  parts: [
    {
      label: 'a',
      type: 'free-response',
      question: 'How many grams of CO$_{2}$ will be produced?',
      correctAnswer: '19.106 grams',
      explanation: 'Determine limiting reactant, convert to moles, apply mole ratio, then convert to grams.',
    },
    {
      label: 'b',
      type: 'free-response',
      question: 'Label the limiting and excess reactants.',
      correctAnswer: 'Limiting: ethanol; Excess: oxygen',
      explanation: 'Compare mole ratios to determine limiting reagent.',
    },
    {
      label: 'c',
      type: 'free-response',
      question: 'How many grams of excess reactant will be leftover?',
      correctAnswer: '6.04 grams',
      explanation: 'Subtract amount used from initial quantity of excess reactant.',
    },
  ],
}

Parts with multiple-choice sub-parts:
{
  id: 'reniassance-73',
  type: 'parts',
  question: 'Match Northern Renaissance artists to their achievements:',
  parts: [
    {
      label: 'a',
      type: 'multiple-choice',
      question: 'Who painted photographic portraits of King Henry VIII?',
      options: [
        { label: 'A', value: 'A', text: 'Albrecht Dürer' },
        { label: 'B', value: 'B', text: 'Hans Holbein the Younger' },
        { label: 'C', value: 'C', text: 'Jan van Eyck' },
        { label: 'D', value: 'D', text: 'Pieter Bruegel' },
      ],
      correctAnswer: 'B',
    },
    {
      label: 'b',
      type: 'multiple-choice',
      question: 'Who produced detailed woodcuts and engravings?',
      options: [
        { label: 'A', value: 'A', text: 'Albrecht Dürer' },
        { label: 'B', value: 'B', text: 'Hans Holbein the Younger' },
        { label: 'C', value: 'C', text: 'Jan van Eyck' },
        { label: 'D', value: 'D', text: 'Pieter Bruegel' },
      ],
      correctAnswer: 'A',
    },
  ],
}

Parts with mixed types and listAnswers:
{
  id: 'logarithmic-17',
  type: 'parts',
  question: 'Given $f(x) = \\\\ln(x-3) + 5$, answer the following.',
  parts: [
    {
      label: 'a',
      type: 'free-response',
      question: 'Where is the asymptote?',
      correctAnswer: '$x = 3$',
    },
    {
      label: 'b',
      type: 'free-response',
      question: 'What is the domain?',
      correctAnswer: '$(3, \\\\infty)$',
    },
    {
      label: 'c',
      type: 'free-response',
      question: 'What is the range?',
      correctAnswer: '$(-\\\\infty, \\\\infty)$',
    },
    {
      label: 'd',
      type: 'free-response',
      question: 'What are both end behaviors for this function?',
      correctAnswer: '',
      listAnswers: [
        '\\\\lim_{x \\\\to 3^+} f(x) = -\\\\infty',
        '\\\\lim_{x \\\\to \\\\infty} f(x) = \\\\infty',
      ],
    },
  ],
}

Parts rules:
- Each part needs a label ('a', 'b', 'c', etc.).
- Each part needs its own type ('free-response', 'multiple-choice', or 'select-all').
- Each part needs its own correctAnswer (or correctAnswers for select-all parts).
- Parts can optionally have explanation, image, and listAnswers.
- The main question field is the shared stem shown above all parts.

CRITICAL PARTS FORMATTING — READ CAREFULLY:
The parser accepts the normal multi-line object-array format for parts questions, including trailing commas after each part object.
Both single quotes ('') and double quotes ("") are accepted. You do NOT need to force parts onto one line.
Use the standard array-of-objects format below by default:

{
  id: 'topic-1',
  type: 'parts',
  question: 'Main stem here',
  parts: [
    {
      label: 'a',
      type: 'free-response',
      question: 'Part a question',
      correctAnswer: 'answer a',
      explanation: '',
    },
    {
      label: 'b',
      type: 'free-response',
      question: 'Part b question',
      correctAnswer: 'answer b',
      explanation: '',
    },
  ],
}

- A compact single-line parts array also works if needed: parts: [{"label":"a","type":"free-response","question":"...","correctAnswer":"...","explanation":""}]
- Inside the parts array you may use double quotes for keys/values, just like JSON.
- Do NOT mix unescaped quotes inside string values. If a value contains a double quote, switch the surrounding quotes to single quotes (or escape with \").
- Do NOT use backticks or template literals anywhere.
- Multi-line pretty format is preferred and should be used for parts questions unless there is a special reason not to.

LIST FRQ (Free Response with List Answers):
{
  id: 'polynomial-20',
  type: 'free-response',
  question: 'If it is a positive even degree polynomial, what extrema does it have and where does it open?',
  correctAnswer: '',
  listAnswers: ['Minimum', 'Opens Up'],
}

Rules:
- Only available on free-response questions (standalone or as parts).
- listAnswers is an array of strings — each is one correct item.
- correctAnswer can be empty string when listAnswers is present.

== Math (LaTeX) Formatting ==

IMPORTANT: LaTeX is explicit-only. Math is ONLY rendered when wrapped in $...$ (inline) or $$...$$ (display mode).
There is NO automatic conversion of plain text like x^2, sqrt(x), <=, infinity symbols.
In TypeScript strings, use \\\\ for \\.

| Element       | Syntax                          | Example                            |
|---------------|---------------------------------|------------------------------------|
| Fraction      | $\\\\frac{a}{b}$               | $\\\\frac{x+1}{x-1}$              |
| Limit         | $\\\\lim_{x \\\\to a}$         | $\\\\lim_{x \\\\to \\\\infty}$    |
| Square root   | $\\\\sqrt{x}$                  | $\\\\sqrt{x+1}$                   |
| Exponent      | $x^{n}$                        | $x^{2}$                           |
| Superscript   | $^{text}$                      | 1s$^{2}$2s$^{2}$                  |
| Subscript     | $_{text}$                      | C$_{5}$H$_{11}$OH                 |
| ≤ / ≥         | $\\\\leq$ / $\\\\geq$         | $x \\\\leq 5$                     |
| Union         | $\\\\cup$                      | $(0,1) \\\\cup (2,3)$             |
| Infinity      | $\\\\infty$                    | $x \\\\to \\\\infty$              |
| Pi            | $\\\\pi$                       | $\\\\pi r^2$                      |
| Log           | $\\\\log(x)$                   | $\\\\log_2(8)$                    |
| Natural log   | $\\\\ln(x)$                    | $\\\\ln(e^2)$                     |
| Multiply      | $\\\\times$                    | 3.61 $\\\\times$ 10$^{-18}$ J     |
| Text in math  | $\\\\text{...}$                | $\\\\text{C}_{2}\\\\text{H}_{5}$  |

Real working examples:
- Electron config: '1s$^{2}$2s$^{2}$2p$^{6}$3s$^{2}$3p$^{6}$'
- Chemistry molecule: 'C$_{5}$H$_{11}$OH'
- Scientific notation: '3.61 $\\\\times$ 10$^{-18}$ J'
- Nuclear equation: '$\\\\frac{100}{40}$Ru + $\\\\frac{4}{2}$He'

For currency dollar signs, escape with backslash: \\\\$50

Use \\n for line breaks in explanations/questions.

== Tables ==
{
  table: {
    headers: ['x', 'f(x)', 'g(x)'],
    rows: [
      [1, 3, 5],
      [2, 7, 11],
    ],
  },
}

== Images ==
{
  image: '/images/subject/filename.png',
}

== Calculator Flag ==
{
  calculator: true,
}

== Chemistry Formatting ==
One recommended approaches:
1. Using subscripts directly (more common): 'H$_{2}$O', 'CO$_{2}$'

== Naming Conventions ==
- File name: [topic]-questions.ts (e.g., polynomial-questions.ts)
- Variable name: [topic]Questions (e.g., polynomialQuestions)
- Question ID: [topic]-[number] (e.g., polynomial-1)

=== RULES ===
- IF THE NOTES GIVEN WERENT DIRECT QUESTIONS; Make a question out of each statement/fact that was given in the notes
- IF THE NOTES GIVEN WERE DIRECT QUESTIONS; Convert into the question format that is used here
- Make questions test understanding, not just memorization
- Use the appropriate question type based on the content
- If the notes include answers, use them to create accurate questions | If it's notes, treat every question as a fact and use it as the answer, questions should revolve around this answer
- Always include explanations when possible
- Use LaTeX formatting for ALL math expressions, for chemistry based make sure that subscripts are the only latex format, such as H$_{2}$O

NOTES:
`;

/** Recommended AI tools for generating questions */
const AI_TOOLS = [
  {
    name: 'Claude (Recommended)',
    url: 'https://claude.ai',
    description: 'Best at following the exact TypeScript format consistently',
  },
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'Good alternative, may need minor format corrections',
  },
];

/**
 * Formats a user-entered filename into a valid kebab-case .ts filename.
 * - Converts to lowercase
 * - Replaces spaces and underscores with hyphens
 * - Removes invalid characters
 * - Appends '-questions.ts' if not already ending in .ts
 */
const formatFilename = (input: string): string => {
  let name = input.trim().toLowerCase();
  // Remove .ts extension if provided
  name = name.replace(/\.ts$/, '');
  // Replace spaces/underscores with hyphens
  name = name.replace(/[\s_]+/g, '-');
  // Remove any characters that aren't alphanumeric or hyphens
  name = name.replace(/[^a-z0-9-]/g, '');
  // Remove leading/trailing hyphens and collapse multiple hyphens
  name = name.replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!name) name = 'generated-questions';
  if (!name.endsWith('-questions')) name += '-questions';
  return name + '.ts';
};

const QuestionGenerator = () => {
  const [notes, setNotes] = useState('');
  const [outputData, setOutputData] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');

  const handleCopyPrompt = async () => {
    if (!notes.trim()) {
      toast.error('Please add your notes first');
      return;
    }
    try {
      await navigator.clipboard.writeText(AI_PROMPT + notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Prompt + notes copied to clipboard!');
      setStep(3);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    if (!outputData.trim()) {
      toast.error('Please paste the generated data first');
      return;
    }

    // Ensure it has the import statement
    let content = outputData.trim();
    if (!content.includes("import { Question }")) {
      content = `import { Question } from '@/types/quiz';\n\n${content}`;
    }

    const finalName = formatFilename(fileName || 'generated-questions');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = finalName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded as ${finalName}`);
    setStep(5);
  };

  const previewFilename = formatFilename(fileName || 'generated-questions');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/category/custom">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Custom Units
          </Link>
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Wand2 className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">Question Generator</h1>
            <p className="text-muted-foreground">Turn your notes into practice questions using AI</p>
          </div>
        </div>

        {/* Step 1: Add Notes */}
        <Card className={`p-6 mb-6 ${step >= 1 ? 'border-primary/30' : 'opacity-60'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <h2 className="text-xl font-display font-semibold">Add Your Notes</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Paste your notes below. They should be somewhat legible text. If your notes are just questions, make sure the answers are included.
          </p>
          <Textarea
            placeholder="Paste your notes here..."
            value={notes}
            onChange={(e) => { setNotes(e.target.value); if (step < 2 && e.target.value.trim()) setStep(2); }}
            className="min-h-[200px] mb-4"
          />
        </Card>

        {/* Step 2: Copy Prompt */}
        <Card className={`p-6 mb-6 ${step >= 2 ? 'border-primary/30' : 'opacity-60'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
            <h2 className="text-xl font-display font-semibold">Copy the Prompt + Notes</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Click the button below to copy the AI prompt with your notes appended. Then paste it into one of the AI tools listed.
          </p>
          <Button
            onClick={handleCopyPrompt}
            disabled={!notes.trim()}
            className="mb-4"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Prompt + Notes
              </>
            )}
          </Button>

          <div className="grid sm:grid-cols-2 gap-3">
            {AI_TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-primary mt-1 group-hover:scale-110 transition-transform shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </Card>

        {/* Step 3: Paste Output */}
        <Card className={`p-6 mb-6 ${step >= 3 ? 'border-primary/30' : 'opacity-60'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>3</div>
            <h2 className="text-xl font-display font-semibold">Paste the AI Output & Download</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            When the AI gives you the dataset, copy the entire code block and paste it below. Name your file, then download.
          </p>
          <Textarea
            placeholder="Paste the generated TypeScript code here..."
            value={outputData}
            onChange={(e) => { setOutputData(e.target.value); if (step < 4 && e.target.value.trim()) setStep(4); }}
            className="min-h-[200px] font-mono text-sm mb-4"
            disabled={step < 3}
          />

          {/* Filename input */}
          <div className="space-y-3 mb-4">
            <Label htmlFor="filename" className="font-medium">File Name</Label>
            <Input
              id="filename"
              placeholder="e.g. biology-unit3 or chapter5-review"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              disabled={step < 3}
            />
            <p className="text-xs text-muted-foreground">
              Will download as: <code className="px-1.5 py-0.5 bg-muted rounded font-mono">{previewFilename}</code>
            </p>
            <p className="text-xs text-muted-foreground">
              Spaces and uppercase are auto-converted to lowercase hyphens. Only letters, numbers, and hyphens are kept.
            </p>
          </div>

          <Button
            onClick={handleDownload}
            disabled={!outputData.trim()}
          >
            <Download className="mr-2 h-4 w-4" />
            Download .ts File
          </Button>
        </Card>

        {/* Step 4: Upload */}
        <Card className={`p-6 mb-6 ${step >= 4 ? 'border-primary/30' : 'opacity-60'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 5 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>4</div>
            <h2 className="text-xl font-display font-semibold">Upload & Practice</h2>
          </div>
          <p className="text-muted-foreground">
            Upload the downloaded <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">.ts</code> question file into any unit's <strong>Build Custom Practice</strong> page using the "Upload .ts File" button. You can then select questions, edit them, and practice!
          </p>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionGenerator;
