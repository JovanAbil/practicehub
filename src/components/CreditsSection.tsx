import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Users, Heart, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * =============================================================================
 * CONTRIBUTORS LIST - Easy to Add/Remove
 * =============================================================================
 * 
 * To ADD a new contributor:
 *   1. Copy one of the existing contributor objects below
 *   2. Paste it at the end of the 'contributors' array
 *   3. Update the name and role fields
 * 
 * To REMOVE a contributor:
 *   1. Find their object in the array below
 *   2. Delete the entire object (including the comma if it's not the last one)
 * 
 * Example contributor object:
 *   { name: 'John Doe', role: 'Content Creator' },
 * 
 * =============================================================================
 */

const contributors = [
  // ===== ADD CONTRIBUTORS BELOW THIS LINE =====
  
  { name: 'Jovan Abilash', role: 'Creator & Developer' },
  // { name: 'Contributor Name', role: 'Their Role' },
  // { name: 'Another Person', role: 'Content Creator' },
  
  // ===== ADD CONTRIBUTORS ABOVE THIS LINE =====
];

/**
 * =============================================================================
 * CONTACT INFORMATION
 * =============================================================================
 * 
 * Update the email below to change the contact email displayed
 * 
 * =============================================================================
 */

const contactEmail = 'abilash.jovan@charterschool.org';


export const CreditsSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contributors Card */}
        <Card className="p-8 border-2 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold">Contributors</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            Thank you to everyone who helped make this website possible!
          </p>
          <div className="space-y-3">
            {contributors.map((contributor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium">{contributor.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{contributor.role}</span>
              </div>
            ))}
            {contributors.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center py-4">
                No contributors listed yet
              </p>
            )}
          </div>
        </Card>

        {/* Contact Card */}
        <Card className="p-8 border-2 border-accent/20 bg-accent/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-accent/20 rounded-lg">
              <Mail className="h-6 w-6 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold">Need Help?</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            Have questions, suggestions, or want to contribute? Reach out!
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-background rounded-lg border">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Email</p>
                <p className="text-sm text-muted-foreground truncate">{contactEmail}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyEmail}
                className="flex items-center gap-2 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground text-center pt-2">
              Response time: Usually within 24-48 hours
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};
