import MathText from '@/components/MathText';

/**
 * PiecewiseFunction renders a piecewise function with a proper left brace and
 * aligned (expression | condition) rows, rather than relying on plain text.
 *
 * Two ways to use it:
 *
 * 1) From a question file, write a `[[piecewise]]` block inside the question
 *    string and render the question with <PiecewiseAwareText>. Example:
 *
 *      "Let $f(x) =$ [[piecewise|x^2 : x < 0|2x+1 : 0 \\leq x \\leq 3|9 : x > 3]]"
 *
 * 2) Use the component directly:
 *
 *      <PiecewiseFunction
 *        name="f(x)"
 *        pieces={[
 *          { expr: 'x^2',     when: 'x < 0' },
 *          { expr: '2x + 1',  when: '0 \\leq x \\leq 3' },
 *          { expr: '9',       when: 'x > 3' },
 *        ]}
 *      />
 */

export interface PiecewisePiece {
  expr: string;   // LaTeX (no surrounding $)
  when: string;   // LaTeX condition (no surrounding $)
}

interface PiecewiseFunctionProps {
  name?: string;            // e.g. "f(x)"  -- rendered to the left of the brace
  pieces: PiecewisePiece[];
  className?: string;
}

const PiecewiseFunction = ({ name, pieces, className = '' }: PiecewiseFunctionProps) => {
  if (!pieces || pieces.length === 0) return null;

  // Build a single KaTeX cases environment so spacing/alignment is correct
  const body = pieces
    .map(p => `${p.expr} & \\text{if } ${p.when}`)
    .join(' \\\\ ');

  const latex = name
    ? `$$${name} = \\begin{cases} ${body} \\end{cases}$$`
    : `$$\\begin{cases} ${body} \\end{cases}$$`;

  return (
    <span className={`inline-block align-middle ${className}`}>
      <MathText>{latex}</MathText>
    </span>
  );
};

export default PiecewiseFunction;

/**
 * Parse a [[piecewise|name|expr1 : cond1|expr2 : cond2|...]] token.
 * Returns null if the input isn't a piecewise token.
 *
 * Accepted forms:
 *   [[piecewise|x^2 : x<0|2x : x>=0]]              (no name)
 *   [[piecewise|f(x)|x^2 : x<0|2x : x>=0]]         (with name, if the first
 *                                                   segment contains no ":")
 */
export const parsePiecewiseToken = (token: string): { name?: string; pieces: PiecewisePiece[] } | null => {
  const m = token.match(/^\[\[piecewise\|([\s\S]+?)\]\]$/);
  if (!m) return null;
  const parts = m[1].split('|').map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) return null;

  let name: string | undefined;
  let pieceStrings = parts;
  if (!parts[0].includes(':')) {
    name = parts[0];
    pieceStrings = parts.slice(1);
  }

  const pieces: PiecewisePiece[] = pieceStrings.map(seg => {
    const idx = seg.indexOf(':');
    if (idx === -1) return { expr: seg, when: '' };
    return { expr: seg.slice(0, idx).trim(), when: seg.slice(idx + 1).trim() };
  });
  return { name, pieces };

  export const PiecewiseAwareText = ({
    text,
    tag = 'span',
    className = '',
    enableChemistry = false,
  }: {
    text: string;
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    enableChemistry?: boolean;
  }) => {
    if (!text.includes('[[piecewise')) {
      return <MathText tag={tag} className={className} enableChemistry={enableChemistry}>{text}</MathText>;
    }
    const segments = text.split(/(\[\[piecewise\|[\s\S]+?\]\])/g);
    const Tag = tag as any;
    return (
      <Tag className={className}>
        {segments.map((seg, i) => {
          const parsed = parsePiecewiseToken(seg);
          if (parsed) return <PiecewiseFunction key={i} name={parsed.name} pieces={parsed.pieces} />;
          return <MathText key={i} enableChemistry={enableChemistry}>{seg}</MathText>;
        })}
      </Tag>
    );
  };
};
