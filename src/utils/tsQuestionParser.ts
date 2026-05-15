import { Question } from '@/types/quiz';

/**
 * Parses a .ts question file and extracts the Question[] array.
 * 
 * Expected format: a file exporting an array of question objects, e.g.:
 *   export const myQuestions: Question[] = [ { id: '...', ... }, ... ];
 * 
 * The parser strips TypeScript-specific syntax (imports, type annotations, `as const`)
 * and evaluates the array content using `new Function()`.
 */
export function parseTsQuestionFile(fileContent: string): { questions: Question[]; error?: string } {
  try {
    // Remove import statements
    let cleaned = fileContent.replace(/^import\s+.*?;?\s*$/gm, '');

    // Remove `export const varName: Type[] =` prefix, keeping just the array
    cleaned = cleaned.replace(
      /export\s+(const|let|var)\s+\w+\s*:\s*\w+(\[])?\s*=\s*/g,
      ''
    );

    // Also bare `export const varName =` (no type annotation)
    cleaned = cleaned.replace(
      /export\s+(const|let|var)\s+\w+\s*=\s*/g,
      ''
    );

    // Also handle `export default`
    cleaned = cleaned.replace(/export\s+default\s+/g, '');

    // Remove trailing semicolons after the array
    cleaned = cleaned.trim().replace(/;\s*$/, '');

    // Remove `as const` annotations
    cleaned = cleaned.replace(/\s+as\s+const/g, '');

    // Find the outermost array brackets
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');

    if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) {
      return { questions: [], error: 'Could not find a question array in the file. Make sure the file exports an array of questions.' };
    }

    const arrayContent = cleaned.substring(firstBracket, lastBracket + 1);

    // The Function constructor evaluates real JS, so it natively supports:
    // - single OR double quoted strings
    // - JSON-style quoted keys ("label": "a")
    // - unquoted keys (label: 'a')
    // - any whitespace / line breaks
    // - mixed pretty-printed and single-line objects
    // eslint-disable-next-line no-new-func
    const parsed = new Function(`return ${arrayContent}`)();

    if (!Array.isArray(parsed)) {
      return { questions: [], error: 'The file did not contain a valid array.' };
    }

    const validQuestions: Question[] = [];
    const issues: string[] = [];

    parsed.forEach((item: any, index: number) => {
      if (!item || typeof item !== 'object') {
        issues.push(`Item ${index + 1}: not an object`);
        return;
      }
      if (!item.id || !item.type || !item.question) {
        issues.push(`Item ${index + 1} (id: ${item.id || 'missing'}) is missing required fields (id, type, question)`);
        return;
      }

      // For parts questions: if `parts` came in as a JSON string, parse it
      if (item.type === 'parts' && typeof item.parts === 'string') {
        try {
          item.parts = JSON.parse(item.parts);
        } catch {
          issues.push(`Item ${index + 1} (id: ${item.id}): parts field is a string but not valid JSON`);
          return;
        }
      }
      if (item.type === 'parts' && !Array.isArray(item.parts)) {
        issues.push(`Item ${index + 1} (id: ${item.id}): parts question is missing the parts array`);
        return;
      }

      if (item.type === 'parts' && Array.isArray(item.parts)) {
        const invalidPart = item.parts.find((part: any) => {
          if (!part || typeof part !== 'object') return true;
          if (!part.label || !part.type || !part.question) return true;
          if (part.type === 'select-all') {
            return !Array.isArray(part.correctAnswers);
          }
          return typeof part.correctAnswer !== 'string';
        });

        if (invalidPart) {
          issues.push(`Item ${index + 1} (id: ${item.id}): one or more parts are missing required fields`);
          return;
        }
      }

      const q = { ...item, id: `uploaded-${item.id}` };
      validQuestions.push(q as Question);
    });

    if (validQuestions.length === 0) {
      return {
        questions: [],
        error: issues.length > 0
          ? `No valid questions found. Issues:\n${issues.join('\n')}`
          : 'No questions found in the file.',
      };
    }

    // Surface partial-success issues as a non-fatal warning by appending them
    if (issues.length > 0) {
      return {
        questions: validQuestions,
        error: `Imported ${validQuestions.length} questions, but skipped ${issues.length}:\n${issues.join('\n')}`,
      };
    }

    return { questions: validQuestions };
  } catch (err) {
    return {
      questions: [],
      error: `Failed to parse the file: ${err instanceof Error ? err.message : 'Unknown error'}. Common causes: unescaped quotes inside a string, a stray backtick, or a trailing comma in the wrong spot. Check the parts array formatting.`,
    };
  }
}
