import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Eye, Brain, Settings } from 'lucide-react';
import { isTestsAuthenticated } from '@/pages/PasswordPage';
import { testsQuestionMap } from '@/data/real-tests/testsQuestionLoader';
import { Footer } from '@/components/Footer';

const TestsUnitDetail = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTestsAuthenticated()) {
      navigate('/password', { replace: true });
    }
  }, [navigate]);

  if (!isTestsAuthenticated()) {
    return null;
  }

  const questionKey = `${subject}-${unitId}`;
  const questions = testsQuestionMap[questionKey] || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Link to="/tests" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tests
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-center mb-3 text-primary font-display">
            {unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <p className="text-center text-muted-foreground mb-2">{questions.length} questions available</p>
          <p className="text-center text-muted-foreground mb-8 text-sm">Choose your practice mode</p>

          {/* View All Questions */}
          <Link to={`/tests/view-all/${subject}/${unitId}?source=tests`} className="block">
            <Card className="p-6 mb-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent group bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/20 rounded-lg"><Eye className="h-8 w-8 text-accent" /></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">View All Questions</h3>
                  <p className="text-muted-foreground text-sm">Browse all questions with their IDs</p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Practice Modes */}
          <h2 className="text-2xl font-display font-bold mb-4 mt-8">Practice Modes</h2>
          
          <Link to={`/tests/quiz/${subject}/${unitId}/cram?source=tests`} className="block">
            <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg"><Brain className="h-8 w-8 text-primary" /></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Cram Study</h3>
                  <p className="text-muted-foreground mb-4">Practice ALL questions</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ Variable</span><span>📝 {questions.length} questions</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          {/* Preset Builder link — uses the same main-site preset builder via tests routes */}
          <Link to={`/unit/${subject}/${unitId}/preset-builder?source=tests`} className="block">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-secondary group bg-secondary/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/20 rounded-lg"><Settings className="h-8 w-8 text-secondary-foreground" /></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Custom Preset</h3>
                  <p className="text-muted-foreground text-sm">Build a custom quiz by selecting specific questions</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
      <div className="h-48" aria-hidden="true" />
      <Footer />
    </div>
  );
};

export default TestsUnitDetail;
