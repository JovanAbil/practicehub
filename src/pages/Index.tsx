import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Calculator, BookOpen, FlaskConical, Landmark, Sparkles, ArrowRight, Keyboard, ArrowDown, FolderPlus, ExternalLink, Users, Eye, BarChart3, CalendarDays } from 'lucide-react';
import { externalStudyResources } from '@/data/external-study-resources';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { ContributionReminder } from '@/components/ContributionReminder';
import { SITE_STATS } from '@/data/site-stats';
import { updates } from '@/data/updates';

const categories = [{
  id: 'math',
  name: 'Mathematics',
  description: 'Precalculus, Algebra, and more',
  icon: Calculator,
  color: 'math',
  path: '/category/math'
}, {
  id: 'science',
  name: 'Science',
  description: 'Biology, Chemistry, and more',
  icon: FlaskConical,
  color: 'science',
  path: '/category/science'
}, {
  id: 'social',
  name: 'Social Studies',
  description: 'World History, US History, and more',
  icon: Landmark,
  color: 'social',
  path: '/category/social'
}, {
  id: 'english',
  name: 'English',
  description: 'Literature, Writing, and Language Arts',
  icon: BookOpen,
  color: 'english',
  path: '/category/english'
}, {
  id: 'other',
  name: 'Other',
  description: 'AP CSP, Drivers Ed, and miscellaneous',
  icon: Sparkles,
  color: 'other',
  path: '/category/other'
}, {
  id: 'custom',
  name: 'Custom Units',
  description: 'Create and manage your own question banks',
  icon: FolderPlus,
  color: 'other',
  path: '/category/custom'
}];

const controls = [{
  key: '1-5',
  description: 'Select answer option (1 for first, 2 for second, etc.)'
}, {
  key: 'Enter',
  description: 'Submit answer / Move to next question'
}, {
  key: '← Arrow',
  description: 'Mark free response as incorrect'
}, {
  key: '→ Arrow',
  description: 'Mark free response as correct'
}];

const Index = () => {
  const [showContributionReminder, setShowContributionReminder] = useState(false);
  const latestUpdate = updates[0];

  return <div className="min-h-screen bg-background flex flex-col">
      <ContributionReminder 
        isOpen={showContributionReminder} 
        onClose={() => setShowContributionReminder(false)} 
        cooldownSeconds={5} 
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 
              className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowContributionReminder(true)}
              title="Click to see how you can help!"
            >
              Practice Hub
            </h1>

            {/* Site Stats Summary */}
            <Card className="mb-6 p-4 border-2 border-muted bg-muted/30 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Total Site Stats</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">{SITE_STATS.totalVisitors.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">{SITE_STATS.totalPageviews.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">pageviews</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <p className="text-xs text-muted-foreground/60 text-center">
                  Last updated: {SITE_STATS.lastUpdated}
                </p>
                <span className="text-xs text-muted-foreground/40">•</span>
                <Link to="/data" className="text-xs text-primary hover:underline">
                  View full stats
                </Link>
              </div>
            </Card>

            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              Master your classes with interactive practice tests and daily exercises — built for any school. 
              Choose a subject category to get started.
            </p>

            {/* Latest Update Preview */}
            {latestUpdate && (
              <Link to="/updates" className="block mb-6">
                <Card className="p-4 border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-left max-w-xl mx-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-semibold">{latestUpdate.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto shrink-0">{latestUpdate.date}</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-7">
                    {latestUpdate.items.slice(0, 3).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                    {latestUpdate.items.length > 3 && (
                      <li className="text-primary font-medium">+ {latestUpdate.items.length - 3} more updates →</li>
                    )}
                  </ul>
                </Card>
              </Link>
            )}
            <div className="flex items-center justify-center gap-2 text-primary font-medium animate-bounce">
              <ArrowDown className="h-5 w-5" />
              <span>Scroll down to see how to use the website</span>
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
          const Icon = category.icon;
          return <Link 
              key={category.id} 
              to={category.path}
              className="block"
            >
              <Card 
                className={`group relative overflow-hidden p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-${category.color} animate-fade-in h-full`} 
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${category.color}/10 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 text-${category.color}`} />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className={`flex items-center text-${category.color} font-medium`}>
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>;
        })}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-science/5 border-science/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-science">📚 Cram Study</h3>
              <p className="text-sm text-muted-foreground">Practice ALL questions in a unit to master the material</p>
            </Card>
            <Card className="p-6 bg-english/5 border-english/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-english">📝 View All Questions</h3>
              <p className="text-sm text-muted-foreground">Browse questions with IDs without taking a test</p>
            </Card>
            <Card className="p-6 bg-math/5 border-math/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-math">🎯 Targeted Practice</h3>
              <p className="text-sm text-muted-foreground">Review questions you got wrong on previous attempts</p>
            </Card>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Keyboard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">Keyboard Controls</h2>
            </div>
            <p className="text-muted-foreground mb-6">Use these keyboard shortcuts during quizzes to navigate quickly:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {controls.map((control, index) => <div key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
                  <kbd className="px-3 py-2 bg-muted rounded-md font-mono text-sm font-semibold min-w-[80px] text-center">{control.key}</kbd>
                  <span className="text-sm text-muted-foreground">{control.description}</span>
                </div>)}
            </div>
          </Card>
        </div>

        {/* How to Use Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-accent/20 bg-accent/5">
            <h2 className="text-2xl font-display font-bold mb-6">How to Use Practice Hub</h2>
            <ol className="space-y-4 list-decimal list-inside text-muted-foreground">
              <li className="leading-relaxed"><span className="font-semibold text-foreground">Choose a Category</span> - Click on Math, Science, or any subject area above</li>
              <li className="leading-relaxed"><span className="font-semibold text-foreground">Select a Subject</span> - Pick the specific course (e.g., AP Precalculus, Chemistry)</li>
              <li className="leading-relaxed"><span className="font-semibold text-foreground">Pick a Unit</span> - Click on a unit to see practice options</li>
              <li className="leading-relaxed"><span className="font-semibold text-foreground">Start Practicing</span> - Choose "Cram Study" for all questions or "View All Questions" to browse</li>
              <li className="leading-relaxed"><span className="font-semibold text-foreground">Review Mistakes</span> - Use "Targeted Practice" to review questions you got wrong</li>
            </ol>
          </Card>
        </div>

        {/* Custom Units Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-other/20 bg-other/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-other/20 rounded-lg">
                <FolderPlus className="h-6 w-6 text-other" />
              </div>
              <h2 className="text-2xl font-display font-bold">Custom Units & Topics</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Create your own question banks for any subject! Navigate to the <span className="font-medium text-foreground">Custom Units</span> category to create custom units and topics. Check the warnings and instructions there for important information about browser storage limitations.
            </p>
          </Card>
        </div>

        {/* External Study Resources Section */}
        {externalStudyResources.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Study Resources</h2>
              </div>
              <p className="text-muted-foreground mb-6">Helpful external resources for studying and practice:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {externalStudyResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 bg-background rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                  >
                    <ExternalLink className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{resource.title}</h3>
                      {resource.description && <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>}
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Bottom Ad Placeholder */}
        <div className="mt-16 max-w-4xl mx-auto">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>;
};
export default Index;
