import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp, CornerDownLeft } from 'lucide-react';

interface MathQuickInputProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  useUnicode?: boolean; // If true, insert unicode symbols instead of LaTeX
  defaultOpen?: boolean;
}

const symbols = [
  { label: '∞', latex: '\\infty', unicode: '∞', tooltip: 'Infinity' },
  { label: 'π', latex: '\\pi', unicode: 'π', tooltip: 'Pi' },
  { label: '°', latex: '^\\circ', unicode: '°', tooltip: 'Degrees' },
  { label: '≤', latex: '\\leq', unicode: '≤', tooltip: 'Less than or equal' },
  { label: '≥', latex: '\\geq', unicode: '≥', tooltip: 'Greater than or equal' },
  { label: '≠', latex: '\\neq', unicode: '≠', tooltip: 'Not equal' },
  { label: '±', latex: '\\pm', unicode: '±', tooltip: 'Plus/Minus' },
  { label: '×', latex: '\\times', unicode: '×', tooltip: 'Multiply' },
  { label: '÷', latex: '\\div', unicode: '÷', tooltip: 'Divide' },
  { label: '→', latex: '\\to', unicode: '→', tooltip: 'Right arrow' },
  { label: '←', latex: '\\leftarrow', unicode: '←', tooltip: 'Left arrow' },
  { label: '↑', latex: '\\uparrow', unicode: '↑', tooltip: 'Up arrow' },
  { label: '↓', latex: '\\downarrow', unicode: '↓', tooltip: 'Down arrow' },
  { label: '↔', latex: '\\leftrightarrow', unicode: '↔', tooltip: 'Left-right arrow' },
  { label: '⇌', latex: '\\rightleftharpoons', unicode: '⇌', tooltip: 'Equilibrium arrow' },
  { label: '∈', latex: '\\in', unicode: '∈', tooltip: 'Element of' },
  { label: '∪', latex: '\\cup', unicode: '∪', tooltip: 'Union' },
  { label: '∩', latex: '\\cap', unicode: '∩', tooltip: 'Intersection' },
  { label: 'θ', latex: '\\theta', unicode: 'θ', tooltip: 'Theta' },
  { label: 'α', latex: '\\alpha', unicode: 'α', tooltip: 'Alpha' },
  { label: 'β', latex: '\\beta', unicode: 'β', tooltip: 'Beta' },
  { label: 'Δ', latex: '\\Delta', unicode: 'Δ', tooltip: 'Delta' },
  { label: 'Σ', latex: '\\sum', unicode: 'Σ', tooltip: 'Summation' },
  { label: '∫', latex: '\\int', unicode: '∫', tooltip: 'Integral' },
];

const spanishAccents = [
  { label: 'á', unicode: 'á', tooltip: 'a with accent' },
  { label: 'é', unicode: 'é', tooltip: 'e with accent' },
  { label: 'í', unicode: 'í', tooltip: 'i with accent' },
  { label: 'ó', unicode: 'ó', tooltip: 'o with accent' },
  { label: 'ú', unicode: 'ú', tooltip: 'u with accent' },
  { label: 'ñ', unicode: 'ñ', tooltip: 'n with tilde' },
  { label: '¿', unicode: '¿', tooltip: 'Inverted question mark' },
  { label: '¡', unicode: '¡', tooltip: 'Inverted exclamation' },
  { label: 'ü', unicode: 'ü', tooltip: 'u with diaeresis' },
];

const mathFunctions = [
  { label: '√', latex: '\\sqrt{}', unicode: '√()', cursorOffset: -1, tooltip: 'Square root (type sqrt)' },
  { label: '∛', latex: '\\sqrt[3]{}', unicode: '∛()', cursorOffset: -1, tooltip: 'Cube root (type cbrt)' },
  { label: 'ⁿ√', latex: '\\sqrt[n]{}', unicode: 'ⁿ√()', cursorOffset: -1, tooltip: 'Nth root (type nrt)' },
  { label: 'x²', latex: '^{2}', unicode: '²', cursorOffset: 0, tooltip: 'Superscript (type ^ + space)' },
  { label: 'xₙ', latex: '_{}', unicode: '₍₎', cursorOffset: -1, tooltip: 'Subscript (type _ + space)' },
  { label: 'a/b', latex: '\\frac{}{}', unicode: '/', cursorOffset: 0, tooltip: 'Fraction (type /)' },
  { label: 'lim', latex: '\\lim_{x \\to }', unicode: 'lim(x→)', cursorOffset: -1, tooltip: 'Limit (type lim)' },
  { label: 'ln', latex: '\\ln', unicode: 'ln', cursorOffset: 0, tooltip: 'Natural log (type ln)' },
  { label: 'sin', latex: '\\sin', unicode: 'sin', cursorOffset: 0, tooltip: 'Sine' },
  { label: 'cos', latex: '\\cos', unicode: 'cos', cursorOffset: 0, tooltip: 'Cosine' },
  { label: 'tan', latex: '\\tan', unicode: 'tan', cursorOffset: 0, tooltip: 'Tangent' },
  { label: 'sin⁻¹', latex: '\\sin^{-1}', unicode: 'sin⁻¹', cursorOffset: 0, tooltip: 'Inverse sine' },
  { label: 'cos⁻¹', latex: '\\cos^{-1}', unicode: 'cos⁻¹', cursorOffset: 0, tooltip: 'Inverse cosine' },
  { label: 'tan⁻¹', latex: '\\tan^{-1}', unicode: 'tan⁻¹', cursorOffset: 0, tooltip: 'Inverse tangent' },
  { label: '|x|', latex: '|x|', unicode: '|x|', cursorOffset: -1, tooltip: 'Absolute value' },
  { label: 'eˣ', latex: 'e^{}', unicode: 'e^()', cursorOffset: -1, tooltip: 'Exponential (type exp)' },
];

