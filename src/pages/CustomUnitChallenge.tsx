import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, Wrench, Target } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import useCustomUnits from '@/hooks/useCustomUnits';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { buildRouteKey, hasInProgressQuiz } from '@/utils/inProgressQuizStorage';

const CustomUnitChallenge = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { data, isLoaded } = useCustomUnits();
  const { getAllWrongQuestionsForSubject, getWrongAnswerCount } = useWrongAnswers();

  const unit = data.units.find(u => u.id === unitId);
  const subjectKey = `custom-${unitId || ''}`;

  const wrongCount = getWrongAnswerCount(subjectKey);
  const wrongAnswers = getAllWrongQuestionsForSubject(subjectKey);

  const canResumeCram = hasInProgressQuiz(buildRouteKey(subjectKey, 'challenge', 'cram'));

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
          <Link to="/category/custom" className="inline-block mb-6">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-2">Custom unit not found</h1>
            <p className="text-muted-foreground">This unit may have been deleted.</p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const topicIds = unit.topics.map(t => t.id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Link to="/category/custom" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Custom Units
          </Button>
        </Link>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{unit.name} — Course Challenge</h1>
          <p className="text-muted-foreground">
            {unit.teacherName} • {unit.subject} • {unit.topics.length} topic{unit.topics.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(`/quiz/${subjectKey}/challenge/cram`, {
              state: {
                selectedUnits: topicIds,
                startNewAttempt: true,
              },
            })
          }
          className="w-full"
          size="lg"
          disabled={topicIds.length === 0}
        >
          <Trophy className="mr-2 h-4 w-4" />
          Cram Mode (All Topics)
        </Button>

        {canResumeCram && (
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => navigate(`/quiz/${subjectKey}/challenge/cram`)}
          >
            Resume last Cram Mode
          </Button>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Link to={`/custom-unit/${unit.id}/preset-builder`} className="block">
            <Card className="p-6 cursor-pointer hover:border-primary transition-all h-full">
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Build Custom Practice</h3>
                  <p className="text-sm text-muted-foreground">Select specific questions from any topic</p>
                </div>
              </div>
            </Card>
          </Link>

          {wrongCount > 0 && (
            <Card
              className="p-6 cursor-pointer hover:border-destructive transition-all border-destructive/50"
              onClick={() =>
                navigate(`/quiz/${subjectKey}/targeted/cram`, {
                  state: { wrongQuestions: wrongAnswers, startNewAttempt: true },
                })
              }
            >
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-semibold">Targeted Practice</h3>
                  <p className="text-sm text-muted-foreground">Review {wrongCount} questions you got wrong</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomUnitChallenge;
