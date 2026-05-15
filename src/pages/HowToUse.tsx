import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { howToUseVideos } from '@/data/how-to-use-videos';
import { SectionVideo } from '@/components/SectionVideo';

// HOW TO ADD MORE SECTIONS:
// 1. Add a new <Card> block in the sections below following the same pattern
// 2. Use <h2> for section titles and <h3> for sub-sections
// 3. Give the section a unique sectionId and wrap with renderSection()
// 4. To add a video, update src/data/how-to-use-videos.ts
//
// HOW TO ADD VIDEOS:
// 1. Place video file in public/videos/how-to-use/
// 2. Open src/data/how-to-use-videos.ts
// 3. Set the section entry to { src: '/videos/how-to-use/filename.mp4', label: 'Description' }
// 4. The video will appear at the top of that section automatically

const renderVideo = (sectionId: string) => {
  const video = howToUseVideos[sectionId];
  if (!video) return null;
  return <SectionVideo video={video} />;
};

const HowToUse = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-display font-bold mb-2">How to Use Practice Hub</h1>
          <p className="text-muted-foreground mb-8">Everything you need to know about using the website.</p>

          <div className="space-y-6">
            {/* Getting Started */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('getting-started')}
              <h2 className="text-2xl font-display font-bold mb-4">Getting Started</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li><span className="font-semibold text-foreground">Choose a Category</span> — Click on Math, Science, Social Studies, English, or Other from the home page.</li>
                <li><span className="font-semibold text-foreground">Select a Subject</span> — Pick a specific course (e.g., AP Precalculus, Chemistry).</li>
                <li><span className="font-semibold text-foreground">Pick a Unit</span> — Click on any unit to see practice options.</li>
                <li><span className="font-semibold text-foreground">Start Practicing</span> — Choose a quiz mode and begin!</li>
              </ol>
            </Card>

            {/* Quiz Modes */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('quiz-modes')}
              <h2 className="text-2xl font-display font-bold mb-4">Quiz Modes</h2>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">📚 Cram Study</h3>
                  <p>Practice ALL questions in a unit. Questions are shuffled each time. Great for comprehensive review before a test.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">🎯 Targeted Practice</h3>
                  <p>Review only the questions you got wrong on previous attempts. Available after completing at least one quiz.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">📝 View All Questions</h3>
                  <p>Browse all questions with their IDs and answers without taking a test. Useful for quick reference.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">🔧 Build Custom Practice (Presets)</h3>
                  <p>Select specific questions by ID to create a custom quiz. You can save presets for reuse.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">🏆 Course Challenge</h3>
                  <p>A cumulative quiz pulling questions from ALL units in a course. Test your mastery of the entire subject.</p>
                </div>
              </div>
            </Card>

            {/* Question Types */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('question-types')}
              <h2 className="text-2xl font-display font-bold mb-4">Question Types</h2>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">Multiple Choice</h3>
                  <p>Select one correct answer from the options. Use number keys (1-5) to quickly select, then Enter to submit.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Free Response</h3>
                  <p>Type your answer, then self-grade by comparing to the correct answer. Use the right arrow key (→) to mark correct, left arrow (←) to mark incorrect.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Select All That Apply (SATA)</h3>
                  <p>Check all options that are correct using checkboxes. Your answer is only marked correct if you select exactly the right options — no extra, no missing. After submitting, correct selections turn green, incorrect turn red, and missed answers are labeled.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Parts Questions</h3>
                  <p>Multi-part questions (a, b, c, etc.) that appear on one screen. Each part can be MC, FRQ, or SATA. Submit each part individually. All parts must be completed to move on.</p>
                </div>
              </div>
            </Card>

            {/* Keyboard Controls */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('keyboard-controls')}
              <h2 className="text-2xl font-display font-bold mb-4">⌨️ Keyboard Controls</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: '1-5', desc: 'Select answer option (1st, 2nd, etc.) or toggle SATA checkbox' },
                  { key: 'Enter', desc: 'Submit answer / Move to next question' },
                  { key: '← Arrow', desc: 'Mark free response as incorrect' },
                  { key: '→ Arrow', desc: 'Mark free response as correct' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <kbd className="px-3 py-1.5 bg-muted rounded-md font-mono text-sm font-semibold min-w-[70px] text-center">{c.key}</kbd>
                    <span className="text-sm">{c.desc}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Custom Units */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('custom-units')}
              <h2 className="text-2xl font-display font-bold mb-4">Creating Custom Units & Topics</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Navigate to the <span className="font-semibold text-foreground">Custom Units</span> category from the home page to create your own question banks.</p>

                <h3 className="font-semibold text-foreground">Creating a Unit</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to the "Custom Units" category page</li>
                  <li>Click "Create Unit"</li>
                  <li>Enter a name, teacher name, and subject</li>
                  <li>Your unit appears in the list — click "Add Topic" to add topics</li>
                </ol>

                <h3 className="font-semibold text-foreground">Adding Topics & Questions</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Inside a custom unit, click "Add Topic"</li>
                  <li>Name your topic and toggle "Math Mode" if you need LaTeX rendering</li>
                  <li>Click "Add Question" to create questions</li>
                  <li>Choose the type: Multiple Choice, Free Response, Select All That Apply, or Parts</li>
                  <li>Fill in the question, options, and correct answer(s)</li>
                  <li>For SATA: toggle the checkmarks next to each option to set which are correct</li>
                  <li>Save when done</li>
                </ol>

                <h3 className="font-semibold text-foreground">Exporting & Importing</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><span className="font-semibold text-foreground">Export:</span> Download a unit as a .zip file to back up or share</li>
                  <li><span className="font-semibold text-foreground">Import:</span> Upload a .zip file to restore or add a unit from someone else</li>
                  <li>All question types including SATA are preserved during export/import</li>
                </ul>

                <h3 className="font-semibold text-foreground">⚠️ Important: Browser Storage</h3>
                <p>Custom units are stored in your browser's localStorage (5 MB limit). If you clear your browser data, your custom units will be deleted. Always export important units as backups!</p>
              </div>
            </Card>

            {/* Quiz Features */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('quiz-features')}
              <h2 className="text-2xl font-display font-bold mb-4">Quiz Features</h2>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">Quiz Timer</h3>
                  <p>Every quiz has a running timer. It's saved if you leave and resume later.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Skip Questions</h3>
                  <p>You can skip a question and come back to it later. Skip it a second time and it's marked wrong.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Resume Quizzes</h3>
                  <p>If you leave a quiz mid-way, your progress is auto-saved. You'll be prompted to resume when you return.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Flag Questions</h3>
                  <p>If you think a question has an error, click the flag icon to mark it. Flagged questions appear first on the results page with a warning badge.</p>
                </div>
              </div>
            </Card>

            {/* Troubleshooting */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('troubleshooting')}
              <h2 className="text-2xl font-display font-bold mb-4">Troubleshooting</h2>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">My custom units disappeared</h3>
                  <p>Custom units are stored in your browser. Clearing browser data, using a different browser, or using incognito mode will lose them. Always export important units as .zip backups.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">A quiz shows "No questions found"</h3>
                  <p>This means no questions are loaded for that unit. If it's a custom unit, make sure the topic has questions added.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Math formulas aren't rendering</h3>
                  <p>Math expressions need to be wrapped in dollar signs: <code className="bg-muted px-1 rounded">$x^2$</code> for inline math. Make sure "Math Mode" is enabled for custom topics.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Images aren't loading</h3>
                  <p>For custom questions, make sure you paste a valid image URL. For built-in questions, this may be a temporary loading issue — try refreshing.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Storage is full</h3>
                  <p>If you see a storage warning, export your custom units, delete ones you don't need, or clear old data. The browser limit is approximately 5 MB.</p>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6 rounded-xl border-2">
              {renderVideo('tips')}
              <h2 className="text-2xl font-display font-bold mb-4">💡 Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use <span className="font-semibold text-foreground">Cram Study</span> the night before a test to go through everything</li>
                <li>After a cram session, use <span className="font-semibold text-foreground">Targeted Practice</span> to focus on what you missed</li>
                <li>Use <span className="font-semibold text-foreground">presets</span> to create focused review sets for specific concepts</li>
                <li>The <span className="font-semibold text-foreground">Course Challenge</span> is great for final exam prep</li>
                <li>Create <span className="font-semibold text-foreground">custom units</span> for subjects not yet on the site</li>
                <li>Use keyboard shortcuts to move through quizzes faster</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowToUse;
