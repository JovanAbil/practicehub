import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { updates } from '@/data/updates';

const UpdateTracker = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-display font-bold mb-2">Update Tracker</h1>
          <p className="text-muted-foreground mb-8">A log of all changes and updates made to Practice Hub.</p>

          <div className="space-y-5">
            {updates.map((update, index) => (
              <Card key={index} className="p-6 sm:p-8 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl mt-0.5">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-display font-bold leading-tight">{update.title}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{update.date}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground ml-12">
                  {update.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateTracker;
