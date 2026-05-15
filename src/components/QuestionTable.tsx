import { TableData } from '@/types/quiz';
import MathText from '@/components/MathText';

interface QuestionTableProps {
  data: TableData;
  enableChemistry?: boolean;
}

const QuestionTable = ({ data, enableChemistry = false }: QuestionTableProps) => {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border-2 border-border rounded-lg">
        <thead>
          <tr className="bg-muted">
            {data.headers.map((header, index) => (
              <MathText
                key={index}
                tag="th"
                className="px-4 py-3 text-left text-sm font-semibold border-b-2 border-border"
                enableChemistry={enableChemistry}
              >
                {header}
              </MathText>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border">
              {row.map((cell, cellIndex) => (
                <MathText
                  key={cellIndex}
                  tag="td"
                  className="px-4 py-3 text-sm"
                  enableChemistry={enableChemistry}
                >
                  {cell}
                </MathText>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