// Desmos-like keyboard shortcuts - trigger on space
// Use word boundary (?:^|[^a-zA-Z]) to ensure shortcuts only match standalone words
const keyboardShortcuts: { pattern: RegExp; latexReplacement: string; unicodeReplacement: string; cursorOffset: number; originalText: string }[] = [
  { pattern: /(?:^|[^a-zA-Z])sqrt$/i, latexReplacement: '\\sqrt{}', unicodeReplacement: '√()', cursorOffset: 0, originalText: 'sqrt' },
  { pattern: /(?:^|[^a-zA-Z])cbrt$/i, latexReplacement: '\\sqrt[3]{}', unicodeReplacement: '∛()', cursorOffset: 0, originalText: 'cbrt' },
  { pattern: /(?:^|[^a-zA-Z])nrt$/i, latexReplacement: '\\sqrt[n]{}', unicodeReplacement: 'ⁿ√()', cursorOffset: 0, originalText: 'nrt' },
  { pattern: /(?:^|[^a-zA-Z])lim$/i, latexReplacement: '\\lim_{x \\to }', unicodeReplacement: 'lim(x→)', cursorOffset: 0, originalText: 'lim' },
  { pattern: /(?:^|[^a-zA-Z])ln$/i, latexReplacement: '\\ln()', unicodeReplacement: 'ln()', cursorOffset: 0, originalText: 'ln' },
  { pattern: /(?:^|[^a-zA-Z])exp$/i, latexReplacement: 'e^{}', unicodeReplacement: 'e^()', cursorOffset: 0, originalText: 'exp' },
  { pattern: /(?:^|[^a-zA-Z])inf$/i, latexReplacement: '\\infty', unicodeReplacement: '∞', cursorOffset: 0, originalText: 'inf' },
  { pattern: /(?:^|[^a-zA-Z])pi$/i, latexReplacement: '\\pi', unicodeReplacement: 'π', cursorOffset: 0, originalText: 'pi' },
  { pattern: /(?:^|[^a-zA-Z])theta$/i, latexReplacement: '\\theta', unicodeReplacement: 'θ', cursorOffset: 0, originalText: 'theta' },
  { pattern: /(?:^|[^a-zA-Z])alpha$/i, latexReplacement: '\\alpha', unicodeReplacement: 'α', cursorOffset: 0, originalText: 'alpha' },
  { pattern: /(?:^|[^a-zA-Z])beta$/i, latexReplacement: '\\beta', unicodeReplacement: 'β', cursorOffset: 0, originalText: 'beta' },
  { pattern: /(?:^|[^a-zA-Z])delta$/i, latexReplacement: '\\Delta', unicodeReplacement: 'Δ', cursorOffset: 0, originalText: 'delta' },
  { pattern: /(?:^|[^a-zA-Z])sum$/i, latexReplacement: '\\sum_{}^{}', unicodeReplacement: 'Σ', cursorOffset: 0, originalText: 'sum' },
  { pattern: /(?:^|[^a-zA-Z])int$/i, latexReplacement: '\\int_{}^{}', unicodeReplacement: '∫', cursorOffset: 0, originalText: 'int' },
  { pattern: /(?:^|[^a-zA-Z])pm$/i, latexReplacement: '\\pm', unicodeReplacement: '±', cursorOffset: 0, originalText: 'pm' },
  { pattern: /(?:^|[^a-zA-Z])neq$/i, latexReplacement: '\\neq', unicodeReplacement: '≠', cursorOffset: 0, originalText: 'neq' },
  { pattern: /(?:^|[^a-zA-Z])leq$/i, latexReplacement: '\\leq', unicodeReplacement: '≤', cursorOffset: 0, originalText: 'leq' },
  { pattern: /(?:^|[^a-zA-Z])geq$/i, latexReplacement: '\\geq', unicodeReplacement: '≥', cursorOffset: 0, originalText: 'geq' },
  { pattern: /->$/i, latexReplacement: '\\to', unicodeReplacement: '→', cursorOffset: 0, originalText: '->' },
];

