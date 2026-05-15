import { Link } from 'react-router-dom';

const contactEmail = 'abilash.jovan@charterschool.org';

const groups = [
  {
    title: 'Tools & Help',
    links: [
      { to: '/question-generator', label: 'AI Question Maker' },
      { to: '/how-to-use', label: 'How to Use' },
    ],
  },
  {
    title: 'Data & Proof',
    links: [
      { to: '/data', label: 'Data/Statistics' },
      { to: '/data/proof', label: 'Data Proof' },
    ],
  },
  {
    title: 'Updates & Activity',
    links: [
      { to: '/updates', label: 'Update Tracker' },
      { to: '/contributors', label: 'Mentions' },
    ],
  },
];

export const Footer = () => {
  const openTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-terms'));
  };

  return (
    <footer className="w-full border-t bg-muted/30 relative z-20">
      <div className="container mx-auto px-4 py-6">
        {/* Top: 4 columns of grouped links (left-aligned — mirrored) */}
        <div className="flex justify-start">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-4 text-xs">
            {groups.map(group => (
              <div key={group.title} className="flex flex-col gap-1.5 text-left">
                <p className="font-bold text-foreground text-sm mb-1">{group.title}</p>
                {group.links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t my-5" />

        {/* Bottom row: MIRRORED — copyright left | email center | legal right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="order-3 sm:order-1 text-muted-foreground/60">© 2026 Practice Hub</p>

          <a
            href={`mailto:${contactEmail}`}
            className="order-1 sm:order-2 hover:text-foreground transition-colors"
          >
            {contactEmail}
          </a>

          <div className="flex items-center gap-2 order-2 sm:order-3">
            <button
              onClick={openTerms}
              className="hover:text-foreground transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-muted-foreground/40">|</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
