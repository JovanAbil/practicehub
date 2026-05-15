import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageSquareQuote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { reviews } from '@/data/data-proof';

/**
 * =============================================================================
 * CONTRIBUTORS LIST - Easy to Add/Remove
 * =============================================================================
 * 
 * To ADD a new contributor:
 *   1. Copy one of the existing contributor objects below
 *   2. Paste it at the end of the 'contributors' array
 *   3. Update the name, role, and contributions fields
 * 
 * To REMOVE a contributor:
 *   1. Find their object in the array below
 *   2. Delete the entire object (including the comma if it's not the last one)
 * 
 * =============================================================================
 */

const contributors = [
  { name: 'Jovan A', role: 'Creator & Developer', contributions: 'Built the entire website and maintains all content' },
  { name: 'Phong D', role: 'Contributor #1', contributions: 'Added Shang - Song material for Kohl\'s test' },
  { name: 'Winston S', role: 'Contributor #2', contributions: 'Added Evolution material for Valenti\'s test' },
];

const sizeClasses: Record<string, string> = {
  sm: 'min-h-[120px]',
  md: 'min-h-[180px]',
  lg: 'min-h-[260px]',
};

const Mentions = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-display font-bold mb-2 text-center">Mentions</h1>
        <p className="text-muted-foreground mb-10 text-center">Contributors and reviews from the Practice Hub community.</p>

        {/* ── CONTRIBUTORS ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Contributors
          </h2>

          {contributors.length === 0 ? (
            <p className="text-muted-foreground italic text-center py-12">No contributors listed yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {contributors.map((contributor, index) => (
                <Card
                  key={index}
                  className="p-6 rounded-2xl border-2 border-primary/10 bg-primary/5 animate-fade-in hover:shadow-lg transition-shadow"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    animation: `fade-in 0.5s ease-out ${index * 0.15}s both, float 6s ease-in-out ${index * 0.5}s infinite`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg mt-0.5">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg">{contributor.name}</h3>
                      <p className="text-sm text-primary font-medium">{contributor.role}</p>
                      <p className="text-xs text-muted-foreground mt-2">{contributor.contributions}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ── REVIEWS ── */}
        <section>
          <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
            <MessageSquareQuote className="h-5 w-5 text-primary" />
            Reviews
          </h2>

          {reviews.length === 0 ? (
            <Card className="p-8 rounded-2xl border border-dashed bg-card/50 text-center">
              <MessageSquareQuote className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No reviews yet — check back soon!</p>
            </Card>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {reviews.map((review, i) => {
                const isEmpty = !review.quote;
                return (
                  <Card
                    key={i}
                    className={`break-inside-avoid rounded-2xl border p-5 transition-shadow ${
                      sizeClasses[review.size] || sizeClasses.md
                    } ${
                      isEmpty
                        ? 'border-dashed bg-muted/30 flex items-center justify-center'
                        : 'bg-card shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isEmpty ? (
                      <span className="text-muted-foreground/40 text-sm italic">Review coming soon</span>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed text-foreground mb-3">"{review.quote}"</p>
                        <div className="mt-auto">
                          <p className="text-sm font-semibold">{review.author}</p>
                          {review.role && <p className="text-xs text-muted-foreground">{review.role}</p>}
                        </div>
                      </>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Mentions;
