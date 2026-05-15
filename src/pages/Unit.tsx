import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen, FileText, Brain, ExternalLink } from 'lucide-react';
import { unitStudyResources } from '@/data/study-resources';

const Unit = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();

  // Get study resources for this unit
  const resourceKey = `${subject}-${unitId}`;
  const studyResources = unitStudyResources[resourceKey] || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-3 text-primary">
            {unitId?.toUpperCase()}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Choose your practice mode
          </p>

          {/* Study Resources Section */}
          {studyResources.length > 0 && (
            <Card className="mb-8 p-6 bg-muted/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Helpful Study Resources
              </h3>
              <div className="space-y-2">
                {studyResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {resource.title}
                  </a>
                ))}
              </div>
            </Card>
          )}

          <div className="grid gap-6">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary"
                  onClick={() => navigate(`/unit/${subject}/${unitId}/quiz/daily`)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <BookOpen className="h-8 w-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Daily Practice</h3>
                  <p className="text-muted-foreground mb-4">
                    Quick practice session with 10 carefully selected questions
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ ~15 minutes</span>
                    <span>📝 10 questions</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-accent"
                  onClick={() => navigate(`/unit/${subject}/${unitId}/quiz/full`)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Full Test</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive assessment covering all topics in this unit
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ ~45 minutes</span>
                    <span>📝 {subject === 'biology' ? '25' : '30'} questions</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary"
                  onClick={() => navigate(`/unit/${subject}/${unitId}/quiz/cram`)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Cram Study</h3>
                  <p className="text-muted-foreground mb-4">
                    Practice ALL available questions from this unit - perfect for last-minute studying
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ Variable</span>
                    <span>📝 All questions</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unit;
