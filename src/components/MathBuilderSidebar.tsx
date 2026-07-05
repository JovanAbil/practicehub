import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X, Calculator, Info } from 'lucide-react';
import MathText from '@/components/MathText';

interface MathBuilderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (latex: string) => void;
}

interface MathSymbol {
  display: string;
  latex: string;
  name: string;
}

interface MathTemplate {
  name: string;
  description: string;
  // Full text to insert verbatim (NOT wrapped in $...$ by the builder).
  raw: string;
}

interface MathFunction {
  name: string;
  syntax: string;
  example: string;
  template: string;
}

const mathSymbols: MathSymbol[] = [
  { display: '°', latex: '°', name: 'Degrees' },
  { display: '∞', latex: '∞', name: 'Infinity' },
  { display: 'π', latex: 'π', name: 'Pi' },
  { display: '±', latex: '±', name: 'Plus/Minus' },
  { display: '≤', latex: '≤', name: 'Less or Equal' },
  { display: '≥', latex: '≥', name: 'Greater or Equal' },
  { display: '≠', latex: '≠', name: 'Not Equal' },
  { display: '≈', latex: '≈', name: 'Approximately' },
  { display: '√', latex: '√', name: 'Square Root' },
  { display: 'θ', latex: 'θ', name: 'Theta' },
  { display: 'α', latex: 'α', name: 'Alpha' },
  { display: 'β', latex: 'β', name: 'Beta' },
  { display: '→', latex: '→', name: 'Arrow' },
  { display: '∪', latex: '∪', name: 'Union' },
  { display: '∩', latex: '∩', name: 'Intersection' },
  { display: '∈', latex: '∈', name: 'Element of' },
  { display: '〈', latex: '〈', name: 'Vector Left' },
  { display: '〉', latex: '〉', name: 'Vector Right' },
  { display: 'ℝ', latex: '\\mathbb{R}', name: 'All Real Numbers' },
  { display: '⇌', latex: '⇌', name: 'Equilibrium Arrow' },
];

const mathFunctions: MathFunction[] = [
  {
    name: 'Bold',
    syntax: '\\mathbf{variable}',
    example: '\\mathbf{v}',
    template: '\\mathbf{}'
  },
  {
    name: 'Bold Italics',
    syntax: '\\bm{variable}',
    example: '\\bm{v}',
    template: '\\bm{}'
  },
  {
    name: 'Fraction',
    syntax: '\\frac{numerator}{denominator}',
    example: '\\frac{1}{2}',
    template: '\\frac{}{}',
  },
  {
    name: 'Exponent',
    syntax: 'base^{power}',
    example: 'x^{2}',
    template: '^{}',
  },
  {
    name: 'Subscript',
    syntax: 'base_{subscript}',
    example: 'x_{1}',
    template: '_{}',
  },
  {
    name: 'Square Root',
    syntax: '\\sqrt{expression}',
    example: '\\sqrt{x}',
    template: '\\sqrt{}',
  },
  {
    name: 'Nth Root',
    syntax: '\\sqrt[n]{expression}',
    example: '\\sqrt[3]{x}',
    template: '\\sqrt[]{}',
  },
  {
    name: 'Logarithm (base 10)',
    syntax: '\\log(argument)',
    example: '\\log(x)',
    template: '\\log()',
  },
  {
    name: 'Natural Log',
    syntax: '\\ln(argument)',
    example: '\\ln(x)',
    template: '\\ln()',
  },
  {
    name: 'Log with Base',
    syntax: '\\log_{base}(argument)',
    example: '\\log_{2}(x)',
    template: '\\log_{}()',
  },
  {
    name: 'Limit',
    syntax: '\\lim_{x \\to value} expression',
    example: '\\lim_{x \\to \\infty} f(x)',
    template: '\\lim_{x \\to } ',
  },
  {
    name: 'Summation',
    syntax: '\\sum_{i=start}^{end} expression',
    example: '\\sum_{i=1}^{n} i',
    template: '\\sum_{i=}^{} ',
  },
  {
    name: 'Integral',
    syntax: '\\int_{a}^{b} expression \\, dx',
    example: '\\int_{0}^{1} x \\, dx',
    template: '\\int_{}^{} \\, dx',
  },
  {
    name: 'Sine',
    syntax: '\\sin(angle)',
    example: '\\sin(\\theta)',
    template: '\\sin()',
  },
  {
    name: 'Cosine',
    syntax: '\\cos(angle)',
    example: '\\cos(\\theta)',
    template: '\\cos()',
  },
  {
    name: 'Tangent',
    syntax: '\\tan(angle)',
    example: '\\tan(\\theta)',
    template: '\\tan()',
  },
  {
    name: 'Vector (Arrow)',
    syntax: '\\vec{variable}',
    example: '\\vec{v}',
    template: '\\vec{}'
  },
  {
    name: 'Vector (Half Arrow)',
    syntax: '\\overrightharpoon{variable}',
    example: '\\overrightharpoon{v}',
    template: '\\overrightharpoon{}'
  },
  {
    name: 'Vector Hat (Unit Vector)',
    syntax: '\\hat{variable}',
    example: '\\hat{i}',
    template: '\\hat{}'
  },
  {
    name: 'Column Vector (Parentheses)',
    syntax: '\\begin{pmatrix} component1 \\\\ component2 \\end{pmatrix}',
    example: '\\begin{pmatrix} x \\\\ y \\end{pmatrix}',
    template: '\\begin{pmatrix}\n  {} & {}\n  \\\\\n  {} & {}\n\\end{pmatrix}'
  },
  {
    name: 'Column Vector (Brackets)',
    syntax: '\\begin{bmatrix} component1 \\\\ component2 \\end{bmatrix}',
    example: '\\begin{bmatrix} x \\\\ y \\end{bmatrix}',
    template: '\\begin{bmatrix}\n  {} & {}\n  \\\\\n  {} & {}\n\\end{bmatrix}'
  },
  {
    name: 'Parametric or Piecewise',
    syntax: '\\begin{cases} x(t) = ... \\\\ y(t) = ... \\\\ z(t) = ... \\end{cases}',
    example: '\\begin{cases} x(t) = x_0 + at \\\\ y(t) = y_0 + bt \\\\ z(t) = z_0 + ct \\end{cases}',
    template: '\\begin{cases}\n  x(t) = {} \\\\\n  y(t) = {} \\\\\n  z(t) = {}\n\\end{cases}'
  },
  {
    name: 'Parametric (Vector Form)',
    syntax: '\\mathbf{r}(t) = \\langle x(t), y(t) \\rangle',
    example: '\\mathbf{r}(t) = \\langle t, t^2 \\rangle',
    template: '\\mathbf{r}(t) = \\langle {}, {} \\rangle'
  },
];

