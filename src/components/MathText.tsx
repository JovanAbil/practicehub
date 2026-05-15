import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/contrib/mhchem';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  children: string | number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  enableChemistry?: boolean; // deprecated, kept for backwards compat but no longer used
}

const MathText = ({ children, className = '', tag = 'span' }: MathTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Convert escaped newlines (\\n in source) to actual newlines before processing
      let processed = String(children).replace(/\\n/g, '\n');

      // Handle escaped dollar signs (literal $) - replace with placeholder
      const DOLLAR_PLACEHOLDER = '__ESCAPED_DOLLAR__';
      processed = processed.replace(/\\\$/g, DOLLAR_PLACEHOLDER);

      const parts = processed.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/);

      containerRef.current.innerHTML = '';

      parts.forEach(part => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const span = document.createElement('span');
          span.className = 'math-display';
          try {
            katex.render(part.slice(2, -2), span, {
              displayMode: true,
              throwOnError: false,
              strict: false,
            });
          } catch {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const span = document.createElement('span');
          span.className = 'math-inline';
          try {
            katex.render(part.slice(1, -1), span, {
              displayMode: false,
              throwOnError: false,
              strict: false,
            });
          } catch {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else if (part) {
          // Restore escaped dollar signs in plain text
          const restored = part.replace(/__ESCAPED_DOLLAR__/g, '$');
          // Handle line breaks by splitting on \n and inserting <br> elements
          const lines = restored.split('\n');
          lines.forEach((line, index) => {
            if (line) {
              containerRef.current?.appendChild(document.createTextNode(line));
            }
            // Add <br> between lines (not after the last one)
            if (index < lines.length - 1) {
              containerRef.current?.appendChild(document.createElement('br'));
            }
          });
        }
      });
    }
  }, [children]);

  const Tag = tag as any;
  return <Tag ref={containerRef} className={className} />;
};

export default MathText;
