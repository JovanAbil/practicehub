import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FlaskConical, Landmark, ArrowRight, Brain } from 'lucide-react';
import { isTestsAuthenticated } from '@/pages/PasswordPage';
import { testsCategories, testsQuestionMap } from '@/data/real-tests/testsQuestionLoader';
import { Footer } from '@/components/Footer';

const TestsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTestsAuthenticated()) {
      navigate('/password', { replace: true });
    }
  }, [navigate]);

  if (!isTestsAuthenticated()) {
    return null;
  }

  const getIcon = (categoryId: string) => {
    if (categoryId === 'world-history') return Landmark;
    return FlaskConical;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-display font-bold text-primary mb-8 text-center">
          Real Tests
        </h1>

        {testsCategories.map((category) => {
          const Icon = getIcon(category.id);
          const totalQuestions = category.units.reduce((sum, unit) => {
            const questions = testsQuestionMap[`${category.id}-${unit.id}`] || [];
            return sum + questions.length;
          }, 0);

          return (
            <div key={category.id} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-${category.color}/10`}>
                    <Icon className={`w-5 h-5 text-${category.color}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">{category.name}</h2>
                    <p className="text-sm text-muted-foreground">{totalQuestions} total questions</p>
                  </div>
                </div>
                {/* Course Challenge button for each category */}
                <Link to={`/tests/course-challenge/${category.id}`}>
                  <Button variant="outline" size="sm" className={`border-${category.color} text-${category.color} hover:bg-${category.color}/10`}>
                    <Brain className="mr-2 h-4 w-4" />
                    Course Challenge
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.units.map((unit) => {
                  const questions = testsQuestionMap[`${category.id}-${unit.id}`] || [];
                  return (
                    <Link key={unit.id} to={`/tests/unit/${category.id}/${unit.id}`}>
                      <Card className={`p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-${category.color} group h-full`}>
                        <div className="flex flex-col h-full">
                          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {unit.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {questions.length} questions
                          </p>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default TestsPage;
