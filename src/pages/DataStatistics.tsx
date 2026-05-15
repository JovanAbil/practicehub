import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Users, Eye, TrendingUp, BookOpen, Brain, Clock, Target, ExternalLink } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { SITE_STATS } from '@/data/site-stats';

const STATS = SITE_STATS;

/**
 * =============================================================================
 * DATA POINTS - Evidence of Usefulness
 * =============================================================================
 * 
 * Add data entries below to showcase how the site helps students.
 * Each entry has a title, description, optional stat, and optional image.
 * 
 * To ADD a new data point:
 *   1. Copy one of the existing objects
 *   2. Update the fields
 *   3. For images, place them in public/images/data/ and reference as "/images/data/filename.png"
 * 
 * To ADD proof/evidence images:
 *   1. Place the image in public/images/data/
 *   2. Add the path to the 'proof' field: "/images/data/proof-name.png"
 * 
 * =============================================================================
 */

interface DataPoint {
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  icon: typeof BarChart3;
  proof?: string; // path to proof image in public/images/data/
  link?: { title: string; url: string }; // optional external link
}

const dataPoints: DataPoint[] = [
  {
    title: 'Active Study Tool',
    description: 'Students use Practice Hub to prepare for tests, review wrong answers with targeted practice, and build custom study sets.',
    stat: `${STATS.totalVisitors}`,
    statLabel: 'unique visitors',
    icon: Users,
  },
  {
    title: 'Engagement',
    description: 'High engagement with above 2,000 pageviews shows students return repeatedly to study, not just visit once.',
    stat: `${STATS.totalPageviews}`,
    statLabel: 'pageviews',
    icon: Eye,
  },
  {
    title: 'Custom Content',
    description: 'Allows active recall after adding your courses, which improves pattern recognition and fills in gaps you may have had!',
    icon: TrendingUp,
  },
  {
    title: 'Reviews',
    description: 'Share your feedback and help improve Practice Hub for everyone.',
    icon: Brain,
    link: {
      title: 'Open Submission Form',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLScH4-fL-fvpJMoKAyoPvkCLiDekx7-vp_pbdkm4-Sisc1nqxw/viewform',
    },
  },
];

const DataStatistics = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Data & Statistics
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evidence of how Practice Hub helps CSW students study more effectively.
          </p>
        </div>

        {/* Quick Stats Bar */}
        <Card className="p-6 mb-10 border-2 border-primary/20 bg-primary/5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-2xl font-bold">{STATS.totalVisitors.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground ml-2">visitors</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-2xl font-bold">{STATS.totalPageviews.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground ml-2">pageviews</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Updated: {STATS.lastUpdated}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Points Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {dataPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={index}
                className="p-6 border-2 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                    {point.stat && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                        <span className="text-lg font-bold text-primary">{point.stat}</span>
                        <span className="text-xs text-muted-foreground">{point.statLabel}</span>
                      </div>
                    )}
                    {point.link && (
                      <div className="mt-3">
                        <a
                          href={point.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {point.link.title}
                        </a>
                      </div>
                    )}
                    {point.proof && (
                      <div className="mt-4">
                        <img
                          src={point.proof}
                          alt={`Proof for ${point.title}`}
                          className="rounded-lg border max-w-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Methodology Note */}
        <Card className="p-6 border-2 border-muted bg-muted/30">
          <h3 className="font-display font-bold mb-3">📊 About This Data</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Visitor and pageview counts are tracked via Counter.dev analytics</li>
            <li>• Question counts reflect built-in content only (custom user content is not tracked)</li>
            <li>• All statistics are manually updated — check the "last updated" date above</li>
            <li>• No personal data is collected from users, just general positive feedback recieved and summarized</li>
          </ul>
          <Link to="/data/proof" className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline font-medium">
            View Data Proof — evidence &amp; reviews →
          </Link>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default DataStatistics;
