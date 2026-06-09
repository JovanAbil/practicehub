import { CustomUnit, CustomTopic } from '@/hooks/useCustomUnits';
import { Question } from '@/types/quiz';
import JSZip from 'jszip';

// Storage key for imported course challenge questions
const IMPORTED_QUESTIONS_KEY = 'imported-course-questions';

export interface ImportedQuestionSet {
  id: string;
  name: string;
  questions: Question[];
  importedAt: number;
}

// Get all imported question sets for a subject
export const getImportedQuestions = (subject: string): ImportedQuestionSet[] => {
  try {
    const stored = localStorage.getItem(`${IMPORTED_QUESTIONS_KEY}-${subject}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Failed to load imported questions');
  }
  return [];
};

// Save imported question set
export const saveImportedQuestions = (subject: string, questionSet: ImportedQuestionSet) => {
  const existing = getImportedQuestions(subject);
  const updated = [...existing, questionSet];
  localStorage.setItem(`${IMPORTED_QUESTIONS_KEY}-${subject}`, JSON.stringify(updated));
};

// Remove imported question set
export const removeImportedQuestions = (subject: string, setId: string) => {
  const existing = getImportedQuestions(subject);
  const updated = existing.filter(qs => qs.id !== setId);
  localStorage.setItem(`${IMPORTED_QUESTIONS_KEY}-${subject}`, JSON.stringify(updated));
};

// Generate TypeScript content for any topic (built-in or custom)
export const generateBuiltInTopicFile = (questions: Question[], topicName: string, mathEnabled: boolean = false): string => {
  const variableName = toVariableName(topicName) + 'Questions';
  
  const formatQuestion = (q: Question, indent: string): string => {
    const lines: string[] = [];
    lines.push(`${indent}{`);
    lines.push(`${indent}  id: "${q.id}",`);
    lines.push(`${indent}  type: "${q.type}",`);
    lines.push(`${indent}  question: ${JSON.stringify(q.question)},`);
    
    // Always include options for multiple-choice questions, even if empty/undefined
    if (q.type === 'multiple-choice' || q.type === 'select-all') {
      const options = q.options || [];
      if (options.length === 0) {
        console.warn(`[Export] ${q.type} question "${q.id}" has no options - this may cause issues`);
      }
      lines.push(`${indent}  options: ${JSON.stringify(options)},`);
    }
    
    if (q.type === 'parts') {
      // Serialize parts array
      lines.push(`${indent}  parts: ${JSON.stringify(q.parts)},`);
    } else {
      if ('correctAnswer' in q) lines.push(`${indent}  correctAnswer: ${JSON.stringify(q.correctAnswer)},`);
      if ('correctAnswers' in q && q.correctAnswers) lines.push(`${indent}  correctAnswers: ${JSON.stringify(q.correctAnswers)},`);
      if ('explanation' in q) lines.push(`${indent}  explanation: ${JSON.stringify(q.explanation || '')},`);
      if (q.type === 'free-response' && q.listAnswers && q.listAnswers.length > 0) {
        lines.push(`${indent}  listAnswers: ${JSON.stringify(q.listAnswers)},`);
      }
    }
    
    if (q.image) {
      lines.push(`${indent}  image: ${JSON.stringify(q.image)},`);
    }
    
    // Include calculator field if true
    if (q.calculator) {
      lines.push(`${indent}  calculator: true,`);
    }
    
    lines.push(`${indent}},`);
    return lines.join('\n');
  };

  return `import { Question } from '@/types/quiz';

// Topic: ${topicName}
// Math Enabled: ${mathEnabled}
// Questions: ${questions.length}

export const ${variableName}: Question[] = [
${questions.map(q => formatQuestion(q, '  ')).join('\n')}
];
`;
};

// Download built-in topic as .ts file
export const downloadBuiltInTopic = (questions: Question[], topicName: string, mathEnabled: boolean = false) => {
  const content = generateBuiltInTopicFile(questions, topicName, mathEnabled);
  const filename = `${toSafeName(topicName)}-questions.ts`;
  
  const blob = new Blob([content], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Convert name to a safe filename/variable name
const toSafeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Convert name to a valid JS variable name
const toVariableName = (name: string): string => {
  const safe = toSafeName(name);
  // Ensure it starts with a letter
  if (/^[0-9]/.test(safe)) {
    return 'q' + safe.replace(/-/g, '');
  }
  return safe.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
};

// Generate TypeScript content for a topic (with optional image path rewriting for unit export)
// imagePathMap: maps base64 data URLs to their deduplicated file paths (for shared images)
export const generateTopicFileContent = (
  topic: CustomTopic, 
  unitName: string, 
  rewriteImagePaths: boolean = false,
  imagePathMap?: Map<string, string>
): string => {
  const variableName = `${toVariableName(topic.name)}Questions`;
  const topicPrefix = toSafeName(topic.name);
  
  const questionsWithIds = topic.questions.map((q, index) => {
    const newId = `${topicPrefix}-${index + 1}`;
    return { ...q, id: newId };
  });

  const getImagePath = (imageData: string, defaultPath: string): string => {
    // If we have a shared image map, use the deduplicated path
    if (imagePathMap && imagePathMap.has(imageData)) {
      return imagePathMap.get(imageData)!;
    }
    return defaultPath;
  };

  const formatQuestion = (q: Question, indent: string, qIndex: number): string => {
    const lines: string[] = [];
    lines.push(`${indent}{`);
    lines.push(`${indent}  id: "${q.id}",`);
    lines.push(`${indent}  type: "${q.type}",`);
    lines.push(`${indent}  question: ${JSON.stringify(q.question)},`);
    
    // Always include options for multiple-choice questions, even if empty/undefined
    if (q.type === 'multiple-choice' || q.type === 'select-all') {
      const options = q.options || [];
      if (options.length === 0) {
        console.warn(`[Export] ${q.type} question "${q.id}" has no options - this may cause issues`);
      }
      
      // Process options with image path rewriting
      const processedOptions = options.map((opt, optIndex) => {
        if (rewriteImagePaths && opt.image && opt.image.startsWith('data:')) {
          const defaultPath = `/images/${toSafeName(unitName)}/${topicPrefix}-q${qIndex + 1}-opt${optIndex + 1}.png`;
          return {
            ...opt,
            image: getImagePath(opt.image, defaultPath)
          };
        }
        return opt;
      });
      
      lines.push(`${indent}  options: ${JSON.stringify(processedOptions)},`);
    }
    
    if (q.type === 'parts') {
      // For parts questions, serialize parts with image path rewriting
      const processedParts = q.parts.map((part, partIndex) => {
        const processed = { ...part };
        if (rewriteImagePaths && processed.image && processed.image.startsWith('data:')) {
          const defaultPath = `/images/${toSafeName(unitName)}/${topicPrefix}-q${qIndex + 1}-part${partIndex + 1}.png`;
          processed.image = getImagePath(processed.image, defaultPath);
        }
        if (processed.options) {
          processed.options = processed.options.map((opt, optIndex) => {
            if (rewriteImagePaths && opt.image && opt.image.startsWith('data:')) {
              const defaultPath = `/images/${toSafeName(unitName)}/${topicPrefix}-q${qIndex + 1}-part${partIndex + 1}-opt${optIndex + 1}.png`;
              return { ...opt, image: getImagePath(opt.image, defaultPath) };
            }
            return opt;
          });
        }
        return processed;
      });
      lines.push(`${indent}  parts: ${JSON.stringify(processedParts)},`);
    } else {
      if ('correctAnswer' in q) lines.push(`${indent}  correctAnswer: ${JSON.stringify(q.correctAnswer)},`);
      if ('correctAnswers' in q && q.correctAnswers) lines.push(`${indent}  correctAnswers: ${JSON.stringify(q.correctAnswers)},`);
      if ('explanation' in q) lines.push(`${indent}  explanation: ${JSON.stringify(q.explanation || '')},`);
      if (q.type === 'free-response' && q.listAnswers && q.listAnswers.length > 0) {
        lines.push(`${indent}  listAnswers: ${JSON.stringify(q.listAnswers)},`);
      }
    }
    
    if (q.image) {
      if (rewriteImagePaths && q.image.startsWith('data:')) {
        const defaultPath = `/images/${toSafeName(unitName)}/${topicPrefix}-q${qIndex + 1}.png`;
        const imagePath = getImagePath(q.image, defaultPath);
        lines.push(`${indent}  image: "${imagePath}",`);
      } else if (q.image.startsWith('data:')) {
        lines.push(`${indent}  // Note: Base64 image embedded - consider moving to public folder`);
        lines.push(`${indent}  image: ${JSON.stringify(q.image)},`);
      } else {
        lines.push(`${indent}  image: ${JSON.stringify(q.image)},`);
      }
    }
    
    // Include calculator field if true
    if (q.calculator) {
      lines.push(`${indent}  calculator: true,`);
    }
    
    lines.push(`${indent}},`);
    return lines.join('\n');
  };

  const content = `import { Question } from '@/types/quiz';

// Topic: ${topic.name}
// Math Enabled: ${topic.mathEnabled}
// Questions: ${topic.questions.length}

export const ${variableName}: Question[] = [
${questionsWithIds.map((q, i) => formatQuestion(q, '  ', i)).join('\n')}
];
`;

  return content;
};