// Immediate shortcuts - these trigger right away without space
const immediateShortcuts: { key: string; latexReplacement: string; unicodeReplacement: string; cursorOffset: number }[] = [
  { key: '^', latexReplacement: '^{}', unicodeReplacement: '^()', cursorOffset: 0 },
  { key: '_', latexReplacement: '_{}', unicodeReplacement: '₍₎', cursorOffset: 0 },
];

// Patterns to detect and remove on backspace (LaTeX commands with their braces)
const latexRemovalPatterns = [
  { pattern: /\\frac\{\}\{\}$/, length: 10 },
  { pattern: /\\frac\{[^}]*\}\{\}$/, getLength: (match: string) => match.length },
  { pattern: /\\sqrt\{\}$/, length: 7 },
  { pattern: /\\sqrt\[[^\]]*\]\{\}$/, getLength: (match: string) => match.length },
  { pattern: /\\lim_\{x \\to \}$/, length: 13 },
  { pattern: /\\ln\(\)$/, length: 5 },
  { pattern: /\\sum_\{\}\^\{\}$/, length: 11 },
  { pattern: /\\int_\{\}\^\{\}$/, length: 11 },
  { pattern: /e\^\{\}$/, length: 4 },
  { pattern: /\^\{\}$/, length: 3 },
  { pattern: /_\{\}$/, length: 3 },
  { pattern: /\^\(\)$/, length: 3 },
  { pattern: /₍₎$/, length: 2 },
  { pattern: /√\(\)$/, length: 3 },
  { pattern: /∛\(\)$/, length: 3 },
  { pattern: /ⁿ√\(\)$/, length: 4 },
  { pattern: /e\^\(\)$/, length: 4 },
  { pattern: /lim\(x→\)$/, length: 7 },
  { pattern: /ln\(\)$/, length: 4 },
];

// Track last replacement for undo functionality
interface LastReplacement {
  originalText: string;
  replacement: string;
  position: number;
}