const mathTemplates: MathTemplate[] = [
  {
    name: 'Piecewise (2 pieces)',
    description: '[[piecewise|f(x)|expr1 : cond1|expr2 : cond2]]',
    raw: '[[piecewise|f(x)|x^2 : x < 0|2x : x \\geq 0]]',
  },
  {
    name: 'Piecewise (3 pieces)',
    description: 'Three-branch piecewise function',
    raw: '[[piecewise|f(x)|x^2 : x < 0|2x+1 : 0 \\leq x \\leq 3|9 : x > 3]]',
  },
  {
    name: 'Piecewise (no name)',
    description: 'Just the cases, no "f(x) =" label',
    raw: '[[piecewise|x : x \\geq 0|-x : x < 0]]',
  },
];

const MathBuilderSidebar = ({ isOpen, onClose, onInsert }: MathBuilderSidebarProps) => {
  const [builderText, setBuilderText] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(384); // 24rem = 384px
  const inputRef = useRef<HTMLInputElement>(null);
  const isResizing = useRef(false);

  // Focus input when sidebar opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = window.innerWidth - e.clientX;
      // Min 320px, max 80% of screen
      const clampedWidth = Math.min(Math.max(newWidth, 320), window.innerWidth * 0.8);
      setSidebarWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResize = () => {
    isResizing.current = true;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  const handleSymbolClick = (symbol: MathSymbol) => {
    setBuilderText(prev => prev + symbol.latex);
    inputRef.current?.focus();
  };

  const handleFunctionClick = (func: MathFunction) => {
    setBuilderText(prev => prev + func.template);
    inputRef.current?.focus();
  };

  const handleTemplateClick = (tpl: MathTemplate) => {
    // Templates like [[piecewise|...]] must NOT be wrapped in $...$ —
    // they are parsed by parsePiecewiseToken in the question renderer.
    onInsert(tpl.raw);
  };
  
  const handleInsert = () => {
    if (builderText.trim()) {
      onInsert(`$${builderText}$`);
      setBuilderText('');
    }
  };

  const handleClear = () => {
    setBuilderText('');
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed right-0 top-0 h-full bg-background border-l shadow-lg z-50 flex flex-col"
      style={{ width: sidebarWidth }}
    >
      {/* Resize Handle */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 cursor-ew-resize hover:bg-primary/30 active:bg-primary/50 transition-colors"
        onMouseDown={startResize}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Math Builder</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Instructions Section */}
        <div className="p-4 bg-muted/50 border-b">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <div className="text-sm space-y-2">
              <p className="font-medium">How to use:</p>
              <p className="text-muted-foreground">
                Math expressions must be enclosed in <code className="bg-muted px-1 py-0.5 rounded text-primary font-mono">$$</code> symbols.
              </p>
              <p className="text-muted-foreground">
                Example: <code className="bg-muted px-1 py-0.5 rounded font-mono">$\frac{"{1}{2}"}$</code> renders as ½
              </p>
              <p className="text-muted-foreground">
                Click symbols or functions below to add them to the builder, then click Insert.
              </p>
              <p className="text-muted-foreground">
                For <strong>piecewise functions</strong>, scroll down to{' '}
                <strong>Special Templates</strong> — those insert a{' '}
                <code className="bg-muted px-1 py-0.5 rounded font-mono">[[piecewise|...]]</code>{' '}
                token that renders as a real <code>{`{`}</code> brace.
              </p>
            </div>
          </div>
        </div>

        {/* Symbols Section */}
        <div className="p-4">
          <Label className="text-sm font-semibold mb-3 block">Symbols</Label>
          <div className="grid grid-cols-4 gap-2">
            {mathSymbols.map((symbol) => (
              <Button
                key={symbol.name}
                variant="outline"
                size="sm"
                className="h-10 text-lg font-mono hover:bg-primary/10 hover:border-primary"
                onClick={() => handleSymbolClick(symbol)}
                title={`${symbol.name}: ${symbol.latex}`}
              >
                {symbol.display}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Math Functions Section */}
        <div className="p-4">
          <Label className="text-sm font-semibold mb-3 block">Math Functions</Label>
          <div className="space-y-2">
            {mathFunctions.map((func) => (
              <Button
                key={func.name}
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-primary/10 hover:border-primary"
                onClick={() => handleFunctionClick(func)}
              >
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <span className="font-medium text-sm">{func.name}</span>
                  <code className="text-xs text-muted-foreground font-mono truncate w-full">
                    {func.syntax}
                  </code>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Special Templates Section */}
        <div className="p-4">
          <Label className="text-sm font-semibold mb-3 block">Special Templates</Label>
          <p className="text-xs text-muted-foreground mb-3">
            These insert a token directly (no <code className="font-mono">$...$</code> wrapping).
            Piecewise tokens are converted to a real <code>cases</code> brace at render time.
          </p>
          <div className="space-y-2">
            {mathTemplates.map((tpl) => (
              <Button
                key={tpl.name}
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-primary/10 hover:border-primary"
                onClick={() => handleTemplateClick(tpl)}
              >
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <span className="font-medium text-sm">{tpl.name}</span>
                  <code className="text-xs text-muted-foreground font-mono truncate w-full">
                    {tpl.description}
                  </code>
                </div>
              </Button>
            ))}
          </div>
        </div>
        
      </ScrollArea>

      {/* Builder Section - Fixed at bottom */}
      <div className="border-t p-4 bg-background space-y-3">
        <Label className="text-sm font-semibold block">Math Builder</Label>
        <div className="space-y-2">
          <Input
            ref={inputRef}
            value={builderText}
            onChange={(e) => setBuilderText(e.target.value)}
            placeholder="Build your math expression here..."
            className="font-mono text-sm"
          />
          <div className="p-2 bg-muted rounded-md min-h-[40px]">
            <p className="text-xs text-muted-foreground mb-1">Text format:</p>
            <code className="text-sm font-mono break-all">
              {builderText ? `$${builderText}$` : 'Empty'}
            </code>
          </div>
          {builderText && (
            <div className="p-3 bg-card border rounded-md min-h-[50px]">
              <p className="text-xs text-muted-foreground mb-2">Rendered preview:</p>
              <div className="text-lg">
                <MathText>{`$${builderText}$`}</MathText>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClear}
            className="flex-1"
          >
            Clear
          </Button>
          <Button 
            size="sm" 
            onClick={handleInsert}
            className="flex-1"
            disabled={!builderText.trim()}
          >
            Insert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MathBuilderSidebar;