// Generate metadata file for a unit
export const generateUnitMetadata = (unit: CustomUnit): string => {
  return `// Unit: ${unit.name}
// Teacher: ${unit.teacherName}
// Subject: ${unit.subject}
// Topics: ${unit.topics.length}
// Total Questions: ${unit.topics.reduce((sum, t) => sum + t.questions.length, 0)}

export const unitMetadata = {
  name: ${JSON.stringify(unit.name)},
  teacherName: ${JSON.stringify(unit.teacherName)},
  subject: ${JSON.stringify(unit.subject)},
  topics: [
${unit.topics.map(t => `    {
      name: ${JSON.stringify(t.name)},
      file: "./${toSafeName(t.name)}-questions.ts",
      mathEnabled: ${t.mathEnabled},
      testType: ${JSON.stringify(t.testType)},
      testDate: ${JSON.stringify(t.testDate)},
      questionCount: ${t.questions.length},
    },`).join('\n')}
  ],
};
`;
};

// Download a single topic as .ts file
export const downloadTopic = (topic: CustomTopic, unitName: string) => {
  const content = generateTopicFileContent(topic, unitName);
  const filename = `${toSafeName(topic.name)}-questions.ts`;
  
  const blob = new Blob([content], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Helper to extract image extension from base64 data URL
const getImageExtension = (dataUrl: string): string => {
  const match = dataUrl.match(/data:image\/([a-zA-Z]+);/);
  return match ? match[1] : 'png';
};

// Helper to convert base64 to binary
const base64ToBlob = (dataUrl: string): Uint8Array => {
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Download entire unit as a zip folder with proper structure:
// - public/images/(unit name)/ - for images
// - src/data/(unit name)/ - for .ts files
export const downloadUnit = async (unit: CustomUnit) => {
  const zip = new JSZip();
  const folderName = toSafeName(unit.name);
  
  // Create folder structure
  const publicImagesFolder = zip.folder(`public/images/${folderName}`);
  const srcDataFolder = zip.folder(`src/data/${folderName}`);
  
  if (!publicImagesFolder || !srcDataFolder) return;
  
  // Track unique images to avoid duplication (key: base64 data, value: file path)
  const imagePathMap = new Map<string, string>();
  
  // First pass: collect all unique images and assign paths
  // Track per-topic image counters for topicname# naming
  for (const topic of unit.topics) {
    const topicSafeName = toSafeName(topic.name);
    let topicImageCounter = 0;
    
    topic.questions.forEach((q) => {
      // Check question-level image
      if (q.image && q.image.startsWith('data:') && !imagePathMap.has(q.image)) {
        topicImageCounter++;
        const ext = getImageExtension(q.image);
        const filename = `${topicSafeName}${topicImageCounter}.${ext}`;
        imagePathMap.set(q.image, `/images/${folderName}/${filename}`);
      }
      
      // Check MCQ option images
      if ((q.type === 'multiple-choice' || q.type === 'select-all') && q.options) {
        q.options.forEach((opt) => {
          if (opt.image && opt.image.startsWith('data:') && !imagePathMap.has(opt.image)) {
            topicImageCounter++;
            const ext = getImageExtension(opt.image);
            const filename = `${topicSafeName}${topicImageCounter}.${ext}`;
            imagePathMap.set(opt.image, `/images/${folderName}/${filename}`);
          }
        });
      }
      
      // Check parts question images
      if (q.type === 'parts' && q.parts) {
        q.parts.forEach((part) => {
          if (part.image && part.image.startsWith('data:') && !imagePathMap.has(part.image)) {
            topicImageCounter++;
            const ext = getImageExtension(part.image);
            const filename = `${topicSafeName}${topicImageCounter}.${ext}`;
            imagePathMap.set(part.image, `/images/${folderName}/${filename}`);
          }
          if (part.options) {
            part.options.forEach((opt) => {
              if (opt.image && opt.image.startsWith('data:') && !imagePathMap.has(opt.image)) {
                topicImageCounter++;
                const ext = getImageExtension(opt.image);
                const filename = `${topicSafeName}${topicImageCounter}.${ext}`;
                imagePathMap.set(opt.image, `/images/${folderName}/${filename}`);
              }
            });
          }
        });
      }
    });
  }
  
  const hasImages = imagePathMap.size > 0;
  
  // Second pass: write unique images to ZIP
  imagePathMap.forEach((filePath, base64Data) => {
    // Extract filename from path (e.g., "/images/unit/shared-img-1.png" -> "shared-img-1.png")
    const filename = filePath.split('/').pop()!;
    const imageData = base64ToBlob(base64Data);
    publicImagesFolder.file(filename, imageData);
  });
  
  // Add metadata file to src/data/(unit)/
  srcDataFolder.file('index.ts', generateUnitMetadata(unit));
  
  // Add each topic file with rewritten image paths using the deduplication map
  for (let i = 0; i < unit.topics.length; i++) {
    const topic = unit.topics[i];
    const content = generateTopicFileContent(topic, unit.name, true, imagePathMap);
    const filename = `${toSafeName(topic.name)}-questions.ts`;
    srcDataFolder.file(filename, content);
  }
  
  // Add a README for clarity
  const sharedImageNote = imagePathMap.size > 0 
    ? `\n\n**Note:** Images are deduplicated - ${imagePathMap.size} unique image(s) are shared across ${unit.topics.reduce((sum, t) => sum + t.questions.length, 0)} questions.`
    : '';
  
  const readme = `# ${unit.name}

## Folder Structure

This unit export contains:

### src/data/${folderName}/
- \`index.ts\` - Unit metadata with topic list
- \`*-questions.ts\` - Question files for each topic

### public/images/${folderName}/
- Image files referenced by questions
${!hasImages ? '\n(No images in this unit)' : sharedImageNote}

## How to Import

1. Copy \`src/data/${folderName}/\` to your project's \`src/data/\` folder
2. Copy \`public/images/${folderName}/\` to your project's \`public/images/\` folder
3. Import the questions in your code:

\`\`\`typescript
import { unitMetadata } from '@/data/${folderName}';
import { topicNameQuestions } from '@/data/${folderName}/topic-name-questions';
\`\`\`
`;
  zip.file('README.md', readme);
  
  // Generate and download zip
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${folderName}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};

// Helper function to unescape string literals from JSON/TS string format
// CRITICAL: Order matters! We must handle double-backslash FIRST to preserve LaTeX
// For example: "\\theta" in JSON represents the literal string "\theta"
// If we process \\t before \\\\, we'd incorrectly convert it to a tab character
const unescapeString = (str: string): string => {
  // First pass: temporarily replace double-backslashes with a placeholder
  // This prevents \\n from being treated as \n, \\t as \t, etc.
  const PLACEHOLDER = '\x00DOUBLE_BACKSLASH\x00';
  let result = str.replace(/\\\\/g, PLACEHOLDER);
  
  // Second pass: unescape actual escape sequences
  result = result
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\'/g, "'");
  
  // Third pass: restore double-backslashes as single backslashes
  // In JSON/TS: \\\\ (4 chars) represents \\ (2 chars) which is a literal single backslash
  result = result.replace(new RegExp(PLACEHOLDER, 'g'), '\\');
  
  return result;
};

// Helper function to extract string value from a field, handling nested braces in LaTeX
// Handles both TypeScript format (fieldName: "value") and JSON format ("fieldName":"value")
const extractStringField = (content: string, fieldName: string): string | null => {
  // Try TypeScript format first: fieldName: "value"
  let fieldStart = content.indexOf(`${fieldName}:`);
  
  // Try JSON format: "fieldName":"value" or "fieldName": "value"
  if (fieldStart === -1) {
    fieldStart = content.indexOf(`"${fieldName}":`);
    if (fieldStart !== -1) {
      fieldStart += 1; // Move past the opening quote to align with the fieldName
    }
  }
  
  if (fieldStart === -1) return null;
  
  // Find the colon position
  const colonPos = content.indexOf(':', fieldStart);
  if (colonPos === -1) return null;
  
  // Find the quote after the colon (skip whitespace)
  let i = colonPos + 1;
  while (i < content.length && /\s/.test(content[i])) i++;
  
  const quoteChar = content[i];
  if (quoteChar !== '"' && quoteChar !== "'") return null;
  
  // Now find the closing quote, accounting for escaped quotes
  i++;
  let value = '';
  while (i < content.length) {
    if (content[i] === '\\' && i + 1 < content.length) {
      // Escaped character - include both
      value += content[i] + content[i + 1];
      i += 2;
    } else if (content[i] === quoteChar) {
      // Found closing quote - unescape and return
      return unescapeString(value);
    } else {
      value += content[i];
      i++;
    }
  }
  return null;
};

// Helper to extract and parse JSON array for options
const extractOptionsArray = (questionStr: string): { label: string; value: string; text: string; image?: string }[] => {
  // Find options: [ or "options": [
  const optionsMatch = questionStr.match(/["']?options["']?\s*:\s*\[/);
  if (!optionsMatch || optionsMatch.index === undefined) return [];
  
  const startBracket = questionStr.indexOf('[', optionsMatch.index);
  if (startBracket === -1) return [];
  
  // Find matching closing bracket
  let depth = 0;
  let endBracket = -1;
  let inString = false;
  let stringChar = '';
  
  for (let i = startBracket; i < questionStr.length; i++) {
    const char = questionStr[i];
    
    if (inString) {
      if (char === '\\' && i + 1 < questionStr.length) {
        i++; // Skip escaped character
      } else if (char === stringChar) {
        inString = false;
      }
    } else {
      if (char === '"' || char === "'") {
        inString = true;
        stringChar = char;
      } else if (char === '[') {
        depth++;
      } else if (char === ']') {
        depth--;
        if (depth === 0) {
          endBracket = i;
          break;
        }
      }
    }
  }
  
  if (endBracket === -1) return [];
  
  const arrayStr = questionStr.substring(startBracket, endBracket + 1);
  
  // Try to parse as JSON first (for JSON.stringify'd output)
  try {
    const parsed = JSON.parse(arrayStr);
    if (Array.isArray(parsed)) {
      return parsed.filter(opt => opt.label && opt.value && opt.text).map(opt => ({
        label: String(opt.label),
        value: String(opt.value),
        text: String(opt.text),
        ...(opt.image ? { image: String(opt.image) } : {})
      }));
    }
  } catch {
    // Not valid JSON, fall through to manual parsing
  }
  
  // Manual parsing for TypeScript object literal format
  const options: { label: string; value: string; text: string; image?: string }[] = [];
  let optDepth = 0;
  let optObjStart = -1;
  inString = false;
  stringChar = '';
  
  for (let j = 0; j < arrayStr.length; j++) {
    const c = arrayStr[j];
    
    if (inString) {
      if (c === '\\' && j + 1 < arrayStr.length) {
        j++;
      } else if (c === stringChar) {
        inString = false;
      }
    } else {
      if (c === '"' || c === "'") {
        inString = true;
        stringChar = c;
      } else if (c === '[') {
        optDepth++;
      } else if (c === ']') {
        optDepth--;
      } else if (c === '{' && optDepth === 1) {
        optObjStart = j;
      } else if (c === '}' && optDepth === 1 && optObjStart !== -1) {
        const optStr = arrayStr.substring(optObjStart, j + 1);
        const label = extractStringField(optStr, 'label');
        const value = extractStringField(optStr, 'value');
        const text = extractStringField(optStr, 'text');
        const optImage = extractStringField(optStr, 'image');
        
        if (label && value && text) {
          options.push({
            label,
            value,
            text,
            ...(optImage ? { image: optImage } : {}),
          });
        }
        optObjStart = -1;
      }
    }
  }
  
  return options;
};

// Parse a string-array literal that may use either single or double quotes.
// JSON.parse only accepts double quotes, so when an AI (or hand-written file)
// uses ['A','C'] the parse silently fails and answers disappear. This helper
// tries JSON first, then falls back to evaluating the literal with `new Function`
// (which natively understands both quote styles), and finally falls back to a
// regex sweep of every quoted token inside the brackets.
const parseStringArrayLiteral = (raw: string): string[] => {
  if (!raw) return [];
  const trimmed = raw.trim();
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* fall through */ }
  try {
    // eslint-disable-next-line no-new-func
    const parsed = new Function(`return ${trimmed}`)();
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* fall through */ }
  // Last-resort: pull every quoted token out of the brackets
  const out: string[] = [];
  const re = /(["'])((?:\\.|(?!\1).)*)\1/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(trimmed)) !== null) out.push(m[2]);
  return out;
};

// Parse uploaded .ts file content to extract questions
export const parseTopicFile = (content: string): { questions: Question[], mathEnabled: boolean } | null => {
  try {
    // Extract math enabled from comment
    const mathMatch = content.match(/Math Enabled:\s*(true|false)/i);
    const mathEnabled = mathMatch ? mathMatch[1].toLowerCase() === 'true' : false;
    
    // Find the array content between [ and ]
    const arrayMatch = content.match(/:\s*Question\[\]\s*=\s*\[([\s\S]*)\];?\s*$/);
    if (!arrayMatch) return null;
    
    const arrayContent = arrayMatch[1];
    
    // Parse questions using brace-counting approach
    const questions: Question[] = [];
    
    // Find each question object by counting braces
    let depth = 0;
    let start = -1;
    
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      
      // Skip string contents
      if (char === '"' || char === "'") {
        const quoteChar = char;
        i++;
        while (i < arrayContent.length) {
          if (arrayContent[i] === '\\' && i + 1 < arrayContent.length) {
            i += 2; // Skip escaped char
          } else if (arrayContent[i] === quoteChar) {
            break;
          } else {
            i++;
          }
        }
        continue;
      }
      
      if (char === '{') {
        if (depth === 0) start = i;
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0 && start !== -1) {
          const questionStr = arrayContent.substring(start, i + 1);
          
          // Extract fields using our robust string extractor
          const id = extractStringField(questionStr, 'id');
          const type = extractStringField(questionStr, 'type');
          const questionText = extractStringField(questionStr, 'question');
          const correctAnswer = extractStringField(questionStr, 'correctAnswer');
          const explanation = extractStringField(questionStr, 'explanation');
          const image = extractStringField(questionStr, 'image');
          
          if (id && type && questionText) {
            if (type === 'parts') {
              // Extract parts array
              const partsMatch = questionStr.match(/["']?parts["']?\s*:\s*\[/);
              let parts: any[] = [];
              if (partsMatch && partsMatch.index !== undefined) {
                const partsStart = questionStr.indexOf('[', partsMatch.index);
                let pDepth = 0;
                let partsEnd = -1;
                let pInString = false;
                let pStringChar = '';
                for (let pi = partsStart; pi < questionStr.length; pi++) {
                  const pc = questionStr[pi];
                  if (pInString) {
                    if (pc === '\\' && pi + 1 < questionStr.length) { pi++; }
                    else if (pc === pStringChar) { pInString = false; }
                  } else {
                    if (pc === '"' || pc === "'") { pInString = true; pStringChar = pc; }
                    else if (pc === '[') { pDepth++; }
                    else if (pc === ']') { pDepth--; if (pDepth === 0) { partsEnd = pi; break; } }
                  }
                }
                if (partsEnd !== -1) {
                  const partsRaw = questionStr.substring(partsStart, partsEnd + 1);
                  try {
                    parts = JSON.parse(partsRaw);
                  } catch {
                    try {
                      // eslint-disable-next-line no-new-func
                      parts = new Function(`return ${partsRaw}`)();
                      if (!Array.isArray(parts)) parts = [];
                    } catch { parts = []; }
                  }
                }
              }
              const q: Question = {
                id,
                type: 'parts',
                question: questionText,
                parts,
              };
              if (image) q.image = image;
              if (extractStringField(questionStr, 'calculator') === 'true' || questionStr.includes('calculator: true')) {
                q.calculator = true;
              }
              questions.push(q);
            } else if (type === 'free-response') {
              // Extract listAnswers if present
              let listAnswers: string[] | undefined;
              const listMatch = questionStr.match(/["']?listAnswers["']?\s*:\s*\[/);
              if (listMatch && listMatch.index !== undefined) {
                const lStart = questionStr.indexOf('[', listMatch.index);
                let lDepth = 0, lEnd = -1, lInStr = false, lStrChar = '';
                for (let li = lStart; li < questionStr.length; li++) {
                  const lc = questionStr[li];
                  if (lInStr) { if (lc === '\\' && li + 1 < questionStr.length) li++; else if (lc === lStrChar) lInStr = false; }
                  else { if (lc === '"' || lc === "'") { lInStr = true; lStrChar = lc; } else if (lc === '[') lDepth++; else if (lc === ']') { lDepth--; if (lDepth === 0) { lEnd = li; break; } } }
                }
                if (lEnd !== -1) {
                  const arr = parseStringArrayLiteral(questionStr.substring(lStart, lEnd + 1));
                  listAnswers = arr.length > 0 ? arr : undefined;
                }
              }
              
              const q: Question = {
                id,
                type: 'free-response',
                question: questionText,
                correctAnswer: correctAnswer || '',
                explanation: explanation || '',
              };
              if (image) q.image = image;
              if (listAnswers && listAnswers.length > 0) q.listAnswers = listAnswers;
              questions.push(q);
            } else if (correctAnswer && type === 'multiple-choice') {
              const options = extractOptionsArray(questionStr);
              const q: Question = {
                id,
                type: 'multiple-choice',
                question: questionText,
                options,
                correctAnswer,
                explanation: explanation || '',
              };
              if (image) q.image = image;
              questions.push(q);
            } else if (type === 'select-all') {
              const options = extractOptionsArray(questionStr);
              // Extract correctAnswers array
              let correctAnswers: string[] = [];
              const caMatch = questionStr.match(/["']?correctAnswers["']?\s*:\s*\[/);
              if (caMatch && caMatch.index !== undefined) {
                const caStart = questionStr.indexOf('[', caMatch.index);
                let caDepth = 0, caEnd = -1, caInStr = false, caStrChar = '';
                for (let ci = caStart; ci < questionStr.length; ci++) {
                  const cc = questionStr[ci];
                  if (caInStr) { if (cc === '\\' && ci + 1 < questionStr.length) ci++; else if (cc === caStrChar) caInStr = false; }
                  else { if (cc === '"' || cc === "'") { caInStr = true; caStrChar = cc; } else if (cc === '[') caDepth++; else if (cc === ']') { caDepth--; if (caDepth === 0) { caEnd = ci; break; } } }
                }
                if (caEnd !== -1) {
                  const correctAnswers = parseStringArrayLiteral(questionStr.substring(caStart, caEnd + 1));
                }
              }
              const q: Question = {
                id,
                type: 'select-all',
                question: questionText,
                options,
                correctAnswers,
                explanation: explanation || '',
              };
              if (image) q.image = image;
              questions.push(q);
            }
          }
          
          start = -1;
        }
      }
    }
    
    return { questions, mathEnabled };
  } catch (error) {
    console.error('Failed to parse topic file:', error);
    return null;
  }
};

// Parse unit metadata file
export const parseUnitMetadata = (content: string): { 
  name: string; 
  teacherName?: string;
  subject?: string;
  topics: { name: string; file: string; mathEnabled: boolean; testType?: string; testDate?: string }[] 
} | null => {
  try {
    const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
    if (!nameMatch) return null;
    
    // Extract teacher name and subject
    const teacherMatch = content.match(/teacherName:\s*["']([^"']+)["']/);
    const subjectMatch = content.match(/subject:\s*["']([^"']+)["']/);
    
    const topicsMatch = content.match(/topics:\s*\[([\s\S]*?)\]/);
    if (!topicsMatch) return { 
      name: nameMatch[1], 
      teacherName: teacherMatch?.[1],
      subject: subjectMatch?.[1],
      topics: [] 
    };
    
    const topics: { name: string; file: string; mathEnabled: boolean; testType?: string; testDate?: string }[] = [];
    const topicRegex = /\{[^{}]+\}/g;
    const topicMatches = topicsMatch[1].match(topicRegex);
    
    if (topicMatches) {
      for (const match of topicMatches) {
        const tNameMatch = match.match(/name:\s*["']([^"']+)["']/);
        const tFileMatch = match.match(/file:\s*["']([^"']+)["']/);
        const tMathMatch = match.match(/mathEnabled:\s*(true|false)/);
        const tTestTypeMatch = match.match(/testType:\s*["']([^"']+)["']/);
        const tTestDateMatch = match.match(/testDate:\s*["']([^"']+)["']/);
        
        if (tNameMatch && tFileMatch) {
          topics.push({
            name: tNameMatch[1],
            file: tFileMatch[1],
            mathEnabled: tMathMatch ? tMathMatch[1] === 'true' : false,
            testType: tTestTypeMatch?.[1],
            testDate: tTestDateMatch?.[1],
          });
        }
      }
    }
    
    return { 
      name: nameMatch[1], 
      teacherName: teacherMatch?.[1],
      subject: subjectMatch?.[1],
      topics 
    };
  } catch (error) {
    console.error('Failed to parse unit metadata:', error);
    return null;
  }
};