const MathQuickInput = ({ textareaRef, inputRef, value, onChange, useUnicode = false, defaultOpen = false }: MathQuickInputProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const lastReplacementRef = useRef<LastReplacement | null>(null);
  
  // Support both textarea and input elements
  const getElement = () => textareaRef?.current || inputRef?.current;

  const insertAtCursor = (latex: string, unicode: string, cursorOffset: number = 0) => {
    const element = getElement();
    if (!element) return;

    const textToInsert = useUnicode ? unicode : latex;
    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;
    const newValue = value.substring(0, start) + textToInsert + value.substring(end);
    onChange(newValue);

    // Clear last replacement since this is a button insert
    lastReplacementRef.current = null;

    // Set cursor position after insert
    setTimeout(() => {
      const newPos = start + textToInsert.length + cursorOffset;
      element.setSelectionRange(newPos, newPos);
      element.focus();
    }, 0);
  };

  const insertNewLine = () => {
    const element = getElement();
    if (!element) return;

    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;
    const newValue = value.substring(0, start) + '\n' + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      const newPos = start + 1;
      element.setSelectionRange(newPos, newPos);
      element.focus();
    }, 0);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const element = getElement();
    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const cursorPos = element.selectionStart || 0;
      const textBeforeCursor = value.substring(0, cursorPos);

      // Handle immediate shortcuts (/, ^, _) - no space needed
      for (const shortcut of immediateShortcuts) {
        if (e.key === shortcut.key) {
          e.preventDefault();
          const replacement = useUnicode ? shortcut.unicodeReplacement : shortcut.latexReplacement;
          const newValue = 
            value.substring(0, cursorPos) + 
            replacement + 
            value.substring(cursorPos);
          onChange(newValue);
          
          setTimeout(() => {
            const newPos = cursorPos + replacement.length + shortcut.cursorOffset;
            element.setSelectionRange(newPos, newPos);
            element.focus();
          }, 0);
          return;
        }
      }

      // Handle backspace to remove LaTeX patterns
      if (e.key === 'Backspace') {
        // Check for LaTeX patterns to remove
        for (const removal of latexRemovalPatterns) {
          const match = textBeforeCursor.match(removal.pattern);
          if (match) {
            e.preventDefault();
            const matchLength = removal.getLength ? removal.getLength(match[0]) : removal.length;
            const newValue = 
              value.substring(0, cursorPos - matchLength) + 
              value.substring(cursorPos);
            onChange(newValue);
            
            setTimeout(() => {
              const newPos = cursorPos - matchLength;
              element.setSelectionRange(newPos, newPos);
              element.focus();
            }, 0);
            return;
          }
        }
        
        // Also check for space-based shortcut undo
        if (lastReplacementRef.current) {
          const { originalText, replacement, position } = lastReplacementRef.current;
          const expectedEnd = position + replacement.length;
          
          // Check if cursor is right after the replacement
          if (cursorPos === expectedEnd && value.substring(position, expectedEnd) === replacement) {
            e.preventDefault();
            const newValue = 
              value.substring(0, position) + 
              originalText + 
              value.substring(expectedEnd);
            onChange(newValue);
            
            // Clear the undo state
            lastReplacementRef.current = null;
            
            setTimeout(() => {
              const newPos = position + originalText.length;
              element.setSelectionRange(newPos, newPos);
              element.focus();
            }, 0);
            return;
          }
          // If cursor moved elsewhere, clear undo state
          lastReplacementRef.current = null;
        }
      }

      // Check for word-based shortcuts on space
      if (e.key === ' ') {
        for (const shortcut of keyboardShortcuts) {
          if (shortcut.pattern.test(textBeforeCursor)) {
            e.preventDefault();
            const match = textBeforeCursor.match(shortcut.pattern);
            if (match) {
              const matchStart = cursorPos - match[0].length;
              const replacement = useUnicode ? shortcut.unicodeReplacement : shortcut.latexReplacement;
              const newValue = 
                value.substring(0, matchStart) + 
                replacement + 
                value.substring(cursorPos);
              onChange(newValue);
              
              // Store for undo
              lastReplacementRef.current = {
                originalText: shortcut.originalText,
                replacement: replacement,
                position: matchStart,
              };
              
              setTimeout(() => {
                const newPos = matchStart + replacement.length + shortcut.cursorOffset;
                element.setSelectionRange(newPos, newPos);
                element.focus();
              }, 0);
            }
            return;
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [value, onChange, textareaRef, inputRef, useUnicode]);

  return (
    <TooltipProvider>
      <div className="mt-2">
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full py-2"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span>Math symbols & shortcuts</span>
        </button>

        {/* Collapsible content */}
        {isOpen && (
          <div className="p-3 bg-muted/50 rounded-lg border space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">Quick Math:</span>
              <span>Type <code className="px-1 bg-muted rounded">/</code>, <code className="px-1 bg-muted rounded">^</code>, <code className="px-1 bg-muted rounded">_</code> for instant formatting. Type <code className="px-1 bg-muted rounded">sqrt</code>, <code className="px-1 bg-muted rounded">lim</code>, <code className="px-1 bg-muted rounded">inf</code> + Space. Backspace removes whole commands.</span>
            </div>

            {/* New Line button */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Formatting</span>
              <div className="flex flex-wrap gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 text-sm font-normal flex items-center gap-1"
                      onClick={insertNewLine}
                    >
                      <CornerDownLeft className="h-4 w-4" />
                      New Line
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Insert a line break (forces next content to new line)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Symbols row */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Symbols</span>
              <div className="flex flex-wrap gap-1">
                {symbols.map((sym) => (
                  <Tooltip key={sym.label}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-base font-normal"
                        onClick={() => insertAtCursor(sym.latex, sym.unicode)}
                      >
                        {sym.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{sym.tooltip}</p>
                      {!useUnicode && <code className="text-xs text-muted-foreground">{sym.latex}</code>}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Spanish Accents row */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Spanish / Accents</span>
              <div className="flex flex-wrap gap-1">
                {spanishAccents.map((sym) => (
                  <Tooltip key={sym.label}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-base font-normal"
                        onClick={() => insertAtCursor(sym.unicode, sym.unicode)}
                      >
                        {sym.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{sym.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Math functions row */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Functions</span>
              <div className="flex flex-wrap gap-1">
                {mathFunctions.map((func) => (
                  <Tooltip key={func.label}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-sm font-normal"
                        onClick={() => insertAtCursor(func.latex, func.unicode, func.cursorOffset)}
                      >
                        {func.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{func.tooltip}</p>
                      {!useUnicode && <code className="text-xs text-muted-foreground">{func.latex}</code>}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-0.5">
              <p><kbd className="px-1 bg-muted rounded">/</kbd> fraction, <kbd className="px-1 bg-muted rounded">^</kbd> superscript, <kbd className="px-1 bg-muted rounded">_</kbd> subscript (instant)</p>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MathQuickInput;